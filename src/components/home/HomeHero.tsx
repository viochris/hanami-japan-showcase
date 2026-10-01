import React from "react";
import { SakuraPetals } from "@/src/components/decoration/SakuraPetals";
import { ArrowRight, Compass, Sparkles } from "lucide-react";
import { PageId } from "@/src/components/layout/Header";
import { useSeason, Season } from "@/src/context/SeasonContext";

interface HomeHeroProps {
  onNavigate: (page: PageId) => void;
}

const SEASON_HERO_PHOTOS: Record<
  Season,
  {
    image: string;
    alt: string;
    location: string;
    coords: string;
    caption: string;
    secondaryImage: string;
    secondaryAlt: string;
    secondaryCaption: string;
    title: string;
  }
> = {
  spring: {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Chureito_Pagoda_and_Mount_Fuji.jpg/1280px-Chureito_Pagoda_and_Mount_Fuji.jpg",
    alt: "Mount Fuji framed by spring cherry blossoms and Chureito Pagoda",
    location: "富士吉田市 • Chūreitō Pagoda & Mt. Fuji",
    coords: "35.4983° N, 138.8012° E",
    caption: "Spring Sakura • No. 01/16",
    secondaryImage:
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
    secondaryAlt: "Tokyo Pagoda cherry blossom landscape",
    secondaryCaption: "Archival Print • Kyoto & Tokyo Spring Collection",
    title: "Japan, one blossom at a time."
  },
  summer: {
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    alt: "Lush verdant bamboo forest in Kyoto Arashiyama",
    location: "京都嵐山 • Arashiyama Lush Bamboo & Green Moss",
    coords: "35.0169° N, 135.6713° E",
    caption: "Verdant Shinryoku • No. 03/16",
    secondaryImage:
      "https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1200&q=80",
    secondaryAlt: "Kyoto garden moss and cedar trees in summer",
    secondaryCaption: "Archival Print • Kyoto Zen Courtyards Summer",
    title: "Japan, one cool breeze at a time."
  },
  autumn: {
    image:
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
    alt: "Crimson Japanese maple trees and temple pagoda in autumn",
    location: "京都東山 • Higashiyama Momiji & Maple Canopies",
    coords: "34.9949° N, 135.7850° E",
    caption: "Autumn Momiji • No. 04/16",
    secondaryImage:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    secondaryAlt: "Golden maple reflections across Kyoto temple ponds",
    secondaryCaption: "Archival Print • Lake Kawaguchiko Autumn Momiji",
    title: "Japan, one scarlet leaf at a time."
  },
  winter: {
    image:
      "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1200&q=80",
    alt: "Snow-covered thatched gassho roof houses in Shirakawa-go winter",
    location: "白川郷 • Shirakawa-go Gassho Snowfall",
    coords: "36.2562° N, 136.9066° E",
    caption: "Alpine Winter • No. 06/16",
    secondaryImage:
      "https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=1200&q=80",
    secondaryAlt: "Matsumoto Castle surrounded by alpine winter snow",
    secondaryCaption: "Archival Print • Nagano Alpine Snowpeaks Winter",
    title: "Japan, one quiet snowfall at a time."
  }
};

export const HomeHero: React.FC<HomeHeroProps> = ({ onNavigate }) => {
  const { season, seasonInfo } = useSeason();
  const currentPhoto = SEASON_HERO_PHOTOS[season] || SEASON_HERO_PHOTOS.spring;

  return (
    <section className="relative min-h-[90vh] md:min-h-[96vh] flex items-center justify-center overflow-hidden theme-header-bg isolation-isolate transition-colors duration-500">
      {/* ==============================================================
          LAYER 1: Base Dark Atmosphere & Ambient Scrim
         ============================================================== */}
      <div className="absolute inset-0 bg-[var(--header-bg)] z-[-4] transition-colors duration-500" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(212,175,106,0.18)_0%,transparent_65%)] z-[-3] pointer-events-none" />

      {/* ==============================================================
          LAYER 2: KERTAS FOTO PEMANDANGAN JEPANG (Photographic Paper Prints)
          Tangible archival photo paper cards with landscape photography
         ============================================================== */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-[-2] overflow-hidden px-4">
        {/* Secondary Background Photo Print (Slightly tilted right) */}
        <div
          className="absolute max-w-[480px] sm:max-w-[620px] lg:max-w-[760px] w-[88vw] aspect-[16/10] bg-white p-2.5 sm:p-4 pb-7 sm:pb-9 rounded-sm shadow-[0_30px_70px_rgba(0,0,0,0.7)] rotate-3 translate-x-6 sm:translate-x-12 translate-y-3 sm:translate-y-6 opacity-35 transition-all duration-700 hidden sm:block"
          aria-hidden="true"
        >
          <div className="w-full h-full overflow-hidden bg-neutral-900 rounded-[2px] relative">
            <img
              src={currentPhoto.secondaryImage}
              alt={currentPhoto.secondaryAlt}
              className="w-full h-full object-cover object-center filter saturate-90 transition-all duration-700"
            />
          </div>
          <div className="pt-2 text-right">
            <span className="font-mono text-[9px] text-neutral-400 tracking-widest uppercase">
              {currentPhoto.secondaryCaption}
            </span>
          </div>
        </div>

        {/* Primary Main Photo Print: Kertas Foto Pemandangan Musim Jepang */}
        <div
          className="relative max-w-[540px] sm:max-w-[700px] lg:max-w-[840px] w-[92vw] aspect-[16/10] bg-[#FFFDF9] p-3 sm:p-5 pb-8 sm:pb-12 rounded-sm shadow-[0_35px_80px_-15px_rgba(0,0,0,0.85)] -rotate-1.5 hover:rotate-0 transition-transform duration-700 ring-1 ring-black/15 border border-white/80"
        >
          {/* Subtle Washi Tape Strip at top of photo paper */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 sm:w-36 h-6 sm:h-7 bg-white/35 backdrop-blur-md rounded-xs border-t border-b border-white/50 shadow-xs rotate-[-1deg]" />

          {/* Real Landscape Photograph: Seasonally Attuned */}
          <div className="w-full h-full overflow-hidden rounded-[2px] relative bg-neutral-900 shadow-inner group">
            <img
              src={currentPhoto.image}
              alt={currentPhoto.alt}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter saturate-[1.08] contrast-[1.05] transition-all duration-700"
            />
            {/* Subtle vintage photo grain & soft vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25 pointer-events-none" />
          </div>

          {/* Authentic Photo Paper Bottom Caption */}
          <div className="pt-2 sm:pt-3 px-1 flex items-center justify-between text-[#8B7E8C]">
            <div className="flex items-center gap-2">
              <span className="font-serif italic text-xs sm:text-sm font-semibold text-[#2B2440]/80">
                {currentPhoto.location}
              </span>
              <span className="hidden sm:inline text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-black/5 font-mono text-[#2B2440]/60">
                {currentPhoto.coords}
              </span>
            </div>
            <span className="font-mono text-[10px] sm:text-xs text-[#8B7E8C] tracking-widest uppercase">
              {currentPhoto.caption}
            </span>
          </div>
        </div>

        {/* Ambient Dark Scrim so foreground text remains crisp and highly legible */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--hero-scrim)" }}
        />
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
        className="vertical-text hidden xl:block absolute right-8 xl:right-14 top-24 z-20 text-[var(--p2)] font-serif text-2xl xl:text-3xl tracking-[0.35em] drop-shadow-lg pointer-events-none transition-colors duration-400"
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

      {/* Mid-ground: Falling seasonal particles & Large Kanji watermark */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Soft Japanese Kanji Watermark */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center select-none"
        >
          <span
            className="font-serif text-[26vw] leading-none font-bold text-white/[0.07] tracking-widest pointer-events-none select-none transition-all duration-500"
            style={{ textShadow: "0 0 60px rgba(212,175,106,0.15)" }}
          >
            {seasonInfo.kanji}
          </span>
        </div>

        {/* Ambient Seasonal Particle Layer */}
        <SakuraPetals density="hero" className="z-0 opacity-60" />
      </div>

      {/* Foreground Content: Heading, Tagline, Call-to-Action */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 md:py-24">
        {/* Editorial Eyebrow */}
        <p className="eyebrow inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold tracking-[0.22em] uppercase text-[#D4AF6A] mb-4 bg-black/25 backdrop-blur-xs px-3.5 py-1 rounded-full border border-[#D4AF6A]/30">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF6A]" />
          <span>An independent Japan journal • {seasonInfo.label}</span>
        </p>

        {/* Main Display Title */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white drop-shadow-md leading-[1.08] text-balance transition-all duration-300">
          {currentPhoto.title}
        </h1>

        {/* Tagline */}
        <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-[#FFF8FA]/90 leading-relaxed font-normal drop-shadow-sm">
          Sixteen storied destinations, chosen slowly and described honestly. {seasonInfo.tagline}.
        </p>

        {/* Call to Actions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onNavigate("destinations")}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full theme-cta-btn text-white font-bold text-sm sm:text-base tracking-wide shadow-lg hover:scale-103 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2 group"
          >
            <span>Explore 16 Sanctuaries</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => onNavigate("plan-trip")}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base tracking-wide border border-white/30 backdrop-blur-xs transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4 text-[#D4AF6A]" />
            <span>Plan Your Journey</span>
          </button>
        </div>
      </div>
    </section>
  );
};
