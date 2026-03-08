import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, List } from "lucide-react";

interface Section {
  id: string;
  label: string;
}

interface ProgressIndicatorProps {
  sections: Section[];
}

export function ProgressIndicator({ sections }: ProgressIndicatorProps) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || "");
  const [mobileOpen, setMobileOpen] = useState(false);

  const getActiveSectionIndex = () => {
    const index = sections.findIndex(s => s.id === activeSection);
    return index >= 0 ? index : 0;
  };

  const getActiveSectionLabel = () => {
    const section = sections.find(s => s.id === activeSection);
    return section ? section.label : sections[0]?.label || "";
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -50% 0px",
      threshold: 0.15,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      element.setAttribute('tabindex', '-1');
      element.focus({ preventScroll: true });
    }
    setMobileOpen(false);
  };

  return (
    <>
      {/* Desktop dot navigation */}
      <nav
        className="fixed lg:right-6 xl:right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
        aria-label={`Page navigation - Currently at ${getActiveSectionLabel()}, section ${getActiveSectionIndex() + 1} of ${sections.length}`}
      >
        <ul className="space-y-4">
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <li key={section.id}>
                <button
                  onClick={() => scrollToSection(section.id)}
                  className="group relative flex items-center gap-3"
                  aria-label={`Navigate to ${section.label}`}
                  aria-current={isActive ? "location" : undefined}
                >
                  {/* Dot */}
                  <motion.div
                    className={`w-2 h-2 rounded-full transition-colors duration-300
                      ${activeSection === 'contact' 
                        ? 'ring-2 ring-white/70 shadow-[0_0_6px_rgba(255,255,255,0.2)]'
                        : 'ring-2 ring-white/95 shadow-[0_0_10px_rgba(255,255,255,0.4)]'
                      }
                      ${isActive ? "bg-primary" : "bg-muted-foreground/40"}`}
                    animate={{
                      scale: isActive ? 1.5 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Label */}
                  <span
                    className={`absolute right-6 whitespace-nowrap text-sm px-2 py-1 rounded-md transition-all duration-300 ${
                      isActive
                        ? section.id === "hero" || section.id === "contact"
                          ? "opacity-100 translate-x-0 bg-white text-primary font-bold"
                          : "opacity-100 translate-x-0 bg-primary/20 text-primary font-bold"
                        : "opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-focus-within:opacity-100 group-focus-within:translate-x-0 bg-background/95 text-foreground/80 font-medium"
                    }`}
                  >
                    {section.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.2 }}
              className="mx-4 mb-2 rounded-xl border border-border bg-background/95 backdrop-blur-xl shadow-lg overflow-hidden"
            >
              <ul className="py-2 max-h-[50vh] overflow-y-auto">
                {sections.map((section) => {
                  const isActive = activeSection === section.id;
                  return (
                    <li key={section.id}>
                      <button
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                          isActive
                            ? "text-primary font-semibold bg-primary/10"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        }`}
                      >
                        {section.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-full flex items-center justify-between px-5 py-3 bg-background/90 backdrop-blur-md border-t border-border text-sm"
          aria-label="Toggle section navigation"
        >
          <span className="flex items-center gap-2 text-muted-foreground">
            <List size={14} />
            <span className="font-medium text-foreground">{getActiveSectionLabel()}</span>
            <span className="text-xs opacity-60">
              {getActiveSectionIndex() + 1}/{sections.length}
            </span>
          </span>
          <ChevronUp
            size={14}
            className={`text-muted-foreground transition-transform duration-200 ${mobileOpen ? "" : "rotate-180"}`}
          />
        </button>
      </div>
    </>
  );
}
