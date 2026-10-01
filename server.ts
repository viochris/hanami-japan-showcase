import express, { Request, Response } from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize Google GenAI with recommended telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build"
    }
  }
});

// API endpoint: Generate AI Itinerary Summary
app.post("/api/generate-itinerary-summary", async (req: Request, res: Response) => {
  try {
    const { destinations, travelWindow, partySize, itineraryText, season } = req.body;

    if ((!destinations || destinations.length === 0) && !itineraryText) {
      return res.status(400).json({
        error: "At least one destination or planned itinerary is required."
      });
    }

    const destinationList = Array.isArray(destinations) ? destinations.join(", ") : destinations;

    const prompt = `Write a short, evocative, culturally-informed paragraph (around 80–120 words) describing this planned journey across Japan.
Chosen destinations: ${destinationList || "Various cultural sanctuaries"}
${travelWindow ? `Travel window: ${travelWindow}` : ""}
${partySize ? `Party size: ${partySize} traveler(s)` : ""}
${season ? `Seasonal ambiance: ${season}` : ""}
${itineraryText ? `Draft Day-by-Day schedule:\n${itineraryText}` : ""}

Guidelines:
- Weave together the destinations in a natural narrative arc that celebrates Japan's cultural harmony (e.g. balancing ancient shrine quietude with metropolitan vitality, or misty mountain onsens with historic castle stonework).
- Infuse authentic cultural concepts gently (e.g., ma/negative space, omotenashi hospitality, seasonal shunsai rhythm, or temple tranquility).
- Keep it concise, poetic yet practical, warm and inspiring. Do not use generic AI buzzwords or bullet points—deliver a single, beautifully crafted editorial paragraph.`;

    let summary = "";
    const modelsToTry = ["gemini-3.8-flash", "gemini-flash-latest", "gemini-3.1-flash-lite"];

    for (const model of modelsToTry) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: prompt,
          config: {
            systemInstruction:
              "You are a master cultural travel curator for Hanami, a luxury boutique Japanese journey designer. Your prose is elegant, mindful, wabi-sabi inspired, respectful of local traditions, and evocative of Japan's timeless landscapes.",
            temperature: 0.7
          }
        });

        if (response.text?.trim()) {
          summary = response.text.trim();
          break;
        }
      } catch (err: any) {
        console.warn(`Model ${model} attempt failed:`, err?.message || err);
      }
    }

    if (!summary) {
      // Graceful cultural fallback if all external models are experiencing temporary high-demand rate limits
      summary = `A contemplative voyage through ${destinationList || "Japan's sacred sanctuaries"}, attuned to the mindful cadence of ${season || "the season"}. From dawn mist gently lifting over tranquil temple corridors to twilight descending across historic paths, this bespoke itinerary harmonizes Japan's timeless reverence for nature with genuine omotenashi hospitality—inviting you to savor each quiet threshold between ancient stone and modern wonder.`;
    }

    return res.json({ summary });
  } catch (error: any) {
    console.error("Gemini API generation error:", error);
    return res.status(500).json({
      error: error?.message || "Failed to generate AI itinerary summary"
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve(__dirname, "dist")));
    app.get("*", (_req, res) => {
      res.sendFile(path.resolve(__dirname, "dist", "index.html"));
    });
  } else {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: "0.0.0.0",
        port: PORT
      },
      appType: "spa"
    });

    app.use(vite.middlewares);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
