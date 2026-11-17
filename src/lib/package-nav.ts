/**
 * The navbar's Packages dropdown. Kept apart from lib/packages.ts so the
 * client navbar does not bundle every package's copy; the slugs must match
 * the entries there (the package page 404s on an unknown slug).
 */
export const PACKAGE_NAV = [
  { title: "Hormonal IUD Care", href: "/packages/mirena-comfort-care" },
  { title: "MTP Care Package", href: "/packages/mtp-care" },
  { title: "Care Journey: Basic", href: "/packages/care-journey-basic" },
  { title: "Care Journey: Bloom", href: "/packages/care-journey-bloom" },
  { title: "Nutrition Care: 3 Months", href: "/packages/nutrition-care-3-months" },
] as const;
