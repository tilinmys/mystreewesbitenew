import { CountUp } from "./count-up";
import styles from "./service-stat.module.css";

/*
 * ServiceStat — LOCKED. Section 03 of every /services/* page.
 *
 * A single statement beside a single figure, on the Alabaster paper that
 * follows the wine opening band.
 *
 * The figure must be a fact the clinic can stand behind. It is never an
 * outcome or success rate ("x% of patients improved"): the NMC Ethics Board
 * notice of 06.10.2026 prohibits success claims, and an invented outcome
 * statistic on a health page is the single most damaging thing it could
 * publish. Volume, time and access facts are fine.
 *
 * Unlike the reference there is no arrow beside the number — no symbols.
 */

export type ServiceStatProps = {
  heading: string;
  /** The number itself, e.g. "10,000+". */
  figure: string;
  /** What the number counts. Reads as one sentence with the figure. */
  caption: string;
  headingId?: string;
};

export function ServiceStat({
  heading,
  figure,
  caption,
  headingId = "service-stat-heading",
}: ServiceStatProps) {
  return (
    <section className={styles.section} data-svc-band="stat" aria-labelledby={headingId}>
      <div className={styles.inner}>
        <h2 id={headingId} className={styles.heading}>
          {heading}
        </h2>
        <p className={styles.stat}>
          <CountUp value={figure} className={styles.figure} />{" "}
          <span className={styles.caption}>{caption}</span>
        </p>
      </div>
    </section>
  );
}
