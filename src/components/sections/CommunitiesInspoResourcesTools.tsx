import { useEffect, useMemo, useState } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { FilterChips } from "@/components/FilterChips";
import ZoomContextCard from "@/components/ZoomContextCard";
import { useInlineExpand } from "@/hooks/useInlineExpand";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import {
  communities,
  inspirations,
  resources,
  tools,
  BaseItem,
} from "@/data/inspirationsToolsMerged";
import { ToolsTable } from "./ToolsTable";
import { CategoryType, ItemWithCategory } from "@/utils/getRecommendations";

const TABS = [
  { id: "communities", label: "Communities" },
  { id: "inspirations", label: "Inspirations" },
  { id: "resources", label: "Resources" },
  { id: "tools", label: "Tools" },
] as const;

interface CommunitiesInspoResourcesToolsProps {
  disableSticky?: boolean;
}

export function CommunitiesInspoResourcesTools({ disableSticky = false }: CommunitiesInspoResourcesToolsProps) {
  const [active, setActive] = useState<(typeof TABS)[number]["id"]>(
    "communities",
  );

  const { openId, toggle, close } = useInlineExpand();
  const { language } = useLanguage();
  
  const sectionTitle = language === 'fr' 
    ? "Curated Library"
    : "Curated Library";

  // Fermer l'item ouvert lorsqu'on change d'onglet
  useEffect(() => {
    close();
  }, [active, close]);

  const data = useMemo(() => {
    switch (active) {
      case "communities":
        return communities;
      case "inspirations":
        return inspirations;
      case "resources":
        return resources;
      case "tools":
        return tools;
      default:
        return [];
    }
  }, [active]);

  // Créer la liste complète de tous les items avec leurs catégories pour les recommandations
  const allItemsWithCategory = useMemo<ItemWithCategory[]>(() => {
    const items: ItemWithCategory[] = [];
    
    communities.forEach(item => {
      items.push({ ...item, category: "communities" as CategoryType });
    });
    
    inspirations.forEach(item => {
      items.push({ ...item, category: "inspirations" as CategoryType });
    });
    
    resources.forEach(item => {
      items.push({ ...item, category: "resources" as CategoryType });
    });
    
    tools.forEach(item => {
      items.push({ ...item, category: "tools" as CategoryType });
    });
    
    return items;
  }, []);

  // Fonction helper pour scroll smooth vers une recommandation
  const scrollToRecommendation = (itemId: string) => {
    const targetElement = document.getElementById(`zc-${itemId}`);
    if (targetElement) {
      const elementTop = targetElement.getBoundingClientRect().top;
      const offset = 120; // Offset pour le header/sticky
      const scrollPosition = window.scrollY + elementTop - offset;
      
      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
      
      // Focus pour l'accessibilité
      targetElement.setAttribute('tabindex', '-1');
      targetElement.focus({ preventScroll: true });
    }
  };

  // Gérer le clic sur une recommandation : fermer l'actuelle, changer de catégorie si nécessaire, ouvrir la nouvelle, smooth scroll
  const handleRecommendationClick = (itemId: string) => {
    // Trouver l'item recommandé pour déterminer sa catégorie
    const recommendedItem = allItemsWithCategory.find(item => item.id === itemId);
    if (!recommendedItem) return;
    
    // Fermer la carte actuelle
    close();
    
    // Si l'item est dans une autre catégorie, changer d'onglet
    const needsCategorySwitch = recommendedItem.category !== active;
    
    if (needsCategorySwitch) {
      // Changer de catégorie d'abord
      setActive(recommendedItem.category);
      
      // Attendre que le changement de catégorie soit effectué (le useEffect fermera automatiquement)
      setTimeout(() => {
        // Ouvrir la nouvelle carte
        toggle(itemId);
        
        // Smooth scroll vers la nouvelle carte
        setTimeout(() => {
          scrollToRecommendation(itemId);
        }, 300); // Plus de délai pour laisser le temps au changement de catégorie
      }, 300);
    } else {
      // Même catégorie, juste fermer/ouvrir
      setTimeout(() => {
        toggle(itemId);
        
        // Smooth scroll vers la nouvelle carte
        setTimeout(() => {
          scrollToRecommendation(itemId);
        }, 150);
      }, 200);
    }
  };

  return (
    <section id="resources" className="py-24 px-4 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title={sectionTitle}
          alignment="left"
          className="mb-8"
        />

        <FilterChips
          chips={TABS.map((t) => ({ id: t.id, label: t.label }))}
          activeChip={active}
          onChipChange={(id) => setActive(id as (typeof TABS)[number]["id"])}
          className="mb-4"
          disableSticky={disableSticky}
        />

        {active === "tools" ? (
          <>
            {/* Desktop: Table view */}
            <div className="hidden lg:block">
              <ToolsTable />
            </div>
            
            {/* Mobile: Fallback to cards */}
            <div className="block lg:hidden grid md:grid-cols-2 gap-6">
              {data.map((item) => (
                <ZoomContextCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  subtitle={item.subtitle}
                  logo={item.logo}
                  excerpt={item.excerpt}
                  comment={item.comment}
                  link={item.link as string}
                  media={item.media}
                  tags={item.tags}
                  open={openId === item.id}
                  onToggle={toggle}
                  allItems={allItemsWithCategory}
                  currentCategory={active}
                  onRecommendationClick={handleRecommendationClick}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item) => (
              <ZoomContextCard
                key={item.id}
                id={item.id}
                title={item.title}
                subtitle={item.subtitle}
                logo={item.logo}
                excerpt={item.excerpt}
                comment={item.comment}
                link={item.link as string}
                media={item.media}
                tags={item.tags}
                open={openId === item.id}
                onToggle={toggle}
                allItems={allItemsWithCategory}
                currentCategory={active}
                onRecommendationClick={handleRecommendationClick}
              />
            ))}
          </div>
        )}

        <div className="flex justify-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="group hover:bg-contact hover:text-contact-foreground hover:border-contact transition-all duration-300"
            onClick={() =>
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            GET IN TOUCH
            <ArrowDown className="ml-2 h-4 w-4 group-hover:animate-bounce" />
          </Button>
        </div>
      </div>
    </section>
  );
}

export default CommunitiesInspoResourcesTools;
