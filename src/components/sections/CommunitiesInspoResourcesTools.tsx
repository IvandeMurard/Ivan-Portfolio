import { useEffect, useMemo, useState } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { FilterChips } from "@/components/FilterChips";
import ZoomContextCard from "@/components/ZoomContextCard";
import { useInlineExpand } from "@/hooks/useInlineExpand";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import {
  communities,
  inspirations,
  resources,
  tools,
} from "@/data/inspirationsToolsMerged";
import { ToolsTable } from "./ToolsTable";

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
    ? "Ce qui me motive"
    : "What Drives Me";

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

  return (
    <section id="resources" className="py-24 px-4 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          kicker="WHAT DRIVES ME"
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
