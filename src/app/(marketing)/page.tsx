import type { Metadata } from "next";

import { HomeHero } from "@/components/home/home-hero";
import { HomeWelcome } from "@/components/home/home-welcome";
import { HomeStory } from "@/components/home/home-story";
import { HomeCore } from "@/components/home/home-core";
import { HomeGenerations } from "@/components/home/home-generations";
import { HomePackages } from "@/components/home/home-packages";
import { HomeJourney } from "@/components/home/home-journey";
import { HomeServicesRow } from "@/components/home/home-services-row";
import { HomeTeam } from "@/components/home/home-team";
import { HomeClosing } from "@/components/home/home-closing";
import { getDoctors } from "@/lib/doctors-repository";
import { SITE_URL, clinic } from "@/lib/clinic";
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
  ],
};

/*
 * The home page carries the clinic's head terms (gynaecologist, women's
 * health clinic, Indiranagar, Bengaluru), which the previous brand-only
 * title ("MyStree | Women's health, without judgment") did not. Absolute, so
 * the "| MyStree" template is not appended twice. No superlatives: the
 * competitor pages lean on "best", which the NMC notice rules out for us.
 */
export const metadata: Metadata = {
  title: { absolute: "Gynaecologist & Women's Health Clinic in Indiranagar, Bengaluru | MyStree" },
  description:
    "Women's health clinic on 13th Main Road, Indiranagar, Bengaluru: gynaecology consultations, pregnancy and high-risk pregnancy care, PCOS, menopause care, nutrition and pelvic physiotherapy. Call +91 63665 73772.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "MyStree: Women's Health Clinic in Indiranagar, Bengaluru",
    description:
      "Gynaecologists, obstetricians, a nutritionist and a pelvic physiotherapist on 13th Main Road, Indiranagar. 15-minute doctor consultations, in clinic or by video.",
    url: SITE_URL,
    images: [{ url: "/images/hero/mystree-hero-care-desktop.webp", width: 2560, height: 1440, alt: "A gynaecologist talking with a patient at MyStree, Indiranagar" }],
  },
};

export default async function HomePage() {
  const doctors = await getDoctors();

  return (
    <main className="mystree-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
      {/*
        Booking-first order (16 Nov 2026): what we treat, who will see you,
        how a visit works (with booking), prices, the clinic, then our story,
        ending on one more booking prompt.
      */}
      <HomeHero />
      <HomeServicesRow />
      <HomeTeam doctors={doctors} />
      <HomeJourney />
      <HomePackages />
      <HomeWelcome />
      <HomeStory />
      <HomeCore />
      <HomeGenerations />
      <HomeClosing />
    </main>
  );
}
