import React, { useState, useRef, useEffect } from "react";
import { useSeason, SEASONS, Season } from "@/src/context/SeasonContext";
import { Flower2, Sprout, Sparkles, Snowflake, ChevronDown } from "lucide-react";

export const SeasonToggle: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { season, seasonInfo, setSeason } = useSeason();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getSeasonIcon = (s: Season) => {
    switch (s) {
      case "spring":
        return <Flower2 className="w-3.5 h-3.5 text-[#C9414D]" />;
      case "summer":
        return <Sprout className="w-3.5 h-3.5 text-[#238254]" />;
      case "autumn":
        return <Sparkles className="w-3.5 h-3.5 text-[#C84B26]" />;
      case "winter":
        return <Snowflake className="w-3.5 h-3.5 text-[#306F99]" />;
    }
  };

  const seasonsList: Season[] = ["spring", "summer", "autumn", "winter"];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full border border-white/20 bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition-all cursor-pointer shadow-xs"
        title={`Current Season: ${seasonInfo.label} (${seasonInfo.sublabel}). Click to change.`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`Seasonal theme selector: currently ${seasonInfo.label}`}
      >
        <span className="font-serif text-sm font-bold text-[#D4AF6A] leading-none" aria-hidden="true">
          {seasonInfo.kanji}
        </span>
        {getSeasonIcon(season)}
        {!compact && (
          <span className="hidden sm:inline font-sans text-xs">
            {seasonInfo.label}
          </span>
        )}
        <ChevronDown className={`w-3 h-3 text-white/70 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Popover Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#2B2440] border border-[#D4AF6A]/40 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-1.5 text-[10px] uppercase font-bold tracking-widest text-[#D4AF6A] border-b border-white/10 mb-1">
            Select Season (四季)
          </div>
          <div className="space-y-1">
            {seasonsList.map(s => {
              const info = SEASONS[s];
              const isSelected = season === s;
              return (
                <button
                  key={s}
                  onClick={() => {
                    setSeason(s);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-all cursor-pointer ${
                    isSelected
                      ? "bg-white/20 text-white font-bold shadow-xs border border-white/20"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-serif text-base font-bold text-[#D4AF6A] w-4 text-center">
                      {info.kanji}
                    </span>
                    <div>
                      <div className="font-medium flex items-center gap-1.5">
                        <span>{info.label}</span>
                        <span className="text-[10px] text-white/60">({info.sublabel})</span>
                      </div>
                      <div className="text-[10px] text-white/50 leading-tight">
                        {info.tagline.split("&")[0].trim()}
                      </div>
                    </div>
                  </div>
                  <div>{getSeasonIcon(s)}</div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
