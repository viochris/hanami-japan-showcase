import React, { useEffect, useState } from "react";
import { useSeason, Season } from "@/src/context/SeasonContext";

interface SeasonalPageTransitionProps {
  isTransitioning: boolean;
  targetPageLabel?: string;
  onCovered?: () => void;
  onComplete?: () => void;
}

export const SeasonalPageTransition: React.FC<SeasonalPageTransitionProps> = ({
  isTransitioning,
  targetPageLabel = "",
  onCovered,
  onComplete
}) => {
  const { season, seasonInfo } = useSeason();
  const [phase, setPhase] = useState<"idle" | "entering" | "covered" | "leaving">("idle");

  useEffect(() => {
    if (!isTransitioning) {
      setPhase("idle");
      return;
    }

    // Step 1: Start wipe in (0ms -> 320ms)
    setPhase("entering");

    const coveredTimer = setTimeout(() => {
      setPhase("covered");
      onCovered?.();
    }, 320);

    // Step 2: Start wipe out (360ms -> 720ms)
    const leavingTimer = setTimeout(() => {
      setPhase("leaving");
    }, 400);

    // Step 3: Complete transition
    const completeTimer = setTimeout(() => {
      setPhase("idle");
      onComplete?.();
    }, 760);

    return () => {
      clearTimeout(coveredTimer);
      clearTimeout(leavingTimer);
      clearTimeout(completeTimer);
    };
  }, [isTransitioning]);

  if (phase === "idle") {
    return null;
  }

  const getSeasonalPhrase = (s: Season) => {
    switch (s) {
      case "spring":
        return { kanji: "春", idiom: "桜花爛漫", subtitle: "Cherry blossoms in glorious bloom" };
      case "summer":
        return { kanji: "夏", idiom: "青葉若葉", subtitle: "Verdant bamboo & lush mountain moss" };
      case "autumn":
        return { kanji: "秋", idiom: "錦秋錦繍", subtitle: "Crimson maples & golden harvest" };
      case "winter":
        return { kanji: "冬", idiom: "白雪静寂", subtitle: "Alpine frost & tranquil snowcaps" };
    }
  };

  const phrase = getSeasonalPhrase(season);

  // Render 12 season-specific particles across the wipe
  const renderParticle = (i: number) => {
    const top = `${10 + (i * 7.5) % 80}%`;
    const delay = `${(i * 0.04).toFixed(2)}s`;
    const size = 20 + (i % 4) * 8;

    switch (season) {
      case "summer":
        return (
          <div
            key={i}
            className="absolute seasonal-wipe-particle will-change-transform"
            style={{ top, animationDelay: delay, width: size, height: size * 1.4 }}
          >
            <svg viewBox="0 0 30 40" className="w-full h-full drop-shadow-md" fill="none">
              <path
                d="M15 0C22 10 26 24 15 40C4 24 8 10 15 0Z"
                fill="url(#wipeSummerGrad)"
              />
              <path d="M15 4C15 16 15 28 15 36" stroke="#D1F5DE" strokeWidth="1" opacity="0.8" />
              <defs>
                <linearGradient id="wipeSummerGrad" x1="15" y1="0" x2="15" y2="40" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#A7E8BD" />
                  <stop offset="0.6" stopColor="#58B87C" />
                  <stop offset="1" stopColor="#1E7B48" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        );

      case "autumn":
        return (
          <div
            key={i}
            className="absolute seasonal-wipe-particle will-change-transform"
            style={{ top, animationDelay: delay, width: size, height: size }}
          >
            <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-md" fill="none">
              <path
                d="M20 2 L22 12 L31 7 L27 16 L38 18 L28 23 L32 32 L22 27 L20 38 L18 27 L8 32 L12 23 L2 18 L13 16 L9 7 L18 12 Z"
                fill="url(#wipeAutumnGrad)"
              />
              <defs>
                <linearGradient id="wipeAutumnGrad" x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F5A623" />
                  <stop offset="0.5" stopColor="#E26A2C" />
                  <stop offset="1" stopColor="#BA3D1D" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        );

      case "winter":
        return (
          <div
            key={i}
            className="absolute seasonal-wipe-particle will-change-transform"
            style={{ top, animationDelay: delay, width: size, height: size }}
          >
            <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-md" fill="none">
              <g stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round">
                <line x1="16" y1="2" x2="16" y2="30" />
                <line x1="2" y1="16" x2="30" y2="16" />
                <line x1="6" y1="6" x2="26" y2="26" />
                <line x1="6" y1="26" x2="26" y2="6" />
                <path d="M12 6 L16 10 L20 6" />
                <path d="M12 26 L16 22 L20 26" />
                <path d="M6 12 L10 16 L6 20" />
                <path d="M26 12 L22 16 L26 20" />
              </g>
              <circle cx="16" cy="16" r="3" fill="#FFFFFF" />
            </svg>
          </div>
        );

      case "spring":
      default:
        return (
          <div
            key={i}
            className="absolute seasonal-wipe-particle will-change-transform"
            style={{ top, animationDelay: delay, width: size, height: size * 1.3 }}
          >
            <svg viewBox="0 0 30 40" className="w-full h-full drop-shadow-md" fill="none">
              <path
                d="M15 0C8 8 2 18 3 28C4 35 10 39 15 39C20 39 26 35 27 28C28 18 22 8 15 0Z"
                fill="url(#wipeSakuraGrad)"
              />
              <path d="M13 39C14.5 37.5 15.5 37.5 17 39" stroke="#FFF0F5" strokeWidth="1" />
              <defs>
                <linearGradient id="wipeSakuraGrad" x1="15" y1="0" x2="15" y2="40" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FFC2D1" />
                  <stop offset="0.6" stopColor="#FFB3C6" />
                  <stop offset="1" stopColor="#C9414D" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        );
    }
  };

  const isEntering = phase === "entering" || phase === "covered";

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-100 pointer-events-none overflow-hidden select-none"
    >
      <style>
        {`
          @keyframes wipeSlideIn {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(0%);
            }
          }

          @keyframes wipeSlideOut {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(100%);
            }
          }

          @keyframes wipeParticleDrift {
            0% {
              transform: translateX(-80px) rotate(0deg) scale(0.7);
              opacity: 0;
            }
            30% {
              opacity: 1;
            }
            80% {
              opacity: 0.9;
            }
            100% {
              transform: translateX(110vw) rotate(360deg) scale(1.1);
              opacity: 0;
            }
          }

          .seasonal-wipe-particle {
            left: 0;
            animation: wipeParticleDrift 0.75s cubic-bezier(0.2, 0.8, 0.4, 1) forwards;
          }

          @media (prefers-reduced-motion: reduce) {
            .seasonal-wipe-container, .seasonal-wipe-particle {
              animation: none !important;
              display: none !important;
            }
          }
        `}
      </style>

      {/* Main Wipe Curtain Panel */}
      <div
        className="seasonal-wipe-container absolute inset-0 theme-header-bg will-change-transform shadow-2xl flex items-center justify-center border-r-4 border-[var(--gold)]"
        style={{
          animation: isEntering
            ? "wipeSlideIn 0.35s cubic-bezier(0.65, 0, 0.35, 1) forwards"
            : "wipeSlideOut 0.38s cubic-bezier(0.65, 0, 0.35, 1) forwards"
        }}
      >
        {/* Subtle decorative Seigaiha / Asanoha wave pattern background overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,var(--p2)_1px,transparent_1px)] bg-[size:24px_24px]" />

        {/* Center Traditional Japanese Emblem & Page Indicator */}
        <div className="relative z-10 text-center text-white px-6 space-y-3 animate-in fade-in duration-200">
          {/* Authentic Hanko Kanji Seal */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl theme-primary-bg text-white border-2 border-white/40 shadow-xl flex items-center justify-center mx-auto text-3xl sm:text-4xl font-serif font-bold transform -rotate-3">
            {phrase.kanji}
          </div>

          <div className="space-y-1">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-widest text-white drop-shadow-md">
              {phrase.idiom}
            </h2>
            <p className="text-xs sm:text-sm font-sans tracking-wider text-[var(--gold)] font-medium">
              {targetPageLabel ? `${targetPageLabel} • ${seasonInfo.label}` : phrase.subtitle}
            </p>
          </div>
        </div>

        {/* Flurry of 12 Season-specific Particle Icons sweeping across the curtain */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 12 }, (_, i) => renderParticle(i))}
        </div>
      </div>
    </div>
  );
};
