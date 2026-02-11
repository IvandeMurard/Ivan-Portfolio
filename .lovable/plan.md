

## Corrections des side projects dans cv.ts

Trois corrections a apporter dans `src/data/cv.ts` :

### 1. Recoder l'Habitat : 2e prix -> 1er prix
- EN : "1st prize" au lieu de "2nd prize"
- FR : "1er prix" au lieu de "2e prix"

### 2. Hack The Crisis : 1er prix -> finaliste
- Retirer "Winner" du titre (EN: "Hack The Crisis -- Hackathon", FR: "Hack The Crisis -- Hackathon")
- EN : "Reached the final -- Designed and pitched a crisis response tool in 48h during COVID-19"
- FR : "Finaliste -- Conception et pitch d'un outil de reponse de crise en 48h pendant le COVID-19"

### 3. F&B Agent : remplacer Lovable par Qdrant, ajouter Claude
- EN : "built with Cursor + Qdrant + Claude + Supabase"
- FR : "construit avec Cursor + Qdrant + Claude + Supabase"

### Fichier impacte

| Fichier | Modification |
|---------|-------------|
| `src/data/cv.ts` | Mise a jour de 3 entrees dans `cvSideProjects` |

