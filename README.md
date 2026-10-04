<div align="center">

# Hanami, Japan Destination Showcase

**A 16 destination Japan travel journal with four seasonal themes, an interactive regional map, a drag and drop itinerary builder, sample travel packages, and a practical travel tips guide. Built purely to demonstrate frontend visual design, layout, and interaction skill.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-hanami--japan--showcase.vercel.app-C9414D?style=for-the-badge)](https://hanami-japan-showcase.vercel.app)
[![Vibe Coded](https://img.shields.io/badge/Vibe%20Coded-Google%20AI%20Studio%20%2B%20Gemini-4285F4?style=for-the-badge)](https://ai.studio)

**[Important Notice](#important-notice)** · **[Features](#features)** · **[Tech Stack](#tech-stack)** · **[Getting Started](#getting-started)** · **[Project Structure](#project-structure)** · **[How It Works](#how-it-works)** · **[Known Limitations](#known-limitations)** · **[Data Sources and Credits](#data-sources-and-credits)**
</div>

---

## Important Notice

**Hanami is a fictional concept brand. This is a student portfolio and learning project, not a real travel agency, and nothing can be booked, bought, or requested through it.**

* The Plan a Trip form is entirely cosmetic. Submitting it does not send an email, hit a server, or notify anyone. It only shows a confirmation card on the page for demonstration purposes. That card says a travel curator will reach back to the contact detail you typed, and the footer says the email replies within 24 to 48 hours. Neither is true. There is no curator, nobody receives the form, and nobody will contact you. Please do not type any real personal details into it.
* The founder, the curator team, the company history, the testimonials, the email address, the phone number, the Instagram handle, the Kyoto Heritage Guild badge, and the sample package prices shown on the site are all invented for this project. The phone number is a placeholder made of zeros. If any of these details happens to match a real person or organization, it is a coincidence, and I sincerely apologize for any confusion or inconvenience it may cause. Please open an issue and I will change it right away.
* The destination write ups, the yen and dollar ranges, and the travel tips were written as editorial content for demonstration. They have been spot checked but not verified line by line, so please treat every price as a rough illustration and confirm opening hours, costs, and rules with official sources before you travel.
* The Travel Tips page lists real emergency numbers in Japan, which are 119 for an ambulance, 110 for the police, and the Japan National Tourism Organization visitor hotline. Please confirm them with an official source before relying on them.
* This project is about Japanese places, culture, religion, and etiquette, and I am a student, not an expert. If anything here is inaccurate, disrespectful, or offensive, I sincerely apologize. It is never intentional. Please open an issue and I will correct it.
* Destination photographs come from Wikimedia Commons under Creative Commons licensing. The homepage hero, the package covers, the team portraits, and the testimonial avatars use free license stock photography from Unsplash. The portraits are photos of people who have no connection to this project. If you are the author of a photo and would like the credit changed or the photo removed, please open an issue and I will take care of it. The [Known Limitations](#known-limitations) section explains what that means for the images.

The point of this project is the frontend, which means the color system, the layout, the motion, and the interaction design. The travel business behind it is made up.

---

## Overview

Hanami was built to show that a frontend developer can take a content heavy, multipage site and give it one clear visual identity, then keep that identity consistent across every page. The result is a seven page Japan travel journal with a soft editorial look, a seasonal theme that changes the whole site at once, and a set of tools that behave like real features. Visitors can search and filter 16 destinations, browse them on an interactive map, save favorites, and assemble a day by day itinerary by dragging places into a schedule. A live version is running on Vercel at [hanami-japan-showcase.vercel.app](https://hanami-japan-showcase.vercel.app).

The project was vibe coded in [Google AI Studio](https://ai.studio) with Gemini. It is part of my personal portfolio of vibe coded projects built outside my main focus areas (Data Science, NLP, and GenAI and LLM agent engineering). It sits next to [AutoVista Motors](https://github.com/viochris/autovista-car-dealership), a car dealership showcase, and [Skycast](https://github.com/viochris/skycast-weather-dashboard), a weather dashboard, which were built the same way.

The site is written in English and its content is centered on Honshu, with one stop in Okinawa. Prices appear in Japanese yen with a rough dollar estimate beside them.

---

## Features

### Seven Pages With One Shared Layout
Home, Destinations, Our Story, Travel Packages, Plan a Trip, Travel Tips, and FAQ all share the same header, footer, breadcrumb bar, and seasonal background. The header shows a full horizontal menu on wide screens and collapses into a hamburger menu below 1024 pixels, so the layout stays usable from a small phone up to a large monitor. Moving between pages plays a short seasonal wipe, and a Back button in the breadcrumb bar returns to the previous page.

### Four Seasonal Themes That Change the Whole Site
A season selector in the header switches the entire site between four themes.

* **Spring (Sakura)** with soft pink tones and falling cherry blossom petals
* **Summer (Verdant)** with deep greens, willow and bamboo leaves
* **Autumn (Momiji)** with warm reds and drifting maple leaves
* **Winter (Snow)** with cool blues and falling snowflakes

Each season changes the color palette, the homepage hero photograph, the large kanji watermark, the particles drifting in the background, the symbol between destination names in the scrolling ribbon, and the particles in the wipe that plays when you change pages. The chosen season is remembered in your browser, and spring is the default for first time visitors.

### A Homepage Built in Layers
The hero stacks two tilted photo prints over a tinted background, with a huge kanji character and drifting seasonal particles behind the headline, and the heading with its two calls to action in front. Below it, a slowly scrolling ribbon lists all 16 destinations, and clicking a name opens its detail popup. The page continues with a Season's Spotlight section featuring the Arashiyama Bamboo Grove inside an arched photo frame with a red hanko stamp, six featured destination cards, and an auto advancing testimonial carousel.

### 16 Destinations With Real Search and Filtering
The Destinations page carries 16 places, from Mount Fuji, Fushimi Inari Taisha, and Kinkaku-ji to Himeji Castle, Itsukushima Shrine, Shibuya Crossing, and Okinawa.

* **Live text search** across the destination name, the region, the one line hook, and the Japanese name.
* **A theme dropdown** with All, Nature, City, History, and Onsen, each showing how many destinations it holds.
* **A saved only toggle** that shows just the destinations you have hearted, with a live count.
* **A results line** that always tells you how many of the 16 destinations are showing.
* **A switch between grid view and an interactive regional map.**

### An Interactive Regional Map
Map view plots all 16 destinations on a terrain map of Japan. Region chips for All, Kanto, Kansai, Chubu, Chugoku, and Okinawa fly the map to that part of the country and hide the markers outside it. Clicking a marker opens a Selected Sanctuary panel with a link into the full cultural guide, and a Reset Map View button returns to the whole country. The map uses Leaflet.

### A Detail Popup for Every Destination
Opening a destination shows an editorial description and a photo gallery with arrow buttons and thumbnails. The popup also contains these sections.

* A visitor preparedness note with practical etiquette and timing advice
* A Local Insight section titled Did You Know
* The best season, an illustrative cost in yen, and a suggested visit length
* A heart button to save or unsave the place
* A location map marked with an Exact Location badge, with a small switch between an Interactive Map zoomed onto the spot and an embedded Google Maps view, plus an Open in Google Maps link
* A Plan a Trip Here button that carries the destination into the trip form

The popup closes with the Escape key, the left and right arrow keys move through the gallery, and the page behind it stops scrolling while it is open.

### Saved Destinations
Every card and every popup has a heart. Saved destinations are remembered in your browser and can be filtered on the Destinations page and in the itinerary builder. First time visitors start with three saved places, which are Mount Fuji, Fushimi Inari Taisha, and Kinkaku-ji, so the saved view is never empty on the first visit.

### An Interactive Itinerary Builder
The Plan a Trip page has two tabs, and the first is a drag and drop itinerary builder.

* It opens with a sample three day schedule so there is something to edit straight away.
* **An attraction drawer** lists all 16 places. It can be filtered by name or city and narrowed to saved places only, and scheduled places are marked.
* Places can be **dragged into any day**, dragged between days, or added with the small day buttons on each drawer card.
* Each place can be **moved up or down** inside its day, given a time slot of Morning, Afternoon, or Evening, or removed.
* **Days can be added, renamed, or removed.** The last remaining day cannot be deleted.
* A **copy button** puts a neatly formatted day by day itinerary on the clipboard, and an apply button drops the same text into the consultation form notes and switches to that tab.

### A Consultation Form That Goes Nowhere, On Purpose
The second tab holds a consultation request form with a name, a contact detail, a primary destination chosen from the 16 places, a travel window, a party size between 1 and 20, and a notes box. The name and contact fields are required. On submit, the page shows a Request Received card with a friendly message that repeats the details you entered, plus buttons to submit another plan or go back to the destinations. No data leaves the browser at any point, and nobody will contact you afterward, even though the confirmation message says a curator will reach back. The form can also be opened with a destination or a package already filled in from the Plan a Trip Here and Inquire and Customize buttons around the site.

### Six Sample Travel Packages
The Travel Packages page presents six curated routes, each with a Japanese title, a badge, a tagline, the destinations it includes, a duration, an estimated price range in yen with a rough dollar figure, the ideal season, and a pacing label of Leisurely, Moderate, or Immersive. Each card also has a scrollable day by day list of highlights and a list of planning inclusions.

* Kyoto Ancient Zen and Bamboo Pathways, 3 days
* Alpine Castles and Sacred Fuji Odyssey, 5 days
* Tokyo Metropolis to Kansai Neon Currents, 4 days
* Shirane Snow and Mountain Farmhouse Pilgrimage, 4 days
* Inland Sea Floating Torii and Subtropical Waters, 6 days
* The Classic Emperor's Golden Arc, 7 days

A filter switches between all packages, short routes of 3 to 4 days, and grand routes of 5 to 7 days. The Inquire and Customize This Route button opens the trip form with that package already named. A note at the bottom explains that the packages are sample itineraries and ballpark budgets, not products for sale.

### A Travel Tips and Field Guide Page
The Travel Tips page holds 14 practical entries in four groups, which are Cultural Etiquette and Taboos, Where to Go in Emergencies and for Lost Items, Transit and Luggage, and Onsen and Dining. Each entry has a Japanese title, a badge such as Strict Cultural Taboo, a short summary, a list of specific points, and where relevant a Where to Go line. Warnings and emergencies are highlighted so they stand out. A search box looks through titles, summaries, and details, group chips narrow the list, and a Reset Filters button clears everything. A strip near the top lists the three numbers worth saving before a trip, which are the ambulance, the police, and the JNTO English hotline.

### A Searchable FAQ
The FAQ page has 8 questions in four groups, which are JR Pass and Shinkansen, Onsen and Dining, Cash and Cards and eSIM, and Timing and Crowds. It has a live search box, group chips, a results count, a Reset Filters button, and an accordion where each answer opens when you click its question. A box at the bottom sends visitors to the Plan a Trip page for anything the FAQ does not cover.

### An Our Story Page That Reads Like a Real Magazine
Our Story gives the fictional journal a full identity. It carries a founding narrative with a founder's byline from Higashiyama in Kyoto, six cultural principles, a timeline of five milestones from 2018 to 2026, a methodology section on how each destination is surveyed, a team section with four curator portraits, and an explanation of why these 16 places were chosen. All of it is fictional, and the notice at the top of the footer says so.

### A Rotating Testimonial Carousel
The homepage carousel cycles through 8 short traveler quotes every 5 seconds. Each one shows a star rating, the traveler's name, home city and country, the destination visited, the season of the trip, and an avatar. It pauses while the pointer rests on it, and previous and next arrows let visitors move through the quotes by hand. The travelers are fictional.

### A Deliberate Visual Identity
Headings use the Shippori Mincho serif, which gives the pages a calm Japanese editorial feel, and body text uses DM Sans with Plus Jakarta Sans as a backup. The look is built from arched photo frames, a red hanko seal stamp, a torii silhouette watermark, a paper lantern decoration, and large kanji watermarks. All colors come from a small set of CSS variables that change with the season, so every page picks up the new theme at the same moment.

### A Footer That Is Honest About the Project
The footer repeats the navigation, shows a studio hours block, the fictional contact details with a button that copies the email address, and a clear disclaimer saying that Hanami is a fictional concept brand made for a portfolio project, with an invitation to open an issue on GitHub if any detail matches a real one.

---

## Tech Stack

| Category | Technology |
|---|---|
| **Framework** | [React 19](https://react.dev/) |
| **Language** | TypeScript |
| **Build Tool** | [Vite 8](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) through the official Vite plugin, plus CSS variables for the seasonal themes |
| **Maps** | [Leaflet](https://leafletjs.com/) with Esri terrain tiles for the regional map and CARTO tiles for the destination maps |
| **Embedded Map** | Google Maps embed on each destination popup |
| **Icons** | [`lucide-react`](https://lucide.dev/) |
| **Fonts** | [Shippori Mincho](https://fonts.google.com/specimen/Shippori+Mincho), [DM Sans](https://fonts.google.com/specimen/DM+Sans), and [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) from Google Fonts |
| **Motion** | CSS keyframe animations and React state timers, with no animation library |
| **Photography** | [Wikimedia Commons](https://commons.wikimedia.org/) for the destination galleries and [Unsplash](https://unsplash.com/) for everything else |
| **Dev Server** | Express with Vite as middleware, used only in development |
| **Hosting** | [Vercel](https://vercel.com/), as a static site |
| **Development Environment** | [Google AI Studio](https://ai.studio) (Build mode, powered by Gemini) |

Hanami needs no backend, no database, and no API key, and it makes no AI call at runtime. Every destination, package, tip, and question is static data written directly in the code. Search, filtering, the maps, the itinerary builder, and the forms all run in the browser. The only outside requests are for Google Fonts, the Leaflet stylesheet, the map tiles, the Google Maps embed, and the photographs.

> The `.env.example` file and a few packages in `package.json` (`@google/genai`, `dotenv`, and `motion`) come from the Google AI Studio template. The interface does not use them. `server.ts` also contains one Gemini route from that template, and nothing on the site ever calls it. Without an API key the server still starts normally and only prints a harmless warning about the missing key.

---

## Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) 20.19 or newer (or 22.12 or newer), because the current version of Vite requires it
* npm (or an equivalent package manager)

### Installation and Local Development

```bash
# 1. Clone the repository
git clone https://github.com/viochris/hanami-japan-showcase.git
cd hanami-japan-showcase

# 2. Install dependencies
npm install

# 3. Start the app in development mode
npm run dev
```

Then open localhost on port 3000 in your browser. If that port is busy, set the `PORT` environment variable before running the command. No environment variables or API keys are required.

If `npm install` stops with a dependency conflict that mentions esbuild, open `package.json`, change the esbuild version from `^0.25.0` to `^0.28.0`, and run `npm install` again. On a fresh clone that is the only manual step I know of. The hosted version builds without any trouble on Vercel.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the Express server with Vite in the middle, on port 3000 with hot reloading |
| `npm start` | Runs the same server. When `NODE_ENV` is set to production it serves the built `dist` folder instead |
| `npm run build` | Builds the static site into the `dist` folder |
| `npm run preview` | Serves the production build locally for a final check |
| `npm run lint` | Type checks the whole project with `tsc` |
| `npm run clean` | Deletes the `dist` folder (macOS and Linux) |

### Deployment
Since the site has no backend dependency, it can be deployed to any static host by running `npm run build` and serving the `dist` folder. The live version is hosted on Vercel at [hanami-japan-showcase.vercel.app](https://hanami-japan-showcase.vercel.app). Page changes happen inside the app and never change the address, so the host does not need any special routing rules.

---

## Project Structure

```
hanami-japan-showcase/
├── src/
│   ├── pages/
│   │   ├── HomePage.tsx            Layered hero, destination ribbon, season spotlight, featured cards, testimonials
│   │   ├── DestinationsPage.tsx    Search, theme filter, saved filter, grid view and regional map view
│   │   ├── OurStoryPage.tsx        Founding story, principles, timeline, methodology, team, selection criteria
│   │   ├── PackagesPage.tsx        Six sample packages, duration filter, and the package data itself
│   │   ├── PlanTripPage.tsx        Consultation form and the itinerary builder in two tabs
│   │   ├── TravelTipsPage.tsx      14 tips with search, group filter, and the tips data itself
│   │   └── FaqPage.tsx             Searchable accordion FAQ and the question data itself
│   ├── components/
│   │   ├── layout/                 Header with the hamburger menu, and the footer with the disclaimer
│   │   ├── navigation/             Breadcrumb bar with a Back button, and the scroll to top button
│   │   ├── home/                   Layered hero and the scrolling destination ribbon
│   │   ├── destinations/           Destination card, detail popup, regional map, and the location map
│   │   ├── itinerary/              Drag and drop itinerary builder
│   │   ├── testimonials/           Auto advancing testimonial carousel
│   │   └── decoration/             Seasonal particles, season selector, page wipe, lantern, kanji watermark
│   ├── context/
│   │   ├── SeasonContext.tsx       Current season, remembered in the browser
│   │   └── WishlistContext.tsx     Saved destinations, remembered in the browser
│   ├── data/
│   │   ├── destinations.ts         All 16 destinations, coordinates, descriptions, and photo galleries
│   │   └── packages.ts             A small set of three package records that no page uses
│   ├── App.tsx                     Page state, navigation history, and the shared layout
│   ├── main.tsx                    React entry point
│   └── index.css                   Tailwind import, seasonal color variables, fonts, and ribbon animation
├── server.ts                       Development server
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
├── bun.lock
├── metadata.json                   Google AI Studio project metadata
├── .env.example                    Template from Google AI Studio, not used by the interface
└── .gitignore
```

---

## How It Works

### Navigation and Page Transitions
`App.tsx` keeps the current page in a single piece of state and renders the header, breadcrumb bar, footer, and whichever of the seven pages is active. It also keeps a small history list so the Back button in the breadcrumb bar knows where to return. When you change pages, the app starts a short wipe built from season specific particles. It switches the page at the moment the screen is fully covered, then lets the wipe finish, and every change of page scrolls back to the top. Extra information can travel with a navigation, for example a destination name for the trip form, a package title, or a category for the destination filter, which is how the buttons around the site pre fill the pages they open.

### The Seasonal Theme System
`SeasonContext` holds the active season and writes it to a `data-season` attribute on the page. `index.css` defines a full set of colors for each season under that attribute, including the hero tint, so switching season changes every color at once without touching any component. The same season value picks the homepage hero photo, the kanji, the ribbon separator, and the particle shapes. Rendering the petals, leaves, maple leaves, and snowflakes uses a small number of elements with CSS keyframe drift animation, so the effect stays soft and cheap.

### Saved Destinations
`WishlistContext` stores the ids of saved destinations in an array and saves it to the browser's local storage whenever it changes. The cards, the popup, the Destinations page, and the itinerary builder all read from the same context, so a heart toggled in one place shows up everywhere.

### Destination Data
`src/data/destinations.ts` holds all 16 destinations as structured data. Each record has an id, a name, a Japanese name, a region, a one line hook, the best season, a suggested visit length, an illustrative cost in yen, an editorial description, a visitor preparedness note, a local insight, a map query, map coordinates, and a gallery. Every gallery image carries a caption plus a record of where it came from. The destination themes used by the filter (Nature, City, History, Onsen) and the map regions (Kanto, Kansai, Chubu, Chugoku, Okinawa) are lookup tables inside the page and map components, so a place can belong to more than one theme.

### Search, Filter, and Views
The Destinations page filters the full list against the search text, the chosen theme, and the saved only toggle in one memoized calculation, so results update instantly and no network request is involved. The theme counts in the dropdown come from the same lookup table. Switching to map view swaps the card grid for the regional map component.

### The Maps
The regional map is a Leaflet map with Esri terrain tiles. Its markers are created once, and the region chips only show or hide them and fly the view to a preset center and zoom. The destination popup has its own small Leaflet map with CARTO tiles, zoomed to street level on the chosen place, and a toggle that swaps it for an embedded Google map built from the same coordinates. The Leaflet stylesheet is loaded from a CDN in `index.html`.

### The Itinerary Builder
The builder keeps its days in React state. Each day has a title and a list of items, and each item remembers its destination and a time slot. Dragging uses the browser's native drag and drop events. The drawer sets the dragged destination when you pick it up, and a day card accepts the drop and adds the item. Dragging between days works the same way through the item's source day and position. The copy button turns the schedule into plain text, grouped by day and time slot, and the apply button passes that same text up to the trip page, which appends it to the notes field and switches tabs.

### The Forms
Both forms are plain React state. The consultation form checks that the name and the contact detail are filled in, builds a confirmation sentence from what was entered, and shows the confirmation card. Nothing is stored and nothing is sent anywhere.

### Packages, Tips, and FAQ
The six packages are defined at the top of `PackagesPage.tsx`, the 14 tips at the top of `TravelTipsPage.tsx`, and the 8 questions at the top of `FaqPage.tsx`. Each page derives the visible list on every keystroke or filter change from its own array, and the counts on the filter chips come from the same array. This keeps each page in a single file that is easy to read and easy to edit.

### Photo Sourcing
The 63 gallery photographs for the destinations are loaded straight from Wikimedia Commons. The homepage hero, the package covers, the team portraits, and the testimonial avatars come from Unsplash. The code keeps a caption and a source note for each gallery image, and the homepage spotlight shows a short Wikimedia Commons credit under its photo.

### The Development Server
`npm run dev` starts `server.ts`, a small Express server that mounts Vite as middleware so the app is served with hot reloading. In production there is no server at all, because the host serves the built files from the `dist` folder.

---

## Known Limitations

This is a learning project, and a few things are not perfect. I would rather list them here than hide them.

* **Most of the business is fictional.** The founder, the curators, the company history, the testimonials, the contact details, and the package offers are invented. The footer says so, and so does the notice at the top of this file.
* **Pages are not tied to web addresses.** The site changes pages with React state instead of a router. Refreshing the browser returns to the home page, the browser's own back button does not move between pages, and a single page cannot be linked to. The Back button and the breadcrumbs inside the site cover the common cases.
* **The hero is layered but does not move with scrolling.** It stacks photos, a watermark, and particles, but nothing shifts as you scroll. The page description in `index.html` still uses the word parallax.
* **The forms send nothing and nobody replies.** The consultation form and the itinerary builder only work inside the browser, and the itinerary is lost when the page is refreshed. The confirmation message and the footer both promise a reply, but they are part of the fictional story and no reply will ever come.
* **The facts have not been verified line by line.** The write ups and tips were spot checked, and the prices are rough ballparks with approximate dollar conversions. Please confirm anything important with an official source.
* **Image credits are general.** The footer and a few captions credit Wikimedia Commons and Creative Commons licensing, but the individual author and license of each photo is not shown on the site. The other photos are Unsplash stock images, and the portraits are unrelated people.
* **Photos are loaded from other websites.** If Wikimedia Commons or Unsplash removes, renames, or slows down an image, that picture can break or load slowly.
* **It needs an internet connection.** The fonts, the Leaflet stylesheet, the map tiles, the Google Maps embed, and every photograph load live, and there is no offline mode.
* **The map tiles are from free services.** They are fine for a small project like this, but a busy production site would need its own arrangement with the tile providers.
* **Some leftovers from the template remain.** The `motion`, `dotenv`, and `@google/genai` packages, the Gemini route in `server.ts`, and the small unused `packages.ts` data file are not used by the interface.
* **There are no automated tests.** The project relies on TypeScript type checking only.
* **The bundle is on the heavy side.** The main JavaScript file is about 650 KB before compression (around 194 KB compressed), so the build prints a size warning.
* **A fresh `npm install` needs one manual change.** As described in Getting Started, the esbuild version in `package.json` conflicts with Vite 8 and has to be raised to `^0.28.0`.
* **Accessibility has not been audited.** The menus, popups, and toggles have labels and keyboard support in places, but the site has not been tested with a screen reader.

---

## Data Sources and Credits

* Destination photographs from [Wikimedia Commons](https://commons.wikimedia.org/) under various Creative Commons licenses.
* Stock photography for the hero, packages, portraits, and avatars from [Unsplash](https://unsplash.com/) under the Unsplash License.
* Map rendering by [Leaflet](https://leafletjs.com/), terrain tiles by Esri, street tiles by [CARTO](https://carto.com/) with data from [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors, and the embedded map by Google Maps.
* Fonts from [Google Fonts](https://fonts.google.com/) and icons from [Lucide](https://lucide.dev/).
* The visitor hotline number on the Travel Tips page belongs to the [Japan National Tourism Organization](https://www.japan.travel/).

The footer of the live site credits Wikimedia Commons and Creative Commons licensing.

---

## License

This project is available for personal reference and learning purposes.

---

<div align="center">

**Made with 🌸 and vibe coding**

[Report an Issue](https://github.com/viochris/hanami-japan-showcase/issues)

</div>
