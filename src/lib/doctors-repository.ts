import { cleanAbout, getBookingDoctors, type BookingDoctor } from "./booking";
import { SPECIALTIES, seedDoctors, type Doctor, type Specialty } from "./doctors";

/**
 * The single read path for clinician records.
 *
 * Editing a row in the backend must change the cards, so every page reads
 * through `getDoctors()` rather than importing the seed. The backend is
 * Supabase's REST endpoint, called with plain `fetch` — no client library, so
 * the request participates in the Next data cache like any other fetch.
 *
 * Server-side only. It reads `process.env` and is imported exclusively by
 * server components and the revalidation route; the `server-only` package is
 * not a dependency here, so keep it that way by passing DATA to client
 * components as props rather than importing this module from one.
 *
 * Three properties this has to hold:
 *
 *  1. It never breaks the site. A missing table, an expired key, a network
 *     failure or a malformed row falls back to the committed seed and logs.
 *     A clinic's team page going blank because a database hiccuped is a worse
 *     failure than showing last-known-good records.
 *  2. It never renders unverified content. Rows are validated field by field;
 *     anything that does not typecheck is dropped and named in the log, so a
 *     bad edit shows up as a missing card rather than as a broken claim on a
 *     page about real clinicians.
 *  3. It is cached and tagged. Pages are static; the `doctors` cache tag is
 *     what the revalidation route invalidates when a row changes.
 */

const TABLE = "doctors";
export const DOCTORS_CACHE_TAG = "doctors";

/** Fall back to the seed after this long even without a webhook. */
const REVALIDATE_SECONDS = 300;

/** Shape of a backend row before validation — every field is unknown. */
type RawRow = Record<string, unknown>;

function backendConfig() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  // The anon key is correct here: this table is world-readable published
  // content behind a read-only RLS policy. A service-role key would grant this
  // request write access it has no use for.
  const key = process.env.SUPABASE_ANON_KEY;
  return url && key ? { url, key } : null;
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function asStringArray(value: unknown): readonly string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const items = value.map(asString).filter((item): item is string => Boolean(item));
  return items.length ? items : undefined;
}

function asSpecialty(value: unknown): Specialty | undefined {
  return SPECIALTIES.find((specialty) => specialty === value);
}

/**
 * Validate one row. Returns null — never a partial record — when a required
 * field is missing or the specialty is not one the filter row knows about.
 */
function toDoctor(row: RawRow): Doctor | null {
  const slug = asString(row.slug);
  const name = asString(row.name);
  const title = asString(row.title);
  const category = asString(row.category);
  const image = asString(row.image);
  const bio = asString(row.bio);
  const specialty = asSpecialty(row.specialty);
  const credentials = asStringArray(row.credentials);

  if (!slug || !name || !title || !category || !image || !bio || !specialty || !credentials) {
    return null;
  }

  const seed = seedDoctors.find((d) => d.slug === slug);
  return {
    slug,
    category,
    name,
    title,
    specialty,
    image,
    bio,
    credentials,
    background: asString(row.background) ?? seed?.background,
    languages: asStringArray(row.languages) ?? seed?.languages,
    experience: asStringArray(row.experience) ?? seed?.experience,
    actionLabel: asString(row.action_label) ?? seed?.actionLabel,
    bookingUrl: asString(row.booking_url) ?? seed?.bookingUrl,
    founder: row.founder === true || seed?.founder === true,
    practisesElsewhere: row.practises_elsewhere === true,
    stories: seed?.stories,
  };
}

/**
 * Fetch a single clinician by stable slug.
 */
export async function getDoctorBySlug(slug: string): Promise<Doctor | undefined> {
  const doctors = await getDoctors();
  return doctors.find((d) => d.slug === slug);
}

/**
 * Clinician records, backend-first with the committed seed as the fallback.
 *
 * Safe to call from several components in one render: the underlying fetch is
 * deduped by the Next data cache, so this costs one request per revalidation
 * window, not one per caller.
 */
export async function getDoctors(): Promise<readonly Doctor[]> {
  const [base, roster] = await Promise.all([getRecordedDoctors(), getBookingDoctors()]);
  return mergeBookingRoster(base, roster);
}

/* ------------------------------------------------ booking-system roster */

/*
 * The admin dashboard adds clinicians to the booking system
 * (my-stree.com/api/doctors), so the site's roster follows it:
 *
 *   - clinicians with a written profile here (seed / Supabase) keep it, and
 *     take their booking link from the live system (ids change; Dr. Jasmine
 *     Flora's record still pointed at an old one)
 *   - everyone else in the booking system is added, built only from their
 *     booking record: name, speciality, photo, degree, experience, languages
 *     and the profile text with rating lines removed (cleanAbout)
 *
 * If the booking system cannot be reached, the written profiles still show.
 */

const TITLE_PREFIX = /^(dr|ms|mrs|mr|miss)\.?\s+/i;

/** "Dr. Smitha A.P." and "Smitha A P" both to "smithaap". */
function nameKey(name: string) {
  return name.replace(TITLE_PREFIX, "").toLowerCase().replace(/[^a-z]/g, "");
}

function slugFor(name: string) {
  const isDoctor = /^dr\.?\s/i.test(name);
  const base = name
    .replace(TITLE_PREFIX, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return isDoctor ? `dr-${base}` : base;
}

function specialtyFor(speciality: string): Specialty | undefined {
  const s = speciality.toLowerCase();
  if (/dermat/.test(s)) return "Dermatology";
  if (/psycholog|psychiatr|mental/.test(s)) return "Mental Health";
  if (/yoga/.test(s)) return "Yoga Therapy";
  if (/radiolog|sonolog|imaging/.test(s)) return "Radiology";
  if (/urolog|androlog/.test(s)) return "Andrology";
  if (/physio/.test(s)) return "Pelvic Health";
  if (/nutrition|diet/.test(s)) return "Nutrition";
  if (/fertil|reproductive/.test(s)) return "Fertility";
  if (/gyn|obstet/.test(s)) return /obstet/.test(s) ? "Obstetrics" : "Gynaecology";
  return undefined;
}

/*
 * Public-communication guard for text typed into the booking dashboard (NMC
 * Guidelines on Ethical Advertising 2026, 8.1(iii) and (ix); CCPA). Role
 * titles are plain: a badge such as "Expert" or a "... Specialist" label that
 * is not a recorded qualification is cut back to the role. Any sentence that
 * praises the clinician (awards, "best", "renowned", "leading") is left out.
 */
const PLAIN_TITLES: Record<string, string> = {
  "high risk obstetrician and fertility expert": "High-Risk Obstetrician & Gynaecologist",
  "gynecologist & fertility specialist, obstetrician": "Obstetrician & Gynaecologist",
  "gynaecologist & fertility specialist, obstetrician": "Obstetrician & Gynaecologist",
  "infertility specialist & reproductive endocrinologist": "Reproductive Endocrinologist & Gynaecologist",
  "consultant psychologist & women's mental health specialist": "Consultant Psychologist",
  "obstetrics and gynaecology physiotherapy": "Obstetric & Gynaecological Physiotherapist",
};

function plainTitle(raw: string) {
  const title = raw.replace(/Gynecolog/g, "Gynaecolog").replace(/\s+/g, " ").trim();
  const mapped = PLAIN_TITLES[title.toLowerCase()];
  if (mapped) return mapped;
  return (
    title
      .replace(/\s*(?:&|and|,)\s*[A-Za-z' ]*\b(?:Expert|Specialist)\b/gi, "")
      .replace(/\b(?:In)?[Ff]ertility\s+(?:Expert|Specialist)\b/gi, "")
      .replace(/\b(?:Expert|Specialist)\b/gi, "")
      .replace(/\s{2,}/g, " ")
      .replace(/^[,\s&]+|[,\s&]+$/g, "")
      .trim() || "Clinician"
  );
}

const SELF_PRAISE = /\b(best|award(?:ed|s)?|renowned|leading|top[- ]rated|unmatched|world[- ]class|expert in|no\.? ?1)\b/i;

function plainAbout(paragraph: string) {
  return paragraph
    .split(/(?<=[.!?])\s+(?=[A-Z])/)
    .filter((sentence) => !SELF_PRAISE.test(sentence))
    .join(" ")
    .trim();
}

function doctorFromBooking(record: BookingDoctor): Doctor | null {
  const specialty = specialtyFor(record.speciality);
  if (!specialty) {
    console.error(`[doctors] no site specialty for "${record.speciality}" (${record.name}); not listed.`);
    return null;
  }
  const title = plainTitle(record.speciality);
  const paragraphs = cleanAbout(record.about)
    .split(/\n{2,}/)
    .map((paragraph) => plainAbout(paragraph.replace(/\s+/g, " ").trim()))
    .filter(Boolean);
  const credentials = credentialsFromBooking(record);

  return {
    slug: slugFor(record.name),
    category: title,
    name: record.name,
    title,
    specialty,
    image: record.imageUrl ?? "/brand/mystree-logo.png",
    bio: paragraphs[0] ?? `${record.name} is a ${title.toLowerCase()} at MyStree in Indiranagar, Bengaluru.`,
    background: paragraphs.slice(1).join(" ") || undefined,
    credentials,
    languages: record.languages.length ? record.languages : undefined,
    bookingUrl: record.bookingUrl,
  };
}

/**
 * One qualification, experience and registration line per clinician, taken
 * from the booking record the clinic maintains, so every card on the site
 * states the same facts (NMC guidelines 2026, Expl. III/IV; CCPA accuracy).
 * A line the record does not hold is left out, never filled in.
 */
function credentialsFromBooking(record: BookingDoctor): string[] {
  const experience = record.experienceYears
    ? `${record.experienceYears} experience`
    : "";
  const registration = record.registrationNumber ? `Reg. No. ${record.registrationNumber}` : "";
  return [record.degree, experience, registration].filter(Boolean);
}

function mergeBookingRoster(base: readonly Doctor[], roster: readonly BookingDoctor[]): readonly Doctor[] {
  if (!roster.length) return base;
  const byKey = new Map(roster.map((record) => [nameKey(record.name), record]));

  // Written profiles keep their own words, but their qualification,
  // experience and registration come from the booking record.
  const recorded = base.map((doctor) => {
    const live = byKey.get(nameKey(doctor.name));
    if (!live) return doctor;
    const credentials = credentialsFromBooking(live);
    return {
      ...doctor,
      bookingUrl: live.bookingUrl,
      ...(credentials.length ? { credentials, experience: undefined } : {}),
    };
  });

  const known = new Set(base.map((doctor) => nameKey(doctor.name)));
  const added = roster
    .filter((record) => !known.has(nameKey(record.name)))
    .sort((a, b) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999) || a.id - b.id)
    .map(doctorFromBooking)
    .filter((doctor): doctor is Doctor => doctor !== null);

  return [...recorded, ...added];
}

/** The written profiles: Supabase when configured, otherwise the seed. */
async function getRecordedDoctors(): Promise<readonly Doctor[]> {
  const config = backendConfig();
  if (!config) return seedDoctors;

  try {
    const response = await fetch(
      `${config.url}/rest/v1/${TABLE}?select=*&published=eq.true&order=sort_order.asc`,
      {
        headers: {
          apikey: config.key,
          Authorization: `Bearer ${config.key}`,
          Accept: "application/json",
        },
        next: { revalidate: REVALIDATE_SECONDS, tags: [DOCTORS_CACHE_TAG] },
      },
    );

    if (!response.ok) {
      console.error(
        `[doctors] backend responded ${response.status}; serving the committed seed.`,
      );
      return seedDoctors;
    }

    const rows: unknown = await response.json();
    if (!Array.isArray(rows)) {
      console.error("[doctors] backend did not return an array; serving the committed seed.");
      return seedDoctors;
    }

    const doctors: Doctor[] = [];
    for (const row of rows as RawRow[]) {
      const doctor = toDoctor(row);
      if (doctor) doctors.push(doctor);
      else console.error(`[doctors] dropped an invalid row: ${JSON.stringify(row).slice(0, 200)}`);
    }

    // An empty result is far more likely to be a misconfigured table or an RLS
    // policy denying reads than a clinic with no clinicians.
    if (!doctors.length) {
      console.error("[doctors] backend returned no usable rows; serving the committed seed.");
      return seedDoctors;
    }

    return doctors;
  } catch (error) {
    console.error("[doctors] backend unreachable; serving the committed seed.", error);
    return seedDoctors;
  }
}
