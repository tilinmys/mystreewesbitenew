import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

import { BLOG_CACHE_TAG } from "@/lib/cms";

/**
 * Webhook that shows a dashboard blog edit on the site immediately.
 *
 * Without it, posts still update on their own within five minutes
 * (lib/cms.ts, BLOG_REVALIDATE_SECONDS). To make publishing instant, have
 * the admin dashboard call `POST /api/revalidate/blog` after a post is
 * published, edited or unpublished, with the shared secret in the
 * `x-revalidate-secret` header, as the doctors webhook does.
 *
 * The secret is required: without it anyone could force the origin to
 * re-render on demand. If it is not configured the route refuses.
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

  // expire: 0 — the next visitor gets the new post, not the cached one.
  revalidateTag(BLOG_CACHE_TAG, { expire: 0 });
  revalidatePath("/blog");
  revalidatePath("/blog/[slug]", "page");

  return NextResponse.json({ revalidated: true, tag: BLOG_CACHE_TAG, at: Date.now() });
}
