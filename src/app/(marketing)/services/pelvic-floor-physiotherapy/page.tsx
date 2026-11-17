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
 * Pelvic Floor Physiotherapy & Recovery — /services/pelvic-floor-physiotherapy.
 *
 * The locked service-page template (color.md) with women's physiotherapy
 * content. Replaces the thin /clinics/pelvic-health page, which now
 * redirects here (next.config.ts) so the two never compete in search.
 *
 * SEO / AEO / GEO (review of 12 Oct 2026):
 *   - Local results for pelvic physiotherapy in Indiranagar are a single
 *     doctor profile at Motherhood Hospital Indiranagar (keyword-dense FAQs,
 *     no condition content), Gunasheela's "Vaginismus Treatment in
 *     Bangalore" (~800 words, no named clinician credentials, no sources,
 *     IVF branding in the title), Manipal and Aster physiotherapist profiles
 *     and blog posts. No page covers women's pelvic physiotherapy as a whole,
 *     explains consent for internal assessment, or answers with evidence.
 *   - Google Search Central: people-first, accurate health content with a
 *     visible, qualified author; no preferred length; AI Overviews need only
 *     indexable text that the structured data mirrors (FAQ rich results were
 *     retired on 7 May 2026).
 *   - So: plain-language condition names next to the clinical ones (what
 *     women type and what doctors say), answer-first FAQs citing Cochrane
 *     and NICE, the physiotherapist's real credentials, and one natural
 *     statement of the locality.
 *
 * Content rules applied to the supplied brief:
 *   - no testimonials, star ratings or "Verified Patient" quotes, and no
 *     claims about other clinics (NMC notice, 06.10.2026)
 *   - the "93% within 8 to 10 sessions" and "over 85%" figures are not
 *     traceable to a source; the Cochrane review's own result is used
 *   - the brief's address (2nd floor, 560061), parking, valet, metro time,
 *     second phone number, mystree.org domain and "Ex-AIIMS" are not
 *     confirmed; the repository's details are used
 *   - Dr. Jasmine Flora's credentials, years and quote come from
 *     lib/doctors.ts (MPT OBG physiotherapy, lactation counsellor, 21 years
 *     overall, 9 specialist); she is marked up as a Person, not a Physician
 *   - the priced pathways (₹600 intake, session packages) are not built: no
 *     physiotherapy package is in the clinic's package list
 *   - "private therapy suites" is softened to private one-to-one sessions
 */

const PAGE_PATH = "/services/pelvic-floor-physiotherapy";

export const metadata: Metadata = {
  // The root layout appends "| MyStree".
  title: "Pelvic Floor Physiotherapy for Women in Indiranagar, Bengaluru",
  description:
    "Women's pelvic floor physiotherapy in Indiranagar, Bengaluru for bladder leaks, vaginismus, painful sex, diastasis recti, C-section recovery and pregnancy pain.",
  alternates: { canonical: `${SITE_URL}${PAGE_PATH}` },
  openGraph: {
    title: "Pelvic Floor Physiotherapy for Women in Indiranagar, Bengaluru | MyStree",
    description:
      "Private, unhurried physiotherapy for leaks, pelvic pain, vaginismus and recovery after birth, alongside our gynaecologists.",
    url: `${SITE_URL}${PAGE_PATH}`,
    type: "website",
    siteName: "MyStree Women's Health Clinic",
  },
};

/*
 * Local questions: what women ask before their first pelvic physiotherapy
 * visit in Indiranagar. Repository facts only.
 */
const LOCAL_QUESTIONS = [
  {
    question: "What happens at my first pelvic floor physiotherapy appointment?",
    answer:
      "It starts with a conversation, in a private room, about your symptoms, bladder and bowel habits, births, surgeries and what you want to get back to. Dr. Jasmine Flora then looks at your posture, breathing and tummy muscles. A pelvic floor examination is offered only if it will help, is explained first, and happens only with your consent. You leave with exercises and a plan.",
  },
  {
    question: "What should I wear or bring?",
    answer:
      "Wear comfortable clothes you can move in. Bring any scan or surgery reports, your discharge summary if you have had a baby recently, and a list of your medicines. If you are troubled by leaks or urgency, noting how often you pass urine for two or three days is very useful.",
  },
  {
    question: "Do I need a doctor's referral for physiotherapy?",
    answer:
      "No, you can book directly. If you are pregnant, recently delivered or have symptoms such as bleeding or a new lump, Dr. Jasmine works with obstetrician Dr. Smitha A.P and gynaecologist Dr. Surbhi Sinha in the same clinic, so a medical check can be arranged quickly.",
  },
  {
    question: "Where is MyStree in Indiranagar?",
    answer:
      "MyStree is at No. 3366, 13th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru 560008, a short distance from 100 Feet Road and easy to reach from Domlur, Jeevan Bhima Nagar, HAL, Ulsoor and Old Airport Road. Book online or message the care team on WhatsApp at +91 63665 73772.",
  },
] as const;

/*
 * FAQ: questions women search about pelvic physiotherapy, answered to
 * current evidence (Cochrane review of pelvic floor muscle training, 2018;
 * NICE NG210, 2021; RCOG patient information on pelvic girdle pain; the
 * 2019 return-to-running postnatal guideline).
 */
const PHYSIO_FAQS = [
  {
    question: "What is pelvic floor physiotherapy?",
    answer:
      "Pelvic floor physiotherapy treats the muscles that support your bladder, bowel and uterus. A women's health physiotherapist checks whether these muscles are weak, too tight or not working in time with your breathing and tummy muscles, then retrains them with exercises, hands-on therapy and advice on daily habits.",
  },
  {
    question: "Can physiotherapy stop urine leakage without surgery?",
    answer:
      "Supervised pelvic floor muscle training is the recommended first treatment for leakage on coughing, sneezing or exercise. NICE advises at least three months of it before surgery is considered, and your physiotherapist and gynaecologist will discuss what suits you.",
  },
  {
    question: "Are Kegel exercises right for everyone?",
    answer:
      "No. Kegels strengthen the pelvic floor, which helps when the muscles are weak. But if your pelvic floor is already too tight, which is common with pelvic pain, painful sex or vaginismus, more squeezing can make symptoms worse. Those muscles first need to learn to relax, which is why an assessment comes before an exercise plan.",
  },
  {
    question: "Does a pelvic floor assessment include an internal examination?",
    answer:
      "Only if it will help and only with your consent. An internal check gives the most accurate picture of muscle tone and strength, but it is always optional. Much can be assessed externally, you can stop at any time, and you are welcome to bring someone with you.",
  },
  {
    question: "How does a physiotherapist treat vaginismus?",
    answer:
      "Vaginismus is an involuntary tightening of the pelvic floor muscles that makes penetration painful or impossible. Treatment is gentle and goes at your pace: understanding the body's protective response, breathing and relaxation, hands-on release of tight muscles, and gradual use of vaginal dilators at home. Most women improve, and many go on to comfortable intimacy and gynaecological examinations.",
  },
  {
    question: "When can I exercise after a normal delivery or a C-section?",
    answer:
      "Gentle breathing, pelvic floor exercises and short walks can usually begin within days of birth if you feel comfortable. A full pelvic floor and tummy check is helpful from about six weeks, and high-impact exercise such as running is generally best left until at least three months after birth, once your pelvic floor and core are ready.",
  },
  {
    question: "Will diastasis recti close on its own?",
    answer:
      "Often it improves without treatment. About 60 percent of women have some separation of the tummy muscles six weeks after birth, and around a third still do a year later. Physiotherapy that combines breathing, deep core and pelvic floor work helps the muscles manage load, which matters more than the size of the gap. Surgery is rarely needed.",
  },
  {
    question: "Is pelvic girdle pain in pregnancy normal?",
    answer:
      "It is common, affecting about one in five pregnant women, but it is not something you simply have to put up with. Pain at the pubic bone, hips or lower back that is worse on stairs, getting out of a car or turning in bed usually eases with physiotherapy, movement advice and sometimes a support belt. It does not harm your baby.",
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
        name: "Pelvic Floor Physiotherapy for Women in Indiranagar, Bengaluru | MyStree",
        description: metadata.description,
        inLanguage: "en-IN",
        isPartOf: { "@id": CLINIC_ID },
        about: [
          { "@id": `${SITE_URL}${PAGE_PATH}#service` },
          { "@type": "MedicalCondition", name: "Urinary incontinence" },
          { "@type": "MedicalCondition", name: "Vaginismus" },
          { "@type": "MedicalCondition", name: "Diastasis recti" },
          { "@type": "MedicalCondition", name: "Pelvic girdle pain" },
        ],
        reviewedBy: clinicianRef("dr-jasmine-flora", "Dr. Jasmine Flora"),
        breadcrumb: { "@id": `${SITE_URL}${PAGE_PATH}#breadcrumb` },
      },
      {
        "@type": "MedicalService",
        "@id": `${SITE_URL}${PAGE_PATH}#service`,
        name: "Pelvic Floor Physiotherapy and Women's Recovery",
        serviceType: [
          "Pelvic floor assessment",
          "Pelvic floor muscle training",
          "Bladder training",
          "Vaginismus and painful sex physiotherapy",
          "Diastasis recti rehabilitation",
          "C-section and episiotomy scar rehabilitation",
          "Pregnancy pelvic girdle pain physiotherapy",
          "Postnatal core and return-to-exercise rehabilitation",
          "Pelvic organ prolapse physiotherapy",
        ],
        provider: { "@id": CLINIC_ID },
        employee: [
          clinicianRef("dr-jasmine-flora", "Dr. Jasmine Flora"),
          clinicianRef("dr-smitha-ap", "Dr. Smitha A.P"),
          clinicianRef("dr-surbhi-sinha", "Dr. Surbhi Sinha"),
        ],
        areaServed: {
          "@type": "City",
          name: clinic.city,
          containsPlace: { "@type": "Place", name: clinic.locality },
        },
      },
      faqNode(PAGE_PATH, [...PHYSIO_FAQS, ...LOCAL_QUESTIONS]),
      breadcrumbNode(PAGE_PATH, "Pelvic Floor Physiotherapy"),
    ],
  };
}

export default function PelvicFloorPhysiotherapyPage() {
  const jsonLd = generateStructuredData();

  return (
    <main className={styles.pageRoot}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <ServiceBand>
        <ServiceHero
          image={{ src: "/images/services/pages/pelvic-floor-physiotherapy-indiranagar-bengaluru.webp", alt: "A physiotherapist guides a patient through a breathing exercise on a treatment table" }}
          headingId="physio-hero-heading"
          title="Pelvic floor physiotherapy for women in Indiranagar"
          lead="Private, unhurried physiotherapy for bladder leaks, pelvic pain, vaginismus, diastasis recti and recovery after birth, working alongside our gynaecologists on 13th Main Road, Indiranagar."
          primaryCta={{ label: "Book a pelvic health assessment", href: "/book" }}
          secondaryCta={{ label: "Call the clinic", href: "tel:+916366573772" }}
        />
        <ServiceQuote
          quote="Pelvic health is often overlooked. After childbirth or with conditions like vaginismus, women are sometimes told their pain is normal. It is worth having it assessed."
          name="Dr. Jasmine Flora"
        />
      </ServiceBand>

      <ServiceStat
        headingId="physio-stat-heading"
        heading="Leaks and pelvic pain are common. They are not something to live with."
        figure="21 years"
        caption="of obstetric and gynaecological physiotherapy behind Dr. Jasmine Flora's care."
      />

      <ServiceConditions
        headingId="physio-conditions-heading"
        heading="What pelvic floor physiotherapy helps with"
        conditions={[
          "Back pain and core weakness after birth",
          "Bladder leaks when you cough, sneeze or run",
          "C-section and episiotomy scar pain",
          "Diastasis recti (tummy gap after pregnancy)",
          "Feeling of heaviness or mild prolapse",
          "Overactive bladder and sudden urgency",
          "Painful sex (dyspareunia)",
          "Pelvic pain and a tight pelvic floor",
          "Pubic bone and pelvic girdle pain in pregnancy",
          "Sciatica and SI joint pain in pregnancy",
          "Tailbone pain (coccydynia)",
          "Vaginismus",
        ]}
        cta={{ label: "Book a pelvic health assessment", href: "/book" }}
      />

      <ServiceInsight
        image={{ src: "/images/services/pages/postpartum-back-pain-lifting-toddler.webp", alt: "A mother bracing her lower back as she lifts her toddler" }}
        headingId="physio-insight-heading"
        heading="Why pelvic floor problems are often missed"
        body="Many women are told that leaking after children, or pain during sex, is just part of life. Both are common, and both can be assessed and treated."
        points={[
          "“Do more Kegels” is given as blanket advice, but a pelvic floor that is already too tight needs to relax first",
          "C-section scars can stay stiff and sensitive for months, and are rarely checked after the six-week visit",
          "Crunches and planks too soon after birth can strain a healing core and pelvic floor",
        ]}
      />

      <ServiceModel
        headingId="physio-model-heading"
        heading="Physiotherapy that works with your gynaecologist"
        body="Pelvic health care at MyStree is led by Dr. Jasmine Flora, an obstetric and gynaecological physiotherapist with a master's in obstetric and gynaecological physiotherapy and 21 years of experience. Sessions are one-to-one and private. For pregnancy, recovery after birth and menopause changes, she works closely with obstetrician Dr. Smitha A.P and gynaecologist Dr. Surbhi Sinha, so your treatment is planned together with your doctor."
        link={{ label: "Meet our team", href: "/doctors" }}
      />

      <ServiceFit
        headingId="physio-fit-heading"
        heading="Pelvic floor physiotherapy is right for you if you"
        items={[
          { icon: "seedling", label: "Had a baby, by normal delivery or C-section, and your core or back still feels weak" },
          { icon: "conversation", label: "Feel pain or tightness with sex, tampons or a gynaecological examination" },
          { icon: "monitor", label: "Leak when you laugh, sneeze or exercise, or rush to reach the toilet" },
          { icon: "pregnancy", label: "Are pregnant and have pubic bone, hip or lower back pain" },
        ]}
      />

      <ServiceFacts
        headingId="physio-facts-heading"
        eyebrow="At a glance"
        heading="What pelvic health care at MyStree is built on"
        facts={[
          { figure: "21 years", label: "of obstetric and gynaecological physiotherapy behind Dr. Jasmine Flora's care" },
          { figure: "1:1", label: "private sessions with your physiotherapist" },
          { figure: "Mon–Sat", label: "9 am to 8 pm at the Indiranagar clinic" },
        ]}
      />

      <ServiceFaq
        headingId="physio-faq-heading"
        heading="Frequently asked questions"
        items={PHYSIO_FAQS}
        allLink={{ label: "See all FAQs", href: "/faqs" }}
      />

      <ServiceAsk
        headingId="physio-ask-heading"
        heading="Not sure if physiotherapy is right for you?"
        note="Message our care team on WhatsApp in confidence, or read answers to common questions."
        whatsapp={{
          label: "Chat on WhatsApp",
          href: "https://wa.me/916366573772?text=Hi%20MyStree%2C%20I%20have%20a%20question%20about%20pelvic%20floor%20physiotherapy.",
        }}
        faqs={{ label: "Read the FAQs", href: "/faqs" }}
      />

      <ServiceQuestions
        image={{ src: "/images/services/pages/mother-with-baby-carrier-on-stairs.webp", alt: "A mother carrying her baby in a carrier as she climbs the stairs" }}
        headingId="physio-questions-heading"
        heading="Pelvic floor physiotherapy in Indiranagar"
        questions={LOCAL_QUESTIONS}
      />

      <ServiceSteps
        image={{ src: "/images/services/pages/glute-bridge-pelvic-floor-exercise-at-home.webp", alt: "A woman doing a glute bridge exercise on a cotton rug at home" }}
        headingId="physio-steps-heading"
        heading="How physiotherapy works"
        steps={[
          {
            title: "Assess",
            text: "Your history, posture, breathing, tummy gap and, with consent, pelvic floor.",
          },
          {
            title: "Release",
            text: "Relaxing tight muscles and freeing stiff C-section or episiotomy scars.",
          },
          {
            title: "Retrain",
            text: "Pelvic floor and deep core control, bladder training and breathing.",
          },
          {
            title: "Return",
            text: "Back to lifting, carrying your baby, running and the activities you love.",
          },
        ]}
        cta={{ label: "Book a pelvic health assessment", href: "/book" }}
      />

      <ServiceSpecialists
        headingId="physio-specialists-heading"
        heading="Book with our pelvic health team"
        lead="Times shown are live from the MyStree booking system. Choose the doctor and time that suit you."
        consultationLabel="Clinic consultation"
        specialists={[
          {
            bookingId: 7,
            tag: "Pelvic physiotherapy",
            focus: ["Vaginismus and pelvic pain", "Leaks and postnatal recovery"],
            profileHref: "/doctors/dr-jasmine-flora",
          },
          {
            bookingId: 2,
            tag: "Obstetrics",
            focus: ["Recovery after birth", "Pregnancy"],
            profileHref: "/doctors/dr-smitha-ap",
          },
          {
            bookingId: 1,
            tag: "Gynaecology",
            focus: ["Painful sex", "Menopause changes"],
            profileHref: "/doctors/dr-surbhi-sinha",
          },
        ]}
      />

      <ServiceClosing
        headingId="physio-closing-heading"
        heading="Pelvic floor physiotherapy at our Indiranagar clinic."
        primary={{ label: "Book a pelvic health assessment", href: "/book" }}
        secondary={{ label: "Meet our team", href: "/doctors" }}
      />
    </main>
  );
}
