"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  useCallback,
  useDeferredValue,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

import { clinic, clinicArea } from "@/lib/clinic";
import { faqs } from "@/lib/faq";
import { specialtiesOf, type Doctor, type Specialty } from "@/lib/doctors";
import styles from "./team-sections.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;
const viewport = { once: true, amount: 0.3 } as const;

function slug(name: string) {
  return name.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase();
}

/* ================================================================== *
 * 01 — Clinician-led hero
 * ================================================================== */

export function TeamHero() {
  const reducedMotion = Boolean(useReducedMotion());
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Restrained: a 3.5% settle on the photograph and a short lift on the copy.
  // The clinician stays the anchor; this is not a parallax effect.
  const imageScale = useTransform(scrollYProgress, [0, 0.35], [1, 1.035]);
  const copyY = useTransform(scrollYProgress, [0, 0.35], [0, -20]);
  const copyOpacity = useTransform(scrollYProgress, [0.35, 0.75], [1, 0.55]);

  return (
    <section ref={ref} className={styles.hero} aria-labelledby="team-hero-heading">
      <motion.div
        className={styles.heroImageLayer}
        style={reducedMotion ? undefined : { scale: imageScale }}
      >
        {/*
          Authentic photograph of Dr. Smitha A.P supplied with the project — the
          same clinician as /public/drsmitha.webp. A real portrait, not a
          generated likeness, and it must never be replaced by one.
          Source 1916x821, converted from the supplied PNG to WebP (1.67MB -> 97KB).
        */}
        <Image
          src="/images/team/mystree-dr-smitha-consultation-room.webp"
          alt="Dr. Smitha A.P, Founder and High Risk Obstetrician, seated in a MyStree consultation room"
          fill
          priority
          fetchPriority="high"
          quality={88}
          sizes="100vw"
          className={styles.heroImage}
        />
      </motion.div>

      {/* The scrim sits only under the copy column, so the photograph itself is
          never uniformly dimmed. */}
      <div className={styles.heroScrim} aria-hidden="true" />

      <motion.div
        className={styles.heroCopy}
        style={reducedMotion ? undefined : { y: copyY, opacity: copyOpacity }}
      >
        <motion.p
          className={styles.heroEyebrow}
          initial={reducedMotion ? false : { opacity: 0, y: 10 }}
          animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          The people behind your care
        </motion.p>

        <h1 id="team-hero-heading" className={styles.heroHeading}>
          {["Meet the people", "who take the time", "to listen."].map((line, i) => (
            <span className={styles.heroLine} key={line}>
              <motion.span
                className={styles.heroLineInner}
                initial={reducedMotion ? false : { y: "105%" }}
                animate={reducedMotion ? undefined : { y: "0%" }}
                transition={{ duration: 0.82, delay: 0.08 + i * 0.09, ease: EASE }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className={styles.heroLead}
          initial={reducedMotion ? false : { opacity: 0, y: 10 }}
          animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.38, ease: EASE }}
        >
          Clinicians across obstetrics, fertility, pelvic health, nutrition and
          allied care — working to understand the whole picture before deciding
          what comes next.
        </motion.p>

        <motion.div
          className={styles.heroActions}
          initial={reducedMotion ? false : { opacity: 0, y: 10 }}
          animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.46, ease: EASE }}
        >
          <a className={styles.heroSecondary} href="#clinicians">
            Meet our clinicians <span aria-hidden="true">↓</span>
          </a>
          <Link className="cta-book" href="/book">
            Book a consultation
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ================================================================== *
 * 02 — Clinical proof ribbon
 *
 * Every entry is derived from the clinician records or from `@/lib/clinic`.
 * The specialty count is computed rather than written down, and the
 * founder-led line reflects the two records that state a founding role.
 * ================================================================== */

export function TeamRibbon({ doctors }: { doctors: readonly Doctor[] }) {
  const reducedMotion = Boolean(useReducedMotion());
  const specialtyCount = new Set(doctors.map((d) => d.specialty)).size;

  const items = [
    { label: "Founder-led", value: "Clinical team" },
    { label: clinic.locality, value: clinic.city },
    { label: `${specialtyCount} specialties`, value: "Under one team" },
    { label: "In clinic", value: "& online consultations" },
  ];

  return (
    <section className={styles.ribbon} aria-label="MyStree at a glance">
      <ul className={styles.ribbonList}>
        {items.map((item, i) => (
          <motion.li
            className={styles.ribbonItem}
            key={item.label}
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
          >
            <span className={styles.ribbonLabel}>{item.label}</span>
            <span className={styles.ribbonValue}>{item.value}</span>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

/* ================================================================== *
 * 03 — Meet the clinicians introduction
 * ================================================================== */

export function TeamIntro() {
  const reducedMotion = Boolean(useReducedMotion());
  const figureRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: figureRef,
    offset: ["start end", "end start"],
  });
  // Differential drift inside an overscanned frame — the photograph moves a
  // little slower than the page, which is what gives the column life without
  // becoming a parallax effect.
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section className={styles.intro} aria-labelledby="team-intro-heading">
      <div className={styles.introInner}>
        <div className={styles.introCopy}>
        <motion.p
          className={styles.sectionLabel}
          initial={reducedMotion ? false : { opacity: 0, y: 10 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.55, ease: EASE }}
        >
          Our clinical team
        </motion.p>

        <motion.h2
          id="team-intro-heading"
          className={styles.introHeading}
          initial={reducedMotion ? false : { opacity: 0, y: 14 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.68, delay: 0.06, ease: EASE }}
        >
          Meet the clinicians behind MyStree.
        </motion.h2>

        <motion.p
          className={styles.introLead}
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.6, delay: 0.14, ease: EASE }}
        >
          Different specialties see different parts of a health problem. At
          MyStree those perspectives sit close together, so care can begin with
          context rather than assumptions.
        </motion.p>
        </div>

        {/*
          Illustrative editorial photograph — depicts no identified MyStree
          clinician and no MyStree room, so the alt text describes only the
          frame. Reveals with a clip-path wipe, then drifts on scroll.
        */}
        <motion.div
          className={styles.introFigure}
          ref={figureRef}
          initial={
            reducedMotion ? false : { clipPath: "inset(14% 0 0 0)", opacity: 0 }
          }
          whileInView={
            reducedMotion
              ? undefined
              : { clipPath: "inset(0% 0 0 0)", opacity: 1 }
          }
          viewport={viewport}
          transition={{ duration: 0.85, ease: EASE }}
        >
          <motion.div
            style={{
              position: "absolute",
              // Overscan so the drift never exposes an edge.
              inset: "-8% 0",
              ...(reducedMotion ? {} : { y: imageY }),
            }}
          >
            <Image
              src="/images/about/mystree-listen-deeply-womens-health-consultation.webp"
              alt="A clinician listening as a patient describes her symptoms during a women's health consultation"
              fill
              quality={88}
              sizes="(max-width: 900px) 92vw, 44vw"
              className={styles.introImage}
              loading="lazy"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================== *
 * 04 — Searchable clinician directory
 * ================================================================== */

function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <motion.article
      className={styles.card}
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      id={slug(doctor.name)}
    >
      <Link
        href={`/doctors/${doctor.slug}`}
        className={styles.cardPortraitLink}
        aria-label={`View clinical story and profile of ${doctor.name}`}
      >
        <div className={styles.cardPortrait}>
          <Image
            src={doctor.image}
            alt={`${doctor.name}, ${doctor.title} at MyStree`}
            fill
            quality={88}
            sizes="(max-width: 700px) 90vw, (max-width: 1100px) 44vw, 30vw"
            className={styles.cardImage}
            loading="lazy"
          />
        </div>
      </Link>

      <div className={styles.cardBody}>
        <p className={styles.cardSpecialty}>{doctor.specialty}</p>
        <h3 className={styles.cardName}>
          <Link href={`/doctors/${doctor.slug}`} className={styles.cardNameLink}>
            {doctor.name}
          </Link>
        </h3>
        <p className={styles.cardRole}>{doctor.title}</p>
        <p className={styles.cardCredentials}>{doctor.credentials.join(" · ")}</p>

        <div className={styles.cardActions}>
          <Link
            className={`${styles.cardBook} cta-book is-small`}
            href={doctor.bookingUrl ?? "/book"}
            {...(doctor.bookingUrl?.startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {doctor.actionLabel ?? "Book consultation"}
          </Link>
          <Link
            className={styles.cardStoryLink}
            href={`/doctors/${doctor.slug}`}
          >
            Story & profile →
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export function TeamDirectory({ doctors }: { doctors: readonly Doctor[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Specialty | "All">("All");
  const searchId = useId();
  // Derived from the roster actually rendered, so a backend edit that removes
  // the last clinician in a specialty also removes its filter chip.
  const specialties = useMemo(() => specialtiesOf(doctors), [doctors]);
  // Defers only the expensive re-filter, so typing itself never stutters.
  const deferredQuery = useDeferredValue(query);

  const visible = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    return doctors.filter((d) => {
      const matchesFilter = filter === "All" || d.specialty === filter;
      if (!matchesFilter) return false;
      if (!q) return true;
      return [d.name, d.specialty, d.title, d.category]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [deferredQuery, doctors, filter]);

  const reset = useCallback(() => {
    setQuery("");
    setFilter("All");
  }, []);

  return (
    <section
      className={styles.directory}
      id="clinicians"
      aria-labelledby="team-directory-heading"
    >
      <div className={styles.directoryHead}>
        <h2 id="team-directory-heading" className={styles.directoryHeading}>
          Looking for someone specific?
        </h2>

        <div className={styles.searchField}>
          <label className={styles.searchLabel} htmlFor={searchId}>
            Search clinicians
          </label>
          <input
            id={searchId}
            className={styles.searchInput}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search doctors by name or specialty"
            autoComplete="off"
          />
        </div>
      </div>

      <div className={styles.filterRow} role="group" aria-label="Filter by specialty">
        {(["All", ...specialties] as const).map((option) => (
          <button
            key={option}
            type="button"
            className={styles.filterButton}
            data-active={filter === option ? "true" : "false"}
            aria-pressed={filter === option}
            onClick={() => setFilter(option)}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Announced, so a screen-reader user learns the outcome of a search that
          otherwise only changes the visual grid. */}
      <p className={styles.resultCount} role="status" aria-live="polite">
        {visible.length} {visible.length === 1 ? "clinician" : "clinicians"}
      </p>

      {visible.length > 0 ? (
        <motion.div className={styles.grid} layout>
          {/*
            Rendered directly rather than through AnimatePresence: with
            `popLayout` the filtered-out cards stayed mounted and visible, so
            the grid never actually narrowed. Unmounting immediately and
            letting `layout` carry the reflow is both correct and smoother.
          */}
          {visible.map((doctor) => (
            <DoctorCard key={doctor.slug} doctor={doctor} />
          ))}
        </motion.div>
      ) : (
        <div className={styles.empty}>
          <p className={styles.emptyText}>No clinician matches that search yet.</p>
          <button type="button" className={styles.emptyAction} onClick={reset}>
            View all clinicians
          </button>
        </div>
      )}
    </section>
  );
}

/* ================================================================== *
 * 05 — Three-chapter scroll story
 *
 * Desktop: a 300vh track with a 100svh sticky stage. Each chapter's panel
 * rises from the bottom and covers the one before it, like stacked sheets.
 * Below 900px the mechanism is dropped for plain vertical chapters.
 * ================================================================== */

/*
 * STORY PHOTOGRAPHY
 *
 * Three 4:5 portraits (1024x1280, WebP, sRGB) inside public/images/team/.
 * Depicting illustrative clinic scenes for the three-chapter scroll story.
 */
const chapters = [
  {
    number: "01",
    label: "Unhurried time",
    title: "Time changes the conversation.",
    body: "Appointments should leave enough room to understand what brought you in, what has already been tried, and what needs to happen next.",
    image: "/images/team/mystree-consultation-time.webp",
    alt: "A clinician listening as a patient describes her symptoms across a consultation table",
  },
  {
    number: "02",
    label: "More than one view",
    title: "One concern rarely exists in isolation.",
    body: "Women's health can cross reproductive, metabolic, pelvic and lifestyle concerns. The right next step may involve more than one clinical perspective.",
    image: "/images/team/mystree-clinical-collaboration.webp",
    alt: "Two clinicians reviewing case notes together at a consultation desk",
  },
  {
    number: "03",
    label: "Clarity first",
    title: "Clarity before complexity.",
    body: "You should understand what was found, what remains uncertain, and why a particular next step is being recommended.",
    image: "/images/team/mystree-shared-decision.webp",
    alt: "A doctor and patient seated side by side reading a report together",
  },
];

export function TeamStory() {
  const reducedMotion = Boolean(useReducedMotion());
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  /*
   * One scroll subscription drives the whole section — no per-chapter observer.
   * The track is one viewport taller than the number of chapters, so progress
   * divides cleanly into equal thirds. The returned unsubscribe is the cleanup.
   */
  useEffect(() => {
    if (reducedMotion) return;
    return scrollYProgress.on("change", (v) => {
      const next = v < 0.34 ? 0 : v < 0.67 ? 1 : 2;
      setActive((prev) => (prev === next ? prev : next));
    });
  }, [scrollYProgress, reducedMotion]);

  return (
    <section className={styles.story} aria-labelledby="team-story-heading">
      <h2 id="team-story-heading" className={styles.visuallyHidden}>
        How the MyStree team approaches care
      </h2>

      {/* ---- Desktop: pinned stage, panels rise over one another ---- */}
      <div className={styles.storyTrack} ref={trackRef}>
        <div className={styles.storySticky}>
          <div className={styles.storyInner}>
            <div className={styles.storyText}>
              {chapters.map((chapter, i) => (
                <div
                  className={styles.storyChapter}
                  key={chapter.number}
                  data-active={i === active ? "true" : "false"}
                >
                  <p className={styles.storyNumber}>{chapter.number}</p>
                  <p className={styles.storyTitle}>{chapter.title}</p>
                  <p className={styles.storyBody}>{chapter.body}</p>
                </div>
              ))}
            </div>

            <div className={styles.storyStage}>
              {chapters.map((chapter, i) => (
                <div
                  className={styles.storyPanel}
                  key={chapter.number}
                  /*
                   * The stack is the whole effect: every panel below the active
                   * one has already travelled to 0, every panel above it waits
                   * one full frame-height down. Advancing a chapter therefore
                   * slides the NEXT image up over the current one rather than
                   * cross-fading the section.
                   */
                  style={{
                    zIndex: i + 1,
                    transform:
                      reducedMotion || i <= active
                        ? "translateY(0%)"
                        : "translateY(100%)",
                  }}
                  aria-hidden={i !== active}
                >
                  <Image
                    src={chapter.image}
                    alt={chapter.alt}
                    fill
                    quality={88}
                    sizes="(max-width: 900px) 92vw, 30rem"
                    className={styles.storyImage}
                    priority={i === 0}
                  />
                </div>
              ))}
            </div>

            <nav className={styles.storyNav} aria-label="Story chapters">
              <ol className={styles.storyNavList}>
                {chapters.map((chapter, i) => (
                  <li
                    className={styles.storyNavItem}
                    key={chapter.number}
                    data-active={i === active ? "true" : "false"}
                    aria-current={i === active ? "true" : undefined}
                  >
                    <span className={styles.storyNavMark} aria-hidden="true">
                      {i + 1}
                    </span>
                    {chapter.label}
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </div>
      </div>

      {/* ---- Mobile / reduced motion: plain vertical chapters ---- */}
      <div className={styles.storyMobile}>
        {chapters.map((chapter) => (
          <motion.article
            className={styles.storyMobileChapter}
            key={chapter.number}
            initial={reducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <p className={styles.storyNumber}>{chapter.number}</p>
            <h3 className={styles.storyTitle}>{chapter.title}</h3>
            <p className={styles.storyBody}>{chapter.body}</p>
            <figure className={styles.storyMobileFigure}>
              <Image
                src={chapter.image}
                alt={chapter.alt}
                fill
                quality={88}
                sizes="92vw"
                className={styles.storyImage}
                loading="lazy"
              />
            </figure>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

/* ================================================================== *
 * 06 — FAQ
 * ================================================================== */

function FaqRow({
  item,
  open,
  onToggle,
}: {
  item: (typeof faqs)[number];
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = useId();
  const buttonId = useId();

  return (
    <div className={styles.faqRow}>
      <h3 className={styles.faqHeading}>
        <button
          type="button"
          id={buttonId}
          className={styles.faqTrigger}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span>{item.question}</span>
          <span className={styles.faqChevron} data-open={open} aria-hidden="true">
            ⌄
          </span>
        </button>
      </h3>

      <motion.div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={styles.faqPanel}
        initial={false}
        animate={{ height: open ? "auto" : 0 }}
        transition={{ duration: 0.3, ease: EASE }}
        style={{ overflow: "hidden" }}
      >
        <div className={styles.faqAnswer}>
          <p>{item.answer}</p>
        </div>
      </motion.div>
    </div>
  );
}

export function TeamFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className={styles.faq} aria-labelledby="team-faq-heading">
      <div className={styles.faqInner}>
        <div className={styles.faqAside}>
          <p className={styles.sectionLabel}>Questions we hear often</p>
          <h2 id="team-faq-heading" className={styles.faqTitle}>
            Before your first visit.
          </h2>
          <p className={styles.faqNote}>
            General guidance, not medical advice. If something is worrying you,
            it is reasonable to have it looked at.
          </p>
        </div>

        <div className={styles.faqList}>
          {faqs.map((item, i) => (
            <FaqRow
              key={item.question}
              item={item}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== *
 * 07 — Booking close
 * ================================================================== */

export function TeamBooking() {
  const reducedMotion = Boolean(useReducedMotion());

  return (
    <section
      className={styles.booking}
      data-nav-theme="dark"
      aria-labelledby="team-booking-heading"
    >
      <motion.div
        className={styles.bookingInner}
        initial={reducedMotion ? false : { opacity: 0, y: 16 }}
        whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.62, ease: EASE }}
      >
        <p className={styles.bookingEyebrow}>Ready when you are</p>
        <h2 id="team-booking-heading" className={styles.bookingHeading}>
          Start with what you&apos;re experiencing.
        </h2>
        <p className={styles.bookingBody}>
          Choose a clinician directly, or explore the service that best matches
          your concern. Consultations run in clinic in {clinicArea} and online.
        </p>
        <div className={styles.bookingActions}>
          <Link className={`${styles.bookingPrimary} cta-book is-large is-pulse`} href="/book">
            Book a consultation
          </Link>
          <Link className={styles.bookingSecondary} href="/#services">
            Explore services
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
