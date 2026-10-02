import React, { useEffect, useState } from "react";
import { Destination } from "@/src/data/destinations";
import { useWishlist } from "@/src/context/WishlistContext";
import { DestinationLocationMap } from "./DestinationLocationMap";
import {
  X,
  Heart,
  Calendar,
  Clock,
  Coins,
  MapPin,
  Sparkles,
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface DestinationModalProps {
  destination: Destination | null;
  onClose: () => void;
  onPlanTripHere: (destinationName: string) => void;
}

export const DestinationModal: React.FC<DestinationModalProps> = ({
  destination,
  onClose,
  onPlanTripHere
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { isWishlisted, toggleWishlist } = useWishlist();

  useEffect(() => {
    setActiveImageIndex(0);
  }, [destination]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft" && destination && destination.gallery.length > 1) {
        setActiveImageIndex(prev => (prev === 0 ? destination.gallery.length - 1 : prev - 1));
      } else if (e.key === "ArrowRight" && destination && destination.gallery.length > 1) {
        setActiveImageIndex(prev => (prev === destination.gallery.length - 1 ? 0 : prev + 1));
      }
    };

    if (destination) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [destination, onClose]);

  if (!destination) return null;

  const currentWishlistState = isWishlisted(destination.id);
  const activeImage = destination.gallery[activeImageIndex] || destination.gallery[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-destination-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-[#2B2440]/65 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-[920px] theme-card-bg rounded-2xl shadow-2xl overflow-hidden border theme-border my-auto text-[var(--ink)] max-h-[92vh] flex flex-col">
        {/* Sticky Close Button (Matching Reference .x) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full theme-header-bg text-white flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer shadow-md"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-8 space-y-6 flex-1">
          {/* Tags */}
          <div className="flex items-center gap-2 flex-wrap pr-12">
            <span className="badge text-xs font-bold uppercase tracking-wider theme-header-bg text-white px-2.5 py-0.5 rounded-md">
              {destination.category}
            </span>
            <span className="season text-xs font-bold theme-tag-bg px-2.5 py-0.5 rounded-md border theme-border">
              {destination.bestSeason}
            </span>
          </div>

          {/* Heading */}
          <div className="space-y-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h2
                id="modal-destination-title"
                className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--ink)]"
              >
                {destination.name}
              </h2>
              <span className="font-serif text-lg sm:text-xl text-[var(--red)] font-bold">
                {destination.japaneseName}
              </span>
              {destination.id === "arashiyama-bamboo-grove" && (
                <span
                  className="w-8 h-8 rounded-md bg-[var(--red)] text-white font-serif font-bold text-xs flex items-center justify-center shadow-sm border border-white/60 rotate-[-4deg]"
                  title="Arashiyama Hanko Stamp"
                >
                  嵐山
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-[#8B7E8C] flex items-center gap-1 font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF6A]" />
              {destination.region}
            </p>
          </div>

          {/* Photo Gallery Grid (Matching Reference .gal) */}
          <div className="space-y-2">
            {/* Main Featured Image */}
            <div className="relative aspect-16/9 w-full bg-[#2B2440]/5 rounded-xl overflow-hidden border border-[#F7C4D6]">
              <img
                src={activeImage.url}
                alt={activeImage.caption}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              {/* Prev / Next controls */}
              {destination.gallery.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActiveImageIndex(prev =>
                        prev === 0 ? destination.gallery.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#2B2440] flex items-center justify-center shadow-md cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      setActiveImageIndex(prev =>
                        prev === destination.gallery.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#2B2440] flex items-center justify-center shadow-md cursor-pointer"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            {/* Gallery Thumbnails & Citation (Matching Reference figcaption) */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-[#8B7E8C]">
              <span>
                Search "{destination.name}" · <a href="https://commons.wikimedia.org" target="_blank" rel="noopener noreferrer" className="text-[#C9414D] underline">Wikimedia Commons</a>
              </span>
              {destination.gallery.length > 1 && (
                <div className="flex gap-1.5 overflow-x-auto">
                  {destination.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-12 h-9 rounded overflow-hidden border-2 cursor-pointer transition-all ${
                        activeImageIndex === idx ? "border-[#C9414D]" : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={img.url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base leading-relaxed text-[#2B2440]">
            {destination.editorialDescription}
          </p>

          {/* Visitor Care / Preparedness Box (Matching Reference .care) */}
          <div className="p-4 rounded-r-xl border-l-4 border-[#D4AF6A] bg-white/90 text-xs sm:text-sm text-[#2B2440] shadow-2xs">
            <strong className="block text-[#2B2440] font-bold mb-1">
              Visitor note & etiquette:
            </strong>
            <p className="m-0 leading-relaxed">
              {destination.visitorPreparednessNote}
            </p>
          </div>

          {/* Local Insight / Did You Know? Box (User explicit enhancement request) */}
          <div className="p-4 rounded-xl border theme-border theme-tag-bg text-xs sm:text-sm text-[var(--ink)] flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 theme-primary-text shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold text-[var(--ink)]">Local Insight / Did You Know?</strong>
              <p className="m-0 text-[var(--ink)]/90 leading-relaxed mt-0.5">
                {destination.localInsight}
              </p>
            </div>
          </div>

          {/* Facts Grid (Matching Reference .facts) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="theme-tag-bg border theme-border rounded-xl p-3 text-xs sm:text-sm">
              <b className="block text-[10px] tracking-wider uppercase text-[#8B7E8C] font-bold mb-0.5">
                Best season
              </b>
              <span>{destination.bestSeason}</span>
            </div>
            <div className="bg-white border border-[#F0DBE4] rounded-xl p-3 text-xs sm:text-sm">
              <b className="block text-[10px] tracking-wider uppercase text-[#8B7E8C] font-bold mb-0.5">
                Illustrative cost
              </b>
              <span>{destination.illustrativeCostYen}</span>
            </div>
            <div className="bg-white border border-[#F0DBE4] rounded-xl p-3 text-xs sm:text-sm">
              <b className="block text-[10px] tracking-wider uppercase text-[#8B7E8C] font-bold mb-0.5">
                Suggested time
              </b>
              <span>{destination.suggestedDuration}</span>
            </div>
          </div>

          {/* Dedicated Location Map with Guaranteed Red Pin */}
          <DestinationLocationMap destination={destination} />

          {/* Action Row matching Reference (.acts) */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => {
                onPlanTripHere(destination.name);
                onClose();
              }}
              className="px-6 py-2.5 rounded-full bg-linear-to-r from-[#C9414D] to-[#E2647D] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              Plan a Trip Here
            </button>

            <button
              onClick={() => toggleWishlist(destination.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold border-1.5 transition-all cursor-pointer flex items-center gap-1.5 ${
                currentWishlistState
                  ? "bg-[#C9414D] border-[#C9414D] text-white shadow-xs"
                  : "bg-transparent border-[#2B2440] text-[#2B2440] hover:bg-[#2B2440] hover:text-white"
              }`}
            >
              <span>{currentWishlistState ? "♥ Saved" : "♡ Save to Wishlist"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
