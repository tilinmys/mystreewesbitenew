import type { ReactNode } from "react";

import styles from "./service-band.module.css";

/*
 * ServiceBand — Sticky opening hero band shared by all 11 /services/* and
 * /clinics/pcos pages. Stays gently pinned as the next section (ServiceSpecialists)
 * glides up over it like an architectural sheet on scroll.
 */
export function ServiceBand({ children }: { children: ReactNode }) {
  return (
    <div className={styles.band} data-svc-hero-band="true">
      {children}
    </div>
  );
}
