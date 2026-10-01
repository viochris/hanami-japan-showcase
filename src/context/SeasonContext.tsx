import React, { createContext, useContext, useState, useEffect } from "react";

export type Season = "spring" | "summer" | "autumn" | "winter";

export interface SeasonInfo {
  id: Season;
  label: string;
  sublabel: string;
  kanji: string;
  iconName: string;
  badgeColor: string;
  tagline: string;
}

export const SEASONS: Record<Season, SeasonInfo> = {
  spring: {
    id: "spring",
    label: "Spring",
    sublabel: "Sakura",
    kanji: "春",
    iconName: "cherry-blossom",
    badgeColor: "#C9414D",
    tagline: "Cherry blossoms & awakening gardens"
  },
  summer: {
    id: "summer",
    label: "Summer",
    sublabel: "Verdant",
    kanji: "夏",
    iconName: "bamboo-leaf",
    badgeColor: "#238254",
    tagline: "Verdant bamboo groves & lush moss"
  },
  autumn: {
    id: "autumn",
    label: "Autumn",
    sublabel: "Momiji",
    kanji: "秋",
    iconName: "maple-leaf",
    badgeColor: "#C84B26",
    tagline: "Crimson Japanese maples & golden Ginkgo"
  },
  winter: {
    id: "winter",
    label: "Winter",
    sublabel: "Snow",
    kanji: "冬",
    iconName: "snowflake",
    badgeColor: "#306F99",
    tagline: "Alpine snowcaps & tranquil hot springs"
  }
};

interface SeasonContextType {
  season: Season;
  seasonInfo: SeasonInfo;
  setSeason: (season: Season) => void;
  cycleSeason: () => void;
}

const SeasonContext = createContext<SeasonContextType | undefined>(undefined);

export const SeasonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [season, setSeasonState] = useState<Season>(() => {
    try {
      const saved = localStorage.getItem("hanami-season") as Season;
      if (saved && (saved === "spring" || saved === "summer" || saved === "autumn" || saved === "winter")) {
        return saved;
      }
    } catch {
      // fallback
    }
    return "spring";
  });

  const setSeason = (newSeason: Season) => {
    setSeasonState(newSeason);
    try {
      localStorage.setItem("hanami-season", newSeason);
    } catch {
      // storage unavailable
    }
  };

  const cycleSeason = () => {
    const list: Season[] = ["spring", "summer", "autumn", "winter"];
    const nextIdx = (list.indexOf(season) + 1) % list.length;
    setSeason(list[nextIdx]);
  };

  useEffect(() => {
    // Synchronize HTML data-season attribute for pure CSS theming
    document.documentElement.setAttribute("data-season", season);
  }, [season]);

  return (
    <SeasonContext.Provider
      value={{
        season,
        seasonInfo: SEASONS[season],
        setSeason,
        cycleSeason
      }}
    >
      {children}
    </SeasonContext.Provider>
  );
};

export const useSeason = () => {
  const context = useContext(SeasonContext);
  if (!context) {
    throw new Error("useSeason must be used within a SeasonProvider");
  }
  return context;
};
