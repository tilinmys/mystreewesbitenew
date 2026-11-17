import Image from "next/image";

import styles from "./service-insight.module.css";

/*
 * ServiceInsight — LOCKED. Section 05 of every /services/* page.
 *
 * Image beside a short explanation of why the concern is often missed, on
 * Alabaster paper. Answers the "why" question search and answer engines
 * look for, in a few plain sentences and three short points.
 *
 * v2 (9 Oct 2026) follows the reference exactly, at the user's request: a
 * 3:2 landscape image centred against a narrow copy column, a light serif
 * heading about twice the body size, and each point led by a fine-line
 * check circle (a recorded icon exception in color.md).
 */

/** Fine-line check circle, drawn in the same hairline as the fit icons. */
function CheckCircle() {
  return (
    <svg className={styles.check} viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <circle cx="8" cy="8" r="7.25" stroke="currentColor" strokeWidth="1.1" />
      <path d="M5 8.2l2 2 4-4.4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export type ServiceInsightProps = {
  heading: string;
  body: string;
  points: readonly string[];
  image?: { src: string; alt: string };
  headingId?: string;
};

export function ServiceInsight({
  heading,
  body,
  points,
  image,
  headingId = "service-insight-heading",
}: ServiceInsightProps) {
  return (
    <section className={styles.section} aria-labelledby={headingId}>
      <div className={styles.inner}>
        <div className={styles.media}>
          {image ? (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 28rem, (min-width: 640px) 40rem, 100vw"
              quality={90}
              className={styles.image}
            />
          ) : (
            <div className={styles.placeholder} aria-hidden="true" />
          )}
        </div>

        <div className={styles.copy}>
          <h2 id={headingId} className={styles.heading}>
            {heading}
          </h2>
          <p className={styles.body}>{body}</p>
          <ul className={styles.points}>
            {points.map((point) => (
              <li className={styles.point} key={point}>
                <CheckCircle />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
