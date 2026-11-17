import Link from "next/link";

import styles from "./service-ask.module.css";

/*
 * ServiceAsk — LOCKED. Section 10 of every /services/* page.
 *
 * A slim wine band: "Still have questions?" and two ways to answer them —
 * WhatsApp first (the channel most women in Bengaluru already use with the
 * clinic), the FAQs second.
 *
 * Differences from the reference: a one-line reassurance under the heading,
 * WhatsApp as the filled action, and no arrow glyphs on either button.
 */

export type ServiceAskProps = {
  heading: string;
  note: string;
  whatsapp: { label: string; href: string };
  faqs: { label: string; href: string };
  headingId?: string;
};

export function ServiceAsk({ heading, note, whatsapp, faqs, headingId = "service-ask-heading" }: ServiceAskProps) {
  return (
    <section className={styles.section} aria-labelledby={headingId}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h2 id={headingId} className={styles.heading}>
            {heading}
          </h2>
          <p className={styles.note}>{note}</p>
        </div>
        <div className={styles.actions}>
          <a href={whatsapp.href} className={styles.primary} target="_blank" rel="noopener noreferrer">
            {whatsapp.label}
          </a>
          <Link href={faqs.href} className={styles.secondary}>
            {faqs.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
