

## Deplacer le lien CV sous les icones Connect dans le footer

### Modification

Deplacer le `<Link to="/cv">CV</Link>` de la colonne Navigation (lignes 93-100) vers la colonne Connect (colonne 4), juste apres la liste d'icones sociales.

### Resultat visuel

```text
CONNECT
[mail] [cal] [linkedin] [github] [x]
CV
```

### Fichier impacte

| Fichier | Modification |
|---------|-------------|
| `src/components/footer.tsx` | Supprimer le `<li>` CV des lignes 93-100, ajouter un lien CV texte apres le `</ul>` des icones sociales (vers ligne 170) |

### Details techniques

- Le lien CV sera place dans un `<Link to="/cv">` avec le meme style que les liens de section (`text-[15px] text-white/80 hover:text-[#065f46]`)
- Espacement : `mt-4` au-dessus pour separer des icones
- Les deux colonnes Navigation retrouvent leur symetrie exacte

