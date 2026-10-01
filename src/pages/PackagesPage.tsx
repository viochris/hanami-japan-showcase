import React, { useState, useMemo } from "react";
import { KanjiWatermark } from "@/src/components/decoration/KanjiWatermark";
import { PageId } from "@/src/components/layout/Header";
import { DESTINATIONS, Destination } from "@/src/data/destinations";
import {
  Calendar,
  Clock,
  Compass,
  ArrowRight,
  Sparkles,
  MapPin,
  CheckCircle2,
  SlidersHorizontal,
  ChevronRight,
  Info
} from "lucide-react";

interface PackagesPageProps {
  onNavigate: (page: PageId, extraState?: any) => void;
  onSelectDestinationByName: (name: string) => void;
}

export interface TravelPackage {
  id: string;
  title: string;
  japaneseTitle: string;
  tagline: string;
  badge: string;
  destIds: string[];
  duration: string;
  daysCount: number;
  priceYen: string;
  priceUsdEst: string;
  idealSeason: string;
  pacing: "Leisurely" | "Moderate" | "Immersive";
  heroImage: string;
  dailyHighlights: { day: string; title: string; desc: string }[];
  inclusions: string[];
}

const PACKAGES_DATA: TravelPackage[] = [
  {
    id: "kyoto-heritage",
    title: "Kyoto Ancient Zen & Bamboo Sanctuaries",
    japaneseTitle: "京都 禅と竹林の古道",
    tagline: "A contemplative route exploring Kyoto's sacred torii paths, shimmering pavilions, and whispering bamboo groves.",
    badge: "Most Cherished",
    destIds: ["fushimi-inari-taisha", "kinkaku-ji", "arashiyama-bamboo-grove"],
    duration: "3 Days / 2 Nights",
    daysCount: 3,
    priceYen: "¥48,000 – ¥72,000",
    priceUsdEst: "~$320 – $480 USD / person",
    idealSeason: "Year-Round (Best in Spring & Autumn)",
    pacing: "Leisurely",
    heroImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    dailyHighlights: [
      {
        day: "Day 1",
        title: "The Vermilion Mountain Portal",
        desc: "Dawn ascent through 10,000 senbon torii at Fushimi Inari before morning crowds arrive; afternoon traditional soba lunch."
      },
      {
        day: "Day 2",
        title: "Golden Reflections & Raked Gravel",
        desc: "Morning meditation at Kinkaku-ji; stroll along the Philosopher's Path and moss-draped zen courtyards."
      },
      {
        day: "Day 3",
        title: "Arashiyama Bamboo Reverie",
        desc: "Early mist walk inside the towering bamboo grove, crossing the Moon Crossing Bridge (Togetsukyo) and riverside matcha."
      }
    ],
    inclusions: [
      "Kyoto City Bus & Subway IC Card guidance",
      "Morning timing crowd heatmaps",
      "Traditional Kaiseki ryokan recommendations",
      "Temple temizuya purification guide"
    ]
  },
  {
    id: "castles-mountains",
    title: "Alpine Castles & Sacred Fuji Odyssey",
    japaneseTitle: "城郭と霊峰富士の道",
    tagline: "Connecting Japan's greatest surviving feudal timber keeps with the snow-capped Northern Alps and sacred Fuji.",
    badge: "Architectural Marvel",
    destIds: ["himeji-castle", "matsumoto-castle", "mount-fuji", "hakone"],
    duration: "5 Days / 4 Nights",
    daysCount: 5,
    priceYen: "¥95,000 – ¥145,000",
    priceUsdEst: "~$630 – $960 USD / person",
    idealSeason: "April to November (Clear Skies)",
    pacing: "Immersive",
    heroImage: "https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=800&q=80",
    dailyHighlights: [
      {
        day: "Day 1",
        title: "The White Heron Fortress",
        desc: "Climbing through the defensive maze and six-story timber keep of UNESCO World Heritage Himeji Castle."
      },
      {
        day: "Day 2",
        title: "The Black Crow of the Alps",
        desc: "Train north into Nagano to explore 400-year-old Matsumoto Castle framed by snow-dusted Japanese Alps."
      },
      {
        day: "Day 3",
        title: "Mount Fuji Foothills & Lakes",
        desc: "Lake Kawaguchiko viewing; Chureito Pagoda sunrise vantage with Mount Fuji rising across the horizon."
      },
      {
        day: "Day 4–5",
        title: "Restorative Onsen of Hakone",
        desc: "Sulfur hot springs, Lake Ashi pirate boat crossing, and peaceful forest shrine torii gate on the shoreline."
      }
    ],
    inclusions: [
      "JR Tokaido & Chuo Shinkansen route strategy",
      "Hakone Freepass multi-transit transit layout",
      "Castle defensive architecture blueprint notes",
      "Tattoo-friendly private onsen ryokan selections"
    ]
  },
  {
    id: "tokyo-osaka-lights",
    title: "Tokyo Metropolis to Kansai Neon Currents",
    japaneseTitle: "帝都と浪速の光彩",
    tagline: "Kinetic pedestrian scrambles and nocturnal neon canals, paired with expansive samurai parklands and ancient shrines.",
    badge: "Urban Vitality",
    destIds: ["senso-ji-temple", "shibuya-crossing", "dotonbori", "osaka-castle"],
    duration: "4 Days / 3 Nights",
    daysCount: 4,
    priceYen: "¥75,000 – ¥115,000",
    priceUsdEst: "~$500 – $760 USD / person",
    idealSeason: "Year-Round",
    pacing: "Moderate",
    heroImage: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
    dailyHighlights: [
      {
        day: "Day 1",
        title: "Ancient Edo Alleys & Giant Lanterns",
        desc: "Sensō-ji Temple and Nakamise-dori incense shopping; sunset river taxi along the Sumida river."
      },
      {
        day: "Day 2",
        title: "The Pulse of Shibuya",
        desc: "Crossing the world's most famous intersection at blue hour; exploring back-alley record cafes and izakayas."
      },
      {
        day: "Day 3",
        title: "Osaka Feudal Powerhouse",
        desc: "Shinkansen south to Osaka Castle; stone ramparts and panoramic tower views across the Kansai skyline."
      },
      {
        day: "Day 4",
        title: "Dotonbori Culinary Feast",
        desc: "Tasting piping hot Takoyaki and Kushikatsu along the neon-lit canal under the Glico running man."
      }
    ],
    inclusions: [
      "High-speed Nozomi/Hikari bullet train ticketing guide",
      "Tokyo Metro 72-hour pass recommendation",
      "Secret rooftop viewing points in Shibuya",
      "Nocturnal street food etiquette guide"
    ]
  },
  {
    id: "shirakawa-gassho",
    title: "Shirane Snow & Mountain Farmhouse Pilgrimage",
    japaneseTitle: "白川郷 合掌集落と加賀百万石",
    tagline: "Thatched-roof farmhouses frozen in time, historic Kanazawa samurai quarters, and pristine mountain rivers.",
    badge: "Rural Heritage",
    destIds: ["shirakawa-go", "kenroku-en-garden", "matsumoto-castle"],
    duration: "4 Days / 3 Nights",
    daysCount: 4,
    priceYen: "¥88,000 – ¥132,000",
    priceUsdEst: "~$580 – $880 USD / person",
    idealSeason: "December to March (Snow) or May to October (Lush Greens)",
    pacing: "Leisurely",
    heroImage: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=800&q=80",
    dailyHighlights: [
      {
        day: "Day 1",
        title: "Historic Post Town Transit",
        desc: "Scenic scenic alpine bus into the Shogawa river valley to arrive at UNESCO Shirakawa-go."
      },
      {
        day: "Day 2",
        title: "Gassho-Zukuri Farmhouse Stay",
        desc: "Sleeping under 250-year-old steep thatched roof timbers; fireside irori dinner with mountain herbs."
      },
      {
        day: "Day 3",
        title: "The Six Sublime Attributes of Kenroku-en",
        desc: "Morning walking through Japan's premier garden in Kanazawa; stone lanterns, ponds, and pine trees."
      },
      {
        day: "Day 4",
        title: "Higashi Chaya Gold Leaf District",
        desc: "Preserved geisha district wooden facades; sampling matcha tea dusted with real Kanazawa gold leaf."
      }
    ],
    inclusions: [
      "Nohi Bus reserved highway pass booking details",
      "Winter thermal clothing packing guidelines",
      "Farmhouse ryokan etiquette notes",
      "Artisan gold leaf workshop directory"
    ]
  },
  {
    id: "inland-sea-islands",
    title: "Inland Sea Floating Torii & Subtropical Waters",
    japaneseTitle: "瀬戸内 厳島と琉球の青潮",
    tagline: "Watching the great vermilion gate float on tidal seawater, combined with the tranquil coral coastlines of Okinawa.",
    badge: "Coastal & Island",
    destIds: ["itsukushima-shrine", "osaka-castle", "okinawa"],
    duration: "6 Days / 5 Nights",
    daysCount: 6,
    priceYen: "¥135,000 – ¥198,000",
    priceUsdEst: "~$900 – $1,320 USD / person",
    idealSeason: "April to October",
    pacing: "Moderate",
    heroImage: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
    dailyHighlights: [
      {
        day: "Day 1–2",
        title: "Miyajima Sacred Island",
        desc: "High tide viewing of Itsukushima floating shrine; cable car up Mount Misen with wild deer companions."
      },
      {
        day: "Day 3",
        title: "Hiroshima & Inland Sea Transit",
        desc: "Peace Memorial Park reflection and tasting savory Hiroshima-style Okonomiyaki."
      },
      {
        day: "Day 4–6",
        title: "Subtropical Okinawa Escape",
        desc: "Flight south to Naha; Churaumi Aquarium whale sharks, Kerama coral snorkeling, and Ryukyu palace ruins."
      }
    ],
    inclusions: [
      "Miyajima ferry timetables & tide chart guide",
      "Domestic air connection recommendations",
      "Okinawa coastal car rental advice",
      "Shinto tidal shrine photography rules"
    ]
  },
  {
    id: "emperors-golden-arc",
    title: "The Classic Emperor's Golden Arc",
    japaneseTitle: "黄金の回廊 帝都から古都へ",
    tagline: "The definitive beginner journey balancing ancient spiritual capitals, sacred peaks, and neon metropolis.",
    badge: "Comprehensive Flagship",
    destIds: ["senso-ji-temple", "mount-fuji", "fushimi-inari-taisha", "nara-park", "osaka-castle"],
    duration: "7 Days / 6 Nights",
    daysCount: 7,
    priceYen: "¥160,000 – ¥240,000",
    priceUsdEst: "~$1,060 – $1,600 USD / person",
    idealSeason: "Spring (Sakura) or Autumn (Momiji)",
    pacing: "Moderate",
    heroImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    dailyHighlights: [
      {
        day: "Day 1–2",
        title: "Tokyo Tradition & Modernity",
        desc: "Senso-ji Temple at dawn, Asakusa backstreets, Meiji Jingu shrine forest, and Shibuya crossing."
      },
      {
        day: "Day 3",
        title: "Mount Fuji & Five Lakes",
        desc: "Clear morning Fuji views from Lake Kawaguchiko; rustic Hoto noodle lunch in mountain huts."
      },
      {
        day: "Day 4–5",
        title: "Kyoto Spiritual Heartlands",
        desc: "Fushimi Inari torii hike, Gion geisha district evening walk, and tranquil Zen stone gardens."
      },
      {
        day: "Day 6–7",
        title: "Nara Sacred Deer & Osaka Farewell",
        desc: "Feeding bow-trained deer at Todai-ji; concluding with Osaka Castle and vibrant Dotonbori feast."
      }
    ],
    inclusions: [
      "7-Day Shinkansen route blueprint",
      "Luggage forwarding (Takkyubin) coordination advice",
      "Nara deer feeding etiquette rules",
      "Bespoke timing schedule to avoid peak crowds"
    ]
  }
];

export const PackagesPage: React.FC<PackagesPageProps> = ({
  onNavigate,
  onSelectDestinationByName
}) => {
  const [filterDuration, setFilterDuration] = useState<string>("All");

  const filteredPackages = useMemo(() => {
    if (filterDuration === "short") {
      return PACKAGES_DATA.filter(p => p.daysCount <= 4);
    }
    if (filterDuration === "long") {
      return PACKAGES_DATA.filter(p => p.daysCount >= 5);
    }
    return PACKAGES_DATA;
  }, [filterDuration]);

  return (
    <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-12">
      {/* 1. Header with authentic Japanese watermark */}
      <div className="relative text-center max-w-3xl mx-auto space-y-4">
        <KanjiWatermark kanji="旅" position="center" className="-top-10" />

        <p className="eyebrow text-xs font-bold uppercase tracking-[0.18em] theme-primary-text flex items-center justify-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-[var(--gold)]" />
          <span>Curated Travel Routes & Ballpark Pricing</span>
        </p>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[var(--ink)] heading-accent">
          Travel Packages & Routes
        </h1>

        <p className="text-sm sm:text-base text-[var(--mute)] max-w-2xl mx-auto leading-relaxed">
          Carefully sequenced journeys across Japan with realistic timelines and ballpark price ranges in Japanese Yen. Every itinerary is fully customizable to your pace.
        </p>

        {/* Filter buttons */}
        <div className="pt-2 flex items-center justify-center gap-2 flex-wrap">
          <button
            onClick={() => setFilterDuration("All")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              filterDuration === "All"
                ? "theme-header-bg text-white shadow-xs"
                : "theme-tag-bg text-[var(--ink)] border theme-border hover:opacity-90"
            }`}
          >
            All Journeys ({PACKAGES_DATA.length})
          </button>
          <button
            onClick={() => setFilterDuration("short")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              filterDuration === "short"
                ? "theme-header-bg text-white shadow-xs"
                : "theme-tag-bg text-[var(--ink)] border theme-border hover:opacity-90"
            }`}
          >
            3–4 Days (Focused Routes)
          </button>
          <button
            onClick={() => setFilterDuration("long")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              filterDuration === "long"
                ? "theme-header-bg text-white shadow-xs"
                : "theme-tag-bg text-[var(--ink)] border theme-border hover:opacity-90"
            }`}
          >
            5–7 Days (Grand Odysseys)
          </button>
        </div>
      </div>

      {/* 2. Packages Grid: Spacious 2-column or 3-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
        {filteredPackages.map(pkg => {
          const dests = pkg.destIds
            .map(id => DESTINATIONS.find(d => d.id === id))
            .filter(Boolean) as Destination[];

          return (
            <article
              key={pkg.id}
              className="theme-card-bg rounded-3xl border theme-border shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Hero Header with photo & badge */}
                <div className="relative aspect-16/9 sm:aspect-21/9 overflow-hidden bg-black/5">
                  <img
                    src={pkg.heroImage}
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider theme-primary-bg text-white shadow-sm">
                      {pkg.badge}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white/90 text-[var(--ink)] backdrop-blur-xs">
                      {pkg.pacing} Pacing
                    </span>
                  </div>

                  {/* Bottom title in hero */}
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-xs font-serif text-[var(--gold)] font-bold block">
                      {pkg.japaneseTitle}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold truncate">
                      {pkg.title}
                    </h3>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 sm:p-7 space-y-5">
                  {/* Tagline */}
                  <p className="text-xs sm:text-sm text-[var(--ink)]/85 leading-relaxed font-normal">
                    {pkg.tagline}
                  </p>

                  {/* Included destinations clickable pills */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-[var(--mute)] uppercase tracking-wider block">
                      Included Sanctuaries ({dests.length}):
                    </span>
                    <div className="flex items-center flex-wrap gap-1.5">
                      {dests.map(d => (
                        <button
                          key={d.id}
                          onClick={() => onSelectDestinationByName(d.name)}
                          className="px-2.5 py-1 rounded-md theme-tag-bg text-[var(--ink)] text-xs font-medium hover:theme-header-bg hover:text-white transition-all cursor-pointer border theme-border flex items-center gap-1"
                        >
                          <MapPin className="w-3 h-3 text-[var(--gold)] shrink-0" />
                          <span>{d.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price & Duration Grid */}
                  <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-white/60 border theme-border">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-[var(--mute)] uppercase tracking-wider font-semibold block flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[var(--gold)]" />
                        <span>Duration</span>
                      </span>
                      <span className="font-serif font-bold text-sm sm:text-base text-[var(--ink)] block">
                        {pkg.duration}
                      </span>
                      <span className="text-[10px] text-[var(--mute)]">
                        {pkg.idealSeason}
                      </span>
                    </div>

                    <div className="space-y-0.5 text-right">
                      <span className="text-[10px] text-[var(--mute)] uppercase tracking-wider font-semibold block">
                        Estimated Ballpark
                      </span>
                      <span className="font-serif font-bold text-base sm:text-lg theme-primary-text block">
                        {pkg.priceYen}
                      </span>
                      <span className="text-[10px] text-[var(--mute)]">
                        {pkg.priceUsdEst}
                      </span>
                    </div>
                  </div>

                  {/* Day-by-Day Highlights Accordion / Timeline */}
                  <div className="space-y-2.5 pt-1">
                    <span className="text-[11px] font-bold text-[var(--mute)] uppercase tracking-wider block">
                      Daily Narrative Arc:
                    </span>
                    <div className="space-y-2">
                      {pkg.dailyHighlights.map((dh, hIdx) => (
                        <div
                          key={hIdx}
                          className="flex items-start gap-2.5 text-xs text-[var(--ink)]/80 leading-relaxed bg-white/40 p-2.5 rounded-xl border theme-border"
                        >
                          <span className="font-serif font-bold text-[var(--red)] shrink-0">
                            {dh.day}
                          </span>
                          <div>
                            <strong className="text-[var(--ink)] block">
                              {dh.title}
                            </strong>
                            <span className="text-[var(--mute)]">{dh.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Inclusions summary */}
                  <div className="pt-2 border-t theme-border space-y-1.5 text-xs text-[var(--mute)]">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--ink)] block">
                      Planning Inclusions:
                    </span>
                    <ul className="space-y-1">
                      {pkg.inclusions.map((inc, iIdx) => (
                        <li key={iIdx} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="p-6 pt-0">
                <button
                  onClick={() =>
                    onNavigate("plan-trip", {
                      packageTitle: pkg.title,
                      destination: dests[0]?.name
                    })
                  }
                  className="w-full py-3 px-5 rounded-full theme-cta-btn text-white text-xs sm:text-sm font-bold shadow-md hover:scale-[1.02] active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Inquire & Customize This Route</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* 3. Informational Disclaimer Note */}
      <div className="p-6 rounded-3xl theme-tag-bg border theme-border flex items-start gap-4">
        <Info className="w-5 h-5 theme-primary-text shrink-0 mt-0.5" />
        <div className="text-xs text-[var(--mute)] space-y-1 leading-relaxed">
          <p className="font-bold text-[var(--ink)]">
            How Hanami Sample Packages Work:
          </p>
          <p>
            Hanami is an independent cultural journal. These packages are curated itineraries designed to give you realistic transit times, cultural pacing, and ballpark budget expectations. You can freely adapt any route in our interactive Itinerary Builder or send us a consultation inquiry to refine the day-by-day flow.
          </p>
        </div>
      </div>
    </div>
  );
};
