import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/clinic";
import { getPosts } from "@/lib/cms";
import { getDoctors } from "@/lib/doctors-repository";
import { PACKAGES } from "@/lib/packages";

/*
 * Every indexable page, by its canonical URL. Left out on purpose: /book
 * (redirects to the booking app), /doctors (its canonical is /team) and
 * /team-2 (redirects to /team).
 */

/*
 * Image sitemap entries (Google image extension): the photographs each page
 * shows, so they can be found in Google Images before every page is crawled.
 * Filenames are descriptive by design (24 Oct 2026); keep this list in step
 * with the image props on each page.
 */
const P = "/images/services/pages/";
const SERVICE_IMAGES: Record<string, string[]> = {
  "obgyn-consults": ["gynaecologist-consultation-indiranagar-bengaluru", "period-pain-at-work", "gynaecology-clinic-waiting-area", "auto-rickshaw-ride-to-clinic-bengaluru"],
  "womens-health-check": ["gynaecologist-consultation-indiranagar-bengaluru", "woman-tracking-menstrual-cycle-on-phone", "gynaecology-clinic-waiting-area", "auto-rickshaw-ride-to-clinic-bengaluru"],
  "adolescent-health": ["teen-gynaecology-consultation-indiranagar-bengaluru", "teenager-period-pain-at-home", "mother-and-daughter-clinic-registration", "mother-and-teen-daughter-walking-indiranagar"],
  menopause: ["menopause-consultation-indiranagar-bengaluru", "night-sweats-hot-flushes-perimenopause", "morning-walk-women-in-their-fifties-bengaluru", "friends-sharing-filter-coffee-bengaluru"],
  "nutrition-counselling": ["nutritionist-consultation-indiranagar-bengaluru", "home-cooking-dal-ragi-and-vegetables", "office-lunch-from-steel-tiffin", "buying-fresh-greens-vegetable-cart-bengaluru"],
  "pelvic-floor-physiotherapy": ["pelvic-floor-physiotherapy-indiranagar-bengaluru", "postpartum-back-pain-lifting-toddler", "glute-bridge-pelvic-floor-exercise-at-home", "mother-with-baby-carrier-on-stairs"],
  dermatology: ["hormonal-acne-dermatology-indiranagar-bengaluru", "dermatologist-dermatoscope-skin-examination", "evening-skincare-routine-at-home", "applying-sunscreen-on-balcony-bengaluru"],
  psychology: ["counselling-session-indiranagar-bengaluru", "woman-feeling-stressed-and-exhausted", "journaling-for-emotional-wellbeing", "mindful-breathing-on-park-bench-bengaluru"],
  prenatal: ["pregnancy-ultrasound-scan-indiranagar-bengaluru", "pregnant-woman-reading-scan-report", "antenatal-blood-pressure-check", "pregnant-woman-walking-in-park-bengaluru"],
};
const serviceImages = (slug: string) => (SERVICE_IMAGES[slug] ?? []).map((name) => `${SITE_URL}${P}${name}.webp`);
const HOME_IMAGES = ["care", "telehealth", "everyday"].map((n) => `${SITE_URL}/images/hero/mystree-hero-${n}-desktop.webp`);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const [doctors, posts] = await Promise.all([getDoctors(), getPosts()]);

  return [
    {
      url: SITE_URL,
      images: HOME_IMAGES,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/team`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...doctors.map((doctor) => ({
      url: `${SITE_URL}/doctors/${doctor.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${SITE_URL}/contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...PACKAGES.filter((pkg) => pkg.slug !== "mtp-care").map((pkg) => ({
      url: `${SITE_URL}/packages/${pkg.slug}`,
      lastModified,
      images: [pkg.image.src, pkg.glanceImage.src].map((src) => `${SITE_URL}${src}`),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    {
      url: `${SITE_URL}/blog`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    // Posts from the admin dashboard, dated by their last edit.
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at ?? post.published_at ?? lastModified),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...["obgyn-consults", "womens-health-check", "adolescent-health", "menopause", "nutrition-counselling", "pelvic-floor-physiotherapy", "dermatology", "psychology"].map((slug) => ({
      url: `${SITE_URL}/services/${slug}`,
      images: serviceImages(slug),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    {
      url: `${SITE_URL}/services/prenatal`,
      images: serviceImages("prenatal"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/faqs`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    ...["pcos"].map((slug) => ({
      url: `${SITE_URL}/clinics/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...["privacy-policy", "terms-and-conditions"].map((slug) => ({
      url: `${SITE_URL}/${slug}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    })),
  ];
}
