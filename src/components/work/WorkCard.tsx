import { cn } from "@/lib/utils"; // ou remplace par simple concat si tu n'as pas cn

export type WorkCardProps = {
  id?: string;    // identifiant unique pour ARIA
  image: string;  // visuel immersif
  category: string; // "CASE STUDY — FINTECH"
  title: string;  // titre fort
  subtitle?: string; // 1 ligne
  badge?: string; // "FinTech" / "AI/ML"...
  onClick?: () => void; // ouvre ta modale existante OU navigation
  href?: string;  // alternative: lien direct
  className?: string;
  ctaLabel?: string; // label accessible pour le CTA
};

export default function WorkCard({ id, image, category, title, subtitle, badge, onClick, href, className, ctaLabel = "View project" }: WorkCardProps) {
  const Tag: any = href ? "a" : "button";
  const tagProps = href 
    ? { href } 
    : { 
        type: "button", 
        onClick,
        onKeyDown: (e: React.KeyboardEvent) => e.key === "Enter" && onClick?.(),
      };
  
  const cardId = id || `work-card-${title.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <Tag
      {...tagProps}
      role="button"
      tabIndex={0}
      aria-label={`${category} – ${title}`}
      aria-describedby={subtitle ? `subtitle-${cardId}` : undefined}
      aria-haspopup={onClick ? "dialog" : undefined}
      className={cn(
        "group relative block w-full overflow-hidden rounded-token border border-border bg-card text-left shadow-overlay",
        "transition-all duration-300 will-change-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-brand",
        className,
      )}
    >
      {/* Image immersive */}
      <div className="relative aspect-[3/4] w-full">
        <img
          src={image}
          alt=""
          loading="lazy"
          decoding="async"
          aria-hidden="true"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        {/* Overlay: en mobile toujours visible, en desktop au hover */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-95 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Teaser texte (bottom-left) */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-end p-4 md:p-5">
        <p className="text-[11px] uppercase tracking-wide text-white/80">{category}</p>
        <h3 className="mt-1 line-clamp-2 text-[22px] font-extrabold leading-tight text-white drop-shadow">{title}</h3>
        {subtitle && <p id={`subtitle-${cardId}`} className="mt-1 line-clamp-2 text-sm text-white/80">{subtitle}</p>}

        {/* Badge (token contact) */}
        {badge && (
          <span
            className="mt-3 inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-medium shadow-sm"
            style={{ backgroundColor: "hsl(var(--contact))", color: "hsl(var(--contact-foreground))" }}
          >
            {badge}
          </span>
        )}
        
        {/* CTA accessible pour lecteurs d'écran */}
        <span className="sr-only">{ctaLabel}</span>
      </div>
    </Tag>
  );
}
