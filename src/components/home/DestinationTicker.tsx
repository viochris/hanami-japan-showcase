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

  const kanjiSeparator =
    season === "spring" ? "花" : season === "summer" ? "葉" : season === "autumn" ? "紅" : "雪";

  const renderDestList = (keyPrefix: string) => (
    <div className="inline-flex items-center shrink-0">
      {DESTINATIONS.map((dest, idx) => (
        <span
          key={`${keyPrefix}-${dest.id}-${idx}`}
          onClick={() => onSelectDestinationByName?.(dest.name)}
          className="inline-flex items-center gap-3 px-5 py-1 whitespace-nowrap cursor-pointer hover:opacity-75 transition-opacity"
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
  );

  return (
    <div
      aria-label="Popular destinations ticker"
      className="ticker-wrap select-none shadow-xs border-y transition-colors duration-400 overflow-hidden"
    >
      <div className="ticker-content flex items-center">
        {renderDestList("track-1")}
        {renderDestList("track-2")}
      </div>
    </div>
  );
};
