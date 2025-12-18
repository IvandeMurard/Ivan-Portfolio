// src/data/projects.ts
import { sonorCase } from "./cases/sonor.case";
import wttjHero from "@/assets/wttj-hero.png";
import wttjLogo from "@/assets/wttj-logo.svg";

export interface Project {
  id: string;
  title_en: string;
  title_fr: string;
  subtitle_en: string;
  subtitle_fr: string;
  image: string;
  tags_en: string[];
  tags_fr: string[];
  category: string;
  logo?: string;
  bullets_en?: string[];
  bullets_fr?: string[];
  longDescription_en?: string;
  longDescription_fr?: string;
  kicker_en?: string;
  kicker_fr?: string;
  tagline_en?: string;
  tagline_fr?: string;
  modalTitle_en?: string;
  modalTitle_fr?: string;
  modalSubtitle_en?: string;
  modalSubtitle_fr?: string;
  hidden?: boolean;
  ctaLabel_en?: string;
  ctaLabel_fr?: string;
}

export const projects: Project[] = [
  // SONOR
  {
    id: sonorCase.id,
    title_en: "A 2-year entrepreneurship team project",
    title_fr: "Un projet entrepreneurial en équipe de 2 ans",
    subtitle_en: "How can cities turn open data into quieter streets?",
    subtitle_fr: "Comment les villes peuvent-elles transformer l'open data en rues plus calmes ?",
    image: sonorCase.image,
    logo: sonorCase.logo,
    tags_en: [sonorCase.badge_en || "Open Data"],
    tags_fr: [sonorCase.badge_fr || "Open Data"],
    category: "product",
    tagline_en: "Making the invisible visible",
    tagline_fr: "Rendre visible l'invisible",
    longDescription_en: "Reducing urban noise by transforming open data into actionable city insights.",
    longDescription_fr: "Réduire le bruit urbain en transformant l'open data en insights actionnables pour les villes.",
    bullets_en: [
      "20+ stakeholder interviews across city departments",
      "€20k pre-seed funding secured for the concept",
      "Map + data pipeline prototype to surface hotspots",
    ],
    bullets_fr: [
      "20+ entretiens parties prenantes",
      "€20k de financement pré-seed",
      "Prototype carte + pipeline data pour identifier les zones critiques",
    ],
    ctaLabel_en: "Discover the case study!",
    ctaLabel_fr: "Découvrir l'étude de cas !",
  },
  // WTTJ
  {
    id: "wttj-conversion-seniors",
    title_en: "A growth-oriented product case study",
    title_fr: "Une étude de cas produit orientée croissance",
    subtitle_en: "How can we improve candidate\u00A0conversions on WTTJ?",
    subtitle_fr: "Comment augmenter la conversion des candidats seniors sur WTTJ ?",
    image: wttjHero,
    logo: wttjLogo,
    tags_en: ["Growth", "Product Management"],
    tags_fr: ["Croissance", "Product Management"],
    category: "product",
    longDescription_en: "Improving conversion for senior candidates through clearer offers and guided activation.",
    longDescription_fr:
      "Améliorer la conversion des candidats seniors via des offres plus claires et une activation guidée.",
    bullets_en: [
      "User discovery with senior engineers to surface friction",
      "Strategy pivot towards a clearer, more focused WTTJ Tech+",
      "MVP: standardized job pages + guided onboarding + AI helper",
      "Early signal: CTR 11% → 13% and +300 to +800 activated profiles",
    ],
    bullets_fr: [
      "Discovery utilisateurs avec des ingénieurs seniors pour identifier les frictions",
      "Pivot stratégique vers un WTTJ Tech+ plus clair et focalisé",
      "MVP : pages d'offres standardisées + onboarding guidé + assistant IA",
      "Signal précoce : CTR 11% → 13% et +300 à +800 profils activés",
    ],
    ctaLabel_en: "Discover the case study!",
    ctaLabel_fr: "Découvrir l'étude de cas !",
  },
  // Agentic Evaluation
  {
    id: "agentic-evaluation",
    title_en: "The missing quality layer for multi-agent systems",
    title_fr: "La couche qualité manquante pour les systèmes multi-agents",
    subtitle_en: "How do we value agentic trust?",
    subtitle_fr: "Comment évaluer la confiance agentique ?",
    image: "/img/samuel-arkwright-unsplash.jpg",
    tags_en: ["Agentic Experiences", "Multi-Agent", "Evaluation"],
    tags_fr: ["Expériences Agentiques", "Multi-Agent", "Évaluation"],
    category: "agentic-experiences",
    longDescription_en: "An Evaluation Agent designed as Supervisor for multi-agent systems.",
    longDescription_fr: "Un Agent d'Évaluation conçu comme Superviseur pour les systèmes multi-agents.",
    bullets_en: [
      "Evaluation Agent as autonomous Supervisor",
      "Audits agent-to-agent communication",
      "Safety-by-design & SOC-2 compatible constraints",
      "Explainable scoring for every interaction",
    ],
    bullets_fr: [
      "Agent d'Évaluation comme Superviseur autonome",
      "Audit de la communication agent-à-agent",
      "Safety-by-design & contraintes compatibles SOC-2",
      "Scoring explicable pour chaque interaction",
    ],
    ctaLabel_en: "Discover the case study!",
    ctaLabel_fr: "Découvrir l'étude de cas !",
  },
  // Agentic Hospitality
  {
    id: "agentic-hospitality",
    title_en: "A hospitality agentic experience case study",
    title_fr: "Une étude de cas d'expérience agentique en hôtellerie",
    subtitle_en: "Can we value agents to predict hotels' staff and F&B needs?",
    subtitle_fr: "Comment valoriser les agents pour prédire les besoins en staff et F&B des hôtels ?",
    image: "/img/photo-by-dylan-calluy-unsplash.jpg",
    tags_en: ["Agentic Experiences", "Hackathon"],
    tags_fr: ["Expériences Agentiques", "Hackathon"],
    category: "agentic-experiences",
    kicker_en: "CASE STUDY – A HOSPITALITY AGENTIC EXPERIENCE CASE STUDY",
    kicker_fr: "ÉTUDE DE CAS – EXPÉRIENCE AGENTIQUE EN HÔTELLERIE",
    tagline_en: "AI agents for operational hospitality efficiency",
    tagline_fr: "Agents IA autonomes pour l'efficacité hôtelière operationnelle",
    modalTitle_en: "Can we value agents to predict restaurant and hotel attendance?",
    modalTitle_fr: "Peut-on valoriser les agents pour prédire la fréquentation hôtelière ?",
    modalSubtitle_en: "Building autonomous AI agents for hospitality efficiency",
    modalSubtitle_fr: "Construire des agents IA autonomes pour l'efficacité hôtelière",
    bullets_en: [
      "Autonomous agent for hotel F&B operations",
      "Attendance and F&B predictability, Staff Management",
      "Built for Pioneers AILab Hackathon @ Station F",
      "Tech Stack: Claude, Cursor, Qdrant, ElevenLabs, Warp, Obsidian",
    ],
    bullets_fr: [
      "Agent autonome pour les opérations F&B d'hôtels",
      "Prédictibilité des besoins en staff et F&B",
      "Construit pour le Hackathon Pioneers AILab @ Station F",
      "Tech Stack: Claude, Cursor, Qdrant, ElevenLabs, Warp, Obsidian",
    ],
    longDescription_en: "A hackathon project exploring AI agents for predictive hospitality operations.",
    longDescription_fr: "Un projet de hackathon explorant les agents IA pour les opérations hôtelières prédictives.",
    ctaLabel_en: "Discover the case study!",
    ctaLabel_fr: "Découvrir l'étude de cas !",
  },
  // Agentic Studio
  {
    id: "agentic-studio",
    title_en: "AN EXPERIMENTAL PRODUCT IN AGENTIC DESIGN",
    title_fr: "UN PRODUIT EXPÉRIMENTAL EN DESIGN AGENTIQUE",
    subtitle_en: "How might we bridge human intuition and agent intelligence?",
    subtitle_fr: "Comment rapprocher l'intuition humaine et l'intelligence des agents ?",
    image: "/img/gabriella-clare-marino-unsplash.jpg",
    tags_en: ["Experience", "Agentic Experiences"],
    tags_fr: ["Expérience", "Expériences Agentiques"],
    category: "experience",
    kicker_en: "CASE STUDY – AN EXPERIMENTAL PRODUCT IN AGENTIC DESIGN",
    kicker_fr: "ÉTUDE DE CAS – PRODUIT EXPÉRIMENTAL EN DESIGN AGENTIQUE",
    tagline_en: "A product exploration in Agent Experience (AX)",
    tagline_fr: "Une exploration produit en Agent Experience (AX)",
    modalTitle_en: "The Agentic Studio — AX design in practice",
    modalTitle_fr: "Le Studio Agentique — AX design en pratique",
    modalSubtitle_en:
      "Exploring how intelligent agents can interpret human intention within a creative environment. This prototype tests how gesture, voice, and context can drive co-creation, while keeping human supervision at the core of the experience.",
    modalSubtitle_fr:
      "Explorer comment les agents intelligents peuvent interpréter l'intention humaine dans un environnement créatif. Ce prototype teste comment le geste, la voix et le contexte peuvent piloter la co-création, tout en gardant la supervision humaine au cœur de l'expérience.",
    longDescription_en: "A product exploration in Agent Experience (AX)",
    longDescription_fr: "Une exploration produit en Agent Experience (AX)",
    bullets_en: [
      "The Agentic Studio serves as a scalable testbed for an agentic architecture that can be deployed across creative or operational environments.",
      "Designed a multimodal co-creation flow combining gesture and voice inputs",
      "Built a human-in-the-loop feedback system for supervision and correction",
      "Implemented adaptive guidance based on user habits and style",
      "Documented a framework for Agent Experience (AX) design and evaluation",
    ],
    bullets_fr: [
      "Le Studio Agentique sert de banc d'essai évolutif pour une architecture agentique déployable dans des environnements créatifs ou opérationnels.",
      "Conception d'un flux de co-création multimodal combinant gestes et voix",
      "Construction d'un système de feedback human-in-the-loop pour supervision et correction",
      "Mise en œuvre de guidage adaptatif basé sur les habitudes et le style de l'utilisateur",
      "Documentation d'un framework pour la conception et l'évaluation d'Agent Experience (AX)",
    ],
    ctaLabel_en: "Discover the case study!",
    ctaLabel_fr: "Découvrir l'étude de cas !",
  },
  // Spotify Valence
  {
    id: "spotify-valence-journeys",
    title_en: "A musical data-driven experience",
    title_fr: "Une expérience musicale pilotée par la data",
    subtitle_en: "Can we value music mood to nudge better daily choices?",
    subtitle_fr: "Peut-on valoriser l'humeur musicale pour orienter de meilleurs choix quotidiens ?",
    image: "/images/projects/spotify-mood/cover.webp",
    tags_en: ["Experience"],
    tags_fr: ["Expérience"],
    category: "experience",
    longDescription_en: "Turning listening signals (valence/arousal) into nudging, helpful suggestions.",
    longDescription_fr: "Transformer les signaux d'écoute (valence/activation) en suggestions utiles et incitatives.",
    bullets_en: [
      "Map mood to actionable suggestions (focus, move, social)",
      "Context-aware flow: time, history, energy",
      "Solo or social modes (local jam / shared moments)",
      "Next: mobile wireframes and qualitative testing",
    ],
    bullets_fr: [
      "Mapper l'humeur vers des suggestions actionnables (focus, mouvement, social)",
      "Flux contextuel : temps, historique, énergie",
      "Modes solo ou social (jam local / moments partagés)",
      "Prochaine étape : wireframes mobile et tests qualitatifs",
    ],
    ctaLabel_en: "Discover the case study!",
    ctaLabel_fr: "Découvrir l'étude de cas !",
  },
  // On Air
  {
    id: "on-air",
    title_en: "Record and auto-transcribe lyrics & melody in real time?",
    title_fr: "Enregistrer et transcrire automatiquement paroles & mélodie en temps réel ?",
    subtitle_en: "What if songwriting felt truly live and collaborative?",
    subtitle_fr: "Et si l'écriture de chansons devenait vraiment live et collaborative ?",
    image: "/images/projects/on-air/cover.webp",
    tags_en: ["Product"],
    tags_fr: ["Produit"],
    category: "product",
    longDescription_en: "From live rooms to time-coded snippets you can share instantly.",
    longDescription_fr: "Des rooms live aux extraits horodatés que vous pouvez partager instantanément.",
    bullets_en: [
      "Live rooms that feel immediate and lightweight",
      "Automatic capture of lyrics and melody/tablature",
      "Time-coded highlights for quick sharing",
      "Roadmap: V1 capture → V2 non-destructive editing → V3 creative packs",
    ],
    bullets_fr: [
      "Rooms live immédiates et légères",
      "Capture automatique des paroles et mélodie/tablature",
      "Highlights horodatés pour partage rapide",
      "Roadmap : V1 capture → V2 édition non-destructive → V3 packs créatifs",
    ],
    ctaLabel_en: "Discover the case study!",
    ctaLabel_fr: "Découvrir l'étude de cas !",
  },
];
