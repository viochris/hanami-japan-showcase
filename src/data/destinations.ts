/**
 * Destination dataset for Hanami — 16 Real Japanese Destinations
 * Section 7.1 Fixed Roster (exact names, categories, and regions)
 * Enhanced with authentic Local Insights & real Wikimedia Commons imagery
 */

export interface GalleryImage {
  url: string;
  caption: string;
  source: string;
  searchTermOrSource: string;
}

export type DestinationCategory =
  | "All"
  | "Shrines & Temples"
  | "Castles"
  | "Nature & Mountains"
  | "Gardens & Traditional Villages"
  | "Modern Cityscapes"
  | "Islands & Coast";

export interface Destination {
  id: string;
  name: string;
  japaneseName: string;
  region: string;
  category: DestinationCategory;
  oneLineHook: string;
  bestSeason: string;
  suggestedDuration: string;
  illustrativeCostYen: string;
  editorialDescription: string;
  visitorPreparednessNote: string;
  localInsight: string;
  mapQuery: string;
  mapCoordinates: { lat: number; lng: number };
  gallery: GalleryImage[];
}

export const DESTINATIONS: Destination[] = [
  {
    "id": "mount-fuji",
    "name": "Mount Fuji",
    "japaneseName": "富士山",
    "region": "Shizuoka / Yamanashi",
    "category": "Nature & Mountains",
    "oneLineHook": "Japan's sacred volcanic spire, crowned in eternal snow and venerated across millennia of poetry and art.",
    "bestSeason": "July to September (Climbing) / April & November (Scenic Viewing)",
    "suggestedDuration": "Full day excursion or 2-day mountain hut trek",
    "illustrativeCostYen": "¥1,000 – ¥4,500 (Free park viewing; optional climbing conservation fee & shuttle bus)",
    "editorialDescription": "Rising symmetrically to 3,776 meters above sea level, Mount Fuji (Fuji-san) is far more than a geographical peak—it is an enduring spiritual axis of Japan and a UNESCO World Heritage cultural site. Whether mirrored upside-down across the calm waters of Lake Kawaguchiko, framed behind the five-story pagoda of Arakurayama Sengen Park amidst tumbling cherry blossoms, or glimpsed from the Shinkansen speeding south toward Kansai, Fuji's presence commands quiet reverence. Each season remakes its profile: pristine winter mantles of snow, vibrant spring sakura framing the foothills, and the crimson sunrise (goraiko) greeting dawn climbers in late summer.",
    "visitorPreparednessNote": "Respect the mountain's volatile alpine climate. If hiking the Yoshida or Subashiri trails during the official July–September season, sturdy broken-in hiking boots, thermal layers, rain gear, and headlamps are essential—temperatures at the summit drop below freezing even in August. Casual summit ascents in sneakers are dangerous. For lakeside sightseeing, early mornings (before 9:00 AM) offer the clearest cloud-free views before thermal updrafts shroud the peak.",
    "localInsight": "Did you know? The summit of Mount Fuji is not public property. From the 8th station upward (above 3,250 meters), the land is privately owned by Fujisan Hongū Sengen Taisha shrine, officially ceded to them in 1606 by Shōgun Tokugawa Ieyasu in gratitude for his victory at the decisive Battle of Sekigahara.",
    "mapQuery": "Mount Fuji, Kitayama, Fujinomiya, Shizuoka, Japan",
    "mapCoordinates": {
      "lat": 35.3606,
      "lng": 138.7274
    },
    "gallery": [
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f8/View_of_Mount_Fuji_from_%C5%8Cwakudani_20211202.jpg/1280px-View_of_Mount_Fuji_from_%C5%8Cwakudani_20211202.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Mount Fuji — View of Mount Fuji from Ōwakudani 20211202.jpg",
        "source": "Wikimedia Commons (File:View_of_Mount_Fuji_from_Ōwakudani_20211202.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Mount Fuji\""
      },
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/51/Aerial_panorama_of_Mount_Fuji_from_Lake_Saiko._June_2023.jpg/1280px-Aerial_panorama_of_Mount_Fuji_from_Lake_Saiko._June_2023.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Mount Fuji — Aerial panorama of Mount Fuji from Lake Saiko. June 2023.jpg",
        "source": "Wikimedia Commons (File:Aerial_panorama_of_Mount_Fuji_from_Lake_Saiko._June_2023.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Mount Fuji\""
      },
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ef/Aerial_panorama_of_Mount_Fuji_with_Saiko_Iyashi-no-Sato_Nenba_in_the_foreground._June_2023.jpg/1280px-Aerial_panorama_of_Mount_Fuji_with_Saiko_Iyashi-no-Sato_Nenba_in_the_foreground._June_2023.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Mount Fuji — Aerial panorama of Mount Fuji with Saiko Iyashi-no-Sato Nenba in the foreground. June 2023.jpg",
        "source": "Wikimedia Commons (File:Aerial_panorama_of_Mount_Fuji_with_Saiko_Iyashi-no-Sato_Nenba_in_the_foreground._June_2023.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Mount Fuji\""
      },
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/00/%E3%80%8C%E5%AF%8C%E5%B6%BD%E4%B8%89%E5%8D%81%E5%85%AD%E6%99%AF_%E5%87%B1%E9%A2%A8%E5%BF%AB%E6%99%B4%E3%80%8D-South_Wind%2C_Clear_Sky_%28Gaif%C5%AB_kaisei%29%2C_also_known_as_Red_Fuji%2C_from_the_series_Thirty-six_Views_of_Mount_Fuji_%28Fugaku_sanj%C5%ABrokkei%29_MET_DP141062.jpg/1280px-thumbnail.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Mount Fuji — 「富嶽三十六景 凱風快晴」-South Wind, Clear Sky (Gaifū kaisei), also known as Red Fuji, from the series Thirty-six Views of Mount Fuji (Fugaku sanjūrokkei) MET DP141062.jpg",
        "source": "Wikimedia Commons (File:「富嶽三十六景_凱風快晴」-South_Wind,_Clear_Sky_(Gaifū_kaisei),_also_known_as_Red_Fuji,_from_the_series_Thirty-six_Views_of_Mount_Fuji_(Fugaku_sanjūrokkei)_MET_DP141062.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Mount Fuji\""
      }
    ]
  },
  {
    "id": "fushimi-inari-taisha",
    "name": "Fushimi Inari Taisha",
    "japaneseName": "伏見稲荷大社",
    "region": "Kyoto",
    "category": "Shrines & Temples",
    "oneLineHook": "Ten thousand vermilion torii gates weaving an ethereal mountain pilgrimage dedicated to the Shinto deity of agriculture.",
    "bestSeason": "Year-round (Early mornings at sunrise or dusk for atmospheric lantern light)",
    "suggestedDuration": "2 to 3 hours for the mountain trail circuit",
    "illustrativeCostYen": "¥0 (Grounds are free and open 24 hours daily)",
    "editorialDescription": "Founded in 711 AD, Fushimi Inari Taisha is the mother shrine for more than 30,000 Inari sanctuaries across Japan. The shrine complex ascends Mount Inari through the iconic Senbon Torii—a winding scarlet arcade where thousands of lacquered wooden gates stand shoulder-to-shoulder, filtering forest sunlight into a warm, otherworldly glow. Stone fox statues (kitsune), the messengers of Inari, guard the pathways holding symbolic keys to grain storehouses and jewels in their jaws. As you ascend past the mid-mountain Yotsutsuji intersection, the tour crowds disperse into moss-covered stone altars, sacred streams, and panoramic vistas over southern Kyoto.",
    "visitorPreparednessNote": "The complete mountain loop is roughly 4 kilometers of uneven, continuous stone staircases. Sturdy walking shoes with reliable grip are mandatory; high heels or slick sandals will cause fatigue and slips. While the grounds are open 24/7, lighting along the upper mountain trail is dim after twilight, so carry a phone flashlight if visiting at dusk. Remember this is an active sacred sanctuary: maintain quiet, refrain from running through the torii, and pack out all personal trash.",
    "localInsight": "Did you know? Every single one of the thousands of torii gates lining the paths is privately donated by businesses, craft guilds, and families seeking good fortune. If you look at the reverse side of any gate as you walk up, you will see the donor's company name or individual kanji, their hometown, and the exact year and month of their dedication hand-carved in black calligraphy.",
    "mapQuery": "Fushimi Inari Taisha, Fukakusa Yabunouchicho, Fushimi Ward, Kyoto, Japan",
    "mapCoordinates": {
      "lat": 34.9671,
      "lng": 135.7727
    },
    "gallery": [
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0e/Torii_path_with_lantern_at_Fushimi_Inari_Taisha_Shrine%2C_Kyoto%2C_Japan.jpg/1280px-Torii_path_with_lantern_at_Fushimi_Inari_Taisha_Shrine%2C_Kyoto%2C_Japan.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Fushimi Inari Taisha — Torii path with lantern at Fushimi Inari Taisha Shrine, Kyoto, Japan.jpg",
        "source": "Wikimedia Commons (File:Torii_path_with_lantern_at_Fushimi_Inari_Taisha_Shrine,_Kyoto,_Japan.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Fushimi Inari Taisha\""
      },
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/76/Nobu3withfoxy_IMG_0155_%2814564801685%29.jpg/1280px-Nobu3withfoxy_IMG_0155_%2814564801685%29.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Fushimi Inari Taisha — Nobu3withfoxy IMG 0155 (14564801685).jpg",
        "source": "Wikimedia Commons (File:Nobu3withfoxy_IMG_0155_(14564801685).jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Fushimi Inari Taisha\""
      },
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0c/Fushimi-Inari-Shrine-Senbon-Torii-2018-Luka-Peternel.jpg/500px-Fushimi-Inari-Shrine-Senbon-Torii-2018-Luka-Peternel.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Fushimi Inari Taisha — Fushimi-Inari-Shrine-Senbon-Torii-2018-Luka-Peternel.jpg",
        "source": "Wikimedia Commons (File:Fushimi-Inari-Shrine-Senbon-Torii-2018-Luka-Peternel.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Fushimi Inari Taisha\""
      },
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e4/Fushimi-Inari-Shrine-Senbon-Torii-2016-Luka-Peternel.jpg/500px-Fushimi-Inari-Shrine-Senbon-Torii-2016-Luka-Peternel.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Fushimi Inari Taisha — Fushimi-Inari-Shrine-Senbon-Torii-2016-Luka-Peternel.jpg",
        "source": "Wikimedia Commons (File:Fushimi-Inari-Shrine-Senbon-Torii-2016-Luka-Peternel.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Fushimi Inari Taisha\""
      }
    ]
  },
  {
    "id": "kinkaku-ji",
    "name": "Kinkaku-ji (The Golden Pavilion)",
    "japaneseName": "金閣寺",
    "region": "Kyoto",
    "category": "Shrines & Temples",
    "oneLineHook": "A gilded Zen sanctuary shimmering on the edge of the Mirror Pond, embodying Muromachi elegance and spiritual stillness.",
    "bestSeason": "Late Autumn (Crimson maples) / Mid-Winter (Snowfall over gold)",
    "suggestedDuration": "1 to 1.5 hours",
    "illustrativeCostYen": "¥500 (Adult admission ticket, presented as an authentic protective ofuda paper talisman)",
    "editorialDescription": "Officially known as Rokuon-ji, Kinkaku-ji is one of the most recognizable structures on Earth. Rising over the reflective waters of Kyōko-chi (Mirror Pond), the top two stories of this Zen Buddhist pavilion are coated in brilliant 24-karat gold leaf. The architectural design seamlessly fuses three distinct historical styles: the first floor echoes 11th-century Shinden palace courts; the second reflects the refined Buke style of samurai warrior residences; and the third embodies Zen monastic halls, crowned by a radiant bronze Chinese phoenix (hōō). Surrounding stroll gardens integrate sacred islets, weathered boulders gifted by medieval daimyo, and meticulously sculpted Japanese red pines.",
    "visitorPreparednessNote": "Kinkaku-ji enforces a strictly managed, one-way visitor walking route through the gravel paths. The pavilion interior is closed to the general public; viewing is from across the pond. Tripods, selfie sticks, and drones are strictly prohibited to ensure flow and preserve the peaceful courtyard atmosphere. Plan your arrival right at the 9:00 AM gate opening or during late afternoon to witness the sunlight striking the pavilion's gold leaf against the forested northern hills.",
    "localInsight": "Did you know? The Golden Pavilion was completely rebuilt in 1955 after a novice monk tragically burned it down in 1950—an event immortalized by Yukio Mishima in his acclaimed novel 'The Temple of the Golden Pavilion'. The restoration employed 20 kilograms of gold leaf, five times thicker than the original coating, ensuring its radiant sheen withstands the elements for centuries.",
    "mapQuery": "Kinkaku-ji, Kinkakujicho, Kita Ward, Kyoto, Japan",
    "mapCoordinates": {
      "lat": 35.0394,
      "lng": 135.7292
    },
    "gallery": [
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0f/Golden_Pavilion_Kinkaku-ji_water_mirror_2024.jpg/1280px-Golden_Pavilion_Kinkaku-ji_water_mirror_2024.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Kinkaku-ji (The Golden Pavilion) — Golden Pavilion Kinkaku-ji water mirror 2024.jpg",
        "source": "Wikimedia Commons (File:Golden_Pavilion_Kinkaku-ji_water_mirror_2024.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Kinkaku-ji (The Golden Pavilion)\""
      },
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/41/Kinkaku-ji%2C_Kyoto.jpg/1280px-Kinkaku-ji%2C_Kyoto.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Kinkaku-ji (The Golden Pavilion) — Kinkaku-ji, Kyoto.jpg",
        "source": "Wikimedia Commons (File:Kinkaku-ji,_Kyoto.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Kinkaku-ji (The Golden Pavilion)\""
      },
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/dc/Japon-1886-41.jpg/1280px-Japon-1886-41.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Kinkaku-ji (The Golden Pavilion) — Japon-1886-41.jpg",
        "source": "Wikimedia Commons (File:Japon-1886-41.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Kinkaku-ji (The Golden Pavilion)\""
      },
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/49/Burned_Kinkaku.jpg/500px-Burned_Kinkaku.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Kinkaku-ji (The Golden Pavilion) — Burned Kinkaku.jpg",
        "source": "Wikimedia Commons (File:Burned_Kinkaku.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Kinkaku-ji (The Golden Pavilion)\""
      }
    ]
  },
  {
    "id": "arashiyama-bamboo-grove",
    "name": "Arashiyama Bamboo Grove",
    "japaneseName": "嵐山竹林の小径",
    "region": "Kyoto",
    "category": "Nature & Mountains",
    "oneLineHook": "A soaring corridor of emerald moso stalks whispering in the river breeze beneath the forested foothills of western Kyoto.",
    "bestSeason": "Mid-Spring (Fresh green shoots) / Early Summer / Mid-Autumn",
    "suggestedDuration": "1.5 to 2.5 hours (combining Tenryu-ji gardens and the bamboo pathway)",
    "illustrativeCostYen": "¥0 (Bamboo path is free; adjacent UNESCO Tenryu-ji garden admission is ¥500)",
    "editorialDescription": "In Kyoto's scenic western Arashiyama district, centuries of imperial aristocrats and Zen masters retreated to write poetry along the Oi River. The heart of the district is the Bamboo Grove (Chikurin no Komichi), where towering green moso stalks rise dozens of meters into the sky, filtering the morning sun into a soft jade canopy. As the wind moves down from Mount Ogura, the hollow stalks sway and knock against one another with an unmistakable wooden chime. The path gently connects the world-heritage garden of Tenryu-ji Temple with the quiet moss gardens of Okochi Sanso Villa and the romantic Nonomiya Shrine.",
    "visitorPreparednessNote": "Because of its immense popularity, Arashiyama's central grove can become heavily crowded by mid-morning. To experience the tranquil, contemplative ambiance it was created for, arrive before 7:30 AM when the morning mist still lingers and local monks cycle past. Wear comfortable shoes for walking on compact dirt and cobblestone paths, and never carve initials or scratch the delicate bamboo stalks—damage permanently kills these historic plants.",
    "localInsight": "Did you know? The sound of wind rustling through the stalks in Arashiyama was officially designated by the Japanese Ministry of the Environment as one of the '100 Soundscapes of Japan' (Nihon no Oto Fūkei 100-sen), selected to encourage travelers to pause, quiet their voices, and immerse themselves in the acoustic heritage of nature.",
    "mapQuery": "Arashiyama Bamboo Grove, Kyoto, Japan",
    "mapCoordinates": {
      "lat": 35.0169,
      "lng": 135.6713
    },
    "gallery": [
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c2/Arashiyama%2C_Part_II_-_Arashiyama7534.jpg/1280px-Arashiyama%2C_Part_II_-_Arashiyama7534.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Arashiyama Bamboo Grove — Arashiyama, Part II - Arashiyama7534.jpg",
        "source": "Wikimedia Commons (File:Arashiyama,_Part_II_-_Arashiyama7534.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Arashiyama Bamboo Grove\""
      },
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/af/Aerial_perspective_of_Arashiyama_Park_Nakanoshima_Area_%E5%B5%90%E5%B1%B1%E5%85%AC%E5%9C%92_%E4%B8%AD%E4%B9%8B%E5%B3%B6%E5%9C%B0%E5%8C%BA.jpg/1280px-Aerial_perspective_of_Arashiyama_Park_Nakanoshima_Area_%E5%B5%90%E5%B1%B1%E5%85%AC%E5%9C%92_%E4%B8%AD%E4%B9%8B%E5%B3%B6%E5%9C%B0%E5%8C%BA.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Arashiyama Bamboo Grove — Aerial perspective of Arashiyama Park Nakanoshima Area 嵐山公園 中之島地区.jpg",
        "source": "Wikimedia Commons (File:Aerial_perspective_of_Arashiyama_Park_Nakanoshima_Area_嵐山公園_中之島地区.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Arashiyama Bamboo Grove\""
      },
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/48/Aerial_panorama_of_Arashiyama_%28%E5%B5%90%E5%B1%B1%29.jpg/1280px-Aerial_panorama_of_Arashiyama_%28%E5%B5%90%E5%B1%B1%29.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Arashiyama Bamboo Grove — Aerial panorama of Arashiyama (嵐山).jpg",
        "source": "Wikimedia Commons (File:Aerial_panorama_of_Arashiyama_(嵐山).jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Arashiyama Bamboo Grove\""
      },
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/de/Arashiyama_013.jpg/500px-Arashiyama_013.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Arashiyama Bamboo Grove — Arashiyama 013.jpg",
        "source": "Wikimedia Commons (File:Arashiyama_013.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Arashiyama Bamboo Grove\""
      }
    ]
  },
  {
    "id": "himeji-castle",
    "name": "Himeji Castle",
    "japaneseName": "姫路城",
    "region": "Hyogo",
    "category": "Castles",
    "oneLineHook": "The 'White Heron Castle'—Japan's greatest surviving samurai fortress, an immaculate masterpiece of defensive genius.",
    "bestSeason": "Late March to Mid-April (Over 1,000 blooming sakura trees in the outer baileys)",
    "suggestedDuration": "2.5 to 3.5 hours",
    "illustrativeCostYen": "¥1,000 (Adult castle grounds & main keep admission)",
    "editorialDescription": "Rising above the plains of Hyogo Prefecture like a majestic bird poised for flight, Himeji Castle (Shirasagi-jō) is universally acknowledged as the finest surviving example of early 17th-century Japanese castle architecture. Unlike many castles that were reconstructed in concrete after wartime bombing, Himeji's central five-story keep and labyrinth of 83 defensive buildings are authentic wood and stone originals dating back to 1609. Its blinding white plaster walls are engineered from slaked lime and crushed conch shell. Behind its serene exterior lies an impregnable military puzzle: deceptive spiral gateways, concealed arrow and musket loops (sama), and sheer polished stone drop-offs (musha-gaeshi).",
    "visitorPreparednessNote": "Entering the main keep requires removing your outdoor footwear at the entry threshold and carrying your shoes in a provided bag. The wooden interior contains five flights of extremely steep, narrow staircases (up to 50-degree inclines) polished silky-smooth by millions of stockinged feet. Wear clean, non-slip socks, and keep both hands free for the handrails. Large backpacks must be checked in lockers at the gate.",
    "localInsight": "Did you know? Himeji Castle survived both the heavy carpet bombings of World War II and the cataclysmic 1995 Great Hanshin Earthquake completely unscathed. During an air raid in 1945, an incendiary bomb crashed directly through the roof into the top floor of the main keep—miraculously failing to ignite, preserving this 400-year-old wooden miracle for future generations.",
    "mapQuery": "Himeji Castle, Honmachi, Himeji, Hyogo, Japan",
    "mapCoordinates": {
      "lat": 34.8394,
      "lng": 134.6939
    },
    "gallery": [
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c1/Himeji_castle_in_may_2015.jpg/1280px-Himeji_castle_in_may_2015.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Himeji Castle — Himeji castle in may 2015.jpg",
        "source": "Wikimedia Commons (File:Himeji_castle_in_may_2015.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Himeji Castle\""
      },
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e8/Himeji_Castle_Aerial_photograph_2010.jpg/1280px-Himeji_Castle_Aerial_photograph_2010.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Himeji Castle — Himeji Castle Aerial photograph 2010.jpg",
        "source": "Wikimedia Commons (File:Himeji_Castle_Aerial_photograph_2010.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Himeji Castle\""
      },
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/33/Ch%C3%A2teau_de_Himeji01.jpg/1280px-Ch%C3%A2teau_de_Himeji01.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Himeji Castle — Château de Himeji01.jpg",
        "source": "Wikimedia Commons (File:Château_de_Himeji01.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Himeji Castle\""
      },
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/31/Old_map_of_Himeji_castle.jpg/330px-Old_map_of_Himeji_castle.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Himeji Castle — Old map of Himeji castle.jpg",
        "source": "Wikimedia Commons (File:Old_map_of_Himeji_castle.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Himeji Castle\""
      }
    ]
  },
  {
    "id": "osaka-castle",
    "name": "Osaka Castle",
    "japaneseName": "大阪城",
    "region": "Osaka",
    "category": "Castles",
    "oneLineHook": "Toyotomi Hideyoshi's storied bastion, surrounded by colossal stone moats and sweeping urban parkland.",
    "bestSeason": "Spring (Cherry blossoms) / Late Autumn (Golden ginkgo avenues)",
    "suggestedDuration": "2 to 3 hours",
    "illustrativeCostYen": "¥600 (Main museum keep admission; surrounding 106-hectare park is free)",
    "editorialDescription": "Originally built in 1583 by the warlord Toyotomi Hideyoshi as the intended center of a unified Japan, Osaka Castle is a towering symbol of Kansai pride and martial determination. Set within a massive park encircled by monumental moats and steep stone ramparts that rival any fortress in the world, the castle keep rises eight stories high with copper-plated roof accents and gold-leaf tiger ornaments (shachihoko). Inside, a modern museum unfolds the drama of the 1614–1615 Siege of Osaka that solidified the Tokugawa shogunate, concluding on the observation deck with sweeping 360-degree views across Osaka's modern glass-and-steel skyline.",
    "visitorPreparednessNote": "The castle grounds are vast; walking from Osakajokoen or Tanimachi 4-chome subway stations across the outer moat to the central keep takes 15 to 20 minutes across gravel avenues. Wear cushioned walking shoes. For travelers with mobility requirements, the modern keep features interior elevator access to the upper galleries, though the final flight to the outdoor observation deck is stairs only.",
    "localInsight": "Did you know? Embedded in the castle's Otemon gate wall is the famous 'Takoishi' (Octopus Stone)—the largest megalith in the entire fortress. This single slab of granite weighs an astounding 108 metric tons and spans 36 square meters. It was quarried on Shodoshima island and ferried across the Inland Sea by feudal lords competing to prove their unwavering devotion to the Tokugawa Shogunate.",
    "mapQuery": "Osaka Castle, Osakajo, Chuo Ward, Osaka, Japan",
    "mapCoordinates": {
      "lat": 34.6873,
      "lng": 135.5262
    },
    "gallery": [
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/ca/Osaka_Castle_03bs3200.jpg/1280px-Osaka_Castle_03bs3200.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Osaka Castle — Osaka Castle 03bs3200.jpg",
        "source": "Wikimedia Commons (File:Osaka_Castle_03bs3200.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Osaka Castle\""
      },
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c3/Osaka_Castle_Aerial_photograph_2017.jpg/1280px-Osaka_Castle_Aerial_photograph_2017.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Osaka Castle — Osaka Castle Aerial photograph 2017.jpg",
        "source": "Wikimedia Commons (File:Osaka_Castle_Aerial_photograph_2017.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Osaka Castle\""
      },
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/Osaka_Castle_Nishinomaru_Garden_April_2005.JPG/500px-Osaka_Castle_Nishinomaru_Garden_April_2005.JPG?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Osaka Castle — Osaka Castle Nishinomaru Garden April 2005.JPG",
        "source": "Wikimedia Commons (File:Osaka_Castle_Nishinomaru_Garden_April_2005.JPG)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Osaka Castle\""
      },
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7c/Osakajo_ramparts_and_moat.jpg/1280px-Osakajo_ramparts_and_moat.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Osaka Castle — Osakajo ramparts and moat.jpg",
        "source": "Wikimedia Commons (File:Osakajo_ramparts_and_moat.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Osaka Castle\""
      }
    ]
  },
  {
    "id": "matsumoto-castle",
    "name": "Matsumoto Castle",
    "japaneseName": "松本城",
    "region": "Nagano",
    "category": "Castles",
    "oneLineHook": "The striking 'Crow Castle'—a rare 16th-century black timber original set against the snow-capped Japanese Alps.",
    "bestSeason": "April (Cherry blossoms framing the snowy peaks) / Winter (Snow dusted over black timber)",
    "suggestedDuration": "1.5 to 2 hours",
    "illustrativeCostYen": "¥700 (Castle keep and Matsumoto City Museum combined ticket)",
    "editorialDescription": "Framed against the jagged, snow-capped backdrop of the Northern Japan Alps, Matsumoto Castle (Matsumoto-jō) is one of Japan's premier historic treasures. Dating from 1592–1614, it is one of the only five castles designated as National Treasures. Unlike the white-plaster keeps of southern Japan, Matsumoto's exterior is clad in dark, hand-painted black lacquer wooden wainscoting, earning it the affectionate moniker 'Crow Castle' (Karasu-jō). Its deep wide moat is fed by clear alpine runoff, where swans glide and crimson vermilion bridges connect the outer courtyards to the five-roofed fortress.",
    "visitorPreparednessNote": "Because Matsumoto Castle is a genuine 16th-century wooden keep that has never been modernized, the internal stairways are famously steep—with inclines reaching 61 degrees and low overhead beams. Visitors must remove shoes at the entrance and ascend slowly with both hands on the wooden railings. Those prone to vertigo or with knee difficulties should take extra time and exercise caution.",
    "localInsight": "Did you know? Matsumoto Castle conceals an ingenious secret floor: while the exterior shows five tiers of roofs, the interior actually has six full stories. The third floor (kakushi-kai) has no windows and is completely hidden from the outside, designed as a covert munitions depot and secure tactical haven that would survive even heavy cannon bombardment.",
    "mapQuery": "Matsumoto Castle, Marunouchi, Matsumoto, Nagano, Japan",
    "mapCoordinates": {
      "lat": 36.2388,
      "lng": 137.9688
    },
    "gallery": [
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e3/Matsumoto_Castle_Keep_Tower.jpg/1280px-Matsumoto_Castle_Keep_Tower.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Matsumoto Castle — Matsumoto Castle Keep Tower.jpg",
        "source": "Wikimedia Commons (File:Matsumoto_Castle_Keep_Tower.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Matsumoto Castle\""
      },
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ee/Matsumoto_Castle_snow.jpg/1280px-Matsumoto_Castle_snow.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Matsumoto Castle — Matsumoto Castle snow.jpg",
        "source": "Wikimedia Commons (File:Matsumoto_Castle_snow.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Matsumoto Castle\""
      },
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/40/Matsumoto_Castle_Old_Photograph.jpg/1280px-Matsumoto_Castle_Old_Photograph.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Matsumoto Castle — Matsumoto Castle Old Photograph.jpg",
        "source": "Wikimedia Commons (File:Matsumoto_Castle_Old_Photograph.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Matsumoto Castle\""
      },
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/37/130608_Matsumoto_Castle_Matsumoto_Nagano_pref_Japan01bs5.jpg/250px-130608_Matsumoto_Castle_Matsumoto_Nagano_pref_Japan01bs5.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Matsumoto Castle — 130608 Matsumoto Castle Matsumoto Nagano pref Japan01bs5.jpg",
        "source": "Wikimedia Commons (File:130608_Matsumoto_Castle_Matsumoto_Nagano_pref_Japan01bs5.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Matsumoto Castle\""
      }
    ]
  },
  {
    "id": "senso-ji",
    "name": "Senso-ji Temple",
    "japaneseName": "浅草寺",
    "region": "Tokyo (Asakusa)",
    "category": "Shrines & Temples",
    "oneLineHook": "Tokyo's oldest Buddhist sanctuary, alive with red paper lanterns, incense coils, and centuries of merchant market tradition.",
    "bestSeason": "Spring (Sanja Matsuri festival in May) / Autumn / Evening year-round",
    "suggestedDuration": "1.5 to 2 hours",
    "illustrativeCostYen": "¥0 (Temple grounds and Main Hall admission are free; omikuji fortune slips are ¥100)",
    "editorialDescription": "Founded in 645 AD, Senso-ji is Tokyo's most venerable Buddhist temple, dedicated to the Bodhisattva Kannon. Entry is marked by the grand Kaminarimon (Thunder Gate) and its iconic red chochin lantern, leading into Nakamise-dori—a bustling market lane that has catered to pilgrims for over 300 years with freshly toasted senbei crackers, ningyo-yaki sweets, and handcrafted folding fans. Beyond the secondary Hozomon gate stands the five-story pagoda and the soaring Main Hall (Hondo), where coils of sacred incense billow from a massive bronze jōkōro burner as devotees waft the aromatic smoke over their heads for good health and mental clarity.",
    "visitorPreparednessNote": "Senso-ji is one of the most visited sacred sites in Asia. If you prefer quiet contemplation rather than bustling festival crowds, visit at dusk or dawn. In the evening, the temple halls and five-story pagoda are gorgeously illuminated until 11:00 PM, and the market stalls are closed, leaving the cobblestone courtyards serene and cinematic.",
    "localInsight": "Did you know? The colossal red lantern hanging at Kaminarimon weighs nearly 700 kilograms and is hand-crafted from Japanese washi paper and bamboo. If you look directly up at its wooden base, you will discover a masterfully carved wooden dragon in high relief—a sacred homage to the dragon deity who protects Asakusa and brought rain to the historic Edo capital.",
    "mapQuery": "Senso-ji, Asakusa, Taito City, Tokyo, Japan",
    "mapCoordinates": {
      "lat": 35.7148,
      "lng": 139.7967
    },
    "gallery": [
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/43/Sensoji_2023.jpg/1280px-Sensoji_2023.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Senso-ji Temple — Sensoji 2023.jpg",
        "source": "Wikimedia Commons (File:Sensoji_2023.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Senso-ji Temple\""
      },
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/48/Hozomon_Gate%28left%29%E3%83%BBFive-storied_Pagoda%28center%29%E3%83%BBFortune_Slip_Shop%28right%29.jpg/1280px-Hozomon_Gate%28left%29%E3%83%BBFive-storied_Pagoda%28center%29%E3%83%BBFortune_Slip_Shop%28right%29.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Senso-ji Temple — Hozomon Gate(left)・Five-storied Pagoda(center)・Fortune Slip Shop(right).jpg",
        "source": "Wikimedia Commons (File:Hozomon_Gate(left)・Five-storied_Pagoda(center)・Fortune_Slip_Shop(right).jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Senso-ji Temple\""
      },
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/39/Inside_the_main_hall.jpg/1280px-Inside_the_main_hall.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Senso-ji Temple — Inside the main hall.jpg",
        "source": "Wikimedia Commons (File:Inside_the_main_hall.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Senso-ji Temple\""
      },
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/85/Sensoji_at_night_8.jpg/1280px-Sensoji_at_night_8.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Senso-ji Temple — Sensoji at night 8.jpg",
        "source": "Wikimedia Commons (File:Sensoji_at_night_8.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Senso-ji Temple\""
      }
    ]
  },
  {
    "id": "itsukushima-shrine",
    "name": "Itsukushima Shrine",
    "japaneseName": "厳島神社",
    "region": "Miyajima, Hiroshima",
    "category": "Shrines & Temples",
    "oneLineHook": "A floating sacred sanctuary built over the tidal shallows of Miyajima Island, crowned by its iconic offshore vermilion torii gate.",
    "bestSeason": "Autumn (Vibrant momiji maples on Mount Misen) / Spring cherry blossoms",
    "suggestedDuration": "Half-day to overnight stay at an island ryokan",
    "illustrativeCostYen": "¥300 (Shrine admission; ¥200 one-way JR ferry from Miyajimaguchi + ¥100 local visitor tax)",
    "editorialDescription": "Located on the sacred island of Miyajima in the Seto Inland Sea, Itsukushima Shrine is an architectural triumph of Shinto heritage. To avoid desecrating the island's sacred earth, the entire shrine complex was constructed on piers over the tidal bay in 1168 by warlord Taira no Kiyomori. At high tide, the vermilion halls, prayer pavilions, and open-air Noh theater appear to float weightlessly upon the sea. The shrine's dramatic centerpiece—a 16-meter-tall camphor-wood O-Torii gate standing offshore in the open water—creates an unforgettable visual gateway between the human realm and the sacred mountains above.",
    "visitorPreparednessNote": "Itsukushima Shrine undergoes dramatic transformations twice daily with the ocean tides. Check local tide tables before your visit: at high tide, you can view the magical 'floating' effect, while at low tide, the sea recedes completely, allowing visitors to walk across the sandy seafloor directly to the base of the massive torii gate. Friendly wild deer roam the island freely; keep train tickets, maps, and paper bags tucked safely away as deer will playfully nibble on loose paper.",
    "localInsight": "Did you know? The offshore vermilion O-Torii gate is not anchored into the seafloor with deep sunken pilings. Instead, it stands purely under its own immense weight. The hollow crossbeam at the top (shimaki) is packed with over seven tons of rounded river stones, creating ballast that keeps the monumental wooden structure balanced against ocean surges, high tides, and typhoons.",
    "mapQuery": "Itsukushima Shrine, Miyajimacho, Hatsukaichi, Hiroshima, Japan",
    "mapCoordinates": {
      "lat": 34.2959,
      "lng": 132.3197
    },
    "gallery": [
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ef/Itsukushima_Shrine_Torii_Gate_%2813890465459%29.jpg/1280px-Itsukushima_Shrine_Torii_Gate_%2813890465459%29.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Itsukushima Shrine — Itsukushima Shrine Torii Gate (13890465459).jpg",
        "source": "Wikimedia Commons (File:Itsukushima_Shrine_Torii_Gate_(13890465459).jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Itsukushima Shrine\""
      },
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bf/Itsukushima_Shrine_at_high_tide.jpg/1280px-Itsukushima_Shrine_at_high_tide.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Itsukushima Shrine — Itsukushima Shrine at high tide.jpg",
        "source": "Wikimedia Commons (File:Itsukushima_Shrine_at_high_tide.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Itsukushima Shrine\""
      },
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d2/Itsukushima_Shinto_Shrine.jpg/1280px-Itsukushima_Shinto_Shrine.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Itsukushima Shrine — Itsukushima Shinto Shrine.jpg",
        "source": "Wikimedia Commons (File:Itsukushima_Shinto_Shrine.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Itsukushima Shrine\""
      },
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/08/Tori_gate_01.jpg/1280px-Tori_gate_01.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Itsukushima Shrine — Tori gate 01.jpg",
        "source": "Wikimedia Commons (File:Tori_gate_01.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Itsukushima Shrine\""
      }
    ]
  },
  {
    "id": "nara-park",
    "name": "Nara Park",
    "japaneseName": "奈良公園",
    "region": "Nara",
    "category": "Nature & Mountains",
    "oneLineHook": "Gentle woodlands where over a thousand sacred, bowing sika deer roam freely among ancient world-heritage temples.",
    "bestSeason": "Spring (Cherry blossoms along Ukimido pavilion) / Autumn (Golden ginkgo leaves)",
    "suggestedDuration": "3 to 5 hours (including Todai-ji and Kasuga Taisha)",
    "illustrativeCostYen": "¥0 (Park grounds free; ¥600 Todai-ji Daibutsu Hall; ¥200 per pack of shika-senbei crackers)",
    "editorialDescription": "Spanning over 500 hectares at the base of Mount Wakakusa, Nara Park was the imperial capital of Japan in the 8th century, centuries before Kyoto came to prominence. Today it is celebrated worldwide for its idyllic harmony of nature, spirituality, and wildlife. More than 1,200 free-roaming sika deer wander peacefully across wide grassy lawns, beneath mossy stone lanterns of Kasuga Taisha, and into the shadow of Todai-ji—one of the largest wooden buildings on the planet, housing the monumental 15-meter bronze Great Buddha (Daibutsu).",
    "visitorPreparednessNote": "Nara's deer are legally protected National Natural Monuments. Please feed them ONLY official deer crackers (shika-senbei), which are made from plain wheat flour and rice bran. Feeding deer bread, plastic wrappers, fruit, or human junk food causes fatal intestinal blockages. While accustomed to humans, deer are wild animals and can nip or nudge if teased; hold empty hands open to show you have no more crackers, and they will calmly move on.",
    "localInsight": "Did you know? Nara's deer have learned a distinctly Japanese cultural gesture: bowing! Because tourists historically offered deer crackers after bowing politely, the deer gradually learned to bow their heads repeatedly in exchange for treats. Historical folklore holds that when the deity Takemikazuchi arrived at Kasuga Taisha in 768 AD, he rode upon a sacred white deer, granting all descendants divine messenger status.",
    "mapQuery": "Nara Park, Nara, Japan",
    "mapCoordinates": {
      "lat": 34.6851,
      "lng": 135.8431
    },
    "gallery": [
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b4/Nara_Park_-_panoramio_%282%29.jpg/1280px-Nara_Park_-_panoramio_%282%29.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Nara Park — Nara Park - panoramio (2).jpg",
        "source": "Wikimedia Commons (File:Nara_Park_-_panoramio_(2).jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Nara Park\""
      },
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f2/Aerial_panorama_of_Nara_Park.jpg/1280px-Aerial_panorama_of_Nara_Park.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Nara Park — Aerial panorama of Nara Park.jpg",
        "source": "Wikimedia Commons (File:Aerial_panorama_of_Nara_Park.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Nara Park\""
      },
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7e/Aerial_perspective_of_Nara_Park.jpg/1280px-Aerial_perspective_of_Nara_Park.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Nara Park — Aerial perspective of Nara Park.jpg",
        "source": "Wikimedia Commons (File:Aerial_perspective_of_Nara_Park.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Nara Park\""
      },
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/89/Aerial_panorama_of_Nora_Park_facing_the_old_town.jpg/1280px-Aerial_panorama_of_Nora_Park_facing_the_old_town.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Nara Park — Aerial panorama of Nora Park facing the old town.jpg",
        "source": "Wikimedia Commons (File:Aerial_panorama_of_Nora_Park_facing_the_old_town.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Nara Park\""
      }
    ]
  },
  {
    "id": "kenroku-en",
    "name": "Kenroku-en Garden",
    "japaneseName": "兼六園",
    "region": "Kanazawa",
    "category": "Gardens & Traditional Villages",
    "oneLineHook": "One of Japan's 'Three Great Gardens,' celebrated for possessing all six attributes of classic landscape perfection.",
    "bestSeason": "Year-round (Autumn maple tapestries & Winter yukizuri snow ropes are world-renowned)",
    "suggestedDuration": "2 hours",
    "illustrativeCostYen": "¥320 (Adult garden admission)",
    "editorialDescription": "Cultivated across two centuries by successive Maeda clan lords of the Kaga Domain, Kenroku-en in Kanazawa is revered as the epitome of Japanese landscape art. Its name literally means the 'Six Attributes Garden,' derived from an ancient Chinese landscape treatise stating that no garden can naturally unite all six contradictory qualities: spaciousness yet seclusion, artifice yet antiquity, and abundant water features yet vast panoramas. Kenroku-en effortlessly achieves this paradox through meandering streams, tranquil ponds, historic teahouses, the iconic two-legged Kotoji-toro stone lantern, and masterfully trained pines.",
    "visitorPreparednessNote": "Kanazawa's coastal climate experiences frequent passing showers and wet winter snowfalls, earning the local saying: 'Even if you forget your lunchbox, never forget your umbrella.' Pack a compact umbrella or lightweight waterproof shell. Wooden boardwalks and stone stepping paths around Hisago-ike pond can become slick when wet, so wear footwear with solid rubber treads.",
    "localInsight": "Did you know? Every November, Kenroku-en's master arborists erect intricate conical hemp-rope pyramids called 'yukizuri' over hundreds of ancient pine branches. Rather than mere decoration, these protective rope cones safeguard the venerable limbs from snapping under the extraordinarily wet, dense snows blowing inland from the Sea of Japan.",
    "mapQuery": "Kenroku-en, Kenrokumachi, Kanazawa, Ishikawa, Japan",
    "mapCoordinates": {
      "lat": 36.5621,
      "lng": 136.6626
    },
    "gallery": [
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/31/Stone_lantern_Kenrokuen.jpg/1280px-Stone_lantern_Kenrokuen.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Kenroku-en Garden — Stone lantern Kenrokuen.jpg",
        "source": "Wikimedia Commons (File:Stone_lantern_Kenrokuen.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Kenroku-en Garden\""
      },
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/Kenrokuen_bridge.jpg/500px-Kenrokuen_bridge.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Kenroku-en Garden — Kenrokuen bridge.jpg",
        "source": "Wikimedia Commons (File:Kenrokuen_bridge.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Kenroku-en Garden\""
      },
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fc/Kenrokuen10-r.jpg/1280px-Kenrokuen10-r.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Kenroku-en Garden — Kenrokuen10-r.jpg",
        "source": "Wikimedia Commons (File:Kenrokuen10-r.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Kenroku-en Garden\""
      },
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b2/Kenroku-en_in_Summer.jpg/1280px-Kenroku-en_in_Summer.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Kenroku-en Garden — Kenroku-en in Summer.jpg",
        "source": "Wikimedia Commons (File:Kenroku-en_in_Summer.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Kenroku-en Garden\""
      }
    ]
  },
  {
    "id": "shirakawa-go",
    "name": "Shirakawa-go",
    "japaneseName": "白川郷",
    "region": "Gifu",
    "category": "Gardens & Traditional Villages",
    "oneLineHook": "A fairytale mountain hamlet of steep thatched-roof farmhouses built like hands clasped in prayer amidst alpine serenity.",
    "bestSeason": "Mid-Winter (Snow-covered illumination events) / Early Autumn (Golden rice paddies)",
    "suggestedDuration": "3 to 4 hours or overnight at an authentic gassho minshuku",
    "illustrativeCostYen": "¥0 (Village is free to stroll; Wada House heritage entry is ¥400; highway bus from Kanazawa/Takayama is ¥2,200 – ¥2,600)",
    "editorialDescription": "Nestled in a secluded river valley deep within the Ryōhaku Mountains of Gifu Prefecture, Shirakawa-go (Ogimachi village) is a UNESCO World Heritage site that seems lifted from a medieval Japanese folk tale. The village is renowned for its iconic gasshō-zukuri farmhouses—some over 250 years old—featuring steep, 60-degree thatched roofs constructed without metal nails to shed the region's legendary heavy snowfall. In winter, several meters of powder envelop the farmhouses in a soft white blanket; in summer, vibrant green rice paddies and crystal irrigation canals brimming with mountain trout wind between the historic homesteads.",
    "visitorPreparednessNote": "Shirakawa-go is a living, working farming community, not a movie set. The residents' homes, vegetable patches, and gardens are private property: stay strictly on public footpaths, do not peer into residential windows, and do not smoke anywhere outside designated booths due to the immense fire risk to thatched roofs. If visiting in winter (December to March), sub-zero temperatures and icy roads require serious thermal outerwear, thermal snow boots, and winterized transit reservations.",
    "localInsight": "Did you know? The thatched roofs of Shirakawa-go are built entirely from flexible wild ropes called 'neso' and cedar timber—not a single metal nail was used. When a roof needs re-thatching every 30 to 40 years, the village practices 'yui'—an ancient system of mutual communal labor where up to 200 neighbors gather together to re-thatch an entire farmhouse in just two days.",
    "mapQuery": "Shirakawa-go, Ogimachi, Shirakawa, Ono District, Gifu, Japan",
    "mapCoordinates": {
      "lat": 36.2562,
      "lng": 136.9066
    },
    "gallery": [
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e6/Ogi_Shirakawa-g%C5%8D%2C_Gifu%2C_Japan.jpg/1280px-Ogi_Shirakawa-g%C5%8D%2C_Gifu%2C_Japan.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Shirakawa-go — Ogi Shirakawa-gō, Gifu, Japan.jpg",
        "source": "Wikimedia Commons (File:Ogi_Shirakawa-gō,_Gifu,_Japan.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Shirakawa-go\""
      },
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a2/Shirakawa-go_from_above.jpg/1280px-Shirakawa-go_from_above.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Shirakawa-go — Shirakawa-go from above.jpg",
        "source": "Wikimedia Commons (File:Shirakawa-go_from_above.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Shirakawa-go\""
      },
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/85/Shirakawa-go_%E7%99%BD%E5%B7%9D%E6%9D%91_close_up.jpg/1280px-Shirakawa-go_%E7%99%BD%E5%B7%9D%E6%9D%91_close_up.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Shirakawa-go — Shirakawa-go 白川村 close up.jpg",
        "source": "Wikimedia Commons (File:Shirakawa-go_白川村_close_up.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Shirakawa-go\""
      },
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/09/Ogi_Shirakawa06n3200.jpg/1280px-Ogi_Shirakawa06n3200.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Shirakawa-go — Ogi Shirakawa06n3200.jpg",
        "source": "Wikimedia Commons (File:Ogi_Shirakawa06n3200.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Shirakawa-go\""
      }
    ]
  },
  {
    "id": "hakone",
    "name": "Hakone",
    "japaneseName": "箱根",
    "region": "Kanagawa",
    "category": "Nature & Mountains",
    "oneLineHook": "Volcanic hot-spring sanctuaries, pirate ships on misty Lake Ashi, and steaming sulfur vents with views of Mount Fuji.",
    "bestSeason": "Autumn (November foliage) / Spring / Winter (Clear crisp views of Fuji)",
    "suggestedDuration": "Full day loop or 2-day onsen ryokan retreat",
    "illustrativeCostYen": "¥5,000 – ¥6,500 (Hakone Freepass covers scenic railway, cable car, ropeway, and pirate cruise)",
    "editorialDescription": "Located less than two hours southwest of Tokyo in Fuji-Hakone-Izu National Park, Hakone has been Japan's premier mountain hot-spring retreat since the feudal Edo period, when weary samurai soaked in its thermal waters along the Tokaido road. The journey through Hakone is a beloved transit circuit: an antique mountain railway carving through hydrangeas and gorges, a steep cable car, an aerial ropeway soaring over the sulfur craters of Owakudani, and a pirate ship cruise across Lake Ashi toward the submerged vermilion torii gate of Hakone Shrine, with Fuji gleaming on the western horizon.",
    "visitorPreparednessNote": "The Hakone Freepass (available via Odakyu Line from Shinjuku) is essential—it covers unlimited rides on all eight local transit modes and pays for itself within a single day. Be aware that the Owakudani volcanic ropeway section occasionally closes temporarily if sulfur gas emissions exceed safety thresholds; travelers with asthma or respiratory conditions should heed posted environmental warnings.",
    "localInsight": "Did you know? In the sulfur-steaming cauldrons of Owakudani ('The Great Boiling Valley'), vendors boil fresh chicken eggs in the mineral-rich volcanic water. The natural hydrogen sulfide reacts with the iron in the water to turn the eggshells jet black! According to local Japanese folklore, eating a single 'kuro-tamago' (black egg) adds seven years to your life.",
    "mapQuery": "Hakone, Kanagawa, Japan",
    "mapCoordinates": {
      "lat": 35.2323,
      "lng": 139.0622
    },
    "gallery": [
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b5/View_of_Mount_Fuji_from_Lake_Ashi.jpg/1280px-View_of_Mount_Fuji_from_Lake_Ashi.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Hakone — View of Mount Fuji from Lake Ashi.jpg",
        "source": "Wikimedia Commons (File:View_of_Mount_Fuji_from_Lake_Ashi.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Hakone\""
      },
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d1/161223_Owakudani_Station_Hakone_Japan03s3.jpg/1280px-161223_Owakudani_Station_Hakone_Japan03s3.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Hakone — 161223 Owakudani Station Hakone Japan03s3.jpg",
        "source": "Wikimedia Commons (File:161223_Owakudani_Station_Hakone_Japan03s3.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Hakone\""
      },
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/36/Lake_Ashi_from_Mt.Komagatake_03.jpg/1280px-Lake_Ashi_from_Mt.Komagatake_03.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Hakone — Lake Ashi from Mt.Komagatake 03.jpg",
        "source": "Wikimedia Commons (File:Lake_Ashi_from_Mt.Komagatake_03.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Hakone\""
      },
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2c/230910_Sengokuhara_Hakone_Japan06s3.jpg/1280px-230910_Sengokuhara_Hakone_Japan06s3.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Hakone — 230910 Sengokuhara Hakone Japan06s3.jpg",
        "source": "Wikimedia Commons (File:230910_Sengokuhara_Hakone_Japan06s3.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Hakone\""
      }
    ]
  },
  {
    "id": "shibuya-crossing",
    "name": "Shibuya Crossing",
    "japaneseName": "渋谷スクランブル交差点",
    "region": "Tokyo",
    "category": "Modern Cityscapes",
    "oneLineHook": "The beating kinetic heart of Tokyo—the world's busiest pedestrian intersection illuminated in giant neon spectacles.",
    "bestSeason": "Year-round (Late evening for neon intensity / Rainy days for colorful umbrella ballets)",
    "suggestedDuration": "1 to 2 hours (including Hachiko statue and nearby observation decks)",
    "illustrativeCostYen": "¥0 (Crossing the street is free; Shibuya Sky rooftop deck admission is ¥2,200 – ¥2,500)",
    "editorialDescription": "Directly outside Shibuya Station's Hachiko Exit lies the ultimate cinematic emblem of modern Tokyo: the Shibuya Scramble Crossing. At every pedestrian green light, vehicular traffic halts completely from every direction, and up to 3,000 people surge across the asphalt at once in a seamless, synchronized tide. Flanked by multi-story video screens broadcasting J-Pop melodies, flashing neon kanji signs, and glass skybridges, Shibuya is the undisputed capital of youth fashion, electronic energy, and urban pulse. Just steps away sits the humble bronze statue of Hachiko, the legendary Akita dog whose steadfast loyalty captured Japan's heart.",
    "visitorPreparednessNote": "When crossing in the dense crowd, keep moving at a steady, predictable pace with the flow of pedestrians; stopping suddenly in the dead center to take selfies will cause gentle collisions. For the best aerial vantage points of the crossing, visit the glass observation deck at Shibuya Sky (reserve timed tickets well in advance) or grab a window seat in the second-floor Starbucks in the Tsutaya building.",
    "localInsight": "Did you know? Despite up to 250,000 pedestrians crossing this intersection on a busy Saturday, collisions are virtually unheard of. Japanese sociologists attribute this to an unspoken, highly refined cultural instinct called 'kūki o yomu' ('reading the air')—an acute peripheral spatial awareness that allows thousands of strangers to cross paths seamlessly without touching.",
    "mapQuery": "Shibuya Crossing, Dogenzaka, Shibuya City, Tokyo, Japan",
    "mapCoordinates": {
      "lat": 35.6595,
      "lng": 139.7005
    },
    "gallery": [
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/88/Shibuya_Crossing%2C_Aerial.jpg/1280px-Shibuya_Crossing%2C_Aerial.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Shibuya Crossing — Shibuya Crossing, Aerial.jpg",
        "source": "Wikimedia Commons (File:Shibuya_Crossing,_Aerial.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Shibuya Crossing\""
      },
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d2/Shibuya_Crossing_in_July_2026.jpg/1280px-Shibuya_Crossing_in_July_2026.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Shibuya Crossing — Shibuya Crossing in July 2026.jpg",
        "source": "Wikimedia Commons (File:Shibuya_Crossing_in_July_2026.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Shibuya Crossing\""
      },
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e7/Early_summer_night_Shibuya.jpg/330px-Early_summer_night_Shibuya.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Shibuya Crossing — Early summer night Shibuya.jpg",
        "source": "Wikimedia Commons (File:Early_summer_night_Shibuya.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Shibuya Crossing\""
      }
    ]
  },
  {
    "id": "dotonbori",
    "name": "Dotonbori",
    "japaneseName": "道頓堀",
    "region": "Osaka",
    "category": "Modern Cityscapes",
    "oneLineHook": "Osaka's flamboyant canal of gastronomic indulgence, roaring mechanical signs, and the world-famous Glico Running Man.",
    "bestSeason": "Year-round (Best experienced from 6:00 PM onward as the neon reflects across the canal)",
    "suggestedDuration": "2 to 3 hours of evening street food tasting",
    "illustrativeCostYen": "¥1,500 – ¥3,500 (Abundant street food: takoyaki ¥600, okonomiyaki ¥900, kushikatsu ¥1,200)",
    "editorialDescription": "If Kyoto is Japan's serene cultural temple, Dotonbori is its loud, joyful, and irrepressible kitchen. Running alongside the historic Dotonbori Canal in Osaka's southern Minami district, this pedestrian promenade is a sensory extravaganza of towering 3D mechanical signboards: a giant moving red crab with twitching legs, a ferocious roaring dragon bursting through a ramen shop wall, and the world-famous neon Glico Running Man crossing the finish line. The street embodies Osaka's legendary spirit of kuidaore—'eat until you drop'—serving blistering hot takoyaki octopus balls, golden fried kushikatsu skewers, and savory okonomiyaki pancakes to jovial crowds well past midnight.",
    "visitorPreparednessNote": "Dotonbori is notoriously lively, loud, and densely packed in the evenings. Keep your belongings secure in crowded queues. When purchasing takoyaki fresh from the griddle, take extreme caution: the batter inside remains molten hot long after the crispy exterior cools. Poke a small hole with your toothpick to vent the steam before taking a bite!",
    "localInsight": "Did you know? The iconic Glico Running Man neon billboard above Ebisu Bridge has been illuminating Dotonbori since 1935. Now in its sixth iteration with over 140,000 energy-efficient LEDs, the athlete represents a runner completing a 300-meter dash—a nod to Glico's original caramel candy slogan: '300 meters on a single piece' of energy.",
    "mapQuery": "Dotonbori, Chuo Ward, Osaka, Japan",
    "mapCoordinates": {
      "lat": 34.6687,
      "lng": 135.5013
    },
    "gallery": [
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f4/Osaka_Dotonbori_Ebisu_Bridge.jpg/1280px-Osaka_Dotonbori_Ebisu_Bridge.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Dotonbori — Osaka Dotonbori Ebisu Bridge.jpg",
        "source": "Wikimedia Commons (File:Osaka_Dotonbori_Ebisu_Bridge.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Dotonbori\""
      },
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b4/Dotonbori_Osaka_1910.jpg/1280px-Dotonbori_Osaka_1910.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Dotonbori — Dotonbori Osaka 1910.jpg",
        "source": "Wikimedia Commons (File:Dotonbori_Osaka_1910.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Dotonbori\""
      },
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e6/Dotonbori_in_1930s.JPG/330px-Dotonbori_in_1930s.JPG?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Dotonbori — Dotonbori in 1930s.JPG",
        "source": "Wikimedia Commons (File:Dotonbori_in_1930s.JPG)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Dotonbori\""
      },
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d7/Dotonburi_River_Namba_Japan_by_Don_Ramey_Logan.jpg/1280px-Dotonburi_River_Namba_Japan_by_Don_Ramey_Logan.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Dotonbori — Dotonburi River Namba Japan by Don Ramey Logan.jpg",
        "source": "Wikimedia Commons (File:Dotonburi_River_Namba_Japan_by_Don_Ramey_Logan.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Dotonbori\""
      }
    ]
  },
  {
    "id": "okinawa",
    "name": "Okinawa (Churaumi Aquarium and Kerama Islands)",
    "japaneseName": "沖縄（美ら海水族館・慶良間諸島）",
    "region": "Okinawa",
    "category": "Islands & Coast",
    "oneLineHook": "Subtropical turquoise shallows, colossal whale sharks, and the world-renowned 'Kerama Blue' coral reefs of the Ryukyu Kingdom.",
    "bestSeason": "May to October (Snorkeling & Diving) / January to March (Humpback whale migration)",
    "suggestedDuration": "Full day excursion from Naha to Motobu Peninsula, or 2 to 3 days island hopping",
    "illustrativeCostYen": "¥2,180 (Churaumi Aquarium adult entry; high-speed ferry to Kerama Islands is ¥3,200 – ¥3,600 one way)",
    "editorialDescription": "Far to the southwest of the Japanese main islands, the subtropical archipelago of Okinawa offers a distinct cultural and ecological paradise rooted in the former Ryukyu Kingdom. On the Motobu Peninsula, the Okinawa Churaumi Aquarium features the breathtaking Kuroshio Sea tank—one of the largest acrylic viewing panels in the world—where gentle whale sharks and graceful manta rays glide effortlessly through 7.5 million liters of filtered seawater. A short ferry ride from Naha brings travelers to the pristine Kerama Islands National Park, celebrated for its legendary 'Kerama Blue' waters, white coral sand beaches, sea turtle sanctuaries, and vibrant humpback whale nurseries.",
    "visitorPreparednessNote": "Okinawa's sunny climate has intense UV levels; reef-safe sunscreen, polarized sunglasses, and rashguards are essential for marine excursions. Public transit outside Naha city is limited, so renting a car (international driving permit required) or booking an express bus tour is strongly recommended for traveling north to Churaumi Aquarium. Be mindful of marine life: never stand on or touch live coral formations.",
    "localInsight": "Did you know? The waters surrounding the Kerama Islands are designated as a National Park because of their extraordinary clarity—visibility often exceeds 30 to 50 meters, earning the global moniker 'Kerama Blue'. These reefs are recognized as one of the world's most crucial marine biodiversity incubators, with more than 250 species of hermatypic corals thriving here.",
    "mapQuery": "Okinawa Churaumi Aquarium, Ishikawa, Motobu, Kunigami District, Okinawa, Japan",
    "mapCoordinates": {
      "lat": 26.6943,
      "lng": 127.8779
    },
    "gallery": [
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/17/%E6%B2%96%E7%B8%84%E7%BE%8E%E3%82%89%E6%B5%B7%E6%B0%B4%E6%97%8F%E9%A4%A8%EF%BC%BF%E5%A4%A7.jpg/1280px-%E6%B2%96%E7%B8%84%E7%BE%8E%E3%82%89%E6%B5%B7%E6%B0%B4%E6%97%8F%E9%A4%A8%EF%BC%BF%E5%A4%A7.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Okinawa (Churaumi Aquarium and Kerama Islands) — 沖縄美ら海水族館＿大.jpg",
        "source": "Wikimedia Commons (File:沖縄美ら海水族館＿大.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Okinawa (Churaumi Aquarium and Kerama Islands)\""
      },
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/38/Okinawa_Churaumi_Aquarium_dolphin_show_-_panoramio.jpg/1280px-Okinawa_Churaumi_Aquarium_dolphin_show_-_panoramio.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Okinawa (Churaumi Aquarium and Kerama Islands) — Okinawa Churaumi Aquarium dolphin show - panoramio.jpg",
        "source": "Wikimedia Commons (File:Okinawa_Churaumi_Aquarium_dolphin_show_-_panoramio.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Okinawa (Churaumi Aquarium and Kerama Islands)\""
      },
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a0/Okinawa_Churaumi_Aquarium_main_entrance_far_view_20141215.jpg/1280px-Okinawa_Churaumi_Aquarium_main_entrance_far_view_20141215.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Okinawa (Churaumi Aquarium and Kerama Islands) — Okinawa Churaumi Aquarium main entrance far view 20141215.jpg",
        "source": "Wikimedia Commons (File:Okinawa_Churaumi_Aquarium_main_entrance_far_view_20141215.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Okinawa (Churaumi Aquarium and Kerama Islands)\""
      },
      {
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/00/2014-11-02_Okinawa_Churaumi_Suizokukan.jpg/1280px-2014-11-02_Okinawa_Churaumi_Suizokukan.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        "caption": "Okinawa (Churaumi Aquarium and Kerama Islands) — 2014-11-02 Okinawa Churaumi Suizokukan.jpg",
        "source": "Wikimedia Commons (File:2014-11-02_Okinawa_Churaumi_Suizokukan.jpg)",
        "searchTermOrSource": "Wikimedia Commons search query: \"Okinawa (Churaumi Aquarium and Kerama Islands)\""
      }
    ]
  }
];
