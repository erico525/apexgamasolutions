# Apex Gama Solutions — Corporate Website

The public-facing website and identity system for **Apex Gama Solutions**
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
- `index.html` — home
- `about.html` — company
- `capabilities.html` — six business units
- `approach.html` — operating model
- `contracting.html` — procurement information
- `contact.html` — points of contact + inquiry form
- `newsroom.html` — announcements, awards, events (live, reserved index)
- `insights.html` — white papers / perspective (live, reserved index)
- `past-performance.html` — delivered engagements (reserved records, honesty-first)
- `careers.html` — culture, hiring process, openings, EEO
- `404.html` — recovery page
- `robots.txt`, `sitemap.xml`

Newsroom, Insights, Past Performance, and Careers are reachable from a
**Resources** dropdown in the primary navigation and from the footer. They ship
as live, empty-but-ready sections: real content drops into the existing index /
record layouts with no redesign. Certifications remain reserved and slot into
the Contracting page when awarded.

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

- Public brand everywhere: **Apex Gama Solutions**. Never present "DBA" publicly.
- Legal entity only where legally appropriate (footer, legal docs, contracting):
  **Apex Gama Defense Solutions LLC**.
- "Gama" is intentional — never change it to "Gamma."
