import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Navigation } from "../components/Navigation";
import { Footer } from "@/components/footer";
import { SectionHeader } from "../components/SectionHeader";
import { FilterChips } from "../components/FilterChips";
import { CardImmersive } from "../components/CardImmersive";
import { MediaCard } from "../components/work/MediaCard";
import { CarouselRow } from "../components/CarouselRow";
import { WorkModal } from "../components/WorkModal";
import { CTABanner } from "../components/work/CTABanner";
import { BuiltWithBanner } from "../components/BuiltWithBanner";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { Mail, Linkedin, Calendar, ArrowDown, ChevronDown, ArrowRight, Check } from "lucide-react";
import { sonorCase } from "../data/cases/sonor.case";
import MarqueeBanner from "@/components/MarqueeBanner";
import { GradientBorderSection } from "@/components/GradientBorderSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { useInlineExpand } from "@/hooks/useInlineExpand";
import { InlineExpand } from "@/components/InlineExpand";
import { SOCIAL_LINKS } from "@/site.config";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { TextRevealLines } from "@/components/TextReveal";
import { useLanguage } from "@/contexts/LanguageContext";
import { homeContent } from "@/data/homeContent";
import { projects as bilingualProjects } from "@/data/projects";
import { hackathons as bilingualHackathons } from "@/data/hackathons";
import { continuousLearning as bilingualContinuousLearning } from "@/data/continuousLearning";
import { education as bilingualEducation } from "@/data/education";
import { experiences as bilingualExperiences } from "@/data/experience";
import ContactForm from "@/components/ContactForm";

// Calculate filter chips dynamically based on visible projects (excluding hidden)
const getFilterChips = (projects: typeof bilingualProjects, language: 'en' | 'fr') => {
  const visibleProjects = projects.filter((p) => !p.hidden);

  const allCount = visibleProjects.length;
  const agenticExperiencesCount = visibleProjects.filter(
    (p) => {
      const tags = language === 'en' ? p.tags_en : p.tags_fr;
      return p.category === "agentic-experiences" || tags?.some((tag) => tag.toLowerCase() === "agentic experiences");
    }
  ).length;
  const experienceCount = visibleProjects.filter((p) => p.category === "experience").length;
  const productCount = visibleProjects.filter((p) => p.category === "product").length;
  const automatisationsCount = visibleProjects.filter(
    (p) => {
      const tags = language === 'en' ? p.tags_en : p.tags_fr;
      return p.category === "automatisations" || tags?.some((tag) => tag.toLowerCase() === "automatisations");
    }
  ).length;

  const chips = [
    { id: "all", label: language === 'fr' ? `Tous (${allCount})` : `All (${allCount})` },
    { id: "agentic-experiences", label: language === 'fr' ? `Expériences Agentiques (${agenticExperiencesCount})` : `Agentic Experiences (${agenticExperiencesCount})` },
    { id: "experience", label: language === 'fr' ? `Expérience (${experienceCount})` : `Experience (${experienceCount})` },
    { id: "product", label: language === 'fr' ? `Produit (${productCount})` : `Product (${productCount})` },
  ];

  // Only include automatisations if there are projects with this tag/category
  if (automatisationsCount > 0) {
    chips.push({ id: "automatisations", label: `Automatisations (${automatisationsCount})` });
  }

  return chips;
};

const getExperienceFilterChips = (language: 'en' | 'fr') => [
  { id: "experiences", label: language === 'fr' ? "Expériences" : "Experiences" },
  { id: "continuous-learning", label: "Continuous Learning" },
  { id: "education", label: language === 'fr' ? "Éducation" : "Education" },
];


// RippleButton component with ripple effect
interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  prefersReducedMotion: boolean;
  children: React.ReactNode;
}

const RippleButton: React.FC<RippleButtonProps> = ({
  onClick,
  className,
  children,
  prefersReducedMotion,
  ...props
}) => {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (prefersReducedMotion) {
      onClick?.(e);
      return;
    }

    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = {
      x,
      y,
      id: Date.now(),
    };

    setRipples((prev) => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 600);

    onClick?.(e);
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className={className}
      style={{
        willChange: "transform",
        transform: "translateZ(0)", // GPU acceleration
      }}
      {...props}
    >
      {children}
      {!prefersReducedMotion &&
        ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute rounded-full bg-white/30 pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 0,
              height: 0,
              transform: "translate(-50%, -50%)",
              animation: "ripple 600ms ease-out",
            }}
          />
        ))}
    </button>
  );
};

export const Home: React.FC<{ onKeyboardHelpToggle?: () => void }> = ({ onKeyboardHelpToggle }) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeExperienceFilter, setActiveExperienceFilter] = useState("experiences");
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStickyDisabled, setIsStickyDisabled] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const expExpand = useInlineExpand();
  const contactSectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Get translated content
  const content = homeContent[language];
  
  // Use bilingual data
  const projects = bilingualProjects;
  const hackathons = bilingualHackathons;
  const continuousLearning = bilingualContinuousLearning;
  const education = bilingualEducation;
  const experiences = bilingualExperiences;

  // Calculate filter chips dynamically
  const filterChips = getFilterChips(projects, language);

  // Experience filter chips with translations
  const experienceFilterChips = [
    { id: "experiences", label: content.experience.filterChips.experiences },
    { id: "continuous-learning", label: content.experience.filterChips.continuousLearning },
    { id: "education", label: content.experience.filterChips.education },
  ];

  // Intersection Observer pour désactiver le sticky avant la section Contact
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-80px 0px 0px 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        setIsStickyDisabled(entry.isIntersecting);
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (contactSectionRef.current) {
      observer.observe(contactSectionRef.current);
    }

    return () => {
      if (contactSectionRef.current) {
        observer.unobserve(contactSectionRef.current);
      }
    };
  }, []);

  // Filtrer les projets masqués (hidden: true) puis appliquer le filtre de catégorie
  const visibleProjects = projects.filter((p) => !p.hidden);

  const filteredProjects =
    activeFilter === "all"
      ? visibleProjects
      : visibleProjects.filter(
          (project) => {
            const tags = language === 'en' ? project.tags_en : project.tags_fr;
            return project.category === activeFilter ||
              tags?.some((tag) => tag.toLowerCase() === activeFilter.toLowerCase());
          }
        );

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      // Gestion du focus pour l'accessibilité
      element.setAttribute('tabindex', '-1');
      element.focus({ preventScroll: true });
    }
  };

  const openModal = (index: number) => {
    setSelectedProjectIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const navigateToProject = (direction: "prev" | "next") => {
    if (selectedProjectIndex === null) return;

    if (direction === "prev" && selectedProjectIndex > 0) {
      setSelectedProjectIndex(selectedProjectIndex - 1);
    } else if (direction === "next" && selectedProjectIndex < filteredProjects.length - 1) {
      setSelectedProjectIndex(selectedProjectIndex + 1);
    }
  };

  const selectedProject = selectedProjectIndex !== null ? filteredProjects[selectedProjectIndex] : null;

  return (
    <div className="min-h-screen bg-background overflow-x-hidden" id="main-content">
      <Navigation onKeyboardHelpToggle={onKeyboardHelpToggle} />
      <ScrollProgressBar />

      <ProgressIndicator
        sections={[
          { id: "hero", label: "Welcome" },
          { id: "work", label: "Work" },
          { id: "hackathons", label: "Hackathons" },
          { id: "experience", label: "Experience" },
          { id: "about", label: "About" },
          { id: "contact", label: "Contact" },
        ]}
      />

      {/* Hero Section */}
      <section id="hero" className="px-4 py-12 md:py-16 relative overflow-visible bg-contact text-contact-foreground">
        {/* Container principal */}
        <div className="mx-auto max-w-[1400px] w-full relative" style={{ padding: "clamp(24px, 4vw, 80px)" }}>
          {/* Version Desktop */}
          <div className="hidden md:block">
            {/* Contenu texte - max-width pour lisibilité */}
            <div className="max-w-4xl">
              {/* Nom + Titre avec effet d'éclaircissement progressif */}
              {prefersReducedMotion ? (
                <>
                  <h1
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-[900] tracking-tight text-white leading-[0.9]"
                    style={{ fontFamily: "Inter" }}
                  >
                    {content.hero.name}
                  </h1>
                  <p
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif italic text-white mt-2 md:mt-3"
                    style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500 }}
                  >
                    {content.hero.title}
                  </p>
                </>
              ) : (
                <TextRevealLines
                  lines={[
                    {
                      text: content.hero.name,
                      as: "h1",
                      className:
                        "text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-[900] tracking-tight text-white leading-[0.9]",
                      style: { fontFamily: "Inter" },
                    },
                    {
                      text: content.hero.title,
                      as: "p",
                      className:
                        "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif italic text-white mt-2 md:mt-3",
                      style: { fontFamily: "'Playfair Display', serif", fontWeight: 500 },
                    },
                  ]}
                  delay={0.1}
                  lineStagger={0.3}
                  duration={1.4}
                />
              )}

              {/* Sous-titre - taille réduite pour meilleure hiérarchie */}
              <motion.p
                className="text-base sm:text-lg md:text-xl text-white/85 mt-6 md:mt-8 leading-relaxed max-w-2xl"
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: prefersReducedMotion ? 0 : 0.6,
                  duration: prefersReducedMotion ? 0 : 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {content.hero.subtitle}
              </motion.p>

              {/* Proof Points */}
              <motion.div
                className="mt-6 md:mt-8 space-y-3 md:space-y-4"
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: prefersReducedMotion ? 0 : 0.24,
                  duration: prefersReducedMotion ? 0 : 0.28,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {content.hero.proofPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm sm:text-base text-white/80">
                    <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "rgba(255,255,255,0.8)" }} />
                    <span>{point}</span>
                  </div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-wrap items-center gap-4 mt-6 md:mt-8"
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: prefersReducedMotion ? 0 : 0.3,
                  duration: prefersReducedMotion ? 0 : 0.28,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* Bouton primaire */}
                <Button
                  variant="outline"
                  size="lg"
                  className="group bg-background text-foreground border-transparent hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                  onClick={() => scrollToSection("work")}
                >
                  {content.hero.ctas.viewWork}
                  <ArrowDown className="ml-2 h-4 w-4 group-hover:animate-bounce" />
                </Button>

                {/* CTA secondaire - texte blanc avec flèche animée */}
                <motion.button
                  onClick={() => scrollToSection("contact")}
                  className="inline-flex items-center gap-2 text-base sm:text-lg font-medium text-white/90 hover:text-white transition-colors duration-300 group"
                  whileHover={prefersReducedMotion ? {} : { x: 2 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  style={{ color: "rgba(255, 255, 255, 0.9)" }}
                >
                  {content.hero.ctas.contact}
                  <motion.div
                    animate={prefersReducedMotion ? {} : { x: [0, 4, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatDelay: 0.5,
                    }}
                    className="inline-flex"
                  >
                    <ArrowRight
                      className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300"
                      style={{ willChange: "transform", transform: "translateZ(0)" }}
                    />
                  </motion.div>
                </motion.button>
              </motion.div>
            </div>
          </div>

          {/* Version Mobile */}
          <div className="md:hidden">
            {/* Contenu centré */}
            <div className="text-center max-w-4xl mx-auto">
              {/* Nom + Titre avec effet d'éclaircissement progressif */}
              {prefersReducedMotion ? (
                <>
                  <h1
                    className="text-4xl sm:text-5xl font-[900] text-white tracking-tight leading-[0.9]"
                    style={{ fontFamily: "Inter" }}
                  >
                    {content.hero.name}
                  </h1>
                  <p
                    className="text-xl sm:text-2xl font-serif italic text-white mt-2"
                    style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500 }}
                  >
                    {content.hero.title}
                  </p>
                </>
              ) : (
                <TextRevealLines
                  lines={[
                    {
                      text: content.hero.name,
                      as: "h1",
                      className: "text-4xl sm:text-5xl font-[900] text-white tracking-tight leading-[0.9]",
                      style: { fontFamily: "Inter" },
                    },
                    {
                      text: content.hero.title,
                      as: "p",
                      className: "text-xl sm:text-2xl font-serif italic text-white mt-2",
                      style: { fontFamily: "'Playfair Display', serif", fontWeight: 500 },
                    },
                  ]}
                  delay={0.1}
                  lineStagger={0.3}
                  duration={1.4}
                />
              )}

              {/* Sous-titre - taille réduite pour meilleure hiérarchie */}
              <motion.p
                className="text-sm sm:text-base text-white/85 mt-5 leading-relaxed px-2"
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: prefersReducedMotion ? 0 : 0.6,
                  duration: prefersReducedMotion ? 0 : 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {content.hero.subtitle}
              </motion.p>

              {/* Proof Points */}
              <motion.div
                className="mt-6 space-y-3"
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: prefersReducedMotion ? 0 : 0.24,
                  duration: prefersReducedMotion ? 0 : 0.28,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {content.hero.proofPoints.map((point, index) => (
                  <div key={index} className="flex items-start justify-center gap-2 text-sm text-white/80">
                    <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "rgba(255,255,255,0.8)" }} />
                    <span className="text-left">{point}</span>
                  </div>
                ))}
              </motion.div>

              {/* CTA Buttons en colonne */}
              <motion.div
                className="flex flex-col gap-3 items-center mt-6"
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: prefersReducedMotion ? 0 : 0.3,
                  duration: prefersReducedMotion ? 0 : 0.28,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* Bouton primaire */}
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full group bg-background text-foreground border-transparent hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                  onClick={() => scrollToSection("work")}
                >
                  {content.hero.ctas.viewWork}
                  <ArrowDown className="ml-2 h-4 w-4 group-hover:animate-bounce" />
                </Button>

                {/* CTA secondaire - texte blanc avec flèche animée */}
                <motion.button
                  onClick={() => scrollToSection("contact")}
                  className="w-full inline-flex items-center justify-center gap-2 text-base font-medium text-white/90 hover:text-white transition-colors duration-300 group"
                  whileHover={prefersReducedMotion ? {} : { x: 2 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  style={{ color: "rgba(255, 255, 255, 0.9)" }}
                >
                  {content.hero.ctas.contact}
                  <motion.div
                    animate={prefersReducedMotion ? {} : { x: [0, 4, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatDelay: 0.5,
                    }}
                    className="inline-flex"
                  >
                    <ArrowRight
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                      style={{ willChange: "transform", transform: "translateZ(0)" }}
                    />
                  </motion.div>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Banner - Transition entre Hero et Work */}
      <div className="relative bg-gradient-to-b from-card/30 via-card/50 to-background dark:from-card/40 dark:via-card/60 dark:to-card border-t border-border/10 border-b border-border/40 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-muted-foreground/25 after:to-transparent">
        <MarqueeBanner
          phrases={content.marquee.items}
          speed={0.65}
          pauseOnHover
          ariaLabel="Highlights"
          className="py-5 max-w-[1360px] mx-auto px-4"
        />
      </div>

      {/* Work Section */}
      <section id="work" className="relative pt-24 md:pt-28 pb-16 md:pb-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal variant="fade-up">
            <SectionHeader title="Work" alignment="left" className="mb-8" />
          </ScrollReveal>

          <FilterChips
            chips={filterChips}
            activeChip={activeFilter}
            onChipChange={setActiveFilter}
            className="mb-12"
            disableSticky={isStickyDisabled}
          />

          {/* Mobile/Tablet: Grid Layout with staggered animations */}
          <StaggerContainer
            className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12 justify-items-center"
            staggerDelay={0.1}
          >
            {filteredProjects.map((project, index) => {
              const originalIndex = projects.findIndex((p) => p.id === project.id);
              const isComingSoon =
                originalIndex >= 4 && project.id !== "agents-eval" && project.id !== "agentic-hospitality";
              const isBuilding = project.id === "agentic-hospitality";

              return (
                <StaggerItem key={project.id} variant="fade-up">
                  {project.id === "sonor" ? (
                    <MediaCard
                      id={project.id}
                      kicker={(language === 'en' ? project.kicker_en : project.kicker_fr) || `Case Study – ${language === 'en' ? project.title_en : project.title_fr}`}
                      title={language === 'en' ? project.subtitle_en : project.subtitle_fr}
                      tagline={(language === 'en' ? project.tagline_en : project.tagline_fr) || (language === 'fr' ? "De l'idée au produit validé" : "From idea to validated product")}
                      badge={(language === 'en' ? project.tags_en[0] : project.tags_fr[0]) || "Project"}
                      image={project.image}
                      onClick={() => openModal(index)}
                      showComingSoon={isComingSoon}
                      showBuilding={isBuilding}
                    />
                  ) : (
                    <CardImmersive
                      id={project.id}
                      kicker={(language === 'en' ? project.kicker_en : project.kicker_fr) || `Case Study – ${language === 'en' ? project.title_en : project.title_fr}`}
                      title={language === 'en' ? project.subtitle_en : project.subtitle_fr}
                      tagline={(language === 'en' ? project.tagline_en : project.tagline_fr) || (language === 'fr' ? "De l'idée au produit validé" : "From idea to validated product")}
                      badge={(language === 'en' ? project.tags_en[0] : project.tags_fr[0]) || "Project"}
                      image={project.image}
                      onClick={() => openModal(index)}
                      showComingSoon={isComingSoon}
                      showBuilding={isBuilding}
                    />
                  )}
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* Desktop: Carousel Layout */}
          <div className="hidden lg:block mb-12">
            <CarouselRow>
              {filteredProjects.map((project, index) => {
                const originalIndex = projects.findIndex((p) => p.id === project.id);
                const isComingSoon =
                  originalIndex >= 4 && project.id !== "agents-eval" && project.id !== "agentic-hospitality";
                const isBuilding = project.id === "agentic-hospitality";

                return project.id === "sonor" ? (
                  <MediaCard
                    key={project.id}
                    id={project.id}
                    kicker={(language === 'en' ? project.kicker_en : project.kicker_fr) || `Case Study – ${language === 'en' ? project.title_en : project.title_fr}`}
                    title={language === 'en' ? project.subtitle_en : project.subtitle_fr}
                    tagline={(language === 'en' ? project.tagline_en : project.tagline_fr) || (language === 'fr' ? "De l'idée au produit validé" : "From idea to validated product")}
                    badge={(language === 'en' ? project.tags_en[0] : project.tags_fr[0]) || "Project"}
                    image={project.image}
                    onClick={() => openModal(index)}
                    showComingSoon={isComingSoon}
                    showBuilding={isBuilding}
                  />
                ) : (
                  <CardImmersive
                    key={project.id}
                    id={project.id}
                    kicker={(language === 'en' ? project.kicker_en : project.kicker_fr) || `Case Study – ${language === 'en' ? project.title_en : project.title_fr}`}
                    title={language === 'en' ? project.subtitle_en : project.subtitle_fr}
                    tagline={(language === 'en' ? project.tagline_en : project.tagline_fr) || (language === 'fr' ? "De l'idée au produit validé" : "From idea to validated product")}
                    badge={(language === 'en' ? project.tags_en[0] : project.tags_fr[0]) || "Project"}
                    image={project.image}
                    onClick={() => openModal(index)}
                    showComingSoon={isComingSoon}
                    showBuilding={isBuilding}
                  />
                );
              })}
            </CarouselRow>
          </div>

          {/* Inter-section teaser */}
          <div className="text-center mt-12 mb-6">
            <p className="text-sm text-muted-foreground">
              💡 <span className="font-medium">Speed thrills you?</span>
            </p>
          </div>

          <div className="flex justify-center">
            <Button
              variant="outline"
              size="lg"
              className="group hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
              onClick={() => scrollToSection("hackathons")}
            >
              See my hackathons experiments
              <ArrowDown className="ml-2 h-4 w-4 group-hover:animate-bounce" />
            </Button>
          </div>
        </div>
      </section>

      {/* Hackathons Section - Left Aligned */}
      <section id="hackathons" className="py-24 px-4 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal variant="fade-up">
            <SectionHeader title="Hackathons" alignment="left" className="mb-12" />
          </ScrollReveal>

          <StaggerContainer className="space-y-8" staggerDelay={0.15}>
            {hackathons.map((hack, index) => (
              <StaggerItem key={index} variant="slide-right">
                <div className="flex gap-8 pb-8 last:pb-0">
                  <div className="w-20 flex-shrink-0">
                    <span className="text-sm font-medium text-muted-foreground">{hack.year}</span>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground">{language === 'en' ? hack.title_en : hack.title_fr}</h3>
                        <p className="text-sm text-accent font-medium">
                          {language === 'en' ? hack.team_en : hack.team_fr} <span className="text-muted-foreground">•</span> {language === 'en' ? hack.status_en : hack.status_fr}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">{language === 'en' ? hack.description_en : hack.description_fr}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Inter-section teaser */}
          <div className="text-center mt-12 mb-6">
            <p className="text-sm text-muted-foreground">
              🚀 <span className="font-medium">Want the full story?</span>
            </p>
          </div>

          <div className="flex justify-center">
            <Button
              variant="outline"
              size="lg"
              className="group hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
              onClick={() => scrollToSection("experience")}
            >
              Discover my journey
              <ArrowDown className="ml-2 h-4 w-4 group-hover:animate-bounce" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CTABanner
        title="Ready to build the future?"
        description="Let's discuss your product vision and build something great together"
        ctaText="Let's talk!"
        onClick={() => scrollToSection("contact")}
      />

      {/* Experience & Education Section - Left Aligned */}
      <section id="experience" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal variant="fade-up">
            <SectionHeader title="Experience & Education" alignment="left" className="mb-8" />
          </ScrollReveal>

          <FilterChips
            chips={experienceFilterChips}
            activeChip={activeExperienceFilter}
            onChipChange={setActiveExperienceFilter}
            className="mb-8"
            disableSticky={isStickyDisabled}
          />

          {/* Contenu selon l'onglet actif */}
          <div className="space-y-6">
            {/* Onglet Experiences — version expand inline */}
            {activeExperienceFilter === "experiences" && (
              <div className="space-y-8">
                {experiences.map((exp, index) => {
                  const id = `exp-${index}`;
                  const isOpen = expExpand.isOpen(id);
                  return (
                    <div key={id} className="flex gap-8 pb-8 last:pb-0">
                      <div className="w-20 flex-shrink-0">
                        <span className="text-sm font-medium text-muted-foreground">{exp.year}</span>
                      </div>
                      <div className="flex-1 space-y-2">
                        <button
                          className="w-full text-left p-3 -m-3 rounded-lg hover:bg-card/50 hover:shadow-sm transition-all duration-300 cursor-pointer"
                          onClick={() => expExpand.toggle(id)}
                          aria-expanded={isOpen}
                          aria-controls={`${id}-panel`}
                        >
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold text-foreground">{exp.title}</h4>
                                <ChevronDown
                                  className={`w-5 h-5 text-muted-foreground transition-transform duration-300 flex-shrink-0 ${
                                    isOpen ? "rotate-180" : ""
                                  }`}
                                />
                              </div>
                              {exp.companyUrl ? (
                                <a
                                  href={exp.companyUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="text-sm text-accent font-medium uppercase tracking-wider hover:underline hover:text-accent/80 transition-colors inline-block"
                                >
                                  {exp.company}
                                </a>
                              ) : (
                                <p className="text-sm text-accent font-medium uppercase tracking-wider">
                                  {exp.company}
                                </p>
                              )}
                              <p className="text-sm text-muted-foreground mt-1">{exp.description}</p>
                            </div>
                          </div>
                        </button>

                        <InlineExpand open={isOpen} ariaId={id}>
                          <div id={`${id}-panel`} className="pt-3 pl-4">
                            {exp.details?.length ? (
                              <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                                {exp.details.map((li, i) => (
                                  <li key={i}>{li}</li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-sm text-muted-foreground/80 italic">More details soon.</p>
                            )}
                          </div>
                        </InlineExpand>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Onglet Continuous Learning */}
            {activeExperienceFilter === "continuous-learning" && (
              <div className="space-y-8">
                {continuousLearning.map((item, index) => (
                  <div key={index} className="flex gap-8 pb-8 last:pb-0">
                    <div className="w-20 flex-shrink-0">
                      <span className="text-sm font-medium text-muted-foreground">{item.year}</span>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-foreground">{language === 'en' ? item.title_en : item.title_fr}</h4>
                          <p className="text-sm text-accent font-medium uppercase tracking-wider">{item.source}</p>
                          <p className="text-sm text-muted-foreground mt-1">{language === 'en' ? item.description_en : item.description_fr}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Onglet Education */}
            {activeExperienceFilter === "education" && (
              <div className="space-y-8">
                {education.map((edu, index) => (
                  <div key={index} className="flex gap-8 pb-8 last:pb-0">
                    <div className="w-20 flex-shrink-0">
                      <span className="text-sm font-medium text-muted-foreground">{edu.year}</span>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-foreground">{language === 'en' ? edu.title_en : edu.title_fr}</h4>
                          <p className="text-sm text-accent font-medium uppercase tracking-wider">{edu.school}</p>
                          <p className="text-sm text-muted-foreground mt-1">{language === 'en' ? edu.description_en : edu.description_fr}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <AboutSection />

      {/* CTA Section after About */}
      <ScrollReveal variant="fade-up" delay={0.2}>
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Inter-section teaser */}
            <div className="text-center mb-6">
              <p className="text-sm text-muted-foreground">
                🔧 <span className="font-medium">Curious about my stack?</span>
              </p>
            </div>

            {/* CTA vers la section Contact */}
            <div className="flex justify-center">
              <Button
                variant="outline"
                size="lg"
                className="group hover:bg-contact hover:text-contact-foreground hover:border-contact transition-all duration-300"
                onClick={() => scrollToSection("contact")}
              >
                Let's connect
                <ArrowDown className="ml-2 h-4 w-4 group-hover:animate-bounce" />
              </Button>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Built With Banner */}
      <BuiltWithBanner />

      {/* Contact Section - Centered */}
      <section
        ref={contactSectionRef}
        id="contact"
        className="py-24 px-4 bg-contact text-contact-foreground section-border-accent"
      >
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <ScrollReveal variant="fade-up">
            <h2 className="text-h2" id="contact-heading">Ready to build?</h2>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.1}>
            <p className="text-lg max-w-2xl mx-auto opacity-90">Let's explore opportunities together.</p>
          </ScrollReveal>

          <ScrollReveal variant="scale" delay={0.2}>
            <div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
              role="group"
              aria-labelledby="contact-heading"
            >
              <Button
                size="lg"
                className="bg-card text-contact dark:text-white hover:bg-background hover:text-foreground hover:scale-105 hover:shadow-xl active:scale-95 transition-all duration-300"
                onClick={() => {
                  const newState = !showContactForm;
                  setShowContactForm(newState);
                  // Focus first form field when opening
                  if (newState) {
                    setTimeout(() => {
                      const firstInput = document.querySelector('#contact form input') as HTMLElement;
                      firstInput?.focus();
                    }, 350);
                  }
                }}
                aria-expanded={showContactForm}
                aria-controls="contact-form-container"
              >
                <Mail className="mr-2 h-5 w-5" aria-hidden="true" />
                {language === 'en' ? 'Email' : 'Email'}
                <span className="sr-only">
                  {showContactForm 
                    ? (language === 'en' ? '(form open)' : '(formulaire ouvert)')
                    : (language === 'en' ? '(click to open form)' : '(cliquer pour ouvrir le formulaire)')}
                </span>
              </Button>
              <Button
                size="lg"
                className="bg-card text-contact dark:text-white hover:bg-background hover:text-[#0077B5] hover:scale-105 hover:shadow-xl active:scale-95 transition-all duration-300 group"
                asChild
              >
                <a 
                  href={SOCIAL_LINKS.linkedin.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={language === 'en' ? 'Connect on LinkedIn (opens in new window)' : 'Se connecter sur LinkedIn (ouvre dans une nouvelle fenêtre)'}
                >
                  <Linkedin className="mr-2 h-5 w-5 transition-colors" aria-hidden="true" />
                  LinkedIn
                </a>
              </Button>
              <Button
                size="lg"
                className="bg-card text-contact dark:text-white hover:bg-background hover:text-foreground hover:scale-105 hover:shadow-xl active:scale-95 transition-all duration-300"
                asChild
              >
                <a 
                  href={SOCIAL_LINKS.calendar.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={language === 'en' ? 'Schedule a meeting (opens in new window)' : 'Planifier une réunion (ouvre dans une nouvelle fenêtre)'}
                >
                  <Calendar className="mr-2 h-5 w-5" aria-hidden="true" />
                  {language === 'en' ? 'Calendar' : 'Calendrier'}
                </a>
              </Button>
            </div>
          </ScrollReveal>

          {/* Contact Form - Appears on Email button click */}
          <AnimatePresence>
            {showContactForm && (
              <motion.div
                id="contact-form-container"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-full max-w-md mx-auto mt-8"
                role="region"
                aria-label={language === 'en' ? 'Contact form' : 'Formulaire de contact'}
              >
                <ContactForm />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action A: Fix Dead End - Back to top CTA */}
          <div className="mt-12 pt-8 border-t border-contact-foreground/20 mb-2">
            <Button
              variant="ghost"
              size="lg"
              className="text-contact-foreground/80 hover:text-contact-foreground hover:bg-contact-foreground/10 transition-all duration-300"
              onClick={() => scrollToSection("hero")}
              aria-label={language === 'en' ? 'Back to top of page' : 'Retour en haut de la page'}
            >
              {language === 'en' ? 'Back to top' : 'Retour en haut'} ↑
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer
        siteName="Ivan de Murard"
        tagline="Product Manager building user-centered experiences"
        sections={[
          { id: "hero", label: "Welcome" },
          { id: "work", label: "Work" },
          { id: "hackathons", label: "Hackathons" },
          { id: "experience", label: "Experience" },
          { id: "about", label: "About" },
          { id: "contact", label: "Contact" },
        ]}
        onSectionClick={(sectionId) => {
          if (sectionId === "hero") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else {
            const element = document.getElementById(sectionId);
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }
        }}
      />

      {/* Work Modal */}
      {selectedProject && (
        <WorkModal
          open={isModalOpen}
          onClose={closeModal}
          onNavigate={navigateToProject}
          canNavigatePrev={selectedProjectIndex !== null && selectedProjectIndex > 0}
          canNavigateNext={selectedProjectIndex !== null && selectedProjectIndex < filteredProjects.length - 1}
          logo={selectedProject.logo}
          title={(language === 'en' ? selectedProject?.modalTitle_en : selectedProject?.modalTitle_fr) || (language === 'en' ? selectedProject?.title_en : selectedProject?.title_fr) || ""}
          subtitle={(language === 'en' ? selectedProject?.modalSubtitle_en : selectedProject?.modalSubtitle_fr) || (language === 'en' ? selectedProject?.longDescription_en : selectedProject?.longDescription_fr) || ""}
          bullets={(language === 'en' ? selectedProject?.bullets_en : selectedProject?.bullets_fr) || []}
          cta={{
            label: (language === 'en' ? selectedProject.ctaLabel_en : selectedProject.ctaLabel_fr) || (language === 'fr' ? "Découvrir l'étude de cas !" : "Discover the case study!"),
            href:
              selectedProject.id === "sonor"
                ? "/case-study/sonor"
                : selectedProject.id === "wttj-conversion-seniors"
                  ? "/cases/wttj"
                  : selectedProject.id === "agents-eval"
                    ? "/case-study/agents-eval"
                    : selectedProject.id === "agentic-hospitality" ||
                        selectedProject.id === "agentic-studio" ||
                        selectedProject.id === "spotify-valence-journeys" ||
                        selectedProject.id === "on-air"
                      ? "/404"
                      : "#",
          }}
          showComingSoon={
            projects.findIndex((p) => p.id === selectedProject.id) >= 4 &&
            selectedProject.id !== "agents-eval" &&
            selectedProject.id !== "agentic-hospitality"
          }
        />
      )}
    </div>
  );
};

export default Home;
