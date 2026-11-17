# Pregnancy Care page — build specification

**Route:** `/services/prenatal` · **Status:** v1 built, this spec defines v2
**Audience:** the coding agent. Read this file end to end before editing.

---

## 0. Three instructions in the brief that must be changed

These are not style preferences. Following them as written would damage the
site, so they are resolved here and the reasoning is on the record.

### 0.1 "Make it exactly like the images" — no

The seven reference screenshots are **Oula's live website** (oulahealth.com), a
US maternity provider. Reproducing them exactly means copying another
company's layout, colour system, illustration and section-for-section content
structure. That is a trade-dress problem, it makes MyStree look like a clone to
anyone who has seen both, and the client's own earlier brief said in capitals:
*"DO NOT CLONE Oula branding, copy, exact colors, exact typography, exact image
compositions, exact testimonial design, exact illustration, exact timeline,
exact accordion styling."*

**What we do instead:** extract the *interaction patterns* — which are not
ownable — and rebuild them in MyStree's design language. Section 3 of this
document maps each reference to the pattern being borrowed and the MyStree
execution that replaces it. The result should feel as considered as the
reference and look nothing like it.

### 0.2 "Keyword stuffing" — no

The brief asks for the approach section to be "unique in keyword stuffing".
Keyword stuffing is a named violation in Google's spam policies. On a YMYL
health page it is close to the worst thing you can do: it triggers spam
systems, it reads as untrustworthy to the human it is aimed at, and it damages
the E-E-A-T signals that this page depends on.

Google's current generative-AI guidance is explicit that there is no special
tactic here — no `llms.txt`, no "chunking", no AI-specific rewriting, and *"no
special schema.org markup you need to add"*. The instruction is to create
*"unique expert or experienced takes"*.

**What we do instead:** entity-dense natural writing. Section 6 defines the
method — cover the concepts a Bengaluru reader actually searches, in sentences
a clinician would sign. That is what ranks, and it is also what converts.

### 0.3 "Within 3 weeks we should see visits" — partly

Realistic for a new page on an established domain in a competitive local
health niche:

| Window | What to actually expect |
| --- | --- |
| Week 1–2 | Indexed; impressions on branded and long-tail queries |
| Week 3–6 | Long-tail traffic ("pregnancy consultation Indiranagar", question queries) |
| Month 2–4 | Movement on core head terms, if links and GBP support it |
| Month 3–6+ | Competitive position on "pregnancy doctor Indiranagar" class terms |

Three weeks is realistic for *indexing and first long-tail impressions*, not
for ranking. **The single biggest lever for local visibility is not this page —
it is the Google Business Profile**: category, hours, photos, and review
velocity drive the local pack, which sits above organic results. Flag this to
the client; the page cannot compensate for a thin GBP.

---

## 1. What already exists (do not rebuild blindly)

v1 of this page is live in the repo. Reuse it; this is a revision.

| File | Role |
| --- | --- |
| `src/lib/prenatal.ts` | All page content + the sourcing rules. Edit content **here**, never inline in components. |
| `src/components/prenatal/prenatal-sections.tsx` | The eight section components, all client-side. |
| `src/components/prenatal/prenatal-sections.module.css` | All section styling. |
| `src/app/(marketing)/services/prenatal/page.tsx` | Server route: metadata, JSON-LD, composition, breadcrumb, related links. |
| `src/app/(marketing)/services/prenatal/prenatal-page.module.css` | Breadcrumb + related-links chrome. |
| `image-prompts-prenatal.md` | Image manifest, ratios, prompts, alt drafts. |

**Shared modules this page depends on — do not fork them:**

- `src/lib/clinic.ts` — NAP. Phone, locality, maps URL. Never hardcode these.
- `src/lib/doctors.ts` + `doctors-repository.ts` — clinician records. The page
  filters by slug via `prenatalTeamSlugs`. Never retype doctor data.
- `globals.css` — design tokens and the `.cta-book` button primitive. Every
  booking CTA uses `.cta-book` (+ `.is-small` / `.is-large` / `.is-pulse`).
- `color.md` — authoritative design spec. Read before styling; record
  exceptions there.

---

## 2. Claims ledger — the content the client supplied

The pasted live-site content contains claims this repository cannot support.
Each row is a decision, not a suggestion.

| Claim on live site | Verdict | Why |
| --- | --- | --- |
| "Best Prenatal Care Indiranagar" | **Remove** | Unsupportable superlative; also a spam signal in a badge. |
| "4.9/5 Rating" | **Verify first** | If it is the real Google rating, it may be stated **once**, attributed ("4.9 on Google, N reviews"). Never as a decorative badge on every card. |
| "5,000+ Babies" | **Remove unless documented** | An outcome claim on a medical page. Needs a source. |
| "15+ Years" (clinic) | **Conflict** | Repo says Dr. Smitha has 23 years. Clinic age ≠ founder experience. Clarify which is meant. |
| "Verified Expert" badge | **Remove** | Verified by whom? Meaningless trust-signal noise. |
| "4.9 (120+ Reviews)" per doctor | **Remove** | Per-doctor review counts are not in any data source we hold. |
| "Same-Day Appointments" | **Verify** | Operational promise. If true, keep — it is a genuine differentiator and a real search intent. |
| "₹600 Consultation" | **Verify, then keep** | Price transparency is a strong local conversion signal and a real query ("gynecologist consultation fee Bangalore"). Must be current. |
| `Tag: Preconceptional Counseling Bangalore` ×4 | **Delete entirely** | Visible keyword tags. Textbook stuffing. |
| "Anomaly Scan", "Fetal Cardiac Assessment" | **Verify on-site availability** | Do not imply MyStree performs these in-house unless it does. Phrase as discussed/arranged otherwise. |
| Lamaze / Birthing Classes / prenatal yoga | **Verify** | Currently claimed on the live site, absent from the repo. |
| Partner hospitals (FAQ) | **Verify** | Cannot name hospitals without confirmation. |
| Dr. Surbhi "12+ Years" | **New data** | Not in repo. Add to `doctors.ts` once confirmed. |
| Priyanka "Lactation & Nutrition Consultant" | **Conflict** | Repo says "Nutritionist & Wellness Consultant". Live site adds lactation. Reconcile. |
| Reviews: Charles Samuel, K L Sudha, J.N. Surekha | **Now usable** | The client has supplied quote text. Use **verbatim**. See §7. |

**Rule for the agent:** if a claim is not in `src/lib/` and not in this ledger
marked keep, it does not go on the page. No exceptions, no "reasonable
inference".

---

## 3. Section-by-section design specification

Eight sections. For each: the pattern taken from the reference, and the
MyStree execution that must replace its surface treatment.

### 3.1 Hero — reference image 1

**Pattern borrowed:** split panel, text left on a saturated ground, portrait
photograph right, one large organic curve separating them, single primary CTA.

**MyStree execution:**
- Full-bleed band, inset `1rem` from the viewport with a `24px` radius so it
  reads as a card, not a section.
- Left 52%: eyebrow (`PREGNANCY CARE · INDIRANAGAR, BENGALURU`), H1 in Fraunces
  300, 46ch body, primary `.cta-book is-large`, secondary tel link.
- Right 48%: photograph. The curve is **not** Oula's half-circle. Use an
  asymmetric `border-radius` on the image frame — heavy on the top-outer
  corner, light on the lower-inner — so the silhouette is distinct at a glance.
- The utility strip (high-risk line + phone) sits **below** the hero band as a
  quiet full-width rule, not floating inside the hero.
- Trust metadata: three items maximum, from the ledger only.

**Motion:** copy rises 14px / fades on load, staggered 60ms. Image
`clip-path` wipes in from the outer edge over 1.1s. On scroll, image drifts
−3%, copy fades to 0.6. No pin.

### 3.2 Quick answers — reference image 2

**Pattern borrowed:** image left, headed accordion right, thin rules between
rows, `+` affordance, CTA beneath.

**MyStree execution:** native `<details>`/`<summary>` (crawlable, works without
JS). Chevron rotates 180°, not a `+`→`×` swap. Rows separated by
`--section-rule` hairlines. First row open by default.

Five questions, 80–130 words each, answer-first. Content in
`quickAnswers` in `prenatal.ts`.

### 3.3 The journey chart — reference image 3

**This is the section most at risk of looking copied.** The reference is a
sine-wave path with alternating dots and labels above/below.

**MyStree execution — deliberately different geometry:**
- A single **ascending stepped path**, not a symmetrical wave: the line rises
  left→right in irregular increments, because a pregnancy is a progression,
  not an oscillation. Draw as one SVG `<path>`.
- Nodes are **small hollow circles with a flame-coloured ring**, filled only
  when that stage is active. The reference uses solid multi-coloured dots —
  do not use a multi-colour dot palette.
- Labels alternate above/below with a 1px connector rule.
- Stage markers (`6–10 weeks`) in the sans at 11px, uppercase, letterspaced —
  the utility voice.
- Seven stages, from `journeyStages`.

**Motion:** `pathLength` 0→1 over 1.6s on first entry, nodes activating in
sequence 140ms apart behind the advancing line. Fires once.

**Responsive:** ≤1100px the curve is dropped (a path cannot survive a wrap) and
stages become a 4-column grid; ≤900px a vertical list with a left rule.

**Copy discipline:** every stage says what is *usually discussed*, hedged with
"depending on clinical need". Never assert an investigation is performed
on-site. Close the section with the availability disclaimer.

### 3.4 Care team — reference image 4

**Pattern borrowed:** portrait-led cards with a role chip.

**MyStree execution:** the reference is a five-card horizontal rail of
identical squares. MyStree has **two** clinicians here, so a rail is wrong —
two identical cards in a row looks like a page missing its third card.

Build **two asymmetric editorial dossiers**:
- Card 2 offset downward by `clamp(0, 4vw, 3.5rem)` and mirrored: portrait
  right-aligned, text right-aligned, facts table reversed.
- 4:5 portrait, `14px` radius, no shadow, no glow.
- Specialty marker: small flame-coloured uppercase label. No "Verified Expert".
- Facts as a `<dl>` with hairline rows: Qualifications, Languages, (Fee if
  verified).
- Per-doctor `.cta-book is-small` using `doctor.bookingUrl`.
- Link to the full `/doctors` profile — an internal link that matters.

Pull every field from `getDoctors()`. The page-specific scope sentence lives in
`prenatalTeamNotes`.

### 3.5 Our approach — reference image 5

**Pattern borrowed:** saturated panel, two-column principle list, photograph
hard-right, thin rule flourish by the heading.

**MyStree execution:** deep navy panel (not terracotta). **Single** column of
four principles, not two — a two-column list of prose is a reading-order
problem, and the reference's own columns force the eye to jump mid-idea.

The photograph is sticky; principles scroll past it. The active principle sits
at full opacity, inactive at 0.45, driven by a `-45% 0px -45% 0px` reading-zone
`useInView`. The image crop scales subtly per step — one asset, four crops, not
four assets.

**Responsive:** ≤900px the stickiness is removed entirely and all principles
render at full opacity.

### 3.6 Reviews — reference image 6

**Pattern borrowed:** centred card prominent, neighbours partially visible,
arrow controls beneath.

**MyStree execution:** `scroll-snap-type: x mandatory` rail, cards at
`min(26rem, 82vw)`, inactive cards at 0.62 opacity. Prev/next buttons with
`aria-label`s and a `disabled` state at the ends. Rail is `tabIndex={0}` so
arrow keys work. Swipe works natively. **No auto-scroll** — it is hostile on a
page people are reading carefully.

Stars only if a real rating exists per review (§7). Never decorative.

### 3.7 Detailed FAQ — reference image 7

**Pattern borrowed:** photograph left, FAQ right, both inside a tinted panel.

**MyStree execution:** same accordion primitive as §3.2 — one component, two
placements. Photograph is sticky on desktop; above the accordion on mobile.
Nine questions from `prenatalFaqs`.

**Include the local-intent questions** the client's live site has, rewritten
responsibly: Bengaluru traffic and getting to the clinic, which hospitals
delivery is coordinated with (**pending verification**), whether prenatal yoga
runs on site (**pending verification**).

### 3.8 Closing CTA + line art — reference image 8

**Pattern borrowed:** navy band, headline + single CTA left, thin-line
illustration right.

**MyStree execution:** the illustration must be original. The reference shows a
row of six standing figures. MyStree's is **"the pregnancy care circle"** —
four figures arranged *around* a shared centre, one carrying a pregnancy, with
a small monitoring trace beneath. Already built as inline SVG in
`PrenatalClose`. Paths draw in sequence on entry, 120ms apart.

No cartoon baby. No uterus diagram. No medical cross.

### 3.9 Footer

**Do not redesign.** Audit only: every service link must be a real crawlable
`<a href>` to a real route. `Prenatal Care` now points at `/services/prenatal`.
The other five still point at `/#services` — they need real pages or should be
honest anchors. NAP must match `clinic.ts` exactly.

---

## 4. Design tokens for this page

| Role | Token |
| --- | --- |
| Page ground | `--surface-pearl` |
| Alternate ground | `--surface-mist` |
| Team section | `--surface-sky` |
| Dark sections (approach, close) | `--navy-deep` + `data-nav-theme="dark"` |
| Body text | `--muted-foreground` (6.1:1 on pearl) |
| Headings | `--ink` |
| Small accent text | `--accent-on-light` (5.45:1 — **never** raw `--brand-flame`, which is 3.31:1) |
| Marks, rules, rings | `--brand-flame` |
| CTA | `.cta-book` primitive only |

**Typography:** Fraunces 300 for H1/H2 and pull quotes. Plus Jakarta Sans
400–450 body, 500–600 labels. Never import a font. Never use weight 800/900.

**DECIDED 2026-09-14 — hero panel is deep navy.** The client chose navy over
the reference's terracotta. Implemented as an inset `24px` card on a
`--surface-pearl` gutter. White on navy measures 13:1 (terracotta would have
been 3.9:1), the no-orange-background rule stays intact, and the flame CTA is
left as the single brightest element on the screen — which is where the eye
should land on a page whose job is a booking. The eyebrow and the urgent-line
link switch to `--brand-pumpkin` there, because the deepened `--accent-on-light`
is tuned for light grounds and goes muddy on navy.

---

## 5. Animation stack — decided, do not revisit

**Use:** `framer-motion` v13 (installed) + CSS. **Smooth scroll:** `lenis`
(installed, global).

**Do NOT install GSAP or ScrollTrigger.** Every effect in this spec is already
expressible:

| Effect | Mechanism |
| --- | --- |
| SVG path draw | `motion.path` + `pathLength` + `useInView` |
| Reading-zone activation | `useInView` with `margin: "-45% 0px -45% 0px"` |
| Hero parallax / fade | `useScroll` + `useTransform` |
| Section reveals | `whileInView` + `viewport={{ once: true, amount: 0.3 }}` |
| Sticky panels | CSS `position: sticky` |
| Accordion | native `<details>` + CSS transition |

Adding GSAP means ~70KB to duplicate installed capability, plus a second scroll
system fighting lenis. Do not use ScrollMagic, Three.js or WebGL.

**Non-negotiable:** every heading, answer and paragraph must exist in the
server-rendered HTML before any animation runs. Animation transforms existing
markup; it never creates content. Verify with `curl` on the built HTML.

**Reduced motion:** every animation must no-op under
`prefers-reduced-motion: reduce`.

---

## 6. SEO / AEO / GEO strategy

Grounded in Google's current guidance, which says plainly that generative AI
features *"are rooted in our core Search ranking and quality systems"*, that
*"structured data isn't required for generative AI search"*, and that
`llms.txt`, content "chunking" and AI-specific rewriting are **not** things
Google wants.

**There is no AEO/GEO technique separate from good SEO.** Anyone selling one is
selling nothing. What follows is the actual work.

### 6.1 Intent model for Indiranagar / Bengaluru

The client asked for demographics. **We do not have real demographic data and
will not invent percentages.** Real numbers come from three places the client
owns: Search Console (queries already reaching the site), the Google Business
Profile Insights panel, and Keyword Planner with a Bengaluru geo filter. Until
those are exported, use this **intent model** — a description of who is
searching and what they need, not a statistical claim:

| Searcher | Query shape | What the page must answer |
| --- | --- | --- |
| Newly positive test, first pregnancy | "pregnancy doctor near me", "first pregnancy checkup Indiranagar" | When to book, what happens at visit one |
| Working professional (Indiranagar is dense with them) | "gynecologist open Saturday Bangalore", "online pregnancy consultation" | Hours, teleconsult, appointment length |
| Previous loss / complicated history | "recurrent miscarriage specialist Bangalore", "high risk pregnancy doctor" | That this is a named practice area |
| Post-IVF pregnancy | "pregnancy care after IVF Bangalore" | Continuity from fertility treatment |
| Price-checking | "gynecologist consultation fee Bangalore" | Transparent fee, if verified |
| Comparing clinics | "best prenatal clinic Indiranagar" | Do **not** answer with "best" — answer with specifics that make the judgement for them |
| Family member researching | "high risk obstetrician Indiranagar reviews" | Credentials, real reviews |
| Relocating / new to the area | "prenatal care Indiranagar", "maternity clinic HAL 2nd stage" | Location clarity, landmarks |

Local nuance that is true and usable: Indiranagar is a high-density
professional neighbourhood where **traffic and appointment timing genuinely
shape clinic choice**, and patients routinely choose a clinic near work rather
than home. Content that addresses scheduling, travel and teleconsultation is
answering a real local need — not a keyword.

### 6.2 How to write it

- One idea per section; no section repeats another's job.
- First sentence of every answer *is* the answer. Then context. Then when a
  clinician should be seen.
- Use the vocabulary people use ("scan" alongside "ultrasound", "checkup"
  alongside "consultation") because it is natural, not to hit a term.
- Location appears where it is informative: eyebrow, FAQ, metadata,
  breadcrumb, structured data. Roughly **6–8 natural mentions across the page**,
  never two in one sentence.
- Banned strings: "best", "world-class", "state-of-the-art", "every step of the
  way", "holistic care" repeated, any `Tag:` label.
- Write sentences a clinician would sign. That is the E-E-A-T test.

### 6.3 Metadata

- **Title:** `Pregnancy & Prenatal Care in Indiranagar, Bengaluru | MyStree`
- **Description:** services actually offered + book line, ~155 chars.
- One `<h1>`. `<h2>` per section, by meaning not by size.
- Canonical `${SITE_URL}/services/prenatal`; sitemap priority 0.9.

### 6.4 Structured data

Keep the v1 graph: `MedicalWebPage` → `MedicalService` → `FAQPage` →
`BreadcrumbList`, all referencing the canonical `${SITE_URL}/#clinic` entity
declared on `/about`. **Never declare a second `MedicalClinic`.**

Forbidden: `aggregateRating`, `reviewCount`, `award`, `hasCredential`, and any
`serviceType` not in the ledger. FAQPage is for entity clarity only — Google
restricts FAQ rich results to a narrow set of authoritative sites, so do not
build strategy on it.

**Add a `Review` node only if** the client confirms the three reviews are real
and published, with the platform named.

### 6.5 Medical review signal

`medicalReview` in `prenatal.ts` is `null` and renders nothing. When a named
clinician actually reviews the copy, set it — name, date, link to their
`/doctors` profile. This is the strongest E-E-A-T signal available on a YMYL
page. **Never set it speculatively.**

---

## 7. Reviews

The client has now supplied quote text. Use **verbatim** — no paraphrase, no
tidying:

| Name | Quote |
| --- | --- |
| Charles Samuel | "Dr. Smitha was an anchor of trust, guidance, and compassion. Her expertise and professionalism are truly unmatched" |
| K L Sudha | "High risk IVF pregnancy handled very calmly. She solved last minute issues in delivery very cleverly. My family completely trusted her" |
| J.N. Surekha | "She really took care of me during pregnancy + Delivery even post delivery. Always available for help on one call" |

Replace `prenatalReviews` in `prenatal.ts` with these three and delete the
substituted general reviews. Heading: "Experiences shared by families we have
cared for". Keep the line clarifying these are individual experiences, not
outcome claims.

Stars: only if the client confirms each was a 5-star review on a named
platform. Otherwise no stars.

---

## 8. Images

Manifest, ratios, prompts and alt drafts: `image-prompts-prenatal.md`.
Slots: hero (16:10 + 4:5 mobile crop), first-visit (4:5), approach (4:5),
FAQ clinic interior (4:3). Closing art is inline SVG — no asset needed.

Rules: hero is the LCP element — `priority`, never lazy. Everything else lazy.
Every frame reserves its ratio before decode (CLS stays ~0). Real doctor
portraits only — never generate a clinician.

---

## 9. Acceptance criteria

The page is not done until all of these pass:

**Build:** `npx tsc --noEmit` clean · `npm run build` clean · route prerenders
static (`○`).

**Content integrity:** zero occurrences of `Tag:` · zero of "Best" as a claim ·
no unverified number anywhere · every schema answer appears verbatim in the
rendered HTML.

**Crawlability:** all medical copy present in server HTML (`curl` the built
file) · one `<h1>` · canonical present · no accidental `noindex`.

**Layout:** no horizontal overflow at 1920/1440/1366/1024/768/430/390/375/360/320.

**Accessibility:** every text/background pair ≥4.5:1 (≥3:1 for large) — audit
in-page, do not eyeball · all CTAs ≥44px · keyboard path through accordion and
review rail · visible focus rings · all animation no-ops under reduced motion.

**Integration:** announcement strip absent (home-only) · navbar and footer
unchanged · other pages still build · sitemap includes the route.

---

## 10. Open items blocking completion

1. ~~Palette decision~~ — resolved: deep navy (§4).
2. ~~Rating, fee, same-day appointments, on-site scans~~ — confirmed by the
   client 2026-09-14 and now published. **Still unverified and therefore still
   absent:** Lamaze / birthing classes, on-site prenatal yoga, named partner
   hospitals, "5,000+ babies", clinic-age "15+ years", per-doctor review counts.
3. **Google review count** — the rating is published as "4.9 on Google" with no
   count. Supply the count to complete the attribution; it is also the
   precondition for an `aggregateRating` node in structured data, which is
   invalid without `reviewCount`.
4. Clinician sign-off on all medical copy, and on Dr. Surbhi's scope.
5. Four photographs (§8).
6. Priyanka's title conflict: repo says "Nutritionist & Wellness Consultant",
   live site says "Lactation & Nutrition Consultant".
7. Dr. Surbhi "12+ years" — on the live site, absent from `doctors.ts`.
8. `/book` is still a placeholder — every CTA on this page leads there.
9. `npm run lint` is broken (`next lint` removed in Next 16).
