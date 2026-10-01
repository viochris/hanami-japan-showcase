import React, { useState, useMemo } from "react";
import { DESTINATIONS, Destination } from "@/src/data/destinations";
import { useWishlist } from "@/src/context/WishlistContext";
import { useSeason } from "@/src/context/SeasonContext";
import {
  Calendar,
  Clock,
  Plus,
  Trash2,
  GripVertical,
  MoveUp,
  MoveDown,
  Sparkles,
  MapPin,
  Check,
  Copy,
  Send,
  Heart,
  Search,
  Compass
} from "lucide-react";

export interface ItineraryItem {
  instanceId: string;
  destination: Destination;
  timeSlot?: "Morning" | "Afternoon" | "Evening";
}

export interface ItineraryDay {
  dayNumber: number;
  title: string;
  items: ItineraryItem[];
}

interface ItineraryBuilderProps {
  onApplyToTripForm?: (itinerarySummary: string) => void;
  initialDestinationName?: string;
}

export const ItineraryBuilder: React.FC<ItineraryBuilderProps> = ({
  onApplyToTripForm,
  initialDestinationName
}) => {
  const { wishlist } = useWishlist();
  const { seasonInfo } = useSeason();

  // Initial 3-day authentic sample schedule
  const [days, setDays] = useState<ItineraryDay[]>(() => {
    const fuji = DESTINATIONS.find(d => d.id === "mount-fuji");
    const fushimi = DESTINATIONS.find(d => d.id === "fushimi-inari-taisha");
    const shibuya = DESTINATIONS.find(d => d.id === "shibuya-crossing");
    const hakone = DESTINATIONS.find(d => d.id === "hakone");
    const arashiyama = DESTINATIONS.find(d => d.id === "arashiyama-bamboo-grove");
    const sensoji = DESTINATIONS.find(d => d.id === "senso-ji-temple");

    return [
      {
        dayNumber: 1,
        title: "Tokyo Metropolis & Ancient Heritage",
        items: [
          ...(sensoji ? [{ instanceId: "item-init-1", destination: sensoji, timeSlot: "Morning" as const }] : []),
          ...(shibuya ? [{ instanceId: "item-init-2", destination: shibuya, timeSlot: "Evening" as const }] : [])
        ]
      },
      {
        dayNumber: 2,
        title: "Sacred Fuji & Mountain Onsen",
        items: [
          ...(fuji ? [{ instanceId: "item-init-3", destination: fuji, timeSlot: "Morning" as const }] : []),
          ...(hakone ? [{ instanceId: "item-init-4", destination: hakone, timeSlot: "Afternoon" as const }] : [])
        ]
      },
      {
        dayNumber: 3,
        title: "Kyoto Torii Paths & Bamboo Whispers",
        items: [
          ...(fushimi ? [{ instanceId: "item-init-5", destination: fushimi, timeSlot: "Morning" as const }] : []),
          ...(arashiyama ? [{ instanceId: "item-init-6", destination: arashiyama, timeSlot: "Afternoon" as const }] : [])
        ]
      }
    ];
  });

  // Drag and drop states
  const [draggedDestination, setDraggedDestination] = useState<Destination | null>(null);
  const [draggedItemSource, setDraggedItemSource] = useState<{ dayIndex: number; itemIndex: number } | null>(null);
  const [dropTargetDayIndex, setDropTargetDayIndex] = useState<number | null>(null);

  // Attraction drawer filters
  const [searchFilter, setSearchFilter] = useState("");
  const [filterWishlistOnly, setFilterWishlistOnly] = useState(false);
  const [copied, setCopied] = useState(false);
  const [applied, setApplied] = useState(false);

  // Available attraction pool
  const filteredAttractions = useMemo(() => {
    return DESTINATIONS.filter(d => {
      if (filterWishlistOnly && !wishlist.includes(d.id)) return false;
      if (searchFilter.trim()) {
        const q = searchFilter.toLowerCase();
        return (
          d.name.toLowerCase().includes(q) ||
          d.region.toLowerCase().includes(q) ||
          d.japaneseName.includes(q)
        );
      }
      return true;
    });
  }, [searchFilter, filterWishlistOnly, wishlist]);

  // Check which destinations are currently scheduled in the itinerary
  const scheduledDestinationIds = useMemo(() => {
    const ids = new Set<string>();
    days.forEach(day => {
      day.items.forEach(item => ids.add(item.destination.id));
    });
    return ids;
  }, [days]);

  // Handler: Add attraction to specific day
  const handleAddAttractionToDay = (destination: Destination, dayIndex: number) => {
    const newItem: ItineraryItem = {
      instanceId: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      destination,
      timeSlot: "Morning"
    };

    setDays(prev => {
      const next = [...prev];
      if (next[dayIndex]) {
        next[dayIndex] = {
          ...next[dayIndex],
          items: [...next[dayIndex].items, newItem]
        };
      }
      return next;
    });
  };

  // Handler: Remove item from day
  const handleRemoveItem = (dayIndex: number, itemIndex: number) => {
    setDays(prev => {
      const next = [...prev];
      if (next[dayIndex]) {
        next[dayIndex] = {
          ...next[dayIndex],
          items: next[dayIndex].items.filter((_, idx) => idx !== itemIndex)
        };
      }
      return next;
    });
  };

  // Handler: Move item up or down within day
  const handleMoveItem = (dayIndex: number, itemIndex: number, direction: "up" | "down") => {
    setDays(prev => {
      const next = [...prev];
      const items = [...next[dayIndex].items];
      const targetIndex = direction === "up" ? itemIndex - 1 : itemIndex + 1;
      if (targetIndex >= 0 && targetIndex < items.length) {
        const temp = items[itemIndex];
        items[itemIndex] = items[targetIndex];
        items[targetIndex] = temp;
        next[dayIndex] = { ...next[dayIndex], items };
      }
      return next;
    });
  };

  // Handler: Change time slot
  const handleChangeTimeSlot = (dayIndex: number, itemIndex: number, slot: "Morning" | "Afternoon" | "Evening") => {
    setDays(prev => {
      const next = [...prev];
      const items = [...next[dayIndex].items];
      items[itemIndex] = { ...items[itemIndex], timeSlot: slot };
      next[dayIndex] = { ...next[dayIndex], items };
      return next;
    });
  };

  // Handler: Add new Day
  const handleAddDay = () => {
    setDays(prev => {
      const newDayNum = prev.length + 1;
      return [
        ...prev,
        {
          dayNumber: newDayNum,
          title: `Day ${newDayNum}: Explore Further`,
          items: []
        }
      ];
    });
  };

  // Handler: Remove Day
  const handleRemoveDay = (dayIndex: number) => {
    if (days.length <= 1) return;
    setDays(prev => {
      const remaining = prev.filter((_, idx) => idx !== dayIndex);
      return remaining.map((day, idx) => ({
        ...day,
        dayNumber: idx + 1
      }));
    });
  };

  // Drag and drop events
  const handleDragStartFromPool = (e: React.DragEvent, dest: Destination) => {
    e.dataTransfer.setData("application/json", JSON.stringify({ type: "new", destinationId: dest.id }));
    setDraggedDestination(dest);
  };

  const handleDragStartFromDay = (e: React.DragEvent, dayIndex: number, itemIndex: number) => {
    e.dataTransfer.setData("application/json", JSON.stringify({ type: "reorder", dayIndex, itemIndex }));
    setDraggedItemSource({ dayIndex, itemIndex });
  };

  const handleDragOverDay = (e: React.DragEvent, dayIndex: number) => {
    e.preventDefault();
    setDropTargetDayIndex(dayIndex);
  };

  const handleDropOnDay = (e: React.DragEvent, targetDayIndex: number) => {
    e.preventDefault();
    setDropTargetDayIndex(null);

    try {
      const rawData = e.dataTransfer.getData("application/json");
      if (!rawData) return;
      const data = JSON.parse(rawData);

      if (data.type === "new" && data.destinationId) {
        const dest = DESTINATIONS.find(d => d.id === data.destinationId);
        if (dest) {
          handleAddAttractionToDay(dest, targetDayIndex);
        }
      } else if (data.type === "reorder" && data.dayIndex !== undefined && data.itemIndex !== undefined) {
        const sourceDayIdx = data.dayIndex;
        const sourceItemIdx = data.itemIndex;

        setDays(prev => {
          const next = [...prev];
          const [movedItem] = next[sourceDayIdx].items.splice(sourceItemIdx, 1);
          if (movedItem) {
            next[targetDayIndex].items.push(movedItem);
          }
          return next;
        });
      }
    } catch {
      // fallback
    }

    setDraggedDestination(null);
    setDraggedItemSource(null);
  };

  // Generate itinerary formatted text
  const generateItinerarySummary = () => {
    const lines: string[] = ["Custom Japan Itinerary:"];
    days.forEach(day => {
      lines.push(`\n[Day ${day.dayNumber}: ${day.title}]`);
      if (day.items.length === 0) {
        lines.push("  - Free leisure and local exploration");
      } else {
        day.items.forEach(item => {
          lines.push(`  - (${item.timeSlot || "Day"}) ${item.destination.name} [${item.destination.region}] — ${item.destination.suggestedDuration}`);
        });
      }
    });
    return lines.join("\n");
  };

  // Copy to clipboard
  const handleCopyItinerary = () => {
    const text = generateItinerarySummary();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Apply directly to consultation form
  const handleApplyToTripRequest = () => {
    const text = generateItinerarySummary();
    if (onApplyToTripForm) {
      onApplyToTripForm(text);
      setApplied(true);
      setTimeout(() => setApplied(false), 3000);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner & Quick Actions */}
      <div className="theme-card-bg p-5 sm:p-6 rounded-2xl border theme-border shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg sm:text-xl font-bold text-[var(--ink)]">
              Interactive Itinerary Builder
            </span>
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-md theme-header-bg text-white">
              {days.length} Days Schedule
            </span>
          </div>
          <p className="text-xs text-[var(--mute)] max-w-xl">
            Drag destinations from the attraction drawer into any day, or use the quick buttons. Reorder visits and customize your travel flow.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
          <button
            onClick={handleAddDay}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold theme-tag-bg border theme-border hover:opacity-90 transition-all cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5 theme-primary-text" />
            <span>Add Day</span>
          </button>

          <button
            onClick={handleCopyItinerary}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold bg-white text-[var(--ink)] border theme-border hover:bg-white/80 transition-all cursor-pointer shadow-xs"
            title="Copy formatted itinerary to clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied!" : "Copy Schedule"}</span>
          </button>

          {onApplyToTripForm && (
            <button
              onClick={handleApplyToTripRequest}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold theme-header-bg text-white transition-all cursor-pointer shadow-sm hover:opacity-90"
              title="Apply this schedule into the consultation inquiry form below"
            >
              {applied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Send className="w-3.5 h-3.5" />}
              <span>{applied ? "Itinerary Attached!" : "Attach to Form"}</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Left = Day-by-Day Schedule, Right = Attraction Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ==============================================================
            LEFT COLUMN: Day-by-Day Schedule (7 cols on lg)
           ============================================================== */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-base font-bold text-[var(--ink)] flex items-center gap-1.5">
              <Calendar className="w-4 h-4 theme-primary-text" />
              <span>Day-by-Day Itinerary Schedule</span>
            </h3>
            <span className="text-xs text-[var(--mute)]">
              Drop attractions into any day container
            </span>
          </div>

          <div className="space-y-4">
            {days.map((day, dayIndex) => {
              const isDropActive = dropTargetDayIndex === dayIndex;

              return (
                <div
                  key={day.dayNumber}
                  onDragOver={e => handleDragOverDay(e, dayIndex)}
                  onDrop={e => handleDropOnDay(e, dayIndex)}
                  className={`theme-card-bg rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isDropActive
                      ? "border-[var(--red)] ring-2 ring-[var(--red)]/30 scale-[1.01]"
                      : "theme-border shadow-xs"
                  }`}
                >
                  {/* Day Header */}
                  <div className="p-3.5 sm:p-4 border-b theme-border flex items-center justify-between gap-3 flex-wrap bg-white/40">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-full theme-primary-bg text-white font-serif font-bold text-xs flex items-center justify-center shadow-xs">
                        {day.dayNumber}
                      </span>
                      <div>
                        <input
                          type="text"
                          value={day.title}
                          onChange={e => {
                            const val = e.target.value;
                            setDays(prev => {
                              const next = [...prev];
                              next[dayIndex] = { ...next[dayIndex], title: val };
                              return next;
                            });
                          }}
                          className="font-serif font-bold text-sm sm:text-base text-[var(--ink)] bg-transparent border-b border-transparent hover:border-[var(--card-border)] focus:border-[var(--red)] focus:outline-none transition-colors max-w-[240px] sm:max-w-xs"
                          placeholder="e.g. Kyoto Temples & Gardens"
                        />
                        <div className="text-[11px] text-[var(--mute)]">
                          {day.items.length} {day.items.length === 1 ? "attraction" : "attractions"} scheduled
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {days.length > 1 && (
                        <button
                          onClick={() => handleRemoveDay(dayIndex)}
                          className="p-1.5 text-[var(--mute)] hover:text-red-600 transition-colors rounded-lg hover:bg-red-50 cursor-pointer"
                          title={`Delete Day ${day.dayNumber}`}
                          aria-label={`Delete Day ${day.dayNumber}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Day Attractions List */}
                  <div className="p-3.5 sm:p-4 space-y-2.5 min-h-[90px]">
                    {day.items.length === 0 ? (
                      <div
                        className={`py-8 text-center border-2 border-dashed rounded-xl transition-colors ${
                          isDropActive ? "border-[var(--red)] bg-white/60" : "theme-border bg-white/20"
                        }`}
                      >
                        <Compass className="w-6 h-6 mx-auto text-[var(--mute)] mb-1 opacity-70" />
                        <p className="text-xs text-[var(--mute)]">
                          {isDropActive
                            ? "Release mouse to drop attraction here"
                            : "Drag an attraction here or click '+ Add' from drawer"}
                        </p>
                      </div>
                    ) : (
                      day.items.map((item, itemIndex) => {
                        const heroImg = item.destination.gallery[0]?.url || "";

                        return (
                          <div
                            key={item.instanceId}
                            draggable
                            onDragStart={e => handleDragStartFromDay(e, dayIndex, itemIndex)}
                            className="group relative flex items-center justify-between p-2.5 rounded-xl bg-white border theme-border shadow-xs hover:shadow-sm transition-all cursor-grab active:cursor-grabbing"
                          >
                            <div className="flex items-center gap-3 overflow-hidden">
                              <div
                                className="text-[var(--mute)] opacity-40 group-hover:opacity-100 transition-opacity cursor-grab shrink-0"
                                title="Drag to reorder"
                              >
                                <GripVertical className="w-4 h-4" />
                              </div>

                              {heroImg && (
                                <img
                                  src={heroImg}
                                  alt=""
                                  referrerPolicy="no-referrer"
                                  className="w-12 h-12 rounded-lg object-cover shrink-0 border theme-border"
                                />
                              )}

                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-serif font-bold text-xs sm:text-sm text-[var(--ink)] truncate">
                                    {item.destination.name}
                                  </h4>
                                  <span className="text-[10px] font-serif text-[#C9414D] shrink-0">
                                    {item.destination.japaneseName.split("（")[0]}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] text-[var(--mute)]">
                                  <span className="flex items-center gap-0.5">
                                    <MapPin className="w-3 h-3 text-[var(--gold)]" />
                                    {item.destination.region}
                                  </span>
                                  <span>•</span>
                                  <span>{item.destination.suggestedDuration.split("(")[0].trim()}</span>
                                </div>
                              </div>
                            </div>

                            {/* Actions & Time slot selector */}
                            <div className="flex items-center gap-2 shrink-0">
                              <select
                                value={item.timeSlot || "Morning"}
                                onChange={e =>
                                  handleChangeTimeSlot(
                                    dayIndex,
                                    itemIndex,
                                    e.target.value as "Morning" | "Afternoon" | "Evening"
                                  )
                                }
                                className="text-[11px] font-semibold py-1 px-2 rounded-md bg-[var(--tag-bg)] text-[var(--ink)] border theme-border focus:outline-none cursor-pointer"
                              >
                                <option value="Morning">Morning</option>
                                <option value="Afternoon">Afternoon</option>
                                <option value="Evening">Evening</option>
                              </select>

                              <div className="flex flex-col gap-0.5">
                                <button
                                  disabled={itemIndex === 0}
                                  onClick={() => handleMoveItem(dayIndex, itemIndex, "up")}
                                  className="p-0.5 text-[var(--mute)] hover:text-[var(--ink)] disabled:opacity-20 cursor-pointer"
                                  title="Move up"
                                >
                                  <MoveUp className="w-3 h-3" />
                                </button>
                                <button
                                  disabled={itemIndex === day.items.length - 1}
                                  onClick={() => handleMoveItem(dayIndex, itemIndex, "down")}
                                  className="p-0.5 text-[var(--mute)] hover:text-[var(--ink)] disabled:opacity-20 cursor-pointer"
                                  title="Move down"
                                >
                                  <MoveDown className="w-3 h-3" />
                                </button>
                              </div>

                              <button
                                onClick={() => handleRemoveItem(dayIndex, itemIndex)}
                                className="p-1 text-[var(--mute)] hover:text-red-600 transition-colors cursor-pointer"
                                title="Remove from this day"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ==============================================================
            RIGHT COLUMN: Available Attractions Pool (5 cols on lg)
           ============================================================== */}
        <div className="lg:col-span-5 theme-card-bg rounded-2xl border theme-border shadow-xs p-4 sm:p-5 space-y-4">
          <div className="space-y-1">
            <h3 className="font-serif text-base font-bold text-[var(--ink)] flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 theme-primary-text" />
                <span>Attraction Drawer (16 Places)</span>
              </span>
              <span className="text-xs font-sans text-[var(--mute)] font-normal">
                {filteredAttractions.length} available
              </span>
            </h3>
            <p className="text-xs text-[var(--mute)]">
              Drag cards to any day on the left, or use the "+ Add to Day" menu.
            </p>
          </div>

          {/* Search & Filters */}
          <div className="space-y-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--mute)]" />
              <input
                type="text"
                value={searchFilter}
                onChange={e => setSearchFilter(e.target.value)}
                placeholder="Filter by name or city..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-white border theme-border focus:outline-none focus:border-[var(--red)] text-[var(--ink)] placeholder-[var(--mute)] transition-colors"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilterWishlistOnly(!filterWishlistOnly)}
                className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors flex items-center gap-1 cursor-pointer ${
                  filterWishlistOnly
                    ? "theme-primary-bg text-white border-transparent"
                    : "bg-white text-[var(--ink)] theme-border hover:bg-white/80"
                }`}
              >
                <Heart className={`w-3 h-3 ${filterWishlistOnly ? "fill-white" : "theme-primary-text"}`} />
                <span>My Wishlist ({wishlist.length})</span>
              </button>
            </div>
          </div>

          {/* Attraction Cards Pool */}
          <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
            {filteredAttractions.map(dest => {
              const isScheduled = scheduledDestinationIds.has(dest.id);
              const heroImg = dest.gallery[0]?.url || "";

              return (
                <div
                  key={dest.id}
                  draggable
                  onDragStart={e => handleDragStartFromPool(e, dest)}
                  className={`p-2.5 rounded-xl border bg-white transition-all duration-200 cursor-grab active:cursor-grabbing ${
                    isScheduled
                      ? "theme-border opacity-85 hover:opacity-100"
                      : "theme-border hover:border-[var(--red)] shadow-2xs hover:shadow-xs"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={heroImg}
                      alt=""
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-lg object-cover shrink-0 border theme-border"
                    />

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="font-serif font-bold text-xs text-[var(--ink)] truncate">
                          {dest.name}
                        </h4>
                        {isScheduled && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-emerald-100 text-emerald-800 font-semibold shrink-0">
                            Scheduled
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-[10px] text-[var(--mute)]">
                        <span className="truncate">{dest.region}</span>
                        <span>•</span>
                        <span className="shrink-0">{dest.category}</span>
                      </div>
                    </div>
                  </div>

                  {/* Add to day quick buttons */}
                  <div className="mt-2 pt-2 border-t theme-border flex items-center justify-between text-[11px]">
                    <span className="text-[10px] text-[var(--mute)]">
                      {dest.suggestedDuration.split("(")[0].trim()}
                    </span>

                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-[var(--mute)] mr-1">Add to:</span>
                      {days.map((day, dayIdx) => (
                        <button
                          key={day.dayNumber}
                          onClick={() => handleAddAttractionToDay(dest, dayIdx)}
                          className="px-2 py-0.5 rounded-md text-[10px] font-bold theme-tag-bg border theme-border hover:opacity-80 transition-all cursor-pointer"
                          title={`Add to Day ${day.dayNumber}`}
                        >
                          D{day.dayNumber}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
