"use client";

import { useState, useMemo, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, RotateCcw } from "lucide-react";

import type { NextSlot } from "@/lib/booking";
import { hasDoctorPhoto, type Doctor } from "@/lib/doctors";
import { useLiveAvailabilityBySlug } from "@/lib/use-live-availability";
import styles from "./team-2-meet-providers.module.css";

/** Chips shown on a card before the rest fold into "+N". */
const MAX_BADGES = 3;

const TONES = [
  "#800020",
  "#AD002B",
  "#68001A",
  "#9B1134",
  "#B80F38",
  "#73001D",
] as const;

const CUTOUTS = new Set([
  "dr-smitha-ap",
  "dr-surbhi-sinha",
  "priyanka-savina",
  "dr-chaitra-nayak",
  "dr-jasmine-flora",
  "dr-sitaram-m",
  "jigyasa-thakur",
  "dr-raksha-m",
  "dr-nivedita-sudheer",
  "nupur-karmarkar",
  "dr-isha-shetty",
]);

const photoOf = (doctor: Doctor) =>
  CUTOUTS.has(doctor.slug) ? `/images/specialists/${doctor.slug}-cutout.webp` : doctor.image;

function initialsOf(name: string): string {
  return name
    .replace(/^(dr|ms|mrs|mr)\.?\s+/i, "")
    .split(/\s+/)
    .filter((part) => /^[A-Za-z]/.test(part))
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

interface ProviderMeta {
  providerType: string;
  location: string;
  shortDesignation: string;
  badges: string[];
}

const PROVIDER_METADATA: Record<string, ProviderMeta> = {
  "dr-smitha-ap": {
    providerType: "Obstetrics & Gynaecology",
    location: "Indiranagar Clinic",
    shortDesignation: "Founder & High-Risk Obstetrician",
    badges: ["High-Risk Pregnancy", "Fetal Medicine", "Obstetrics"],
  },
  "dr-surbhi-sinha": {
    providerType: "Obstetrics & Gynaecology",
    location: "Indiranagar Clinic",
    shortDesignation: "Co-Founder, Obstetrician & Gynaecologist",
    badges: ["PCOS Care", "Laparoscopy", "Fertility Evaluation"],
  },
  "priyanka-savina": {
    providerType: "Nutrition",
    location: "Indiranagar Clinic",
    shortDesignation: "Nutritionist & Counsellor",
    badges: ["PCOS Diet", "Pregnancy Nutrition", "Gestational Diabetes"],
  },
  "dr-chaitra-nayak": {
    providerType: "Reproductive Medicine",
    location: "Indiranagar Clinic",
    shortDesignation: "Reproductive Endocrinologist & Gynaecologist",
    badges: ["PCOS Care", "Endometriosis", "Fertility Evaluation"],
  },
  "dr-jasmine-flora": {
    providerType: "Pelvic Health & Physiotherapy",
    location: "Indiranagar Clinic",
    shortDesignation: "Obstetric & Gynaecological Physiotherapist",
    badges: ["Pelvic Floor Rehab", "Vaginismus Care", "Prenatal Physio"],
  },
  "dr-sitaram-m": {
    providerType: "Urology & Andrology",
    location: "Virtual / Partner Clinic",
    shortDesignation: "Urologist & Andrologist",
    badges: ["Andrology", "Male Fertility", "Reproductive Urology"],
  },
  "dr-raksha-m": {
    providerType: "Obstetrics & Gynaecology",
    location: "Indiranagar Clinic",
    shortDesignation: "Obstetrician & Gynaecologist",
    badges: ["High-Risk Pregnancy", "Laparoscopic Surgery", "Gynaecology"],
  },
  "dr-isha-shetty": {
    providerType: "Obstetrics & Gynaecology",
    location: "Indiranagar Clinic",
    shortDesignation: "Obstetrician & Gynaecologist",
    badges: ["Antenatal Care", "PCOS Care", "Menstrual Health"],
  },
  "dr-nivetha": {
    providerType: "Dermatology",
    location: "Indiranagar Clinic",
    shortDesignation: "Dermatologist",
    badges: ["Hormonal Acne", "Skin & Hair", "Dermatology"],
  },
  "jigyasa-thakur": {
    providerType: "Psychology & Mental Health",
    location: "Indiranagar Clinic",
    shortDesignation: "Consultant Psychologist",
    badges: ["Anxiety & Stress", "Fertility Counselling", "Postpartum Care"],
  },
  "dr-nivedita-sudheer": {
    providerType: "Psychology & Mental Health",
    location: "Indiranagar Clinic",
    shortDesignation: "Psychiatrist",
    badges: ["Psychiatry", "Postpartum Mood", "Psychotherapy"],
  },
  "nupur-karmarkar": {
    providerType: "Yoga Therapy",
    location: "Indiranagar Clinic",
    shortDesignation: "Certified Yoga Therapist",
    badges: ["PCOS Yoga", "Prenatal & Postnatal", "Menopause"],
  },
  "dr-shreyashi-bhattacharyya": {
    providerType: "Radiology & Imaging",
    location: "Indiranagar Clinic",
    shortDesignation: "Radiologist",
    badges: ["Pelvic Ultrasound", "Pregnancy Scans", "Radiology"],
  },
};

const ROLE_FOR_SPECIALTY: Record<string, string> = {
  Obstetrics: "Obstetrics & Gynaecology",
  Gynaecology: "Obstetrics & Gynaecology",
  Fertility: "Reproductive Medicine",
  Nutrition: "Nutrition",
  "Pelvic Health": "Pelvic Health & Physiotherapy",
  Dermatology: "Dermatology",
  "Mental Health": "Psychology & Mental Health",
  "Yoga Therapy": "Yoga Therapy",
  Radiology: "Radiology & Imaging",
  Andrology: "Urology & Andrology",
};

function metaFor(doctor: Doctor): ProviderMeta {
  return (
    PROVIDER_METADATA[doctor.slug] ?? {
      providerType: ROLE_FOR_SPECIALTY[doctor.specialty] ?? doctor.specialty,
      location: "Indiranagar Clinic",
      shortDesignation: doctor.title,
      badges: [doctor.specialty],
    }
  );
}

type ConcernFilterId =
  | "all"
  | "obgyn"
  | "pregnancy"
  | "pcos"
  | "pelvic"
  | "nutrition"
  | "skin"
  | "mental"
  | "more";

const CONCERN_FILTERS: readonly { id: ConcernFilterId; label: string }[] = [
  { id: "all", label: "All clinicians" },
  { id: "obgyn", label: "OBGYN & Periods" },
  { id: "pregnancy", label: "Pregnancy" },
  { id: "pcos", label: "PCOS & Fertility" },
  { id: "pelvic", label: "Pelvic Floor" },
  { id: "nutrition", label: "Nutrition" },
  { id: "skin", label: "Skin & Hair" },
  { id: "mental", label: "Mental Health" },
  { id: "more", label: "Scans, Yoga & Urology" },
];

function matchesConcern(doctor: Doctor, filter: ConcernFilterId): boolean {
  if (filter === "all") return true;
  const meta = metaFor(doctor);
  switch (filter) {
    case "obgyn":
      return meta.providerType === "Obstetrics & Gynaecology";
    case "pregnancy":
      return (
        meta.providerType === "Obstetrics & Gynaecology" ||
        doctor.slug === "priyanka-savina" ||
        doctor.slug === "dr-jasmine-flora" ||
        doctor.slug === "dr-shreyashi-bhattacharyya"
      );
    case "pcos":
      return (
        meta.providerType === "Reproductive Medicine" ||
        meta.badges.some((b) => /pcos|fertility/i.test(b)) ||
        doctor.slug === "dr-surbhi-sinha" ||
        doctor.slug === "dr-isha-shetty"
      );
    case "pelvic":
      return meta.providerType === "Pelvic Health & Physiotherapy";
    case "nutrition":
      return meta.providerType === "Nutrition";
    case "skin":
      return meta.providerType === "Dermatology";
    case "mental":
      return meta.providerType === "Psychology & Mental Health";
    case "more":
      return (
        meta.providerType === "Radiology & Imaging" ||
        meta.providerType === "Yoga Therapy" ||
        meta.providerType === "Urology & Andrology"
      );
  }
}

type FeeMeta = { fee: number; durationMinutes: number };

interface Team2MeetProvidersProps {
  doctors: readonly Doctor[];
  slotsBySlug?: Record<string, NextSlot | null>;
  feesBySlug?: Record<string, FeeMeta>;
}

export function Team2MeetProviders({
  doctors,
  slotsBySlug = {},
  feesBySlug = {},
}: Team2MeetProvidersProps) {
  const [activeFilter, setActiveFilter] = useState<ConcernFilterId>("all");

  const activeSlugs = useMemo(
    () => doctors.filter((doc) => !doc.practisesElsewhere).map((doc) => doc.slug),
    [doctors],
  );
  const { slots: liveSlots, fees: liveFees } = useLiveAvailabilityBySlug(
    activeSlugs,
    slotsBySlug,
    feesBySlug,
  );

  const filteredDoctors = useMemo(
    () => doctors.filter((doctor) => matchesConcern(doctor, activeFilter)),
    [doctors, activeFilter],
  );

  // Clinicians with a photograph first, then those without; roster order within each.
  const orderedDoctors = useMemo(
    () => [...filteredDoctors].sort((a, b) => Number(hasDoctorPhoto(b)) - Number(hasDoctorPhoto(a))),
    [filteredDoctors],
  );

  const toneOf = useMemo(() => {
    const tones = new Map(doctors.map((doctor, index) => [doctor.slug, TONES[index % TONES.length]]));
    return (slug: string) => tones.get(slug) ?? TONES[0];
  }, [doctors]);

  return (
    <section
      id="meet-providers"
      className={styles.section}
      aria-labelledby="meet-doctors-heading"
    >
      <div className={styles.inner}>
        {/* Section Header */}
        <div className={styles.header}>
          <p className={styles.eyebrow}>Indiranagar Care Roster</p>
          <h2 id="meet-doctors-heading" className={styles.heading}>
            Meet our doctors and care team
          </h2>
          <p className={styles.subtitle}>
            Select a concern below to filter immediately—compare fees, live next available
            slots, and book directly with your clinician.
          </p>
        </div>

        {/* Clean single-row concern filters — instant switching, zero dropdown clutter */}
        <div className={styles.concernWrap} role="tablist" aria-label="Filter doctors by concern">
          {CONCERN_FILTERS.map((item) => {
            const active = activeFilter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                className={`${styles.concernBtn} ${active ? styles.concernBtnActive : ""}`}
                onClick={() => setActiveFilter(item.id)}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <p className={styles.resultCount} aria-live="polite">
          Showing {orderedDoctors.length}{" "}
          {orderedDoctors.length === 1 ? "clinician" : "clinicians"}
        </p>

        {/* Zero-animation instant doctor grid */}
        <div className={styles.gridWrapper}>
          {orderedDoctors.length > 0 ? (
            <div className={styles.cardsGrid}>
              {orderedDoctors.map((doctor, index) => {
                const meta = metaFor(doctor);
                const photo = hasDoctorPhoto(doctor);
                const shown = meta.badges.slice(0, MAX_BADGES);
                const slot = liveSlots[doctor.slug] ?? slotsBySlug[doctor.slug] ?? null;
                const feeMeta = liveFees[doctor.slug] ?? feesBySlug[doctor.slug];
                const bookHref = doctor.bookingUrl ?? "/book";

                return (
                  <article key={doctor.slug} className={styles.card}>
                    <Link
                      href={`/doctors/${doctor.slug}`}
                      className={styles.avatar}
                      style={{ "--tone": toneOf(doctor.slug) } as CSSProperties}
                      aria-label={`View profile of ${doctor.name}`}
                    >
                      {photo ? (
                        <Image
                          src={photoOf(doctor)}
                          alt={`${doctor.name}, ${doctor.title} at MyStree Indiranagar`}
                          fill
                          priority={index < 4}
                          sizes="120px"
                          className={styles.avatarImage}
                        />
                      ) : (
                        <span className={styles.monogram} aria-hidden="true">
                          {initialsOf(doctor.name)}
                        </span>
                      )}
                    </Link>

                    <h3 className={styles.doctorName}>
                      <Link href={`/doctors/${doctor.slug}`} className={styles.doctorNameLink}>
                        {doctor.name}
                      </Link>
                    </h3>
                    <p className={styles.designation}>{meta.shortDesignation}</p>

                    <ul className={styles.badgesWrap} aria-label="Areas of care">
                      {shown.map((badge) => (
                        <li key={badge} className={styles.badge}>
                          {badge}
                        </li>
                      ))}
                    </ul>

                    {/* Functional clinical strip: fee + live next slot */}
                    <div className={styles.clinicalStrip}>
                      {feeMeta && feeMeta.fee > 0 ? (
                        <span className={styles.feeText}>
                          <strong>₹{feeMeta.fee.toLocaleString("en-IN")}</strong> · {feeMeta.durationMinutes} min
                        </span>
                      ) : (
                        <span className={styles.feeText}>
                          {doctor.practisesElsewhere ? "Partner clinic" : "In-clinic visit"}
                        </span>
                      )}
                      {slot ? (
                        <span className={styles.slotLine}>
                          <CalendarDays size={12} strokeWidth={1.9} aria-hidden="true" />
                          <span>
                            {slot.dayLabel}, {slot.time} IST
                          </span>
                        </span>
                      ) : null}
                    </div>

                    <div className={styles.cardActions}>
                      <Link
                        href={`/doctors/${doctor.slug}`}
                        className={styles.profileOutlineBtn}
                      >
                        Profile<span className={styles.visuallyHidden}>: {doctor.name}</span>
                      </Link>
                      <a href={bookHref} className={styles.viewProfileBtn}>
                        Book<span className={styles.visuallyHidden}> with {doctor.name}</span>
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p className={styles.emptyText}>
                No doctors found matching this concern.
              </p>
              <button
                type="button"
                className={styles.resetBtn}
                onClick={() => setActiveFilter("all")}
              >
                <RotateCcw size={15} aria-hidden="true" />
                <span>Show all clinicians</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Team2MeetProviders;
