"use client";

import { useEffect, useRef, useState } from "react";

/*
 * CountUp — a figure that counts up from zero when it scrolls into view.
 *
 * The server renders the final value, so search engines, answer engines,
 * no-JS readers and the first paint all see the real number. Only after
 * hydration, and only for a figure that is still below the fold, is it set
 * to zero and counted up as it enters the viewport. A figure already in view
 * on load is left alone (no flash to zero), and reduced-motion users never
 * see it move.
 *
 * Animates values shaped like "30 min", "10,000+", "24+" or "5". Anything
 * else ("NABH", "13 to 15") renders as written.
 *
 * While counting, an invisible copy of the final value holds the width, so
 * "0 weeks" → "40 weeks" never resizes the figure or moves the text beside it.
 */

/* Both layers share one grid cell: the sizer sets the width, the visible
   value sits on top of it. */
const STACK = { display: "inline-grid" } as const;
const LAYER = { gridArea: "1 / 1" } as const;
const SIZER = { gridArea: "1 / 1", visibility: "hidden" } as const;

const PATTERN = /^(\d[\d,]*)(\+?)(\s*[A-Za-z]*)$/;
const DURATION_MS = 1400;

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

export function CountUp({ value, className }: { value: string; className?: string }) {
  const match = value.match(PATTERN);
  const target = match ? Number(match[1].replace(/,/g, "")) : null;
  const grouped = match ? match[1].includes(",") : false;
  const suffix = match ? `${match[2]}${match[3]}` : "";

  const ref = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState<number | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (target === null || !element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return;

    setCurrent(0);
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / DURATION_MS);
          setCurrent(Math.round(easeOutCubic(progress) * target));
          if (progress < 1) frame = requestAnimationFrame(tick);
          else setCurrent(null);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target]);

  const shown =
    current === null || target === null
      ? value
      : `${grouped ? current.toLocaleString("en-IN") : current}${suffix}`;

  if (current === null) {
    return (
      <span ref={ref} className={className}>
        {shown}
      </span>
    );
  }

  return (
    <span ref={ref} className={className} style={STACK}>
      <span style={SIZER} aria-hidden="true">
        {value}
      </span>
      <span style={LAYER}>{shown}</span>
    </span>
  );
}
