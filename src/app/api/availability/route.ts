import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

import { getBatchNextSlots, getBookingDoctors, type NextSlot } from "@/lib/booking";
import { getDoctors } from "@/lib/doctors-repository";

export const dynamic = "force-dynamic";

type AvailabilityResponse = {
  updatedAt: string;
  timezone: "IST";
  byId: Record<string, NextSlot | null>;
  bySlug: Record<string, NextSlot | null>;
  feesBySlug: Record<string, { fee: number; durationMinutes: number }>;
};

function parseIds(raw: string | null): number[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((part) => Number(part.trim()))
    .filter((id) => Number.isInteger(id) && id > 0);
}

function parseSlugs(raw: string | null): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((part) => part.trim().toLowerCase())
    .filter(Boolean);
}

/**
 * GET /api/availability
 *
 * Connects server-side to MyStree's live booking backend & clinician database
 * to serve fresh, original next-available date & time slots (IST) and fees.
 *
 * Optional query params:
 *   - doctorIds=2,1,3            Fetch live slots for specific booking IDs
 *   - slugs=dr-smitha-ap,...     Fetch live slots for specific clinician slugs
 *   - fresh=1                    Bypass Next fetch cache for immediate DB lookup
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const requestedIds = parseIds(searchParams.get("doctorIds"));
  const requestedSlugs = parseSlugs(searchParams.get("slugs"));
  const bypassCache = searchParams.get("fresh") === "1";

  const [doctors, bookingRoster] = await Promise.all([getDoctors(), getBookingDoctors()]);
  const bookingById = new Map(bookingRoster.map((doc) => [doc.id, doc]));

  // Map slug <-> bookingId for all active Indiranagar clinicians
  const slugToId = new Map<string, number>();
  const feesBySlug: Record<string, { fee: number; durationMinutes: number }> = {};

  for (const doctor of doctors) {
    const match = doctor.bookingUrl?.match(/appointment\/(\d+)/);
    const bookingId = match ? Number(match[1]) : null;
    if (bookingId && !doctor.practisesElsewhere) {
      slugToId.set(doctor.slug, bookingId);
      const record = bookingById.get(bookingId);
      if (record) {
        feesBySlug[doctor.slug] = {
          fee: record.fee,
          durationMinutes: record.durationMinutes,
        };
      }
    }
  }

  let targetIds: number[] = [];
  if (requestedIds.length > 0 || requestedSlugs.length > 0) {
    const fromSlugs = requestedSlugs
      .map((slug) => slugToId.get(slug))
      .filter((id): id is number => typeof id === "number");
    targetIds = Array.from(new Set([...requestedIds, ...fromSlugs]));
  } else {
    targetIds = Array.from(new Set(slugToId.values()));
  }

  const slotMap = await getBatchNextSlots(targetIds, { bypassCache });

  const byId: Record<string, NextSlot | null> = {};
  for (const [id, slot] of Object.entries(slotMap)) {
    byId[String(id)] = slot;
  }

  const bySlug: Record<string, NextSlot | null> = {};
  for (const [slug, id] of slugToId.entries()) {
    if (id in slotMap) {
      bySlug[slug] = slotMap[id] ?? null;
    }
  }

  const payload: AvailabilityResponse = {
    updatedAt: new Date().toISOString(),
    timezone: "IST",
    byId,
    bySlug,
    feesBySlug,
  };

  return NextResponse.json(payload, {
    status: 200,
    headers: {
      "Cache-Control": bypassCache
        ? "no-store"
        : "public, max-age=30, s-maxage=60, stale-while-revalidate=120",
    },
  });
}

/**
 * POST /api/availability
 *
 * Allows the booking backend or admin dashboard to invalidate cached
 * availability immediately whenever a slot is booked or schedule changes.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ revalidated: false, reason: "not configured" }, { status: 503 });
  }
  if (request.headers.get("x-revalidate-secret") !== secret) {
    return NextResponse.json({ revalidated: false, reason: "unauthorized" }, { status: 401 });
  }

  revalidateTag("booking-availability", "max");
  revalidateTag("booking-doctors", "max");

  return NextResponse.json({
    revalidated: true,
    tags: ["booking-availability", "booking-doctors"],
    at: new Date().toISOString(),
  });
}
