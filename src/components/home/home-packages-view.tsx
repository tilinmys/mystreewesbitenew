"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import { clinic } from "@/lib/clinic";
import { HOME_IMAGES } from "./home-images";
import { ImageSlot } from "./image-slot";
import { useStillAfterMount } from "@/lib/use-lite-motion";
import styles from "./home-packages.module.css";

export type PackageCard = {
  href: string;
  title: string;
  price: string;
  tag: string;
  meta: string;
  icon: "scan" | "care" | "calendar" | "timer";
  image: "pkgCareJourney" | "pkgBloom" | "pkgNutrition" | "pkgIud";
};

const EASE = [0.16, 1, 0.3, 1] as const;
const SLIDE = { hidden: { opacity: 0, y: 24 }, shown: { opacity: 1, y: 0 } };
const WHATSAPP_URL = `https://wa.me/${clinic.telephone.replace("+", "")}?text=${encodeURIComponent(
  "Hello MyStree, could you help me choose a care package?",
)}`;

/*
 * Card anatomy, after the reference (a 410 × 280 card):
 * - package: a solid chip and an outlined chip with an icon, top left; a
 *   bold two-line title under them; a product image bleeding off the top
 *   right corner, behind the title's right edge; a full-width button pinned
 *   to the bottom.
 * - advice: a bold title, a "speak to" link with a circled arrow, and an
 *   image rising from the bottom edge over a lighter lower band.
 * The cards sit in one row that scrolls sideways (snap), with arrows on
 * larger screens and swipe on touch.
 */
export function HomePackagesView({ cards }: { cards: PackageCard[] }) {
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
    el.scrollBy({ left: dir * (card.getBoundingClientRect().width + 12), behavior: still ? "auto" : "smooth" });
  };

  const rise = (delay: number) =>
    still
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 0.9, delay, ease: EASE },
        };

  return (
    <section className={styles.section} aria-labelledby="packages-heading">
      <div className={styles.inner}>
        <div className={styles.top}>
          <motion.h2 id="packages-heading" className={styles.heading} {...rise(0)}>
            Planned care, at one <em className={styles.accent}>clear price.</em>
          </motion.h2>
          <motion.div
            className={styles.art}
            aria-hidden="true"
            initial={still ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.6, ease: EASE }}
          >
            <Image
              src="/images/home/packages/reproductive-anatomy-engraving.webp"
              alt=""
              fill
              sizes="(max-width: 767px) 100vw, 60vw"
              className={styles.artImage}
            />
          </motion.div>
        </div>

        <div className={styles.rowHead}>
          <p className={styles.kicker}>Choose where to start</p>
          <div className={styles.arrows}>
            <button type="button" className={styles.arrow} onClick={() => step(-1)} disabled={edges.start} aria-label="Previous packages">
              <ArrowLeft size={18} strokeWidth={1.75} aria-hidden="true" />
            </button>
            <button type="button" className={styles.arrow} onClick={() => step(1)} disabled={edges.end} aria-label="More packages">
              <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <motion.ul
        ref={track}
        className={styles.track}
        aria-label="Care packages"
        initial={still ? false : "hidden"}
        whileInView="shown"
        viewport={{ once: true, amount: 0.25 }}
        transition={{ staggerChildren: 0.06 }}
      >
        {cards.map((card) => (
          <motion.li key={card.href} className={styles.slide} variants={SLIDE} transition={{ duration: 0.7, ease: EASE }}>
            <article className={styles.card}>
              <div className={styles.cardImage}>
                <ImageSlot slot={HOME_IMAGES[card.image]} sizes="160px" className={styles.photo} compact />
              </div>
              <p className={styles.label}>
                {card.tag} <span aria-hidden="true">·</span> {card.meta}
              </p>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.price}>{card.price}</p>
              <Link href={card.href} className={styles.cta} aria-label={`View ${card.title}, ${card.price}`}>
                View package
                <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
              </Link>
            </article>
          </motion.li>
        ))}

        <motion.li className={styles.slide} variants={SLIDE} transition={{ duration: 0.7, ease: EASE }}>
          <article className={`${styles.card} ${styles.advice}`}>
            <h3 className={styles.cardTitle}>Need some advice?</h3>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={styles.speak}>
              Speak to our care team
              <span className={styles.speakIcon} aria-hidden="true">
                <ArrowUpRight size={13} strokeWidth={2} />
              </span>
            </a>
            <div className={styles.adviceImage}>
              <ImageSlot slot={HOME_IMAGES.careTeam} sizes="320px" className={styles.photo} compact />
            </div>
          </article>
        </motion.li>
      </motion.ul>
    </section>
  );
}
