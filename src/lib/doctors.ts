/**
 * Clinician records: types, the committed seed, and the derivations the pages
 * use.
 *
 * The seed below is the fallback the site renders when no backend is
 * configured, and it is the same shape the backend returns — see
 * `doctors-repository.ts`. Pages must not import `seedDoctors` directly; they
 * call `getDoctors()` so a backend edit reaches the cards.
 *
 * Every field is existing site content. Do not add degrees, years,
 * registrations or outcomes that are not already documented.
 */

/**
 * Specialty groupings used by the /doctors filter.
 *
 * Each value is derived from the clinician's own stated `title` — nothing is
 * inferred beyond what the title already says. A backend row carrying an
 * unknown specialty is rejected rather than silently coerced.
 */
export const SPECIALTIES = [
  "Obstetrics",
  "Gynaecology",
  "Fertility",
  "Pelvic Health",
  "Nutrition",
  "Dermatology",
  "Mental Health",
  "Yoga Therapy",
  "Radiology",
  "Internal Medicine",
  "Andrology",
] as const;

export type Specialty = (typeof SPECIALTIES)[number];

export type DoctorStory = {
  heading: string;
  quote: string;
};

export type Doctor = {
  /** Stable key. Used for React keys, schema @id and backend row identity. */
  slug: string;
  category: string;
  name: string;
  title: string;
  specialty: Specialty;
  image: string;
  bio: string;
  background?: string;
  credentials: readonly string[];
  languages?: readonly string[];
  experience?: readonly string[];
  actionLabel?: string;
  /** Where this clinician's card books. Falls back to the site's /book route. */
  bookingUrl?: string;
  /** True only for the clinicians whose records state a founding role. */
  founder?: boolean;
  /** Set only where the record carries a note about practising elsewhere. */
  practisesElsewhere?: boolean;
  /** Editorial Q&A storytelling reflections matching clinician profile views. */
  stories?: readonly DoctorStory[];
};

export const seedDoctors: readonly Doctor[] = [
  {
    slug: "dr-smitha-ap",
    category: "Founder",
    name: "Dr. Smitha A.P",
    title: "Founder and High-Risk Obstetrician",
    specialty: "Obstetrics",
    founder: true,
    image: "/drsmitha.webp",
    bio: "Dr. Smitha specializes in High Risk Obstetrics and In-utero Fetal Programming with a keen interest in treatment of endocrine disorders, recurrent pregnancy loss, bad obstetric history and high risk pregnancy. She strongly believes in patient care that goes beyond the illness by holistically approaching the care with the right mix of evidence-based medicine and personalized care.",
    background:
      "Alumnus of Dr. B.R. Ambedkar Medical College, Bangalore and Diplomate of the National Board. Active member of BSOG and ISUOG.",
    credentials: ["MBBS, DNB (Obstetrics & Gynaecology)", "23 years experience, 15 as specialist"],
    languages: ["English", "Kannada", "Hindi", "Tamil"],
    bookingUrl: "https://my-stree.com/booking/appointment/2",
    stories: [
      {
        heading: "An early passion",
        quote:
          "My calling in obstetrics began with a simple observation: bringing a child into the world requires more than technical protocol — it demands unhurried listening, genuine emotional safety, and an anchor of trust. When a mother feels heard, her entire birthing journey transforms.",
      },
      {
        heading: "Her approach to high-risk pregnancy",
        quote:
          "A high-risk diagnosis should never mean living in fear. At our Indiranagar clinic, scans and evidence-based medicine come with clear explanations, and clinical decisions are made openly and together.",
      },
      {
        heading: "Offering empathy, and options",
        quote:
          "Whether guiding a patient through recurrent pregnancy loss, gestational diabetes or planning delivery at a hospital in Bengaluru, I make sure every mother has time to ask her questions.",
      },
      {
        heading: "A circle of continuity",
        quote:
          "Care doesn't stop at delivery. From early pregnancy checks to recovery after birth, we look after the mother as well as the baby.",
      },
    ],
  },
  {
    slug: "dr-surbhi-sinha",
    category: "Co-Founder",
    name: "Dr. Surbhi Sinha",
    title: "Co-Founder, Obstetrician and Gynaecologist",
    specialty: "Fertility",
    founder: true,
    image: "/drsurbhi.webp",
    bio: "Dr. Surbhi Sinha is an obstetrician and gynaecologist and a co-founder of MyStree. She sees women for gynaecology, fertility consultations, early pregnancy and minimal access surgery.",
    credentials: ["MBBS, MS (Obstetrics & Gynaecology), DNB", "13 years experience, 9 as specialist", "Reg. No. MAH 2018 0000672 KTK"],
    languages: ["English", "Hindi"],
    bookingUrl: "https://my-stree.com/booking/appointment/1",
    stories: [
      {
        heading: "An early passion",
        quote:
          "Reproductive health is where medicine and deeply personal hopes meet. Every woman deserves a doctor who explains her options plainly, without jargon or judgement.",
      },
      {
        heading: "Her approach to early pregnancy",
        quote:
          "The weeks after a positive pregnancy test can feel overwhelming. Early checks, nutrition advice and a clear plan help expectant parents know what comes next.",
      },
      {
        heading: "Offering empathy, and options",
        quote:
          "Every woman's body and circumstances are different, and her care should be explained and planned with that in mind.",
      },
    ],
  },
  {
    slug: "priyanka-savina",
    category: "Nutrition",
    name: "Priyanka Savina",
    title: "Nutritionist and Counsellor",
    specialty: "Nutrition",
    image: "/priyankasavina.webp",
    bio: "Priyanka Savina is a nutritionist and counsellor at MyStree. She works with women on nutrition for PCOS, pregnancy and recovery after birth, with meal plans built around their food habits and routines.",
    credentials: ["Diploma in Nutrition and Health Education, M.Sc Counselling Psychology", "10 years experience"],
    languages: ["English", "Hindi", "Kannada"],
    bookingUrl: "https://my-stree.com/booking/appointment/3",
    stories: [
      {
        heading: "An early passion",
        quote:
          "Many new mothers feel tired and confused by conflicting advice about food. Nutrition advice should be practical and fit the way a family already eats.",
      },
      {
        heading: "Her approach",
        quote:
          "Small, steady changes that a woman can keep up are more useful than strict diets. Each plan is reviewed and adjusted at follow-up.",
      },
      {
        heading: "Offering empathy, and options",
        quote:
          "Whether a woman has gestational diabetes in pregnancy or is recovering after birth, the meal plan is built around her own foods and everyday life.",
      },
    ],
  },
  {
    slug: "dr-chaitra-nayak",
    category: "Reproductive Medicine",
    name: "Dr. Chaitra Nayak",
    title: "Reproductive Medicine Specialist",
    specialty: "Fertility",
    image: "/DrChaitraNayak.webp",
    bio: "Dr. Chaitra Nayak is a reproductive medicine specialist who consults at MyStree. She is the founder of Kalpa Clinic, and her clinical work covers PCOS, endometriosis and fertility evaluation.",
    credentials: ["MBBS, MS (OBG), FNB (Reproductive Medicine), Fellowship in Reproductive Medicine", "24 years experience"],
    languages: ["English", "Hindi", "Kannada", "Tamil"],
    bookingUrl: "https://my-stree.com/booking/appointment/4",
    stories: [
      {
        heading: "An early passion",
        quote:
          "Over 24 years in reproductive medicine, my focus has been hormonal conditions such as PCOS, and making sure women who felt unheard have their questions answered.",
      },
      {
        heading: "Her clinical philosophy",
        quote:
          "Reproductive medicine needs careful evidence and patience. Insulin resistance, ovulation and metabolic health are assessed step by step, and the options are explained plainly.",
      },
    ],
  },
  {
    slug: "dr-jasmine-flora",
    category: "Physiotherapy",
    name: "Dr. Jasmine Flora",
    title: "Obstetric and Gynaecological Physiotherapist",
    specialty: "Pelvic Health",
    image: "/drjasmineflora.webp",
    bio: "Dr. Jasmine Flora is an obstetric and gynaecological physiotherapist at MyStree with 21 years of experience. She works with women on pelvic floor rehabilitation, diastasis recti and recovery after birth.",
    credentials: ["BPT, MPT (Obstetrics and Gynaecology Physiotherapy)", "21 years experience"],
    languages: ["English", "Hindi", "Tamil"],
    bookingUrl: "https://my-stree.com/booking/appointment/5",
    stories: [
      {
        heading: "An early passion",
        quote:
          "Pelvic health is often overlooked. After childbirth or with conditions like vaginismus, women are sometimes told their pain is normal. It is worth having it assessed.",
      },
      {
        heading: "Her rehabilitation approach",
        quote:
          "Physiotherapy sessions cover pelvic floor exercises, diastasis recti recovery and core strengthening, at a pace that suits each woman.",
      },
    ],
  },
  {
    slug: "dr-sitaram-m",
    category: "Urology & Andrology",
    name: "Dr. Sitaram M",
    title: "Urologist & Andrologist",
    specialty: "Andrology",
    practisesElsewhere: true,
    image: "/drsitaram.jpg",
    bio: "Dr. Sitaram M is a Urologist and Andrologist with 12 years of experience in these fields. He practises at Androcare Institute of Andrology & Men's Health in Jubilee Hills and LB Nagar, Hyderabad.",
    credentials: ["MBBS, MS (General Surgery), MCh (Urology)", "12 years experience"],
    languages: ["English", "Telugu", "Hindi"],
    actionLabel: "Request an Appointment",
    bookingUrl: "https://my-stree.com/booking",
    stories: [
      {
        heading: "An early passion",
        quote:
          "Men's reproductive health is part of a couple's fertility assessment, and it deserves the same careful, evidence-based approach.",
      },
    ],
  },
] as const;

/* ------------------------------------------------------------------ *
 * Derivations
 *
 * These take the list as an argument rather than closing over the seed:
 * once the roster comes from a backend, a module-level constant computed at
 * import time would be a snapshot of the fallback, not of what the page is
 * actually rendering.
 * ------------------------------------------------------------------ */

/** The clinicians whose records state a founding role. */
export function foundersOf(list: readonly Doctor[]) {
  return list.filter((doctor) => doctor.founder);
}

/** Everyone else, rendered as the allied faculty index. */
export function alliedFacultyOf(list: readonly Doctor[]) {
  return list.filter((doctor) => !doctor.founder);
}

/**
 * The clinicians the About page's editorial rail profiles in depth. Ordered to
 * open on the founders, who carry the strongest verified detail.
 */
export function aboutRailOf(list: readonly Doctor[]) {
  return list.slice(0, 4);
}

/**
 * Filter options, built from the specialties actually present so the row can
 * never offer a category with nothing behind it. Ordered by SPECIALTIES so the
 * row does not reshuffle when the backend returns a different row order.
 */
export function specialtiesOf(list: readonly Doctor[]): readonly Specialty[] {
  const present = new Set(alliedFacultyOf(list).map((doctor) => doctor.specialty));
  return SPECIALTIES.filter((specialty) => present.has(specialty));
}

/*
 * Booking-system uploads that are the generic orange "doctor" icon rather
 * than a photograph (checked 24 Oct 2026), plus the repository's logo
 * fallback. Clinicians showing one of these count as having no photo.
 * Remove a file from this list once the clinician's real photo replaces it.
 */
const PLACEHOLDER_PHOTOS = [
  "/brand/mystree-logo.png",
  "533c031c123047a099917d0fcdaec028",
  "c7918ae323df4373addbe4bc4f7766ed",
] as const;

export function hasDoctorPhoto(doctor: Pick<Doctor, "image">): boolean {
  return Boolean(doctor.image) && !PLACEHOLDER_PHOTOS.some((marker) => doctor.image.includes(marker));
}
