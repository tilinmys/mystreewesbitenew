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
 * Menopause & Midlife Clinic — /services/menopause.
 *
 * The locked service-page template (color.md) with menopause content.
 *
 * SEO / AEO / GEO (competitor review, 12 Oct 2026): the Bengaluru pages
 * ranking for "menopause clinic Bangalore" (Manipal's per-branch menopause
 * clinic pages, Apollo's menopause listing) carry ~200 words of body copy,
 * no FAQs, no symptom list and no named clinicians. This page answers the
 * questions women actually search (perimenopause signs, HRT safety, tests,
 * bone health, early menopause) in short answer-first paragraphs, marks
 * them up as FAQPage, names the clinicians with Person references, and
 * ties the service to Indiranagar and neighbouring localities.
 *
 * Content rules applied to the supplied brief:
 *   - no patient testimonials, star ratings, review counts or "Verified
 *     Expert" badges (NMC notice, 06.10.2026); no "best" claims
 *   - fees and qualifications come from the booking system and doctor
 *     records via the specialist cards, not the brief (the brief's
 *     qualifications for Dr. Smitha A.P differ from lib/doctors.ts)
 *   - the opening quote is Dr. Surbhi Sinha's own words from lib/doctors.ts
 *   - the brief's WhatsApp "menopause community" is not presented as a
 *     group: its existence is not recorded in the repository
 *   - clinical answers follow the Indian Menopause Society, IMS/NAMS
 *     hormone therapy statements and NICE NG23 (2024)
 */

const PAGE_PATH = "/services/menopause";

export const revalidate = 300;

export const metadata: Metadata = {
  // The root layout appends "| MyStree".
  title: "Menopause & Perimenopause Care, Indiranagar",
  description:
    "Menopause & perimenopause care in Indiranagar: hot flushes, sleep, mood, hormone tests and bone health with gynaecologists, nutrition & pelvic physio.",
  alternates: { canonical: `${SITE_URL}${PAGE_PATH}` },
  openGraph: {
    title: "Menopause & Perimenopause Clinic in Indiranagar, Bengaluru | MyStree",
    description:
      "Menopause care: symptoms, treatment options, bone and heart health, nutrition and pelvic health in one clinic.",
    url: `${SITE_URL}${PAGE_PATH}`,
    type: "website",
    siteName: "MyStree Women's Health Clinic",
  },
};

/*
 * Local questions: what women ask before choosing a menopause doctor in
 * Indiranagar. Repository facts only.
 */
const LOCAL_QUESTIONS = [
  {
    question: "What happens at a menopause consultation at MyStree?",
    answer:
      "Your gynaecologist goes through your periods, symptoms, sleep, mood, medical and family history and current medicines, checks your blood pressure and weight, and advises which tests, if any, you need. You leave with a plan that may include lifestyle and nutrition changes and other treatment options, and a date to review how it is working.",
  },
  {
    question: "Do I need blood tests before my first visit?",
    answer:
      "No. Bring any recent reports you already have, such as thyroid, blood sugar, cholesterol, vitamin D, a pap smear, mammogram or bone density scan. Your doctor will advise which tests are useful for you rather than ordering a fixed panel.",
  },
  {
    question: "Who will I see for menopause care?",
    answer:
      "Menopause care is led by gynaecologists Dr. Smitha A.P and Dr. Surbhi Sinha, with nutritionist Priyanka Savina for weight, diet and bone health, and women's health physiotherapist Dr. Jasmine Flora for pelvic floor, bladder and joint concerns.",
  },
  {
    question: "Which symptoms after menopause need urgent attention?",
    answer:
      "Any vaginal bleeding a year or more after your last period should be checked promptly, as should a new breast lump. Chest pain, sudden breathlessness or one-sided weakness need the nearest hospital emergency department straight away. For non-urgent questions, call or message the clinic on +91 63665 73772.",
  },
  {
    question: "Where is MyStree in Indiranagar?",
    answer:
      "MyStree is at No. 3366, 13th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru 560008, a short distance from 100 Feet Road and easy to reach from Domlur, Jeevan Bhima Nagar, HAL, Koramangala and Old Airport Road. Book online or message the care team on WhatsApp at +91 63665 73772.",
  },
] as const;

/*
 * FAQ: the menopause questions women search, answered to current guidance
 * (Indian Menopause Society; IMS 2016 and NAMS 2022 hormone therapy
 * statements; NICE NG23, 2024; FSRH on contraception).
 */
const MENOPAUSE_FAQS = [
  {
    question: "What is the average age of menopause in India?",
    answer:
      "Menopause is usually recognised when you have had no period for 12 months in a row, though hormonal contraception or some treatments can hide this, so your doctor will look at your whole history. Indian women reach it at an average age of about 46 to 47, a few years earlier than women in Western countries. Menopause before 40 is called premature menopause (premature ovarian insufficiency), and before 45 early menopause; both need a doctor's assessment.",
  },
  {
    question: "What are the first signs of perimenopause?",
    answer:
      "Perimenopause usually begins in your 40s and can last four to ten years. Early signs include periods that become irregular, heavier or closer together, hot flushes and night sweats, poor sleep, mood changes or anxiety, brain fog, joint aches, vaginal dryness and lower libido. You can still get pregnant during perimenopause.",
  },
  {
    question: "What treatment options are there for menopause symptoms?",
    answer:
      "Options range from lifestyle and nutrition changes to medical treatments, some with hormones and some without. Every treatment has benefits and risks that depend on your age, health and family history, so your gynaecologist reviews these with you and explains each option before you decide.",
  },
  {
    question: "Are there non-hormonal treatments for hot flushes?",
    answer:
      "Yes. Cognitive behavioural therapy and changes such as regular exercise, weight management, limiting alcohol and caffeine and keeping the bedroom cool help many women, and your gynaecologist can explain non-hormonal medical options for women who cannot or prefer not to take hormones.",
  },
  {
    question: "Which blood tests are done for menopause?",
    answer:
      "Over 45, menopause is usually diagnosed from your symptoms and periods, without a hormone test. FSH and other hormone levels are useful if you are under 45 or symptoms are unclear. Thyroid function, blood sugar, cholesterol, vitamin D and a blood count are often checked because they can cause similar symptoms or matter more after menopause.",
  },
  {
    question: "When should I have a bone density (DEXA) scan?",
    answer:
      "A DEXA scan is recommended for women from 65, and earlier after menopause if you have risk factors such as early menopause, low body weight, smoking, long-term steroid use, a previous fracture or a parent who broke a hip. Calcium, vitamin D, protein and weight-bearing exercise all help protect bones.",
  },
  {
    question: "What helps vaginal dryness and painful sex after menopause?",
    answer:
      "Vaginal moisturisers and lubricants help many women, and your gynaecologist can explain treatments that act locally. Pelvic floor physiotherapy also helps with pain, bladder leaks and urgency.",
  },
  {
    question: "Do I still need contraception in perimenopause?",
    answer:
      "Yes. Continue contraception until you have had no periods for two years if you are under 50, or for one year if you are over 50. Your doctor can suggest a method that also helps heavy or irregular bleeding.",
  },
] as const;

const MENOPAUSE_READING_SLUGS = ["perimenopause-symptoms-age-40"] as const;

function generateStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      clinicNode(),
      {
        "@type": "MedicalWebPage",
        "@id": `${SITE_URL}${PAGE_PATH}#page`,
        url: `${SITE_URL}${PAGE_PATH}`,
        name: "Menopause & Perimenopause Clinic in Indiranagar, Bengaluru | MyStree",
        description: metadata.description,
        inLanguage: "en-IN",
        isPartOf: { "@id": CLINIC_ID },
        about: [
          { "@id": `${SITE_URL}${PAGE_PATH}#service` },
          { "@type": "MedicalCondition", name: "Menopause", alternateName: ["Perimenopause", "Climacteric"] },
        ],
        breadcrumb: { "@id": `${SITE_URL}${PAGE_PATH}#breadcrumb` },
      },
      {
        "@type": "MedicalService",
        "@id": `${SITE_URL}${PAGE_PATH}#service`,
        name: "Menopause and Perimenopause Care",
        serviceType: [
          "Menopause consultation",
          "Perimenopause care",
          "Menopause care consultation",
          "Care for hot flushes and night sweats",
          "Hormone and thyroid evaluation",
          "Bone health and osteoporosis screening",
          "Genitourinary syndrome of menopause care",
          "Menopause nutrition and weight management",
          "Pelvic floor physiotherapy",
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
      faqNode(PAGE_PATH, [...MENOPAUSE_FAQS, ...LOCAL_QUESTIONS]),
      breadcrumbNode(PAGE_PATH, "Menopause Clinic"),
    ],
  };
}

export default async function MenopausePage() {
  const reading = await getArticles(MENOPAUSE_READING_SLUGS);
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
          image={{ src: "/images/services/pages/menopause-consultation-indiranagar-bengaluru.webp", alt: "A woman in her fifties describes her symptoms during a consultation" }}
          headingId="menopause-hero-heading"
          title="Menopause and perimenopause care in Indiranagar"
          lead="Menopause care for hot flushes, sleep, mood and bone health, with gynaecologists, nutrition and pelvic physiotherapy in one clinic on 13th Main Road, Indiranagar."
          primaryCta={{ label: "Book a menopause consultation", href: "/book" }}
          secondaryCta={{ label: "Call the clinic", href: "tel:+916366573772" }}
        />
      </ServiceBand>

      <ServiceSpecialists
        headingId="menopause-specialists-heading"
        heading="Book a menopause consultation"
        lead="Times shown are live from the MyStree booking system. Choose the doctor and time that suit you."
        consultationLabel="Clinic consultation"
        specialists={[
          {
            bookingId: 2,
            tag: "Gynaecology",
            focus: ["Menopause care", "Bone health"],
            profileHref: "/doctors/dr-smitha-ap",
          },
          {
            bookingId: 1,
            tag: "Hormonal health",
            focus: ["Perimenopause", "Early menopause"],
            profileHref: "/doctors/dr-surbhi-sinha",
          },
          {
            bookingId: 3,
            tag: "Nutrition",
            focus: ["Menopause diet", "Weight and metabolism"],
            profileHref: "/doctors/priyanka-savina",
          },
          {
            bookingId: 7,
            tag: "Pelvic physiotherapy",
            focus: ["Pelvic floor", "Bladder health"],
            profileHref: "/doctors/dr-jasmine-flora",
          },
        ]}
      />

      <ServiceConditions
        headingId="menopause-conditions-heading"
        heading="Menopause concerns we care for"
        conditions={[
          "Bladder leaks and urgency",
          "Brain fog and poor concentration",
          "Early and premature menopause",
          "Heavy or irregular periods in perimenopause",
          "Hot flushes and night sweats",
          "Joint pain and muscle aches",
          "Low libido and painful sex",
          "Mood changes and anxiety",
          "Osteoporosis and bone health",
          "Sleep problems",
          "Vaginal dryness",
          "Weight gain and metabolic changes",
        ]}
        cta={{ label: "Book a menopause consultation", href: "/book" }}
      />

      <ServiceSteps
        image={{ src: "/images/services/pages/morning-walk-women-in-their-fifties-bengaluru.webp", alt: "Two women in their fifties on a morning walk in a neighbourhood park" }}
        headingId="menopause-steps-heading"
        heading="How your menopause care works"
        steps={[
          {
            title: "Listen",
            text: "A full history of your periods, symptoms, sleep, mood and family health.",
          },
          {
            title: "Assess",
            text: "Only the tests you need: thyroid, sugar, cholesterol, vitamin D, bone density.",
          },
          {
            title: "Plan",
            text: "Lifestyle, nutrition and treatment options, chosen with you.",
          },
          {
            title: "Review",
            text: "A follow-up at about three months, then yearly checks for bone and heart health.",
          },
        ]}
        cta={{ label: "Book a menopause consultation", href: "/book" }}
      />

      <ServiceQuote
        quote="Every woman's body and circumstances are different, and her care should be explained and planned with that in mind."
        name="Dr. Surbhi Sinha"
      />

      <ServiceFit
        headingId="menopause-fit-heading"
        heading="Our menopause care is right for you if you have"
        items={[
          { icon: "cycle", label: "Periods that have become irregular, heavier or stopped, with new symptoms" },
          { icon: "mind", label: "Hot flushes, night sweats, poor sleep, low mood or brain fog" },
          { icon: "conversation", label: "Questions about treatment options that need a proper conversation, not a quick yes or no" },
          { icon: "monitor", label: "Concerns about bone, heart, weight or pelvic health after menopause" },
        ]}
      />

      <ServiceInsight
        image={{ src: "/images/services/pages/night-sweats-hot-flushes-perimenopause.webp", alt: "A woman awake at night fanning herself by an open window" }}
        headingId="menopause-insight-heading"
        heading="Why menopause symptoms are often missed"
        body="Perimenopause can begin years before periods stop, and its symptoms are easily put down to stress, thyroid trouble or simply getting older."
        points={[
          "Anxiety, poor sleep and brain fog are often treated on their own, without asking about periods",
          "Treatment options are not always discussed in full, with your own risks and benefits weighed",
          "Bone, heart and pelvic health change quietly after menopause and deserve a plan before problems appear",
        ]}
      />

      <ServiceModel
        headingId="menopause-model-heading"
        heading="A physician-led approach to menopause"
        body="Menopause care at MyStree is led by gynaecologists Dr. Smitha A.P and Dr. Surbhi Sinha, with nutritionist Priyanka Savina and pelvic physiotherapist Dr. Jasmine Flora. Your symptoms, history and test results are reviewed together, and every option, hormonal or not, is explained so the decision is yours."
        link={{ label: "Meet our doctors", href: "/doctors" }}
      />

      <ServiceStat
        headingId="menopause-stat-heading"
        heading="Menopause care that treats the whole of you, not one symptom."
        figure="23 years"
        caption="of experience in obstetrics and gynaecology behind Dr. Smitha A.P's care."
      />

      <ServiceFacts
        headingId="menopause-facts-heading"
        eyebrow="At a glance"
        heading="What menopause care at MyStree is built on"
        facts={[
          { figure: "12 months", label: "without a period confirms menopause; our care starts earlier, in perimenopause" },
          { figure: "4", label: "clinicians in one clinic: gynaecology, nutrition and pelvic physiotherapy" },
          { figure: "Mon–Sat", label: "9 am to 8 pm at the Indiranagar clinic" },
        ]}
      />

      <ServiceQuestions
        image={{ src: "/images/services/pages/friends-sharing-filter-coffee-bengaluru.webp", alt: "Two women in their fifties sharing filter coffee outside a darshini" }}
        headingId="menopause-questions-heading"
        heading="Menopause care in Indiranagar"
        questions={LOCAL_QUESTIONS}
      />

      <ServiceFaq
        headingId="menopause-faq-heading"
        heading="Frequently asked questions"
        items={MENOPAUSE_FAQS}
        allLink={{ label: "See all FAQs", href: "/faqs" }}
      />

      <ServiceAsk
        headingId="menopause-ask-heading"
        heading="Still have questions?"
        note="Message our care team on WhatsApp, or read answers to common questions."
        whatsapp={{
          label: "Chat on WhatsApp",
          href: "https://wa.me/916366573772?text=Hi%20MyStree%2C%20I%20have%20a%20question%20about%20menopause%20care.",
        }}
        faqs={{ label: "Read the FAQs", href: "/faqs" }}
      />

      <ServiceReading
        headingId="menopause-reading-heading"
        heading="Reading on menopause from our doctors"
        articles={reading}
        allLink={{ label: "All articles", href: "/blog" }}
        authorProfiles={authorProfiles}
      />

      <ServiceClosing
        headingId="menopause-closing-heading"
        heading="Menopause care in Indiranagar with time for every question."
        primary={{ label: "Book a menopause consultation", href: "/book" }}
        secondary={{ label: "Meet our doctors", href: "/doctors" }}
      />
    </main>
  );
}
