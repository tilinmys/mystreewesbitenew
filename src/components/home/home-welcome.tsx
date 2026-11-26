"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

import { isLiteMotion, useStillAfterMount } from "@/lib/use-lite-motion";
import { HOME_IMAGES } from "./home-images";
import { ImageSlot } from "./image-slot";
import styles from "./home-welcome.module.css";

/*
 * HomeWelcome, Section 02 (revised 14 Nov 2026): on white, a statement whose
 * words fill in as it scrolls through the viewport, then the clinic
 * photograph. (The background woman and hair animation were removed at the
 * user's request, 15 Nov 2026.)
 */
const EASE = [0.16, 1, 0.3, 1] as const;

const STATEMENT = [
  { text: "Women’s health care in Indiranagar, Bengaluru, in a clinic built for" },
  { text: "privacy, comfort and calm.", italic: true },
] as const;

const WORDS = STATEMENT.flatMap((part) =>
  part.text.split(" ").map((word) => ({ word, italic: "italic" in part })),
);

function Word({
  progress,
  index,
  total,
  word,
  italic,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  word: string;
  italic: boolean;
}) {
  const start = index / total;
  // Function form keeps this on the JS path (see home-hero.tsx).
  const opacity = useTransform(progress, (v) => 0.48 + 0.52 * Math.min(1, Math.max(0, (v - start) * total)));
  return (
    <>
      <motion.span className={italic ? styles.wordItalic : styles.word} style={{ opacity }}>
        {word}
      </motion.span>{" "}
    </>
  );
}

export function HomeWelcome() {
  const reducedMotion = useStillAfterMount();
  const statement = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({ target: statement, offset: ["start 0.85", "end 0.45"] });
  // The clinic photograph: a slow zoom-out and gentle drift while it crosses the screen.
  const frame = useRef<HTMLDivElement>(null);
  const { scrollYProgress: photoProgress } = useScroll({ target: frame, offset: ["start end", "end start"] });
  // Phones: no scroll-linked photo motion (see use-lite-motion.ts).
  const photoY = useTransform(photoProgress, (v) => (isLiteMotion() ? "0%" : `${(0.5 - v) * 8}%`));
  const photoScale = useTransform(photoProgress, (v) => (isLiteMotion() ? 1 : 1.12 - v * 0.1));

  return (
    <section className={styles.section} aria-labelledby="welcome-heading">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Welcome to MyStree</p>

        <h2 id="welcome-heading" ref={statement} className={styles.statement}>
          {reducedMotion ? (
            STATEMENT.map((part) =>
              "italic" in part ? (
                <em key={part.text} className={styles.wordItalic}>
                  {part.text}
                </em>
              ) : (
                <span key={part.text}>{part.text} </span>
              ),
            )
          ) : (
            <>
              <span className={styles.srOnly}>{STATEMENT.map((part) => part.text).join(" ")}</span>
              <span aria-hidden="true">
                {WORDS.map((item, i) => (
                  <Word
                    key={`${item.word}-${i}`}
                    progress={scrollYProgress}
                    index={i}
                    total={WORDS.length}
                    word={item.word}
                    italic={item.italic}
                  />
                ))}
              </span>
            </>
          )}
        </h2>

        <motion.figure
          className={styles.figure}
          initial={reducedMotion ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: EASE }}
        >
          <div ref={frame} className={styles.frame}>
            <motion.div className={styles.drift} style={reducedMotion ? undefined : { y: photoY, scale: photoScale }}>
              <ImageSlot slot={HOME_IMAGES.clinic} sizes="(max-width: 767px) 92vw, 880px" className={styles.image} />
            </motion.div>
          </div>
        </motion.figure>
      </div>
    </section>
  );
}
