import type { Metadata } from "next";
import { ContactHubClient } from "./contact-client";
import { SITE_URL, clinic } from "@/lib/clinic";
import { CLINIC_ID, clinicNode } from "@/lib/service-schema";

export const metadata: Metadata = {
  alternates: { canonical: `${SITE_URL}/contact` },
  title: "Contact MyStree: 13th Main Road, Indiranagar, Bengaluru",
  description:
    "Address, phone and directions for MyStree women's health clinic: No. 3366, 13th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru 560008. Call or WhatsApp +91 63665 73772, or book a consultation online.",
};

/*
 * Structured data: the single clinic entity shared by every page
 * (lib/service-schema.ts), plus this page. The previous block declared a
 * second clinic with the same @id but a different address (2nd Floor,
 * 560061), coordinates and hours, and an FAQPage whose questions were not
 * shown on the page; both are removed so Google sees one consistent
 * business on the Google Ads landing page.
 */
const structuredSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      ...clinicNode(),
      hasMap: clinic.mapsPlaceUrl,
    },
    {
      "@type": "ContactPage",
      "@id": `${SITE_URL}/contact#page`,
      url: `${SITE_URL}/contact`,
      name: "Contact MyStree, Indiranagar, Bengaluru",
      inLanguage: "en-IN",
      about: { "@id": CLINIC_ID },
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredSchema) }}
      />
      <ContactHubClient />
    </>
  );
}
