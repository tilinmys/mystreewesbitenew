"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

import { MARK_FLOWER_PATH } from "./woman-mark-paths";
import { useStillAfterMount } from "@/lib/use-lite-motion";
import styles from "./home-core.module.css";

/*
 * HomeCore, Section 04 (14 Nov 2026), after the namaha.healthcare "at our
 * core" fold: a pinned stage where, as the page scrolls, a tree of fine stems
 * grows up from the foot of the screen, the flower from the MyStree mark
 * opens at each branch tip, and the heading "Women's health at our core"
 * rises in word by word, followed by one line of text.
 *
 * Everything is SVG transforms, opacity and stroke length driven by one
 * scroll value (function-form transforms; see home-hero.tsx for why).
 * Reduced motion: no pin, the tree in full and the words in place.
 */
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const range = (v: number, start: number, end: number) => clamp01((v - start) / (end - start));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/* Stems in a 1440 × 900 field, drawn in order: the trunk first, then the boughs. */
const STEMS = [
  { d: "M705 930 C 700 820, 690 720, 700 620 C 708 540, 690 470, 660 400", at: 0.0, width: 3.2 },
  { d: "M700 640 C 640 600, 560 600, 470 540 C 400 490, 370 420, 380 350", at: 0.12, width: 2.4 },
  { d: "M702 600 C 770 560, 860 560, 930 500 C 990 450, 1010 380, 990 300", at: 0.16, width: 2.4 },
  { d: "M690 520 C 650 470, 640 400, 610 330 C 590 280, 560 240, 520 210", at: 0.22, width: 2 },
  { d: "M680 450 C 720 400, 770 360, 800 290 C 820 240, 820 200, 800 160", at: 0.26, width: 2 },
  { d: "M470 545 C 400 560, 320 540, 250 490 C 200 450, 170 400, 175 350", at: 0.3, width: 1.6 },
  { d: "M930 505 C 1000 520, 1080 510, 1150 460 C 1200 420, 1225 370, 1215 320", at: 0.32, width: 1.6 },
  { d: "M700 760 C 620 760, 540 740, 470 700 C 420 670, 390 640, 380 600", at: 0.36, width: 1.4 },
  { d: "M702 720 C 790 720, 880 700, 960 650 C 1010 620, 1040 590, 1050 550", at: 0.38, width: 1.4 },
];

/* Flowers at the branch tips: position, size, turn, and when each opens. */
const BLOOMS = [
  { x: 380, y: 350, size: 130, rotate: -28, at: 0.3 },
  { x: 990, y: 300, size: 140, rotate: 18, at: 0.33 },
  { x: 520, y: 210, size: 110, rotate: -20, at: 0.38 },
  { x: 800, y: 160, size: 120, rotate: 10, at: 0.41 },
  { x: 175, y: 350, size: 100, rotate: -35, at: 0.45 },
  { x: 1215, y: 320, size: 110, rotate: 30, at: 0.47 },
  { x: 380, y: 600, size: 90, rotate: -40, at: 0.5 },
  { x: 1050, y: 550, size: 95, rotate: 35, at: 0.52 },
];

const HEADING = [
  { text: "Women’s", italic: false },
  { text: "health", italic: false },
  { text: "at", italic: true },
  { text: "our", italic: true },
  { text: "core", italic: true },
];

function Stem({ progress, d, at, width, still }: { progress: MotionValue<number>; d: string; at: number; width: number; still: boolean }) {
  const pathLength = useTransform(progress, (v) => easeOut(range(v, at, at + 0.22)));
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="currentColor"
      strokeWidth={width}
      strokeLinecap="round"
      style={still ? undefined : { pathLength }}
    />
  );
}

/* The flower path's box in the mark's own units (it is centred on this point). */
const FLOWER_CENTRE = { x: 480, y: 545 };
const FLOWER_SPAN = 900;

function Bloom({ progress, x, y, size, rotate, at, still }: { progress: MotionValue<number>; x: number; y: number; size: number; rotate: number; at: number; still: boolean }) {
  const open = useTransform(progress, (v) => easeOut(range(v, at, at + 0.16)));
  const scale = useTransform(open, (o) => 0.35 + 0.65 * o);
  const turn = useTransform(open, (o) => rotate - 30 * (1 - o));
  const s = size / FLOWER_SPAN;
  return (
    <g transform={`translate(${x} ${y})`}>
      <motion.g style={still ? { rotate } : { scale, rotate: turn, opacity: open }}>
        <g className={styles.sway}>
          <path
            d={MARK_FLOWER_PATH}
            transform={`scale(${s}) translate(${-FLOWER_CENTRE.x} ${-FLOWER_CENTRE.y})`}
            fill="currentColor"
            fillRule="evenodd"
          />
        </g>
      </motion.g>
    </g>
  );
}

function Word({ progress, index, text, italic, still }: { progress: MotionValue<number>; index: number; text: string; italic: boolean; still: boolean }) {
  const start = 0.08 + index * 0.05;
  const t = useTransform(progress, (v) => 0.35 + 0.65 * easeOut(range(v, start, start + 0.22)));
  const y = useTransform(progress, (v) => `${(1 - easeOut(range(v, start, start + 0.22))) * 45}%`);
  return (
    <span className={styles.wordMask}>
      <motion.span className={italic ? styles.wordItalic : styles.word} style={still ? undefined : { y, opacity: t }}>
        {text}
      </motion.span>
    </span>
  );
}

export function HomeCore() {
  const section = useRef<HTMLElement>(null);
  const still = useStillAfterMount();
  const { scrollYProgress: progress } = useScroll({ target: section, offset: ["start 0.96", "start 0.4"] });
  const lineOpacity = useTransform(progress, (v) => 0.35 + 0.65 * range(v, 0.25, 0.7));
  const lineY = useTransform(progress, (v) => 12 * (1 - easeOut(range(v, 0.25, 0.7))));

  const firstLine = HEADING.filter((w) => !w.italic);
  const secondLine = HEADING.filter((w) => w.italic);

  return (
    <section ref={section} className={styles.section} aria-labelledby="core-heading">
      <div className={styles.stage}>
        <svg className={styles.tree} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
          <g className={styles.stems}>
            {STEMS.map((stem) => (
              <Stem key={stem.d} progress={progress} still={still} {...stem} />
            ))}
          </g>
          <g className={styles.blooms}>
            {BLOOMS.map((bloom) => (
              <Bloom key={`${bloom.x}-${bloom.y}`} progress={progress} still={still} {...bloom} />
            ))}
          </g>
        </svg>

        <div className={styles.copy}>
          <h2 id="core-heading" className={styles.heading}>
            <span className={styles.srOnly}>Women&rsquo;s health at our core</span>
            <span className={styles.line} aria-hidden="true">
              {firstLine.map((w, i) => (
                <Word key={w.text} progress={progress} index={i} text={w.text} italic={false} still={still} />
              ))}
            </span>
            <span className={styles.line} aria-hidden="true">
              {secondLine.map((w, i) => (
                <Word key={w.text} progress={progress} index={i + firstLine.length} text={w.text} italic still={still} />
              ))}
            </span>
          </h2>
          <motion.p className={styles.lead} style={still ? undefined : { opacity: lineOpacity, y: lineY }}>
            From a first period to pregnancy, menopause and beyond, every service at MyStree is
            planned around women.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
