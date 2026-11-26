"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";

import styles from "./team-2-comparison.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;

interface ComparisonPoint {
  typical: string;
  mystree: string;
}

const COMPARISONS: readonly ComparisonPoint[] = [
  {
    typical: "Different offices for different doctors across the city",
    mystree: "A one-stop sanctuary: OBGYN, fertility, pelvic health, and nutrition under one roof",
  },
  {
    typical: "No connection or shared notes between your providers",
    mystree: "Seamless context and real-time data-sharing across all your doctors",
  },
  {
    typical: "Different health records, bulky paper files, and conflicting care plans",
    mystree: "A single unified digital health record and personalized care plan",
  },
  {
    typical: "Rushed 5-minute consultations after hours in a crowded hospital waiting room",
    mystree: "Appointments where your story and questions are heard",
  },
  {
    typical: "Symptom-masking prescriptions, weight stigma, or dismissive advice",
    mystree: "Evidence-based root-cause medicine with empathetic, zero-judgment care",
  },
];

export function Team2Comparison() {
  const reducedMotion = Boolean(useReducedMotion());

  const rise = (delay: number) =>
    reducedMotion
      ? // Same first frame as the server (no hydration mismatch), then shown
        // at once on mount: reduced-motion visitors never get a blank section.
        { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0 } }
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.25 } as const,
          transition: { duration: 0.68, delay, ease: EASE },
        };

  return (
    <section
      className={styles.section}
      aria-labelledby="team-2-comparison-heading"
    >
      <div className={styles.inner}>
        {/* Section Header */}
        <motion.div className={styles.header} {...rise(0.04)}>
          <p className={styles.eyebrow}>The Clinical Difference</p>
          <h2 id="team-2-comparison-heading" className={styles.heading}>
            A fundamentally different standard of care.
          </h2>
          <p className={styles.subtitle}>
            Why women in Indiranagar and across Bangalore choose MyStree over
            traditional assembly-line hospitals.
          </p>
        </motion.div>

        {/* Desktop Comparison Table Card */}
        <motion.div className={styles.tableCard} {...rise(0.14)}>
          <div className={styles.tableHeader}>
            <div className={styles.headerColLeft}>Typical Doctor&apos;s Office</div>
            <div className={styles.headerColRight}>
              <span>MyStree Indiranagar</span>
              <span className={styles.badge}>
                <span className={styles.badgeDot} aria-hidden="true" />
                Integrated Care
              </span>
            </div>
          </div>

          <div>
            {COMPARISONS.map((row) => (
              <div key={row.typical} className={styles.tableRow}>
                <div className={styles.colLeft}>{row.typical}</div>
                <div className={styles.colRight}>
                  <span className={styles.checkIcon} aria-hidden="true">
                    <Check size={12} strokeWidth={2.6} />
                  </span>
                  <span>{row.mystree}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Mobile Stacked View */}
        <div className={styles.mobileView}>
          {COMPARISONS.map((row, idx) => (
            <motion.div
              key={row.typical}
              className={styles.mobileCard}
              {...rise(0.1 + idx * 0.06)}
            >
              <div className={styles.mobileCardTypical}>
                <span className={styles.mobileLabelTypical}>
                  Typical Doctor&apos;s Office
                </span>
                <p className={styles.mobileTextTypical}>{row.typical}</p>
              </div>
              <div className={styles.mobileCardMyStree}>
                <div className={styles.mobileLabelMyStree}>
                  <span>MyStree</span>
                  <span className={styles.badge}>Integrated</span>
                </div>
                <div className={styles.mobileContentMyStree}>
                  <span className={styles.checkIcon} aria-hidden="true">
                    <Check size={12} strokeWidth={2.6} />
                  </span>
                  <p className={styles.mobileTextMyStree}>{row.mystree}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Team2Comparison;
