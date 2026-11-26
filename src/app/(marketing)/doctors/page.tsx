import type { Metadata } from "next";

import { Team2Hero } from "@/components/team-2/team-2-hero";
import { Team2CareModel } from "@/components/team-2/team-2-care-model";
import { Team2RosterRoles } from "@/components/team-2/team-2-roster-roles";
import { Team2MeetProviders } from "@/components/team-2/team-2-meet-providers";
import { Team2ClosingBanner } from "@/components/team-2/team-2-closing-banner";
import { getBatchNextSlots, getBookingDoctors, type NextSlot } from "@/lib/booking";
import { getDoctors } from "@/lib/doctors-repository";
import type { Doctor } from "@/lib/doctors";
import { SITE_URL, clinic } from "@/lib/clinic";
import { CLINIC_ID, clinicNode, clinicianRef } from "@/lib/service-schema";

export const metadata: Metadata = {
  // The root layout appends "| MyStree".
  title: "Doctors & Care Team in Indiranagar, Bengaluru",
  description:
    "Meet MyStree's gynaecologists, obstetricians, reproductive endocrinologist, nutritionist, pelvic physiotherapist and wider team on 13th Main Road, Indiranagar, Bengaluru.",
  alternates: {
    canonical: `${SITE_URL}/team`,
  },
  openGraph: {
    title: "Doctors, Nutritionists & Care Team | MyStree Indiranagar",
    description:
      "Gynaecologists, obstetricians, reproductive medicine, nutrition and pelvic physiotherapy working together on 13th Main Road, Indiranagar, Bengaluru.",
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
        name: "Doctors and care team at MyStree, Indiranagar",
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

export default async function DoctorsPage() {
  const [doctors, bookingRoster] = await Promise.all([getDoctors(), getBookingDoctors()]);
  const bookingById = new Map(bookingRoster.map((record) => [record.id, record]));

  const slotsBySlug: Record<string, NextSlot | null> = {};
  const feesBySlug: Record<string, { fee: number; durationMinutes: number }> = {};
  const slugIdPairs: Array<{ slug: string; bookingId: number }> = [];

  for (const doctor of doctors) {
    const match = doctor.bookingUrl?.match(/appointment\/(\d+)/);
    const bookingId = match ? Number(match[1]) : null;
    const record = bookingId ? bookingById.get(bookingId) : undefined;
    if (record) {
      feesBySlug[doctor.slug] = { fee: record.fee, durationMinutes: record.durationMinutes };
    }
    if (bookingId && !doctor.practisesElsewhere) {
      slugIdPairs.push({ slug: doctor.slug, bookingId });
    } else {
      slotsBySlug[doctor.slug] = null;
    }
  }

  const slotMap = await getBatchNextSlots(slugIdPairs.map((item) => item.bookingId));
  for (const { slug, bookingId } of slugIdPairs) {
    slotsBySlug[slug] = slotMap[bookingId] ?? null;
  }

  return (
    <main className="mystree-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(doctors)) }}
      />
      {/* 1. Hero: Collaborative care for every chapter of womanhood */}
      <Team2Hero />

      {/* 2. Calm, zero-animation Doctors Directory immediately visible after Hero */}
      <Team2MeetProviders doctors={doctors} slotsBySlug={slotsBySlug} feesBySlug={feesBySlug} />

      {/* 3. Care Model & Integrated Comparison Table */}
      <Team2CareModel />

      {/* 4. Care Team Roster Roles */}
      <Team2RosterRoles />

      {/* Patient testimonials and ratings (Team2Reviews) are not shown: the NMC
          notice of 06.10.2026 prohibits them. The component is kept unused. */}

      {/* 5. Closing Banner CTA */}
      <Team2ClosingBanner />
    </main>
  );
}
