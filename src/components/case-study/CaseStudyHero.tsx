/**
 * CaseStudyHero Component
 * Hero section avec design moderne : Image blur + Texte à gauche + Stack outils
 * Avec effet parallax amélioré
 */

import { motion, useScroll, useTransform } from 'framer-motion';
import { heroAnimationPreset } from '@/config/case-study/case-study-animations';
import { useRef } from 'react';

interface Tool {
  name: string;
  icon: string;
}

interface CaseStudyHeroProps {
  title: string;
  subtitle?: string;
  category?: string;
  backgroundImage?: string;
  tools?: Tool[];
}

export const CaseStudyHero: React.FC<CaseStudyHeroProps> = ({
  title,
  subtitle,
  category,
  backgroundImage,
  tools = [],
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Parallax effect amélioré pour l'image de fond
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 0.7]);

  return (
    <section 
      ref={ref}
      className="relative h-[40vh] min-h-[350px] w-full flex items-center overflow-hidden rounded-2xl"
    >
      {/* Background Image avec Parallax amélioré et Blur */}
      {backgroundImage && (
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y }}
        >
          <motion.img
            src={backgroundImage}
            alt=""
            style={{ opacity }}
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
        </motion.div>
      )}

      {/* Gradient Overlay pour meilleure lisibilité */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background/80 backdrop-blur-[2px] z-10"
        aria-hidden="true"
      />

      {/* Content - Aligné à gauche */}
      <motion.div
        className="relative z-20 w-full px-6 lg:px-12 py-8"
        variants={heroAnimationPreset.container}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-3xl">
          {/* Title - Texte blanc à gauche */}
          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight text-white whitespace-pre-line"
            style={{
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.6), 0 4px 16px rgba(0, 0, 0, 0.4)',
            }}
            variants={heroAnimationPreset.item}
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              className="text-lg md:text-xl text-white/90 mb-6 max-w-2xl"
              style={{
                textShadow: '0 1px 4px rgba(0, 0, 0, 0.5)',
              }}
              variants={heroAnimationPreset.item}
            >
              {subtitle}
            </motion.p>
          )}

          {/* Stack Tools - Icônes en ligne horizontale */}
          {tools.length > 0 && (
            <motion.div
              className="flex flex-wrap items-center gap-3"
              variants={heroAnimationPreset.item}
            >
              {tools.map((tool, index) => (
                <motion.div
                  key={tool.name}
                  className="w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow-md hover:shadow-lg transition-all hover:scale-105"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.08, duration: 0.3 }}
                  title={tool.name}
                >
                  <img
                    src={tool.icon}
                    alt={tool.name}
                    className="w-7 h-7 object-contain"
                    onError={(e) => {
                      // Fallback si l'icône n'existe pas - afficher la première lettre
                      const img = e.currentTarget as HTMLImageElement;
                      img.style.display = 'none';
                      const parent = img.parentElement;
                      if (parent) {
                        const fallback = document.createElement('span');
                        fallback.className = 'text-sm font-bold text-gray-700';
                        fallback.textContent = tool.name.charAt(0);
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

