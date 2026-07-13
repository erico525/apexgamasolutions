# Site Audit — Apex Gama Defense Solutions

Hostile, evidence-based QA pass across the eight live pages, viewed through the eyes of a
federal contracting officer on a locked-down machine, a prime's capture lead, and a competitor
hunting for an amateur tell. Every claim below is backed by a tool output, a screenshot, or a
file:line. Findings were fixed and the full suite re-run to prove closure.

**Tooling used:** Playwright (Chromium 1194) for rendering / overflow / tap-target / console
capture; `@axe-core/playwright` and `pa11y` for accessibility; Lighthouse for performance/SEO;
`html-validate` for markup; direct link/asset resolver for Pass 4. Local static server at
`127.0.0.1:8123`.

**Could NOT verify (be explicit):**
- **WebKit / Safari and Firefox rendering** — those engines are not installed in this environment
  and downloading them is blocked. All render evidence is Chromium only. Safari-specific bugs
  (notably flexbox/grid quirks and `env(safe-area-inset)`) are unverified and should be spot-checked
  on a real iPhone.
- **Live HTTPS / HSTS / redirect / header behavior** — security headers are configured in
  `vercel.json` but only take effect once deployed; the `http→https`, `www`/apex canonicalization,
  and header presence must be re-verified against the live origin after deploy.
- **Contact form end-to-end routing** — Supabase keys are not yet set, so the form shows its
  "not connected" state by design. The submit path, honeypot, and validation were verified in code
  and in the browser; actual row-insert delivery is unverifiable until keys are added.
- **Real notched-device safe areas** — simulated via viewport only.

---

## 1. Defect register

Severity: **P0** credibility/compliance · **P1** visible defect · **P2** polish.
All P0/P1 fixed and re-verified. Evidence under `audit/`.

| ID | Sev | Page(s) | Where | Defect | Evidence | Fix | Status |
|----|-----|---------|-------|--------|----------|-----|--------|
| R1 | P0 | contact | 320–430px & 1024px | Horizontal scroll — `.feature`/form column blew past viewport (grid `min-width:auto` + long unbreakable email token) | `audit/report.json` overflow; `audit/shots/contact-375.png` | `min-width:0` on grid children + `overflow-wrap:anywhere` on data cells (site.css) | ✅ overflow now 0 at all 10 widths |
| R2 | P0 | contracting | 768px | Horizontal scroll — `.matrix--2` data-panels didn't collapse at tablet | `audit/report.json` (probe: DIV.data-panel right=964) | same root-cause fix | ✅ fixed |
| A1 | P1 | about, primes | `.principle .num` | Contrast fail — ochre `#B06A2C` on paper ≈ 3.6:1 (needs 4.5:1); axe *serious* ×8 | axe pre-fix in `audit/`; computed color probe | color → `--ochre-deep` `#8A5220` (≈5.9:1) | ✅ axe 0 |
| P1 | P1 | all | Google Fonts | Third-party render-blocking font requests — blocked on locked-down gov networks; Lighthouse Perf 90 | Lighthouse `lh-index.json` (90) vs `lh-index2.json` (100) | Self-hosted all 4 woff2 locally; removed Google hosts; tightened CSP | ✅ Perf 100, zero 3rd-party requests |
| O1 | P1 | all | `og:image` | OG image was **SVG** — FB/LinkedIn/X don't render SVG cards → no preview image | `assets/img/og-cover.png` (1200×630) | Rasterized to PNG, added `og:image:width/height` | ✅ |
| C1 | P1 | brand/brand-guide.html | line 124 | Publicly-served page showed **"CAGE PENDING · UEI IN PROCESS · NAICS 541690"** | Pass 0 grep | Specimen → "561210 · SMALL BUSINESS · CALIFORNIA LLC"; `/brand/` disallowed + `.vercelignore` | ✅ |
| C2 | P1 | /docs/*.md | served | Internal working docs ("none yet", "in process", old brand) reachable at `/docs/` | Pass 0 grep | `.vercelignore` excludes `docs/`,`brand/`,`*.md`; robots Disallow | ✅ (verify post-deploy) |
| T1 | P1 | all | header | `.nav-toggle` 42×42, mobile nav links 39px tall (< 44px) | `audit/report.json` tap | nav-toggle min 44×44; mobile links `min-height:44px` | ✅ |
| I1 | P1 | all | `<head>` | No `apple-touch-icon`, no web manifest, no PNG favicon fallback | head grep | Generated 180/192/512 PNGs + `site.webmanifest` + links | ✅ |
| S1 | P1 | index | `<title>` | Title 106 chars — truncates in search | html-validate `long-title` | Trimmed to 60 chars | ✅ |
| M1 | P2 | index, capabilities, primes | meta description | Descriptions 185–220 chars — truncate in SERP | length check | Trimmed all to ≤160 | ✅ |
| H1 | P1 | all | Vercel | No security headers (CSP, HSTS, X-Content-Type-Options, Referrer-Policy, frame-ancestors) | `vercel.json` (was no-op) | Added full header set + CSP | ✅ (config; verify live) |
| PR1 | P1 | all | print | No print stylesheet — dark hero/CTA would burn toner; nav chrome printed | `audit/print-preview.png` | `@media print` block: light bg, drop chrome, expand URLs, single-col tables | ✅ `audit/print-preview2.png` |
| X1 | P2 | index, capabilities | copy | "Executive and dignitary protection" read as delivered (BSIS PPO-licensed) service | Pass 0 grep | Reworded to "…protection **programs**" (design/mgmt framing) to match Plan B licensed-partner model | ✅ (see Decision D2) |
| B1 | P2 | assets/css/site.css | line 2 | Old-brand comment "APEX GAMA SOLUTIONS" in served CSS | grep | Updated to "…DEFENSE SOLUTIONS" | ✅ |
| D1 | P2 | index | "How we deliver" | Systems-diagram SVG blends into its panel (paper bg on stone panel, faint strokes) — reads as empty box at a glance | `audit/systems-diagram-check.png` (renders fine in isolation) | Not changed — deliberate subtle graphic; darken strokes / drop panel bg if desired | ⚠ open P2 |

---

## 2. Screenshot matrix

Full-page Chromium captures at 320 / 375 / 768 / 1280 / 2560 px for all 8 pages in
`audit/shots/<page>-<width>.png` (40 images), regenerated after fixes. Print preview:
`audit/print-preview2.png`. OG card: `assets/img/og-cover.png`.

---

## 3. Tool output (verbatim summary)

```
axe-core (WCAG 2.0/2.1 A+AA)   — 8 pages × {375, 1280}px : 0 violations
pa11y   (WCAG2AA, htmlcs+axe)  — index/contact/capabilities/about/contracting : PASS, no issues
Lighthouse (desktop, index)   — Performance 100 · Accessibility 100 · Best-Practices 100 · SEO 100
                                LCP 0.5s · CLS 0.001 · TBT 0ms · render-blocking: none
Horizontal scroll             — 0 pages overflow at 320/375/390/430/768/1024/1280/1440/1920/2560
Console errors                — 0 real errors on any page (0 third-party requests)
Link/asset resolver           — 0 broken internal links, 0 missing assets
External runtime hosts        — NONE (fonts self-hosted; OG image local)
Form inputs < 16px            — 0 (no iOS zoom-on-focus)
Anchor-under-sticky-header    — 0 hidden (#protective/#training/#risk/#facilities all clear)
Tap targets                   — nav ≥44px, footer ≥24px; remaining <24 are inline prose /
                                breadcrumb links (WCAG 2.5.8 inline exception) + hidden honeypot
html-validate                 — remaining items are style preferences (lowercase <!doctype> is
                                valid HTML5; inline-style is a lint pref, permitted by CSP)
Structured data               — Organization JSON-LD valid; legalName "Apex Gama Defense Solutions LLC"
Titles / meta descriptions    — all unique; titles ≤70, descriptions ≤160
lang="en" · single <h1>       — present on all 8 pages
```

---

## 4. The amateur case (Pass 8) — and its rebuttal

Five things a competitor would have screenshotted before this pass — **all now fixed**:

1. **"Their contact page scrolls sideways on an iPhone."** The form column overflowed the viewport
   at every phone width. → Fixed (R1); 0 overflow at 320px.
2. **"Their own brand guide is public and says CAGE PENDING · UEI IN PROCESS."** A served page
   advertised the company as unregistered. → Fixed (C1) and `/brand/` + `/docs/` removed from deploy.
3. **"Paste their link in Slack and no preview image loads."** SVG OG image = blank social card.
   → Fixed (O1) with a real 1200×630 PNG.
4. **"Their accessibility page can't pass an accessibility scan."** Contrast failures on a site that
   publishes an accessibility commitment. → Fixed (A1); axe + pa11y clean; Lighthouse A11y 100.
5. **"On a locked-down agency network their fonts don't load and the page renders slow."**
   Render-blocking Google Fonts. → Fixed (P1); fonts self-hosted, zero third-party requests,
   Lighthouse Performance 100.

---

## 5. Decisions you owe me (business, not technical)

- **D1 — Primary NAICS.** Site shows **561210** (Facilities Support Services) as primary. You have
  not registered on SAM yet, so there is nothing to contradict — you'll simply select 561210 as
  primary at registration. Confirm that's the intent.
- **D2 — "Executive/dignitary protection" wording.** Your pasted audit template flagged these as
  licensing exposure. Under your chosen **Plan B** (Apex primes/manages; licensed partner performs),
  I softened the homepage teaser to "protection **programs**" (design/management), matching the
  capabilities page's licensed-partner delivery note — rather than deleting it. Tell me if you'd
  rather remove the phrase entirely or keep it as-is.
- **D3 — Struck codes in the template vs. your instruction.** The template listed **561612 / 561611
  / "Protective Operations & Security Programs"** as items to delete. You explicitly said *"keep it"*
  two turns ago and we rebuilt that practice area under Plan B. **I did not delete them.** If the
  template reflects a newer intent, say so and I'll strip them; otherwise they stay.

## 6. External items only you can close (not defects)

- **DNS** for `apexgamadefensesolutions.com` → Vercel, then I re-enable the 301 redirect.
- **Email mailbox** for `contact@apexgamadefensesolutions.com` so form-referral mail doesn't bounce.
- **Supabase keys + table columns** (`role, agency, naics, needed`) to make the form live.
- After deploy, re-verify security headers and redirects against the live origin.
