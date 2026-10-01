import React, { useState, useMemo } from "react";
import { KanjiWatermark } from "@/src/components/decoration/KanjiWatermark";
import { PageId } from "@/src/components/layout/Header";
import {
  HelpCircle,
  Train,
  CreditCard,
  Bath,
  Luggage,
  Calendar,
  UtensilsCrossed,
  Sparkles,
  ChevronDown,
  Search,
  CheckCircle2,
  Info,
  ArrowRight,
  Filter
} from "lucide-react";

interface FaqPageProps {
  onNavigate?: (page: PageId) => void;
}

type FaqCategory =
  | "all"
  | "transit-pass"
  | "culture-onsen"
  | "money-connectivity"
  | "timing-planning";

interface FaqItem {
  id: string;
  category: "transit-pass" | "culture-onsen" | "money-connectivity" | "timing-planning";
  question: string;
  answer: string;
  highlightNote?: string;
  tags: string[];
}

const FAQS_DATA: FaqItem[] = [
  {
    id: "jr-pass-worth-it",
    category: "transit-pass",
    question: "Is the nationwide Japan Rail (JR) Pass still worth buying?",
    answer:
      "For the vast majority of travelers today, the nationwide JR Pass is NO LONGER cost-effective. Following the massive ~65% to 70% price hike enacted by Japan Railways, a 7-day Ordinary Pass now costs ¥50,000. By comparison, a standard round-trip Shinkansen journey between Tokyo and Kyoto or Osaka costs roughly ¥29,000 to ¥31,000. Unless you are traversing immense distances within 7 days (e.g., Tokyo → Kyoto → Hiroshima → Kanazawa → Tokyo), you will lose significant money with a nationwide pass.\n\nInstead, we recommend booking individual point-to-point bullet train tickets via the official SmartEX app or JR West reservation portals, supplemented by a local IC card (Suica/Pasmo/ICOCA) for city subways and regional lines. Alternatively, look at highly economical regional passes like the JR Kansai-Hiroshima Area Pass or the Hokuriku Arch Pass, which offer tremendous value for specific geographic corridors.",
    highlightNote:
      "Curator Tip: Use the 'Jorudan' or 'Navitime' JR Pass Calculator before purchasing to compare your exact itinerary against current ticket fares.",
    tags: ["JR Pass", "Shinkansen", "Budget", "Trains"]
  },
  {
    id: "crowd-avoidance-strategy",
    category: "timing-planning",
    question: "How do I experience iconic sanctuaries like Fushimi Inari and Arashiyama without overwhelming crowds?",
    answer:
      "The single most effective secret to experiencing Japan's world-famous sanctuaries in quiet reverence is what we call the 'Dawn & Twilight Window'. Commercial tour buses rarely arrive before 9:30 AM and usually depart by 4:30 PM.\n\nFor Fushimi Inari Taisha: Arrive between 6:00 AM and 7:00 AM. The gates are open 24/7 with zero admission fee. At this hour, soft morning light filters through the 10,000 vermilion torii, bird song echoes through the sacred cedar forest, and you will share the entire mountain path with perhaps three local dog walkers and a lone Shinto priest. Furthermore, if you hike 30 minutes past the crowded Yotsutsuji intersection toward the mountain summit (Ichinomine), 90% of tourists turn back, leaving the mystical upper shrines in profound silence.\n\nFor Arashiyama Bamboo Grove: Walk the path at 7:00 AM. By 10:00 AM, the narrow corridor is packed shoulder-to-shoulder with selfie sticks. By visiting at dawn, the towering bamboo stalks creak peacefully in the mountain breeze, just as classical poets described.",
    highlightNote:
      "Curator Rule: If an attraction is famous worldwide, visit it before 8:00 AM or after 5:30 PM. Spend your midday hours in tranquil neighborhood backstreets or sub-temples.",
    tags: ["Crowds", "Timing", "Kyoto", "Photography"]
  },
  {
    id: "cash-vs-cards-ic",
    category: "money-connectivity",
    question: "How much cash (JPY) do I realistically need to carry versus credit cards and IC cards?",
    answer:
      "While Japan has modernized rapidly toward cashless payments—with credit cards, Apple Pay, and IC cards (Suica/Pasmo) accepted in virtually all major department stores, convenience chains, and modern restaurants—cash is still non-negotiable for authentic travel.\n\nYou will strictly need physical Japanese Yen cash for:\n1. Temple and shrine entrance admission gates (typically ¥400–¥1,000, almost universally cash-only).\n2. Sacred Goshuin temple calligraphy stamp seals (¥300–¥1,000 cash).\n3. Historic ramen, udon, and soba ticket vending machines (Shokkenki) at local neighborhood joints.\n4. Rural buses and regional coin-operated station luggage lockers.\n5. Traditional market stalls at Nishiki Market (Kyoto) or Kuromon Market (Osaka).\n\nWe advise withdrawing ¥10,000 to ¥15,000 per person from any 7-Eleven (Seven Bank) ATM upon arrival, and keeping a coin pouch in your pocket, as Japanese 100-yen and 500-yen coins are used constantly throughout the day.",
    highlightNote:
      "Curator Tip: Japanese ATMs at 7-Eleven convenience stores accept international Visa and Mastercard with zero foreign network markup. Avoid expensive airport currency exchange counters.",
    tags: ["Cash", "ATMs", "Credit Cards", "Money"]
  },
  {
    id: "onsen-tattoos-rules",
    category: "culture-onsen",
    question: "Can I enter Japanese onsen (hot springs) if I have tattoos, and what are my options?",
    answer:
      "Historically, tattoos (irezumi) in Japan were associated with organized crime syndicates (yakuza). While younger generations and urban areas recognize modern body art, traditional onsen and public bathhouses (sento) still maintain strict 'no tattoo' policies to preserve communal harmony.\n\nHowever, you have multiple wonderful, welcoming options:\n1. Private Baths (Kashikiri-buro): Almost all reputable ryokan offer private onsen rooms that you can reserve by the hour for you and your partner/family. Here, privacy is absolute and tattoo restrictions do not apply.\n2. In-Room Open-Air Baths (Rotenburo-tsuki Kyakushitsu): You can book a traditional tatami room with your own private geothermal hot spring bath on the balcony.\n3. Tattoo-Welcoming Towns: Kinosaki Onsen in Hyogo prefecture officially welcomes all travelers with tattoos in all seven of its public bathhouses. Dogo Onsen in Matsuyama is similarly progressive.\n4. Waterproof Flesh-Toned Patches: If your tattoo is smaller than your palm, you can cover it with a skin-colored waterproof patch (Hada-iro seal, available at any Japanese pharmacy or Don Quijote) before entering communal waters.",
    highlightNote:
      "Curator Rule: Always rinse and wash your body completely at the shower stalls with soap before stepping into the geothermal bath, and never let your modest towel dip into the water.",
    tags: ["Onsen", "Tattoos", "Ryokan", "Etiquette"]
  },
  {
    id: "shinkansen-luggage-rules",
    category: "transit-pass",
    question: "How do Shinkansen luggage rules work, and do I need to reserve special seats for suitcases?",
    answer:
      "On the Tokaido, Sanyo, and Kyushu Shinkansen lines (the routes connecting Tokyo, Mount Fuji, Nagoya, Kyoto, Osaka, and Hiroshima), strict luggage regulations are enforced:\n\n1. Standard Carry-On Luggage (Total dimensions under 160 cm): If the sum of your bag's length + width + height is 160 cm or less (typical medium suitcase), you do NOT need a reservation. It easily fits on the overhead luggage rack above your seat.\n2. Oversized Luggage (Total dimensions 161 cm to 250 cm): If you have large checked suitcases, you MUST reserve a 'Seat with an Oversized Baggage Area' (Tokudaiseki) in advance. These seats are located in the last row of each car with space reserved behind the seats. The reservation is completely free when booking your train ticket in advance, but if you bring oversized luggage aboard without a prior reservation, you will be charged a ¥1,000 penalty fee and the train conductor will reassign your luggage location.\n\nOur Expert Recommendation: Avoid hauling giant suitcases onto trains altogether. Use Japan's legendary luggage forwarding service (Takkyubin / Yamato Transport). For approximately ¥2,000–¥3,000 per bag, your hotel front desk will ship your suitcases overnight directly to your next accommodation, allowing you to travel unencumbered with just a light daypack.",
    highlightNote:
      "Curator Lifehack: Send your main luggage from Tokyo straight to your hotel in Kyoto, and take an overnight backpack to explore Hakone hot springs in between.",
    tags: ["Luggage", "Shinkansen", "Takkyubin", "Transit"]
  },
  {
    id: "dietary-restrictions-japan",
    category: "culture-onsen",
    question: "How can travelers with dietary needs (Halal, Vegetarian, Vegan, Gluten-Free/Celiac) navigate Japanese food?",
    answer:
      "Dining with dietary restrictions in Japan requires careful proactive communication, because traditional Japanese cuisine fundamentally relies on 'Dashi'—a savory umami broth made from dried bonito fish flakes (Katsuobushi) and kelp—which is present in almost all soups, sauces, noodle broths, and simmered vegetables even when no visible meat appears.\n\n1. Vegetarian & Vegan: Ask for Shojin Ryori (精進料理), the sublime Buddhist vegetarian cuisine perfected over centuries in Kyoto and Mount Koya temples. It is 100% plant-based, using seasonal vegetables, tofu, and mushroom-kelp broths.\n2. Gluten-Free / Celiac: Traditional Japanese soy sauce (shoyu) contains wheat. Carry a printed Japanese dietary card explaining that you cannot consume wheat, soy sauce, or barley. Pure buckwheat soba (Juwari Soba, 100% buckwheat) is naturally gluten-free.\n3. Halal Dining: Major cities now feature certified Halal Wagyu yakiniku, Halal ramen (such as Ayam-ya in Kyoto and Tokyo), and certified restaurants vetted by the Japan Halal Association.\n\nWe recommend downloading the 'HappyCow' app and saving bilingual food allergy cards to your smartphone camera roll to present politely to restaurant hosts before being seated.",
    highlightNote:
      "Curator Phrase: 'Watashi wa niku to sakana ga taberaremasen' (I cannot eat meat or fish). 'Dashi mo dame desu' (Fish broth is also not okay).",
    tags: ["Dietary", "Vegetarian", "Halal", "Gluten-Free", "Dining"]
  },
  {
    id: "esim-vs-pocket-wifi",
    category: "money-connectivity",
    question: "Should I choose an eSIM, a Physical SIM card, or a Pocket Wi-Fi router for internet access?",
    answer:
      "Having fast, reliable mobile data is essential in Japan for real-time train transfer navigation (Google Maps or Navitime) and translation.\n\n1. eSIM (Best for Solo & Couples with unlocked phones): Services like Ubigi or Airalo are our top recommendation. You can purchase and install the digital data profile on your iPhone or modern Android before departing home. As soon as your plane touches down at Narita, Haneda, or Kansai airport, you turn on the cellular line and instantly have high-speed 5G data without opening your phone or swapping tiny physical cards.\n2. Pocket Wi-Fi (Best for Families & Groups): A portable hotspot router (from providers like Ninja WiFi or Japan Wireless) allows 4–6 devices (including laptops and tablets) to connect to one unlimited battery-powered device. However, you must remember to keep the unit charged and return it at the airport before departure.\n3. Public Wi-Fi: While expanding, public street Wi-Fi in Japan is notoriously fragmented, often requiring repetitive email logins or disconnecting when walking between city blocks. Never rely solely on free public Wi-Fi for time-sensitive train transfers.",
    highlightNote:
      "Curator Tip: Ubigi offers direct NTT Docomo network priority in Japan, delivering outstanding reception even in deep mountain valleys like Shirakawa-go and Hakone.",
    tags: ["eSIM", "Pocket WiFi", "Internet", "Connectivity"]
  },
  {
    id: "best-season-avoid-surges",
    category: "timing-planning",
    question: "When is the best season to visit Japan for pleasant weather while avoiding peak holiday surcharges?",
    answer:
      "Most international travelers only look at two peak windows: early April for cherry blossoms (Sakura) and mid-November for autumn foliage (Momiji). While breathtaking, these periods experience 2x–3x hotel rates, packed trains, and congested temples.\n\nOur two favorite 'Secret Shoulder Seasons' are:\n1. Late May to Mid-June (Shinryoku / Fresh Verdant Season): Spring cherry blossom crowds have departed, temperatures are a delightful 20°C–24°C, and Japan's forests, gardens, and bamboo groves explode into radiant shades of emerald green. Temple verandas are peaceful, and hotel rates drop significantly.\n2. Late October to Early November: Autumn air turns crisp and dry, mountain skies are crystal clear with stunning visibility of Mount Fuji, and pleasant temperatures make walking 15,000 steps a day effortless before the main foliage tourist surge in late November.\n\nCrucial Dates to AVOID at all costs:\n• Golden Week (Late April to May 5): The entire Japanese population takes holiday; domestic travel surges to peak capacity.\n• Obon Festival (Mid-August): Extreme summer humidity combined with peak domestic family travel.\n• New Year (December 29 to January 3): Shrines are packed, but many private restaurants, shops, and museums shut down completely.",
    highlightNote:
      "Curator Wisdom: May and October offer the absolute sweetest balance of comfortable walking weather, low rainfall, and serene cultural pacing.",
    tags: ["Seasons", "Best Time", "Weather", "Budget"]
  }
];

export const FaqPage: React.FC<FaqPageProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<FaqCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredFaqs = useMemo(() => {
    return FAQS_DATA.filter(faq => {
      if (activeCategory !== "all" && faq.category !== activeCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          faq.question.toLowerCase().includes(q) ||
          faq.answer.toLowerCase().includes(q) ||
          faq.tags.some(t => t.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-12">
      {/* 1. Header with authentic Japanese watermark */}
      <div className="relative text-center max-w-2xl mx-auto space-y-4">
        <KanjiWatermark kanji="問" position="center" className="-top-10" />

        <p className="eyebrow text-xs font-bold uppercase tracking-[0.18em] theme-primary-text flex items-center justify-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-[var(--gold)]" />
          <span>Authoritative Guidance</span>
        </p>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[var(--ink)] heading-accent">
          Frequently Answered Inquiries
        </h1>

        <p className="text-sm sm:text-base text-[var(--mute)] leading-relaxed">
          Comprehensive, field-tested answers to the questions international travelers genuinely ask—from JR Pass math and crowd timing to tattoo etiquette and baggage logistics.
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
              placeholder="Search questions by topic (e.g. JR Pass, luggage, tattoos, cash, seasons, dashi)..."
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
          <div className="relative shrink-0 w-full sm:w-64">
            <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 theme-primary-text pointer-events-none" />
            <select
              value={activeCategory}
              onChange={e => setActiveCategory(e.target.value as FaqCategory)}
              className="w-full pl-10 pr-9 py-3 text-xs sm:text-sm font-semibold rounded-full bg-white border-2 theme-border focus:outline-none focus:border-[var(--red)] text-[var(--ink)] appearance-none cursor-pointer shadow-xs transition-all"
              aria-label="Filter FAQ Category"
            >
              <option value="all">All Topics ({FAQS_DATA.length})</option>
              <option value="transit-pass">JR Pass & Shinkansen</option>
              <option value="culture-onsen">Onsen & Dining</option>
              <option value="money-connectivity">Cash, Cards & eSIM</option>
              <option value="timing-planning">Timing & Crowds</option>
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--mute)] pointer-events-none" />
          </div>
        </div>

        {/* Counter & Reset */}
        <div className="flex items-center justify-between text-[11px] text-[var(--mute)] px-2 pt-1">
          <span>
            Showing <strong className="text-[var(--ink)]">{filteredFaqs.length}</strong> of {FAQS_DATA.length} questions
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

      {/* 3. Detailed Accordion List */}
      <div className="space-y-4">
        {filteredFaqs.map(faq => {
          const isOpen = !!openItems[faq.id];

          return (
            <div
              key={faq.id}
              className="theme-card-bg rounded-2xl border theme-border shadow-xs overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer hover:bg-white/40 transition-colors"
                aria-expanded={isOpen}
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    {faq.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md text-[10px] font-bold theme-tag-bg text-[var(--ink)] border theme-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-serif font-bold text-base sm:text-lg text-[var(--ink)] leading-snug">
                    {faq.question}
                  </h3>
                </div>

                <div
                  className={`w-8 h-8 rounded-full border theme-border flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180 theme-header-bg text-white" : "bg-white text-[var(--ink)]"
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-2 border-t theme-border space-y-4 animate-in fade-in duration-200">
                  <div className="text-xs sm:text-sm text-[var(--ink)]/90 leading-relaxed font-normal whitespace-pre-line space-y-2">
                    {faq.answer}
                  </div>

                  {faq.highlightNote && (
                    <div className="bg-amber-50/90 border border-amber-200/90 rounded-xl p-3.5 text-xs text-amber-950 flex items-start gap-2.5">
                      <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <p className="leading-relaxed font-medium">
                        {faq.highlightNote}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 4. Still have questions banner */}
      <div className="theme-tag-bg p-6 sm:p-8 rounded-3xl border theme-border text-center space-y-4">
        <Info className="w-6 h-6 theme-primary-text mx-auto" />
        <h4 className="font-serif text-xl font-bold text-[var(--ink)]">
          Have a Question Not Answered Here?
        </h4>
        <p className="text-xs sm:text-sm text-[var(--mute)] max-w-lg mx-auto leading-relaxed">
          Submit your travel inquiry via our planning form. Our Kyoto and Tokyo curators review queries and weave answers into your personalized consultation.
        </p>
        <div className="pt-2">
          <button
            onClick={() => onNavigate && onNavigate("plan-trip")}
            className="px-6 py-2.5 rounded-full theme-cta-btn text-white text-xs sm:text-sm font-bold shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <span>Consult Our Curators in Plan a Trip</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
