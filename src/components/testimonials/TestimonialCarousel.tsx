import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star, Quote, MapPin } from "lucide-react";

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  city: string;
  country: string;
  destinationVisited: string;
  season: string;
  avatar: string;
  tripType: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote:
      "I arrived nervous about temple etiquette and whether I would make a misstep at Fushimi Inari. Hanami's notes on morning pacing and silent prayer made me feel deeply welcome, not lectured. Standing alone under the vermilion torii at 6:30 AM was spiritual.",
    author: "Rina Wijaya",
    city: "Jakarta",
    country: "Indonesia",
    destinationVisited: "Fushimi Inari Taisha, Kyoto",
    season: "Spring (Sakura)",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    tripType: "Solo Cultural Journey"
  },
  {
    id: "t2",
    quote:
      "I planned my entire Kyoto itinerary around the Arashiyama bamboo grove dawn tip. Leaving our ryokan before dawn was worth every early alarm—we had the path completely to ourselves before the buses arrived. The sound of bamboo stalks creaking in the wind was pure meditation.",
    author: "Daniel Tremblay",
    city: "Melbourne",
    country: "Australia",
    destinationVisited: "Arashiyama Bamboo Grove",
    season: "Autumn (Momiji)",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    tripType: "Photography Expedition"
  },
  {
    id: "t3",
    quote:
      "Finally, a guide that honestly tells you when a place will be crowded and offers real alternatives instead of sugarcoated tourist fluff. The Matsumoto Castle architectural insights and local soba recommendations made our Nagano detour the highlight of our two weeks.",
    author: "Aiko Takahashi",
    city: "Osaka",
    country: "Japan",
    destinationVisited: "Matsumoto Castle, Nagano",
    season: "Winter (Snow)",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    tripType: "Domestic Heritage Trip"
  },
  {
    id: "t4",
    quote:
      "Staying overnight at a gassho-zukuri farmhouse in Shirakawa-go in midwinter was like stepping into an ancient woodblock print. Hanami's packing advice about sub-zero wooden floorboards and heating stoves was an absolute lifesaver for our family.",
    author: "Claire & Marcus Vance",
    city: "London",
    country: "United Kingdom",
    destinationVisited: "Shirakawa-go, Gifu",
    season: "Winter (Snow)",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    tripType: "Couples Anniversary"
  },
  {
    id: "t5",
    quote:
      "The onsen etiquette breakdown for Hakone dissolved all my anxieties as a first-time visitor with a small shoulder tattoo. Finding an authentic private kashikiri bath overlooking Mount Fuji was the most restorative afternoon of my life.",
    author: "Mateo Silva",
    city: "São Paulo",
    country: "Brazil",
    destinationVisited: "Hakone Onsen & Lake Ashi",
    season: "Autumn (Momiji)",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    tripType: "Wellness Retreat"
  },
  {
    id: "t6",
    quote:
      "Navigating Tokyo's contrast between the ancient smoke of Senso-ji and the neon pulse of Shibuya can be overwhelming. Hanami's advice to visit Senso-ji at dusk when lanterns glow and crowds disperse made me fall head over heels for the capital.",
    author: "Sofia Lindqvist",
    city: "Stockholm",
    country: "Sweden",
    destinationVisited: "Senso-ji & Shibuya, Tokyo",
    season: "Spring (Sakura)",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    tripType: "Urban Exploration"
  },
  {
    id: "t7",
    quote:
      "The Miyajima tide timings for Itsukushima Shrine were spot on. We walked right up to the base of the Great Torii at low tide in the afternoon, and returned after dinner to watch it floating on black water illuminated by floodlights. Unforgettable.",
    author: "Kenji & Brandon",
    city: "San Francisco",
    country: "United States",
    destinationVisited: "Itsukushima Shrine, Hiroshima",
    season: "Summer (Verdant)",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80",
    tripType: "Historical Pilgrimage"
  },
  {
    id: "t8",
    quote:
      "Visiting Kenroku-en in Kanazawa felt like walking inside a living scroll. Hanami's breakdown of the 'Six Sublime Attributes' helped me understand why the garden is designed this way rather than just snapping mindless photos.",
    author: "Evelyn Chen",
    city: "Singapore",
    country: "Singapore",
    destinationVisited: "Kenroku-en Garden, Kanazawa",
    season: "Spring (Sakura)",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    tripType: "Botanical & Tea Journey"
  }
];

export const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = TESTIMONIALS.length;

  const current = TESTIMONIALS[currentIndex];

  // Automatic cycle every 5 seconds without hitch or extra delay at the end
  const [resetKey, setResetKey] = useState(0);

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % total);
    setResetKey(k => k + 1);
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + total) % total);
    setResetKey(k => k + 1);
  };

  useEffect(() => {
    if (isPaused) return;

    const intervalId = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % total);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [isPaused, total, resetKey]);

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Traveler Testimonials Carousel"
    >
      {/* Main Testimonial Card */}
      <div className="relative w-full theme-card-bg border-2 border-[var(--card-border)] rounded-3xl p-7 sm:p-12 shadow-lg overflow-hidden transition-all duration-300">
        {/* Subtle decorative background watermarks */}
        <div className="absolute top-4 right-6 pointer-events-none opacity-10">
          <Quote className="w-24 h-24 theme-primary-text" />
        </div>

        {/* Top Bar: Counter (1/N) and Navigation Controls */}
        <div className="flex items-center justify-between border-b theme-border pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full theme-primary-bg animate-pulse" />
            <span className="font-serif text-xs uppercase tracking-widest text-[var(--mute)]">
              Traveler Reflections
            </span>
            {/* The requested 1/N counter */}
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold theme-header-bg text-white shadow-2xs">
              {currentIndex + 1} / {total}
            </span>
          </div>

          {/* Left and Right Navigation Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="w-9 h-9 rounded-full bg-white border theme-border flex items-center justify-center text-[var(--ink)] hover:theme-header-bg hover:text-white transition-all shadow-xs cursor-pointer hover:scale-105 active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="w-9 h-9 rounded-full bg-white border theme-border flex items-center justify-center text-[var(--ink)] hover:theme-header-bg hover:text-white transition-all shadow-xs cursor-pointer hover:scale-105 active:scale-95"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Testimonial Content (with smooth animation on change) */}
        <div
          key={current.id}
          className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300"
        >
          {/* Rating stars & Destination Tag */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-1 text-[var(--gold)]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[var(--gold)]" />
              ))}
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold theme-tag-bg text-[var(--ink)] border theme-border">
              <MapPin className="w-3.5 h-3.5 theme-primary-text" />
              <span>{current.destinationVisited}</span>
            </span>
          </div>

          {/* The Main Quote */}
          <blockquote className="m-0">
            <p className="font-serif text-lg sm:text-2xl text-[var(--ink)] leading-relaxed italic">
              “{current.quote}”
            </p>
          </blockquote>

          {/* Author Details */}
          <div className="flex items-center justify-between flex-wrap gap-4 pt-4 border-t theme-border">
            <div className="flex items-center gap-3.5">
              <img
                src={current.avatar}
                alt={current.author}
                className="w-12 h-12 rounded-full object-cover border-2 border-[var(--gold)] shadow-xs"
              />
              <div>
                <cite className="not-italic font-serif font-bold text-base text-[var(--ink)] block">
                  {current.author}
                </cite>
                <span className="text-xs text-[var(--mute)] block">
                  {current.city}, {current.country} • {current.tripType}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[11px] font-semibold text-[var(--mute)] uppercase tracking-wider block">
                Travel Season
              </span>
              <span className="text-xs font-serif font-bold theme-primary-text">
                {current.season}
              </span>
            </div>
          </div>
        </div>

        {/* 5-second Animated Progress Bar */}
        <div className="mt-6 pt-2">
          <div className="w-full bg-black/5 h-1 rounded-full overflow-hidden">
            <div
              key={`${current.id}-${isPaused ? "paused" : "running"}`}
              className="h-full theme-primary-bg rounded-full transition-all"
              style={{
                animation: isPaused ? "none" : "testimonialTimer 5s linear forwards"
              }}
            />
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-1.5 mt-4">
          {TESTIMONIALS.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to testimonial ${idx + 1}`}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                idx === currentIndex
                  ? "w-6 theme-header-bg"
                  : "w-2 bg-[var(--mute)]/30 hover:bg-[var(--mute)]"
              }`}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes testimonialTimer {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};
