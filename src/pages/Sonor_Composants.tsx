// src/pages/Sonor_Composants.tsx
// FICHIER 1/4 : Composants réutilisables pour le case study SONOR
// Version conforme aux spécifications validées
// Chiffres corrigés : 20+ entretiens, 4 co-fondateurs (dont 1 dev/data-scientist à mi-temps)

import React, { useState, useRef, useEffect } from "react";
import { InlineExpand } from "@/components/InlineExpand";
import { Plus, Volume2, Play, Pause, X, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

// ============= COMPOSANT TERM EXPLAIN =============
export const TermExplain = ({ term, children }: { term: string; children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const id = `term-${term.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <span className="inline-block relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        className="
          relative inline-flex items-center gap-1
          text-foreground font-medium
          underline decoration-dotted decoration-accent/50 underline-offset-4
          hover:decoration-accent hover:text-accent
          transition-all duration-200
          cursor-help
        "
      >
        {term}
        <Plus className="w-3.5 h-3.5 opacity-60" />
      </button>

      <InlineExpand open={open} ariaId={id}>
        <div
          id={`${id}-panel`}
          className="
            absolute z-50 left-0 top-full mt-2
            min-w-[280px] max-w-[400px]
            p-4 rounded-xl
            bg-card/95 backdrop-blur-md
            border border-accent/30
            shadow-2xl
          "
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
              <Plus className="w-4 h-4 text-accent" />
            </div>
            <div className="flex-1">
              <strong className="block text-sm font-semibold text-accent mb-1">{term}</strong>
              <p className="text-sm text-muted-foreground leading-relaxed">{children}</p>
            </div>
          </div>
        </div>
      </InlineExpand>
    </span>
  );
};

// ============= COMPOSANT SECTION EXPANDABLE =============
export const ExpandSection = ({
  id,
  title,
  children,
  defaultOpen = false,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);

  // Split title at "?" to insert chevron immediately after
  const renderTitle = () => {
    const questionIndex = title.indexOf("?");
    if (questionIndex === -1) {
      return (
        <span className="font-semibold text-base md:text-lg group-hover:underline underline-offset-4">{title}</span>
      );
    }

    const beforeQuestion = title.slice(0, questionIndex + 1);
    const afterQuestion = title.slice(questionIndex + 1);

    return (
      <span className="font-semibold text-base md:text-lg group-hover:underline underline-offset-4 inline-flex items-center gap-1">
        <span>{beforeQuestion}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 inline-block ${open ? "rotate-180" : ""}`} />
        <span>{afterQuestion}</span>
      </span>
    );
  };

  return (
    <div className="space-y-3">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        className="flex items-start w-full group cursor-pointer"
      >
        {renderTitle()}
      </button>
      <InlineExpand open={open} ariaId={id}>
        <div id={`${id}-panel`} className="pt-2 space-y-3 text-base text-foreground/80 leading-relaxed">
          {children}
        </div>
      </InlineExpand>
    </div>
  );
};

// ============= COMPOSANT BANDEAU AUDIO =============
export const BandeauAudio = ({ language }: { language: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, []);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Audio uniquement en anglais pour l'instant
  const audioSrc = "/audio/sonor-audio-summary-en.mp3";

  // Calculate time remaining
  const timeRemaining = Math.ceil(duration - currentTime);
  const minutesRemaining = Math.floor(timeRemaining / 60);
  const secondsRemaining = timeRemaining % 60;
  const formattedTime = `${minutesRemaining}:${secondsRemaining.toString().padStart(2, "0")}`;

  return (
    <>
      {/* Main audio banner */}
      <div className="w-full p-4 md:p-6 bg-accent/5 border border-accent/20 rounded-2xl hover:bg-accent/10 transition-all relative">
        <div className="flex items-center gap-4 md:gap-6">
          {/* Content - Texte à gauche */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Volume2 className="w-4 h-4 md:w-5 md:h-5 text-accent" />
              <span className="text-xs md:text-sm font-semibold text-accent uppercase tracking-wider">
                {language === "fr" ? "Version Audio" : "Audio Summary"}
              </span>
            </div>
            <p className="text-sm md:text-base text-foreground/80">
              {language === "fr" ? "Écoutez le résumé du projet Sonor" : "Sonor project summary"}
            </p>
          </div>

          {/* Play button - Plus visible, à droite */}
          <button
            onClick={handlePlayPause}
            className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-full bg-accent hover:bg-accent/90 hover:scale-105 flex items-center justify-center transition-all shadow-xl ring-4 ring-accent/20"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="w-6 h-6 md:w-7 md:h-7 text-white" /> : <Play className="w-6 h-6 md:w-7 md:h-7 text-white ml-1" />}
          </button>

          {/* Waveform visualization - center - hidden on mobile */}
          {isPlaying && (
            <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="flex items-end gap-1 h-12">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-accent/60 rounded-full"
                    animate={{
                      height: ["20%", "100%", "20%"],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Duration - updated to show time remaining */}
          <div className="flex-shrink-0 text-right">
            <div className="text-xl md:text-2xl font-bold text-accent">
              {isPlaying ? formattedTime : language === "fr" ? "2 min" : "2 min"}
            </div>
            <div className="text-xs md:text-sm text-muted-foreground">
              {isPlaying ? (language === "fr" ? "restant" : "left") : language === "fr" ? "durée" : "duration"}
            </div>
          </div>
        </div>

        {/* Hidden audio element */}
        <audio
          ref={audioRef}
          src={audioSrc}
          onEnded={() => {
            setIsPlaying(false);
            setCurrentTime(0);
          }}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      </div>

      {/* Sticky floating player - très visible avec pulsation */}
      {isPlaying && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-32 right-8 z-40"
        >
          {/* Pulse ring animation */}
          <motion.div
            className="absolute inset-0 rounded-full bg-accent/30"
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-0 rounded-full bg-accent/20"
            animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          />
          
          <button
            onClick={handlePlayPause}
            className="relative w-16 h-16 rounded-full bg-accent shadow-2xl flex items-center justify-center hover:bg-accent/90 hover:scale-105 transition-all ring-4 ring-accent/30"
            aria-label="Pause audio"
          >
            <Pause className="w-7 h-7 text-white" />
          </button>
        </motion.div>
      )}
    </>
  );
};

// ============= COMPOSANT TABS APPROFONDIES =============
export const TabsApprofondir = ({ language }: { language: string }) => {
  return (
    <div className="space-y-8">
      <TabProcessPM language={language} />
    </div>
  );
};

// ============= TAB PROCESS PM =============
const TabProcessPM = ({ language }: { language: string }) => {
  if (language === "fr") {
    return (
      <div className="space-y-8">
        <section className="space-y-4">
          <h3 className="text-h4">Obstacles rencontrés</h3>
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-card border-l-4 border-destructive">
              <h4 className="font-semibold mb-2">Disponibilité données open data</h4>
              <p className="text-sm">
                Manque de données ouvertes fiables et standardisées sur la pollution sonore. Nécessité de normaliser les
                sources hétérogènes.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-card border-l-4 border-destructive">
              <h4 className="font-semibold mb-2">Complexité technique sous-estimée</h4>
              <p className="text-sm">
                Difficulté d'accès et de traitement des données de qualité en une cartographie exploitable.
                Ralentissement développement prototype.
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // English version
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h3 className="text-h4">Obstacles Encountered</h3>
        <div className="space-y-3">
          <div className="p-4 rounded-lg bg-card border-l-4 border-destructive">
            <h4 className="font-semibold mb-2">Open data availability</h4>
            <p className="text-sm">
              Lack of reliable and standardized open data on noise pollution. Need to normalize heterogeneous sources.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-card border-l-4 border-destructive">
            <h4 className="font-semibold mb-2">Underestimated technical complexity</h4>
            <p className="text-sm">
              Difficulty accessing and processing quality data into an exploitable map. Slowed prototype development.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
