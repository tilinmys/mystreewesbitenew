/**
 * Fixed-price care packages: the single source for every /packages/[slug]
 * page, the sitemap and llms.txt. The navbar's list is lib/package-nav.ts.
 *
 * Names, inclusions, prices and terms are the clinic's own (supplied 24 Oct
 * 2026). Do not add inclusions, discounts or "original" prices the clinic
 * has not given: the price card and the Offer schema read from here, and
 * Google requires structured-data prices to match the page.
 *
 * Writing rules, because several of these are regulated:
 *   - no outcome, success-rate or weight-loss claims, ratings, patient
 *     counts or "best" claims (NMC notice, 06.10.2026; ASCI healthcare
 *     guidelines)
 *   - medicines are never named or promoted; "medication as prescribed by
 *     the gynaecologist" only (Drugs and Magic Remedies Act, 1954)
 *   - MTP copy states the legal frame (MTP Act, 1971, amended 2021), that a
 *     doctor decides suitability, and no "quick", "painless" or "discreet
 *     pill" language; every page that includes scans carries the PCPNDT
 *     notice
 *   - clinical statements follow NHS, FSRH, WHO, NICE and the MTP Act text
 */

export type PackageItem = {
  /** The clinic's line, lightly edited for house style only. */
  name: string;
  detail?: string;
  points?: readonly string[];
};

export type QA = { question: string; answer: string };

export type PackageImage = { src: string; width: number; height: number };

export type CarePackage = {
  slug: string;
  name: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  /** Answer-first opening paragraph; `leadStrong` is set in bold. */
  leadStrong: string;
  lead: string;
  chips: readonly string[];
  price: number;
  priceDisplay: string;
  /** "all-inclusive", "for 3 months", or empty when the clinic gave none. */
  priceNote: string;
  priceFor: string;
  itemsLabel: string;
  items: readonly PackageItem[];
  steps: readonly { title: string; text: string }[];
  suitsLabel: string;
  suits: readonly { title: string; text: string }[];
  terms: readonly string[];
  /** Legal or safety notices shown beside the price and in the terms. */
  notices?: readonly string[];
  glanceHeading: string;
  glanceLead: string;
  facts: readonly { term: string; value: string }[];
  whyHeading: string;
  stats: readonly { figure: string; label: string }[];
  faqHeading: string;
  faqs: readonly QA[];
  closing: string;
  image: PackageImage;
  imageAlt: string;
  /** Full-figure cut-out beside the "at a glance" list; unique per package. */
  glanceImage: PackageImage;
  schema: {
    serviceType: string;
    procedure?: { name: string; alternateName?: readonly string[]; howPerformed?: string };
    about?: readonly { type: string; name: string }[];
  };
  updated: string;
  updatedDisplay: string;
};

const UPDATED = "2026-11-14";
const UPDATED_DISPLAY = "14 November 2026";
const TERMS = "Terms & conditions apply.";
const PCPNDT =
  "MyStree does not determine or disclose the sex of the fetus. Sex determination is prohibited under the PCPNDT Act, 1994.";
const ADDRESS = "No. 3366, 13th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru 560008";
const PHONE = "+91 63665 73772";

/* ------------------------------------------------------------ shared TTC copy */

const TTC_ITEMS: readonly PackageItem[] = [
  {
    name: "2 gynaecologist consultations",
    detail:
      "A first consultation to go through your cycles, health, any previous tests and how long you have been trying, and a second to review your scans and agree the next steps.",
  },
  {
    name: "3 follicular scans",
    detail:
      "Ultrasound scans across one cycle that track a follicle as it grows, to see whether and when you ovulate. Your gynaecologist sets the days to suit your cycle.",
  },
  {
    name: "1 nutrition consultation",
    detail:
      "A session with our nutritionist on eating well before pregnancy, built around the food you already cook, including folic acid and iron.",
  },
];

const TTC_STEPS = [
  {
    title: "First gynaecologist consultation",
    text: "Your gynaecologist asks about your cycles, health and how long you have been trying, looks at any reports you bring, and plans the scans for your cycle.",
  },
  {
    title: "Follicular scans across your cycle",
    text: "Three ultrasound scans, a few days apart, show the follicle growing and whether you ovulate. You see what is happening rather than guessing from an app.",
  },
  {
    title: "Nutrition consultation",
    text: "Our nutritionist reviews what you eat and helps you prepare for pregnancy with food that fits your routine.",
  },
  {
    title: "Second gynaecologist consultation",
    text: "Your gynaecologist goes through the scan findings with you and explains what they mean and what, if anything, to do next.",
  },
] as const;

const TTC_FAQS: readonly QA[] = [
  {
    question: "What is a follicular scan?",
    answer:
      "A follicular scan is an ultrasound that tracks the follicle, the small fluid sac in the ovary that holds an egg, as it grows through your cycle. A series of scans shows whether you are ovulating and roughly when, which helps you time sex and tells your doctor whether ovulation needs looking into.",
  },
  {
    question: "When in my cycle are follicular scans done?",
    answer:
      "Usually from the first half of your cycle, a few days apart, until the follicle releases its egg. The exact days depend on the length of your cycle, so your gynaecologist sets them at your first consultation.",
  },
  {
    question: "How long should we try before seeing a doctor?",
    answer:
      "See a doctor if you have not conceived after 12 months of regular unprotected sex, or after 6 months if you are 35 or older. See one sooner if your periods are irregular or absent, or you have a known condition such as PCOS or endometriosis.",
  },
  {
    question: "Should my partner come to the consultations?",
    answer:
      "Your partner is welcome. Fertility depends on both partners, so your gynaecologist may suggest a semen analysis; tests that are not listed in the package are separate from it.",
  },
  {
    question: "Does this package guarantee a pregnancy?",
    answer:
      "No package can. It gives you a clear look at your cycle and ovulation, nutrition advice before pregnancy, and a gynaecologist to explain your next steps.",
  },
];

/* ------------------------------------------------------------ packages */

export const PACKAGES: readonly CarePackage[] = [
  {
    slug: "hormonal-iud-care",
    // Generic wording only: no device or medicine brand, no licensing or
    // efficacy claims (Google Ads healthcare policy; Drugs & Cosmetics Act).
    name: "Hormonal IUD Care",
    tagline: "Care before, during and after your IUD fitting.",
    metaTitle: "Hormonal IUD Fitting in Indiranagar: ₹7,500",
    metaDescription:
      "Hormonal IUD fitting at MyStree, Indiranagar for ₹7,500 all-inclusive: gynaecologist visits before and after, device, fitting and prescribed medicines.",
    leadStrong: "A hormonal IUD fitting at MyStree costs ₹7,500 all-inclusive",
    lead: ", covering a gynaecologist consultation before and after, the device, the fitting, prescribed medication and consumables, in our clinic on 13th Main Road, Indiranagar, Bengaluru.",
    chips: ["Hormonal IUD", "In-clinic, Indiranagar"],
    price: 7500,
    priceDisplay: "₹7,500",
    priceNote: "all-inclusive",
    priceFor: "A hormonal IUD fitting with care before and after.",
    itemsLabel: "Included",
    items: [
      {
        name: "Pre-procedure consultation with gynaecologist",
        detail:
          "Your gynaecologist goes through your periods, health history and what you are looking for, checks whether a hormonal IUD suits you, and explains the fitting and what to expect afterwards.",
      },
      {
        name: "The device",
        detail: "A hormonal intrauterine system: a small T-shaped device placed in the uterus.",
      },
      {
        name: "The fitting",
        detail: "Done by your gynaecologist in a private procedure room at the clinic in Indiranagar.",
      },
      {
        name: "Post-procedure consultation",
        detail:
          "A follow-up visit after the fitting to check that the device is in place, talk through any bleeding or cramps, and answer your questions.",
      },
      { name: "Medication as prescribed by the gynaecologist", detail: "Any medicines your gynaecologist prescribes for the procedure." },
      { name: "Procedure-related consumables", detail: "The sterile instruments and single-use supplies used during the fitting." },
    ],
    steps: [
      {
        title: "Consultation before your fitting",
        text: "Your gynaecologist talks through your periods, health and what you are looking for, checks whether a hormonal IUD suits you, and may examine you or arrange a pregnancy test. You choose a date for the fitting.",
      },
      {
        title: "The fitting",
        text: "In a private procedure room, your gynaecologist places the device in the uterus through the cervix, much like a smear test. It usually takes 15 to 20 minutes from start to finish. Ask your doctor about pain relief beforehand.",
      },
      {
        title: "The first few days",
        text: "Period-like cramps and light bleeding or spotting are common for a few days. Follow your gynaecologist's advice, and ask when you can return to work and exercise.",
      },
      {
        title: "Your follow-up consultation",
        text: "Your gynaecologist checks that the device is in place, shows you how to feel for its threads, and answers anything that has come up since the fitting.",
      },
    ],
    suitsLabel: "Who it may suit",
    suits: [
      { title: "You want long-acting contraception", text: "A hormonal IUD stays in place for several years, with no daily pill to remember." },
      { title: "Your periods are heavy or painful", text: "Your gynaecologist can explain whether a hormonal IUD is an option for you." },
      { title: "You are in perimenopause or menopause", text: "Your gynaecologist can explain whether it fits with your menopause care." },
      { title: "You have had a baby or are breastfeeding", text: "Your gynaecologist advises on timing after birth and while breastfeeding." },
    ],
    terms: [TERMS],
    glanceHeading: "Hormonal IUD care at MyStree, at a glance",
    glanceLead:
      "Hormonal IUD Care is a fixed-price package for having a hormonal IUD fitted at MyStree in Indiranagar, Bengaluru, with a consultation before and after the procedure.",
    facts: [
      {
        term: "What it is",
        value: "A hormonal intrauterine system: a small T-shaped device placed in the uterus that releases a low dose of a progestogen hormone.",
      },
      { term: "Price", value: `₹7,500 all-inclusive. ${TERMS}` },
      { term: "Fitting time", value: "Usually 15 to 20 minutes." },
      { term: "Fitted by", value: "A MyStree gynaecologist, in the clinic's procedure room." },
      { term: "Where", value: `${ADDRESS}.` },
    ],
    whyHeading: "What the package includes",
    stats: [
      { figure: "₹7,500", label: "all-inclusive, for the device, the fitting and both consultations" },
      { figure: "2", label: "gynaecologist consultations, one before and one after your fitting" },
      { figure: "6", label: "things covered by one price, from the device to the consumables" },
    ],
    faqHeading: "Hormonal IUD questions, answered",
    faqs: [
      {
        question: "How much does a hormonal IUD fitting cost at MyStree in Bengaluru?",
        answer:
          "Hormonal IUD Care costs ₹7,500 all-inclusive at MyStree in Indiranagar, Bengaluru. It covers a consultation with a gynaecologist before the procedure, the device, the fitting, a consultation after the procedure, medication as prescribed by the gynaecologist and procedure-related consumables. Terms and conditions apply.",
      },
      {
        question: "What is a hormonal IUD?",
        answer:
          "A hormonal IUD, or intrauterine system, is a small, flexible T-shaped device placed in the uterus that slowly releases a low dose of a progestogen hormone. Your gynaecologist explains what it is used for and whether it suits you.",
      },
      {
        question: "How long does a hormonal IUD stay in place?",
        answer: "Several years. Your gynaecologist will tell you when yours should be checked and replaced.",
      },
      {
        question: "Does the fitting hurt?",
        answer:
          "Many women feel cramping, similar to period pain, while the device is fitted, and it usually settles within minutes to a few days. Your gynaecologist can talk you through pain relief at your consultation.",
      },
      {
        question: "Will it change my periods?",
        answer:
          "Irregular bleeding and spotting are common for the first few months, and periods often change after that. Your gynaecologist explains what to expect for you.",
      },
      {
        question: "Can I get pregnant after the IUD is removed?",
        answer: "Yes. Your gynaecologist can talk to you about planning a pregnancy after removal.",
      },
      {
        question: "What should I watch for after the fitting?",
        answer:
          "Cramps and light bleeding for a few days are expected. Contact the clinic or a doctor promptly if you have severe or worsening pain in your lower abdomen, a fever, unusual or smelly discharge, pain during sex, or you cannot feel the threads.",
      },
      {
        question: "Who should not have a hormonal IUD?",
        answer:
          "It is not suitable during pregnancy, with a current pelvic or sexually transmitted infection, with unexplained vaginal bleeding, or with some cancers. Your gynaecologist checks this at the consultation before your fitting.",
      },
    ],
    closing: "Hormonal IUD care in Indiranagar, at one clear price.",
    image: { src: "/images/packages/hormonal-iud-care-package-indiranagar-bengaluru.webp", width: 960, height: 1335 },
    imageAlt: "Hormonal IUD care at MyStree",
    glanceImage: { src: "/images/packages/woman-seated-reading-phone-after-hormonal-iud-fitting.webp", width: 588, height: 1323 },
    schema: {
      serviceType: "Hormonal IUD fitting",
      procedure: {
        name: "Hormonal intrauterine system fitting",
        alternateName: ["Hormonal IUD fitting", "Hormonal coil fitting"],
        howPerformed: "A gynaecologist places the device in the uterus through the cervix, usually in 15 to 20 minutes.",
      },
    },
    updated: UPDATED,
    updatedDisplay: UPDATED_DISPLAY,
  },

  {
    slug: "mtp-care",
    name: "MTP Care Package",
    tagline: "Guided care, from consultation to follow-up.",
    metaTitle: "MTP Care Package in Indiranagar: ₹7,000 All-Inclusive",
    metaDescription:
      "MTP care at MyStree, Indiranagar under the MTP Act: two gynaecologist visits, two scans, a CBC blood test and prescribed medicines, ₹7,000 all-inclusive.",
    leadStrong: "The MTP Care Package at MyStree costs ₹7,000 all-inclusive",
    lead: ", covering two gynaecologist consultations, two scans, a CBC blood test and medication as prescribed by the gynaecologist. Care is provided under the Medical Termination of Pregnancy Act, and whether it is right for you is decided with your gynaecologist after an assessment.",
    chips: ["Under the MTP Act", "Confidential under the MTP Act", "In-clinic, Indiranagar"],
    price: 7000,
    priceDisplay: "₹7,000",
    priceNote: "all-inclusive",
    priceFor: "Consultation, scans, blood test, prescribed medication and follow-up.",
    itemsLabel: "Included",
    items: [
      {
        name: "2 gynaecologist consultations",
        detail:
          "A first consultation to confirm and date the pregnancy, review your health and talk through your options, and a follow-up consultation to check your recovery and discuss contraception if you would like to.",
      },
      {
        name: "2 scans",
        detail:
          "An ultrasound to confirm that the pregnancy is in the uterus and how far along it is, and a follow-up scan, as your gynaecologist advises.",
      },
      { name: "CBC test", detail: "A complete blood count, to check your haemoglobin and blood counts before treatment." },
      {
        name: "Medication as prescribed by the gynaecologist",
        detail: "Medicines are given only on your gynaecologist's prescription after your assessment, with clear instructions on how to take them.",
      },
    ],
    steps: [
      {
        title: "First consultation, scan and blood test",
        text: "A private consultation with a gynaecologist, an ultrasound to confirm and date the pregnancy, and a CBC test. Your doctor explains your options and whether termination is appropriate and legal in your situation. You can take time to decide.",
      },
      {
        title: "Treatment as your gynaecologist advises",
        text: "If you and your doctor decide to go ahead, you give your written consent and receive treatment and instructions as prescribed, with a number to call if you have questions or concerns.",
      },
      {
        title: "Follow-up consultation and scan",
        text: "Your gynaecologist checks that the treatment is complete and that you are recovering well, and talks through contraception if you want it.",
      },
    ],
    suitsLabel: "Who it is for",
    suits: [
      {
        title: "You are pregnant and considering a termination",
        text: "A gynaecologist assesses your health and how far along the pregnancy is, and explains the options available to you under the law.",
      },
      {
        title: "You want to understand your options first",
        text: "The first consultation is a conversation. You are not committing to anything by booking it.",
      },
      {
        title: "Your privacy matters",
        text: "The MTP Act requires that your name and details are kept confidential. Only your own consent is needed if you are an adult.",
      },
    ],
    terms: [
      TERMS,
      "Termination of pregnancy is provided only within the Medical Termination of Pregnancy Act, 1971 (amended 2021) and its rules, by a registered medical practitioner, after a clinical assessment. Whether it is appropriate, and which method, is decided by your gynaecologist.",
    ],
    notices: [
      "Provided only under the Medical Termination of Pregnancy Act, 1971, after assessment by a registered gynaecologist.",
      "Please do not take medicines to end a pregnancy without a doctor's supervision.",
      PCPNDT,
    ],
    glanceHeading: "MTP care at MyStree, at a glance",
    glanceLead:
      "The MTP Care Package is a fixed-price package of consultations, scans, a blood test and prescribed medication for women considering a medical termination of pregnancy at MyStree in Indiranagar, Bengaluru.",
    facts: [
      { term: "Price", value: `₹7,000 all-inclusive. ${TERMS}` },
      { term: "Includes", value: "2 gynaecologist consultations, 2 scans, a CBC test and medication as prescribed by the gynaecologist." },
      { term: "Law", value: "Medical Termination of Pregnancy Act, 1971, as amended in 2021." },
      { term: "Consent", value: "An adult woman's own written consent. A guardian's consent is needed under 18." },
      { term: "Where", value: `${ADDRESS}.` },
    ],
    whyHeading: "What the package includes",
    stats: [
      { figure: "₹7,000", label: "all-inclusive, for consultations, scans, the blood test and prescribed medication" },
      { figure: "2", label: "gynaecologist consultations, before treatment and at follow-up" },
      { figure: "2", label: "scans, to date the pregnancy and to confirm it is complete" },
    ],
    faqHeading: "MTP questions, answered",
    faqs: [
      {
        question: "How much does the MTP Care Package cost at MyStree?",
        answer:
          "The MTP Care Package costs ₹7,000 all-inclusive at MyStree in Indiranagar, Bengaluru. It covers two gynaecologist consultations, two scans, a CBC test and medication as prescribed by the gynaecologist. Terms and conditions apply.",
      },
      {
        question: "Is medical termination of pregnancy legal in India?",
        answer:
          "Yes, under the Medical Termination of Pregnancy Act, 1971, as amended in 2021. A pregnancy can be terminated up to 20 weeks on the opinion of one registered medical practitioner, and between 20 and 24 weeks for specified categories of women on the opinion of two. Beyond 24 weeks it is allowed only for substantial fetal abnormalities, on the decision of a medical board.",
      },
      {
        question: "Do I need my husband's or family's consent?",
        answer:
          "No. Under the MTP Act, an adult woman's own written consent is enough. If you are under 18, or unable to consent, written consent from a guardian is required.",
      },
      {
        question: "Will my information be kept confidential?",
        answer:
          "Yes. The MTP Act prohibits a registered medical practitioner from revealing the name and other details of a woman whose pregnancy has been terminated, except to a person authorised by law.",
      },
      {
        question: "Why are scans and a blood test needed?",
        answer:
          "The first scan confirms that the pregnancy is inside the uterus and how many weeks along it is, which decides which options are suitable. The CBC checks for anaemia. The follow-up scan, if your doctor advises it, confirms that the treatment is complete.",
      },
      {
        question: "When should I get urgent help afterwards?",
        answer:
          "Get urgent medical help if you soak two or more large pads an hour for two hours in a row, have severe pain that does not ease with the medicines you were given, a fever, foul-smelling discharge, or feel faint. Call the clinic or go to the nearest emergency department.",
      },
      {
        question: "When can I start contraception?",
        answer:
          "Fertility can return within about two weeks, so it is worth starting contraception straight away. Your gynaecologist can talk through the options at your consultation or follow-up.",
      },
    ],
    closing: "MTP care in Indiranagar, with a doctor beside you from consultation to follow-up.",
    image: { src: "/images/packages/mtp-care-package-indiranagar-bengaluru.webp", width: 893, height: 1341 },
    imageAlt: "MTP Care Package at MyStree",
    glanceImage: { src: "/images/packages/woman-seated-quietly-before-consultation.webp", width: 769, height: 1211 },
    schema: {
      serviceType: "Medical termination of pregnancy (MTP) care",
      procedure: { name: "Medical termination of pregnancy", alternateName: ["MTP"] },
    },
    updated: UPDATED,
    updatedDisplay: UPDATED_DISPLAY,
  },

  {
    slug: "care-journey-basic",
    name: "MyStree Care Journey: Basic",
    tagline: "For the ones trying to conceive: start your journey with the right care and guidance.",
    metaTitle: "Trying to Conceive Scans, Indiranagar: ₹2,999",
    metaDescription:
      "MyStree Care Journey Basic in Indiranagar, Bengaluru: 2 gynaecologist consultations, 3 follicular scans and 1 nutrition consultation for ₹2,999.",
    leadStrong: "MyStree Care Journey: Basic costs ₹2,999",
    lead: " and includes two gynaecologist consultations, three follicular scans to track ovulation and one nutrition consultation, for women and couples trying to conceive, at our clinic on 13th Main Road, Indiranagar, Bengaluru.",
    chips: ["Trying to conceive", "Ovulation tracking", "In-clinic, Indiranagar"],
    price: 2999,
    priceDisplay: "₹2,999",
    priceNote: "",
    priceFor: "Ovulation tracking and guidance for the first steps of trying to conceive.",
    itemsLabel: "Included",
    items: TTC_ITEMS,
    steps: TTC_STEPS,
    suitsLabel: "Who it suits",
    suits: [
      { title: "You are starting to try, or have been trying for a while", text: "You want to know whether and when you ovulate rather than relying on an app." },
      { title: "Your cycles are irregular", text: "Follicular scans show what your ovaries are doing across a cycle." },
      {
        title: "You want to prepare your body for pregnancy",
        text: "A nutrition consultation helps you eat well before pregnancy. For a wider fertility evaluation, see our fertility clinic.",
      },
    ],
    terms: [TERMS, "Tests not listed in the package, such as blood tests or a semen analysis, are separate from it if your gynaecologist advises them."],
    notices: [PCPNDT],
    glanceHeading: "Care Journey: Basic, at a glance",
    glanceLead:
      "Care Journey: Basic is a fixed-price package for women and couples trying to conceive, combining gynaecologist consultations, ovulation tracking by ultrasound and nutrition advice at MyStree in Indiranagar, Bengaluru.",
    facts: [
      { term: "Price", value: `₹2,999. ${TERMS}` },
      { term: "Includes", value: "2 gynaecologist consultations, 3 follicular scans and 1 nutrition consultation." },
      { term: "Scans", value: "Ultrasound follicular monitoring across one cycle, on days your gynaecologist sets." },
      { term: "Where", value: `${ADDRESS}.` },
    ],
    whyHeading: "Why start your journey at MyStree?",
    stats: [
      { figure: "₹2,999", label: "for consultations, scans and nutrition advice together" },
      { figure: "3", label: "follicular scans across one cycle" },
      { figure: "2", label: "gynaecologist consultations, to plan and to review" },
    ],
    faqHeading: "Trying to conceive, answered",
    faqs: [
      {
        question: "How much does the Care Journey Basic package cost?",
        answer:
          "MyStree Care Journey: Basic costs ₹2,999 at MyStree in Indiranagar, Bengaluru. It includes 2 gynaecologist consultations, 3 follicular scans and 1 nutrition consultation. Terms and conditions apply.",
      },
      ...TTC_FAQS,
      {
        question: "What is the difference between Basic and Bloom?",
        answer:
          "Both include 2 gynaecologist consultations, 3 follicular scans and 1 nutrition consultation. Bloom, at ₹4,999, adds one yoga or fitness session of your choice and one dermatology consultation.",
      },
    ],
    closing: "Start trying to conceive with the right care, in Indiranagar.",
    image: { src: "/images/packages/trying-to-conceive-package-indiranagar-bengaluru.webp", width: 990, height: 1376 },
    imageAlt: "MyStree Care Journey: Basic",
    glanceImage: { src: "/images/packages/woman-journalling-ovulation-tracking.webp", width: 1093, height: 1297 },
    schema: {
      serviceType: "Preconception care and follicular monitoring",
      procedure: { name: "Follicular monitoring (ovulation ultrasound)", alternateName: ["Follicular study", "Follicle tracking"] },
    },
    updated: UPDATED,
    updatedDisplay: UPDATED_DISPLAY,
  },

  {
    slug: "care-journey-bloom",
    name: "MyStree Care Journey: Bloom",
    tagline: "More support for your journey, all in one place.",
    metaTitle: "Care Journey Bloom, Indiranagar: 5-Care Plan ₹4,999",
    metaDescription:
      "Care Journey Bloom in Indiranagar, Bengaluru: 2 gynaecologist visits, 3 follicular scans, nutrition, yoga or fitness and dermatology for ₹4,999.",
    leadStrong: "MyStree Care Journey: Bloom costs ₹4,999",
    lead: " and brings together two gynaecologist consultations, three follicular scans, a nutrition consultation, a yoga or fitness session of your choice and a dermatology consultation, at our clinic on 13th Main Road, Indiranagar, Bengaluru.",
    chips: ["Trying to conceive", "Five kinds of care", "In-clinic, Indiranagar"],
    price: 4999,
    priceDisplay: "₹4,999",
    priceNote: "",
    priceFor: "Ovulation tracking, nutrition, movement and skin care in one package.",
    itemsLabel: "Included",
    items: [
      ...TTC_ITEMS,
      {
        name: "1 session of your choice: yoga or fitness",
        detail: "One yoga or fitness session, whichever you prefer, to help you move in a way that suits your body while you are trying to conceive.",
      },
      {
        name: "1 dermatology consultation",
        detail:
          "A consultation with our dermatologist for skin or hair concerns such as acne, hair fall or pigmentation, which are common with hormonal conditions like PCOS.",
      },
    ],
    steps: [
      ...TTC_STEPS.slice(0, 3),
      {
        title: "Yoga or fitness, and dermatology",
        text: "One movement session of your choice, and a consultation with our dermatologist for any skin or hair concerns.",
      },
      TTC_STEPS[3],
    ],
    suitsLabel: "Who it suits",
    suits: [
      { title: "You want care for more than one thing at once", text: "Cycle tracking, food, movement and skin, arranged at one clinic." },
      { title: "You have PCOS or hormonal skin and hair changes", text: "A dermatology consultation sits alongside your gynaecology and nutrition care." },
      { title: "You want to start moving more", text: "Choose a yoga or fitness session as part of your plan." },
    ],
    terms: [TERMS, "Tests not listed in the package, such as blood tests or a semen analysis, are separate from it if your gynaecologist advises them."],
    notices: [PCPNDT],
    glanceHeading: "Care Journey: Bloom, at a glance",
    glanceLead:
      "Care Journey: Bloom is a fixed-price package for women and couples trying to conceive, with gynaecology, ovulation scans, nutrition, a yoga or fitness session and dermatology at MyStree in Indiranagar, Bengaluru.",
    facts: [
      { term: "Price", value: `₹4,999. ${TERMS}` },
      {
        term: "Includes",
        value: "2 gynaecologist consultations, 3 follicular scans, 1 nutrition consultation, 1 yoga or fitness session and 1 dermatology consultation.",
      },
      { term: "Scans", value: "Ultrasound follicular monitoring across one cycle, on days your gynaecologist sets." },
      { term: "Where", value: `${ADDRESS}.` },
    ],
    whyHeading: "Why bloom with MyStree?",
    stats: [
      { figure: "₹4,999", label: "for five kinds of care in one package" },
      { figure: "3", label: "follicular scans across one cycle" },
      { figure: "5", label: "specialties: gynaecology, scans, nutrition, movement and dermatology" },
    ],
    faqHeading: "Care Journey: Bloom, answered",
    faqs: [
      {
        question: "How much does the Care Journey Bloom package cost?",
        answer:
          "MyStree Care Journey: Bloom costs ₹4,999 at MyStree in Indiranagar, Bengaluru. It includes 2 gynaecologist consultations, 3 follicular scans, 1 nutrition consultation, 1 yoga or fitness session of your choice and 1 dermatology consultation. Terms and conditions apply.",
      },
      ...TTC_FAQS,
      {
        question: "What is the difference between Bloom and Basic?",
        answer:
          "Basic, at ₹2,999, includes 2 gynaecologist consultations, 3 follicular scans and 1 nutrition consultation. Bloom adds one yoga or fitness session of your choice and one dermatology consultation.",
      },
    ],
    closing: "More support for your journey, all in one clinic in Indiranagar.",
    image: { src: "/images/packages/care-journey-bloom-couple-indiranagar-bengaluru.webp", width: 1136, height: 1379 },
    imageAlt: "MyStree Care Journey: Bloom",
    glanceImage: { src: "/images/packages/yoga-for-women-trying-to-conceive.webp", width: 874, height: 1088 },
    schema: {
      serviceType: "Preconception care, follicular monitoring, nutrition, yoga and dermatology",
      procedure: { name: "Follicular monitoring (ovulation ultrasound)", alternateName: ["Follicular study", "Follicle tracking"] },
    },
    updated: UPDATED,
    updatedDisplay: UPDATED_DISPLAY,
  },

  {
    slug: "nutrition-care-3-months",
    name: "MyStree Nutrition Care: 3 Month Journey",
    tagline: "Not just a diet plan. A complete 3-month nutrition journey with you every step of the way.",
    metaTitle: "3-Month Nutrition Programme, Indiranagar: ₹14,999",
    metaDescription:
      "MyStree 3-month Nutrition Care in Indiranagar, Bengaluru: full assessment, 6 personalised diet plans, 6 follow-ups and WhatsApp support for ₹14,999.",
    leadStrong: "MyStree Nutrition Care costs ₹14,999 for 3 months",
    lead: ": a detailed assessment, 6 personalised diet plans, 6 follow-up sessions, phone and WhatsApp support throughout and an end-of-journey review with our nutritionist in Indiranagar, Bengaluru. Your food, your body and your health goals, brought together in one plan.",
    chips: ["3 months", "6 plans, 6 follow-ups", "In-clinic, Indiranagar"],
    price: 14999,
    priceDisplay: "₹14,999",
    priceNote: "for 3 months",
    priceFor: "A complete 3-month nutrition journey with a MyStree nutritionist.",
    itemsLabel: "What's included",
    items: [
      {
        name: "01 Start with you",
        points: [
          "Detailed nutrition and lifestyle assessment",
          "24-hour dietary recall",
          "BMI assessment",
          "Body measurements and a progress baseline",
          "Your health history, lifestyle, preferences and goals",
          "Review of existing blood reports and health conditions",
        ],
      },
      {
        name: "02 Your personalised nutrition plan",
        points: [
          "6 personalised diet plans across 3 months",
          "Plans adapted to your health conditions, lifestyle, food preferences and progress",
          "Practical meal options that fit your everyday routine",
          "Adjustments as your needs change, because your first plan shouldn't have to be your last",
        ],
      },
      {
        name: "03 Regular follow-ups",
        points: [
          "6 personalised follow-up sessions",
          "Review of food intake, challenges, energy, digestion, hunger, consistency and progress",
          "BMI and body-measurement tracking",
          "Diet changes based on how you are responding",
        ],
      },
      {
        name: "04 Ongoing support",
        points: [
          "Regular guidance and support over phone and WhatsApp throughout the 3 months",
          "Help with food choices, meal planning and everyday nutrition decisions",
          "Someone to check in with when you're unsure what to eat or how to handle a situation",
        ],
      },
      {
        name: "05 Health-focused nutrition",
        detail: "If you are managing a health condition, nutrition becomes more than weight. Where clinically appropriate:",
        points: [
          "Relevant baseline investigations and reports are reviewed",
          "Nutrition goals are set around your health markers",
          "Your progress is monitored over the 3 months",
          "Relevant tests may be repeated at the end of the programme to review changes",
        ],
      },
      {
        name: "06 End-of-journey review",
        detail: "At the end of 3 months, we look beyond the weighing scale:",
        points: [
          "Changes in body measurements",
          "Nutrition and lifestyle consistency",
          "Symptoms and wellbeing",
          "Relevant health markers",
          "What has changed, and what still needs attention",
          "Your next-step nutrition plan",
        ],
      },
    ],
    steps: [
      {
        title: "Start with you",
        text: "A detailed assessment of what you eat, your lifestyle, health history, measurements and any reports you already have.",
      },
      {
        title: "Your first personalised plan",
        text: "A diet plan built around your health, routine and the food you like, with practical meal options.",
      },
      {
        title: "Follow-ups and new plans across 3 months",
        text: "Six follow-up sessions and six plans in all, adjusted to how you are doing, with phone and WhatsApp support in between.",
      },
      {
        title: "End-of-journey review",
        text: "A look at your measurements, consistency, wellbeing and relevant health markers, and a plan for what comes next.",
      },
    ],
    suitsLabel: "Who it suits",
    suits: [
      { title: "You are managing PCOS, thyroid or blood sugar", text: "Your plan is set around your health markers, in coordination with your doctor where needed." },
      { title: "You want lasting change, not a crash diet", text: "Plans change with you over three months instead of one chart to follow forever." },
      {
        title: "You are planning a pregnancy, breastfeeding or in midlife",
        text: "Nutrition is adapted to your life stage and what your body needs now.",
      },
    ],
    terms: [
      TERMS,
      "Investigations and tests are based on individual requirements and are not necessarily included in the package fee.",
      "Medical conditions and laboratory results are managed in coordination with the treating physician where required.",
    ],
    glanceHeading: "Nutrition Care, at a glance",
    glanceLead:
      "MyStree Nutrition Care is a 3-month personalised nutrition programme at MyStree in Indiranagar, Bengaluru: 3 months, 6 plans, 6 follow-ups and one continuous support system.",
    facts: [
      { term: "Price", value: `₹14,999 for 3 months. ${TERMS}` },
      { term: "Includes", value: "Assessment, 6 personalised diet plans, 6 follow-up sessions, phone and WhatsApp support and an end-of-journey review." },
      { term: "Tests", value: "Based on individual requirements; not necessarily included in the package fee." },
      { term: "Where", value: `${ADDRESS}.` },
    ],
    whyHeading: "What the package includes",
    stats: [
      { figure: "3", label: "months of continuous support" },
      { figure: "6", label: "personalised diet plans, adjusted as you go" },
      { figure: "6", label: "follow-up sessions with your nutritionist" },
    ],
    faqHeading: "Nutrition Care, answered",
    faqs: [
      {
        question: "How much does the 3-month Nutrition Care programme cost?",
        answer:
          "MyStree Nutrition Care costs ₹14,999 for 3 months at MyStree in Indiranagar, Bengaluru. It includes a detailed assessment, 6 personalised diet plans, 6 follow-up sessions, phone and WhatsApp support and an end-of-journey review. Terms and conditions apply.",
      },
      {
        question: "Are blood tests included?",
        answer:
          "Not necessarily. Investigations and tests are based on individual requirements and are not necessarily included in the package fee. Existing reports are reviewed as part of your assessment.",
      },
      {
        question: "Is this only for weight loss?",
        answer:
          "No. Plans are built around your health goals, which may include PCOS, thyroid, blood sugar, digestion, energy, pregnancy planning or menopause, as well as weight.",
      },
      {
        question: "Will I have to give up the food I usually eat?",
        answer:
          "No. Plans are built around your food preferences and routine, with practical meal options rather than a fixed chart.",
      },
      {
        question: "How do the follow-ups and support work?",
        answer:
          "You have 6 follow-up sessions over the 3 months, where your plan is reviewed and adjusted, and guidance over phone and WhatsApp in between when you are unsure what to eat.",
      },
      {
        question: "I have a medical condition. Is that a problem?",
        answer:
          "No. Medical conditions and laboratory results are managed in coordination with your treating physician where required, and your nutrition goals are set around your health markers.",
      },
    ],
    closing: "Three months, six plans, six follow-ups, in Indiranagar.",
    image: { src: "/images/packages/three-month-nutrition-programme-indiranagar-bengaluru.webp", width: 870, height: 1355 },
    imageAlt: "MyStree Nutrition Care",
    glanceImage: { src: "/images/packages/woman-eating-fruit-healthy-snack.webp", width: 560, height: 1360 },
    schema: {
      serviceType: "Personalised nutrition counselling programme",
      about: [{ type: "MedicalTherapy", name: "Medical nutrition therapy" }],
    },
    updated: UPDATED,
    updatedDisplay: UPDATED_DISPLAY,
  },
];

export function getPackage(slug: string) {
  return PACKAGES.find((pkg) => pkg.slug === slug);
}
