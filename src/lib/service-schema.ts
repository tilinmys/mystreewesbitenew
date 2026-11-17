import { SITE_URL, clinic } from "@/lib/clinic";

/**
 * Structured-data nodes shared by every /services/* page.
 *
 * There is exactly one clinic entity (`/#clinic`). Service pages reference it
 * and never declare a second MedicalClinic with its own address, which would
 * split the clinic's identity in search. Address and coordinates are the
 * repository's values (lib/clinic.ts and the existing page data); conflicting
 * values in briefs are reported, not substituted.
 */

export const CLINIC_ID = `${SITE_URL}/#clinic`;

export function clinicNode() {
  return {
    "@type": "MedicalClinic",
    "@id": CLINIC_ID,
    name: "MyStree Women's Health Clinic",
    url: SITE_URL,
    logo: `${SITE_URL}/brand/mystree-logo.png`,
    telephone: clinic.telephone,
    email: clinic.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "No. 3366, 13th Main Road, HAL 2nd Stage, Indiranagar",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      postalCode: "560008",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 12.9685868,
      longitude: 77.6453771,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "20:00",
      },
    ],
    medicalSpecialty: ["Obstetric", "Gynecologic", "Women's Health"],
    // Names people and directories already use for the clinic (Practo lists
    // "My Stree Clinic Indiranagar"), so search and AI engines join them up.
    alternateName: ["My Stree", "My Stree Clinic", "MyStree Women's Health Clinic Indiranagar"],
    hasMap: clinic.mapsPlaceUrl,
    isAcceptingNewPatients: true,
    // Neighbourhoods named on the service pages' "Where is MyStree" answers.
    areaServed: [
      "Indiranagar",
      "HAL 2nd Stage",
      "HAL 3rd Stage",
      "Domlur",
      "Jeevan Bhima Nagar",
      "Old Airport Road",
      "Ulsoor",
      "Koramangala",
      "Bengaluru",
    ].map((name) => ({ "@type": "Place", name })),
    knowsAbout: [
      "Gynaecology",
      "Pregnancy care",
      "High-risk pregnancy",
      "PCOS",
      "Menopause",
      "Adolescent gynaecology",
      "Nutrition counselling",
      "Pelvic floor physiotherapy",
      "Dermatology",
      "Psychological counselling",
      "Contraception",
    ],
  };
}

/** A clinician on a service page, pointing at their profile's Person node. */
export function clinicianRef(slug: string, name: string) {
  return { "@type": "Person", "@id": `${SITE_URL}/doctors/${slug}#person`, name, url: `${SITE_URL}/doctors/${slug}` };
}

export function breadcrumbNode(path: string, name: string) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}${path}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/#services` },
      { "@type": "ListItem", position: 3, name, item: `${SITE_URL}${path}` },
    ],
  };
}

type QA = { question: string; answer: string };

export function faqNode(path: string, items: readonly QA[]) {
  return {
    "@type": "FAQPage",
    "@id": `${SITE_URL}${path}#faq`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function planNode(path: string, plan: { id: string; name: string; description: string; price: string }) {
  return {
    "@type": "Service",
    "@id": `${SITE_URL}${path}#${plan.id}`,
    name: plan.name,
    description: plan.description,
    provider: { "@id": CLINIC_ID },
    areaServed: { "@type": "City", name: clinic.city },
    offers: {
      "@type": "Offer",
      price: plan.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}${path}`,
    },
  };
}
