

## Animation bouton Download + Toast post-telechargement

Deux micro-interactions au clic sur "Telecharger le PDF" :

### 1. Animation du bouton
- Le `<a>` devient un `<button>` qui declenche le telechargement programmatiquement
- Au clic : l'icone Download se transforme en icone Check avec une animation de scale-in
- Le texte passe a "Telecharge !" / "Downloaded!"
- Apres 2 secondes, retour a l'etat initial (icone Download + texte original)
- Utilisation d'un state `downloaded` avec `useState` et `setTimeout`

### 2. Toast elegant
- Utilisation de `sonner` (deja installe) pour afficher un toast minimaliste
- Message : "Bonne lecture !" (FR) / "Enjoy the read!" (EN)
- Description avec lien Cal.com : "Envie d'en discuter ?" / "Want to chat about it?"
- Le toast inclut un bouton action vers `https://cal.com/ivandemurard/30min`
- Apparait ~500ms apres le clic (legerement decale de l'animation bouton)

### Fichier impacte

| Fichier | Modification |
|---------|-------------|
| `src/pages/CV.tsx` | Bouton avec state anime + toast sonner au clic |

### Details techniques
- Import `toast` depuis `sonner` et `Check` depuis `lucide-react`
- Ajout d'un `useState<boolean>` pour gerer l'etat du bouton
- Le telechargement se fait via creation d'un lien `<a>` temporaire en JS (`document.createElement('a')`)
- Transition CSS entre les deux etats du bouton avec `transition-all`
- Pas de nouveau composant, tout reste dans `CV.tsx` pour rester simple

