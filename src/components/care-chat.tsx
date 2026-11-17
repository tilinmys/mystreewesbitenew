"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, CalendarDays, MessageCircle, Phone, UserRound, X } from "lucide-react";

import { clinic } from "@/lib/clinic";
import { MARK_FACE_PATH, MARK_FLOWER_PATH, MARK_VIEWBOX } from "@/components/home/woman-mark-paths";
import styles from "./care-chat.module.css";

/*
 * CareChat (16 Nov 2026): the site's help launcher, after the supplied
 * reference. A small circle with the MyStree woman mark, bottom right; a
 * one-line greeting ("Hi there, need any help?") with a close button beside
 * it; and, on tap, a compact help card (WhatsApp, call, book, find a doctor).
 *
 * Built not to get in the way:
 * - The launcher appears only once the reader is past the first screen (on
 *   the home page, past the pinned hero and its cards).
 * - The greeting shows once per visit, only after the reader has been still
 *   for a moment, folds away while they scroll and returns when they pause,
 *   and leaves for good after about ten seconds on screen or when closed.
 * - Nothing traps focus or blocks the page; Escape or a tap outside closes
 *   the card. Reduced motion: no springs, just fades.
 *
 * The card states the clinic's real hours and contacts (lib/clinic.ts) and,
 * as any health site's help point should, where to go in an emergency.
 */
const WHATSAPP_URL = `https://wa.me/${clinic.telephone.replace("+", "")}?text=${encodeURIComponent(
  "Hello MyStree, I would like some help with a consultation.",
)}`;
const GREETING_KEY = "mystree-care-chat-greeted";
const GREETING_DELAY_MS = 5000;
const GREETING_LIFETIME_MS = 10000;
const IDLE_MS = 1200;

function storage(get: true): string | null;
function storage(get: false): void;
function storage(get: boolean) {
  try {
    if (get) return window.sessionStorage.getItem(GREETING_KEY);
    window.sessionStorage.setItem(GREETING_KEY, "1");
  } catch {
    // private mode or blocked storage: the greeting may show again; harmless
  }
  return null;
}

/** How far the reader must scroll before the launcher appears. */
function revealPoint() {
  const hero = document.getElementById("home");
  if (hero) return Math.max(160, hero.offsetTop + hero.offsetHeight - window.innerHeight * 0.6);
  return 160;
}

function Mark() {
  return (
    <svg className={styles.mark} viewBox={MARK_VIEWBOX} aria-hidden="true" focusable="false">
      <path d={MARK_FACE_PATH} fill="currentColor" fillRule="evenodd" />
      <path d={MARK_FLOWER_PATH} className={styles.markFlower} fillRule="evenodd" />
    </svg>
  );
}

export function CareChat() {
  const still = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [greeting, setGreeting] = useState<"pending" | "showing" | "done">("pending");
  const [scrolling, setScrolling] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const shownFor = useRef(0);

  // Launcher visibility and the "reader is scrolling" state.
  useEffect(() => {
    let idle: ReturnType<typeof setTimeout> | undefined;
    const onScroll = () => {
      setVisible(window.scrollY > revealPoint());
      setScrolling(true);
      clearTimeout(idle);
      idle = setTimeout(() => setScrolling(false), IDLE_MS);
    };
    onScroll();
    setScrolling(false);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(idle);
    };
  }, []);

  // The greeting: once per visit, after a quiet moment, never while scrolling.
  useEffect(() => {
    if (greeting !== "pending" || !visible || open) return;
    if (storage(true)) {
      setGreeting("done");
      return;
    }
    const timer = setTimeout(() => {
      setGreeting("showing");
      storage(false);
    }, GREETING_DELAY_MS);
    return () => clearTimeout(timer);
  }, [greeting, visible, open]);

  // Count only the time the greeting is actually on screen; retire it after its lifetime.
  useEffect(() => {
    if (greeting !== "showing" || scrolling || open) return;
    const started = Date.now();
    const timer = setTimeout(() => setGreeting("done"), Math.max(0, GREETING_LIFETIME_MS - shownFor.current));
    return () => {
      shownFor.current += Date.now() - started;
      clearTimeout(timer);
    };
  }, [greeting, scrolling, open]);

  const close = useCallback((returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) launcher.current?.focus();
  }, []);

  // Escape and outside taps close the card.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close(true);
    };
    const onPointer = (event: PointerEvent) => {
      if (root.current && !root.current.contains(event.target as Node)) close(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open, close]);

  const openCard = () => {
    setOpen(true);
    setGreeting("done");
  };

  const showBubble = visible && greeting === "showing" && !scrolling && !open;
  const spring = still ? { duration: 0.2 } : { type: "spring" as const, stiffness: 420, damping: 32 };

  return (
    <div ref={root} className={`${styles.root} ${visible || open ? styles.rootVisible : ""}`}>
      <AnimatePresence>
        {open ? (
          <motion.div
            key="card"
            id="care-chat-card"
            role="dialog"
            aria-label="Help from the MyStree care team"
            className={styles.card}
            initial={still ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={still ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.97 }}
            transition={spring}
          >
            <div className={styles.cardHead}>
              <span className={styles.cardMark}>
                <Mark />
              </span>
              <div className={styles.cardTitles}>
                <p className={styles.cardTitle}>MyStree care team</p>
                <p className={styles.cardMeta}>Indiranagar · Mon–Sat, 9 am to 8 pm</p>
              </div>
              <button type="button" className={styles.cardClose} onClick={() => close(true)} aria-label="Close help">
                <X size={18} strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>

            <p className={styles.cardLead}>How can we help you today?</p>

            <ul className={styles.options}>
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={styles.option}>
                  <MessageCircle size={18} strokeWidth={1.6} aria-hidden="true" />
                  <span>Chat with us on WhatsApp</span>
                  <ArrowUpRight size={15} strokeWidth={1.6} className={styles.optionArrow} aria-hidden="true" />
                </a>
              </li>
              <li>
                <a href={`tel:${clinic.telephone}`} className={styles.option}>
                  <Phone size={18} strokeWidth={1.6} aria-hidden="true" />
                  <span>Call {clinic.telephoneDisplay}</span>
                </a>
              </li>
              <li>
                <Link href="/book" className={styles.option} onClick={() => close(false)}>
                  <CalendarDays size={18} strokeWidth={1.6} aria-hidden="true" />
                  <span>Book an appointment</span>
                </Link>
              </li>
              <li>
                <Link href="/doctors" className={styles.option} onClick={() => close(false)}>
                  <UserRound size={18} strokeWidth={1.6} aria-hidden="true" />
                  <span>Find a specialist</span>
                </Link>
              </li>
            </ul>

            <p className={styles.emergency}>In a medical emergency, call 112 or go to the nearest hospital.</p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className={styles.row}>
        <AnimatePresence>
          {showBubble ? (
            <motion.div
              key="greeting"
              className={styles.greeting}
              initial={still ? { opacity: 0 } : { opacity: 0, x: 16, scale: 0.92 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={still ? { opacity: 0 } : { opacity: 0, x: 12, scale: 0.94 }}
              transition={spring}
            >
              <button
                type="button"
                className={styles.dismiss}
                onClick={() => setGreeting("done")}
                aria-label="Dismiss message"
              >
                <X size={18} strokeWidth={1.75} aria-hidden="true" />
              </button>
              <button type="button" className={styles.bubble} onClick={openCard}>
                Hi there, need any help?
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <motion.button
          ref={launcher}
          type="button"
          className={styles.launcher}
          aria-label={open ? "Close help" : "Need help? Talk to the MyStree care team"}
          aria-expanded={open}
          aria-controls="care-chat-card"
          onClick={() => (open ? close(true) : openCard())}
          initial={false}
          animate={visible || open ? { scale: 1, opacity: 1 } : { scale: 0.6, opacity: 0 }}
          transition={spring}
          whileTap={still ? undefined : { scale: 0.94 }}
          tabIndex={visible || open ? 0 : -1}
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="x"
                className={styles.launcherIcon}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: still ? 0 : 0.18 }}
              >
                <X size={22} strokeWidth={1.75} aria-hidden="true" />
              </motion.span>
            ) : (
              <motion.span
                key="mark"
                className={styles.launcherIcon}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ duration: still ? 0 : 0.18 }}
              >
                <Mark />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}
