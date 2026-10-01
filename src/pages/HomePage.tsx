import React from "react";
import { HomeHero } from "@/src/components/home/HomeHero";
import { DestinationTicker } from "@/src/components/home/DestinationTicker";
import { PageId } from "@/src/components/layout/Header";
import { DESTINATIONS, Destination } from "@/src/data/destinations";
import { TestimonialCarousel } from "@/src/components/testimonials/TestimonialCarousel";
import { DestinationCard } from "@/src/components/destinations/DestinationCard";
import { ArrowRight, Sparkles } from "lucide-react";

interface HomePageProps {
  onNavigate: (page: PageId, extraState?: any) => void;
  onSelectDestination: (dest: Destination) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectDestination
}) => {
  // Spotlight destination: Arashiyama Bamboo Grove (matching reference)
  const spotlight =
    DESTINATIONS.find(d => d.id === "arashiyama-bamboo-grove") || DESTINATIONS[3];

  // Teaser destinations: 6 curated destinations perfectly filling a 3-column (2x3) or 2-column (3x2) grid
  const teaseIndices = [0, 1, 4, 8, 10, 13];
  const teaseDestinations = teaseIndices.map(idx => DESTINATIONS[idx]).filter(Boolean);

  return (
    <div className="space-y-16 md:space-y-24">
      {/* 1. Layered Parallax Hero (Section 7.5) */}
      <HomeHero onNavigate={onNavigate} />

      {/* 2. Marquee Ticker Ribbon (From Reference) */}
      <DestinationTicker
        onSelectDestinationByName={name => {
          const dest = DESTINATIONS.find(d => d.name.toLowerCase() === name.toLowerCase());
          if (dest) onSelectDestination(dest);
        }}
      />

      {/* 3. This Season's Spotlight Section (Section 6 & Reference) */}
      <section className="relative max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-linear-to-b from-[#FFF8FA] to-[#FFEAF1] border border-[#F7C4D6] rounded-3xl p-6 sm:p-10 shadow-sm overflow-hidden">
          {/* Decorative Torii Silhouette Watermark */}
          <svg
            className="absolute -right-4 -bottom-4 w-36 sm:w-48 h-32 sm:h-40 text-[#D4AF6A] opacity-20 pointer-events-none"
            viewBox="0 0 100 80"
            aria-hidden="true"
          >
            <path d="M2 12c22 7 74 7 96 0l-3 10c-22 5-68 5-90 0z" fill="currentColor" />
            <rect x="12" y="26" width="76" height="6" fill="currentColor" />
            <rect x="21" y="22" width="8" height="58" fill="currentColor" />
            <rect x="71" y="22" width="8" height="58" fill="currentColor" />
          </svg>

          {/* Arched Photo Frame with Drop Shadow */}
          <div className="lg:col-span-6 space-y-2">
            <div
              className="relative aspect-4/3 overflow-hidden bg-linear-to-tr from-[#f3d3df] to-[#d9cbe6] arch-photo shadow-[12px_12px_0_#F5A3BE]"
            >
              <img
                src={spotlight.gallery[0]?.url}
                alt={spotlight.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-[11px] text-[#8B7E8C] pt-2">
              Photo: Wikimedia Commons search "{spotlight.name}"
            </p>
          </div>

          {/* Editorial Content */}
          <div className="lg:col-span-6 space-y-4">
            <p className="eyebrow text-xs font-bold uppercase tracking-[0.14em] theme-primary-text">
              This Season's Spotlight
            </p>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--ink)]">
              {spotlight.name}
            </h2>

            <p className="text-sm sm:text-base text-[var(--ink)]/90 leading-relaxed font-normal">
              Come early, before the tour groups, and the grove is a green corridor of filtered light and creaking stalks. Autumn maples on the nearby hillsides make the walk richer still. Take the long way back along the Katsura River, and let the lane's quiet set your pace.
            </p>

            {/* A word on visiting care box */}
            <div className="p-4 rounded-r-xl border-l-4 border-[var(--gold)] bg-white/80 text-xs sm:text-sm text-[var(--ink)] space-y-1 shadow-2xs">
              <p>
                <strong className="text-[var(--ink)] font-bold">A word on visiting:</strong> the path is narrow and residential on its edges, so keep voices low, wear sturdy shoes for stone steps, and step aside for cyclists.
              </p>
            </div>

            {/* Local Insight */}
            <div className="p-3.5 rounded-xl theme-tag-bg border theme-border text-xs text-[var(--ink)] flex items-start gap-2">
              <Sparkles className="w-4 h-4 theme-primary-text shrink-0 mt-0.5" />
              <p>
                <strong className="font-bold text-[var(--ink)]">Local Insight:</strong> {spotlight.localInsight}
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onSelectDestination(spotlight)}
                className="px-6 py-2.5 rounded-full theme-cta-btn text-white text-sm font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                Read more
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Start Anywhere: Teaser Grid (From Reference) */}
      <section className="relative max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-8 gap-2">
          <div>
            <p className="eyebrow text-xs font-bold uppercase tracking-[0.14em] theme-primary-text">
              A little of everything
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--ink)]">
              Start anywhere
            </h2>
          </div>
          <button
            onClick={() => onNavigate("destinations")}
            className="text-sm font-bold theme-primary-text hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View all 16 destinations</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teaseDestinations.map(d => (
            <DestinationCard
              key={d.id}
              destination={d}
              index={d.id ? DESTINATIONS.findIndex(x => x.id === d.id) : undefined}
              onSelect={onSelectDestination}
            />
          ))}
        </div>
      </section>

      {/* 5. What Makes This Different (Castle Motif, from Reference) */}
      <section className="relative max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative theme-card-bg border theme-border rounded-3xl p-8 sm:p-12 overflow-hidden shadow-sm">
          {/* Decorative Castle Silhouette Watermark */}
          <svg
            className="absolute -left-4 -bottom-4 w-40 sm:w-52 h-36 sm:h-44 text-[var(--ink)] opacity-[0.06] pointer-events-none"
            viewBox="0 0 100 76"
            aria-hidden="true"
          >
            <path d="M10 76V62h80v14zM20 62V50h60v12zM30 50V38h40v12zM40 38V28h20v10zM0 62h100l-8-8H8zM12 50h76l-8-8H20zM24 38h52l-6-8H30zM36 28h28L50 4z" fill="currentColor" />
          </svg>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
            <div>
              <p className="eyebrow text-xs font-bold uppercase tracking-[0.14em] theme-primary-text">
                What makes this different
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--ink)] heading-accent-left">
                Care first, checklist second.
              </h2>
            </div>
            <div>
              <p className="text-base sm:text-lg text-[#2B2440]/90 leading-relaxed font-normal">
                Hanami is not a booking site. It is a small editorial journal that treats places as places, not backdrops. Every entry carries a plain note on what a visit asks of you: quiet at a shrine, good shoes on old stone, distance from the deer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Traveler Reflections (Automatic 5-Second Carousel with 1/N counter and controls) */}
      <section className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 pb-12 space-y-5">
        <div className="text-center space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--gold)]">
            Traveler Reflections
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--ink)]">
            Echoes from the Archipelago
          </h2>
        </div>
        <TestimonialCarousel />
      </section>

      {/* 7. Bottom Invitation Banner */}
      <section className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="theme-header-bg text-white rounded-3xl p-8 sm:p-12 text-center space-y-5 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,var(--gold)_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="relative z-10 max-w-xl mx-auto space-y-3">
            <span className="text-xs font-serif tracking-widest text-[var(--gold)] uppercase">
              Begin Your Voyage
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold">
              Ready to Experience Japan Mindfully?
            </h3>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Browse all sixteen curated destinations on our interactive regional map, or craft a bespoke day-by-day itinerary tailored to your travel window.
            </p>
            <div className="pt-2 flex items-center justify-center gap-3 flex-wrap">
              <button
                onClick={() => onNavigate("destinations")}
                className="px-6 py-2.5 rounded-full theme-cta-btn text-white text-xs font-bold transition-all shadow-md hover:scale-105 cursor-pointer flex items-center gap-2"
              >
                <span>Explore Destinations</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onNavigate("plan-trip")}
                className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 text-white text-xs font-bold transition-all cursor-pointer"
              >
                <span>Plan an Itinerary</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
