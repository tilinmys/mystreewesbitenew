"use client";

import { useState, useMemo, useRef, useEffect, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown, RotateCcw } from "lucide-react";

import { hasDoctorPhoto, type Doctor } from "@/lib/doctors";
import styles from "./team-2-meet-providers.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Cards shown before "Show more", and how many each press adds (two rows of four). */
const PAGE_SIZE = 8;

/** Chips shown on a card before the rest fold into "+N". */
const MAX_BADGES = 3;

/*
 * Avatar grounds, one per clinician, all mixed from the corporate palette
 * (color.md): Twilight Wine, Cadet Slate, Midnight Chamber and Uranian Mist
 * over white. The clinician's cutout (CUTOUTS) stands on it in full colour,
 * so only the background is coloured, as in the reference. Assigned by roster position,
 * so a clinician keeps the same colour whatever the filters show, and
 * neighbours never repeat.
 */
const TONES = [
  "color-mix(in oklab, var(--twilight-wine) 36%, var(--pure-white))",
  "color-mix(in oklab, var(--cadet-slate) 88%, var(--pure-white))",
  "color-mix(in oklab, color-mix(in oklab, var(--twilight-wine) 40%, var(--cadet-slate)) 62%, var(--pure-white))",
  "color-mix(in oklab, var(--cadet-slate) 55%, var(--uranian-mist))",
  "color-mix(in oklab, var(--twilight-wine) 24%, var(--uranian-mist))",
  "color-mix(in oklab, var(--midnight-chamber) 34%, var(--uranian-mist))",
] as const;

/*
 * Clinicians whose photo has had its background removed (Canva, 24 Oct 2026),
 * saved as public/images/specialists/<slug>-cutout.webp. Anyone not listed
 * shows their original photo, which covers the ground.
 */
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

/** "Dr. Nivetha" → "N", "Ms. Jigyasa Thakur" → "JT": the monogram for clinicians without a photo. */
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
  overflowCount?: number;
}

const PROVIDER_METADATA: Record<string, ProviderMeta> = {
  "dr-smitha-ap": {
    providerType: "Obstetrics & Gynaecology",
    location: "Indiranagar Clinic",
    shortDesignation: "Founder and High-Risk Obstetrician",
    badges: ["High-Risk Pregnancy", "Fetal Medicine", "PCOS Care", "Obstetrics"],
    overflowCount: 2,
  },
  "dr-surbhi-sinha": {
    providerType: "Obstetrics & Gynaecology",
    location: "Indiranagar Clinic",
    shortDesignation: "Co-Founder, Obstetrician and Gynaecologist",
    badges: ["Fertility Consultations", "PCOS Care", "Laparoscopy", "Gynaecology"],
    overflowCount: 1,
  },
  "priyanka-savina": {
    providerType: "Nutrition",
    location: "Indiranagar Clinic",
    shortDesignation: "Nutritionist and Counsellor",
    badges: ["Nutrition", "PCOS Diet", "Gestational Diabetes", "Pregnancy Nutrition"],
    overflowCount: 1,
  },
  "dr-chaitra-nayak": {
    providerType: "Reproductive Medicine",
    location: "Indiranagar Clinic",
    shortDesignation: "Reproductive Medicine Specialist",
    badges: ["Reproductive Medicine", "PCOS Care", "Endometriosis", "Fertility Evaluation"],
    overflowCount: 2,
  },
  "dr-jasmine-flora": {
    providerType: "Pelvic Health & Physiotherapy",
    location: "Indiranagar Clinic",
    shortDesignation: "Obstetric and Gynaecological Physiotherapist",
    badges: ["Pelvic Floor Rehab", "Vaginismus Care", "Diastasis Recti", "Prenatal Physio"],
    overflowCount: 1,
  },
  "dr-sitaram-m": {
    providerType: "Urology & Andrology",
    location: "Virtual / Partner Clinic",
    shortDesignation: "Urologist and Andrologist",
    badges: ["Andrology", "Male Fertility", "Reproductive Urology", "Semen Health"],
    overflowCount: 1,
  },
  /*
   * Added from the booking system, 17 Oct 2026. Roles, designations and tags
   * restate each clinician's booking record (degree and profile text) only.
   */
  "dr-raksha-m": {
    providerType: "Obstetrics & Gynaecology",
    location: "Indiranagar Clinic",
    shortDesignation: "Gynaecologist",
    badges: ["High-Risk Pregnancy", "Infertility", "Laparoscopic Surgery", "Cosmetic Gynaecology"],
  },
  "dr-isha-shetty": {
    providerType: "Obstetrics & Gynaecology",
    location: "Indiranagar Clinic",
    shortDesignation: "Gynaecologist",
    badges: ["Antenatal Care", "PCOS Care", "Menstrual Health", "Infertility Evaluation"],
  },
  "dr-nivetha": {
    providerType: "Dermatology",
    location: "Indiranagar Clinic",
    shortDesignation: "Dermatologist",
    badges: ["Dermatology", "Skin & Hair"],
  },
  "jigyasa-thakur": {
    providerType: "Psychology & Mental Health",
    location: "Indiranagar Clinic",
    shortDesignation: "Consultant Psychologist",
    badges: ["Mental Health", "Fertility Counselling", "Postpartum Wellbeing", "Grief Support"],
  },
  "nupur-karmarkar": {
    providerType: "Yoga Therapy",
    location: "Indiranagar Clinic",
    shortDesignation: "Certified Yoga Therapist",
    badges: ["Yoga Therapy", "PCOS Care", "Prenatal & Postnatal", "Menopause"],
  },
  "dr-shreyashi-bhattacharyya": {
    providerType: "Radiology & Imaging",
    location: "Indiranagar Clinic",
    shortDesignation: "Radiologist",
    badges: ["Radiology"],
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

/*
 * Card and filter details. Clinicians added later in the dashboard get a
 * default built from their own record: their specialty as the role and tag,
 * and their title as the designation (never an assumed degree).
 */
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

/** The recorded qualification line (the first credential that is not experience or registration). */
function qualificationOf(doctor: Doctor) {
  return doctor.credentials.find((item) => !/years? experience|^Reg\. No\./i.test(item));
}

/** "Reg. No. …" where the clinician's record holds one. */
function registrationOf(doctor: Doctor) {
  return doctor.credentials.find((item) => /^Reg\. No\./i.test(item));
}

const LOCATIONS = [
  "All",
  "Indiranagar Clinic",
  "Virtual / Partner Clinic",
] as const;

const SPECIALTIES = [
  "All",
  "High-Risk Pregnancy",
  "PCOS Care",
  "Pelvic Floor Rehab",
  "Nutrition",
  "Vaginismus Care",
  "Dermatology",
  "Mental Health",
  "Yoga Therapy",
  "Andrology",
] as const;

interface Team2MeetProvidersProps {
  doctors: readonly Doctor[];
}

export function Team2MeetProviders({ doctors }: Team2MeetProvidersProps) {
  const reducedMotion = Boolean(useReducedMotion());

  const [selectedType, setSelectedType] = useState<string>("All");
  const [selectedLocation, setSelectedLocation] = useState<string>("All");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("All");

  // Care roles present on the roster, in roster order.
  const providerTypes = useMemo(
    () => ["All", ...new Set(doctors.map((doctor) => metaFor(doctor).providerType))],
    [doctors],
  );

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const meta = metaFor(doctor);

      // Filter by Provider Type
      if (selectedType !== "All" && meta.providerType !== selectedType) {
        return false;
      }

      // Filter by Location
      if (selectedLocation !== "All" && meta.location !== selectedLocation) {
        return false;
      }

      // Filter by Specialty
      if (selectedSpecialty !== "All") {
        const matchesBadge = meta.badges.some((badge) =>
          badge.toLowerCase().includes(selectedSpecialty.toLowerCase())
        );
        const matchesDocSpecialty = doctor.specialty
          .toLowerCase()
          .includes(selectedSpecialty.toLowerCase());
        if (!matchesBadge && !matchesDocSpecialty) {
          return false;
        }
      }

      return true;
    });
  }, [doctors, selectedType, selectedLocation, selectedSpecialty]);

  // Clinicians with a photograph first, then those without; roster order within each.
  const orderedDoctors = useMemo(
    () => [...filteredDoctors].sort((a, b) => Number(hasDoctorPhoto(b)) - Number(hasDoctorPhoto(a))),
    [filteredDoctors],
  );

  const toneOf = useMemo(() => {
    const tones = new Map(doctors.map((doctor, index) => [doctor.slug, TONES[index % TONES.length]]));
    return (slug: string) => tones.get(slug) ?? TONES[0];
  }, [doctors]);

  // Paging restarts whenever the filters change.
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const filterKey = `${selectedType}-${selectedLocation}-${selectedSpecialty}`;
  useEffect(() => setVisibleCount(PAGE_SIZE), [filterKey]);

  const visibleDoctors = orderedDoctors.slice(0, visibleCount);
  const remaining = orderedDoctors.length - visibleDoctors.length;

  // After "Show more", keyboard focus moves to the first newly shown card.
  const gridRef = useRef<HTMLDivElement>(null);
  const focusFrom = useRef<number | null>(null);
  useEffect(() => {
    if (focusFrom.current === null) return;
    const links = gridRef.current?.querySelectorAll<HTMLAnchorElement>("[data-profile-link]");
    links?.[focusFrom.current]?.focus();
    focusFrom.current = null;
  }, [visibleCount]);

  const showMore = () => {
    focusFrom.current = visibleCount;
    setVisibleCount((count) => count + PAGE_SIZE);
  };

  const resetFilters = () => {
    setSelectedType("All");
    setSelectedLocation("All");
    setSelectedSpecialty("All");
  };

  const rise = (delay: number) =>
    reducedMotion
      ? // Same first frame as the server (no hydration mismatch), then shown
        // at once on mount: reduced-motion visitors never get a blank section.
        { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0 } }
      : {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.15 } as const,
          transition: { duration: 0.5, delay, ease: EASE },
        };

  return (
    <section
      id="meet-providers"
      className={styles.section}
      aria-labelledby="meet-doctors-heading"
    >
      <div className={styles.inner}>
        {/* Section Header */}
        <motion.div className={styles.header} {...rise(0.04)}>
          <h2 id="meet-doctors-heading" className={styles.heading}>
            Meet our doctors and specialists
          </h2>
          <p className={styles.subtitle}>
            Gynaecologists, fertility doctors, nutrition, pelvic physiotherapy, dermatology,
            psychology and yoga therapy, working together under one roof on 13th Main Road,
            Indiranagar, Bengaluru.
          </p>
        </motion.div>

        {/* Filter Controls (Matching reference: Provider Role, Location, Specialties) */}
        <motion.div className={styles.filtersBar} {...rise(0.08)}>
          {/* 1. Care Role Dropdown */}
          <div className={styles.filterGroup}>
            <label htmlFor="filter-provider-type" className={styles.filterLabel}>
              Care Role
            </label>
            <div className={styles.selectWrapper}>
              <select
                id="filter-provider-type"
                className={styles.select}
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                aria-label="Filter by care role or specialty"
              >
                {providerTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <ChevronDown className={styles.selectChevron} size={15} aria-hidden="true" />
            </div>
          </div>

          {/* 2. Location Dropdown */}
          <div className={styles.filterGroup}>
            <label htmlFor="filter-location" className={styles.filterLabel}>
              Location
            </label>
            <div className={styles.selectWrapper}>
              <select
                id="filter-location"
                className={styles.select}
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                aria-label="Filter by clinic location"
              >
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
              <ChevronDown className={styles.selectChevron} size={15} aria-hidden="true" />
            </div>
          </div>

          {/* 3. Specialties Dropdown */}
          <div className={styles.filterGroup}>
            <label htmlFor="filter-specialties" className={styles.filterLabel}>
              Specialties & Conditions
            </label>
            <div className={styles.selectWrapper}>
              <select
                id="filter-specialties"
                className={styles.select}
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                aria-label="Filter by health specialty or condition"
              >
                {SPECIALTIES.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
              <ChevronDown className={styles.selectChevron} size={15} aria-hidden="true" />
            </div>
          </div>
        </motion.div>

        {/* Doctors card grid: 4 across on desktop, 3, then 2, then 1 on phones */}
        <div className={styles.gridWrapper}>
          <AnimatePresence mode="wait">
            {orderedDoctors.length > 0 ? (
              <motion.div
                key={filterKey}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.35, ease: EASE }}
              >
                <div ref={gridRef} className={styles.cardsGrid}>
                  {visibleDoctors.map((doctor) => {
                    const meta = metaFor(doctor);
                    const photo = hasDoctorPhoto(doctor);
                    const shown = meta.badges.slice(0, MAX_BADGES);
                    const more = meta.badges.length - shown.length + (meta.overflowCount ?? 0);

                    return (
                      <article key={doctor.slug} className={styles.card}>
                        <div
                          className={styles.avatar}
                          style={{ "--tone": toneOf(doctor.slug) } as CSSProperties}
                        >
                          {photo ? (
                            <Image
                              src={photoOf(doctor)}
                              alt={`${doctor.name}, ${doctor.title} at MyStree Indiranagar`}
                              fill
                              sizes="104px"
                              className={styles.avatarImage}
                            />
                          ) : (
                            <span className={styles.monogram} aria-hidden="true">
                              {initialsOf(doctor.name)}
                            </span>
                          )}
                        </div>

                        <h3 className={styles.doctorName}>{doctor.name}</h3>
                        {meta.shortDesignation ? (
                          <p className={styles.designation}>{meta.shortDesignation}</p>
                        ) : null}
                        {qualificationOf(doctor) ? (
                          <p className={styles.designation}>{qualificationOf(doctor)}</p>
                        ) : null}
                        {registrationOf(doctor) ? (
                          <p className={styles.designation}>{registrationOf(doctor)}</p>
                        ) : null}

                        <ul className={styles.badgesWrap} aria-label="Specialties">
                          {shown.map((badge) => (
                            <li key={badge} className={styles.badge}>
                              {badge}
                            </li>
                          ))}
                          {more > 0 ? (
                            <li className={styles.badge}>
                              <span aria-hidden="true">+{more}</span>
                              <span className={styles.visuallyHidden}>and {more} more</span>
                            </li>
                          ) : null}
                        </ul>

                        <Link
                          href={`/doctors/${doctor.slug}`}
                          className={styles.viewProfileBtn}
                          data-profile-link
                        >
                          View profile<span className={styles.visuallyHidden}>: {doctor.name}</span>
                        </Link>
                      </article>
                    );
                  })}
                </div>

                <div className={styles.more}>
                  <p className={styles.moreCount} aria-live="polite">
                    You&rsquo;re viewing {visibleDoctors.length} of {orderedDoctors.length}{" "}
                    {orderedDoctors.length === 1 ? "specialist" : "specialists"}
                  </p>
                  {remaining > 0 ? (
                    <button type="button" className={styles.moreBtn} onClick={showMore}>
                      Show more
                    </button>
                  ) : null}
                </div>
              </motion.div>
            ) : (
              <div className={styles.emptyState}>
                <p className={styles.emptyText}>
                  No doctors found matching the selected filters.
                </p>
                <button
                  type="button"
                  className={styles.resetBtn}
                  onClick={resetFilters}
                >
                  <RotateCcw size={15} aria-hidden="true" />
                  <span>Reset filters</span>
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default Team2MeetProviders;
