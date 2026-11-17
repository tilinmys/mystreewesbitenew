"use client";

import { useEffect, useState, type ImgHTMLAttributes } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

import styles from "./doctor-spotlight-quote.module.css";

const MAIN_DOCTOR_IMAGE = "/images/doctors/main-doctor-spotlight.png";
const DOCTOR_IMAGE_FALLBACK = "/images/doctors/doctor-placeholder.svg";
const AVATAR_IMAGE_FALLBACK = "/images/doctors/avatar-placeholder.svg";

interface QuoteItem {
  id: string;
  quote: string;
  name: string;
  designation: string;
  avatar: string;
}

const quotes: readonly QuoteItem[] = [
  {
    id: "kathleen-jordan",
    quote:
      "When a woman completes her first consultation with MyStree, she receives a Care Plan with options for over 30 menopause-related symptoms, including hormone solutions, non-hormonal alternatives, and lifestyle interventions.",
    name: "Kathleen Jordan",
    designation: "MD, Chief Medical Officer",
    avatar: "/images/doctors/kathleen-jordan.png",
  },
  {
    id: "tricia-beisch",
    quote:
      "I really believe MyStree is leading the way in providing just menopausal care, but healthcare for women the way it can and should be, far into the future.",
    name: "Tricia Beisch",
    designation: "MD, Women’s Health Physician",
    avatar: "/images/doctors/tricia-beisch.png",
  },
  {
    id: "anita-rao",
    quote:
      "Good care starts with being heard. MyStree gives women the time, context, and practical next steps they need to feel confident in their health decisions.",
    name: "Anita Rao",
    designation: "MD, Consultant Gynaecologist",
    avatar: "/images/doctors/anita-rao.png",
  },
  {
    id: "meera-nair",
    quote:
      "Women deserve a care team that connects hormones, mental health, and everyday life. That is the difference a truly personal plan can make.",
    name: "Meera Nair",
    designation: "MBBS, DNB, Menopause Specialist",
    avatar: "/images/doctors/meera-nair.png",
  },
  {
    id: "sarah-mathew",
    quote:
      "Small changes become sustainable when a clinician helps you understand why they matter. MyStree makes that conversation feel practical and kind.",
    name: "Sarah Mathew",
    designation: "MD, Reproductive Health Physician",
    avatar: "/images/doctors/sarah-mathew.png",
  },
  {
    id: "divya-menon",
    quote:
      "There is no single version of women’s health. Our job is to meet each woman where she is and build care around the life she wants to live.",
    name: "Divya Menon",
    designation: "MD, Women’s Health Clinician",
    avatar: "/images/doctors/divya-menon.png",
  },
] as const;

interface FallbackImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallback: string;
  src: string;
}

function FallbackImage({ fallback, src, ...props }: FallbackImageProps) {
  const [resolvedSrc, setResolvedSrc] = useState(fallback);

  useEffect(() => {
    let cancelled = false;
    const probe = new window.Image();

    probe.onload = () => {
      if (!cancelled) setResolvedSrc(src);
    };
    probe.onerror = () => {
      if (!cancelled) setResolvedSrc(fallback);
    };
    probe.src = src;

    return () => {
      cancelled = true;
    };
  }, [fallback, src]);

  return <img {...props} src={resolvedSrc} onError={(event) => { event.currentTarget.src = fallback; }} />;
}

export function DoctorSpotlightQuote() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reducedMotion = Boolean(useReducedMotion());
  const currentQuote = quotes[currentIndex];
  const totalQuotes = quotes.length;

  function changeQuote(direction: 1 | -1) {
    setCurrentIndex((index) => (index + direction + totalQuotes) % totalQuotes);
  }

  const entrance = reducedMotion
    ? { initial: { opacity: 1, y: 0 }, whileInView: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
      };

  return (
    <motion.section
      id="doctor-spotlight"
      className={styles.section}
      aria-labelledby="doctor-spotlight-heading"
      initial={entrance.initial}
      whileInView={entrance.whileInView}
      viewport={{ once: true, amount: 0.18 }}
      transition={reducedMotion ? { duration: 0 } : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.doctorVisual}>
        <FallbackImage
          src={MAIN_DOCTOR_IMAGE}
          alt="MyStree Doctor"
          fallback={DOCTOR_IMAGE_FALLBACK}
          className={styles.doctorImage}
        />
      </div>

      <div className={styles.copyBlock}>
        <h2 id="doctor-spotlight-heading">Nationally recognized leaders in women’s health</h2>
        <p>
          MyStree clinicians specialize in you, your hormones, and your relief. The women’s healthcare movement is here in Bengaluru.
        </p>
        <Link href="/clinics/pcos" className={styles.cta}>
          Meet our clinicians
        </Link>
      </div>

      <article className={styles.quoteCard} aria-live="polite" aria-label="Clinician quote">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentQuote.id}
            className={styles.quoteContent}
            initial={reducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -15 }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.3, ease: "easeOut" }}
          >
            <Quote className={styles.quoteIcon} size={40} strokeWidth={3.5} aria-hidden="true" />
            <p className={styles.quoteText}>{currentQuote.quote}</p>
            <div className={styles.attribution}>
              <div>
                <p className={styles.doctorName}>{currentQuote.name}</p>
                <p className={styles.designation}>{currentQuote.designation}</p>
              </div>
              <div className={styles.avatarFrame}>
                <FallbackImage
                  src={currentQuote.avatar}
                  alt={`${currentQuote.name}, ${currentQuote.designation}`}
                  fallback={AVATAR_IMAGE_FALLBACK}
                  className={styles.avatar}
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className={styles.controls}>
          <span className={styles.counter} aria-label={`Quote ${currentIndex + 1} of ${totalQuotes}`}>
            {currentIndex + 1} / {totalQuotes}
          </span>
          <div className={styles.arrowGroup}>
            <motion.button
              type="button"
              className={styles.arrowButton}
              aria-label="Previous quote"
              onClick={() => changeQuote(-1)}
              whileTap={reducedMotion ? undefined : { scale: 0.9 }}
            >
              <ChevronLeft size={20} strokeWidth={2.25} aria-hidden="true" />
            </motion.button>
            <motion.button
              type="button"
              className={styles.arrowButton}
              aria-label="Next quote"
              onClick={() => changeQuote(1)}
              whileTap={reducedMotion ? undefined : { scale: 0.9 }}
            >
              <ChevronRight size={20} strokeWidth={2.25} aria-hidden="true" />
            </motion.button>
          </div>
        </div>
      </article>
    </motion.section>
  );
}

export default DoctorSpotlightQuote;
