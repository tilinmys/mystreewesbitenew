"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

const scenes = [
  {
    id: "care",
    desktop: "/images/hero/mystree-hero-care-desktop.webp",
    mobile: "/images/hero/mystree-hero-care-mobile.webp",
    alt: "A calm, supportive conversation in a bright care setting.",
  },
  {
    id: "telehealth",
    desktop: "/images/hero/mystree-hero-telehealth-desktop.webp",
    mobile: "/images/hero/mystree-hero-telehealth-mobile.webp",
    alt: "A woman having a comfortable telehealth conversation at home.",
  },
  {
    id: "everyday",
    desktop: "/images/hero/mystree-hero-everyday-desktop.webp",
    mobile: "/images/hero/mystree-hero-everyday-mobile.webp",
    alt: "Three women sharing a warm everyday conversation.",
  },
];

export function HeroExperience() {
  const [activeScene, setActiveScene] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const timer = window.setInterval(() => {
      setActiveScene((scene) => (scene + 1) % scenes.length);
    }, 8000);
    return () => window.clearInterval(timer);
  }, [prefersReducedMotion]);

  return (
    <section className="hero-section" id="home" aria-labelledby="hero-heading">
      <div className="hero-media" aria-hidden="true">
        {scenes.map((scene, index) => (
          <motion.div
            className={cn("hero-image", index === activeScene && "is-active")}
            key={scene.id}
            style={{
              "--desktop-image": `url("${scene.desktop}")`,
              "--mobile-image": `url("${scene.mobile}")`,
            } as CSSProperties}
            initial={false}
            animate={{
              opacity: index === activeScene ? 1 : 0,
              scale: index === activeScene ? 1.06 : 1.02,
              x: index === activeScene ? 0 : 12,
            }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        ))}
      </div>
      <div className="hero-overlay" aria-hidden="true" />
      <div className="hero-copy-panel">
        <p className="eyebrow">
          <span className="hero-eyebrow-dot" aria-hidden="true" />
          13th Main Road, Indiranagar · Clinical Consultations
        </p>
        <h1 id="hero-heading">
          Women&apos;s health,
          <br />
          without
          <br />
          <em>judgement.</em>
        </h1>
        <p className="hero-lede">
          15-minute consultations with gynaecologists, obstetricians and a nutritionist. In-clinic on 13th Main Road, Indiranagar, or by secure video consultation.
        </p>
        <div className="hero-actions">
          <a className="hero-action-secondary" href="#services">
            Explore our 9 clinics
          </a>
          <a className="hero-action-primary cta-book is-large is-pulse" href="/book">
            Book a consultation <span data-cta-arrow aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
