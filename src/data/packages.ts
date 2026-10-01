export interface TravelPackage {
  id: string;
  title: string;
  japaneseSubtitle: string;
  tagline: string;
  includedDestinations: string[];
  duration: string;
  priceRangeYen: string;
  overview: string;
  highlights: string[];
  bestSeason: string;
  pace: string;
}

export const TRAVEL_PACKAGES: TravelPackage[] = [
  {
    id: "kyoto-ancient-capital",
    title: "Kyoto & Ancient Capital Heritage",
    japaneseSubtitle: "古都巡礼 · 千年の静寂",
    tagline: "A contemplative route connecting Kyoto's sacred torii paths, shimmering pavilions, bamboo groves, and Nara's gentle sacred deer.",
    includedDestinations: [
      "Fushimi Inari Taisha",
      "Kinkaku-ji (The Golden Pavilion)",
      "Arashiyama Bamboo Grove",
      "Nara Park"
    ],
    duration: "6 Days / 5 Nights",
    priceRangeYen: "¥180,000 – ¥250,000 per traveler (Illustrative ballpark for accommodations, rail transit & temple admissions)",
    overview: "Designed for travelers who want to absorb the spiritual heart of Japan at an unhurried, contemplative pace. Rather than dashing across multiple prefectures, this journey centers on the Kansai cradle of classical culture. You will awaken at sunrise to walk the Senbon Torii before crowds gather, hear the wooden chime of Arashiyama's bamboo canopy, marvel at Kinkaku-ji reflected on the Mirror Pond, and take a tranquil morning train south to feed the bowing sika deer beneath the giant bronze Buddha of Nara.",
    highlights: [
      "Early dawn private walk through Fushimi Inari's quiet upper mountain shrines",
      "Traditional matcha tea service overlooking Tenryu-ji's UNESCO Sogenchi garden",
      "Scenic electric tram ride on the retro Keifuku Randen line across western Kyoto",
      "Day excursion to Nara Park and Kasuga Taisha's 3,000 moss-covered stone lanterns"
    ],
    bestSeason: "Late March to Mid-April (Cherry Blossoms) or November (Vibrant Autumn Maples)",
    pace: "Gentle & Contemplative (6–8 km daily walking)"
  },
  {
    id: "feudal-keeps-alpine-peaks",
    title: "Feudal Keeps & Sacred Peaks",
    japaneseSubtitle: "名城と霊峰 · 武士の美学",
    tagline: "From the peerless white ramparts of Himeji to the alpine black timber of Matsumoto and the thermal hot-spring mists framing Mount Fuji.",
    includedDestinations: [
      "Himeji Castle",
      "Osaka Castle",
      "Matsumoto Castle",
      "Mount Fuji",
      "Hakone"
    ],
    duration: "8 Days / 7 Nights",
    priceRangeYen: "¥240,000 – ¥330,000 per traveler (Illustrative ballpark for Shinkansen transit, onsen ryokan with kaiseki & castle entries)",
    overview: "A dramatic visual expedition juxtaposing Japan's greatest samurai defensive fortresses with its most sublime volcanic landscapes. Journey from the pristine 400-year-old white keep of Himeji across to Osaka's monumental megalithic moats. Ascend into the crisp mountain air of Nagano to explore Matsumoto's mysterious 16th-century 'Crow Castle,' before unwinding in Hakone's mineral-rich thermal baths and cruising misty Lake Ashi with Mount Fuji towering on the horizon.",
    highlights: [
      "Deep architectural exploration of Himeji Castle's authentic 1609 wooden keeps and hidden murder-holes",
      "Traditional open-air thermal bath (rotenburo) soaking in Hakone with seasonal kaiseki banquet",
      "Alpine transit through the Shinshu valley beneath the snow-capped Northern Japan Alps",
      "Lake Ashi panoramic cruise and Owakudani volcanic ropeway flight"
    ],
    bestSeason: "April to May (Alpine spring & sakura) or October to November (Crisp clear Fuji vistas)",
    pace: "Moderate (Historic castle staircases & scenic trails)"
  },
  {
    id: "neon-streets-subtropical-azure",
    title: "Neon Streets to Subtropical Azure",
    japaneseSubtitle: "都市の鼓動と南国の海",
    tagline: "Experience the electric kinetic pulse of Tokyo and Osaka before unwinding along the crystal turquoise waters and coral reefs of Okinawa.",
    includedDestinations: [
      "Shibuya Crossing",
      "Senso-ji Temple",
      "Dotonbori",
      "Okinawa (Churaumi Aquarium and Kerama Islands)"
    ],
    duration: "7 Days / 6 Nights",
    priceRangeYen: "¥260,000 – ¥360,000 per traveler (Illustrative ballpark for domestic flights, urban boutique hotels, beachside retreat & culinary tastings)",
    overview: "A breathtaking contrast of hyper-modern sensory exhilaration and remote oceanic tranquility. Begin in Tokyo at Senso-ji's historic incense burners and Shibuya's kinetic pedestrian scramble. Ride the Shinkansen to Osaka for an intoxicating night of takoyaki and canal-side neon in Dotonbori. Then, take a short domestic flight south into the subtropical warmth of the Ryukyu archipelago, swimming alongside sea turtles in the 'Kerama Blue' waters and marveling at whale sharks inside Churaumi Aquarium.",
    highlights: [
      "Sensory food safari through Dotonbori sampling takoyaki, okonomiyaki, and kushikatsu",
      "Rooftop twilight views over the synchronized sea of Shibuya Crossing from Shibuya Sky",
      "High-speed ferry voyage into the pristine coral marine sanctuaries of Kerama Islands National Park",
      "Viewing gentle whale sharks gliding through the colossal Kuroshio Sea tank at Churaumi"
    ],
    bestSeason: "May to June or September to October (Warm subtropical waters and pleasant urban weather)",
    pace: "Dynamic (Urban exploration followed by relaxing island retreats)"
  }
];
