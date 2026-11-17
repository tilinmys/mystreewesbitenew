"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { CalendarDays } from "lucide-react";

import type { Doctor } from "@/lib/doctors";
import styles from "./home-team.module.css";

/*
 * HomeTeam, Section 09 (16 Nov 2026), after the supplied reference: a
 * centred serif heading and one line, then two rows of compact clinician
 * cards drifting slowly in opposite directions.
 *
 * Card (after the reference card, ~430 × 280): a round photo on the left;
 * on the right the name in serif, qualification chips, the role, the
 * experience and registration (NMC Guidelines 2026: name, qualification and
 * registration, no praise), and a "Book appointment" button.
 *
 * Motion: a CSS marquee (transform only, compositor thread; nothing runs in
 * JS per frame). Each row's list is rendered twice and moved by -50% for a
 * seamless loop. A row pauses while it is hovered, while a card inside it
 * has keyboard focus, and for five seconds after a touch, so a moving
 * button is never hard to hit. The copy is hidden from assistive tech and
 * the keyboard. Reduced motion: no drift; each row scrolls sideways instead.
 *
 * Data: getDoctors() (booking roster merged over the written profiles).
 */
type Card = {
  slug: string;
  name: string;
  role: string;
  image: string;
  chips: string[];
  experience?: string;
  registration?: string;
  bookingUrl: string;
};

const EASE = [0.16, 1, 0.3, 1] as const;
/* About 50px a second on desktop: slow enough to read a name as it passes. */
const SECONDS_PER_CARD = 9;

function toCard(doctor: Doctor): Card {
  const qualification = doctor.credentials.find((c) => !/experience|^Reg\.\s*No\./i.test(c)) ?? "";
  const chips = qualification
    .split(/,\s*(?![^()]*\))/)
    .map((c) => c.trim())
    .filter(Boolean)
    .slice(0, 4);
  return {
    slug: doctor.slug,
    name: doctor.name,
    role: doctor.title,
    image: doctor.image,
    chips,
    experience: doctor.credentials.find((c) => /experience/i.test(c)),
    registration: doctor.credentials.find((c) => /^Reg\.\s*No\./i.test(c)),
    bookingUrl: doctor.bookingUrl ?? "/book",
  };
}

/*
 * Compact card (revised 16 Nov 2026): a small round photo with the name and
 * role beside it; the qualifications as one quiet line of plain text (no
 * tinted chips); a hairline, then experience and registration on the left
 * and a small "Book" button on the right.
 */
function TeamCard({ card, hidden }: { card: Card; hidden?: boolean }) {
  const tab = hidden ? -1 : undefined;
  return (
    <article className={styles.card}>
      <Link href={`/doctors/${card.slug}`} className={styles.photo} tabIndex={tab} aria-hidden={hidden || undefined}>
        {/* eslint-disable-next-line @next/next/no-img-element -- roster photos come from more than one host */}
        <img src={card.image} alt="" width={120} height={120} loading="lazy" decoding="async" />
      </Link>
      <div className={styles.info}>
        <Link href={`/doctors/${card.slug}`} className={styles.name} tabIndex={tab}>
          {card.name}
        </Link>
        {card.chips.length ? (
          <ul className={styles.chips} aria-label="Qualifications">
            {card.chips.map((chip) => (
              <li key={chip} className={styles.chip}>
                {chip}
              </li>
            ))}
          </ul>
        ) : null}
        <p className={styles.role}>{card.role}</p>
        {card.experience ? <p className={styles.meta}>{card.experience}</p> : null}
        <Link
          href={card.bookingUrl}
          className={`cta-book is-small ${styles.book}`}
          tabIndex={tab}
          aria-label={hidden ? undefined : `Book an appointment with ${card.name}`}
        >
          <CalendarDays size={14} strokeWidth={1.8} aria-hidden="true" />
          Book appointment
        </Link>
      </div>
    </article>
  );
}

function Row({ cards, reverse, still }: { cards: Card[]; reverse?: boolean; still: boolean }) {
  const [touched, setTouched] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const holdForTouch = useCallback(() => {
    setTouched(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setTouched(false), 5000);
  }, []);

  if (!cards.length) return null;
  return (
    <div
      className={`${styles.row} ${still ? styles.rowStill : ""} ${touched ? styles.paused : ""}`}
      onPointerDown={(e) => {
        if (e.pointerType !== "mouse") holdForTouch();
      }}
    >
      <ul
        className={`${styles.track} ${reverse ? styles.reverse : ""}`}
        style={{ ["--duration" as string]: `${cards.length * SECONDS_PER_CARD}s` }}
      >
        {cards.map((card) => (
          <li key={card.slug} className={styles.item}>
            <TeamCard card={card} />
          </li>
        ))}
        {still
          ? null
          : cards.map((card) => (
              <li key={`${card.slug}-copy`} className={styles.item} aria-hidden="true">
                <TeamCard card={card} hidden />
              </li>
            ))}
      </ul>
    </div>
  );
}

export function HomeTeam({ doctors }: { doctors: readonly Doctor[] }) {
  const still = useReducedMotion() ?? false;
  const cards = doctors.map(toCard);
  const first = cards.filter((_, i) => i % 2 === 0);
  const second = cards.filter((_, i) => i % 2 === 1);

  return (
    <section className={styles.section} aria-labelledby="team-heading">
      <motion.div
        className={styles.head}
        initial={still ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <h2 id="team-heading" className={styles.heading}>
          Meet the <em className={styles.accent}>doctors</em> who will care for you.
        </h2>
        <p className={styles.lead}>
          Gynaecologists and obstetricians, a reproductive medicine specialist, a nutritionist, a
          pelvic physiotherapist, a dermatologist, a psychologist and a psychiatrist, in one clinic
          in Indiranagar.
        </p>
      </motion.div>

      <motion.div
        className={styles.rows}
        initial={still ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1.2, ease: EASE }}
      >
        <Row cards={first} still={still} />
        <Row cards={second} reverse still={still} />
      </motion.div>

      <div className={styles.foot}>
        <Link href="/doctors" className={styles.all}>
          See all our specialists
        </Link>
      </div>
    </section>
  );
}
