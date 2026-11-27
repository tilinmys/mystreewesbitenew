"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

import { useStillAfterMount } from "@/lib/use-lite-motion";
import { HOME_FAQ_ITEMS } from "./home-faq-data";
import styles from "./home-faq.module.css";

/*
 * HomeFaq — Editorial SEO / AEO / GEO accordion section on Warm Alabaster
 * (#F8F5F5) with crisp pure-white rounded cards, matching the reference
 * composition inside MyStree's authoritative Burgundy & Fraunces/Plus Jakarta
 * Sans design system. Uses native <details>/<summary> so every answer is
 * rendered in server HTML for search and answer engines.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

export function HomeFaq() {
  const still = useStillAfterMount();

  return (
    <section className={styles.section} id="faq" aria-labelledby="home-faq-heading">
      <div className={styles.inner}>
        <header className={styles.head}>
          <p className={styles.eyebrow}>Common Questions · Indiranagar Clinic</p>
          <h2 id="home-faq-heading" className={styles.heading}>
            Frequently asked questions
          </h2>
        </header>

        <div className={styles.list}>
          {HOME_FAQ_ITEMS.map((item, index) => (
            <motion.div
              key={item.id}
              className={styles.itemWrap}
              initial={still ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={
                still
                  ? { duration: 0 }
                  : { duration: 0.48, delay: Math.min(index * 0.055, 0.35), ease: EASE }
              }
            >
              <details className={styles.card} open={index === 0}>
                <summary className={styles.summary}>
                  <span className={styles.question}>{item.question}</span>
                  <ChevronDown
                    size={18}
                    strokeWidth={1.9}
                    className={styles.chevron}
                    aria-hidden="true"
                  />
                </summary>
                <div className={styles.answerWrap}>
                  <p className={styles.answer}>{item.answer}</p>
                </div>
              </details>
            </motion.div>
          ))}
        </div>

        <div className={styles.foot}>
          <Link href="/faqs" className={styles.allLink}>
            <span>Browse all 125 women&apos;s health FAQs</span>
            <ArrowRight size={15} strokeWidth={1.9} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
