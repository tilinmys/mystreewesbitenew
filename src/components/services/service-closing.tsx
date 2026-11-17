import Link from "next/link";

import styles from "./service-closing.module.css";

/*
 * ServiceClosing — LOCKED. Section 15, the last section of every
 * /services/* page, directly above the footer.
 *
 * One line and two actions in an inset wine panel on a light ground. The
 * reference runs a full-bleed dark band here; ours is inset because the
 * footer below is already wine, and two wine grounds must never touch.
 *
 * Primary: book. Secondary: a page-relevant next step (the doctors for this
 * service). No arrows.
 */

export type ServiceClosingProps = {
  heading: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  headingId?: string;
};

export function ServiceClosing({ heading, primary, secondary, headingId = "service-closing-heading" }: ServiceClosingProps) {
  return (
    <section className={styles.section} aria-labelledby={headingId}>
      <div className={styles.panel}>
        <h2 id={headingId} className={styles.heading}>
          {heading}
        </h2>
        <div className={styles.actions}>
          <Link href={primary.href} className="cta-book">
            {primary.label}
          </Link>
          <Link href={secondary.href} className={styles.secondary}>
            {secondary.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
