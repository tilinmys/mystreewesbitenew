import Link from "next/link";

import styles from "./team-2-hero.module.css";

export function Team2Hero() {
  return (
    <section className={styles.hero} aria-labelledby="team-2-hero-heading">
      <div className={styles.heroInner}>
        <div className={styles.copy}>
          <span className={styles.eyebrow}>
            13th Main Road, Indiranagar · Bengaluru
          </span>

          <h1 id="team-2-hero-heading" className={styles.heading}>
            Doctors, Nutritionists and Clinicians at MyStree
          </h1>

          <p className={styles.lead}>
            At MyStree on 13th Main Road, Indiranagar, gynaecologists, obstetricians,
            a nutritionist, a physiotherapist and mental health clinicians work
            together, with consultations planned around your health and your questions.
          </p>

          <div className={styles.actions}>
            <Link
              className={`${styles.primaryAction} cta-book`}
              href="/book"
              aria-label="Book an appointment with our doctors and nutritionists at MyStree"
            >
              Book consultation
            </Link>
            <Link
              className={styles.secondaryAction}
              href="#meet-providers"
              aria-label="Browse specialists and filter by concern"
            >
              Find your doctor
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Team2Hero;
