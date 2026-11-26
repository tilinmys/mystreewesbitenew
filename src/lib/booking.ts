/**
 * Live data from the MyStree booking system (my-stree.com/booking), read on
 * the server for the "Book with a specialist" cards on service pages.
 *
 * Endpoints (public, read-only, the same ones the booking app calls):
 *   GET /api/doctors                                     clinicians, fees, degrees
 *   GET /api/availability?doctor_id=&date=YYYY-MM-DD&mode=offline
 *                                                        [{ time: "02:00 PM", is_available }]
 *
 * Cached for five minutes (the repository's revalidation pattern), so a page
 * shows a slot that is at most five minutes old; times already past are
 * dropped at render. If the booking system is unreachable the cards still
 * render, without a time, and link to the booking page.
 */

const BOOKING_ORIGIN = "https://my-stree.com";
const REVALIDATE_SECONDS = 300;
const SEARCH_DAYS = 14;
/** A slot this close to now is not offered: there is no time to travel. */
const LEAD_MINUTES = 30;

export type BookingDoctor = {
  id: number;
  name: string;
  speciality: string;
  degree: string;
  /** Total experience, e.g. "23 years"; null when the record has none. */
  experienceYears: string | null;
  /** Years as a specialist, e.g. "15 years", when the record states it. */
  specialistYears: string | null;
  /** Medical council registration number as recorded; null when the record has none. */
  registrationNumber: string | null;
  fee: number;
  durationMinutes: number;
  imageUrl: string | null;
  languages: string[];
  bookingUrl: string;
  /** Profile text as written in the dashboard. Show it only via cleanAbout(). */
  about: string;
  /** The dashboard's display order; null when unset. */
  displayOrder: number | null;
};

export type NextSlot = {
  /** "Today", "Tomorrow" or "Sat 10 Oct". */
  dayLabel: string;
  /** "2:00 PM". */
  time: string;
  /** "YYYY-MM-DD" in IST when available. */
  isoDate?: string;
  /** Consultation mode returned by the booking backend. */
  mode?: "offline" | "online";
};

type RawDoctor = {
  id?: unknown;
  name?: unknown;
  speciality?: unknown;
  degree?: unknown;
  experience?: unknown;
  fees?: unknown;
  duration_minutes?: unknown;
  image_url?: unknown;
  about?: unknown;
  is_on_call_only?: unknown;
  display_order?: unknown;
  registration_number?: unknown;
};

type RawSlot = { time?: unknown; is_available?: unknown };

const text = (value: unknown) => (typeof value === "string" ? value.trim() : "");

/*
 * The booking system's free text is written by hand and varies card to card.
 * These normalise it to one house style so every card reads the same, without
 * changing what it says.
 */

/** "MS - Obstetrics & Gynecology" to "MS (Obstetrics & Gynaecology)"; drops repeats. */
function normaliseDegree(raw: string) {
  const parts = raw
    .split(",")
    .map((part) =>
      part
        .trim()
        .replace(/\s+-\s+(.+)$/, " ($1)")
        .replace(/Gynecology/g, "Gynaecology"),
    )
    .filter(Boolean);
  // "Fellowship in Reproductive Medicine" repeats "FNB (Reproductive Medicine)".
  const unique = parts.filter((part, index) => {
    const fellowship = part.match(/^Fellowship in (.+)$/i);
    if (!fellowship) return true;
    const subject = `(${fellowship[1].toLowerCase()})`;
    return !parts.some((other, j) => j !== index && other.toLowerCase().includes(subject));
  });
  return unique.join(", ");
}

/** "24 Years of Experience" / "13 Years (9 years as specialist)" / "5+ Years"
 *  to { total: "24 years" } / { total: "13 years", specialist: "9 years" } /
 *  { total: "5+ years" }. A "+" is kept only where the source has one. */
function parseExperience(raw: string): { total: string | null; specialist: string | null } {
  const total = raw.match(/(\d+)\s*(\+?)\s*years?/i);
  if (!total) return { total: null, specialist: null };
  const specialist = raw.match(/\((\d+)\s*(\+?)\s*years?\s*as\s*(?:a\s*)?specialist\)/i);
  return {
    total: `${total[1]}${total[2]} years`,
    specialist: specialist ? `${specialist[1]}${specialist[2]} years` : null,
  };
}

/** "Languages Known:\nEnglish, Kannada, Hindi." from the booking profile text. */
function languagesFrom(about: string) {
  const match = about.match(/Languages(?: Known)?:\**\s*\n?\s*([^\n]+)/i);
  if (!match) return [];
  return match[1]
    .replace(/[.*]/g, "")
    .split(/,|\band\b/)
    .map((item) => item.trim())
    .filter(Boolean);
}

/**
 * The dashboard's profile text without what the site may not show: rating
 * and "verified" lines (NMC notice, 06.10.2026), the languages line (shown
 * separately), markdown emphasis and emoji. Paragraph breaks are kept.
 */
export function cleanAbout(about: string) {
  return about
    .split(/\r?\n/)
    .filter((line) => !/satisfaction|ratings?\b|reviews?\b|verified|languages?(?: known)?:/i.test(line))
    .map((line) =>
      line
        .replace(/\*\*/g, "")
        .replace(/[⭐✅]|[\u{1F300}-\u{1FAFF}]/gu, "")
        .trim(),
    )
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

async function fetchRoster(): Promise<unknown> {
  // A few tries: one dropped connection should not hide clinicians for a
  // whole five-minute cache window.
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch(`${BOOKING_ORIGIN}/api/doctors`, {
        signal: AbortSignal.timeout(5000),
        next: { revalidate: REVALIDATE_SECONDS, tags: ["booking-doctors"] },
      });
      if (response.ok) return await response.json();
    } catch {
      // try again
    }
  }
  return null;
}

export async function getBookingDoctors(): Promise<BookingDoctor[]> {
  try {
    const rows = await fetchRoster();
    if (!Array.isArray(rows)) return [];

    return (rows as RawDoctor[])
      .filter((row) => typeof row.id === "number" && text(row.name))
      .map((row) => {
        const image = text(row.image_url);
        return {
          id: row.id as number,
          // The booking system writes "Dr Isha Shetty" and "Dr. Smitha A.P.";
          // normalise to the site's "Dr. Name" form.
          name: text(row.name).replace(/^Dr\.?\s+/, "Dr. ").replace(/\.$/, ""),
          speciality: text(row.speciality),
          degree: normaliseDegree(text(row.degree)),
          ...(() => {
            const parsed = parseExperience(text(row.experience));
            return { experienceYears: parsed.total, specialistYears: parsed.specialist };
          })(),
          registrationNumber: text(row.registration_number).replace(/\s+/g, " ") || null,
          fee: typeof row.fees === "number" ? row.fees : 0,
          durationMinutes: typeof row.duration_minutes === "number" ? row.duration_minutes : 15,
          imageUrl: image ? `${BOOKING_ORIGIN}${encodeURI(image)}` : null,
          languages: languagesFrom(text(row.about)),
          bookingUrl: `${BOOKING_ORIGIN}/booking/appointment/${row.id}`,
          about: text(row.about),
          displayOrder: typeof row.display_order === "number" ? row.display_order : null,
        };
      });
  } catch {
    return [];
  }
}

/* ---------------------------------------------------------- IST time */

const IST_OFFSET_MINUTES = 330;

/** The current date and minute-of-day in Bengaluru, whatever the server's zone. */
function istNow() {
  const ist = new Date(Date.now() + IST_OFFSET_MINUTES * 60_000);
  return {
    year: ist.getUTCFullYear(),
    month: ist.getUTCMonth(),
    day: ist.getUTCDate(),
    minutes: ist.getUTCHours() * 60 + ist.getUTCMinutes(),
  };
}

function istDate(offsetDays: number) {
  const now = istNow();
  return new Date(Date.UTC(now.year, now.month, now.day + offsetDays));
}

/** "02:15 PM" to minutes after midnight. */
function minutesOf(time: string) {
  const match = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;
  let hours = Number(match[1]) % 12;
  if (match[3].toUpperCase() === "PM") hours += 12;
  return hours * 60 + Number(match[2]);
}

function dayLabel(offsetDays: number, date: Date) {
  if (offsetDays === 0) return "Today";
  if (offsetDays === 1) return "Tomorrow";
  return date.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" });
}

async function fetchDayFirstSlot(
  offset: number,
  nowMinutes: number,
  doctorId: number,
  mode: "offline" | "online" = "offline",
  bypassCache = false,
): Promise<NextSlot | null> {
  const date = istDate(offset);
  const iso = date.toISOString().slice(0, 10);

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await fetch(
        `${BOOKING_ORIGIN}/api/availability?doctor_id=${doctorId}&date=${iso}&mode=${mode}`,
        bypassCache
          ? {
              signal: AbortSignal.timeout(6500),
              cache: "no-store",
            }
          : {
              signal: AbortSignal.timeout(6500),
              next: { revalidate: REVALIDATE_SECONDS, tags: ["booking-availability"] },
            },
      );
      if (!response.ok) return null;
      const slots: unknown = await response.json();
      if (!Array.isArray(slots)) return null;

      for (const slot of slots as RawSlot[]) {
        const time = text(slot.time);
        if (slot.is_available !== true || !time) continue;
        const minutes = minutesOf(time);
        if (minutes === null) continue;
        if (offset === 0 && minutes < nowMinutes + LEAD_MINUTES) continue;
        return {
          dayLabel: dayLabel(offset, date),
          time: time.replace(/^0/, ""),
          isoDate: iso,
          mode,
        };
      }
      return null;
    } catch {
      if (attempt === 1) return null;
    }
  }
  return null;
}

/**
 * The first bookable slot in the next two weeks (checks in-clinic first,
 * falling back to video/online slots for teleconsult clinicians), or null.
 * Scans in tight 4-day waves so upstream connections stay reliable under load.
 */
export async function getNextSlot(
  doctorId: number,
  options?: { bypassCache?: boolean },
): Promise<NextSlot | null> {
  const nowMinutes = istNow().minutes;
  const bypass = options?.bypassCache === true;

  for (const mode of ["offline", "online"] as const) {
    for (let start = 0; start < SEARCH_DAYS; start += 4) {
      const count = Math.min(4, SEARCH_DAYS - start);
      const wave = await Promise.all(
        Array.from({ length: count }, (_, idx) =>
          fetchDayFirstSlot(start + idx, nowMinutes, doctorId, mode, bypass),
        ),
      );
      const hit = wave.find((slot) => slot !== null);
      if (hit) return hit;
    }
  }
  return null;
}

/**
 * Resolve next available slots for multiple doctor IDs with bounded concurrency
 * (4 doctors at a time) so batch API and SSR requests never saturate upstream sockets.
 */
export async function getBatchNextSlots(
  doctorIds: readonly number[],
  options?: { bypassCache?: boolean },
): Promise<Record<number, NextSlot | null>> {
  const uniqueIds = Array.from(new Set(doctorIds.filter((id) => Number.isFinite(id) && id > 0)));
  const out: Record<number, NextSlot | null> = {};
  const CONCURRENCY = 4;

  for (let i = 0; i < uniqueIds.length; i += CONCURRENCY) {
    const chunk = uniqueIds.slice(i, i + CONCURRENCY);
    const results = await Promise.all(
      chunk.map(async (id) => [id, await getNextSlot(id, options)] as const),
    );
    for (const [id, slot] of results) {
      out[id] = slot;
    }
  }
  return out;
}
