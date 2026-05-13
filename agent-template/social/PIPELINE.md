# Content Pipeline — [PROPERTY NAME]
_Template — copy The Gathering Pines pipeline and adapt_

---

## Weekly Cadence (Growth / Premium)
1. **Monday** — Event research agent runs: finds upcoming local events 4–8 weeks out
2. **Tuesday** — Content draft agent generates 2 post drafts based on events + property vibe
3. **Wednesday** — Drafts sent to owner for approval (via email or Telegram)
4. **Thursday** — Approved posts queued in Buffer for scheduled posting
5. **Posts go live** — Timed to maximize reach for the target booking window

## Post Types (Growth)
- 2 feed posts/week
- Caption tied to upcoming event or seasonal hook
- Always includes CTA to direct booking site

## Post Types (Premium — add)
- 2–3 Stories/week (behind the scenes, amenity highlights, local tips)
- Monthly highlight cover update
- Ad creative (static) — owner runs the budget

---

## Content Pillars
1. **Local events & experiences** — "X is happening in [city] — book now to secure your weekend"
2. **Amenity spotlights** — hot tub, fire pit, views, kitchen, etc.
3. **Seasonal hooks** — snow, fall foliage, summer heat escape, ski season
4. **Social proof** — review quotes, 5-star callouts
5. **Direct booking nudge** — "skip the fees, book direct" messaging

---

## Agent Prompt Reference
See Gathering Pines event research and content draft prompts as the base template.
Adapt the following for this property:
- City/region for event research
- Property name and amenities
- Guest target profile
- Brand voice/style

---

## Buffer Setup
- Channel: [Instagram handle]
- Slot name in Buffer: [CLIENT_SLUG]
- Posting schedule: [e.g. Tue 10am, Fri 11am MST]
- Queue target: 6–8 weeks ahead at all times

---

## Cron / Automation
```bash
# Weekly event research (Monday 8am MST)
0 8 * * 1 openclaw run event-research --property CLIENT_SLUG

# Weekly draft generation (Tuesday 8am MST)
0 8 * * 2 openclaw run content-drafts --property CLIENT_SLUG
```
See `spawn.sh` for cron setup instructions.
