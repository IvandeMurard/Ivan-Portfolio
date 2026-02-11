

## Ajouter un lien CV dans la navigation et le footer

### Navigation (`src/components/Navigation.tsx`)

**Desktop** : Ajouter un lien "CV" entre "About" et le bouton "Contact", avec le meme style discret que les autres liens (Home, Work, About). Ce lien pointera vers `/cv` via un `<Link>` classique (pas un anchor scroll).

**Mobile** : Ajouter le meme lien "CV" dans le drawer mobile, entre "About" et "Contact".

**Labels bilingues** : ajouter `cv: "CV"` dans `navLabels` (identique EN/FR).

### Footer (`src/components/footer.tsx`)

Ajouter un lien "CV" dans la colonne Navigation du footer, en derniere position de la liste des sections. Ce sera un `<Link to="/cv">` style comme les autres liens du footer.

### Fichiers impactes

| Fichier | Modification |
|---------|-------------|
| `src/components/Navigation.tsx` | Ajout lien CV desktop (entre About et Contact) + mobile drawer |
| `src/components/footer.tsx` | Ajout lien CV dans la colonne navigation |

### Details techniques

- Le lien CV utilise `<Link to="/cv">` de react-router (navigation standard, pas un scroll anchor)
- Pas d'underline animee active pour CV (pas de section observable sur la home page)
- Style identique aux autres liens nav pour rester discret et coherent
- Dans le footer, ajout d'un element supplementaire a la fin de la liste des sections existantes

