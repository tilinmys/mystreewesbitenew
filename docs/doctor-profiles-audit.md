# Doctor profiles — credential audit

**Date:** 8 October 2026. **Status:** needs clinic confirmation before any
credential is changed or any `sameAs` link is added.

The new profile pages (`/doctors/[slug]`) display credentials **exactly as
`src/lib/doctors.ts` records them**. Nothing was added or removed. While
researching the doctors for the profiles, these differences from public
third-party listings came up. On a health site these matter twice over:
Google treats false or inflated credentials as a low-quality signal for
health content, and the NMC notice of 06.10.2026 holds the practitioner
personally responsible for what is published about them.

| Clinician | On this site | Public listing says | Source |
| --- | --- | --- | --- |
| Dr. Smitha A.P | MBBS, DGO, DNB, **MRCOG (London)**, FFM, FRM, MBA; **23+ years** | MBBS, DNB (OBG); alumna of Dr. B.R. Ambedkar Medical College; BSOG and ISUOG member (matches). No MRCOG listed. About 15 years' experience. | [Miror author page](https://miror.in/author/smithamiror-in/), [Clinicspots](https://www.clinicspots.com/doctor/dr-smitha-ap) |
| Priyanka Savina | MSc Nutrition & Dietetics, **IBCLC**, MSc Psychological Counselling, 10+ years | Master's in Psychological Counselling; certifications in Nutrition & Dietetics and in Nutrition & Public Health Education; 10+ years. No IBCLC or MSc Nutrition listed. | [Miror doctor page](https://miror.in/doctor/dt-priyanka-savina/), [Miror author page](https://miror.in/author/priyankasavinamiror-in/) |
| Dr. Sitaram M | MCh Urology, MS General Surgery, MBBS, **12+ years** | MBBS, MS, MCh Urology, Fellowship in Andrology; 10 years. | [HexaHealth](https://www.hexahealth.com/hyderabad/doctor/dr-sitaram-m-urologist) |
| Dr. Surbhi Sinha | MBBS, MS, Fellowship, MRCOG (UK), FRM, 12+ years | No public listing found. | — |
| Dr. Chaitra Nayak | MBBS, MS (OBG), FNB (Reproductive Medicine), 24+ years, founder of Kalpa Clinic | No public listing found. | — |
| Dr. Jasmine Flora | MPT (OBG Physiotherapy), Lactation Counsellor, 21 years | No public listing found. | — |

Third-party directories can be out of date, so none of the above proves the
site wrong. It means the clinic should confirm each line from the
clinician's own certificates.

## What to send for each clinician

1. **Registration number and council** (for example, Karnataka Medical
   Council). The NMC notice explicitly permits a doctor directory with names,
   qualifications, specialities and registration numbers, and it is the
   strongest trust signal a profile can carry.
2. **Confirmed degree list**, in the order the clinician prefers.
3. **Years of experience**, as one agreed figure.
4. **External profiles the clinician wants linked** (hospital pages, Practo,
   society directories). These go into `sameAs` in
   `src/lib/doctor-profiles.ts`; they tell search engines the profiles are
   the same person, which is how Google's profile-page guidance builds an
   entity.

## Backlinks — what was done and what only the clinic can do

- **On this site (done):** each profile links to the services its clinician
  provides, with descriptive anchor text; article bylines on service pages
  link to the author's profile; profile pages link back to the doctors
  index; breadcrumb and `ProfilePage` structured data connect each person to
  the clinic entity.
- **From other sites (clinic action):** real backlinks are links *to* MyStree
  from elsewhere. The legitimate sources are listings the doctors already
  hold — Google Business Profile, Practo, Justdial, society directories,
  hospitals they visit — each pointing to the doctor's MyStree profile URL.
  Buying links or exchanging them for ranking breaks Google's spam policies.

## Fertility page brief (8 Oct 2026): items held back

The supplied fertility copy was built into `/services/fertility-clinic`
except for the following, which conflict with the repository or with
regulation and need a decision:

| Item in the brief | Why it was held |
| --- | --- |
| "85% clinical protocol success rate" | Outcome claim; prohibited by the NMC notice of 06.10.2026, and no source data in the repository. |
| Four patient testimonials with five-star ratings | NMC prohibits testimonials and ratings displays; they also contain outcome and comparative claims ("previous clinics had overlooked"). |
| Credentials differing from `doctors.ts` (Dr. Surbhi Sinha "MD, Ex-AIIMS"; Dr. Smitha A.P "MS" and no MRCOG; changed language lists) | Conflicts with the recorded profile; the profiles keep the recorded values until the clinic confirms. |
| Address "2nd Floor, 13th Main Road, 560061", second phone +91 99028 78279, valet parking, "600 m from Indiranagar Metro", different coordinates | Conflicts with `lib/clinic.ts` (No. 3366, 560008) and the existing structured data. |
| `mystree.org` URLs and a second `MedicalClinic` entity | Site URL is `my-stree.com`; one clinic entity only. |
| IUI, IVF, egg collection, vitrification and storage as on-site procedures; donor oocyte and sperm programme | Require ART Act registration (Level 1 for IUI; Level 2 for IVF and storage; ART bank for donors). Not recorded in the repository; described as pathway steps and consultation only. |
| ERA, PGT-A, "uterine microbiome dysbiosis" | Contested or lab-dependent tests; omitted rather than implying they are offered. |
| Fees ₹900 (Dr. Chaitra) and ₹600 (others) | ₹900 used in one answer (it fits the ₹600 to ₹1,000 range in `faqs-data.ts`); per-doctor fee table not built. |

## The clinic's own booking system (my-stree.com/api/doctors), read 8 Oct 2026

The live booking system is the clinic's own record and resolves part of the
table above:

| Clinician | Booking system degree | Booking system experience | Fee |
| --- | --- | --- | --- |
| Dr. Smitha A.P | MBBS, DNB (Obstetrics & Gynecology); no MRCOG | 23 years (15 as specialist) | ₹700 |
| Dr. Surbhi Sinha | MS (OBG), MBBS, DNB; profile text adds FMAS, DMAS and MRCOG (London) | 13 years (9 as specialist) | ₹600 |
| Dr. Chaitra Nayak | MBBS, MS (OBG), FNB (Reproductive Medicine) | 24 years | ₹900 |
| Dr. Isha Shetty (not on this site yet) | Obstetrics and Gynaecology | 2 years | ₹700 |
| Dr. Raksha M (not on this site yet) | MBBS, MS (OBG), DNB (OBG) | 15 years | ₹700 |

The booking cards on service pages show these values directly. `doctors.ts`
still shows "MRCOG (London)" for Dr. Smitha and "MRCOG (UK)" for Dr. Surbhi
without her DNB; aligning `doctors.ts` with the booking system is the
recommended fix once the clinic confirms.

The booking system's own profile text for Dr. Smitha carries "Patient
Satisfaction: 99% (136+ Ratings)". The NMC notice of 06.10.2026 lists
ratings displays as prohibited; that text is on the booking site, not this
one, but the same rule applies there.

## Adolescent page brief (8 Oct 2026): items changed or held back

| Item in the brief | Treatment |
| --- | --- |
| "100% Confidential ... No awkward letters home" | Not published. For anyone under 18, POCSO s.19 requires doctors to report certain disclosures, and treatment usually needs a guardian's consent. The page explains privacy and its limits truthfully. |
| Patient quotes ("Riya, 19", Ananya, Julia Corget, Nafisa), star ratings, "4.9 (120+ Reviews)", "Bangalore Top Rated", "Verified Expert" | Not published (NMC notice of 06.10.2026: testimonials, ratings and superiority claims). |
| Credentials in the brief (Dr. Smitha "MS, DNB"; Dr. Surbhi "MD"; Priyanka Savina "M.Sc Nutrition & Dietetics") | Specialist cards use the booking system's values instead. Priyanka Savina's booking record: "Diploma in Nutrition and Health Education, M.Sc Counselling Psychology" — so `doctors.ts` ("MSc Nutrition & Dietetics", "IBCLC") also needs correcting. |
| Emoji, hashtags, slang headings ("Hormones Be Wildin'") | Rewritten in plain, warm language; same topics kept. |

## Consultation length conflict

The booking system lists 15-minute slots for every gynaecologist, while the
OB-GYN and fertility pages say "thirty-minute consultations" and "30 min".
One of the two is wrong; the clinic needs to confirm which before either is
changed. The adolescent page makes no length claim.

## Pre-natal page brief (9 Oct 2026): items changed or held back

| Item in the brief | Treatment |
| --- | --- |
| "98% of high-risk maternal patients report reduced anxiety" | Not published: outcome/satisfaction claim (NMC notice 06.10.2026); replaced by "23 years" from the booking record. |
| Four testimonials with star ratings (K.L. Sudha, Charles Samuel & Rachel, J.N. Surekha, Pallavi M.) | Not published (NMC: testimonials, ratings). Opening quote is Dr. Smitha's own recorded words. |
| "Clinical admission privileges" at Cloudnine Old Airport Road, Motherhood and Manipal | Not published: unverified, and names competitor hospitals. Page says delivery is planned at a hospital in Bengaluru suited to the pregnancy. Needs written confirmation of hospital arrangements before naming any. |
| "Emergency & High-Risk Desk", "triages immediately and coordinates priority transfer", in-house NST | Not published: unverified service claims. Urgent symptoms direct women to the nearest hospital emergency department (safety). |
| "5 to 7 minute" consultations in other clinics | Not published: comparative claim about competitors. |
| Credentials in the brief (Dr. Smitha "MS, FFM, FRM, MBA"; Dr. Surbhi "Ex-AIIMS"; Priyanka "M.Sc Nutrition & Dietetics") | Specialist cards show the booking system's values. |
| ₹600 / 30-minute prenatal intake | Conflicts with the booking system (Dr. Smitha ₹700, 15-minute slots). Not built; cards show live fees. |
| 2nd Floor, 560061, parking, valet, "6 minutes from Indiranagar Metro", second phone | Conflicts with `lib/clinic.ts`; not published. |
| Second `MedicalClinic` entity, `mystree.org` URLs | One clinic entity (`/#clinic`) on `my-stree.com`. |

## FAQ page audit (9 Oct 2026)

The old `lib/faqs-data.ts` (134 Q&As) had the following problems:

- **Address and schema:** it gave the address as "100 Feet Road, Indiranagar 560038" and declared a second MedicalClinic with different coordinates. This conflicts with the repo address (No. 3366, 13th Main Road, HAL 2nd Stage, 560008).
- **Duplicates and wording:** "Does My Stree offer online consultations?" appeared twice. Some answers used "best" and "expert" wording.
- **Keyword stuffing:** some questions were stuffed with place names.

The new `lib/faq-hub.ts` uses only the repo address and the live booking-system fees (₹600–₹1,500). It names only clinicians present in the booking system, and it states gender only where the repo uses she/her (Dr. Smitha A.P, Dr. Surbhi Sinha, Dr. Chaitra Nayak). The following items need confirmation before they are reinstated:

- The menopause community and webinars.
- Sunday appointments by arrangement. The new text says "usually closed on Sundays".
- Whether video consultations exist for every specialist.
