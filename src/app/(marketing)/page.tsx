import type { Metadata } from "next";
import { preload } from "react-dom";

import { HomeHero } from "@/components/home/home-hero";
import { HomePackages } from "@/components/home/home-packages";
import { HomeJourney } from "@/components/home/home-journey";
import { HomeServicesRow } from "@/components/home/home-services-row";
import { HomeTeam } from "@/components/home/home-team";
import { HomeFaq } from "@/components/home/home-faq";
import { HOME_FAQ_ITEMS } from "@/components/home/home-faq-data";
import { HomeClosing } from "@/components/home/home-closing";
import { SITE_URL } from "@/lib/clinic";
import { CLINIC_ID, clinicNode } from "@/lib/service-schema";

/*
 * Structured data: the single clinic entity shared by every page
 * (lib/service-schema.ts: 3366, 13th Main Road, HAL 2nd Stage, 560008,
 * +91 63665 73772, at the Google Business Profile's coordinates), plus the
 * website itself. The previous block here carried a placeholder phone
 * number, postcode 560038 and coordinates about 1 km from the clinic.
 */
const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      ...clinicNode(),
      description:
        "Women's health clinic in Indiranagar, Bengaluru offering gynaecology, pregnancy and high-risk pregnancy care, menopause care, adolescent health, nutrition counselling, pelvic floor physiotherapy, dermatology, psychology and psychiatry.",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "MyStree",
      inLanguage: "en-IN",
      publisher: { "@id": CLINIC_ID },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: HOME_FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
};

/*
 * The home page carries the clinic's head terms (gynaecologist, women's
 * health clinic, Indiranagar, Bengaluru), which the previous brand-only
 * title ("MyStree | Women's health, without judgment") did not. Absolute, so
 * the "| MyStree" template is not appended twice. No superlatives: the
 * competitor pages lean on "best", which the NMC notice rules out for us.
 */
export const revalidate = 300;

export const metadata: Metadata = {
  title: { absolute: "Gynaecologist & Women's Health, Indiranagar | MyStree" },
  description:
    "Women's health clinic on 13th Main Rd, Indiranagar, Bengaluru: gynaecology, pregnancy, PCOS, menopause, nutrition & pelvic physio. +91 63665 73772.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "MyStree: Women's Health Clinic in Indiranagar, Bengaluru",
    description:
      "Gynaecologists, obstetricians, a nutritionist and a pelvic physiotherapist on 13th Main Road, Indiranagar. In-clinic and video consultations across all specialties.",
    url: SITE_URL,
    images: [{ url: "/images/hero/mystree-hero-care-desktop.webp", width: 2560, height: 1440, alt: "A gynaecologist talking with a patient at MyStree, Indiranagar" }],
  },
};

export default function HomePage() {
  preload("/images/hero/mystree-hero-everyday-desktop.webp", {
    as: "image",
    fetchPriority: "high",
    media: "(min-width: 768px)",
  });
  preload("/images/hero/mystree-hero-everyday-mobile.webp", {
    as: "image",
    fetchPriority: "high",
    media: "(max-width: 767px)",
  });

  return (
    <main className="mystree-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
      {/*
        Streamlined conversion architecture: what care we offer (high service visibility),
        editorial Care Team showcase linking to the full clinician directory, transparent
        fixed-price care packages, how a visit works, SEO/AEO/GEO FAQs, and clean closing CTA.
      */}
      <HomeHero />
      <HomeServicesRow />
      <HomeTeam />
      <HomePackages />
      <HomeJourney />
      <HomeFaq />
      <HomeClosing />
    </main>
  );
}
