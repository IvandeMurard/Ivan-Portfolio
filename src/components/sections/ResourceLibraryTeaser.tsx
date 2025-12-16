import { useMemo } from "react";
import { motion } from "framer-motion";
import { useInlineExpand } from "@/hooks/useInlineExpand";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import {
  communities,
  inspirations,
  resources,
} from "@/data/inspirationsToolsMerged";
import { CategoryType, ItemWithCategory } from "@/utils/getRecommendations";
import { useLazySection } from "@/hooks/useLazySection";
import { TextRevealLines } from "@/components/TextReveal";
import { useNavigate } from "react-router-dom";
import { ResourceCardTeaser } from "@/components/ResourceCardTeaser";

interface ResourceLibraryTeaserProps {
  disableSticky?: boolean;
  onExpand?: () => void;
}

/**
 * Sélectionne 6-9 highlights (2-3 par catégorie) pour le teaser
 */
function getHighlights(): ItemWithCategory[] {
  const highlights: ItemWithCategory[] = [];
  
  // Communities: 2 premiers
  communities.slice(0, 2).forEach(item => {
    highlights.push({ ...item, category: "communities" as CategoryType });
  });
  
  // Inspirations: 2 premiers
  inspirations.slice(0, 2).forEach(item => {
    highlights.push({ ...item, category: "inspirations" as CategoryType });
  });
  
  // Resources: tous (il n'y en a qu'1)
  resources.forEach(item => {
    highlights.push({ ...item, category: "resources" as CategoryType });
  });
  
  // Tools supprimés - ils seront dans AboutSection
  
  return highlights.slice(0, 6); // Max 6 items (sans tools)
}

export function ResourceLibraryTeaser({ disableSticky, onExpand }: ResourceLibraryTeaserProps) {
  const { openId, toggle } = useInlineExpand();
  const { language } = useLanguage();
  const { ref, shouldLoad } = useLazySection({ rootMargin: "200px" });
  const navigate = useNavigate();
  
  const highlights = useMemo(() => getHighlights(), []);

  // Naviguer vers la page dédiée
  const handleViewAll = () => {
    navigate("/resource-library");
    onExpand?.();
  };

  const sectionTitle = language === 'fr' 
    ? "Curated Library"
    : "Curated Library";
  
  const viewAllLabel = language === 'fr'
    ? "Voir toutes les ressources"
    : "View all resources";

  if (!shouldLoad) {
    return (
      <section ref={ref} id="curated-library-teaser" className="py-24 px-4 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="h-64 flex items-center justify-center">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      ref={ref}
      id="curated-library-teaser"
      className="py-24 px-4 bg-background"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Titre avec TextReveal */}
        <div className="mb-12">
          <TextRevealLines
            lines={[
              {
                text: sectionTitle,
                className: "text-h2 text-foreground",
                as: "h2",
              },
            ]}
            delay={0.2}
          />
        </div>

        {/* Shelf divider avec shadow pour profondeur */}
        <div className="relative w-full h-px bg-border mb-8 shadow-[0_1px_3px_rgba(0,0,0,0.06)]" />

        {/* Horizontal scrolling shelf - style Netflix/Apple Books avec effet expansion */}
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide mb-8" style={{ alignItems: "flex-start" }}>
          {highlights.map((item) => (
            <ResourceCardTeaser
              key={item.id}
              item={item}
              category={item.category}
              isExpanded={openId === item.id}
              onClick={() => toggle(item.id)}
            />
          ))}
        </div>

        {/* CTA: View all resources */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="lg"
            className="group hover:bg-contact hover:text-contact-foreground hover:border-contact transition-all duration-300"
            onClick={handleViewAll}
          >
            {viewAllLabel}
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </motion.section>
  );
}

