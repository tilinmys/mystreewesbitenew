import Link from "next/link";

import styles from "./service-conditions.module.css";

/*
 * ServiceConditions — LOCKED. Section 04 of every /services/* page.
 *
 * The conditions a service treats, on the wine mesh, revealed with the
 * ROLL CALL animation (see the module CSS): each condition steps in from the
 * divider one at a time as it scrolls into view, while the divider draws
 * itself down beside it.
 *
 * Every condition is rendered in the server HTML. Roll Call only changes how
 * already-present text appears; it never adds content, so search engines and
 * screen readers get the full list regardless of scroll position.
 *
 * Differences from the reference, deliberately: the action sits under the
 * heading rather than floating at the foot of the section (it keeps the
 * section to roughly one screen on a laptop), there are no arrow glyphs on
 * the items, and the divider is a drawn line rather than a static border.
 */

export type ServiceConditionsProps = {
  heading: string;
  /** Plain names, alphabetical — a list people scan for their own word. */
  conditions: readonly string[];
  cta: { label: string; href: string };
  headingId?: string;
};

export function ServiceConditions({
  heading,
  conditions,
  cta,
  headingId = "service-conditions-heading",
}: ServiceConditionsProps) {
  return (
    <section className={styles.section} aria-labelledby={headingId}>
      <div className={styles.inner}>
        <h2 id={headingId} className={styles.heading}>
          {heading}
        </h2>

        <ul className={styles.list}>
          {conditions.map((condition) => (
            <li className={styles.item} key={condition}>
              <span className={styles.label}>{condition}</span>
            </li>
          ))}
        </ul>

        <div className={styles.action}>
          <Link href={cta.href} className="cta-book">
            {cta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
