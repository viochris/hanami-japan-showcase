import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Destination } from "@/src/data/destinations";
import { MapPin, ExternalLink, Compass, Layers } from "lucide-react";

interface DestinationLocationMapProps {
  destination: Destination;
}

export const DestinationLocationMap: React.FC<DestinationLocationMapProps> = ({
  destination
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [mapViewMode, setMapViewMode] = useState<"interactive" | "google">("interactive");

  const { lat, lng } = destination.mapCoordinates;

  useEffect(() => {
    if (mapViewMode !== "interactive" || !mapContainerRef.current) return;

    // Clean up previous instance
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const parent = mapContainerRef.current;
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
    if ((parent as any)._leaflet_id) {
      delete (parent as any)._leaflet_id;
    }

    const mapDiv = document.createElement("div");
    mapDiv.style.width = "100%";
    mapDiv.style.height = "100%";
    mapDiv.style.position = "absolute";
    mapDiv.style.inset = "0";
    mapDiv.style.zIndex = "1";
    parent.appendChild(mapDiv);

    // Initialize Leaflet Map zoomed directly onto the destination
    const map = L.map(mapDiv, {
      center: [lat, lng],
      zoom: 15,
      minZoom: 11,
      maxZoom: 18,
      zoomControl: false,
      scrollWheelZoom: false
    });

    L.control.zoom({ position: "topright" }).addTo(map);

    // Clean, crisp OpenStreetMap / CartoDB tiles with Japanese landmarks
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
        subdomains: "abcd"
      }
    ).addTo(map);

    // GUARANTEED PROMINENT RED PIN WITH PULSING RADAR AND KANJI
    const redPinIcon = L.divIcon({
      className: "hanami-destination-red-pin",
      iconSize: [46, 56],
      iconAnchor: [23, 54],
      popupAnchor: [0, -50],
      html: `
        <div style="position: relative; width: 46px; height: 56px; cursor: pointer; display: flex; align-items: center; justify-content: center;">
          <!-- Pulsing Red Radar Ring -->
          <div style="
            position: absolute;
            bottom: 4px;
            left: 50%;
            transform: translateX(-50%);
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: rgba(201, 65, 77, 0.45);
            animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
            pointer-events: none;
          "></div>
          
          <!-- Shadow -->
          <div style="
            position: absolute;
            bottom: 2px;
            left: 50%;
            transform: translateX(-50%);
            width: 18px;
            height: 6px;
            border-radius: 50%;
            background: rgba(0, 0, 0, 0.35);
            filter: blur(1.5px);
          "></div>

          <!-- Solid Vermilion Red Japanese Pin SVG -->
          <svg viewBox="0 0 38 46" width="44" height="52" style="filter: drop-shadow(0 4px 6px rgba(0,0,0,0.35)); position: relative; z-index: 2;">
            <path d="M19 0 C8.5 0 0 8.5 0 19 C0 31 19 46 19 46 C19 46 38 31 38 19 C38 8.5 29.5 0 19 0 Z"
                  fill="#C9414D"
                  stroke="#FFFFFF"
                  stroke-width="2.5" />
            <circle cx="19" cy="18" r="10" fill="#FFFFFF" />
            <circle cx="19" cy="18" r="6.5" fill="#C9414D" />
          </svg>

          <!-- Label Tag on Pin -->
          <div style="
            position: absolute;
            top: -26px;
            left: 50%;
            transform: translateX(-50%);
            background: #C9414D;
            color: #FFFFFF;
            font-size: 10px;
            font-weight: 800;
            padding: 2px 7px;
            border-radius: 9999px;
            white-space: nowrap;
            box-shadow: 0 2px 6px rgba(0,0,0,0.25);
            border: 1px solid #FFFFFF;
            letter-spacing: 0.05em;
            z-index: 3;
          ">
            📍 Exact Location
          </div>
        </div>
      `
    });

    const marker = L.marker([lat, lng], {
      icon: redPinIcon,
      title: `${destination.name} (${destination.japaneseName})`
    }).addTo(map);

    // Auto-opened informative popup
    marker.bindPopup(
      `
        <div style="font-family: inherit; font-size: 12px; padding: 2px; text-align: center; min-width: 170px;">
          <strong style="color: #C9414D; font-size: 13px; display: block; margin-bottom: 2px;">
            📍 ${destination.name}
          </strong>
          <span style="color: #2B2440; font-weight: bold; font-family: serif; font-size: 12px;">
            ${destination.japaneseName}
          </span>
          <div style="margin-top: 4px; font-size: 10px; color: #666; font-family: monospace;">
            ${lat.toFixed(4)}° N, ${lng.toFixed(4)}° E
          </div>
        </div>
      `,
      { closeButton: false, autoClose: false, closeOnClick: false }
    ).openPopup();

    mapInstanceRef.current = map;

    // Smooth resize triggers for modal animation
    const t1 = setTimeout(() => map.invalidateSize(), 100);
    const t2 = setTimeout(() => {
      map.invalidateSize();
      map.panTo([lat, lng]);
    }, 400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [destination, mapViewMode, lat, lng]);

  const googleMapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}+(${encodeURIComponent(destination.name)})`;
  const googleMapsIframeUrl = `https://maps.google.com/maps?q=${lat},${lng}+(${encodeURIComponent(destination.name)})&t=&z=15&ie=UTF8&iwloc=B&output=embed`;

  return (
    <div className="space-y-2">
      {/* Top Header & Switcher */}
      <div className="flex items-center justify-between text-xs text-[var(--mute)]">
        <div className="flex items-center gap-2">
          <span className="font-bold uppercase tracking-wider text-[10px] flex items-center gap-1.5 text-[var(--ink)]">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--red)] animate-pulse" />
            Location Map & Coordinates
          </span>

          <div className="flex items-center bg-black/5 p-0.5 rounded-lg border theme-border text-[11px]">
            <button
              type="button"
              onClick={() => setMapViewMode("interactive")}
              className={`px-2 py-0.5 rounded-md font-semibold transition-all cursor-pointer ${
                mapViewMode === "interactive"
                  ? "bg-[var(--red)] text-white shadow-2xs"
                  : "text-[var(--mute)] hover:text-[var(--ink)]"
              }`}
            >
              Interactive Map
            </button>
            <button
              type="button"
              onClick={() => setMapViewMode("google")}
              className={`px-2 py-0.5 rounded-md font-semibold transition-all cursor-pointer ${
                mapViewMode === "google"
                  ? "bg-[var(--red)] text-white shadow-2xs"
                  : "text-[var(--mute)] hover:text-[var(--ink)]"
              }`}
            >
              Google Maps
            </button>
          </div>
        </div>

        <a
          href={googleMapsSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--red)] hover:underline flex items-center gap-1 font-semibold text-[11px]"
        >
          <span>Open in Google Maps</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Map Canvas Box */}
      <div className="relative w-full h-64 sm:h-76 rounded-2xl overflow-hidden border-2 border-[var(--card-border)] shadow-inner bg-[#f0f4f8]">
        {mapViewMode === "interactive" ? (
          <div ref={mapContainerRef} className="w-full h-full relative" />
        ) : (
          <iframe
            title={`Google Map of ${destination.name}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={googleMapsIframeUrl}
            className="w-full h-full border-0"
          />
        )}

        {/* Floating Verified Coordinate Pill */}
        <div className="absolute bottom-2.5 left-2.5 z-10 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-md border theme-border flex items-center gap-2 text-[11px] pointer-events-none text-[var(--ink)]">
          <span className="w-2 h-2 rounded-full bg-[var(--red)] animate-ping" />
          <span className="font-serif font-bold text-[var(--red)]">
            {destination.japaneseName}
          </span>
          <span className="font-mono text-[10px] text-[var(--mute)]">
            {lat.toFixed(4)}° N, {lng.toFixed(4)}° E
          </span>
        </div>
      </div>
    </div>
  );
};
