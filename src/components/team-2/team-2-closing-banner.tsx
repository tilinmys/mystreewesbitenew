"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import styles from "./team-2-closing-banner.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Team2ClosingBanner() {
  const reducedMotion = Boolean(useReducedMotion());

  const rise = (delay: number) =>
    reducedMotion
      ? // Same first frame as the server (no hydration mismatch), then shown
        // at once on mount: reduced-motion visitors never get a blank section.
        { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0 } }
      : {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.3 } as const,
          transition: { duration: 0.6, delay, ease: EASE },
        };

  return (
    <section
      className={styles.section}
      aria-labelledby="team-2-closing-heading"
    >
      <div className={styles.inner}>
        <motion.div className={styles.card} {...rise(0.04)}>
          <div className={styles.content}>
            <h2 id="team-2-closing-heading" className={styles.heading}>
              Ready to meet your care team?
            </h2>
            <p className={styles.lead}>
              Consult our gynaecologists, obstetricians, nutritionist and other clinicians
              on 13th Main Road, Indiranagar. Book a 15-minute consultation, in clinic or
              by video.
            </p>

            <div className={styles.actions}>
              <Link
                href="/book"
                className={styles.primaryAction}
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

          {/* Right Decorative Line: Organic Silhouette Wave matching reference media_1789567557040.png */}
          <div className={styles.silhouetteWrap} aria-hidden="true">
            <svg
              viewBox="0 0 100 230"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.silhouetteSvg}
            >
              <path
                d="M 91 8 C 65 25 72 45 69 68 C 65 85 20 95 4 118 C -10 145 10 170 20 178 C 35 190 60 205 81 218"
                stroke="var(--twilight-wine)"
                strokeWidth="2.75"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Team2ClosingBanner;
