"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Phone } from "lucide-react";

import { clinic } from "@/lib/clinic";
import { useStillAfterMount } from "@/lib/use-lite-motion";
import styles from "./home-closing.module.css";

/*
 * HomeClosing — Clean Deep Burgundy architectural closing band with a
 * subtle editorial fine-line sanctuary backdrop (replacing the previous
 * close-up skin photo). Drop custom generated line art at:
 *   /public/images/home/closing/mystree-closing-lineart.webp
 * and flip LINE_ART_READY = true to layer it seamlessly over the band.
 */
const LINE_ART_READY = false;
const EASE = [0.22, 1, 0.36, 1] as const;

export function HomeClosing() {
  const still = useStillAfterMount();

  const rise = (delay: number) =>
    still
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.35 },
          transition: { duration: 0.75, delay, ease: EASE },
        };

  return (
    <section className={styles.section} aria-labelledby="closing-heading">
      {LINE_ART_READY ? (
        <div className={styles.lineArtWrap} aria-hidden="true">
          <Image
            src="/images/home/closing/mystree-closing-lineart.webp"
            alt=""
            fill
            sizes="100vw"
            quality={88}
            className={styles.lineArtImage}
          />
        </div>
      ) : (
        <svg
          className={styles.decorativeLineArt}
          viewBox="0 0 1440 460"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <path
            d="M-60 390 C 180 280, 340 90, 620 120 C 890 150, 990 360, 1290 290 C 1380 268, 1440 220, 1510 185"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path
            d="M-40 120 C 210 240, 440 395, 760 345 C 1030 302, 1180 120, 1490 95"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 8"
          />
          <circle cx="1180" cy="230" r="170" stroke="currentColor" strokeWidth="1" />
          <circle cx="240" cy="230" r="145" stroke="currentColor" strokeWidth="0.9" />
        </svg>
      )}

      <div className={styles.inner}>
        <motion.p className={styles.eyebrow} {...rise(0)}>
          Indiranagar, Bengaluru · Mon–Sat, 9 am to 8 pm
        </motion.p>
        <motion.h2 id="closing-heading" className={styles.heading} {...rise(0.08)}>
          Your health deserves <em className={styles.accent}>time</em>, and a doctor who listens.
        </motion.h2>
        <motion.div className={styles.actions} {...rise(0.18)}>
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
