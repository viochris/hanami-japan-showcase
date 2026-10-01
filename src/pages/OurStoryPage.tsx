import React from "react";
import { KanjiWatermark } from "@/src/components/decoration/KanjiWatermark";
import { PageId } from "@/src/components/layout/Header";
import { TestimonialCarousel } from "@/src/components/testimonials/TestimonialCarousel";
import {
  Sparkles,
  Compass,
  Heart,
  Feather,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Landmark,
  TreePine,
  Coffee
} from "lucide-react";

interface OurStoryPageProps {
  onNavigate: (page: PageId) => void;
}

interface TeamMember {
  name: string;
  japaneseName: string;
  role: string;
  location: string;
  bio: string;
  focus: string;
  image: string;
}

const CURATOR_TEAM: TeamMember[] = [
  {
    name: "Shunichi Tanaka",
    japaneseName: "田中 俊一",
    role: "Founder & Master Heritage Curator",
    location: "Kyoto (Higashiyama)",
    bio: "Born into a family of Kyoto timber preservationists, Shunichi spent over eighteen years surveying temple joinery and mountain pilgrimage trails. Frustrated by commercial tours reducing sacred sites to three-minute photo stops, he created Hanami to give travelers a quiet, contemplative companion.",
    focus: "Architectural Preservation & Sacred Shrines",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Maiya Kanzaki",
    japaneseName: "神崎 舞耶",
    role: "Head of Cultural Etiquette & Ryokan Hospitality",
    location: "Nara & Tokyo",
    bio: "A certified Omotesenke tea ceremony practitioner and daughter of a fourth-generation Nara ryokan keeper. Maiya authors our cultural etiquette field guides, demystifying onsen customs, temple temizuya purifications, and the gentle art of respectful guest stewardship.",
    focus: "Living Traditions, Onsen & Omotenashi",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Elijah Sorenson",
    japaneseName: "エリヤ・ソレンソン",
    role: "Lead Trail Cartographer & Alpine Guide",
    location: "Nagano (Matsumoto)",
    bio: "A documentary photographer and mountain cartographer who has walked the Kumano Kodo, the Nakasendo post towns, and the alpine ridges of Mount Fuji and Nagano over four dozen times. He personally maps pedestrian routes, crowd timing heatmaps, and train connections.",
    focus: "Alpine Pacing, Photography & Crowd Timing",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Dr. Haruto Mori",
    japaneseName: "森 悠人",
    role: "Culinary Historian & Seasonal Terroir Specialist",
    location: "Kanazawa & Osaka",
    bio: "Former researcher in Edo-period gastronomic culture at Kyoto University. Haruto curates our culinary insights, from early morning fish market etiquette to the seasonal shunsai rhythm of mountain wild vegetables (sansai) and temple shojin ryori vegetarian dining.",
    focus: "Seasonal Terroir, Kaiseki & Market Lore",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80"
  }
];

export const OurStoryPage: React.FC<OurStoryPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-16 sm:space-y-20">
      {/* 1. Header with authentic Japanese watermark */}
      <div className="relative text-center max-w-3xl mx-auto space-y-4">
        <KanjiWatermark kanji="物語" position="center" className="-top-10" />

        <p className="eyebrow text-xs font-bold uppercase tracking-[0.18em] theme-primary-text flex items-center justify-center gap-1.5">
          <Feather className="w-3.5 h-3.5 text-[var(--gold)]" />
          <span>Our Origins & Philosophy</span>
        </p>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[var(--ink)] heading-accent">
          Why a Small, Independent Journal
        </h1>

        <p className="text-sm sm:text-base text-[var(--mute)] max-w-2xl mx-auto leading-relaxed">
          Hanami was born from an unyielding belief: travel in Japan is not about collecting landmarks like trading cards—it is about entering a quiet dialogue with centuries of mindful living.
        </p>
      </div>

      {/* 2. Manifesto: The Founder's Story & The Three Pillars */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Personal Narrative */}
        <div className="lg:col-span-7 space-y-6 text-base text-[var(--ink)]/90 leading-relaxed">
          <div className="p-6 sm:p-8 rounded-3xl theme-card-bg border theme-border shadow-xs space-y-4">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--ink)] flex items-center gap-2">
              <span className="w-2.5 h-6 theme-primary-bg rounded-full inline-block" />
              <span>The Search for a Companion, Not a Checklist</span>
            </h3>
            <p>
              "On my first autumn journey across Honshu, the guidebooks gave me lists of top ten attractions, train timestamps, and coupon codes. Yet the moments that permanently altered my perspective were the quiet, undocumented ones: standing beneath a dripping cedar gate in Nara at 6:30 in the morning as temple monks swept moss paths, or sitting over steaming noodles beneath a brick railway bridge in Osaka while rain fell.
            </p>
            <p>
              Most travel portals treat Japan like an amusement park to conquer in seven days. They skip the vital nuances: the etiquette of taking off your shoes at a castle threshold, how to read temple purification pavilions, and when a place will be overwhelmed with bus crowds.
            </p>
            <p>
              Hanami is an independent, non-sponsored cultural journal. We accept no paid placements from tourist boards. Every recommendation is visited on foot, timed by the sun, and written with deep respect for local communities."
            </p>
            <div className="pt-2 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full theme-primary-bg text-white font-serif font-bold flex items-center justify-center text-sm shadow-xs">
                田
              </div>
              <div>
                <span className="font-serif font-bold text-sm text-[var(--ink)] block">
                  Shunichi Tanaka (田中 俊一)
                </span>
                <span className="text-xs text-[var(--mute)]">
                  Founder & Editorial Director • Written in Kyoto
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Philosophy Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative rounded-3xl overflow-hidden shadow-lg border-2 border-[var(--gold)] aspect-4/5 group">
            <img
              src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80"
              alt="Quiet Kyoto courtyard morning"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-6 text-white space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--gold)]">
                Our Guiding Aesthetic
              </span>
              <h4 className="font-serif text-xl sm:text-2xl font-bold">
                “Ma” (間) — The Art of the Meaningful Pause
              </h4>
              <p className="text-xs text-white/80 leading-relaxed font-sans">
                True appreciation requires space between destinations. We design itineraries that allow you to sit on a veranda, sip green tea, and watch shadows drift across raked gravel.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. The Four Cultural Pillars */}
      <div className="space-y-6">
        <div className="text-center space-y-1">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--ink)]">
            Our Four Cultural Commitments
          </h2>
          <p className="text-xs sm:text-sm text-[var(--mute)]">
            The philosophical bedrock underlying every guide, map marker, and itinerary.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="theme-card-bg p-6 rounded-2xl border theme-border shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl theme-tag-bg theme-primary-text flex items-center justify-center font-serif font-bold text-lg border theme-border">
              初
            </div>
            <h4 className="font-serif font-bold text-base text-[var(--ink)]">
              Shoshin (初心)
            </h4>
            <p className="text-xs text-[var(--mute)] leading-relaxed">
              Beginner's Mind. Approaching each shrine step and castle battlement with fresh eyes, humility, and genuine eagerness to learn rather than assume.
            </p>
          </div>

          <div className="theme-card-bg p-6 rounded-2xl border theme-border shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl theme-tag-bg theme-primary-text flex items-center justify-center font-serif font-bold text-lg border theme-border">
              間
            </div>
            <h4 className="font-serif font-bold text-base text-[var(--ink)]">
              Ma (間)
            </h4>
            <p className="text-xs text-[var(--mute)] leading-relaxed">
              Negative space and unhurried pacing. We fiercely oppose exhausting 10-attraction-per-day whirlwind tours that leave travelers fatigued and detached.
            </p>
          </div>

          <div className="theme-card-bg p-6 rounded-2xl border theme-border shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl theme-tag-bg theme-primary-text flex items-center justify-center font-serif font-bold text-lg border theme-border">
              礼
            </div>
            <h4 className="font-serif font-bold text-base text-[var(--ink)]">
              Omotenashi (おもてなし)
            </h4>
            <p className="text-xs text-[var(--mute)] leading-relaxed">
              Reciprocal hospitality. Equipping visitors with clear, respectful etiquette so local residents and shrine caretakers welcome travelers with open hearts.
            </p>
          </div>

          <div className="theme-card-bg p-6 rounded-2xl border theme-border shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl theme-tag-bg theme-primary-text flex items-center justify-center font-serif font-bold text-lg border theme-border">
              季
            </div>
            <h4 className="font-serif font-bold text-base text-[var(--ink)]">
              Kisetsukan (季節感)
            </h4>
            <p className="text-xs text-[var(--mute)] leading-relaxed">
              Seasonal awareness. Japan transforms completely four times a year. We curate recommendations specifically attuned to micro-seasons and blooming schedules.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Meet the Curators & Makers (Requested Team & Creators Section) */}
      <div className="space-y-8 pt-4">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--gold)]">
            Guardians of the Journal
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[var(--ink)]">
            Meet the Curators & Cultural Historians
          </h2>
          <p className="text-xs sm:text-sm text-[var(--mute)]">
            Our team lives across Kyoto, Nara, Nagano, Kanazawa, and Tokyo—walking the paths, speaking with artisans, and verifying every detail firsthand.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {CURATOR_TEAM.map((member, idx) => (
            <div
              key={idx}
              className="theme-card-bg border theme-border rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row gap-5 items-start"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover shrink-0 border-2 border-[var(--gold)] shadow-xs"
              />

              <div className="space-y-2 flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div>
                    <h3 className="font-serif font-bold text-lg text-[var(--ink)]">
                      {member.name}
                    </h3>
                    <span className="text-xs font-serif text-rose-700 font-bold block">
                      {member.japaneseName}
                    </span>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold theme-tag-bg text-[var(--ink)] border theme-border">
                    {member.location}
                  </span>
                </div>

                <p className="text-xs font-semibold theme-primary-text">
                  {member.role}
                </p>

                <p className="text-xs text-[var(--ink)]/80 leading-relaxed font-normal">
                  {member.bio}
                </p>

                <div className="pt-2 border-t theme-border flex items-center gap-1.5 text-[11px] text-[var(--mute)] font-medium">
                  <Sparkles className="w-3 h-3 text-[var(--gold)] shrink-0" />
                  <span className="truncate">Focus: {member.focus}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. How We Choose Our 16 Sanctuaries (Editorial Rigor) */}
      <div className="theme-card-bg border-2 border-[var(--gold)]/60 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6 bg-linear-to-b from-white/90 to-[var(--bg)]/50">
        <div className="space-y-2 max-w-2xl">
          <span className="text-[10px] font-bold uppercase tracking-widest theme-primary-text">
            Strict Editorial Curation
          </span>
          <h3 className="font-serif text-xl sm:text-3xl font-bold text-[var(--ink)]">
            How We Selected the 16 Destinations
          </h3>
          <p className="text-xs sm:text-sm text-[var(--mute)] leading-relaxed">
            There are thousands of temples, gardens, and peaks across the Japanese archipelago. Why precisely these sixteen?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Landmark className="w-4 h-4 theme-primary-text" />
              <h4 className="font-serif font-bold text-sm text-[var(--ink)]">
                1. Surviving Authentic Fabric
              </h4>
            </div>
            <p className="text-xs text-[var(--mute)] leading-relaxed">
              We prioritize surviving original Edo and Sengoku-era keeps (like Himeji and Matsumoto) over concrete post-war reconstructions, giving travelers touchable connection to unbroken woodcraft.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <TreePine className="w-4 h-4 theme-primary-text" />
              <h4 className="font-serif font-bold text-sm text-[var(--ink)]">
                2. Seasonal Transformation
              </h4>
            </div>
            <p className="text-xs text-[var(--mute)] leading-relaxed">
              Every chosen site must offer distinct, dramatic beauty across all four seasons—from snowy gassho roofs in Shirakawa-go to blazing maple leaf canopies in Arashiyama.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 theme-primary-text" />
              <h4 className="font-serif font-bold text-sm text-[var(--ink)]">
                3. Living Etiquette Relevance
              </h4>
            </div>
            <p className="text-xs text-[var(--mute)] leading-relaxed">
              Places where cultural guidance genuinely enriches the visit. We provide clear, kind instructions on footwear, incense purification, and morning photography boundaries.
            </p>
          </div>
        </div>
      </div>

      {/* 6. Traveler Reflections (Automatic 5-Second Testimonials Carousel) */}
      <div className="space-y-6 pt-4">
        <div className="text-center space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--gold)]">
            Guest Testimonials
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--ink)]">
            Reflections from Mindful Travelers
          </h2>
          <p className="text-xs sm:text-sm text-[var(--mute)]">
            Hear from solo wanderers, honeymooners, and architecture pilgrims who explored Japan with Hanami.
          </p>
        </div>

        {/* Embedded Dynamic Carousel Component */}
        <TestimonialCarousel />
      </div>

      {/* 7. Bottom Invitation Banner */}
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
            Browse all sixteen curated sanctuaries on our interactive regional map, or craft a bespoke day-by-day itinerary tailored to your travel window.
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
    </div>
  );
};
