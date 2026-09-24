# APEX GAMA DEFENSE SOLUTIONS — Human Review Items (INTERNAL)

**Internal only.** This file is excluded from deployment by `.vercelignore` (`*.md`).
Do not link, render, index, or publish it. It lists business questions that
require Eric's confirmation. Each item notes what the public site now says after
the production content cleanup, so nothing on the site depends on an unresolved
answer.

_Last updated: 2026-09-24_

---

## 1. Canonical contact email — resolved in repo; confirm mailbox
- The repository is standardized to **`contact@apexgamadefense.com`** (matches the
  canonical domain and the address you provided). The old
  `contact@apexgamadefensesolutions.com` no longer appears anywhere in served
  content, JS, schema, or the PDFs.
- **Confirm:** the mailbox `contact@apexgamadefense.com` is live and monitored.
  (If the live site still shows the old address anywhere, it is a stale
  deployment/cache — redeploy from this branch resolves it.)

## 2. Geographic delivery limitations / mobilization
- Public site no longer states specific states. Contracting FAQ now says Apex
  evaluates geography individually and to contact us for out-of-California work;
  For Primes no longer lists mobilization states; the teaming brief's
  "Geographic availability" row was removed.
- **Provide:** the states in which Apex can currently deliver, and any limits, if
  you want them published.

## 3. Continuity / emergency-management frameworks
- Risk & Resilience page now says Apex "aligns planning and exercise methodology
  to the applicable government, industry, or agency-specific framework."
- **Confirm:** which frameworks (if any) Apex formally follows — e.g., FEMA
  continuity guidance, NIMS/ICS, HSEEP, CISA guidance, ISO 22301 — before naming
  any of them publicly.

## 4. Socioeconomic certifications
- For Primes now states only "self-certified small business under its applicable
  NAICS codes." No veteran-owned/SDVOSB/state/disadvantaged designation is
  claimed.
- **Confirm:** any socioeconomic or state small-business certification actually
  held, with certificate numbers, before adding.

## 5. Past-performance references
- Capability statement now says additional key-personnel experience "may be
  provided where appropriate and subject to confidentiality obligations." No
  corporate government past performance is implied.
- **Provide:** any past-performance references cleared for release.

## 6. Final NAICS / PSC positioning
- Published codes remain in place; no code is characterized as self-performed vs.
  teamed on the capability statement.
- **Confirm:** the final self-perform vs. teamed NAICS/PSC list if you want it
  characterized.

## 7. Instructor network (Training, Exercises & Readiness)
- The "How we deliver" content stands; the placeholder note about the instructor
  network/credentials/site access was removed.
- **Provide (optional):** current instructor network, credentials, geographic
  coverage, training-site access, and mobilization assumptions.

## 8. Facility & Operations Support experience
- The placeholder note was removed. No facility experience, team size, systems,
  geographic reach, or partner capabilities are claimed.
- **Provide (optional):** direct facility-operations experience, team structure,
  systems used, delivery limits, and partner capabilities.

## 9. Prime response times
- For Primes now says NDA/teaming/proposal-support timelines are "coordinated
  against the prime contractor's capture and proposal schedule." No specific
  turnaround is promised.
- **Approve (optional):** specific NDA/teaming/proposal-support turnaround times.

## 10. SAM registration verification
- Contracting page says COs can verify our active registration in SAM.gov using
  our UEI or CAGE. No expiration date or external link is published.
- **Provide (optional):** preferred public SAM verification link and current
  registration expiration date.

## 11. Terms — governing law & address
- Terms now state California governing law ("where Apex Gama Defense Solutions LLC
  is organized"), consistent with the published state of formation.
- **Confirm with counsel:** governing-law state, and whether to publish a
  mailing/legal-entity address (Privacy and Terms currently publish none).

## 12. Privacy policy — legal review
- The public "Legal review pending" notice was removed from privacy.html.
- **Action:** have the privacy policy reviewed by qualified counsel before
  relying on it as legal advice.

## 13. Accessibility conformance
- accessibility.html now states automated + manual testing and that **no formal
  third-party WCAG audit** has been commissioned.
- **Decide:** whether to commission a formal WCAG 2.1 AA audit (would allow a
  stronger conformance statement).

## 14. Privacy — analytics / providers
- Privacy now states the site runs **no third-party web-analytics service**
  (verified — none installed) and describes hosting/database generically.
- **Confirm before naming:** if you later add analytics, or want to name the
  hosting (Vercel) and form/database (Supabase) providers explicitly.

## 15. Contact form backend (not a content issue)
- `assets/js/contact.js` still has placeholder Supabase keys, so the form is
  inert and falls back to the email address.
- **Action:** add the real Supabase project URL + anon key, and add `source` and
  `page` columns to the `contact_submissions` table (the form now submits them).
