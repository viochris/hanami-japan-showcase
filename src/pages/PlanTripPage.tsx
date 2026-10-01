import React, { useState, useEffect, useRef } from "react";
import { DESTINATIONS } from "@/src/data/destinations";
import { KanjiWatermark } from "@/src/components/decoration/KanjiWatermark";
import { PageId } from "@/src/components/layout/Header";
import { ItineraryBuilder } from "@/src/components/itinerary/ItineraryBuilder";
import { useSeason } from "@/src/context/SeasonContext";
import { Calendar, FileText, CheckCircle2, ArrowRight, Sparkles, Check } from "lucide-react";

interface PlanTripPageProps {
  initialDestination?: string;
  initialPackageTitle?: string;
  onNavigate: (page: PageId) => void;
}

export const PlanTripPage: React.FC<PlanTripPageProps> = ({
  initialDestination = "",
  initialPackageTitle = "",
  onNavigate
}) => {
  const { seasonInfo } = useSeason();
  const [activeTab, setActiveTab] = useState<"itinerary" | "consultation">("itinerary");

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [destination, setDestination] = useState(initialDestination || "Mount Fuji");
  const [travelWindow, setTravelWindow] = useState("early April 2027");
  const [partySize, setPartySize] = useState(2);
  const [notes, setNotes] = useState(
    initialPackageTitle ? `Interested in the "${initialPackageTitle}" itinerary route.` : ""
  );

  const [submitted, setSubmitted] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [attachedItinerary, setAttachedItinerary] = useState(false);

  // Gemini AI consultation summary states
  const [isGeneratingAiSummary, setIsGeneratingAiSummary] = useState(false);
  const [aiSummaryError, setAiSummaryError] = useState<string | null>(null);
  const [aiSummarySuccess, setAiSummarySuccess] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (initialDestination) setDestination(initialDestination);
    if (initialPackageTitle) {
      setNotes(`Interested in the "${initialPackageTitle}" itinerary route.`);
      setActiveTab("consultation");
    }
  }, [initialDestination, initialPackageTitle]);

  const handleGenerateConsultationAiSummary = async () => {
    setIsGeneratingAiSummary(true);
    setAiSummaryError(null);
    try {
      const res = await fetch("/api/generate-itinerary-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destinations: [destination],
          travelWindow,
          partySize,
          itineraryText: notes,
          season: seasonInfo.label
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to generate summary");
      }

      setNotes(prev => {
        const header = `[Cultural Trip Narrative • ${seasonInfo.label}]\n${data.summary}`;
        if (!prev.trim()) return header;
        return `${prev.trim()}\n\n---\n${header}`;
      });

      setAiSummarySuccess(true);
      setTimeout(() => setAiSummarySuccess(false), 3000);
    } catch (err: any) {
      setAiSummaryError(err.message || "Failed to generate summary");
    } finally {
      setIsGeneratingAiSummary(false);
    }
  };

  const handleApplyItineraryToForm = (itineraryText: string) => {
    setNotes(prev => {
      if (!prev.trim()) return itineraryText;
      return `${prev.trim()}\n\n---\n${itineraryText}`;
    });
    setAttachedItinerary(true);
    setActiveTab("consultation");

    setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) return;

    setConfirmationMessage(
      `Thank you, ${name.trim()}. I've noted your interest in ${destination} for ${travelWindow}, for a party of ${partySize}. Our travel curator will review your custom itinerary notes and reach back to ${contact.trim()} shortly.`
    );
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14 space-y-8">
      {/* Header with seasonal watermark */}
      <div className="relative text-center max-w-2xl mx-auto space-y-3">
        <KanjiWatermark kanji="計画" position="center" className="-top-10" />

        <p className="eyebrow text-xs font-bold uppercase tracking-[0.16em] theme-primary-text">
          Plan Your Japanese Journey
        </p>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[var(--ink)] heading-accent">
          Craft Your Bespoke Itinerary
        </h1>

        <p className="text-sm sm:text-base text-[var(--mute)] font-normal max-w-xl mx-auto pt-1">
          Drag and drop attractions to design your personalized day-by-day travel schedule, or send us your travel consultation request.
        </p>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex items-center justify-center">
        <div className="inline-flex p-1 rounded-full theme-tag-bg border theme-border shadow-xs">
          <button
            onClick={() => setActiveTab("itinerary")}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "itinerary"
                ? "theme-header-bg text-white shadow-sm scale-102"
                : "text-[var(--ink)]/80 hover:text-[var(--ink)]"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Build Itinerary (日程作成)</span>
          </button>

          <button
            onClick={() => setActiveTab("consultation")}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer relative ${
              activeTab === "consultation"
                ? "theme-header-bg text-white shadow-sm scale-102"
                : "text-[var(--ink)]/80 hover:text-[var(--ink)]"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Consultation Request (問い合わせ)</span>
            {attachedItinerary && (
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            )}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {activeTab === "itinerary" ? (
        <ItineraryBuilder
          onApplyToTripForm={handleApplyItineraryToForm}
          initialDestinationName={destination}
        />
      ) : (
        <div className="max-w-[760px] mx-auto space-y-6">
          {attachedItinerary && (
            <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs shadow-xs animate-in fade-in duration-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Your custom day-by-day schedule has been attached to the notes below. You can make adjustments before submitting!
              </span>
            </div>
          )}

          {!submitted ? (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="theme-card-bg border theme-border rounded-2xl p-6 sm:p-10 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              {/* Name */}
              <label className="flex flex-col gap-1.5 text-xs sm:text-sm font-medium text-[var(--ink)]">
                <span>Your Name</span>
                <input
                  name="n"
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Kenji Tanaka"
                  className="p-2.5 rounded-lg border theme-border bg-white text-[var(--ink)] text-sm focus:outline-none focus:border-[var(--red)] transition-colors"
                />
              </label>

              {/* Contact detail */}
              <label className="flex flex-col gap-1.5 text-xs sm:text-sm font-medium text-[var(--ink)]">
                <span>Contact Detail (Email / Phone)</span>
                <input
                  name="c"
                  type="text"
                  required
                  value={contact}
                  onChange={e => setContact(e.target.value)}
                  placeholder="email@domain.com or phone"
                  className="p-2.5 rounded-lg border theme-border bg-white text-[var(--ink)] text-sm focus:outline-none focus:border-[var(--red)] transition-colors"
                />
              </label>

              {/* Destination of interest */}
              <label className="sm:col-span-2 flex flex-col gap-1.5 text-xs sm:text-sm font-medium text-[var(--ink)]">
                <span>Primary Destination of Interest</span>
                <select
                  name="d"
                  value={destination}
                  onChange={e => setDestination(e.target.value)}
                  required
                  className="p-2.5 rounded-lg border theme-border bg-white text-[var(--ink)] text-sm focus:outline-none focus:border-[var(--red)] transition-colors cursor-pointer"
                >
                  <option value="" disabled>Choose a destination…</option>
                  {DESTINATIONS.map(d => (
                    <option key={d.id} value={d.name}>
                      {d.name} ({d.region})
                    </option>
                  ))}
                </select>
              </label>

              {/* Travel window */}
              <label className="flex flex-col gap-1.5 text-xs sm:text-sm font-medium text-[var(--ink)]">
                <span>Travel Window</span>
                <input
                  name="w"
                  type="text"
                  required
                  value={travelWindow}
                  onChange={e => setTravelWindow(e.target.value)}
                  placeholder="e.g. early April 2027"
                  className="p-2.5 rounded-lg border theme-border bg-white text-[var(--ink)] text-sm focus:outline-none focus:border-[var(--red)] transition-colors"
                />
              </label>

              {/* Party size */}
              <label className="flex flex-col gap-1.5 text-xs sm:text-sm font-medium text-[var(--ink)]">
                <span>Party Size</span>
                <input
                  name="p"
                  type="number"
                  min={1}
                  max={20}
                  required
                  value={partySize}
                  onChange={e => setPartySize(parseInt(e.target.value) || 1)}
                  className="p-2.5 rounded-lg border theme-border bg-white text-[var(--ink)] text-sm focus:outline-none focus:border-[var(--red)] transition-colors"
                />
              </label>

              {/* Notes or Custom Itinerary */}
              <label className="sm:col-span-2 flex flex-col gap-1.5 text-xs sm:text-sm font-medium text-[var(--ink)]">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span>Itinerary Notes & Special Wishes</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleGenerateConsultationAiSummary}
                      disabled={isGeneratingAiSummary}
                      className="text-[11px] font-bold theme-cta-btn px-2.5 py-1 rounded-md text-white flex items-center gap-1 shadow-2xs hover:scale-102 transition-all cursor-pointer disabled:opacity-50"
                      title="Write a short culturally-informed paragraph using Gemini based on selected destination and details"
                    >
                      <Sparkles className={`w-3 h-3 ${isGeneratingAiSummary ? "animate-spin text-[var(--gold)]" : "text-white"}`} />
                      <span>{isGeneratingAiSummary ? "Writing Narrative…" : aiSummarySuccess ? "Narrative Appended!" : "Generate AI Summary"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("itinerary")}
                      className="text-[11px] theme-primary-text font-bold hover:underline cursor-pointer"
                    >
                      Open Itinerary Builder →
                    </button>
                  </div>
                </div>

                {aiSummaryError && (
                  <p className="text-xs text-red-600 bg-red-50 p-2 rounded border border-red-200">
                    {aiSummaryError}
                  </p>
                )}

                <textarea
                  name="nt"
                  rows={6}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Tell us about special pacing, dietary needs, onsen ryokan preferences, or attached day-by-day plans…"
                  className="p-2.5 rounded-lg border theme-border bg-white text-[var(--ink)] text-sm focus:outline-none focus:border-[var(--red)] transition-colors font-mono leading-relaxed"
                />
              </label>

              {/* Submit Button */}
              <div className="sm:col-span-2 pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-full theme-cta-btn font-bold text-sm tracking-wide transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                >
                  <span>Send Consultation Request</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          ) : (
            /* Confirmation card matching reference */
            <div className="theme-card-bg border theme-border rounded-2xl p-8 sm:p-12 text-center space-y-4 shadow-sm animate-in fade-in duration-300">
              <div className="w-14 h-14 rounded-full theme-header-bg text-[var(--gold)] flex items-center justify-center mx-auto text-2xl font-serif">
                謝
              </div>
              <h2 className="font-serif text-2xl font-bold text-[var(--ink)]">
                Request Received
              </h2>
              <p className="text-sm sm:text-base text-[var(--mute)] max-w-md mx-auto leading-relaxed">
                {confirmationMessage}
              </p>
              <div className="pt-4 flex items-center justify-center gap-3 flex-wrap">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setNotes("");
                  }}
                  className="px-5 py-2 rounded-full border theme-border bg-white text-[var(--ink)] text-xs font-bold hover:bg-white/80 transition-colors cursor-pointer"
                >
                  Submit Another Plan
                </button>
                <button
                  onClick={() => onNavigate("destinations")}
                  className="px-5 py-2 rounded-full theme-cta-btn text-white text-xs font-bold transition-all cursor-pointer"
                >
                  Explore Destinations
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
