import { useLanguage } from "@/hooks/useLanguage";
import { SectionHeader } from "@/components/SectionHeader";

const aboutContent = {
  en: {
    title: "About",
    paragraphs: [
      {
        title: "What drives me",
        content:
          "As an AI Product Manager, I build products and experiences at the intersection of technology and human connection. I specialize in AI agents and SaaS platforms, but my sweet spot is creating experiences that bridge digital and physical worlds, where community, design, and technology meet.",
      },
      {
        title: "How I work",
        content:
          "I combine design intuition with data-driven decisions, grounded in a human-first, community-led philosophy. I constantly explore new AI tools and processes to ship faster and smarter. Whether it's prototyping agents, running experiments, or orchestrating cross-functional teams, I believe the best solutions emerge when technology amplifies genuine human needs.",
      },
      {
        title: "My background",
        content:
          "5+ years building products from scratch, including 2 years co-founding a B2G SaaS (Sonor), with experience with European clients. I've won hackathons, shipped products, and am building a community, always at the intersection of strategy, design, and execution.",
      },
    ],
  },
  fr: {
    title: "À propos",
    paragraphs: [
      {
        title: "Ce qui me motive",
        content:
          "En tant qu'AI Product Manager, je crée des produits et expériences à l'intersection de la technologie et de la connexion humaine. Je me spécialise dans les agents IA et plateformes SaaS, mais ma zone d'excellence se situe dans la création d'expériences qui relient les mondes digital et physique—là où communauté, design et technologie se rencontrent.",
      },
      {
        title: "Comment je travaille",
        content:
          "Je combine intuition design et décisions data-driven, ancrées dans une philosophie human-first et community-led. L'IA est mon accélérateur d'exécution—j'explore constamment de nouveaux outils et processus pour livrer plus vite et plus intelligemment. Que ce soit pour prototyper des agents, mener des expérimentations ou orchestrer des équipes cross-fonctionnelles, je crois que les meilleures solutions émergent quand la technologie amplifie de véritables besoins humains.",
      },
      {
        title: "Mon parcours",
        content:
          "5+ ans à construire des produits from scratch, dont 2 ans à co-fonder un SaaS B2G (Sonor), avec une expérience en Europe et aux États-Unis. J'ai gagné des hackathons, lancé des produits et créé des communautés—toujours à l'intersection de la stratégie, du design et de l'exécution.",
      },
    ],
  },
};

export function AboutSection() {
  const { language } = useLanguage();
  const content = aboutContent[language];

  return (
    <section id="about" className="py-24 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title={content.title}
          alignment="left"
          className="mb-12"
        />

        <div className="space-y-12">
          {content.paragraphs.map((paragraph, idx) => (
            <div key={idx} className="space-y-3">
              <h3 className="text-xl font-semibold text-foreground">
                {paragraph.title}
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                {paragraph.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

