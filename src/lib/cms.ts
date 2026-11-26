import { unstable_cache } from "next/cache";

import type { ArticleItem } from "@/lib/blog-articles";
import { freshGet } from "@/lib/cms-http";

/*
 * The MyStree admin dashboard's blog, read from its public API.
 *
 *   GET {CMS}/website/blogs          published posts (list)
 *   GET {CMS}/website/blogs/{slug}   one post with its content blocks
 *
 * The backend is the one behind my-stree.com/api (Fly.io). It is called
 * directly, not through my-stree.com/api, so the blog keeps working
 * whichever domain the site is served from. Posts are cached for five
 * minutes (ISR): something published in the dashboard appears on the site
 * within that time without a redeploy. POST /api/revalidate/blog (see
 * app/api/revalidate/blog/route.ts) refreshes immediately.
 *
 * Dashboard text is rich-text HTML with the editor's own fonts, sizes and
 * colours. sanitizeHtml() keeps the words, links, emphasis and lists and
 * drops the styling, so articles use the MyStree type and palette
 * (color.md) and no markup from the editor can reach the page unchecked.
 */

export const CMS_ORIGIN = (process.env.CMS_API_URL ?? "https://mystree-backend.fly.dev").replace(/\/+$/, "");
export const BLOG_REVALIDATE_SECONDS = 300;
export const BLOG_CACHE_TAG = "blog";

// ------------------------------------------------------------------ types

export type CmsFact = { value?: string; description?: string };
export type CmsFaqItem = { question?: string; answer?: string };
export type CmsSide = { label?: string; text?: string; color?: string };

export type CmsBlock =
  | { id: string; order: number; type: "heading"; text: string }
  | { id: string; order: number; type: "paragraph"; text: string }
  | { id: string; order: number; type: "pullquote"; text: string; style?: string }
  | { id: string; order: number; type: "factstrip"; label?: string; facts?: CmsFact[] }
  | { id: string; order: number; type: "comparisonboxes"; left?: CmsSide; right?: CmsSide }
  | { id: string; order: number; type: "faq"; sectionTitle?: string; items?: CmsFaqItem[] }
  | { id: string; order: number; type: "cta"; heading?: string; body?: string; buttonText?: string; buttonUrl?: string }
  | { id: string; order: number; type: "doctorprofile"; doctorId?: number | string; customBio?: string };

export type CmsSeo = { metaTitle?: string; metaDescription?: string; keywords?: string };

export type CmsPost = {
  id: string | number;
  slug: string;
  title: string;
  excerpt?: string | null;
  cover_image_url?: string | null;
  cover_image_medium_url?: string | null;
  author_name?: string | null;
  published_at?: string | null;
  updated_at?: string | null;
  is_published?: boolean;
  hero_subtitle?: string | null;
  hero_label?: string | null;
  blocks?: CmsBlock[] | null;
  seo?: CmsSeo | null;
  reading_time_minutes?: number | null;
};

// ------------------------------------------------------------------ fetch

/*
 * The backend currently answers from two versions (checked 16 Oct 2026):
 * about half of all responses come without `blocks`, `seo`, `hero_label`
 * and reading time — 12 fields instead of 18 — for the list and for single
 * posts alike. Until that is fixed on the backend, requests are retried
 * (uncached) until a complete answer arrives, and only that validated
 * result is cached, for five minutes under the "blog" tag. If no complete
 * answer arrives, an error is thrown, which is never cached: during
 * revalidation Next keeps serving the last good page, and the next visit
 * tries again.
 */
const MAX_ATTEMPTS = 5;
const hasBlocks = (post: Partial<CmsPost> | null | undefined) => Array.isArray(post?.blocks);
const CACHE = { revalidate: BLOG_REVALIDATE_SECONDS, tags: [BLOG_CACHE_TAG] };

class NotFound extends Error {}

async function fetchComplete<T>(path: string, isComplete: (data: T) => boolean): Promise<T> {
  let lastError: unknown = null;
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    try {
      // A new connection each time, so retries can reach either backend machine.
      const response = await freshGet(`${CMS_ORIGIN}${path}`);
      if (response.status === 404) throw new NotFound(path);
      if (response.status < 200 || response.status >= 300) throw new Error(`CMS ${response.status} for ${path}`);
      const data = JSON.parse(response.body.toString("utf8")) as T;
      if (isComplete(data)) return data;
      lastError = new Error(`CMS answered ${path} without content`);
    } catch (error) {
      if (error instanceof NotFound) throw error;
      lastError = error;
    }
  }
  throw new Error(`[cms] no complete answer for ${path} after ${MAX_ATTEMPTS} attempts: ${String(lastError)}`);
}

const loadPosts = unstable_cache(
  () => fetchComplete<CmsPost[]>("/website/blogs", (posts) => Array.isArray(posts) && posts.every(hasBlocks)),
  ["cms-posts"],
  CACHE,
);

const loadPost = unstable_cache(
  async (slug: string) => {
    try {
      return await fetchComplete<CmsPost>(`/website/blogs/${encodeURIComponent(slug)}`, hasBlocks);
    } catch (error) {
      if (error instanceof NotFound) return null;
      throw error;
    }
  },
  ["cms-post"],
  CACHE,
);

/*
 * Site-supplied cover photographs (24 Oct 2026). The covers uploaded for these
 * posts were illustrated graphics with text baked in; these are humanised
 * photographs in the site's documentary style, with descriptive filenames.
 * A post listed here shows the local photo wherever its cover appears (blog
 * index, slider, article, Open Graph, structured data). Posts not listed keep
 * the cover uploaded in the admin dashboard; to use a new dashboard cover for
 * one of these posts, remove its entry.
 */
const LOCAL_COVERS: Record<string, string> = {
  "pregnancy-after-35-prepare-dont-panic": "/images/blog/getting-pregnant-after-35-bengaluru.webp",
  "perimenopause-symptoms-age-40": "/images/blog/perimenopause-symptoms-in-your-40s.webp",
  "birth-doula-guide-bangalore": "/images/blog/birth-doula-support-bangalore.webp",
  "egg-freezing-india-guide": "/images/blog/egg-freezing-in-india-guide.webp",
};

function withLocalCover<T extends CmsPost>(post: T): T {
  const local = LOCAL_COVERS[post.slug];
  return local ? { ...post, cover_image_url: local, cover_image_medium_url: local } : post;
}

/*
 * Posts the site does not show. Egg freezing is an ART service: it is not
 * described until the clinic holds ART Act registration (Growthamp review
 * 13 Nov 2026, item 1). The post stays in the CMS and returns 404 here.
 */
const WITHHELD = new Set(["egg-freezing-india-guide"]);

/*
 * Exact-phrase corrections applied to CMS text until the posts are edited in
 * the admin dashboard (NMC Guidelines on Ethical Advertising 2026; CCPA):
 * no "expert" titles, no superlatives, no blanket safety or efficacy claims.
 */
const CORRECTIONS: readonly (readonly [string, string])[] = [
  ["high-risk obstetrician and fertility expert", "high-risk obstetrician"],
  [
    "Hormone therapy has carried an unfair reputation since a single 2002 study was widely misreported. Two decades of follow-up research have substantially rehabilitated it: for most",
    "Views on hormone therapy have changed since a 2002 study. Current guidance is that for many",
  ],
  [
    "the benefits of modern hormone therapy for troubling symptoms outweigh the risks. That is the position of major menopause societies worldwide today.",
    "the benefits of hormone therapy for troubling symptoms can outweigh the risks. Whether it suits you depends on your own health history, which your gynaecologist goes through with you.",
  ],
  [
    "modern hormone therapy is considered safe and is the most effective treatment for flushes, night sweats, and related sleep disruption.",
    "hormone therapy is one of the treatment options for flushes, night sweats, and related sleep disruption, with benefits and risks that depend on your health.",
  ],
  ["What is the best treatment for perimenopause mood swings?", "What are the treatment options for perimenopause mood swings?"],
  [
    "The women who do best are not the ones with the mildest symptoms. They are the ones who came in early, got the mimics ruled out, and made a plan.",
    "Coming in early, ruling out conditions that look similar, and making a plan with your doctor all help.",
  ],
  ["best gynecologist for hormonal imbalance Bangalore, ", ""],
  ["The best results come from preparing before conception", "Preparing before conception helps"],
  ["the Doctor-Doula-Dad trio is the best support system you can build", "the Doctor-Doula-Dad trio can be a strong support system"],
  ["the Doctor-Doula-Dad trio is the best</span><br />support system you can build", "the Doctor-Doula-Dad trio can be a strong</span><br />support system"],
  ["the Doctor-Doula-Dad trio is the best birth support you can build", "the Doctor-Doula-Dad trio can be a strong birth support"],
  [", because the best guidance always comes from someone who truly understands where you are standing", ""],
];

function corrected<T>(value: T): T {
  if (typeof value === "string") {
    let text: string = value;
    for (const [from, to] of CORRECTIONS) text = text.split(from).join(to);
    return text as T;
  }
  if (Array.isArray(value)) return value.map(corrected) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, corrected(item)])) as T;
  }
  return value;
}

/** Published posts, newest first. Empty when the backend cannot be reached. */
export async function getPosts(): Promise<CmsPost[]> {
  let posts: CmsPost[] = [];
  try {
    posts = await loadPosts();
  } catch (error) {
    console.error(error);
  }
  return posts
    .filter((post) => post.is_published !== false && post.slug && !WITHHELD.has(post.slug))
    .map(corrected)
    .map(withLocalCover)
    .sort((a, b) => Date.parse(b.published_at ?? "") - Date.parse(a.published_at ?? ""));
}

/**
 * One published post with its content, or null if there is no such post.
 * Throws if the backend never returned the content (see above).
 */
export async function getPost(slug: string): Promise<CmsPost | null> {
  if (!/^[a-z0-9-]+$/i.test(slug) || WITHHELD.has(slug)) return null;
  const post = await loadPost(slug);
  return post && post.is_published !== false ? withLocalCover(corrected(post)) : null;
}

/** Posts for a service page's reading list, in the order given; missing ones are skipped. */
export async function getArticles(slugs: readonly string[]): Promise<ArticleItem[]> {
  if (slugs.length === 0) return [];
  const posts = await getPosts();
  return slugs.flatMap((slug) => {
    const post = posts.find((item) => item.slug === slug);
    return post ? [toArticle(post)] : [];
  });
}

// ------------------------------------------------------------------ text

const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', "#39": "'", "#x27": "'", nbsp: " " };

export function decodeEntities(text: string) {
  return text.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (match, code: string) => {
    const lower = code.toLowerCase();
    if (lower in ENTITIES) return ENTITIES[lower];
    if (lower.startsWith("#x")) return String.fromCodePoint(parseInt(lower.slice(2), 16));
    if (lower.startsWith("#")) return String.fromCodePoint(parseInt(lower.slice(1), 10));
    return match;
  });
}

/** Plain text from dashboard HTML: line breaks become spaces, tags go. */
export function plainText(html: string | null | undefined) {
  if (!html) return "";
  return decodeEntities(html.replace(/<br\s*\/?>/gi, " ").replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

const ALLOWED_TAGS = new Set(["p", "br", "strong", "b", "em", "i", "u", "ul", "ol", "li", "a"]);
const SAFE_HREF = /^(https?:\/\/|mailto:|tel:|\/(?!\/)|#)/i;

/**
 * Keep words, links, emphasis and lists; drop every attribute except a
 * safe href, and every other tag (its text stays). Script and style
 * contents are removed outright.
 */
export function sanitizeHtml(html: string | null | undefined) {
  if (!html) return "";
  return html
    .replace(/<(script|style|iframe|object|embed)[\s\S]*?<\/\1>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(\/?)([a-z][a-z0-9]*)\b([^>]*)>/gi, (_match, slash: string, rawTag: string, attrs: string) => {
      const tag = rawTag.toLowerCase();
      if (tag === "div") return slash ? "" : " ";
      if (!ALLOWED_TAGS.has(tag)) return "";
      if (tag === "b") return `<${slash}strong>`;
      if (tag === "i") return `<${slash}em>`;
      if (tag !== "a" || slash) return `<${slash}${tag}>`;
      const href = attrs.match(/\bhref\s*=\s*("([^"]*)"|'([^']*)')/i);
      const url = decodeEntities(href?.[2] ?? href?.[3] ?? "").trim();
      if (!SAFE_HREF.test(url)) return "<a>";
      const external = /^https?:\/\//i.test(url) && !/^https?:\/\/(www\.)?my-?stree\.(com|org)/i.test(url);
      const safe = url.replace(/"/g, "&quot;");
      return external ? `<a href="${safe}" rel="noopener noreferrer" target="_blank">` : `<a href="${safe}">`;
    })
    .replace(/\s{2,}/g, " ")
    .trim();
}

/**
 * A dashboard upload ("/uploads/website/blogs/...") as served by this site
 * through /cms-media (app/cms-media/[...path]/route.ts), which works around
 * the backend's unshared upload folders. Relative, for next/image.
 */
export function assetUrl(path: string | null | undefined) {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  // Site-supplied images (LOCAL_COVERS) are served from public/, not the CMS.
  if (path.startsWith("/images/")) return path;
  return `/cms-media${path.startsWith("/") ? path : `/${path}`}`;
}

/** The same, absolute, for Open Graph and structured data. */
export function assetAbsoluteUrl(path: string | null | undefined, siteUrl: string) {
  const relative = assetUrl(path);
  return relative.startsWith("/") ? `${siteUrl}${relative}` : relative;
}

/** "Dr. Smitha A.P." to "Dr. Smitha A.P", matching lib/doctors.ts. */
export function authorName(post: Pick<CmsPost, "author_name">) {
  return (post.author_name ?? "MyStree").trim().replace(/\.$/, "");
}

/** The blog index's topics, from the dashboard's "Pregnancy · High-risk care" label. */
export function topicOf(post: Pick<CmsPost, "hero_label">) {
  const label = plainText(post.hero_label).toLowerCase();
  if (/pregnan|birth|doula|maternity|postpartum/.test(label)) return "MATERNITY & BIRTHING";
  if (/fertil|egg|ivf|concept/.test(label)) return "FERTILITY & CONCEPTION";
  if (/hormon|menopaus|pcos|thyroid|gyn/.test(label)) return "HORMONAL SCIENCE";
  return "MYSTREE CARE";
}

const DATE = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" });
export function formatDate(iso: string | null | undefined) {
  const time = Date.parse(iso ?? "");
  return Number.isNaN(time) ? "" : DATE.format(time);
}

/** A post in the shape the existing blog and reading cards use. */
export function toArticle(post: CmsPost): ArticleItem {
  return {
    id: String(post.id),
    slug: post.slug,
    category: topicOf(post),
    title: plainText(post.title),
    author: authorName(post),
    publishedDate: formatDate(post.published_at),
    updatedDate: formatDate(post.updated_at ?? post.published_at),
    image: assetUrl(post.cover_image_medium_url || post.cover_image_url),
    timestamp: Date.parse(post.published_at ?? "") || 0,
    views: 0,
  };
}
