import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { SeasonToggle } from "@/src/components/decoration/SeasonToggle";

export type PageId =
  | "home"
  | "destinations"
  | "our-story"
  | "packages"
  | "plan-trip"
  | "travel-tips"
  | "faq";

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId, extraState?: any) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: Array<{ id: PageId; label: string }> = [
    { id: "home", label: "Home" },
    { id: "destinations", label: "Destinations" },
    { id: "our-story", label: "Our Story" },
    { id: "packages", label: "Travel Packages" },
    { id: "travel-tips", label: "Travel Tips" },
    { id: "faq", label: "FAQ" }
  ];

  const handleNav = (page: PageId, extraState?: any) => {
    onNavigate(page, extraState);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 theme-header-bg text-[#FFF0F5] border-b shadow-md transition-colors">
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-3 sm:gap-4">
          {/* Zone 1: Brand Wordmark with gold kanji accent matching reference */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNav("home")}
              className="text-left flex items-center gap-2.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D4AF6A] rounded-sm py-1 group"
              aria-label="Hanami Japan Home"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-linear-to-br from-[#8F2429] to-[#701A1E] border border-[#D4AF6A]/80 flex items-center justify-center shadow-xs group-hover:scale-105 group-hover:border-[#D4AF6A] transition-all shrink-0">
                <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFF0F5]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 7h16M6 7v11M18 7v11M3 9.5h18M8 9.5h8" />
                  <circle cx="12" cy="5" r="1.5" fill="#D4AF6A" stroke="none" />
                </svg>
              </div>
              <span className="font-serif text-xl sm:text-2xl md:text-3xl font-bold tracking-wide text-white group-hover:tracking-wider transition-all duration-300">
                Hanami
                <i className="not-italic text-[#D4AF6A] font-serif text-sm sm:text-base font-normal ml-2 hidden min-[420px]:inline" aria-hidden="true">
                  花見
                </i>
              </span>
            </button>
          </div>

          {/* Zone 2: Navigation Links (Breakpoint 1024px: visible on desktop, collapsed on mobile) */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-5 xl:gap-7"
          >
            {navLinks.map(link => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className={`text-sm font-medium transition-colors cursor-pointer py-1 border-b-2 relative ${
                    isActive
                      ? "text-white border-[#D4AF6A] font-semibold"
                      : "text-[#FFF0F5]/85 hover:text-white border-transparent"
                  }`}
                >
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions (Seasonal Theme Toggle + Persistent CTA Button + Mobile Hamburger) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Seasonal Theme Switcher */}
            <SeasonToggle />

            {/* Persistent CTA Button (Always visible on mobile & desktop) */}
            <button
              onClick={() => handleNav("plan-trip")}
              className={`px-3.5 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-bold tracking-wide rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap shadow-md ${
                currentPage === "plan-trip"
                  ? "bg-[#D4AF6A] text-[#2B2440]"
                  : "theme-cta-btn"
              }`}
            >
              Plan a Trip
            </button>

            {/* Hamburger Button (Visible below 1024px) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-white border border-[#D4AF6A]/60 hover:bg-white/10 transition-colors cursor-pointer w-10 h-10 flex items-center justify-center"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown (below 1024px) */}
      {mobileMenuOpen && (
        <div className="lg:hidden theme-header-bg border-t px-4 pt-3 pb-6 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1">
            {navLinks.map(link => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium text-left transition-colors cursor-pointer ${
                    isActive
                      ? "bg-white/10 text-white font-semibold border-l-3 border-[#D4AF6A]"
                      : "text-[#FFF0F5]/80 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};
