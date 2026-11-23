"use client";

import Link from "next/link";
import styles from "./faq-closing-cta.module.css";

export function FAQClosingCTA() {
  return (
    <section className={styles.ctaSection} aria-labelledby="cta-heading">
      <div className={styles.container}>
        <h2 id="cta-heading" className={styles.title}>
          Ready to get started?
        </h2>
        <p className={styles.subtitle}>
          Experience collaborative, relationship-based women’s healthcare on 13th Main Road, Indiranagar.
        </p>
        <div className={styles.buttonGroup}>
          <Link href="/book" className={styles.primaryButton}>
            Get care
          </Link>
          <Link href="/contact" className={styles.secondaryButton}>
            Talk to an advisor
          </Link>
        </div>
      </div>
    </section>
  );
}
