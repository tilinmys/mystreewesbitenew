import Link from "next/link";

import styles from "./service-closing.module.css";

const OTHER_SERVICES = [
  { label: "OBGYN Consults", href: "/services/obgyn-consults" },
  { label: "Pregnancy Care", href: "/services/prenatal" },
  { label: "PCOS Clinic", href: "/clinics/pcos" },
  { label: "Menopause", href: "/services/menopause" },
  { label: "Women's Health Check", href: "/services/womens-health-check" },
  { label: "Pelvic Physio", href: "/services/pelvic-floor-physiotherapy" },
  { label: "Nutrition", href: "/services/nutrition-counselling" },
  { label: "Dermatology", href: "/services/dermatology" },
  { label: "Teen Health", href: "/services/adolescent-health" },
  { label: "Mental Health", href: "/services/psychology" },
] as const;

export type ServiceClosingProps = {
  heading: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  headingId?: string;
};

export function ServiceClosing({ heading, primary, secondary, headingId = "service-closing-heading" }: ServiceClosingProps) {
  return (
    <section className={styles.section} aria-labelledby={headingId}>
      <nav className={styles.exploreServices} aria-label="Explore all women's health services">
        <p className={styles.exploreLabel}>Explore other MyStree care services</p>
        <ul className={styles.exploreList}>
          {OTHER_SERVICES.map((svc) => (
            <li key={svc.href}>
              <Link href={svc.href} className={styles.explorePill}>
                {svc.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

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
