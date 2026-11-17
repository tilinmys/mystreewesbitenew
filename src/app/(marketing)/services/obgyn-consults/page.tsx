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
import { ServicePlan } from "@/components/services/service-plan";
import { ServiceQuestions } from "@/components/services/service-questions";
import { ServiceQuote } from "@/components/services/service-quote";
import { ServiceReading } from "@/components/services/service-reading";
import { ServiceStat } from "@/components/services/service-stat";
import { ServiceSpecialists } from "@/components/services/service-specialists";
import { ServiceSteps } from "@/components/services/service-steps";
import { getArticles } from "@/lib/cms";
import { SITE_URL, clinic } from "@/lib/clinic";
import { getDoctors } from "@/lib/doctors-repository";
import { CLINIC_ID, breadcrumbNode, clinicNode, clinicianRef, faqNode, planNode } from "@/lib/service-schema";
import styles from "@/components/services/service-page.module.css";

export const metadata: Metadata = {
  // The root layout appends "| MyStree".
  title: "Gynaecologist Consultations in Indiranagar, Bengaluru",
  description:
    "Consult a gynaecologist in Indiranagar, Bengaluru about irregular, heavy or painful periods, pelvic pain, PCOS, cervical screening or pregnancy planning, with a pelvic scan in the same visit if it is needed.",
  alternates: {
    canonical: `${SITE_URL}/services/obgyn-consults`,
  },
  openGraph: {
    title: "Gynaecologist Consultations in Indiranagar, Bengaluru | MyStree",
    description:
      "15-minute consultations with gynaecologists who listen to your symptoms and respect your choices, with a pelvic scan in the same visit if it is needed.",
    url: `${SITE_URL}/services/obgyn-consults`,
    type: "website",
    siteName: "MyStree Women's Health Clinic",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gynaecologist Consultations in Indiranagar, Bengaluru | MyStree",
    description:
      "15-minute consultations with gynaecologists who listen to your symptoms and respect your choices.",
  },
};

/*
 * Section 13 FAQ. Clinical questions women search ("are my periods too
 * heavy", "how is endometriosis diagnosed", "when to start cervical
 * screening"), phrased as they are asked, each answered in its first
 * sentence. Clinical lines follow current guidance (ESHRE 2022 on
 * endometriosis, FOGSI/WHO on screening); clinic lines use only facts in
 * this repository. No overlap with LOCAL_QUESTIONS (section 08). Both lists
 * feed the FAQPage schema verbatim.
 */
const OBGYN_FAQS = [
  {
    question: "What happens at a gynaecology consultation at MyStree?",
    answer:
      "In a 15-minute consultation, your gynaecologist goes through your history, your cycle and your symptoms before suggesting any test. If an examination or pelvic ultrasound would help, it is explained first and done only with your consent, usually in the same visit. You leave knowing what is likely going on and what happens next.",
  },
  {
    question: "Do I need a pelvic exam at my first visit?",
    answer:
      "Not always. Many concerns can be assessed through conversation and, where needed, an abdominal ultrasound. An internal examination is suggested only when it will change your care, and you can ask questions, pause or decline at any point.",
  },
  {
    question: "Are my periods too heavy?",
    answer:
      "Your periods may be too heavy if you need to change a pad or tampon every one to two hours, pass large clots, bleed for more than seven days, or feel tired or breathless during your period. Heavy bleeding is common but not something to put up with: causes such as fibroids, polyps, adenomyosis and thyroid problems can be found and treated.",
  },
  {
    question: "How is endometriosis diagnosed?",
    answer:
      "Endometriosis is diagnosed from your symptoms, an examination and imaging. Painful periods, pain during sex and ongoing pelvic pain are the usual signs. An ultrasound can show endometriomas and adenomyosis, but a normal scan does not rule endometriosis out. Treatment can often begin without surgery; laparoscopy is used when a definite diagnosis or surgical treatment is needed.",
  },
  {
    question: "When should I start cervical screening?",
    answer:
      "Most guidance in India advises starting cervical screening between the ages of 25 and 30 and repeating it every three to five years, depending on the test used. Screening can be a Pap smear, an HPV test or both, and your gynaecologist will advise the right test and interval for you.",
  },
  {
    question: "Do you offer cervical cancer prevention advice?",
    answer:
      "Yes. Your gynaecologist can explain cervical cancer screening and the ways to lower the risk of cervical cancer, and advise what suits your age and history.",
  },
  {
    question: "Do you look after high-risk pregnancies?",
    answer:
      "Yes. High-risk pregnancy care at MyStree is led by Dr. Smitha A.P, a high-risk obstetrician whose work includes recurrent pregnancy loss, endocrine disorders in pregnancy and a difficult obstetric history. Your antenatal consultations and nutrition support are at the clinic, and your doctor plans the delivery with you.",
  },
  {
    question: "Can I consult online before visiting the clinic?",
    answer:
      "Yes. Video consultations are available for follow-ups, report reviews and first assessments that do not need a physical examination. If an examination or scan is needed, your doctor will arrange an in-person visit at the Indiranagar clinic.",
  },
] as const;

/*
 * Section 08 questions: the local, pre-booking questions women search for
 * ("gynaecologist in Indiranagar", "unmarried", "female gynaecologist",
 * "same-day scan", "PCOS doctor", "consultation fee", "near Domlur / HAL").
 * Every answer uses facts already in this repository; each leads with the
 * direct answer. Mirrored in the FAQPage schema below — keep them in step.
 */
const LOCAL_QUESTIONS = [
  {
    question: "When should I see a gynaecologist?",
    answer:
      "See a gynaecologist if your periods are irregular, very heavy, very painful or have stopped, if you bleed between periods or after sex, or if you have pelvic pain, unusual discharge or pain during sex. It is also worth booking before you try for a pregnancy, if you have been trying to conceive for a year without success (six months if you are over 35), and for regular cervical screening.",
  },
  {
    question: "Can I see a gynaecologist in Indiranagar if I am unmarried?",
    answer:
      "Yes. MyStree sees women of every age and marital status, and every consultation is private and confidential. Many first visits are a conversation only. If an examination or scan would help, your gynaecologist explains why and goes ahead only with your consent, and an abdominal ultrasound is often possible instead of an internal one.",
  },
  {
    question: "Are the gynaecologists at MyStree women?",
    answer:
      "Yes. Pregnancy and gynaecology care at MyStree is led by Dr. Smitha A.P, the clinic's founder and a high-risk obstetrician, with obstetrician and gynaecologist Dr. Surbhi Sinha and reproductive medicine specialist Dr. Chaitra Nayak. Each doctor's qualifications are listed on the Our doctors page.",
  },
  {
    question: "Can I have a pelvic ultrasound in the same visit?",
    answer:
      "Yes, in most cases. Pelvic ultrasound is done inside the clinic, so if your gynaecologist recommends a scan you usually do not need to go to a separate diagnostic centre. Sex determination of the foetus is not done at MyStree; it is prohibited by law in India.",
  },
  {
    question: "Do you treat PCOS and irregular periods?",
    answer:
      "Yes. PCOS is diagnosed using the Rotterdam criteria, which look at your cycle pattern, signs of raised androgens and the appearance of the ovaries on ultrasound, after thyroid and other causes are ruled out. Treatment is planned with you and can combine medication, cycle tracking and advice from the clinic's nutritionist.",
  },
  {
    question: "How much does a gynaecology consultation cost at MyStree?",
    answer:
      "The consultation fee depends on the specialist you choose and is shown before you confirm your booking. If you are trying to conceive, the MyStree Care Journey Basic plan covers two gynaecologist consultations, three follicular scans and one nutrition consultation for ₹2,999.",
  },
  {
    question: "Where is MyStree in Indiranagar?",
    answer:
      "MyStree is at No. 3366, 13th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru 560008, a short distance from 100 Feet Road and easy to reach from Domlur, Jeevan Bhima Nagar, HAL and Old Airport Road. Book online or message the care team on WhatsApp at +91 63665 73772.",
  },
] as const;

const OBGYN_READING_SLUGS = ["pregnancy-after-35-prepare-dont-panic", "perimenopause-symptoms-age-40"] as const;

const CARE_JOURNEY_BASIC = {
  name: "MyStree Care Journey Basic",
  price: "2999",
  items: [
    { count: "2", label: "Gynaecologist consultations" },
    { count: "3", label: "Follicular scans" },
    { count: "1", label: "Nutrition consultation" },
  ],
} as const;

const PAGE_PATH = "/services/obgyn-consults";

function generateStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      clinicNode(),
      {
        "@type": "MedicalWebPage",
        "@id": `${SITE_URL}${PAGE_PATH}#page`,
        url: `${SITE_URL}${PAGE_PATH}`,
        name: "Gynaecologist Consultations in Indiranagar, Bengaluru | MyStree",
        description: metadata.description,
        inLanguage: "en-IN",
        isPartOf: { "@id": CLINIC_ID },
        about: { "@id": `${SITE_URL}${PAGE_PATH}#service` },
        breadcrumb: { "@id": `${SITE_URL}${PAGE_PATH}#breadcrumb` },
      },
      {
        "@type": "MedicalService",
        "@id": `${SITE_URL}${PAGE_PATH}#service`,
        name: "Obstetric & Gynecological Consultations",
        serviceType: [
          "Gynecological consultation",
          "Menstrual cycle evaluation",
          "Pelvic pain diagnosis",
          "High-risk obstetric consultation",
          "In-house pelvic ultrasound",
          "Cervical cancer screening",
          "Preconception and fertility assessment",
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
      faqNode(PAGE_PATH, [...LOCAL_QUESTIONS, ...OBGYN_FAQS]),
      planNode(PAGE_PATH, {
        id: "care-journey-basic",
        name: CARE_JOURNEY_BASIC.name,
        description:
          "For women trying to conceive: two gynaecologist consultations, three follicular scans and one nutrition consultation.",
        price: CARE_JOURNEY_BASIC.price,
      }),
      breadcrumbNode(PAGE_PATH, "OB-GYN Consults"),
    ],
  };
}

export default async function ObgynConsultsPage() {
  const reading = await getArticles(OBGYN_READING_SLUGS);
  const jsonLd = generateStructuredData();
  // Bylines link to each author's profile.
  const authorProfiles = Object.fromEntries(
    (await getDoctors()).map((doctor) => [doctor.name, `/doctors/${doctor.slug}`]),
  );

  return (
    <main className={styles.pageRoot}>
      {/* SECTION 11: SEO Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ====================================================================
         SECTIONS 1-2 — the opening band (locked, shared by every service
         page). Hero and quote share one Twilight Wine gradient.

         Copy is written for direct extraction: the H1 names the service in
         the words people search with, and the lead answers "what is this
         and where" in a single sentence, naming the street for local search.
         The breadcrumb trail lives in this page's BreadcrumbList data.
         ==================================================================== */}
      <ServiceBand>
        <ServiceHero
          image={{ src: "/images/services/pages/gynaecologist-consultation-indiranagar-bengaluru.webp", alt: "A gynaecologist takes notes while a patient describes her symptoms" }}
          headingId="obgyn-hero-heading"
          title="Unhurried gynaecology and pregnancy care"
          lead="15-minute consultations and in-clinic scans for irregular cycles, PCOS and pregnancy, on 13th Main Road, Indiranagar."
          primaryCta={{ label: "Book a consultation", href: "/book" }}
          secondaryCta={{
            label: "Talk to the care team",
            href: "https://wa.me/916366573772",
            external: true,
          }}
        />
        <ServiceQuote
          quote="Every woman deserves a doctor who explains her options plainly, without jargon or judgement."
          name="Dr. Surbhi Sinha"
        />
      </ServiceBand>

      {/* SECTION 3 — statement and figure. No patient counts are published
          (Growthamp review 13 Nov 2026, item 5); the figure is Dr. Smitha
          A.P's experience as recorded in the booking system. */}

      <ServiceStat
        headingId="obgyn-stat-heading"
        heading="Answers to your questions, not just your symptoms."
        figure="23 years"
        caption="of obstetric experience behind Dr. Smitha A.P's care, 15 of them as a specialist."
      />

      {/* SECTION 4 — conditions, revealed with the Roll Call animation.
          Clinical scope only, alphabetical, no outcome claims. */}

      <ServiceConditions
        headingId="obgyn-conditions-heading"
        heading="Gynaecology conditions we treat"
        conditions={[
          "Adenomyosis",
          "Cervical cancer screening and prevention advice",
          "Endometriosis",
          "Heavy or painful periods",
          "High-risk pregnancy",
          "Irregular periods",
          "Pain during intercourse (dyspareunia)",
          "Perimenopause",
          "Polycystic ovary syndrome (PCOS)",
          "Pre-conception planning",
          "Recurrent pregnancy loss",
          "Uterine fibroids",
        ]}
        cta={{ label: "Book a consultation", href: "/book" }}
      />

      <ServiceInsight
        image={{ src: "/images/services/pages/period-pain-at-work.webp", alt: "A woman at her office desk pressing a hand to her lower abdomen in discomfort" }}
        headingId="obgyn-insight-heading"
        heading="Why gynaecology concerns are often missed"
        body="Irregular cycles, heavy bleeding and pelvic pain are common, and many women are told they are simply normal. A short appointment rarely leaves time to look for what is causing them."
        points={[
          "Symptoms are often treated one at a time rather than together",
          "Painful periods are often accepted as normal, which can delay a diagnosis such as endometriosis",
          "Cycles, hormones, fertility and mood are connected, and care works better when they are seen together",
        ]}
      />

      <ServiceModel
        headingId="obgyn-model-heading"
        heading="Consultation, scan and follow-up in one clinic"
        body="MyStree is a women's health clinic in Indiranagar. Your consultation, pelvic ultrasound and follow-up happen in one place, with a gynaecologist who has time to go through your history, your results and your choices."
        link={{ label: "Meet our doctors", href: "/doctors" }}
      />

      <ServiceFit
        headingId="obgyn-fit-heading"
        heading="Our gynaecology care is right for you if you have"
        items={[
          { icon: "cycle", label: "Periods that are irregular, heavy or painful" },
          { icon: "uterus", label: "Pelvic symptoms that have not settled with earlier treatment" },
          { icon: "seedling", label: "Plans for pregnancy, now or in the years ahead" },
          { icon: "branch", label: "Changes in your cycle or body in your forties and beyond" },
        ]}
      />

      <ServiceFacts
        headingId="obgyn-facts-heading"
        eyebrow="At a glance"
        heading="What every visit to MyStree is built on"
        facts={[
          { figure: "15 min", label: "with your gynaecologist at every consultation" },
          { figure: "5", label: "areas of care under one roof: obstetrics, gynaecology, pelvic health, nutrition and andrology" },
          { figure: "Mon–Sat", label: "9 am to 8 pm at the Indiranagar clinic" },
        ]}
      />

      <ServiceFaq
        headingId="obgyn-faq-heading"
        heading="Frequently asked questions"
        items={OBGYN_FAQS}
        allLink={{ label: "See all FAQs", href: "/faqs" }}
      />

      <ServiceAsk
        headingId="obgyn-ask-heading"
        heading="Still have questions?"
        note="Message our care team on WhatsApp, or read answers to common questions."
        whatsapp={{
          label: "Chat on WhatsApp",
          href: "https://wa.me/916366573772?text=Hi%20MyStree%2C%20I%20have%20a%20question%20about%20gynaecology%20care.",
        }}
        faqs={{ label: "Read the FAQs", href: "/faqs" }}
      />

      <ServicePlan
        headingId="obgyn-plan-heading"
        heading="A care plan for trying to conceive"
        lead="Gynaecologist consultations, follicular scans and nutrition advice in one plan, at one price, at our Indiranagar clinic."
        plan={{
          name: CARE_JOURNEY_BASIC.name,
          audience: "For women trying to conceive",
          price: "₹2,999",
          priceNote: "One price for the full plan",
        }}
        items={CARE_JOURNEY_BASIC.items}
        cta={{ label: "Book a consultation", href: "/book" }}
      />

      <ServiceQuestions
        image={{ src: "/images/services/pages/auto-rickshaw-ride-to-clinic-bengaluru.webp", alt: "A woman in an auto-rickshaw holding a file of reports on her way to an appointment" }}
        headingId="obgyn-questions-heading"
        heading="Seeing a gynaecologist in Indiranagar"
        questions={LOCAL_QUESTIONS}
      />

      <ServiceSteps
        image={{ src: "/images/services/pages/gynaecology-clinic-waiting-area.webp", alt: "A patient with a file of reports waits in the clinic waiting area" }}
        headingId="obgyn-steps-heading"
        heading="Four steps to your first visit"
        steps={[
          {
            title: "Book your visit",
            text: "Book online or message us on WhatsApp, and choose the doctor and time that suit you.",
          },
          {
            title: "Gather your reports",
            text: "Bring recent blood tests, scan reports and prescriptions, and note the date your last period started.",
          },
          {
            title: "Meet your gynaecologist",
            text: "Talk it through in an unhurried consultation at our Indiranagar clinic, with a pelvic ultrasound in the same visit if it is needed.",
          },
          {
            title: "Leave with a plan",
            text: "Go home knowing what is happening, what comes next and when to return. Follow-ups can be in the clinic or by video.",
          },
        ]}
        cta={{ label: "Book a consultation", href: "/book" }}
      />

      <ServiceSpecialists
        headingId="obgyn-specialists-heading"
        heading="Book with a gynaecologist"
        lead="Times shown are live from the MyStree booking system. Choose the doctor and time that suit you."
        consultationLabel="Clinic consultation"
        specialists={[
          {
            bookingId: 2,
            tag: "High-risk obstetrics",
            focus: ["High-risk pregnancy", "Recurrent pregnancy loss"],
            profileHref: "/doctors/dr-smitha-ap",
          },
          {
            bookingId: 1,
            tag: "Gynaecology",
            focus: ["Fertility", "Minimal access surgery"],
            profileHref: "/doctors/dr-surbhi-sinha",
          },
          {
            bookingId: 14,
            tag: "Gynaecology",
            focus: ["Antenatal care", "PCOS"],
          },
          {
            bookingId: 15,
            tag: "Gynaecology",
            focus: ["Minimally invasive surgery", "Infertility"],
          },
        ]}
      />

      <ServiceReading
        headingId="obgyn-reading-heading"
        heading="Reading from our gynaecologists"
        articles={reading}
        allLink={{ label: "All articles", href: "/blog" }}
        authorProfiles={authorProfiles}
      />

      <ServiceClosing
        headingId="obgyn-closing-heading"
        heading="Unhurried gynaecology care in Indiranagar starts with one visit."
        primary={{ label: "Book a consultation", href: "/book" }}
        secondary={{ label: "Meet our doctors", href: "/doctors" }}
      />
    </main>
  );
}
