"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import type { ImageSlotData } from "./home-images";
import { ImageSlot } from "./image-slot";
import { useStillAfterMount } from "@/lib/use-lite-motion";
import styles from "./home-services-row.module.css";

/*
 * HomeServicesRow, Section 08 (16 Nov 2026), after the supplied reference:
 * a blush ground, a serif heading with an italic word, round previous/next
 * buttons on the right, and a row of white cards that scrolls sideways (an
 * image with an optional badge, a bold title, two or three lines of
 * description, "Learn more" with a circled arrow). The whole card links to
 * the service page, which opens at its top (see smooth-scroll.tsx).
 *
 * The cards are MyStree's most-asked-about care, in the order people
 * usually look for it: gynaecology, pregnancy, PCOS, menopause, pelvic
 * floor, nutrition, skin and hair, teen health, mental health. Copy is
 * factual (compliance review, 13 Nov 2026): no outcomes, ratings or
 * "most popular" claims.
 *
 * ------------------------------------------------------------------------
 * IMAGES TO GENERATE (one per card). Save as WebP, 1800 × 1200 px (3:2),
 * at /public/images/home/services/<file>, then set `ready: true` below.
 *
 * Shared style for every prompt (append to each):
 *   "Editorial still-life photograph, Indian home or clinic context,
 *    soft natural window light from the left, warm neutral palette of
 *    ivory, blush pink and muted burgundy, shallow depth of field, fine
 *    film grain, calm and premium, high resolution, ultra detailed,
 *    no people visible except hands where described, no faces, no text,
 *    no logos, no brand names, no watermark."
 *
 * 1. service-gynaecology-consultation.webp
 *    "A doctor's hands resting on a wooden consultation desk beside a
 *     closed leather notebook, a fountain pen and a small brass bowl of
 *     jasmine flowers, a soft blush wall behind."
 * 2. service-pregnancy-care.webp
 *    "Close-up of a woman's hands in a soft cotton kurta cradling a
 *     pregnant belly from the side, with a folded printed ultrasound
 *     picture held lightly between her fingers, warm daylight."
 * 3. service-pcos-care.webp
 *    "A neat flat-lay on a linen cloth: a menstrual cycle tracking
 *     calendar with a few days circled in burgundy ink, a cup of
 *     spearmint tea in a steel tumbler, a few cinnamon sticks."
 * 4. service-menopause-care.webp
 *    "An elegant hand fan with a block-printed cotton pattern resting
 *     on a cane chair beside a glass of water and a cup of herbal tea,
 *     late-afternoon light through a window grille."
 * 5. service-pelvic-floor-physiotherapy.webp
 *    "A rolled-up cotton yoga mat, a small soft exercise ball and a
 *     folded towel on a wooden floor, a woman's hand resting on the mat,
 *     calm morning light."
 * 6. service-nutrition-counselling.webp
 *    "Top-down Indian home meal on a wooden table: millet roti, a bowl
 *     of dal, seasonal vegetables, curd and a small bowl of fruit in
 *     steel and ceramic katoris, a woman's hand reaching for a bowl."
 * 7. service-dermatology.webp
 *    "A woman's hand holding a plain unbranded glass dropper bottle over
 *     a marble tray with a sprig of tulsi and a small bowl of aloe gel,
 *     soft diffused light."
 * 8. service-adolescent-health.webp
 *    "A teenage girl's hands holding an open diary with doodled flowers
 *     and a pencil, a school bag strap and a hair clip beside it, warm
 *     friendly light, no face."
 * 9. service-mental-health.webp
 *    "Two cups of chai on a small wooden side table between two
 *     cushioned armchairs, a box of tissues and a potted plant, a quiet
 *     counselling-room corner in soft daylight."
 * ------------------------------------------------------------------------
 */
type Service = {
  title: string;
  text: string;
  href: string;
  badge?: string;
  image: ImageSlotData;
};

const slot = (file: string, alt: string): ImageSlotData => ({
  src: `/images/home/services/${file}`,
  alt,
  width: 1800,
  height: 1200,
  ready: true,
});

const SERVICES: readonly Service[] = [
  {
    title: "Gynaecology consultation",
    text: "Periods, pain, discharge, contraception, screening and any concern you want to talk through with a gynaecologist.",
    href: "/services/obgyn-consults",
    badge: "In clinic or by video",
    image: slot("service-gynaecology-consultation.webp", "Artisanal consultation desk with leather notebook, brass pen, bowl of fresh jasmine blossoms, and tea mug in warm morning light"),
  },
  {
    title: "Pregnancy care",
    text: "Antenatal visits, scans and high-risk pregnancy care with our obstetricians, from your first test to after birth.",
    href: "/services/prenatal",
    image: slot("service-pregnancy-care.webp", "Prenatal care still life with monochrome ultrasound scan card, block-printed muslin blanket, pink lotus bud, and brass dish in soft morning light"),
  },
  {
    title: "PCOS care",
    text: "Irregular cycles, acne, hair growth and weight, looked at together by a gynaecologist and a nutritionist.",
    href: "/clinics/pcos",
    image: slot("service-pcos-care.webp", "Hormonal wellness still life with cycle-tracking journal, steaming spearmint tea in a steel tumbler, cinnamon sticks, and dried rose petals"),
  },
  {
    title: "Menopause care",
    text: "Hot flushes, sleep, mood and changing periods in perimenopause and menopause, with your options explained.",
    href: "/services/menopause",
    image: slot("service-menopause-care.webp", "Handcrafted block-printed fan resting on an antique cane surface in warm late-afternoon window light"),
  },
  {
    title: "Pelvic floor physiotherapy",
    text: "Leaking, pelvic pain and recovery after birth, with an obstetric and gynaecological physiotherapist.",
    href: "/services/pelvic-floor-physiotherapy",
    image: slot("service-pelvic-floor-physiotherapy.webp", "Rolled natural yoga mat, terracotta exercise ball and soft morning light on a wooden floor"),
  },
  {
    title: "Nutrition counselling",
    text: "Meal plans built around your food and routine, for PCOS, pregnancy, thyroid and recovery after birth.",
    href: "/services/nutrition-counselling",
    image: slot("service-nutrition-counselling.webp", "Top-down wholesome Indian clinical nutrition meal of millet roti, dal, vegetables and curd in ceramic bowls"),
  },
  {
    title: "Skin and hair care",
    text: "Acne, pigmentation and hair fall, including skin changes linked to hormones, with a dermatologist.",
    href: "/services/dermatology",
    image: slot("service-dermatology.webp", "Clinical dermatology amber dropper bottle with botanical tulsi and aloe essence on a white marble tray"),
  },
  {
    title: "Teen health",
    text: "Private consultations for young women on puberty, periods, hormonal changes and skin.",
    href: "/services/adolescent-health",
    image: slot("service-adolescent-health.webp", "Youthful wellness still life with open linen notebook, botanical sketches, herbal infusion, and warm natural light"),
  },
  {
    title: "Mental health",
    text: "Anxiety, low mood, stress and support in pregnancy and after birth, with a psychologist and a psychiatrist.",
    href: "/services/psychology",
    image: slot("service-mental-health.webp", "Two handcrafted ceramic cups of warm chai with steam, open linen journal, and fresh lotus flower on teakwood draped in dusty rose"),
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;
const SLIDE = { hidden: { opacity: 0, y: 24 }, shown: { opacity: 1, y: 0 } };

export function HomeServicesRow() {
  const still = useStillAfterMount();
  const track = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft < 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    measure();
    const el = track.current;
    el?.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      el?.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.getBoundingClientRect().width + 16), behavior: still ? "auto" : "smooth" });
  };

  return (
    <section className={styles.section} id="services" aria-labelledby="services-row-heading">
      <div className={styles.inner}>
        <motion.div
          className={styles.head}
          initial={still ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <h2 id="services-row-heading" className={styles.heading}>
            We&rsquo;re <em className={styles.accent}>more</em> than a single visit
          </h2>
          <div className={styles.arrows}>
            <button type="button" className={styles.arrow} onClick={() => step(-1)} disabled={edges.start} aria-label="Previous services">
              <ArrowLeft size={20} strokeWidth={1.75} aria-hidden="true" />
            </button>
            <button type="button" className={`${styles.arrow} ${styles.arrowNext}`} onClick={() => step(1)} disabled={edges.end} aria-label="More services">
              <ArrowRight size={20} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      </div>

      <motion.ul
        ref={track}
        className={styles.track}
        aria-label="Care at MyStree"
        initial={still ? false : "hidden"}
        whileInView="shown"
        viewport={{ once: true, amount: 0.25 }}
        transition={{ staggerChildren: 0.06 }}
      >
        {SERVICES.map((service) => (
          <motion.li
            key={service.href}
            className={styles.slide}
            variants={SLIDE}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <Link href={service.href} className={styles.card}>
              <span className={styles.media}>
                <ImageSlot slot={service.image} sizes="(max-width: 767px) 80vw, 340px" className={styles.photo} compact />
                {service.badge ? <span className={styles.badge}>{service.badge}</span> : null}
              </span>
              <span className={styles.title}>{service.title}</span>
              <span className={styles.text}>{service.text}</span>
              <span className={styles.more}>
                Learn more
                <span className={styles.moreIcon} aria-hidden="true">
                  <ArrowUpRight size={13} strokeWidth={2} />
                </span>
              </span>
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
