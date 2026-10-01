import React, { useState, useMemo } from "react";
import { DESTINATIONS, Destination, DestinationCategory } from "@/src/data/destinations";
import { DestinationCard } from "@/src/components/destinations/DestinationCard";
import { RegionalMap } from "@/src/components/destinations/RegionalMap";
import { useWishlist } from "@/src/context/WishlistContext";
import { KanjiWatermark } from "@/src/components/decoration/KanjiWatermark";
import {
  Search,
  Heart,
  Trees,
  Building2,
  Landmark,
  Waves,
  Sparkles,
  X,
  LayoutGrid,
  Compass,
  MapPin
} from "lucide-react";

export type ThematicCategory = "All" | "Nature" | "City" | "History" | "Onsen";

interface ThematicCategoryConfig {
  id: ThematicCategory;
  label: string;
  japanese: string;
  icon: React.ComponentType<{ className?: string }>;
}

const THEMATIC_CATEGORIES: ThematicCategoryConfig[] = [
  { id: "All", label: "All", japanese: "全て", icon: Sparkles },
  { id: "Nature", label: "Nature", japanese: "自然", icon: Trees },
  { id: "City", label: "City", japanese: "都会", icon: Building2 },
  { id: "History", label: "History", japanese: "歴史", icon: Landmark },
  { id: "Onsen", label: "Onsen", japanese: "温泉", icon: Waves }
];

// Curated mapping of all 16 Japanese destinations to thematic categories
const DESTINATION_THEMES: Record<string, ThematicCategory[]> = {
  "mount-fuji": ["Nature"],
  "fushimi-inari-taisha": ["History"],
  "kinkaku-ji": ["History"],
  "arashiyama-bamboo-grove": ["Nature"],
  "himeji-castle": ["History"],
  "osaka-castle": ["History", "City"],
  "matsumoto-castle": ["History"],
  "senso-ji-temple": ["History", "City"],
  "itsukushima-shrine": ["History"],
  "nara-park": ["Nature"],
  "kenroku-en-garden": ["Nature", "Onsen"],
  "shirakawa-go": ["History", "Onsen"],
  "hakone": ["Onsen", "Nature"],
  "shibuya-crossing": ["City"],
  "dotonbori": ["City"],
  "okinawa": ["Nature"]
};

interface DestinationsPageProps {
  onSelectDestination: (dest: Destination) => void;
  initialCategory?: DestinationCategory | ThematicCategory;
  initialWishlistOnly?: boolean;
}

export const DestinationsPage: React.FC<DestinationsPageProps> = ({
  onSelectDestination,
  initialCategory = "All",
  initialWishlistOnly = false
}) => {
  // Convert incoming category to thematic category if applicable
  const initialTheme: ThematicCategory = useMemo(() => {
    if (["All", "Nature", "City", "History", "Onsen"].includes(initialCategory)) {
      return initialCategory as ThematicCategory;
    }
    if (initialCategory === "Nature & Mountains" || initialCategory === "Islands & Coast") {
      return "Nature";
    }
    if (initialCategory === "Modern Cityscapes") {
      return "City";
    }
    if (initialCategory === "Shrines & Temples" || initialCategory === "Castles") {
      return "History";
    }
    return "All";
  }, [initialCategory]);

  const [activeCategory, setActiveCategory] = useState<ThematicCategory>(initialTheme);
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlistOnly, setWishlistOnly] = useState(initialWishlistOnly);
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const { wishlist, count: wishlistCount } = useWishlist();

  // Calculate destination counts per thematic category
  const categoryCounts = useMemo(() => {
    const counts: Record<ThematicCategory, number> = {
      All: DESTINATIONS.length,
      Nature: 0,
      City: 0,
      History: 0,
      Onsen: 0
    };
    DESTINATIONS.forEach(d => {
      const themes = DESTINATION_THEMES[d.id] || [];
      themes.forEach(t => {
        if (counts[t] !== undefined) counts[t]++;
      });
    });
    return counts;
  }, []);

  // Filtered destination list with smooth reactive updates
  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter(item => {
      // Thematic category match
      if (activeCategory !== "All") {
        const itemThemes = DESTINATION_THEMES[item.id] || [];
        if (!itemThemes.includes(activeCategory)) {
          return false;
        }
      }

      // Wishlist toggle match
      if (wishlistOnly && !wishlist.includes(item.id)) {
        return false;
      }

      // Text search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesRegion = item.region.toLowerCase().includes(query);
        const matchesHook = item.oneLineHook.toLowerCase().includes(query);
        const matchesJapanese = item.japaneseName.includes(query);
        if (!matchesName && !matchesRegion && !matchesHook && !matchesJapanese) {
          return false;
        }
      }

      return true;
    });
  }, [activeCategory, wishlistOnly, wishlist, searchQuery]);

  return (
    <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14 space-y-6 sm:space-y-8">
      {/* Header with authentic Japanese watermark */}
      <div className="relative text-center max-w-3xl mx-auto space-y-3 pt-2">
        <KanjiWatermark kanji="名所" position="center" className="-top-10" />

        <p className="eyebrow text-xs font-bold uppercase tracking-[0.16em] theme-primary-text">
          Sixteen Curated Sanctuaries
        </p>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[var(--ink)] heading-accent">
          Destinations
        </h1>

        <p className="text-sm sm:text-base text-[var(--mute)] font-normal max-w-xl mx-auto pt-1">
          Scan first, explore the rich cultural insights when a place calls to you.
        </p>

        {/* View Mode Switcher: Grid View vs Interactive Regional Map */}
        <div className="pt-2 flex items-center justify-center">
          <div className="inline-flex p-1 rounded-full theme-tag-bg border theme-border shadow-xs">
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "theme-header-bg text-white shadow-xs scale-102"
                  : "text-[var(--ink)]/80 hover:text-[var(--ink)]"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid Cards (16 Places)</span>
            </button>

            <button
              onClick={() => setViewMode("map")}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                viewMode === "map"
                  ? "theme-header-bg text-white shadow-xs scale-102"
                  : "text-[var(--ink)]/80 hover:text-[var(--ink)]"
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Interactive Regional Map (日本地図)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Render based on Active View Mode */}
      {viewMode === "map" ? (
        <div className="space-y-4 animate-in fade-in duration-300">
          <RegionalMap onSelectDestination={onSelectDestination} />

          <div className="text-center pt-2">
            <button
              onClick={() => setViewMode("grid")}
              className="text-xs font-bold theme-primary-text hover:underline cursor-pointer inline-flex items-center gap-1"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Switch back to Grid Cards view</span>
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* ==============================================================
              STICKY CATEGORY FILTER & SEARCH BAR
              Filters placed on top, search bar placed cleanly below
             ============================================================== */}
          <div className="sticky top-16 sm:top-18 z-40 theme-card-bg backdrop-blur-md border-y theme-border shadow-xs py-3 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 transition-all">
            <div className="max-w-[1160px] mx-auto flex flex-col items-center gap-2.5">
              {/* 1. FILTER-FILTER DI ATAS */}
              <div
                role="tablist"
                aria-label="Filter destinations by category"
                className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar py-1 gap-1.5 sm:gap-2 w-full"
              >
                {THEMATIC_CATEGORIES.map(cat => {
                  const Icon = cat.icon;
                  const isSelected = activeCategory === cat.id;
                  const count = categoryCounts[cat.id];

                  return (
                    <button
                      key={cat.id}
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`group relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer shrink-0 ${
                        isSelected
                          ? "theme-header-bg text-white shadow-md scale-102"
                          : "theme-tag-bg text-[var(--ink)] border theme-border hover:opacity-90"
                      }`}
                    >
                      <Icon
                        className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110 ${
                          isSelected ? "text-[var(--gold)]" : "theme-primary-text"
                        }`}
                      />
                      <span>{cat.label}</span>
                      <span
                        className={`text-[10px] font-serif transition-opacity ${
                          isSelected ? "text-white/80" : "text-[var(--mute)]"
                        }`}
                      >
                        {cat.japanese}
                      </span>
                      <span
                        className={`ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                          isSelected
                            ? "bg-white/20 text-white"
                            : "bg-white/60 text-[var(--ink)]/70"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}

                {/* Quick Wishlist Toggle */}
                <button
                  onClick={() => setWishlistOnly(!wishlistOnly)}
                  className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer shrink-0 border ${
                    wishlistOnly
                      ? "theme-primary-bg text-white border-transparent shadow-sm"
                      : "bg-white/80 theme-primary-text theme-border hover:bg-white"
                  }`}
                  title="Filter by saved destinations"
                  aria-pressed={wishlistOnly}
                >
                  <Heart className={`w-3.5 h-3.5 ${wishlistOnly ? "fill-white" : ""}`} />
                  <span className="hidden sm:inline">Saved</span>
                  <span>({wishlistCount})</span>
                </button>
              </div>

              {/* 2. SEARCH BAR DI BAWAH */}
              <div className="w-full flex items-center justify-center gap-3">
                <div className="relative w-full max-w-lg">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--mute)]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search Kyoto, Tokyo, Castle, onsen, shrine..."
                    className="w-full pl-9 pr-9 py-2 text-xs sm:text-sm rounded-full bg-white border theme-border focus:outline-none focus:border-[var(--red)] text-[var(--ink)] placeholder-[var(--mute)] shadow-2xs transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--mute)] hover:text-[var(--red)] cursor-pointer p-0.5"
                      title="Clear search"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <span className="text-[11px] text-[var(--mute)] shrink-0 hidden sm:inline">
                  Showing <strong className="text-[var(--ink)]">{filteredDestinations.length}</strong> of 16
                </span>
              </div>
            </div>
          </div>

          {/* Optional Quick Link to Map */}
          <div className="flex items-center justify-between p-3 rounded-2xl theme-tag-bg border theme-border text-xs">
            <span className="text-[var(--mute)] flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[var(--gold)]" />
              <span>Prefer geographical browsing across Honshu, Kansai, and the islands?</span>
            </span>
            <button
              onClick={() => setViewMode("map")}
              className="font-bold theme-primary-text hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>Open Regional Map</span>
              <Compass className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* ==============================================================
              DESTINATIONS GRID WITH SMOOTH FILTER TRANSITION ANIMATION
             ============================================================== */}
          <div
            key={`${activeCategory}-${wishlistOnly}-${searchQuery ? "search" : "idle"}`}
            className="animate-in fade-in zoom-in-[0.98] slide-in-from-bottom-2 duration-300 ease-out"
          >
            {filteredDestinations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredDestinations.map(destination => {
                  const originalIndex = DESTINATIONS.findIndex(d => d.id === destination.id);
                  return (
                    <DestinationCard
                      key={destination.id}
                      destination={destination}
                      index={originalIndex >= 0 ? originalIndex : undefined}
                      onSelect={onSelectDestination}
                    />
                  );
                })}
              </div>
            ) : (
              /* Empty Filter State */
              <div className="text-center py-16 bg-[#FFF8FA] rounded-3xl border border-[#F7C4D6] max-w-lg mx-auto p-8 space-y-4 shadow-sm animate-in fade-in duration-300">
                <div className="w-12 h-12 rounded-full bg-[#FFEAF1] text-[#C9414D] flex items-center justify-center mx-auto text-xl font-serif">
                  空
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-bold text-[#2B2440]">
                    No destinations found
                  </h3>
                  <p className="text-xs text-[#8B7E8C] max-w-sm mx-auto">
                    {wishlistOnly
                      ? "You haven't saved any destinations to your wishlist yet. Tap the heart on any card to save it."
                      : `No destination in "${activeCategory}" matches "${searchQuery}".`}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setActiveCategory("All");
                    setSearchQuery("");
                    setWishlistOnly(false);
                  }}
                  className="px-5 py-2 text-xs font-bold rounded-full bg-[#2B2440] text-white hover:bg-[#1C182A] transition-all cursor-pointer shadow-xs hover:scale-105"
                >
                  Reset all filters
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
