// src/data/cases/sonor.case.ts
export type CaseMeta = {
  id: string;
  slug: string;
  category: string;
  title_en: string;
  title_fr: string;
  subtitle_en: string;
  subtitle_fr: string;
  badge_en: string;
  badge_fr: string;
  image: string;
  logo?: string;
  bullets_en?: string[];
  bullets_fr?: string[];
  ctaHref: string;
  // Legacy fields for backward compatibility
  title: string;
  subtitle: string;
  badge: string;
  bullets?: string[];
};

export const sonorCase: CaseMeta = {
  id: "sonor",
  slug: "sonor",
  category: "CASE STUDY — SONOR",
  title_en: "Reducing noise pollution with open data",
  title_fr: "Réduire la pollution sonore avec l'open data",
  subtitle_en: "From idea to a SaaS incubated by Banque des Territoires",
  subtitle_fr: "De l'idée à un SaaS incubé par la Banque des Territoires",
  badge_en: "Open Data",
  badge_fr: "Open Data",
  image: "/img/image-banniere-sonor.jpg",
  logo: "/img/logo_sonor.png",
  bullets_en: [
    "20+ stakeholder interviews",
    "€20k funding",
    "Supported by Banque des Territoires"
  ],
  bullets_fr: [
    "20+ entretiens parties prenantes",
    "€20k financements",
    "Accompagné par La Banque des Territoires"
  ],
  ctaHref: "/case-study/sonor",
  // Legacy fields
  title: "Réduire la pollution sonore avec l'open data",
  subtitle: "De l'idée à un SaaS incubé par la Banque des Territoires",
  badge: "Open Data",
  bullets: [
    "20+ entretiens parties prenantes",
    "€20k financements",
    "Accompagné par La Banque des Territoires"
  ],
};
