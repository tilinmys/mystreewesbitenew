"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import styles from "./featured-blog-slider.module.css";

export interface FeaturedBlogPost {
  id: string;
  slug: string;
  eyebrow: string;
  title: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  image: string;
  topicTag: string;
  category: string;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 30 : -30,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -30 : 30,
    opacity: 0,
  }),
};

/* Posts come from the admin dashboard (lib/cms.ts) via the /blog page. */
export function FeaturedBlogSlider({ posts }: { posts: readonly FeaturedBlogPost[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % posts.length);
  }, [posts.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
  }, [posts.length]);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  const post = posts[currentIndex];
  if (!post) return null;

  return (
    <section className={styles.sliderSection}>
      <div className={styles.container}>
        {/* Slider Card Container */}
        <div className={styles.sliderWrapper}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={post.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className={styles.cardAnchor}
              >
                <div className={styles.cardGrid}>
                  {/* Left Block: Deep Wine / Rich Berry (#841B4D) */}
                  <div className={styles.leftBlock}>
                    <div>
                      {/* Eyebrow */}
                      <p className={styles.eyebrow}>
                        {post.eyebrow}
                      </p>

                      {/* Heading: Fraunces serif light */}
                      <h2 className={styles.headline}>
                        {post.title}
                      </h2>

                      {/* Metadata: JetBrains Mono */}
                      <div className={styles.metadata}>
                        <span>{post.author}</span>
                        <span className={styles.dotSeparator}>•</span>
                        <span>{post.date}</span>
                        <span className={styles.dotSeparator}>•</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    {/* CTA link: Read more */}
                    <div className={styles.readMoreRow}>
                      <span>Read more</span>
                      <ArrowUpRight className={styles.readMoreIcon} />
                    </div>
                  </div>

                  {/* Right Block: Soft Oat Canvas (#E6EAF0) with geometric overlay tones */}
                  <div className={styles.rightBlock}>
                    {/* Background Left Rounded Berry Arc */}
                    <div
                      className={styles.berryArc}
                      aria-hidden="true"
                    />

                    {/* Topic Label alongside the arc */}
                    <span
                      className={styles.topicTag}
                    >
                      {post.topicTag}
                    </span>

                    {/* Central Circular Vignette Frame */}
                    <div
                      className={styles.vignetteFrame}
                      style={{ position: "relative", borderRadius: "50%", overflow: "hidden" }}
                    >
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 300px, 400px"
                        className={styles.vignetteImage}
                        priority={currentIndex === 0}
                      />
                      <div className={styles.vignetteOverlay} />
                    </div>

                  </div>
                </div>
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* Controls: Arrow Navigation & Dot Indicators */}
          <div className={styles.controlsRow}>
            {/* Previous button */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous featured article"
              className={styles.arrowButton}
            >
              <ArrowLeft style={{ width: "1.25rem", height: "1.25rem" }} />
            </button>

            {/* Dot indicators */}
            <div className={styles.dotsContainer}>
              {posts.map((p, idx) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}: ${p.title}`}
                  className={`${styles.dot} ${idx === currentIndex ? styles.dotActive : ""}`}
                />
              ))}
            </div>

            {/* Next button */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next featured article"
              className={styles.arrowButton}
            >
              <ArrowRight style={{ width: "1.25rem", height: "1.25rem" }} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
