import Image from "next/image";

import styles from "./about-finale.module.css";

/*
 * AboutFinale — the last section of /about.
 *
 * After the supplied reference (a full-bleed photo with a giant headline
 * split above and below a centred "Book a visit"), with one change of our
 * own: "the doorway". The photo first shows as a narrow arched doorway onto
 * the consultation room and opens to the full band as it scrolls into view,
 * like walking in. The headline, "There's a chair for you", answers the two
 * empty chairs in the photo (and avoids the reference's "best life", the
 * kind of superlative the Google Ads review flagged).
 *
 * The opening is a CSS scroll-driven animation; browsers without it, and
 * visitors who prefer reduced motion, see the full image straight away.
 * "Book a visit" goes to the booking app under /booking, which fires the
 * Google Ads conversion on a completed booking.
 *
 * Photo: /images/about/mystree-consultation-space-indiranagar.webp, until a
 * dedicated photo replaces it (keep two seats in view if the headline stays).
 */
export function AboutFinale() {
  return (
    <section className={styles.section} aria-labelledby="finale-heading">
      <div className={styles.stage}>
        <div className={styles.doorway}>
          <Image
            src="/images/about/mystree-consultation-space-indiranagar.webp"
            alt="An empty armchair with a folded shawl beside a sunlit window, waiting for someone"
            fill
            sizes="(max-width: 1760px) 100vw, 1760px"
            className={styles.photo}
          />
        </div>

        <h2 id="finale-heading" className={styles.headline}>
          <span className={styles.lineTop}>There&apos;s a chair</span>
          <span className={styles.lineBottom}>for you</span>
        </h2>

        <a href="https://my-stree.com/booking" className={styles.cta}>
          Book a visit <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </section>
  );
}
