// src/site.config.ts
export const SITE = {
  name: "Ivan de Murard",
  tagline: "AI Product Builder",
} as const;

// Centralisation des URL sociales (facilement éditables)
export const SOCIAL_LINKS = {
  mail: {
    label: "Email",
    href: "mailto:ivandemurard@gmail.com",
  },
  calendar: {
    label: "Calendar",
    href: "https://cal.com/ivandemurard/30min?",
  },
  linkedin: {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ivandemurard/",
  },
  github: {
    label: "GitHub",
    href: "https://github.com/IvandeMurard",
  },
  x: {
    label: "X (Twitter)",
    href: "https://x.com/ivanmurard",
  },
} as const;

export type SocialKey = keyof typeof SOCIAL_LINKS;
