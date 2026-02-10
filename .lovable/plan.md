

## Remplacer le telephone par un lien Calendly

### Changements

**1. `src/data/cv.ts`** : Remplacer le champ `phone` par un champ `calendar` avec l'URL `https://cal.com/ivandemurard/30min`.

**2. `src/pages/CV.tsx`** :
- Remplacer l'import de l'icone `Phone` par `Calendar` (lucide-react)
- Remplacer le lien `tel:` par un lien vers Cal.com avec `target="_blank"`
- Afficher "Book a call" (EN) ou "Prendre RDV" (FR) comme texte du lien

### Fichiers impactes

| Fichier | Modification |
|---------|-------------|
| `src/data/cv.ts` | `phone` remplace par `calendar` |
| `src/pages/CV.tsx` | Icone Calendar + lien Cal.com |

