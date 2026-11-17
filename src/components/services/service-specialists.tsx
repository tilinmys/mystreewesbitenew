import type React from "react";
import Image from "next/image";
import Link from "next/link";

import { getBookingDoctors, getNextSlot, type BookingDoctor, type NextSlot } from "@/lib/booking";
import { CardIcon } from "./service-card-icons";
import styles from "./service-specialists.module.css";

/*
 * ServiceSpecialists — LOCKED. The "Book with a specialist" section of every
 * /services/* page, after the four steps.
 *
 * Card v3 (9 Oct 2026, "compact and professional"): one clear reading order
 * — who, credentials, experience, when, how much — and nothing competing
 * with it. A small wine specialty label instead of a pill; a 64px portrait;
 * one quiet experience row; plain focus tags; a slim "next available" row
 * that links to booking; a footer with price and the booking pill. Icons
 * only where they speed scanning (experience, calendar, arrows).
 *
 * Data is live from the booking system (lib/booking.ts): name, degree,
 * experience, fee, minutes and the next free in-clinic slot, exactly as
 * patients see them when booking. No ratings, stars, hearts or
 * "verified" marks (NMC notice of 06.10.2026; user instruction).
 */

export type SpecialistEntry = {
  /** Clinician id in the booking system. */
  bookingId: number;
  /** The card's specialty label, e.g. "Gynaecology". */
  tag: string;
  /** Two short areas relevant to this page. */
  focus: readonly string[];
  /** Site profile path, when there is one. */
  profileHref?: string;
};

export type ServiceSpecialistsProps = {
  heading: string;
  lead: string;
  specialists: readonly SpecialistEntry[];
  consultationLabel: string;
  headingId?: string;
};

function Card({
  entry,
  doctor,
  slot,
  consultationLabel,
}: {
  entry: SpecialistEntry;
  doctor: BookingDoctor;
  slot: NextSlot | null;
  consultationLabel: string;
}) {
  return (
    <li className={styles.card}>
      <div className={styles.head}>
        <div className={styles.portrait}>
          {doctor.imageUrl ? (
            <Image
              src={doctor.imageUrl}
              alt={`Portrait of ${doctor.name}`}
              fill
              sizes="64px"
              className={styles.portraitImage}
            />
          ) : null}
        </div>
        <div className={styles.who}>
          <p className={styles.tag}>{entry.tag}</p>
          <h3 className={styles.name}>
            {entry.profileHref ? (
              <Link href={entry.profileHref} className={styles.nameLink}>
                {doctor.name}
              </Link>
            ) : (
              doctor.name
            )}
          </h3>
          {doctor.degree && (
            <p className={styles.degree} title={doctor.degree}>
              {doctor.degree}
            </p>
          )}
          {doctor.registrationNumber && (
            <p className={styles.degree}>Reg. No. {doctor.registrationNumber}</p>
          )}
        </div>
      </div>

      {doctor.experienceYears ? (
        <p className={styles.stats}>
          <CardIcon name="experience" className={styles.statIcon} />
          <span className={styles.statText}>
            <strong>{doctor.experienceYears}</strong> experience
            {doctor.specialistYears ? (
              <>
                , <strong>{doctor.specialistYears.replace(/ years$/, "")}</strong> as specialist
              </>
            ) : null}
          </span>
        </p>
      ) : null}

      {entry.focus.length > 0 && (
        <ul className={styles.focus} aria-label="Areas of care">
          {entry.focus.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}

      <a href={doctor.bookingUrl} className={styles.slot}>
        <CardIcon name="calendar" className={styles.slotIcon} />
        <span className={styles.slotText}>
          <span className={styles.slotLabel}>Next available</span>
          {slot ? (
            <span className={styles.slotTime}>
              {slot.dayLabel}, {slot.time} <span className={styles.zone}>IST</span>
            </span>
          ) : (
            <span className={styles.slotNone}>See all times</span>
          )}
        </span>
        <CardIcon name="chevron" className={styles.chevron} />
        <span className={styles.srOnly}> for {doctor.name}, on the booking page</span>
      </a>

      <div className={styles.footer}>
        <p className={styles.price}>
          {doctor.fee > 0 ? (
            <span className={styles.priceValue}>&#8377;{doctor.fee.toLocaleString("en-IN")}</span>
          ) : null}
          <span className={styles.priceMeta} title={consultationLabel}>
            {doctor.durationMinutes} min visit
          </span>
        </p>
        <a href={doctor.bookingUrl} className={`cta-book ${styles.book}`}>
          Book Appointment
          <CardIcon name="arrow" className={styles.bookArrow} />
          <span className={styles.srOnly}> with {doctor.name}</span>
        </a>
      </div>
    </li>
  );
}

export async function ServiceSpecialists({
  heading,
  lead,
  specialists,
  consultationLabel,
  headingId = "service-specialists-heading",
}: ServiceSpecialistsProps) {
  const roster = await getBookingDoctors();
  const rows = specialists
    .map((entry) => ({ entry, doctor: roster.find((item) => item.id === entry.bookingId) }))
    .filter((row): row is { entry: SpecialistEntry; doctor: BookingDoctor } => Boolean(row.doctor));

  // The booking system is unreachable or lists none of these clinicians.
  if (rows.length === 0) return null;

  const slots = await Promise.all(rows.map((row) => getNextSlot(row.doctor.id)));

  return (
    <section className={styles.section} aria-labelledby={headingId}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 id={headingId} className={styles.heading}>
            {heading}
          </h2>
          <p className={styles.lead}>{lead}</p>
        </header>
        <ul className={styles.cards} style={{ "--cols": Math.min(rows.length, 4) } as React.CSSProperties}>
          {rows.map((row, index) => (
            <Card
              key={row.doctor.id}
              entry={row.entry}
              doctor={row.doctor}
              slot={slots[index]}
              consultationLabel={consultationLabel}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
