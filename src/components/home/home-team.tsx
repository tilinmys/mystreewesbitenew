"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { useStillAfterMount } from "@/lib/use-lite-motion";
import styles from "./home-team.module.css";

const TILE_EASE = [0.22, 1, 0.36, 1] as const;

/*
 * HomeTeam — Editorial "Meet our Care Team" section.
 *
 * Two-column scroll-fit composition inspired by the reference silhouette and
 * crafted in MyStree's authoritative Burgundy & Warm Alabaster system:
 *   Left  — Fraunces 400 heading, concise 3-line Plus Jakarta Sans 400 copy,
 *           and a single primary MyStree Burgundy pill CTA linking to /doctors.
 *   Right — 3-over-2 staggered rounded-square portrait mosaic of MyStree's
 *           multidisciplinary clinicians (editorial monochrome over 5 curated
 *           MyStree tonal tiles, warming gently on hover/focus).
 */

type FeaturedMember = {
  slug: string;
  name: string;
  role: string;
  src: string;
  tone: "plum" | "burgundy" | "blush" | "taupe" | "garnet";
};

const TOP_ROW: readonly FeaturedMember[] = [
  {
    slug: "dr-smitha-ap",
    name: "Dr. Smitha A.P",
    role: "Founder & High-Risk Obstetrics",
    src: "/images/specialists/dr-smitha-ap-cutout.webp",
    tone: "plum",
  },
  {
    slug: "dr-surbhi-sinha",
    name: "Dr. Surbhi Sinha",
    role: "Obstetrics & Gynaecology",
    src: "/images/specialists/dr-surbhi-sinha-cutout.webp",
    tone: "burgundy",
  },
  {
    slug: "dr-chaitra-nayak",
    name: "Dr. Chaitra Nayak",
    role: "Gynaecology & Fertility",
    src: "/images/specialists/dr-chaitra-nayak-cutout.webp",
    tone: "blush",
  },
];

const BOTTOM_ROW: readonly FeaturedMember[] = [
  {
    slug: "priyanka-savina",
    name: "Ms. Priyanka Savina",
    role: "Clinical Nutrition & Counselling",
    src: "/images/specialists/priyanka-savina-cutout.webp",
    tone: "taupe",
  },
  {
    slug: "dr-jasmine-flora",
    name: "Dr. Jasmine Flora",
    role: "Pelvic Floor Physiotherapy",
    src: "/images/specialists/dr-jasmine-flora-cutout.webp",
    tone: "garnet",
  },
];

function PortraitTile({
  member,
  index,
  still,
}: {
  member: FeaturedMember;
  index: number;
  still: boolean;
}) {
  return (
    <motion.div
      initial={still ? false : { opacity: 0, y: 20, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={
        still
          ? { duration: 0 }
          : { duration: 0.5, delay: index * 0.08, ease: TILE_EASE }
      }
    >
      <Link
        href={`/doctors/${member.slug}`}
        className={`${styles.tile} ${styles[`tone_${member.tone}`]}`}
        aria-label={`${member.name} — ${member.role}`}
      >
        <Image
          src={member.src}
          alt={`${member.name}, ${member.role} at MyStree`}
          width={340}
          height={340}
          loading="eager"
          decoding="async"
          sizes="(max-width: 639px) 30vw, 170px"
          quality={88}
          className={styles.portrait}
        />
        <span className={styles.tileCaption} aria-hidden="true">
          <span className={styles.tileName}>{member.name}</span>
        </span>
      </Link>
    </motion.div>
  );
}

export function HomeTeam() {
  const still = useStillAfterMount();

  return (
    <section className={styles.section} id="doctors" aria-labelledby="team-heading">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h2 id="team-heading" className={styles.heading}>
            Meet our Care Team
          </h2>
          <p className={styles.lead}>
            MyStree&apos;s clinicians deeply understand women&apos;s health across gynaecology,
            obstetrics, nutrition, and pelvic care — with the experience and time to support
            complex concerns.
          </p>
          <div className={styles.actions}>
            <Link href="/doctors" className={styles.cta}>
              Meet our Care Team
            </Link>
          </div>
        </div>

        <div className={styles.mosaic} aria-label="Featured MyStree clinicians">
          <div className={styles.rowTop}>
            {TOP_ROW.map((member, index) => (
              <PortraitTile key={member.slug} member={member} index={index} still={still} />
            ))}
          </div>
          <div className={styles.rowBottom}>
            {BOTTOM_ROW.map((member, index) => (
              <PortraitTile
                key={member.slug}
                member={member}
                index={index + TOP_ROW.length}
                still={still}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
