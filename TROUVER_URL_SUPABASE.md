# Comment retrouver l'URL de votre projet Supabase

## 🔍 Méthode 1: Via le Project ID (Rapide)

Votre **Project ID** est: `flionggpfherauzgroah`

L'URL de votre projet Supabase suit ce format:
```
https://[project-id].supabase.co
```

**Votre URL est donc:**
```
https://flionggpfherauzgroah.supabase.co
```

## 🔍 Méthode 2: Via le Dashboard Supabase

1. **Connectez-vous à Supabase**
   - Allez sur https://supabase.com
   - Connectez-vous à votre compte

2. **Sélectionnez votre projet**
   - Dans la liste des projets, trouvez votre projet
   - Cliquez dessus

3. **Trouver l'URL**
   - Allez dans **Settings** (Paramètres) → **API**
   - Vous verrez:
     - **Project URL:** `https://flionggpfherauzgroah.supabase.co`
     - **Project API keys:** Vos clés API

## 🔍 Méthode 3: Via les variables d'environnement

L'URL est stockée dans la variable d'environnement `VITE_SUPABASE_URL`.

### Si vous utilisez Lovable:
1. Allez dans votre projet Lovable
2. **Settings** → **Environment Variables**
3. Cherchez `VITE_SUPABASE_URL`
4. La valeur devrait être: `https://flionggpfherauzgroah.supabase.co`

### Si vous travaillez en local:
Vérifiez votre fichier `.env` (s'il existe):
```env
VITE_SUPABASE_URL=https://flionggpfherauzgroah.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=votre_cle_publique
```

## 📋 Informations importantes

### URLs importantes de votre projet:

| Type | URL | Usage |
|------|-----|-------|
| **Project URL** | `https://flionggpfherauzgroah.supabase.co` | URL principale du projet |
| **API URL** | `https://flionggpfherauzgroah.supabase.co` | Même URL pour l'API |
| **Edge Functions** | `https://flionggpfherauzgroah.supabase.co/functions/v1/` | Pour appeler les fonctions edge |
| **Dashboard** | `https://supabase.com/dashboard/project/flionggpfherauzgroah` | Interface d'administration |

### Exemple d'utilisation pour Edge Functions:

Pour appeler votre fonction `send-contact-email`:
```
https://flionggpfherauzgroah.supabase.co/functions/v1/send-contact-email
```

## 🔧 Accéder au Dashboard Supabase

**Lien direct vers votre projet:**
```
https://supabase.com/dashboard/project/flionggpfherauzgroah
```

Ou:
1. Allez sur https://supabase.com/dashboard
2. Cliquez sur votre projet dans la liste

## ✅ Vérification

Pour vérifier que c'est bien votre projet:
1. Allez sur https://flionggpfherauzgroah.supabase.co
2. Vous devriez voir une page Supabase (ou une redirection)
3. Connectez-vous au dashboard pour confirmer

## 📝 Note

Le **Project ID** est stocké dans:
- `supabase/config.toml` → `project_id = "flionggpfherauzgroah"`

Cette information est utilisée pour:
- Lier votre projet local à Supabase
- Déployer les migrations
- Configurer les Edge Functions

