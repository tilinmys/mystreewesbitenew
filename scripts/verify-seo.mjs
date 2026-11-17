/*
 * Pre-launch SEO / AEO / GEO check for the MyStree site.
 *
 *   node scripts/verify-seo.mjs [base]      (default base: http://localhost:3000)
 *
 * Crawls every URL in /sitemap.xml plus the routes below, reading the
 * server-rendered HTML only (no JavaScript runs, so nothing is sent to
 * Google Analytics). For each page it checks what search and answer engines
 * see on first fetch:
 *
 *   status, one <h1>, title and description length, canonical = this URL,
 *   JSON-LD parses, FAQPage questions and answers are present in the HTML,
 *   banned wording in visible text, NAP consistency (phone, postcode,
 *   street), images without alt text, and internal links that do not
 *   resolve. Exits non-zero when any page fails.
 */

const BASE = process.argv[2] ?? "http://localhost:3000";
const EXTRA_ROUTES = ["/contact", "/blog"];

// The address and phone recorded in src/lib/clinic.ts.
const NAP = { phone: "63665 73772", phoneDigits: "916366573772", postcode: "560008", street: "3366" };
// Claims about the clinic, not ordinary English ("works best between 9 and 14")
// or honest cautions ("does not guarantee a baby", "Does it guarantee...?").
const BANNED =
  /\b(?:(?:best|top|leading|no\.?\s?1|#1|number one)\s+(?:clinic|doctors?|gyn\w*|hospital|specialists?|centre|center|dermatologist|psychologist|physiotherapist|nutritionist|dietitian|team)|topmost|top-rated|(?<!\b(?:not|no|never|cannot|does|do|can|will)\s(?:[\w-]+\s){0,3})guaranteed?|miracle|100% cure|world[- ]class|premier|unmatched|leading the way)\b/gi;
const OTHER_POSTCODES = /\b560(?!008)\d{3}\b/g;

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");

function visibleText(html) {
  return decode(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();
}

const norm = (s) => decode(s).replace(/\s+/g, " ").trim().toLowerCase();

async function get(url, init) {
  const res = await fetch(url, { redirect: "manual", ...init });
  return { status: res.status, location: res.headers.get("location"), text: init?.method === "HEAD" ? "" : await res.text() };
}

const sitemap = (await get(`${BASE}/sitemap.xml`)).text;
const fromSitemap = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
const routes = [...new Set([...fromSitemap, ...EXTRA_ROUTES])];
const siteOrigin = new URL([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)][0]?.[1] ?? "https://my-stree.com").origin;

const rows = [];
const internalLinks = new Map();

for (const route of routes) {
  const issues = [];
  const warnings = [];
  const page = await get(BASE + route);
  if (page.status !== 200) {
    rows.push({ route, warnings: [], issues: [`status ${page.status}${page.location ? ` -> ${page.location}` : ""}`] });
    continue;
  }
  const html = page.text;
  const text = visibleText(html);

  const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1 !== 1) issues.push(`${h1} <h1>`);

  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "");
  if (!title) issues.push("no <title>");
  else if (title.length > 65) warnings.push(`title ${title.length} chars (Google may shorten it)`);

  const desc = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "");
  if (!desc) issues.push("no meta description");
  else if (desc.length > 160) warnings.push(`description ${desc.length} chars (Google may shorten it)`);

  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  const expected = siteOrigin + (route === "/" ? "" : route);
  if (!canonical) issues.push("no canonical");
  else if (canonical.replace(/\/$/, "") !== expected.replace(/\/$/, "")) issues.push(`canonical ${canonical}`);

  const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  const types = new Set();
  const faqs = [];
  for (const block of blocks) {
    try {
      const data = JSON.parse(block);
      for (const node of data["@graph"] ?? [data]) {
        types.add(node["@type"]);
        if (node["@type"] === "FAQPage") faqs.push(...(node.mainEntity ?? []));
      }
    } catch {
      issues.push("JSON-LD does not parse");
    }
  }
  if (route.startsWith("/services/") && !types.has("MedicalWebPage")) issues.push("no MedicalWebPage");
  const missingFaq = faqs.filter(
    (q) => !norm(text).includes(norm(q.name)) || !norm(text).includes(norm(q.acceptedAnswer?.text ?? "").slice(0, 80)),
  );
  if (missingFaq.length) issues.push(`${missingFaq.length}/${faqs.length} FAQ not visible in HTML`);

  const banned = [...new Set((text.match(BANNED) ?? []).map((w) => w.toLowerCase()))];
  if (banned.length) issues.push(`wording: ${banned.join(", ")}`);

  const otherPostcodes = [...new Set(text.match(OTHER_POSTCODES) ?? [])];
  if (otherPostcodes.length) issues.push(`postcode ${otherPostcodes.join(", ")}`);
  const phones = [...new Set((text.match(/\+91[\s-]?\d{5}[\s-]?\d{5}|\+91[\s-]?\d{10}/g) ?? []).map((p) => p.replace(/\D/g, "")))];
  const otherPhones = phones.filter((p) => p !== NAP.phoneDigits);
  if (otherPhones.length) issues.push(`phone ${otherPhones.join(", ")}`);
  if (/100 feet road, indiranagar/i.test(text) && !/13th main/i.test(text)) issues.push("address given as 100 Feet Road");

  const noAlt = (html.match(/<img(?![^>]*\balt=)[^>]*>/g) ?? []).length;
  if (noAlt) issues.push(`${noAlt} <img> without alt`);

  for (const m of html.matchAll(/href="(\/[^"#?]*)/g)) {
    const href = m[1].replace(/\/$/, "") || "/";
    if (/^\/(_next|images|brand|api)\//.test(href) || /\.\w{2,4}$/.test(href)) continue;
    if (!internalLinks.has(href)) internalLinks.set(href, new Set());
    internalLinks.get(href).add(route);
  }

  rows.push({ route, title, faq: faqs.length, types: [...types].join(" "), issues, warnings });
}

// Internal links that do not resolve (redirects are followed one hop).
const broken = [];
for (const [href, from] of internalLinks) {
  let r = await get(BASE + href, { method: "HEAD" });
  if (r.status >= 300 && r.status < 400 && r.location?.startsWith("/")) r = await get(BASE + r.location, { method: "HEAD" });
  if (r.status >= 400) broken.push({ href, status: r.status, from: [...from].slice(0, 4).join(", ") + (from.size > 4 ? ", ..." : "") });
}

let failed = 0;
console.log(`\nSEO check against ${BASE} (canonical origin ${siteOrigin})\n`);
for (const row of rows) {
  const ok = row.issues.length === 0;
  if (!ok) failed++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${row.route}${row.faq ? `  [${row.faq} FAQ]` : ""}`);
  for (const issue of row.issues) console.log(`        - ${issue}`);
  for (const warning of row.warnings) console.log(`        ~ ${warning}`);
}
console.log(`\nSitemap: ${fromSitemap.length} URLs. Not in sitemap but checked: ${EXTRA_ROUTES.filter((r) => !fromSitemap.includes(r)).join(", ") || "none"}`);
console.log(`Internal links checked: ${internalLinks.size}. Broken: ${broken.length}`);
for (const b of broken) console.log(`  ${b.status}  ${b.href}   (from ${b.from})`);
console.log(`\n${rows.length - failed}/${rows.length} pages pass.`);
process.exit(failed || broken.length ? 1 : 0);
