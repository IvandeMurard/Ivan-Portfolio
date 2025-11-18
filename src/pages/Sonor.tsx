// src/pages/Sonor.tsx
// FICHIER 4/4 : Assembly final et export pour le case study SONOR
// Version complète conforme aux spécifications validées

import React from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { ContentFR } from "./Sonor_ContentFR";
import { ContentEN } from "./Sonor_ContentEN";

import sonorHero from "/img/image-banniere-sonor.jpg";

/**
 * SONOR Case Study Page
 * 
 * Structure complète :
 * - Fichier 1/4 : Sonor_Composants.tsx (composants réutilisables, tabs)
 * - Fichier 2/4 : Sonor_ContentFR.tsx (contenu français complet)
 * - Fichier 3/4 : Sonor_ContentEN.tsx (contenu anglais complet)
 * - Fichier 4/4 : Sonor_Final.tsx (ce fichier - assembly et export)
 * 
 * Chiffres validés :
 * - 20+ entretiens (pas 30)
 * - 4 co-fondateurs dont 1 dev/data-scientist à mi-temps
 * - 20 000€ financements
 * - 3+1 versions prototype
 * - 6+ jalons mensuels
 * 
 * Verbatims exacts (5) :
 * 1. Pivot stratégique (Conseil BdT/Matrice)
 * 2. L'insight qui a dilué le focus (Collectivité)
 * 3. Marque blanche (Issy-les-Moulineaux)
 * 4. Citation pollution sonore (hero/intro)
 * 5. Conclusion épilogue (Ivan)
 */

export default function SonorPage() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, 150]);

  const title = language === 'fr'
    ? "SONOR — Réduire la pollution sonore grâce à l'open data"
    : "SONOR — Reducing noise pollution with open data";

  const subtitle = language === 'fr'
    ? "Deux ans d'entrepreneuriat : du hackathon au prototype, avec Matrice & la Banque des Territoires"
    : "Two-year journey: from hackathon to prototype, with Matrice & Banque des Territoires";


  return (
    <div className="overflow-x-hidden">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section with Parallax */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        {/* Parallax background */}
        <motion.img
          src={sonorHero}
          alt="SONOR hero"
          style={{ y: parallaxY }}
          className="absolute inset-0 w-full h-[120%] object-cover"
        />
        
        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/90" />
        
        {/* Centered content with CTA */}
        <div className="absolute inset-0 flex flex-col justify-end items-center pb-16 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl"
          >
            <p className="text-sm uppercase tracking-widest text-white/80 mb-4">
              CASE STUDY — SONOR
            </p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              {title}
            </h1>
            <p className="text-lg md:text-2xl text-white/90">
              {subtitle}
            </p>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-white/60" />
        </motion.div>
      </section>

      {/* Content (switch FR/EN) */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        {language === 'fr' ? <ContentFR /> : <ContentEN />}
      </div>

      {/* Footer */}
      <Footer
        siteName="Ivan de Murard"
        tagline={language === 'fr' 
          ? "Product Designer & Manager créant des expériences centrées sur l'utilisateur"
          : "Product Designer & Manager crafting user-centered experiences"
        }
        sections={[
          { 
            id: "home", 
            label: language === 'fr' ? "Retour au Portfolio" : "Back to Portfolio" 
          }
        ]}
        onSectionClick={() => navigate("/")}
      />
    </div>
  );
}
