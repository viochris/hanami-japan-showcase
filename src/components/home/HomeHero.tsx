import React, { useEffect, useState } from "react";
import { SakuraPetals } from "@/src/components/decoration/SakuraPetals";
import { ArrowRight, Compass } from "lucide-react";
import { PageId } from "@/src/components/layout/Header";
import { useSeason } from "@/src/context/SeasonContext";

interface HomeHeroProps {
  onNavigate: (page: PageId) => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({ onNavigate }) => {
  const { season, seasonInfo } = useSeason();
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkWidth();
    window.addEventListener("resize", checkWidth);

    const handleScroll = () => {
      if (window.innerWidth >= 1024) {
        setScrollY(window.scrollY);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", checkWidth);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Parallax offsets (Desktop only; 0 on mobile)
  const bgTranslateY = isMobile ? 0 : Math.min(scrollY * 0.25, 180);
  const midTranslateY = isMobile ? 0 : Math.min(scrollY * 0.45, 260);
  const fgTranslateY = isMobile ? 0 : Math.min(scrollY * 0.7, 320);

  return (
    <section className="relative min-h-[90vh] md:min-h-[95vh] flex items-center justify-center overflow-hidden bg-[#2B2440] isolation-isolate">
      {/* ==============================================================
          LAYER 1 (Background): Real photograph moving slowest on scroll
          (Mount Fuji framed by spring cherry blossoms & Pagoda)
         ============================================================== */}
      <div
        className="absolute inset-0 w-full h-[124%] -top-[12%] will-change-transform pointer-events-none select-none z-[-3]"
        style={{
          transform: `translate3d(0, ${bgTranslateY}px, 0)`
        }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Chureito_Pagoda_and_Mount_Fuji.jpg/1280px-Chureito_Pagoda_and_Mount_Fuji.jpg"
          alt="Mount Fuji framed by spring cherry blossoms and Chureito Pagoda"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105"
        />
        {/* Layered rich scrim matching reference colors */}
        <div className="absolute inset-0 bg-linear-to-b from-[#2B2440]/70 via-[#2B2440]/45 to-[#2B2440]/85" />
      </div>

      {/* Decorative Hanko Seal Stamp (Left) */}
      <div
        className="hanko-stamp hidden xl:grid absolute left-8 xl:left-14 top-24 z-20 pointer-events-none"
        aria-hidden="true"
      >
        {seasonInfo.kanji}
      </div>

      {/* Vertical Japanese Calligraphy (Right) */}
      <div
        className="vertical-text hidden xl:block absolute right-8 xl:right-14 top-24 z-20 text-[#FFD6E4]/90 font-serif text-2xl xl:text-3xl tracking-[0.35em] drop-shadow-lg pointer-events-none"
        aria-hidden="true"
      >
        {season === "spring"
          ? "桜の旅"
          : season === "summer"
          ? "青葉の旅"
          : season === "autumn"
          ? "紅葉の旅"
          : "雪景の旅"}
      </div>

      {/* ==============================================================
          LAYER 2 (Mid-ground): Falling seasonal particles & Large Kanji watermark
          Moving at intermediate speed
         ============================================================== */}
      <div
        className="absolute inset-0 will-change-transform pointer-events-none z-10"
        style={{
          transform: `translate3d(0, ${midTranslateY}px, 0)`
        }}
      >
        {/* Soft Japanese Kanji Watermark */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center select-none"
        >
          <span
            className="font-serif text-[26vw] leading-none font-bold text-white/[0.08] tracking-widest"
            style={{ textShadow: "0 0 60px rgba(255,192,209,0.2)" }}
          >
            {seasonInfo.kanji}
          </span>
        </div>

        {/* Ambient Seasonal Particle Layer */}
        <SakuraPetals density={isMobile ? "low" : "hero"} />
      </div>

      {/* ==============================================================
          LAYER 3 (Foreground): Heading, Tagline, Call-to-Action
          Moving at standard scroll speed
         ============================================================== */}
      <div
        className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24 will-change-transform"
        style={{
          transform: `translate3d(0, ${fgTranslateY * 0.45}px, 0)`
        }}
      >
        {/* Editorial Eyebrow */}
        <p className="eyebrow inline-block text-xs sm:text-sm font-bold tracking-[0.22em] uppercase text-[#D4AF6A] mb-3">
          An independent Japan journal
        </p>

        {/* Main Display Title */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white drop-shadow-md leading-[1.08] text-balance">
          Japan, one blossom at a time.
        </h1>

        {/* Tagline */}
        <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-[#FFF8FA]/90 leading-relaxed font-normal drop-shadow-xs">
          Sixteen storied destinations, chosen slowly and described honestly, with a word on how to visit each one well.
        </p>

        {/* Call to Actions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onNavigate("destinations")}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-linear-to-r from-[#C9414D] to-[#E2647D] text-white font-bold text-sm sm:text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 group"
          >
            <span>Explore the Destinations</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => onNavigate("plan-trip")}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-transparent hover:bg-white/10 text-white font-bold text-sm sm:text-base border-2 border-white/50 backdrop-blur-md transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 hover:-translate-y-0.5"
          >
            <Compass className="w-4 h-4 text-[#D4AF6A]" />
            <span>Plan a Trip</span>
          </button>
        </div>
      </div>

      {/* Bottom fade into pink ground */}
      <div
        className="absolute left-0 right-0 bottom-0 h-16 bg-linear-to-t from-[#FFC9DB] to-transparent pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* Credit banner */}
      <div className="absolute left-4 sm:left-8 bottom-3 z-20 text-[11px] text-white/60">
        Photo: Mount Fuji · search "Mount Fuji cherry blossoms" · Wikimedia Commons
      </div>
    </section>
  );
};
