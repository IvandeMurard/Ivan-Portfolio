// src/components/Navigation.tsx
import React, { type FC, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Keyboard } from "lucide-react";
import { motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { HighContrastToggle } from "./HighContrastToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { designTokens } from "@/design-tokens";
import { SkipLinks } from "./SkipLinks";
import { Button } from "./ui/button";

const COLORS = {
  bg: designTokens.color.bg.base,
  border: designTokens.color.border.default,
  ink: designTokens.color.ink.strong,
  inkMuted: designTokens.color.ink.muted,
  accent: designTokens.color.accent.primary,
  onAccent: designTokens.color.accent.on,
};

// Enhanced nav link style with better hover/active states and WCAG AA compliant focus
const navLinkBase =
  "relative inline-flex items-center px-3 h-9 text-sm font-medium rounded-xl " +
  "text-foreground/85 hover:text-foreground " +
  "hover:bg-black/[0.06] dark:hover:bg-white/[0.10] " +
  "active:scale-[0.97] active:bg-black/[0.10] dark:active:bg-white/[0.15] " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background " +
  "transition-all duration-200 ease-out";

// Haptic feedback helper (vibration API)
const triggerHaptic = (pattern: number | number[] = 10) => {
  if (navigator.vibrate) {
    navigator.vibrate(pattern);
  }
};

interface NavigationProps {
  onKeyboardHelpToggle?: () => void;
}

export const Navigation: FC<NavigationProps> = ({ onKeyboardHelpToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();

  const navLabels = {
    en: { home: "Home", work: "Work", about: "About", cv: "CV", contact: "Contact" },
    fr: { home: "Accueil", work: "Travaux", about: "À propos", cv: "CV", contact: "Contact" }
  };
  const labels = navLabels[language];

  // --- Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // --- Scroll state (glass elevation)
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // --- Scroll lock when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // --- Theme (for inline glass colors)
  const isDark = typeof document !== "undefined" && document.documentElement.classList.contains("dark");
  const inkOnContext = isDark ? "#FFFFFF" : COLORS.ink;

  // --- Section observers (Home page only)
  const [heroVisible, setHeroVisible] = useState(location.pathname === "/");
  const [workActive, setWorkActive] = useState(false);
  const [aboutActive, setAboutActive] = useState(false);

  useEffect(() => {
    if (location.pathname !== "/") return;
    const hero = document.getElementById("hero");
    if (!hero) return;
    const io = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting && entry.intersectionRatio >= 0.35),
      { threshold: [0.25, 0.35, 0.5], rootMargin: "-10% 0px -20% 0px" },
    );
    io.observe(hero);
    return () => io.disconnect();
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== "/") return;
    const work = document.getElementById("work");
    if (!work) return;
    const io = new IntersectionObserver(
      ([entry]) => setWorkActive(entry.isIntersecting && entry.intersectionRatio >= 0.6),
      { threshold: [0.4, 0.6, 0.8], rootMargin: "-10% 0px -20% 0px" },
    );
    io.observe(work);
    return () => io.disconnect();
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== "/") return;
    const about = document.getElementById("about");
    if (!about) return;
    const io = new IntersectionObserver(
      ([entry]) => setAboutActive(entry.isIntersecting && entry.intersectionRatio >= 0.4),
      { threshold: [0.3, 0.4, 0.6], rootMargin: "-10% 0px -20% 0px" },
    );
    io.observe(about);
    return () => io.disconnect();
  }, [location.pathname]);

  // --- Typewriter
  const [displayText, setDisplayText] = useState("Ivan de Murard");
  const currentTextRef = useRef(displayText);
  const timeoutRef = useRef<number | null>(null);
  useEffect(() => {
    currentTextRef.current = displayText;
  }, [displayText]);
  useEffect(() => {
    const target = heroVisible ? "I M" : "Ivan de Murard";
    const from = currentTextRef.current;
    if (from === target) return;
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    const steps: string[] = [];
    for (let i = from.length; i >= 0; i--) steps.push(from.slice(0, i));
    for (let i = 1; i <= target.length; i++) steps.push(target.slice(0, i));
    let i = 0;
    const tick = () => {
      setDisplayText(steps[i]);
      i++;
      if (i < steps.length) timeoutRef.current = window.setTimeout(tick, 50);
    };
    tick();
    return () => timeoutRef.current && window.clearTimeout(timeoutRef.current);
  }, [heroVisible]);

  // --- Smooth scroll helper
  const smoothScroll = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const onHome = location.pathname === "/";
    if (onHome) {
      e.preventDefault();
      smoothScroll(id);
    } else {
      e.preventDefault();
      navigate(`/#${id}`);
    }
  };

  // --- Glass tokens
  const BG_TOP = isDark ? "rgba(17,24,39,0.55)" : "rgba(255,255,255,0.66)";
  const BG_SCROLL = isDark ? "rgba(17,24,39,0.72)" : "rgba(255,255,255,0.78)";
  const BORDER = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)";
  const SHADOW = isScrolled ? "0 6px 20px rgba(0,0,0,0.08)" : "none";

  // Contact CTA click handler with haptic
  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    triggerHaptic([15, 30, 15]); // Short pulse pattern
    handleAnchorClick(e, "contact");
  };

  return (
    <>
      {/* Enhanced skip links with navigation to all main sections */}
      <SkipLinks />

      <nav
        role="navigation"
        aria-label={language === 'en' ? 'Main navigation' : 'Navigation principale'}
        className="fixed top-0 w-full z-50 transition-[box-shadow,background] duration-300"
        style={{
          backdropFilter: "saturate(1.2) blur(12px)",
          WebkitBackdropFilter: "saturate(1.2) blur(12px)",
          background: isScrolled ? BG_SCROLL : BG_TOP,
          borderBottom: `1px solid ${BORDER}`,
          boxShadow: SHADOW,
          transitionTimingFunction: designTokens.motion.easing.product,
        }}
      >
        {/* Aligned with content: max-w-7xl matches Home page sections */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Brand - aligned with content */}
            <Link
              to="/#hero"
              onClick={(e) => handleAnchorClick(e, "hero")}
              className="text-[16px] font-[600] tracking-tight w-[160px] text-left whitespace-nowrap hover:opacity-80 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md transition-all duration-200"
              style={{ color: inkOnContext }}
              aria-label={language === 'en' ? 'Ivan de Murard - Go to homepage' : 'Ivan de Murard - Aller à l\'accueil'}
            >
              {displayText}
            </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-lg text-foreground/80 hover:text-foreground hover:bg-black/[0.08] dark:hover:bg-white/[0.12] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-all"
            aria-label={language === 'en' ? 'Open navigation menu' : 'Ouvrir le menu de navigation'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <Menu size={20} aria-hidden="true" />
          </button>

          {/* Right side: Links + Lang/Theme */}
          <div className="flex items-center gap-3">
            {/* Links */}
            <div className="hidden md:flex items-center gap-1">
              {/* HOME */}
              <Link
                to="/#hero"
                onClick={(e) => handleAnchorClick(e, "hero")}
                className={navLinkBase}
                aria-current={heroVisible ? "page" : undefined}
                style={{ color: heroVisible ? inkOnContext : undefined, fontWeight: heroVisible ? 600 : undefined }}
              >
                {labels.home}
                {/* Animated underline */}
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute left-3 right-3 -bottom-[6px] h-[2px] rounded-full bg-foreground/80"
                  initial={false}
                  animate={{ 
                    scaleX: heroVisible ? 1 : 0,
                    opacity: heroVisible ? 1 : 0 
                  }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  style={{ originX: 0.5 }}
                />
              </Link>

              {/* WORK */}
              <Link
                to="/#work"
                onClick={(e) => handleAnchorClick(e, "work")}
                className={navLinkBase}
                aria-current={workActive ? "page" : undefined}
                style={{ color: workActive ? inkOnContext : undefined, fontWeight: workActive ? 600 : undefined }}
              >
                {labels.work}
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute left-3 right-3 -bottom-[6px] h-[2px] rounded-full bg-foreground/80"
                  initial={false}
                  animate={{ 
                    scaleX: workActive ? 1 : 0,
                    opacity: workActive ? 1 : 0 
                  }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  style={{ originX: 0.5 }}
                />
              </Link>

              {/* ABOUT (NEW) */}
              <Link
                to="/#about"
                onClick={(e) => handleAnchorClick(e, "about")}
                className={navLinkBase}
                aria-current={aboutActive ? "page" : undefined}
                style={{ color: aboutActive ? inkOnContext : undefined, fontWeight: aboutActive ? 600 : undefined }}
              >
                {labels.about}
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute left-3 right-3 -bottom-[6px] h-[2px] rounded-full bg-foreground/80"
                  initial={false}
                  animate={{ 
                    scaleX: aboutActive ? 1 : 0,
                    opacity: aboutActive ? 1 : 0 
                  }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  style={{ originX: 0.5 }}
                />
              </Link>

              {/* CV */}
              <Link
                to="/cv"
                className={navLinkBase}
                aria-current={location.pathname === "/cv" ? "page" : undefined}
                style={{ color: location.pathname === "/cv" ? inkOnContext : undefined, fontWeight: location.pathname === "/cv" ? 600 : undefined }}
              >
                {labels.cv}
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute left-3 right-3 -bottom-[6px] h-[2px] rounded-full bg-foreground/80"
                  initial={false}
                  animate={{ 
                    scaleX: location.pathname === "/cv" ? 1 : 0,
                    opacity: location.pathname === "/cv" ? 1 : 0 
                  }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  style={{ originX: 0.5 }}
                />
              </Link>

              {/* CONTACT CTA - Inverted style on hover with haptic */}
              <Link
                to="/#contact"
                onClick={handleContactClick}
                className="group relative inline-flex items-center h-9 px-4 text-sm font-semibold rounded-xl border-2 border-transparent bg-contact text-contact-foreground transition-all duration-200 hover:!bg-white hover:!text-contact hover:!border-contact focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label={language === 'en' ? 'Go to contact section' : 'Aller à la section contact'}
              >
                {/* Scale on hover */}
                <span className="relative z-10 group-hover:scale-[1.02] group-active:scale-[0.96] transition-transform duration-150">
                  {labels.contact}
                </span>
              </Link>
            </div>

            {/* Lang / Theme */}
            <div className="flex items-center gap-3">
              <div 
                className="hidden sm:flex items-center gap-1 text-sm"
                role="group"
                aria-label={language === 'en' ? 'Language selection' : 'Sélection de la langue'}
              >
                <button
                  className={`h-8 px-2.5 rounded-lg font-medium transition-all duration-200 ${
                    language === 'en' 
                      ? 'text-foreground bg-black/[0.08] dark:bg-white/[0.12] font-semibold' 
                      : 'text-foreground/75 hover:text-foreground hover:bg-black/[0.04] dark:hover:bg-white/[0.06]'
                  } active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background`}
                  onClick={() => setLanguage('en')}
                  aria-label={language === 'en' ? 'English (current language)' : 'Switch to English'}
                  aria-pressed={language === 'en'}
                >
                  EN
                </button>
                <span className="opacity-40 text-xs" style={{ color: inkOnContext }} aria-hidden="true">
                  |
                </span>
                <button
                  className={`h-8 px-2.5 rounded-lg font-medium transition-all duration-200 ${
                    language === 'fr' 
                      ? 'text-foreground bg-black/[0.08] dark:bg-white/[0.12] font-semibold' 
                      : 'text-foreground/75 hover:text-foreground hover:bg-black/[0.04] dark:hover:bg-white/[0.06]'
                  } active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background`}
                  onClick={() => setLanguage('fr')}
                  aria-label={language === 'fr' ? 'Français (langue actuelle)' : 'Passer en français'}
                  aria-pressed={language === 'fr'}
                >
                  FR
                </button>
              </div>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <HighContrastToggle />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onKeyboardHelpToggle}
                  className="h-9 w-9 rounded-lg"
                  aria-label={language === 'en' ? 'Show keyboard shortcuts' : 'Afficher les raccourcis clavier'}
                  title={language === 'en' ? 'Keyboard shortcuts (?)' : 'Raccourcis clavier (?)'}
                >
                  <Keyboard className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] md:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={language === 'en' ? 'Mobile navigation menu' : 'Menu de navigation mobile'}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-[280px] bg-background/98 backdrop-blur-xl border-l border-border z-[70] shadow-2xl md:hidden"
          >
            <div className="flex flex-col h-full p-6">
              {/* Close Button */}
              <div className="flex justify-end mb-8">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center justify-center h-10 w-10 rounded-lg text-foreground/80 hover:text-foreground hover:bg-black/[0.08] dark:hover:bg-white/[0.12] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-all"
                  aria-label={language === 'en' ? 'Close navigation menu' : 'Fermer le menu de navigation'}
                >
                  <X size={24} aria-hidden="true" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav 
                className="flex flex-col gap-2 mb-8"
                aria-label={language === 'en' ? 'Mobile navigation' : 'Navigation mobile'}
              >
                <Link
                  to="/#hero"
                  onClick={(e) => {
                    handleAnchorClick(e, "hero");
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center h-12 px-4 text-base font-medium rounded-xl text-foreground/80 hover:text-foreground hover:bg-black/[0.08] dark:hover:bg-white/[0.12] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-all"
                >
                  {labels.home}
                </Link>

                <Link
                  to="/#work"
                  onClick={(e) => {
                    handleAnchorClick(e, "work");
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center h-12 px-4 text-base font-medium rounded-xl text-foreground/80 hover:text-foreground hover:bg-black/[0.08] dark:hover:bg-white/[0.12] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-all"
                >
                  {labels.work}
                </Link>

                {/* ABOUT (NEW - Mobile) */}
                <Link
                  to="/#about"
                  onClick={(e) => {
                    handleAnchorClick(e, "about");
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center h-12 px-4 text-base font-medium rounded-xl text-foreground/80 hover:text-foreground hover:bg-black/[0.08] dark:hover:bg-white/[0.12] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-all"
                >
                  {labels.about}
                </Link>

                {/* CV - Mobile */}
                <Link
                  to="/cv"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center h-12 px-4 text-base font-medium rounded-xl text-foreground/80 hover:text-foreground hover:bg-black/[0.08] dark:hover:bg-white/[0.12] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-all"
                >
                  {labels.cv}
                </Link>

                <Link
                  to="/#contact"
                  onClick={(e) => {
                    triggerHaptic([15, 30, 15]);
                    handleAnchorClick(e, "contact");
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center h-12 px-4 text-base font-semibold rounded-xl transition-all active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  style={{
                    background: COLORS.accent,
                    color: COLORS.onAccent,
                  }}
                  aria-label={language === 'en' ? 'Go to contact section' : 'Aller à la section contact'}
                >
                  {labels.contact}
                </Link>
              </nav>

              {/* Language Selector & Accessibility */}
              <div className="mt-auto pt-6 border-t border-border space-y-4">
                {/* Accessibility toggles */}
                <div className="flex items-center justify-center gap-3">
                  <ThemeToggle />
                  <HighContrastToggle />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      onKeyboardHelpToggle?.();
                      setMobileMenuOpen(false);
                    }}
                    className="h-9 w-9 rounded-lg"
                    aria-label={language === 'en' ? 'Show keyboard shortcuts' : 'Afficher les raccourcis clavier'}
                  >
                    <Keyboard className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
                
                {/* Language selection */}
                <div 
                  className="flex items-center justify-center gap-3"
                  role="group"
                  aria-label={language === 'en' ? 'Language selection' : 'Sélection de la langue'}
                >
                  <button
                    className={`h-10 px-4 rounded-lg font-medium transition-all ${
                      language === 'en' 
                        ? 'text-foreground bg-black/[0.08] dark:bg-white/[0.12] font-bold' 
                        : 'text-foreground/85 hover:text-foreground hover:bg-black/[0.04] dark:hover:bg-white/[0.08]'
                    } active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background`}
                    onClick={() => setLanguage('en')}
                    aria-label={language === 'en' ? 'English (current language)' : 'Switch to English'}
                    aria-pressed={language === 'en'}
                  >
                    EN
                  </button>
                  <span className="text-foreground/65" aria-hidden="true">|</span>
                  <button
                    className={`h-10 px-4 rounded-lg font-medium transition-all ${
                      language === 'fr' 
                        ? 'text-foreground bg-black/[0.08] dark:bg-white/[0.12] font-bold' 
                        : 'text-foreground/85 hover:text-foreground hover:bg-black/[0.04] dark:hover:bg-white/[0.08]'
                    } active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background`}
                    onClick={() => setLanguage('fr')}
                    aria-label={language === 'fr' ? 'Français (langue actuelle)' : 'Passer en français'}
                    aria-pressed={language === 'fr'}
                  >
                    FR
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </nav>
    </>
  );
};
