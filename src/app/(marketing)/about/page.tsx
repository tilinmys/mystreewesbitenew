import type { Metadata } from "next";

import { AboutCare } from "@/components/about/about-care";
import { AboutFinale } from "@/components/about/about-finale";
import { AboutFounder } from "@/components/about/about-founder";
import { AboutInquiries } from "@/components/about/about-inquiries";
import { AboutIntro } from "@/components/about/about-intro";
import { AboutMore } from "@/components/about/about-more";
import { AboutFigures, AboutTeam } from "@/components/about/about-team";
import { SITE_URL, clinic } from "@/lib/clinic";
import { CLINIC_ID, clinicNode, clinicianRef } from "@/lib/service-schema";

/*
 * About — /about.
 *
 * Sections, in the reference page's order (brief of 15 Oct 2026): the
 * AboutIntro statement, the founder's note (AboutFounder), the team
 * (AboutTeam), the figure tiles (AboutFigures), the "Learn more" band
 * (AboutMore), the concern grid (AboutCare), Inquiries (AboutInquiries) and
 * the closing doorway (AboutFinale). The earlier sections (belief, philosophy, people,
 * continuity, outcomes, visit, closing) are no longer rendered; their
 * components stay in components/about/ unused.
 *
 * Search: the title, H1 and first sentence all say what MyStree is and where
 * ("women's health clinic in Indiranagar, Bengaluru"), which is what local
 * searches and AI answers match on. The structured data reuses the single
 * clinic entity shared with the service pages (lib/service-schema.ts), so
 * the business has one identity across the site, and lists the clinical
 * team as Person references (not Physician: the team includes a
 * nutritionist and a physiotherapist).
 */

const PAGE_PATH = "/about";

export const metadata: Metadata = {
  // The root layout appends "| MyStree".
  title: "About MyStree Clinic in Indiranagar, Bengaluru",
  description:
    "MyStree is a women's health clinic in Indiranagar, Bengaluru with gynaecologists, obstetricians, a nutritionist and a pelvic physiotherapist.",
  alternates: { canonical: `${SITE_URL}${PAGE_PATH}` },
  openGraph: {
    title: "About MyStree: Women's Health Clinic in Indiranagar, Bengaluru",
    description:
      "Women's healthcare on 13th Main Road, Indiranagar, from first periods and pregnancy to fertility and menopause.",
    url: `${SITE_URL}${PAGE_PATH}`,
    type: "website",
    siteName: "MyStree Women's Health Clinic",
  },
};

/* The clinical team named in the opening paragraph, in that order. */
const TEAM = [
  ["dr-smitha-ap", "Dr. Smitha A.P"],
  ["dr-surbhi-sinha", "Dr. Surbhi Sinha"],
  ["priyanka-savina", "Priyanka Savina"],
  ["dr-jasmine-flora", "Dr. Jasmine Flora"],
] as const;

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...clinicNode(),
        description:
          "Women's health clinic in Indiranagar, Bengaluru offering gynaecology, pregnancy and high-risk pregnancy care, fertility, menopause, adolescent health, nutrition counselling and pelvic floor physiotherapy.",
        hasMap: clinic.mapsPlaceUrl,
        areaServed: {
          "@type": "City",
          name: clinic.city,
          containsPlace: { "@type": "Place", name: clinic.locality },
        },
        employee: TEAM.map(([slug, name]) => clinicianRef(slug, name)),
      },
      {
        "@type": "AboutPage",
        "@id": `${SITE_URL}${PAGE_PATH}#page`,
        url: `${SITE_URL}${PAGE_PATH}`,
        name: "About MyStree: Women's Health Clinic in Indiranagar, Bengaluru",
        description: metadata.description,
        inLanguage: "en-IN",
        about: { "@id": CLINIC_ID },
        mainEntity: { "@id": CLINIC_ID },
        breadcrumb: { "@id": `${SITE_URL}${PAGE_PATH}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}${PAGE_PATH}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "About", item: `${SITE_URL}${PAGE_PATH}` },
        ],
      },
    ],
  };

  return (
    <main className="mystree-page">
      <script
        type="application/ld+json"
        // Serialized from typed literals above, not from user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutIntro />
      <AboutFounder />
      <AboutCare />
      <AboutFigures />
      <AboutTeam />
      <AboutMore />
      <AboutInquiries />
      <AboutFinale />
    </main>
  );
}
