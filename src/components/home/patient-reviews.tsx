"use client";

import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { useReducedMotion } from "framer-motion";

import styles from "./patient-reviews.module.css";

const reviews = [
  {
    name: "Simran Singh",
    quote:
      "Dr. Surbhi Sinha at MyStree Clinic has been wonderful. She is thoughtful, thorough, and takes the time to explain things clearly instead of rushing through appointments. She listens carefully, answers questions patiently, and makes sure you understand your options and next steps.",
    tone: "sand",
  },
  {
    name: "Richa Raj",
    quote:
      "Dr. Surbhi was patient, kind, and straightforward. She explained everything in layman’s language, suggested only necessary tests, and understood all my concerns. I would highly recommend her and MyStree Clinic for women’s health issues.",
    tone: "blue",
  },
  {
    name: "Gunjan Bairolia",
    quote:
      "From the very first visit, Dr. Surbhi made me feel comfortable and heard. She listens patiently, never makes you feel rushed, and explains things in a way that brings clarity and calm. I always walk out feeling lighter and in safe hands.",
    tone: "rose",
  },
  {
    name: "Garima Bairoliya",
    quote:
      "I had a very positive experience at this clinic. The staff is friendly and helpful, appointments are well organised, and the environment is clean, comfortable, and welcoming. The whole process was extremely smooth.",
    tone: "olive",
  },
  {
    name: "Smriti Raj",
    quote:
      "A very comforting clinic that truly feels like home. The staff were polite, kind, and helpful throughout the visit. What stands out most is the holistic care they offer, which feels convenient and reassuring.",
    tone: "sand",
  },
  {
    name: "Salma Ahmed",
    quote:
      "I had a good consultation with Dr. Smitha. She was polite, took time to understand my problem, and gave clear guidance. The treatment and advice were very helpful, and I felt satisfied with the care.",
    tone: "blue",
  },
  {
    name: "Monalisa Mohapatra",
    quote:
      "Dr. Surbhi Sinha is very kind and friendly. She listens patiently and explains everything clearly. I felt very comfortable during my consultation and would highly recommend her.",
    tone: "rose",
  },
  {
    name: "Prerna Sinha",
    quote:
      "This is a beautiful space created by doctors who keep compassion alive. I can vouch for the people, the place, and the treatment. The entire experience feels thoughtful and deeply human.",
    tone: "olive",
  },
  {
    name: "Saloni Sarvaiya",
    quote:
      "I had the most wonderful experience at MyStree Clinic with Dr. Jasmine. Everyone is extremely helpful and creates a comfortable environment.",
    tone: "sand",
  },
  {
    name: "Nimisha Ravi",
    quote:
      "Priyanka Savina was kind and informative. She gave me a clear breakdown of what was required and why it was required. I would highly recommend going to her.",
    tone: "blue",
  },
] as const;

function Stars() {
  return (
    <div className={styles.rating} aria-label="5 out of 5 stars">
      <span className={styles.stars} aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => (
          <Star key={index} size={17} fill="currentColor" />
        ))}
      </span>
      <span className={styles.score}>5/5</span>
    </div>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function PatientReviews() {
  const railRef = useRef<HTMLDivElement>(null);
  const reducedMotion = Boolean(useReducedMotion());
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const maxScrollLeft = rail.scrollWidth - rail.clientWidth - 2;
    setCanScrollLeft(rail.scrollLeft > 2);
    setCanScrollRight(rail.scrollLeft < maxScrollLeft);
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    updateScrollState();
    rail.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      rail.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  function moveRail(direction: number) {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({
      left: direction * Math.max(280, rail.clientWidth * 0.72),
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }

  return (
    <section
      className={`${styles.section} photo-ground photo-ground--center`}
      style={{ "--ground-image": "url(/images/grounds/home-letter.webp)", "--ground-position": "right center" } as React.CSSProperties}
      id="patient-reviews" aria-labelledby="patient-reviews-heading">
      <div className={styles.header}>
        <p className={styles.eyebrow}>Patient voices</p>
        <h2 id="patient-reviews-heading">
          <span className={styles.headingAccent}>Care that feels personal</span>
          <br />
          because your story matters.
        </h2>
        <p className={styles.intro}>
          Real reflections from women who visited MyStree for care in Bengaluru.
        </p>
      </div>

      <div className={styles.railWrap}>
        <div className={styles.rail} ref={railRef} tabIndex={0} aria-label="Patient reviews carousel">
          {reviews.map((review) => (
            <article className={styles.card} data-tone={review.tone} key={review.name}>
              <p className={styles.quote}>{review.quote}</p>
              <div className={styles.cardFooter}>
                <Stars />
                <div className={styles.identity}>
                  <span className={styles.avatar} aria-hidden="true">{initials(review.name)}</span>
                  <p className={styles.name}>{review.name}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.controls} aria-label="Patient review controls">
          <div className={styles.arrowGroup}>
            <button
              type="button"
              className={styles.arrowButton}
              onClick={() => moveRail(-1)}
              disabled={!canScrollLeft}
              aria-label="Previous patient reviews"
            >
              <ArrowLeft size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              className={styles.arrowButton}
              onClick={() => moveRail(1)}
              disabled={!canScrollRight}
              aria-label="Next patient reviews"
            >
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PatientReviews;
