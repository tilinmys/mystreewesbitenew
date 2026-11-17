import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

import { DOCTORS_CACHE_TAG } from "@/lib/doctors-repository";

/**
 * Webhook that pushes a backend edit onto the live pages.
 *
 * The team pages are static and revalidate on a timer; this route is what makes
 * an edit appear immediately. Point a Supabase database webhook at
 * `POST /api/revalidate/doctors` for insert, update and delete on `doctors`,
 * and send the shared secret as `x-revalidate-secret`.
 *
 * The secret is required, not optional: without it this endpoint lets anyone on
 * the internet force the origin to re-render on demand. If the variable is not
 * configured the route refuses rather than running unauthenticated.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;

  if (!secret) {
    console.error("[revalidate] REVALIDATE_SECRET is not set; refusing to revalidate.");
    return NextResponse.json({ revalidated: false, reason: "not configured" }, { status: 503 });
  }

  if (request.headers.get("x-revalidate-secret") !== secret) {
    return NextResponse.json({ revalidated: false, reason: "unauthorized" }, { status: 401 });
  }

  /*
   * This Next version requires a cacheLife profile as the second argument.
   * "max" purges the tag outright — a webhook fires because a row actually
   * changed, so there is no reason to keep serving the old roster. (`updateTag`
   * is the Server Action equivalent and is not usable from a route handler.)
   */
  revalidateTag(DOCTORS_CACHE_TAG, "max");

  return NextResponse.json({ revalidated: true, tag: DOCTORS_CACHE_TAG, at: Date.now() });
}
