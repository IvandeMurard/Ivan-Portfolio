import { motion } from "framer-motion";
import { BaseItem } from "@/data/inspirationsToolsMerged";
import { CategoryType } from "@/utils/getRecommendations";

interface RecommendationCardProps {
  item: BaseItem;
  category: CategoryType;
  onClick: () => void;
  language?: "en" | "fr";
}

const categoryLabels: Record<CategoryType, { en: string; fr: string }> = {
  communities: { en: "Community", fr: "Communauté" },
  inspirations: { en: "Inspiration", fr: "Inspiration" },
  resources: { en: "Resource", fr: "Ressource" },
  tools: { en: "Tool", fr: "Outil" },
};

export function RecommendationCard({
  item,
  category,
  onClick,
  language = "en",
}: RecommendationCardProps) {
  const categoryLabel = categoryLabels[category][language];

  return (
    <motion.button
      onClick={onClick}
      className="w-full text-left group flex items-start gap-3 p-3 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Logo/Image */}
      {item.logo ? (
        <img
          src={item.logo}
          alt=""
          className="w-10 h-10 rounded bg-muted object-contain flex-shrink-0"
        />
      ) : (
        <div className="w-10 h-10 rounded bg-muted flex-shrink-0" />
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Category badge */}
        <span className="inline-block text-[10px] font-medium text-muted-foreground uppercase tracking-wide mb-1">
          {categoryLabel}
        </span>
        
        {/* Title */}
        <h4 className="text-sm font-semibold text-foreground group-hover:underline underline-offset-2 line-clamp-1">
          {item.title}
        </h4>
        
        {/* Subtitle */}
        {item.subtitle && (
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
            {item.subtitle}
          </p>
        )}
        
        {/* Excerpt preview (if available) */}
        {item.excerpt && (
          <p className="text-xs text-muted-foreground/80 mt-1 line-clamp-2">
            {item.excerpt}
          </p>
        )}
      </div>
    </motion.button>
  );
}

