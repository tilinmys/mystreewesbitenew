"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Clock, MapPin, ShieldCheck } from "lucide-react";

import styles from "./team-2-hero.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Team2Hero() {
  const reducedMotion = Boolean(useReducedMotion());

  const rise = (delay: number) =>
    reducedMotion
      ? // Same first frame as the server (no hydration mismatch), then shown
        // at once on mount: reduced-motion visitors never get a blank section.
        { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0 } }
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.65, delay, ease: EASE },
        };

  return (
    <section className={styles.hero} aria-labelledby="team-2-hero-heading">
      <div className={styles.heroInner}>
        <div className={styles.copy}>
          <motion.span className={styles.eyebrow} {...rise(0.02)}>
            13th Main Road, Indiranagar · Bengaluru
          </motion.span>

          <motion.h1
            id="team-2-hero-heading"
            className={styles.heading}
            {...rise(0.06)}
          >
            Doctors, Nutritionists and Specialists at MyStree
          </motion.h1>

          <motion.p className={styles.lead} {...rise(0.12)}>
            At MyStree on 13th Main Road, Indiranagar, gynaecologists, obstetricians,
            a nutritionist, a physiotherapist and mental health clinicians work
            together, with consultations planned around your health and your questions.
          </motion.p>

          <motion.div className={styles.actions} {...rise(0.18)}>
            <Link
              className={`${styles.primaryAction} cta-book`}
              href="/book"
              aria-label="Book an appointment with our doctors and nutritionists at MyStree"
            >
              Get care
            </Link>
            <Link
              className={styles.secondaryAction}
              href="#care-model"
              aria-label="See our collaborative women's care model"
            >
              See our care model
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Team2Hero;
