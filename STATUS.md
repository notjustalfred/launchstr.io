# Launchstr — Project Status
_Last updated: 2026-05-13_

---

## What's Built

| Item | Status | Notes |
|------|--------|-------|
| Landing page (`site/index.html`) | ✅ Live | Competitor compare table added, all CTAs → form.html |
| Intake form (`site/form.html`) | ✅ Built | 11-step multi-step form, all GP data points + Instagram question |
| Competitor research | ✅ Done | `/projects/staybrand/COMPETITOR-RESEARCH.md` |
| Intake form spec | ✅ Done | `/projects/staybrand/INTAKE-FORM.md` |
| Per-property agent template | ✅ Built | `/projects/launchstr/agent-template/` |
| Domain (launchstr.io) | ✅ CNAME set | Confirm GitHub Pages deployment + DNS |
| Payment integration (Stripe) | 🔴 Pending | Need Stripe account + Payment Links created |
| Form backend (Formspree) | 🔴 Pending | Sign up at formspree.io → replace FORMSPREE_ENDPOINT in form.html |
| Photo storage backend | 🟡 Partial | File upload in form; Google Drive link post-payment (manual for now) |

---

## Next Actions

### Step 3 — Payment (Stripe)
1. Create Stripe account at stripe.com (or log in)
2. Go to **Payment Links** → create 3 links:
   - **Launch**: $997 one-time
   - **Growth**: $997 one-time + $297/mo recurring subscription
   - **Premium**: $997 one-time + $497/mo recurring subscription
3. Replace these placeholders in `site/form.html`:
   - `STRIPE_LAUNCH_LINK` → your Launch payment link URL
   - `STRIPE_GROWTH_LINK` → your Growth payment link URL
   - `STRIPE_PREMIUM_LINK` → your Premium payment link URL

### Step 3b — Form Backend (Formspree)
1. Sign up at formspree.io
2. Create a new form → copy the endpoint ID (looks like `xpzgabcd`)
3. Replace `FORMSPREE_ENDPOINT` in `site/form.html` with your ID
4. Form submissions will email to the address you register
5. Note: File uploads (photos) require Formspree Gold ($40/mo) OR use Netlify

### Step 4 — Per-Property Agent Template
- Template lives at `/projects/launchstr/agent-template/`
- When a new client pays and submits the form:
  1. Run `./agent-template/spawn.sh CLIENT_SLUG` to scaffold the client folder
  2. Fill in `PROPERTY.md` from the intake form data
  3. Configure Buffer slot for the property
  4. Set up cron (see `spawn.sh` comments)
  5. Sub-agent runs event research + content drafts on schedule

---

## Pricing (Validated)
- **Launch**: $997 one-time (~95%+ margin)
- **Growth**: $297/month (~91% margin at scale)
- **Premium**: $497/month (~85% margin at scale)
- Competitors charge $1,500–$4,000 setup and $90–$2,500/month — we're the clear value leader

## Cost Per Client / Month
- Anthropic API: ~$2–8
- Buffer: ~$6–18
- Alfred overhead: ~$2–5
- **Total hard cost: ~$10–30/client/month**

---

## Site Files
```
projects/launchstr/site/
  index.html    ← landing page (competitor table added, CTAs updated)
  form.html     ← 11-step intake form (Stripe + Formspree placeholders)
  CNAME         ← launchstr.io
```

## Deployment
Currently configured for GitHub Pages. To deploy:
```bash
cd projects/launchstr/site
git init  # if not already
git remote add origin https://github.com/USERNAME/launchstr.io
git add . && git commit -m "Launch" && git push -u origin main
```
Then set GitHub Pages source to `main` branch, root directory.
DNS: Add CNAME record `www → USERNAME.github.io` on GoDaddy.
