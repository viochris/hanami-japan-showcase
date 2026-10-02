import React, { useState } from "react";
import { KanjiWatermark } from "@/src/components/decoration/KanjiWatermark";
import { PageId } from "@/src/components/layout/Header";
import {
  Sparkles,
  Feather,
  ShieldCheck,
  Landmark,
  TreePine,
  BookOpen,
  Compass,
  Calendar,
  MapPin,
  Camera,
  CheckCircle2,
  ArrowRight,
  ScrollText,
  Clock,
  HeartHandshake
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
  favoriteSanctuary: string;
  fieldItem: string;
}

const CURATOR_TEAM: TeamMember[] = [
  {
    name: "Shunichi Tanaka",
    japaneseName: "田中 俊一",
    role: "Founder & Master Heritage Curator",
    location: "Kyoto (Higashiyama)",
    bio: "Born into a family of Kyoto timber preservationists, Shunichi spent over eighteen years surveying temple joinery and mountain pilgrimage trails. Frustrated by commercial tours reducing sacred sites to three-minute photo stops, he created Hanami to give travelers a quiet, contemplative companion.",
    focus: "Architectural Preservation & Sacred Shrines",
    favoriteSanctuary: "Kinkaku-ji (Early Morning Rain)",
    fieldItem: "Midori Brass Fountain Pen & 1974 Olympus OM-1",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Maiya Kanzaki",
    japaneseName: "神崎 舞耶",
    role: "Head of Cultural Etiquette & Ryokan Hospitality",
    location: "Nara & Tokyo",
    bio: "A certified Omotesenke tea ceremony practitioner and daughter of a fourth-generation Nara ryokan keeper. Maiya authors our cultural etiquette field guides, demystifying onsen customs, temple temizuya purifications, and the gentle art of respectful guest stewardship.",
    focus: "Living Traditions, Onsen & Omotenashi",
    favoriteSanctuary: "Nara Park & Kasuga Taisha Primeval Forest",
    fieldItem: "Washi Paper Envelopes & Furoshiki Wrapping Cloth",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Elijah Sorenson",
    japaneseName: "エリヤ・ソレンソン",
    role: "Lead Trail Cartographer & Alpine Guide",
    location: "Nagano (Matsumoto)",
    bio: "A documentary photographer and mountain cartographer who has walked the Kumano Kodo, the Nakasendo post towns, and the alpine ridges of Mount Fuji and Nagano over four dozen times. He personally maps pedestrian routes, crowd timing heatmaps, and train connections.",
    focus: "Alpine Pacing, Photography & Crowd Timing",
    favoriteSanctuary: "Matsumoto Castle & Kamikochi Valley",
    fieldItem: "Silva Sighting Compass & Hand-bound Elevation Log",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Dr. Haruto Mori",
    japaneseName: "森 悠人",
    role: "Culinary Historian & Seasonal Terroir Specialist",
    location: "Kanazawa & Osaka",
    bio: "Former researcher in Edo-period gastronomic culture at Kyoto University. Haruto curates our culinary insights, from early morning fish market etiquette to the seasonal shunsai rhythm of mountain wild vegetables (sansai) and temple shojin ryori vegetarian dining.",
    focus: "Seasonal Terroir, Kaiseki & Market Lore",
    favoriteSanctuary: "Kenroku-en & Dotonbori Back-Alley Yakitori",
    fieldItem: "Custom Cedar Chopsticks & Shunsai Botanical Diary",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80"
  }
];

const MILESTONES = [
  {
    year: "2018",
    season: "Spring (春)",
    title: "The First Worn Moleskine in Higashiyama",
    period: "Early April 2018 • Nanzen-ji & Higashiyama, Kyoto",
    desc: "Shunichi Tanaka sat on the weathered cedar engawa of a small Nanzen-ji sub-temple following a frustrating week observing mass tour groups. Buses were disgorging hundreds of tourists with selfie sticks who hurried through sacred gates, clicked rapid photos, and left within four minutes without ever stepping across the temple threshold. Disturbed by how commercial travel platforms were turning centuries-old shrines into amusement park photo ops, he bought an olive-green Moleskine notebook. He spent weeks documenting what commercial travel guides ignored: where the morning light filters through bamboo at 6:45 AM, how the gravel is raked into wave ripples, the precise step counts of winding stone lanes, and how to step gently across wooden thresholds (kamoi) without standing directly on the sacred beam. This single field diary became the philosophical blueprint of Hanami.",
    keyTakeaway: "Field standard established: Never list a site without walking its approaches at dawn."
  },
  {
    year: "2020",
    season: "Autumn (秋)",
    title: "The Solitary Temple Surveys & The Pandemic Pause",
    period: "September – November 2020 • Nara, Kyoto & Kanazawa",
    desc: "When global borders closed and international flights halted, historic districts across Honshu fell into profound, unbroken silence. For the first time in generations, the primeval moss paths of Kasuga Taisha in Nara, the vermilion torii tunnels of Fushimi Inari, and the wooden teahouse lanes of Kanazawa's Higashi Chaya stood empty of crowds. While commercial booking platforms panicked, our small curatorial circle used these eighteen months for intensive ethnographic fieldwork. We met privately with fourteenth-generation tea masters, temple abbots, and heritage joiners, asking how travelers could be welcomed back with deeper mindfulness. The abbots shared candid concerns about overtourism, noise, and spiritual wear. Together, we formulated our strict code of reciprocal respect (omotenashi), ensuring future travelers arrive not as consumers demanding entertainment, but as humble guests honoring sacred living spaces.",
    keyTakeaway: "Collaborative abbot guidelines integrated into every sanctuary's etiquette notes."
  },
  {
    year: "2022",
    season: "Winter (冬)",
    title: "Mapping Japan's 72 Micro-Seasons (七十二候)",
    period: "December 2022 • Matsumoto, Shirakawa-go & Shizuoka",
    desc: "Standard four-season western travel advice fails Japan completely. The traditional Japanese calendar divides the solar year into 24 major terms (Sekki) and 72 poetic micro-seasons (Kō), shifting roughly every five days. We began systematically mapping all destination recommendations against these micro-seasons. We discovered that the most unforgettable travel experiences occur within brief, five-day seasonal transitions: the window when 'East Wind Melts the Ice' (Tōfū kōri o toku) across Lake Kawaguchiko, when 'First Peonies Bloom' (Botan hana saku) in Nara, or when morning river mist clings to Arashiyama's bamboo just before frost settles. Instead of telling travelers to 'visit in autumn,' we documented the precise micro-season intervals when maple leaves turn crimson without the overwhelming weekend tour bus traffic.",
    keyTakeaway: "Hanami becomes the first digital travel journal synchronized with the 72 micro-seasons calendar."
  },
  {
    year: "2024",
    season: "Summer (夏)",
    title: "The 16 Sacred Sanctuaries Benchmark",
    period: "June – August 2024 • Across Honshu & Okinawa",
    desc: "While commercial tourism websites continually expanded their databases to thousands of sponsored listings to maximize affiliate link revenue, Hanami made the radical decision to do the opposite. We conducted an exhaustive audit of over 120 candidate sites across Japan and ruthlessly eliminated all but sixteen. To earn a place in our journal, every destination had to satisfy three uncompromised criteria: unbroken surviving architectural woodwork (such as the original 400-year-old Sengoku keeps of Himeji and Matsumoto Castle, rather than concrete post-war replicas), radical seasonal transformation across all four seasons, and active cultural relevance where visitor etiquette directly sustains the local community. We personally walked every pedestrian transfer, climbed every stone staircase with backpacks, and mapped out exact hourly crowd heatmaps.",
    keyTakeaway: "A distilled, authoritative canon of 16 destinations where authenticity is uncompromised."
  },
  {
    year: "2026",
    season: "Present Day (今)",
    title: "Hanami Independent Journal: Preserving Mindful Travel",
    period: "2026 • Read by contemplative travelers worldwide",
    desc: "Today, Hanami is read by travelers across more than forty countries who reject frantic, whirlwind travel in favor of calm, contemplative discovery. We remain stubbornly independent: we accept zero sponsorship money from prefecture tourism boards, zero sponsored hotel comps, and zero algorithmic advertising. Every guide remains calm, beautifully paced, and rooted in authentic Japanese cultural philosophy. We believe that when travelers arrive with patience, curiosity, and respect, travel ceases to be consumption, it becomes an enduring exchange of grace between cultures that enriches both visitor and sanctuary for decades to come.",
    keyTakeaway: "100% self-funded editorial independence dedicated to respectful travel."
  }
];

const CULTURAL_PHILOSOPHIES = [
  {
    kanji: "初",
    name: "Shoshin (初心)",
    title: "Beginner's Mind",
    desc: "Approaching each moss garden, stone lantern, and castle gate with fresh wonder, setting aside assumptions and embracing humble attentiveness."
  },
  {
    kanji: "間",
    name: "Ma (間)",
    title: "The Negative Space",
    desc: "The sacred pause between destinations. We oppose rushed 8-site-a-day itineraries; true memory is made resting on a cedar veranda listening to rain."
  },
  {
    kanji: "礼",
    name: "Omotenashi (おもてなし)",
    title: "Reciprocal Grace",
    desc: "Hospitality is a two-way dialogue. We provide clear, friendly guidance on footwear, quiet voices, and temizuya cleansing so locals welcome visitors warmly."
  },
  {
    kanji: "季",
    name: "Kisetsukan (季節感)",
    title: "Seasonal Attunement",
    desc: "Japan transforms completely four times a year. We guide travelers to the seasonal terroir of shunsai food, fleeting blossom stages, and autumn momiji peaks."
  },
  {
    kanji: "幽",
    name: "Yūgen (幽玄)",
    title: "Subtle Mystery",
    desc: "Appreciating the beauty that remains unseen or implied, such as mist veiling mountain cedar groves, shadow in timber alcoves, and evening temple bells."
  },
  {
    kanji: "侘",
    name: "Wabi-Sabi (侘寂)",
    title: "Imperfect Transience",
    desc: "Finding sacred reverence in weathered stone, cracked celadon pottery, and rain-worn cypress boards rather than polished modern plastic."
  }
];

const FIELD_STANDARDS = [
  {
    icon: FootprintsIcon,
    title: "100% On-Foot Verification",
    desc: "We personally walk every stone staircase, station transfer, and gravel trail with pack on back to verify true travel fatigue and pacing."
  },
  {
    icon: Clock,
    title: "Dawn & Dusk Crowd Timing",
    desc: "We record exact timestamps when tour bus fleets arrive and depart, giving you the tranquil 60-minute window of solitude."
  },
  {
    icon: ShieldCheck,
    title: "Zero Sponsored Content",
    desc: "No hotel comps, no prefecture PR funding, no paid reviews. Every opinion and recommendation is entirely independent and honest."
  },
  {
    icon: HeartHandshake,
    title: "Resident & Abbot Dialogues",
    desc: "We confer directly with shrine caretakers and ryokan proprietresses to publish respectful conduct notes tailored to each sacred sanctuary."
  }
];

function FootprintsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 16v-2.38C4 11.5 5.5 10 7.5 10S11 11.5 11 13.62V16" />
      <path d="M13 20v-2.38c0-2.12 1.5-3.62 3.5-3.62s3.5 1.5 3.5 3.62V20" />
      <circle cx="7.5" cy="6" r="2" />
      <circle cx="16.5" cy="10" r="2" />
    </svg>
  );
}

export const OurStoryPage: React.FC<OurStoryPageProps> = ({ onNavigate }) => {
  const [activePhilosophyTab, setActivePhilosophyTab] = useState(0);

  return (
    <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-16 sm:space-y-24">
      {/* 1. Header with authentic Japanese watermark & Single-Line Heading */}
      <div className="relative text-center max-w-4xl mx-auto space-y-4">
        <KanjiWatermark kanji="物語" position="center" className="-top-10" />

        <p className="eyebrow text-xs font-bold uppercase tracking-[0.18em] theme-primary-text flex items-center justify-center gap-1.5">
          <Feather className="w-3.5 h-3.5 text-[var(--gold)]" />
          <span>Our Origins & Editorial Creed</span>
        </p>

        {/* Guaranteed 1-Line Heading across Desktop & Tablet */}
        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--ink)] heading-accent sm:whitespace-nowrap">
          Why a Small, Independent Journal
        </h1>

        <p className="text-sm sm:text-base text-[var(--mute)] max-w-2xl mx-auto leading-relaxed">
          Hanami was born from an unyielding conviction: travel in Japan is not about conquering landmarks like items on a checklist, it is about entering a quiet, respectful dialogue with centuries of mindful living.
        </p>
      </div>

      {/* 2. Manifesto: The Founder's Letter & Visual Philosophy Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Personal Narrative */}
        <div className="lg:col-span-7 space-y-6 text-base text-[var(--ink)]/90 leading-relaxed">
          <div className="p-6 sm:p-9 rounded-3xl theme-card-bg border theme-border shadow-xs space-y-5">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--ink)] flex items-center gap-2">
              <span className="w-2.5 h-6 theme-primary-bg rounded-full inline-block" />
              <span>The Search for a Companion, Not a Checklist</span>
            </h3>
            <p className="text-sm sm:text-base leading-relaxed">
              "On my first autumn journey across Honshu, the guidebooks gave me lists of top ten attractions, crowded train timestamps, and coupon codes. Yet the moments that permanently altered my perspective were the quiet, undocumented ones: standing beneath a dripping cedar gate in Nara at 6:30 in the morning as temple monks swept moss paths, or sitting over steaming noodles beneath a brick railway bridge in Osaka while rain fell.
            </p>
            <p className="text-sm sm:text-base leading-relaxed">
              Most travel portals treat Japan like an amusement park to conquer in seven days. They skip the vital nuances: the etiquette of taking off your shoes at a castle threshold, how to read temple purification pavilions, and when a place will be overwhelmed with bus crowds.
            </p>
            <p className="text-sm sm:text-base leading-relaxed">
              Hanami is an independent, non-sponsored cultural journal. We accept no paid placements from tourist boards. Every recommendation is visited on foot, timed by the sun, and written with deep respect for local communities."
            </p>
            <div className="pt-3 border-t theme-border flex items-center gap-3">
              <div className="w-11 h-11 rounded-full theme-primary-bg text-white font-serif font-bold flex items-center justify-center text-sm shadow-xs">
                田
              </div>
              <div>
                <span className="font-serif font-bold text-sm sm:text-base text-[var(--ink)] block">
                  Shunichi Tanaka (田中 俊一)
                </span>
                <span className="text-xs text-[var(--mute)]">
                  Founder & Editorial Director • Written in Higashiyama, Kyoto
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
            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--gold)]">
                Our Guiding Aesthetic
              </span>
              <h4 className="font-serif text-xl sm:text-2xl font-bold">
                “Ma” (間) · The Art of the Meaningful Pause
              </h4>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans">
                True appreciation requires space between destinations. We design itineraries that allow you to sit on a veranda, sip green tea, and watch shadows drift across raked gravel.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. The 6 Cultural Principles of Japanese Mindfulness */}
      <div className="space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--gold)]">
            Philosophical Foundations
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[var(--ink)]">
            The Six Cultural Principles We Live By
          </h2>
          <p className="text-xs sm:text-sm text-[var(--mute)]">
            The conceptual bedrock that guides every itinerary suggestion, quiet timing window, and etiquette recommendation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CULTURAL_PHILOSOPHIES.map((item, idx) => (
            <div
              key={idx}
              className="theme-card-bg p-6 sm:p-7 rounded-3xl border theme-border shadow-xs hover:shadow-md transition-all duration-300 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl theme-tag-bg theme-primary-text flex items-center justify-center font-serif font-bold text-xl border theme-border shadow-xs">
                    {item.kanji}
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[var(--mute)]">
                    No. 0{idx + 1}
                  </span>
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-[var(--ink)]">
                    {item.name}
                  </h3>
                  <p className="text-xs font-semibold text-[var(--gold)]">
                    {item.title}
                  </p>
                </div>
                <p className="text-xs text-[var(--mute)] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Interactive Field Timeline: From Worn Notebook to Global Journal */}
      <div className="theme-card-bg border theme-border rounded-3xl p-6 sm:p-10 shadow-xs space-y-8">
        <div className="max-w-2xl space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-widest theme-primary-text">
            Historical Milestones
          </span>
          <h2 className="font-serif text-xl sm:text-3xl font-bold text-[var(--ink)]">
            The Journey of Hanami (2018 – Present)
          </h2>
          <p className="text-xs sm:text-sm text-[var(--mute)]">
            How a set of hand-drawn Kyoto notebooks evolved into an independent travel journal.
          </p>
        </div>

        <div className="relative border-l-2 border-[var(--gold)]/50 ml-3 sm:ml-6 space-y-10 sm:space-y-12 pl-6 sm:pl-8">
          {MILESTONES.map((m, idx) => (
            <div key={idx} className="relative group space-y-3">
              {/* Timeline Node Icon */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-5 h-5 rounded-full bg-[var(--gold)] border-4 border-white shadow-xs group-hover:scale-125 transition-transform" />

              <div className="space-y-2">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="font-serif font-bold text-lg sm:text-xl text-[var(--ink)]">
                    {m.year}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold theme-tag-bg text-[var(--red)] border theme-border">
                    {m.season}
                  </span>
                  <span className="text-xs font-mono text-[var(--mute)]">
                    • {m.period}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-base sm:text-lg text-[var(--ink)]">
                  {m.title}
                </h3>

                <p className="text-xs sm:text-sm text-[var(--ink)]/85 max-w-3xl leading-relaxed">
                  {m.desc}
                </p>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--tag-bg)] border theme-border text-[11px] font-semibold text-[var(--ink)]">
                  <Sparkles className="w-3.5 h-3.5 text-[var(--gold)] shrink-0" />
                  <span>{m.keyTakeaway}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Our Fieldwork Code & Editorial Integrity */}
      <div className="space-y-6">
        <div className="text-center space-y-1 max-w-2xl mx-auto">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--gold)]">
            Methodology & Standards
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--ink)]">
            How We Survey Every Destination
          </h2>
          <p className="text-xs sm:text-sm text-[var(--mute)]">
            Our strict field standards ensure recommendations reflect reality, not marketing brochures.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FIELD_STANDARDS.map((std, idx) => {
            const Icon = std.icon;
            return (
              <div
                key={idx}
                className="theme-card-bg p-6 rounded-3xl border theme-border shadow-xs space-y-3"
              >
                <div className="w-10 h-10 rounded-xl theme-primary-bg text-white flex items-center justify-center shadow-xs">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-base text-[var(--ink)]">
                  {std.title}
                </h3>
                <p className="text-xs text-[var(--mute)] leading-relaxed">
                  {std.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. Meet the Curators & Cultural Historians */}
      <div className="space-y-8 pt-4">
        <div className="text-center space-y-2 max-w-4xl mx-auto">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--gold)]">
            Guardians of the Journal
          </span>
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--ink)] sm:whitespace-nowrap">
            Meet the Curators & Cultural Historians
          </h2>
          <p className="text-xs sm:text-sm text-[var(--mute)]">
            Our team lives across Kyoto, Nara, Nagano, Kanazawa, and Tokyo, walking the paths, speaking with artisans, and verifying every detail firsthand.
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

              <div className="space-y-2.5 flex-1 min-w-0">
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

                <div className="pt-2 border-t theme-border space-y-1 text-[11px] text-[var(--mute)]">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[var(--gold)] shrink-0" />
                    <span className="truncate">Favorite: {member.favoriteSanctuary}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Camera className="w-3 h-3 text-[var(--gold)] shrink-0" />
                    <span className="truncate">Field Kit: {member.fieldItem}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. How We Selected the 16 Destinations (Editorial Rigor) */}
      <div className="theme-card-bg border-2 border-[var(--gold)]/60 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6 bg-linear-to-b from-white/90 to-[var(--bg)]/50">
        <div className="space-y-2 max-w-2xl">
          <span className="text-[10px] font-bold uppercase tracking-widest theme-primary-text">
            Strict Editorial Curation
          </span>
          <h2 className="font-serif text-xl sm:text-3xl font-bold text-[var(--ink)]">
            How We Selected the 16 Destinations
          </h2>
          <p className="text-xs sm:text-sm text-[var(--mute)] leading-relaxed">
            There are thousands of temples, gardens, and peaks across the Japanese archipelago. Why precisely these sixteen?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Landmark className="w-4 h-4 theme-primary-text" />
              <h3 className="font-serif font-bold text-sm text-[var(--ink)]">
                1. Surviving Authentic Fabric
              </h3>
            </div>
            <p className="text-xs text-[var(--mute)] leading-relaxed">
              We prioritize surviving original Edo and Sengoku-era keeps (like Himeji and Matsumoto) over concrete post-war reconstructions, giving travelers touchable connection to unbroken woodcraft.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <TreePine className="w-4 h-4 theme-primary-text" />
              <h3 className="font-serif font-bold text-sm text-[var(--ink)]">
                2. Seasonal Transformation
              </h3>
            </div>
            <p className="text-xs text-[var(--mute)] leading-relaxed">
              Every chosen site must offer distinct, dramatic beauty across all four seasons, from snowy gassho roofs in Shirakawa-go to blazing maple leaf canopies in Arashiyama.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 theme-primary-text" />
              <h3 className="font-serif font-bold text-sm text-[var(--ink)]">
                3. Living Etiquette Relevance
              </h3>
            </div>
            <p className="text-xs text-[var(--mute)] leading-relaxed">
              Places where cultural guidance genuinely enriches the visit. We provide clear, kind instructions on footwear, incense purification, and morning photography boundaries.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
