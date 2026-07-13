# Design System
### Apex Gama Defense Solutions — Visual Language & Component Library
*Phase 1 deliverable. The tokens defined here are implemented in `assets/css/tokens.css`.*

---

## 1. Design principles

Editorial · architectural · structured · intentional · timeless. Information over decoration.
No gimmicks. Every value below is chosen for a ten-year lifespan and for transfer to print
(capability statements, proposals, letterhead) as readily as to screen.

## 2. Logo & mark system

The identity is built on **APEX GAMA DEFENSE SOLUTIONS** set in the display serif with the "DEFENSE SOLUTIONS"
descriptor in mono, and an original geometric **mark**.

**Mark concept — "The Apex Datum."** An abstract ascending peak (the *apex* — summit, forward
progress) resting on a horizontal **datum line** (structure, foundation, the surveyor's/engineer's
reference line). The peak is drawn as two precise monoline strokes; the right stroke extends past
the vertex to imply forward motion. It reads as *precision, structure, reliability, and forward
progress* with **zero** tactical/defense cliché — no eagle, shield, star, or flag.

Delivered variants (in `assets/img/`):

| File | Variant |
|---|---|
| `logo-primary.svg` | Primary lockup (mark + wordmark, stacked descriptor) |
| `logo-horizontal.svg` | Horizontal lockup for headers / letterhead |
| `logo-stacked.svg` | Vertical lockup for covers / social |
| `icon-mark.svg` | Icon mark only |
| `logo-white.svg` | Reversed (for dark/ink backgrounds) |
| `logo-mono.svg` | Single-color (documents, fax, engraving) |
| `favicon.svg` | Favicon (mark, optimized at small size) |

**Clear space:** minimum of the mark's datum-line width on all sides.
**Minimum size:** mark no smaller than 24 px on screen / 0.3 in in print.

## 3. Color

A deep institutional neutral does the work; a single restrained **ochre** accent signals
precision (the surveyor's mark / blueprint annotation). No patriotic red-white-blue, no
tactical black-and-olive.

| Token | Hex | Role |
|---|---|---|
| `--ink` | `#141B24` | Primary text; dark section backgrounds. A deep blue-slate, not black. |
| `--slate-800` | `#1F2A36` | Dark panels, footers. |
| `--slate-600` | `#3C4C5A` | Secondary text on paper. |
| `--slate-400` | `#6E7F8D` | Muted text, captions, rules. |
| `--slate-200` | `#C7D0D6` | Hairlines, borders. |
| `--paper` | `#F7F5F0` | Primary page background — warm stone, not white. |
| `--paper-raised` | `#FFFFFF` | Cards / raised surfaces. |
| `--stone-100` | `#ECE8E0` | Alternating section background. |
| `--ochre` | `#B06A2C` | Primary accent — rules, active states, small marks. Used sparingly. |
| `--ochre-deep` | `#8A5220` | Accent hover / on-light emphasis. |
| `--steel` | `#3E6E8E` | Secondary/data accent for diagrams & charts only. |

Contrast: body text (`--slate-600`/`--ink` on `--paper`) and reversed text (`--paper` on `--ink`)
all meet or exceed WCAG AA (≥ 4.5:1). Ochre is used for non-text accents and for text only at
large sizes / against ink where it clears AA.

## 4. Typography

A three-part system chosen for institutional authority *and* technical legibility.

| Role | Family | Usage |
|---|---|---|
| **Display / headings** | **Source Serif 4** | Editorial authority. Page titles, section heads. |
| **Body / UI** | **IBM Plex Sans** | All running text, navigation, buttons, forms. |
| **Technical / labels** | **IBM Plex Mono** | Eyebrows, data labels, procurement codes, table figures, diagram annotation. The "engineering" signal. |

Fallback stacks are defined so the site remains correct if web fonts fail to load.

**Type scale** (fluid, `clamp()`-based; ratio ≈ 1.25 major third):

```
--step--1  0.8rem     small print, captions
--step-0   1rem       body
--step-1   1.25rem    lead paragraph, large UI
--step-2   1.563rem   H4 / sub-section
--step-3   1.953rem   H3
--step-4   2.441rem   H2
--step-5   3.052rem   H1 (interior)
--step-6   clamp → ~4.2rem   hero display
```

Measure is capped at ~68 characters for reading columns. Headings set tight
(`line-height: 1.08–1.15`); body relaxed (`1.6`). Mono eyebrows are uppercase,
letter-spaced `0.14em`.

## 5. Spacing, grid & layout

- **Spatial scale** (rem): `0.25 · 0.5 · 0.75 · 1 · 1.5 · 2 · 3 · 4 · 6 · 8`, exposed as
  `--space-*` tokens. Section vertical rhythm is deliberately **varied**, not uniform.
- **Grid:** 12-column, `--container: 1200px` max, generous gutters. A narrower
  `--measure: 68ch` reading column is used for prose.
- **Layout archetypes** (rotated so no two sections feel interchangeable):
  editorial two-column · full-bleed ink band · capability matrix · numbered process ·
  data/registration panel · narrow reading column · asymmetric feature with linework.

## 6. The structural motifs

Three recurring devices give the site a signature that is specifically Apex Gama:

1. **The datum line** — a thin ochre rule that sits beneath eyebrows and section numbers,
   echoing the logo's foundation line.
2. **Indexed sections** — sections and process steps are numbered (`01 / 02 …`) in mono,
   like a technical document or specification.
3. **Architectural linework** — original SVG line patterns (contour/plan-view geometry)
   used quietly as background texture, never decoration for its own sake.

## 7. Components (implemented in `assets/css/site.css`)

Header/skip-link · primary nav (+ mobile disclosure) · buttons (primary/secondary/ghost) ·
eyebrow + datum rule · section index number · capability matrix card · data/registration
table · numbered process step · "who we support" register · CTA band · footer (multi-column,
built to list many offices/units) · placeholder token styling (`<< COMPANY TO PROVIDE >>`
rendered visibly so it can never be mistaken for real copy).

## 8. Accessibility (baseline, hardened further in QA phase)

- Semantic landmarks (`header`/`nav`/`main`/`footer`), one `h1` per page, ordered headings.
- Skip-to-content link; visible keyboard focus (`:focus-visible`) using the ochre accent.
- Color is never the sole carrier of meaning; AA contrast throughout.
- `prefers-reduced-motion` respected; motion is minimal by design.
- Forms use real `<label>`s, `aria-describedby` help text, and error affordances.
- Decorative SVG marked `aria-hidden`; meaningful imagery carries text alternatives.

## 9. SEO baseline

Unique `<title>` and meta description per page; Open Graph / Twitter tags; canonical URLs;
`JSON-LD` `Organization` schema (with placeholder fields flagged); semantic headings;
`sitemap.xml` and `robots.txt`. Performance supports SEO: system-font fallbacks, no heavy
frameworks, SVG (not raster) for logo and graphics.
