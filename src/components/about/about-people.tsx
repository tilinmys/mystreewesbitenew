"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import { type Doctor } from "@/lib/doctors";
import styles from "./about-people.module.css";

/**
 * Section 05 — the people behind the care.
 *
 * Desktop pairs a sticky biography rail with a scrolling portrait rail; mobile
 * renders the same records as plain stacked profiles. Every field shown comes
 * from `@/lib/doctors` — nothing here is generated or inferred.
 */

function PortraitBlock({
  doctor,
  index,
  onEnter,
}: {
  doctor: Doctor;
  index: number;
  onEnter: (index: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-40% 0px -40% 0px" });

  useEffect(() => {
    if (inView) onEnter(index);
  }, [inView, index, onEnter]);

  return (
    <div className={styles.portraitBlock} ref={ref}>
      <div className={styles.portraitFrame}>
        <Image
          src={doctor.image}
          alt={`${doctor.name}, ${doctor.title} at MyStree`}
          fill
          sizes="(max-width: 1024px) 92vw, 36vw"
          quality={88}
          className={styles.portrait}
          loading="lazy"
        />
      </div>

      {/* Mobile profile: the sticky rail is desktop-only, so the record is
          repeated in normal flow rather than hidden behind scroll position. */}
      <div className={styles.mobileProfile}>
        <p className={styles.category}>{doctor.category}</p>
        <h3 className={styles.name}>{doctor.name}</h3>
        <p className={styles.title}>{doctor.title}</p>
        <p className={styles.bio}>{doctor.bio}</p>
        <CredentialList doctor={doctor} />
      </div>
    </div>
  );
}

function CredentialList({ doctor }: { doctor: Doctor }) {
  return (
    <dl className={styles.facts}>
      <div>
        <dt>Qualifications</dt>
        <dd>{doctor.credentials.join(" · ")}</dd>
      </div>
      {doctor.experience ? (
        <div>
          <dt>Experience</dt>
          <dd>{doctor.experience.join(" · ")}</dd>
        </div>
      ) : null}
      {doctor.languages ? (
        <div>
          <dt>Speaks</dt>
          <dd>{doctor.languages.join(", ")}</dd>
        </div>
      ) : null}
    </dl>
  );
}

export function AboutPeople({ doctors }: { doctors: readonly Doctor[] }) {
  const reducedMotion = Boolean(useReducedMotion());
  const [active, setActive] = useState(0);
  const handleEnter = useCallback((index: number) => setActive(index), []);
  const current = doctors[active] ?? doctors[0];

  return (
    <section className={styles.people} aria-labelledby="about-people-heading">
      <div className={styles.head}>
        <p className={styles.sectionLabel}>The people behind the care</p>
        <h2 id="about-people-heading" className={styles.heading}>
          Clinicians who have the time to look properly.
        </h2>
      </div>

      <div className={styles.rails}>
        {/* Desktop biography rail. aria-live is deliberately omitted: the same
            content is present in each mobile profile, and announcing it on
            scroll would be noise for screen-reader users. */}
        <div className={styles.bioRail} aria-hidden="true">
          <motion.div
            key={current.name}
            className={styles.bioCard}
            initial={reducedMotion ? false : { opacity: 0, y: 14 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <p className={styles.category}>{current.category}</p>
            <p className={styles.name}>{current.name}</p>
            <p className={styles.title}>{current.title}</p>
            <p className={styles.bio}>{current.bio}</p>
            {current.background ? (
              <p className={styles.background}>{current.background}</p>
            ) : null}
            <CredentialList doctor={current} />
          </motion.div>
        </div>

        <div className={styles.portraitRail}>
          {doctors.map((doctor, index) => (
            <PortraitBlock
              key={doctor.name}
              doctor={doctor}
              index={index}
              onEnter={handleEnter}
            />
          ))}
        </div>
      </div>

      <p className={styles.railFooter}>
        <Link className={styles.railLink} href="/doctors">
          Meet the full MyStree care team
        </Link>
      </p>
    </section>
  );
}

export default AboutPeople;
