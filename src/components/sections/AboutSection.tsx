import { useLanguage } from "@/hooks/useLanguage";
import { SectionHeader } from "@/components/SectionHeader";
import { myApproachContent } from "@/data/myApproach";

export function AboutSection() {
  const { language } = useLanguage();
  const content = myApproachContent[language].about;

  return (
    <section id="about" className="py-24 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          title={content.title}
          alignment="center"
          className="mb-16"
        />

        <div className="max-w-[800px] mx-auto space-y-6 md:space-y-10">
          {content.paragraphs.map((paragraph, idx) => (
            <div key={idx} className="flex gap-6">
              {/* Timeline */}
              <div className="flex flex-col items-center flex-shrink-0">
                {/* Dot */}
                <div className="w-3 h-3 rounded-full bg-accent border-2 border-accent" />
                {/* Line (if not last item) */}
                {idx < content.paragraphs.length - 1 && (
                  <div className="w-0.5 flex-1 bg-border mt-2" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-10 last:pb-0">
                <h3 className="text-base font-semibold text-foreground mb-4">
                  {paragraph.title}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {paragraph.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
