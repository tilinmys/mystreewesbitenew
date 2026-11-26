/**
 * Long-form profile copy for /doctors/[slug].
 *
 * SOURCE RULE: every sentence restates a fact already recorded for that
 * clinician in `doctors.ts` (bio, background, credentials, languages,
 * experience, stories). Nothing here adds a degree, year, membership,
 * registration or outcome. Superlatives in the older bios ("renowned",
 * "cutting-edge", "architect") are left out: the NMC Ethics Board notice of
 * 06.10.2026 prohibits superiority claims, and Google's guidance for health
 * pages treats inflated credentials as a low-quality signal.
 *
 * Credentials are displayed exactly as `doctors.ts` holds them. Several
 * differ from public third-party profiles (see docs/doctor-profiles-audit.md);
 * the clinic must confirm them before `sameAs` links or registration numbers
 * are added here.
 */

export type DoctorProfile = {
  /** Shown under the name, as in the reference layout. */
  role: string;
  /** Third-person paragraphs, in reading order. */
  paragraphs: readonly string[];
  /** Conditions and services, used for the "Areas of care" list and knowsAbout. */
  areasOfCare: readonly string[];
  /** Internal pages this clinician's care relates to, with descriptive anchors. */
  relatedPages: readonly { label: string; href: string }[];
  /** Organisations named in `background`, for alumniOf / memberOf. */
  alumniOf?: readonly string[];
  memberOf?: readonly string[];
  /** Verified external profiles. Empty until the clinic confirms them. */
  sameAs?: readonly string[];
};

export const doctorProfiles: Record<string, DoctorProfile> = {
  "dr-smitha-ap": {
    role: "Founder and High-Risk Obstetrician",
    paragraphs: [
      "Dr. Smitha A.P is the founder of MyStree and a high-risk obstetrician at the clinic in Indiranagar, Bengaluru. Her clinical work centres on high-risk pregnancy, recurrent pregnancy loss, bad obstetric history and endocrine disorders in pregnancy, with a particular interest in in-utero fetal programming.",
      "She is an alumnus of Dr. B.R. Ambedkar Medical College, Bangalore, and a Diplomate of the National Board, and is an active member of the Bangalore Society of Obstetrics and Gynaecology (BSOG) and the International Society of Ultrasound in Obstetrics and Gynecology (ISUOG).",
      "Her approach pairs evidence-based medicine with care that looks beyond the illness. For women with a high-risk diagnosis, that means explaining each finding, making decisions together and leaving time for every question, from early viability checks through pregnancy to recovery in the weeks after birth. Where delivery needs a tertiary hospital, she plans it with the family in advance.",
      "Dr. Smitha consults in English, Kannada, Hindi and Tamil.",
    ],
    areasOfCare: [
      "High-risk pregnancy",
      "Recurrent pregnancy loss",
      "Bad obstetric history",
      "Endocrine disorders in pregnancy",
      "Gestational diabetes",
      "Postpartum recovery",
    ],
    relatedPages: [
      { label: "OB-GYN consultations in Indiranagar", href: "/services/obgyn-consults" },
      { label: "Pregnancy care at MyStree", href: "/services/prenatal" },
    ],
    alumniOf: ["Dr. B.R. Ambedkar Medical College, Bangalore"],
    memberOf: [
      "Bangalore Society of Obstetrics and Gynaecology (BSOG)",
      "International Society of Ultrasound in Obstetrics and Gynecology (ISUOG)",
    ],
  },
  "dr-surbhi-sinha": {
    role: "Co-Founder, Obstetrician and Gynaecologist",
    paragraphs: [
      "Dr. Surbhi Sinha is a co-founder of MyStree and an obstetrician and gynaecologist at the clinic in Indiranagar, Bengaluru. Her work spans gynaecology, fertility consultations, early pregnancy and minimal access gynaecological surgery.",
      "She sees women from the first conversation about conceiving through the early weeks of pregnancy, with early pregnancy checks, nutrition advice and a clear plan for what comes next.",
      "Her approach is to explain every option in plain language, without jargon or judgement, and to shape hormone and fertility care around each woman's biology and circumstances.",
      "Dr. Surbhi consults in English and Hindi.",
    ],
    areasOfCare: [
      "Fertility consultations",
      "Early pregnancy care",
      "Minimally invasive gynaecological surgery",
      "Hormone balance",
    ],
    relatedPages: [
      { label: "OB-GYN consultations in Indiranagar", href: "/services/obgyn-consults" },
      { label: "PCOS and metabolic care", href: "/clinics/pcos" },
      { label: "Pregnancy care at MyStree", href: "/services/prenatal" },
      { label: "Adolescent health clinic", href: "/services/adolescent-health" },
    ],
  },
  "priyanka-savina": {
    role: "Nutritionist and Counsellor",
    paragraphs: [
      "Priyanka Savina is a nutritionist and counsellor at MyStree in Indiranagar, Bengaluru. She works with women on nutrition for PCOS, pregnancy and recovery after birth.",
      "Her nutrition work covers conditions such as gestational diabetes and PCOS, with meal plans built around the foods women already cook and eat.",
      "She holds a Diploma in Nutrition and Health Education and an M.Sc in Counselling Psychology, and has 10 years of experience.",
      "Priyanka consults in English, Hindi and Kannada.",
    ],
    areasOfCare: [
      "Postpartum nutrition",
      "PCOS nutrition",
      "Gestational diabetes nutrition",
    ],
    relatedPages: [
      { label: "PCOS and metabolic care", href: "/clinics/pcos" },
      { label: "Pregnancy care at MyStree", href: "/services/prenatal" },
      { label: "Adolescent health clinic", href: "/services/adolescent-health" },
    ],
  },
  "dr-chaitra-nayak": {
    role: "Reproductive Endocrinologist & Gynaecologist",
    paragraphs: [
      "Dr. Chaitra Nayak is a reproductive endocrinologist and gynaecologist who consults at MyStree in Indiranagar, Bengaluru. She has 24 years of experience and is the founder of Kalpa Clinic.",
      "Her clinical work covers PCOS, endometriosis and fertility evaluation. She assesses insulin resistance, ovulation and metabolic health step by step, and explains the options with each woman.",
      "Dr. Chaitra consults in English, Hindi, Kannada and Tamil.",
    ],
    areasOfCare: ["PCOS", "Endometriosis", "Fertility evaluation", "Ovulation and insulin resistance"],
    relatedPages: [
      { label: "PCOS and metabolic care", href: "/clinics/pcos" },
      { label: "OB-GYN consultations in Indiranagar", href: "/services/obgyn-consults" },
    ],
  },
  "dr-jasmine-flora": {
    role: "Obstetric and Gynaecological Physiotherapist",
    paragraphs: [
      "Dr. Jasmine Flora is an obstetric and gynaecological physiotherapist at MyStree in Indiranagar, Bengaluru, with 21 years of experience. She works on pelvic floor rehabilitation, diastasis recti and vaginismus.",
      "She sees women after childbirth and women with pelvic pain or vaginismus, with pelvic floor exercises, diastasis recti recovery and core strengthening at a pace that suits each woman.",
      "Dr. Jasmine consults in English, Hindi and Tamil.",
    ],
    areasOfCare: [
      "Pelvic floor rehabilitation",
      "Vaginismus",
      "Diastasis recti",
      "Postpartum recovery",
      "Obstetric and gynaecological physiotherapy",
    ],
    relatedPages: [
      { label: "Pelvic floor and intimate health", href: "/services/pelvic-floor-physiotherapy" },
      { label: "Pregnancy care at MyStree", href: "/services/prenatal" },
    ],
  },
  "dr-sitaram-m": {
    role: "Urologist and Andrologist",
    paragraphs: [
      "Dr. Sitaram M is a urologist and andrologist who consults with MyStree, with 12 years of experience in urology and andrology. He also practises at Androcare Institute of Andrology & Men's Health in Jubilee Hills and LB Nagar, Hyderabad.",
      "With MyStree he sees the male partner in couples planning a pregnancy or finding it difficult to conceive, so that both partners are assessed and supported together.",
      "Dr. Sitaram consults in English, Telugu and Hindi.",
    ],
    areasOfCare: ["Male fertility", "Andrology", "Urology"],
    relatedPages: [{ label: "OB-GYN consultations in Indiranagar", href: "/services/obgyn-consults" }],
  },
};
