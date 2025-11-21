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

  const loop = React.useMemo(() => [...phrases, ...phrases, ...phrases, ...phrases], [phrases]);

  const renderPhrase = (p: string, idx: number) => {
    const isSeparator = p === "•" || p === "✱";
    
    // Détecter les chiffres dans la phrase (format: "2 /", "10+ /", "5+ /")
    const statMatch = p.match(/^(\d+\+?)\s*\/\s*/);
    const isStatNumber = !!statMatch;
    const trimmed = statMatch ? p.replace(/^\d+\+?\s*\/\s*/, "") : p;

    if (isSeparator) {
      return (
        <span key={`${p}-${idx}`} className="text-primary text-2xl leading-none">
          {p}
        </span>
      );
    }

    if (isStatNumber) {
      return (
        <span key={`${p}-${idx}`} className="text-base md:text-lg">
          <span className="text-primary font-bold">{statMatch[1]}</span>
          <span className="text-primary"> / </span>
          <span className="text-muted-foreground dark:text-muted-foreground">{trimmed}</span>
        </span>
      );
    }

    return (
      <span
        key={`${p}-${idx}`}
        className={clsx(
          "text-base md:text-lg",
          !isSeparator && !isStatNumber && "text-muted-foreground dark:text-muted-foreground"
        )}
      >
        {p}
      </span>
    );
  };

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
          "flex gap-6 whitespace-nowrap will-change-transform",
          pauseOnHover &&
            "hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]"
        )}
        style={{ animation: `mdm-marquee ${duration}s linear infinite` }}
      >
        {loop.map((p, i) => renderPhrase(p, i))}
      </div>

      {/* animation locale + reduced motion */}
      <style>{`
        @keyframes mdm-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-75%); }
        }
        @media (prefers-reduced-motion: reduce) {
          [aria-label="${ariaLabel}"] > div { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
