import Link from "next/link";

import styles from "./service-model.module.css";

/*
 * ServiceModel — LOCKED. Section 06 of every /services/* page.
 *
 * One centred statement of how care at MyStree is organised, on a soft
 * mist-to-blush wash, with a single quiet link onward.
 *
 * Differences from the reference, deliberately: the paragraph is shorter and
 * narrower (two or three lines on a laptop, not seven), a hairline separates
 * heading from body, and the link is a soft outlined pill with no arrow.
 * Only verifiable facts belong here — no outcome or superiority claims.
 */

export type ServiceModelProps = {
  heading: string;
  body: string;
  link: { label: string; href: string };
  headingId?: string;
};

export function ServiceModel({
  heading,
  body,
  link,
  headingId = "service-model-heading",
}: ServiceModelProps) {
  return (
    <section className={styles.section} data-svc-band="model" aria-labelledby={headingId}>
      <div className={styles.inner}>
        <h2 id={headingId} className={styles.heading}>
          {heading}
        </h2>
        <span className={styles.rule} aria-hidden="true" />
        <p className={styles.body}>{body}</p>
        <Link href={link.href} className={styles.link}>
          {link.label}
        </Link>
      </div>
    </section>
  );
}
