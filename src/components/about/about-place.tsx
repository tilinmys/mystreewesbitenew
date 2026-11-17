"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import styles from "./about-place.module.css";

const viewport = { once: true, amount: 0.35 } as const;

/**
 * Final Section — Closing Call to Care
 *
 * Replaces the previous Indiranagar street photography banner with the serene,
 * minimal closing CTA requested in the reference design.
 * Features an atmospheric sanctuary gradient combining Uranian Mist, Sage,
 * Corn Silk and Alabaster, Fraunces serif light typography, and pill CTA buttons.
 */
export function AboutClosing() {
  const reducedMotion = Boolean(useReducedMotion());

  return (
    <section
      className={styles.closing}
      aria-labelledby="about-closing-heading"
    >
      <div className={styles.closingInner}>
        <motion.h2
          id="about-closing-heading"
          className={styles.closingHeading}
          initial={reducedMotion ? false : { opacity: 0, y: 22 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          Ready for a different kind of care?
        </motion.h2>

        <motion.div
          className={styles.closingActions}
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{
            duration: 0.7,
            delay: reducedMotion ? 0 : 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Link
            className={`${styles.primaryPill} cta-book`}
            href="/book"
            aria-label="Get care - book an in-clinic or virtual consultation"
          >
            Get care
          </Link>
          <Link
            className={styles.secondaryPill}
            href="/contact"
            aria-label="Start with labs - laboratory and diagnostic inquiries"
          >
            Start with labs
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
