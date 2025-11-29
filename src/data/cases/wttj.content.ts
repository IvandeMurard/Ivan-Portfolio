// src/data/cases/wttj.content.ts
export const wttjContent = {
  en: {
    progressLabels: [
      { id: 'context-problem', label: '1. Context' },
      { id: 'discovery', label: '2. Discovery' },
      { id: 'pivot', label: '3. Pivot' },
      { id: 'process', label: '4. Process' },
      { id: 'solution', label: '5. Solution' },
      { id: 'learnings', label: '6. Learnings' },
      { id: 'go-further', label: '7. More' },
    ],
    hero: {
      title: "Increasing senior-candidate conversion on WTTJ",
    },
    sidebar: {
      role: "Product Manager",
      duration: "12 days (Oct 2024)",
      team: "4 PMs",
      client: "Welcome to the Jungle",
      industry: "HR Tech / Job Platform",
      context: "PM Maestro Training",
    },
    tldr: {
      items: [
        {
          label: 'Context',
          content: 'Training project completed as part of Product Management Maestro (12 days)',
        },
        {
          label: 'Challenge',
          content: 'Senior profiles CTR at 11% vs 20% for junior profiles',
        },
        {
          label: 'Strategic Pivot',
          content: 'Focus on tech profiles with 5-8 years of experience as core segment',
        },
        {
          label: 'MVP Solution',
          content: 'Standardization + AI-powered recommendations + Advanced filters',
        },
        {
          label: 'Target Impact',
          content: 'Increase senior CTR from 11% to 13% within 6 months',
        },
        {
          label: 'Key Constraints',
          content: '12-day project timeline (training context) ; Focus on quick wins and realistic MVP scope',
        },
      ],
      disclaimer: {
        type: 'academic' as const,
        message: 'This is an academic case study completed during Product Management Maestro training. No contractual relationship exists with Welcome to the Jungle.',
      },
    },
    sections: {
      contextProblem: {
        title: "1. Context & Problem",
        challenge: "The Challenge",
        challengeText: "Welcome to the Jungle (WTTJ) is a leading HR tech platform connecting job seekers with companies. While junior profiles achieved a 20% click-through rate (CTR), senior profiles with 5+ years of experience struggled at only 11% CTR.",
        whyMatters: "Why It Matters",
        bullets: [
          "Senior profiles represent higher-value placements for WTTJ",
          "Companies specifically seek experienced talent for strategic roles",
          "Low engagement suggests platform mismatch with senior expectations",
        ],
        caption: "Data and market signals",
      },
      discovery: {
        title: "2. Discovery",
        intro: "We conducted 8 qualitative video interviews with senior profiles (tech and other industries) to understand their job search behavior and pain points.",
        bullets: [
          "Insights: transparency (salary, missions), relevant filters, guidance",
          "CTR seniors ≈ 11% vs 20% juniors; need for offer clarity",
          "Senior profiles seek stability and clear career progression",
        ],
        captions: {
          jtbd: "JTBD and key verbatims",
          journey: "User journey mapping",
        },
      },
      pivot: {
        title: "3. Strategic Pivot",
        intro: "Based on our research, we identified that tech profiles with 5-8 years of experience represent the highest-value segment for WTTJ. This strategic pivot allowed us to focus our solution on a well-defined target audience.",
        caption: "Strategic pivot: Focus on tech seniors 5-8 years",
      },
      process: {
        title: "4. Process & Key Decisions",
        phases: [
          {
            icon: "1",
            phase: "Discovery",
            description: "Understanding the problem space and user needs",
            bullets: [
              'Analyzed WTTJ platform UX for senior profiles',
              'Competitive research: LinkedIn, Indeed, Monster',
              'Synthesized public reviews and forum discussions',
              'Identified key pain points: generic listings, poor filters',
            ],
            metric: {
              label: 'Key Insight',
              value: 'Seniors seek stability & clear career progression over quantity of offers',
            },
          },
          {
            icon: "2",
            phase: "Segmentation",
            description: "Defining our target audience",
            bullets: [
              'Created 3 personas: Junior (0-2y), Mid (3-5y), Senior (5-8y)',
              'Focused on tech profiles (developers, designers, PMs)',
              'Analyzed behavior patterns per segment',
              'Validated segment size and business value',
            ],
            metric: {
              label: 'Strategic Decision',
              value: 'Target tech seniors 5-8 years as highest-value segment',
            },
          },
          {
            icon: "3",
            phase: "Ideation",
            description: "Generating and prioritizing solutions",
            bullets: [
              '3 team brainstorming sessions (20+ ideas)',
              'Prioritization matrix: Impact vs Effort',
              'Evaluated feasibility with tech constraints',
              'Aligned solutions with WTTJ business model',
            ],
            metric: {
              label: 'Ideas Generated',
              value: '22 concepts → 5 prioritized features',
            },
          },
          {
            icon: "4",
            phase: "Validation",
            description: "Testing hypotheses and assumptions",
            bullets: [
              'Validated with industry best practices',
              'Competitor benchmarking for feature inspiration',
              'Estimated ROI for top 5 features',
              'Defined success metrics and tracking plan',
            ],
          },
          {
            icon: "5",
            phase: "MVP Definition",
            description: "Defining minimum viable solution",
            bullets: [
              'Scoped 3 core features for MVP',
              'Created user flows and wireframes',
              'Defined 6-month roadmap phases',
              'Prepared stakeholder presentation',
            ],
            metric: {
              label: 'MVP Scope',
              value: '3 features, 3-month build estimate',
            },
          },
        ],
      },
      solution: {
        title: "5. Solution & Prototype",
        intro: "Our MVP focused on three core features designed to address senior professionals' specific needs while remaining achievable within realistic constraints.",
        features: [
          {
            title: "1. Offer Standardization",
            description: "Structured job listings with mandatory fields: salary range, tech stack, team size, career path.",
          },
          {
            title: "2. AI-Powered Recommendations",
            description: "Personalized job matching based on experience level, skills, and career trajectory preferences.",
          },
          {
            title: "3. Advanced Filters",
            description: "Enable filtering by seniority level, tech stack, team culture, remote options, career paths.",
          },
        ],
        prototypeTitle: "Interactive Prototype",
        prototypeText: "Explore the interactive prototype showcasing the standardized job pages and onboarding flow.",
        prototypeButton: "View Prototype",
        captions: {
          tests: "User testing results",
          gtm: "Go to market strategy",
          risks: "Risk matrix and mitigation strategies",
        },
      },
      learnings: {
        title: "6. Key Learnings",
        items: [
          {
            title: "Senior != One Size Fits All",
            description: "5-8 years tech seniors have distinct needs from 10+ year executives. Segment carefully.",
          },
          {
            title: "Transparency Builds Trust",
            description: "Clear salary ranges and role expectations reduce friction and increase application quality.",
          },
          {
            title: "AI as Augmentation",
            description: "AI recommendations work best when combined with human-friendly filters and clear controls.",
          },
          {
            title: "MVP Must Be Realistic",
            description: "Academic timeframes force prioritization. Real-world MVP would include user testing.",
          },
        ],
      },
      goFurther: {
        title: "7. Go Further",
        intro: "This case study represents the foundation. Here's how we'd evolve the solution in a real-world scenario:",
        bullets: [
          "A/B test standardized vs. original listings to validate CTR improvement hypothesis",
          "Conduct usability testing with 15+ senior candidates on the prototype",
          "Build analytics dashboard to track segment-specific engagement metrics",
          "Expand to other high-value segments (design, product management)",
          "Partner with HR teams to ensure quality of standardized job postings",
        ],
      },
    },
    contact: {
      title: "Contact",
      cta: "Let's discuss your product challenges",
    },
    footer: {
      label: "Back to Portfolio",
    },
  },
  fr: {
    progressLabels: [
      { id: 'context-problem', label: '1. Contexte' },
      { id: 'discovery', label: '2. Discovery' },
      { id: 'pivot', label: '3. Pivot' },
      { id: 'process', label: '4. Processus' },
      { id: 'solution', label: '5. Solution' },
      { id: 'learnings', label: '6. Apprentissages' },
      { id: 'go-further', label: '7. Plus' },
    ],
    hero: {
      title: "Augmenter la conversion des candidats seniors sur WTTJ",
    },
    sidebar: {
      role: "Product Manager",
      duration: "12 jours (Oct 2024)",
      team: "4 PMs",
      client: "Welcome to the Jungle",
      industry: "HR Tech / Plateforme d'emploi",
      context: "Formation PM Maestro",
    },
    tldr: {
      items: [
        {
          label: 'Contexte',
          content: 'Projet de formation réalisé dans le cadre de Product Management Maestro (12 jours)',
        },
        {
          label: 'Challenge',
          content: 'CTR des profils seniors à 11% vs 20% pour les profils juniors',
        },
        {
          label: 'Pivot Stratégique',
          content: "Focus sur les profils tech avec 5-8 ans d'expérience comme segment cible",
        },
        {
          label: 'Solution MVP',
          content: 'Standardisation + recommandations IA + filtres avancés',
        },
        {
          label: 'Impact Visé',
          content: 'Augmenter le CTR senior de 11% à 13% en 6 mois',
        },
        {
          label: 'Contraintes Clés',
          content: 'Projet sur 12 jours (contexte formation) ; Focus sur quick wins et scope MVP réaliste',
        },
      ],
      disclaimer: {
        type: 'academic' as const,
        message: "Ceci est une étude de cas académique réalisée pendant la formation Product Management Maestro. Aucune relation contractuelle n'existe avec Welcome to the Jungle.",
      },
    },
    sections: {
      contextProblem: {
        title: "1. Contexte & Problème",
        challenge: "Le Challenge",
        challengeText: "Welcome to the Jungle (WTTJ) est une plateforme HR tech leader connectant chercheurs d'emploi et entreprises. Alors que les profils juniors atteignent un CTR de 20%, les profils seniors avec 5+ ans d'expérience plafonnent à seulement 11% de CTR.",
        whyMatters: "Pourquoi C'est Important",
        bullets: [
          "Les profils seniors représentent des placements à plus haute valeur pour WTTJ",
          "Les entreprises recherchent spécifiquement des talents expérimentés pour des rôles stratégiques",
          "Le faible engagement suggère un décalage entre la plateforme et les attentes des seniors",
        ],
        caption: "Données et signaux marché",
      },
      discovery: {
        title: "2. Discovery",
        intro: "Nous avons mené 8 entretiens vidéo qualitatifs avec des profils seniors (tech et autres secteurs) pour comprendre leur comportement de recherche d'emploi et leurs points de friction.",
        bullets: [
          "Insights : transparence (salaire, missions), filtres pertinents, guidage",
          "CTR seniors ≈ 11% vs 20% juniors ; besoin de clarté sur les offres",
          "Les profils seniors recherchent stabilité et progression de carrière claire",
        ],
        captions: {
          jtbd: "JTBD et verbatims clés",
          journey: "Cartographie du parcours utilisateur",
        },
      },
      pivot: {
        title: "3. Pivot Stratégique",
        intro: "D'après notre recherche, nous avons identifié que les profils tech avec 5-8 ans d'expérience représentent le segment à plus haute valeur pour WTTJ. Ce pivot stratégique nous a permis de concentrer notre solution sur une audience cible bien définie.",
        caption: "Pivot stratégique : Focus sur tech seniors 5-8 ans",
      },
      process: {
        title: "4. Processus & Décisions Clés",
        phases: [
          {
            icon: "1",
            phase: "Discovery",
            description: "Comprendre l'espace problème et les besoins utilisateurs",
            bullets: [
              'Analysé l\'UX de la plateforme WTTJ pour les profils seniors',
              'Recherche concurrentielle : LinkedIn, Indeed, Monster',
              'Synthétisé les avis publics et discussions forums',
              'Identifié les points de friction clés : annonces génériques, filtres pauvres',
            ],
            metric: {
              label: 'Insight Clé',
              value: 'Les seniors recherchent stabilité & progression claire plutôt que quantité d\'offres',
            },
          },
          {
            icon: "2",
            phase: "Segmentation",
            description: "Définir notre audience cible",
            bullets: [
              'Créé 3 personas : Junior (0-2a), Mid (3-5a), Senior (5-8a)',
              'Focus sur profils tech (développeurs, designers, PMs)',
              'Analysé les patterns de comportement par segment',
              'Validé la taille du segment et la valeur business',
            ],
            metric: {
              label: 'Décision Stratégique',
              value: 'Cibler les tech seniors 5-8 ans comme segment à plus haute valeur',
            },
          },
          {
            icon: "3",
            phase: "Idéation",
            description: "Générer et prioriser les solutions",
            bullets: [
              '3 sessions de brainstorming équipe (20+ idées)',
              'Matrice de priorisation : Impact vs Effort',
              'Évalué la faisabilité avec les contraintes tech',
              'Aligné les solutions avec le modèle business WTTJ',
            ],
            metric: {
              label: 'Idées Générées',
              value: '22 concepts → 5 fonctionnalités priorisées',
            },
          },
          {
            icon: "4",
            phase: "Validation",
            description: "Tester les hypothèses et assomptions",
            bullets: [
              'Validé avec les best practices industrie',
              'Benchmarking concurrent pour inspiration fonctionnalités',
              'Estimé ROI pour top 5 features',
              'Défini métriques de succès et plan de tracking',
            ],
          },
          {
            icon: "5",
            phase: "Définition MVP",
            description: "Définir la solution minimale viable",
            bullets: [
              'Scopé 3 fonctionnalités cœur pour le MVP',
              'Créé user flows et wireframes',
              'Défini roadmap sur 6 mois par phases',
              'Préparé présentation stakeholders',
            ],
            metric: {
              label: 'Scope MVP',
              value: '3 fonctionnalités, estimation 3 mois de build',
            },
          },
        ],
      },
      solution: {
        title: "5. Solution & Prototype",
        intro: "Notre MVP se concentre sur trois fonctionnalités cœur conçues pour répondre aux besoins spécifiques des professionnels seniors tout en restant réalisable dans des contraintes réalistes.",
        features: [
          {
            title: "1. Standardisation des Offres",
            description: "Annonces structurées avec champs obligatoires : fourchette salariale, stack technique, taille équipe, parcours carrière.",
          },
          {
            title: "2. Recommandations Propulsées par l'IA",
            description: "Matching personnalisé basé sur le niveau d'expérience, compétences et préférences de trajectoire de carrière.",
          },
          {
            title: "3. Filtres Avancés",
            description: "Permettre le filtrage par niveau de séniorité, stack technique, culture d'équipe, options remote, parcours carrière.",
          },
        ],
        prototypeTitle: "Prototype Interactif",
        prototypeText: "Explorez le prototype interactif présentant les pages d'offres standardisées et le flux d'onboarding.",
        prototypeButton: "Voir le Prototype",
        captions: {
          tests: "Résultats des tests utilisateurs",
          gtm: "Stratégie go to market",
          risks: "Matrice de risques et stratégies de mitigation",
        },
      },
      learnings: {
        title: "6. Apprentissages Clés",
        items: [
          {
            title: "Senior != Taille Unique",
            description: "Les tech seniors 5-8 ans ont des besoins distincts des executives 10+ ans. Segmentez soigneusement.",
          },
          {
            title: "La Transparence Construit la Confiance",
            description: "Des fourchettes salariales claires et des attentes de rôle réduisent la friction et augmentent la qualité des candidatures.",
          },
          {
            title: "L'IA comme Augmentation",
            description: "Les recommandations IA fonctionnent mieux combinées à des filtres user-friendly et des contrôles clairs.",
          },
          {
            title: "Le MVP Doit Être Réaliste",
            description: "Les délais académiques forcent la priorisation. Un vrai MVP inclurait des tests utilisateurs.",
          },
        ],
      },
      goFurther: {
        title: "7. Aller Plus Loin",
        intro: "Cette étude de cas représente les fondations. Voici comment nous ferions évoluer la solution dans un scénario réel :",
        bullets: [
          "Test A/B des annonces standardisées vs. originales pour valider l'hypothèse d'amélioration du CTR",
          "Conduire des tests d'utilisabilité avec 15+ candidats seniors sur le prototype",
          "Construire un dashboard analytics pour tracker les métriques d'engagement par segment",
          "Étendre à d'autres segments à haute valeur (design, product management)",
          "Partenariat avec équipes RH pour assurer la qualité des annonces standardisées",
        ],
      },
    },
    contact: {
      title: "Contact",
      cta: "Discutons de vos défis produit",
    },
    footer: {
      label: "Retour au Portfolio",
    },
  },
};
