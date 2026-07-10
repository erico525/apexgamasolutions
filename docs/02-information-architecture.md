# Information Architecture & Sitemap
### Apex Gama Solutions
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
Apex Gama Solutions
├── Company            (about.html)
├── Capabilities       (capabilities.html)
├── Approach           (approach.html)
├── Contracting        (contracting.html)   ← procurement info (NAICS/PSC/UEI/CAGE/SAM)
└── Contact            (contact.html)        ← primary CTA, styled as button
```

Utility / footer navigation (reserved, expands over time):

```
Company            Capabilities        Contracting          Resources (future)
- Overview         - Operations Sup.   - How to work w/ us  - Newsroom
- Leadership       - Facilities & Inf. - Registrations      - Insights / White Papers
- Approach         - Logistics         - Contract Vehicles  - Case Studies
- Careers (future) - Program Mgmt      - Small Business      - Past Performance
                   - Training & Read.  - Capability Stmt     - Certifications
                   - Engineering Sup.
```

## 3. Sitemap (built now vs. reserved)

| Page | File | Status | Purpose |
|---|---|---|---|
| Home | `index.html` | **Built** | Positioning, capability overview, who we support, approach, procurement snapshot, contact. |
| Company | `about.html` | **Built** | Who we are, mission/vision (placeholders), operating principles, leadership (placeholder), CTA. |
| Capabilities | `capabilities.html` | **Built** | Six business units as a scaffold; each with placeholder descriptions/examples. |
| Approach | `approach.html` | **Built** | The operating model as a numbered, repeatable process. |
| Contracting | `contracting.html` | **Built** | Procurement facts (all placeholders), how to buy, small-business, capability statement request. |
| Contact | `contact.html` | **Built** | Points of contact (placeholder), inquiry form, media/recruiting routes. |
| Not Found | `404.html` | **Built** | Graceful recovery, routes back into the site. |
| Newsroom | `newsroom.html` | **Built** | Press releases, awards, events. Live, reserved index. |
| Careers | `careers.html` | **Built** | Recruiting, culture, hiring process, openings, EEO. |
| Case Studies / Past Performance | `past-performance.html` | **Built** | Reserved records; populated only with real, cleared past performance. |
| Insights / White Papers | `insights.html` | **Built** | Thought leadership. Live, reserved index. |

The four sections above are reached via a **Resources** dropdown in the primary
navigation (Newsroom · Insights · Past Performance · Careers) and via the footer.

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
