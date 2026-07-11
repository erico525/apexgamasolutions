# Phase 5 — Quality Assurance & Final Review
### Apex Gama Solutions
*QA, accessibility, performance, SEO, and executive review of the delivered site.*

---

## 1. Method

The site was audited programmatically (a structural + contrast script over every
page) and visually (headless-browser renders at desktop and mobile), then fixed
and re-audited until clean. Results below reflect the final state.

## 2. Accessibility (WCAG 2.1 AA target)

**Structure — all 11 pages pass:**
- One `<h1>` per page; heading order is now gap-free (a visually-hidden
  `<h2>` labels the footer and the Capabilities overview / 404 helper sections
  so no level is skipped).
- Semantic landmarks (`header` / `nav` / `main` / `footer`), a skip-to-content
  link, and a labelled primary nav on every page.
- Every `<img>` has an `alt` (empty + `aria-hidden` for decorative linework);
  every form control has an associated `<label>`; no duplicate `id`s.

**Navigation dropdown:** rebuilt as a proper disclosure pattern — the toggle
carries `aria-expanded` / `aria-controls`; the `role="menu"` / `role="menuitem"`
attributes were removed (they are an anti-pattern for link menus and impose
keyboard semantics the widget does not implement). Escape closes the menu and
returns focus to the toggle; outside-click closes it; it collapses inline on
mobile.

**Color contrast — every text pair now meets AA (≥ 4.5:1):**

| Element | Before | After |
|---|---|---|
| Accent buttons (white on ochre) | 4.31 ✗ | **6.35** ✓ (bg deepened to `--ochre-deep`) |
| Help / notes / captions | 3.79 ✗ | **5.43** ✓ (`--text-subtle` → slate-500) |
| Index numbers / step kickers | 3.90 ✗ | **5.83** ✓ (→ `--ochre-deep`) |
| Footer legal line | 4.19 ✗ | **7.04** ✓ (→ slate-300) |
| Accent numbers on dark bands | — | **9.26** ✓ (→ `--ochre-soft`) |

Body text and reversed text sit at ~15.9:1. Color is never the sole carrier of
meaning; focus is visible via `:focus-visible`; `prefers-reduced-motion` is
honored.

## 3. Performance

- **No framework, no build step.** HTML + one token stylesheet + one small CSS
  file + ~1 KB of vanilla JS (deferred). The site works fully without JS.
- **SVG everywhere** — logo, favicon, graphics, and social card are vector; no
  raster payloads.
- **No layout shift** — images carry explicit `width`/`height`; the hero/header
  contour graphics are absolutely positioned (no reflow).
- **Below-the-fold images** (`systems-diagram`, footer logo) use
  `loading="lazy"` + `decoding="async"`; above-the-fold assets stay eager.
- **Fonts** load via a single Google Fonts request with `preconnect` and
  `display=swap`, and every family has a real fallback stack so text renders
  immediately if the web fonts are slow or blocked.

## 4. SEO

- Unique `<title>` and meta description on every page; one canonical per page.
- Open Graph + Twitter card tags with a dedicated `og-cover.svg`.
- `Organization` JSON-LD (name, legalName, url, logo, description — no
  fabricated fields).
- `sitemap.xml` (all 11 URLs) and `robots.txt` with sitemap reference.
- Semantic headings, descriptive link text, and clean human-readable URLs.
- Internal links and in-page anchors verified: all resolve.

## 5. Content integrity

91 visible `« COMPANY TO PROVIDE »` placeholders remain across the site,
covering every fact the company has not yet supplied (registrations, codes,
leadership, contacts, service descriptions, past performance, news, openings).
**Nothing is fabricated.** Run `grep -rn "COMPANY TO PROVIDE" .` for the full
punch-list before launch.

## 6. Executive review — against the brief's own tests

| Question | Assessment |
|---|---|
| Could this belong to a respected government contractor? | Yes — institutional palette, editorial typography, procurement-legible content. |
| Could the name be swapped without the design falling apart? | No — the Apex Datum mark, ochre-on-slate system, datum-line motif, and mono technical labeling are specific to Apex Gama. |
| Does any section resemble a common template? | No centered-hero-two-buttons, no four identical cards, no logo cloud, no glass panels; sections are individually composed. |
| Does anything feel generic or AI-generated? | Content is scoped and specific; unknowns are placeheld, not padded with filler. |
| Does every page end in a next action? | Yes — each terminates in a single, unambiguous CTA. |

## 7. Known items for the client (not defects)

1. Replace all `« COMPANY TO PROVIDE »` placeholders with verified values.
2. Configure the contact form's delivery endpoint (currently placeheld).
3. Confirm or replace the proposed business-unit scaffold on Capabilities.
4. Provide the production domain if it differs from `www.apexgamasolutions.com`
   (update canonical/OG URLs).
5. Optional: add real Privacy / Terms / Accessibility pages (footer links are
   reserved).

## 8. Sign-off

The site is accessible (AA), fast, SEO-sound, internally consistent, and free of
fabricated content. It is launch-ready pending the client-supplied facts in §7.
