export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: "About Hanami" | "Planning & Itineraries" | "Costs & Logistics" | "Etiquette & Culture";
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "fictional-brand",
    question: "Is Hanami an official tour operator or commercial booking engine?",
    category: "About Hanami",
    answer: "No. Hanami is an independent, non-commercial front-end design portfolio project and cultural travel journal created by a student developer. We do not sell tour packages, process financial transactions, or take booking commissions. The editorial copy, curated itineraries, and photography are designed to demonstrate design craft, cultural sensitivity, and thoughtful front-end engineering."
  },
  {
    id: "pricing-explanation",
    question: "How are the Yen (¥) price ranges calculated, and can I book directly here?",
    category: "Costs & Logistics",
    answer: "All Yen figures shown throughout Hanami are strictly illustrative ballpark ranges based on typical real-world costs for standard mid-range accommodations, domestic Shinkansen and local transit tickets, and official temple/shrine/castle entry fees. They are provided purely as helpful benchmarks for your personal budgeting. Because we are a fictional editorial journal, no transactions can be made on this site."
  },
  {
    id: "cherry-blossom-timing",
    question: "When is the absolute best time to experience cherry blossoms (sakura) in Japan?",
    category: "Planning & Itineraries",
    answer: "Cherry blossom season generally sweeps from southern Japan toward the north between late March and early May. For Tokyo and Kyoto, the typical peak bloom window (mankai) occurs between March 25 and April 8, lasting roughly 5 to 7 days depending on spring temperature shifts and sudden rain. In mountain areas like Matsumoto or northern Kanazawa, blooms typically arrive 1 to 2 weeks later in mid-April. We recommend checking the official Japan Meteorological Corporation Sakura Zensen forecast starting in January."
  },
  {
    id: "jr-pass-vs-ic-cards",
    question: "Do I still need the nationwide Japan Rail (JR) Pass, or are IC cards better?",
    category: "Costs & Logistics",
    answer: "Following the substantial nationwide JR Pass price increases in late 2023, the full country-wide JR Pass is rarely cost-effective for standard routes (such as the classic Tokyo-Kyoto-Osaka golden route). For most travelers, purchasing individual Shinkansen point-to-point tickets (conveniently via the official SmartEX app or station machines) and using a contactless IC card (Suica, Pasmo, or Icoca) for local subways and buses is significantly more economical and allows you to ride the fastest Nozomi bullet trains without surcharge."
  },
  {
    id: "plan-a-trip-form",
    question: "How does the 'Plan a Trip' form work if you don't take bookings?",
    category: "About Hanami",
    answer: "The 'Plan a Trip' page is a front-end simulation of an artisanal itinerary inquiry. When you fill out and submit the form, your choices are validated and confirmed in-interface with a warm, personalized reply from the fictional curator. No sensitive private data is transmitted to external servers or sold to third parties; the interaction confirms directly in your browser."
  },
  {
    id: "wishlist-storage",
    question: "How does the Wishlist feature save my favorite destinations?",
    category: "About Hanami",
    answer: "Your saved destinations are stored directly within your browser's persistent Local Storage. This means your wishlist survives browser refreshes and tab closures on this device without requiring an account or login. You can toggle items on or off from any destination card, within any popup, or filter to your saved items on the Destinations page."
  },
  {
    id: "public-transit-accessibility",
    question: "Can I reach all 16 featured destinations using public transportation alone?",
    category: "Planning & Itineraries",
    answer: "Yes, 15 of the 16 destinations are directly and easily accessible via Japan's world-class public transit network (trains, subways, scenic ropeways, and highway express buses). For Okinawa, while Naha city has a light monorail (Yui Rail) and the Kerama Islands are reached by public passenger ferries, reaching Churaumi Aquarium in northern Motobu is best done via express highway buses or an affordable rental car."
  },
  {
    id: "photography-licensing",
    question: "Where are the destination photographs sourced, and how are they licensed?",
    category: "Etiquette & Culture",
    answer: "Every photograph depicting the 16 real destinations is a genuine, authentic photograph sourced through web search and curated from Wikimedia Commons under Creative Commons licenses (CC BY, CC BY-SA, or Public Domain). Full file titles and search queries are documented inside each destination record and attributed in the site footer."
  }
];
