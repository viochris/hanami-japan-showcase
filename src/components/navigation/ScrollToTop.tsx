import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top of page"
      className={`fixed bottom-6 right-6 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full theme-header-bg text-[#FFF0F5] border-2 border-[var(--gold)]/80 shadow-lg hover:shadow-2xl hover:scale-108 active:scale-95 flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out backdrop-blur-xs group ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
          : "opacity-0 translate-y-4 scale-90 pointer-events-none"
      }`}
      title="Scroll to top"
    >
      <ArrowUp className="w-5 h-5 text-[#FFF0F5] group-hover:-translate-y-0.5 transition-transform duration-200" />
      <span className="sr-only">Scroll to top</span>
    </button>
  );
};
