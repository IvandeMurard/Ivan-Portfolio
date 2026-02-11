

## Reactiver le ProgressIndicator uniquement sur les 3 etudes de cas Work

### Contexte

Les 3 cartes de la section Work pointent vers :
- `/case-study/sonor` → `src/pages/Sonor.tsx`
- `/cases/wttj` → `src/pages/cases/wttj-case-study.tsx`
- `/case-study/fb-agent` → `src/pages/cases/FBAgentCaseStudy.tsx`

### Modification

Decommenter le `<ProgressIndicator ... />` dans ces 3 fichiers uniquement. Les autres pages (Home, AgentsEval, CaseStudyTemplate) restent avec le composant commente.

### Fichiers impactes

| Fichier | Action |
|---------|--------|
| `src/pages/Sonor.tsx` | Decommenter `<ProgressIndicator sections={sections} />` |
| `src/pages/cases/wttj-case-study.tsx` | Decommenter le bloc `<ProgressIndicator sections={...} />` |
| `src/pages/cases/FBAgentCaseStudy.tsx` | Decommenter `<ProgressIndicator sections={sections} />` |

### Ce qui reste masque

- `src/pages/Home.tsx` — reste commente
- `src/pages/cases/AgentsEval.tsx` — reste commente
- `src/pages/cases/CaseStudyTemplate.tsx` — reste commente

