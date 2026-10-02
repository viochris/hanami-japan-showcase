import React, { useState, useMemo } from "react";
import { KanjiWatermark } from "@/src/components/decoration/KanjiWatermark";
import {
  AlertTriangle,
  HelpCircle,
  ShieldCheck,
  Compass,
  Train,
  HeartHandshake,
  PhoneCall,
  Search,
  Sparkles,
  Bath,
  UtensilsCrossed,
  Luggage,
  CreditCard,
  Building2,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Filter,
  ChevronDown
} from "lucide-react";

type TipCategory = "all" | "etiquette" | "emergency" | "transit" | "onsen-dining";

interface TipItem {
  id: string;
  category: "etiquette" | "emergency" | "transit" | "onsen-dining";
  title: string;
  japanese: string;
  badge: string;
  isWarning?: boolean;
  isEmergency?: boolean;
  summary: string;
  details: string[];
  actionWhereToGo?: { label: string; action: string };
}

const TRAVEL_TIPS_DATA: TipItem[] = [
  // ================= CULTURAL ETIQUETTE & TABOOS =================
  {
    id: "chopstick-taboos",
    category: "etiquette",
    title: "Chopstick Funeral Taboos (Hashi-Manner)",
    japanese: "箸のマナーとタブー",
    badge: "Strict Cultural Taboo",
    isWarning: true,
    summary: "Certain chopstick gestures carry grave funeral connotations in Japanese Buddhist tradition. Avoid them completely.",
    details: [
      "Never pass food directly from your chopsticks to another person's chopsticks (Hashi-watashi). In Japanese cremation rituals, relatives use chopsticks to pass bone fragments.",
      "Never stick chopsticks upright into a bowl of white rice (Tsukitate-bashi). This is only done at funeral altars for the departed.",
      "Never spear food with a single chopstick (Sashi-bashi) or drag dishes across the table (Yose-bashi). Place chopsticks on the ceramic rest (hashi-oki) when drinking or resting."
    ]
  },
  {
    id: "temple-shrine-rules",
    category: "etiquette",
    title: "Shrine (Shinto) vs. Temple (Buddhist) Protocol",
    japanese: "神社と寺院の正しい参拝作法",
    badge: "Spiritual Etiquette",
    summary: "Shrines and temples have distinct spiritual traditions. Knowing the difference commands deep appreciation from priests and locals.",
    details: [
      "At a Shinto Shrine: Bow slightly before stepping through the Torii gate. Never walk down the exact center of the path (Seichu), as it is reserved for the Kami (deities).",
      "Purification at Temizuya: Wash left hand, right hand, pour water into left palm to rinse mouth, wash left hand again, tilt ladle vertically to rinse handle. Never drink directly from the ladle.",
      "Prayer Clapping Distinction: At Shinto shrines, bow twice, clap your hands twice, pray silently, bow once (Ni-rei, ni-hai, ichi-rei). At Buddhist temples, fold hands quietly in silent contemplation, never clap."
    ]
  },
  {
    id: "train-etiquette",
    category: "etiquette",
    title: "Manner Mode & Quiet Compartments on Trains",
    japanese: "電車のマナーモードと乗車作法",
    badge: "Commuter Decorum",
    summary: "Japanese trains are shared sanctuaries of silence. Phone calls and loud conversations are strictly frowned upon.",
    details: [
      "Set your phone to 'Manner Mode' (silent/vibrate). Voice phone calls on commuter trains and subways are prohibited; on Shinkansen, move to the vestibule between carriages.",
      "In crowded cars, wear your backpack on your chest (Mae-kakae) or place it on the overhead luggage rack so you do not bump other passengers.",
      "Queue up precisely behind the painted boarding marks on the platform. Let arriving passengers exit completely before stepping aboard."
    ]
  },
  {
    id: "trash-disposal",
    category: "etiquette",
    title: "The Zero-Street-Bin Rule & Trash Disposal",
    japanese: "ゴミの持ち帰りと分別",
    badge: "Daily Etiquette",
    summary: "Japan has virtually no public street trash cans. You are expected to carry your waste until finding a designated receptacle.",
    details: [
      "Always carry a small plastic bag in your daypack for trash throughout the day. Street bins were removed in 1995 for safety and never brought back.",
      "Receptacles next to beverage vending machines are strictly for plastic PET bottles and aluminum cans, so never stuff food wrappers or paper napkins into them.",
      "Dispose of food wrappers at the convenience store (Konbini) where you purchased them, or bring them back to your hotel room bin."
    ]
  },
  {
    id: "tipping-rule",
    category: "etiquette",
    title: "Why You Should Never Tip in Japan",
    japanese: "チップ不要と会計作法",
    badge: "Money Etiquette",
    summary: "Tipping does not exist in Japanese culture and can cause genuine awkwardness or confusion.",
    details: [
      "Exceptional service (Omotenashi) is considered an inherent standard of professional pride, already included in the bill. Leaving extra cash on the table will often cause waitstaff to chase you down the street thinking you forgot change.",
      "At cash registers, place coins and bills into the small ceramic/plastic payment tray (Tsurisen-torei) rather than handing money directly from hand to hand.",
      "The only rare exception is handing a small tip in a formal decorative envelope (pochi-bukuro) to a personal Nakai-san attendant at an ultra-luxury traditional ryokan."
    ]
  },

  // ================= EMERGENCY & WHERE TO GO WHEN =================
  {
    id: "emergency-lost-item",
    category: "emergency",
    title: "Lost Your Phone, Wallet, or Passport? Go to a Koban",
    japanese: "落とし物・遺失物届（交番）",
    badge: "Where to Go: Lost Items",
    isEmergency: true,
    summary: "Japan has the highest lost property return rate in the world (>90%). Almost every lost item is handed over to the police.",
    details: [
      "Where to go: Walk into the nearest neighborhood police box (交番, Koban). Officers will help you fill an Ishitsubutsu-todoke (Lost Property Report).",
      "If lost on a train or subway station: Immediately visit the station master's office (Ekicho-shitsu). Train lines track every lost phone, umbrella, and bag systematically.",
      "If you lost your passport: File an official police certificate at the Koban, then contact your country's embassy or consulate in Tokyo or Osaka for emergency travel documents."
    ],
    actionWhereToGo: {
      label: "Where to go",
      action: "Nearest Koban (Police Box) or Station Master Office (駅長室)"
    }
  },
  {
    id: "emergency-medical-help",
    category: "emergency",
    title: "Sudden Illness, Injury, or Need English Medical Care?",
    japanese: "緊急医療・夜間診療・救急車",
    badge: "Where to Go: Medical Care",
    isEmergency: true,
    summary: "Dial 119 for life-threatening emergencies. For non-life-threatening illnesses, use the 24/7 multilingual JNTO hotline.",
    details: [
      "Life-threatening emergency: Call 119 for an ambulance (Kyukyusha). State clearly: 'Kyukyudesu' (It is a medical emergency) and your location.",
      "24/7 Multilingual Tourist Hotline: Call 050-3816-2787 (operated by Japan National Tourism Organization). They can direct you to hospitals with English-speaking staff.",
      "Mild symptoms & medication: Head to a major drugstore chain (Matsumoto Kiyoshi, Sundrug, Welcia). Pharmacists have multilingual visual symptom cards for pain, stomach ache, fever, and motion sickness."
    ],
    actionWhereToGo: {
      label: "Emergency Hotline",
      action: "Call 050-3816-2787 (JNTO Multilingual 24/7) or 119 (Ambulance)"
    }
  },
  {
    id: "emergency-cash-atm",
    category: "emergency",
    title: "Need Cash Immediately with a Foreign Card?",
    japanese: "海外カード対応ATM（セブン銀行・郵便局）",
    badge: "Where to Go: Cash & ATM",
    summary: "Many Japanese local bank ATMs reject overseas cards. Use 7-Eleven or Japan Post Bank for guaranteed foreign card cash withdrawals.",
    details: [
      "Where to go: Walk into any 7-Eleven convenience store. Seven Bank ATMs operate 24/7 with English, Mandarin, and multilingual prompts, accepting Visa, Mastercard, Maestro, and Cirrus.",
      "Japan Post Bank (Yucho Ginko): Located at post offices across the country, also reliable for international ATM cards.",
      "Keep at least ¥10,000–¥15,000 cash on hand at all times for rural buses, temple entrance admissions, and traditional food stalls."
    ],
    actionWhereToGo: {
      label: "Where to go",
      action: "Any 7-Eleven Store (Seven Bank ATM) or Japan Post Bank"
    }
  },
  {
    id: "emergency-earthquake",
    category: "emergency",
    title: "Earthquake, Tsunami Warning, or Severe Storms",
    japanese: "地震・自然災害・緊急避難",
    badge: "Where to Go: Disaster Safety",
    isEmergency: true,
    summary: "Japan has rigorous earthquake engineering. Remaining calm and knowing where designated shelters are is crucial.",
    details: [
      "Download the 'Safety Tips' app: Developed by the Japan Tourism Agency, it sends real-time earthquake early warnings and tsunami alerts in English.",
      "If indoors: Protect your head under a sturdy desk or table. Do NOT rush outdoors where glass and signs may fall.",
      "Designated evacuation shelters (Hinanjo): Local public elementary and junior high schools (Shōgakkō) serve as earthquake and tsunami relief shelters with emergency supplies."
    ],
    actionWhereToGo: {
      label: "Shelter location",
      action: "Local Public Elementary Schools (小学校) or Safety Tips App"
    }
  },

  // ================= TRANSIT & LUGGAGE =================
  {
    id: "luggage-forwarding",
    category: "transit",
    title: "Luggage Forwarding (Takkyubin): Travel Hands-Free",
    japanese: "宅急便・手ぶら観光",
    badge: "Transit Lifehack",
    summary: "Never haul heavy suitcases onto crowded trains. Japan's overnight luggage delivery network is fast, secure, and affordable.",
    details: [
      "Service providers: Yamato Transport (Black Cat emblem) and Sagawa Express. Most hotel front desks will measure your bags and fill the green waybill slip for you.",
      "Cost & Timing: Roughly ¥2,000–¥3,200 per 20kg suitcase. Bags sent in the morning from Tokyo typically arrive at your Kyoto hotel by the next afternoon.",
      "Shinkansen Oversized Baggage Rule: Luggage whose total dimensions (length + width + height) exceed 160cm require a reserved seat with an oversized baggage area on the Tokaido/Sanyo Shinkansen."
    ]
  },
  {
    id: "ic-cards-apple-wallet",
    category: "transit",
    title: "IC Cards (Suica, Pasmo, ICOCA) & Transit Pacing",
    japanese: "交通系ICカードとスマート乗車",
    badge: "Transit Practicalities",
    summary: "A single IC card pays for subway lines, city buses, ferries, lockers, and convenience store snacks across all of Japan.",
    details: [
      "iPhone Users: You can add a digital Suica or Pasmo card directly into Apple Wallet in under two minutes without buying physical plastic.",
      "Physical IC Cards: If purchasing in Japan, look for 'Welcome Suica' or 'Pasmo Passport' at Haneda and Narita airports.",
      "Interoperability: A Tokyo Suica works seamlessly on Kyoto city buses, Osaka subways, and Hiroshima streetcars."
    ]
  },

  // ================= ONSEN & DINING =================
  {
    id: "onsen-etiquette-tattoos",
    category: "onsen-dining",
    title: "Onsen Etiquette & Tattoo Policies",
    japanese: "温泉入浴作法とタトゥー対応",
    badge: "Hot Spring Culture",
    isWarning: true,
    summary: "Mineral hot springs are communal sanctuaries of deep purification. Strict bathing etiquette must be observed.",
    details: [
      "Wash thoroughly before entering: Sit at the washing stall with stool and basin; shampoo and rinse your body completely clean before stepping one toe into the communal bath water.",
      "Keep towels out of the water: Small modest towels (tenugui) should be rested on top of your head or on the edge of the stone bath, never soaked in the spring water.",
      "Tattoos policy: While attitudes are shifting, traditional onsen still associate tattoos with historic yakuza syndicates. If you have tattoos, book a private bath (Kashikiri-buro), choose a room with private open-air bath (Rotenburo), or visit tattoo-welcoming onsen towns like Kinosaki Onsen in Hyogo."
    ]
  },
  {
    id: "dining-dietary-navigation",
    category: "onsen-dining",
    title: "Navigating Dietary Needs: Halal, Vegetarian, Vegan, Gluten-Free",
    japanese: "食事制限・アレルギー・ベジタリアン",
    badge: "Dining Guidance",
    summary: "Traditional Japanese broths almost universally contain fish dashi and soy sauce. Prepare clear Japanese dietary cards.",
    details: [
      "The 'Dashi' challenge: Even vegetarian-sounding vegetable noodle soups typically use bonito fish flake broth (Katsuo dashi). Specify 'Dashi nashi' (no fish broth) or look for Buddhist temple cuisine (Shojin Ryori).",
      "Gluten-free / Celiac: Traditional soy sauce (shoyu) contains wheat. Carry a printed Japanese celiac card explaining allergy to wheat and soy sauce.",
      "Halal dining: Major cities like Tokyo, Kyoto, and Osaka have certified Halal ramen and Wagyu spots. Look for Japan Halal Association certification."
    ]
  },
  {
    id: "slurping-noodles",
    category: "onsen-dining",
    title: "Slurping Noodles & Oshibori Manners",
    japanese: "麺のすすり方とおしぼりのマナー",
    badge: "Table Customs",
    summary: "Cultural customs at the dinner table that surprise international visitors.",
    details: [
      "Slurping is encouraged: When eating hot soba, ramen, or udon, loudly slurping noodles draws air into the mouth, cooling the noodles and aerating the broth aroma. It signals to the chef that you are enjoying the meal.",
      "The wet towel (Oshibori): Provided before your meal to wipe your hands clean only. Do not use it as a facial towel or napkin to wipe spilled soup off the table.",
      "Saying grace: Say 'Itadakimasu' (I humbly receive) with hands folded before eating, and 'Gochisousama-deshita' (Thank you for the feast) to the chef upon leaving."
    ]
  }
];

export const TravelTipsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<TipCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTips = useMemo(() => {
    return TRAVEL_TIPS_DATA.filter(tip => {
      if (activeCategory !== "all" && tip.category !== activeCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          tip.title.toLowerCase().includes(q) ||
          tip.summary.toLowerCase().includes(q) ||
          tip.japanese.includes(q) ||
          tip.details.some(d => d.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-12">
      {/* 1. Header with authentic Japanese watermark */}
      <div className="relative text-center max-w-3xl mx-auto space-y-4">
        <KanjiWatermark kanji="案内" position="center" className="-top-10" />

        <p className="eyebrow text-xs font-bold uppercase tracking-[0.18em] theme-primary-text flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[var(--gold)]" />
          <span>Cultural Wisdom & Emergency Navigation</span>
        </p>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[var(--ink)] heading-accent">
          Travel Tips & Cultural Field Guide
        </h1>

        <p className="text-sm sm:text-base text-[var(--mute)] max-w-2xl mx-auto leading-relaxed">
          Comprehensive practical guidance, strict cultural taboos to avoid, and exact directions on where to go when you need immediate help in Japan.
        </p>
      </div>

      {/* 2. Interactive Category Filter Dropdown & Search Bar */}
      <div className="theme-card-bg p-4 sm:p-5 rounded-3xl border theme-border shadow-xs space-y-2">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search input (left) */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--mute)] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search guidance by keywords (e.g. chopsticks, lost wallet, onsen tattoos, police box)..."
              className="w-full pl-11 pr-10 py-3 text-sm rounded-full bg-white border-2 theme-border focus:outline-none focus:border-[var(--red)] text-[var(--ink)] placeholder-[var(--mute)] transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-xs text-[var(--mute)] hover:text-[var(--ink)] cursor-pointer"
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Dropdown (on the right of search bar) */}
          <div className="relative shrink-0 w-full sm:w-72">
            <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 theme-primary-text pointer-events-none" />
            <select
              value={activeCategory}
              onChange={e => setActiveCategory(e.target.value as TipCategory)}
              className="w-full pl-10 pr-9 py-3 text-xs sm:text-sm font-semibold rounded-full bg-white border-2 theme-border focus:outline-none focus:border-[var(--red)] text-[var(--ink)] appearance-none cursor-pointer shadow-xs transition-all"
              aria-label="Filter Guidance Category"
            >
              <option value="all">All Guidance ({TRAVEL_TIPS_DATA.length})</option>
              <option value="etiquette">Cultural Etiquette & Taboos</option>
              <option value="emergency">Where to Go: Emergencies & Lost Items</option>
              <option value="transit">Transit & Luggage</option>
              <option value="onsen-dining">Onsen & Dining</option>
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--mute)] pointer-events-none" />
          </div>
        </div>

        {/* Counter & Reset */}
        <div className="flex items-center justify-between text-[11px] text-[var(--mute)] px-2 pt-1">
          <span>
            Showing <strong className="text-[var(--ink)]">{filteredTips.length}</strong> of {TRAVEL_TIPS_DATA.length} tips
          </span>
          {(searchQuery || activeCategory !== "all") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="text-xs font-semibold theme-primary-text hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* 3. Emergency Quick-Reference Banner (Directory) */}
      <div className="bg-linear-to-r from-rose-900 to-[#2B2440] text-white rounded-3xl p-6 sm:p-8 shadow-md space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-[var(--gold)]">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg sm:text-xl">
              Quick Emergency Directory (緊急連絡先まとめ)
            </h3>
            <p className="text-xs text-white/80">
              Save these three essential numbers in your phone before traveling.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/10 space-y-1">
            <span className="text-[10px] uppercase font-bold text-[var(--gold)] tracking-wider block">
              Medical & Ambulance
            </span>
            <span className="text-2xl font-serif font-bold block">119</span>
            <p className="text-[11px] text-white/70">
              Free call from any phone. State: "Kyukyu desu" (Medical emergency).
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/10 space-y-1">
            <span className="text-[10px] uppercase font-bold text-[var(--gold)] tracking-wider block">
              Police & Koban
            </span>
            <span className="text-2xl font-serif font-bold block">110</span>
            <p className="text-[11px] text-white/70">
              For crime, accidents, or walk into the nearest local Koban police box.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/10 space-y-1">
            <span className="text-[10px] uppercase font-bold text-[var(--gold)] tracking-wider block">
              JNTO 24/7 English Hotline
            </span>
            <span className="text-base sm:text-lg font-serif font-bold block truncate">
              050-3816-2787
            </span>
            <p className="text-[11px] text-white/70">
              24/7 multilingual support for tourist emergencies and English clinics.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Tips Grid: Spacious 2-Column Responsive Cards with Symmetrical Alignment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 auto-rows-fr items-stretch">
        {filteredTips.map(tip => (
          <article
            key={tip.id}
            className="theme-card-bg rounded-3xl border theme-border p-6 sm:p-7 hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full"
          >
            <div className="flex flex-col flex-1 space-y-3.5">
              {/* Top Badge & Japanese Subtitle - strictly aligned */}
              <div className="flex items-center justify-between gap-3 min-h-[28px]">
                <span
                  className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 theme-header-bg text-white shadow-2xs"
                >
                  {tip.isEmergency ? (
                    <PhoneCall className="w-3 h-3 text-[var(--gold)]" />
                  ) : tip.isWarning ? (
                    <AlertTriangle className="w-3 h-3 text-[var(--gold)]" />
                  ) : (
                    <CheckCircle2 className="w-3 h-3 text-[var(--gold)]" />
                  )}
                  <span>{tip.badge}</span>
                </span>

                <span className="text-xs font-serif font-bold text-[var(--red)] tracking-wide shrink-0">
                  {tip.japanese}
                </span>
              </div>

              {/* Title with uniform height for symmetrical alignment */}
              <div className="min-h-[3.25rem] flex items-center">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[var(--ink)] leading-snug">
                  {tip.title}
                </h3>
              </div>

              {/* Summary with uniform height */}
              <div className="min-h-[2.75rem] flex items-start">
                <p className="text-xs sm:text-sm text-[var(--ink)]/85 leading-relaxed font-normal">
                  {tip.summary}
                </p>
              </div>

              {/* Detailed Bullet Points - perfectly aligned baseline across cards */}
              <div className="flex-1 space-y-2.5 pt-3.5 pb-3.5 border-t theme-border text-xs text-[var(--mute)] leading-relaxed">
                {tip.details.map((point, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-2">
                    <span className="text-[var(--gold)] font-bold text-sm shrink-0 leading-none mt-0.5">
                      •
                    </span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dedicated Bottom Callout if actionWhereToGo exists - strictly equal min-height and aligned */}
            {tip.actionWhereToGo && (
              <div className="mt-auto pt-3.5 border-t theme-border">
                <div className="bg-amber-50/90 border border-amber-200/80 rounded-xl p-3 text-xs text-amber-900 flex items-center gap-2.5 min-h-[58px]">
                  <Compass className="w-4 h-4 text-amber-700 shrink-0" />
                  <div className="leading-snug">
                    <strong className="font-bold text-amber-950">
                      {tip.actionWhereToGo.label}:{" "}
                    </strong>
                    <span>{tip.actionWhereToGo.action}</span>
                  </div>
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
};
