"use client";

import Image from "next/image";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import styles from "./about-story.module.css";

/* Shared entrance: short, once, transform + opacity only. */
const rise = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const viewport = { once: true, amount: 0.3 } as const;

/* ------------------------------------------------------------------ *
 * Section 02 — Why MyStree exists
 *
 * The hero already carries the emotional thesis, so this section adds
 * specifics instead of restating it: what actually goes wrong, concretely.
 * ------------------------------------------------------------------ */

const frictions = [
  {
    title: "The appointment ends before the question does",
    body: "A symptom raised in the last minute rarely gets investigated. Time is the clinical resource most often missing.",
  },
  {
    title: "Care is split across visits that never meet",
    body: "Gynaecology, nutrition, physiotherapy and mental health handled separately leaves the patient carrying the context between them.",
  },
  {
    title: "Findings arrive without an explanation",
    body: "A scan report or hormone panel is only useful once someone has said what it means for you, and what happens next.",
  },
];

export function AboutBelief() {
  const reducedMotion = Boolean(useReducedMotion());

  return (
    <section className={styles.belief} aria-labelledby="about-belief-heading">
      <div className={styles.beliefFigure}>
        <Image
          src="/images/about/mystree-clinical-consultation-bengaluru.webp"
          alt="A clinician listening as a patient describes her symptoms during a women's health consultation"
          fill
          sizes="(max-width: 900px) 100vw, 48vw"
          quality={88}
          className={styles.beliefImage}
          loading="lazy"
        />
      </div>

      <motion.div
        className={styles.beliefCopy}
        variants={reducedMotion ? undefined : rise}
        initial={reducedMotion ? false : "hidden"}
        whileInView={reducedMotion ? undefined : "visible"}
        viewport={viewport}
      >
        <p className={styles.sectionLabel}>Why MyStree exists</p>
        <h2 id="about-belief-heading" className={styles.beliefHeading}>
          Three things that go wrong in ordinary care.
        </h2>

        <dl className={styles.frictionList}>
          {frictions.map((item) => (
            <div className={styles.friction} key={item.title}>
              <dt>{item.title}</dt>
              <dd>{item.body}</dd>
            </div>
          ))}
        </dl>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Section 03 — Our philosophy
 *
 * Statements scroll on the left; a sticky stage on the right changes with the
 * active statement using a clip-path reveal rather than a hard cut.
 * ------------------------------------------------------------------ */

/**
 * Image stage sources — the commissioned photography for this section,
 * produced by `scripts/generate-about-images.mjs` (ids p1-listen … p4-follow).
 *
 * These are illustrative editorial scenes. They depict no MyStree clinician and
 * no MyStree room, and their alt text describes only what is in the frame.
 */
const philosophy = [
  {
    id: "listen",
    title: "Listen deeply",
    body: "The history is the diagnosis more often than any test. Consultations are long enough to take one properly.",
    image: "/images/about/mystree-listen-deeply-womens-health-consultation.webp",
  },
  {
    id: "explain",
    title: "Explain clearly",
    body: "You should leave knowing what was found, what it means, and why one option is recommended over another.",
    image: "/images/about/mystree-explain-clearly-clinical-consultation.webp",
  },
  {
    id: "treat",
    title: "Treat thoughtfully",
    body: "Evidence first, and intervention only where it earns its place. Watchful management is a real plan.",
    image: "/images/about/mystree-thoughtful-womens-health-care.webp",
  },
  {
    id: "follow",
    title: "Follow through",
    body: "What happened last visit is known at the next one, across every specialty involved.",
    image: "/images/about/mystree-continuity-of-care-bengaluru.webp",
  },
];

function PhilosophyEntry({
  item,
  index,
  onEnter,
  reducedMotion,
}: {
  item: (typeof philosophy)[number];
  index: number;
  onEnter: (index: number) => void;
  reducedMotion: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // A tight central band: the statement has to be genuinely centred before it
  // takes the stage, so the photograph changes once per statement rather than
  // twice on the way past.
  const inView = useInView(ref, { margin: "-48% 0px -48% 0px" });

  useEffect(() => {
    if (inView) onEnter(index);
  }, [inView, index, onEnter]);

  return (
    <motion.div
      ref={ref}
      className={styles.philosophyEntry}
      data-active={inView ? "true" : "false"}
      variants={reducedMotion ? undefined : rise}
      initial={reducedMotion ? false : "hidden"}
      whileInView={reducedMotion ? undefined : "visible"}
      viewport={viewport}
    >
      <span className={styles.philosophyIndex} aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className={styles.philosophyTitle}>{item.title}</h3>
      <p className={styles.philosophyBody}>{item.body}</p>

      {/* Mobile companion: the sticky stage is desktop-only, so each statement
          carries its own image in normal flow instead. */}
      <div className={styles.philosophyInlineFigure}>
        <Image
          src={item.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 1px, 92vw"
          quality={88}
          className={styles.philosophyInlineImage}
          loading="lazy"
        />
      </div>
    </motion.div>
  );
}

export function AboutPhilosophy() {
  const reducedMotion = Boolean(useReducedMotion());
  const [active, setActive] = useState(0);
  const handleEnter = useCallback((index: number) => setActive(index), []);

  return (
    <section
      className={styles.philosophy}
      aria-labelledby="about-philosophy-heading"
    >
      <div className={styles.philosophyInner}>
        <div className={styles.philosophyText}>
          <p className={styles.sectionLabel}>Our philosophy</p>
          <h2 id="about-philosophy-heading" className={styles.philosophyHeading}>
            Four commitments we hold ourselves to.
          </h2>

          <div className={styles.philosophyList}>
            {philosophy.map((item, index) => (
              <PhilosophyEntry
                key={item.id}
                item={item}
                index={index}
                onEnter={handleEnter}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>
        </div>

        {/* Decorative stage: every statement above is complete without it. */}
        <div className={styles.philosophyMedia} aria-hidden="true">
          <div className={styles.philosophyMediaFrame}>
            {philosophy.map((item, index) => (
              <Image
                key={item.id}
                src={item.image}
                alt=""
                fill
                sizes="(max-width: 1024px) 1px, 42vw"
                quality={88}
                className={styles.philosophyImage}
                data-visible={index === active ? "true" : "false"}
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Section 04 — The MyStree point of view
 *
 * Typography-driven navy interlude. No cards and no floating boxes: a sticky
 * chapter rail on the left, two large statements on the right that take focus
 * in turn as the section passes through.
 * ------------------------------------------------------------------ */

const viewpoints = [
  {
    id: "vision",
    chapter: "Vision",
    statement:
      "Care works better when the person receiving it understands the decisions being made.",
    support: "Not explained afterwards — shared while the decision is still open.",
  },
  {
    id: "mission",
    chapter: "Mission",
    statement:
      "Bring the right clinical perspectives together, without making you start over every time.",
    support: "In clinic in Indiranagar, and online where that suits you better.",
  },
];

function ViewpointBlock({
  item,
  index,
  onEnter,
}: {
  item: (typeof viewpoints)[number];
  index: number;
  onEnter: (index: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-40% 0px -40% 0px" });

  useEffect(() => {
    if (inView) onEnter(index);
  }, [inView, index, onEnter]);

  return (
    <div
      className={styles.viewpoint}
      ref={ref}
      data-active={inView ? "true" : "false"}
    >
      <p className={styles.viewpointChapterInline}>
        <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{" "}
        {item.chapter}
      </p>
      <p className={styles.viewpointStatement}>{item.statement}</p>
      <p className={styles.viewpointSupport}>{item.support}</p>
    </div>
  );
}

export function AboutViewpoint() {
  const reducedMotion = Boolean(useReducedMotion());
  const [active, setActive] = useState(0);
  const handleEnter = useCallback((index: number) => setActive(index), []);

  return (
    <section
      className={styles.viewpointSection}
      data-nav-theme="dark"
      aria-labelledby="about-viewpoint-heading"
    >
      <h2 id="about-viewpoint-heading" className={styles.visuallyHidden}>
        The MyStree point of view
      </h2>

      <div className={styles.viewpointInner}>
        {/* Sticky chapter rail — a progress indicator, not content. Each
            statement repeats its own chapter label inline for narrow screens
            and assistive technology. */}
        <div className={styles.viewpointRail} aria-hidden="true">
          <p className={styles.viewpointRailLabel}>The MyStree point of view</p>
          <ol className={styles.viewpointChapters}>
            {viewpoints.map((item, index) => (
              <li
                key={item.id}
                className={styles.viewpointChapter}
                data-active={index === active ? "true" : "false"}
              >
                <span className={styles.viewpointChapterNumber}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{item.chapter}</span>
              </li>
            ))}
          </ol>
        </div>

        <motion.div
          className={styles.viewpointStack}
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.66, ease: "easeOut" }}
        >
          {viewpoints.map((item, index) => (
            <ViewpointBlock
              key={item.id}
              item={item}
              index={index}
              onEnter={handleEnter}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Section 06 — One continuous care story
 *
 * Replaces the six-value grid. A single line draws across three moments as
 * the section enters — horizontal on desktop, vertical on mobile.
 * ------------------------------------------------------------------ */

/**
 * Detail photography for the three moments.
 *
 * Deliberately object- and hand-level rather than more portraits: these read as
 * observed fragments of a consultation, not as a claim about a specific room.
 * Alt text describes the frame only — none of these is MyStree's premises.
 */
const continuity = [
  {
    title: "You arrive with a question",
    body: "Start with what has been happening — not only the symptom that prompted the appointment.",
    image: "/images/about/mystree-patient-notebook-consultation.webp",
    alt: "A woman setting down a notebook and phone beside a chair before a consultation",
  },
  {
    title: "The right context is built",
    body: "Relevant history, investigations and specialist perspectives stay connected to each other.",
    image: "/images/about/mystree-clinician-reviewing-notes.webp",
    alt: "A clinician writing in a set of handwritten consultation notes",
  },
  {
    title: "The next step is clear",
    body: "Leave knowing what was found, what remains uncertain, and what happens next.",
    image: "/images/about/mystree-consultation-space-indiranagar.webp",
    alt: "Two chairs turned toward each other beside a window in a quiet consultation room",
  },
];

export function AboutContinuity() {
  const reducedMotion = Boolean(useReducedMotion());
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "center 58%"],
  });
  // One transform drives the whole line — no per-stage trigger.
  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      className={styles.continuity}
      ref={sectionRef}
      aria-labelledby="about-continuity-heading"
    >
      <div className={styles.continuityInner}>
        <p className={styles.sectionLabel}>How care holds together</p>
        <h2 id="about-continuity-heading" className={styles.continuityHeading}>
          One continuous care story.
        </h2>

        <div className={styles.continuityTrack}>
          <div className={styles.continuityLine} aria-hidden="true">
            {/* Desktop draws the line with scroll progress. On mobile the line
                is vertical and simply present — no draw, per the simpler
                mobile motion budget. */}
            <motion.span
              className={styles.continuityLineFill}
              style={reducedMotion ? { scaleX: 1 } : { scaleX: lineProgress }}
            />
          </div>

          <ol className={styles.continuitySteps}>
            {continuity.map((step, index) => (
              <motion.li
                className={styles.continuityStep}
                key={step.title}
                initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{
                  duration: 0.55,
                  delay: reducedMotion ? 0 : index * 0.14,
                  ease: "easeOut",
                }}
              >
                <span className={styles.continuityNumber} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className={styles.continuityStepTitle}>{step.title}</h3>
                <p className={styles.continuityStepBody}>{step.body}</p>
                <div className={styles.continuityFigure}>
                  <Image
                    src={step.image}
                    alt={step.alt}
                    fill
                    sizes="(max-width: 900px) 92vw, 28vw"
                    quality={88}
                    className={styles.continuityImage}
                    loading="lazy"
                  />
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
