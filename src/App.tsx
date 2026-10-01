/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { WishlistProvider } from "@/src/context/WishlistContext";
import { SeasonProvider } from "@/src/context/SeasonContext";
import { Header, PageId } from "@/src/components/layout/Header";
import { Breadcrumbs } from "@/src/components/navigation/Breadcrumbs";
import { Footer } from "@/src/components/layout/Footer";
import { SakuraPetals } from "@/src/components/decoration/SakuraPetals";
import { SeasonalPageTransition } from "@/src/components/decoration/SeasonalPageTransition";
import { DestinationModal } from "@/src/components/destinations/DestinationModal";
import { HomePage } from "@/src/pages/HomePage";
import { DestinationsPage } from "@/src/pages/DestinationsPage";
import { OurStoryPage } from "@/src/pages/OurStoryPage";
import { PackagesPage } from "@/src/pages/PackagesPage";
import { PlanTripPage } from "@/src/pages/PlanTripPage";
import { TravelTipsPage } from "@/src/pages/TravelTipsPage";
import { FaqPage } from "@/src/pages/FaqPage";
import { DESTINATIONS, Destination, DestinationCategory } from "@/src/data/destinations";

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>("home");
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  // Cross-page navigation states
  const [destinationsCategoryFilter, setDestinationsCategoryFilter] =
    useState<DestinationCategory>("All");
  const [destinationsWishlistOnly, setDestinationsWishlistOnly] = useState(false);
  const [planTripDestination, setPlanTripDestination] = useState("");
  const [planTripPackageTitle, setPlanTripPackageTitle] = useState("");

  // Navigation flow history tracker
  const [navHistory, setNavHistory] = useState<Array<{ page: PageId; extraState?: any }>>([
    { page: "home" }
  ]);

  // Global Page-Load Seasonal Wipe Transition
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pendingNav, setPendingNav] = useState<{
    page: PageId;
    extraState?: any;
    isBackNav?: boolean;
  } | null>(null);

  const getPageTitle = (p: PageId) => {
    switch (p) {
      case "home":
        return "Home";
      case "destinations":
        return "Destinations";
      case "our-story":
        return "Our Story";
      case "packages":
        return "Travel Packages";
      case "plan-trip":
        return "Plan a Trip";
      case "travel-tips":
        return "Travel Tips";
      case "faq":
        return "FAQ";
      default:
        return "";
    }
  };

  const applyNavigationState = (page: PageId, extraState?: any, isBackNav = false) => {
    setCurrentPage(page);

    if (!isBackNav) {
      setNavHistory(prev => {
        const last = prev[prev.length - 1];
        if (
          last &&
          last.page === page &&
          JSON.stringify(last.extraState || null) === JSON.stringify(extraState || null)
        ) {
          return prev;
        }
        return [...prev, { page, extraState }];
      });
    }

    if (extraState) {
      if (extraState.category) {
        setDestinationsCategoryFilter(extraState.category);
        setDestinationsWishlistOnly(false);
      }
      if (extraState.filterWishlist !== undefined) {
        setDestinationsWishlistOnly(extraState.filterWishlist);
      }
      if (extraState.destination) {
        setPlanTripDestination(extraState.destination);
      }
      if (extraState.packageTitle) {
        setPlanTripPackageTitle(extraState.packageTitle);
      }
    } else {
      if (page !== "plan-trip") {
        setPlanTripDestination("");
        setPlanTripPackageTitle("");
      }
    }
  };

  const handleNavigate = (page: PageId, extraState?: any, isBackNav = false) => {
    // If staying on the same page, update states without screen wipe
    if (page === currentPage) {
      applyNavigationState(page, extraState, isBackNav);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Trigger seasonal screen wipe transition
    setPendingNav({ page, extraState, isBackNav });
    setIsTransitioning(true);
  };

  const handleWipeCovered = () => {
    if (pendingNav) {
      applyNavigationState(pendingNav.page, pendingNav.extraState, pendingNav.isBackNav);
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  };

  const handleWipeComplete = () => {
    setIsTransitioning(false);
    setPendingNav(null);
  };

  const handleGoBack = () => {
    if (selectedDestination) {
      setSelectedDestination(null);
      return;
    }

    if (navHistory.length > 1) {
      const nextHistory = [...navHistory];
      nextHistory.pop(); // remove active page
      const previous = nextHistory[nextHistory.length - 1];
      setNavHistory(nextHistory);
      if (previous) {
        handleNavigate(previous.page, previous.extraState, true);
      }
    } else {
      handleNavigate("home", undefined, true);
    }
  };

  const handleSelectDestination = (dest: Destination) => {
    setSelectedDestination(dest);
  };

  const handleSelectDestinationByName = (name: string) => {
    const found = DESTINATIONS.find(
      d => d.name.toLowerCase() === name.toLowerCase()
    );
    if (found) {
      setSelectedDestination(found);
    }
  };

  const handlePlanTripHere = (destinationName: string) => {
    setPlanTripDestination(destinationName);
    setPlanTripPackageTitle("");
    handleNavigate("plan-trip", { destination: destinationName });
  };

  return (
    <SeasonProvider>
      <WishlistProvider>
        <div className="relative min-h-screen flex flex-col bg-[#FFF8FA] text-[#2B2440] selection:bg-[#FFC2D1] selection:text-[#2B2440] transition-colors duration-300">
          {/* Global Page-Load Seasonal Screen Wipe Transition Overlay */}
          <SeasonalPageTransition
            isTransitioning={isTransitioning}
            targetPageLabel={pendingNav ? getPageTitle(pendingNav.page) : ""}
            onCovered={handleWipeCovered}
            onComplete={handleWipeComplete}
          />

          {/* Subtle site-wide ambient falling seasonal particles (Sakura, Verdant, Momiji, Snow) */}
          <SakuraPetals density="low" className="hidden sm:block" />

          {/* Global Responsive Navigation Header with Seasonal Switcher */}
          <Header currentPage={currentPage} onNavigate={handleNavigate} />

          {/* Breadcrumb Navigation Component (Tracks user flow and history) */}
          <Breadcrumbs
            currentPage={currentPage}
            selectedDestination={selectedDestination}
            destinationsCategory={destinationsCategoryFilter}
            destinationsWishlistOnly={destinationsWishlistOnly}
            planTripDestination={planTripDestination}
            planTripPackageTitle={planTripPackageTitle}
            onNavigate={handleNavigate}
            onCloseDestinationModal={() => setSelectedDestination(null)}
            onGoBack={handleGoBack}
            canGoBack={navHistory.length > 1 || selectedDestination !== null}
          />

          {/* Main Content Area: 7 Pages (Section 6) */}
          <main className="flex-1">
            {currentPage === "home" && (
              <HomePage
                onNavigate={handleNavigate}
                onSelectDestination={handleSelectDestination}
              />
            )}

            {currentPage === "destinations" && (
              <DestinationsPage
                onSelectDestination={handleSelectDestination}
                initialCategory={destinationsCategoryFilter}
                initialWishlistOnly={destinationsWishlistOnly}
              />
            )}

            {currentPage === "our-story" && (
              <OurStoryPage onNavigate={handleNavigate} />
            )}

            {currentPage === "packages" && (
              <PackagesPage
                onNavigate={handleNavigate}
                onSelectDestinationByName={handleSelectDestinationByName}
              />
            )}

            {currentPage === "plan-trip" && (
              <PlanTripPage
                initialDestination={planTripDestination}
                initialPackageTitle={planTripPackageTitle}
                onNavigate={handleNavigate}
              />
            )}

            {currentPage === "travel-tips" && <TravelTipsPage />}

            {currentPage === "faq" && <FaqPage onNavigate={handleNavigate} />}
          </main>

          {/* Destination Detail Popup (Section 7.2) */}
          <DestinationModal
            destination={selectedDestination}
            onClose={() => setSelectedDestination(null)}
            onPlanTripHere={handlePlanTripHere}
          />

          {/* Global Footer (Section 6 & AC12) */}
          <Footer onNavigate={handleNavigate} />
        </div>
      </WishlistProvider>
    </SeasonProvider>
  );
}
