import React from "react";
import { Destination } from "@/src/data/destinations";
import { useWishlist } from "@/src/context/WishlistContext";
import { Heart, MapPin, ArrowRight, Clock, Sparkles } from "lucide-react";

interface DestinationCardProps {
  destination: Destination;
  index?: number;
  onSelect: (destination: Destination) => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  index,
  onSelect
}) => {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(destination.id);

  const heroImage = destination.gallery[0] || {
    url: "",
    caption: destination.name,
    searchTermOrSource: `Wikimedia Commons: ${destination.name}`
  };

  const formattedIndex =
    index !== undefined ? String(index + 1).padStart(2, "0") + " / 16" : null;

  // Clean season label
  const cleanSeasonBadge =
    destination.bestSeason.split("(")[0].trim() || destination.bestSeason;

  // Clean Japanese name
  const cleanJapaneseName = destination.japaneseName.split("（")[0];

  return (
    <article className="group relative flex flex-col h-full theme-card-bg rounded-3xl overflow-hidden border theme-border transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl shadow-xs will-change-transform">
      {/* Top Header Row: Raised Index Counter & Japanese Name */}
      <div className="px-4.5 pt-3.5 pb-2 flex items-center justify-between text-xs z-10">
        {formattedIndex ? (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-white/95 border theme-border text-[10px] font-bold tracking-widest uppercase text-[var(--ink)] shadow-2xs">
            {formattedIndex}
          </span>
        ) : <span />}

        <span className="font-serif font-bold text-xs theme-primary-text tracking-wider">
          {cleanJapaneseName}
        </span>
      </div>

      {/* Thumbnail Container */}
      <div className="relative aspect-16/10 overflow-hidden bg-[#2B2440]/5 mx-3 mb-0 rounded-2xl arch-photo">
        <img
          src={heroImage.url}
          alt={`Photograph of ${destination.name}`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />

        {/* Gradient scrim for text legibility */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

        {/* Traditional Red Hanko Seal for Arashiyama */}
        {destination.id === "arashiyama-bamboo-grove" && (
          <div
            className="absolute top-2.5 left-2.5 z-20 w-8 h-8 rounded-md bg-[var(--red)] text-white font-serif font-bold text-xs flex items-center justify-center shadow-md border border-white/80 rotate-[-5deg]"
            title="Arashiyama Hanko Stamp"
          >
            嵐山
          </div>
        )}

        {/* Flat Bottom Region badge */}
        <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-center justify-between text-white drop-shadow-sm">
          <span className="text-xs font-medium flex items-center gap-1.5 text-white/95 truncate">
            <MapPin className="w-3.5 h-3.5 text-[var(--gold)] shrink-0" />
            <span className="truncate">{destination.region}</span>
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          {/* Tags row: Category & Best Season */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-block px-2.5 py-0.5 text-[11px] font-bold tracking-wider uppercase theme-header-bg text-white rounded-md shadow-2xs whitespace-nowrap">
              {destination.category}
            </span>
            <span className="inline-block px-2.5 py-0.5 text-[11px] font-semibold bg-[#FDF2DC] text-[#7A5B20] border border-[#ECD19A] rounded-md whitespace-nowrap">
              {cleanSeasonBadge}
            </span>
          </div>

          {/* Destination Name */}
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--ink)] group-hover:text-[var(--red)] transition-colors leading-snug">
            {destination.name}
          </h3>

          {/* One-Line Hook */}
          <p className="text-xs sm:text-sm text-[var(--ink)]/80 line-clamp-3 leading-relaxed font-normal min-h-[3.6em]">
            {destination.oneLineHook}
          </p>

          {/* Duration & Highlights info pill */}
          <div className="flex items-center gap-2 text-[11px] text-[var(--mute)] pt-1">
            <Clock className="w-3.5 h-3.5 text-[var(--gold)] shrink-0" />
            <span className="truncate font-medium">{destination.suggestedDuration}</span>
          </div>
        </div>

        {/* Action Row */}
        <div className="pt-3 border-t theme-border flex items-center justify-between gap-2">
          <button
            onClick={() => onSelect(destination)}
            className="px-4 py-2 rounded-full theme-cta-btn text-white text-xs font-bold hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shadow-xs inline-flex items-center gap-1.5"
          >
            <span>Read Cultural Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => toggleWishlist(destination.id)}
            className={`px-3 py-2 rounded-full text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
              wishlisted
                ? "theme-primary-bg text-white border-transparent shadow-xs"
                : "bg-white text-[var(--ink)] border-[var(--gold)] hover:bg-white/80 hover:text-[var(--red)]"
            }`}
            title={wishlisted ? "Remove from saved wishlist" : "Save to wishlist"}
            aria-label={
              wishlisted
                ? `Remove ${destination.name} from wishlist`
                : `Save ${destination.name} to wishlist`
            }
          >
            <Heart
              className={`w-3.5 h-3.5 ${
                wishlisted ? "fill-white text-white" : "text-[var(--red)]"
              }`}
            />
            <span className="hidden sm:inline">{wishlisted ? "Saved" : "Save"}</span>
          </button>
        </div>
      </div>
    </article>
  );
};
