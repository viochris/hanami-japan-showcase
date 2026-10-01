import React from "react";
import { DESTINATIONS } from "@/src/data/destinations";
import { useSeason } from "@/src/context/SeasonContext";

interface DestinationTickerProps {
  onSelectDestinationByName?: (name: string) => void;
}

export const DestinationTicker: React.FC<DestinationTickerProps> = ({
  onSelectDestinationByName
}) => {
  const { season } = useSeason();
  // Duplicate list to achieve a seamless infinite marquee loop
  const tickerItems = [...DESTINATIONS, ...DESTINATIONS];

  const kanjiSeparator =
    season === "spring" ? "花" : season === "summer" ? "葉" : season === "autumn" ? "紅" : "雪";

  return (
    <div
      aria-hidden="true"
      className="ticker-wrap select-none shadow-xs border-y transition-colors duration-400"
    >
      <div className="ticker-inner flex items-center">
        {tickerItems.map((dest, idx) => (
          <span
            key={idx}
            onClick={() => onSelectDestinationByName?.(dest.name)}
            className="inline-flex items-center gap-3 px-5 py-0.5 whitespace-nowrap cursor-pointer transition-colors"
          >
            <span className="font-serif tracking-wide text-sm sm:text-base font-bold text-[var(--ink)]">
              {dest.name}
            </span>
            <span className="text-xs text-[var(--mute)] font-normal">
              ({dest.region.split("/")[0].trim()})
            </span>
            <i
              className="not-italic text-sm font-serif font-bold ml-2 select-none"
              style={{ color: "var(--red)" }}
              aria-hidden="true"
            >
              {kanjiSeparator}
            </i>
          </span>
        ))}
      </div>
    </div>
  );
};
