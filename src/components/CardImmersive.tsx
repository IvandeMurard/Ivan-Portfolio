import * as React from "react";
import { Link } from "react-router-dom";
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
  variant?: "default" | "compact" | "split";
  caseStudyLink?: { href: string; label: string };
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
  variant = "default",
  caseStudyLink,
  showComingSoon = false,
  showBuilding = false,
  language = "en",
}: Props) {
  const defaultCtaLabel = language === "en" ? "Discover the case study!" : "Découvrir l'étude de cas !";
  const finalCtaLabel = ctaLabel || defaultCtaLabel;
  const [isHovered, setIsHovered] = React.useState(false);
  const [imgError, setImgError] = React.useState(false);

  const isCompact = variant === "compact";
  const isSplit = variant === "split";

  return (
    <article
      key={id}
      tabIndex={0}
      role="button"
      aria-label={ariaLabel ?? (kicker ? `${kicker} – ${title}` : title)}
      aria-haspopup="dialog"
      aria-describedby={`tagline-${id}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault(); // prevent Space from scrolling the page
          onClick?.();
        }
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={[
        "work-card group/card relative overflow-hidden rounded-token bg-card",
        isSplit
          ? [
              "border border-border/80",
              "shadow-md",
              "hover:shadow-lg hover:border-border",
              "focus-visible:ring-offset-background",
            ].join(" ")
          : "shadow-overlay",
        "transition-transform duration-300 will-change-transform hover:-translate-y-1",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        "w-[360px] h-[480px] cursor-pointer",
        className,
      ].join(" ")}
    >
      <span className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[0_16px_40px_hsl(var(--overlay))] opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" />
      {isSplit ? (
        <div className="relative h-full w-full rounded-[inherit] overflow-hidden transform-gpu will-change-transform transition-transform duration-500 group-hover/card:scale-[1.01] bg-card">
          {/* Image (top ~60%) */}
          <div className="relative h-[60%] w-full overflow-hidden">
            <img
              src={imgError ? "/placeholder.svg" : image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              decoding="async"
              aria-hidden="true"
              onError={() => setImgError(true)}
            />
            {/* Minimal readability gradient at bottom edge of image */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/20 to-transparent" aria-hidden="true" />
          </div>

          {/* Content (bottom ~40%) */}
          <div className="h-[40%] w-full bg-card text-foreground border-t border-border/40 p-4 flex flex-col justify-between">
            <div className="space-y-1.5">
              <h3 className="text-[15px] md:text-[16px] font-[800] leading-[1.2] text-foreground line-clamp-2">
                {title}
              </h3>
              {caseStudyLink ? (
                <Link
                  to={caseStudyLink.href}
                  onClick={(e) => {
                    // Prevent triggering the card's onClick (modal)
                    e.stopPropagation();
                  }}
                  className={[
                    // Hidden by default, visible on hover/focus-within for accessibility
                    "inline-flex w-fit items-center gap-1 rounded-full border border-border/70 bg-background px-2.5 py-1 text-[12px] font-semibold text-foreground",
                    "opacity-0 pointer-events-none transition-opacity duration-200",
                    "group-hover/card:opacity-100 group-hover/card:pointer-events-auto",
                    "group-focus-within/card:opacity-100 group-focus-within/card:pointer-events-auto",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                  ].join(" ")}
                  aria-label={caseStudyLink.label}
                >
                  {caseStudyLink.label}
                </Link>
              ) : null}
              {/* Tagline hidden for split cards (Title + Tag + Status). Keep SR-only for context. */}
              <span id={`tagline-${id}`} className="sr-only">
                {tagline || title}
              </span>
            </div>

            <div className="flex items-end justify-between gap-3">
              <span className="inline-flex items-center rounded-full bg-muted text-muted-foreground border border-border px-2.5 py-1 text-[12px] font-medium leading-none">
                {badge}
              </span>

              {showComingSoon ? (
                <div className="origin-bottom-right scale-90">
                  <ComingSoonBadge />
                </div>
              ) : showBuilding ? (
                <div className="origin-bottom-right scale-90">
                  <BuildingBadge />
                </div>
              ) : (
                <span className="text-[12px] font-[600] text-muted-foreground whitespace-nowrap">
                  {finalCtaLabel}
                </span>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="relative h-full w-full rounded-[inherit] overflow-hidden transform-gpu will-change-transform transition-transform duration-500 group-hover/card:scale-[1.02] saturate-[1.25] contrast-[1.10] brightness-[1.02] group-hover/card:saturate-[1.5] group-hover/card:brightness-[1.06]">
        <img
          src={imgError ? "/placeholder.svg" : image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
          aria-hidden="true"
          onError={() => setImgError(true)}
        />
        <div
          className={[
            "absolute inset-0 transition-opacity duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
            isCompact ? "opacity-95" : "opacity-100",
          ].join(" ")}
          style={{
            background:
              (isCompact
                ? "linear-gradient(to top, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.28) 55%, rgba(0,0,0,0.10) 100%), "
                : "linear-gradient(to top, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.34) 55%, rgba(0,0,0,0.12) 100%), ") +
              "radial-gradient(120% 60% at 0% 0%, rgba(255,255,255,0.12), transparent 60%)",
          }}
        />
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/20 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-between p-6">
          <div>
            {kicker ? (
              <p
                className={[
                  "uppercase tracking-[0.14em] text-white/90 drop-shadow-sm",
                  isCompact ? "text-[10px] font-[700]" : "text-[12px] font-[700]",
                  isCompact ? "line-clamp-1" : "",
                ].join(" ")}
              >
                {kicker}
              </p>
            ) : null}
          </div>

          <div
            className={[
              "space-y-4",
              // Improve title readability on smaller cards without implying disabled:
              // add a localized scrim behind text (not over the whole image).
              isCompact ? "space-y-3 bg-black/25 backdrop-blur-sm rounded-xl p-4 -mx-1" : "",
            ].join(" ")}
          >
            <div className="min-h-[72px] flex items-end">
              <h3
                className={[
                  "font-[900] tracking-[-0.01em] leading-[1.15] text-white max-w-[280px]",
                  // Stronger shadow for readability on varied images
                  "[text-shadow:0_1px_1px_rgba(0,0,0,.65),0_6px_18px_rgba(0,0,0,.35)]",
                  isCompact ? "text-[21px] md:text-[23px] line-clamp-2" : "text-[24px] md:text-[26px]",
                ].join(" ")}
              >
                {title}
              </h3>
            </div>
            <p
              className={[
                "font-[400] leading-[1.4] max-w-[280px] [filter:drop-shadow(0_1px_1px_rgba(0,0,0,.5))]",
                isCompact ? "text-[13px] text-white/70 line-clamp-1" : "text-[15px] text-white/80",
              ].join(" ")}
              id={`tagline-${id}`}
            >
              {tagline}
            </p>

            <div className="flex items-end justify-between">
              <span className="work-badge">{badge}</span>

              {showComingSoon ? (
                <ComingSoonBadge />
              ) : showBuilding ? (
                <div className="relative">
                  {/* Badge Building visible par défaut, caché au hover */}
                  <div
                    className={[
                      "transition-opacity duration-300",
                      isHovered ? "opacity-0" : "opacity-100",
                    ].join(" ")}
                  >
                    <BuildingBadge />
                  </div>
                  
                  {/* CTA visible au hover */}
                  <div
                    className={[
                      "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
                      isHovered ? "opacity-100" : "opacity-0",
                    ].join(" ")}
                  >
                    <div className="flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm w-auto h-10 px-4 gap-2">
                      <span className="text-[13px] font-[600] text-white whitespace-nowrap">
                        {finalCtaLabel}
                      </span>
                    </div>
                  </div>
                  <span className="sr-only">{finalCtaLabel}</span>
                </div>
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
      )}
    </article>
  );
}
