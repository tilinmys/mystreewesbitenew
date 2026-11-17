"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { MapPin, Phone } from "lucide-react";

import { clinic } from "@/lib/clinic";
import styles from "./home-closing.module.css";

/*
 * HomeClosing, the last home section before the footer (16 Nov 2026), after
 * the supplied reference: a full-bleed, warm close-up photograph of skin, a
 * centred two-line serif statement with one italic word, and one booking
 * button. The photograph drifts slowly as the section scrolls past.
 *
 * Copy: no statistics or outcome claims (the reference's "74% receive a
 * diagnosis" is the kind of claim the compliance review of 13 Nov 2026
 * removed); one calm, factual invitation to book.
 *
 * ------------------------------------------------------------------------
 * IMAGE TO GENERATE (2 files). Save as WebP, then set READY to true below.
 *
 *   /public/images/home/closing/mystree-closing-skin-desktop.webp  2880 × 1200
 *   /public/images/home/closing/mystree-closing-skin-mobile.webp   1200 × 1800
 *
 * In use (16 Nov 2026): a warm close-up of a shoulder, supplied by the user;
 * the generator's corner mark was removed. The prompt below is the
 * people-free alternative (fabric and light only), if it is ever replaced.
 *
 * Prompt (desktop, 21:9):
 *   "Abstract close-up editorial photograph of soft flowing silk fabric in
 *    warm terracotta, rosewood and cocoa tones, gentle folds and ripples
 *    catching soft directional window light from the right and falling into
 *    deep warm shadow on the left, smooth satin sheen, very shallow depth of
 *    field, calm and intimate mood, fine film grain, high resolution, ultra
 *    detailed, no people, no hands, no faces, no text, no logos, no
 *    watermark, minimal luxury editorial style."
 *
 * Prompt (mobile, 2:3): the same, framed vertically: "the main fold of the
 *    silk running diagonally from the top right to the lower left, with soft
 *    out-of-focus fabric filling the centre of the frame".
 *
 * Keep the centre of the frame calm and mid-toned: the white statement and
 * the button sit there.
 * ------------------------------------------------------------------------
 */
const READY = true;
const EASE = [0.16, 1, 0.3, 1] as const;

export function HomeClosing() {
  const still = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, (v) => `${(v - 0.5) * -12}%`);
  const zoom = useTransform(scrollYProgress, (v) => 1.12 - v * 0.08);

  const rise = (delay: number) =>
    still
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.5 },
          transition: { duration: 1, delay, ease: EASE },
        };

  return (
    <section ref={section} className={styles.section} aria-labelledby="closing-heading">
      <motion.div className={styles.media} style={still ? undefined : { y: drift, scale: zoom }} aria-hidden="true">
        {READY ? (
          <picture>
            <source media="(max-width: 767px)" srcSet="/images/home/closing/mystree-closing-skin-mobile.webp" />
            <Image
              src="/images/home/closing/mystree-closing-skin-desktop.webp"
              alt=""
              fill
              sizes="100vw"
              className={styles.image}
            />
          </picture>
        ) : (
          <div className={styles.placeholder} />
        )}
      </motion.div>
      <div className={styles.shade} aria-hidden="true" />
      {READY ? null : (
        <span className={styles.placeholderTag} aria-hidden="true">
          Image placeholder · mystree-closing-skin-desktop.webp
        </span>
      )}

      <div className={styles.inner}>
        <motion.h2 id="closing-heading" className={styles.heading} {...rise(0)}>
          Your health deserves <em className={styles.accent}>time</em>, and a doctor who listens.
        </motion.h2>
        <motion.div className={styles.actions} {...rise(0.15)}>
          <Link href="/book" className={`cta-book is-large ${styles.cta}`}>
            Book an appointment
          </Link>
          <a href={`tel:${clinic.telephone}`} className={styles.call}>
            <Phone size={16} strokeWidth={1.75} aria-hidden="true" />
            Call {clinic.telephoneDisplay}
          </a>
          <a href={clinic.mapsUrl} target="_blank" rel="noopener noreferrer" className={styles.call}>
            <MapPin size={16} strokeWidth={1.75} aria-hidden="true" />
            Get directions
          </a>
        </motion.div>
      </div>
    </section>
  );
}
