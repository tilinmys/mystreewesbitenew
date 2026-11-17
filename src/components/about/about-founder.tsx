"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { flushSync } from "react-dom";

import styles from "./about-founder.module.css";

/*
 * AboutFounder — "A note from our founder" on /about.
 *
 * Two cards side by side (stacked on phones), after the supplied reference:
 * a portrait video frame, and the founder's letter, which opens with
 * "Read more" and closes with "Read less".
 *
 * Video: none exists yet. Without `video`, the frame shows Dr. Smitha A.P's
 * portrait as a clearly labelled placeholder. Pass `video` (an mp4 under
 * public/videos/ plus a WebVTT captions file) and it plays muted and looped
 * with a sound toggle, as in the reference; reduced-motion visitors get it
 * paused with controls instead.
 *
 * The letter is a DRAFT written for Dr. Smitha A.P from her own recorded
 * words in lib/doctors.ts (listening, emotional safety, a high-risk
 * diagnosis without fear, time for every question, care after delivery) and
 * the clinic's recorded facts. It contains no invented events, and it must
 * be approved or rewritten by her before launch. The whole letter is in the
 * HTML at all times; only its visible height changes.
 */

type FounderVideo = {
  src: string;
  captions: string;
  poster?: string;
};

const LETTER = [
  "I have been an obstetrician for more than 23 years, and the first thing I learned has never changed: medicine works better when a woman feels heard. The real worry usually comes out late in a conversation, after the first one has been said. Too often, there is no time left for it.",
  "I started MyStree with Dr. Surbhi Sinha to make that time. A consultation here is not a queue. You sit with a doctor who takes your history properly, explains your reports in plain words and answers every question before you leave. And if something worries you later, you know whom to message.",
  "We began with pregnancy, because that is my work: high-risk pregnancies, recurrent pregnancy loss, diabetes and thyroid problems in pregnancy. A high-risk diagnosis should never mean living in fear. But women kept asking us about everything else. Irregular periods, PCOS, fertility, a daughter's first gynaecology visit, the changes that come with menopause.",
  "So we brought in the people who could help: a nutritionist, a pelvic physiotherapist and a reproductive medicine specialist, in one clinic on 13th Main Road in Indiranagar, all talking to each other about you.",
  "Care should not stop when the baby arrives, or when a test comes back normal. While everyone is looking after the baby, someone should be looking after the mother. That is the clinic I wanted to build, and the one we work in every day.",
] as const;

const FOUNDER = "Dr. Smitha A.P";
const ROLE = "Founder, MyStree";

export function AboutFounder({ video }: { video?: FounderVideo }) {
  const letterId = useId();
  const bodyRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  // The collapsed height comes from CSS (a line cap on phones, the frame's
  // height on desktop), so the animation measures the letter before and
  // after the class change and tweens between the two real heights.
  const toggle = () => {
    const body = bodyRef.current;
    const next = !open;
    if (!body) {
      setOpen(next);
      return;
    }
    const from = body.getBoundingClientRect().height;
    flushSync(() => setOpen(next));
    const to = body.getBoundingClientRect().height;
    if (!next) body.closest("article")?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || from === to) return;
    body.animate([{ height: `${from}px` }, { height: `${to}px` }], {
      duration: 420,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    });
  };

  return (
    <section className={styles.section} aria-labelledby="founder-heading">
      <h2 id="founder-heading" className={styles.srOnly}>
        A note from our founder
      </h2>
      <div className={styles.inner}>
        <FounderFrame video={video} />

        <article className={styles.letterCard}>
          <p className={styles.label}>A note from Dr. Smitha</p>

          <div
            ref={bodyRef}
            id={letterId}
            className={`${styles.letter} ${open ? styles.letterOpen : ""}`}
          >
            {LETTER.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
            <p className={styles.signature}>
              &mdash; {FOUNDER}, Founder
            </p>
          </div>

          <p className={styles.byline}>
            {FOUNDER}, {ROLE}
          </p>

          <button
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-controls={letterId}
            onClick={toggle}
          >
            {open ? "Read less" : "Read more"}
          </button>
        </article>
      </div>
    </section>
  );
}

function FounderFrame({ video }: { video?: FounderVideo }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  if (!video) {
    return (
      <figure className={styles.frame}>
        <Image
          src="/drsmitha.webp"
          alt="Dr. Smitha A.P, founder of MyStree"
          fill
          sizes="(max-width: 899px) 100vw, 40rem"
          className={styles.poster}
        />
        <span className={styles.badge}>Our founding story</span>
        <span className={styles.playMark} aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22">
            <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />
          </svg>
        </span>
        <figcaption className={styles.caption}>
          <span className={styles.captionName}>{FOUNDER}</span>
          <span className={styles.captionNote}>Video coming soon</span>
        </figcaption>
      </figure>
    );
  }

  return (
    <figure className={styles.frame}>
      <video
        ref={videoRef}
        className={styles.poster}
        src={video.src}
        poster={video.poster}
        autoPlay={!reduce}
        muted={muted}
        loop={!reduce}
        playsInline
        controls={reduce}
        preload="metadata"
        aria-label={`${FOUNDER} on why she founded MyStree`}
      >
        <track kind="captions" src={video.captions} srcLang="en" label="English" default />
      </video>
      <span className={styles.badge}>Our founding story</span>
      {!reduce && (
        <button
          type="button"
          className={styles.sound}
          aria-pressed={!muted}
          aria-label={muted ? "Turn sound on" : "Turn sound off"}
          onClick={() => setMuted((value) => !value)}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor" />
            {muted ? (
              <path d="M16 9.5l5 5m0-5l-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            ) : (
              <path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
            )}
          </svg>
        </button>
      )}
    </figure>
  );
}
