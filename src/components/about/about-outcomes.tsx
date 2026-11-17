"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

import styles from "./about-outcomes.module.css";

interface StatItem {
  value: number;
  suffix?: string;
  label: string;
}

const OUTCOMES: readonly StatItem[] = [
  {
    value: 89,
    suffix: "%",
    label: "improved or eliminated symptoms in the first year",
  },
  {
    value: 71,
    suffix: "%",
    label: "improved mental wellbeing & hormonal balance",
  },
  {
    value: 50,
    suffix: "k",
    label: "women supported nationwide through care & community",
  },
];

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  inView: boolean;
  reducedMotion: boolean;
  delay?: number;
}

function AnimatedCounter({
  value,
  suffix = "",
  inView,
  reducedMotion,
  delay = 0,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(reducedMotion ? value : 0);

  useEffect(() => {
    if (reducedMotion) {
      setCount(value);
      return;
    }
    if (!inView) return;

    let startTimestamp: number | null = null;
    const duration = 1600;
    let rafId: number;
    let timeoutId: NodeJS.Timeout;

    timeoutId = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        // Smooth easeOutCubic curve: decelerates naturally near the end
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(easeOut * value));

        if (progress < 1) {
          rafId = requestAnimationFrame(step);
        } else {
          setCount(value);
        }
      };
      rafId = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [inView, value, reducedMotion, delay]);

  return (
    <span className={styles.numberWrap}>
      <span className={styles.number}>{count}</span>
      {suffix && <span className={styles.suffix}>{suffix}</span>}
    </span>
  );
}

export function AboutOutcomes() {
  const reducedMotion = Boolean(useReducedMotion());
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, {
    once: true,
    margin: "-12% 0px",
  });

  return (
    <section
      ref={containerRef}
      className={styles.outcomes}
      aria-labelledby="about-outcomes-heading"
    >
      <div className={styles.container}>
        {/* Left Column: Eyebrow + Decorative Wave + Headline */}
        <motion.div
          className={styles.leftCol}
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className={styles.eyebrowWrap}>
            <span className={styles.eyebrow}>MEMBER OUTCOMES</span>
            <svg
              className={styles.wave}
              viewBox="0 0 114 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M1 3C10 0.8 19 5.2 28 3C37 0.8 46 5.2 55 3C64 0.8 73 5.2 82 3C91 0.8 100 5.2 109 3C111 2.5 113 3 113 3"
                stroke="var(--btn-primary)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h2 id="about-outcomes-heading" className={styles.heading}>
            Get more out of medicine than you ever thought possible
          </h2>
        </motion.div>

        {/* Right Column: 3 Animated Stat Rows */}
        <div className={styles.rightCol}>
          <ul className={styles.statsList}>
            {OUTCOMES.map((stat, idx) => (
              <motion.li
                key={stat.label}
                className={styles.statItem}
                initial={reducedMotion ? false : { opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : undefined}
                transition={{
                  duration: 0.6,
                  delay: reducedMotion ? 0 : 0.12 * idx,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className={styles.numberBox}>
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    inView={isInView}
                    reducedMotion={reducedMotion}
                    delay={idx * 150}
                  />
                </div>
                <p className={styles.statLabel}>{stat.label}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
