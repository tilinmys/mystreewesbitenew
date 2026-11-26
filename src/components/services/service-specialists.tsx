import Link from "next/link";

import { getBatchNextSlots, getBookingDoctors, type BookingDoctor } from "@/lib/booking";
import { ServiceSpecialistsGrid } from "./service-specialists-grid";
import styles from "./service-specialists.module.css";

/*
 * ServiceSpecialists — Server wrapper that resolves SSR clinician roster and
 * initial live timings, then hands off to ServiceSpecialistsGrid which stays
 * synced with GET /api/availability for fresh, original slot timings.
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

export async function ServiceSpecialists({
  heading,
  lead,
  specialists,
  headingId = "service-specialists-heading",
}: ServiceSpecialistsProps) {
  const roster = await getBookingDoctors();
  const matched = specialists
    .map((entry) => ({ entry, doctor: roster.find((item) => item.id === entry.bookingId) }))
    .filter((row): row is { entry: SpecialistEntry; doctor: BookingDoctor } => Boolean(row.doctor));

  // The booking system is unreachable or lists none of these clinicians.
  if (matched.length === 0) return null;

  // Guard SSR with a 5000ms ISR budget: pre-rendered & cached pages serve users
  // in ~10ms TTFB with real live dates/times already baked into the HTML, while
  // client useLiveAvailabilityById keeps slots fresh from GET /api/availability.
  const emptySlots: Record<number, null> = {};
  const slotMap = await Promise.race([
    getBatchNextSlots(matched.map((row) => row.doctor.id)),
    new Promise<Record<number, null>>((resolve) =>
      setTimeout(() => resolve(emptySlots), 2200),
    ),
  ]);
  const rows = matched.map((row) => ({
    ...row,
    initialSlot: slotMap[row.doctor.id] ?? null,
  }));

  return (
    <section className={styles.section} data-svc-band="specialists" aria-labelledby={headingId}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 id={headingId} className={styles.heading}>
            {heading}
          </h2>
          <p className={styles.lead}>{lead}</p>
        </header>
        <ServiceSpecialistsGrid rows={rows} />
        <p className={styles.rosterHint}>
          Not sure which specialist fits your symptoms?{" "}
          <Link href="/doctors" className={styles.rosterLink}>
            Compare all clinicians &amp; filter by concern
          </Link>
        </p>
      </div>
    </section>
  );
}
