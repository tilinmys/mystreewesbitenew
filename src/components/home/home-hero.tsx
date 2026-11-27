"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { MotionConfig, motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CalendarDays } from "lucide-react";

import { isLiteMotion, useStillAfterMount } from "@/lib/use-lite-motion";
import { HOME_IMAGES } from "./home-images";
import styles from "./home-hero.module.css";

/*
 * HomeHero — Clean, full-viewport editorial hero (card-free).
 *
 * Fits 100% inside the initial viewport across desktop, laptop, and mobile
 * screens without clipping, giving unobstructed room to the documentary human
 * portrait photography, larger Fraunces 400 display typography, and primary
 * booking + care team actions.
 */
const LINES = ["Women’s health care", "that always feels"] as const;

export function HomeHero() {
  const section = useRef<HTMLElement>(null);
  const reducedMotion = useStillAfterMount();
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end start"] });
  const copyY = useTransform(scrollYProgress, (v) => (isLiteMotion() ? 0 : v * -52));
  const imageScale = useTransform(scrollYProgress, (v) => (isLiteMotion() ? 1 : 1 + v * 0.055));
  const parallax = !reducedMotion;

  const desktop = HOME_IMAGES.hero;
  const mobile = HOME_IMAGES.heroMobile;
  const desktopSrc = desktop.ready ? desktop.src : desktop.fallback!;
  const mobileSrc = mobile.ready ? mobile.src : mobile.fallback!;

  return (
    <MotionConfig reducedMotion="user">
      <section ref={section} className={styles.hero} id="home" aria-labelledby="hero-heading">
        <div className={styles.stage}>
          <motion.div className={styles.media} style={parallax ? { scale: imageScale } : undefined}>
            <picture>
              <source media="(max-width: 767px)" srcSet={mobileSrc} />
              <Image
                src={desktopSrc}
                alt="Two South Indian women laughing warmly together in sunlit daylight"
                fill
                priority
                fetchPriority="high"
                quality={88}
                sizes="100vw"
                className={styles.image}
              />
            </picture>
          </motion.div>
          <div className={styles.shade} aria-hidden="true" />

          <motion.div className={styles.copy} style={parallax ? { y: copyY } : undefined}>
            <h1 id="hero-heading" className={styles.eyebrow}>
              Women&rsquo;s health clinic in Indiranagar, Bengaluru
            </h1>
            <p className={styles.display}>
              {LINES.map((line) => (
                <span key={line} className={styles.mask}>
                  <span className={styles.line}>{line}</span>
                </span>
              ))}
              <span className={styles.mask}>
                <em className={`${styles.line} ${styles.accent}`}>personal</em>
              </span>
            </p>
            <p className={styles.subtitle}>
              Gynaecology, pregnancy, PCOS, menopause, nutrition &amp; pelvic care — unhurried and
              under one roof on 13th Main Road.
            </p>
            <div className={styles.ctas}>
              <Link href="/book" className={`cta-book is-large ${styles.book}`}>
                <CalendarDays size={18} strokeWidth={1.8} aria-hidden="true" />
                <span className={styles.bookLong}>Book an appointment</span>
                <span className={styles.bookShort}>Book appointment</span>
              </Link>
              <Link href="/doctors" className={styles.secondary}>
                Meet our doctors
                <ArrowRight size={16} strokeWidth={1.8} aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
