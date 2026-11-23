"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { clinicArea } from "@/lib/clinic";
import styles from "./about-hero.module.css";

const copyVariants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.06, staggerChildren: 0.12 },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.68, ease: "easeOut" as const },
  },
};

// The headline reveals line by line behind a mask rather than as one block, so
// the opening reads as typesetting rather than as a product animation.
const lineVariants = {
  hidden: { y: "105%" },
  visible: {
    y: "0%",
    transition: { duration: 0.86, ease: [0.22, 0.61, 0.36, 1] as const },
  },
};

// Trailing space is deliberate: the masked lines are separate elements, so
// without it the accessible name and indexed text read "shouldbegin".
const headlineLines = ["Healthcare should ", "begin by listening."];

export function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // Differential drift only — a few percent, enough to separate the image plane
  // from the copy plane without becoming a parallax effect in its own right.
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-4%"]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className={styles.hero}
      aria-labelledby="about-hero-heading"
    >
      <motion.div
        className={styles.copy}
        variants={copyVariants}
        initial={reducedMotion ? false : "hidden"}
        animate={reducedMotion ? undefined : "visible"}
      >
        <motion.p variants={textVariants} className={styles.eyebrow}>
          Women&apos;s healthcare <span aria-hidden="true">•</span> {clinicArea}
        </motion.p>

        <h1 id="about-hero-heading" className={styles.headline}>
          {headlineLines.map((line) => (
            <span className={styles.headlineLine} key={line}>
              <motion.span
                className={styles.headlineInner}
                variants={reducedMotion ? undefined : lineVariants}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p variants={textVariants} className={styles.lead}>
          MyStree was built around a simple belief: women deserve care where
          concerns are investigated properly, questions are answered plainly, and
          the reasoning behind every clinical decision is explained in plain
          language.
        </motion.p>

        <motion.div variants={textVariants} className={styles.actions}>
          <Link className={`${styles.primaryAction} cta-book`} href="/book">
            Book a Consultation
          </Link>
          <Link className={styles.secondaryAction} href="/doctors">
            Meet our doctors
          </Link>
        </motion.div>
      </motion.div>

      <div className={styles.figure}>
        <motion.div
          className={styles.imageLayer}
          style={{ y: reducedMotion ? "0%" : imageY }}
        >
          <Image
            src="/images/about/mystree-woman-balcony-indiranagar.webp"
            alt="A woman standing beside a sunlit balcony door in a Bengaluru apartment, looking out mid-thought"
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 900px) 100vw, 43vw"
            quality={88}
            className={styles.image}
          />
        </motion.div>
        <div className={styles.grain} aria-hidden="true" />
      </div>
    </section>
  );
}

export default AboutHero;
