import type { Metadata } from "next";

import { Team2Hero } from "@/components/team-2/team-2-hero";
import { Team2CareModel } from "@/components/team-2/team-2-care-model";
import { Team2RosterRoles } from "@/components/team-2/team-2-roster-roles";
import { Team2MeetProviders } from "@/components/team-2/team-2-meet-providers";
import { Team2ClosingBanner } from "@/components/team-2/team-2-closing-banner";
import { getDoctors } from "@/lib/doctors-repository";
import type { Doctor } from "@/lib/doctors";
import { SITE_URL, clinic } from "@/lib/clinic";

export const metadata: Metadata = {
  title: "Care Providers & Specialists | MyStree Indiranagar, Bengaluru",
  description:
    "Meet the multidisciplinary women's health doctors, gynecologists, and specialists at MyStree Indiranagar, Bengaluru. Collaborative care for PCOS, pregnancy, fertility, and pelvic health.",
  alternates: {
    canonical: `${SITE_URL}/team-2`,
  },
  openGraph: {
    title: "Providers & Care Team at MyStree Indiranagar",
    description:
      "A team of women's health clinicians working with you in Indiranagar, Bengaluru and online across India.",
    url: `${SITE_URL}/team-2`,
    siteName: clinic.name,
    locale: "en_IN",
    type: "website",
  },
};

/**
 * Rich Medical Schema for Search Generative Experience (GEO) and Answer Engines (AEO).
 */
function structuredData(doctors: readonly Doctor[]) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": `${SITE_URL}/team-2#clinic`,
    name: "MyStree Women's Health Clinic",
    url: `${SITE_URL}/team-2`,
    telephone: clinic.telephone,
    email: clinic.email,
    medicalSpecialty: [
      "ObstetricGynecologic",
      "ReproductiveEndocrinology",
      "Physiotherapy",
      "DietNutrition",
    ],
    employee: doctors.map((doc) => ({
      "@type": "Physician",
      name: doc.name,
      jobTitle: doc.title,
      medicalSpecialty: doc.specialty,
      url: `${SITE_URL}/doctors/${doc.slug}`,
      workLocation: {
        "@type": "MedicalClinic",
        name: "MyStree Indiranagar",
        address: {
          "@type": "PostalAddress",
          streetAddress: "100ft Road, Indiranagar",
          addressLocality: "Indiranagar",
          addressRegion: "Bengaluru, Karnataka",
          postalCode: "560038",
          addressCountry: "IN",
        },
      },
    })),
    department: [
      {
        "@type": "MedicalOrganization",
        name: "Care Providers",
        description:
          "Gynaecologists, obstetricians, a reproductive medicine specialist, a pelvic floor physiotherapist and a nutritionist.",
      },
      {
        "@type": "MedicalOrganization",
        name: "Clinical Support",
        description:
          "In-house diagnostic ultrasound scans, comprehensive hormonal profiling, and specialized pathology blood tests on site in Indiranagar.",
      },
      {
        "@type": "Organization",
        name: "Care Coordinators",
        description:
          "Personal care managers navigating same-day appointments, cashless insurance TPA desk, and continuous WhatsApp clinic support.",
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "100ft Road, Indiranagar",
      addressLocality: "Indiranagar",
      addressRegion: "Bengaluru, Karnataka",
      postalCode: "560038",
      addressCountry: "IN",
    },
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: "Indiranagar, Bengaluru",
      },
      {
        "@type": "Country",
        name: "India",
      },
    ],
    description:
      "Multidisciplinary women's healthcare clinic in Indiranagar, Bengaluru providing unhurried collaborative care across obstetrics, fertility, PCOS, and pelvic health.",
  };
}

export default async function Team2Page() {
  const doctors = await getDoctors();

  return (
    <main className="mystree-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(doctors)) }}
      />
      {/* 01: Compact Hero Section matching reference Image 1 */}
      <Team2Hero />

      {/* 02: Collaborative Care Model + Integrated Comparative Ledger */}
      <Team2CareModel />

      {/* 03: Who's on your care team? 3-Card Editorial Grid */}
      <Team2RosterRoles />

      {/* 04: Meet our providers - 4-Column Directory Grid with Interactive Filters matching reference media_1789566903057.png */}
      <Team2MeetProviders doctors={doctors} />

      {/* 05: Patient testimonials are not shown (NMC Guidelines 2026). */}

      {/* 06: Closing Callout in Crisp White providing clean handoff to site footer */}
      <Team2ClosingBanner />
    </main>
  );
}
