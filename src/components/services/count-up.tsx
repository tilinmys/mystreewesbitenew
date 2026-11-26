"use client";

import { useEffect, useRef } from "react";

/*
 * CountUp — zero-re-render counter that counts up from zero when scrolled
 * into view. Updates the live text node directly via ref during rAF so
 * scrolling through ServiceFacts never triggers 80+ React re-renders.
 */

const STACK = { display: "inline-grid" } as const;
const LAYER = { gridArea: "1 / 1" } as const;
const SIZER = { gridArea: "1 / 1", visibility: "hidden" } as const;

const PATTERN = /^(\d[\d,]*)(\+?)(\s*[A-Za-z]*)$/;
const DURATION_MS = 1200;

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

export function CountUp({ value, className }: { value: string; className?: string }) {
  const match = value.match(PATTERN);
  const target = match ? Number(match[1].replace(/,/g, "")) : null;
  const grouped = match ? match[1].includes(",") : false;
  const suffix = match ? `${match[2]}${match[3]}` : "";

  const containerRef = useRef<HTMLSpanElement>(null);
  const liveRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const live = liveRef.current;
    if (target === null || !container || !live) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const rect = container.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return;

    const format = (num: number) => `${grouped ? num.toLocaleString("en-IN") : num}${suffix}`;
    live.textContent = format(0);

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        let lastShown = -1;
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / DURATION_MS);
          const next = Math.round(easeOutCubic(progress) * target);
          if (next !== lastShown) {
            lastShown = next;
            live.textContent = progress < 1 ? format(next) : value;
          }
          if (progress < 1) {
            frame = requestAnimationFrame(tick);
          } else {
            live.textContent = value;
          }
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.45 },
    );

    observer.observe(container);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      live.textContent = value;
    };
  }, [grouped, suffix, target, value]);

  if (target === null) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={containerRef} className={className} style={STACK}>
      <span style={SIZER} aria-hidden="true">
        {value}
      </span>
      <span ref={liveRef} style={LAYER}>
        {value}
      </span>
    </span>
  );
}
