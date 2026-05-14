# Launchstr — Project Status
_Last updated: 2026-05-13_

---

## What's Built & Live

| Item | Status | Notes |
|------|--------|-------|
| Landing page | ✅ Live | Competitor table, embedded form, all CTAs |
| Intake form (11-step, embedded) | ✅ Live | Netlify Forms, all GP data points + IG question |
| Success / payment redirect page | ✅ Live | Auto-redirects to Stripe based on package |
| Terms & Release of Liability | ✅ Live | `/terms.html` — full legal coverage |
| Competitor research | ✅ Done | `/projects/staybrand/COMPETITOR-RESEARCH.md` |
| Intake form spec | ✅ Done | `/projects/staybrand/INTAKE-FORM.md` |
| Per-property agent template | ✅ Built | `/projects/launchstr/agent-template/` |
| Netlify deployment | ✅ Live | Site ID: `3d38fc64` · Auth token in STATUS |
| GitHub repo | ✅ Live | `github.com/notjustalfred/launchstr.io` |
| Custom domain (launchstr.io) | ✅ Configured | DNS propagating — HTTPS auto-provisions on clear |
| Stripe account | ✅ Live | Account: Launchstr / `acct_1TWdO8CHAD8rnxhp` |
| Stripe payment links | ⚠️ Test mode | Live links pending — need live secret key from Alex |
| FAMILY promo code | ✅ Live | Waives $997 setup fee, one-time, max 100 uses |
| T&C checkbox at checkout | ✅ Live | Required before pay button enables |
| Apache Legacy Group LLC fine print | ✅ Live | Footer of every page |

---

## URLs

| Resource | URL |
|----------|-----|
| Production site | https://launchstr.io (propagating) / https://launchstr-io.netlify.app |
| Netlify dashboard | https://app.netlify.com/projects/launchstr-io |
| Stripe dashboard | https://dashboard.stripe.com/acct_1TWdO8CHAD8rnxhp |
| GitHub repo | https://github.com/notjustalfred/launchstr.io |

---

## Stripe — Test Payment Links (active, promo codes enabled)
| Package | Test Link |
|---------|-----------|
| Launch ($997 one-time) | https://buy.stripe.com/test_aFaaEW9vcdg02qaaXV7EQ00 |
| Growth ($997 + $297/mo) | https://buy.stripe.com/test_dRm00ibDk3Fq2qa8PN7EQ01 |
| Premium ($997 + $497/mo) | https://buy.stripe.com/test_fZu3cubDk2BmaWG6HF7EQ02 |

**FAMILY promo code** — $997 off, one-time, max 100 redemptions. Active in test mode. Will recreate in live mode once live secret key is available.

---

## Pending — One Action from Alex

**Stripe live secret key** — Requires 2FA on Alex's device to reveal:
1. Go to https://dashboard.stripe.com/acct_1TWdO8CHAD8rnxhp/apikeys
2. Click "Reveal live key" on the Secret Key row
3. Complete 2FA verification
4. Share the `sk_live_...` key

Once received: Alfred will create live products, prices, payment links, and FAMILY coupon — then swap the test links in `site/index.html` and redeploy.

---

## DNS / HTTPS Status (2026-05-13)

| Record | Type | Value | Status |
|--------|------|-------|--------|
| launchstr.io | A | 75.2.60.5 (Netlify) | ✅ Set |
| www.launchstr.io | CNAME | launchstr-io.netlify.app | ✅ Set |
| Old GitHub Pages A records | A | 185.199.x.x | ✅ Deleted |
| GoDaddy domain verification | TXT | Code 484146 | ✅ Verified |

SSL: Netlify auto-provisions Let's Encrypt once DNS propagates (up to a few hours).

---

## Credentials

| Service | Details |
|---------|---------|
| Netlify auth token | See CREDENTIALS.md |
| Netlify site ID | `3d38fc64-1346-48d4-8ca4-d11b3aeff5d4` |
| Stripe test secret key | See CREDENTIALS.md |
| Stripe publishable (live) | See CREDENTIALS.md |
| GitHub token | See CREDENTIALS.md |
| GoDaddy login | See CREDENTIALS.md |

---

## Site File Structure
```
projects/launchstr/
  STATUS.md               ← this file
  netlify.toml            ← build config (publish = "site")
  agent-template/
    PROPERTY.md           ← client profile template
    spawn.sh              ← scaffold new client folder
    social/PIPELINE.md    ← weekly content pipeline template
  site/
    index.html            ← landing page + embedded 11-step intake form
    form.html             ← standalone form (backup, not primary)
    success.html          ← post-submission Stripe redirect page
    terms.html            ← Terms of Service & Release of Liability
    CNAME                 ← launchstr.io
```

---

## Pricing (Validated Against Competitors)
| Package | Setup | Monthly | Margin |
|---------|-------|---------|--------|
| Launch | $997 | — | ~95% |
| Growth | $997 | $297 | ~91% |
| Premium | $997 | $497 | ~85% |

FAMILY promo waives $997 setup fee for founding/family clients.

---

## Next Session — Test Cases
- [ ] End-to-end form submission test (Netlify Forms receipt check)
- [ ] Stripe test checkout — all 3 packages
- [ ] FAMILY promo code test at checkout
- [ ] Success page redirect verification
- [ ] https://launchstr.io load + SSL check post-propagation
- [ ] Swap test Stripe links → live links (needs live secret key)
- [ ] First real client onboarding (run `spawn.sh CLIENT_SLUG`)
