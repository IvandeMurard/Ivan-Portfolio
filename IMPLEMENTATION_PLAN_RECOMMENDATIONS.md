# Plan d'implémentation : Recommandations Rabbit Hole sur Home Page

## ✅ Décisions validées

### Positionnement
- **Position** : Milieu (après Experience, avant About)
- **Objectif** : Différenciation + Crédibilité
- **Format** : Option C (Hybrid condensée) + lien vers `/resource-library`
- **Page dédiée** : Oui, reste accessible complète

### Structure About + Resources
- **About** : Version texte (What Drives Me, How I work, Why I Care) + version visuelle (Curated Library) avec filtres
- **Titre Resources** : "Curated Library" (pas "What Drives Me")
- **Relation** : About reste, suivi de Curated Library pour renforcer
- **Rabbit hole** : Exactement pareil (cross-category complet)

### Performance & Technique
- **Images** : Lazy loading
- **Chargement** : Progressive enhancement
- **Architecture** : Composant réutilisable (pas dans Home.tsx)

### Analytics
- Mesurer engagement rabbit hole sur Home
- Comparer taux de clic Home vs page dédiée
- Identifier patterns de navigation

---

## 💡 Conseils & Recommandations

### Question 3.1 : Relation About + Resources (Design UX)

**Recommandation : Option C renforcée - "Complementary Sections"**

#### Approche proposée :

**Section About (Texte)**
- **Titre** : "About" ou "My Approach"
- **Format** : Timeline verticale avec 3 paragraphes
  - "What Drives Me" → Philosophie & motivation
  - "How I Work" → Méthode & process
  - "Why I Care" → Valeurs & raison d'être
- **Style** : Texte narratif, timeline visuelle (comme actuel)

**Section Curated Library (Visuel)**
- **Titre** : "Curated Library"
- **Format** : Filtres (Communities, Inspirations, Resources, Tools) + Grid/Carousel
- **Style** : Cards interactives avec rabbit hole
- **Position** : Juste après About

#### Pourquoi cette approche fonctionne :

1. **Hiérarchie claire**
   - About = Philosophie abstraite (valeur)
   - Library = Concréisation tangible (curation)
   - Les deux se renforcent sans répétition

2. **Flow narratif optimal**
   ```
   Experience → About (qui je suis) → Library (ce qui m'inspire) → Contact
   ```

3. **Progression logique**
   - D'abord expliquer (About)
   - Puis montrer (Library)
   - Enfin agir (Contact)

4. **Meilleures pratiques UX**
   - ✅ Séparation claire des contenus (texte vs visuel)
   - ✅ Chaque section a son propre objectif
   - ✅ Pas de confusion entre philosophie et ressources
   - ✅ Respect du pattern "Tell → Show → Act"

#### Alternative considérée (mais non recommandée) :

❌ **Fusion About + Library** 
- Risque de confusion entre philosophie et curation
- Trop dense pour une section
- Perd la clarté de chaque message

---

### Question 6.1 : Bonnes pratiques Performance

#### Objectifs recommandés :

**Lighthouse Score**
- Performance : ≥ 90
- Accessibility : ≥ 95 (WCAG AA)
- Best Practices : ≥ 90
- SEO : ≥ 90

**Métriques Core Web Vitals**
- **LCP (Largest Contentful Paint)** : < 2.5s
- **FID (First Input Delay)** : < 100ms
- **CLS (Cumulative Layout Shift)** : < 0.1

**Time to Interactive (TTI)**
- Objectif : < 3.5s sur 4G
- Cible : < 2.5s sur 3G (progressive)

#### Stratégies d'optimisation :

**1. Lazy Loading des images**
```tsx
// Dans RecommendationCard et ZoomContextCard
<img 
  src={logo}
  loading="lazy"  // ✅ Native lazy loading
  decoding="async"
  fetchPriority="low"  // Pour images below-fold
/>
```

**2. Code Splitting & Dynamic Import**
```tsx
// Lazy load la section Curated Library
const ResourceLibraryTeaser = lazy(() => 
  import('@/components/sections/ResourceLibraryTeaser')
);

// Utiliser avec Suspense
<Suspense fallback={<ResourceLibrarySkeleton />}>
  <ResourceLibraryTeaser />
</Suspense>
```

**3. Progressive Enhancement**
```tsx
// Charger seulement quand visible (Intersection Observer)
const [shouldLoad, setShouldLoad] = useState(false);

useEffect(() => {
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      setShouldLoad(true);
      observer.disconnect();
    }
  }, { rootMargin: '200px' }); // Précharger 200px avant

  if (ref.current) observer.observe(ref.current);
  return () => observer.disconnect();
}, []);
```

**4. Optimisation Bundle Size**
- ✅ Tree-shaking automatique (Vite)
- ✅ Import seulement ce qui est nécessaire
- ✅ Éviter d'importer toute la lib Framer Motion si pas besoin

**5. Images optimisées**
- Formats WebP/AVIF avec fallback
- Tailles responsives (srcset)
- Compression optimale (< 100KB par image)

**6. Font Loading**
```tsx
// Preload fonts critiques
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossOrigin />
```

**7. Memoization**
```tsx
// Utiliser useMemo pour calculs coûteux (recommandations)
const recommendations = useMemo(() => 
  getRecommendations(...), 
  [dependencies]
);
```

**8. Virtualization (si beaucoup d'items)**
- Utiliser `react-window` ou `react-virtualized` si > 50 items
- Pour notre cas (< 30 items), pas nécessaire

#### Checklist Performance :

- [ ] Images lazy loaded avec `loading="lazy"`
- [ ] Code splitting pour ResourceLibraryTeaser
- [ ] Progressive enhancement avec Intersection Observer
- [ ] Images optimisées (WebP, tailles responsives)
- [ ] Memoization des calculs de recommandations
- [ ] Bundle analyzer pour vérifier taille
- [ ] Lighthouse CI pour monitoring continu

---

## 🏗️ Architecture technique

### Structure de composants

```
src/
├── components/
│   ├── sections/
│   │   ├── AboutSection.tsx (modifié - filtres texte/visuel)
│   │   ├── ResourceLibraryTeaser.tsx (nouveau - section condensée)
│   │   └── CommunitiesInspoResourcesTools.tsx (existant - page dédiée)
│   └── shared/
│       ├── RecommendationCard.tsx (existant)
│       └── ResourceLibrarySkeleton.tsx (nouveau - loading state)
├── hooks/
│   ├── useRecommendations.ts (nouveau - logique réutilisable)
│   └── useLazySection.ts (nouveau - progressive enhancement)
└── utils/
    └── getRecommendations.ts (existant)
```

### Composants à créer

#### 1. `ResourceLibraryTeaser.tsx`
- Section condensée avec 6-9 highlights
- Toggle "Voir plus" pour expand
- Lien vers page dédiée `/resource-library`
- Rabbit hole fonctionnel sur les items visibles

#### 2. `AboutSectionEnhanced.tsx` (refactor)
- Filtres : "Text" / "Visual"
- Tab "Text" : What Drives Me, How I Work, Why I Care
- Tab "Visual" : Teaser vers Curated Library ou intégration directe

#### 3. `ResourceLibrarySkeleton.tsx`
- Loading state pour progressive enhancement
- Shimmer effect pour meilleure UX

#### 4. Hooks réutilisables
- `useRecommendations.ts` : Logique de calcul
- `useLazySection.ts` : Intersection Observer wrapper

---

## 📋 Plan d'implémentation détaillé

### Phase 1 : Préparation & Architecture (30 min)

**Étapes** :
1. ✅ Analyser structure actuelle AboutSection
2. ✅ Créer hooks réutilisables (`useRecommendations`, `useLazySection`)
3. ✅ Créer skeleton/loading states

**Livrables** :
- Hooks réutilisables fonctionnels
- Skeleton component

---

### Phase 2 : AboutSection avec Filtres (1h)

**Étapes** :
1. Modifier `AboutSection.tsx` pour ajouter filtres
   - Tab "Text" → Contenu actuel (What Drives Me, etc.)
   - Tab "Visual" → Teaser ou intégration Curated Library
2. Tester transitions entre tabs
3. Vérifier responsive design

**Livrables** :
- AboutSection avec filtres fonctionnels
- Contenu texte préservé
- Tab visuel préparé

---

### Phase 3 : ResourceLibraryTeaser (2h)

**Étapes** :
1. Créer composant `ResourceLibraryTeaser.tsx`
   - Afficher 6-9 highlights (2-3 par catégorie)
   - Format carousel ou grid condensée
   - Toggle "View all" pour expand
   - Lien vers `/resource-library`
2. Intégrer rabbit hole (recommandations fonctionnelles)
3. Ajouter lazy loading + progressive enhancement
4. Animations smooth

**Livrables** :
- ResourceLibraryTeaser fonctionnel
- Rabbit hole intégré
- Lazy loading actif

---

### Phase 4 : Intégration Home Page (1h)

**Étapes** :
1. Ajouter ResourceLibraryTeaser après Experience section
2. Vérifier ordre des sections
3. Mettre à jour ProgressIndicator
4. Tester smooth scroll
5. Vérifier performance (Lighthouse)

**Livrables** :
- Section intégrée dans Home
- Performance optimisée
- Navigation fluide

---

### Phase 5 : Analytics & Tracking (30 min)

**Étapes** :
1. Ajouter tracking événements :
   - `rabbit_hole_recommendation_clicked` (Home)
   - `rabbit_hole_recommendation_clicked` (Page dédiée)
   - `curated_library_expanded` (Home)
   - `curated_library_view_all_clicked`
2. Comparer métriques Home vs page dédiée

**Livrables** :
- Analytics configuré
- Dashboard de comparaison

---

### Phase 6 : Tests & Optimisation (30 min)

**Étapes** :
1. Tests responsive (mobile, tablet, desktop)
2. Tests performance (Lighthouse)
3. Tests accessibilité (WCAG AA)
4. Tests cross-browser
5. Optimisations finales

**Livrables** :
- Tous les tests passent
- Performance ≥ 90
- Accessibilité ≥ 95

---

## 🎨 Design UX de ResourceLibraryTeaser

### État par défaut (Collapsed)

```
┌─────────────────────────────────────────┐
│ Curated Library                         │
├─────────────────────────────────────────┤
│ [Communities] [Inspirations] [Resources]│
│                                         │
│ ┌──────┐ ┌──────┐ ┌──────┐            │
│ │ Item │ │ Item │ │ Item │  ...       │
│ └──────┘ └──────┘ └──────┘            │
│                                         │
│ [+ View all resources →]                │
└─────────────────────────────────────────┘
```

### État expanded

```
┌─────────────────────────────────────────┐
│ Curated Library                         │
├─────────────────────────────────────────┤
│ [Communities] [Inspirations] [Resources]│
│                                         │
│ Grid complet (3-6 items visibles)      │
│                                         │
│ [Explore full library →]                │
└─────────────────────────────────────────┘
```

### Interactions

- **Click item** → Rabbit hole fonctionne
- **Click "View all"** → Expand inline (ou scroll vers section)
- **Click "Explore full library"** → Navigate vers `/resource-library`
- **Hover** → Preview légère expansion

---

## 📊 Métriques de succès

### KPIs à suivre

1. **Engagement**
   - Taux de clic sur recommandations (Home vs Page dédiée)
   - Taux d'expansion de la section teaser
   - Temps passé dans rabbit hole

2. **Navigation**
   - Taux de clic "View all" → Expand
   - Taux de clic "Explore full library" → Page dédiée
   - Patterns de navigation (quels items déclenchent plus de clics)

3. **Performance**
   - Lighthouse score (objectif ≥ 90)
   - Time to Interactive (objectif < 3.5s)
   - Core Web Vitals (LCP, FID, CLS)

---

## 🚀 Prochaines étapes immédiates

1. ✅ Valider cette stratégie
2. 🔄 Créer les composants (Phases 1-3)
3. 🔄 Intégrer dans Home (Phase 4)
4. 🔄 Ajouter analytics (Phase 5)
5. 🔄 Tester & optimiser (Phase 6)

**Temps estimé total : ~5-6 heures**

---

## ❓ Questions de clarification

Avant de commencer l'implémentation, confirme :

1. **AboutSection Enhanced** : Préfères-tu que le tab "Visual" montre :
   - A) Le teaser ResourceLibraryTeaser directement dans About
   - B) Un lien vers la section Curated Library juste en dessous

2. **ResourceLibraryTeaser** : Format préféré pour les 6-9 highlights ?
   - A) Carousel horizontal
   - B) Grid 3 colonnes
   - C) Grid 2 colonnes mobile, 3 desktop

3. **Expand behavior** : Quand on clique "View all", préfères-tu :
   - A) Expand inline dans la même section
   - B) Smooth scroll vers section complète en dessous
   - C) Navigate vers page dédiée directement

