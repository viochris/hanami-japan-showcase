import React, { useMemo } from "react";
import { useSeason, Season } from "@/src/context/SeasonContext";

interface SakuraPetalsProps {
  density?: "low" | "medium" | "hero";
  className?: string;
  forcedSeason?: Season;
}

export const SakuraPetals: React.FC<SakuraPetalsProps> = ({
  density = "low",
  className = "",
  forcedSeason
}) => {
  const { season: contextSeason } = useSeason();
  const currentSeason = forcedSeason || contextSeason;

  // Respect device size and reduced motion: low = 6-8 particles, hero = 18 particles on desktop, 6 on mobile
  const particleCount = density === "hero" ? 18 : density === "medium" ? 10 : 7;

  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => {
      const left = Math.round((i / particleCount) * 96 + (Math.sin(i * 1.7) * 3));
      const animationDuration = 9 + (i % 7) * 2.2;
      const animationDelay = (i * 1.3) % 8;
      const size = 14 + (i % 4) * 4;
      const opacity = 0.45 + (i % 3) * 0.18;
      const drift = -30 + (i % 5) * 15;

      return {
        id: i,
        left: `${Math.max(2, Math.min(96, left))}%`,
        animationDuration: `${animationDuration}s`,
        animationDelay: `-${animationDelay}s`,
        size,
        opacity,
        drift
      };
    });
  }, [particleCount]);

  const renderParticleSvg = (s: Season) => {
    switch (s) {
      case "summer":
        // Summer Verdant Willow / Bamboo Leaf
        return (
          <svg viewBox="0 0 30 40" className="w-full h-full drop-shadow-xs" fill="none">
            <defs>
              <linearGradient id="summerLeafGrad" x1="15" y1="0" x2="15" y2="40" gradientUnits="userSpaceOnUse">
                <stop stopColor="#A7E8BD" />
                <stop offset="0.6" stopColor="#58B87C" />
                <stop offset="1" stopColor="#238254" />
              </linearGradient>
            </defs>
            {/* Elongated fresh willow/bamboo leaf */}
            <path
              d="M15 0C22 10 26 24 15 40C4 24 8 10 15 0Z"
              fill="url(#summerLeafGrad)"
              opacity="0.9"
            />
            {/* Center vein */}
            <path d="M15 4C15 16 15 28 15 36" stroke="#D1F5DE" strokeWidth="0.8" opacity="0.7" />
          </svg>
        );

      case "autumn":
        // Autumn Japanese Momiji (Maple) Leaf
        return (
          <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-xs" fill="none">
            <defs>
              <linearGradient id="autumnMomijiGrad" x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F5A623" />
                <stop offset="0.5" stopColor="#E26A2C" />
                <stop offset="1" stopColor="#C84B26" />
              </linearGradient>
            </defs>
            {/* Five-pointed Japanese maple leaf silhouette */}
            <path
              d="M20 2 L22 12 L31 7 L27 16 L38 18 L28 23 L32 32 L22 27 L20 38 L18 27 L8 32 L12 23 L2 18 L13 16 L9 7 L18 12 Z"
              fill="url(#autumnMomijiGrad)"
              opacity="0.9"
            />
          </svg>
        );

      case "winter":
        // Winter Crystalline Snowflake
        return (
          <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-sm" fill="none">
            <defs>
              <radialGradient id="winterSnowGrad" cx="16" cy="16" r="14" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFFFFF" />
                <stop offset="0.6" stopColor="#D9ECFB" />
                <stop offset="1" stopColor="#9BC1E4" />
              </radialGradient>
            </defs>
            {/* Hexagonal snowflake branches */}
            <g stroke="url(#winterSnowGrad)" strokeWidth="1.5" strokeLinecap="round">
              <line x1="16" y1="2" x2="16" y2="30" />
              <line x1="2" y1="16" x2="30" y2="16" />
              <line x1="6" y1="6" x2="26" y2="26" />
              <line x1="6" y1="26" x2="26" y2="6" />
              {/* Branch chevrons */}
              <path d="M12 6 L16 10 L20 6" />
              <path d="M12 26 L16 22 L20 26" />
              <path d="M6 12 L10 16 L6 20" />
              <path d="M26 12 L22 16 L26 20" />
            </g>
            <circle cx="16" cy="16" r="2.5" fill="#FFFFFF" />
          </svg>
        );

      case "spring":
      default:
        // Classic Spring Sakura Petal
        return (
          <svg viewBox="0 0 30 40" className="w-full h-full drop-shadow-xs" fill="none">
            <defs>
              <linearGradient id="sakuraGrad" x1="15" y1="0" x2="15" y2="40" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFC2D1" />
                <stop offset="0.6" stopColor="#FFB3C6" />
                <stop offset="1" stopColor="#E27396" />
              </linearGradient>
            </defs>
            {/* Elegant curved cherry blossom petal shape */}
            <path
              d="M15 0C8 8 2 18 3 28C4 35 10 39 15 39C20 39 26 35 27 28C28 18 22 8 15 0Z"
              fill="url(#sakuraGrad)"
              opacity="0.9"
            />
            {/* Petal notch indent */}
            <path
              d="M13 39C14.5 37.5 15.5 37.5 17 39"
              stroke="#FFF0F5"
              strokeWidth="1"
            />
          </svg>
        );
    }
  };

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none z-10 ${className}`}
    >
      <style>
        {`
          @keyframes seasonalParticleDrift {
            0% {
              transform: translate3d(0, -20px, 0) rotate(0deg) scale(0.85);
              opacity: 0;
            }
            15% {
              opacity: var(--particle-opacity, 0.6);
            }
            85% {
              opacity: var(--particle-opacity, 0.6);
            }
            100% {
              transform: translate3d(var(--particle-drift, 40px), 105vh, 0) rotate(360deg) scale(1.05);
              opacity: 0;
            }
          }
          @media (prefers-reduced-motion: reduce) {
            .seasonal-particle-node {
              display: none !important;
            }
          }
        `}
      </style>
      {particles.map(p => (
        <span
          key={p.id}
          className="seasonal-particle-node absolute top-0 block will-change-transform"
          style={{
            left: p.left,
            animation: `seasonalParticleDrift ${p.animationDuration} linear infinite`,
            animationDelay: p.animationDelay,
            ["--particle-opacity" as string]: p.opacity,
            ["--particle-drift" as string]: `${p.drift}px`,
            width: `${p.size}px`,
            height: currentSeason === "winter" || currentSeason === "autumn" ? `${p.size}px` : `${p.size * 1.3}px`
          }}
        >
          {renderParticleSvg(currentSeason)}
        </span>
      ))}
    </div>
  );
};
