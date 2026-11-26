"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { MotionConfig, motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, CalendarDays } from "lucide-react";

import { clinic } from "@/lib/clinic";
import { isLiteMotion, useStillAfterMount } from "@/lib/use-lite-motion";
import { HOME_IMAGES } from "./home-images";
import { HOURS_DISPLAY, TEL_HREF } from "./home-nav-data";
import styles from "./home-hero.module.css";

/*
 * HomeHero, Section 01 (revised 16 Nov 2026, booking-first).
 *
 * A first-time visitor usually comes to do one of four things: book an
 * appointment, find a doctor, see what we treat, or find the clinic. All
 * four are answered in the first screen, on phones too:
 * - the primary "Book an appointment" button (the site-wide .cta-book) and a
 *   secondary "Find a specialist" sit directly under the heading;
 * - four glass cards cover services, specialists, the location (opens Google
 *   Maps) and call / WhatsApp.
 * The site navbar (with its own Book button) sits above, on every page.
 *
 * Layout: the stage is a flex column, heading block centred in the free
 * space and the cards in flow at the bottom, so they can never overlap.
 * Motion: heading lines rise on load, cards follow; on scroll the photograph
 * eases in and the heading drifts up (transforms only). Reduced motion: still.
 */
const EASE = [0.16, 1, 0.3, 1] as const;

const LINES = ["Women’s health care", "that always feels"] as const;

type Card = { title: string; text: string; href: string; label: string; external?: boolean };

const CARDS: readonly Card[] = [
  {
    title: "Our services",
    text: "Gynaecology, pregnancy, PCOS & menopause.",
    href: "/#services",
    label: "See the care we offer",
  },
  {
    title: "Our care team",
    text: "16 specialists in one Indiranagar clinic.",
    href: "/doctors",
    label: "Meet our care team",
  },
  {
    title: "Find the clinic",
    text: "13th Main Road, Indiranagar. Directions.",
    href: clinic.mapsUrl,
    label: "Get directions to MyStree",
    external: true,
  },
  {
    title: "Call us",
    text: `${clinic.telephoneDisplay} · ${HOURS_DISPLAY}.`,
    href: TEL_HREF,
    label: "Call MyStree",
  },
];

function HeroCard({ card, index, still }: { card: Card; index: number; still: boolean }) {
  const content = (
    <>
      <span className={styles.cardTitle}>{card.title}</span>
      <span className={styles.cardRule} aria-hidden="true" />
      <span className={styles.cardText}>{card.text}</span>
      <span className={styles.cardArrow} aria-hidden="true">
        <ArrowUpRight size={14} strokeWidth={1.6} />
      </span>
    </>
  );
  return (
    <motion.li
      initial={still ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: EASE }}
    >
      {card.external || card.href.startsWith("tel:") ? (
        <a
          href={card.href}
          className={styles.card}
          aria-label={`${card.title}: ${card.label}`}
          {...(card.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {content}
        </a>
      ) : (
        <Link href={card.href} className={styles.card} aria-label={`${card.title}: ${card.label}`}>
          {content}
        </Link>
      )}
    </motion.li>
  );
}

export function HomeHero() {
  const section = useRef<HTMLElement>(null);
  const reducedMotion = useStillAfterMount();
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end start"] });
  // Phones: photo and heading stay put while scrolling (no per-frame work
  // under the cards); the entrance animations remain.
  const copyY = useTransform(scrollYProgress, (v) => (isLiteMotion() ? 0 : v * -60));
  const imageScale = useTransform(scrollYProgress, (v) => (isLiteMotion() ? 1 : 1 + v * 0.06));
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
                alt="A woman talking warmly with a gynaecologist at MyStree clinic in Indiranagar, Bengaluru"
                fill
                priority
                fetchPriority="high"
                quality={90}
                sizes="100vw"
                className={styles.image}
              />
            </picture>
          </motion.div>
          <div className={styles.shade} aria-hidden="true" />

          <motion.div className={styles.copy} style={parallax ? { y: copyY } : undefined}>
            {/*
              SEO (17 Nov 2026): the page's one <h1> is the descriptive line,
              "Women's health clinic in Indiranagar, Bengaluru" (SEO.md §4),
              styled as the small eyebrow; the slogan below is a styled <p>.
              Same look as before.
            */}
            <motion.h1
              id="hero-heading"
              className={styles.eyebrow}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.1 }}
            >
              Women&rsquo;s health clinic in Indiranagar, Bengaluru
            </motion.h1>
            <p className={styles.display}>
              {LINES.map((line, i) => (
                <span key={line} className={styles.mask}>
                  <motion.span
                    className={styles.line}
                    initial={{ y: "105%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.9, delay: 0.2 + i * 0.12, ease: EASE }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
              <span className={styles.mask}>
                <motion.em
                  className={`${styles.line} ${styles.accent}`}
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.9, delay: 0.44, ease: EASE }}
                >
                  personal
                </motion.em>
              </span>
            </p>
            <motion.div
              className={styles.ctas}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
            >
              <Link href="/book" className={`cta-book is-large ${styles.book}`}>
                <CalendarDays size={18} strokeWidth={1.8} aria-hidden="true" />
                <span className={styles.bookLong}>Book an appointment</span>
                <span className={styles.bookShort}>Book appointment</span>
              </Link>
              <Link href="/doctors" className={styles.secondary}>
                Meet our doctors
                <ArrowRight size={16} strokeWidth={1.8} aria-hidden="true" />
              </Link>
            </motion.div>
          </motion.div>

          <div className={styles.cardsWrap}>
            <ul className={styles.cards} aria-label="Find your way">
              {CARDS.map((card, i) => (
                <HeroCard key={card.title} card={card} index={i} still={reducedMotion} />
              ))}
            </ul>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
