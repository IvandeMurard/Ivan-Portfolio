import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { SectionHeader } from "@/components/SectionHeader";
import { myApproachContent } from "@/data/myApproach";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function AboutSection() {
  const { language } = useLanguage();
  const content = myApproachContent[language].about;
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="about" className="py-24 px-4 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title={content.title}
          alignment="left"
          className="mb-16"
        />

        <div className="max-w-[800px] space-y-6 md:space-y-10">
          {content.paragraphs.map((paragraph, idx) => (
            <motion.div
              key={idx}
              className="flex gap-6"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.5,
                delay: prefersReducedMotion ? 0 : idx * 0.15,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
            >
              {/* Timeline */}
              <div className="flex flex-col items-center flex-shrink-0 h-full">
                {/* Dot */}
                <div className="w-3 h-3 rounded-full bg-accent border-2 border-accent" />
                {/* Line */}
                <div className="w-0.5 flex-1 bg-border mt-2 min-h-[150px]" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-base font-semibold text-foreground mb-4">
                  {paragraph.title}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {paragraph.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
