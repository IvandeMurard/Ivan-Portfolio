

## Rendre le toast visible malgre la fenetre de telechargement

### Probleme
Le toast apparait apres 500ms mais la fenetre de telechargement du navigateur le masque. Quand l'utilisateur ferme cette fenetre, le toast a deja disparu.

### Solution
Deux ajustements dans `src/pages/CV.tsx` :

1. **Augmenter le delai d'apparition** : passer de 500ms a 2500ms pour que le toast s'affiche apres que l'utilisateur ait gere la fenetre de telechargement
2. **Augmenter la duree d'affichage** : ajouter `duration: 8000` (8 secondes au lieu des ~4s par defaut de sonner) pour que le toast reste visible plus longtemps

### Fichier impacte

| Fichier | Modification |
|---------|-------------|
| `src/pages/CV.tsx` | setTimeout passe a 2500ms + ajout `duration: 8000` sur le toast |

### Detail technique

Dans la fonction `handleDownload`, modifier l'appel toast :

```text
setTimeout(() => {
  toast("Bonne lecture !", {
    description: "...",
    duration: 8000,   // <-- ajout
    action: { ... },
  });
}, 2500);             // <-- modifie (etait 500)
```

