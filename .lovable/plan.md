
# Plan de transformation créative du portfolio

## Objectif
Créer une signature visuelle distinctive et mémorable pour capter l'attention des product designers, PMs et product builders, tout en maintenant l'élégance professionnelle.

---

## Vue d'ensemble des transformations

| Section | Transformation | Impact |
|---------|---------------|--------|
| Hero | Effet "spotlight" cursor + typographie cinétique | Première impression mémorable |
| Work | Cartes avec effet parallaxe 3D au hover | Engagement visuel accru |
| Contact | CTA magnétique + effet "glow" réactif | Conversion optimisée |
| Global | Cursor trail + transitions fluides entre sections | Cohérence créative |

---

## 1. Hero Section : Typographie cinétique + Cursor spotlight

### Concept
Transformer le hero en une expérience interactive où le curseur révèle du contenu, avec une typographie qui "respire" et réagit au scroll.

### Éléments créatifs

**A. Effet Spotlight Cursor**
```text
+----------------------------------+
|                                  |
|   [Cursor] ━━━> Halo lumineux    |
|        qui suit le mouvement     |
|        et éclaire le texte       |
|                                  |
+----------------------------------+
```
- Cercle lumineux (radial gradient) qui suit le curseur
- Intensité modulée par la position (plus proche du texte = plus intense)
- Respecte `prefers-reduced-motion`

**B. Typographie cinétique**
- Nom "Ivan de Murard" : effet de révélation caractère par caractère au chargement
- Titre "Zero-to-One PM" : text-reveal avec masque animé de gauche à droite
- Sous-texte : fade-in progressif avec stagger (décalage entre paragraphes)

**C. Scroll-triggered transform**
- Au scroll, le texte du hero se compresse légèrement vers le haut
- Parallaxe subtle sur les éléments (titre bouge moins vite que le background)

### Fichiers à créer/modifier
- `src/components/effects/SpotlightCursor.tsx` (nouveau)
- `src/components/hero/HeroKinetic.tsx` (nouveau)
- `src/pages/Home.tsx` (intégration)

---

## 2. Section Work : Cartes 3D immersives

### Concept
Cartes de projet avec effet de profondeur 3D au hover, créant une sensation de "carte physique" que l'on peut manipuler.

### Éléments créatifs

**A. Tilt effect 3D**
```text
       Normal              Hover (tilté)
    +----------+         +----------+
    |          |         |         /|
    |  Card    |  ━━━>   |  Card  / |
    |          |         |       /  |
    +----------+         +------+   |
                              (perspective)
```
- `rotateX` et `rotateY` basés sur la position du curseur
- Reflet dynamique (highlight) qui suit le mouvement
- Ombre portée qui s'adapte à l'inclinaison

**B. Image reveal au hover**
- L'image de fond fait un léger zoom-in
- Overlay gradient s'éclaircit pour révéler plus de détails
- Effet "peek" : contenu additionnel glisse depuis le bas

**C. Transition entre cartes**
- Animation de sortie fluide quand on quitte une carte
- Micro-delay pour éviter le "flickering"

### Fichiers à créer/modifier
- `src/components/cards/Card3D.tsx` (nouveau)
- `src/hooks/useTilt.ts` (nouveau hook)
- `src/components/CardImmersive.tsx` (refactor)
- `src/components/work/MediaCard.tsx` (refactor)

---

## 3. Contact Section : CTA magnétique + Glow

### Concept
Boutons qui "attirent" légèrement le curseur et émettent une lueur réactive, créant un appel à l'action irrésistible.

### Éléments créatifs

**A. Effet magnétique**
```text
    Curseur approche    →    Bouton se "déplace"
                              légèrement vers le curseur
    
    [Mouse] ............ [  Button  ]
                    ↘
                  [ Button ] (shift vers la souris)
```
- Translation de 2-4px vers le curseur
- Retour élastique (spring animation) quand le curseur s'éloigne

**B. Glow réactif**
- Halo coloré (emerald #065f46) autour du bouton
- Intensité qui pulse au hover
- Animation "breathe" subtile en idle

**C. Micro-feedback**
- Ripple effect amélioré (déjà présent, à optimiser)
- Haptic feedback sur mobile (déjà implémenté)

### Fichiers à créer/modifier
- `src/components/ui/MagneticButton.tsx` (nouveau)
- `src/components/ContactSection.tsx` (refactor)

---

## 4. Éléments globaux : Cohérence créative

### A. Cursor trail (optionnel, desktop only)
- Fine traînée du curseur avec dégradé opacité
- Activable/désactivable dans les settings
- Performance : limité à 60fps, cleanup automatique

### B. Section transitions
- Effet "wipe" ou "fade-morph" entre sections au scroll
- Indicateur de progression enrichi (points → ligne continue)

### C. Loading state créatif
- Animation skeleton améliorée pour les cartes
- Logo animé pendant le chargement initial

---

## Priorités d'implémentation

| Phase | Éléments | Effort | Impact |
|-------|----------|--------|--------|
| 1 | Hero spotlight + typographie cinétique | Moyen | Très élevé |
| 2 | Cartes 3D tilt effect | Moyen | Élevé |
| 3 | Contact magnétique + glow | Faible | Élevé |
| 4 | Cursor trail + transitions globales | Faible | Moyen |

---

## Considérations techniques

### Performance
- Tous les effets respectent `prefers-reduced-motion`
- Utilisation de `will-change` et `transform: translateZ(0)` pour GPU acceleration
- Throttle des event listeners (mousemove) à 60fps max
- Cleanup des animations au unmount

### Accessibilité
- Focus states préservés pour navigation clavier
- Pas de contenu essentiel masqué par les effets
- Screen reader support maintenu

### Mobile
- Effets cursor désactivés sur touch devices
- Alternatives tactiles (tap feedback, ripple)
- Performance optimisée pour devices mobiles

---

## Fichiers impactés (résumé)

| Action | Fichier |
|--------|---------|
| Créer | `src/components/effects/SpotlightCursor.tsx` |
| Créer | `src/components/hero/HeroKinetic.tsx` |
| Créer | `src/components/cards/Card3D.tsx` |
| Créer | `src/hooks/useTilt.ts` |
| Créer | `src/hooks/useMagnetic.ts` |
| Créer | `src/components/ui/MagneticButton.tsx` |
| Modifier | `src/pages/Home.tsx` |
| Modifier | `src/components/CardImmersive.tsx` |
| Modifier | `src/components/work/MediaCard.tsx` |

---

## Rendu visuel attendu

La combinaison de ces éléments créera une expérience :

1. **Mémorable** : L'effet spotlight + typographie cinétique du hero marque immédiatement les esprits
2. **Interactive** : Chaque mouvement de souris génère un feedback visuel
3. **Professionnelle** : Les effets restent élégants, jamais "gadget"
4. **Distinctive** : Signature visuelle unique parmi les portfolios PM/Designer
