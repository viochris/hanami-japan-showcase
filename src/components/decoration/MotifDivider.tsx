import React from "react";

interface MotifDividerProps {
  type?: "torii" | "castle" | "sakura-branch";
  className?: string;
  color?: "indigo" | "gold" | "red";
}

export const MotifDivider: React.FC<MotifDividerProps> = ({
  type = "torii",
  className = "",
  color = "gold"
}) => {
  const colorHex =
    color === "indigo" ? "#2B2440" : color === "red" ? "#C9414D" : "#D4AF6A";

  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center gap-4 my-6 opacity-30 select-none ${className}`}
    >
      <div className="h-px flex-1 max-w-xs bg-linear-to-r from-transparent via-[#D4AF6A]/40 to-[#D4AF6A]" />

      {type === "torii" && (
        <svg
          viewBox="0 0 64 48"
          className="w-8 h-6 shrink-0"
          fill="none"
          stroke={colorHex}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Kasagi & Shimaki (top curved beams) */}
          <path d="M4 10C20 7 44 7 60 10" />
          <path d="M8 16H56" />
          {/* Hashira (main vertical pillars) with slight inward taper */}
          <line x1="18" y1="16" x2="16" y2="44" />
          <line x1="46" y1="16" x2="48" y2="44" />
          {/* Nuki (horizontal crossbar) */}
          <line x1="12" y1="24" x2="52" y2="24" />
          {/* Gakuzuka (center tablet tie) */}
          <line x1="32" y1="16" x2="32" y2="24" />
        </svg>
      )}

      {type === "castle" && (
        <svg
          viewBox="0 0 64 48"
          className="w-8 h-6 shrink-0"
          fill="none"
          stroke={colorHex}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Castle tier roofs */}
          <path d="M26 10H38L42 16H22L26 10Z" />
          <path d="M18 20H46L50 26H14L18 20Z" />
          <path d="M10 30H54L58 38H6L10 30Z" />
          <path d="M4 38L12 46H52L60 38" />
          <circle cx="32" cy="7" r="1.5" fill={colorHex} />
        </svg>
      )}

      {type === "sakura-branch" && (
        <svg
          viewBox="0 0 64 32"
          className="w-8 h-5 shrink-0"
          fill="none"
          stroke={colorHex}
          strokeWidth="1.75"
          strokeLinecap="round"
        >
          <path d="M4 16C16 16 28 22 42 14C50 10 56 12 60 8" />
          <circle cx="28" cy="18" r="2.5" fill="#FFC2D1" stroke="#C9414D" strokeWidth="0.75" />
          <circle cx="44" cy="12" r="3" fill="#FFC2D1" stroke="#C9414D" strokeWidth="0.75" />
          <circle cx="58" cy="8" r="2" fill="#FFC2D1" stroke="#C9414D" strokeWidth="0.75" />
        </svg>
      )}

      <div className="h-px flex-1 max-w-xs bg-linear-to-l from-transparent via-[#D4AF6A]/40 to-[#D4AF6A]" />
    </div>
  );
};
