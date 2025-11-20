# ContextualZoom Component

Un composant React qui implémente le concept de **"zooming that changes context, not just size"** - où le contenu change selon le niveau de zoom, pas seulement la taille.

## Concept

Inspiré par l'idée que le zoom peut révéler différentes couches de sens :
- **Zoom out dans un calendrier** → vous voyez les mois au lieu des jours
- **Zoom in sur une carte** → les rues apparaissent, puis les magasins, puis les avis
- C'est comme décaler des couches de signification, pas des pixels

## Installation

Le composant est déjà disponible dans `src/components/ContextualZoom.tsx`.

## Utilisation de base

```tsx
import { ContextualZoom, ZoomLevel } from "@/components/ContextualZoom";

const levels: ZoomLevel[] = [
  {
    level: 0,
    label: "Overview",
    threshold: 0,
    content: <div>Contenu niveau 0 (le plus zoomé out)</div>,
  },
  {
    level: 1,
    label: "Details",
    threshold: 0.5,
    content: <div>Contenu niveau 1</div>,
  },
  {
    level: 2,
    label: "Deep Dive",
    threshold: 0.8,
    content: <div>Contenu niveau 2 (le plus zoomé in)</div>,
  },
];

function MyComponent() {
  return (
    <ContextualZoom
      levels={levels}
      initialZoom={0.5}
      height="600px"
      showControls={true}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `levels` | `ZoomLevel[]` | **required** | Tableau de niveaux de zoom, ordonné du plus zoomé out au plus zoomé in |
| `initialZoom` | `number` | `0.5` | Niveau de zoom initial (0-1) |
| `minZoom` | `number` | `0` | Niveau de zoom minimum (0-1) |
| `maxZoom` | `number` | `1` | Niveau de zoom maximum (0-1) |
| `showControls` | `boolean` | `true` | Afficher les contrôles de zoom (boutons +/-, reset) |
| `className` | `string` | `""` | Classes CSS supplémentaires pour le conteneur |
| `height` | `string` | `"600px"` | Hauteur du conteneur de zoom |

## Interface ZoomLevel

```tsx
interface ZoomLevel {
  /** Identifiant du niveau (0 = le plus zoomé out, plus élevé = plus zoomé in) */
  level: number;
  /** Contenu à afficher à ce niveau de zoom */
  content: React.ReactNode;
  /** Label optionnel pour ce niveau (affiché dans l'indicateur) */
  label?: string;
  /** Seuil de zoom (0-1) où ce niveau devient actif */
  threshold: number;
}
```

## Interactions

- **Scroll de la souris** : Zoom in/out
- **Pinch sur mobile** : Zoom in/out avec deux doigts
- **Boutons +/-** : Contrôles manuels de zoom
- **Bouton Reset** : Réinitialise le zoom au niveau initial

## Exemples

Voir `src/components/ContextualZoom.example.tsx` pour des exemples complets :
- **CalendarZoomExample** : Calendrier (années → mois → semaines → jours)
- **MapZoomExample** : Carte (ville → quartiers → rues → magasins)
- **MetricsZoomExample** : Métriques (vue d'ensemble → catégories → détails)

## Performance

Le composant utilise :
- **Framer Motion** pour des animations fluides avec `useSpring`
- **Transitions optimisées** avec l'easing du design system (`cubic-bezier(0.22,1,0.36,1)`)
- **Rendu conditionnel** : seul le niveau actif est interactif

## Design Tokens

Respecte les tokens du design system :
- Couleurs : `bg-card`, `border-border`, `text-accent`
- Espacement : Utilise les classes Tailwind standard
- Animation : Easing `cubic-bezier(0.22,1,0.36,1)` du design system

## Accessibilité

- Boutons avec `aria-label` appropriés
- Indicateur de niveau actif visible
- Instructions d'utilisation affichées
- Support clavier (via les boutons)

