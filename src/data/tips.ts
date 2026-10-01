export interface TravelTip {
  id: string;
  title: string;
  kanji: string;
  category: string;
  readTime: string;
  summary: string;
  sections: Array<{
    heading: string;
    body: string;
  }>;
  curatorInsight: string;
}

export const TRAVEL_TIPS: TravelTip[] = [
  {
    id: "shrine-and-temple-etiquette",
    title: "Shrine & Temple Etiquette: Crossing Sacred Thresholds",
    kanji: "礼拝の作法",
    category: "Sacred Spaces & Culture",
    readTime: "4 min read",
    summary: "The essential rituals of bowing at torii gates, purifying hands at the temizuya water pavilion, and honoring the distinction between Shinto shrines and Buddhist temples.",
    sections: [
      {
        heading: "1. The Boundary of the Torii & Sanmon Gates",
        body: "When approaching a Shinto shrine, the vermilion or stone torii marks the physical border between the profane mundane world and sacred ground. Before stepping through, pause, bow slightly toward the inner sanctuary, and step forward. Crucially, walk along the sides of the path (sando)—the exact center is traditionally reserved for the kami (spirits). At Buddhist temples, step gently over the raised wooden threshold of the Sanmon gate without stepping directly onto it."
      },
      {
        heading: "2. The Temizuya Water Purification Ritual",
        body: "Before praying, approach the stone water basin (temizuya). Take the wooden ladle in your right hand, scoop fresh water, and pour it gently over your left hand. Switch hands to wash your right. Switch back to your right hand, cup water into your left palm to rinse your mouth quietly (never drink directly from the ladle or swallow the water), then tilt the ladle upright so the remaining water flows down the handle to cleanse it for the next visitor."
      },
      {
        heading: "3. Prayer at a Shinto Shrine: Two Bows, Two Claps, One Bow",
        body: "Toss a 5-yen coin (considered auspicious for 'go-en', meaning fateful good fortune) gently into the wooden offering box (saisen-bako). If there is a bell cord, ring it once firmly to alert the deity. Then follow the age-old sequence: bow deeply twice (90 degrees), clap your hands twice firmly with right fingers slightly lowered, hold your palms together in silent gratitude or prayer, and finish with one final deep bow."
      },
      {
        heading: "4. Quiet Respect at Buddhist Temples: Silent Palms",
        body: "At Buddhist temples like Senso-ji or Kinkaku-ji, DO NOT clap your hands. Instead, toss your coin, bow your head gently, place your palms together silently in gassho at chest height, and bow once. If there is a jōkōro incense burner, you may purchase an incense bundle, light it, and gently waft the aromatic smoke toward your head or body parts needing healing."
      }
    ],
    curatorInsight: "Japanese priests and locals are remarkably forgiving of foreign travelers making small missteps. What matters above all is sincere intentionality, lowered voices, and walking with presence rather than rushing for a photo."
  },
  {
    id: "cherry-blossom-season-reality",
    title: "Cherry Blossom Season: Timing, Crowds & Hanami Etiquette",
    kanji: "桜前線と花見",
    category: "Seasonal Travel",
    readTime: "5 min read",
    summary: "What chasing the sakura bloom truly entails—navigating the fleeting 7-day peak, reading the bloom forecast, and respecting living trees.",
    sections: [
      {
        heading: "1. The Fleeting 7-Day Window (Mankai)",
        body: "Cherry blossoms are not a month-long event; a tree's full bloom (mankai) typically lasts only 5 to 7 days before spring winds and rain scatter the petals in a delicate blizzard known as 'hanafubuki'. The bloom moves from south to north along the 'Sakura Zensen' (Cherry Blossom Front): starting in late March in Tokyo and Kyoto, reaching Nagano and Kanazawa in mid-April, and arriving in Hokkaido in May. Build flexibility into your itinerary rather than fixing your days to a single park."
      },
      {
        heading: "2. Embracing the Realities of Crowds",
        body: "Popular spots like Tokyo's Meguro River, Kyoto's Maruyama Park, and Mount Fuji's Chureito Pagoda draw tens of thousands of visitors daily. If you crave serene contemplation, set your alarm for dawn. Between 6:00 AM and 8:00 AM, morning mist and soft sunrise light illuminate the blossoms with barely another soul in sight."
      },
      {
        heading: "3. Hanami Picnic Manners & Tree Protection",
        body: "Hanami (flower viewing) is a convivial social tradition where friends spread blue plastic tarps beneath the trees to share bento boxes and sake. If you partake: NEVER touch, shake, pull, or break cherry branches to cause falling petals. Never climb trees or step on protruding surface roots. Always carry a small plastic bag for your garbage—public trash cans are scarce in Japan, and littering is deeply frowned upon."
      }
    ],
    curatorInsight: "In Japanese aesthetics, mono no aware—the gentle sadness at the impermanence of all things—is the true spirit of hanami. The beauty is heightened precisely because it does not last."
  },
  {
    id: "train-and-transit-navigation",
    title: "Navigating Japanese Rail: Shinkansen, IC Cards & Manners",
    kanji: "鉄道の心得",
    category: "Transit & Logistics",
    readTime: "4 min read",
    summary: "Mastering contactless IC cards, booking bullet train oversize luggage seats, and maintaining quiet etiquette on public transit.",
    sections: [
      {
        heading: "1. The Power of Contactless IC Cards",
        body: "A rechargeable IC card (Suica, Pasmo in Tokyo, or Icoca in Kansai) is the single most valuable tool for travel in Japan. They are mutually interoperable nationwide across subways, buses, suburban railways, and vending machines. iPhone users can add a digital Suica or Pasmo directly into Apple Wallet in seconds with zero queues."
      },
      {
        heading: "2. Bullet Train (Shinkansen) Luggage Regulations",
        body: "If traveling with large suitcases where total dimensions (length + width + height) exceed 160 cm (up to 250 cm), you MUST book a specific 'Seat with an Oversized Baggage Area' on the Tokaido/Sanyo/Kyushu Shinkansen lines. This reservation is free when purchasing your ticket in advance via the SmartEX app or ticket counter, but carrying large luggage aboard without this reservation incurs a ¥1,000 onboard penalty and luggage relocation."
      },
      {
        heading: "3. Onboard Train Etiquette",
        body: "Japanese trains are tranquil, shared sanctuaries. Set your mobile phone to 'Manner Mode' (silent) and refrain entirely from voice phone calls while onboard. Keep conversations at a low whisper. When wearing a bulky backpack, remove it and carry it in front of your chest or place it on the overhead luggage rack to avoid bumping seated passengers."
      }
    ],
    curatorInsight: "Don't overlook Japan's regional express trains (like the Odakyu Romancecar to Hakone or the Hida Wide View to Gifu)—they offer panoramic viewing windows and nostalgic retro charm that bullet trains rush past."
  },
  {
    id: "packing-and-walking-preparedness",
    title: "Seasonal Packing: Footwear, Steps & Sacred Thresholds",
    kanji: "旅路の装備",
    category: "Gear & Practicalities",
    readTime: "3 min read",
    summary: "Why easily removable shoes are essential, surviving steep castle stairways, and preparing for sudden weather shifts.",
    sections: [
      {
        heading: "1. The Footwear Equation: 15,000 to 25,000 Steps Daily",
        body: "Visiting Japan involves extensive walking: vast train stations with underground labyrinths, mountain stone trails at Fushimi Inari, and sprawling castle courtyards. Wear well-cushioned, supportive shoes that you have already thoroughly broken in. More importantly, choose footwear that slips on and off easily, as you will remove your shoes multiple times a day at temples, traditional ryokan, and historic castle keeps."
      },
      {
        heading: "2. The Importance of Clean, Presentable Socks",
        body: "Because you will walk barefoot or in socks across delicate tatami straw mats and polished historic floorboards, always wear clean, high-quality socks with no holes or threadbare heels. In winter, pack warm woolen socks, as unheated wooden temple floors and castle keeps can feel icy underfoot."
      },
      {
        heading: "3. Layering for Alpine and Coastal Microclimates",
        body: "Japan's geography is intensely mountainous. A sunny 20°C afternoon in Tokyo can be followed by a freezing 2°C twilight in Matsumoto, windy sulfur gusts in Hakone, or humid subtropical sea breezes in Okinawa. Pack a lightweight packable down jacket, a breathable waterproof shell, and a compact umbrella."
      }
    ],
    curatorInsight: "Consider utilizing 'Takkyubin' (luggage forwarding service) between major hotels. For roughly ¥2,000 per bag, Yamato Transport (the famous black cat logo) will deliver your heavy suitcases overnight, freeing you to travel with a light daypack on scenic rural trains."
  },
  {
    id: "respecting-wildlife-and-communities",
    title: "Living Neighborhoods & Sacred Wildlife: Nara & Gion",
    kanji: "共生と敬意",
    category: "Responsible Travel",
    readTime: "4 min read",
    summary: "Treating wild creatures with care, honoring private residential alleys in historic districts, and sustaining overtourism-strained communities.",
    sections: [
      {
        heading: "1. Nara's Sacred Deer: Messengers, Not Pets",
        body: "Nara's sika deer are protected wild animals, not domesticated pets. Feed them only sanctioned shika-senbei crackers. Never feed them human snacks, bread, paper, or plastic wrappers. When offering a cracker, bow politely and offer it flat on your open palm. When your crackers run out, hold both empty hands open toward them; they will understand the signal and calmly disperse."
      },
      {
        heading: "2. Preserving Quiet in Historic Residential Alleys",
        body: "In Kyoto's Gion, Shirakawa-go, and Kanazawa's Higashi Chaya district, remember that these picturesque wooden streets are homes where families live and sleep. Do not block narrow pathways, do not touch geiko or maiko walking to appointments, and strictly obey 'No Photography' signs posted in private residential lanes."
      },
      {
        heading: "3. Cash vs. Digital Payments",
        body: "While credit cards and IC cards are standard across modern cities, rural ticket kiosks, temple admission counters, small street food stalls in Dotonbori, and coin lockers frequently accept ONLY cash. Always keep ¥5,000 to ¥10,000 in crisp banknotes and a small coin pouch with you."
      }
    ],
    curatorInsight: "Travel in Japan is a practice of reciprocal mindfulness. When you tread lightly and show awareness of your surroundings, locals will open their hearts to you with unmatched warmth and hospitality."
  }
];
