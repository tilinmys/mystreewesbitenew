"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { ThreeBackdrop } from "./three/three-backdrop";
import styles from "./home-story.module.css";

/*
 * HomeStory, Section 03 (revised 14 Nov 2026), after the namaha.healthcare
 * "Seven decades" fold: a large heading top left, the text set lower on the
 * right, on white. Behind them a silk ribbon of fine burgundy lines, like a
 * dupatta in the air (three.js, hair-scene "ribbon"), folds slowly across
 * the foot of the section, carrying on the hair strands of the section above.
 *
 * Facts as published on /about and in the booking records: Dr. Smitha A.P,
 * founder, obstetrician for more than 23 years; Dr. Surbhi Sinha, co-founder,
 * obstetrician and gynaecologist.
 */
const EASE = [0.16, 1, 0.3, 1] as const;
const loadLines = () => import("./three/hair-scene");

export function HomeStory() {
  const reducedMotion = useReducedMotion();

  const rise = (delay: number) =>
    reducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 32 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.5 },
          transition: { duration: 1, delay, ease: EASE },
        };

  return (
    <section className={styles.section} aria-labelledby="story-heading">
      <ThreeBackdrop load={loadLines} variant="ribbon" className={styles.ribbon} />

      <div className={styles.inner}>
        <motion.h2 id="story-heading" className={styles.heading} {...rise(0)}>
          Founded by doctors who listen to <em className={styles.accent}>women</em>
        </motion.h2>

        <div className={styles.body}>
          <motion.p className={styles.text} {...rise(0.1)}>
            MyStree was founded by Dr. Smitha A.P, an obstetrician for more than 23 years, and
            Dr. Surbhi Sinha, an obstetrician and gynaecologist.
          </motion.p>
          <motion.p className={styles.text} {...rise(0.2)}>
            They built a clinic where a woman can see a gynaecologist, a nutritionist, a pelvic
            physiotherapist, a dermatologist and mental health clinicians in one place, with time
            to ask her questions, from her first period to menopause and beyond.
          </motion.p>
          <motion.div {...rise(0.3)}>
            <Link href="/about" className={styles.link}>
              Read about MyStree
              <ArrowRight size={16} strokeWidth={1.6} aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
