// src/pages/Sonor_ContentEN.tsx
// FICHIER 3/4 : Contenu anglais complet pour le case study SONOR
// Version conforme aux spécifications validées - English version

import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CaseTldr from "@/components/case/CaseTldr";
import { CaseImage } from "@/components/case/CaseImage";
import { CTABanner } from "@/components/work/CTABanner";
import { ExternalLink, Play, Info, MapPin, Target, Users, BarChart, Clock, Database } from "lucide-react";
import { ImageLightbox } from "@/components/ImageLightbox";
import { TermExplain, ExpandSection, BandeauAudio, TabsApprofondir } from "./Sonor_Composants";
import { ScrollRevealSection } from "@/components/case/ScrollRevealSection";
import { TimelineItem } from "@/components/case/TimelineItem";
import { useLanguage } from "@/contexts/LanguageContext";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

// ============= TL;DR BLOCK EN =============
export const TLDRBlockEN = () => (
  <CaseTldr
    tone="neutral"
    title="TL;DR — At a glance"
    items={[
      <>
        <b>Context:</b> Recoder l'Habitat #2 Hackathon (winner) → incubation Matrice & Banque des Territoires
        (2020-2022)
      </>,
      <>
        <b>Problem:</b> Noise pollution (2nd urban nuisance), invisible, real health impacts
      </>,
      <>
        <b>Solution:</b> 360° SaaS platform offering with open data mapping, public action recommendations, citizen
        engagement (awareness, communication)
      </>,
      <>
        <b>Team:</b> 4 co-founders (Émilie, Majda, Benjamin, Ivan), 1 part-time dev/data-scientist
      </>,
      <>
        <b>My role:</b> Product framing, discovery, prototyping, sales, data-scientist leadership
      </>,
      <>
        <b>Duration & method:</b> 2 years / Agile Lean, 2-3 week Kanban sprints, 6+ monthly milestones (partner
        presentations)
      </>,
    ]}
  />
);

// ============= CONTENT EN =============
export const ContentEN = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const tabsRef = useRef<HTMLDivElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const galleryImages = [
    {
      src: "/img/Sonor-notre-approche.webp",
      alt: "Mapping dashboard — Hotspots & real-time indicators",
      caption: "Mapping dashboard — Hotspots & real-time indicators",
    },
    {
      src: "/img/sonor_recommandations.png",
      alt: "Action recommendations",
      caption: "Actionable recommendations — Prioritized tasks by zone",
    },
    {
      src: "/img/sonor_issy_marque_blanche.png",
      alt: "Issy white label",
      caption: "White-label integration",
    },
    {
      src: "/img/sonor_engagement_citoyen.png",
      alt: "Citizen engagement",
      caption: "Citizen engagement — Qualified alert submission",
    },
  ];

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const handleNavigate = (direction: "prev" | "next") => {
    setCurrentImageIndex((prev) => {
      if (direction === "prev") {
        return prev > 0 ? prev - 1 : galleryImages.length - 1;
      } else {
        return prev < galleryImages.length - 1 ? prev + 1 : 0;
      }
    });
  };

  const scrollToTabs = () => {
    tabsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* ========== HOOK SECTION - NEW ========== */}
      <div className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            {language === "fr"
              ? "Ce que construire un SaaS B2G m'a appris sur le product-market fit"
              : "What building a B2G SaaS taught me about product-market fit"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {language === "fr"
              ? "Un parcours de 2 ans (2020-2022) transformant l'open data en insights actionnables pour les villes — avant l'IA générative, quand le SaaS pour collectivités était un marché émergent."
              : "A 2-year journey (2020-2022) transforming open data into actionable city insights — before generative AI, when SaaS for municipalities was still an emerging market."}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-8 bg-card rounded-2xl border border-border hover:border-accent/30 transition-all">
            <div className="text-accent text-5xl font-bold mb-3">
              <CountUp end={18} duration={2} separator="," suffix="+" enableScrollSpy scrollSpyOnce />
            </div>
            <p className="text-muted-foreground text-base">
              {language === "fr"
                ? "Mois moyens pour signer un premier contrat B2G"
                : "Average months for first B2G contract signature"}
            </p>
          </div>

          <div className="p-8 bg-card rounded-2xl border border-border hover:border-accent/30 transition-all">
            <div className="text-accent text-5xl font-bold mb-3">
              <CountUp end={20} duration={2} separator="," suffix="+" enableScrollSpy scrollSpyOnce />
            </div>
            <p className="text-muted-foreground text-base">
              {language === "fr"
                ? "Entretiens parties prenantes menés pour valider le product-market fit"
                : "Stakeholder interviews conducted to validate product-market fit"}
            </p>
          </div>

          <div className="p-8 bg-card rounded-2xl border border-border hover:border-accent/30 transition-all">
            <div className="text-accent text-5xl font-bold mb-3">
              <CountUp end={20} duration={2.5} separator="," prefix="€" suffix="K" enableScrollSpy scrollSpyOnce />
            </div>
            <p className="text-muted-foreground text-base">
              {language === "fr"
                ? "Financement sécurisé via concours et incubation"
                : "Secured funding through competitive grants and incubation"}
            </p>
          </div>
        </div>
      </div>

      {/* TL;DR */}
      <div id="overview" className="mb-10 max-w-6xl mx-auto">
        <TLDRBlockEN />
      </div>

      {/* SONOR LOGO - NEW */}
      <div className="flex justify-center mb-10">
        <img src="/img/logo_sonor.png" alt="Sonor logo" className="h-20 object-contain" />
      </div>

      {/* AUDIO BANNER */}
      <div className="mb-10 max-w-6xl mx-auto">
        <BandeauAudio language="en" />
      </div>

      {/* ========== SECTION: CONTEXT ========== */}
      <div id="context" className="py-16 px-4 md:px-8 lg:px-12 bg-background border-b border-border/50">
        <div className="max-w-6xl mx-auto space-y-12">
          <h2 className="text-h3 mb-12">
            {language === "fr" ? "Contexte : La Crise Invisible" : "Context: The Invisible Crisis"}
          </h2>

          {/* Stats grid - keep existing */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-card/80 backdrop-blur-sm p-6 rounded-2xl border border-border/50 hover:border-accent/30 transition-colors">
              <div className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                2nd
              </div>
              <div className="text-muted-foreground text-sm">
                {language === "fr"
                  ? "Source de nuisances urbaines en Europe (après la pollution de l'air)"
                  : "Source of urban nuisances in Europe (after air pollution)"}
              </div>
            </div>
            <div className="bg-card/80 backdrop-blur-sm p-6 rounded-2xl border border-border/50 hover:border-accent/30 transition-colors">
              <div className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                25M
              </div>
              <div className="text-muted-foreground text-sm">
                {language === "fr"
                  ? "Français exposés à des niveaux sonores excessifs (ANSES 2021)"
                  : "French exposed to excessive noise levels (ANSES 2021)"}
              </div>
            </div>
            <div className="bg-card/80 backdrop-blur-sm p-6 rounded-2xl border border-border/50 hover:border-accent/30 transition-colors">
              <div className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                48K/year
              </div>
              <div className="text-muted-foreground text-sm">
                {language === "fr"
                  ? "Nouveaux cas de maladies cardiaques dus aux niveaux sonores excessifs (AEE 2025)"
                  : "New cases of heart disease due to excessive noise levels (EEA 2025)"}
              </div>
            </div>
          </div>

          {/* Two-column layout */}
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left: Text content */}
            <div className="space-y-6">
              <p className="text-lg leading-relaxed">
                {language === "fr" ? (
                  <>
                    <strong>20% de la population européenne</strong> est exposée à des niveaux sonores nocturnes
                    dangereux pour la santé.
                  </>
                ) : (
                  <>
                    <strong>20% of the European population</strong> is exposed to dangerous nighttime noise levels for
                    health.
                  </>
                )}
              </p>
              <p className="leading-relaxed">
                {language === "fr"
                  ? "Les impacts sanitaires sont multiples : troubles du sommeil, stress chronique, maladies cardiovasculaires, impacts cognitifs chez les enfants."
                  : "Health impacts are multiple: sleep disorders, chronic stress, cardiovascular diseases, cognitive impacts in children."}
              </p>
              <p className="leading-relaxed">
                {language === "fr" ? (
                  <>
                    Contrairement à la pollution de l'air, le bruit reste <strong>invisible</strong> et{" "}
                    <strong>sous-adressé</strong> par les politiques publiques, malgré son coût social considérable.
                  </>
                ) : (
                  <>
                    Unlike air pollution, noise remains <strong>invisible</strong> and <strong>under-addressed</strong>{" "}
                    by public policies, despite its considerable social cost.
                  </>
                )}
              </p>
            </div>

            {/* Right: Visual */}
            <CaseImage
              onClick={() => openLightbox(0)}
              desktopSrc="/img/sonor-noise-thresholds.png"
              alt={language === "fr" ? "Seuils de danger du bruit" : "Noise danger thresholds"}
              caption={language === "fr" ? "Échelle des niveaux sonores et seuils de danger" : "Noise level scale and danger thresholds"}
            />
          </div>

          {/* Sources - redesigned */}
          <div className="mt-12 p-6 bg-muted/30 rounded-xl border border-border/30">
            <p className="text-sm font-semibold mb-3 text-muted-foreground">
              {language === "fr" ? "Sources des données :" : "Data sources:"}
            </p>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-2 text-sm text-muted-foreground">
              <span>• WHO Europe (2018): Guidelines on noise</span>
              <span>• ANSES (2021): 25M French exposed</span>
              <span>• EEA (2025): 48K new heart disease cases</span>
              <span>• EEA (2024): 20% population exposed</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========== SECTION: PRODUCT VISION ========== */}
      <ScrollRevealSection variant="fade-in-up" delay={0.05}>
        <div id="our-approach" className="py-16 px-4 md:px-8 lg:px-12 bg-secondary border-b border-border/50">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-h3 mb-4">
                {language === "fr"
                  ? "Du Problème à la Plateforme : Notre Hypothèse Produit"
                  : "From Problem to Platform: Our Product Hypothesis"}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {language === "fr"
                  ? "Face à ce constat, nous avons imaginé Sonor comme un outil permettant aux municipalités d'anticiper et d'agir sur la pollution sonore."
                  : "Faced with this observation, we imagined Sonor as a tool enabling municipalities to anticipate and act on noise pollution."}
              </p>
            </div>

            {/* Feature cards grid */}
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              {/* Feature 1: Real-time mapping */}
              <div className="bg-card p-8 rounded-2xl border border-border hover:border-accent/30 transition-all">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                  <MapPin className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-3">
                  {language === "fr" ? "Cartographie temps réel du bruit" : "Real-time noise mapping"}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {language === "fr"
                    ? "Transformer l'open data dispersé en visualisation actionnable des points chauds sonores"
                    : "Transform scattered open data into actionable hotspot visualization"}
                </p>
              </div>

              {/* Feature 2: Action plans */}
              <div className="bg-card p-8 rounded-2xl border border-border hover:border-accent/30 transition-all">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-3">
                  {language === "fr" ? "Plans d'action priorisés" : "Prioritized action plans"}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {language === "fr"
                    ? "Recommandations alimentées par l'IA pour les urbanistes afin de réduire efficacement le bruit"
                    : "Data-driven recommendations for urban planners to reduce noise effectively"}
                </p>
              </div>

              {/* Feature 3: Citizen engagement */}
              <div className="bg-card p-8 rounded-2xl border border-border hover:border-accent/30 transition-all">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                  <Users className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-3">
                  {language === "fr" ? "Engagement citoyen" : "Citizen engagement"}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {language === "fr"
                    ? "Permettre aux résidents de signaler les problèmes de bruit et suivre les réponses de la ville"
                    : "Empower residents to report noise issues and track city responses"}
                </p>
              </div>

              {/* Feature 4: Impact measurement */}
              <div className="bg-card p-8 rounded-2xl border border-border hover:border-accent/30 transition-all">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                  <BarChart className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-3">
                  {language === "fr" ? "Mesure d'impact" : "Impact measurement"}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {language === "fr"
                    ? "Suivre la réduction du bruit au fil du temps et communiquer les progrès aux parties prenantes"
                    : "Track noise reduction over time and communicate progress to stakeholders"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </ScrollRevealSection>

      {/* ========== SECTION: EXPLORE THE PLATFORM ========== */}
      <ScrollRevealSection variant="fade-in-up" delay={0.1}>
        <div className="py-16 px-4 md:px-8 lg:px-12 bg-card border-b border-border/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-h3 mb-4">
                {language === 'fr' 
                  ? "Explorer la Plateforme"
                  : "Explore the Platform"
                }
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {language === 'fr'
                  ? "Le site commercial Sonor est toujours en ligne, présentant la vision et les fonctionnalités que nous avons construites."
                  : "The Sonor commercial site is still live, showcasing the vision and features we built."
                }
              </p>
            </div>
            
            {/* Screenshot mockup + CTA */}
            <div className="relative group">
              <a 
                href="https://sonor.dorik.io/" 
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <img 
                  src="/img/sonor-website-screenshot.gif" 
                  alt={language === 'fr' ? "Interface plateforme Sonor" : "Sonor platform interface"} 
                  className="w-full rounded-2xl border-2 border-border shadow-lg group-hover:shadow-2xl transition-all"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
                  <div className="bg-accent text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2">
                    {language === 'fr' ? "Visiter le Site" : "Visit Live Site"}
                    <ExternalLink className="w-5 h-5" />
                  </div>
                </div>
              </a>
            </div>
            
            {/* Note about preservation */}
            <p className="text-sm text-muted-foreground text-center mt-6">
              {language === 'fr'
                ? "Ce site reste en ligne comme témoignage de la vision produit et du travail accompli durant le projet."
                : "This site remains online as a testament to the product vision and work accomplished during the project."
              }
            </p>
          </div>
        </div>
      </ScrollRevealSection>

      {/* ========== SECTION 2: TIMELINE ========== */}
      <ScrollRevealSection variant="fade-in-up" delay={0.15}>
        <div id="timeline" className="py-16 px-4 md:px-8 lg:px-12 bg-background border-b border-border/50">
          <div className="max-w-6xl mx-auto space-y-8">
            <h2 className="text-h3">Project Timeline</h2>

            <div className="space-y-8">
              <TimelineItem
                date="Oct. 2020"
                title="Hackathon"
                description="Recoder l'Habitat #2 win → Matrice/BdT incubation"
                index={0}
              />
              <TimelineItem
                date="Oct. 2020 - Jan. 2021"
                title="Discovery"
                description="20+ interviews, private sector exploration"
                index={1}
              />
              <TimelineItem
                date="Jan. 2021"
                title="Pivot"
                description="Strategic decision → focus municipalities"
                index={2}
              />
              <TimelineItem
                date="Jan. - April 2021"
                title="Prototype"
                description="3 Figma versions + white-label evolution"
                index={3}
              />
              <TimelineItem
                date="May 2021 - March 2022"
                title="Go-to-market"
                description="20+ cities, 2 proposals, long cycles"
                index={4}
              />
              <TimelineItem
                date="March 2022"
                title="End"
                description="Funding exhaustion, 0 signature"
                index={5}
                isLast={true}
              />
            </div>
            <p className="text-base text-foreground/80 italic text-center mt-8">
              → Three key moments marked this trajectory...
            </p>
          </div>
        </div>
      </ScrollRevealSection>

      {/* ========== SECTION 3: KEY MOMENTS ========== */}
      <ScrollRevealSection variant="fade-in-up" delay={0.15}>
        <div id="key-moments" className="py-16 px-4 md:px-8 lg:px-12 bg-card border-b border-border/50">
          <div className="max-w-6xl mx-auto space-y-8">
            <h2 className="text-h3">Key Moments</h2>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Moment 1 */}
              <div className="p-6 rounded-lg bg-card border-l-4 border-accent">
                <h3 className="text-h4 mb-3">Strategic pivot: Private sector → Municipalities</h3>
                <p className="text-base mb-3">
                  <b>Context:</b> After 3 months private sector exploration, 1st milestone presentation.
                </p>
                <blockquote className="italic text-base leading-relaxed border-l-4 border-accent/30 pl-4 mb-3">
                  "Municipalities have the skills and resources to act sustainably on this issue. And we have the
                  network to support you."
                  <footer className="text-sm mt-2 text-muted-foreground">
                    — Banque des Territoires / Matrice Advisor
                  </footer>
                </blockquote>
                <p className="text-base">
                  <b>Decision:</b> Pivot to public market (cities, metropolises). Internal debate: less "sexy", long
                  processes, but consensus: BdT support decisive.
                </p>
              </div>

              {/* Moment 2 */}
              <div className="p-6 rounded-lg bg-card border-l-4 border-destructive">
                <h3 className="text-h4 mb-3">The insight that diluted focus</h3>
                <p className="text-base mb-3">
                  <b>Context:</b> Discovery, interviews with elected officials.
                </p>
                <blockquote className="italic text-base leading-relaxed border-l-4 border-destructive/30 pl-4 mb-3">
                  "We'd especially like human support: communication about our actions, citizen awareness,
                  identification of field solutions."
                  <footer className="text-sm mt-2 text-muted-foreground">— Municipality</footer>
                </blockquote>
                <p className="text-base">
                  <b>Error:</b> Attempt to meet both needs (platform + human support). Result: Blurred 360° offering,
                  MVP never finalized.
                  <br />
                  <b>Learning:</b> Chase only one rabbit at a time.
                </p>
              </div>

              {/* Moment 3 */}
              <div className="p-6 rounded-lg bg-card border-l-4 border-accent">
                <h3 className="text-h4 mb-3">From standalone platform to integrable component</h3>
                <p className="text-base mb-3">
                  <b>Context:</b> Prototype presentation (Sonor branding) to Issy-les-Moulineaux.
                </p>
                <blockquote className="italic text-base leading-relaxed border-l-4 border-accent/30 pl-4 mb-3">
                  "Your solution interests us, but we cannot redirect our citizens to an external site. It would need to
                  be integrable into our open-data portal."
                  <footer className="text-sm mt-2 text-muted-foreground">— Issy-les-Moulineaux</footer>
                </blockquote>
                <p className="text-base">
                  <b>Decision:</b> Pivot to white-label component (full municipality branding adoption). Key issue:{" "}
                  <b>Data sovereignty</b>.
                </p>
              </div>
            </div>
            <p className="text-base text-foreground/80 italic text-center mt-8">
              → Discover how we materialized this vision into a prototype...
            </p>
          </div>
        </div>
      </ScrollRevealSection>

      {/* ========== SECTION 4: PROTOTYPE GALLERY ========== */}
      <ScrollRevealSection variant="fade-in-up" delay={0.2}>
        <div id="prototype-gallery" className="py-16 px-4 md:px-8 lg:px-12 bg-secondary border-b border-border/50">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="space-y-6">
              <h2 className="text-h3">See our first prototype</h2>

              {/* Figma iframe - visible by default */}
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-h4">Interactive Figma Prototype - 2020</h3>
                  <a
                    href="https://www.figma.com/proto/OcBu81qdpjpPdjHQPA6oae/Sonor-Site-Mairie?node-id=25-0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg border border-accent/30 hover:border-accent/50 transition-all group"
                  >
                    <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">Open in Figma</span>
                  </a>
                </div>

                <div className="relative bg-muted rounded-xl overflow-hidden border border-border/50 shadow-lg hover:shadow-xl transition-shadow">
                  <iframe
                    style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}
                    className="w-full h-[600px] md:h-[750px] lg:h-[850px]"
                    src="https://embed.figma.com/proto/OcBu81qdpjpPdjHQPA6oae/Sonor-Site-Mairie?node-id=25-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=25%3A0&embed-host=share"
                    allowFullScreen
                    title="Sonor Interactive Prototype"
                  />
                </div>

                <div className="mt-4 p-4 bg-card/50 rounded-lg border border-border/30">
                  <p className="text-sm text-foreground/70 flex items-start gap-2">
                    <Info className="w-4 h-4 mt-0.5 text-accent flex-shrink-0" />
                    <span>
                      💡 <b>Tip:</b> Click on the prototype to interact with it. Use the navigation controls to explore
                      different screens. For the best experience, open it in full screen using the button above.
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {galleryImages.map((img, i) => (
                <CaseImage
                  key={i}
                  onClick={() => openLightbox(i)}
                  desktopSrc={img.src}
                  alt={img.alt}
                  caption={img.caption}
                />
              ))}
            </div>

            {/* Demo link */}
            <div className="relative p-8 rounded-xl overflow-hidden bg-gradient-to-br from-accent/20 via-primary/10 to-accent/5 border border-accent/30 hover:border-accent/50 transition-all group">
              {/* Background gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10 flex items-center justify-between flex-wrap gap-6">
                <div className="space-y-2">
                  <h4 className="text-xl font-semibold">Functional Prototype</h4>
                  <p className="text-sm text-muted-foreground">
                    Explore the prototype developed for Banque des Territoires
                  </p>
                </div>
                <a
                  href="https://byronbark.github.io/sonor-web-component/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-accent-foreground rounded-xl hover:scale-105 hover:shadow-xl transition-all duration-300 font-semibold"
                >
                  <Play className="w-5 h-5 fill-current" />
                  Open demo
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </ScrollRevealSection>

      {/* ========== SECTION 5: OBSTACLES ENCOUNTERED ========== */}
      <ScrollRevealSection variant="fade-in-up" delay={0.25}>
        <div id="obstacles" className="py-16 px-4 md:px-8 lg:px-12 bg-background border-b border-border/50">
          <div className="max-w-6xl mx-auto space-y-8">
            <h2 className="text-h3">Obstacles Encountered</h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-card border-l-4 border-destructive">
                <h4 className="font-semibold mb-2">Open data availability</h4>
                <p className="text-base">
                  Lack of reliable and standardized open data on noise pollution. Need to normalize heterogeneous
                  sources.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-card border-l-4 border-destructive">
                <h4 className="font-semibold mb-2">Underestimated technical complexity</h4>
                <p className="text-base">
                  Difficulty accessing and processing quality data into an exploitable map. Slowed prototype
                  development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ScrollRevealSection>

      {/* ========== SECTION 6: RESULTS & IMPACT ========== */}
      <ScrollRevealSection variant="fade-in-up" delay={0.3}>
        <div id="results" className="py-16 px-4 md:px-8 lg:px-12 bg-card border-b border-border/50">
          <div className="max-w-6xl mx-auto space-y-8">
            <h2 className="text-h3">Results & Impact</h2>

            {/* Key figures */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-card/80 backdrop-blur-sm p-6 rounded-2xl border border-border/50 hover:border-accent/30 transition-colors">
                <div className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  €20k
                </div>
                <div className="text-muted-foreground text-sm">Funding obtained (2 grants)</div>
              </div>
              <div className="bg-card/80 backdrop-blur-sm p-6 rounded-2xl border border-border/50 hover:border-accent/30 transition-colors">
                <div className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  20+
                </div>
                <div className="text-muted-foreground text-sm">Qualitative interviews</div>
              </div>
              <div className="bg-card/80 backdrop-blur-sm p-6 rounded-2xl border border-border/50 hover:border-accent/30 transition-colors">
                <div className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  3+1
                </div>
                <div className="text-muted-foreground text-sm">Prototype versions (Figma + coded)</div>
              </div>
              <div className="bg-card/80 backdrop-blur-sm p-6 rounded-2xl border border-border/50 hover:border-accent/30 transition-colors">
                <div className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  8+
                </div>
                <div className="text-muted-foreground text-sm">Metropolises and cities met</div>
              </div>
            </div>
          </div>
        </div>
      </ScrollRevealSection>

      {/* ========== SECTION 7: EPILOGUE ========== */}
      <ScrollRevealSection variant="fade-in-up" delay={0.35}>
        <div id="epilogue" className="py-16 px-4 md:px-8 lg:px-12 bg-secondary border-b border-border/50">
          <div className="max-w-6xl mx-auto space-y-8">
            <h2 className="text-h3">Epilogue & Learnings</h2>

            <section className="space-y-6">
              <h3 className="text-h4">
                The SONOR project did not become a startup per se, but the experience was formative on several levels,
                both professionally and personally.
              </h3>
            </section>

            {/* Learnings */}
            <section className="space-y-6">
              <h3 className="text-h4">Learnings</h3>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Practical */}
                <div className="rounded-xl p-6 bg-card/80 backdrop-blur-sm border border-border/50 hover:border-accent/30 transition-all group hover:shadow-lg hover:scale-[1.01] duration-300">
                  <h4 className="text-lg font-semibold mb-4">Practical</h4>
                  <ul className="list-disc pl-5 space-y-3 text-base leading-relaxed">
                    <li>
                      <b>End-to-end 0→1</b>: Complete discovery → prototyping → go-to-market → commercialization
                    </li>
                    <li>
                      <b>Prioritization & saying no</b>: Importance of staying focused on 1 MVP rather than 360°
                      offering
                    </li>
                    <li>
                      <b>B2G go-to-market</b>: Long cycles, importance of functional prototype
                    </li>
                    <li>
                      <b>Communicate before being "ready"</b>: Functional prototype necessary to convince
                    </li>
                  </ul>
                </div>

                {/* Personal */}
                <div className="rounded-xl p-6 bg-card/80 backdrop-blur-sm border border-border/50 hover:border-accent/30 transition-all group hover:shadow-lg hover:scale-[1.01] duration-300">
                  <h4 className="text-lg font-semibold mb-4">Personal</h4>
                  <ul className="list-disc pl-5 space-y-3 text-base leading-relaxed">
                    <li>
                      <b>Appetite for exploration and analysis</b>: Confirmed my taste for in-depth study of complex
                      issues, searching for concrete solutions, and the ability to transform technical learnings and
                      data into answers adapted to field needs
                    </li>
                    <li>
                      <b>Impact products</b>: Confirmed interest in products with strong societal and environmental
                      impact
                    </li>
                    <li>
                      <b>Field ↔ design back-and-forth</b>: Importance of regular confrontation with field
                    </li>
                    <li>
                      <b>Cross-functional teamwork</b>: Clear communication and synthesis of complex issues
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      </ScrollRevealSection>

      {/* ========== SECTION 8: IF I HAD TO DO IT AGAIN ========== */}
      <ScrollRevealSection variant="fade-in-up" delay={0.4}>
        <div
          id="if-i-had-to-do-it-again"
          className="py-16 px-4 md:px-8 lg:px-12 bg-background border-b border-border/50"
        >
          <div className="max-w-6xl mx-auto space-y-8">
            <h2 className="text-h3">If I Had to Do It Again</h2>

            <div className="space-y-6">
              <p className="text-lg">
                In hindsight, here are the decisions I would make differently to maximize our chances of success:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-xl p-5 bg-card border-l-4 border-accent">
                  <h4 className="font-semibold mb-2">Choose 1 MVP from the start</h4>
                  <p className="text-base text-foreground/80">
                    Rather than a 360° offering, focus on a specific segment (e.g., mapping only) to validate the value
                    proposition quickly.
                  </p>
                </div>

                <div className="rounded-xl p-5 bg-card border-l-4 border-accent">
                  <h4 className="font-semibold mb-2">Validate technical complexity before promising</h4>
                  <p className="text-base text-foreground/80">
                    Build a minimal functional prototype before engaging in commercial discussions to avoid
                    unsustainable promises.
                  </p>
                </div>

                <div className="rounded-xl p-5 bg-card border-l-4 border-accent">
                  <h4 className="font-semibold mb-2">Build a functional prototype earlier</h4>
                  <p className="text-base text-foreground/80">
                    Move from Figma to code as soon as we get initial field feedback to accelerate confrontation with
                    technical and user reality.
                  </p>
                </div>

                <div className="rounded-xl p-5 bg-card border-l-4 border-accent">
                  <h4 className="font-semibold mb-2">Focus on a specific customer segment</h4>
                  <p className="text-base text-foreground/80">
                    Target a specific type of municipality (e.g., mid-sized cities of 50-100k inhabitants) to adapt the
                    pitch and solution to their real constraints.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollRevealSection>

      {/* ========== SECTION 9: CONCLUSION ========== */}
      <ScrollRevealSection variant="fade-in-up" delay={0.45}>
        <div id="conclusion" className="py-16 px-4 md:px-8 lg:px-12 bg-card border-b border-border/50">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="text-center">
              <h2 className="text-h3 mb-4">Conclusion</h2>
            </div>
            <section className="max-w-4xl mx-auto text-center">
              <p className="text-lg">
                SONOR confirmed my taste for transforming issues into data-driven solutions and allowed me to acquire
                valuable experience in 0→1 product management, from discovery to commercialization.
              </p>
            </section>
          </div>
        </div>
      </ScrollRevealSection>

      {/* ========== SECTION: KEY LEARNINGS ========== */}
      <ScrollRevealSection variant="fade-in-up" delay={0.45}>
        <div id="learnings" className="py-20 px-4 md:px-8 lg:px-12 bg-accent/5 border-y border-accent/20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-h3 mb-4">
                {language === "fr" ? "Ce Que Ce Parcours M'a Appris" : "What This Journey Taught Me"}
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {language === "fr"
                  ? "Construire Sonor était ambitieux. L'arrêter fut humiliant. Voici les leçons durement acquises qui ont façonné mon approche du product management."
                  : "Building Sonor was ambitious. Stopping it was humbling. Here are the hard-earned lessons that shaped my approach to product management."}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Learning 1: B2G sales cycles */}
              <div className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-lg transition-all">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                  <Clock className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-4">
                  {language === "fr" ? "Le B2G nécessite un capital patient" : "B2G requires patient capital"}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {language === "fr"
                    ? "18+ mois de cycle de vente moyen pour les municipalités. Nos €20K de financement étaient épuisés avant de signer le premier contrat."
                    : "18+ months average sales cycle for municipalities. Our €20K funding was exhausted before securing the first contract."}
                </p>
                <div className="p-4 bg-muted/30 rounded-lg border-l-4 border-accent">
                  <p className="text-sm italic text-foreground/80">
                    {language === "fr"
                      ? "« Le timing du product-market fit compte autant que le produit lui-même. J'ai appris à prendre en compte la vélocité de vente lors de l'évaluation des business models. »"
                      : '"Product-market fit timing matters as much as the product itself. I learned to factor in sales velocity when evaluating business models."'}
                  </p>
                </div>
              </div>

              {/* Learning 2: Data quality */}
              <div className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-lg transition-all">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                  <Database className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-4">
                  {language === "fr"
                    ? "La qualité de l'open data est le goulot"
                    : "Open data quality is the bottleneck"}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {language === "fr"
                    ? "Nous avons sous-estimé la complexité technique du traitement de datasets municipaux fragmentés et de faible qualité en insights actionnables."
                    : "We underestimated the technical complexity of processing fragmented, low-quality municipal datasets into actionable insights."}
                </p>
                <div className="p-4 bg-muted/30 rounded-lg border-l-4 border-accent">
                  <p className="text-sm italic text-foreground/80">
                    {language === "fr"
                      ? "« De grands produits nécessitent une grande infrastructure data. Je valide maintenant la disponibilité et qualité des données avant de m'engager sur des solutions data-driven. »"
                      : '"Great products require great data infrastructure. I now validate data availability and quality before committing to data-driven solutions."'}
                  </p>
                </div>
              </div>

              {/* Learning 3: Positioning clarity */}
              <div className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-lg transition-all">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-4">
                  {language === "fr" ? "La clarté bat la richesse fonctionnelle" : "Clarity beats feature richness"}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {language === "fr"
                    ? "Notre positionnement était flou entre plateforme SaaS et consulting. Les parties prenantes voulaient l'un ou l'autre, pas les deux."
                    : "Our positioning blurred between SaaS platform and consulting. Stakeholders wanted one or the other, not both."}
                </p>
                <div className="p-4 bg-muted/30 rounded-lg border-l-4 border-accent">
                  <p className="text-sm italic text-foreground/80">
                    {language === "fr"
                      ? "« Une proposition de valeur tranchée et différenciée est non-négociable. J'ai appris à simplifier impitoyablement le positionnement avant de construire des features. »"
                      : '"A sharp, differentiated value proposition is non-negotiable. I learned to ruthlessly simplify positioning before building features."'}
                  </p>
                </div>
              </div>
            </div>

            {/* Historical context callout */}
            <div className="mt-12 p-8 bg-card rounded-2xl border-2 border-accent/30">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 text-3xl">📅</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold mb-2 text-foreground">
                    {language === "fr" ? "Contexte historique" : "Historical context"}
                  </p>
                  <p className="text-base text-foreground/80 leading-relaxed">
                    {language === "fr"
                      ? "Ce projet s'est déroulé de 2020 à 2022, avant la révolution de l'IA générative. À l'époque, la visualisation d'open data pour les municipalités était un différenciateur novateur, et l'adoption du SaaS dans le secteur public commençait tout juste à s'accélérer. Aujourd'hui, ces apprentissages informent ma façon d'évaluer les technologies émergentes et le timing de marché."
                      : "This project ran from 2020-2022, before the generative AI revolution. At the time, open data visualization for municipalities was a novel differentiator, and SaaS adoption in the public sector was just beginning to accelerate. Today, these learnings inform how I evaluate emerging technologies and market timing."}
                  </p>
                </div>
              </div>
            </div>

            {/* Bridge to next role */}
            <div className="mt-12 p-8 bg-muted/20 rounded-2xl">
              <p className="text-lg leading-relaxed text-center">
                {language === "fr" ? (
                  <>
                    <strong>Ces apprentissages ont directement informé mon travail chez HUWISE,</strong> où j'ai aidé à
                    opérationnaliser l'optimisation de conversion avec un positionnement plus clair et des cycles
                    d'itération plus rapides—contribuant finalement à une croissance mesurable.
                  </>
                ) : (
                  <>
                    <strong>These learnings directly informed my work at HUWISE,</strong> where I helped operationalize
                    conversion optimization with clearer positioning and faster iteration cycles—ultimately contributing
                    to measurable growth.
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </ScrollRevealSection>

      {/* ========== SECTION: STAKEHOLDER TESTIMONIALS ========== */}
      <ScrollRevealSection variant="fade-in-up" delay={0.5}>
        <div id="testimonials" className="py-16 px-4 md:px-8 lg:px-12 bg-secondary border-b border-border/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-h3 mb-4">
                {language === 'fr' 
                  ? "Ce Que Les Décideurs En Ont Dit"
                  : "What Stakeholders Said"
                }
              </h2>
              <p className="text-lg text-muted-foreground">
                {language === 'fr'
                  ? "Retours de décideurs publics sur l'approche Sonor"
                  : "Feedback from public decision-makers on the Sonor approach"
                }
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Testimonial 1 - Pierre Ferrari */}
              <div className="bg-card p-6 rounded-2xl border border-border hover:border-accent/30 transition-all">
                <div className="mb-4">
                  <svg className="w-8 h-8 text-accent/30" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                  </svg>
                </div>
                <p className="text-base italic text-foreground/80 mb-6 leading-relaxed">
                  {language === 'fr'
                    ? "Une approche pertinente, engageant les citoyens, pour traiter le bruit et redynamiser les cœurs de ville."
                    : "A relevant approach, engaging citizens, to address noise and revitalize city centers."
                  }
                </p>
                <div className="pt-4 border-t border-border/50">
                  <p className="font-semibold text-sm">Pierre Ferrari</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {language === 'fr'
                      ? "Directeur Smart City & Stratégie Numérique, Ville d'Arras"
                      : "Smart City Director, City of Arras"
                    }
                  </p>
                </div>
              </div>
              
              {/* Testimonial 2 - C. de Clermont-Tonnerre */}
              <div className="bg-card p-6 rounded-2xl border border-border hover:border-accent/30 transition-all">
                <div className="mb-4">
                  <svg className="w-8 h-8 text-accent/30" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                  </svg>
                </div>
                <p className="text-base italic text-foreground/80 mb-6 leading-relaxed">
                  {language === 'fr'
                    ? "L'approche humaine et terrain proposée, est essentielle à la compréhension de l'ensemble des enjeux liés à la pollution sonore."
                    : "The human-centered, field-based approach is essential to understanding all issues related to noise pollution."
                  }
                </p>
                <div className="pt-4 border-t border-border/50">
                  <p className="font-semibold text-sm">C. de Clermont-Tonnerre</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {language === 'fr'
                      ? "Conseillère de Paris, Déléguée Urbanisme & Patrimoine"
                      : "Paris City Councillor, Urban Planning Delegate"
                    }
                  </p>
                </div>
              </div>
              
              {/* Testimonial 3 - Lauriane Rossi */}
              <div className="bg-card p-6 rounded-2xl border border-border hover:border-accent/30 transition-all">
                <div className="mb-4">
                  <svg className="w-8 h-8 text-accent/30" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                  </svg>
                </div>
                <p className="text-base italic text-foreground/80 mb-6 leading-relaxed">
                  {language === 'fr'
                    ? "La pollution sonore est une nuisance majeure, à laquelle Sonor apporte une solution pertinente."
                    : "Noise pollution is a major nuisance, to which Sonor provides a relevant solution."
                  }
                </p>
                <div className="pt-4 border-t border-border/50">
                  <p className="font-semibold text-sm">Lauriane Rossi</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {language === 'fr'
                      ? "Députée des Hauts-de-Seine, Présidente du Conseil National du Bruit"
                      : "Deputy, President of the National Noise Council"
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollRevealSection>

      {/* ========== SECTION 10: FAQ ========== */}
      <ScrollRevealSection variant="fade-in-up" delay={0.55}>
        <div id="faq" className="py-16 px-4 md:px-8 lg:px-12 bg-secondary border-b border-border/50">
          <div className="max-w-6xl mx-auto space-y-8 text-center">
            <div>
              <h2 className="text-h3 mb-4">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-4 text-left max-w-4xl mx-auto">
              <ExpandSection id="faq-1-en" title="Why did you stop the project?">
                <p>Three main reasons:</p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>
                    <b>Underestimated technical complexity</b>: Difficulty accessing and processing exploitable quality
                    open data
                  </li>
                  <li>
                    <b>Long B2G sales cycles</b>: 12-18 months minimum, funding exhaustion before 1st signature
                  </li>
                  <li>
                    <b>Blurred positioning</b>: Between SaaS platform and consulting support, not clear enough
                  </li>
                </ul>
              </ExpandSection>

              <ExpandSection id="faq-2-en" title="How did you fund the project?">
                <p>
                  <b>€20k</b> total via 2 grants:
                </p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>1st grant: Hackathon win Recoder l'Habitat #2</li>
                  <li>2nd grant: Matrice + Banque des Territoires support program</li>
                </ul>
              </ExpandSection>

              <ExpandSection id="faq-3-en" title="What was your commercial strategy?">
                <p>3 progressive phases over 2 years:</p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>
                    <b>Phase 1</b>: Broad exploration (developers, housing, municipalities)
                  </li>
                  <li>
                    <b>Phase 2</b>: Focus on data-aware municipalities
                  </li>
                  <li>
                    <b>Phase 3</b>: Refined targeting (data appetite + innovation culture, via LinkedIn)
                  </li>
                </ul>
              </ExpandSection>

              <ExpandSection id="faq-4-en" title="How did you segment municipalities?">
                <p>
                  By sensitivity to open data rather than size. Cities with established open data culture and structured
                  environment services were more receptive, regardless of size.
                </p>
              </ExpandSection>
            </div>
          </div>
        </div>
      </ScrollRevealSection>

      {/* ========== SECTION 10: "GO FURTHER" ========== */}
      <ScrollRevealSection variant="fade-in-up" delay={0.55}>
        <div className="py-16 px-4 md:px-8 lg:px-12 bg-background border-b border-border/50">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="text-center">
              <h2 className="text-h3 mb-4">Go Further</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Content 1 - Nightingale Article */}
              <a
                href="https://nightingaledvs.com/noisy-cities-behind-the-scenes-with-karim-douieb/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col p-6 rounded-lg bg-card border-2 border-transparent transition-all group"
              >
                <div className="h-20 flex items-center justify-center mb-4">
                  <img src="/img/nightingale.PNG" alt="Nightingale" className="h-full object-contain" />
                </div>
                <h3 className="text-h4 mb-2 flex-grow">Noisy Cities: Behind the Scenes with Karim Douïeb</h3>
                <p className="text-base text-foreground/80 leading-relaxed mb-4 flex-grow">
                  Discover how noise pollution open data maps of Paris, Brussels, and New-York were made.
                </p>
                <div className="flex items-center gap-2 text-accent text-sm hover:underline underline-offset-4 transition-all">
                  Read <ExternalLink className="w-4 h-4" />
                </div>
              </a>

              {/* Content 2 - Philosophie Magazine */}
              <a
                href="https://www.philomag.com/articles/une-foret-sur-ecoute"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col p-6 rounded-lg bg-card border-2 border-transparent transition-all group"
              >
                <div className="h-20 flex items-center justify-center mb-4">
                  <img
                    src="/img/philosophie-magazine.svg"
                    alt="Philosophie Magazine"
                    className="h-full object-contain"
                  />
                </div>
                <h3 className="text-h4 mb-2 flex-grow">Jura: A Forest Under Surveillance</h3>
                <p className="text-base text-foreground/80 leading-relaxed mb-4 flex-grow">
                  Discover how data is used to preserve one of Jura's most important forests.
                </p>
                <div className="flex items-center gap-2 text-accent text-sm hover:underline underline-offset-4 transition-all">
                  Read <ExternalLink className="w-4 h-4" />
                </div>
              </a>

              {/* Content 3 - TEDx */}
              <a
                href="https://www.youtube.com/watch?v=ewNTwBbLUhM"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col p-6 rounded-lg bg-card border-2 border-transparent transition-all group"
              >
                <div className="h-20 flex items-center justify-center mb-4">
                  <img src="/img/ted-logo.svg" alt="TED" className="h-full object-contain" />
                </div>
                <h3 className="text-h4 mb-2 flex-grow">TEDx: The benefits of the sound of silence</h3>
                <p className="text-base text-foreground/80 leading-relaxed mb-4 flex-grow">
                  TEDx by Mathias Basner telling the dangers of noise pollution and the benefits of silence.
                </p>
                <div className="flex items-center gap-2 text-accent text-sm hover:underline underline-offset-4 transition-all">
                  Watch <ExternalLink className="w-4 h-4" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </ScrollRevealSection>

      {/* ========== SECTION 11: ACKNOWLEDGMENTS ========== */}
      <div className="py-16 px-4 md:px-8 lg:px-12 bg-card border-b border-border/50">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-6">
            <h2 className="text-h3">Acknowledgments</h2>
            <p className="text-lg max-w-3xl mx-auto">
              This project would not have been possible without the support of Banque des Territoires and Matrice
              association, and the collaboration of my three co-founders: Émilie, Majda and Benjamin.
            </p>

            {/* Logos */}
            <div className="flex items-center justify-center gap-12 flex-wrap pt-6">
              {/* Sonor logo - NEW */}
              <div>
                <img src="/img/logo_sonor.png" alt="Sonor" className="h-24 object-contain" />
              </div>

              <div>
                <img
                  src="/img/banque-des-territoires-logo.png"
                  alt="Banque des Territoires"
                  className="h-24 object-contain"
                />
              </div>
              <div>
                <img src="/img/logo-matrice.png" alt="Association Matrice" className="h-24 object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========== SECTION 12: FINAL CTA ========== */}
      <div className="py-16 px-4 md:px-8 lg:px-12 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <CTABanner
            title="Interested in my product approach?"
            description="Recruiting an impact-oriented Product Manager with B2G experience and interest in data/public health topics? Let's discuss your product challenges."
            ctaText="Get in touch"
            onClick={() => navigate("/Contact")}
          />
        </div>
      </div>

      {/* Lightbox */}
      <ImageLightbox
        images={galleryImages}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={handleNavigate}
      />
    </>
  );
};
