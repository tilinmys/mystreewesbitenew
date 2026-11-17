import type { Metadata } from "next";

import { ServiceAsk } from "@/components/services/service-ask";
import { ServiceBand } from "@/components/services/service-band";
import { ServiceClosing } from "@/components/services/service-closing";
import { ServiceConditions } from "@/components/services/service-conditions";
import { ServiceFacts } from "@/components/services/service-facts";
import { ServiceFaq } from "@/components/services/service-faq";
import { ServiceFit } from "@/components/services/service-fit";
import { ServiceHero } from "@/components/services/service-hero";
import { ServiceInsight } from "@/components/services/service-insight";
import { ServiceModel } from "@/components/services/service-model";
import { ServiceQuestions } from "@/components/services/service-questions";
import { ServiceQuote } from "@/components/services/service-quote";
import { ServiceReading } from "@/components/services/service-reading";
import { ServiceSpecialists } from "@/components/services/service-specialists";
import { ServiceStat } from "@/components/services/service-stat";
import { ServiceSteps } from "@/components/services/service-steps";
import styles from "@/components/services/service-page.module.css";
import { getArticles } from "@/lib/cms";
import { SITE_URL, clinic } from "@/lib/clinic";
import { getDoctors } from "@/lib/doctors-repository";
import { CLINIC_ID, breadcrumbNode, clinicNode, clinicianRef, faqNode } from "@/lib/service-schema";

/*
 * Pre-Natal & High-Risk Pregnancy Clinic — /services/prenatal.
 *
 * The locked service-page template (color.md) with pregnancy content. The
 * route is kept: the navbar, footer and sitemap already link it. The
 * previous design of this page is retired; its components in
 * components/prenatal/ are no longer used by any route.
 *
 * Content rules applied to the supplied brief:
 *   - no "98% report reduced anxiety" figure, no patient testimonials or
 *     star ratings, no comparison with other clinics' appointment lengths
 *     (NMC notice, 06.10.2026); the opening quote is Dr. Smitha A.P's own
 *     words from her record in lib/doctors.ts
 *   - named partner hospitals and "admission privileges" are not stated:
 *     the repository records only that delivery is planned at a tertiary
 *     hospital in Bengaluru; the brief also names competitor hospitals
 *   - no in-clinic NST or emergency-desk claims; urgent symptoms are sent to
 *     the nearest hospital emergency department, which is the safe advice
 *   - fees and consultation length come from the booking system via the
 *     specialist cards, not the brief (visits are 15 minutes, confirmed 17 Nov 2026)
 *   - address and contact details are the repository's; the brief's second
 *     floor, 560061, parking, valet and metro distance are not confirmed
 *   - the pricing pathways are not built: no prenatal package is in the
 *     clinic's package list, so section 09 is skipped
 */

const PAGE_PATH = "/services/prenatal";

export const metadata: Metadata = {
  // The root layout appends "| MyStree".
  title: "Pregnancy & High-Risk Pregnancy Care in Indiranagar, Bengaluru",
  description:
    "Antenatal and high-risk pregnancy care in Indiranagar, Bengaluru: senior obstetricians, NT and anomaly scan planning, gestational diabetes and blood pressure care, nutrition, pelvic physiotherapy and delivery planning.",
  alternates: { canonical: `${SITE_URL}${PAGE_PATH}` },
  openGraph: {
    title: "Pregnancy & High-Risk Pregnancy Care in Indiranagar, Bengaluru | MyStree",
    description:
      "Unhurried antenatal care from the first scan to delivery planning, with obstetrics, nutrition and pelvic physiotherapy in one clinic.",
    url: `${SITE_URL}${PAGE_PATH}`,
    type: "website",
    siteName: "MyStree Women's Health Clinic",
  },
};

/*
 * Section 11 (local questions): what expecting mothers ask before choosing
 * an obstetrician in Indiranagar. Repository facts only; safety first on
 * urgent symptoms.
 */
const LOCAL_QUESTIONS = [
  {
    question: "What happens at the first pregnancy visit at MyStree?",
    answer:
      "Your obstetrician reviews your medical and pregnancy history, works out your due date, checks your blood pressure and weight, goes through nutrition and any medicines, and plans an early viability scan and your first blood and urine tests. It is also the time to ask every question you have.",
  },
  {
    question: "Where will my baby be delivered?",
    answer:
      "MyStree is an outpatient clinic, so your antenatal visits happen in Indiranagar and the birth takes place in hospital. Your obstetrician plans the delivery with you, well before your due date, at a hospital in Bengaluru suited to your pregnancy and any extra care it may need.",
  },
  {
    question: "How is a high-risk pregnancy looked after?",
    answer:
      "A pregnancy is treated as higher risk when there is, for example, maternal age over 35, diabetes, high blood pressure, a thyroid disorder, twins, an IVF pregnancy or a history of pregnancy loss. Care then includes more frequent visits, growth and Doppler scans where needed, and nutrition support, led by high-risk obstetrician Dr. Smitha A.P.",
  },
  {
    question: "What should I do if I have urgent symptoms in pregnancy?",
    answer:
      "Go to the nearest hospital emergency department straight away for heavy bleeding, fluid leaking from the vagina, a severe headache or blurred vision, sudden swelling of the face or hands, severe tummy pain, fits, or if your baby is moving less than usual. For non-urgent questions, call or message the clinic on +91 63665 73772.",
  },
  {
    question: "Do you offer pregnancy nutrition and physiotherapy?",
    answer:
      "Yes. Nutrition consultant Priyanka Savina supports eating well in pregnancy, gestational diabetes and breastfeeding, and women's health physiotherapist Dr. Jasmine Flora helps with pelvic girdle pain, posture and preparing the body for birth.",
  },
  {
    question: "Where is MyStree in Indiranagar?",
    answer:
      "MyStree is at No. 3366, 13th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru 560008, a short distance from 100 Feet Road and easy to reach from Domlur, Jeevan Bhima Nagar, HAL and Old Airport Road. Book online or message the care team on WhatsApp at +91 63665 73772.",
  },
] as const;

/*
 * Section 08 FAQ: pregnancy questions women search, answered to current
 * guidance (FMF and ISUOG on scan timing, the Government of India's GDM
 * guideline on the 75 g OGTT, WHO on antenatal care, RCOG on VBAC).
 */
const PRENATAL_FAQS = [
  {
    question: "When is the NT scan done?",
    answer:
      "The NT (nuchal translucency) scan is done between 11 weeks and 13 weeks 6 days of pregnancy. It measures the fluid at the back of the baby's neck and, combined with a blood test (the double marker), estimates the chance of conditions such as Down syndrome.",
  },
  {
    question: "What is the anomaly scan and when is it done?",
    answer:
      "The anomaly scan, also called the level II or TIFFA scan, is a detailed ultrasound done at about 18 to 20 weeks. It checks the baby's brain, face, spine, heart, abdomen and limbs, the placenta and the fluid around the baby. Sex determination of the foetus is prohibited by law in India and is never done.",
  },
  {
    question: "When is the test for gestational diabetes done?",
    answer:
      "In India, a 75 g oral glucose tolerance test is recommended at the first antenatal visit and repeated at 24 to 28 weeks if the first result is normal. A two-hour value of 140 mg/dL or more means gestational diabetes, which is managed with diet, activity and, if needed, medicine.",
  },
  {
    question: "How often will I see my obstetrician during pregnancy?",
    answer:
      "Typically about once a month until 28 weeks, every two weeks until 36 weeks, and then every week until birth. Higher-risk pregnancies are seen more often, depending on what needs watching.",
  },
  {
    question: "Is pregnancy after 35 high risk?",
    answer:
      "Pregnancy after 35 carries a higher chance of chromosomal conditions, gestational diabetes and high blood pressure, so it is monitored more closely. Most women over 35 have healthy pregnancies, and screening options such as the combined test or NIPT are discussed early.",
  },
  {
    question: "Can I have a normal delivery after a caesarean?",
    answer:
      "Often, yes. Many women with one previous caesarean can plan a vaginal birth after caesarean (VBAC), depending on why the caesarean was done, the type of scar, the time since that birth and how this pregnancy is going. Your obstetrician discusses the benefits and risks with you during pregnancy.",
  },
  {
    question: "When should pre-pregnancy nutrition guidance start?",
    answer:
      "Ideally three months, and at least one month, before trying to conceive. Your doctor will advise which supplements you need and the right dose for you, which can differ with diabetes, epilepsy or a previous pregnancy affected by a neural tube defect.",
  },
  {
    question: "Which symptoms in pregnancy should never be ignored?",
    answer:
      "Bleeding, fluid leaking, severe headache, blurred vision, sudden swelling, severe abdominal pain, fever, fits and reduced baby movements all need urgent medical attention. Go to the nearest hospital emergency department rather than waiting for your next appointment.",
  },
] as const;

const PRENATAL_READING_SLUGS = ["pregnancy-after-35-prepare-dont-panic", "birth-doula-guide-bangalore"] as const;

function generateStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      clinicNode(),
      {
        "@type": "MedicalWebPage",
        "@id": `${SITE_URL}${PAGE_PATH}#page`,
        url: `${SITE_URL}${PAGE_PATH}`,
        name: "Pregnancy & High-Risk Pregnancy Care in Indiranagar, Bengaluru | MyStree",
        description: metadata.description,
        inLanguage: "en-IN",
        isPartOf: { "@id": CLINIC_ID },
        about: { "@id": `${SITE_URL}${PAGE_PATH}#service` },
        breadcrumb: { "@id": `${SITE_URL}${PAGE_PATH}#breadcrumb` },
      },
      {
        "@type": "MedicalService",
        "@id": `${SITE_URL}${PAGE_PATH}#service`,
        name: "Antenatal and High-Risk Pregnancy Care",
        serviceType: [
          "Antenatal consultation",
          "High-risk pregnancy care",
          "Early pregnancy and viability assessment",
          "NT and anomaly scan planning",
          "Gestational diabetes care",
          "Pregnancy blood pressure and thyroid care",
          "Pregnancy nutrition",
          "Pregnancy pelvic physiotherapy",
          "Delivery planning",
        ],
        provider: { "@id": CLINIC_ID },
        employee: [
          clinicianRef("dr-smitha-ap", "Dr. Smitha A.P"),
          clinicianRef("dr-surbhi-sinha", "Dr. Surbhi Sinha"),
          clinicianRef("priyanka-savina", "Priyanka Savina"),
          clinicianRef("dr-jasmine-flora", "Dr. Jasmine Flora"),
        ],
        areaServed: {
          "@type": "City",
          name: clinic.city,
          containsPlace: { "@type": "Place", name: clinic.locality },
        },
      },
      faqNode(PAGE_PATH, [...PRENATAL_FAQS, ...LOCAL_QUESTIONS]),
      breadcrumbNode(PAGE_PATH, "Pre-Natal Clinic"),
    ],
  };
}

export default async function PrenatalPage() {
  const reading = await getArticles(PRENATAL_READING_SLUGS);
  const jsonLd = generateStructuredData();
  // Bylines link to each author's profile.
  const authorProfiles = Object.fromEntries(
    (await getDoctors()).map((doctor) => [doctor.name, `/doctors/${doctor.slug}`]),
  );

  return (
    <main className={styles.pageRoot}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <ServiceBand>
        <ServiceHero
          image={{ src: "/images/services/pages/pregnancy-ultrasound-scan-indiranagar-bengaluru.webp", alt: "A pregnant woman and her husband watch the screen during an ultrasound" }}
          headingId="prenatal-hero-heading"
          title="Pregnancy and high-risk pregnancy care in Indiranagar"
          lead="Antenatal care from your first scan to delivery planning, with senior obstetricians, nutrition and pelvic physiotherapy in one clinic on 13th Main Road, Indiranagar."
          primaryCta={{ label: "Book a pregnancy consultation", href: "/book" }}
          secondaryCta={{ label: "Call the clinic", href: "tel:+916366573772" }}
        />
        <ServiceQuote
          quote="A high-risk diagnosis should never mean living in fear. At our Indiranagar clinic, scans and evidence-based medicine come with clear explanations, and clinical decisions are made openly and together."
          name="Dr. Smitha A.P"
        />
      </ServiceBand>

      <ServiceStat
        headingId="prenatal-stat-heading"
        heading="Pregnancy care in Indiranagar, step by step."
        figure="23 years"
        caption="of obstetric experience behind Dr. Smitha A.P's care, 15 of them as a specialist."
      />

      <ServiceConditions
        headingId="prenatal-conditions-heading"
        heading="Pregnancy conditions we care for"
        conditions={[
          "Antenatal and breastfeeding preparation",
          "Cervical insufficiency",
          "Fetal growth restriction",
          "Gestational diabetes",
          "High blood pressure and preeclampsia",
          "Pelvic girdle pain in pregnancy",
          "Pre-conception planning",
          "Pregnancy after 35",
          "Previous caesarean (VBAC counselling)",
          "Recurrent pregnancy loss",
          "Thyroid disorders in pregnancy",
          "Twin pregnancy",
        ]}
        cta={{ label: "Book a pregnancy consultation", href: "/book" }}
      />

      <ServiceInsight
        image={{ src: "/images/services/pages/pregnant-woman-reading-scan-report.webp", alt: "A pregnant woman reads her scan report at home" }}
        headingId="prenatal-insight-heading"
        heading="Why pregnancy concerns are sometimes missed"
        body="Pregnancy changes every system in the body, and short appointments leave little time to talk through results, symptoms and worries."
        points={[
          "Small rises in blood pressure, slower growth or rising sugar levels are easier to catch with time to review trends",
          "Pelvic pain, nutrition and the emotional weight of a high-risk pregnancy deserve care alongside the scans",
          "A delivery plan works best when it is built around your own medical history",
        ]}
      />

      <ServiceModel
        headingId="prenatal-model-heading"
        heading="A physician-led approach to pregnancy"
        body="Pregnancy care at MyStree is led by high-risk obstetrician Dr. Smitha A.P, with Dr. Surbhi Sinha for early pregnancy, nutritionist Priyanka Savina and pelvic physiotherapist Dr. Jasmine Flora. Every scan, result and milestone is reviewed with you, and your delivery is planned at a hospital suited to your pregnancy."
        link={{ label: "Meet our doctors", href: "/doctors" }}
      />

      <ServiceFit
        headingId="prenatal-fit-heading"
        heading="Our pregnancy care is right for you if you have"
        items={[
          { icon: "monitor", label: "High blood pressure, diabetes, a thyroid condition or an IVF pregnancy" },
          { icon: "branch", label: "A previous miscarriage, preterm birth or difficult delivery" },
          { icon: "conversation", label: "Questions that need more than a rushed appointment" },
          { icon: "pregnancy", label: "A wish for physiotherapy and nutrition alongside your obstetric care" },
        ]}
      />

      <ServiceFacts
        headingId="prenatal-facts-heading"
        eyebrow="At a glance"
        heading="What every pregnancy visit at MyStree is built on"
        facts={[
          { figure: "40 weeks", label: "of care, from the first scan to delivery planning" },
          { figure: "4", label: "specialists in one clinic: obstetrics, early pregnancy, nutrition and pelvic physiotherapy" },
          { figure: "Mon–Sat", label: "9 am to 8 pm at the Indiranagar clinic" },
        ]}
      />

      <ServiceFaq
        headingId="prenatal-faq-heading"
        heading="Frequently asked questions"
        items={PRENATAL_FAQS}
        allLink={{ label: "See all FAQs", href: "/faqs" }}
      />

      <ServiceAsk
        headingId="prenatal-ask-heading"
        heading="Worried about a symptom right now?"
        note="Bleeding, severe pain in your tummy, fluid leaking, a severe headache or blurred vision, or your baby moving less than usual: go to the nearest hospital emergency department or call 112, and do not wait for an appointment. For anything else, message our care team on WhatsApp."
        whatsapp={{
          label: "Chat on WhatsApp",
          href: "https://wa.me/916366573772?text=Hi%20MyStree%2C%20I%20have%20a%20question%20about%20pregnancy%20care.",
        }}
        faqs={{ label: "Read the FAQs", href: "/faqs" }}
      />

      <ServiceQuestions
        image={{ src: "/images/services/pages/pregnant-woman-walking-in-park-bengaluru.webp", alt: "A pregnant woman walking in a park with her husband in the morning" }}
        headingId="prenatal-questions-heading"
        heading="Pregnancy care in Indiranagar"
        questions={LOCAL_QUESTIONS}
      />

      <ServiceSteps
        image={{ src: "/images/services/pages/antenatal-blood-pressure-check.webp", alt: "A nurse checks a pregnant woman's blood pressure" }}
        headingId="prenatal-steps-heading"
        heading="Your pregnancy, stage by stage"
        steps={[
          {
            title: "Weeks 0 to 12",
            text: "Dating and NT scans, screening blood tests, blood pressure and thyroid checks.",
          },
          {
            title: "Weeks 13 to 27",
            text: "The anomaly scan, a gestational diabetes test, nutrition and pelvic floor care.",
          },
          {
            title: "Weeks 28 to 36",
            text: "Growth and Doppler scans as needed, closer care if higher risk, a birth plan.",
          },
          {
            title: "Weeks 37 to 40",
            text: "Readiness checks, hospital planning, and a plan for recovery and feeding.",
          },
        ]}
        cta={{ label: "Book a pregnancy consultation", href: "/book" }}
      />

      <ServiceSpecialists
        headingId="prenatal-specialists-heading"
        heading="Book a pregnancy consultation"
        lead="Times shown are live from the MyStree booking system. Choose the doctor and time that suit you."
        consultationLabel="Clinic consultation"
        specialists={[
          {
            bookingId: 2,
            tag: "High-risk obstetrics",
            focus: ["High-risk pregnancy", "Gestational diabetes"],
            profileHref: "/doctors/dr-smitha-ap",
          },
          {
            bookingId: 1,
            tag: "Obstetrics",
            focus: ["Early pregnancy", "Pregnancy loss"],
            profileHref: "/doctors/dr-surbhi-sinha",
          },
          {
            bookingId: 3,
            tag: "Nutrition",
            focus: ["Pregnancy nutrition", "Nutrition after birth"],
            profileHref: "/doctors/priyanka-savina",
          },
          {
            bookingId: 7,
            tag: "Pelvic physiotherapy",
            focus: ["Pelvic girdle pain", "Birth preparation"],
            profileHref: "/doctors/dr-jasmine-flora",
          },
        ]}
      />

      <ServiceReading
        headingId="prenatal-reading-heading"
        heading="Reading on pregnancy from our doctors"
        articles={reading}
        allLink={{ label: "All articles", href: "/blog" }}
        authorProfiles={authorProfiles}
      />

      <ServiceClosing
        headingId="prenatal-closing-heading"
        heading="Pregnancy care in Indiranagar with time for every question."
        primary={{ label: "Book a pregnancy consultation", href: "/book" }}
        secondary={{ label: "Meet our doctors", href: "/doctors" }}
      />
    </main>
  );
}
