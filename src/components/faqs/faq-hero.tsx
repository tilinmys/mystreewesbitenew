import type React from "react";
import styles from "./faq-hero.module.css";

/** /faqs section 1: the page's single heading, centred in the Oula style. */
export function FaqHero() {
  return (
    <header
      className={`${styles.hero} photo-ground photo-ground--center`}
      style={{ "--ground-image": "url(/images/grounds/faq-notebook.webp)", "--ground-position": "right center" } as React.CSSProperties}
    >
      <h1 className={styles.title}>Have questions? We&rsquo;re here to help.</h1>
    </header>
  );
}
