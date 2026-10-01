import React, { useEffect, useRef, useState, useMemo } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { DESTINATIONS, Destination } from "@/src/data/destinations";
import {
  MapPin,
  Compass,
  ArrowRight,
  Sparkles,
  Heart,
  Clock,
  RotateCcw
} from "lucide-react";
import { useWishlist } from "@/src/context/WishlistContext";

interface RegionalMapProps {
  onSelectDestination: (dest: Destination) => void;
}

export type JapanRegion =
  | "All"
  | "Kanto"
  | "Kansai"
  | "Chubu"
  | "Chugoku"
  | "Okinawa";

const DESTINATION_REGIONS: Record<string, JapanRegion> = {
  "senso-ji-temple": "Kanto",
  "shibuya-crossing": "Kanto",
  "hakone": "Kanto",
  "mount-fuji": "Chubu",
  "matsumoto-castle": "Chubu",
  "shirakawa-go": "Chubu",
  "kenroku-en-garden": "Chubu",
  "fushimi-inari-taisha": "Kansai",
  "kinkaku-ji": "Kansai",
  "arashiyama-bamboo-grove": "Kansai",
  "himeji-castle": "Kansai",
  "osaka-castle": "Kansai",
  "nara-park": "Kansai",
  "dotonbori": "Kansai",
  "itsukushima-shrine": "Chugoku",
  "okinawa": "Okinawa"
};

const REGION_BOUNDS: Record<JapanRegion, { center: [number, number]; zoom: number }> = {
  All: { center: [35.6, 137.4], zoom: 6 },
  Kanto: { center: [35.68, 139.6], zoom: 9 },
  Kansai: { center: [34.9, 135.5], zoom: 9 },
  Chubu: { center: [35.9, 137.5], zoom: 8 },
  Chugoku: { center: [34.39, 132.45], zoom: 9 },
  Okinawa: { center: [26.3, 127.8], zoom: 9 }
};

export const RegionalMap: React.FC<RegionalMapProps> = ({
  onSelectDestination
}) => {
  const [activeRegion, setActiveRegion] = useState<JapanRegion>("All");
  const [selectedDestId, setSelectedDestId] = useState<string>("mount-fuji");
  const { isWishlisted, toggleWishlist } = useWishlist();

  // Leaflet refs
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});

  // Selected destination data
  const selectedDest = useMemo(() => {
    return DESTINATIONS.find(d => d.id === selectedDestId) || DESTINATIONS[0];
  }, [selectedDestId]);

  // Counts per region
  const regionCounts = useMemo(() => {
    const counts: Record<JapanRegion, number> = {
      All: 16,
      Kanto: 0,
      Kansai: 0,
      Chubu: 0,
      Chugoku: 0,
      Okinawa: 0
    };
    DESTINATIONS.forEach(d => {
      const reg = DESTINATION_REGIONS[d.id];
      if (reg && counts[reg] !== undefined) {
        counts[reg]++;
      }
    });
    return counts;
  }, []);

  // 1. Initialize Real Geographic Map with ESRI World Topo Map (No API Key, No Watermarks)
  useEffect(() => {
    if (!mapContainerRef.current) return;

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

    // Fresh child canvas for Leaflet
    const mapDiv = document.createElement("div");
    mapDiv.style.width = "100%";
    mapDiv.style.height = "100%";
    mapDiv.style.position = "absolute";
    mapDiv.style.inset = "0";
    parent.appendChild(mapDiv);

    // Create Leaflet Map centered on Japan
    const map = L.map(mapDiv, {
      center: [35.6, 137.4],
      zoom: 6,
      minZoom: 4,
      maxZoom: 17,
      zoomControl: false,
      scrollWheelZoom: true
    });

    // Zoom controls positioned at top-right
    L.control.zoom({ position: "topright" }).addTo(map);

    // ESRI World Topographic Map: 100% Free, No Watermark, Clean Cartography
    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
      {
        attribution: "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC",
        maxZoom: 18
      }
    ).addTo(map);

    mapInstanceRef.current = map;

    // Re-calculate size when container renders
    const t1 = setTimeout(() => map.invalidateSize(), 150);
    const t2 = setTimeout(() => map.invalidateSize(), 500);

    const handleResize = () => map.invalidateSize();
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", handleResize);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // 2. Render 16 Interactive Destination Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach(m => m.remove());
    markersRef.current = {};

    DESTINATIONS.forEach((dest, idx) => {
      const region = DESTINATION_REGIONS[dest.id] || "Kansai";
      const isVisible = activeRegion === "All" || region === activeRegion;
      if (!isVisible) return;

      const isSelected = dest.id === selectedDestId;

      // Custom Japanese Pin with number badge & shadow
      const customIcon = L.divIcon({
        className: "hanami-geo-marker",
        iconSize: [38, 44],
        iconAnchor: [19, 44],
        popupAnchor: [0, -42],
        html: `
          <div style="
            position: relative;
            width: 38px;
            height: 44px;
            cursor: pointer;
            transform: scale(${isSelected ? 1.25 : 1});
            transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
            filter: drop-shadow(0 4px 8px rgba(0,0,0,0.4));
          ">
            <svg viewBox="0 0 38 44" width="38" height="44">
              <path d="M19 0 C8.5 0 0 8.5 0 19 C0 30.5 19 44 19 44 C19 44 38 30.5 38 19 C38 8.5 29.5 0 19 0 Z"
                    fill="${isSelected ? "#C9414D" : "#2B2440"}"
                    stroke="#D4AF6A"
                    stroke-width="2.5" />
              <circle cx="19" cy="18" r="11" fill="#FFFDF8" />
              <text x="19" y="22"
                    text-anchor="middle"
                    font-size="11"
                    font-weight="900"
                    font-family="system-ui, -apple-system, sans-serif"
                    fill="${isSelected ? "#C9414D" : "#2B2440"}">${idx + 1}</text>
            </svg>
          </div>
        `
      });

      const marker = L.marker([dest.mapCoordinates.lat, dest.mapCoordinates.lng], {
        icon: customIcon,
        title: `${dest.name} (${dest.japaneseName})`
      }).addTo(map);

      // Tooltip on Hover
      marker.bindTooltip(
        `<div style="font-family: inherit; font-size: 11px; padding: 2px 4px;">
          <strong style="color: #2B2440;">${dest.name}</strong>
          <span style="color: #8F2429; margin-left: 4px;">${dest.japaneseName}</span>
        </div>`,
        { direction: "top", offset: [0, -40] }
      );

      // Pan to destination on pin click
      marker.on("click", () => {
        setSelectedDestId(dest.id);
        map.flyTo([dest.mapCoordinates.lat, dest.mapCoordinates.lng], Math.max(map.getZoom(), 10), {
          duration: 1,
          easeLinearity: 0.25
        });
      });

      markersRef.current[dest.id] = marker;
    });
  }, [activeRegion, selectedDestId]);

  // Handle region filter change and camera fly
  const handleRegionSelect = (reg: JapanRegion) => {
    setActiveRegion(reg);
    const map = mapInstanceRef.current;
    if (!map) return;

    const target = REGION_BOUNDS[reg];
    if (target) {
      map.flyTo(target.center, target.zoom, {
        duration: 1.2,
        easeLinearity: 0.25
      });
    }

    if (reg !== "All") {
      const firstInReg = DESTINATIONS.find(d => DESTINATION_REGIONS[d.id] === reg);
      if (firstInReg) setSelectedDestId(firstInReg.id);
    }
  };

  const handleCenterAllJapan = () => {
    handleRegionSelect("All");
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Card with Region Selector Tabs (Pure English & Editorial) */}
      <div className="theme-card-bg p-5 sm:p-7 rounded-3xl border theme-border shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <div className="w-8 h-8 rounded-full theme-header-bg text-white flex items-center justify-center shadow-xs">
                <Compass className="w-4 h-4 text-[var(--gold)]" />
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[var(--ink)]">
                The Japan Sanctuary Map (日本地図)
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold theme-tag-bg border theme-border text-[var(--ink)]">
                16 Curated Sanctuaries
              </span>
            </div>
            <p className="text-xs text-[var(--mute)] max-w-2xl leading-relaxed">
              Explore the geographic terrain of each sanctuary across Honshu, Chubu, Kansai, and Okinawa. Click any numbered pin to reveal its cultural context, seasonal recommendations, and visitor etiquette.
            </p>
          </div>

          {/* Recenter Button */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={handleCenterAllJapan}
              className="px-3.5 py-2 rounded-full bg-white border theme-border text-xs font-semibold text-[var(--ink)] flex items-center gap-1.5 cursor-pointer shadow-xs hover:bg-neutral-50 transition-colors"
              title="Reset map view to show all of Japan"
            >
              <RotateCcw className="w-3.5 h-3.5 theme-primary-text" />
              <span>Reset Map View</span>
            </button>
          </div>
        </div>

        {/* Region Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden flex-wrap">
          {(
            [
              "All",
              "Kanto",
              "Kansai",
              "Chubu",
              "Chugoku",
              "Okinawa"
            ] as JapanRegion[]
          ).map(reg => {
            const isSelected = activeRegion === reg;
            const count = regionCounts[reg];

            return (
              <button
                key={reg}
                onClick={() => handleRegionSelect(reg)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                  isSelected
                    ? "theme-header-bg text-white shadow-xs scale-102"
                    : "theme-tag-bg text-[var(--ink)] border theme-border hover:opacity-90"
                }`}
              >
                <span>
                  {reg === "All" ? "All Regions" : reg} ({count})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. REAL GEOGRAPHIC MAP & SELECTED DESTINATION PREVIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Real Leaflet Map (8 cols on lg) */}
        <div className="lg:col-span-8 theme-card-bg rounded-3xl border-2 border-[var(--card-border)] shadow-md overflow-hidden relative h-[480px] sm:h-[560px]">
          {/* Map Container */}
          <div ref={mapContainerRef} className="w-full h-full relative z-10" />

          {/* Map Overlay Badge */}
          <div className="absolute top-3 left-3 z-20 pointer-events-none bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-xl border theme-border text-[11px] font-semibold text-[var(--ink)] shadow-md flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full theme-primary-bg animate-pulse" />
            <span>Interactive Terrain & Geography</span>
          </div>
        </div>

        {/* Selected Destination Cultural Preview Card (4 cols on lg) */}
        <div className="lg:col-span-4 theme-card-bg rounded-3xl border-2 border-[var(--gold)]/70 shadow-md p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--gold)] flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>Selected Sanctuary</span>
            </span>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold theme-header-bg text-white">
              {selectedDest.category}
            </span>
          </div>

          {/* Photo */}
          <div className="relative aspect-16/10 rounded-2xl overflow-hidden bg-black/5 border theme-border">
            <img
              src={selectedDest.gallery[0]?.url || ""}
              alt={selectedDest.name}
              className="w-full h-full object-cover"
              onError={e => {
                e.currentTarget.src =
                  "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80";
              }}
            />
            <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/55 text-white font-serif font-bold text-xs backdrop-blur-xs">
              {selectedDest.japaneseName}
            </div>
            <div className="absolute bottom-2 left-2.5 flex items-center gap-1 text-[11px] text-white font-semibold drop-shadow-sm">
              <MapPin className="w-3 h-3 text-[var(--gold)]" />
              <span>{selectedDest.region} • {selectedDest.mapCoordinates.lat.toFixed(2)}°N, {selectedDest.mapCoordinates.lng.toFixed(2)}°E</span>
            </div>
          </div>

          {/* Title & Hook */}
          <div className="space-y-1">
            <h3 className="font-serif text-lg font-bold text-[var(--ink)] leading-snug">
              {selectedDest.name}
            </h3>
            <p className="text-xs text-[var(--mute)] leading-relaxed line-clamp-3">
              {selectedDest.oneLineHook}
            </p>
          </div>

          {/* Duration & Cost */}
          <div className="p-3 rounded-xl bg-white/70 border theme-border space-y-1 text-xs">
            <div className="flex items-center justify-between text-[var(--mute)]">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-[var(--gold)]" />
                <span>Visit Duration:</span>
              </span>
              <strong className="text-[var(--ink)]">
                {selectedDest.suggestedDuration.split("or")[0]}
              </strong>
            </div>
            <div className="flex items-center justify-between text-[var(--mute)] pt-1 border-t theme-border/50">
              <span>Best Season:</span>
              <strong className="text-[var(--red)]">
                {selectedDest.bestSeason.split("(")[0]}
              </strong>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center gap-2">
            <button
              onClick={() => onSelectDestination(selectedDest)}
              className="flex-1 py-2.5 px-4 rounded-full theme-cta-btn text-white text-xs font-bold shadow-xs hover:scale-102 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Explore Cultural Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => toggleWishlist(selectedDest.id)}
              className={`p-2.5 rounded-full border transition-all cursor-pointer flex items-center justify-center ${
                isWishlisted(selectedDest.id)
                  ? "theme-primary-bg text-white border-transparent"
                  : "bg-white text-[var(--ink)] border-[var(--gold)] hover:bg-white/80"
              }`}
              title={
                isWishlisted(selectedDest.id) ? "Remove saved" : "Save destination"
              }
            >
              <Heart
                className={`w-4 h-4 ${
                  isWishlisted(selectedDest.id) ? "fill-white text-white" : "text-[var(--red)]"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
