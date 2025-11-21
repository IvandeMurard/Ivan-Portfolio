import { useLanguage } from "@/contexts/LanguageContext";
import { myApproachContent } from "@/data/myApproach";

export function MyApproachContent() {
  const { language } = useLanguage();
  const content = myApproachContent[language];

  return (
    <div className="max-w-4xl mx-auto">
      {/* About Section */}
      <div className="space-y-6 bg-background/40 backdrop-blur-sm border border-border/50 rounded-2xl p-6 md:p-8">
        <h3 className="text-2xl font-bold text-foreground">{content.about.title}</h3>
        <div className="space-y-6">
          {content.about.paragraphs.map((paragraph, idx) => (
            <div key={idx} className="space-y-2">
              <h4 className="text-lg font-semibold text-foreground">{paragraph.title}</h4>
              <p className="text-base text-muted-foreground leading-relaxed">{paragraph.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
