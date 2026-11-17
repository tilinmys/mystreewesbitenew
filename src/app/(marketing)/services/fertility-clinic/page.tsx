import type { Metadata } from "next";

import { ServiceAsk } from "@/components/services/service-ask";
import { ServiceBand } from "@/components/services/service-band";
import { ServiceClosing } from "@/components/services/service-closing";
import { ServiceFacts } from "@/components/services/service-facts";
import { ServiceFaq } from "@/components/services/service-faq";
import { ServiceHero } from "@/components/services/service-hero";
import { ServiceSpecialists } from "@/components/services/service-specialists";
import { ServiceSteps } from "@/components/services/service-steps";
import styles from "@/components/services/service-page.module.css";
import { SITE_URL, clinic } from "@/lib/clinic";
import { CLINIC_ID, breadcrumbNode, clinicNode, clinicianRef, faqNode } from "@/lib/service-schema";

/*
 * Fertility consultations — /services/fertility-clinic.
 *
 * Compliance (Growthamp website review, 13 Nov 2026, item 1; ART Act 2021
 * s.15, 25, 27; NMC Guidelines on Ethical Advertising 8.1(i), (iii), (ix);
 * CCPA): until the clinic's ART registration is confirmed, this page
 *   - is not linked from the menu, the home page or any other page, is left
 *     out of the sitemap and llms.txt, and is set to noindex;
 *   - states factual consultation information only: no IUI, IVF, ICSI, egg
 *     freezing, donor programme, PGT or treatment package, no outcome or
 *     success figures, no unsourced statistics, no named medicines, no
 *     comparison with other clinics and no accreditation claim.
 * Restore ART content only after the registration certificate (clinic and,
 * where relevant, bank) is on file.
 */

const PAGE_PATH = "/services/fertility-clinic";

export const metadata: Metadata = {
  // The root layout appends "| MyStree".
  title: "Fertility Consultations in Indiranagar, Bengaluru",
  description:
    "Fertility consultations are available at the MyStree clinic on 13th Main Road, Indiranagar, Bengaluru. A doctor reviews both partners' health and test results and explains the next steps.",
  alternates: { canonical: `${SITE_URL}${PAGE_PATH}` },
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

const QUESTIONS = [
  {
    question: "What happens at a first fertility consultation at MyStree?",
    answer:
      "A first fertility consultation is a 15-minute appointment. The doctor reviews both partners' medical histories, the menstrual cycle pattern and any earlier test reports, and may advise an ultrasound scan of the uterus and ovaries.",
  },
  {
    question: "When should we see a doctor about fertility?",
    answer:
      "See a doctor after 12 months of regular unprotected sex without a pregnancy if the woman is under 35, or after 6 months if she is 35 or older. Go sooner if periods are irregular or absent, or if there is known PCOS, endometriosis, previous pelvic surgery or a known problem with the semen.",
  },
  {
    question: "Should my partner be tested too?",
    answer:
      "Yes. Fertility depends on both partners, so a semen analysis is usually part of the first set of tests, and both partners are seen together from the first consultation.",
  },
  {
    question: "What tests are done to check female fertility?",
    answer:
      "Common tests include a pelvic ultrasound to check the uterus and ovaries, an AMH blood test for ovarian reserve, day 2 or 3 hormone tests, thyroid and prolactin levels, and a test to check that the fallopian tubes are open. Your doctor advises which tests are needed for you.",
  },
  {
    question: "What does a low AMH level mean?",
    answer:
      "A low AMH means fewer eggs remain in the ovaries than expected for your age. It does not show whether you can conceive naturally and does not measure egg quality. Your doctor explains what the result means for you.",
  },
  {
    question: "How much does a fertility consultation cost at MyStree?",
    answer:
      "The consultation fee depends on the doctor you choose and is shown before you confirm your booking.",
  },
  {
    question: "Where is MyStree in Indiranagar?",
    answer: `MyStree is at ${clinic.streetAddress}, ${clinic.city}. Book online or message the clinic on WhatsApp at +91 63665 73772.`,
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
        name: "Fertility Consultations in Indiranagar, Bengaluru | MyStree",
        description: metadata.description,
        inLanguage: "en-IN",
        isPartOf: { "@id": CLINIC_ID },
        about: { "@id": `${SITE_URL}${PAGE_PATH}#service` },
        breadcrumb: { "@id": `${SITE_URL}${PAGE_PATH}#breadcrumb` },
      },
      {
        "@type": "MedicalService",
        "@id": `${SITE_URL}${PAGE_PATH}#service`,
        name: "Fertility consultation",
        serviceType: ["Fertility consultation for both partners", "Pelvic ultrasound", "Hormone blood tests", "Semen analysis"],
        provider: { "@id": CLINIC_ID },
        employee: [
          clinicianRef("dr-chaitra-nayak", "Dr. Chaitra Nayak"),
          clinicianRef("dr-surbhi-sinha", "Dr. Surbhi Sinha"),
          clinicianRef("dr-smitha-ap", "Dr. Smitha A.P"),
        ],
        areaServed: {
          "@type": "City",
          name: clinic.city,
          containsPlace: { "@type": "Place", name: clinic.locality },
        },
      },
      faqNode(PAGE_PATH, QUESTIONS),
      breadcrumbNode(PAGE_PATH, "Fertility consultations"),
    ],
  };
}

export default function FertilityClinicPage() {
  const jsonLd = generateStructuredData();
  const whatsapp = "https://wa.me/916366573772?text=Hi%20MyStree%2C%20I%20have%20a%20question%20about%20a%20fertility%20consultation.";

  return (
    <main className={styles.pageRoot}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <ServiceBand>
        <ServiceHero
          image={{ src: "/images/services/pages/fertility-consultation-couple-indiranagar-bengaluru.webp", alt: "A couple asks questions during a consultation, holding a folder of past reports" }}
          headingId="fertility-hero-heading"
          title="Fertility consultations in Indiranagar"
          lead="Fertility consultations are available at our clinic on 13th Main Road, Indiranagar. A doctor reviews both partners' health and any earlier test results, and explains the next steps."
          primaryCta={{ label: "Book a consultation", href: "/book" }}
          secondaryCta={{ label: "WhatsApp the clinic", href: whatsapp, external: true }}
        />
      </ServiceBand>

      <ServiceSpecialists
        headingId="fertility-specialists-heading"
        heading="Book a consultation"
        lead="Times shown are live from the MyStree booking system. Choose the doctor and time that suit you."
        consultationLabel="Clinic consultation"
        specialists={[
          { bookingId: 4, tag: "Reproductive medicine", focus: ["PCOS", "Endometriosis"], profileHref: "/doctors/dr-chaitra-nayak" },
          { bookingId: 1, tag: "Obstetrics and gynaecology", focus: ["Fertility consultations", "Gynaecology"], profileHref: "/doctors/dr-surbhi-sinha" },
          { bookingId: 2, tag: "High-risk obstetrics", focus: ["Recurrent pregnancy loss", "High-risk pregnancy"], profileHref: "/doctors/dr-smitha-ap" },
        ]}
      />

      <ServiceSteps
        image={{ src: "/images/services/pages/follicular-scan-ultrasound-room.webp", alt: "A nurse prepares the ultrasound room while a patient waits" }}
        headingId="fertility-steps-heading"
        heading="What a consultation covers"
        steps={[
          { title: "Meet as a couple", text: "A 15-minute consultation on both partners' health and any earlier tests." },
          { title: "Tests, if advised", text: "An ultrasound scan, blood tests and a semen analysis, as your doctor advises." },
          { title: "Your results", text: "Your doctor explains the results and the options, including a referral where needed." },
        ]}
        cta={{ label: "Book a consultation", href: "/book" }}
      />

      <ServiceFacts
        headingId="fertility-facts-heading"
        eyebrow="At a glance"
        heading="About a fertility consultation at MyStree"
        facts={[
          { figure: "15 min", label: "for the first consultation" },
          { figure: "2", label: "partners seen together, from the first visit" },
          { figure: "Mon–Sat", label: "9 am to 8 pm at the Indiranagar clinic" },
        ]}
      />

      <ServiceFaq headingId="fertility-faq-heading" heading="Frequently asked questions" items={QUESTIONS} allLink={{ label: "See all FAQs", href: "/faqs" }} />

      <ServiceAsk
        headingId="fertility-ask-heading"
        heading="Still have questions?"
        note="Message the clinic on WhatsApp, or read answers to common questions."
        whatsapp={{ label: "WhatsApp the clinic", href: whatsapp }}
        faqs={{ label: "Read the FAQs", href: "/faqs" }}
      />

      <ServiceClosing
        headingId="fertility-closing-heading"
        heading="Fertility consultations at our Indiranagar clinic."
        primary={{ label: "Book a consultation", href: "/book" }}
        secondary={{ label: "Meet our doctors", href: "/doctors" }}
      />
    </main>
  );
}
