# Care Plans page — research brief

**Status:** research only, nothing built. Read §1 before any content is written.

---

## 1. Three findings that change the brief

### 1.1 Two of the five packages carry real advertising-law risk

The **Drugs and Magic Remedies (Objectionable Advertisements) Act, 1954**,
Section 3, prohibits advertisements referring to a drug in terms that suggest
its use for:

> (a) the procurement of miscarriage in women or prevention of conception in women

That is the **MTP Care Package** and the **Mirena Comfort Care** package,
described in the statute's own words. Section 3(c) additionally covers "the
correction of menstrual disorder in women", which is worth knowing before any
cycle-related package is written.

The Act is aimed at advertisements *referring to a drug*, and there is a
reasonable argument that a clinical establishment listing a service it lawfully
performs is not the same thing as advertising a drug. That argument has to be
made by **your lawyer, not by me and not by a marketing page**. The exposure is
criminal, not civil.

**Recommendation:** these two packages do not go on a public, priced,
indexable page until counsel signs off. See §3 for how to publish them safely
in the meantime.

### 1.2 The NMC published new advertising guidelines on 06.10.2026 — yesterday

The National Medical Commission's Ethics Board issued ethical advertising and
public communication guidelines by public notice dated **6 October 2026**.
(The NMC Professional Conduct Regulations 2023 remain in abeyance; the
operative code is still the IMC Ethics Regulations 2002, now read with this
notice.)

**Explicitly permitted for a clinical establishment** — this is good news for
this project:

- name, location, contact details
- departments, facilities, equipment, services offered
- **applicable charges and fees**
- a doctor directory with names, qualifications, specialities and registration
  numbers, as a patient-information function

So a priced care-plans page is a legitimate format. Price transparency is
permitted, and it is also what patients search for.

**Explicitly prohibited** — and three of these already exist on this site:

| Prohibited | Where it bites us |
| --- | --- |
| **Patient testimonials**, even with consent | The homepage renders 10 reviews; `/services/prenatal` renders 3 named ones |
| **Superiority claims** ("best", "No. 1", "leading") | Already removed from prenatal; re-check the rest of the site |
| **Ratings and review displays** | The "4.9 on Google" line added to the prenatal hero |
| **AI-generated promotional content for commercial purposes** | The three scroll-story images on `/doctors` are AI-generated |
| Guarantees of cure or outcome | — |
| **Inducements**, including discounts and free procedures | Affects how a "package" is framed |
| Before/after depictions | — |

Penalties are graded: warning, censure with fine, suspension, removal from the
register. **These apply to the registered practitioners personally**, not to a
marketing budget.

> This is the single most important item in this document. It is not a
> consequence of the new page — it is a live issue on pages already published,
> and it arrived yesterday.

### 1.3 Any page mentioning scans inherits PCPNDT duties

The **PCPNDT Act, 1994** bans all advertising of prenatal sex determination or
sex selection, in any medium, with penalties up to three years' imprisonment.
Centres performing ultrasound must display, in English and the local language,
that sex determination is not done there.

Both "Care Journey" packages include **follicular scans**, so:

- the page must carry the standard declaration, visibly, not in a footnote
- scan copy must never imply any determination of fetal sex
- Kannada alongside English is the correct local language for Bengaluru

---

## 2. What "all-inclusive" has to survive

Indian-context validation of the pricing language, independent of the above.

| Issue | What the copy must do |
| --- | --- |
| **GST** | Healthcare services by a clinical establishment are GST-exempt under Notification 12/2017. If that is why the figure is final, say "no GST applicable on healthcare services" rather than leaving "all-inclusive" to carry it. Confirm with your CA that no bundled component is taxable. |
| **"All-inclusive"** is a strong claim | The Nutrition package already handles this correctly: *"Investigations/tests are based on individual requirements and are not necessarily included."* The other four need the same sentence. Anything a patient could still be billed for must be named. |
| **"Terms & conditions apply"** | Currently points nowhere. It needs a real, linked T&C section covering validity period, what happens on cancellation, what is excluded, and whether unused sessions lapse. `/terms-and-conditions` exists and can host it. |
| **Price currency** | Publish with an "as of" date and a line reserving revision. A stale price is a consumer-protection complaint under the CPA 2019 / CCPA misleading-advertisement rules. |
| **Clinical discretion** | Every package must state that eligibility and contents are decided clinically — a package is not a guarantee that a given procedure is appropriate for a given patient. |
| **Package ≠ inducement** | Frame as "what this covers", never "save ₹X", "offer", "limited time" or anything comparative. That framing is what converts a price list into a prohibited inducement. |

---

## 3. Package-by-package treatment

| Package | Price | Publish publicly? | Treatment |
| --- | --- | --- | --- |
| **Nutrition — 3 Month Journey** | ₹14,999 | **Yes** | The strongest asset here. Not a restricted category, genuinely differentiated, and the supplied copy is already well structured. Lead with this. |
| **Care Journey — Basic** | ₹2,999 | **Yes** | Preconception/fertility support. Needs the PCPNDT declaration because of follicular scans. |
| **Care Journey — Bloom** | ₹4,999 | **Yes** | Same, plus derm and yoga/fitness. Present as a fuller version, **not** as "better value". |
| **Mirena Comfort Care** | ₹7,500 | **Hold** | DMR Act §3(a) "prevention of conception". Until counsel clears it: name the service without price on the OBGYN services page, and handle detail at consultation. |
| **MTP Care Package** | ₹7,000 | **Hold** | DMR Act §3(a) "procurement of miscarriage". Also engages MTP Act confidentiality (§5A) and the gestational-limit/eligibility rules — any copy must make clear this is clinically assessed and legally bounded, never on-demand. |

**Recommended page scope for v1:** the three publishable packages, under a
heading that is about care, not commerce.

---

## 4. Navigation

Current nav: Home · About Us · Our Team. Adding a fourth item is right — this
is a primary reason people visit, and it is currently invisible.

- **Label: "Care Plans"**. Not "Packages" (retail), not "Pricing" (transactional
  on a health site), not "Offers" (inducement framing).
- **Position: fourth, after Our Team**, before the booking CTA — so the CTA
  stays the rightmost, brightest element.
- **Route: `/care-plans`**. Flat, readable, matches `/doctors` and `/about`.
  Not under `/services/` — these are commercial offerings, not clinical service
  descriptions, and conflating them muddies both.
- **Footer**: add to the "For patients" group, which is where a price-seeking
  visitor looks second.

---

## 5. Content plan

### 5.1 Page architecture

```
H1   Care plans at MyStree, Indiranagar
     Lead: what a plan is, what it is not, how clinical discretion works

H2   What a care plan covers
     The honest framing: bundled continuity, not a discount

H2   MyStree Nutrition Care — 3 Month Journey        ₹14,999
     The six-stage structure, as supplied

H2   MyStree Care Journey — Basic                    ₹2,999
H2   MyStree Care Journey — Bloom                    ₹4,999

H2   What is not included
     The exclusions, in plain language, above the fold of the decision

H2   Questions about care plans            ← the AEO surface
     8–10 Q&As

H2   Book a consultation to discuss a plan
```

### 5.2 How to write it

The brief's own instruction applies: **no keyword stuffing.** Google's current
guidance is that generative-AI features run on the core ranking systems, that
there is *"no special schema.org markup you need to add"*, and that the work is
*"unique expert or experienced takes"*. There is no separate AEO or GEO
technique.

What actually earns these queries:

- **Answer the price question in the first sentence of each section.** "The
  three-month nutrition journey is ₹14,999 and covers six plans and six
  follow-ups." Nobody has to hunt.
- **Name what is excluded as prominently as what is included.** This is the
  single biggest trust differentiator on an Indian healthcare pricing page,
  where "all-inclusive" is routinely not.
- **Write the nutrition package as a method, not a list.** The supplied copy
  already does this — "Not just a diet plan", "we look beyond the weighing
  scale" — and that voice is the asset. Keep it.
- **Let the structure carry the keywords.** "Nutrition consultation",
  "follicular scan", "dietitian", "preconception" appear naturally because the
  packages contain them.

### 5.3 Search intent this actually serves

These are high-intent, low-competition, **transactional** queries that the rest
of the site does not currently answer at all:

| Cluster | Example queries |
| --- | --- |
| Cost-led | "dietitian consultation fee Bangalore", "nutritionist cost Indiranagar", "follicular study cost Bangalore" |
| Package-led | "fertility package Bangalore", "preconception checkup package Bangalore" |
| Comparison | "3 month diet plan cost India", "online vs in-clinic dietitian Bangalore" |
| Trying-to-conceive | "follicular monitoring Indiranagar", "preconception consultation Bengaluru" |

Price pages convert far above average because the visitor has already decided
to buy something; they are deciding **where**. Publishing the number is the
conversion.

### 5.4 Structured data

`Service` + `Offer` with `priceCurrency: "INR"` and `price`, each referencing
the existing `#clinic` entity — never a second `MedicalClinic`. Add
`FAQPage` mirroring the visible Q&As.

**No `aggregateRating`, no `review`.** Beyond the usual fabrication rule, the
NMC notice now puts ratings and testimonials in the prohibited column.

---

## 6. Images

### 6.1 The constraint nobody expects

**Do not put an identifiable face anywhere near the Mirena or MTP content** —
including if those are published later.

Two independent reasons:

1. Unsplash, Pexels and Pixabay **do not verify model releases**. Pexels' own
   terms disclaim any warranty that consents were obtained. You would be
   relying on an anonymous uploader's self-certification.
2. Independent of copyright: placing a real, identifiable woman's photograph
   beside abortion or contraception content asserts something false and
   intimate about that person. That is a privacy and defamation exposure that
   no stock licence covers, and no licence can cure.

For those sections: environment, hands, materials, light, texture. No faces.

### 6.2 AI imagery is now a compliance problem, not just a taste problem

The NMC notice names **AI-generated promotional content for commercial
purposes** as prohibited. That directly affects:

- the three AI-generated scroll-story images already live on `/doctors`
- the four AI image slots specified for `/services/prenatal`

**Recommendation: stop the AI image pipeline for this site.** Replace with
commissioned photography of the actual clinic. That is also the better
decision on every other axis — real rooms beat generated ones for local trust,
for E-E-A-T, and for the "is this a real place in Indiranagar" question every
visitor is actually asking.

### 6.3 What is actually needed

Five images for the v1 page. **No faces required in any of them**, which
conveniently removes the entire model-release problem:

| Slot | Subject | Ratio |
| --- | --- | --- |
| Hero | Clinic interior, daylight, unoccupied | 16:10 |
| Nutrition | Everyday Indian home food — dal, roti, vegetables, curd — on a plain surface, natural light, not styled as a restaurant dish | 4:5 |
| Care Journey | Consultation room detail: desk, notes, chairs, no people | 4:5 |
| Supporting | Hands only — writing, holding a cup, a measuring tape — cropped above the wrist | 3:2 |
| Closing | Clinic exterior or waiting area | 16:9 |

**Sourcing order of preference:**

1. **Photograph the clinic.** A half-day with a local photographer solves hero,
   consultation, waiting area and exterior permanently, with zero licence risk
   and far better local credibility. This is the recommendation.
2. **Pexels / Unsplash** for the food and hands-only frames, where no person is
   identifiable. Search terms that return genuine Indian context rather than
   Western stock: `indian home food thali`, `dal rice home kitchen`,
   `indian vegetables market`, `writing notes hands desk`,
   `clinic waiting room daylight`.
3. Avoid Pixabay for anything near-medical — its provenance records are the
   weakest of the three.

**Licence discipline for anything downloaded:** record source URL,
photographer, licence name and download date in a manifest committed beside the
images. Free licences change; proof of the terms at time of use is the defence.

I have **not downloaded anything yet** — the face/no-face question determines
which searches are even worth running, and that follows from §3. Confirm the
publishable scope and I will pull a shortlist with full attribution.

---

## 7. What I need from you

1. **Counsel's view on Mirena and MTP** before either is published with a price.
2. **A decision on the testimonials already live** — the NMC notice is a day
   old and the homepage carries ten of them.
3. **A decision on the AI images already live** on `/doctors`.
4. Confirmation that **₹ figures are final and GST-exempt**, and the date they
   took effect.
5. **Exclusions for the four non-nutrition packages** — what can a patient still
   be billed for?
6. Whether Mirena insertion and MTP are performed **on site**, and whether the
   facility holds the registrations those services require.
7. Validity period for each package, and what happens to unused sessions.
