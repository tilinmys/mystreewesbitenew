"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Plus,
  Phone,
  MapPin,
  CheckCircle2,
  Star,
} from "lucide-react";
import { useRef, useState, type ReactNode } from "react";
import { clinic, clinicArea } from "@/lib/clinic";
import type { Doctor } from "@/lib/doctors";
import {
  approachPrinciples,
  journeyStages,
  medicalReview,
  prenatalDoctorMeta,
  prenatalFaqs,
  prenatalReviews,
  trimesterPillars,
  verifiedFacts,
  type QAItem,
} from "@/lib/prenatal";
import styles from "./prenatal-experience.module.css";

const bookingUrl = "https://my-stree.com/booking";
const photos = "/images/pregnancy/";
const faqPhoto = `${photos}mystree-consultation-room-indiranagar.webp`;
const EASE = [0.22, 1, 0.36, 1] as const;

function ScrollReveal({
  children,
  className,
  delay = 0,
  yOffset = 22,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={reduce ? undefined : { opacity: [0.72, 1], y: [yOffset, 0] }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.72, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function ScrollAtmosphere({
  tone = "rose",
}: {
  tone?: "rose" | "sage" | "pearl";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-14%", "16%"]);
  const x = useTransform(scrollYProgress, [0, 1], ["-4%", "6%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-6, 8]);
  return (
    <div
      ref={ref}
      className={`${styles.atmosphere} ${styles[`atmosphere${tone[0].toUpperCase()}${tone.slice(1)}`]}`}
      data-scroll-atmosphere={tone}
      aria-hidden="true"
    >
      <motion.span className={styles.auraOne} style={{ y, rotate }} />
      <motion.span className={styles.auraTwo} style={{ x }} />
    </div>
  );
}

function ParallaxImage({
  src,
  alt,
  sizes,
  className,
  preload = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  preload?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1.015, 1.06]);
  return (
    <motion.div
      ref={ref}
      className={styles.parallaxMedia}
      data-parallax-media
      style={{ y, scale }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        preload={preload}
        sizes={sizes}
        quality={88}
        className={className}
      />
    </motion.div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className={styles.eyebrow}>{children}</p>;
}

/* ===================================================================== *
 * 01 — Prenatal Hero (Verified MyStree Content)
 * ===================================================================== */

export function PrenatalHero() {
  return (
    <section className={styles.hero} aria-labelledby="prenatal-heading">
      <ScrollAtmosphere tone="rose" />
      <div className={styles.heroInner}>
        <ScrollReveal className={styles.heroCopy}>
          <div className={styles.heroBadgeRow}>
            <span className={styles.locationChip}>Indiranagar, Bengaluru</span>
            <span className={styles.appointmentBadge}>Same-Day Consultations Available</span>
          </div>

          <p className={styles.heroKicker}>Where Life Begins</p>

          <h1 id="prenatal-heading">
            Pregnancy care
            <br />
            <em>in Indiranagar</em>
          </h1>

          <p className={styles.heroLead}>
            Pregnancy care from the first scan to delivery planning.
          </p>
          <p className={styles.heroBody}>
            From the first heartbeat to the first breath, we&apos;re here in Indiranagar — every step of the way.
          </p>

          <div className={styles.heroActions}>
            <a className="cta-book" href={bookingUrl}>
              Begin Your Journey <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a className={styles.lightLink} href={`tel:${clinic.telephone}`}>
              <Phone size={15} aria-hidden="true" /> Speak to Us ({clinic.telephoneDisplay})
            </a>
          </div>

          <div className={styles.heroLocation}>
            <MapPin size={14} aria-hidden="true" /> {clinicArea}
          </div>
        </ScrollReveal>

        <div className={styles.heroFigure}>
          <ParallaxImage
            src={`${photos}pregnancy-care-indiranagar-bengaluru.webp`}
            alt="Adult South Indian pregnant woman sitting thoughtfully beside a sunlit window"
            preload
            sizes="(max-width: 760px) 100vw, 50vw"
            className={styles.heroImage}
          />
          <div className={styles.photoNote}>
            <span>
              For your baby. <strong>And just as much, for you.</strong>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================================================================== *
 * 02 — Trimesters & Care Offerings (Section 01)
 * ===================================================================== */

function AnswerList({
  items,
  idPrefix,
}: {
  items: readonly QAItem[];
  idPrefix: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={styles.answerList}
      initial={false}
      whileInView={reduce ? undefined : { opacity: [0.72, 1], y: [24, 0] }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {items.map((item, i) => (
        <details
          className={styles.answer}
          key={item.question}
          name={idPrefix}
          open={i === 0}
        >
          <summary>
            <span>{item.question}</span>
            <Plus size={21} className={styles.answerIcon} aria-hidden="true" />
          </summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </motion.div>
  );
}

const careOfferings: readonly QAItem[] = [
  {
    question: "Prenatal care, thoughtfully connected",
    answer:
      "Your history, your questions, and your wellbeing shape each visit. Discuss pregnancy assessments, growth monitoring, and a tailored follow-up plan with your obstetric specialist. When a pregnancy needs closer attention, high-risk expertise is embedded directly into your care.",
  },
  {
    question: "Preparation for pregnancy and birth",
    answer:
      "Make space for the questions that matter to you: what to expect, how to prepare, and what your preferences are. Your consultation helps you understand every upcoming milestone and formulate a safe, personalized birth plan.",
  },
  {
    question: "A clear plan for your next chapter",
    answer:
      "Talk through your delivery preferences, hospital arrangements, and emergency transport routes. Dr. Smitha A.P and our team maintain close delivery partnerships across premier maternity hospitals in Indiranagar.",
  },
  {
    question: "Support beyond the birth",
    answer:
      "Care for you continues after your baby arrives. Our team offers pelvic-health physiotherapy, IBCLC-certified lactation counseling, and postpartum nutrition support to nurture full physical recovery.",
  },
];

export function PrenatalQuestions() {
  return (
    <section className={styles.questions} aria-labelledby="prenatal-care">
      <ScrollAtmosphere tone="pearl" />
      <div className={styles.container}>
        <ScrollReveal className={styles.trimesterSectionHead}>
          <Eyebrow>COMPREHENSIVE OBSTETRIC CARE</Eyebrow>
          <h2 id="prenatal-care">
            More than appointments.
            <br />
            <em>A circle of support.</em>
          </h2>
          <p className={styles.lead}>
            Comprehensive clinical care, advanced diagnostics, and compassionate guidance tailored to each trimester.
          </p>
        </ScrollReveal>

        {/* Dignified Editorial Trimester Ledger (No Squircle Icons) */}
        <div className={styles.trimesterGrid}>
          {trimesterPillars.map((pillar, i) => (
            <ScrollReveal key={pillar.title} delay={i * 0.08} className={styles.trimesterCard}>
              <span className={styles.trimesterStage}>{pillar.stage}</span>
              <h3 className={styles.trimesterTitle}>{pillar.title}</h3>
              <p className={styles.trimesterScope}>{pillar.scope}</p>
            </ScrollReveal>
          ))}
        </div>

        <div className={styles.splitConsultation}>
          <ScrollReveal className={styles.consultFigure}>
            <ParallaxImage
              src={`${photos}first-prenatal-consultation-bengaluru.webp`}
              alt="South Indian female clinician listening deeply to a pregnant patient during consultation"
              sizes="(max-width: 760px) 100vw, 42vw"
              className={styles.coverImage}
            />
            <p className={styles.figureCaption}>A conversation first. A care plan together.</p>
          </ScrollReveal>

          <ScrollReveal className={styles.careCopy} delay={0.12}>
            <AnswerList items={careOfferings} idPrefix="prenatal-offerings" />
            <div className={styles.sectionAction}>
              <a className="cta-book" href={bookingUrl}>
                Find your care <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ===================================================================== *
 * 03 — The Mother's Journey (Animated Sine-Wave Chart Pattern)
 * ===================================================================== */

export function PrenatalJourney() {
  const [activeStage, setActiveStage] = useState(0);
  const reduce = useReducedMotion();

  // Desktop sine-wave coordinates for 4 milestones with balanced spacing:
  const milestones = [
    { x: 175, y: 110, position: "top" as const, shift: "-50%" },
    { x: 410, y: 310, position: "bottom" as const, shift: "-50%" },
    { x: 650, y: 110, position: "top" as const, shift: "-50%" },
    { x: 880, y: 310, position: "bottom" as const, shift: "-65%" },
  ];

  // Mathematical smooth cubic bezier sinusoidal curve
  const wavePath =
    "M 30,210 C 75,210 120,110 175,110 C 230,110 250,210 292,210 C 335,210 365,310 410,310 C 455,310 485,210 530,210 C 575,210 605,110 650,110 C 695,110 725,210 765,210 C 805,210 835,310 880,310 C 925,310 945,210 985,210";

  return (
    <section
      className={styles.journey}
      id="prenatal-journey"
      aria-labelledby="journey-heading"
    >
      <ScrollAtmosphere tone="rose" />
      <div className={styles.container}>
        <ScrollReveal className={styles.sectionHead}>
          <div>
            <Eyebrow>THE 9-MONTH CLINICAL PATH</Eyebrow>
            <h2 id="journey-heading">
              The Mother&apos;s
              <br />
              <em>Journey.</em>
            </h2>
          </div>
          <p className={styles.lead}>
            A continuous, comforting rhythm of care. Follow each milestone from
            preconceptional planning through birth.
          </p>
        </ScrollReveal>

        {/* DESKTOP & TABLET SINE-WAVE INTERACTIVE VISUALIZATION */}
        <div
          className={styles.waveChartWrapper}
          aria-label="Interactive pregnancy journey chart"
        >
          <svg
            className={styles.waveSvg}
            viewBox="0 0 1000 420"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="presentation"
          >
            {/* Background guide glow line */}
            <path
              d={wavePath}
              stroke="var(--brand-cadet-gray)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeOpacity="0.3"
            />

            {/* Animated drawing sine curve */}
            <motion.path
              d={wavePath}
              stroke="var(--navy)"
              strokeWidth="3.5"
              strokeLinecap="round"
              initial={false}
              whileInView={reduce ? undefined : { pathLength: [0, 1] }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Starting Icon Node (Left) */}
            <circle cx="30" cy="210" r="16" fill="var(--navy-deep)" />
            <circle cx="30" cy="210" r="8" fill="var(--accent-cadet)" />

            {/* Intermediate decorative colored dots along the wave (as in reference) */}
            <circle
              cx="292"
              cy="210"
              r="7"
              fill="var(--accent-cadet)"
              fillOpacity="0.85"
            />
            <circle
              cx="530"
              cy="210"
              r="7"
              fill="var(--brand-cadet-gray)"
              fillOpacity="0.85"
            />
            <circle
              cx="765"
              cy="210"
              r="7"
              fill="var(--accent-cadet)"
              fillOpacity="0.85"
            />
            <circle
              cx="985"
              cy="210"
              r="7"
              fill="var(--brand-cadet-gray)"
              fillOpacity="0.85"
            />

            {/* Vertical stems connecting curve to top/bottom milestone cards */}
            {milestones.map((m, i) => {
              const isTop = m.position === "top";
              const y1 = m.y;
              const y2 = isTop ? 22 : 398;
              const isCurrent = activeStage === i;
              return (
                <g key={i}>
                  <line
                    x1={m.x}
                    y1={y1}
                    x2={m.x}
                    y2={y2}
                    stroke={
                      isCurrent
                        ? "var(--accent-cadet)"
                        : "var(--brand-cadet-gray)"
                    }
                    strokeWidth={isCurrent ? "2.5" : "1.5"}
                    strokeDasharray={isCurrent ? undefined : "3 3"}
                    strokeOpacity={isCurrent ? 1 : 0.6}
                  />
                  {/* Outer active beacon ring on active milestone */}
                  {isCurrent && (
                    <motion.circle
                      cx={m.x}
                      cy={m.y}
                      r="18"
                      stroke="var(--accent-cadet)"
                      strokeWidth="2"
                      fill="none"
                      initial={{ scale: 0.8, opacity: 0.3 }}
                      animate={{
                        scale: [1, 1.45, 1],
                        opacity: [0.85, 0.2, 0.85],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2.2,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                  {/* Milestone Node */}
                  <circle
                    cx={m.x}
                    cy={m.y}
                    r={isCurrent ? "9" : "7"}
                    fill={isCurrent ? "var(--accent-cadet)" : "var(--navy)"}
                    stroke="var(--surface-pearl)"
                    strokeWidth="2.5"
                  />
                </g>
              );
            })}
          </svg>

          {/* HTML Overlay: Interactive Milestone Cards positioned over the SVG Canvas */}
          <div className={styles.waveCardsOverlay}>
            {journeyStages.map((stage, i) => {
              const m = milestones[i];
              const isTop = m.position === "top";
              const isCurrent = activeStage === i;

              return (
                <div
                  key={stage.marker + i}
                  className={`${styles.waveMilestoneCard} ${
                    isTop ? styles.cardPositionTop : styles.cardPositionBottom
                  } ${isCurrent ? styles.cardActive : ""}`}
                  style={{
                    left: `${(m.x / 1000) * 100}%`,
                    transform: `translateX(${m.shift}) ${
                      isCurrent
                        ? isTop
                          ? "translateY(-3px)"
                          : "translateY(3px)"
                        : ""
                    }`,
                  }}
                  onClick={() => setActiveStage(i)}
                  onMouseEnter={() => setActiveStage(i)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setActiveStage(i);
                    }
                  }}
                  aria-pressed={isCurrent}
                >
                  <div className={styles.milestoneHeader}>
                    <span className={styles.markerBadge}>{stage.marker}</span>
                    <span className={styles.focusTitle}>
                      {stage.focusTitle}
                    </span>
                  </div>
                  <p className={styles.focusDesc}>{stage.focusDesc}</p>
                  <div className={styles.milestoneFooter}>
                    <span className={styles.milestoneTag}>{stage.tag}</span>
                    <a
                      href={bookingUrl}
                      className={styles.milestoneAction}
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`${stage.actionLabel} for ${stage.title}`}
                    >
                      {stage.actionLabel}{" "}
                      <ArrowRight size={13} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* MOBILE RESPONSIVE SERPENTINE TIMELINE (<= 860px) */}
        <div
          className={styles.mobileJourneyTimeline}
          aria-label="Mobile journey timeline"
        >
          <ol className={styles.mobileMilestoneList}>
            {journeyStages.map((stage, i) => (
              <li
                key={stage.title}
                className={`${styles.mobileMilestoneItem} ${activeStage === i ? styles.mobileActive : ""}`}
                onClick={() => setActiveStage(i)}
              >
                <div className={styles.mobileMilestoneIndicator}>
                  <span
                    className={styles.mobileMilestoneDot}
                    aria-hidden="true"
                  />
                  <span className={styles.mobileMilestoneIndex}>0{i + 1}</span>
                </div>
                <div className={styles.mobileMilestoneContent}>
                  <div className={styles.mobileMilestoneMeta}>
                    <span className={styles.markerBadge}>{stage.marker}</span>
                    <h3 className={styles.mobileFocusTitle}>
                      {stage.focusTitle}
                    </h3>
                  </div>
                  <p className={styles.mobileFocusDesc}>{stage.focusDesc}</p>
                  <p className={styles.mobileBodyCopy}>{stage.body}</p>
                  <div className={styles.mobileCardFooter}>
                    <span className={styles.milestoneTag}>{stage.tag}</span>
                    <a href={bookingUrl} className={styles.milestoneAction}>
                      {stage.actionLabel}{" "}
                      <ArrowRight size={13} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Section Bottom CTA (Matching Oula Reference "GET STARTED") */}
        <div className={styles.journeyCtaRow}>
          <a className="cta-book" href={bookingUrl}>
            Begin Your Journey <ArrowRight size={17} aria-hidden="true" />
          </a>
          <p className={styles.journeyNote}>
            Every pregnancy is unique. Visit timing and scans are agreed with
            your obstetrician according to your personal medical profile.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ===================================================================== *
 * 04 — Why Choose MyStree? (Section 03)
 * ===================================================================== */

export function PrenatalApproach() {
  const reduce = useReducedMotion();
  return (
    <section className={styles.approach} aria-labelledby="prenatal-approach">
      <ScrollAtmosphere tone="rose" />
      <div className={styles.container}>
        <ScrollReveal className={styles.approachHead}>
          <Eyebrow>OUR CLINICAL ETHOS</Eyebrow>
          <h2 id="prenatal-approach">
            Your birth. Your voice.
            <br />
            <em>Our care, beside you.</em>
          </h2>
          <p>
            Thoughtful preparation. Shared decisions. Support that sees the
            person becoming a parent.
          </p>
        </ScrollReveal>

        <div className={styles.approachGrid}>
          <ScrollReveal className={styles.approachPhoto}>
            <ParallaxImage
              src={`${photos}pregnancy-care-shared-decisions-mystree.webp`}
              alt="Adult South Indian woman and clinician reviewing prenatal documents together"
              sizes="(max-width: 760px) 90vw, 42vw"
              className={styles.coverImage}
            />
            <div className={styles.approachCaption}>
              <p>
                Care is something
                <br />
                <em>we decide together.</em>
              </p>
            </div>
          </ScrollReveal>

          <ol className={styles.principles}>
            {approachPrinciples.map((item, i) => (
              <motion.li
                key={item.title}
                initial={false}
                whileInView={reduce ? undefined : { opacity: [0.72, 1], y: [18, 0] }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.62, delay: i * 0.1, ease: EASE }}
              >
                <span aria-hidden="true">{item.number}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ===================================================================== *
 * 05 — Meet Your Care Team (Section 04)
 * Links to /doctors/[slug] matching user's MIDI reference
 * ===================================================================== */

export function PrenatalTeam({ doctors }: { doctors: readonly Doctor[] }) {
  if (!doctors.length) return null;

  return (
    <section
      className={styles.team}
      id="prenatal-team"
      aria-labelledby="prenatal-team-heading"
    >
      <ScrollAtmosphere tone="rose" />
      <div className={styles.container}>
        <ScrollReveal className={styles.sectionHead}>
          <div>
            <Eyebrow>CLINICAL SPECIALISTS • INDIRANAGAR</Eyebrow>
            <h2 id="prenatal-team-heading">
              Meet Your
              <br />
              <em>Care Team.</em>
            </h2>
          </div>
          <div>
            <p className={styles.lead}>
              Experienced specialists. Thoughtful listeners. Dedicated
              exclusively to you and your baby.
            </p>
            <Link className={styles.textLink} href="/doctors">
              Meet the whole team <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </ScrollReveal>

        <div className={styles.teamGrid}>
          {doctors.map((doctor, i) => {
            const meta = prenatalDoctorMeta[doctor.slug];
            const displayTitle = meta?.title ?? doctor.title;
            const displayFee = meta?.fee ?? verifiedFacts.consultationFee;
            const displayLocation =
              meta?.clinicLocation ?? "Indiranagar Clinic";
            const displayTags = meta?.tags ?? [
              doctor.specialty,
              doctor.category,
              meta?.experience ?? "10+ Yrs Exp",
              "Indiranagar Clinic",
            ];

            return (
              <ScrollReveal key={doctor.slug} delay={i * 0.1} className={styles.doctorCard}>
                <article className={styles.compactCardArticle}>
                  {/* Top Rectangular Portrait Frame (Clean, Borderless, Editorial) */}
                  <Link
                    href={`/doctors/${doctor.slug}`}
                    className={styles.photoFrameLink}
                    aria-label={`View clinical profile of ${doctor.name}`}
                  >
                    <div className={styles.photoFrame}>
                      <Image
                        src={doctor.image}
                        alt={doctor.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 360px"
                        quality={90}
                        className={styles.photoImage}
                      />
                      {meta?.verified && (
                        <span
                          className={styles.photoVerifiedBadge}
                          title="Verified MyStree Clinician"
                        >
                          <CheckCircle2 size={13} aria-hidden="true" />
                          <span>Verified Clinician</span>
                        </span>
                      )}
                    </div>
                  </Link>

                  {/* Doctor Name & Designation */}
                  <div className={styles.cardInfo}>
                    <Link
                      href={`/doctors/${doctor.slug}`}
                      className={styles.doctorNameLink}
                    >
                      <h3 className={styles.doctorName}>{doctor.name}</h3>
                    </Link>
                    <p className={styles.doctorSubtitle}>{displayTitle}</p>
                  </div>

                  {/* Clinical Specialty & Care Focus Pill Tags (Centered matching reference) */}
                  <div
                    className={styles.tagsRow}
                    role="list"
                    aria-label="Clinical focus areas"
                  >
                    {displayTags.map((tag) => (
                      <span
                        key={tag}
                        className={styles.tagPill}
                        role="listitem"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Operational Intent: Clinic Location & Consultation Fee Strip */}
                  <div className={styles.cardMetaStrip}>
                    <div className={styles.metaLocation}>
                      <MapPin size={13} aria-hidden="true" />
                      <span>{displayLocation}</span>
                    </div>
                    <div className={styles.metaFee}>
                      <span>{displayFee}</span>
                    </div>
                  </div>

                  {/* Primary User Aims: Book Appointment & View Full Profile */}
                  <div className={styles.cardButtonStack}>
                    {/* Primary Button: Book Appointment */}
                    <a
                      href={doctor.bookingUrl ?? bookingUrl}
                      className={styles.bookAppointmentBtn}
                      aria-label={`Book an appointment with ${doctor.name}`}
                      {...(doctor.bookingUrl?.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      <span>Book appointment</span>
                      <ArrowRight size={15} aria-hidden="true" />
                    </a>

                    {/* Secondary Small Button: View Full Profile */}
                    <Link
                      href={`/doctors/${doctor.slug}`}
                      className={styles.viewProfileBtn}
                      aria-label={`View full clinical profile and story of ${doctor.name}`}
                    >
                      <span>View full profile</span>
                      <ArrowRight size={13} aria-hidden="true" />
                    </Link>
                  </div>

                  {/* Clinic Visit Direct Contact Touchpoint */}
                  <div className={styles.clinicVisitPrompt}>
                    <Phone size={12} aria-hidden="true" />
                    <span>
                      Visit clinic or call:{" "}
                      <a href="tel:+916366573772">+91 63665 73772</a>
                    </span>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ===================================================================== *
 * 06 — Stories of Joy (Verbatim Patient Reviews)
 * ===================================================================== */

export function PrenatalReviews() {
  const railRef = useRef<HTMLUListElement>(null);
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  function go(next: number) {
    const rail = railRef.current;
    if (!rail) return;
    const bounded = Math.max(0, Math.min(prenatalReviews.length - 1, next));
    const card = rail.children[bounded] as HTMLElement;
    const left =
      card.getBoundingClientRect().left -
      rail.getBoundingClientRect().left +
      rail.scrollLeft;
    rail.scrollTo({ left, behavior: reduce ? "instant" : "smooth" });
  }

  function syncIndex() {
    const rail = railRef.current;
    if (!rail) return;
    const start = rail.getBoundingClientRect().left;
    const positions = Array.from(rail.children).map((el) =>
      Math.abs(el.getBoundingClientRect().left - start),
    );
    setIndex(positions.indexOf(Math.min(...positions)));
  }

  return (
    <section className={styles.reviews} aria-labelledby="prenatal-reviews">
      <ScrollAtmosphere tone="pearl" />
      <div className={styles.container}>
        <ScrollReveal className={styles.sectionHead}>
          <div>
            <Eyebrow>VERBATIM PATIENT EXPERIENCES</Eyebrow>
            <h2 id="prenatal-reviews">
              The difference
              <br />
              <em>feeling heard makes.</em>
            </h2>
          </div>
          <p className={styles.lead}>
            Real experiences from families in Bangalore who placed their trust
            in Dr. Smitha and MyStree.
          </p>
        </ScrollReveal>

        <ul
          className={styles.reviewRail}
          ref={railRef}
          onScroll={syncIndex}
          aria-label="Patient reviews"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
              e.preventDefault();
              go(index + (e.key === "ArrowRight" ? 1 : -1));
            }
          }}
        >
          {prenatalReviews.map((review) => (
            <li className={styles.reviewCard} key={review.name}>
              <div className={styles.reviewTop}>
                <span
                  className={styles.stars}
                  role="img"
                  aria-label={`${review.rating ?? 5} out of 5 stars`}
                >
                  {Array.from({ length: review.rating ?? 5 }, (_, i) => (
                    <Star
                      size={15}
                      key={i}
                      fill="currentColor"
                      aria-hidden="true"
                    />
                  ))}
                </span>
                <span className={styles.quoteMark} aria-hidden="true">
                  “
                </span>
              </div>
              <blockquote>
                <p>&ldquo;{review.quote}&rdquo;</p>
              </blockquote>
              <div className={styles.reviewPerson}>
                <span className={styles.avatar} aria-hidden="true">
                  {review.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </span>
                <div>
                  <strong>{review.name}</strong>
                  <span>Bangalore</span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className={styles.reviewControls}>
          <span aria-live="polite">
            0{index + 1} <span>/ 0{prenatalReviews.length}</span>
          </span>
          <div>
            <button
              type="button"
              onClick={() => go(index - 1)}
              disabled={index === 0}
              aria-label="Previous review"
            >
              <ArrowLeft size={20} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              disabled={index === prenatalReviews.length - 1}
              aria-label="Next review"
            >
              <ArrowRight size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================================================================== *
 * 07 — Local Insights (Moms in Indiranagar Ask Us)
 * ===================================================================== */

export function PrenatalFaq() {
  return (
    <section className={styles.faq} aria-labelledby="prenatal-faq">
      <ScrollAtmosphere tone="rose" />
      <div className={`${styles.container} ${styles.faqGrid}`}>
        <ScrollReveal className={styles.faqAside}>
          <Eyebrow>LOCAL PATIENT INSIGHTS • INDIRANAGAR</Eyebrow>
          <h2 id="prenatal-faq">
            Moms in Indiranagar
            <br />
            <em>Ask Us.</em>
          </h2>

          <div className={styles.localHighlights}>
            <span className={styles.localTag}>
              Bangalore traffic & emergency transport
            </span>
            <span className={styles.localTag}>
              Indiranagar partner hospitals
            </span>
            <span className={styles.localTag}>
              Prenatal yoga & birthing classes
            </span>
          </div>

          <div className={styles.faqPhoto}>
            <Image
              src={faqPhoto}
              alt="MyStree consultation room in Indiranagar, Bengaluru"
              fill
              sizes="(max-width: 760px) 90vw, 35vw"
              quality={88}
              className={styles.coverImage}
            />
          </div>

          <a
            className={styles.phoneDirectLink}
            href={`tel:${clinic.telephone}`}
          >
            <Phone size={17} aria-hidden="true" /> Call Our Indiranagar Clinic:{" "}
            {clinic.telephoneDisplay}
          </a>
        </ScrollReveal>

        <ScrollReveal delay={0.12} className={styles.faqAnswers}>
          <AnswerList items={prenatalFaqs} idPrefix="prenatal-faqs" />
          {medicalReview && (
            <p className={styles.reviewCite}>
              Medically reviewed by{" "}
              <Link href={`/doctors#${medicalReview.profileSlug}`}>
                {medicalReview.reviewedBy}
              </Link>{" "}
              on {medicalReview.reviewedOn}.
            </p>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ===================================================================== *
 * 08 — Care Continuum (Interactive 3-Section Editorial Visual Continuum)
 * ===================================================================== */

const careContinuum = [
  {
    id: "preconception",
    kicker: "PRECONCEPTION & METABOLIC",
    title: "PCOS & Preconception Care",
    tagline:
      "Hormone balancing, cycle tracking & metabolic care before pregnancy.",
    href: "/clinics/pcos",
    actionLabel: "Explore PCOS care",
    image: "/images/continuum/mystree-continuum-pcos-preconception.webp",
    caption: "Nutrition & Metabolic Health • Indiranagar Consultation Suite",
  },
  {
    id: "postpartum",
    kicker: "POSTPARTUM RECOVERY",
    title: "Pelvic Floor & Postnatal Health",
    tagline:
      "Targeted physiotherapy for birth preparation, core rehab & pelvic recovery.",
    href: "/services/pelvic-floor-physiotherapy",
    actionLabel: "Explore Pelvic health",
    image: "/images/continuum/mystree-continuum-pelvic-postnatal.webp",
    caption: "Pelvic Physical Therapy Sanctuary • Indiranagar",
  },
  {
    id: "clinical-team",
    kicker: "SPECIALIST CARE",
    title: "Our Multidisciplinary Care Team",
    tagline:
      "Obstetricians, fetal medicine doctors & lactation counselors together.",
    href: "/doctors",
    actionLabel: "Meet the care team",
    image: "/images/continuum/mystree-continuum-clinical-team.webp",
    caption: "Evidence-Based Collaborative Clinical Consultation",
  },
] as const;

export function RelatedCare() {
  const [activeSection, setActiveSection] = useState(0);
  const reduce = useReducedMotion();

  return (
    <section
      className={styles.relatedSection}
      aria-labelledby="prenatal-related-heading"
    >
      <ScrollAtmosphere tone="rose" />
      <div className={styles.container}>
        <div className={styles.continuumLayout}>
          <ScrollReveal className={styles.continuumNarrative}>
            <Eyebrow>COMPREHENSIVE CONTINUUM OF CARE</Eyebrow>
            <h2 id="prenatal-related-heading">
              Caring for every season
              <br />
              <em>of your journey.</em>
            </h2>
            <p className={styles.lead}>
              Care before, during, and beyond birth. Complete clinical
              continuity in Indiranagar.
            </p>
            <div className={styles.continuumAction}>
              <a className="cta-book" href={bookingUrl}>
                Schedule a Visit <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
          </ScrollReveal>

          <div className={styles.continuumLedger}>
            {careContinuum.map((item, i) => {
              const isActive = activeSection === i;
              return (
                <div
                  key={item.id}
                  className={`${styles.continuumRow} ${isActive ? styles.continuumRowActive : ""}`}
                  onMouseEnter={() => setActiveSection(i)}
                  onFocus={() => setActiveSection(i)}
                  onClick={() => setActiveSection(i)}
                  role="region"
                  tabIndex={0}
                  aria-expanded={isActive}
                  aria-label={`${item.title} section`}
                >
                  <div className={styles.continuumRowHeader}>
                    <div className={styles.continuumRowText}>
                      <span className={styles.continuumKicker}>{item.kicker}</span>
                      <h3 className={styles.continuumTitle}>{item.title}</h3>
                      <p className={styles.continuumSubtitle}>{item.tagline}</p>
                    </div>
                    <Link
                      href={item.href}
                      className={styles.continuumLink}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>{item.actionLabel}</span>
                      <ArrowRight size={13} aria-hidden="true" />
                    </Link>
                  </div>

                  {/* Smooth bottom scrolling image reveal on hover/active */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        key={`media-${item.id}`}
                        className={styles.continuumMediaWrap}
                        initial={reduce ? false : { opacity: 0, height: 0 }}
                        animate={reduce ? undefined : { opacity: 1, height: "auto" }}
                        exit={reduce ? undefined : { opacity: 0, height: 0 }}
                        transition={{ duration: 0.45, ease: EASE }}
                      >
                        <div className={styles.continuumImageFrame}>
                          <motion.div
                            className={styles.continuumImageScroller}
                            initial={reduce ? false : { y: 24, scale: 1.05 }}
                            animate={reduce ? undefined : { y: 0, scale: 1 }}
                            transition={{ duration: 0.6, ease: EASE }}
                          >
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 55vw, 680px"
                              quality={88}
                              className={styles.continuumImage}
                            />
                          </motion.div>
                          <div className={styles.continuumCaptionPill}>
                            <span>{item.caption}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================================================================== *
 * 09 — Closing Section (High Contrast Art Showcase)
 * ===================================================================== */

export function PrenatalClose() {
  return (
    <section className={styles.close} aria-labelledby="prenatal-close">
      <ScrollAtmosphere tone="rose" />
      <div className={`${styles.container} ${styles.closeInner}`}>
        <ScrollReveal className={styles.closeCopy}>
          <Eyebrow>YOUR CONSULTATION IN INDIRANAGAR</Eyebrow>
          <h2 id="prenatal-close">
            Your next chapter
            <br />
            <em>starts with a conversation.</em>
          </h2>
          <p className={styles.closeLead}>
            Prenatal care in {clinicArea}. From your first ultrasound to holding
            your baby, feel safe, informed, and supported.
          </p>
          <div className={styles.heroActions}>
            <a className="cta-book" href={bookingUrl}>
              Begin Your Journey <ArrowRight size={17} aria-hidden="true" />
            </a>
            <a href={`tel:${clinic.telephone}`} className={styles.lightLink}>
              <Phone size={16} aria-hidden="true" /> Speak to Us (
              {clinic.telephoneDisplay})
            </a>
          </div>
        </ScrollReveal>

        {/* High-Contrast Visible Artwork Showcase */}
        <ScrollReveal className={styles.closeArtShowcase} delay={0.12}>
          <div className={styles.artFrame}>
            <Image
              src={`${photos}pregnancy-care-circle-dark.webp`}
              alt="Continuous line drawing of a pregnant mother and baby silhouette"
              width={640}
              height={280}
              quality={95}
              priority
              className={styles.closeLineArt}
            />
          </div>
          <div className={styles.captionRow}>
            <span className={styles.closeArtCaption}>
              You. Your baby.
              <br />
              Your circle of care.
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
