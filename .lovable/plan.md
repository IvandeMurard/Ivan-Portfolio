

## Masquer temporairement le ProgressIndicator (les dots de navigation)

### Approche

Commenter les lignes `<ProgressIndicator ... />` dans toutes les pages ou il apparait, sans supprimer le code ni les imports. Cela permet de le reactiver facilement plus tard en decommentant.

### Fichiers impactes

| Fichier | Modification |
|---------|-------------|
| `src/pages/Home.tsx` | Commenter le bloc `<ProgressIndicator sections={...} />` |
| `src/pages/Sonor.tsx` | Commenter `<ProgressIndicator sections={sections} />` |
| `src/pages/cases/wttj-case-study.tsx` | Commenter le bloc `<ProgressIndicator sections={...} />` |
| `src/pages/cases/AgentsEval.tsx` | Commenter le bloc `<ProgressIndicator sections={...} />` |
| `src/pages/cases/FBAgentCaseStudy.tsx` | Commenter `<ProgressIndicator sections={sections} />` |
| `src/pages/cases/CaseStudyTemplate.tsx` | Commenter `<ProgressIndicator sections={...} />` |

### Details techniques

- Les imports restent en place (pas d'erreur de build, juste un import inutilise temporaire)
- Le composant `ProgressIndicator.tsx` n'est pas modifie
- Pour reactiver : decommenter les 6 lignes concernees
