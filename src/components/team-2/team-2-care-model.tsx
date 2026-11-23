"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";

import styles from "./team-2-care-model.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;

interface ComparisonPoint {
  typical: string;
  mystree: string;
}

/*
 * What a woman needs, and what MyStree offers. No comparison with other
 * clinics or hospitals (NMC Guidelines on Ethical Advertising 2026; CCPA):
 * the left column states the need, never another provider's failing.
 */
const COMPARISONS: readonly ComparisonPoint[] = [
  {
    typical: "Doctors, nutrition advice and scans",
    mystree: "Gynaecologists, a nutritionist and pelvic ultrasound in one clinic on 13th Main Road, Indiranagar",
  },
  {
    typical: "Care that fits together",
    mystree: "With your consent, your doctor and nutritionist share notes and plan your care together",
  },
  {
    typical: "Your earlier reports looked at again",
    mystree: "Your doctor reviews your earlier reports alongside any new results",
  },
  {
    typical: "Time to ask your questions",
    mystree: "Consultations in clinic or by video",
  },
  {
    typical: "Advice you can follow",
    mystree: "Evidence-based care, explained plainly and without judgement",
  },
];

export function Team2CareModel() {
  const reducedMotion = Boolean(useReducedMotion());

  const rise = (delay: number) =>
    reducedMotion
      ? // Same first frame as the server (no hydration mismatch), then shown
        // at once on mount: reduced-motion visitors never get a blank section.
        { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0 } }
      : {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.2 } as const,
          transition: { duration: 0.6, delay, ease: EASE },
        };

  return (
    <section
      id="care-model"
      className={styles.section}
      aria-labelledby="care-model-heading"
    >
      <div className={styles.inner}>
        {/* Top Grid: Care Philosophy Statement & Orbiting Diagram */}
        <div className={styles.topRow}>
          <motion.div className={styles.copyCol} {...rise(0.04)}>
            <h2 id="care-model-heading" className={styles.heading}>
              You’re not one dimensional, neither is our care model
            </h2>
            <p className={styles.lead}>
              At MyStree, your gynaecologist, nutritionist and therapists work in the
              same clinic and, with your consent, plan your care together, so the
              advice you are given fits together.
            </p>
          </motion.div>

          <motion.div className={styles.diagramCol} {...rise(0.12)}>
            <div className={styles.diagramCard}>
              <Image
                src="/images/team/mystree-care-model-transparent.png"
                alt="MyStree care model: gynaecologist, pelvic floor therapist, nutritionist, ultrasound scanning and care coordinator around you"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                quality={95}
                priority
                className={styles.diagramImage}
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom: Comparative Ledger Table (Directly integrated per reference) */}
        <motion.div className={styles.tableCard} {...rise(0.18)}>
          <div className={styles.tableHeader}>
            <div className={styles.headerColLeft}>What you need</div>
            <div className={styles.headerColRight}>
              <span>MyStree</span>
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
              {...rise(0.08 + idx * 0.04)}
            >
              <div className={styles.mobileCardTypical}>
                <span className={styles.mobileLabelTypical}>
                  What you need
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

export default Team2CareModel;
