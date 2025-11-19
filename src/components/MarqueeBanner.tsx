import * as React from "react";
import clsx from "clsx";

type MarqueeBannerProps = {
  phrases: string[];
  /** Plus c’est petit, plus c’est lent (0.1–0.4 recommandé). Par défaut: 0.15 */
  speed?: number;
  /** Met l’animation en pause au hover/focus. Par défaut: true */
  pauseOnHover?: boolean;
  /** Label SR pour lecteur d’écran. Par défaut: "Highlights" */
  ariaLabel?: string;
  /** Classes additionnelles sur le wrapper */
  className?: string;
};

export default function MarqueeBanner({
  phrases,
  speed = 0.15,
  pauseOnHover = true,
  ariaLabel = "Highlights",
  className,
}: MarqueeBannerProps) {
  const duration = React.useMemo(() => {
    const s = Math.max(0.05, Math.min(speed, 1));
    return 60 / s; // ex: 60/0.15 ≈ 400s → très doux
  }, [speed]);

  const loop = React.useMemo(() => [...phrases, ...phrases], [phrases]);

  return (
    <div
      role="region"
      aria-label={ariaLabel}
      aria-live="off"
      className={clsx(
        "relative overflow-hidden",
        // masque de fade aux extrémités (webkit + standard)
        "[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]",
        "[webkit-mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]",
        className
      )}
    >
      <div
        className={clsx(
          "flex gap-8 whitespace-nowrap will-change-transform",
          pauseOnHover &&
            "hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]"
        )}
        style={{ animation: `mdm-marquee ${duration}s linear infinite` }}
      >
        {loop.map((p, i) => {
          // Détection des stats (commence par chiffre)
          const isStatNumber = /^\d+/.test(p);
          // Détection des séparateurs (étoile)
          const isSeparator = p === "✱";
          
          return (
            <span 
              key={`${p}-${i}`} 
              className={clsx(
                "text-sm md:text-base font-medium whitespace-nowrap",
                isSeparator && "text-contact text-2xl leading-none",
                isStatNumber && "font-semibold",
                !isSeparator && !isStatNumber && "text-gray-400 dark:text-gray-400"
              )}
            >
              {p.split('/').map((part, idx) => {
                const trimmed = part.trim();
                if (/^\d+\+?$/.test(trimmed)) {
                  // C'est un nombre -> vert contact
                  return <span key={idx} className="text-contact font-bold">{trimmed}</span>;
                }
                return <span key={idx}>{idx > 0 ? ' / ' : ''}{part}</span>;
              })}
            </span>
          );
        })}
      </div>

      {/* animation locale + reduced motion */}
      <style>{`
        @keyframes mdm-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          [aria-label="${ariaLabel}"] > div { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
