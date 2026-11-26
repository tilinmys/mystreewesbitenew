"use client";

import Image from "next/image";
import Link from "next/link";

import styles from "./team-2-closing-banner.module.css";

export function Team2ClosingBanner() {
  return (
    <section
      className={styles.section}
      aria-labelledby="team-2-closing-heading"
    >
      <div className={styles.inner}>
        <div className={styles.card}>
          <div className={styles.content}>
            <h2 id="team-2-closing-heading" className={styles.heading}>
              Ready to meet your care team?
            </h2>
            <p className={styles.lead}>
              Consult our gynaecologists, obstetricians, nutritionist and other clinicians
              on 13th Main Road, Indiranagar. Book a consultation, in clinic or
              by video.
            </p>

            <div className={styles.actions}>
              <Link
                href="/book"
                className={`cta-book ${styles.primaryAction}`}
                aria-label="Book a consultation with our doctors and nutritionists in Indiranagar"
              >
                Book Consultation
              </Link>
              <Link
                href="/about"
                className={styles.secondaryAction}
                aria-label="Learn more about MyStree clinic and care philosophy"
              >
                About Our Clinic
              </Link>
            </div>
          </div>

          <div className={styles.silhouetteWrap}>
            <Image
              src="/images/team/art-care-team-closing.webp"
              alt="Editorial burgundy ink illustration of three MyStree women clinicians standing together: obstetrician-gynaecologist, nutritionist, and physiotherapist"
              width={290}
              height={290}
              quality={90}
              className={styles.silhouetteImg}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Team2ClosingBanner;
