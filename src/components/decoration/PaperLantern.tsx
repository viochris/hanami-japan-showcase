import React from "react";

interface PaperLanternProps {
  className?: string;
  size?: number;
}

export const PaperLantern: React.FC<PaperLanternProps> = ({
  className = "w-4 h-5",
  size
}) => {
  return (
    <svg
      viewBox="0 0 24 32"
      className={`inline-block shrink-0 select-none text-[#C9414D] ${className}`}
      style={size ? { width: size, height: size * 1.33 } : undefined}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Lantern suspension loop */}
      <path d="M12 2V5" />
      {/* Top cap */}
      <path d="M8 5H16" strokeWidth="2" stroke="#2B2440" />
      {/* Barrel body */}
      <path
        d="M8 5C5 8 5 21 8 24H16C19 21 19 8 16 5H8Z"
        fill="#FFECF1"
        stroke="#C9414D"
        strokeWidth="1.75"
      />
      {/* Rib lines */}
      <line x1="6.5" y1="10" x2="17.5" y2="10" stroke="#E27396" strokeWidth="1" strokeDasharray="1 1" />
      <line x1="5.5" y1="14.5" x2="18.5" y2="14.5" stroke="#E27396" strokeWidth="1" />
      <line x1="6.5" y1="19" x2="17.5" y2="19" stroke="#E27396" strokeWidth="1" strokeDasharray="1 1" />
      {/* Kanji or center brush character touch */}
      <line x1="12" y1="11" x2="12" y2="18" stroke="#C9414D" strokeWidth="1.5" />
      {/* Bottom cap */}
      <path d="M8 24H16" strokeWidth="2" stroke="#2B2440" />
      {/* Tassel */}
      <path d="M12 24V29" stroke="#D4AF6A" strokeWidth="2" />
    </svg>
  );
};
