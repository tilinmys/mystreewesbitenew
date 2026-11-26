import Link from "next/link";

import { clinic } from "@/lib/clinic";

import styles from "./site-footer.module.css";

/*
 * Site footer.
 *
 * Structure follows a two-zone model: the left half is brand expression (a
 * statement line and an oversized wordmark), the right half is utility (link
 * groups). The right side is three columns across two rows rather than six
 * columns in one — six adjacent columns of links read as a wall and nothing
 * gets scanned. Two rows of three gives each group a horizon.
 *
 * Every href below resolves to a real route. A footer is the most-crawled
 * block on a site, so a dead link here costs more than anywhere else; the
 * groups marked `pending` point at the services anchor on the homepage until
 * those pages exist, rather than at a 404.
 */

type FooterLink = { label: string; href: string };
type FooterGroup = { heading: string; links: readonly FooterLink[] };

const groups: readonly FooterGroup[] = [
  {
    heading: "Care",
    links: [
      { label: "OBGYN consults", href: "/services/obgyn-consults" },
      { label: "Pregnancy care", href: "/services/prenatal" },
      { label: "PCOS & metabolic care", href: "/clinics/pcos" },
      { label: "Pelvic floor health", href: "/services/pelvic-floor-physiotherapy" },
    ],
  },
  {
    heading: "Clinic",
    links: [
      { label: "About MyStree", href: "/about" },
      // /team is the canonical URL (/doctors declares it), so link it directly.
      { label: "Our doctors", href: "/team" },
      { label: "How a visit works", href: "/#how-it-works" },
      { label: "Address & directions", href: "/contact" },
    ],
  },
  {
    heading: "For patients",
    links: [
      { label: "Book an appointment", href: "/book" },
      { label: "Questions & answers", href: "/faqs" },
      { label: "Contact the clinic", href: "/contact" },
      { label: "Notes & guidance", href: "/blog" },
    ],
  },
  {
    heading: "More services",
    links: [
      { label: "Women's health check", href: "/services/womens-health-check" },
      { label: "Dermatology", href: "/services/dermatology" },
      { label: "Adolescent health", href: "/services/adolescent-health" },
      { label: "Menopause support", href: "/services/menopause" },
      { label: "Nutrition counselling", href: "/services/nutrition-counselling" },
    ],
  },
  {
    // Fixed-price packages: priced pages competitors do not publish, linked
    // from every page so search engines find and value them.
    heading: "Packages",
    links: [
      { label: "Hormonal IUD Care", href: "/packages/hormonal-iud-care" },
      { label: "Care Journey: Basic", href: "/packages/care-journey-basic" },
      { label: "Care Journey: Bloom", href: "/packages/care-journey-bloom" },
      { label: "Nutrition Care: 3 Months", href: "/packages/nutrition-care-3-months" },
    ],
  },
];

const legalLinks: readonly FooterLink[] = [
  { label: "Privacy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms-and-conditions" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact", href: "/contact" },
];

export function SiteFooter() {
  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.inner}>
        {/* ---- brand zone ---- */}
        <div className={styles.brand}>
          {/*
            The site's own positioning line, repeated verbatim from the
            homepage H1. A footer statement should restate what the brand
            says about itself, not introduce a new claim nobody has read yet.
          */}
          <p className={styles.statement}>
            Women&rsquo;s health,
            <br />
            without judgement.
          </p>

          {/*
            Oversized wordmark as the anchor. Set in the display serif rather
            than the logo file: at this size the lettering is the gesture, and
            live text stays selectable, scalable and legible to a screen
            reader. aria-hidden on the mark itself — the <footer> landmark and
            the copyright line already name the business, so announcing
            "mystree" a third time is noise.
          */}
          <p className={styles.wordmark} aria-hidden="true">
            mystree
          </p>
        </div>

        {/* ---- utility zone ---- */}
        <div className={styles.groups}>
          {groups.map((group) => (
            <nav
              className={styles.group}
              key={group.heading}
              aria-label={group.heading}
            >
              <h2 className={styles.groupHeading}>{group.heading}</h2>
              <ul className={styles.groupLinks}>
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/*
            Sixth cell: the contact block sits in the grid's last position so
            the two rows stay even, and the phone number is the one thing in
            the footer set in bold — it is the action most people arrive here
            looking for.
          */}
          <div className={styles.group}>
            <h2 className={styles.groupHeading}>Need help?</h2>
            <ul className={styles.groupLinks}>
              <li>
                <a className={styles.strongLink} href={`tel:${clinic.telephone}`}>
                  {clinic.telephoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${clinic.email}`}>{clinic.email}</a>
              </li>
              <li>
                <a
                  href={clinic.mapsPlaceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {/* The full, verified address and hours as visible text, matching
                      the clinic's structured data (lib/service-schema.ts). */}
                  {clinic.streetAddress}, {clinic.city} {clinic.postalCode}
                </a>
              </li>
              <li>Mon to Sat, 9 am to 8 pm</li>
            </ul>
          </div>
        </div>
      </div>

      {/*
        Legal bar, inside the footer landmark rather than a sibling of it:
        these links are part of the site's footer content, and a screen-reader
        user navigating by landmark should find them there.
      */}
      <div className={styles.legal}>
        <nav className={styles.legalLinks} aria-label="Legal and help">
          {legalLinks.map((link) => (
            <Link href={link.href} key={link.label}>
              {link.label}
            </Link>
          ))}
        </nav>
        <p className={styles.disclaimer}>
          Information on this website is for awareness only and is not a substitute for medical advice.
        </p>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} {clinic.legalName}
        </p>
      </div>
    </footer>
  );
}

export default SiteFooter;
