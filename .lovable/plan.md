

## Ajustements page CV

### 1. Email
Remplacer `ivan.music.demurard@gmail.com` par `ivandemurard@gmail.com` dans `src/data/cv.ts`.

### 2. Couleurs hover LinkedIn et GitHub
Dans `src/pages/CV.tsx`, appliquer des classes hover specifiques :
- LinkedIn : `hover:text-[#0A66C2]` (bleu officiel LinkedIn)
- GitHub : `hover:text-black dark:hover:text-white` (noir GitHub)

### 3. Remplacer le PDF
Copier le nouveau fichier vers `public/cv/CV_Ivan_de_Murard_Product_Manager.pdf`.

### 4. Tagline enrichie
Mettre a jour `cvTagline.en` dans `src/data/cv.ts` avec :
"5 years of cross-functional product management · 2 years SaaS co-founder · Entrepreneurship, start-up and scale-up experience · AI and data-driven"

Et la version francaise equivalente.

### Fichiers impactes

| Action | Fichier |
|--------|---------|
| Modifier | `src/data/cv.ts` (email + tagline) |
| Modifier | `src/pages/CV.tsx` (hover colors LinkedIn/GitHub) |
| Remplacer | `public/cv/CV_Ivan_de_Murard_Product_Manager.pdf` |

