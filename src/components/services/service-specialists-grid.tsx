"use client";

import type React from "react";
import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock } from "lucide-react";

import type { BookingDoctor, NextSlot } from "@/lib/booking";
import { useLiveAvailabilityById } from "@/lib/use-live-availability";
import type { SpecialistEntry } from "./service-specialists";
import styles from "./service-specialists.module.css";

type SpecialistRow = {
  entry: SpecialistEntry;
  doctor: BookingDoctor;
  initialSlot: NextSlot | null;
};

function initialsOf(name: string) {
  const words = name
    .replace(/^(dr|ms|mrs|mr)\.?\s+/i, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (!words.length) return "MS";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
}

export function ServiceSpecialistsGrid({
  rows,
}: {
  rows: readonly SpecialistRow[];
}) {
  const doctorIds = useMemo(() => rows.map((row) => row.doctor.id), [rows]);
  const initialSlots = useMemo(() => {
    const map: Record<number, NextSlot | null> = {};
    for (const row of rows) map[row.doctor.id] = row.initialSlot;
    return map;
  }, [rows]);

  const { slots, isSyncing } = useLiveAvailabilityById(doctorIds, initialSlots);

  return (
    <ul
      className={styles.cards}
      style={{ "--cols": Math.min(rows.length, 4) } as React.CSSProperties}
    >
      {rows.map(({ entry, doctor }) => {
        const slot = slots[doctor.id] ?? null;
        const expShort = doctor.experienceYears
          ? doctor.experienceYears.replace(/\byears\b/i, "yrs exp")
          : null;
        const infoBarText = [expShort, entry.focus.join(" · ")].filter(Boolean).join(" • ");
        const statusText = slot
          ? slot.dayLabel === "Today"
            ? "Available today"
            : "Accepting bookings"
          : isSyncing
            ? "Checking slots"
            : "Online booking";

        return (
          <li key={doctor.id} className={styles.card}>
            <div className={styles.cardTopBar}>
              <span className={styles.specialtyLabel}>{entry.tag}</span>
              <span className={styles.statusPill}>
                <span className={styles.statusDot} aria-hidden="true" />
                <span>{statusText}</span>
              </span>
            </div>

            <div className={styles.profileRow}>
              {entry.profileHref ? (
                <Link
                  href={entry.profileHref}
                  className={styles.portrait}
                  aria-label={`View profile of ${doctor.name}`}
                >
                  {doctor.imageUrl ? (
                    <Image
                      src={doctor.imageUrl}
                      alt={`Portrait of ${doctor.name}`}
                      fill
                      sizes="76px"
                      className={styles.portraitImage}
                    />
                  ) : (
                    <span className={styles.monogram} aria-hidden="true">
                      {initialsOf(doctor.name)}
                    </span>
                  )}
                </Link>
              ) : (
                <div className={styles.portrait}>
                  {doctor.imageUrl ? (
                    <Image
                      src={doctor.imageUrl}
                      alt={`Portrait of ${doctor.name}`}
                      fill
                      sizes="76px"
                      className={styles.portraitImage}
                    />
                  ) : (
                    <span className={styles.monogram} aria-hidden="true">
                      {initialsOf(doctor.name)}
                    </span>
                  )}
                </div>
              )}

              <div className={styles.profileMeta}>
                <h3 className={styles.name}>
                  {entry.profileHref ? (
                    <Link href={entry.profileHref} className={styles.nameLink}>
                      {doctor.name}
                    </Link>
                  ) : (
                    doctor.name
                  )}
                </h3>
                <p className={styles.feeLine}>
                  {doctor.fee > 0 ? (
                    <>
                      <span className={styles.feeAmount}>₹{doctor.fee.toLocaleString("en-IN")}</span>
                      <span className={styles.feeDuration}> / {doctor.durationMinutes} min visit</span>
                    </>
                  ) : (
                    <span className={styles.feeDuration}>{doctor.durationMinutes} min visit</span>
                  )}
                </p>
              </div>
            </div>

            {infoBarText ? <p className={styles.expBar}>{infoBarText}</p> : null}

            <div className={styles.slotSection}>
              <div className={styles.slotHeader}>
                <span className={styles.slotTitle}>Next available slot</span>
                {slot?.mode ? (
                  <span className={styles.slotMode}>
                    {slot.mode === "online" ? "Video" : "In clinic"}
                  </span>
                ) : null}
              </div>

              <a href={doctor.bookingUrl} className={styles.slotPills}>
                <span className={styles.slotPill}>
                  <CalendarDays size={13} strokeWidth={1.9} aria-hidden="true" />
                  <span>{slot ? slot.dayLabel : isSyncing ? "Loading..." : "Check schedule"}</span>
                </span>
                <span className={styles.slotPill}>
                  <Clock size={13} strokeWidth={1.9} aria-hidden="true" />
                  <span>{slot ? `${slot.time} IST` : isSyncing ? "Live time" : "All timings"}</span>
                </span>
                <span className={styles.srOnly}> for {doctor.name}, on the booking page</span>
              </a>
            </div>

            <div className={styles.footer}>
              <a href={doctor.bookingUrl} className={styles.book}>
                Book Appointment
                <span className={styles.srOnly}> with {doctor.name}</span>
              </a>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
