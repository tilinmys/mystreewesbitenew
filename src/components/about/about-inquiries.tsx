import styles from "./about-inquiries.module.css";

/*
 * AboutInquiries — "Inquiries" on /about, after the supplied reference: a
 * heavy heading over four tiles, each a title with a short line at its foot.
 *
 * Every route uses contact details already on record (lib/clinic.ts):
 * WhatsApp +91 63665 73772 and info@mystree.org, with a subject line so the
 * team can sort mail. No careers page or partner programme is claimed.
 * Tiles share the concern grid's hover: a Twilight Wine flood.
 */

const TILES = [
  {
    title: "Patient questions",
    text: "Message our care team on WhatsApp at +91 63665 73772.",
    href: "https://wa.me/916366573772?text=Hi%20MyStree%2C%20I%20have%20a%20question.",
  },
  {
    title: "Careers",
    text: "Clinicians and care staff who would like to work with us.",
    href: "mailto:info@mystree.org?subject=Careers%20at%20MyStree",
  },
  {
    title: "Partnerships",
    text: "Hospitals, workplaces and organisations interested in working with MyStree.",
    href: "mailto:info@mystree.org?subject=Partnership%20enquiry",
  },
  {
    title: "Media",
    text: "Press, speaking and media requests: info@mystree.org.",
    href: "mailto:info@mystree.org?subject=Media%20request",
  },
] as const;

export function AboutInquiries() {
  return (
    <section className={styles.section} aria-labelledby="inquiries-heading">
      <div className={styles.inner}>
        <h2 id="inquiries-heading" className={styles.title}>
          Inquiries
        </h2>
        <ul className={styles.grid}>
          {TILES.map((tile) => (
            <li key={tile.title}>
              <a
                href={tile.href}
                className={styles.tile}
                {...(tile.href.startsWith("https") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <span className={styles.tileTitle}>{tile.title}</span>
                <span className={styles.tileText}>{tile.text}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
