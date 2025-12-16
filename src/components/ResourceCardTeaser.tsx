import { motion, AnimatePresence } from "framer-motion";
import { BaseItem, CategoryType } from "@/data/inspirationsToolsMerged";

interface ResourceCardTeaserProps {
  item: BaseItem;
  category: CategoryType;
  isExpanded: boolean;
  onClick: () => void;
}

const categoryLabels: Record<CategoryType, { en: string; fr: string }> = {
  communities: { en: "Community", fr: "Communauté" },
  inspirations: { en: "Inspiration", fr: "Inspiration" },
  resources: { en: "Resource", fr: "Ressource" },
  tools: { en: "Tool", fr: "Outil" },
};

export function ResourceCardTeaser({ item, category, isExpanded, onClick }: ResourceCardTeaserProps) {
  const isCommunity = category === "communities";
  const imageObjectFit = isCommunity ? "object-contain" : "object-cover";
  const imagePadding = isCommunity ? "p-4" : "";

  return (
    <motion.div
      className="cursor-pointer flex-shrink-0 overflow-hidden"
      onClick={onClick}
      layout
      initial={false}
      animate={{
        width: isExpanded ? 560 : 160,
      }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
    >
      <div className="flex gap-6 h-full">
        {/* Image - Visual First */}
        <motion.div
          className={`flex-shrink-0 bg-muted rounded overflow-hidden shadow-[0_2px_6px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-shadow relative ${imagePadding}`}
          layout
          animate={{
            width: 160,
            height: 200,
          }}
        >
          {item.logo ? (
            <img
              src={item.logo}
              alt={item.title}
              className={`w-full h-full ${imageObjectFit}`}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-accent/10 to-primary/10 flex items-center justify-center">
              <span className="text-4xl text-muted-foreground">{item.title[0]}</span>
            </div>
          )}
          {/* Category badge */}
          <div className="absolute top-2 right-2">
            <span className="px-2 py-0.5 text-[10px] font-medium bg-white/95 backdrop-blur-sm rounded text-foreground uppercase tracking-wide">
              {category}
            </span>
          </div>
        </motion.div>

        {/* Expanded content - Text Second */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="flex flex-col justify-center pr-6 py-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              style={{ width: 340 }}
            >
              <h3 className="text-foreground mb-2 font-semibold" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                {item.title}
              </h3>

              {item.subtitle && (
                <p className="text-muted-foreground text-sm mb-3" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {item.subtitle}
                </p>
              )}

              {item.excerpt && (
                <p className="text-muted-foreground text-sm italic opacity-80" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {item.excerpt}
                </p>
              )}

              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent text-sm mt-3 hover:underline inline-flex items-center gap-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  Visit <span className="text-xs">↗</span>
                </a>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapsed title */}
        {!isExpanded && (
          <motion.div
            className="mt-3"
            initial={{ opacity: 1 }}
            animate={{ opacity: isExpanded ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="text-foreground font-semibold w-[160px]" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
              {item.title}
            </h3>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

