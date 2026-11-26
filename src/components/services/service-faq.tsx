import Link from "next/link";

import { ServiceAccordion, type AccordionItem } from "./service-accordion";
import styles from "./service-faq.module.css";

/*
 * ServiceFaq — LOCKED. Section 13 of every /services/* page.
 *
 * The service's frequently asked questions: heading and a link to the full
 * FAQ page on the left, the accordion on the right, on Alabaster paper. The
 * rows drop into place on scroll (CASCADE, in service-accordion.module.css).
 *
 * Writing rules for the questions:
 *   - phrase each as women type or say it ("Are my periods too heavy?")
 *   - first sentence is the complete answer; detail follows
 *   - one topic per question, no overlap with section 08
 *   - clinical statements must match current guidance; clinic statements
 *     must be facts already in this repository
 *   - every question appears in the page's FAQPage schema, verbatim
 *
 * Differences from the reference: the "see all" link sits under the heading
 * (where the eye already is) rather than under a long list, without an
 * arrow, and the rows animate in.
 */

export type ServiceFaqProps = {
  heading: string;
  items: readonly AccordionItem[];
  allLink: { label: string; href: string };
  headingId?: string;
};

export function ServiceFaq({ heading, items, allLink, headingId = "service-faq-heading" }: ServiceFaqProps) {
  return (
    <section className={styles.section} id="faq" data-svc-band="faq" aria-labelledby={headingId}>
      <div className={styles.inner}>
        <div className={styles.intro}>
          <h2 id={headingId} className={styles.heading}>
            {heading}
          </h2>
          <Link href={allLink.href} className={styles.all}>
            {allLink.label}
          </Link>
        </div>
        <ServiceAccordion items={items} cascade />
      </div>
    </section>
  );
}
