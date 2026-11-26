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
 * Dermatology & Skin Care — /services/dermatology.
 *
 * The locked service-page template (color.md) with dermatology content. The
 * route is the previous my-stree.com URL, so the page keeps any ranking and
 * links that address already has.
 *
 * Clinician: Dr. Nivetha, MBBS, MD (DVL), dermatologist at the 13th Main
 * Road clinic, booking ID 8 in the live booking system (in clinic and
 * online). Her experience and bio are empty there, so the page states only
 * her degree. She has no profile page yet.
 *
 * Content rules applied to the supplied brief:
 *   - no testimonials ("Divya K."), no "89% clearance" figure, no ratings
 *     (NMC notice, 06.10.2026; the figure has no source)
 *   - no claims against named or unnamed competitors ("skin chains on 100
 *     Feet Road", Oliva, Kaya, Kosmoderma, Cutis)
 *   - procedures not on record are not offered (PRP, mesotherapy,
 *     microneedling, medical peels, peptide serums, trichoscopy as a
 *     named service); the page says the dermatologist will discuss
 *     procedures where they would help
 *   - the brief's address (2nd floor, 560061), second phone number,
 *     mystree.org domain and map coordinates are not used; the repository's
 *     are (lib/clinic.ts, lib/service-schema.ts)
 *   - medicines are named only where safety requires it (pregnancy)
 *   - no "best", "leading" or similar wording (Google Ads review, Oct 2026)
 */

const PAGE_PATH = "/services/dermatology";

export const metadata: Metadata = {
  // The root layout appends "| MyStree".
  title: "Dermatologist for Women in Indiranagar, Bengaluru",
  description:
    "Women's dermatology in Indiranagar, Bengaluru: hormonal and PCOS acne, postpartum hair fall, melasma, pregnancy-safe skin and scalp care.",
  alternates: { canonical: `${SITE_URL}${PAGE_PATH}` },
  openGraph: {
    title: "Dermatologist for Women in Indiranagar, Bengaluru | MyStree",
    description:
      "Skin and hair care that looks at hormones, pregnancy and nutrition too, with a dermatologist who works alongside our gynaecologists.",
    url: `${SITE_URL}${PAGE_PATH}`,
    type: "website",
    siteName: "MyStree Women's Health Clinic",
  },
};

/*
 * Local questions: what women ask before booking a dermatologist in
 * Indiranagar. Repository and booking-system facts only.
 */
const LOCAL_QUESTIONS = [
  {
    question: "What happens at my first dermatology appointment?",
    answer:
      "Dr. Nivetha looks closely at your skin, scalp or hair, and asks how long the problem has been there, what makes it better or worse, what you already use on your skin, and about your periods, pregnancy plans and any medicines. You leave with a plan, and blood tests only if your history suggests a hormonal or nutritional cause.",
  },
  {
    question: "What should I bring?",
    answer:
      "A list or photos of the products and medicines you use, photos of flare-ups if your skin looks different on the day, and any recent blood reports. Tell us if you are pregnant, trying to conceive or breastfeeding, because it changes which treatments are safe.",
  },
  {
    question: "Can I see the dermatologist and the gynaecologist together?",
    answer:
      "They work in the same clinic, so when acne, excess hair or hair loss may be linked to PCOS or thyroid, your dermatologist can involve Dr. Surbhi Sinha or Dr. Smitha A.P, and nutritionist Priyanka Savina for diet and weight.",
  },
  {
    question: "Where is MyStree in Indiranagar?",
    answer:
      "MyStree is at No. 3366, 13th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru 560008, a short distance from 100 Feet Road and easy to reach from Domlur, Jeevan Bhima Nagar, HAL, Ulsoor and Old Airport Road. Book online or message the care team on WhatsApp at +91 63665 73772.",
  },
] as const;

/*
 * FAQ: skin and hair questions women search, answered to current guidance
 * (Indian Association of Dermatologists, Venereologists and Leprologists;
 * British Association of Dermatologists patient information; the 2023
 * International Evidence-based Guideline for PCOS).
 */
const DERMATOLOGY_FAQS = [
  {
    question: "Can PCOS cause acne and facial hair?",
    answer:
      "Yes. In PCOS the body makes more androgens, hormones that drive oil, acne along the jaw and chin, and coarse hair on the face or body. Skin treatment works best alongside care for the PCOS itself, which may include treatment from a gynaecologist and, if you carry extra weight, losing 5 to 10 percent of it.",
  },
  {
    question: "Why am I losing so much hair after having a baby?",
    answer:
      "Heavy shedding two to four months after birth is common and is called postpartum telogen effluvium. Hair held in the growing phase during pregnancy falls out together once hormones settle. It usually recovers within six to twelve months. If it is very heavy or lasts longer, iron, thyroid and vitamin D levels are worth checking.",
  },
  {
    question: "Which acne treatments are safe in pregnancy?",
    answer:
      "Some acne medicines, including certain tablets and creams, should be avoided in pregnancy, and others are suitable. Always tell your dermatologist if you are pregnant, trying to conceive or breastfeeding, so every product is checked for safety.",
  },
  {
    question: "What causes melasma, and can it be cured?",
    answer:
      "Melasma is patchy brown pigment on the cheeks, forehead or upper lip, triggered by sunlight and hormones such as pregnancy or the pill, and common in Indian skin. It can be controlled well but often returns, so daily broad-spectrum sunscreen of SPF 30 or more, reapplied through the day, matters as much as any cream.",
  },
  {
    question: "How much hair fall is normal?",
    answer:
      "Losing around 50 to 100 hairs a day is normal. See a dermatologist if you notice much more than that, a widening parting, thinning at the crown or bald patches. Common causes in women include low iron, thyroid problems, PCOS, stress, a recent illness and childbirth.",
  },
  {
    question: "How long does acne treatment take to work?",
    answer:
      "Most acne treatments take six to twelve weeks to show a clear difference, and skin can look a little worse in the first few weeks. Stopping early is the commonest reason treatment seems not to work, so a review visit is planned before changing course.",
  },
  {
    question: "Do I need blood tests for acne or hair fall?",
    answer:
      "Not always. Tests help when your history points to an internal cause, such as irregular periods, new facial hair, sudden heavy shedding or tiredness. Hormone levels, thyroid function, iron stores and vitamin D are the ones most often checked.",
  },
  {
    question: "Can a dermatologist treat itching or skin problems in the genital area?",
    answer:
      "Yes. Dermatologists with an MD in dermatology, venereology and leprosy are trained in genital skin conditions, such as long-standing itching, lichen sclerosus, fungal infections and warts, as well as sexually transmitted infections. The examination is private and explained first.",
  },
] as const;

const DERMATOLOGY_READING_SLUGS = [] as const;

function generateStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      clinicNode(),
      {
        "@type": "MedicalWebPage",
        "@id": `${SITE_URL}${PAGE_PATH}#page`,
        url: `${SITE_URL}${PAGE_PATH}`,
        name: "Dermatologist for Women in Indiranagar, Bengaluru | MyStree",
        description: metadata.description,
        inLanguage: "en-IN",
        isPartOf: { "@id": CLINIC_ID },
        about: [
          { "@id": `${SITE_URL}${PAGE_PATH}#service` },
          { "@type": "MedicalCondition", name: "Acne vulgaris" },
          { "@type": "MedicalCondition", name: "Telogen effluvium" },
          { "@type": "MedicalCondition", name: "Melasma" },
          { "@type": "MedicalCondition", name: "Hirsutism" },
        ],
        breadcrumb: { "@id": `${SITE_URL}${PAGE_PATH}#breadcrumb` },
      },
      {
        "@type": "MedicalService",
        "@id": `${SITE_URL}${PAGE_PATH}#service`,
        name: "Dermatology and Skin Care for Women",
        serviceType: [
          "Dermatology consultation",
          "Hormonal and PCOS acne care",
          "Hair loss and postpartum hair fall care",
          "Melasma and pigmentation care",
          "Pregnancy and breastfeeding skin care",
          "Eczema, fungal infection and scalp care",
          "Genital skin conditions",
        ],
        medicalSpecialty: "Dermatology",
        provider: { "@id": CLINIC_ID },
        employee: [
          { "@type": "Person", name: "Dr. Nivetha", jobTitle: "Dermatologist", hasCredential: "MBBS, MD (DVL)" },
          clinicianRef("dr-surbhi-sinha", "Dr. Surbhi Sinha"),
          clinicianRef("priyanka-savina", "Priyanka Savina"),
        ],
        areaServed: {
          "@type": "City",
          name: clinic.city,
          containsPlace: { "@type": "Place", name: clinic.locality },
        },
      },
      faqNode(PAGE_PATH, [...DERMATOLOGY_FAQS, ...LOCAL_QUESTIONS]),
      breadcrumbNode(PAGE_PATH, "Dermatology"),
    ],
  };
}

export default async function DermatologyPage() {
  const reading = await getArticles(DERMATOLOGY_READING_SLUGS);
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
          image={{ src: "/images/services/pages/hormonal-acne-dermatology-indiranagar-bengaluru.webp", alt: "A woman examines acne along her jaw in a bathroom mirror" }}
          headingId="dermatology-hero-heading"
          title="Dermatology and skin care for women in Indiranagar"
          lead="Care for acne, hair fall, pigmentation and skin changes in pregnancy and menopause, with a dermatologist who works alongside our gynaecologists and nutritionist on 13th Main Road, Indiranagar."
          primaryCta={{ label: "Book a skin consultation", href: "/book" }}
          secondaryCta={{ label: "Call the clinic", href: "tel:+916366573772" }}
        />
      </ServiceBand>

      <ServiceSpecialists
        headingId="dermatology-specialists-heading"
        heading="Book with our dermatologist and nutritionist"
        lead="Times shown are live from the MyStree booking system. Choose the doctor and time that suit you."
        consultationLabel="Clinic consultation"
        specialists={[
          {
            bookingId: 8,
            tag: "Dermatology",
            focus: ["Acne and pigmentation", "Hair and scalp"],
            profileHref: "/doctors/dr-nivetha",
          },
          {
            bookingId: 3,
            tag: "Nutrition",
            focus: ["PCOS diet", "Hair and skin nutrition"],
            profileHref: "/doctors/priyanka-savina",
          },
        ]}
      />

      <ServiceConditions
        headingId="dermatology-conditions-heading"
        heading="Skin and hair concerns we care for"
        conditions={[
          "Acne along the jaw and chin",
          "Dandruff and scalp conditions",
          "Eczema and dry, itchy skin",
          "Excess facial or body hair",
          "Fungal skin infections",
          "Genital skin conditions",
          "Hair fall after delivery",
          "Hair thinning and hair loss",
          "Hives and skin allergies",
          "Melasma and dark patches",
          "Skin changes in pregnancy",
          "Teenage acne",
        ]}
        cta={{ label: "Book a skin consultation", href: "/book" }}
      />

      <ServiceSteps
        image={{ src: "/images/services/pages/evening-skincare-routine-at-home.webp", alt: "A woman applies a small amount of cream at her dressing table" }}
        headingId="dermatology-steps-heading"
        heading="How your skin care works"
        steps={[
          {
            title: "Look",
            text: "A close look at your skin, scalp and hair, with your history and products.",
          },
          {
            title: "Test",
            text: "Hormone, thyroid, iron or vitamin D tests only when your history points to them.",
          },
          {
            title: "Treat",
            text: "Medicines and skincare suited to your skin and your life stage.",
          },
          {
            title: "Review",
            text: "A follow-up at six to twelve weeks to see what is working and adjust.",
          },
        ]}
        cta={{ label: "Book a skin consultation", href: "/book" }}
      />

      <ServiceFit
        headingId="dermatology-fit-heading"
        heading="Our dermatology care is right for you if you have"
        items={[
          { icon: "ovary", label: "Acne, excess hair or hair thinning with irregular periods or PCOS" },
          { icon: "pregnancy", label: "Skin or hair changes in pregnancy, after birth or while breastfeeding" },
          { icon: "cycle", label: "Breakouts that flare every month before your period" },
          { icon: "conversation", label: "Tried many products and want a plan that explains why" },
        ]}
      />

      <ServiceInsight
        image={{ src: "/images/services/pages/dermatologist-dermatoscope-skin-examination.webp", alt: "A dermatologist examines a patient's cheek with a handheld dermatoscope" }}
        headingId="dermatology-insight-heading"
        heading="Why skin and hair problems keep coming back"
        body="Many skin and hair problems in women are tied to hormones, nutrition and life stage, so treating the surface alone often brings only a short break."
        points={[
          "Jawline acne, new facial hair and thinning hair can be signs of PCOS or thyroid problems",
          "Harsh scrubs and strong peels can irritate Indian skin and leave dark marks that outlast the acne",
          "Many skin medicines are not safe in pregnancy or breastfeeding, so treatment needs planning around them",
        ]}
      />

      <ServiceModel
        headingId="dermatology-model-heading"
        heading="Dermatology that works with your gynaecologist"
        body="Dermatology at MyStree is led by Dr. Nivetha, a dermatologist with an MD in dermatology, venereology and leprosy. Because she works in the same clinic as gynaecologists Dr. Surbhi Sinha and Dr. Smitha A.P and nutritionist Priyanka Savina, acne, hair and skin changes linked to PCOS, thyroid, pregnancy or menopause are looked at together, and every treatment is checked against your plans for pregnancy or breastfeeding."
        link={{ label: "Meet our doctors", href: "/doctors" }}
      />

      <ServiceStat
        headingId="dermatology-stat-heading"
        heading="Skin and hair often show what is happening inside."
        figure="MD (DVL)"
        caption="the postgraduate degree in dermatology, venereology and leprosy behind Dr. Nivetha's care."
      />

      <ServiceFacts
        headingId="dermatology-facts-heading"
        eyebrow="At a glance"
        heading="What skin care at MyStree is built on"
        facts={[
          { figure: "MD (DVL)", label: "consultant dermatologist, in clinic or online" },
          { figure: "3", label: "specialities on hormonal skin and hair: dermatology, gynaecology and nutrition" },
          { figure: "Mon–Sat", label: "9 am to 8 pm at the Indiranagar clinic" },
        ]}
      />

      <ServiceQuestions
        image={{ src: "/images/services/pages/applying-sunscreen-on-balcony-bengaluru.webp", alt: "A woman applying sunscreen on her balcony in the morning" }}
        headingId="dermatology-questions-heading"
        heading="Dermatology in Indiranagar"
        questions={LOCAL_QUESTIONS}
      />

      <ServiceFaq
        headingId="dermatology-faq-heading"
        heading="Frequently asked questions"
        items={DERMATOLOGY_FAQS}
        allLink={{ label: "See all FAQs", href: "/faqs" }}
      />

      <ServiceAsk
        headingId="dermatology-ask-heading"
        heading="Still have questions?"
        note="Message our care team on WhatsApp, or read answers to common questions."
        whatsapp={{
          label: "Chat on WhatsApp",
          href: "https://wa.me/916366573772?text=Hi%20MyStree%2C%20I%20have%20a%20question%20about%20dermatology.",
        }}
        faqs={{ label: "Read the FAQs", href: "/faqs" }}
      />

      <ServiceReading
        headingId="dermatology-reading-heading"
        heading="Reading from our doctors"
        articles={reading}
        allLink={{ label: "All articles", href: "/blog" }}
        authorProfiles={authorProfiles}
      />

      <ServiceClosing
        headingId="dermatology-closing-heading"
        heading="Skin care that looks beneath the surface."
        primary={{ label: "Book a skin consultation", href: "/book" }}
        secondary={{ label: "Meet our doctors", href: "/doctors" }}
      />
    </main>
  );
}
