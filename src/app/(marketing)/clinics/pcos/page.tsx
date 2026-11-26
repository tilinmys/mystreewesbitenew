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
import { ServiceSpecialists } from "@/components/services/service-specialists";
import { ServiceStat } from "@/components/services/service-stat";
import { ServiceSteps } from "@/components/services/service-steps";
import styles from "@/components/services/service-page.module.css";
import { SITE_URL, clinic } from "@/lib/clinic";
import { CLINIC_ID, breadcrumbNode, clinicNode, clinicianRef, faqNode } from "@/lib/service-schema";

/*
 * PCOS and metabolic health — /clinics/pcos (rebuilt 17 Nov 2026).
 *
 * Replaces the old four-card page ("Root-cause diagnosis…") with the locked
 * service-page template. Built from the SEO/AEO/GEO research brief of
 * 16–17 Nov 2026 (SEO.md §5, AEO.md §3, FAQ_DRAFTS.md PCO1–3, NUT3, ADO3,
 * DER2; GEO.md §5): PCOS is the clearest local content gap, and competitors
 * that surface for it explain assessment, metabolic, skin and cycle care,
 * and care for women who are not planning a pregnancy.
 *
 * Content rules:
 *   - no cure, "root cause", "reverse PCOS" or guaranteed-outcome language
 *     (NMC notice, 06.10.2026; Growthamp review, 13.11.2026)
 *   - PCOS is assessed, and thyroid and other causes are ruled out; thyroid
 *     is not presented as part of PCOS
 *   - adolescents are assessed differently (international PCOS guideline,
 *     Monash 2026): no ultrasound or AMH to diagnose PCOS in teens
 *   - fees and qualifications come from the booking system via the
 *     specialist cards, never hard-coded here
 *   - all medical answers are drafts for clinician review
 */

const PAGE_PATH = "/clinics/pcos";

export const metadata: Metadata = {
  // The root layout appends "| MyStree".
  title: "PCOS & PCOD Consultations in Indiranagar, Bengaluru",
  description:
    "PCOS and PCOD care in Indiranagar, Bengaluru: irregular periods, acne, hair growth and metabolic health with gynaecology, nutrition and dermatology.",
  alternates: { canonical: `${SITE_URL}${PAGE_PATH}` },
  openGraph: {
    title: "PCOS & PCOD Consultations in Indiranagar, Bengaluru | MyStree",
    description:
      "Assessment and ongoing care for PCOS: cycles, skin and hair, weight and metabolic health, with gynaecology, nutrition and dermatology in one clinic.",
    url: `${SITE_URL}${PAGE_PATH}`,
    type: "website",
    siteName: "MyStree Women's Health Clinic",
  },
};

const LOCAL_QUESTIONS = [
  {
    question: "What happens at a PCOS consultation at MyStree?",
    answer:
      "Your gynaecologist asks about your periods, skin and hair, weight changes, family history, medicines and what matters most to you, and looks at any reports you bring. They explain whether a scan or blood tests would help, and why, before anything is done. You leave knowing what is likely going on and what the next step is.",
  },
  {
    question: "Do I need to be planning a pregnancy to see someone about PCOS?",
    answer:
      "No. Many women come for irregular periods, acne, unwanted hair, weight or tiredness, with no plans for pregnancy. Care is planned around your own goals, and fertility is discussed only if and when it matters to you.",
  },
  {
    question: "Who will I see for PCOS care?",
    answer:
      "PCOS care is led by our gynaecologists, with nutritionist Priyanka Savina for food and weight, and dermatologist Dr. Nivetha for acne, hair growth and hair thinning. With your consent, they look at your care together.",
  },
  {
    question: "How much does a PCOS consultation cost?",
    answer:
      "Fees depend on the clinician and are shown on each clinician's booking card on this page, live from the MyStree booking system. Tests and scans are advised only if they are needed, and your doctor tells you about them before they are done.",
  },
  {
    question: "Where is MyStree in Indiranagar?",
    answer: `MyStree is at ${clinic.streetAddress}, ${clinic.city} ${clinic.postalCode}. The clinic is open Monday to Saturday, 9 am to 8 pm. Book online or message the care team on WhatsApp at ${clinic.telephoneDisplay}.`,
  },
] as const;

/*
 * FAQ drafts adapted from FAQ_DRAFTS.md (sources: NHS PCOS/PMOS page; Monash
 * international evidence-based guideline, June 2026; NHS infertility
 * diagnosis; NHS acne). Clinician review required before publication.
 */
const PCOS_FAQS = [
  {
    question: "How is PCOS diagnosed?",
    answer:
      "PCOS is assessed from your symptoms, your menstrual history and selected examination or blood-test findings, after other causes such as thyroid problems have been considered. An ultrasound is not needed for every adult and is not the only basis for a diagnosis. A personal review is more useful than one scan or one hormone result.",
  },
  {
    question: "Is PCOS the same as PCOD?",
    answer:
      "In India both terms are used for the same pattern of irregular or missed periods with signs such as acne, extra hair growth or polycystic-looking ovaries. Your doctor will explain what your own findings mean rather than rely on the label.",
  },
  {
    question: "Can PCOS be cured?",
    answer:
      "There is currently no cure for PCOS, but symptoms and longer-term health can be managed with care that fits you. Food, activity and medical treatment may each have a role, depending on your priorities. Be cautious of anyone promising to reverse PCOS permanently or within a fixed time.",
  },
  {
    question: "Does PCOS mean I cannot get pregnant?",
    answer:
      "No. PCOS can affect ovulation and make conception take longer for some women, but many conceive naturally or with medical help. Your age and both partners' health also matter. A consultation can guide the next steps; no consultation, scan or package can guarantee a pregnancy.",
  },
  {
    question: "Can changing what I eat help PCOS if I don't lose weight?",
    answer:
      "Yes. International guidance recognises benefits from healthy eating and activity even when weight does not change. Nutrition support can focus on steady, realistic habits and how you feel, rather than a number on the scale. It works alongside medical care, not instead of it.",
  },
  {
    question: "Does acne or facial hair mean I have PCOS?",
    answer:
      "Not necessarily. Acne and extra hair growth have several causes, and on their own they cannot diagnose PCOS. Tell your doctor if you also have irregular periods or other changes, so they can decide whether a wider assessment is useful instead of ordering the same tests for everyone.",
  },
  {
    question: "Can a scan diagnose PCOS in a teenager?",
    answer:
      "No. International guidance advises against using an ovarian ultrasound or an AMH test to diagnose PCOS in teenagers, because the results can be misleading at this age. Assessment looks at periods that stay irregular and signs of raised androgens over time. Our adolescent health page explains teen visits.",
  },
  {
    question: "Why does PCOS matter beyond periods?",
    answer:
      "PCOS can be linked with insulin resistance, a higher chance of type 2 diabetes, raised cholesterol, sleep problems and low mood. That is why care may include checks on blood sugar and cholesterol at intervals, and attention to sleep and emotional wellbeing, alongside your cycle.",
  },
] as const;

function generateStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      clinicNode(),
      {
        "@type": "MedicalWebPage",
        "@id": `${SITE_URL}${PAGE_PATH}#page`,
        url: `${SITE_URL}${PAGE_PATH}`,
        name: "PCOS & PCOD Consultations in Indiranagar, Bengaluru | MyStree",
        description: metadata.description,
        inLanguage: "en-IN",
        isPartOf: { "@id": CLINIC_ID },
        about: [
          { "@id": `${SITE_URL}${PAGE_PATH}#service` },
          {
            "@type": "MedicalCondition",
            name: "Polycystic ovary syndrome",
            alternateName: ["PCOS", "PCOD", "Polycystic ovarian disease"],
          },
        ],
        breadcrumb: { "@id": `${SITE_URL}${PAGE_PATH}#breadcrumb` },
      },
      {
        "@type": "MedicalService",
        "@id": `${SITE_URL}${PAGE_PATH}#service`,
        name: "PCOS and Metabolic Health Care",
        serviceType: [
          "PCOS consultation",
          "Irregular periods assessment",
          "Metabolic health assessment",
          "PCOS nutrition counselling",
          "Acne and hair growth consultation",
        ],
        provider: { "@id": CLINIC_ID },
        employee: [
          clinicianRef("dr-surbhi-sinha", "Dr. Surbhi Sinha"),
          clinicianRef("dr-smitha-ap", "Dr. Smitha A.P"),
          clinicianRef("priyanka-savina", "Priyanka Savina"),
          clinicianRef("dr-nivetha", "Dr. Nivetha"),
        ],
        areaServed: {
          "@type": "City",
          name: clinic.city,
          containsPlace: { "@type": "Place", name: clinic.locality },
        },
      },
      faqNode(PAGE_PATH, [...PCOS_FAQS, ...LOCAL_QUESTIONS]),
      breadcrumbNode(PAGE_PATH, "PCOS Clinic"),
    ],
  };
}

export default function PcosPage() {
  const jsonLd = generateStructuredData();

  return (
    <main className={styles.pageRoot}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <ServiceBand>
        <ServiceHero
          image={{
            src: "/images/services/pages/woman-tracking-menstrual-cycle-on-phone.webp",
            alt: "A woman noting her menstrual cycle on her phone",
          }}
          headingId="pcos-hero-heading"
          title="PCOS and metabolic health care in Indiranagar"
          lead="Care for irregular periods, acne, hair growth, weight and metabolic health, with a gynaecologist, nutritionist and dermatologist in one clinic on 13th Main Road, Indiranagar, whether or not you are planning a pregnancy."
          primaryCta={{ label: "Book a PCOS consultation", href: "/book" }}
          secondaryCta={{ label: "Call the clinic", href: `tel:${clinic.telephone}` }}
        />
      </ServiceBand>

      <ServiceSpecialists
        headingId="pcos-specialists-heading"
        heading="Book a PCOS consultation"
        lead="Times shown are live from the MyStree booking system. Choose the doctor and time that suit you."
        consultationLabel="Clinic consultation"
        specialists={[
          { bookingId: 1, tag: "Gynaecology", focus: ["PCOS", "Irregular periods"], profileHref: "/doctors/dr-surbhi-sinha" },
          { bookingId: 2, tag: "Gynaecology", focus: ["Hormonal health", "Menstrual health"], profileHref: "/doctors/dr-smitha-ap" },
          { bookingId: 3, tag: "Nutrition", focus: ["PCOS diet", "Weight and metabolism"], profileHref: "/doctors/priyanka-savina" },
          { bookingId: 8, tag: "Dermatology", focus: ["Acne", "Hair growth and hair thinning"], profileHref: "/doctors/dr-nivetha" },
        ]}
      />

      <ServiceConditions
        headingId="pcos-conditions-heading"
        heading="PCOS concerns we look at"
        conditions={[
          "Acne along the jaw and chin",
          "Difficulty getting pregnant",
          "Extra facial or body hair",
          "Hair thinning",
          "Heavy periods after long gaps",
          "Insulin resistance and blood sugar",
          "Irregular or missed periods",
          "Low mood and anxiety",
          "Raised cholesterol",
          "Sleep problems and tiredness",
          "Teen PCOS concerns",
          "Weight changes",
        ]}
        cta={{ label: "Book a PCOS consultation", href: "/book" }}
      />

      <ServiceSteps
        image={{
          src: "/images/services/pages/evening-skincare-routine-at-home.webp",
          alt: "A woman following her evening skincare routine at home",
        }}
        headingId="pcos-steps-heading"
        heading="How your PCOS care works"
        steps={[
          { title: "Listen", text: "Your periods, skin and hair, weight, sleep, mood, family history and goals." },
          { title: "Assess", text: "A scan or blood tests only if they will help, explained before they are done." },
          { title: "Plan", text: "Medical care, food and skin care, chosen with you around your own goals." },
          { title: "Review", text: "Follow-ups to see what is working, with blood sugar and cholesterol checked at intervals." },
        ]}
        cta={{ label: "Book a PCOS consultation", href: "/book" }}
      />

      <ServiceQuote
        quote="Every woman deserves a doctor who explains her options plainly, without jargon or judgement."
        name="Dr. Surbhi Sinha"
      />

      <ServiceFit
        headingId="pcos-fit-heading"
        heading="Our PCOS care is right for you if you have"
        items={[
          { icon: "cycle", label: "Periods that are irregular, far apart or have stopped" },
          { icon: "mind", label: "Acne, extra hair growth or hair thinning that worries you" },
          { icon: "monitor", label: "Weight changes, tiredness or concerns about blood sugar" },
          { icon: "conversation", label: "A PCOS diagnosis and questions no one has had time to answer" },
        ]}
      />

      <ServiceInsight
        image={{
          src: "/images/services/pages/hormonal-acne-dermatology-indiranagar-bengaluru.webp",
          alt: "A woman looking at acne along her jawline in a mirror",
        }}
        headingId="pcos-insight-heading"
        heading="Why PCOS is often missed or treated in pieces"
        body="PCOS shows up differently in every woman, and its signs are often seen by different doctors at different times, without anyone joining them up."
        points={[
          "Acne, hair growth and irregular periods are treated separately, without asking whether they are connected",
          "Care is sometimes offered only around pregnancy, even when that is not your goal",
          "Blood sugar, cholesterol, sleep and mood can be affected too, and are worth checking over time",
        ]}
      />

      <ServiceModel
        headingId="pcos-model-heading"
        heading="One clinic for every part of PCOS"
        body="PCOS care at MyStree is led by our gynaecologists, with nutritionist Priyanka Savina and dermatologist Dr. Nivetha. With your consent, your cycle, skin and hair, food and test results are looked at together, and every option is explained so the plan is one you agree with."
        link={{ label: "Meet our doctors", href: "/doctors" }}
      />

      <ServiceStat
        headingId="pcos-stat-heading"
        heading="PCOS is more than a period problem, so care looks at the whole picture."
        figure="3"
        caption="kinds of care in one clinic for PCOS: gynaecology, nutrition and dermatology."
      />

      <ServiceFacts
        headingId="pcos-facts-heading"
        eyebrow="At a glance"
        heading="What PCOS care at MyStree is built on"
        facts={[
          { figure: "3", label: "kinds of care in one clinic: gynaecology, nutrition and dermatology" },
          { figure: "Your goals", label: "care for cycles, skin, weight and, only if you want it, pregnancy" },
          { figure: "Mon–Sat", label: "9 am to 8 pm at the Indiranagar clinic" },
        ]}
      />

      <ServiceQuestions
        image={{
          src: "/images/services/pages/nutritionist-consultation-indiranagar-bengaluru.webp",
          alt: "A nutritionist talking through a meal plan with a woman",
        }}
        headingId="pcos-questions-heading"
        heading="PCOS care in Indiranagar"
        questions={LOCAL_QUESTIONS}
      />

      <ServiceFaq
        headingId="pcos-faq-heading"
        heading="Frequently asked questions"
        items={PCOS_FAQS}
        allLink={{ label: "See all FAQs", href: "/faqs" }}
      />

      <ServiceAsk
        headingId="pcos-ask-heading"
        heading="Still have questions?"
        note="Message our care team on WhatsApp, or read answers to common questions."
        whatsapp={{
          label: "Chat on WhatsApp",
          href: "https://wa.me/916366573772?text=Hi%20MyStree%2C%20I%20have%20a%20question%20about%20PCOS%20care.",
        }}
        faqs={{ label: "Read the FAQs", href: "/faqs" }}
      />

      <ServiceClosing
        headingId="pcos-closing-heading"
        heading="PCOS care in Indiranagar, planned around your goals."
        primary={{ label: "Book a PCOS consultation", href: "/book" }}
        secondary={{ label: "Meet our doctors", href: "/doctors" }}
      />
    </main>
  );
}
