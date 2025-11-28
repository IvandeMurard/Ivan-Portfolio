// src/data/continuousLearning.ts
export interface ContinuousLearningItem {
  year: string;
  title_en: string;
  title_fr: string;
  source: string;
  description_en: string;
  description_fr: string;
  link: string;
}

export const continuousLearning: ContinuousLearningItem[] = [
  {
    year: "2025",
    title_en: "Product Management Intensive Program",
    title_fr: "Programme Intensif Product Management",
    source: "MAESTRO",
    description_en: "I honed my 0→1 product lifecycle management skills. Use cases: Carrefour, Welcome To The Jungle",
    description_fr: "J'ai affiné mes compétences en gestion du cycle de vie produit 0→1. Cas d'usage : Carrefour, Welcome To The Jungle",
    link: "https://maestro.mariaschools.com/formations/devenez-product-manager-formation-a-temps-plein-en-presentiel",
  },
  {
    year: "2025",
    title_en: "Building Strategic Foresight Capabilities",
    title_fr: "Développer des Capacités de Prospective Stratégique",
    source: "EDHEC Business School & UNESCO",
    description_en: "I learned strategic foresight methods to anticipate and shape future scenarios",
    description_fr: "J'ai appris les méthodes de prospective stratégique pour anticiper et façonner les scénarios futurs",
    link: "https://www.coursera.org/learn/strategic-foresight",
  },
  {
    year: "2020",
    title_en: "Service Design: Delivering Integrated Service Design Experiences.",
    title_fr: "Service Design : Délivrer des Expériences de Service Design Intégrées.",
    source: "The Interaction Design Foundation",
    description_en: "I learned how to value design to conceive full-stack business-oriented experiences",
    description_fr: "J'ai appris à valoriser le design pour concevoir des expériences business orientées full-stack",
    link: "https://www.interaction-design.org/courses/service-design-how-to-design-integrated-service-experiences",
  },
  {
    year: "2019",
    title_en: "Lion du Samedi (it became Le Promptathon in 2025, which I also attended)",
    title_fr: "Lion du Samedi (devenu Le Promptathon en 2025, auquel j'ai aussi participé)",
    source: "Join Lion",
    description_en: "I learned how to work in the start-up universe and innovate better",
    description_fr: "J'ai appris à travailler dans l'univers start-up et à mieux innover",
    link: "https://medium.com/join-lion/une-1%C3%A8re-journ%C3%A9e-chez-lion-66040cf097b2",
  },
];
