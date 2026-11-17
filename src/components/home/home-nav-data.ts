import { clinic } from "@/lib/clinic";

/** Where "Book an appointment" goes, same as the site navbar. */
export const BOOK_HREF = "/book";

export const TEL_HREF = `tel:${clinic.telephone}`;

/** Clinic hours, as published in the FAQs and the clinic's structured data. */
export const HOURS_DISPLAY = "Mon–Sat, 9 am to 8 pm";

/*
 * The menu's links: only pages that exist. Written without ampersands, which
 * Fraunces draws as an ornate glyph. Fertility is not linked until ART Act
 * registration (compliance review, 13 Nov 2026).
 */
export const MENU_LINKS = [
  { label: "About MyStree", href: "/about" },
  { label: "Our specialists", href: "/doctors" },
  { label: "Care we offer", href: "/#services" },
  { label: "Learn", href: "/blog" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact us", href: "/contact" },
] as const;
