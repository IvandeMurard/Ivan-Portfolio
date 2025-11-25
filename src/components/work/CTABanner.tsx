import * as React from "react";
import { motion } from "framer-motion";

type Props = {
  title: string;
  description: string;
  ctaText: string;
  ctaLink?: string;
  onClick?: () => void;
  image?: string;
  className?: string;
};

// Haptic feedback helper (vibration API for mobile)
const triggerHaptic = (pattern: number | number[] = 10) => {
  if (navigator.vibrate) {
    navigator.vibrate(pattern);
  }
};

export function CTABanner({
  title,
  description,
  ctaText,
  ctaLink,
  onClick,
  image = "https://images.unsplash.com/photo-1742440710226-450e3b85c100?auto=format&fit=crop&w=1400&q=60",
  className = "",
}: Props) {
  const [hover, setHover] = React.useState(false);
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const handleClick = () => {
    // Trigger haptic feedback on click
    triggerHaptic([15, 30, 15]);
    if (onClick) onClick();
    else if (ctaLink) window.location.href = ctaLink;
  };

  return (
    <motion.div
      className={["w-full my-8 md:my-10", className].join(" ")}  // ← espace raisonnable autour
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-[1100px] mx-auto px-4 md:px-6">          {/* ← largeur contenue */}
        <div
          className="relative overflow-hidden rounded-[16px] shadow-[0_6px_20px_-8px_hsl(var(--overlay))]"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {/* Background vert comme la section Contact */}
          <div className="absolute inset-0 bg-contact" />

          {/* Contenu COMPACT (hauteur maîtrisée) */}
          <div className="relative z-10 text-center px-5 md:px-8 py-5 md:py-6">
            <motion.h2
              className="mb-1.5 text-[18px] md:text-[22px] font-[700] leading-[1.25]
                         tracking-[-0.01em] text-white
                         [filter:drop-shadow(0_1px_1px_rgba(0,0,0,.45))]"
              animate={{ y: hover && !reducedMotion ? -1 : 0 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {title}
            </motion.h2>

            <motion.p
              className="mx-auto mb-3 text-[13px] md:text-[14px] leading-[1.55]
                         text-white/85 max-w-[560px]"
              animate={{ y: hover && !reducedMotion ? -1 : 0 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1], delay: 0.03 }}
            >
              {description}
            </motion.p>

            {/* CTA avec bordure et texte blancs + haptic feedback */}
            <motion.button
              onClick={handleClick}
              className="group relative inline-flex items-center justify-center h-9 md:h-10 px-4 md:px-5
                         rounded-full border-2 text-[13px] font-[600]
                         border-white text-white
                         bg-transparent hover:bg-white hover:text-contact hover:border-white
                         transition-all duration-200
                         focus:outline-none focus:ring-2 focus:ring-white/30
                         hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]
                         active:scale-[0.97]"
              whileHover={{ scale: reducedMotion ? 1 : 1.02 }}
              whileTap={{ scale: reducedMotion ? 1 : 0.97 }}
            >
              {ctaText}
              <svg
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="none"
                className="ml-2 transition-transform duration-200"
                style={{ transform: hover ? "translateX(2px)" : "translateX(0)" }}
                aria-hidden="true"
              >
                <path
                  d="M7.5 15L12.5 10L7.5 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
