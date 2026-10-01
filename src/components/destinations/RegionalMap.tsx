import React, { useState, useMemo } from "react";
import { DESTINATIONS, Destination } from "@/src/data/destinations";
import {
  MapPin,
  Compass,
  ArrowRight,
  Sparkles,
  Maximize2,
  Layers,
  Heart
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

interface MapPinData {
  destinationId: string;
  x: number;
  y: number;
  regionGroup: JapanRegion;
  labelPosition?: "top" | "bottom" | "left" | "right";
}

// 16 Destinations accurately positioned on Japan 960x580 SVG coordinate canvas
const PIN_COORDINATES: MapPinData[] = [
  // KANTO
  { destinationId: "senso-ji-temple", x: 635, y: 325, regionGroup: "Kanto", labelPosition: "right" },
  { destinationId: "shibuya-crossing", x: 618, y: 345, regionGroup: "Kanto", labelPosition: "right" },
  { destinationId: "hakone", x: 595, y: 368, regionGroup: "Kanto", labelPosition: "bottom" },

  // CHUBU
  { destinationId: "mount-fuji", x: 570, y: 348, regionGroup: "Chubu", labelPosition: "top" },
  { destinationId: "matsumoto-castle", x: 550, y: 295, regionGroup: "Chubu", labelPosition: "top" },
  { destinationId: "shirakawa-go", x: 512, y: 305, regionGroup: "Chubu", labelPosition: "left" },
  { destinationId: "kenroku-en-garden", x: 495, y: 275, regionGroup: "Chubu", labelPosition: "top" },

  // KANSAI
  { destinationId: "kinkaku-ji", x: 442, y: 330, regionGroup: "Kansai", labelPosition: "top" },
  { destinationId: "arashiyama-bamboo-grove", x: 425, y: 345, regionGroup: "Kansai", labelPosition: "left" },
  { destinationId: "fushimi-inari-taisha", x: 458, y: 350, regionGroup: "Kansai", labelPosition: "right" },
  { destinationId: "osaka-castle", x: 432, y: 375, regionGroup: "Kansai", labelPosition: "left" },
  { destinationId: "dotonbori", x: 420, y: 395, regionGroup: "Kansai", labelPosition: "bottom" },
  { destinationId: "nara-park", x: 455, y: 382, regionGroup: "Kansai", labelPosition: "right" },
  { destinationId: "himeji-castle", x: 385, y: 355, regionGroup: "Kansai", labelPosition: "bottom" },

  // CHUGOKU
  { destinationId: "itsukushima-shrine", x: 285, y: 385, regionGroup: "Chugoku", labelPosition: "bottom" },

  // OKINAWA (Inset Map)
  { destinationId: "okinawa", x: 135, y: 485, regionGroup: "Okinawa", labelPosition: "right" }
];

export const RegionalMap: React.FC<RegionalMapProps> = ({ onSelectDestination }) => {
  const [hoveredDestinationId, setHoveredDestinationId] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<JapanRegion>("All");
  const { isWishlisted } = useWishlist();

  // Find hovered destination details
  const activeHoveredDest = useMemo(() => {
    if (!hoveredDestinationId) return null;
    return DESTINATIONS.find(d => d.id === hoveredDestinationId) || null;
  }, [hoveredDestinationId]);

  // Destination lookup map
  const destinationMap = useMemo(() => {
    const map = new Map<string, Destination>();
    DESTINATIONS.forEach(d => map.set(d.id, d));
    return map;
  }, []);

  const regionCounts = useMemo(() => {
    const counts: Record<JapanRegion, number> = {
      All: 16,
      Kanto: 3,
      Kansai: 7,
      Chubu: 4,
      Chugoku: 1,
      Okinawa: 1
    };
    return counts;
  }, []);

  return (
    <div className="theme-card-bg rounded-3xl border theme-border overflow-hidden shadow-sm transition-all duration-300">
      {/* Map Control Header */}
      <div className="p-4 sm:p-6 border-b theme-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white/40">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg sm:text-xl font-bold text-[var(--ink)] flex items-center gap-2">
              <Compass className="w-5 h-5 theme-primary-text" />
              <span>Interactive Archipelago Map (日本地図)</span>
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold theme-primary-bg text-white">
              16 Sanctuaries
            </span>
          </div>
          <p className="text-xs text-[var(--mute)] pt-0.5">
            Hover over any marker on the map to preview destination insights. Click to explore details.
          </p>
        </div>

        {/* Region Filter Chips */}
        <div className="flex items-center flex-wrap gap-1.5 w-full md:w-auto">
          {(["All", "Kanto", "Kansai", "Chubu", "Chugoku", "Okinawa"] as JapanRegion[]).map(reg => {
            const isSelected = selectedRegion === reg;
            const count = regionCounts[reg];

            return (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? "theme-header-bg text-white shadow-xs scale-102"
                    : "theme-tag-bg text-[var(--ink)] border theme-border hover:opacity-90"
                }`}
              >
                <span>{reg === "All" ? "All Regions" : reg}</span>
                <span className="ml-1 text-[10px] opacity-75">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SVG Map Container */}
      <div className="relative w-full aspect-16/10 sm:aspect-16/9 bg-linear-to-b from-[#F2F7FA] via-[var(--bg)] to-[#F0F5FA] overflow-hidden select-none">
        {/* Subtle Japanese ocean waves pattern in background */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(circle_at_center,var(--gold)_1px,transparent_1px)] bg-[size:28px_28px]" />

        {/* Traditional Compass Rose (North) */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 pointer-events-none flex flex-col items-center opacity-70">
          <div className="w-8 h-8 rounded-full border border-[var(--gold)] flex items-center justify-center font-serif text-xs font-bold theme-primary-text shadow-xs">
            北
          </div>
          <span className="text-[10px] tracking-widest text-[var(--mute)] font-serif mt-0.5">NORTH</span>
        </div>

        {/* Sea Labels */}
        <span className="absolute top-24 left-1/4 text-xs font-serif text-[var(--mute)]/50 tracking-[0.3em] pointer-events-none">
          SEA OF JAPAN • 日本海
        </span>
        <span className="absolute bottom-12 right-1/4 text-xs font-serif text-[var(--mute)]/50 tracking-[0.3em] pointer-events-none">
          PACIFIC OCEAN • 太平洋
        </span>

        {/* Okinawa Inset Map Border (Bottom Left) */}
        <div className="absolute bottom-4 left-4 w-44 sm:w-52 h-32 sm:h-36 rounded-2xl border-2 border-[var(--gold)]/60 bg-white/70 backdrop-blur-xs p-2 pointer-events-none shadow-xs">
          <span className="text-[10px] font-serif font-bold text-[var(--ink)] uppercase tracking-wider block border-b border-[var(--gold)]/30 pb-0.5">
            Ryukyu Islands (沖縄諸島)
          </span>
          <span className="text-[9px] text-[var(--mute)] block pt-0.5">
            Southwest Subtropical Inset
          </span>
        </div>

        {/* Main SVG Vector of Japan */}
        <svg
          viewBox="0 0 960 580"
          className="w-full h-full object-contain filter drop-shadow-sm"
        >
          <defs>
            {/* Soft island linear gradients */}
            <linearGradient id="islandLandGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#F5E8EE" />
            </linearGradient>

            <linearGradient id="islandHoverGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="var(--p2)" />
            </linearGradient>

            {/* Glowing pin drop-shadow filter */}
            <filter id="pinGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.25)" />
            </filter>
          </defs>

          {/* ==============================================================
              JAPANESE ISLAND PATHS (Hokkaido, Honshu, Shikoku, Kyushu, Okinawa)
             ============================================================== */}

          {/* 1. HOKKAIDO (North Island) */}
          <path
            d="M720 80 Q760 50 820 55 Q880 70 890 110 Q880 160 840 180 Q800 170 780 195 Q740 215 720 180 Q710 140 700 110 Z"
            fill="url(#islandLandGrad)"
            stroke="var(--card-border)"
            strokeWidth="1.8"
            className="transition-colors hover:fill-amber-50 cursor-pointer"
          />
          <text x="790" y="125" fill="var(--mute)" fontSize="11" fontFamily="Shippori Mincho, serif" opacity="0.6">
            Hokkaido (北海道)
          </text>

          {/* 2. HONSHU - TOHOKU (North Honshu) */}
          <path
            d="M685 190 Q725 210 710 260 Q690 310 660 325 Q640 310 655 260 Q670 210 685 190 Z"
            fill="url(#islandLandGrad)"
            stroke="var(--card-border)"
            strokeWidth="1.8"
            className="transition-colors hover:fill-amber-50"
          />
          <text x="670" y="255" fill="var(--mute)" fontSize="10" fontFamily="Shippori Mincho, serif" opacity="0.5">
            Tohoku (東北)
          </text>

          {/* 3. HONSHU - KANTO (Tokyo / Yokohama / Hakone Plain) */}
          <path
            d="M660 325 Q640 310 610 330 Q585 360 600 380 Q630 380 650 365 Q670 345 660 325 Z"
            fill={selectedRegion === "Kanto" ? "url(#islandHoverGrad)" : "url(#islandLandGrad)"}
            stroke={selectedRegion === "Kanto" ? "var(--red)" : "var(--card-border)"}
            strokeWidth={selectedRegion === "Kanto" ? "2.5" : "1.8"}
            className="transition-all hover:fill-rose-50/80 cursor-pointer"
            onClick={() => setSelectedRegion("Kanto")}
          />
          <text x="635" y="375" fill="var(--ink)" fontSize="10" fontWeight="bold" fontFamily="Shippori Mincho, serif" opacity="0.7">
            KANTO (関東)
          </text>

          {/* 4. HONSHU - CHUBU (Fuji / Alps / Shirakawa / Kanazawa) */}
          <path
            d="M610 330 Q580 270 530 260 Q475 270 480 305 Q515 320 535 340 Q575 365 600 380 Z"
            fill={selectedRegion === "Chubu" ? "url(#islandHoverGrad)" : "url(#islandLandGrad)"}
            stroke={selectedRegion === "Chubu" ? "var(--red)" : "var(--card-border)"}
            strokeWidth={selectedRegion === "Chubu" ? "2.5" : "1.8"}
            className="transition-all hover:fill-rose-50/80 cursor-pointer"
            onClick={() => setSelectedRegion("Chubu")}
          />
          <text x="525" y="280" fill="var(--ink)" fontSize="10" fontWeight="bold" fontFamily="Shippori Mincho, serif" opacity="0.7">
            CHUBU (中部)
          </text>

          {/* 5. HONSHU - KANSAI (Kyoto / Osaka / Nara / Himeji) */}
          <path
            d="M480 305 Q450 315 410 335 Q380 350 405 385 Q445 425 470 395 Q495 365 480 305 Z"
            fill={selectedRegion === "Kansai" ? "url(#islandHoverGrad)" : "url(#islandLandGrad)"}
            stroke={selectedRegion === "Kansai" ? "var(--red)" : "var(--card-border)"}
            strokeWidth={selectedRegion === "Kansai" ? "2.5" : "1.8"}
            className="transition-all hover:fill-rose-50/80 cursor-pointer"
            onClick={() => setSelectedRegion("Kansai")}
          />
          <text x="430" y="320" fill="var(--ink)" fontSize="10" fontWeight="bold" fontFamily="Shippori Mincho, serif" opacity="0.7">
            KANSAI (関西)
          </text>

          {/* 6. HONSHU - CHUGOKU (Hiroshima / Miyajima / West Honshu) */}
          <path
            d="M380 350 Q330 350 270 370 Q240 395 260 410 Q320 405 380 370 Z"
            fill={selectedRegion === "Chugoku" ? "url(#islandHoverGrad)" : "url(#islandLandGrad)"}
            stroke={selectedRegion === "Chugoku" ? "var(--red)" : "var(--card-border)"}
            strokeWidth={selectedRegion === "Chugoku" ? "2.5" : "1.8"}
            className="transition-all hover:fill-rose-50/80 cursor-pointer"
            onClick={() => setSelectedRegion("Chugoku")}
          />
          <text x="310" y="365" fill="var(--ink)" fontSize="10" fontWeight="bold" fontFamily="Shippori Mincho, serif" opacity="0.7">
            CHUGOKU (中国)
          </text>

          {/* 7. SHIKOKU (Island) */}
          <path
            d="M375 390 Q430 405 440 435 Q400 460 350 445 Q335 415 375 390 Z"
            fill="url(#islandLandGrad)"
            stroke="var(--card-border)"
            strokeWidth="1.8"
            className="transition-colors hover:fill-amber-50"
          />
          <text x="375" y="430" fill="var(--mute)" fontSize="10" fontFamily="Shippori Mincho, serif" opacity="0.5">
            Shikoku (四国)
          </text>

          {/* 8. KYUSHU (Southwest Island) */}
          <path
            d="M245 405 Q270 415 270 465 Q250 515 210 525 Q175 490 200 440 Q220 415 245 405 Z"
            fill="url(#islandLandGrad)"
            stroke="var(--card-border)"
            strokeWidth="1.8"
            className="transition-colors hover:fill-amber-50"
          />
          <text x="215" y="475" fill="var(--mute)" fontSize="10" fontFamily="Shippori Mincho, serif" opacity="0.5">
            Kyushu (九州)
          </text>

          {/* 9. OKINAWA (Inside Inset Box at 135, 485) */}
          <path
            d="M100 510 Q120 495 145 475 Q165 485 155 505 Q135 520 100 510 Z"
            fill={selectedRegion === "Okinawa" ? "url(#islandHoverGrad)" : "url(#islandLandGrad)"}
            stroke={selectedRegion === "Okinawa" ? "var(--red)" : "var(--card-border)"}
            strokeWidth={selectedRegion === "Okinawa" ? "2.5" : "1.8"}
            className="transition-all hover:fill-rose-50/80 cursor-pointer"
            onClick={() => setSelectedRegion("Okinawa")}
          />
          {/* Kerama islands microdots */}
          <circle cx="95" cy="515" r="3.5" fill="var(--gold)" />
          <circle cx="85" cy="525" r="3" fill="var(--gold)" />

          {/* ==============================================================
              THE 16 DESTINATIONS INTERACTIVE PINS & LABELS
             ============================================================== */}
          {PIN_COORDINATES.map(pin => {
            const dest = destinationMap.get(pin.destinationId);
            if (!dest) return null;

            const isHovered = hoveredDestinationId === dest.id;
            const matchesRegion = selectedRegion === "All" || pin.regionGroup === selectedRegion;
            const wishlisted = isWishlisted(dest.id);

            return (
              <g
                key={pin.destinationId}
                transform={`translate(${pin.x}, ${pin.y})`}
                onMouseEnter={() => setHoveredDestinationId(dest.id)}
                onMouseLeave={() => setHoveredDestinationId(null)}
                onClick={() => onSelectDestination(dest)}
                className="cursor-pointer group"
                style={{ opacity: matchesRegion ? 1 : 0.25, transition: "opacity 0.3s" }}
              >
                {/* Radar ripple ping animation when hovered */}
                {isHovered && (
                  <>
                    <circle
                      r="18"
                      fill="var(--red)"
                      opacity="0.25"
                      className="animate-ping"
                    />
                    <circle
                      r="12"
                      fill="none"
                      stroke="var(--gold)"
                      strokeWidth="1.5"
                    />
                  </>
                )}

                {/* Pin Shadow */}
                <ellipse cx="0" cy="5" rx="5" ry="2" fill="rgba(0,0,0,0.2)" />

                {/* Torii / Pin Emblem Marker */}
                <path
                  d="M0 -14 C-7 -14 -11 -9 -11 -2 C-11 5 0 12 0 12 C0 12 11 5 11 -2 C11 -9 7 -14 0 -14 Z"
                  fill={isHovered ? "var(--red)" : wishlisted ? "var(--red)" : "var(--header-bg)"}
                  stroke={isHovered ? "#FFFFFF" : "var(--gold)"}
                  strokeWidth="1.8"
                  filter="url(#pinGlow)"
                  className="transition-all duration-200 transform group-hover:scale-125"
                />

                {/* Center dot in pin */}
                <circle
                  cx="0"
                  cy="-4"
                  r="3"
                  fill={isHovered ? "var(--gold)" : wishlisted ? "#FFFFFF" : "#FFFFFF"}
                />

                {/* Compact Map Label */}
                <text
                  x={pin.labelPosition === "left" ? -14 : pin.labelPosition === "right" ? 14 : 0}
                  y={pin.labelPosition === "top" ? -18 : pin.labelPosition === "bottom" ? 22 : -2}
                  textAnchor={
                    pin.labelPosition === "left"
                      ? "end"
                      : pin.labelPosition === "right"
                      ? "start"
                      : "middle"
                  }
                  fill="var(--ink)"
                  fontSize={isHovered ? "11.5" : "9.5"}
                  fontWeight={isHovered ? "bold" : "600"}
                  fontFamily="Shippori Mincho, serif"
                  className="pointer-events-none drop-shadow-xs transition-all"
                >
                  {dest.name.split(" ")[0]}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hovered Destination Interactive Preview Popup */}
        {activeHoveredDest && (
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-30 w-72 sm:w-80 rounded-2xl theme-card-bg border-2 border-[var(--gold)] shadow-xl p-3.5 sm:p-4 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-md">
            <div className="flex items-start gap-3">
              <img
                src={activeHoveredDest.gallery[0]?.url || ""}
                alt=""
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-xl object-cover shrink-0 border theme-border shadow-xs"
              />

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md theme-header-bg text-white">
                    {activeHoveredDest.category.split("&")[0].trim()}
                  </span>
                  <span className="text-xs font-serif text-[#C9414D] font-bold">
                    {activeHoveredDest.japaneseName.split("（")[0]}
                  </span>
                </div>

                <h4 className="font-serif font-bold text-sm text-[var(--ink)] truncate pt-0.5">
                  {activeHoveredDest.name}
                </h4>

                <p className="text-[11px] text-[var(--mute)] flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[var(--gold)] shrink-0" />
                  <span className="truncate">{activeHoveredDest.region}</span>
                </p>
              </div>
            </div>

            <p className="text-xs text-[var(--ink)]/85 line-clamp-2 mt-2 pt-2 border-t theme-border leading-relaxed font-normal">
              {activeHoveredDest.oneLineHook}
            </p>

            <div className="mt-2.5 pt-2 border-t theme-border flex items-center justify-between">
              <span className="text-[10px] text-[var(--mute)]">
                Season: {activeHoveredDest.bestSeason.split("(")[0].trim()}
              </span>

              <button
                onClick={() => onSelectDestination(activeHoveredDest)}
                className="px-3 py-1 rounded-full theme-cta-btn text-white text-[11px] font-bold flex items-center gap-1 shadow-xs hover:scale-105 cursor-pointer"
              >
                <span>Explore</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Map Legend Footer */}
      <div className="p-3 sm:p-4 bg-white/60 border-t theme-border flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--mute)]">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full theme-header-bg border border-[var(--gold)]" />
            <span>Sacred Destination Marker</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full theme-primary-bg" />
            <span>Hovered / Wishlist Destination</span>
          </div>
        </div>

        <span className="text-[11px] italic">
          Click any destination marker to open its comprehensive cultural field guide.
        </span>
      </div>
    </div>
  );
};
