import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpotlightCursor } from "@/components/effects/SpotlightCursor";
import { TextRevealLines } from "@/components/TextReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface HeroKineticProps {
  name: string;
  title: string;
  subtitle: string;
  proofPoints: string[];
  ctaViewWork: string;
  ctaContact: string;
  onScrollToWork: () => void;
  onScrollToContact: () => void;
}

/**
 * HeroKinetic - Hero section with spotlight cursor effect and kinetic typography
 * Features scroll-triggered parallax and text reveal animations
 */
export function HeroKinetic({
  name,
  title,
  subtitle,
  proofPoints,
  ctaViewWork,
  ctaContact,
  onScrollToWork,
  onScrollToContact,
}: HeroKineticProps) {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Scroll-triggered parallax
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, -50]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.3]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.98]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative px-4 py-12 md:py-16 overflow-visible bg-contact text-contact-foreground"
    >
      {/* Spotlight cursor effect - desktop only */}
      <SpotlightCursor
        containerRef={containerRef}
        size={500}
        color="0 0% 100%"
        intensity={0.08}
      />

      {/* Container principal with parallax */}
      <motion.div
        className="mx-auto max-w-[1400px] w-full relative z-10"
        style={{
          padding: "clamp(24px, 4vw, 80px)",
          y: prefersReducedMotion ? 0 : parallaxY,
          opacity: prefersReducedMotion ? 1 : opacity,
          scale: prefersReducedMotion ? 1 : scale,
        }}
      >
        {/* Desktop Version */}
        <div className="hidden md:block">
          <div className="max-w-4xl">
            {/* Name + Title with reveal effect */}
            {prefersReducedMotion ? (
              <>
                <h1
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-[900] tracking-tight text-white leading-[0.9]"
                  style={{ fontFamily: "Inter" }}
                >
                  {name}
                </h1>
                <p
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif italic text-white mt-2 md:mt-3"
                  style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500 }}
                >
                  {title}
                </p>
              </>
            ) : (
              <TextRevealLines
                lines={[
                  {
                    text: name,
                    as: "h1",
                    className:
                      "text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-[900] tracking-tight text-white leading-[0.9]",
                    style: { fontFamily: "Inter" },
                  },
                  {
                    text: title,
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

            {/* Subtitle with stagger fade */}
            <motion.p
              className="text-base sm:text-lg md:text-xl text-white mt-6 md:mt-8 leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: prefersReducedMotion ? 0 : 0.6,
                duration: prefersReducedMotion ? 0 : 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {subtitle}
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
              {proofPoints.map((point, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-2 text-sm sm:text-base text-white"
                  initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: prefersReducedMotion ? 0 : 0.8 + index * 0.1,
                    duration: 0.3,
                  }}
                >
                  <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-white" />
                  <span>{point}</span>
                </motion.div>
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
              <Button
                variant="outline"
                size="lg"
                className="group bg-background text-foreground border-transparent hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                onClick={onScrollToWork}
              >
                {ctaViewWork}
                <ArrowDown className="ml-2 h-4 w-4 group-hover:animate-bounce" />
              </Button>

              <motion.button
                onClick={onScrollToContact}
                className="relative inline-flex items-center gap-2 text-base sm:text-lg font-medium text-white hover:text-white/90 transition-colors duration-300 group"
                whileHover={prefersReducedMotion ? {} : { x: 2 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <span className="relative">
                  {ctaContact}
                  <span
                    className="absolute bottom-0 left-0 h-[2px] w-0 bg-white transition-all duration-300 ease-out group-hover:w-full"
                    aria-hidden="true"
                  />
                </span>

                <motion.div
                  animate={prefersReducedMotion ? {} : { x: [0, 4, 0] }}
                  whileHover={prefersReducedMotion ? {} : { x: 8, scale: 1.15 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 0.5,
                    x: { type: "spring", stiffness: 400, damping: 10 },
                    scale: { type: "spring", stiffness: 400, damping: 10 },
                  }}
                  className="inline-flex"
                >
                  <ArrowRight
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    style={{ willChange: "transform", transform: "translateZ(0)" }}
                  />
                </motion.div>
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Version */}
        <div className="md:hidden">
          <div className="text-center max-w-4xl mx-auto">
            {prefersReducedMotion ? (
              <>
                <h1
                  className="text-4xl sm:text-5xl font-[900] text-white tracking-tight leading-[0.9]"
                  style={{ fontFamily: "Inter" }}
                >
                  {name}
                </h1>
                <p
                  className="text-xl sm:text-2xl font-serif italic text-white mt-2"
                  style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500 }}
                >
                  {title}
                </p>
              </>
            ) : (
              <TextRevealLines
                lines={[
                  {
                    text: name,
                    as: "h1",
                    className: "text-4xl sm:text-5xl font-[900] text-white tracking-tight leading-[0.9]",
                    style: { fontFamily: "Inter" },
                  },
                  {
                    text: title,
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

            <motion.p
              className="text-sm sm:text-base text-white mt-5 leading-relaxed px-2"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: prefersReducedMotion ? 0 : 0.6,
                duration: prefersReducedMotion ? 0 : 0.4,
              }}
            >
              {subtitle}
            </motion.p>

            <motion.div
              className="mt-5 space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: prefersReducedMotion ? 0 : 0.8 }}
            >
              {proofPoints.map((point, index) => (
                <div
                  key={index}
                  className="flex items-start justify-center gap-2 text-sm text-white"
                >
                  <Check className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span className="text-left">{point}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              className="flex flex-col gap-3 mt-6"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: prefersReducedMotion ? 0 : 1 }}
            >
              <Button
                variant="outline"
                size="lg"
                className="w-full bg-background text-foreground border-transparent hover:bg-primary hover:text-primary-foreground"
                onClick={onScrollToWork}
              >
                {ctaViewWork}
                <ArrowDown className="ml-2 h-4 w-4" />
              </Button>

              <button
                onClick={onScrollToContact}
                className="flex items-center justify-center gap-2 text-base font-medium text-white underline underline-offset-4"
              >
                {ctaContact}
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default HeroKinetic;
