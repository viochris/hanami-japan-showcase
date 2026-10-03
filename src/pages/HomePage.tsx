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
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center theme-card-bg border theme-border rounded-3xl p-6 sm:p-10 shadow-sm overflow-hidden transition-colors duration-500">
          {/* Decorative Torii Silhouette Watermark */}
          <svg
            className="absolute -right-4 -bottom-4 w-36 sm:w-48 h-32 sm:h-40 text-[var(--gold)] opacity-20 pointer-events-none"
            viewBox="0 0 100 80"
            aria-hidden="true"
          >
            <path d="M2 12c22 7 74 7 96 0l-3 10c-22 5-68 5-90 0z" fill="currentColor" />
            <rect x="12" y="26" width="76" height="6" fill="currentColor" />
            <rect x="21" y="22" width="8" height="58" fill="currentColor" />
            <rect x="71" y="22" width="8" height="58" fill="currentColor" />
          </svg>

          {/* Arched Photo Frame with Drop Shadow & Red Hanko Stamp */}
          <div className="lg:col-span-6 space-y-2 relative">
            <div
              className="relative aspect-4/3 overflow-hidden bg-linear-to-tr from-[#f3d3df] to-[#d9cbe6] arch-photo shadow-[12px_12px_0_var(--p3)] transition-all duration-300"
            >
              <img
                src={spotlight.gallery[0]?.url}
                alt={spotlight.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />

              {/* Traditional Red Hanko Seal Stamp (印鑑 - 嵐山) */}
              <div
                className="hanko-stamp absolute top-4 left-4 z-20 shadow-lg border-2 border-white/90"
                style={{
                  backgroundColor: "var(--red)",
                  boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.35), 0 6px 16px rgba(186,61,29,0.4)"
                }}
                aria-label="Traditional Red Hanko Seal Stamp for Arashiyama"
              >
                嵐山
              </div>

              {/* Red Archival Badge on Photo */}
              <div className="absolute bottom-3 right-3 z-10 px-2.5 py-1 rounded-md bg-[var(--red)] text-white text-[11px] font-bold font-serif shadow-md border border-white/40">
                京都 • 嵐山
              </div>
            </div>

            <p className="text-[11px] text-[var(--mute)] pt-2">
              Photo: Wikimedia Commons • {spotlight.name}
            </p>
          </div>

          {/* Editorial Content */}
          <div className="lg:col-span-6 space-y-4">
            {/* Red Eyebrow Badge & Red Kanji Calligraphy Tag */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="eyebrow inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--red)] text-white text-xs font-bold uppercase tracking-wider shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                This Season's Spotlight
              </span>
              <span className="font-serif text-xs font-bold text-[var(--red)] bg-[var(--red)]/10 px-2.5 py-1 rounded-full border border-[var(--red)]/25">
                {spotlight.japaneseName}
              </span>
            </div>

            {/* Title with prominent red seal notation */}
            <div className="flex items-baseline gap-3 flex-wrap">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--ink)]">
                {spotlight.name}
              </h2>
              <span className="text-xl sm:text-2xl font-serif font-bold text-[var(--red)]">
                嵐山
              </span>
            </div>

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

      {/* 4. Six Curated Destinations Teaser Grid */}
      <section className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b theme-border pb-5">
          <div className="space-y-1.5">
            <p className="eyebrow text-xs font-bold uppercase tracking-[0.2em] theme-primary-text">
              Curated Journey
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--ink)]">
              Destinations from the Journal
            </h2>
            <p className="text-sm text-[var(--mute)] max-w-xl">
              Six of our sixteen catalogued retreats across Honshu, curated by seasonality and preservation.
            </p>
          </div>

          <button
            onClick={() => onNavigate("destinations")}
            className="inline-flex items-center gap-2 text-sm font-bold theme-primary-text hover:text-[var(--red-hover)] transition-colors cursor-pointer group"
          >
            <span>View all 16 destinations</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 6 Teaser Cards Grid: 3 columns desktop, 2 columns tablet, 1 column mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {teaseDestinations.map((dest, i) => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              index={teaseIndices[i]}
              onSelect={onSelectDestination}
            />
          ))}
        </div>

        {/* Bottom Explorer Prompt Bar */}
        <div className="text-center pt-4">
          <button
            onClick={() => onNavigate("destinations")}
            className="px-8 py-3 rounded-full theme-cta-btn text-white text-sm sm:text-base font-bold shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <span>Explore All 16 Sacred Sanctuaries</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 5. Authentic Traveler Experiences (Testimonials Carousel) */}
      <section className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">
        <TestimonialCarousel />
      </section>
    </div>
  );
};
