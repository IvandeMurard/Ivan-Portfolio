import * as React from "react";
import { ComingSoonBadge } from "./ComingSoonBadge";
import { BuildingBadge } from "./BuildingBadge";

type Props = {
  id: string;
  kicker: string;
  title: string;
  tagline: string;
  badge: string;
  image: string;
  alt?: string;
  ctaLabel?: string;
  ariaLabel?: string;
  onClick?: () => void;
  className?: string;
  showComingSoon?: boolean;
  showBuilding?: boolean;
  language?: "en" | "fr";
};

export function CardImmersive({
  id,
  kicker,
  title,
  tagline,
  badge,
  image,
  alt = "",
  ctaLabel,
  ariaLabel,
  onClick,
  className = "",
  showComingSoon = false,
  showBuilding = false,
  language = "en",
}: Props) {
  const defaultCtaLabel = language === "en" ? "Discover the case study!" : "Découvrir l'étude de cas !";
  const finalCtaLabel = ctaLabel || defaultCtaLabel;
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <article
      key={id}
      tabIndex={0}
      role="button"
      aria-label={ariaLabel ?? `${kicker} – ${title}`}
      aria-haspopup="dialog"
      aria-describedby={`tagline-${id}`}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={[
        "work-card group/card relative overflow-hidden rounded-token bg-card shadow-overlay",
        "transition-transform duration-300 will-change-transform hover:-translate-y-1",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        "w-[360px] h-[480px] cursor-pointer",
        className,
      ].join(" ")}
    >
      <span className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[0_16px_40px_hsl(var(--overlay))] opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" />
      <div className="relative h-full w-full rounded-[inherit] overflow-hidden transform-gpu will-change-transform transition-transform duration-500 group-hover/card:scale-[1.02] saturate-[1.25] contrast-[1.10] brightness-[1.02] group-hover/card:saturate-[1.5] group-hover/card:brightness-[1.06]">
        <img
          src={image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 transition-opacity duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.34) 55%, rgba(0,0,0,0.12) 100%), " +
              "radial-gradient(120% 60% at 0% 0%, rgba(255,255,255,0.12), transparent 60%)",
          }}
        />
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/20 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-between p-6">
          <div>
            <p className="text-[12px] font-[700] uppercase tracking-[0.14em] text-white/90 drop-shadow-sm">{kicker}</p>
          </div>

          <div className="space-y-4">
            <div className="min-h-[72px] flex items-end">
              <h3 className="text-[24px] md:text-[26px] font-[900] tracking-[-0.01em] leading-[1.15] text-white max-w-[280px] [filter:drop-shadow(0_1px_1px_rgba(0,0,0,.6))]">
                {title}
              </h3>
            </div>
            <p className="text-[15px] font-[400] leading-[1.4] text-white/80 max-w-[280px] [filter:drop-shadow(0_1px_1px_rgba(0,0,0,.5))]" id={`tagline-${id}`}>
              {tagline}
            </p>

            <div className="flex items-end justify-between">
              <span className="work-badge">{badge}</span>

              {showComingSoon ? (
                <ComingSoonBadge />
              ) : showBuilding ? (
                <BuildingBadge />
              ) : (
                <div
                  className={[
                    "flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm transition-all duration-300",
                    isHovered ? "w-auto h-10 px-4 gap-2" : "w-10 h-10",
                  ].join(" ")}
                >
                  {/* plus icon */}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className={["transition-opacity duration-200", isHovered ? "opacity-0 absolute" : "opacity-100"].join(
                      " ",
                    )}
                    aria-hidden="true"
                  >
                    <path d="M8 3.5V12.5M3.5 8H12.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>

                  <span
                    className={[
                      "text-[13px] font-[600] text-white whitespace-nowrap transition-opacity duration-200",
                      isHovered ? "opacity-100" : "opacity-0",
                    ].join(" ")}
                    aria-hidden="true"
                  >
                    {finalCtaLabel}
                  </span>
                  {/* CTA accessible pour lecteurs d'écran */}
                  <span className="sr-only">{finalCtaLabel}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
