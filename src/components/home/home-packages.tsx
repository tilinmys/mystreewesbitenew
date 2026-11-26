import { PACKAGES } from "@/lib/packages";

import { HomePackagesView, type PackageCard } from "./home-packages-view";

/*
 * HomePackages — Section 06.
 * Pulls package details from lib/packages.ts so prices and names always match
 * the package detail pages. Featured items follow a 4-part layout:
 * enlarged clean media header, title + complete sentence intro (never clamped),
 * prominent price + billing/scope interval, and uniform CTA button.
 */
const FEATURED = [
  {
    slug: "care-journey-basic",
    title: "Care Journey: Basic",
    interval: "complete package",
    summary: "Includes 2 gynaecologist visits, 3 follicular scans, and nutrition guidance.",
    image: "pkgCareJourney",
  },
  {
    slug: "care-journey-bloom",
    title: "Care Journey: Bloom",
    interval: "5-care package",
    summary: "Combines follicular scans, gynaecology, nutrition, movement, and skin care.",
    image: "pkgBloom",
  },
  {
    slug: "nutrition-care-3-months",
    title: "Nutrition Care Plan",
    interval: "for 3 months",
    summary: "Includes 6 personalised Indian diet plans, 6 reviews, and WhatsApp support.",
    image: "pkgNutrition",
  },
  {
    slug: "hormonal-iud-care",
    title: "Hormonal IUD Care",
    interval: "all-inclusive",
    summary: "Covers gynaecologist visits before and after, the IUD device, and fitting.",
    image: "pkgIud",
  },
] as const;

export function HomePackages() {
  const cards: PackageCard[] = FEATURED.flatMap((item) => {
    const pkg = PACKAGES.find((p) => p.slug === item.slug);
    if (!pkg) return [];
    return [
      {
        href: `/packages/${pkg.slug}`,
        title: item.title,
        summary: item.summary,
        price: pkg.priceDisplay,
        interval: item.interval,
        image: item.image,
      },
    ];
  });
  return <HomePackagesView cards={cards} />;
}
