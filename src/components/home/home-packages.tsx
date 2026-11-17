import { PACKAGES } from "@/lib/packages";

import { HomePackagesView, type PackageCard } from "./home-packages-view";

/*
 * HomePackages, Section 06 (revised 16 Nov 2026), after the supplied
 * reference: a large serif heading beside an engraved anatomical
 * illustration, then "Choose where to start" and a row of cards.
 *
 * Server component: prices and names come from lib/packages.ts (the package
 * pages' own source), so the cards can never disagree with them; only the
 * picked fields reach the client view. The MTP package is not featured on
 * the home page; it stays in the menu and footer with its own page.
 */
const FEATURED = [
  { slug: "care-journey-basic", title: "Care Journey: Basic", tag: "Trying to conceive", meta: "3 scans", icon: "scan", image: "pkgCareJourney" },
  { slug: "care-journey-bloom", title: "Care Journey: Bloom", tag: "Trying to conceive", meta: "5 kinds of care", icon: "care", image: "pkgBloom" },
  { slug: "nutrition-care-3-months", title: "Nutrition Care, 3 months", tag: "Nutrition", meta: "3 months", icon: "calendar", image: "pkgNutrition" },
  { slug: "mirena-comfort-care", title: "Hormonal IUD Care", tag: "All-inclusive", meta: "15–20 min", icon: "timer", image: "pkgIud" },
] as const;

export function HomePackages() {
  const cards: PackageCard[] = FEATURED.flatMap((item) => {
    const pkg = PACKAGES.find((p) => p.slug === item.slug);
    if (!pkg) return [];
    return [
      {
        href: `/packages/${pkg.slug}`,
        title: item.title,
        price: pkg.priceDisplay,
        tag: item.tag,
        meta: item.meta,
        icon: item.icon,
        image: item.image,
      },
    ];
  });
  return <HomePackagesView cards={cards} />;
}
