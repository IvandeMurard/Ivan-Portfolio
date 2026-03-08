

## Ameliorer le taux de reponse du Feedback Widget

### Diagnostic actuel

Le widget actuel presente une friction elevee : le visiteur doit rediger un texte libre des l'ouverture. Les formulaires ouverts sans amorce ont un taux de completion tres bas (~2-5%).

### Ameliorations proposees

#### 1. Ajouter un "Reaction bar" en entree de modale (quick rating)

Avant le textarea, afficher une rangee de 4-5 emojis cliquables (type NPS simplifie) :

```text
+-----------------------------------------------+
|  How's your experience so far?                 |
|                                                |
|  [😕]  [😐]  [🙂]  [😍]                       |
|                                                |
|  [textarea apparait apres le clic]             |
+-----------------------------------------------+
```

- Le visiteur clique un emoji → le textarea s'ouvre en dessous avec un placeholder contextuel
- Si l'utilisateur envoie juste l'emoji sans texte, c'est quand meme valide (1-click feedback)
- Reduit la friction initiale de ~80%

#### 2. Placeholder contextuel selon la reaction

| Reaction | Placeholder FR | Placeholder EN |
|----------|---------------|----------------|
| Negatif  | "Qu'est-ce qui pourrait etre ameliore ?" | "What could be improved?" |
| Neutre   | "Un detail a partager ?" | "Anything to share?" |
| Positif  | "Qu'est-ce qui vous a plu ?" | "What did you like?" |

#### 3. Rendre le nom et l'email optionnels et collapses

Remplacer les 2 champs toujours visibles par un lien discret "Ajouter vos coordonnees (optionnel)" qui revele les champs au clic. Moins de champs visibles = moins de friction.

#### 4. Ameliorer le bouton flottant

- Remplacer le label "Feedback" par une icone message-bubble + tooltip au hover
- Plus petit et moins intrusif visuellement
- Animation pulse subtile apres 30s pour attirer l'attention une seule fois

#### 5. Message de succes enrichi

Apres envoi, afficher un message plus chaleureux avec un petit emoji anime, au lieu du texte simple actuel.

### Fichier impacte

| Fichier | Modifications |
|---------|--------------|
| `src/components/FeedbackWidget.tsx` | Ajout reaction bar, textarea conditionnel, champs contact collapses, bouton flottant icon, message succes enrichi |

### Details techniques

- Nouvel etat `reaction: string | null` pour stocker l'emoji selectionne
- Le textarea n'apparait qu'apres selection d'une reaction (ou reste accessible via un lien "Ecrire directement")
- Le champ `reaction` est inclus dans le payload Formspree
- Les champs nom/email sont enveloppes dans un `details/summary` natif ou un toggle state
- Le bouton flottant passe d'un label texte a une icone SVG bulle + tooltip
- Animation pulse CSS one-shot (via `animation-iteration-count: 1`)
- Aucune dependance supplementaire requise

