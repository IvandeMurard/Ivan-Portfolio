import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { experiences } from "@/data/experience";
import { education } from "@/data/education";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ArrowRight } from "lucide-react";

interface TimelineItem {
  year: string;
  title: string;
  subtitle?: string;
  description: string;
  type: "experience" | "education";
  link?: string;
}

export function HorizontalTimeline() {
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  // Combiner experiences et education, trier par année
  const timelineItems: TimelineItem[] = [
    ...experiences.map((exp) => ({
      year: exp.year || "",
      title: language === "en" ? exp.title_en : exp.title_fr,
      subtitle: exp.company,
      description: language === "en" ? exp.description_en : exp.description_fr,
      type: "experience" as const,
      link: exp.companyUrl,
    })),
    ...education.map((edu) => ({
      year: edu.year,
      title: language === "en" ? edu.title_en : edu.title_fr,
      subtitle: edu.school,
      description: language === "en" ? edu.description_en : edu.description_fr,
      type: "education" as const,
    })),
  ]
    .filter((item) => item.year)
    .sort((a, b) => {
      const yearA = parseInt(a.year);
      const yearB = parseInt(b.year);
      return yearB - yearA; // Plus récent en premier
    });

  return (
    <div className="w-full overflow-x-auto pb-4">
      {/* Desktop: Horizontal timeline */}
      <div className="hidden md:block min-w-[800px]">
        <div className="relative">
          {/* Horizontal line */}
          <div className="absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-accent via-primary to-accent" />

          {/* Timeline items */}
          <div className="relative flex items-start justify-between gap-8 px-4">
            {timelineItems.map((item, index) => (
              <motion.div
                key={`${item.year}-${index}`}
                className="flex flex-col items-center flex-shrink-0"
                style={{ width: "180px" }}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.4,
                  delay: prefersReducedMotion ? 0 : index * 0.1,
                }}
              >
                {/* Year badge */}
                <div className="relative z-10 mb-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent font-semibold text-sm">
                    {item.year}
                  </span>
                </div>

                {/* Dot on line */}
                <div className="relative z-10 w-4 h-4 rounded-full bg-accent border-4 border-background shadow-lg mb-4" />

                {/* Content card */}
                <div className="w-full mt-2">
                  <div className="p-4 rounded-lg bg-card border border-border hover:border-accent/30 transition-colors">
                    {item.type === "experience" && item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group"
                      >
                        <h4 className="font-semibold text-sm text-foreground mb-1 group-hover:text-accent transition-colors line-clamp-2">
                          {item.title}
                        </h4>
                        <p className="text-xs text-accent font-medium mb-2 uppercase tracking-wide">
                          {item.subtitle}
                        </p>
                      </a>
                    ) : (
                      <>
                        <h4 className="font-semibold text-sm text-foreground mb-1 line-clamp-2">
                          {item.title}
                        </h4>
                        {item.subtitle && (
                          <p className="text-xs text-accent font-medium mb-2 uppercase tracking-wide">
                            {item.subtitle}
                          </p>
                        )}
                      </>
                    )}
                    <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: Vertical timeline */}
      <div className="md:hidden space-y-6">
        {timelineItems.map((item, index) => (
          <motion.div
            key={`${item.year}-${index}`}
            className="relative pl-8 border-l-2 border-accent/30"
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.4,
              delay: prefersReducedMotion ? 0 : index * 0.1,
            }}
          >
            {/* Dot */}
            <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-accent border-4 border-background -translate-x-[9px]" />

            {/* Year */}
            <span className="inline-block px-2 py-1 rounded-full bg-accent/20 text-accent font-semibold text-xs mb-2">
              {item.year}
            </span>

            {/* Content */}
            <div className="mt-2 p-4 rounded-lg bg-card border border-border">
              {item.type === "experience" && item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <h4 className="font-semibold text-sm text-foreground mb-1 group-hover:text-accent transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-accent font-medium mb-2 uppercase tracking-wide">
                    {item.subtitle}
                  </p>
                </a>
              ) : (
                <>
                  <h4 className="font-semibold text-sm text-foreground mb-1">
                    {item.title}
                  </h4>
                  {item.subtitle && (
                    <p className="text-xs text-accent font-medium mb-2 uppercase tracking-wide">
                      {item.subtitle}
                    </p>
                  )}
                </>
              )}
              <p className="text-xs text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

