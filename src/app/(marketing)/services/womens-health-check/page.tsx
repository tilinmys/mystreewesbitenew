import type { Metadata } from "next";
import { ServiceBand } from "@/components/services/service-band";
import { ServiceHero } from "@/components/services/service-hero";
import { ServiceClosing } from "@/components/services/service-closing";
import { ServiceConditions } from "@/components/services/service-conditions";
import { ServiceFacts } from "@/components/services/service-facts";
import { ServiceFaq } from "@/components/services/service-faq";
import { ServiceAsk } from "@/components/services/service-ask";
import { ServiceFit } from "@/components/services/service-fit";
import { ServiceInsight } from "@/components/services/service-insight";
import { ServiceModel } from "@/components/services/service-model";
import { ServiceQuestions } from "@/components/services/service-questions";
import { ServiceQuote } from "@/components/services/service-quote";
import { ServiceReading } from "@/components/services/service-reading";
import { ServiceStat } from "@/components/services/service-stat";
import { ServiceSpecialists } from "@/components/services/service-specialists";
import { ServiceSteps } from "@/components/services/service-steps";
import { getArticles } from "@/lib/cms";
import { SITE_URL, clinic } from "@/lib/clinic";
import { getDoctors } from "@/lib/doctors-repository";
import { CLINIC_ID, breadcrumbNode, clinicNode, clinicianRef, faqNode } from "@/lib/service-schema";
import styles from "@/components/services/service-page.module.css";

const PAGE_PATH = "/services/womens-health-check";

export const metadata: Metadata = {
  title: "Women's Health Check & Pap Smear, Indiranagar",
  description:
    "Preventive women's health check-ups, cervical cancer screening (Pap smear and HPV testing as advised) and clinical breast exams in Indiranagar, Bengaluru.",
  alternates: {
    canonical: `${SITE_URL}${PAGE_PATH}`,
  },
  openGraph: {
    title: "Women's Health Check & Pap Smear in Indiranagar | MyStree",
    description:
      "Routine preventive gynaecology checks, Pap smear cervical screening and breast exams with a gynaecologist on 13th Main Road, Indiranagar.",
    url: `${SITE_URL}${PAGE_PATH}`,
    type: "website",
    siteName: "MyStree Women's Health Clinic",
  },
  twitter: {
    card: "summary_large_image",
    title: "Women's Health Check & Pap Smear in Indiranagar | MyStree",
    description:
      "Preventive gynaecology visits, Pap smear screening and clinical breast examinations in Indiranagar, Bengaluru.",
  },
};

const HEALTH_CHECK_FAQS = [
  {
    question: "When should I start Pap smear and cervical screening?",
    answer:
      "Most guidance in India advises starting cervical screening between the ages of 25 and 30 and repeating it every three to five years, depending on the test used. Screening can be a Pap smear, an HPV test or both, and your gynaecologist will advise the right test and interval for you.",
  },
  {
    question: "How long does a Pap smear take and is it painful?",
    answer:
      "Taking a Pap smear sample usually takes only a few minutes during a gynaecology consultation. Most women feel mild pressure rather than pain, and your doctor explains every step beforehand and stops at any time if you ask.",
  },
  {
    question: "How should I prepare for a Pap smear test?",
    answer:
      "It is best to book your appointment on a day when you do not have your period. Avoid vaginal douching, internal creams, tampons or intercourse for 24 to 48 hours before the visit so the cervical sample is clear.",
  },
  {
    question: "What does a preventive women's health check include?",
    answer:
      "Your gynaecologist starts with a 15-minute consultation covering your periods, medical history and family history. Depending on your age and symptoms, the visit may include cervical screening (Pap smear or HPV test), a clinical breast examination, a pelvic ultrasound or blood tests such as haemoglobin, thyroid and blood sugar.",
  },
  {
    question: "How often should women go for a routine gynaecology check-up?",
    answer:
      "Many women choose an annual gynaecology review even when they feel well, while cervical screening itself is usually spaced every three to five years if earlier results are normal. Your doctor recommends a schedule suited to your age and test results.",
  },
  {
    question: "Do I need a routine check-up if I have no symptoms?",
    answer:
      "Yes, cervical changes and early iron deficiency, thyroid shifts or blood sugar changes often have no symptoms at first. A routine visit gives you a clear baseline and a chance to ask questions in private.",
  },
] as const;

const LOCAL_QUESTIONS = [
  {
    question: "Can I book a Pap smear if I am unmarried or this is my first visit?",
    answer:
      "Yes. MyStree welcomes adult women regardless of marital status, in a private consultation room. Your gynaecologist explains whether cervical screening is advised for your age and goes ahead only after explaining the steps and getting your consent.",
  },
  {
    question: "Which doctors perform women's health checks and Pap smears at MyStree?",
    answer:
      "Preventive checks and Pap smears are carried out by MyStree's obstetricians and gynaecologists, including Dr. Smitha A.P, Dr. Surbhi Sinha, Dr. Isha Shetty and Dr. Raksha M, at our Indiranagar clinic.",
  },
  {
    question: "Can I have a pelvic ultrasound in the same visit if advised?",
    answer:
      "Yes, when a pelvic ultrasound is clinically indicated, it can usually be done in the clinic during your visit so you do not have to travel to a separate scan centre.",
  },
  {
    question: "Where is MyStree located in Indiranagar?",
    answer:
      "MyStree is at No. 3366, 13th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru 560008, a short distance from 100 Feet Road and easy to reach from Domlur, Jeevan Bhima Nagar, HAL and Old Airport Road. Call or WhatsApp us on +91 63665 73772.",
  },
] as const;

const READING_SLUGS = ["perimenopause-symptoms-age-40", "pregnancy-after-35-prepare-dont-panic"] as const;

function generateStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      clinicNode(),
      {
        "@type": "MedicalWebPage",
        "@id": `${SITE_URL}${PAGE_PATH}#page`,
        url: `${SITE_URL}${PAGE_PATH}`,
        name: "Women's Health Check & Pap Smear in Indiranagar, Bengaluru | MyStree",
        description: metadata.description,
        inLanguage: "en-IN",
        isPartOf: { "@id": CLINIC_ID },
        about: { "@id": `${SITE_URL}${PAGE_PATH}#service` },
        breadcrumb: { "@id": `${SITE_URL}${PAGE_PATH}#breadcrumb` },
      },
      {
        "@type": "MedicalService",
        "@id": `${SITE_URL}${PAGE_PATH}#service`,
        name: "Preventive Women's Health Check & Pap Smear Screening",
        serviceType: [
          "Pap smear cervical screening",
          "HPV cervical screening",
          "Preventive gynaecology check-up",
          "Clinical breast examination",
          "Pelvic ultrasound when clinically indicated",
        ],
        provider: { "@id": CLINIC_ID },
        employee: [
          clinicianRef("dr-smitha-ap", "Dr. Smitha A.P"),
          clinicianRef("dr-surbhi-sinha", "Dr. Surbhi Sinha"),
        ],
        areaServed: {
          "@type": "City",
          name: clinic.city,
          containsPlace: { "@type": "Place", name: clinic.locality },
        },
      },
      faqNode(PAGE_PATH, [...LOCAL_QUESTIONS, ...HEALTH_CHECK_FAQS]),
      breadcrumbNode(PAGE_PATH, "Women's Health Check & Pap Smear"),
    ],
  };
}

export default async function WomensHealthCheckPage() {
  const reading = await getArticles(READING_SLUGS);
  const jsonLd = generateStructuredData();
  const authorProfiles = Object.fromEntries(
    (await getDoctors()).map((doctor) => [doctor.name, `/doctors/${doctor.slug}`]),
  );

  return (
    <main className={styles.pageRoot}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ServiceBand>
        <ServiceHero
          image={{
            src: "/images/services/pages/gynaecologist-consultation-indiranagar-bengaluru.webp",
            alt: "A gynaecologist discusses preventive screening options with a woman at MyStree Indiranagar",
          }}
          headingId="health-check-hero-heading"
          title="Women's health check and Pap smear in Indiranagar"
          lead="Preventive gynaecology visits, cervical cancer screening and clinical breast examinations on 13th Main Road, Indiranagar."
          primaryCta={{ label: "Book a health check", href: "/book" }}
          secondaryCta={{
            label: "Talk to the care team",
            href: "https://wa.me/916366573772",
            external: true,
          }}
        />
      </ServiceBand>

      <ServiceSpecialists
        headingId="health-check-doctors-heading"
        heading="Book with a gynaecologist"
        lead="Times shown are live from the MyStree booking system. Choose the doctor and time that suit you."
        consultationLabel="Clinic consultation"
        specialists={[
          {
            bookingId: 1,
            tag: "Preventive gynaecology",
            focus: ["Pap smear", "Routine health checks"],
            profileHref: "/doctors/dr-surbhi-sinha",
          },
          {
            bookingId: 2,
            tag: "Gynaecology",
            focus: ["Annual review", "Midlife screening"],
            profileHref: "/doctors/dr-smitha-ap",
          },
          {
            bookingId: 14,
            tag: "Gynaecology",
            focus: ["Cervical screening", "Cycle health"],
          },
          {
            bookingId: 15,
            tag: "Gynaecology",
            focus: ["Preventive exams", "General gynaecology"],
          },
        ]}
      />

      <ServiceConditions
        headingId="health-check-scope-heading"
        heading="What a preventive visit can cover"
        conditions={[
          "Annual gynaecology consultation",
          "Breast health awareness and clinical breast exam",
          "Cervical cancer screening advice",
          "Hormone and thyroid checks where indicated",
          "HPV test when advised by your doctor",
          "Iron, vitamin D and blood sugar checks where needed",
          "Menstrual cycle and discharge review",
          "Pap smear (cervical cytology)",
          "Pelvic examination only when clinically helpful",
          "Pelvic ultrasound if clinically indicated",
          "Perimenopause baseline review",
          "Pre-pregnancy readiness check",
        ]}
        cta={{ label: "Book a health check", href: "/book" }}
      />

      <ServiceSteps
        image={{
          src: "/images/services/pages/gynaecology-clinic-waiting-area.webp",
          alt: "A woman waiting with her folder in the Indiranagar clinic lounge",
        }}
        headingId="health-check-steps-heading"
        heading="Four steps to your preventive visit"
        steps={[
          {
            title: "Choose a non-period day",
            text: "Book online or on WhatsApp on a day you are not bleeding so cervical screening results are accurate.",
          },
          {
            title: "Bring earlier reports",
            text: "Carry any past Pap smears, scan reports or blood test results if you have them.",
          },
          {
            title: "Talk before any check",
            text: "Your gynaecologist reviews your history first and explains which checks apply to your age before asking your consent.",
          },
          {
            title: "Clear follow-up",
            text: "Your reports are explained plainly along with when your next routine screening falls due.",
          },
        ]}
        cta={{ label: "Book a health check", href: "/book" }}
      />

      <ServiceQuote
        quote="A calm annual check-up lets us explain every screening step clearly before anything is done, so preventive care never feels clinical or rushed."
        name="Dr. Surbhi Sinha"
      />

      <ServiceFit
        headingId="health-check-fit-heading"
        heading="A women's health check is useful if you"
        items={[
          { icon: "cycle", label: "Are aged 25 or over and have never had a Pap smear or cervical check" },
          { icon: "monitor", label: "Have not had a routine gynaecology check-up in the past three years" },
          { icon: "branch", label: "Want an age-appropriate plan for blood work, breast checks and cycle health" },
          { icon: "conversation", label: "Prefer a calm, private conversation before any physical examination" },
        ]}
      />

      <ServiceInsight
        image={{
          src: "/images/services/pages/woman-tracking-menstrual-cycle-on-phone.webp",
          alt: "A woman reviewing her cycle dates on her phone before scheduling a check-up",
        }}
        headingId="health-check-insight-heading"
        heading="Why routine checks are often put off"
        body="Many women book a gynaecologist only when pain or bleeding starts, leaving preventive screening delayed for years out of awkwardness or uncertainty about what happens during the visit."
        points={[
          "Early cervical changes usually cause no pain or warning signs until a screening test checks for them",
          "Knowing every step in advance helps make a Pap smear quick, gentle and straightforward",
          "One tailored conversation prevents unnecessary fixed panels and focuses only on tests relevant to your age",
        ]}
      />

      <ServiceModel
        headingId="health-check-model-heading"
        heading="Preventive care tailored to your stage of life"
        body="At MyStree in Indiranagar, routine checks are performed by our gynaecologists in private rooms with consent at every step. You are never pushed into a blanket check-up panel; your doctor explains which screenings suit your age, medical history and any symptoms."
        link={{ label: "Meet our doctors", href: "/doctors" }}
      />

      <ServiceStat
        headingId="health-check-stat-heading"
        heading="Routine screening checks what symptoms cannot tell you."
        figure="3–5 yrs"
        caption="is the typical cervical screening interval once normal baseline results are established, as guided by your gynaecologist."
      />

      <ServiceFacts
        headingId="health-check-facts-heading"
        eyebrow="At a glance"
        heading="About preventive check-ups at MyStree"
        facts={[
          { figure: "25–30", label: "recommended age range in India to begin routine cervical screening" },
          { figure: "15 min", label: "consultation with your gynaecologist to discuss tests and results" },
          { figure: "Mon–Sat", label: "9 am to 8 pm at No. 3366, 13th Main Road, Indiranagar" },
        ]}
      />

      <ServiceQuestions
        image={{
          src: "/images/services/pages/auto-rickshaw-ride-to-clinic-bengaluru.webp",
          alt: "A woman holding a folder of health reports on her way to the Indiranagar clinic",
        }}
        headingId="health-check-questions-heading"
        heading="Health checks and Pap smears in Indiranagar"
        questions={LOCAL_QUESTIONS}
      />

      <ServiceFaq
        headingId="health-check-faq-heading"
        heading="Frequently asked questions"
        items={HEALTH_CHECK_FAQS}
        allLink={{ label: "See all FAQs", href: "/faqs" }}
      />

      <ServiceAsk
        headingId="health-check-ask-heading"
        heading="Still have questions?"
        note="Message our care team on WhatsApp to ask about timing your visit or preparing for a Pap smear."
        whatsapp={{
          label: "Chat on WhatsApp",
          href: "https://wa.me/916366573772?text=Hi%20MyStree%2C%20I%20would%20like%20to%20ask%20about%20a%20women%27s%20health%20check%20or%20Pap%20smear.",
        }}
        faqs={{ label: "Read the FAQs", href: "/faqs" }}
      />

      <ServiceReading
        headingId="health-check-reading-heading"
        heading="Reading from our doctors"
        articles={reading}
        allLink={{ label: "All articles", href: "/blog" }}
        authorProfiles={authorProfiles}
      />

      <ServiceClosing
        headingId="health-check-closing-heading"
        heading="Clear, gentle preventive care in Indiranagar."
        primary={{ label: "Book a health check", href: "/book" }}
        secondary={{ label: "Meet our doctors", href: "/doctors" }}
      />
    </main>
  );
}
