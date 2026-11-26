"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, ChevronDown, ChevronUp, Clock } from "lucide-react";

import type { NextSlot } from "@/lib/booking";
import { hasDoctorPhoto, type Doctor } from "@/lib/doctors";
import { useLiveAvailabilityBySlug } from "@/lib/use-live-availability";
import styles from "./home-team.module.css";

/*
 * HomeTeam — Compact horizontal cutout Doctor Cards arranged in a static
 * responsive grid (3 cols desktop, 2 cols tablet, 1 col phones).
 *
 * Inspired by the supplied reference layout (bust cutout left over soft arc
 * glow, crisp name + speciality + concise doctor info on the right, subtle
 * booking arrow, and full-width bottom schedule/CTA bar), adapted to the
 * MyStree palette and root font hierarchy with zero star ratings, review
 * counts, verification badges, or auto-scrolling marquee motion.
 */

type FeeMeta = { fee: number; durationMinutes: number };

type Card = {
  slug: string;
  name: string;
  role: string;
  cutoutSrc: string | null;
  initials: string;
  briefInfo: string;
  metaLine: string;
  dayLabel: string;
  timeLabel: string;
  bookingUrl: string;
};

const INITIAL_VISIBLE = 6;

const DISPLAY_ORDER = [
  "dr-smitha-ap",
  "dr-surbhi-sinha",
  "dr-chaitra-nayak",
  "dr-raksha-m",
  "priyanka-savina",
  "dr-jasmine-flora",
  "dr-isha-shetty",
  "dr-nivetha",
  "dr-nivedita-sudheer",
  "jigyasa-thakur",
  "dr-shreyashi-bhattacharyya",
  "dr-sitaram-m",
  "nupur-karmarkar",
] as const;

const CUTOUT_PATHS: Record<string, string> = {
  "dr-smitha-ap": "/images/specialists/dr-smitha-ap-cutout.webp",
  "dr-surbhi-sinha": "/images/specialists/dr-surbhi-sinha-cutout.webp",
  "dr-chaitra-nayak": "/images/specialists/dr-chaitra-nayak-cutout.webp",
  "dr-raksha-m": "/images/specialists/dr-raksha-m-cutout.webp",
  "priyanka-savina": "/images/specialists/priyanka-savina-cutout.webp",
  "dr-jasmine-flora": "/images/specialists/dr-jasmine-flora-cutout.webp",
  "dr-isha-shetty": "/images/specialists/dr-isha-shetty-cutout.webp",
  "dr-nivedita-sudheer": "/images/specialists/dr-nivedita-sudheer-cutout.webp",
  "jigyasa-thakur": "/images/specialists/jigyasa-thakur-cutout.webp",
  "dr-sitaram-m": "/images/specialists/dr-sitaram-m-cutout.webp",
  "nupur-karmarkar": "/images/specialists/nupur-karmarkar-cutout.webp",
};

const SPECIALTY_TAGS: Record<string, string> = {
  "dr-smitha-ap": "High-Risk Obstetrics",
  "dr-surbhi-sinha": "Obstetrics & Gynaecology",
  "dr-chaitra-nayak": "Reproductive Medicine",
  "dr-raksha-m": "Gynaecology & Obstetrics",
  "priyanka-savina": "Clinical Nutrition",
  "dr-jasmine-flora": "Pelvic Physiotherapy",
  "dr-isha-shetty": "Gynaecology",
  "dr-nivetha": "Dermatology",
  "dr-nivedita-sudheer": "Psychiatry",
  "jigyasa-thakur": "Clinical Psychology",
  "dr-shreyashi-bhattacharyya": "Radiology",
  "dr-sitaram-m": "Urology & Andrology",
  "nupur-karmarkar": "Yoga Therapy",
};

const CARD_SUMMARIES: Record<string, string> = {
  "dr-smitha-ap": "High-risk pregnancy, recurrent loss & obstetrics.",
  "dr-surbhi-sinha": "Gynaecology, fertility checks & minimal access care.",
  "dr-chaitra-nayak": "PCOS, endometriosis & fertility evaluation.",
  "dr-raksha-m": "Obstetrics, gynaecology & reproductive care.",
  "priyanka-savina": "Indian meal plans for PCOS, pregnancy & recovery.",
  "dr-jasmine-flora": "Pelvic floor rehab, vaginismus & postnatal care.",
  "dr-isha-shetty": "Routine gynaecology & pregnancy consultations.",
  "dr-nivetha": "Hormonal acne, pigmentation, hair & scalp care.",
  "dr-nivedita-sudheer": "Psychiatry consultations & psychotherapy care.",
  "jigyasa-thakur": "Anxiety, fertility stress & postpartum counselling.",
  "dr-shreyashi-bhattacharyya": "Diagnostic ultrasound & pelvic scan imaging.",
  "dr-sitaram-m": "Urology & male partner fertility consultations.",
  "nupur-karmarkar": "Therapeutic yoga for PCOS & prenatal wellness.",
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

function summarizeBio(doctor: Doctor) {
  const curated = CARD_SUMMARIES[doctor.slug];
  if (curated) return curated;
  return doctor.bio
    .replace(/\b(renowned|prestigious|leading|best|world-class|expert|specialist)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

const SPECIALTY_FILTERS = [
  {
    id: "all",
    label: "All doctors",
    serviceHref: "/doctors",
    serviceLabel: "Open full doctor directory",
  },
  {
    id: "gynae",
    label: "Periods & Gynaecology",
    serviceHref: "/services/obgyn-consults",
    serviceLabel: "Explore Gynaecology Consults",
  },
  {
    id: "pregnancy",
    label: "Pregnancy & High-Risk",
    serviceHref: "/services/prenatal",
    serviceLabel: "Explore Pregnancy Care",
  },
  {
    id: "pcos",
    label: "PCOS & Fertility",
    serviceHref: "/clinics/pcos",
    serviceLabel: "Explore PCOS & Fertility Care",
  },
  {
    id: "pelvic",
    label: "Pelvic Floor & Nutrition",
    serviceHref: "/services/pelvic-floor-physiotherapy",
    serviceLabel: "Explore Pelvic Physiotherapy",
  },
  {
    id: "skin-mind",
    label: "Skin, Hair & Mind",
    serviceHref: "/services/dermatology",
    serviceLabel: "Explore Dermatology & Mental Health",
  },
] as const;

type FilterId = (typeof SPECIALTY_FILTERS)[number]["id"];

function matchesFilter(doctor: Doctor, filter: FilterId): boolean {
  if (filter === "all") return true;
  if (filter === "gynae") {
    return doctor.specialty === "Gynaecology" || doctor.specialty === "Obstetrics";
  }
  if (filter === "pregnancy") {
    return (
      doctor.specialty === "Obstetrics" ||
      doctor.slug === "dr-surbhi-sinha" ||
      doctor.slug === "dr-isha-shetty" ||
      doctor.slug === "priyanka-savina" ||
      doctor.slug === "dr-jasmine-flora"
    );
  }
  if (filter === "pcos") {
    return (
      doctor.specialty === "Fertility" ||
      doctor.slug === "dr-surbhi-sinha" ||
      doctor.slug === "dr-smitha-ap" ||
      doctor.slug === "dr-isha-shetty" ||
      doctor.slug === "priyanka-savina" ||
      doctor.slug === "dr-nivetha" ||
      doctor.slug === "dr-sitaram-m"
    );
  }
  if (filter === "pelvic") {
    return (
      doctor.specialty === "Pelvic Health" ||
      doctor.specialty === "Nutrition" ||
      doctor.specialty === "Yoga Therapy"
    );
  }
  return doctor.specialty === "Dermatology" || doctor.specialty === "Mental Health";
}

function toCard(
  doctor: Doctor,
  slot: NextSlot | null,
  feeMeta?: FeeMeta,
  isSyncing = false,
): Card & {
  feeText?: string;
  visitLabel?: string;
  experience?: string;
  hasLiveSlot: boolean;
  slotMode?: "offline" | "online";
  practisesElsewhere: boolean;
} {
  const experienceRaw = doctor.credentials.find((c) => /experience/i.test(c));
  const experience = experienceRaw
    ? experienceRaw
        .replace(/\byears\s+experience/i, "yrs exp")
        .replace(/,\s*\d+\s*in speciality/i, "")
        .trim()
    : undefined;
  const feeText = feeMeta && feeMeta.fee > 0 ? `₹${feeMeta.fee.toLocaleString("en-IN")}` : undefined;
  const visitLabel = feeMeta && feeMeta.durationMinutes > 0 ? `${feeMeta.durationMinutes} min visit` : undefined;
  const metaLine = experience ?? "";

  const cutoutSrc = hasDoctorPhoto(doctor)
    ? (CUTOUT_PATHS[doctor.slug] ?? doctor.image)
    : null;

  return {
    slug: doctor.slug,
    name: doctor.name,
    role: SPECIALTY_TAGS[doctor.slug] ?? doctor.title,
    cutoutSrc,
    initials: initialsOf(doctor.name),
    briefInfo: summarizeBio(doctor),
    metaLine,
    feeText,
    visitLabel,
    experience,
    hasLiveSlot: Boolean(slot),
    slotMode: slot?.mode,
    practisesElsewhere: Boolean(doctor.practisesElsewhere),
    dayLabel: slot
      ? slot.dayLabel
      : doctor.practisesElsewhere
        ? "By request"
        : isSyncing
          ? "Loading..."
          : "Check schedule",
    timeLabel: slot
      ? slot.time
      : doctor.practisesElsewhere
        ? "Enquire"
        : isSyncing
          ? "Live time"
          : "All timings",
    bookingUrl: doctor.bookingUrl ?? "/book",
  };
}

function DoctorCard({ card, eager }: { card: ReturnType<typeof toCard>; eager?: boolean }) {
  const isAvailable = !card.practisesElsewhere;
  const infoBarText = [card.experience, card.briefInfo.replace(/\.$/, "")].filter(Boolean).join(" • ");
  const statusText = card.practisesElsewhere
    ? "By request"
    : card.hasLiveSlot
      ? card.dayLabel === "Today"
        ? "Available today"
        : "Accepting bookings"
      : "Online booking";

  return (
    <li className={styles.item}>
      <article className={styles.card}>
        <div className={styles.cardTopBar}>
          <span className={styles.specialtyLabel}>{card.role}</span>
          <span className={styles.statusPill}>
            <span
              className={isAvailable ? styles.statusDot : styles.statusDotMuted}
              aria-hidden="true"
            />
            <span>{statusText}</span>
          </span>
        </div>

        <div className={styles.profileRow}>
          <Link
            href={`/doctors/${card.slug}`}
            className={styles.portraitStage}
            aria-label={`View profile of ${card.name}`}
          >
            {card.cutoutSrc ? (
              /* eslint-disable-next-line @next/next/no-img-element -- roster portraits serve cutout and live host assets */
              <img
                src={card.cutoutSrc}
                alt={`${card.name}, ${card.role} at MyStree`}
                width={74}
                height={74}
                loading={eager ? "eager" : "lazy"}
                decoding="async"
                className={styles.cutoutImg}
              />
            ) : (
              <span className={styles.monogram} aria-hidden="true">
                {card.initials}
              </span>
            )}
          </Link>

          <div className={styles.profileMeta}>
            <h3 className={styles.name}>
              <Link href={`/doctors/${card.slug}`} className={styles.nameLink}>
                {card.name}
              </Link>
            </h3>
            <p className={styles.feeLine}>
              {card.feeText ? (
                <>
                  <span className={styles.feeAmount}>{card.feeText}</span>
                  {card.visitLabel ? (
                    <span className={styles.feeDuration}> / {card.visitLabel}</span>
                  ) : null}
                </>
              ) : (
                <span className={styles.feeDuration}>{card.visitLabel ?? "In-clinic consultation"}</span>
              )}
            </p>
          </div>
        </div>

        {infoBarText ? <p className={styles.expBar}>{infoBarText}</p> : null}

        <div className={styles.slotSection}>
          <div className={styles.slotHeader}>
            <span className={styles.slotTitle}>Next available slot</span>
            {card.slotMode ? (
              <span className={styles.slotMode}>
                {card.slotMode === "online" ? "Video" : "In clinic"}
              </span>
            ) : null}
          </div>

          <div className={styles.slotPills}>
            <span className={styles.slotPill}>
              <CalendarDays size={13} strokeWidth={1.9} aria-hidden="true" />
              <span>{card.dayLabel}</span>
            </span>
            {card.timeLabel ? (
              <span className={styles.slotPill}>
                <Clock size={13} strokeWidth={1.9} aria-hidden="true" />
                <span>
                  {card.timeLabel}
                  {/\b(?:AM|PM)\b/i.test(card.timeLabel) ? " IST" : ""}
                </span>
              </span>
            ) : null}
          </div>
        </div>

        <div className={styles.cardFooter}>
          <Link
            href={card.bookingUrl}
            className={styles.bookBtn}
            aria-label={`Book appointment with ${card.name} — ${card.dayLabel}, ${card.timeLabel}`}
          >
            Book Appointment
          </Link>
        </div>
      </article>
    </li>
  );
}

export function HomeTeam({
  doctors,
  slotsBySlug = {},
  feesBySlug = {},
}: {
  doctors: readonly Doctor[];
  slotsBySlug?: Record<string, NextSlot | null>;
  feesBySlug?: Record<string, FeeMeta>;
}) {
  const [showAll, setShowAll] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
  const gridId = useId();

  const activeSlugs = useMemo(
    () => doctors.filter((doc) => !doc.practisesElsewhere).map((doc) => doc.slug),
    [doctors],
  );
  const { slots: liveSlots, fees: liveFees, isSyncing } = useLiveAvailabilityBySlug(
    activeSlugs,
    slotsBySlug,
    feesBySlug,
  );

  const orderIndex = new Map<string, number>(
    DISPLAY_ORDER.map((slug, index) => [slug, index]),
  );

  const ordered = [...doctors].sort((a, b) => {
    const idxA = orderIndex.get(a.slug) ?? 999;
    const idxB = orderIndex.get(b.slug) ?? 999;
    return idxA - idxB;
  });

  const filteredDoctors = ordered.filter((doc) => matchesFilter(doc, activeFilter));

  const cards = filteredDoctors.map((doctor) =>
    toCard(
      doctor,
      liveSlots[doctor.slug] ?? slotsBySlug[doctor.slug] ?? null,
      liveFees[doctor.slug] ?? feesBySlug[doctor.slug],
      isSyncing,
    ),
  );

  const isFiltered = activeFilter !== "all";
  const hasMore = !isFiltered && cards.length > INITIAL_VISIBLE;
  const visibleCards = isFiltered || showAll ? cards : cards.slice(0, INITIAL_VISIBLE);
  const hiddenCount = Math.max(0, cards.length - INITIAL_VISIBLE);
  const currentFilter =
    SPECIALTY_FILTERS.find((item) => item.id === activeFilter) ?? SPECIALTY_FILTERS[0];

  return (
    <section className={styles.section} id="doctors" aria-labelledby="team-heading">
      <div className={styles.inner}>
        <header className={styles.head}>
          <p className={styles.sectionEyebrow}>Our clinical team</p>
          <h2 id="team-heading" className={styles.heading}>
            Meet the <em className={styles.accent}>doctors</em> who will care for you.
          </h2>
          <p className={styles.lead}>
            Not sure whom to see? Choose your health concern below to view the right specialists
            and live appointment times at our Indiranagar clinic.
          </p>
        </header>

        <div className={styles.filterWrap}>
          <div className={styles.filterTabs} role="tablist" aria-label="Filter doctors by concern">
            {SPECIALTY_FILTERS.map((filter) => {
              const selected = filter.id === activeFilter;
              return (
                <button
                  key={filter.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={gridId}
                  className={`${styles.filterTab} ${selected ? styles.filterTabActive : ""}`}
                  onClick={() => {
                    setActiveFilter(filter.id);
                    if (filter.id !== "all") setShowAll(false);
                  }}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
          {isFiltered ? (
            <div className={styles.filterHint}>
              <span>
                Showing {cards.length} {cards.length === 1 ? "clinician" : "clinicians"} for{" "}
                {currentFilter.label.toLowerCase()}
              </span>
              <Link href={currentFilter.serviceHref} className={styles.filterServiceLink}>
                <span>{currentFilter.serviceLabel}</span>
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          ) : null}
        </div>

        <ul id={gridId} className={styles.grid}>
          {visibleCards.map((card, index) => (
            <DoctorCard key={card.slug} card={card} eager={index < INITIAL_VISIBLE || isFiltered} />
          ))}
        </ul>

        <div className={styles.foot}>
          {hasMore ? (
            <button
              type="button"
              className={styles.viewMoreBtn}
              aria-expanded={showAll}
              aria-controls={gridId}
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? (
                <>
                  <span>Show less</span>
                  <ChevronUp size={16} aria-hidden="true" />
                </>
              ) : (
                <>
                  <span>Show more doctors ({hiddenCount} more)</span>
                  <ChevronDown size={16} aria-hidden="true" />
                </>
              )}
            </button>
          ) : null}

          <Link href="/doctors" className={styles.all}>
            <span>See all doctors &amp; filter by speciality</span>
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
