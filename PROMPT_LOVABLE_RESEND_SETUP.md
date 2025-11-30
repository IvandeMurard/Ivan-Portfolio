# Prompt pour Lovable - Configuration Resend et Supabase

## Prompt à copier-coller dans Lovable

```
Je dois configurer l'intégration Resend avec Supabase pour activer le formulaire de contact de mon portfolio.

CONTEXTE:
- Mon domaine ivandemurard.com est vérifié dans Resend (DNS configuré)
- J'ai une clé API Resend prête à utiliser
- Mon projet Supabase: flionggpfherauzgroah (URL: https://flionggpfherauzgroah.supabase.co)
- La fonction edge send-contact-email existe déjà dans supabase/functions/send-contact-email/index.ts
- Le formulaire de contact est dans src/components/ContactForm.tsx

ACTIONS REQUISES:

1. CONFIGURER LES SECRETS SUPABASE
   - Accéder au projet Supabase: https://supabase.com/dashboard/project/flionggpfherauzgroah
   - Aller dans Edge Functions → Secrets
   - Ajouter les 3 secrets suivants:
     * RESEND_API_KEY: [demander à l'utilisateur sa clé API Resend]
     * CONTACT_EMAIL: [demander l'email où recevoir les messages, ex: ivandemurard@gmail.com]
     * RESEND_FROM_EMAIL: Portfolio <contact@ivandemurard.com>
   - Confirmer que les secrets sont bien enregistrés

2. DÉPLOYER LA FONCTION EDGE
   - Vérifier que la fonction send-contact-email existe dans supabase/functions/send-contact-email/
   - Déployer la fonction via Supabase Dashboard ou CLI
   - Vérifier que la fonction est active et déployée

3. VÉRIFIER LA CONFIGURATION
   - Vérifier que les variables d'environnement VITE_SUPABASE_URL sont configurées dans Lovable
   - S'assurer que le formulaire ContactForm.tsx utilise bien l'URL Supabase pour appeler la fonction edge
   - Vérifier que la fonction edge utilise bien les secrets Deno.env.get('RESEND_API_KEY'), etc.

4. TESTER LE FORMULAIRE
   - Tester le formulaire de contact sur le site
   - Vérifier que les emails sont bien envoyés via Resend
   - Confirmer que les emails arrivent à l'adresse CONTACT_EMAIL configurée

5. VÉRIFIER LES LOGS
   - Vérifier les logs de la fonction edge dans Supabase Dashboard
   - S'assurer qu'il n'y a pas d'erreurs
   - Confirmer que les emails sont bien envoyés depuis contact@ivandemurard.com

IMPORTANT:
- Ne pas exposer les clés API dans le code
- Utiliser uniquement les secrets Supabase pour les variables sensibles
- S'assurer que le domaine ivandemurard.com est bien utilisé comme expéditeur
- Tester en production après déploiement

Merci de me guider étape par étape et de me demander les informations nécessaires (clé API Resend, email de contact).
```

## Version courte (si Lovable a des limites de caractères)

```
Configurer Resend avec Supabase pour le formulaire de contact.

ACTIONS:
1. Ajouter 3 secrets dans Supabase Edge Functions:
   - RESEND_API_KEY: [demander la clé]
   - CONTACT_EMAIL: [demander l'email]
   - RESEND_FROM_EMAIL: Portfolio <contact@ivandemurard.com>

2. Déployer la fonction send-contact-email si nécessaire

3. Vérifier que ContactForm.tsx appelle bien la fonction edge

4. Tester l'envoi d'email

Projet Supabase: flionggpfherauzgroah
Domaine vérifié: ivandemurard.com
```

## Instructions détaillées pour Lovable

Si Lovable ne peut pas accéder directement à Supabase, voici les étapes manuelles à suivre:

### Étape 1: Configuration manuelle des secrets Supabase

1. Allez sur https://supabase.com/dashboard/project/flionggpfherauzgroah
2. Menu gauche → **Edge Functions**
3. Cliquez sur l'onglet **Secrets**
4. Ajoutez ces 3 secrets:

   **Secret 1:**
   - Nom: `RESEND_API_KEY`
   - Valeur: [Votre clé API Resend - commence par `re_...`]

   **Secret 2:**
   - Nom: `CONTACT_EMAIL`
   - Valeur: [Votre email - ex: `ivandemurard@gmail.com`]

   **Secret 3:**
   - Nom: `RESEND_FROM_EMAIL`
   - Valeur: `Portfolio <contact@ivandemurard.com>`

### Étape 2: Vérifier la fonction edge

1. Dans Supabase Dashboard → **Edge Functions**
2. Vérifiez que `send-contact-email` est listée
3. Si elle n'existe pas, déployez-la depuis le code source

### Étape 3: Tester

1. Ouvrez votre portfolio
2. Allez à la section Contact
3. Envoyez un message de test
4. Vérifiez votre boîte mail

## Checklist de vérification

- [ ] Secrets Supabase configurés (RESEND_API_KEY, CONTACT_EMAIL, RESEND_FROM_EMAIL)
- [ ] Fonction edge `send-contact-email` déployée
- [ ] Variables d'environnement VITE_SUPABASE_URL configurées dans Lovable
- [ ] Formulaire ContactForm.tsx fonctionnel
- [ ] Test d'envoi d'email réussi
- [ ] Emails reçus à l'adresse CONTACT_EMAIL
- [ ] Emails envoyés depuis contact@ivandemurard.com

## Informations techniques

**Project ID Supabase:** `flionggpfherauzgroah`
**URL Supabase:** `https://flionggpfherauzgroah.supabase.co`
**URL Edge Function:** `https://flionggpfherauzgroah.supabase.co/functions/v1/send-contact-email`
**Domaine vérifié:** `ivandemurard.com`
**Fichiers concernés:**
- `supabase/functions/send-contact-email/index.ts`
- `src/components/ContactForm.tsx`

