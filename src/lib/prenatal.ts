/**
 * Pregnancy-care page content for MyStree, Indiranagar, Bengaluru.
 */

export const medicalReview: {
  reviewedBy: string;
  profileSlug: string;
  reviewedOn: string;
} | null = null;

export type QAItem = { question: string; answer: string };

export type TrimesterPillar = {
  stage: string;
  title: string;
  subtitle: string;
  scope: string;
};

export const trimesterPillars: readonly TrimesterPillar[] = [
  {
    stage: "Trimester 01 · Weeks 1–12",
    title: "Early Care & Viability",
    subtitle: "First trimester screening",
    scope: "Dating scan, early genetic screening, and personalized morning sickness support.",
  },
  {
    stage: "Trimester 02 · Weeks 13–27",
    title: "Fetal Growth & Anatomy",
    subtitle: "Growth & development",
    scope: "Comprehensive anomaly scans, fetal echocardiography, and pelvic floor conditioning.",
  },
  {
    stage: "Trimester 03 · Weeks 28–40",
    title: "High-Risk & Delivery Planning",
    subtitle: "Specialized attention",
    scope: "Growth velocity, NST monitoring, hospital liaison, and bespoke birth planning.",
  },
  {
    stage: "Postpartum & Continuum",
    title: "Maternal Nutrition & Recovery",
    subtitle: "Holistic wellness",
    scope: "IBCLC lactation guidance, pelvic floor rehabilitation, and postpartum recovery.",
  },
];

export const quickAnswers: readonly QAItem[] = [
  {
    question: "When should I book my first pregnancy appointment?",
    answer:
      "Most people book their first appointment once a home test is positive, usually between five and eight weeks. Coming in early gives you time to talk through your history, any medication you take, and agree on personalized monitoring. If you have had previous pregnancy loss or fertility treatment, being seen early provides immediate clarity.",
  },
  {
    question: "What happens during a first pregnancy consultation?",
    answer:
      "The first consultation is an unhurried conversation. A clinician will ask about your cycle, dates, previous medical history, nutrition, and current symptoms. From there, you agree on a tailored roadmap, including early viability and dating scans.",
  },
  {
    question: "When is a pregnancy considered high risk?",
    answer:
      "A pregnancy is generally considered higher risk when factors such as previous loss, maternal medical conditions (hypertension, diabetes, thyroid), advanced maternal age, or multiple gestation indicate closer monitoring. Many high-risk pregnancies progress smoothly with expert obstetric attention.",
  },
  {
    question: "Can MyStree care for a pregnancy after IVF or a previous loss?",
    answer:
      "Yes. Dr. Smitha A.P's practice specializes in high-risk obstetrics and recurrent pregnancy loss, providing continuous, empathetic care from positive test to delivery.",
  },
  {
    question: "Can I keep working, exercising, or travelling while pregnant?",
    answer:
      "For most uncomplicated pregnancies, yes, with appropriate adjustments. We provide personalized exercise, travel, and ergonomic guidance tailored to your trimester.",
  },
];

/* ===================================================================== *
 * 03 — Journey stages (The Mother's 9 Month Path)
 * ===================================================================== */

export type JourneyStage = {
  marker: string;
  title: string;
  focusTitle: string;
  focusDesc: string;
  body: string;
  tag: string;
  actionLabel: string;
};

export const journeyStages: readonly JourneyStage[] = [
  {
    marker: "Weeks 0–12",
    title: "Early Care / Preconceptional Counseling",
    focusTitle: "Pre-Pregnancy Focus",
    focusDesc: "Genetic counseling, lifestyle optimization, and pre-pregnancy nutrition guidance",
    body: "Laying the strongest foundation before conception. We guide you through health optimizations to ensure your body is ready for a healthy pregnancy.",
    tag: "Preconceptional Counseling Bangalore",
    actionLabel: "Start Early",
  },
  {
    marker: "Weeks 1–12",
    title: "First Trimester Care",
    focusTitle: "Early Assessment Focus",
    focusDesc: "Confirming viability, dating scan, and nutrition guidance",
    body: "Establishing the baseline with early viability scans, nutritional planning to manage morning sickness, and initial genetic screening.",
    tag: "Prenatal Clinic, Indiranagar",
    actionLabel: "Consult",
  },
  {
    marker: "Weeks 13–27",
    title: "Fetal Growth Monitoring",
    focusTitle: "Fetal Health Focus",
    focusDesc: "Detailed anomaly scans, pelvic floor strengthening, and yoga",
    body: "Rigorous tracking including Anomaly Scan, Fetal Cardiac Assessment, and precise Fetal Growth checks. Our specialists ensure every milestone is met.",
    tag: "Fetal Growth Monitoring Indiranagar",
    actionLabel: "Join Yoga Class",
  },
  {
    marker: "Weeks 28–40",
    title: "High-Risk Readiness",
    focusTitle: "High-Risk Care Focus",
    focusDesc: "Growth scans, non-stress tests, and detailed labor preparation",
    body: "Finalizing delivery plans with a focus on safety. We specialize in managing complex conditions to ensure a safe birthing experience.",
    tag: "High-Risk Pregnancy Care Bangalore",
    actionLabel: "Consult",
  },
];

/* ===================================================================== *
 * 05 — Approach principles (Why Choose MyStree?)
 * ===================================================================== */

export type Principle = { number: string; title: string; body: string };

export const approachPrinciples: readonly Principle[] = [
  {
    number: "01",
    title: "Compassionate Care",
    body: "We believe in listening first. Your emotional well-being is as important as your physical health, creating a nurturing environment for you and your baby.",
  },
  {
    number: "02",
    title: "Evidence-based Monitoring",
    body: "Utilizing the latest in medical technology for fetal growth monitoring and risk assessment, grounded in global best practices.",
  },
  {
    number: "03",
    title: "Holistic Guidance",
    body: "Beyond clinical checks, we integrate nutrition, Lamaze, Birthing Classes, yoga, and mental wellness to ensure a completely balanced pregnancy journey.",
  },
];

/* ===================================================================== *
 * 07 — Detailed FAQ (Moms in Indiranagar Ask Us)
 * ===================================================================== */

export const prenatalFaqs: readonly QAItem[] = [
  {
    question: "How does Bangalore traffic affect emergency transport?",
    answer:
      "Traffic in Bangalore is a primary consideration in birth planning. We help you establish contingency routes, identify optimal departure times during early labor signs, and map direct access to partner tertiary hospitals in and around Indiranagar and Old Airport Road. Our team is accessible 24/7 on call to advise you on when to leave for the hospital so you are never rushed.",
  },
  {
    question: "Which Indiranagar hospitals do you partner with?",
    answer:
      "Dr. Smitha A.P and our clinical team hold admitting and delivery privileges at maternity hospitals located conveniently around Indiranagar and central Bengaluru, including Cloudnine, Motherhood, and Manipal Hospital. We coordinate all records, birth plans, and handover protocols directly with your chosen delivery facility.",
  },
  {
    question: "Are prenatal yoga classes held at the clinic?",
    answer:
      "Yes. In line with our holistic guidance philosophy, we host curated, small-batch prenatal yoga and breathwork sessions guided by certified maternal fitness and pelvic floor specialists. These classes focus on gentle pelvic opening, back pain relief, posture, and Lamaze breathing techniques for labor.",
  },
  {
    question: "How do I book pregnancy care at MyStree in Indiranagar?",
    answer:
      "You can book a consultation through the booking page or by calling the clinic directly. Both in-clinic and online consultations are available, with same-day appointments offered for timely clinical care.",
  },
  {
    question: "What should I bring to my first prenatal visit?",
    answer:
      "Bring any records you already have: earlier scan or test reports, notes from previous pregnancies, a list of medication and supplements you take, and details of any long-term condition. It also helps to write down your questions beforehand.",
  },
  {
    question: "Which scans and tests are carried out on-site?",
    answer:
      "Anomaly scans, fetal cardiac assessment and fetal growth scans are carried out right at our Indiranagar clinic, ensuring continuity and immediate clinical interpretation with your obstetric specialist.",
  },
  {
    question: "Can MyStree care for a pregnancy after IVF or a previous loss?",
    answer:
      "Yes. Dr. Smitha A.P's practice covers recurrent pregnancy loss, previous complicated obstetric history and high-risk pregnancy. Our fertility clinicians and obstetric team work hand-in-hand to provide comprehensive, reassuring care.",
  },
];

/* ===================================================================== *
 * 06 — Stories of Joy (Verbatim Client Reviews)
 * ===================================================================== */

export type Review = { name: string; quote: string; rating?: number };

export const prenatalReviews: readonly Review[] = [
  {
    name: "Charles Samuel",
    rating: 5,
    quote:
      "",
  },
  {
    name: "K L SUDHA",
    rating: 5,
    quote:
      "",
  },
  {
    name: "J.N. Surekha",
    rating: 5,
    quote:
      "She really took care of me during pregnancy + Delivery even post delivery. Always available for help on one call",
  },
];

/**
 * Operational facts confirmed by the client.
 */
export const verifiedFacts = {
  googleRating: "4.9/5",
  ratingCount: "120+ Reviews",
  babiesDelivered: "",
  yearsExcellence: "15+",
  consultationFee: "₹600",
  sameDayAppointments: true,
  onSiteScans: ["Anomaly scan", "Fetal cardiac assessment", "Fetal growth scans"],
} as const;

/** Clinicians featured on this page, by slug, in display order. */
export const prenatalTeamSlugs = [
  "dr-smitha-ap",
  "dr-surbhi-sinha",
  "priyanka-savina",
] as const;

export const prenatalTeamNotes: Record<string, string> = {
  "dr-smitha-ap":
    "Founder & High Risk Obstetrician with 23+ years of clinical experience, specializing in high-risk pregnancies, fetal programming, and compassionate delivery planning.",
  "dr-surbhi-sinha":
    "Co-Founder & Fertility Specialist with 12+ years experience, guiding couples through preconceptional optimization and early pregnancy transitions.",
  "priyanka-savina":
    "Lactation & Nutrition Consultant with 10+ years experience in trimester-by-trimester nutritional health and postnatal feeding support.",
};

export type PrenatalDoctorMeta = {
  title: string;
  credentials: string[];
  languages: string[];
  experience: string;
  rating?: string;
  verified: boolean;
  fee: string;
  note: string;
  tags?: string[];
  clinicLocation?: string;
};

export const prenatalDoctorMeta: Record<string, PrenatalDoctorMeta> = {
  "dr-smitha-ap": {
    title: "High Risk Obstetrician & Founder",
    credentials: ["MBBS, DGO, DNB, MRCOG (London)"],
    languages: ["English", "Kannada", "Hindi"],
    experience: "23+ Years",
    rating: "4.9 (120+ reviews)",
    verified: true,
    fee: "₹600",
    note: "Founder & High Risk Obstetrician with 23+ years of clinical experience, specializing in high-risk pregnancies, fetal programming, and compassionate delivery planning.",
    tags: ["High-Risk Care", "Fetal Medicine", "Normal Delivery", "Preconception", "23+ Yrs Exp", "+2"],
    clinicLocation: "Indiranagar Clinic",
  },
  "dr-surbhi-sinha": {
    title: "Fertility & Early Pregnancy",
    credentials: ["MBBS, MS, Fellowship"],
    languages: ["English", "Hindi"],
    experience: "12+ Years",
    verified: true,
    fee: "₹600",
    note: "Co-Founder & Fertility Specialist with 12+ years experience, guiding couples through preconceptional optimization and early pregnancy transitions.",
    tags: ["Fertility Care", "Early Pregnancy", "PCOS & Hormones", "Ultrasound Scans", "12+ Yrs Exp", "+1"],
    clinicLocation: "Indiranagar Clinic",
  },
  "priyanka-savina": {
    title: "Lactation & Nutrition",
    credentials: ["MSc Nutrition, IBCLC"],
    languages: ["English", "Kannada"],
    experience: "10+ Years",
    verified: true,
    fee: "₹600",
    note: "Lactation & Nutrition Consultant with 10+ years experience in trimester-by-trimester nutritional health and postnatal feeding support.",
    tags: ["Lactation Support", "Prenatal Diet", "Postnatal Rehab", "Gestational Health", "10+ Yrs Exp", "+1"],
    clinicLocation: "Indiranagar Clinic",
  },
};

