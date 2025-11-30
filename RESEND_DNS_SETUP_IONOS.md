# Configuration DNS Resend pour IONOS - ivandemurard.com

Guide étape par étape pour configurer les enregistrements DNS Resend sur IONOS.

## 📋 Prérequis

- Accès à votre compte IONOS
- Protection DNS activée (déjà fait ✅)
- Les valeurs DNS depuis votre tableau de bord Resend

## 🔍 Étape 1: Accéder à la gestion DNS IONOS

1. Connectez-vous à votre compte IONOS
2. Allez dans **Domaines & SSL**
3. Cliquez sur votre domaine `ivandemurard.com`
4. Allez dans l'onglet **DNS** ou **Enregistrements DNS**
5. Cliquez sur **Ajouter un enregistrement DNS**

## ➕ Étape 2: Ajouter les enregistrements DNS

### Enregistrement 1: DKIM (Domain Verification)

1. **Type:** Sélectionnez **TXT**
2. **Nom/Hôte:** `resend._domainkey`
   - ⚠️ Important: Entrez juste `resend._domainkey` (sans le domaine complet)
3. **Valeur/Contenu:** 
   - Copiez la **valeur complète** depuis Resend
   - Elle commence par `p=MIGfMA0GCSqGSIb3DQEB...`
   - ⚠️ C'est une très longue chaîne - copiez-la entièrement
4. **TTL:** Laissez par défaut (généralement 3600)
5. Cliquez sur **Enregistrer** ou **Ajouter**

### Enregistrement 2: MX Record (Enable Sending)

1. **Type:** Sélectionnez **MX**
2. **Nom/Hôte:** `send`
   - ⚠️ Important: Entrez juste `send` (sans le domaine complet)
3. **Valeur/Contenu:** 
   - Copiez la valeur depuis Resend
   - Elle ressemble à `feedback-smtp.eu-west-...`
4. **Priorité:** `10`
5. **TTL:** Laissez par défaut
6. Cliquez sur **Enregistrer** ou **Ajouter**

### Enregistrement 3: SPF Record (Enable Sending)

1. **Type:** Sélectionnez **SPF (TXT)** ou **TXT**
   - Si vous voyez "IONOS SPF (TXT)", utilisez plutôt **TXT** standard
2. **Nom/Hôte:** `send`
   - ⚠️ Important: Entrez juste `send` (sans le domaine complet)
3. **Valeur/Contenu:** 
   - Copiez la valeur depuis Resend
   - Elle commence par `v=spf1 include:amazons...`
4. **TTL:** Laissez par défaut
5. Cliquez sur **Enregistrer** ou **Ajouter**

### Enregistrement 4: DMARC (Optionnel mais recommandé)

1. **Type:** Sélectionnez **TXT**
2. **Nom/Hôte:** `_dmarc`
   - ⚠️ Important: Entrez juste `_dmarc` (sans le domaine complet)
3. **Valeur/Contenu:** `v=DMARC1; p=none;`
4. **TTL:** Laissez par défaut
5. Cliquez sur **Enregistrer** ou **Ajouter**

## ⚠️ Points importants pour IONOS

### Format des noms d'hôtes

IONOS peut demander le format de différentes manières:

- ✅ **Correct:** `resend._domainkey` ou `send` ou `_dmarc`
- ❌ **Incorrect:** `resend._domainkey.ivandemurard.com` (ne pas inclure le domaine)

### Si IONOS demande un format spécifique

- Certaines interfaces IONOS peuvent demander le domaine complet
- Dans ce cas, utilisez: `resend._domainkey.ivandemurard.com`
- Mais essayez d'abord sans le domaine complet

### Protection DNS IONOS

Si vous avez activé la protection DNS:
- Les enregistrements peuvent prendre un peu plus de temps à se propager
- C'est normal et sécurisé
- Attendez 1-2 heures avant de vérifier dans Resend

## 📝 Résumé des 4 enregistrements à ajouter

| Type | Nom/Hôte | Valeur | Priorité | Notes |
|------|----------|--------|----------|-------|
| TXT | `resend._domainkey` | (Valeur complète depuis Resend) | - | DKIM - très longue chaîne |
| MX | `send` | (Valeur depuis Resend) | 10 | Serveur de messagerie |
| TXT | `send` | `v=spf1 include:amazons...` | - | SPF |
| TXT | `_dmarc` | `v=DMARC1; p=none;` | - | DMARC (optionnel) |

## ⏱️ Étape 3: Attendre la propagation DNS

- **Temps d'attente:** 1 à 2 heures (parfois jusqu'à 24 heures)
- **Vérification:** Vous pouvez vérifier la propagation sur https://dnschecker.org
  - Recherchez: `resend._domainkey.ivandemurard.com` (TXT)
  - Recherchez: `send.ivandemurard.com` (MX et TXT)
  - Recherchez: `_dmarc.ivandemurard.com` (TXT)

## ✅ Étape 4: Vérifier dans Resend

1. Retournez sur votre tableau de bord Resend
2. Allez dans **Domains** → `ivandemurard.com`
3. Cliquez sur **Verify DNS Records** ou **Vérifier les enregistrements DNS**
4. Resend vérifiera chaque enregistrement:
   - ✅ Coches vertes = Vérifié
   - ⏳ En attente = Propagation en cours (attendez et réessayez)
   - ❌ Erreur = Vérifiez à nouveau les valeurs

## 🔧 Dépannage

### Les enregistrements ne se vérifient pas?

1. **Vérifiez les valeurs:** Assurez-vous d'avoir copié les valeurs **complètes** depuis Resend
2. **Vérifiez le format:** Le nom d'hôte doit être juste `send` ou `resend._domainkey` (pas le domaine complet)
3. **Attendez plus longtemps:** La propagation DNS peut prendre jusqu'à 48 heures
4. **Vérifiez sur dnschecker.org:** Vérifiez que vos enregistrements sont visibles publiquement

### Erreurs courantes IONOS

- ❌ Ajouter `ivandemurard.com` au nom d'hôte (ne pas le faire)
- ❌ Oublier des parties de la valeur DKIM (elle est très longue)
- ❌ Mauvais type d'enregistrement (TXT vs MX)
- ❌ Oublier la priorité pour l'enregistrement MX (doit être 10)

### Vérification manuelle

Pour vérifier si vos enregistrements sont corrects, utilisez ces commandes dans un terminal:

```bash
# Vérifier DKIM
nslookup -type=TXT resend._domainkey.ivandemurard.com

# Vérifier SPF
nslookup -type=TXT send.ivandemurard.com

# Vérifier MX
nslookup -type=MX send.ivandemurard.com

# Vérifier DMARC
nslookup -type=TXT _dmarc.ivandemurard.com
```

## 📧 Après la vérification

Une fois votre domaine vérifié dans Resend:

1. Allez dans **Supabase Dashboard** → **Project Settings** → **Edge Functions** → **Secrets**
2. Ajoutez/modifiez la variable d'environnement:
   - **Nom:** `RESEND_FROM_EMAIL`
   - **Valeur:** `Portfolio <contact@ivandemurard.com>` (ou toute autre adresse à votre domaine)

Le formulaire de contact utilisera automatiquement votre domaine vérifié!

## 🆘 Besoin d'aide?

- Vérifiez les enregistrements DNS: https://dnschecker.org
- Outil de vérification Resend: https://dns.email
- Support IONOS: Contactez le support si vous avez des problèmes avec l'interface DNS

---

**Prochaines étapes:**
1. ✅ Ajouter les 4 enregistrements DNS dans IONOS
2. ⏳ Attendre 1-2 heures pour la propagation
3. ✅ Vérifier dans Resend
4. 📧 Configurer `RESEND_FROM_EMAIL` dans Supabase
5. 🧪 Tester le formulaire de contact

