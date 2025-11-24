/**
 * Case Study Color System
 * Palette unifiée inspirée d'Agents Eval
 * 
 * ⚠️ Ne PAS utiliser --contact-green (#065f46) dans les case studies
 * Cette couleur est réservée aux sections Contact de la home page
 */

export const caseStudyColors = {
  // Primaires - Bleu profond pour hero et titres
  primary: {
    DEFAULT: '#1E3A8A',  // Bleu foncé - hero, H1/H2
    light: '#3B82F6',    // Bleu vif - CTA, highlights, links
    dark: '#1E40AF',     // Bleu très foncé - hover states
  },

  // Backgrounds
  background: {
    light: '#F8FAFC',    // Fond général pages
    card: '#FFFFFF',     // Cartes, encadrés
    muted: '#F1F5F9',    // Sections alternées
  },

  // Textes
  text: {
    primary: '#0F172A',  // Texte principal (presque noir)
    secondary: '#334155', // Texte secondaire
    muted: '#64748B',    // Descriptions, captions
    white: '#FFFFFF',    // Texte sur dark backgrounds
  },

  // Borders & Dividers
  border: {
    DEFAULT: '#E2E8F0',  // Bordures subtiles
    muted: '#F1F5F9',    // Bordures très légères
  },

  // Accents spécifiques par projet (pour TL;DR et Key Learnings)
  accent: {
    blue: {
      50: '#EFF6FF',
      100: '#DBEAFE',
      500: '#3B82F6',
      600: '#2563EB',
      700: '#1D4ED8',
    },
    orange: {
      50: '#FFF7ED',
      100: '#FFEDD5',
      500: '#F97316',
      600: '#EA580C',
      700: '#C2410C',
    },
    green: {
      50: '#F0FDF4',
      100: '#DCFCE7',
      500: '#22C55E',
      600: '#16A34A',
      700: '#15803D',
    },
    purple: {
      50: '#FAF5FF',
      100: '#F3E8FF',
      500: '#A855F7',
      600: '#9333EA',
      700: '#7E22CE',
    },
  },

  // Status colors (pour métriques, trends)
  status: {
    success: '#10B981',  // Trend up
    warning: '#F59E0B',  // Neutral
    error: '#EF4444',    // Trend down
    info: '#3B82F6',     // Information
  },

  // Overlay & Shadows
  overlay: {
    scrim: 'rgba(0, 0, 0, 0.60)',     // Modal overlays
    gradient: 'rgba(30, 58, 138, 0.9)', // Hero gradient overlay
  },

} as const;

/**
 * Tailwind CSS Classes Helper
 * Utiliser ces classes dans vos composants pour cohérence
 */
export const csClasses = {
  // Hero sections
  hero: {
    bg: 'bg-gradient-to-b from-blue-900 to-transparent',
    text: 'text-white',
    tag: 'text-blue-100 bg-blue-800/30',
  },

  // TL;DR encadré
  tldr: {
    blue: 'bg-blue-50 border-blue-200 text-blue-900',
    orange: 'bg-orange-50 border-orange-200 text-orange-900',
    green: 'bg-green-50 border-green-200 text-green-900',
  },

  // Sidebar
  sidebar: {
    bg: 'bg-white',
    border: 'border-gray-200',
    text: 'text-gray-600',
    label: 'text-gray-400 text-xs uppercase tracking-wider',
  },

  // Key Learning cards
  learningCard: {
    blue: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
    orange: 'bg-orange-50 hover:bg-orange-100 border-orange-200',
    green: 'bg-green-50 hover:bg-green-100 border-green-200',
    purple: 'bg-purple-50 hover:bg-purple-100 border-purple-200',
  },

  // Impact metrics
  metric: {
    container: 'bg-gray-50 rounded-2xl p-8',
    before: 'text-gray-400',
    after: 'text-blue-600 font-bold',
    label: 'text-gray-600',
  },

  // Timeline
  timeline: {
    line: 'border-l-2 border-gray-200',
    dot: 'bg-blue-500',
    phase: 'bg-white border-gray-200',
  },

  // Buttons & CTA
  button: {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-white hover:bg-gray-50 text-blue-600 border-blue-600',
    ghost: 'hover:bg-blue-50 text-blue-600',
  },

} as const;

/**
 * Dark Mode Support (Optionnel)
 * À implémenter si nécessaire
 */
export const darkModeColors = {
  background: {
    light: '#0F172A',
    card: '#1E293B',
    muted: '#334155',
  },
  text: {
    primary: '#F8FAFC',
    secondary: '#CBD5E1',
    muted: '#94A3B8',
  },
  border: {
    DEFAULT: '#334155',
    muted: '#1E293B',
  },
} as const;

/**
 * Gradient Presets pour Hero backgrounds
 */
export const heroGradients = {
  blue: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
  blueOverlay: 'linear-gradient(180deg, rgba(30, 58, 138, 0.9) 0%, rgba(30, 58, 138, 0.4) 50%, transparent 100%)',
  darkOverlay: 'linear-gradient(180deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 50%, transparent 100%)',
  subtle: 'linear-gradient(180deg, rgba(248, 250, 252, 0.95) 0%, transparent 100%)',
} as const;

/**
 * Shadow Presets
 */
export const shadows = {
  card: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  cardHover: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  hero: '0 20px 50px -12px rgba(0, 0, 0, 0.25)',
  soft: '0 6px 20px -8px rgba(0, 0, 0, 0.15)',
} as const;

/**
 * Export type-safe color getter
 */
export type CaseStudyColor = typeof caseStudyColors;
export type AccentColor = 'blue' | 'orange' | 'green' | 'purple';

