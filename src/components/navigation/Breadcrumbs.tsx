import React from "react";
import { PageId } from "@/src/components/layout/Header";
import { ChevronRight, Home, ArrowLeft } from "lucide-react";
import { Destination } from "@/src/data/destinations";

export interface BreadcrumbItem {
  id: string;
  label: string;
  japaneseLabel?: string;
  onClick?: () => void;
  isCurrent?: boolean;
}

interface BreadcrumbsProps {
  currentPage: PageId;
  selectedDestination?: Destination | null;
  destinationsCategory?: string;
  destinationsWishlistOnly?: boolean;
  planTripDestination?: string;
  planTripPackageTitle?: string;
  onNavigate: (page: PageId, extraState?: any) => void;
  onCloseDestinationModal?: () => void;
  onGoBack?: () => void;
  canGoBack?: boolean;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  currentPage,
  selectedDestination,
  destinationsCategory,
  destinationsWishlistOnly,
  planTripDestination,
  planTripPackageTitle,
  onNavigate,
  onCloseDestinationModal,
  onGoBack,
  canGoBack = false
}) => {
  // If on home with no modal open, breadcrumbs can be concealed for a pristine hero view
  if (currentPage === "home" && !selectedDestination) {
    return null;
  }

  // Construct dynamic breadcrumb trail based on user navigation flow
  const items: BreadcrumbItem[] = [
    {
      id: "home",
      label: "Home",
      japaneseLabel: "ホーム",
      onClick: () => {
        if (selectedDestination && onCloseDestinationModal) {
          onCloseDestinationModal();
        }
        onNavigate("home");
      }
    }
  ];

  switch (currentPage) {
    case "destinations":
      items.push({
        id: "destinations",
        label: "Destinations",
        japaneseLabel: "名所",
        onClick: () => {
          if (selectedDestination && onCloseDestinationModal) {
            onCloseDestinationModal();
          } else {
            onNavigate("destinations", { category: "All", filterWishlist: false });
          }
        },
        isCurrent: !selectedDestination && (!destinationsCategory || destinationsCategory === "All") && !destinationsWishlistOnly
      });

      if (destinationsWishlistOnly) {
        items.push({
          id: "wishlist",
          label: "My Wishlist",
          japaneseLabel: "お気に入り",
          isCurrent: !selectedDestination
        });
      } else if (destinationsCategory && destinationsCategory !== "All") {
        items.push({
          id: `cat-${destinationsCategory}`,
          label: destinationsCategory,
          isCurrent: !selectedDestination,
          onClick: () => {
            if (selectedDestination && onCloseDestinationModal) {
              onCloseDestinationModal();
            }
          }
        });
      }

      if (selectedDestination) {
        items.push({
          id: `dest-${selectedDestination.id}`,
          label: selectedDestination.name,
          japaneseLabel: selectedDestination.japaneseName.split("（")[0],
          isCurrent: true
        });
      }
      break;

    case "our-story":
      items.push({
        id: "our-story",
        label: "Our Story",
        japaneseLabel: "物語",
        isCurrent: true
      });
      break;

    case "packages":
      items.push({
        id: "packages",
        label: "Travel Packages",
        japaneseLabel: "旅",
        isCurrent: true
      });
      break;

    case "plan-trip":
      if (planTripPackageTitle) {
        items.push({
          id: "packages-origin",
          label: "Travel Packages",
          japaneseLabel: "旅",
          onClick: () => onNavigate("packages")
        });
        items.push({
          id: "plan-trip",
          label: `Plan: ${planTripPackageTitle}`,
          japaneseLabel: "計画",
          isCurrent: true
        });
      } else if (planTripDestination) {
        items.push({
          id: "destinations-origin",
          label: "Destinations",
          japaneseLabel: "名所",
          onClick: () => onNavigate("destinations")
        });
        items.push({
          id: "plan-trip",
          label: `Plan: ${planTripDestination}`,
          japaneseLabel: "計画",
          isCurrent: true
        });
      } else {
        items.push({
          id: "plan-trip",
          label: "Plan a Trip",
          japaneseLabel: "計画",
          isCurrent: true
        });
      }
      break;

    case "travel-tips":
      items.push({
        id: "travel-tips",
        label: "Travel Tips",
        japaneseLabel: "案内",
        isCurrent: true
      });
      break;

    case "faq":
      items.push({
        id: "faq",
        label: "FAQ",
        japaneseLabel: "問",
        isCurrent: true
      });
      break;

    case "home":
      if (selectedDestination) {
        items.push({
          id: `spotlight-${selectedDestination.id}`,
          label: selectedDestination.name,
          japaneseLabel: selectedDestination.japaneseName.split("（")[0],
          isCurrent: true
        });
      }
      break;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className="theme-card-bg border-b theme-border backdrop-blur-xs py-2.5 px-4 sm:px-6 lg:px-8 transition-colors"
    >
      <div className="max-w-[1160px] mx-auto flex items-center justify-between gap-3 text-xs">
        {/* Breadcrumb Trail */}
        <ol className="flex items-center flex-wrap gap-1.5 sm:gap-2 m-0 p-0 list-none">
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;

            return (
              <li key={item.id} className="flex items-center gap-1.5 sm:gap-2">
                {idx > 0 && (
                  <ChevronRight
                    className="w-3.5 h-3.5 text-[var(--mute)] shrink-0"
                    aria-hidden="true"
                  />
                )}

                {isLast ? (
                  <span
                    aria-current="page"
                    className="font-semibold text-[var(--ink)] flex items-center gap-1"
                  >
                    <span>{item.label}</span>
                    {item.japaneseLabel && (
                      <span className="text-[11px] font-serif theme-primary-text opacity-90" aria-hidden="true">
                        ({item.japaneseLabel})
                      </span>
                    )}
                  </span>
                ) : (
                  <button
                    onClick={item.onClick}
                    className="text-[var(--mute)] hover:text-[var(--red)] transition-colors cursor-pointer flex items-center gap-1 group"
                  >
                    {idx === 0 && <Home className="w-3 h-3 group-hover:scale-110 transition-transform" />}
                    <span>{item.label}</span>
                  </button>
                )}
              </li>
            );
          })}
        </ol>

        {/* Quick Back Action */}
        {canGoBack && onGoBack && (
          <button
            onClick={onGoBack}
            className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold theme-primary-text hover:underline cursor-pointer shrink-0"
            title="Return to previous screen"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Back</span>
          </button>
        )}
      </div>
    </nav>
  );
};
