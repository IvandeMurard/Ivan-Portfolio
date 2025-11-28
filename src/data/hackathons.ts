// src/data/hackathons.ts
export interface Hackathon {
  year: string;
  title_en: string;
  title_fr: string;
  team_en: string;
  team_fr: string;
  status_en?: string;
  status_fr?: string;
  description_en: string;
  description_fr: string;
  skills_en: string[];
  skills_fr: string[];
}

export const hackathons: Hackathon[] = [
  {
    year: "2025",
    title_en: "Pioneers AI Lab Hackathon @ Station F",
    title_fr: "Hackathon Pioneers AI Lab @ Station F",
    team_en: "Solo",
    team_fr: "Solo",
    description_en: "Built an Autonomous AI Agent for hotels' F&B operations",
    description_fr: "Construit un Agent IA Autonome pour les opérations F&B d'hôtels",
    skills_en: ["AI Agents", "Hospitality Tech", "Autonomous Systems", "F&B Operations"],
    skills_fr: ["Agents IA", "Tech Hôtelière", "Systèmes Autonomes", "Opérations F&B"],
  },
  {
    year: "2025",
    title_en: "Windsurf × Mistral × The AI Collective",
    title_fr: "Windsurf × Mistral × The AI Collective",
    team_en: "Team of 4",
    team_fr: "Équipe de 4",
    status_en: "3rd Place",
    status_fr: "3ème Place",
    description_en: "Built an idea generator + matcher for hackathons with a video avatar.",
    description_fr: "Construit un générateur d'idées + matcher pour hackathons avec un avatar vidéo.",
    skills_en: ["Prompt engineering", "Content creation", "Social media"],
    skills_fr: ["Prompt engineering", "Création de contenu", "Réseaux sociaux"],
  },
  {
    year: "2025",
    title_en: "Lion du Samedi — Promptathon #1",
    title_fr: "Lion du Samedi — Promptathon #1",
    team_en: "Team of 5",
    team_fr: "Équipe de 5",
    description_en: "Prompted a functional tool to automate market-intel research and social publishing.",
    description_fr: "Prompté un outil fonctionnel pour automatiser la recherche market-intel et la publication sociale.",
    skills_en: ["Prompt engineering", "Automation", "Make", "Market intelligence", "Social media", "AI"],
    skills_fr: ["Prompt engineering", "Automatisation", "Make", "Intelligence marché", "Réseaux sociaux", "IA"],
  },
  {
    year: "2020",
    title_en: "Recoder l'Habitat #2",
    title_fr: "Recoder l'Habitat #2",
    team_en: "Team of 4",
    team_fr: "Équipe de 4",
    status_en: "1st Place 🏆",
    status_fr: "1ère Place 🏆",
    description_en: "Prototyped an open-data SaaS for city noise-pollution diagnostics.",
    description_fr: "Prototypé un SaaS open-data pour le diagnostic de pollution sonore urbaine.",
    skills_en: ["Prototyping", "Open data", "Product management", "Noise pollution", "Data visualization"],
    skills_fr: ["Prototypage", "Open data", "Product management", "Pollution sonore", "Visualisation de données"],
  },
  {
    year: "2020",
    title_en: "Hack The Crisis",
    title_fr: "Hack The Crisis",
    team_en: "Team of 5",
    team_fr: "Équipe de 5",
    status_en: "Finalists",
    status_fr: "Finalistes",
    description_en: "Prototyped a digital training & coordination tool for caregivers to ease hospital load.",
    description_fr: "Prototypé un outil numérique de formation & coordination pour les aidants afin d'alléger la charge hospitalière.",
    skills_en: ["Service design", "Prototyping", "HealthTech", "User journey"],
    skills_fr: ["Service design", "Prototypage", "HealthTech", "Parcours utilisateur"],
  },
];
