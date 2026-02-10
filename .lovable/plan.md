
# Corrections : Page CV et couleur Contact sur la 404

## Probleme 1 : Page /cv affiche la 404

La route `/cv` est bien configuree dans `App.tsx` (ligne 60). Le probleme vient probablement du fait que la derniere version n'a pas ete publiee. Cependant, pour s'assurer que tout fonctionne, on verifiera que le composant `CVPage` s'importe correctement.

**Action** : Verifier et republier. Aucun changement de code necessaire si l'import est correct.

---

## Probleme 2 : Bloc Contact bleu ciel au lieu de vert

Le bloc Contact sur la page 404 utilise `bg-primary` qui correspond a un bleu (`--primary`). Il doit utiliser la couleur contact verte (`--contact` / emerald `#065f46`) pour etre coherent avec le reste du site.

**Fichier modifie** : `src/pages/NotFound.tsx`

**Changement** : Ligne 151, remplacer :
- `bg-primary text-primary-foreground` par `bg-[hsl(var(--contact))] text-[hsl(var(--contact-foreground))]`
- Meme chose pour le sous-texte (ligne 153) : `text-primary-foreground/90` par `text-[hsl(var(--contact-foreground))]/90`

C'est un changement de 2 lignes dans un seul fichier.
