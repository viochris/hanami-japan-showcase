import React, { useState, useEffect } from "react";
import { PaperLantern } from "@/src/components/decoration/PaperLantern";
import { PageId } from "./Header";
import {
  Mail,
  Phone,
  Clock,
  MapPin,
  ArrowRight,
  Copy,
  Check,
  Compass,
  Sparkles,
  ExternalLink
} from "lucide-react";

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(false);
  const [currentJstTime, setCurrentJstTime] = useState("");

  // Calculate live Japan Standard Time (JST = UTC+9) status
  useEffect(() => {
    const checkJstStatus = () => {
      const now = new Date();
      // JST is UTC + 9 hours
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const jst = new Date(utc + 3600000 * 9);

      const day = jst.getDay(); // 0 is Sunday, 6 is Saturday
      const hour = jst.getHours();
      const minute = jst.getMinutes();

      const timeString = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")} JST`;
      setCurrentJstTime(timeString);

      // Open Mon-Fri 09:00 - 17:00, Sat 10:00 - 14:00
      let open = false;
      if (day >= 1 && day <= 5) {
        if (hour >= 9 && hour < 17) open = true;
      } else if (day === 6) {
        if (hour >= 10 && hour < 14) open = true;
      }
      setIsOpenNow(open);
    };

    checkJstStatus();
    const interval = setInterval(checkJstStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("curator@hanami.travel");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <footer className="relative mt-20 theme-header-bg text-[var(--sf)] border-t border-white/10 transition-colors duration-500">
      {/* Decorative Seigaiha wave pattern SVG border above footer */}
      <div className="w-full h-7 overflow-hidden text-[var(--p3)] border-b border-[#D4AF6A]/30 transition-colors duration-500">
        <svg
          className="w-full h-full block"
          aria-hidden="true"
          preserveAspectRatio="repeat"
        >
          <defs>
            <pattern
              id="footer-sei"
              width="40"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <g fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6">
                <g id="sg-arc">
                  <circle r="16" />
                  <circle r="11" />
                  <circle r="6" />
                </g>
                <use href="#sg-arc" x="40" />
                <use href="#sg-arc" x="20" y="-10" />
                <use href="#sg-arc" y="20" />
                <use href="#sg-arc" x="40" y="20" />
                <use href="#sg-arc" x="20" y="10" />
                <use href="#sg-arc" y="-20" x="0" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-sei)" />
        </svg>
      </div>

      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
        {/* Main Footer Grid: 4 balanced columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-[#D4AF6A]/25">
          {/* Column 1: Brand & Philosophy (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="space-y-1">
              <h4 className="font-serif text-2xl sm:text-3xl font-bold tracking-wide text-white flex items-center gap-2">
                <span>Hanami</span>
                <span className="text-[#D4AF6A] font-serif text-xl font-normal">
                  花見
                </span>
              </h4>
              <p className="text-xs font-serif text-[var(--gold)] tracking-widest uppercase">
                Kyoto & Tokyo Cultural Journal
              </p>
            </div>

            <p className="text-xs sm:text-sm text-[#F3E6EE]/85 leading-relaxed">
              An independent cultural journal documenting sixteen sanctuaries in Japan with honesty, mindfulness, and practical respect for local communities.
            </p>

            <div className="pt-2">
              <button
                onClick={() => onNavigate("plan-trip")}
                className="px-4 py-2 rounded-full theme-cta-btn text-white text-xs font-bold transition-all shadow-sm hover:scale-102 cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>Consult Our Curators</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <span className="border border-[#D4AF6A]/50 rounded-full px-3 py-0.5 text-[11px] text-[#FFF0F5]/80">
                Instagram: @hanami.journal
              </span>
              <span className="border border-[#D4AF6A]/50 rounded-full px-3 py-0.5 text-[11px] text-[#FFF0F5]/80">
                Kyoto Heritage Guild
              </span>
            </div>
          </div>

          {/* Column 2: Meticulous Contact (Email & Phone) (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-sm font-bold uppercase tracking-widest text-[#D4AF6A] flex items-center gap-2">
              <PaperLantern size={16} />
              <span>Direct Inquiries</span>
            </h4>

            {/* Email Card */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 space-y-1.5 hover:bg-white/10 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase text-[var(--gold)] flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" />
                  <span>Curator Email</span>
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="text-[10px] text-white/80 hover:text-white flex items-center gap-1 cursor-pointer bg-white/10 px-2 py-0.5 rounded"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                  <span>{copiedEmail ? "Copied" : "Copy"}</span>
                </button>
              </div>
              <a
                href="mailto:curator@hanami.travel"
                className="text-xs sm:text-sm font-semibold text-white hover:text-[var(--gold)] transition-colors block truncate"
              >
                curator@hanami.travel
              </a>
              <span className="text-[10px] text-white/60 block">
                Replies within 24–48 hours
              </span>
            </div>

            {/* Phone Card */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 space-y-1.5 hover:bg-white/10 transition-colors">
              <span className="text-[11px] font-bold uppercase text-[var(--gold)] flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" />
                <span>Tokyo & Kyoto Line</span>
              </span>
              <a
                href="tel:+81300000000"
                className="text-xs sm:text-sm font-semibold text-white hover:text-[var(--gold)] transition-colors block"
              >
                +81 (0)3 0000 0000
              </a>
              <span className="text-[10px] text-white/60 block">
                International inquiries (GMT+9)
              </span>
            </div>
          </div>

          {/* Column 3: Studios & Live Opening Hours (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-sm font-bold uppercase tracking-widest text-[#D4AF6A] flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Studio & Hours</span>
            </h4>

            {/* Live Status indicator */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isOpenNow
                        ? "bg-emerald-400 animate-pulse"
                        : "bg-amber-400"
                    }`}
                  />
                  <span className="text-[11px] font-bold text-white">
                    {isOpenNow ? "Desk Open Now" : "Desk Closed"}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-white/70">
                  {currentJstTime}
                </span>
              </div>

              {/* Opening Hours Schedule */}
              <div className="space-y-1 text-xs text-[#F3E6EE]/80 pt-1 border-t border-white/10">
                <div className="flex justify-between">
                  <span>Mon – Fri:</span>
                  <span className="font-medium text-white">09:00 – 17:00 JST</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span className="font-medium text-white">10:00 – 14:00 JST</span>
                </div>
                <div className="flex justify-between text-white/60 text-[11px]">
                  <span>Sunday & Holidays:</span>
                  <span>Field Research</span>
                </div>
              </div>
            </div>

            {/* Studio location */}
            <div className="text-xs text-white/80 space-y-1">
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[var(--gold)] shrink-0 mt-0.5" />
                <span>
                  <strong>Tokyo Studio:</strong> Asakusa, Taito City, Tokyo
                </span>
              </div>
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[var(--gold)] shrink-0 mt-0.5" />
                <span>
                  <strong>Kyoto Bureau:</strong> Higashiyama-ku, Kyoto
                </span>
              </div>
            </div>
          </div>

          {/* Column 4: Quick Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-widest text-[#D4AF6A]">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#F3E6EE]/85">
              <li>
                <button
                  onClick={() => onNavigate("home")}
                  className="hover:text-[#D4AF6A] transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("destinations")}
                  className="hover:text-[#D4AF6A] transition-colors cursor-pointer"
                >
                  Destinations
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("our-story")}
                  className="hover:text-[#D4AF6A] transition-colors cursor-pointer"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("packages")}
                  className="hover:text-[#D4AF6A] transition-colors cursor-pointer"
                >
                  Travel Packages
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("plan-trip")}
                  className="hover:text-[#D4AF6A] transition-colors cursor-pointer"
                >
                  Plan a Trip
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("travel-tips")}
                  className="hover:text-[#D4AF6A] transition-colors cursor-pointer"
                >
                  Travel Tips
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("faq")}
                  className="hover:text-[#D4AF6A] transition-colors cursor-pointer"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Disclaimer */}
        <div className="pt-8 text-xs text-[#C9B9CC] space-y-2 leading-relaxed">
          <p className="max-w-4xl">
            Hanami is a fictional concept brand created for a portfolio project. The curator team, testimonials, email addresses, phone numbers, and sample packages are entirely fictional and created solely for demonstration purposes. If any listed contact detail happens to belong to a real individual or organization, we sincerely apologize for the coincidence, and please notify us by opening an issue on GitHub so we can update it promptly. Destination details and prices are illustrative, so please verify official operating hours and travel costs directly with local venues before traveling.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2 border-t border-white/10 text-[11px] text-[#C9B9CC]/80">
            <span>© 2026 Hanami Journal (花見). Portfolio concept project.</span>
            <span>Photography credited via Wikimedia Commons and Creative Commons licenses.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
