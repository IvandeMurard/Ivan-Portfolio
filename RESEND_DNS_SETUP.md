# Resend DNS Setup Guide for ivandemurard.com

This guide will help you configure the DNS records required by Resend to send emails from your domain.

## 📋 Prerequisites

- Access to your domain registrar (where you purchased `ivandemurard.com`)
- The DNS records from your Resend dashboard (shown in the screenshot)

## 🔍 Step 1: Identify Your Domain Registrar

Your domain `ivandemurard.com` is registered with a domain registrar (e.g., GoDaddy, Namecheap, Google Domains, Cloudflare, etc.). You need to log into that account to manage DNS records.

**Common registrars:**
- GoDaddy
- Namecheap
- Google Domains / Google Workspace
- Cloudflare
- AWS Route 53
- OVH
- Gandi

## 📝 Step 2: Access DNS Management

1. Log into your domain registrar account
2. Navigate to **DNS Management** or **DNS Settings** for `ivandemurard.com`
3. Look for a section called:
   - "DNS Records"
   - "DNS Zone"
   - "Manage DNS"
   - "DNS Configuration"

## ➕ Step 3: Add DNS Records

Add the following records **exactly as shown in your Resend dashboard**:

### Record 1: Domain Verification (DKIM)
- **Type:** `TXT`
- **Name/Host:** `resend._domainkey`
- **Value/Content:** (Copy the full value from Resend - starts with `p=MIGfMA0GCSqGSIb3DQEB...`)
- **TTL:** `Auto` or `3600` (1 hour)

### Record 2: Enable Sending - MX Record
- **Type:** `MX`
- **Name/Host:** `send`
- **Value/Content:** (Copy from Resend - looks like `feedback-smtp.eu-west-...`)
- **TTL:** `Auto` or `3600`
- **Priority:** `10`

### Record 3: Enable Sending - SPF Record
- **Type:** `TXT`
- **Name/Host:** `send`
- **Value/Content:** (Copy from Resend - starts with `v=spf1 include:amazons...`)
- **TTL:** `Auto` or `3600`

### Record 4: DMARC (Optional but Recommended)
- **Type:** `TXT`
- **Name/Host:** `_dmarc`
- **Value/Content:** `v=DMARC1; p=none;`
- **TTL:** `Auto` or `3600`

## ⚠️ Important Notes

1. **Exact Values:** Copy the **complete** values from Resend - they may be truncated in the UI. Click to expand or copy the full value.

2. **Subdomain vs Root Domain:**
   - If your registrar requires a dot at the end (e.g., `resend._domainkey.`), add it
   - Some registrars use `@` for root domain records
   - For subdomain records like `send`, enter just `send` (not `send.ivandemurard.com`)

3. **TTL:** Use `Auto` if available, otherwise `3600` (1 hour) is standard

## ⏱️ Step 4: Wait for DNS Propagation

- DNS changes can take **15 minutes to 48 hours** to propagate globally
- Usually takes **1-2 hours** in most cases
- You can check propagation status at: https://dnschecker.org

## ✅ Step 5: Verify in Resend

1. Return to your Resend dashboard
2. Click **"Verify DNS Records"** or **"Check Status"**
3. Resend will verify each record:
   - ✅ Green checkmark = Verified
   - ⏳ Pending = Still propagating (wait and retry)
   - ❌ Error = Check the record values again

## 🔧 Troubleshooting

### Records not verifying?

1. **Double-check values:** Ensure you copied the complete, exact values from Resend
2. **Check record type:** Make sure TXT records are set as TXT, MX as MX
3. **Wait longer:** DNS can take up to 48 hours in rare cases
4. **Use DNS checker:** Visit https://dnschecker.org and search for:
   - `resend._domainkey.ivandemurard.com` (TXT)
   - `send.ivandemurard.com` (MX and TXT)
   - `_dmarc.ivandemurard.com` (TXT)

### Common Mistakes

- ❌ Adding `ivandemurard.com` to the hostname (should be just `send` or `resend._domainkey`)
- ❌ Missing parts of the DKIM value (it's very long - copy the entire string)
- ❌ Wrong record type (TXT vs MX)
- ❌ Forgetting the priority for MX records

## 📧 Step 6: Update Contact Form (After Verification)

Once your domain is verified in Resend, the contact form will automatically use your domain. The edge function is already configured to use your verified domain.

## 🆘 Need Help?

If you're stuck:
1. Check Resend's DNS lookup tool: https://dns.email
2. Contact your domain registrar's support
3. Verify you're editing DNS for the correct domain

---

**Next Steps After DNS Setup:**
1. Wait for DNS verification (usually 1-2 hours)
2. Verify domain in Resend dashboard
3. Test the contact form on your portfolio
4. Check your email inbox for test submissions

