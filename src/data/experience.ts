// src/data/experience.ts
export type ExperienceItem = {
  title_en: string;
  title_fr: string;
  company: string;
  companyUrl?: string;
  year?: string;
  description_en: string;
  description_fr: string;
  details_en?: string[];
  details_fr?: string[];
  links?: { label: string; href: string }[];
  // Legacy fields
  title: string;
  description: string;
  details?: string[];
};

export const experiences: ExperienceItem[] = [
  {
    title_en: "Consultant SaaS Product Manager",
    title_fr: "Consultant Product Manager SaaS",
    title: "Consultant SaaS Product Manager",
    company: "DOMUSVI",
    companyUrl: "https://www.domusvi.com/",
    year: "2024",
    description_en: "Delivered a SaaS business tool solution, leading 0→1 conception with various stakeholders",
    description_fr: "Livré une solution SaaS métier, piloté la conception 0→1 avec diverses parties prenantes",
    description: "Delivered a SaaS business tool solution, leading 0→1 conception with various stakeholders",
    details_en: [
      "Scope: health, CRM, leasing, catering",
      "Discovery → MVP → onboarding (POC validated, MVP adopted)",
      "Coordinated SaaS vendor + IT + business + legal",
    ],
    details_fr: [
      "Périmètre : santé, CRM, leasing, restauration",
      "Discovery → MVP → onboarding (POC validé, MVP adopté)",
      "Coordination éditeur SaaS + IT + métier + juridique",
    ],
    details: [
      "Scope: health, CRM, leasing, catering",
      "Discovery → MVP → onboarding (POC validated, MVP adopted)",
      "Coordinated SaaS vendor + IT + business + legal",
    ],
  },
  {
    title_en: "Consultant Data Project Manager",
    title_fr: "Consultant Chef de Projet Data",
    title: "Consultant Data Project Manager",
    company: "BOUYGUES TELECOM",
    companyUrl: "https://www.corporate.bouyguestelecom.fr/",
    year: "2023",
    description_en: "Led invoice recovery from data aggregation to +40% recovered",
    description_fr: "Piloté le recouvrement de factures de l'agrégation data à +40% récupérés",
    description: "Led invoice recovery from data aggregation to +40% recovered",
    details_en: [
      "Cross-team dashboard (IT, finance, sales, leadership)",
      "Prioritization flow for collections",
      "Result: dashboard adopted, +40% recovered",
    ],
    details_fr: [
      "Dashboard cross-équipes (IT, finance, ventes, direction)",
      "Flux de priorisation pour les recouvrements",
      "Résultat : dashboard adopté, +40% récupérés",
    ],
    details: [
      "Cross-team dashboard (IT, finance, sales, leadership)",
      "Prioritization flow for collections",
      "Result: dashboard adopted, +40% recovered",
    ],
  },
  {
    title_en: "SaaS Data Project Manager",
    title_fr: "Chef de Projet Data SaaS",
    title: "SaaS Data Project Manager",
    company: "HUWISE",
    companyUrl: "https://www.data.gouv.fr/organizations/huwise/",
    year: "2022",
    description_en: "Accompanied and led 20 cities and metropolises in building their open data portals",
    description_fr: "Accompagné et piloté 20 villes et métropoles dans la construction de leurs portails open data",
    description: "Accompanied and led 20 cities and metropolises in building their open data portals",
    details_en: [
      "Portfolio: 22 public sector customers across EU",
      "Training, usage KPIs follow-up, 0 churn on scope",
      "Launched 2 new city portals, increased data volume",
    ],
    details_fr: [
      "Portefeuille : 22 clients secteur public en UE",
      "Formation, suivi KPIs d'usage, 0 churn sur périmètre",
      "Lancement de 2 nouveaux portails urbains, augmentation du volume de données",
    ],
    details: [
      "Portfolio: 22 public sector customers across EU",
      "Training, usage KPIs follow-up, 0 churn on scope",
      "Launched 2 new city portals, increased data volume",
    ],
  },
  {
    title_en: "Open Data SaaS Co-founder",
    title_fr: "Co-fondateur Open Data SaaS",
    title: "Open Data SaaS Co-founder",
    company: "SONOR",
    companyUrl: "https://sonor.dorik.io/",
    year: "2020",
    description_en: "Open-data SaaS to help cities reduce noise pollution",
    description_fr: "SaaS open-data pour aider les villes à réduire la pollution sonore",
    description: "Open-data SaaS to help cities reduce noise pollution",
    details_en: [
      "Team of 4 in partnerships with Matrice Incubator & Banque des Territoires",
      "Discovery, PRD, backlog; led a dev/data-scientist",
      "2 public grants (€20k), prototype delivered",
    ],
    details_fr: [
      "Équipe de 4 avec Incubateur Matrice & Banque des Territoires",
      "Discovery, PRD, backlog ; encadré un dev/data-scientist",
      "2 subventions publiques (€20k), prototype livré",
    ],
    details: [
      "Team of 4 with Matrice Incubator & Banque des Territoires",
      "Discovery, PRD, backlog; led a dev/data-scientist",
      "2 public grants (€20k), prototype delivered",
    ],
  },
];
