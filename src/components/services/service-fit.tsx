import { ServiceFitIcon, type ServiceFitIconName } from "./service-fit-icons";
import styles from "./service-fit.module.css";

/*
 * ServiceFit — LOCKED. Section 07 of every /services/* page.
 *
 * "This care is right for you if you have" — four situations, each with a
 * hand-drawn line illustration, on Alabaster paper.
 *
 * Differences from the reference, deliberately: each drawing sits in a soft
 * mist circle, the four columns are divided by hairlines, and on a phone the
 * items become a scannable list (drawing left, words right) rather than a
 * squeezed grid. The drawings trace themselves in on scroll (LINE DRAW, see
 * the module CSS).
 */

export type ServiceFitItem = { label: string; icon: ServiceFitIconName };

export type ServiceFitProps = {
  heading: string;
  items: readonly ServiceFitItem[];
  headingId?: string;
};

export function ServiceFit({ heading, items, headingId = "service-fit-heading" }: ServiceFitProps) {
  return (
    <section className={styles.section} aria-labelledby={headingId}>
      <div className={styles.inner}>
        <h2 id={headingId} className={styles.heading}>
          {heading}
        </h2>
        <ul className={styles.list}>
          {items.map((item) => (
            <li className={styles.item} key={item.label}>
              <span className={styles.badge}>
                <ServiceFitIcon name={item.icon} className={styles.icon} />
              </span>
              <span className={styles.label}>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
