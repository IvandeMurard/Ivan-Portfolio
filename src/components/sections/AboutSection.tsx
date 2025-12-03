import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { SectionHeader } from "@/components/SectionHeader";
import { myApproachContent } from "@/data/myApproach";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { FilterChips } from "@/components/FilterChips";
import { Lightbulb, Wrench, Heart, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const aboutIcons = [Lightbulb, Wrench, Heart];

export function AboutSection() {
  const { language } = useLanguage();
  const content = myApproachContent[language];
  const prefersReducedMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState("about");
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null);

  const filterChips = [
    { id: "about", label: language === "fr" ? "À propos" : "About" },
    { id: "method", label: language === "fr" ? "Ma méthode" : "My Method" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] as const },
    },
  };

  return (
    <section id="about" className="py-24 px-4 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title={content.about.title}
          alignment="left"
          className="mb-8"
        />

        {/* Filter Chips */}
        <div className="mb-12">
          <FilterChips
            chips={filterChips}
            activeChip={activeTab}
            onChipChange={setActiveTab}
            disableSticky
          />
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "about" ? (
            <motion.div
              key="about"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {content.about.paragraphs.map((paragraph, idx) => {
                const Icon = aboutIcons[idx];
                return (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className={cn(
                      "group relative p-6 rounded-2xl",
                      "bg-card/60 backdrop-blur-md border border-border/50",
                      "hover:bg-card/80 hover:border-border/70 hover:shadow-lg",
                      "transition-all duration-300 ease-out",
                      "hover:-translate-y-1"
                    )}
                  >
                    {/* Icon */}
                    <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/15 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      {paragraph.title}
                    </h3>

                    {/* Content */}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {paragraph.content}
                    </p>

                    {/* Subtle gradient overlay on hover */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="method"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="space-y-6"
            >
              {/* Method subtitle */}
              <motion.p
                variants={itemVariants}
                className="text-muted-foreground text-sm md:text-base max-w-2xl"
              >
                {content.method.subtitle}
              </motion.p>

              {/* Phase cards grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.method.phases.map((phase, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className={cn(
                      "group relative rounded-2xl overflow-hidden",
                      "bg-card/60 backdrop-blur-md border border-border/50",
                      "hover:bg-card/80 hover:border-border/70",
                      "transition-all duration-300 ease-out",
                      expandedPhase === idx && "ring-2 ring-primary/30"
                    )}
                  >
                    {/* Header - always visible */}
                    <button
                      onClick={() => setExpandedPhase(expandedPhase === idx ? null : idx)}
                      className="w-full p-5 flex items-center gap-4 text-left"
                      aria-expanded={expandedPhase === idx}
                    >
                      {/* Emoji icon */}
                      <span className="text-3xl group-hover:scale-110 transition-transform">
                        {phase.icon}
                      </span>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground">
                          {phase.title}
                        </h4>
                        <p className="text-sm text-muted-foreground truncate">
                          {phase.description}
                        </p>
                      </div>

                      {/* Expand indicator */}
                      <ChevronDown
                        className={cn(
                          "w-5 h-5 text-muted-foreground transition-transform duration-300",
                          expandedPhase === idx && "rotate-180"
                        )}
                      />
                    </button>

                    {/* Expandable content */}
                    <AnimatePresence>
                      {expandedPhase === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 pt-0">
                            <ul className="space-y-2 pl-12">
                              {phase.points.map((point, pointIdx) => (
                                <motion.li
                                  key={pointIdx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: pointIdx * 0.05 }}
                                  className="text-sm text-muted-foreground flex items-start gap-2"
                                >
                                  <span className="text-primary mt-1">•</span>
                                  {point}
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Phase number indicator */}
                    <div className="absolute top-4 right-4 text-xs font-mono text-muted-foreground/50">
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
