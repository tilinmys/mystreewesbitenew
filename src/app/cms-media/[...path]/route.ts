import { CMS_ORIGIN } from "@/lib/cms";
import { freshGet } from "@/lib/cms-http";

/*
 * /cms-media/uploads/website/...  — dashboard uploads (blog covers) served
 * through this site.
 *
 * Why: the backend currently runs on two machines that do not share their
 * upload folders (checked 16 Oct 2026), so any one request for an image
 * 404s about half the time. This route retries until the machine that has
 * the file answers, then serves it with a long cache lifetime: upload names
 * are content hashes, so a given URL never changes. next/image and the
 * article metadata use these URLs (lib/cms.ts, assetUrl).
 *
 * Only paths under uploads/website/ with an image extension are served.
 */

const MAX_ATTEMPTS = 10;
const TYPES: Record<string, string> = {
  webp: "image/webp",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  avif: "image/avif",
  gif: "image/gif",
};

export async function GET(_request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const segments = (await params).path;
  const path = segments.join("/");
  const extension = path.split(".").pop()?.toLowerCase() ?? "";

  if (
    segments[0] !== "uploads" ||
    segments[1] !== "website" ||
    !(extension in TYPES) ||
    segments.some((segment) => !/^[\w.-]+$/.test(segment) || segment === "..")
  ) {
    return new Response("Not found", { status: 404 });
  }

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    // A new connection each time, so retries can reach either backend machine.
    const upstream = await freshGet(`${CMS_ORIGIN}/${path}`).catch(() => null);
    if (upstream && upstream.status === 200) {
      return new Response(new Uint8Array(upstream.body), {
        headers: {
          "Content-Type": TYPES[extension],
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }
  }

  return new Response("Not found", { status: 404, headers: { "Cache-Control": "no-store" } });
}
