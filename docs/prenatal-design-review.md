# Prenatal service design review

Route: `/services/prenatal`.

1. The reference hero pairs a clear service introduction with a human photograph.
   MyStree uses layered Uranian blue, pearl and sage surfaces, the inherited
   serif headline and a local pregnancy photograph, with a dedicated booking
   action and compact trust row.
2. The second reference explains the care offering beside a consultation image.
   Four native disclosures cover prenatal care, preparation, coordination and
   support after birth. No insurance or inpatient promise is copied.
3. The wave timeline becomes a three-chapter selector. Each chapter contains a
   semantic milestone list. Arrow keys, Home and End move between tabs; the
   mobile layout keeps all selectors visible and each milestone readable.
4. The care team uses the existing doctor repository and authentic portraits.
   Cards show qualifications, languages, consultation fee and doctor-specific
   appointment URLs. The shared roster remains the source for credentials.
5. The birth approach uses a soft sage-to-sky editorial spread: one supportive
   photograph paired with four numbered principles. Content remains readable at
   all scroll positions; the image becomes normal-flow content on phones.
6. The supplied reviews remain verbatim with their supplied five-star ratings.
   Desktop shows all three. Mobile provides native scrolling and previous/next
   controls, respects reduced motion, and announces the selected review.
7. The FAQ retains a clearly labelled 4:3 slot for the user's clinic photograph.
   Set `faqPhoto` in the experience component to an uploaded public asset path.

## Graphify use

Read `.claude/skills/graphify/SKILL.md` and `references/query.md`. Queried the
existing graph vocabulary using prenatal, doctor, services, reviews, palette,
and booking. The graphify launcher failed with “uv trampoline failed to
canonicalize script path”; its recorded interpreter was absent and the default
Python had no NetworkX. A read-only PowerShell BFS of the saved graph was used
as the equivalent local traversal fallback. No graph was rebuilt or overwritten.

Starting from PrenatalPage(), PrenatalTeam() and PrenatalReviews(), the graph
connected the page to getDoctors(), Doctor, AnswerList(), structuredData() and
the prenatal sections. Snapshot source locations included prenatal/page.tsx
L136, doctors-repository.ts L106 and doctors.ts L32. Current source was checked
after traversal because stored line locations may be stale.

The resulting implementation preserves shared doctor loading and FAQ structured
data, isolates the new UI in prenatal-experience, and adds service-navigation
links. The old prenatal-sections files remain available as the prior design.

## Verification

- Production build and TypeScript check passed.
- Chromium rendered at 320, 390, 768 and 1440px with no document overflow,
  no missing images and no browser runtime errors. Both local font families loaded.
- Trimester ArrowLeft/ArrowRight and Home/End behavior, native disclosure
  exclusivity, review next/previous limits and mobile service navigation passed.
- Reduced-motion mode uses static imagery and instant review scrolling. Standard
  motion mode verifies changing background and image transforms while scrolling
  at 390px and 1440px.
- Solid-background text and conservative palette-endpoint audits passed with zero
  contrast failures. Because sections use soft gradients, every dark foreground
  token is also tested against every approved light surface token at the 4.5:1
  floor. Photo captions use translucent pearl/sage surfaces whose ink remains
  readable against the composited field.
- Breadcrumb and standalone actions have 44px touch targets. Inline related-care
  links remain within prose. Booking links point to existing appointment URLs;
  no appointment was submitted as part of verification.
- Screenshots are in `docs/prenatal-preview/`. The FAQ image is intentionally
  reserved for the user's authentic clinic photograph; other editorial images
  are existing illustrative assets, with descriptive, non-identifying alt text.
