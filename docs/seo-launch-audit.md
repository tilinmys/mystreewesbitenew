# SEO / AEO / GEO launch audit — 16 Oct 2026

Run the check any time with the dev or production server running:

```
node scripts/verify-seo.mjs              # against http://localhost:3000
node scripts/verify-seo.mjs http://localhost:3100
```

It reads server-rendered HTML only (no JavaScript, so no Analytics hits) for every sitemap URL plus `/contact` and `/blog`.

## Verified facts used everywhere

The clinic's details come from these places:

- **Address:** No. 3366, 13th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru 560008.
  - The Google Business Profile ("My Stree Clinic") pin is at 12.9685868, 77.6453771.
  - Reverse-geocoded, that pin is "Shivjyoti Clinic, 13th Main Road, HAL 2nd Stage, 560008", which matches the booking app's "Above Shivajoyti Clinic, 3366, 13th Main Rd".
- **Phone and WhatsApp:** +91 63665 73772.
- **Email:** info@mystree.org.
- **Clinicians and fees:** the live booking system (`https://my-stree.com/api/doctors`).
- **One clinic entity:** `lib/service-schema.ts` `clinicNode()` (`@id` `/#clinic`). Every page now uses it.

## Fixed in this pass

| Page | Problem | Fix |
| --- | --- | --- |
| `/` | No canonical. The clinic schema had a placeholder phone (+91-80-4567-8900), postcode 560038 and coordinates about 1 km off. | Canonical added. The schema now uses `clinicNode()` and adds a WebSite node. |
| `/contact` (Google Ads landing page) | No canonical. A second clinic entity with the same `@id` claimed "2nd Floor, 560061", other coordinates and 7:30 pm hours. Its FAQPage questions were not visible on the page. | Canonical added. Uses `clinicNode()` plus a ContactPage node. The hidden FAQPage is removed. |
| `/team`, `/doctors` | The clinic was placed on "100ft Road, 560038" at other coordinates. A hidden FAQPage made unverified claims (30–45 minute visits, in-house ultrasound, comparisons with other clinics). Services were listed that aren't on record (cashless insurance desk, same-day appointments). The meta description said "top female gynecologists". | `clinicNode()`, plus a CollectionPage with the team as Person entities. Title and description corrected. |
| `/clinics/pcos`, `/privacy-policy`, `/terms-and-conditions` | No canonical. | Canonical (and a title for the legal pages) added. |
| `/blog` | The publisher was a separate, unlinked clinic. | Publisher points to `/#clinic`. |
| `sitemap.xml` | It listed `/book` (a redirect) and `/doctors` (canonical is `/team`), and was missing `/contact`, `/blog` and the 6 doctor profiles. | Fixed: 24 URLs, all canonical. |
| `/llms.txt` | The hand-written file listed 4 of the 9 services. | Now generated from site data: 9 services and the team. No fees or hours. |

FAQ answers are present in the server HTML on every page that has FAQ markup. Structured data now matches the visible text.

## Needs a decision before launch

1. **Domain.** The site, sitemap, canonicals, Google Ads tag and booking app all use **my-stree.com**. The SEO brief says **mystree.org**. Canonicals follow `NEXT_PUBLIC_SITE_URL`, so switching is one variable. But the booking app, the Google Ads conversion and the Business Profile link would also need to move, and my-stree.com would need permanent redirects. Decide which domain is primary.
2. ~~Blog articles return 404.~~ **Done (16 Oct):** the blog now reads the admin dashboard. See "Blog" below.
3. **Privacy policy and terms are placeholders** ("We are preparing…"). Google Ads requires a real privacy policy for health advertisers. The old site has `/privacy-policy` and `/terms-of-service`.
4. **The visible address says "100 Feet Road".** This appears in the home page eyebrow and services intro, and in some FAQ text (with 560038). 100 Feet Road is nearby, not the address. The visible wording was left unchanged, pending approval.
5. **Second phone number on `/contact`:** +91 99028 78279. Confirm it is a real clinic line and that it is on the Business Profile. Otherwise remove it.
6. **Opening hours.** Three versions exist: 9:00–20:00 (shared schema), 9:00–19:30 (old contact block) and 9:00–19:00 (old home block). Practo lists 8:00–20:00. Confirm against the Business Profile.
7. **Nav label "Psychology & Psychiatry".** No psychiatrist is on the booking system.

## Not done, on purpose

- **"88%–94% symptom relief" and similar outcome figures:** there is no source, and the NMC notice of 06.10.2026 rules out outcome claims.
- **"Medically reviewed by Dr. Smitha A.P & Dr. Surbhi Sinha" on every page:** only add it once a named clinician has actually reviewed that page. The markup can then carry `reviewedBy` and `lastReviewed`.
- **Fees "₹600–₹900":** the live booking system shows ₹600–₹1,500, and each specialist card already shows its live fee.
- **"2nd Floor, 560061", the coordinates 12.9784, 77.6408, `geo.*` meta tags, and the "Physician" type for every team member:** these are inaccurate, and Google ignores geo meta tags.
- **Renaming working routes** (`/services/pre-natal-clinic`, `/services/menopausal-clinic` and so on): this would cost existing links for no gain.
- **Keyword lists naming services not on record:** for example bio-identical HRT, ERA, PGT-A, PRP, psychosexual therapy and reproductive psychiatry.
- **IndexNow:** Google does not use it. Bing does. It can be added after launch with a key file.

## Blog: connected to the admin dashboard (16 Oct 2026)

**How it works:**

- **Pages:**
  - `/blog` and `/blog/[slug]` read the dashboard's public API at `https://mystree-backend.fly.dev/website/blogs` (`CMS_API_URL`). This is the same backend as `my-stree.com/api`.
  - Slugs are the dashboard's, which are also the old site's article URLs, so existing links keep working.
- **Publishing:** a post published or edited in the dashboard appears within 5 minutes, with no deploy.
  - For instant updates, have the dashboard call `POST /api/revalidate/blog` with the `x-revalidate-secret` header (`REVALIDATE_SECRET`), like the doctors webhook.
  - This route is under `/api`, so the Caddy exception noted for `/api/revalidate/doctors` applies to it as well.
- **Related reading:** service pages show matching posts; a page with none hides the section.
- **Search and AI discovery:** new posts are added to `sitemap.xml` and `llms.txt` automatically.
- **SEO per post:**
  - The dashboard's SEO title and description, a canonical and Open Graph article data.
  - A byline linked to the doctor profile, with published and updated dates.
  - "On this page" jump links, and FAQ answers always visible.
  - JSON-LD: BlogPosting (author = the same Person @id as the service pages, publisher = the clinic), FAQPage (only the visible FAQs) and BreadcrumbList.
  - A medical-information disclaimer.
- **Clean output:**
  - Editor HTML is sanitised: words, links, emphasis and lists are kept, inline fonts and colours are removed.
  - Doctor-profile blocks use the site's doctor records, not the backend bio, which contains "99% Patient Satisfaction (136+ Ratings)" (NMC notice).

**Backend problem for Adarsh (found while wiring this):** `mystree-backend.fly.dev` answers from two machines that do not share data.

- About half of all responses (list and single post) come from an older version: 12 fields, with no `blocks`, `seo`, `hero_label` or reading time.
- The two versions also reference different cover images.
- Uploaded files exist on only one machine each, so any given image URL 404s about half the time.
- The live my-stree.com blog is presumably affected the same way.
- **Fix on the backend:** run one machine, or move uploads and the database to shared storage, and deploy the same version to every machine. Check with `fly status` / `fly machines list`.

**Workarounds in this site until then (can be removed once the backend is fixed):**

- `lib/cms.ts`: up to 12 retries, each on a fresh connection (`lib/cms-http.ts`), until a complete answer arrives. Only validated results are cached.
- `/cms-media/...` serves dashboard images, retrying until the machine that has the file answers. The image is then cached for a year (file names are content hashes).
