// src/pages/Sonor_ContentFR.tsx
// FICHIER 2/4 : Contenu français complet pour le case study SONOR
// Version conforme aux spécifications validées - Chiffres corrigés

import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CaseImage } from "@/components/case/CaseImage";
import { CTABanner } from "@/components/work/CTABanner";
import { ExternalLink, Play, Info, MapPin, Target, Users, BarChart, Clock, Database, X } from "lucide-react";
import { ScrollRevealSection } from "@/components/case/ScrollRevealSection";
import { TimelineItem } from "@/components/case/TimelineItem";
import { ImageLightbox } from "@/components/ImageLightbox";
import { useLanguage } from "@/contexts/LanguageContext";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { TermExplain, ExpandSection, BandeauAudio, TabsApprofondir } from "./Sonor_Composants";

// ============= CONTENT FR =============
export const ContentFR = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const tabsRef = useRef<HTMLDivElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const galleryImages = [
    {
      src: "/img/sonor-noise-thresholds.png",
      alt: language === "fr" ? "Échelle des niveaux sonores et seuils de danger" : "Noise level scale and danger thresholds",
      caption: language === "fr" ? "Échelle des niveaux sonores et seuils de danger" : "Noise level scale and danger thresholds",
    },
    {
      src: "/img/Sonor-notre-approche.webp",
      alt: "Tableau de bord de cartographie — Points chauds et indicateurs en temps réel",
      caption: "Tableau de bord de cartographie — Points chauds et indicateurs en temps réel",
    },
    {
      src: "/img/sonor_recommandations.png",
      alt: "Recommandations actions",
      caption: "Recommandations actionnables — Tâches priorisées par zone",
    },
    {
      src: "/img/sonor_issy_marque_blanche.png",
      alt: "Marque blanche Issy",
      caption: "Intégration marque blanche — Issy-les-Moulineaux",
    },
    {
      src: "/img/sonor_engagement_citoyen.png",
      alt: "Engagement citoyen",
      caption: "Engagement citoyen — Dépôt d'alerte qualifiée",
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
      {/* ========== SECTION: CONTEXT ========== */}
      <ScrollRevealSection variant="fade-in-up" delay={0}>
        <div id="context" className="py-16 px-4 md:px-8 lg:px-12 bg-background border-b border-border/50">
          <div className="w-full space-y-12">
            <h2 className="text-h3 mb-12">
              {language === "fr" ? "1. Contexte & Problème" : "1. Context & Problem"}
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
                      Unlike air pollution, noise remains <strong>invisible</strong> and{" "}
                      <strong>under-addressed</strong> by public policies, despite its considerable social cost.
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
      </ScrollRevealSection>

      {/* ========== SECTION 2: MY ROLE & APPROACH ========== */}
      <ScrollRevealSection variant="fade-in-up" delay={0.05}>
        <div id="role-approach" className="py-16 px-4 md:px-8 lg:px-12 bg-secondary border-b border-border/50">
          <div className="w-full space-y-8">
            <h2 className="text-h3 mb-8">
              {language === "fr" ? "2. Mon Rôle & Approche" : "2. My Role & Approach"}
            </h2>
            
            <p className="text-lg leading-relaxed max-w-4xl">
              {language === "fr"
                ? "En tant que Co-fondateur & Product Lead, j'ai piloté l'ensemble du cycle produit, de la discovery à la commercialisation, en collaboration avec 3 co-fondateurs et 1 développeur/data-scientist à mi-temps."
                : "As Co-founder & Product Lead, I drove the entire product cycle, from discovery to go-to-market, in collaboration with 3 co-founders and 1 part-time developer/data-scientist."}
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-card rounded-xl border border-border">
                <h3 className="font-semibold text-lg mb-3">
                  {language === "fr" ? "Discovery & Stratégie" : "Discovery & Strategy"}
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    {language === "fr" ? "20+ entretiens parties prenantes" : "20+ stakeholder interviews"}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    {language === "fr" ? "Cadrage produit et définition du MVP" : "Product framing and MVP definition"}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    {language === "fr" ? "Pivot stratégique privé → public" : "Strategic pivot private → public sector"}
                  </li>
                </ul>
              </div>
              <div className="p-6 bg-card rounded-xl border border-border">
                <h3 className="font-semibold text-lg mb-3">
                  {language === "fr" ? "Exécution & Leadership" : "Execution & Leadership"}
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    {language === "fr" ? "Prototypage Figma (3 versions)" : "Figma prototyping (3 versions)"}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    {language === "fr" ? "Encadrement data-scientist (pipeline données)" : "Data-scientist mentorship (data pipeline)"}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    {language === "fr" ? "Commercial : 8+ villes, 2 propositions" : "Sales: 8+ cities, 2 proposals"}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </ScrollRevealSection>

      {/* ========== SECTION 3: PRODUCT VISION (Solution) ========== */}
      <ScrollRevealSection variant="fade-in-up" delay={0.1}>
        <div id="our-approach" className="py-16 px-4 md:px-8 lg:px-12 bg-background border-b border-border/50">
          <div className="w-full space-y-12">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-h3 mb-4">
                {language === "fr"
                  ? "3. Solution : Notre Hypothèse Produit"
                  : "3. Solution: Our Product Hypothesis"}
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
                    : "Empower residents to report noise issues and track city responses"
                  }
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
          <div className="w-full">
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
            
            {/* Loom Video - Inline Player */}
            <div className="relative max-w-4xl mx-auto">
              {!videoModalOpen ? (
                /* GIF Preview - Click to play video inline */
                <button
                  onClick={() => setVideoModalOpen(true)}
                  className="group block relative w-full overflow-hidden rounded-2xl border-2 border-border shadow-lg hover:shadow-2xl transition-all cursor-pointer"
                  aria-label={language === "fr" ? "Voir la vidéo de démonstration" : "Watch demo video"}
                >
                  <img
                    src="https://cdn.loom.com/sessions/thumbnails/80aea87ed30245bdb4a0847abbda7aae-4b03249d605da29f-full-play.gif"
                    alt={language === "fr" ? "Démonstration vidéo de la plateforme Sonor" : "Sonor platform video demo"}
                    className="w-full"
                    loading="lazy"
                  />
                  {/* Play overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/90 group-hover:bg-white group-hover:scale-110 transition-all flex items-center justify-center shadow-2xl">
                      <Play className="w-8 h-8 text-accent ml-1" fill="currentColor" />
                    </div>
                  </div>
                </button>
              ) : (
                /* Inline Loom Video Player */
                <div className="relative w-full rounded-2xl overflow-hidden border-2 border-border shadow-2xl">
                  {/* Close button to return to GIF */}
                  <button
                    onClick={() => setVideoModalOpen(false)}
                    className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
                    aria-label={language === "fr" ? "Fermer la vidéo" : "Close video"}
                  >
                    <X className="w-4 h-4" />
                  </button>
                  
                  {/* Video embed */}
                  <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      src="https://www.loom.com/embed/80aea87ed30245bdb4a0847abbda7aae?autoplay=1"
                      frameBorder="0"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                      allow="autoplay; fullscreen"
                    />
                  </div>
                </div>
              )}

              {/* Caption + CTA to visit site */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                <p className="text-sm text-muted-foreground">
                  {videoModalOpen 
                    ? (language === "fr" ? "Vidéo en cours de lecture" : "Video playing")
                    : (language === "fr" ? "Cliquez pour voir la vidéo complète" : "Click to watch the full video")
                  }
                </p>
                <a
                  href="https://sonor.dorik.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-full font-medium hover:bg-accent/90 transition-colors shadow-lg"
                >
                  {language === "fr" ? "Visiter le Site" : "Visit Live Site"}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
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

      {/* ========== SECTION 4: PROCESS & KEY DECISIONS ========== */}
      <ScrollRevealSection variant="fade-in-up" delay={0.15}>
        <div id="timeline" className="py-16 px-4 md:px-8 lg:px-12 bg-background border-b border-border/50">
          <div className="w-full space-y-12">
            <h2 className="text-h3">
              {language === "fr" ? "4. Processus & Décisions Clés" : "4. Process & Key Decisions"}
            </h2>

            {/* Timeline */}
            <div className="space-y-8">
              {[
                {
                  date: "Oct. 2020",
                  title: language === "fr" ? "Hackathon" : "Hackathon",
                  desc: language === "fr" ? "Victoire Recoder l'Habitat #2 → incubation Matrice/BdT" : "Recoder l'Habitat #2 win → Matrice/BdT incubation",
                },
                {
                  date: language === "fr" ? "Oct. 2020 - Janv. 2021" : "Oct. 2020 - Jan. 2021",
                  title: "Discovery",
                  desc: language === "fr" ? "20+ entretiens, exploration acteurs privés" : "20+ interviews, private sector exploration",
                },
                { 
                  date: language === "fr" ? "Janv. 2021" : "Jan. 2021", 
                  title: "Pivot", 
                  desc: language === "fr" ? "Décision stratégique → focus collectivités" : "Strategic decision → focus municipalities" 
                },
                { 
                  date: language === "fr" ? "Janv. - Avril 2021" : "Jan. - April 2021", 
                  title: "Prototype", 
                  desc: language === "fr" ? "3 versions Figma + évolution marque blanche" : "3 Figma versions + white-label evolution" 
                },
                { 
                  date: language === "fr" ? "Mai 2021 - Mars 2022" : "May 2021 - March 2022", 
                  title: "Go-to-market", 
                  desc: language === "fr" ? "20+ villes, 2 propales, cycles longs" : "20+ cities, 2 proposals, long cycles" 
                },
                { 
                  date: language === "fr" ? "Mars 2022" : "March 2022", 
                  title: language === "fr" ? "Fin" : "End", 
                  desc: language === "fr" ? "Épuisement financements, 0 signature" : "Funding exhaustion, 0 signature" 
                },
              ].map((step, i, arr) => (
                <TimelineItem
                  key={i}
                  date={step.date}
                  title={step.title}
                  description={step.desc}
                  index={i}
                  isLast={i === arr.length - 1}
                />
              ))}
            </div>

            {/* Key Decisions */}
            <div className="mt-12">
              <h3 className="text-xl font-semibold mb-6">
                {language === "fr" ? "Décisions stratégiques" : "Strategic Decisions"}
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {/* Decision 1 */}
                <div className="p-6 rounded-xl bg-card border border-border hover:border-accent/30 transition-all">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <span className="text-lg font-bold text-accent">1</span>
                  </div>
                  <h4 className="font-semibold mb-2">
                    {language === "fr" ? "Pivot B2C → B2G" : "B2C → B2G Pivot"}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {language === "fr" 
                      ? "Focus sur les collectivités après conseil des incubateurs. Les municipalités ont les moyens d'agir durablement."
                      : "Focus on municipalities after incubator advice. Cities have the means to act sustainably."}
                  </p>
                </div>

                {/* Decision 2 */}
                <div className="p-6 rounded-xl bg-card border border-destructive/30 hover:border-destructive/50 transition-all">
                  <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
                    <span className="text-lg font-bold text-destructive">2</span>
                  </div>
                  <h4 className="font-semibold mb-2">
                    {language === "fr" ? "Offre 360° (erreur)" : "360° Offering (mistake)"}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {language === "fr"
                      ? "Tentative de répondre à tous les besoins (plateforme + accompagnement). Résultat : positionnement flou."
                      : "Trying to address all needs (platform + consulting). Result: blurred positioning."}
                  </p>
                </div>

                {/* Decision 3 */}
                <div className="p-6 rounded-xl bg-card border border-border hover:border-accent/30 transition-all">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <span className="text-lg font-bold text-accent">3</span>
                  </div>
                  <h4 className="font-semibold mb-2">
                    {language === "fr" ? "Marque blanche" : "White-label"}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {language === "fr"
                      ? "Pivot vers composant intégrable après feedback : les collectivités veulent garder leurs citoyens sur leur portail."
                      : "Pivot to embeddable component after feedback: cities want to keep citizens on their portal."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollRevealSection>

      {/* ========== SECTION 5: PROTOTYPE & DELIVERABLES ========== */}
      <ScrollRevealSection variant="fade-in-up" delay={0.2}>
        <div id="prototype-gallery" className="py-16 px-4 md:px-8 lg:px-12 bg-secondary border-b border-border/50">
          <div className="w-full space-y-8">
            <div className="space-y-6">
              <h2 className="text-h3">
                {language === "fr" ? "5. Prototype & Livrables" : "5. Prototype & Deliverables"}
              </h2>

              {/* Iframe Figma - visible par défaut */}
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-h4">Prototype interactif Figma</h3>
                  <a
                    href="https://www.figma.com/proto/OcBu81qdpjpPdjHQPA6oae/Sonor-Site-Mairie?node-id=25-0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg border border-accent/30 hover:border-accent/50 transition-all group"
                  >
                    <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">Ouvrir dans Figma</span>
                  </a>
                </div>

                <div className="relative bg-muted rounded-xl overflow-hidden border border-border/50 shadow-lg hover:shadow-xl transition-shadow">
                  <iframe
                    style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}
                    className="w-full h-[600px] md:h-[750px] lg:h-[850px]"
                    src="https://embed.figma.com/proto/OcBu81qdpjpPdjHQPA6oae/Sonor-Site-Mairie?node-id=25-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=25%3A0&embed-host=share"
                    allowFullScreen
                    title="Prototype Figma interactif Sonor"
                  />
                </div>

                <div className="mt-4 p-4 bg-card/50 rounded-lg border border-border/30">
                  <p className="text-sm text-foreground/70 flex items-start gap-2">
                    <Info className="w-4 h-4 mt-0.5 text-accent flex-shrink-0" />
                    <span>
                      💡 <b>Astuce :</b> Cliquez sur le prototype pour interagir avec lui. Utilisez les contrôles de
                      navigation pour explorer les différents écrans. Pour une meilleure expérience, ouvrez-le en plein
                      écran avec le bouton ci-dessus.
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Galerie prototype en grid - skip first image (already in Context section) */}
            <section className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {galleryImages.slice(1).map((img, i) => (
                  <CaseImage
                    key={i}
                    onClick={() => openLightbox(i + 1)}
                    desktopSrc={img.src}
                    alt={img.alt}
                    caption={img.caption}
                  />
                ))}
              </div>
            </section>

            {/* Lien démo avec CTA visuel */}
            <div className="relative p-8 rounded-xl overflow-hidden bg-gradient-to-br from-accent/20 via-primary/10 to-accent/5 border border-accent/30 hover:border-accent/50 transition-all group">
              {/* Background gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10 flex items-center justify-between flex-wrap gap-6">
                <div className="space-y-2">
                  <h4 className="text-xl font-semibold flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    Prototype fonctionnel
                  </h4>
                  <p className="text-sm text-muted-foreground">Explorez le web component marque-blanche</p>
                </div>
                <a
                  href="https://byronbark.github.io/sonor-web-component/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-accent-foreground rounded-xl hover:scale-105 hover:shadow-xl transition-all duration-300 font-semibold"
                >
                  <Play className="w-5 h-5 fill-current" />
                  Ouvrir la démo
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </ScrollRevealSection>

      {/* ========== SECTION: STAKEHOLDER TESTIMONIALS ========== */}
      <ScrollRevealSection variant="fade-in-up" delay={0.225}>
        <div id="testimonials" className="py-16 px-4 md:px-8 lg:px-12 bg-secondary border-b border-border/50">
          <div className="w-full">
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

      {/* ========== CTA MID-PAGE ========== */}
      <CTABanner
        title={language === "fr" ? "Prêt à construire l'avenir ?" : "Ready to build the future?"}
        description={language === "fr" 
          ? "Discutons de votre vision produit et construisons quelque chose de génial ensemble"
          : "Let's discuss your product vision and build something great together"
        }
        ctaText={language === "fr" ? "Discutons !" : "Let's talk!"}
        onClick={() => navigate("/#contact")}
      />

      {/* ========== SECTION 6: OBSTACLES (moved into Impact) ========== */}
      <ScrollRevealSection variant="fade-in-up" delay={0.3}>
        <div id="obstacles" className="py-16 px-4 md:px-8 lg:px-12 bg-background border-b border-border/50">
          <div className="w-full space-y-8">
            <h2 className="text-h3">
              {language === "fr" ? "6. Obstacles Rencontrés" : "6. Challenges Faced"}
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-card border-l-4 border-destructive">
                <h4 className="font-semibold mb-2">Disponibilité données open data</h4>
                <p className="text-base">
                  Manque de données ouvertes fiables et standardisées sur la pollution sonore. Nécessité de normaliser
                  les sources hétérogènes.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-card border-l-4 border-destructive">
                <h4 className="font-semibold mb-2">Complexité technique sous-estimée</h4>
                <p className="text-base">
                  Difficulté d'accès et de traitement des données de qualité en une cartographie exploitable.
                  Ralentissement développement prototype.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ScrollRevealSection>

      {/* ========== SECTION 7: IMPACT ========== */}
      <ScrollRevealSection variant="fade-in-up" delay={0.3}>
        <div id="results" className="py-16 px-4 md:px-8 lg:px-12 bg-card border-b border-border/50">
          <div className="w-full space-y-8">
            <h2 className="text-h3">
              {language === "fr" ? "7. Impact & Résultats" : "7. Impact & Results"}
            </h2>

            {/* Chiffres clés */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-card/80 backdrop-blur-sm p-6 rounded-2xl border border-border/50 hover:border-accent/30 transition-colors">
                <div className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  20 000 €
                </div>
                <div className="text-muted-foreground text-sm">Financements obtenus (3 bourses)</div>
              </div>
              <div className="bg-card/80 backdrop-blur-sm p-6 rounded-2xl border border-border/50 hover:border-accent/30 transition-colors">
                <div className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  20+
                </div>
                <div className="text-muted-foreground text-sm">Entretiens qualitatifs</div>
              </div>
              <div className="bg-card/80 backdrop-blur-sm p-6 rounded-2xl border border-border/50 hover:border-accent/30 transition-colors">
                <div className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  3+1
                </div>
                <div className="text-muted-foreground text-sm">Versions prototype (Figma + codé)</div>
              </div>
              <div className="bg-card/80 backdrop-blur-sm p-6 rounded-2xl border border-border/50 hover:border-accent/30 transition-colors">
                <div className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  8+
                </div>
                <div className="text-muted-foreground text-sm">Métropoles et villes rencontrées</div>
              </div>
            </div>
          </div>
        </div>
      </ScrollRevealSection>

      {/* ========== SECTION 8: KEY LEARNINGS ========== */}
      <ScrollRevealSection variant="fade-in-up" delay={0.35}>
        <div id="learnings" className="py-20 px-4 md:px-8 lg:px-12 bg-accent/5 border-y border-accent/20">
          <div className="w-full">
            <div className="text-center mb-12">
              <h2 className="text-h3 mb-4">
                {language === "fr" ? "8. Apprentissages Clés" : "8. Key Learnings"}
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {language === "fr"
                  ? "Construire Sonor a confirmé mon goût pour la transformation de problématiques en solutions data-driven et m'a permis d'acquérir une expérience précieuse en product management 0-1."
                  : "Building Sonor confirmed my passion for transforming problems into data-driven solutions and gave me valuable experience in 0-1 product management."}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* Learning 1: B2G sales cycles */}
              <div className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-lg transition-all">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                  <Clock className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-4">
                  {language === "fr" ? "Le B2G necessite un capital patient" : "B2G requires patient capital"}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {language === "fr"
                    ? "18+ mois de cycle de vente moyen pour les municipalites. Nos 20K de financement etaient epuises avant de signer le premier contrat."
                    : "18+ months average sales cycle for municipalities. Our 20K funding was exhausted before securing the first contract."}
                </p>
                <div className="p-4 bg-muted/30 rounded-lg border-l-4 border-accent">
                  <p className="text-sm italic text-foreground/80">
                    {language === "fr"
                      ? "Le timing du product-market fit compte autant que le produit lui-meme."
                      : "Product-market fit timing matters as much as the product itself."}
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
                    ? "La qualite de l'open data est le goulot"
                    : "Open data quality is the bottleneck"}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {language === "fr"
                    ? "Nous avons sous-estime la complexite technique du traitement de datasets municipaux fragmentes en insights actionnables."
                    : "We underestimated the technical complexity of processing fragmented municipal datasets into actionable insights."}
                </p>
                <div className="p-4 bg-muted/30 rounded-lg border-l-4 border-accent">
                  <p className="text-sm italic text-foreground/80">
                    {language === "fr"
                      ? "De grands produits necessitent une grande infrastructure data."
                      : "Great products require great data infrastructure."}
                  </p>
                </div>
              </div>

              {/* Learning 3: Positioning clarity */}
              <div className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-lg transition-all">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-4">
                  {language === "fr" ? "La clarte bat la richesse fonctionnelle" : "Clarity beats feature richness"}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {language === "fr"
                    ? "Notre positionnement etait flou entre plateforme SaaS et consulting. Les parties prenantes voulaient l'un ou l'autre, pas les deux."
                    : "Our positioning blurred between SaaS platform and consulting. Stakeholders wanted one or the other, not both."}
                </p>
                <div className="p-4 bg-muted/30 rounded-lg border-l-4 border-accent">
                  <p className="text-sm italic text-foreground/80">
                    {language === "fr"
                      ? "Une proposition de valeur tranchee est non-negociable."
                      : "A sharp value proposition is non-negotiable."}
                  </p>
                </div>
              </div>
            </div>

            {/* What I would do differently */}
            <div className="p-8 bg-card rounded-2xl border border-border">
              <h3 className="text-xl font-semibold mb-6">
                {language === "fr" ? "Si c'était à refaire" : "If I had to do it again"}
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-start gap-3">
                  <span className="text-accent font-bold">1.</span>
                  <p className="text-muted-foreground">
                    {language === "fr" 
                      ? "Choisir 1 MVP dès le départ plutôt qu'une offre 360°" 
                      : "Choose 1 MVP from the start rather than a 360-degree offering"}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-accent font-bold">2.</span>
                  <p className="text-muted-foreground">
                    {language === "fr" 
                      ? "Valider la complexité technique avant de promettre" 
                      : "Validate technical complexity before making promises"}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-accent font-bold">3.</span>
                  <p className="text-muted-foreground">
                    {language === "fr" 
                      ? "Construire un prototype fonctionnel plus tôt" 
                      : "Build a functional prototype earlier"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollRevealSection>

      {/* ========== SECTION 9: FAQ ========== */}
      <ScrollRevealSection variant="fade-in-up" delay={0.55}>
        <div id="faq" className="py-16 px-4 md:px-8 lg:px-12 bg-secondary border-b border-border/50">
          <div className="w-full space-y-8 text-center">
            <div>
              <h2 className="text-h3 mb-4">
                {language === "fr" ? "9. Questions Frequentes" : "9. Frequently Asked Questions"}
              </h2>
            </div>

            <div className="space-y-4 text-left max-w-4xl mx-auto">
              <ExpandSection id="faq-1" title="Pourquoi avoir arrêté le projet ?">
                <p>Trois raisons principales :</p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>
                    <b>Complexité technique sous-estimée</b> : Difficulté accès et traitement données open data qualité
                    exploitable
                  </li>
                  <li>
                    <b>Cycles vente B2G longs</b> : Epuisement des financements avant la 1ère signature
                  </li>
                  <li>
                    <b>Positionnement flou</b> : Entre plateforme SaaS et accompagnement conseil, pas assez clair
                  </li>
                </ul>
              </ExpandSection>

              <ExpandSection id="faq-2" title="Comment financiez-vous le projet ?">
                <p>
                  <b>20 000€</b> au total via 3 bourses :
                </p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>1ère bourse : Victoire hackathon Recoder l'Habitat #2</li>
                  <li>2ème et 3ème bourse : Programme d'accompagnement Matrice + Banque des Territoires</li>
                </ul>
              </ExpandSection>

              <ExpandSection id="faq-3" title="Quelle était votre stratégie commerciale ?">
                <p>3 phases progressives sur 2 ans :</p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>
                    <b>Phase 1</b> : Exploration large (promoteurs, bailleurs, collectivités)
                  </li>
                  <li>
                    <b>Phase 2</b> : Focus collectivités sensibilisées data
                  </li>
                  <li>
                    <b>Phase 3</b> : Ciblage affiné (appétence data + culture innovation, via LinkedIn)
                  </li>
                </ul>
              </ExpandSection>

              <ExpandSection id="faq-4" title="Comment segmentiez-vous les collectivités ?">
                <p>
                  Par <b>appétence et sensibilisation à la donnée</b> plutôt que par taille. Les villes avec culture
                  open data établie et services environnement structurés étaient plus réceptives, quelle que soit leur
                  taille.
                </p>
              </ExpandSection>
            </div>
          </div>
        </div>
      </ScrollRevealSection>

      {/* ========== SECTION 10: GO FURTHER ========== */}
      <ScrollRevealSection variant="fade-in-up" delay={0.55}>
        <div id="go-further" className="py-16 px-4 md:px-8 lg:px-12 bg-background border-b border-border/50">
          <div className="w-full space-y-8">
            <div className="text-center">
              <h2 className="text-h3 mb-4">
                {language === "fr" ? "10. Pour Aller Plus Loin" : "10. Go Further"}
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Contenu 1 - Article Nightingale */}
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
                  Lire <ExternalLink className="w-4 h-4" />
                </div>
              </a>

              {/* Contenu 2 - Philosophie Magazine */}
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
                <h3 className="text-h4 mb-2 flex-grow">Des silences naturels aux bruits urbains</h3>
                <p className="text-base text-foreground/80 leading-relaxed mb-4 flex-grow">
                  Enregistrement sonore de la forêt du Risoux pour contraster espace naturel et ville
                </p>
                <div className="flex items-center gap-2 text-accent text-sm hover:underline underline-offset-4 transition-all">
                  Lire <ExternalLink className="w-4 h-4" />
                </div>
              </a>

              {/* Contenu 3 - TEDx */}
              <a
                href="https://www.youtube.com/watch?v=ewNTwBbLUhM"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col p-6 rounded-lg bg-card border-2 border-transparent transition-all group"
              >
                <div className="h-20 flex items-center justify-center mb-4">
                  <img src="/img/ted-logo.svg" alt="TED" className="h-full object-contain" />
                </div>
                <h3 className="text-h4 mb-2 flex-grow">Visualiser les villes bruyantes</h3>
                <p className="text-base text-foreground/80 leading-relaxed mb-4 flex-grow">
                  TEDx Brussels par Karim Douieb sur la méthodologie dataviz pollution sonore
                </p>
                <div className="flex items-center gap-2 text-accent text-sm hover:underline underline-offset-4 transition-all">
                  Regarder <ExternalLink className="w-4 h-4" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </ScrollRevealSection>

      {/* ========== SECTION 11: REMERCIEMENTS ========== */}
      <div className="py-16 px-4 md:px-8 lg:px-12 bg-card border-b border-border/50">
        <div className="w-full space-y-8">
          <div className="text-center space-y-6">
            <h2 className="text-h3">Remerciements</h2>
            <p className="text-lg max-w-3xl mx-auto">
              Ce projet n'aurait pas été possible sans l'accompagnement de la Banque des Territoires et l'association
              Matrice, et la collaboration de mes trois co-fondateurs : Émilie, Majda et Benjamin.
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

      {/* ========== SECTION 12: CTA FINAL ========== */}
      <CTABanner
        title={language === "fr" ? "Prêt à construire l'avenir ?" : "Ready to build the future?"}
        description={language === "fr" 
          ? "Discutons de votre vision produit et construisons quelque chose de génial ensemble"
          : "Let's discuss your product vision and build something great together"
        }
        ctaText={language === "fr" ? "Discutons !" : "Let's talk!"}
        onClick={() => navigate("/#contact")}
      />

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
