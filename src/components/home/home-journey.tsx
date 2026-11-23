"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";

import { HOME_IMAGES } from "./home-images";
import { ImageSlot } from "./image-slot";
import { useStillAfterMount } from "@/lib/use-lite-motion";
import styles from "./home-journey.module.css";

/*
 * HomeJourney, Section 07 (16 Nov 2026), after the supplied reference: a
 * dark wine ground with a soft light to the right, a large centred serif
 * heading, "Your journey at MyStree" with a rule, an accordion card of five
 * steps (one open at a time: text on the left, an image on the right) and
 * one "Book an appointment" button.
 *
 * Copy describes what actually happens at the clinic; no durations or
 * outcomes are promised (compliance review, 13 Nov 2026).
 */
const EASE = [0.16, 1, 0.3, 1] as const;

const STEPS = [
  {
    title: "Book your visit",
    text: "Choose a doctor and a time online, or call or WhatsApp us. See your doctor at our clinic in Indiranagar or by video.",
    image: "journeyBook",
  },
  {
    title: "Your consultation",
    text: "Your doctor goes through your history, your symptoms and your questions, and examines you if it is needed, with time to talk it through.",
    image: "journeyConsult",
  },
  {
    title: "Tests and scans",
    text: "Pelvic and pregnancy ultrasound scans at the clinic, and blood tests arranged as your doctor advises.",
    image: "journeyTests",
  },
  {
    title: "Your care plan",
    text: "Your doctor explains the options and agrees a plan with you. With your consent, our nutritionist, physiotherapist or other clinicians join in.",
    image: "journeyPlan",
  },
  {
    title: "Ongoing support",
    text: "Follow-up visits when you need them, and our care team on phone or WhatsApp, Monday to Saturday, 9 am to 8 pm.",
    image: "journeySupport",
  },
] as const;

export function HomeJourney() {
  const still = useStillAfterMount();
  const id = useId();
  const [open, setOpen] = useState<number | null>(null);

  const rise = (delay: number) =>
    still
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.4 },
          transition: { duration: 0.9, delay, ease: EASE },
        };

  return (
    <section className={styles.section} id="how-it-works" aria-labelledby="support-heading">
      <div className={styles.inner}>
        <motion.h2 id="support-heading" className={styles.heading} {...rise(0)}>
          We&rsquo;re here to <em className={styles.accent}>support you</em>
        </motion.h2>

        <div className={styles.panel}>
          <motion.p className={styles.kicker} {...rise(0.1)}>
            <span>Your journey at MyStree</span>
            <span className={styles.rule} aria-hidden="true" />
          </motion.p>

          <motion.ul className={styles.card} {...rise(0.18)}>
            {STEPS.map((step, i) => {
              const isOpen = open === i;
              const panelId = `${id}-step-${i}`;
              return (
                <li key={step.title} className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}>
                  <h3 className={styles.itemHeading}>
                    <button
                      type="button"
                      className={styles.trigger}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                    >
                      <span className={styles.dot} aria-hidden="true" />
                      <span className={styles.title}>{step.title}</span>
                      <span className={styles.icon} aria-hidden="true">
                        {isOpen ? <Minus size={22} strokeWidth={1.5} /> : <Plus size={22} strokeWidth={1.5} />}
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-label={step.title}
                        className={styles.body}
                        initial={still ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        animate={still ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                        exit={still ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{ duration: still ? 0.15 : 0.45, ease: EASE }}
                      >
                        <div className={styles.bodyInner}>
                          <p className={styles.text}>{step.text}</p>
                          <div className={styles.media}>
                            <ImageSlot slot={HOME_IMAGES[step.image]} sizes="220px" className={styles.photo} compact />
                          </div>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </li>
              );
            })}
          </motion.ul>
        </div>

        <motion.div className={styles.actions} {...rise(0.25)}>
          <Link href="/book" className={`cta-book is-large ${styles.cta}`}>
            Book an appointment
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
