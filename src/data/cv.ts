// src/data/cv.ts — CV-specific data (skills, side projects, contact)

export const cvContact = {
  email: "ivandemurard@gmail.com",
  calendar: "https://cal.com/ivandemurard/30min",
  location: "Paris, France",
  linkedin: "https://www.linkedin.com/in/ivan-music-de-murard/",
};

export interface SkillCategory {
  label_en: string;
  label_fr: string;
  items: string[];
}

export const cvSkills: SkillCategory[] = [
  {
    label_en: "Languages",
    label_fr: "Langues",
    items: ["Français (natif)", "English (C1)"],
  },
  {
    label_en: "Product",
    label_fr: "Produit",
    items: ["Discovery", "User Research", "PRD", "User Stories", "Roadmap", "Go-to-Market", "KPIs / OKRs"],
  },
  {
    label_en: "Methodologies",
    label_fr: "Méthodologies",
    items: ["Scrum", "Kanban", "Shape Up", "Design Thinking", "Jobs-to-be-Done", "RICE"],
  },
  {
    label_en: "Tools",
    label_fr: "Outils",
    items: ["Figma", "Notion", "Linear", "Jira", "Amplitude", "Hotjar", "Mixpanel"],
  },
  {
    label_en: "AI & Automation",
    label_fr: "IA & Automatisation",
    items: ["Prompt Engineering", "RAG", "LLM Evaluation", "Agents", "Cursor", "Lovable", "n8n"],
  },
  {
    label_en: "Technical",
    label_fr: "Technique",
    items: ["SQL", "Python", "TypeScript", "React", "REST APIs", "Supabase", "Git"],
  },
];

export interface SideProjectItem {
  title_en: string;
  title_fr: string;
  description_en: string;
  description_fr: string;
  year?: string;
  link?: string;
}

export const cvSideProjects: SideProjectItem[] = [
  {
    title_en: "F&B Agent – AI Side Project",
    title_fr: "F&B Agent – Side-project IA",
    description_en: "Agentic AI concierge for boutique hotels: multi-agent RAG architecture, evaluation pipeline, built with Cursor + Lovable + Supabase",
    description_fr: "Concierge IA agentique pour hôtels boutique : architecture multi-agent RAG, pipeline d'évaluation, construit avec Cursor + Lovable + Supabase",
    year: "2025",
  },
  {
    title_en: "Hack The Crisis – Hackathon Winner",
    title_fr: "Hack The Crisis – Hackathon Lauréat",
    description_en: "1st prize – Designed & pitched a crisis response tool in 48h during COVID-19",
    description_fr: "1er prix – Conçu & pitché un outil de réponse de crise en 48h pendant le COVID-19",
    year: "2020",
  },
  {
    title_en: "Recoder l'Habitat – Hackathon",
    title_fr: "Recoder l'Habitat – Hackathon",
    description_en: "2nd prize – Sustainable housing innovation challenge",
    description_fr: "2e prix – Challenge d'innovation pour l'habitat durable",
    year: "2019",
  },
  {
    title_en: "Volunteering – GrowNYC Greenmarkets",
    title_fr: "Bénévolat – Marchés GrowNYC",
    description_en: "Volunteered at New York City farmers' markets with GrowNYC: direct sales alongside local farmers, visitor outreach and awareness, participation in community events",
    description_fr: "Volontariat sur les marchés fermiers de New York avec GrowNYC : vente aux côtés des producteurs locaux, sensibilisation des visiteurs, participation à des événements communautaires",
    year: "2012",
  },
];

export const cvTagline = {
  en: "5 years of cross-functional product management · 2 years SaaS co-founder · Entrepreneurship, start-up and scale-up experience · AI and data-driven",
  fr: "5 ans de gestion produit cross-fonctionnelle · 2 ans co-fondateur SaaS · Expérience entrepreneuriale, start-up et scale-up · IA et data-driven",
};
