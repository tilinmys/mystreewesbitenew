"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import styles from "./blog-hero.module.css";

// Generate smooth, continuous sine wave SVG path
function generateSineWavePath(width = 1200, period = 32, amp = 5.5, midY = 10): string {
  let d = `M 0 ${midY} Q ${period / 4} ${midY - amp}, ${period / 2} ${midY}`;
  for (let x = period; x <= width; x += period / 2) {
    d += ` T ${x} ${midY}`;
  }
  return d;
}

const SINE_WAVE_PATH = generateSineWavePath(1200, 32, 5.5, 10);

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const dividerVariants: Variants = {
  hidden: { opacity: 0, scaleX: 0.94 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.3,
    },
  },
};

export function BlogHero() {
  return (
    <section
      className={`${styles.heroSection} photo-ground photo-ground--center`}
      style={{ "--ground-image": "url(/images/grounds/blog-reading-table.webp)", "--ground-position": "right center" } as React.CSSProperties}
    >
      <div className={styles.radialAura} aria-hidden="true" />

      <div className={styles.container}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          {/* Masthead Lockup */}
          <motion.div variants={itemVariants} className={styles.masthead}>
            <span className={styles.eyebrow}>THE</span>
            <h1 className={styles.brandHeadline}>
              <span className={styles.scriptWord}>mystree</span>
              <span className={styles.sansWord}>TAKE</span>
            </h1>
          </motion.div>

          {/* Lead Standfirst */}
          <motion.p variants={itemVariants} className={styles.standfirst}>
            Diving deep into female biology, hormonal science, and clinical truths.
          </motion.p>
        </motion.div>

        {/* Organic Sine-Wave Divider */}
        <motion.div
          variants={dividerVariants}
          initial="hidden"
          animate="visible"
          className={styles.dividerWrapper}
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 1200 20"
            preserveAspectRatio="none"
            className={styles.sineSvg}
          >
            <path
              d={SINE_WAVE_PATH}
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
