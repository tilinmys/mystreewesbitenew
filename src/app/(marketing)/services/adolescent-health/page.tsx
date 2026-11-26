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
 * Adolescent Health Clinic â€” /services/adolescent-health.
 *
 * The locked service-page design (color.md, "Service page system") with
 * adolescent content. Section 09 (care plan) is skipped: no package is
 * aimed at adolescents. Section 14 (reading) is skipped until the blog has
 * articles written for teens.
 *
 * Content rules applied to the supplied brief:
 *   - privacy is described accurately. The brief's "100% confidential, no
 *     letters home" cannot be promised to anyone under 18: the POCSO Act,
 *     section 19, requires doctors to report certain disclosures, and
 *     treatment of a minor generally needs a parent or guardian's consent.
 *     The page says what stays private and that the exceptions are explained
 *     at the start of the visit.
 *   - no testimonials, star ratings, "top rated" or "verified expert"
 *     badges (NMC notice, 06.10.2026); the opening quote is Dr. Surbhi
 *     Sinha's own words from her record in lib/doctors.ts
 *   - no emoji, hashtags or slang headings: they read as unserious on a
 *     health page and are not what teens or parents type into search. The
 *     brief's warmth is kept in plain words.
 *   - clinician credentials come from the live booking system via the
 *     specialist cards, not from the brief, whose degrees differ from it
 *   - no claim about consultation length: the booking system lists
 *     15-minute slots (visit length confirmed by the clinic, 17 Nov 2026)
 */

const PAGE_PATH = "/services/adolescent-health";

export const revalidate = 300;

export const metadata: Metadata = {
  // The root layout appends "| MyStree".
  title: "Adolescent Health Clinic in Indiranagar, Bengaluru",
  description:
    "Judgement-free care for teens in Indiranagar, Bengaluru: period concerns, PCOS, acne, hormones, nutrition, mental wellbeing and sexual health.",
  alternates: { canonical: `${SITE_URL}${PAGE_PATH}` },
  openGraph: {
    title: "Adolescent Health Clinic in Indiranagar, Bengaluru | MyStree",
    description:
      "Teen-friendly gynaecology, nutrition and mental health care, with consultations that start together and leave room for one-on-one time.",
    url: `${SITE_URL}${PAGE_PATH}`,
    type: "website",
    siteName: "MyStree Women's Health Clinic",
  },
};

/*
 * Section 08: questions teens and parents search before booking ("what age
 * first gynaecologist visit", "will my parents be told", "teen gynaecologist
 * Bangalore"). First sentence answers; privacy answered truthfully.
 */
const LOCAL_QUESTIONS = [
  {
    question: "At what age should a girl first see a gynaecologist?",
    answer:
      "A first visit between the ages of 13 and 15 is a good time, even without any problem. It is usually just a conversation about periods, growth, skin, mood and any questions, and it means there is a doctor to turn to later. Come sooner for painful, heavy or irregular periods, or for any worry about your body.",
  },
  {
    question: "Will my parents be told what I say?",
    answer:
      "Private consultations. Your doctor will explain what stays confidential and what the law requires us to report. Treatment for anyone under 18 usually needs a parent or guardian's consent.",
  },
  {
    question: "Will I need an internal examination?",
    answer:
      "Almost never at a first visit. Most teen concerns are sorted out by talking, and if a scan is needed it is usually an abdominal ultrasound over the tummy. Any examination is explained first, and you can ask to stop at any time.",
  },
  {
    question: "Can a parent come into the consultation?",
    answer:
      "Yes. A consultation can start with a parent or guardian in the room and then continue with the doctor alone. Private consultations. Your doctor will explain what stays confidential and what the law requires us to report.",
  },
  {
    question: "Who will we see at MyStree?",
    answer:
      "Teen care is led by obstetrician and gynaecologist Dr. Surbhi Sinha and obstetrician Dr. Smitha A.P, with nutrition advice from nutritionist Priyanka Savina and psychological support from consultant psychologist Jigyasa Thakur. Live appointment times for each are shown on this page.",
  },
  {
    question: "Where is MyStree in Indiranagar?",
    answer:
      "MyStree is at No. 3366, 13th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru 560008, a short distance from 100 Feet Road and easy to reach from Domlur, Jeevan Bhima Nagar, HAL and Old Airport Road. Book online or message the care team on WhatsApp at +91 63665 73772.",
  },
] as const;

/*
 * Section 13 FAQ: clinical questions teens and parents ask, answered to
 * current guidance (ACOG on adolescent menstruation, the 2023 International
 * PCOS Guideline on adolescents, WHO on HPV vaccination, AASM on sleep).
 */
const ADOLESCENT_FAQS = [
  {
    question: "Is it normal for periods to be irregular in the first few years?",
    answer:
      "Yes, cycles are often irregular for the first two to three years after the first period. See a doctor if periods come more often than every 21 days or more than 90 days apart, last longer than seven days, soak a pad every hour or two, or have not started by the age of 15.",
  },
  {
    question: "When is period pain not normal?",
    answer:
      "Period pain is not normal if it makes you miss school or activities, does not ease with regular pain relief, or gets worse over time. Severe pain can be a sign of a condition such as endometriosis, and it can be treated, so it is worth seeing a gynaecologist rather than putting up with it.",
  },
  {
    question: "What are the signs of PCOS in teenagers?",
    answer:
      "In teenagers, PCOS is diagnosed when periods are still irregular well after they have settled for most girls, together with signs of raised androgens such as excess facial or body hair or persistent acne. An ovarian ultrasound is not used to diagnose PCOS in the first eight years after periods start, because many healthy teens have ovaries that look polycystic.",
  },
  {
    question: "When should a girl get advice on cervical cancer prevention?",
    answer:
      "Advice on preventing cervical cancer is most useful in the early teens. Your doctor can explain the ways to lower the risk and when cervical screening should begin.",
  },
  {
    question: "Is teenage acne linked to hormones?",
    answer:
      "Yes. Rising androgen hormones at puberty increase oil production in the skin, which leads to acne. Most teenage acne responds to the right skincare and treatment, but severe acne, or acne with irregular periods and excess hair growth, is worth checking for PCOS.",
  },
  {
    question: "How much sleep does a teenager need?",
    answer:
      "Teenagers need 8 to 10 hours of sleep a night. Regular short sleep affects mood, concentration, appetite and skin, and late-night screen use is one of the commonest reasons teens fall short.",
  },
  {
    question: "What are the warning signs of an eating disorder?",
    answer:
      "Warning signs include skipping meals, strict food rules, fear of gaining weight, rapid weight change, excessive exercise, missed periods, and hiding food or eating in secret. Eating disorders are serious and treatable, and early help makes a real difference.",
  },
  {
    question: "When should a teenager get help for low mood or anxiety?",
    answer:
      "Get help if low mood, worry or irritability lasts more than two weeks or starts to affect school, sleep, eating or friendships. Thoughts of self-harm need help the same day: in India, Tele-MANAS offers free, confidential support at 14416.",
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
        name: "Adolescent Health Clinic in Indiranagar, Bengaluru | MyStree",
        description: metadata.description,
        inLanguage: "en-IN",
        audience: { "@type": "PeopleAudience", suggestedMinAge: 10, suggestedMaxAge: 19 },
        isPartOf: { "@id": CLINIC_ID },
        about: { "@id": `${SITE_URL}${PAGE_PATH}#service` },
        breadcrumb: { "@id": `${SITE_URL}${PAGE_PATH}#breadcrumb` },
      },
      {
        "@type": "MedicalService",
        "@id": `${SITE_URL}${PAGE_PATH}#service`,
        name: "Adolescent Health Care",
        serviceType: [
          "Adolescent gynaecology consultation",
          "Period problems and menstrual health",
          "PCOS in teenagers",
          "Cervical cancer prevention advice",
          "Adolescent nutrition counselling",
          "Adolescent mental health support",
          "Parent and child consultation",
        ],
        provider: { "@id": CLINIC_ID },
        employee: [
          clinicianRef("dr-surbhi-sinha", "Dr. Surbhi Sinha"),
          clinicianRef("dr-smitha-ap", "Dr. Smitha A.P"),
          clinicianRef("priyanka-savina", "Priyanka Savina"),
        ],
        areaServed: {
          "@type": "City",
          name: clinic.city,
          containsPlace: { "@type": "Place", name: clinic.locality },
        },
      },
      faqNode(PAGE_PATH, [...LOCAL_QUESTIONS, ...ADOLESCENT_FAQS]),
      breadcrumbNode(PAGE_PATH, "Adolescent Health Clinic"),
    ],
  };
}

export default function AdolescentHealthPage() {
  const jsonLd = generateStructuredData();

  return (
    <main className={styles.pageRoot}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <ServiceBand>
        <ServiceHero
          image={{ src: "/images/services/pages/teen-gynaecology-consultation-indiranagar-bengaluru.webp", alt: "A gynaecologist sketches a diagram for a teenager and her mother during a consultation" }}
          headingId="adolescent-hero-heading"
          title="Adolescent health care in Indiranagar, without judgement"
          lead="Private care for teens and young women, from period problems and PCOS to skin, nutrition and mental wellbeing, with a parent in the room or not."
          primaryCta={{ label: "Book a teen consultation", href: "/book" }}
          secondaryCta={{
            label: "Message us on WhatsApp",
            href: "https://wa.me/916366573772?text=Hi%20MyStree%2C%20I%20have%20a%20question%20about%20teen%20health%20care.",
            external: true,
          }}
        />
      </ServiceBand>

      <ServiceSpecialists
        headingId="adolescent-specialists-heading"
        heading="Book a teen consultation"
        lead="Times shown are live from the MyStree booking system. Choose the doctor and time that suit you."
        consultationLabel="Clinic consultation"
        specialists={[
          {
            bookingId: 1,
            tag: "Teen gynaecology",
            focus: ["Period problems", "PCOS"],
            profileHref: "/doctors/dr-surbhi-sinha",
          },
          {
            bookingId: 8,
            tag: "Teen skin and hair",
            focus: ["Acne", "Hair fall"],
            profileHref: "/doctors/dr-nivetha",
          },
          {
            bookingId: 3,
            tag: "Nutrition",
            focus: ["Teen nutrition", "PCOS diet"],
            profileHref: "/doctors/priyanka-savina",
          },
          {
            bookingId: 12,
            tag: "Mental health",
            focus: ["Anxiety", "Low mood"],
          },
        ]}
      />

      <ServiceConditions
        headingId="adolescent-conditions-heading"
        heading="Teen health concerns we help with"
        conditions={[
          "Acne and skin changes",
          "Anxiety, low mood and stress",
          "Early or late puberty",
          "Eating concerns and nutrition",
          "Cervical cancer prevention advice",
          "Heavy or painful periods",
          "Irregular or missed periods",
          "Polycystic ovary syndrome (PCOS)",
          "Sexual health and consent questions",
          "Sleep problems",
          "Thyroid problems",
          "Vaginal discharge and infections",
        ]}
        cta={{ label: "Book a teen consultation", href: "/book" }}
      />

      <ServiceSteps
        image={{ src: "/images/services/pages/mother-and-daughter-clinic-registration.webp", alt: "A mother fills in a clinic form at reception with her teenage daughter beside her" }}
        headingId="adolescent-steps-heading"
        heading="Four steps to your first visit"
        steps={[
          {
            title: "Book your visit",
            text: "Book online or on WhatsApp, and decide whether a parent comes along.",
          },
          {
            title: "Come as you are",
            text: "No preparation needed. Bring your questions and the date of your last period.",
          },
          {
            title: "Talk it through",
            text: "Start together, then take one-on-one time with your doctor if you want it.",
          },
          {
            title: "Leave with a plan",
            text: "Know what is happening, what to do next and how to reach us with questions.",
          },
        ]}
        cta={{ label: "Book a teen consultation", href: "/book" }}
      />

      <ServiceQuote
        quote="Every woman deserves a doctor who explains her options plainly, without jargon or judgement."
        name="Dr. Surbhi Sinha"
      />

      <ServiceFit
        headingId="adolescent-fit-heading"
        heading="Our teen care is right for you if you have"
        items={[
          { icon: "cycle", label: "Periods that are painful, heavy or irregular" },
          { icon: "branch", label: "Acne, hair growth or weight changes that worry you" },
          { icon: "conversation", label: "Questions about your body you would rather not Google" },
          { icon: "mind", label: "Stress, low mood or trouble sleeping" },
        ]}
      />

      <ServiceInsight
        image={{ src: "/images/services/pages/teenager-period-pain-at-home.webp", alt: "A teenager resting on her bed with a hot-water bag and a schoolbook" }}
        headingId="adolescent-insight-heading"
        heading="Why teen health concerns are often missed"
        body="Painful or irregular periods, acne and low mood are often brushed off as just growing up, and many teens find them hard to raise in front of family."
        points={[
          "Period pain bad enough to miss school is not something to put up with",
          "Cycles that stay irregular years after the first period can point to PCOS or thyroid problems",
          "Low mood, anxiety and eating concerns often appear alongside physical symptoms",
        ]}
      />

      <ServiceModel
        headingId="adolescent-model-heading"
        heading="Consultations that start together"
        body="For teens who feel awkward seeing a gynaecologist, a visit can begin with a parent in the room and then continue with the doctor alone. Private consultations. Your doctor will explain what stays confidential and what the law requires us to report."
        link={{ label: "Meet our doctors", href: "/doctors" }}
      />

      <ServiceStat
        headingId="adolescent-stat-heading"
        heading="Your body, your questions, answered without judgement."
        figure="13 to 15"
        caption="is a good age for a first visit to a gynaecologist, even when nothing is wrong."
      />

      <ServiceFacts
        headingId="adolescent-facts-heading"
        eyebrow="At a glance"
        heading="What every teen visit at MyStree is built on"
        facts={[
          { figure: "2", label: "ways to be seen: together with a parent, or one-on-one" },
          { figure: "4", label: "areas of teen care: gynaecology, nutrition, skin and mental health" },
          { figure: "Monâ€“Sat", label: "9 am to 8 pm at the Indiranagar clinic" },
        ]}
      />

      <ServiceQuestions
        image={{ src: "/images/services/pages/mother-and-teen-daughter-walking-indiranagar.webp", alt: "A mother and her teenage daughter walking along a leafy street in Indiranagar" }}
        headingId="adolescent-questions-heading"
        heading="Seeing a teen gynaecologist in Indiranagar"
        questions={LOCAL_QUESTIONS}
      />

      <ServiceFaq
        headingId="adolescent-faq-heading"
        heading="Frequently asked questions"
        items={ADOLESCENT_FAQS}
        allLink={{ label: "See all FAQs", href: "/faqs" }}
      />

      <ServiceAsk
        headingId="adolescent-ask-heading"
        heading="Still have questions?"
        note="Message our care team on WhatsApp, or read answers to common questions."
        whatsapp={{
          label: "Chat on WhatsApp",
          href: "https://wa.me/916366573772?text=Hi%20MyStree%2C%20I%20have%20a%20question%20about%20teen%20health%20care.",
        }}
        faqs={{ label: "Read the FAQs", href: "/faqs" }}
      />

      <ServiceClosing
        headingId="adolescent-closing-heading"
        heading="Teen health care in Indiranagar that starts with listening."
        primary={{ label: "Book a teen consultation", href: "/book" }}
        secondary={{ label: "Meet our doctors", href: "/doctors" }}
      />
    </main>
  );
}
