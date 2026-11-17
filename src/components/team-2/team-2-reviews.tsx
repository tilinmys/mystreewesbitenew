"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

import styles from "./team-2-reviews.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;

interface ReviewItem {
  name: string;
  location: string;
  quote: string;
}

const REVIEWS: readonly ReviewItem[] = [
  {
    name: "Simran Singh",
    location: "Indiranagar, Bengaluru",
    quote:
      "Dr. Surbhi Sinha at MyStree Clinic has been wonderful. She is thoughtful, thorough, and takes the time to explain things clearly instead of rushing through appointments. She listens carefully, answers questions patiently, and makes sure you understand your options and next steps.",
  },
  {
    name: "Salma Ahmed",
    location: "Indiranagar, Bengaluru",
    quote:
      "I had a good consultation with Dr. Smitha. She was polite, took time to understand my problem, and gave clear guidance. The treatment and advice were very helpful, and I felt satisfied with the care.",
  },
  {
    name: "Richa Raj",
    location: "100ft Road, Indiranagar",
    quote:
      "Dr. Surbhi was patient, kind, and straightforward. She explained everything in layman’s language, suggested only necessary tests, and understood all my concerns. I would highly recommend her and MyStree Clinic for women’s health issues.",
  },
  {
    name: "Saloni Sarvaiya",
    location: "Defence Colony, Indiranagar",
    quote:
      "I had the most wonderful experience at MyStree Clinic with Dr. Jasmine. Everyone is extremely helpful and creates a comfortable environment for pelvic health and physiotherapy.",
  },
  {
    name: "Nimisha Ravi",
    location: "HAL 2nd Stage, Indiranagar",
    quote:
      "Priyanka Savina was kind and informative. She gave me a clear breakdown of what was required and why it was required. I would highly recommend going to her.",
  },
  {
    name: "Gunjan Bairolia",
    location: "Indiranagar, Bengaluru",
    quote:
      "From the very first visit, Dr. Surbhi made me feel comfortable and heard. She listens patiently, never makes you feel rushed, and explains things in a way that brings clarity and calm. I always walk out feeling lighter and in safe hands.",
  },
  {
    name: "Garima Bairoliya",
    location: "Bengaluru",
    quote:
      "I had a very positive experience at this clinic. The staff is friendly and helpful, appointments are well organised, and the environment is clean, comfortable, and welcoming. The whole process was extremely smooth.",
  },
  {
    name: "Smriti Raj",
    location: "Old Airport Road, Bengaluru",
    quote:
      "A very comforting clinic that truly feels like home. The staff were polite, kind, and helpful throughout the visit. What stands out most is the holistic care they offer, which feels convenient and reassuring.",
  },
  {
    name: "Monalisa Mohapatra",
    location: "Bengaluru",
    quote:
      "Dr. Surbhi Sinha is very kind and friendly. She listens patiently and explains everything clearly. I felt very comfortable during my consultation and would highly recommend her.",
  },
  {
    name: "Prerna Sinha",
    location: "Indiranagar, Bengaluru",
    quote:
      "This is a beautiful space created by doctors who keep compassion alive. I can vouch for the people, the place, and the treatment. The entire experience feels thoughtful and deeply human.",
  },
];

export function Team2Reviews() {
  const reducedMotion = Boolean(useReducedMotion());
  const [currentIndex, setCurrentIndex] = useState(0);

  // Show 2 cards per view on desktop, total pages = ceil(REVIEWS.length / 2)
  const totalPages = Math.ceil(REVIEWS.length / 2);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  }, [totalPages]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  }, [totalPages]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevSlide, nextSlide]);

  const visibleReviews = REVIEWS.slice(currentIndex * 2, currentIndex * 2 + 2);

  const rise = (delay: number) =>
    reducedMotion
      ? // Same first frame as the server (no hydration mismatch), then shown
        // at once on mount: reduced-motion visitors never get a blank section.
        { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0 } }
      : {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.2 } as const,
          transition: { duration: 0.6, delay, ease: EASE },
        };

  return (
    <section
      id="member-reviews"
      className={styles.section}
      aria-labelledby="member-reviews-heading"
    >
      <div className={styles.inner}>
        {/* Section Header */}
        <motion.div className={styles.header} {...rise(0.04)}>
          <h2 id="member-reviews-heading" className={styles.heading}>
            Why Members love our Care Team
          </h2>
        </motion.div>

        {/* Carousel Cards Track */}
        <div className={styles.carouselWrapper}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className={styles.cardsGrid}
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reducedMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              {visibleReviews.map((review) => (
                <div key={review.name} className={styles.card}>
                  <div className={styles.authorHeader}>
                    <h3 className={styles.authorName}>{review.name}</h3>
                    <span className={styles.authorLocation}>{review.location}</span>
                  </div>

                  <div className={styles.stars} aria-label="5 out of 5 stars">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill="var(--twilight-wine)"
                        stroke="var(--twilight-wine)"
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  <p className={styles.quote}>&ldquo;{review.quote}&rdquo;</p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Controls (Matching Image 1: Arrow Left, Dots, Arrow Right) */}
        <div className={styles.controls} role="region" aria-label="Carousel navigation">
          <button
            type="button"
            className={styles.arrowBtn}
            onClick={prevSlide}
            aria-label="Previous member testimonials"
          >
            <ArrowLeft size={16} aria-hidden="true" />
          </button>

          <div className={styles.dots} role="tablist" aria-label="Testimonial slides">
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`${styles.dot} ${idx === currentIndex ? styles.dotActive : ""}`}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1} of ${totalPages}`}
                aria-selected={idx === currentIndex}
                role="tab"
              />
            ))}
          </div>

          <button
            type="button"
            className={styles.arrowBtn}
            onClick={nextSlide}
            aria-label="Next member testimonials"
          >
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Team2Reviews;
