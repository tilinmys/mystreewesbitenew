"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ChevronDown, Phone } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { clinic, clinicArea } from "@/lib/clinic";
import type { Doctor } from "@/lib/doctors";
import {
  approachPrinciples,
  journeyStages,
  medicalReview,
  prenatalFaqs,
  prenatalReviews,
  prenatalTeamNotes,
  quickAnswers,
  verifiedFacts,
  type QAItem,
} from "@/lib/prenatal";

import styles from "./prenatal-sections.module.css";

/*
 * ANIMATION STACK
 *
 * framer-motion (already a dependency) plus CSS. GSAP is deliberately NOT
 * added: it is not installed, the brief said to check existing packages
 * first, and every effect here — path draw, reading-zone triggers, reveals —
 * is expressible with what the site already ships. Lenis stays the site's one
 * smooth-scroll system; nothing here adds a second.
 *
 * CRAWLABILITY RULE, enforced throughout: every heading, answer and body
 * paragraph is present in the server-rendered HTML. Animation only transforms
 * markup that already exists — nothing is injected on scroll, and no medical
 * copy is gated behind an interaction.
 */

const EASE = [0.22, 1, 0.36, 1] as const;
const viewport = { once: true, amount: 0.3 } as const;

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reducedMotion = Boolean(useReducedMotion());
  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 14 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ================================================================== *
 * 01 — Hero
 * ================================================================== */

export function PrenatalHero() {
  const reducedMotion = Boolean(useReducedMotion());
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // Restrained: a 3% drift, no pin, no scroll hijacking.
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-3%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.6]);

  return (
    <section className={styles.hero} ref={sectionRef} id="pregnancy-care">
      <div className={styles.heroInner}>
        <motion.div
          className={styles.heroCopy}
          style={reducedMotion ? undefined : { opacity: copyOpacity }}
        >
          <motion.p
            className={styles.eyebrow}
            initial={reducedMotion ? false : { opacity: 0, y: 14 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            Pregnancy care · {clinicArea}
          </motion.p>

          <motion.h1
            className={styles.heroTitle}
            initial={reducedMotion ? false : { opacity: 0, y: 14 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.06 }}
          >
            Pregnancy care that sees the whole journey.
          </motion.h1>

          <motion.p
            className={styles.heroBody}
            initial={reducedMotion ? false : { opacity: 0, y: 14 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.12 }}
          >
            From preconception conversations and early pregnancy assessment to
            growth monitoring and high-risk obstetric care, MyStree brings
            pregnancy care together in one place in {clinic.locality}. Each
            visit is meant to make the next step clearer — what is happening,
            what needs watching, and when further care is needed.
          </motion.p>

          <motion.div
            className={styles.heroActions}
            initial={reducedMotion ? false : { opacity: 0, y: 14 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.18 }}
          >
            <Link className="cta-book is-large" href="/book">
              Book a pregnancy consultation
            </Link>
            <a
              className={styles.heroCall}
              href={`tel:${clinic.telephone}`}
              aria-label={`Call the clinic on ${clinic.telephoneDisplay}`}
            >
              <Phone aria-hidden="true" size={17} strokeWidth={1.8} />
              {clinic.telephoneDisplay}
            </a>
          </motion.div>

          {/*
            Utility line, not an emergency pathway. MyStree has no recorded
            emergency service, so the copy routes urgent symptoms away from
            the website rather than implying it can handle them.
          */}
          <p className={styles.heroUrgent}>
            <strong>
              Concerned about a pregnancy symptom or a high-risk condition?
            </strong>{" "}
            Call the clinic team on{" "}
            <a href={`tel:${clinic.telephone}`}>{clinic.telephoneDisplay}</a>.
            For severe or urgent symptoms, seek emergency medical care.
          </p>

          {/*
            Confirmed facts only, each stated ONCE. The rating names its
            platform rather than floating as a decorative badge, and it does
            not reappear on the clinician cards.
          */}
          <dl className={styles.heroMeta}>
            {verifiedFacts.sameDayAppointments ? (
              <div>
                <dt>Same-day</dt>
                <dd>Appointments available</dd>
              </div>
            ) : null}
            <div>
              <dt>{verifiedFacts.consultationFee}</dt>
              <dd>Consultation</dd>
            </div>
            <div>
              <dt>{verifiedFacts.googleRating} on Google</dt>
              <dd>Patient rating</dd>
            </div>
            <div>
              <dt>High-risk obstetrics</dt>
              <dd>Led by the founder</dd>
            </div>
          </dl>
        </motion.div>

        <motion.div
          className={styles.heroFigure}
          style={reducedMotion ? undefined : { y: imageY }}
          initial={reducedMotion ? false : { clipPath: "inset(0 0 0 100%)" }}
          animate={reducedMotion ? undefined : { clipPath: "inset(0 0 0 0%)" }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          {/*
            PREGNANCY HERO IMAGE PLACEHOLDER
            Final asset: authentic Indian pregnancy consultation context.
            Landscape 16:10 desktop, 4:5 mobile (art-directed via <picture>).
            No stock maternity clichés — no cradled-bump silhouettes, no
            soft-focus pink, no white-coat-and-clipboard poses.
            Prompt: see image-prompts-prenatal.md.
            The frame below reserves its ratio, so dropping the file in
            causes no layout shift.
          */}
          <div className={styles.heroPlaceholder} role="presentation">
            <span className={styles.heroPlaceholderLabel}>
              Pregnancy care photograph
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================== *
 * Shared accordion
 *
 * Native <details>/<summary>: the answer is in the DOM and readable with
 * JavaScript disabled, which is what keeps the medical copy crawlable.
 * ================================================================== */

function AnswerList({
  items,
  idPrefix,
}: {
  items: readonly QAItem[];
  idPrefix: string;
}) {
  return (
    <div className={styles.answerList}>
      {items.map((item, i) => (
        <details
          className={styles.answer}
          key={item.question}
          name={idPrefix}
          open={i === 0}
        >
          <summary className={styles.answerQuestion}>
            <h3 className={styles.answerHeading}>{item.question}</h3>
            <ChevronDown
              className={styles.answerChevron}
              aria-hidden="true"
              size={18}
              strokeWidth={1.8}
            />
          </summary>
          <p className={styles.answerBody}>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

/* ================================================================== *
 * 02 — Question-led quick answers
 * ================================================================== */

export function PrenatalQuestions() {
  return (
    <section className={styles.questions} aria-labelledby="prenatal-questions">
      <div className={styles.questionsInner}>
        <Reveal className={styles.questionsFigure}>
          {/*
            IMAGE PLACEHOLDER — pregnancy-first-visit-consultation, 4:5.
            A first antenatal consultation; conversation, not examination.
          */}
          <div className={styles.figurePlaceholder} role="presentation">
            <span className={styles.heroPlaceholderLabel}>
              First consultation photograph
            </span>
          </div>
        </Reveal>

        <div className={styles.questionsCopy}>
          <Reveal>
            <h2 id="prenatal-questions" className={styles.sectionTitle}>
              Questions women ask early in pregnancy
            </h2>
            <p className={styles.sectionLead}>
              Short answers to what people most often want to know before the
              first appointment. None of this replaces a consultation — it is
              here so you know what to ask about.
            </p>
          </Reveal>
          <AnswerList items={quickAnswers} idPrefix="quick" />
        </div>
      </div>
    </section>
  );
}

/* ================================================================== *
 * 03 — Journey timeline
 *
 * Desktop: one curved SVG path that draws once as the section enters, with
 * nodes activating in sequence. Mobile: the same content as a vertical list,
 * with no horizontal scrolling.
 * ================================================================== */

export function PrenatalJourney() {
  const reducedMotion = Boolean(useReducedMotion());
  const trackRef = useRef<HTMLDivElement>(null);
  const inView = useInView(trackRef, { once: true, amount: 0.35 });

  return (
    <section className={styles.journey} aria-labelledby="prenatal-journey">
      <div className={styles.journeyHead}>
        <Reveal>
          <h2 id="prenatal-journey" className={styles.sectionTitle}>
            Your pregnancy, mapped clearly
          </h2>
          <p className={styles.sectionLead}>
            A trimester-by-trimester view of the conversations, checks and
            decisions that may shape your care. Individual plans differ — this
            is the shape of a pregnancy, not a fixed schedule.
          </p>
        </Reveal>
      </div>

      <div className={styles.journeyTrack} ref={trackRef}>
        {/*
          Decorative only: the stages below carry the content. Hidden from
          assistive technology so the curve is never read as information.
        */}
        <svg
          className={styles.journeyPath}
          viewBox="0 0 1400 150"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <motion.path
            d="M0 112 C 190 112, 210 38, 400 38 S 610 112, 800 112 S 1010 38, 1200 38 S 1330 92, 1400 92"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            initial={reducedMotion ? false : { pathLength: 0 }}
            animate={
              reducedMotion ? undefined : { pathLength: inView ? 1 : 0 }
            }
            transition={{ duration: 1.6, ease: EASE }}
          />
        </svg>

        <ol className={styles.journeyStages}>
          {journeyStages.map((stage, i) => (
            <motion.li
              className={styles.journeyStage}
              key={stage.marker}
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={
                reducedMotion
                  ? undefined
                  : inView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 12 }
              }
              transition={{
                duration: 0.5,
                ease: EASE,
                // Nodes activate in sequence behind the drawing line.
                delay: reducedMotion ? 0 : 0.24 + i * 0.14,
              }}
            >
              <span className={styles.journeyNode} aria-hidden="true" />
              <span className={styles.journeyMarker}>{stage.marker}</span>
              <h3 className={styles.journeyTitle}>{stage.title}</h3>
              <p className={styles.journeyBody}>{stage.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>

      <p className={styles.journeyNote}>
        Anomaly scans, fetal cardiac assessment and fetal growth scans are
        carried out at the clinic in {clinic.locality}. Which assessments apply,
        and when, still depends on clinical need — this is the shape of a
        pregnancy, not a fixed schedule.
      </p>
    </section>
  );
}

/* ================================================================== *
 * 04 — Care team (two clinicians only)
 * ================================================================== */

export function PrenatalTeam({ doctors }: { doctors: readonly Doctor[] }) {
  if (!doctors.length) return null;

  return (
    <section className={styles.team} aria-labelledby="prenatal-team">
      <div className={styles.teamHead}>
        <Reveal>
          <h2 id="prenatal-team" className={styles.sectionTitle}>
            Meet your care team
          </h2>
          <p className={styles.sectionLead}>
            Pregnancy care at MyStree is led by the clinicians below. The wider
            team — nutrition, pelvic health — joins the conversation where it is
            useful.
          </p>
        </Reveal>
      </div>

      <div className={styles.teamGrid}>
        {doctors.map((doctor, i) => (
          <Reveal
            className={`${styles.dossier} ${i === 1 ? styles.dossierAlt : ""}`}
            key={doctor.slug}
            delay={i * 0.08}
          >
            <article>
              <div className={styles.dossierPortrait}>
                <Image
                  src={doctor.image}
                  alt={`${doctor.name}, ${doctor.title} at MyStree, ${clinicArea}`}
                  fill
                  sizes="(max-width: 900px) 92vw, 30rem"
                  quality={88}
                  className={styles.dossierImage}
                />
              </div>

              <div className={styles.dossierBody}>
                <p className={styles.dossierSpecialty}>{doctor.specialty}</p>
                <h3 className={styles.dossierName}>{doctor.name}</h3>
                <p className={styles.dossierRole}>{doctor.title}</p>

                {prenatalTeamNotes[doctor.slug] ? (
                  <p className={styles.dossierNote}>
                    {prenatalTeamNotes[doctor.slug]}
                  </p>
                ) : null}

                <dl className={styles.dossierFacts}>
                  <div>
                    <dt>Qualifications</dt>
                    <dd>{doctor.credentials.join(" · ")}</dd>
                  </div>
                  {doctor.languages ? (
                    <div>
                      <dt>Languages</dt>
                      <dd>{doctor.languages.join(", ")}</dd>
                    </div>
                  ) : null}
                  <div>
                    <dt>Consultation</dt>
                    <dd>{verifiedFacts.consultationFee}</dd>
                  </div>
                </dl>

                <div className={styles.dossierActions}>
                  <Link
                    className="cta-book is-small"
                    href={doctor.bookingUrl ?? "/book"}
                    {...(doctor.bookingUrl?.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    Book with {doctor.name.split(" ").slice(0, 2).join(" ")}
                  </Link>
                  <Link className={styles.dossierLink} href="/doctors">
                    Full profile
                  </Link>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ================================================================== *
 * 05 — Approach
 *
 * Desktop: the figure sticks while the principles scroll past it. Mobile:
 * plain stacked flow, no sticky.
 * ================================================================== */

function Principle({
  index,
  onEnter,
  children,
}: {
  index: number;
  onEnter: (i: number) => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLLIElement>(null);
  // A narrow band at the middle of the viewport is the reading zone.
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) onEnter(index);
  }, [inView, index, onEnter]);

  return (
    <li className={styles.principle} ref={ref} data-active={inView}>
      {children}
    </li>
  );
}

export function PrenatalApproach() {
  const [active, setActive] = useState(0);
  const handleEnter = useCallback((i: number) => setActive(i), []);

  return (
    <section
      className={styles.approach}
      data-nav-theme="dark"
      aria-labelledby="prenatal-approach"
    >
      <div className={styles.approachInner}>
        <div className={styles.approachCopy}>
          <Reveal>
            <h2 id="prenatal-approach" className={styles.sectionTitle}>
              How we think about pregnancy care
            </h2>
          </Reveal>

          <ol className={styles.principles}>
            {approachPrinciples.map((principle, i) => (
              <Principle key={principle.number} index={i} onEnter={handleEnter}>
                <p className={styles.principleNumber}>{principle.number}</p>
                <h3 className={styles.principleTitle}>{principle.title}</h3>
                <p className={styles.principleBody}>{principle.body}</p>
              </Principle>
            ))}
          </ol>
        </div>

        <div className={styles.approachStage} aria-hidden="true">
          {/*
            IMAGE PLACEHOLDER — pregnancy-care-approach, 4:5.
            One image; the crop shifts as the reading zone moves rather than
            swapping four separate assets.
          */}
          <div
            className={styles.approachFigure}
            data-step={active}
            role="presentation"
          >
            <span className={styles.heroPlaceholderLabel}>
              Pregnancy care photograph
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== *
 * 06 — Reviews rail
 * ================================================================== */

export function PrenatalReviews() {
  const railRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const count = prenatalReviews.length;

  const go = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(count - 1, next));
      setIndex(clamped);
      const rail = railRef.current;
      const card = rail?.children[clamped] as HTMLElement | undefined;
      if (rail && card) {
        rail.scrollTo({
          left: card.offsetLeft - (rail.clientWidth - card.clientWidth) / 2,
          behavior: "smooth",
        });
      }
    },
    [count],
  );

  // Keep the indicator honest when the rail is swiped rather than buttoned.
  const onScroll = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const middle = rail.scrollLeft + rail.clientWidth / 2;
    let nearest = 0;
    let best = Infinity;
    [...rail.children].forEach((child, i) => {
      const el = child as HTMLElement;
      const distance = Math.abs(el.offsetLeft + el.clientWidth / 2 - middle);
      if (distance < best) {
        best = distance;
        nearest = i;
      }
    });
    setIndex(nearest);
  }, []);

  return (
    <section className={styles.reviews} aria-labelledby="prenatal-reviews">
      <div className={styles.reviewsHead}>
        <Reveal>
          <h2 id="prenatal-reviews" className={styles.sectionTitle}>
            Experiences shared by families we have cared for
          </h2>
          <p className={styles.sectionLead}>
            Reviews published about MyStree. They describe individual
            experiences of the clinic and are not a claim about clinical
            outcomes.
          </p>
        </Reveal>

        <div className={styles.reviewsNav}>
          <button
            type="button"
            className={styles.reviewsButton}
            onClick={() => go(index - 1)}
            disabled={index === 0}
            aria-label="Previous review"
          >
            ←
          </button>
          <button
            type="button"
            className={styles.reviewsButton}
            onClick={() => go(index + 1)}
            disabled={index === count - 1}
            aria-label="Next review"
          >
            →
          </button>
        </div>
      </div>

      {/* Focusable and arrow-key scrollable, so the rail is keyboard-usable. */}
      <ul
        className={styles.reviewsRail}
        ref={railRef}
        onScroll={onScroll}
        tabIndex={0}
        aria-label="Patient reviews"
      >
        {prenatalReviews.map((review, i) => (
          <li
            className={styles.reviewCard}
            key={review.name}
            data-active={i === index}
          >
            <blockquote className={styles.reviewQuote}>
              <p>{review.quote}</p>
            </blockquote>
            <p className={styles.reviewName}>{review.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ================================================================== *
 * 07 — Detailed FAQ
 * ================================================================== */

export function PrenatalFaq() {
  return (
    <section className={styles.faq} aria-labelledby="prenatal-faq">
      <div className={styles.faqInner}>
        <Reveal className={styles.faqFigure}>
          {/*
            IMAGE PLACEHOLDER — prenatal-faq-clinic, 4:3.
            The clinic environment, not a posed consultation.
          */}
          <div className={styles.figurePlaceholder} role="presentation">
            <span className={styles.heroPlaceholderLabel}>
              Clinic photograph
            </span>
          </div>
        </Reveal>

        <div className={styles.faqCopy}>
          <Reveal>
            <h2 id="prenatal-faq" className={styles.sectionTitle}>
              Pregnancy care questions we hear often
            </h2>
          </Reveal>
          <AnswerList items={prenatalFaqs} idPrefix="faq" />

          {medicalReview ? (
            <p className={styles.reviewedBy}>
              Medically reviewed by{" "}
              <Link href={`/doctors#${medicalReview.profileSlug}`}>
                {medicalReview.reviewedBy}
              </Link>{" "}
              on {medicalReview.reviewedOn}.
            </p>
          ) : (
            /*
              No byline is rendered until a clinician actually signs off.
              Claiming review that has not happened is the one thing this page
              must not do.
            */
            null
          )}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== *
 * 08 — Closing CTA with line-art
 * ================================================================== */

export function PrenatalClose() {
  const reducedMotion = Boolean(useReducedMotion());
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section
      className={styles.close}
      data-nav-theme="dark"
      aria-labelledby="prenatal-close"
    >
      <div className={styles.closeInner}>
        <div className={styles.closeCopy}>
          <h2 id="prenatal-close" className={styles.closeTitle}>
            Begin pregnancy care with a clearer plan.
          </h2>
          <p className={styles.closeBody}>
            Book a consultation at MyStree, {clinicArea}. In-clinic and online
            appointments are both available.
          </p>
          <div className={styles.closeActions}>
            <Link className="cta-book is-large is-pulse" href="/book">
              Book a pregnancy consultation
            </Link>
            <a className={styles.closeCall} href={`tel:${clinic.telephone}`}>
              <Phone aria-hidden="true" size={17} strokeWidth={1.8} />
              {clinic.telephoneDisplay}
            </a>
          </div>
        </div>

        {/*
          "The pregnancy care circle" — an original thin-line motif: four
          figures around a shared centre, one of them carrying a pregnancy,
          with a small monitoring trace beneath. Symbolic, not literal: no
          cartoon baby, no uterus diagram, no medical cross.
        */}
        <div className={styles.closeArt} ref={ref}>
          <svg
            viewBox="0 0 420 300"
            fill="none"
            aria-hidden="true"
            focusable="false"
            className={styles.closeSvg}
          >
            {[
              // the shared centre
              "M210 150 m -58 0 a 58 58 0 1 0 116 0 a 58 58 0 1 0 -116 0",
              // four figures set around it
              "M210 44 a 15 15 0 1 1 0.1 0 M196 74 q 14 -12 28 0",
              "M330 150 a 15 15 0 1 1 0.1 0 M316 180 q 14 -12 28 0",
              "M210 256 a 15 15 0 1 1 0.1 0 M196 226 q 14 12 28 0",
              "M90 150 a 15 15 0 1 1 0.1 0 M76 180 q 14 -12 28 0",
              // the pregnancy carried at the centre
              "M210 122 a 26 26 0 0 1 0 56 a 26 26 0 0 1 0 -56",
              // a small monitoring trace
              "M120 285 h 40 l 10 -16 l 12 30 l 10 -14 h 108",
            ].map((d, i) => (
              <motion.path
                key={d}
                d={d}
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
                animate={
                  reducedMotion
                    ? undefined
                    : inView
                      ? { pathLength: 1, opacity: 1 }
                      : { pathLength: 0, opacity: 0 }
                }
                transition={{
                  duration: 1.1,
                  ease: EASE,
                  delay: 0.1 + i * 0.12,
                }}
              />
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
}
