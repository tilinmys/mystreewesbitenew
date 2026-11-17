"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";

import { clinic } from "@/lib/clinic";
import { HOME_IMAGES } from "./home-images";
import { BOOK_HREF } from "./home-nav-data";
import { ImageSlot } from "./image-slot";
import styles from "./clinic-tour-modal.module.css";

const ROOMS = [
  { title: "Consultation room", slot: HOME_IMAGES.tourConsultation },
  { title: "Ultrasound room", slot: HOME_IMAGES.tourScan },
  { title: "Reception", slot: HOME_IMAGES.tourReception },
] as const;

type Props = { open: boolean; onClose: () => void };

/** The clinic tour: three rooms, the address and a booking link. A modal dialog. */
export function ClinicTourModal({ open, onClose }: Props) {
  const reducedMotion = useReducedMotion();
  const dialog = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    closeButton.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialog.current) return;
      const focusable = dialog.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className={styles.layer}
          data-lenis-prevent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.3 }}
        >
          <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />
          <motion.div
            ref={dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="tour-title"
            className={styles.dialog}
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.head}>
              <p id="tour-title" className={styles.title}>
                Inside MyStree, Indiranagar
              </p>
              <button ref={closeButton} type="button" className={styles.close} onClick={onClose} aria-label="Close clinic tour">
                <X size={20} strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>

            <ul className={styles.rooms}>
              {ROOMS.map((room) => (
                <li key={room.title} className={styles.room}>
                  <div className={styles.frame}>
                    <ImageSlot slot={room.slot} sizes="(max-width: 767px) 90vw, 400px" className={styles.image} />
                  </div>
                  <p className={styles.roomTitle}>{room.title}</p>
                </li>
              ))}
            </ul>

            <div className={styles.foot}>
              <p className={styles.address}>
                {clinic.streetAddress}, {clinic.city} {clinic.postalCode}
              </p>
              <Link href={BOOK_HREF} className={styles.book} onClick={onClose}>
                Book a visit
              </Link>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
