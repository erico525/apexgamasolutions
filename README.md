# Apex Gama Defense Solutions — Corporate Website

The public-facing website and identity system for **Apex Gama Defense Solutions**
(legal entity: *Apex Gama Defense Solutions LLC*).

This repository contains a static, framework-free website plus the brand and
design foundation it is built on. It is intentionally buildless: hand-authored
semantic HTML with a CSS design-token system and a small amount of vanilla
JavaScript. Any developer or agency can maintain it and it deploys to any
static host.

---

## Status

Delivered in this pass (a strategic foundation plus a complete, navigable core site):

**Strategy & foundation** — `docs/`
- `00-research-synthesis.md` — what credible firms in the category do, and the rejection checklist
- `01-brand-strategy.md` — names, positioning, personality, voice, truthfulness rules
- `02-information-architecture.md` — sitemap, navigation, per-page hierarchy, expansion plan
- `03-design-system.md` — logo system, color, type, spacing, components, accessibility, SEO
- `04-qa-and-review.md` — Phase 5 QA: accessibility (AA), performance, SEO, and executive review

**Identity** — `assets/img/`
- Logo system: primary, horizontal, stacked, mono, white, icon mark, favicon, social cover
- Original graphics: plan-view contour pattern, operating-model schematic

**Website** — root
A focused five-page site — the professional essentials, nothing padded:

- `index.html` — home (positioning, capabilities, who we support, how we work, procurement snapshot)
- `about.html` — company (overview, mission/vision, operating principles, leadership)
- `capabilities.html` — six business units
- `contracting.html` — procurement information (identifiers, codes, vehicles, small business, engagement)
- `contact.html` — points of contact + inquiry form
- `404.html` — recovery page
- `robots.txt`, `sitemap.xml`

The design system and information architecture are built to absorb further
sections later without a redesign — Newsroom, Insights, Past Performance,
Careers, and Certifications each have a documented home in
`docs/02-information-architecture.md`. They are intentionally **not** built yet;
the site stays lean until there is real content to fill them. The reusable
components for those sections (index list, record card, notice/empty state)
remain in `assets/css/site.css`.

---

## Content ownership — important

The company's real facts are **not** invented anywhere on this site. Every place
that requires a verified fact shows a visible placeholder rendered in an
unmistakable dashed style:

> `« COMPANY TO PROVIDE »`

These cover, among others: mission & vision, leadership bios/photos, office
locations, UEI, CAGE, SAM status, NAICS/PSC codes, capability statement, past
performance, contract vehicles, certifications, insurance, and all contact
details. Search the codebase for `COMPANY TO PROVIDE` to find every item that
needs real content before launch.

The business-unit structure on the Capabilities page is a **proposed scaffold**
drawn from the brief's operational vocabulary; confirm or replace each unit's
description and examples. No past performance or contract is asserted as fact.

---

## Local preview

No build step. Open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deployment

Upload the repository root to any static host (e.g., a static bucket, Netlify,
GitHub Pages, or an agency CDN). Configure the host to serve `404.html` for
not-found responses. Update the canonical/OG domain in each page's `<head>` if
the production domain differs from `www.apexgamasolutions.com`.

## Editing

- **Design tokens** live in `assets/css/tokens.css` — change color, type scale,
  and spacing there and the whole site follows.
- **Components** live in `assets/css/site.css`.
- Header and footer markup is repeated per page (static site); when you change
  one, update the others to match.

## Brand usage (quick reference)

- Public brand everywhere: **Apex Gama Defense Solutions**. Never present "DBA" publicly.
- Legal entity only where legally appropriate (footer, legal docs, contracting):
  **Apex Gama Defense Solutions LLC**.
- "Gama" is intentional — never change it to "Gamma."
