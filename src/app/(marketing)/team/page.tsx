import type { Metadata } from "next";

import { Team2Hero } from "@/components/team-2/team-2-hero";
import { Team2CareModel } from "@/components/team-2/team-2-care-model";
import { Team2RosterRoles } from "@/components/team-2/team-2-roster-roles";
import { Team2MeetProviders } from "@/components/team-2/team-2-meet-providers";
import { Team2ClosingBanner } from "@/components/team-2/team-2-closing-banner";
import { getDoctors } from "@/lib/doctors-repository";
import type { Doctor } from "@/lib/doctors";
import { SITE_URL, clinic } from "@/lib/clinic";
import { CLINIC_ID, clinicNode, clinicianRef } from "@/lib/service-schema";

export const metadata: Metadata = {
  // The root layout appends "| MyStree".
  title: "Doctors & Specialists in Indiranagar, Bengaluru",
  description:
    "Meet MyStree's gynaecologists, obstetricians, reproductive medicine specialist, nutritionist, pelvic physiotherapist and wider team on 13th Main Road, Indiranagar, Bengaluru.",
  alternates: {
    canonical: `${SITE_URL}/team`,
  },
  openGraph: {
    title: "Doctors, Nutritionists & Care Team | MyStree Indiranagar",
    description:
      "Gynaecologists, obstetricians, nutrition and pelvic physiotherapy working together on 13th Main Road, Indiranagar, Bengaluru.",
    url: `${SITE_URL}/team`,
    siteName: clinic.name,
    locale: "en_IN",
    type: "website",
  },
};

/*
 * Structured data: the single clinic entity shared by every page
 * (lib/service-schema.ts), this page, and the team as Person entities with
 * the same @ids the service pages use. Replaces a block that placed the
 * clinic on "100ft Road, 560038" at other coordinates, declared an FAQPage
 * not shown on the page, and listed services not on record (in-clinic
 * ultrasound, a cashless insurance desk, same-day appointments).
 */
function structuredData(doctors: readonly Doctor[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      clinicNode(),
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/team#page`,
        url: `${SITE_URL}/team`,
        name: "Doctors and specialists at MyStree, Indiranagar",
        inLanguage: "en-IN",
        about: { "@id": CLINIC_ID },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: doctors.map((doctor, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: { ...clinicianRef(doctor.slug, doctor.name), jobTitle: doctor.title, worksFor: { "@id": CLINIC_ID } },
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Doctors", item: `${SITE_URL}/team` },
        ],
      },
    ],
  };
}

export default async function TeamPage() {
  const doctors = await getDoctors();

  return (
    <main className="mystree-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(doctors)) }}
      />
      {/* 1. Hero: Collaborative care for every chapter of womanhood */}
      <Team2Hero />

      {/* 2. Care Model & Integrated Comparison Table */}
      <Team2CareModel />

      {/* 3. Care Team Roster Roles */}
      <Team2RosterRoles />

      {/* 4. Meet Our Providers & Doctors Directory */}
      <Team2MeetProviders doctors={doctors} />

      {/* 5. Patient testimonials are not shown (NMC Guidelines 2026, Expl. V). */}

      {/* 6. Closing Banner CTA */}
      <Team2ClosingBanner />
    </main>
  );
}
