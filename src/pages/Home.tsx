import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
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
import { Mail, Linkedin, Calendar, ArrowDown, ChevronDown } from "lucide-react";
import { sonorCase } from "../data/cases/sonor.case";
import wttjHero from "@/assets/wttj-hero.png";
import wttjLogo from "@/assets/wttj-logo.svg";
import MarqueeBanner from "@/components/MarqueeBanner";
import { GradientBorderSection } from "@/components/GradientBorderSection";
import { CommunitiesInspoResourcesTools } from "@/components/sections/CommunitiesInspoResourcesTools";
import { useInlineExpand } from "@/hooks/useInlineExpand";
import { InlineExpand } from "@/components/InlineExpand";
import { experiences } from "@/data/experience";
import { SOCIAL_LINKS } from "@/site.config";
import { ProgressIndicator } from "@/components/ProgressIndicator";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  tags: string[];
  category: string;
  logo?: string;
  bullets?: string[];
  longDescription?: string;
  kicker?: string;
  tagline?: string;
  modalTitle?: string;
  modalSubtitle?: string;
}

const projects: Project[] = [
  // — SONOR (Open Data) — utilisation des données de sonor.case.ts
  {
    id: sonorCase.id,
    title: "A 2-year entrepreneurship team project",
    subtitle: "How can cities turn open data into quieter streets?",
    image: sonorCase.image,
    logo: sonorCase.logo,
    tags: [sonorCase.badge],
    category: "product",
    longDescription: "Reducing urban noise by transforming open data into actionable city insights.",
    bullets: sonorCase.bullets || [
      "20+ stakeholder interviews across city departments",
      "€20k pre-seed funding secured for the concept",
      "Map + data pipeline prototype to surface hotspots",
    ],
  },
  // — WTTJ (Conversion seniors) —
  {
    id: "wttj-conversion-seniors",
    title: "A growth-oriented product case study",
    subtitle: "How might we increase senior-candidate conversion on WTTJ?",
    image: wttjHero,
    logo: wttjLogo,
    tags: ["Growth", "Product Management"],
    category: "product",
    longDescription: "Improving conversion for senior candidates through clearer offers and guided activation.",
    bullets: [
      "User discovery with senior engineers to surface friction",
      "Strategy pivot towards a clearer, more focused WTTJ Tech+",
      "MVP: standardized job pages + guided onboarding + AI helper",
      "Early signal: CTR 11% → 13% and +300 to +800 activated profiles",
    ],
  },

  // — Agents d'évaluation —
  {
    id: "agents-eval",
    title: "Evaluating AI agents at scale",
    subtitle: "How do we turn trust into an asset?.",
    image: "/img/samuel-arkwright-unsplash.jpg",
    tags: ["Agents", "Evaluation"],
    category: "agents",
    longDescription: "From run lifecycle to clear signals, helping teams ship agents with confidence.",
    bullets: [
      "Structured lifecycle and dashboard",
      'Automatic scoring with LLM-as-a-Judge"',
      "Issues & recommendations captured for fast iteration",
      "Ready to adapt to any domain (UX, quality, robustness)",
    ],
  },

  // — Agentic Hospitality —
  {
    id: "agentic-hospitality",
    title: "An agentic hospitality product case study",
    subtitle: "Can we value agents to predict restaurant and hotel attendance?",
    image: "/img/photo-by-dylan-calluy-unsplash.jpg",
    tags: ["Agentic", "Hackathon"],
    category: "agents",
    kicker: "CASE STUDY – AN AGENTIC HOSPITALITY PRODUCT CASE STUDY",
    tagline: "Building autonomous AI agents for hospitality efficiency",
    modalTitle: "Can we value agents to predict restaurant and hotel attendance?",
    modalSubtitle: "Building autonomous AI agents for hospitality efficiency",
    bullets: [
      "Autonomous agent for hotel F&B operations",
      "Attendance predictability and Staff Management",
      "Built for Pioneers AILab Hackathon @ Station F",
      "Tech Stack: Mistral, Google Cloud, Qdrant, n8n, ElevenLabs",
    ],
    longDescription: "A hackathon project exploring AI agents for predictive hospitality operations.",
  },

  // — The Agentic Studio —
  {
    id: "agentic-studio",
    title: "AN EXPERIMENTAL PRODUCT IN AGENTIC DESIGN",
    subtitle: "How might we bridge human intuition and agent intelligence?",
    image: "/img/gabriella-clare-marino-unsplash.jpg",
    tags: ["Experience", "Agents"],
    category: "experience",
    kicker: "CASE STUDY – AN EXPERIMENTAL PRODUCT IN AGENTIC DESIGN",
    tagline: "A product exploration in Agent Experience (AX)",
    modalTitle: "The Agentic Studio — AX design in practice",
    modalSubtitle:
      "Exploring how intelligent agents can interpret human intention within a creative environment. This prototype tests how gesture, voice, and context can drive co-creation, while keeping human supervision at the core of the experience.",
    longDescription: "A product exploration in Agent Experience (AX)",
    bullets: [
      "The Agentic Studio serves as a scalable testbed for an agentic architecture that can be deployed across creative or operational environments.",
      "Designed a multimodal co-creation flow combining gesture and voice inputs",
      "Built a human-in-the-loop feedback system for supervision and correction",
      "Implemented adaptive guidance based on user habits and style",
      "Documented a framework for Agent Experience (AX) design and evaluation",
    ],
  },

  // — Spotify / Valence —
  {
    id: "spotify-valence-journeys",
    title: "A musical data-driven experience",
    subtitle: "Can we value music mood to nudge better daily choices?",
    image: "/images/projects/spotify-mood/cover.webp", // ajoute un visuel placeholder si besoin
    tags: ["Experience"],
    category: "experience",
    longDescription: "Turning listening signals (valence/arousal) into nudging, helpful suggestions.",
    bullets: [
      "Map mood to actionable suggestions (focus, move, social)",
      "Context-aware flow: time, history, energy",
      "Solo or social modes (local jam / shared moments)",
      "Next: mobile wireframes and qualitative testing",
    ],
  },

  // — On Air —
  {
    id: "on-air",
    title: "Record and auto-transcribe lyrics & melody in real time?",
    subtitle: "What if songwriting felt truly live and collaborative?",
    image: "/images/projects/on-air/cover.webp", // ajoute un visuel placeholder si besoin
    tags: ["Product"],
    category: "product",
    longDescription: "From live rooms to time-coded snippets you can share instantly.",
    bullets: [
      "Live rooms that feel immediate and lightweight",
      "Automatic capture of lyrics and melody/tablature",
      "Time-coded highlights for quick sharing",
      "Roadmap: V1 capture → V2 non-destructive editing → V3 creative packs",
    ],
  },
];

const filterChips = [
  { id: "all", label: "All (6)" },
  { id: "product", label: "Product (3)" }, // Sonor, WTTJ, On Air
  { id: "experience", label: "Expérience (2)" }, // Spotify valence, Agentic Studio
  { id: "agents", label: "Agents (2)" }, // Agents d'évaluation, Agentic Studio
  { id: "automatisations", label: "Automatisations (0)" },
];

const experienceFilterChips = [
  { id: "experiences", label: "Expériences" },
  { id: "continuous-learning", label: "Continuous Learning" },
  { id: "education", label: "Education" },
];

const hackathons = [
  {
    year: "2025",
    title: "Windsurf × Mistral × The AI Collective",
    team: "Team of 4",
    status: "3rd Place",
    description: "Built an idea generator + matcher for hackathons with a video avatar.",
    skills: ["Prompt engineering", "Content creation", "Social media"],
  },
  {
    year: "2025",
    title: "Lion du Samedi — Promptathon #1",
    team: "Team of 5",
    description: "Prompted a functional tool to automate market-intel research and social publishing.",
    skills: ["Prompt engineering", "Automation", "Make", "Market intelligence", "Social media", "AI"],
  },
  {
    year: "2020",
    title: "Recoder l'Habitat #2",
    team: "Team of 4",
    status: "1st Place 🏆",
    description: "Prototyped an open-data SaaS for city noise-pollution diagnostics.",
    skills: ["Prototyping", "Open data", "Product management", "Noise pollution", "Data visualization"],
  },
  {
    year: "2020",
    title: "Hack The Crisis",
    team: "Team of 5",
    status: "Finalists",
    description: "Prototyped a digital training & coordination tool for caregivers to ease hospital load.",
    skills: ["Service design", "Prototyping", "HealthTech", "User journey"],
  },
];

const continuousLearning = [
  {
    year: "2025",
    title: "Product Management Intensive Program",
    source: "MAESTRO",
    description: "I honed my 0→1 product lifecycle management skills. Use cases: Carrefour, Welcome To The Jungle",
    link: "https://maestro.mariaschools.com/formations/devenez-product-manager-formation-a-temps-plein-en-presentiel",
  },
  {
    year: "2025",
    title: "Building Strategic Foresight Capabilities",
    source: "EDHEC Business School & UNESCO",
    description: "I learned strategic foresight methods to anticipate and shape future scenarios",
    link: "https://www.coursera.org/learn/strategic-foresight",
  },
  {
    year: "2020",
    title: "Service Design: Delivering Integrated Service Design Experiences.",
    source: "The Interaction Design Foundation",
    description: "I learned how to value design to conceive full-stack business-oriented experiences",
    link: "https://www.interaction-design.org/courses/service-design-how-to-design-integrated-service-experiences",
  },
  {
    year: "2019",
    title: "Lion du Samedi (it became Le Promptathon in 2025, which I also attended)",
    source: "Join Lion",
    description: "I learned how to work in the start-up universe and innovate better",
    link: "https://medium.com/join-lion/une-1%C3%A8re-journ%C3%A9e-chez-lion-66040cf097b2",
  },
];

const education = [
  {
    year: "2017",
    title: "Master's in Agri-food Business and Entrepreneurship.",
    school: "IHEDREA",
    description: "Focus on food and agricultural entrepreneurship and product strategy",
  },
];

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeExperienceFilter, setActiveExperienceFilter] = useState("experiences");
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStickyDisabled, setIsStickyDisabled] = useState(false);
  const expExpand = useInlineExpand();
  const contactSectionRef = useRef<HTMLElement>(null);

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

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter(
          (project) =>
            project.category === activeFilter ||
            project.tags.some((tag) => tag.toLowerCase() === activeFilter.toLowerCase()),
        );

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
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
    <div className="min-h-screen bg-background">
      <Navigation />

      <ProgressIndicator
        sections={[
          { id: "hero", label: "Hero" },
          { id: "work", label: "Work" },
          { id: "hackathons", label: "Hackathons" },
          { id: "experience", label: "Experience" },
          { id: "resources", label: "Resources" },
          { id: "contact", label: "Contact" },
        ]}
      />

      {/* Hero Section */}
      <section
        id="hero"
        className="px-4 py-12 md:py-16 relative overflow-visible"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(var(--background)) 0%, hsl(var(--secondary)) 100%)',
        }}
      >
        {/* Animated gradient background pattern */}
        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{
            opacity: 0.04,
          }}
        >
          <motion.div
            className="absolute inset-0 dark:opacity-[1.3]"
            style={{
              background: 'radial-gradient(circle at 20% 50%, hsl(var(--accent)) 0%, transparent 50%), radial-gradient(circle at 80% 50%, hsl(var(--accent)) 0%, transparent 50%), radial-gradient(circle at 50% 20%, hsl(var(--accent)) 0%, transparent 50%)',
              backgroundSize: '200% 200%',
            }}
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
        
        {/* Animated mesh gradient overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.06, 0.1, 0.06],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 800px 600px at 50% 50%, hsl(var(--accent)) 0%, transparent 50%)',
              opacity: 0.08,
            }}
          />
        </motion.div>

        {/* Grain texture overlay - ultra-légère */}
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.02 }}>
          <svg className="w-[105%] h-[105%] absolute -top-[2.5%] -left-[2.5%]">
            <filter id="noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
          </svg>
        </div>

        {/* Container principal */}
        <div className="mx-auto max-w-[1400px] w-full relative" style={{ padding: 'clamp(24px, 4vw, 80px)' }}>
          
          {/* Version Desktop */}
          <div className="hidden md:block">
            {/* Contenu texte - full width */}
            <div className="max-w-full">
              {/* Nom */}
              <motion.h1
                className="font-[900] text-foreground leading-[1.05] tracking-[-0.02em] mb-4"
                style={{ 
                  fontFamily: 'Inter',
                  fontSize: 'clamp(48px, 6vw, 64px)'
                }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                Ivan de Murard
              </motion.h1>

              {/* Tagline */}
              <motion.p
                className="font-[800] text-description leading-[1.10] tracking-[-0.01em] mb-6"
                style={{ 
                  fontFamily: 'Inter',
                  fontSize: 'clamp(32px, 4vw, 44px)'
                }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                Zero-to-One Product Manager
              </motion.p>

              {/* Description paragraphe 1 */}
              <motion.p
                className="text-base text-description leading-[1.6] max-w-[800px] mb-4"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                Hospitality and retail taught me the importance of a great experience.
              </motion.p>

              {/* Description paragraphe 2 */}
              <motion.p
                className="text-base text-description leading-[1.6] max-w-[800px] mb-6"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                My data-driven and entrepreneurial journey shaped my analytical and pragmatic mindset.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-row gap-4 items-center"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.30, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Bouton primaire */}
                <Button
                  onClick={() => scrollToSection("work")}
                  className="bg-accent text-accent-foreground px-8 py-[14px] rounded-2xl text-base font-medium border-none cursor-pointer transition-all duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:translate-y-[-2px] hover:shadow-[0_12px_24px_-8px_rgba(30,58,138,0.25)]"
                >
                  View my work
                </Button>

                {/* Lien secondaire */}
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-contact text-base font-medium bg-transparent border-none cursor-pointer transition-all duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-contact hover:underline"
                >
                  Get in touch →
                </button>
              </motion.div>
            </div>
          </div>

          {/* Version Mobile */}
          <div className="md:hidden">
            {/* Contenu centré */}
            <div className="text-center">
              {/* Nom */}
              <motion.h1
                className="text-5xl font-[900] text-foreground leading-[1.05] tracking-[-0.02em] mb-4"
                style={{ fontFamily: 'Inter' }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                Ivan de Murard
              </motion.h1>

              {/* Tagline */}
              <motion.p
                className="text-[32px] font-[800] text-description leading-[1.10] tracking-[-0.01em] mb-4"
                style={{ fontFamily: 'Inter' }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                Zero-to-One Product Manager
              </motion.p>

              {/* Description paragraphe 1 */}
              <motion.p
                className="text-base text-description leading-[1.6] mb-3"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                Hospitality and retail taught me the importance of a great experience.
              </motion.p>

              {/* Description paragraphe 2 */}
              <motion.p
                className="text-base text-description leading-[1.6] mb-5"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                My data-driven and entrepreneurial journey shaped my analytical and pragmatic mindset.
              </motion.p>

              {/* CTA Buttons en colonne */}
              <motion.div
                className="flex flex-col gap-3 items-center"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.30, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Bouton primaire */}
                <Button
                  onClick={() => scrollToSection("work")}
                  className="w-full bg-accent text-accent-foreground px-8 py-[14px] rounded-2xl text-base font-medium border-none"
                >
                  View my work
                </Button>

                {/* Lien secondaire */}
                <button
                  onClick={() => scrollToSection("contact")}
                  className="w-full text-contact text-base font-medium bg-transparent border-none cursor-pointer hover:underline"
                >
                  Get in touch →
                </button>
              </motion.div>
            </div>
          </div>

          {/* Scroll hint */}
          <motion.div
            className="mt-4 mb-2 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="cursor-pointer"
              onClick={() => scrollToSection("work")}
            >
              <ArrowDown className="w-6 h-6 text-muted-foreground/60" />
            </motion.div>
          </motion.div>
        </div>

        {/* Marquee Banner - à cheval sur Hero et Work */}
        <div className="absolute left-0 right-0 -bottom-[32px] z-30">
          <div className="relative section-border-gradient bg-gradient-to-r from-background via-card/20 to-background after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-border/25 after:to-transparent dark:after:via-border/20 shadow-lg">
            <MarqueeBanner
              phrases={[
                "Welcome",
                "AI-assisted product building",
                "Hands-on PM across design, data & GTM",
                "Paris • Open to remote",
              ]}
              speed={0.65}
              pauseOnHover
              ariaLabel="Highlights"
              className="py-5 max-w-[1360px] mx-auto px-4"
            />
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="relative pt-24 md:pt-28 pb-16 md:pb-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">WORK</p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">Work</h2>
          </div>

          <FilterChips
            chips={filterChips}
            activeChip={activeFilter}
            onChipChange={setActiveFilter}
            className="mb-12"
            disableSticky={isStickyDisabled}
          />

          {/* Mobile/Tablet: Grid Layout */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12 justify-items-center">
            {filteredProjects.map((project, index) => {
              const originalIndex = projects.findIndex((p) => p.id === project.id);
              const isComingSoon =
                originalIndex >= 4 && project.id !== "agents-eval" && project.id !== "agentic-hospitality";
              const isBuilding = project.id === "agentic-hospitality";

              return project.id === "sonor" ? (
                <MediaCard
                  key={project.id}
                  id={project.id}
                  kicker={project.kicker || `Case Study – ${project.title}`}
                  title={project.subtitle}
                  tagline={project.tagline || "De l'idée au produit validé"}
                  badge={project.tags[0] || "Project"}
                  image={project.image}
                  onClick={() => openModal(index)}
                  showComingSoon={isComingSoon}
                  showBuilding={isBuilding}
                />
              ) : (
                <CardImmersive
                  key={project.id}
                  id={project.id}
                  kicker={project.kicker || `Case Study – ${project.title}`}
                  title={project.subtitle}
                  tagline={project.tagline || "De l'idée au produit validé"}
                  badge={project.tags[0] || "Project"}
                  image={project.image}
                  onClick={() => openModal(index)}
                  showComingSoon={isComingSoon}
                  showBuilding={isBuilding}
                />
              );
            })}
          </div>

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
                    kicker={project.kicker || `Case Study – ${project.title}`}
                    title={project.subtitle}
                    tagline={project.tagline || "De l'idée au produit validé"}
                    badge={project.tags[0] || "Project"}
                    image={project.image}
                    onClick={() => openModal(index)}
                    showComingSoon={isComingSoon}
                    showBuilding={isBuilding}
                  />
                ) : (
                  <CardImmersive
                    key={project.id}
                    id={project.id}
                    kicker={project.kicker || `Case Study – ${project.title}`}
                    title={project.subtitle}
                    tagline={project.tagline || "De l'idée au produit validé"}
                    badge={project.tags[0] || "Project"}
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
              See how I build products in 48 hours
              <ArrowDown className="ml-2 h-4 w-4 group-hover:animate-bounce" />
            </Button>
          </div>
        </div>
      </section>

      {/* Hackathons Section - Left Aligned */}
      <section id="hackathons" className="py-24 px-4 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <SectionHeader kicker="COMPETITION" title="Hackathons" alignment="left" className="mb-12" />

          <div className="space-y-8">
            {hackathons.map((hack, index) => (
              <div key={index} className="flex gap-8 pb-8 last:pb-0">
                <div className="w-20 flex-shrink-0">
                  <span className="text-sm font-medium text-muted-foreground">{hack.year}</span>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground">{hack.title}</h3>
                      <p className="text-sm text-accent font-medium">
                        {hack.team} people <span className="text-muted-foreground">•</span> {hack.status}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">{hack.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

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
              Discover my 5-year PM journey
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
          <SectionHeader kicker="BACKGROUND" title="Experience & Education" alignment="left" className="mb-8" />

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
                          <h4 className="font-semibold text-foreground">{item.title}</h4>
                          <p className="text-sm text-accent font-medium uppercase tracking-wider">{item.source}</p>
                          <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
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
                          <h4 className="font-semibold text-foreground">{edu.title}</h4>
                          <p className="text-sm text-accent font-medium uppercase tracking-wider">{edu.school}</p>
                          <p className="text-sm text-muted-foreground mt-1">{edu.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Inter-section teaser */}
          <div className="text-center mt-12 mb-6">
            <p className="text-sm text-muted-foreground">
              🔧 <span className="font-medium">Curious about my stack?</span>
            </p>
          </div>

          {/* CTA vers la section Resources/Communautés (dans la page) */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="lg"
              className="group hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
              onClick={() => document.getElementById("resources")?.scrollIntoView({ behavior: "smooth" })}
            >
              Check my toolkit & inspiration sources
              <ArrowDown className="ml-2 h-4 w-4 group-hover:animate-bounce" />
            </Button>
          </div>
        </div>
      </section>

      <CommunitiesInspoResourcesTools disableSticky={isStickyDisabled} />

      {/* Built With Banner */}
      <BuiltWithBanner />

      {/* Contact Section - Centered */}
      <section
        ref={contactSectionRef}
        id="contact"
        className="py-24 px-4 bg-contact text-contact-foreground section-border-accent"
      >
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-h2">Ready to build tomorrow?</h2>

          <p className="text-lg max-w-2xl mx-auto opacity-90">Let's explore opportunities together.</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="bg-card hover:bg-card/90 text-contact dark:text-white hover:scale-105 hover:shadow-xl active:scale-95 transition-all duration-300"
              asChild
            >
              <a href={SOCIAL_LINKS.mail.href}>
                <Mail className="mr-2 h-5 w-5" />
                Email
              </a>
            </Button>
            <Button
              size="lg"
              className="bg-card hover:bg-card/90 text-contact dark:text-white hover:text-[#0077B5] hover:scale-105 hover:shadow-xl active:scale-95 transition-all duration-300 group"
              asChild
            >
              <a href={SOCIAL_LINKS.linkedin.href} target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 h-5 w-5 group-hover:text-[#0077B5] transition-colors" />
                LinkedIn
              </a>
            </Button>
            <Button
              size="lg"
              className="bg-card hover:bg-card/90 text-contact dark:text-white hover:scale-105 hover:shadow-xl active:scale-95 transition-all duration-300"
              asChild
            >
              <a href={SOCIAL_LINKS.calendar.href} target="_blank" rel="noopener noreferrer">
                <Calendar className="mr-2 h-5 w-5" />
                Calendar
              </a>
            </Button>
          </div>

          {/* Action A: Fix Dead End - Back to top CTA */}
          <div className="mt-12 pt-8 border-t border-contact-foreground/20">
            <Button
              variant="ghost"
              size="lg"
              className="text-contact-foreground/80 hover:text-contact-foreground hover:bg-contact-foreground/10 transition-all duration-300"
              onClick={() => scrollToSection("hero")}
            >
              ↑ Back to top
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
          { id: "resources", label: "Resources" },
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
          title={selectedProject.modalTitle || selectedProject.title}
          subtitle={selectedProject.modalSubtitle || selectedProject.longDescription}
          bullets={selectedProject.bullets}
          cta={{
            label: "Discover the case study!",
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
