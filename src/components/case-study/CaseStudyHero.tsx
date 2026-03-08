/**
 * CaseStudyHero Component
 * Hero section avec design moderne : Image blur + Texte à gauche + Stack outils
 * Avec effet parallax amélioré
 */

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { heroAnimationPreset } from '@/config/case-study/case-study-animations';
import { useRef, useState } from 'react';

interface Tool {
  name: string;
  icon: string;
}

interface CaseStudyHeroProps {
  title: string;
  subtitle?: string;
  category?: string;
  backgroundImage?: string;
  imageCredit?: string;
  tools?: Tool[];
}

export const CaseStudyHero: React.FC<CaseStudyHeroProps> = ({
  title,
  subtitle,
  category,
  backgroundImage,
  imageCredit,
  tools = [],
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  
  // Parallax effect amélioré pour l'image de fond
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 0.7]);

  const handleMouseMove = (e: React.MouseEvent) => {
    setTooltipPos({ x: e.clientX + 12, y: e.clientY + 12 });
  };

  return (
    <section 
      ref={ref}
      className="relative h-[45vh] min-h-[400px] w-full flex items-center overflow-hidden rounded-2xl"
      onMouseMove={imageCredit ? handleMouseMove : undefined}
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

      {/* Dark Overlay pour accessibilité - capture les events souris pour le tooltip */}
      <div 
        className="absolute inset-0 bg-black/60 z-10 cursor-default"
        aria-hidden="true"
        onMouseEnter={() => imageCredit && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      />

      {/* Tooltip crédit photo - z-index très élevé */}
      <AnimatePresence>
        {showTooltip && imageCredit && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="fixed z-[9999] px-2.5 py-1 text-xs text-white/90 bg-black/70 backdrop-blur-sm rounded-md pointer-events-none shadow-lg"
            style={{ left: tooltipPos.x, top: tooltipPos.y }}
          >
            {imageCredit}
          </motion.div>
        )}
      </AnimatePresence>

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
              className="text-lg md:text-xl text-white/90 mb-6 max-w-2xl whitespace-pre-line"
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

