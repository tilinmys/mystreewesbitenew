"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { HOME_IMAGES } from "./home-images";
import { ImageSlot } from "./image-slot";
import styles from "./home-generations.module.css";

/*
 * HomeGenerations, Section 05 (revised 16 Nov 2026): a portrait photograph
 * on the left, sized to fit the screen (never cut off by the fold), and the
 * text column on the right, vertically centred against it.
 *
 * Motion, tied to the scroll (function-form transforms, transform only):
 * the frame opens from a slightly inset clip as it enters; inside it the
 * photograph eases from 1.14 to 1 and drifts upward; the text column moves a
 * little slower than the page, so the two layers separate gently.
 * Reduced motion: all still.
 */
const EASE = [0.16, 1, 0.3, 1] as const;

export function HomeGenerations() {
  const still = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start end", "end start"] });
  const inset = useTransform(scrollYProgress, (v) => {
    const k = Math.min(1, Math.max(0, v / 0.4));
    const e = 1 - Math.pow(1 - k, 3);
    return `inset(${(1 - e) * 8}% ${(1 - e) * 6}% ${(1 - e) * 8}% ${(1 - e) * 6}% round 18px)`;
  });
  const zoom = useTransform(scrollYProgress, (v) => 1.14 - Math.min(1, v * 1.4) * 0.14);
  const drift = useTransform(scrollYProgress, (v) => `${(0.5 - v) * 10}%`);
  const copyY = useTransform(scrollYProgress, (v) => (0.5 - v) * 60);

  const rise = (delay: number) =>
    still
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.5 },
          transition: { duration: 0.9, delay, ease: EASE },
        };

  return (
    <section ref={section} className={styles.section} aria-labelledby="generations-heading">
      <div className={styles.inner}>
        <motion.div className={styles.frame} style={still ? undefined : { clipPath: inset }}>
          <motion.div className={styles.drift} style={still ? undefined : { y: drift, scale: zoom }}>
            <ImageSlot slot={HOME_IMAGES.generations} sizes="(max-width: 767px) 100vw, 50vw" className={styles.image} />
          </motion.div>
        </motion.div>

        <motion.div className={styles.copy} style={still ? undefined : { y: copyY }}>
          <motion.p className={styles.eyebrow} {...rise(0)}>
            Every stage of life
          </motion.p>
          <motion.h2 id="generations-heading" className={styles.heading} {...rise(0.05)}>
            Her health, cared for at <em className={styles.accent}>every stage</em>
          </motion.h2>
          <motion.p className={styles.text} {...rise(0.12)}>
            From the first questions of puberty to pregnancy, menopause and beyond, our
            gynaecologists, nutritionist, physiotherapist, dermatologist and mental health
            clinicians look after each stage, in one clinic, with time to listen.
          </motion.p>
          <motion.div {...rise(0.2)}>
            <Link href="/#services" className={styles.link}>
              Explore women&rsquo;s health care
              <ArrowRight size={16} strokeWidth={1.6} aria-hidden="true" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
