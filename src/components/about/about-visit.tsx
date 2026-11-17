"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { clinic } from "@/lib/clinic";
import styles from "./about-visit.module.css";

/**
 * Section 07 — the clinic.
 *
 * An editorial "visit" composition rather than a contact block: emotional copy
 * on the left, a numbered information ledger on the right, joined by one thin
 * drawn contour. No cards, no icons, no panels — hierarchy comes from type,
 * rules and spacing.
 *
 * Every value is read from `@/lib/clinic`, so the phone, email and map
 * destination stay identical to the footer and the structured data.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

const headlineLines = ["A quieter place", "to talk about health."];

const ledger = [
  {
    index: "01",
    label: "Call",
    value: clinic.telephoneDisplay,
    href: `tel:${clinic.telephone}`,
    external: false,
  },
  {
    index: "02",
    label: "Email",
    value: clinic.email,
    href: `mailto:${clinic.email}`,
    external: false,
  },
  {
    index: "03",
    label: "Directions",
    value: "Get directions",
    href: clinic.mapsPlaceUrl,
    external: true,
  },
];

export function AboutVisit() {
  const reducedMotion = Boolean(useReducedMotion());

  /** Shared entrance factory — one definition, staggered by caller. */
  const rise = (delay: number) =>
    reducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.4 } as const,
          transition: { duration: 0.62, delay, ease: EASE },
        };

  return (
    <section id="location" className={styles.visit} aria-labelledby="about-visit-heading">
      <div className={styles.inner}>
        {/* ---------------- Left: context ---------------- */}
        <div className={styles.editorial}>
          <motion.p className={styles.eyebrow} {...rise(0)}>
            The clinic <span aria-hidden="true">·</span> {clinic.locality},{" "}
            {clinic.city}
          </motion.p>

          <h2 id="about-visit-heading" className={styles.headline}>
            {headlineLines.map((line, i) => (
              <span className={styles.headlineLine} key={line}>
                <motion.span
                  className={styles.headlineInner}
                  initial={reducedMotion ? false : { y: "105%" }}
                  whileInView={reducedMotion ? undefined : { y: "0%" }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.78,
                    delay: 0.08 + i * 0.1,
                    ease: EASE,
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h2>

          <motion.p className={styles.body} {...rise(0.28)}>
            MyStree brings consultations and connected women&apos;s healthcare
            into a private setting in {clinic.locality}.
          </motion.p>

          {/* Anchors the lower half of the column so it reads composed. */}
          <motion.p className={styles.detail} {...rise(0.36)}>
            Private consultations <span aria-hidden="true">·</span> By
            appointment
          </motion.p>
        </div>

        {/*
          The one brand device: a thin drawn contour crossing the gutter between
          the copy and the ledger. Architectural, not decorative — it is the only
          non-typographic mark in the section.
        */}
        <motion.svg
          className={styles.contour}
          viewBox="0 0 120 420"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
          initial={reducedMotion ? false : { opacity: 0 }}
          whileInView={reducedMotion ? undefined : { opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
        >
          <motion.path
            d="M8 6C8 96 112 132 112 214C112 296 8 330 8 414"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            initial={reducedMotion ? false : { pathLength: 0 }}
            whileInView={reducedMotion ? undefined : { pathLength: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.5, delay: 0.4, ease: "easeInOut" }}
          />
        </motion.svg>

        {/* ---------------- Right: the ledger ---------------- */}
        <div className={styles.ledger}>
          <motion.div className={styles.ledgerHead} {...rise(0.1)}>
            <p className={styles.ledgerTitle}>Visit MyStree</p>
            <p className={styles.ledgerPlace}>
              {clinic.locality}, {clinic.city}
            </p>
          </motion.div>

          <dl className={styles.rows}>
            {ledger.map((row, i) => (
              <motion.div
                className={styles.row}
                key={row.label}
                initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + i * 0.08,
                  ease: EASE,
                }}
              >
                <dt className={styles.rowLabel}>
                  <span className={styles.rowIndex} aria-hidden="true">
                    {row.index}
                  </span>
                  {row.label}
                </dt>
                <dd className={styles.rowValue}>
                  <a
                    className={styles.rowLink}
                    href={row.href}
                    {...(row.external
                      ? { target: "_blank", rel: "noreferrer" }
                      : {})}
                  >
                    <span className={styles.rowLinkText}>{row.value}</span>
                    <span className={styles.rowArrow} aria-hidden="true">
                      {row.external ? "↗" : "→"}
                    </span>
                  </a>
                </dd>
              </motion.div>
            ))}
          </dl>

          <motion.div className={styles.ctaWrap} {...rise(0.46)}>
            <Link className={`${styles.cta} cta-book is-large is-pulse`} href="/book">
              <span>Book a consultation</span>
              <span className={styles.ctaArrow} aria-hidden="true">
                →
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutVisit;
