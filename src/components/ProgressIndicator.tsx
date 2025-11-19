import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Section {
  id: string;
  label: string;
}

interface ProgressIndicatorProps {
  sections: Section[];
}

export function ProgressIndicator({ sections }: ProgressIndicatorProps) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || "");

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
    }
  };

  return (
    <nav
      className="fixed lg:right-6 xl:right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
      aria-label="Page navigation"
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

                {/* Label (visible on hover, focus or when active) */}
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
  );
}
