# Information Architecture & Sitemap
### Apex Gama Defense Solutions
*Phase 1 deliverable.*

---

## 1. Principles

- **Shallow and legible.** Primary navigation is organized around what a buyer must
  *verify*, not around marketing taxonomy.
- **No dead ends.** Every page terminates in a logical next action.
- **Built to expand.** The structure absorbs Newsroom, Careers, Past Performance, Case
  Studies, Contract Vehicles, and Certifications with no redesign — each has a reserved home.

## 2. Primary navigation

```
Apex Gama Defense Solutions
├── Company            (about.html)
├── Capabilities       (capabilities.html)
├── Contracting        (contracting.html)   ← procurement info (NAICS/PSC/UEI/CAGE/SAM)
└── Contact            (contact.html)        ← primary CTA, styled as button
```

The navigation is deliberately shallow — four destinations plus the Contact
action. "How we work" lives as a section on the Home and Company pages rather
than as its own page. Footer navigation mirrors the three content areas
(Company · Capabilities · Contracting).

## 3. Sitemap (built now vs. reserved)

| Page | File | Status | Purpose |
|---|---|---|---|
| Home | `index.html` | **Built** | Positioning, capability overview, who we support, how we work, procurement snapshot, contact. |
| Company | `about.html` | **Built** | Who we are, mission/vision (placeholders), operating principles, leadership (placeholder), CTA. |
| Capabilities | `capabilities.html` | **Built** | Six business units as a scaffold; each with placeholder descriptions/examples. |
| Contracting | `contracting.html` | **Built** | Procurement facts (all placeholders), how to buy, small-business, capability statement request. |
| Contact | `contact.html` | **Built** | Points of contact (placeholder), inquiry form, media/recruiting routes. |
| Not Found | `404.html` | **Built** | Graceful recovery, routes back into the site. |
| Approach | `approach.html` | *Reserved* | Operating model as a numbered process (folded into Home/Company for now). |
| Newsroom | `newsroom.html` | *Reserved* | Press releases, awards, events. |
| Careers | `careers.html` | *Reserved* | Recruiting, culture, openings. |
| Past Performance | `past-performance.html` | *Reserved* | Populated only with real, cleared past performance. |
| Insights / White Papers | `insights.html` | *Reserved* | Thought leadership. |

The site ships lean: the reserved rows are **not** built until there is real
content to fill them. The reusable components they need (index list, record
card, notice/empty state) already exist in the design system, so each can be
added later — behind a "Resources" menu — without a redesign.

## 4. Per-page content hierarchy (applied to every built page)

Each page follows the same skeleton so visitors never feel lost:

```
1. Purpose            — an eyebrow + a single clear statement of the page's job
2. Overview           — the essential context in a narrow reading column
3. Supporting detail  — capability matrix / data panel / numbered process / etc.
4. Operational value  — what it means for the buyer
5. Related            — links deeper into the site (no dead ends)
6. Next action        — a single, unambiguous CTA band
```

## 5. Navigation labeling rationale

- **"Company"** not "About Us" — institutional, less consumer.
- **"Capabilities"** not "Services" — the procurement-native term; also future-proofs the
  shift toward business units.
- **"Contracting"** as its own top-level item — signals procurement-readiness immediately and
  gives contracting officers a direct path. This placement is itself a trust signal.
- **"Contact"** rendered as the single emphasized action in the nav.

## 6. Expansion plan (no redesign required)

- **Newsroom / Insights / Careers** slot into a future top-level **Resources** menu and the
  footer's reserved column; they reuse the existing article and index layouts.
- **Past Performance / Case Studies** attach under Capabilities and Contracting once real,
  cleared content exists.
- **Contract Vehicles / Certifications** are sub-sections of Contracting with reserved slots
  already present on that page.
- **Multiple offices / business units** are supported by the footer and Contracting layouts,
  which are built to list many entries.
