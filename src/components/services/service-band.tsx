import type { ReactNode } from "react";

import styles from "./service-band.module.css";

/*
 * ServiceBand — LOCKED. The opening band of every /services/* page.
 *
 * Paints one continuous Twilight Wine gradient behind <ServiceHero> and the
 * <ServiceQuote> that follows it. Giving them a shared ground, rather than a
 * background each, is what makes the two read as a single arrival instead of
 * two stacked boxes with a seam between them.
 */
export function ServiceBand({ children }: { children: ReactNode }) {
  return (
    <div className={styles.band}>{children}</div>
  );
}
