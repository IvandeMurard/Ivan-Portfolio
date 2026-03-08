// src/pages/Sonor.tsx
// Case study SONOR - Structure unifiée avec Hero, Sidebar, TL;DR

import React from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/footer";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { CaseBreadcrumb } from "@/components/case-study/CaseBreadcrumb";
import { CaseStudyHero } from "@/components/case-study/CaseStudyHero";
import { CaseStudySidebar } from "@/components/case-study/CaseStudySidebar";
import { CaseStudyTLDR } from "@/components/case-study/CaseStudyTLDR";
import { useLanguage } from "@/contexts/LanguageContext";

import { ContentFR } from "./Sonor_ContentFR";
import { ContentEN } from "./Sonor_ContentEN";
import { BandeauAudio } from "./Sonor_Composants";

import sonorHero from "/img/image-banniere-sonor.jpg";

/**
 * SONOR Case Study Page
 *
 * Structure unifiée :
 * - Hero avec image de fond et outils
 * - Sidebar avec métadonnées projet
 * - TL;DR bilingue
 * - Contenu FR/EN selon la langue
 *
 * Chiffres validés :
 * - 20+ entretiens
 * - 4 co-fondateurs dont 1 dev/data-scientist à mi-temps
 * - 20 000€ financements
 * - 3+1 versions prototype
 * - 6+ jalons mensuels
 */

export default function SonorPage() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const sections = [
    { id: "context", label: language === "fr" ? "1. Contexte" : "1. Context" },
    { id: "role-approach", label: language === "fr" ? "2. Rôle" : "2. Role" },
    { id: "our-approach", label: language === "fr" ? "3. Solution" : "3. Solution" },
    { id: "timeline", label: language === "fr" ? "4. Process" : "4. Process" },
    { id: "prototype-gallery", label: language === "fr" ? "5. Prototype" : "5. Prototype" },
    { id: "obstacles", label: language === "fr" ? "6. Obstacles" : "6. Challenges" },
    { id: "results", label: language === "fr" ? "7. Impact" : "7. Impact" },
    { id: "learnings", label: language === "fr" ? "8. Learnings" : "8. Learnings" },
    { id: "faq", label: "9. FAQ" },
    { id: "go-further", label: language === "fr" ? "10. Plus" : "10. More" },
  ];

  const scrollToSection = (id: string) => {
    if (id === "home") {
      navigate("/");
    } else if (id === "contact") {
      navigate("/#contact");
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // TL;DR items bilingues
  const tldrItems =
    language === "fr"
      ? [
          {
            label: "Contexte",
            content:
              "Hackathon Recoder l'Habitat #2 (gagnant) → Incubation Matrice & Banque des Territoires (2020-2022)",
          },
          {
            label: "Problème",
            content: "Pollution sonore (2e nuisance urbaine), invisible mais avec des impacts sanitaires réels",
          },
          {
            label: "Solution",
            content:
              "Plateforme SaaS 360° : cartographie open data, recommandations d'actions publiques, engagement citoyen",
          },
          {
            label: "Mon rôle",
            content: "Cadrage produit, discovery, prototypage, commercial, encadrement data-scientist",
          },
        ]
      : [
          {
            label: "Context",
            content:
              "Recoder l'Habitat #2 Hackathon (winner) → Incubation Matrice & Banque des Territoires (2020-2022)",
          },
          {
            label: "Problem",
            content: "Noise pollution (2nd urban nuisance), invisible but with real health impacts",
          },
          {
            label: "Solution",
            content: "360° SaaS platform: open data mapping, public action recommendations, citizen engagement",
          },
          {
            label: "My role",
            content: "Product framing, discovery, prototyping, sales, data-scientist leadership",
          },
        ];

  // Sidebar metadata bilingue
  const sidebarProps =
    language === "fr"
      ? {
          role: "Co-fondateur & Product Lead",
          duration: "2 ans (2020-2022)",
          team: "4 co-fondateurs + 1 dev mi-temps",
          client: "Collectivités territoriales",
          industry: "GovTech / Smart City",
          context: "Startup incubée (Matrice, BdT)",
        }
      : {
          role: "Co-founder & Product Lead",
          duration: "2 years (2020-2022)",
          team: "4 co-founders + 1 part-time dev",
          client: "Local governments",
          industry: "GovTech / Smart City",
          context: "Incubated startup (Matrice, BdT)",
        };

  return (
    <div className="overflow-x-hidden" role="main">
      <Navigation />
      <ScrollProgressBar />
      <CaseBreadcrumb projectName="SONOR" />
      <ProgressIndicator sections={sections} />

      {/* Main Container */}
      <div className="container mx-auto px-4 lg:px-8 pt-20 pb-16 max-w-7xl">
        {/* Hero Section - Full width */}
        <div className="mb-8" id="hero">
          <CaseStudyHero
            title={
              language === "fr"
                ? "SONOR : transformer l'open data en rues plus calmes"
                : "SONOR : transforming open data into quieter streets"
            }
            backgroundImage={sonorHero}
            tools={[
              { name: "Figma", icon: "/img/figma-icon.svg" },
              { name: "Notion", icon: "/img/notion-icon.png" },
              { name: "Miro", icon: "/img/miro-icon.svg" },
              { name: "Trello", icon: "/img/trello-icon.svg" },
              { name: "Slack", icon: "/img/slack-icon.svg" },
              { name: "NoisePlanet", icon: "/img/noiseplanet-icon.svg" },
            ]}
          />
        </div>

        <div className="grid lg:grid-cols-[260px_1fr] gap-8 lg:gap-12">
          {/* Sidebar - Metadata with Logo */}
          <CaseStudySidebar {...sidebarProps} logo="/img/logo_sonor.png" logoAlt="SONOR logo" />

          {/* TL;DR + Audio Summary aligned with sidebar */}
          <div className="space-y-6">
            <section id="tldr">
              <CaseStudyTLDR items={tldrItems} />
            </section>

            {/* Audio Summary */}
            <BandeauAudio language={language} />
          </div>
        </div>

        {/* Main Content - Full width after sidebar */}
        <main className="w-full">{language === "fr" ? <ContentFR /> : <ContentEN />}</main>
      </div>

      {/* Footer */}
      <Footer
        siteName="Ivan de Murard"
        tagline={
          language === "fr"
            ? "Product Manager créant des expériences centrées sur l'utilisateur"
            : "Product Manager crafting user-centered experiences"
        }
        sections={[
          {
            id: "home",
            label: language === "fr" ? "Retour au Portfolio" : "Back to Portfolio",
          },
        ]}
        onSectionClick={scrollToSection}
        className="mt-16"
      />
    </div>
  );
}
