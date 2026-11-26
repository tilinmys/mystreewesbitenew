import type { Metadata } from "next";

import { HomeHero } from "@/components/home/home-hero";
import { HomePackages } from "@/components/home/home-packages";
import { HomeJourney } from "@/components/home/home-journey";
import { HomeServicesRow } from "@/components/home/home-services-row";
import { HomeTeam } from "@/components/home/home-team";
import { HomeClosing } from "@/components/home/home-closing";
import { getBatchNextSlots, getBookingDoctors, type NextSlot } from "@/lib/booking";
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

export default async function HomePage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
      {/*
        Streamlined conversion architecture: what care we offer (high service visibility),
        whom to book (with symptom filters & live slots), transparent fixed-price care
        packages, how a visit works, and direct closing booking action.
      */}
      <HomeHero />
      <HomeServicesRow />
      <HomeTeam doctors={doctors} slotsBySlug={slotsBySlug} feesBySlug={feesBySlug} />
      <HomePackages />
      <HomeJourney />
      <HomeClosing />
    </main>
  );
}
