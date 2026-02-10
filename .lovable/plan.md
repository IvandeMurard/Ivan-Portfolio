
## Plan : Page CV accessible uniquement par URL

### Objectif
Creer une page `/cv` elegante et immersive, non referencee dans la navigation, qui presente le CV d'Ivan de Murard. La page est accessible uniquement en connaissant l'URL directe.

---

### Concept UX

La page doit etre une experience a part entiere : pas un simple PDF embed, mais une mise en page web soignee du CV, avec les memes effets creatifs du portfolio (animations subtiles, typographie soignee).

---

### Contenu de la page (extrait du PDF)

**En-tete**
- Ivan de Murard - Product Manager
- Tagline : "5 ans de pilotage cross-fonctionnel de produits IT - 2 ans co-fondateur SaaS"
- Contact : email, telephone, Paris, LinkedIn

**Sections**
1. Experiences professionnelles (4 postes : FORTIL/DomusVi, ALTEN/Bouygues Telecom, OpenDataSoft, Sonor)
2. Competences (Langues, Produit, Methodologies, Outils, IA, Technique)
3. Formation (Maestro, Join Lion, IxDF, IHEDREA)
4. Side Projects et Engagements (Hackathons, Side-project IA, Volontariat)

---

### Details techniques

#### 1. Copier le PDF dans le projet
- Copier le PDF uploade vers `public/cv/CV_Ivan_de_Murard_Product_Manager.pdf`
- Permettre un lien de telechargement direct depuis la page

#### 2. Creer la page `src/pages/CV.tsx`

Structure de la page :
- Navigation minimale (logo + retour accueil uniquement, pas la nav complete)
- Hero compact avec nom, titre, tagline
- Section Experiences avec timeline verticale
- Section Competences en grille de tags/badges
- Section Formation en liste compacte
- Section Side Projects
- Bouton "Telecharger le PDF" flottant ou en header
- Footer du portfolio

Animations :
- Utiliser les `ScrollReveal` et `StaggerContainer` existants
- Typographie cinematique sur le nom (reutiliser le pattern HeroKinetic)
- Cards avec hover subtil pour chaque experience

#### 3. Ajouter la route dans `App.tsx`
- Ajouter `<Route path="/cv" element={<CVPage />} />`
- Ne PAS ajouter de lien dans `Navigation.tsx` (page "cachee")

#### 4. Donnees bilingues
- Reutiliser les donnees existantes de `src/data/experience.ts`, `src/data/education.ts`, `src/data/continuousLearning.ts`
- Completer avec les informations supplementaires du PDF (competences, side projects, contact)
- Creer un fichier `src/data/cv.ts` pour les donnees specifiques au CV (competences, side projects, infos de contact)

---

### Fichiers impactes

| Action | Fichier |
|--------|---------|
| Copier | PDF vers `public/cv/CV_Ivan_de_Murard_Product_Manager.pdf` |
| Creer | `src/data/cv.ts` (competences, side projects, contact) |
| Creer | `src/pages/CV.tsx` (page complete) |
| Modifier | `src/App.tsx` (ajout route `/cv`) |

### Ce qui ne change PAS
- Navigation (pas de lien vers /cv)
- Aucune autre page existante
- Donnees experience/education existantes reutilisees telles quelles
