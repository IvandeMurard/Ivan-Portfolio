import { useLanguage } from "@/contexts/LanguageContext";
import { myApproachContent } from "@/data/myApproach";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function MyApproachContent() {
  const { language } = useLanguage();
  const content = myApproachContent[language];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          {content.title}
        </h2>
      </div>

      {/* About Section */}
      <div className="space-y-6 bg-background/40 backdrop-blur-sm border border-border/50 rounded-2xl p-6 md:p-8">
        <h3 className="text-2xl font-bold text-foreground">{content.about.title}</h3>
        <div className="space-y-4">
          {content.about.paragraphs.map((paragraph, idx) => (
            <p key={idx} className="text-base text-muted-foreground leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Method Section */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-foreground">{content.method.title}</h3>
          <p className="text-muted-foreground">{content.method.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {content.method.phases.map((phase, idx) => (
            <div
              key={idx}
              className="bg-background/40 backdrop-blur-sm border border-border/50 rounded-2xl p-6 space-y-4 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start gap-4">
                <span className="text-4xl" role="img" aria-label={phase.title}>
                  {phase.icon}
                </span>
                <div className="flex-1 space-y-2">
                  <h4 className="text-xl font-bold text-foreground">{phase.title}</h4>
                  <p className="text-sm text-muted-foreground">{phase.description}</p>
                </div>
              </div>
              <ul className="space-y-2 ml-[52px]">
                {phase.points.map((point, pointIdx) => (
                  <li key={pointIdx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center space-y-4 py-8">
        <p className="text-lg text-muted-foreground">{content.cta.text}</p>
        <Button
          size="lg"
          className="bg-contact hover:bg-contact/90 text-contact-foreground group"
          onClick={() =>
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
          }
        >
          {content.cta.button}
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}