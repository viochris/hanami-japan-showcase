import React from "react";

interface KanjiWatermarkProps {
  kanji: string;
  className?: string;
  position?: "center" | "left" | "right";
}

export const KanjiWatermark: React.FC<KanjiWatermarkProps> = ({
  kanji,
  className = "",
  position = "center"
}) => {
  const posClasses =
    position === "center"
      ? "left-1/2 -translate-x-1/2"
      : position === "left"
      ? "left-4 md:left-12"
      : "right-4 md:right-12";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute select-none z-0 ${posClasses} ${className}`}
    >
      <span
        className="font-serif block text-center leading-none tracking-widest text-[#2B2440]/[0.045] transition-opacity"
        style={{
          fontSize: "clamp(6rem, 15vw, 15rem)",
          userSelect: "none"
        }}
      >
        {kanji}
      </span>
    </div>
  );
};
