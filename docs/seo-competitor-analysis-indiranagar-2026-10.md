# SEO / AEO / GEO: Indiranagar competitor analysis and changes (24 Oct 2026)

This report follows the Bevizio SEO skills pack v1.2.0: the site-audit orchestrator, growth-stage strategy, technical and page-quality audits, the backlink and CTR skills, and the change-and-decision log.

## 0. Data limits (read first)

- **No Search Console, Bing Webmaster or backlink-tool access in this session.** Competitors' backlink counts, click-through rates and traffic **were not measured, and no figures are invented here.** Competitor findings come from live pages, directory listings and search results. They are labelled *observed* or *inferred*.
- Google facts used are from Google's documentation, as checked in the skills pack on 5 Oct 2026:
  - Optimising for AI features is ordinary SEO, with no special schema or file.
  - `llms.txt` is ignored by Google Search, though other AI tools may read it.
  - FAQ rich results stopped showing on 7 May 2026. FAQ content and markup are still valid and still feed answers.
  - There is no duplicate-content penalty.

## 1. Growth stage: **early** (inferred)

The live my-stree.com currently returns a near-empty HTML shell (63 characters of text to a non-JavaScript fetch). Google and AI crawlers therefore see almost nothing of the current site. The new Next.js site server-renders full content: home about 2,100 words, service pages about 1,700, packages about 1,000, all with JSON-LD.

**The single largest gain is shipping the new site.** Per the skills pack, effort goes to coverage and indexing first, not title A/B tests.

## 2. Competitors near 13th Main, HAL 2nd Stage (observed)

| Competitor | Where | Their SEO pattern | Weakness we exploit |
|---|---|---|---|
| Manipal Clinic Indiranagar | CMH Rd, Stage 2 | Keyword URL, keyword image filenames, 6-question FAQ, named consultants | "Best… unsurpassed" superlatives, no prices, alt text repeated on every image |
| Motherhood Hospital Indiranagar | CMH Rd, 1st Stage, plus Jeevan Bhima Nagar | Locality landing pages (`/best-gynaecologist-in-hal-indiranagar/`, `…-domlur-…`), dense internal links, 5 FAQs | "Best" in the H1, no address or map on the locality pages |
| Proactive For Her | 12th Main, HAL 2nd Stage (one street away) | Comparison blog posts ("best egg freezing clinic in Indiranagar"), 16-question FAQs, published consultation fees | Unverifiable "only clinic" claims, no address or map, broken hero image |
| Arva Health | 80 Feet Rd, HAL 2nd Stage | Complete name, address and phone; metro mention; locality URL | Thin (about 400 words), no FAQ, conflicting hours |
| Kasper Clinic | 80 Ft Rd, HAL 3rd Stage | Service pages, 13-question FAQ, named doctor | No prices, no locality in URLs |
| Apollo Cradle | 100 Ft Rd, HAL 2nd Stage | (page returned 404 when checked) | n/a |
| Indiranagar Specialist Centre / Dr Asha Iyer | 13th Main, HAL 2nd Stage | Directory listings only (Justdial, eka.care) | No owned content |
| Directories | Practo, Justdial, Lybrate, ClinicSpots, HexaHealth | Rank for "gynaecologist in Indiranagar" listings | n/a |

**Gaps no competitor fills (observed):**
- No published price for Mirena insertion in Bangalore. A search for "Mirena insertion cost Bangalore" returned no Bangalore price.
- No packaged price for a follicular study in Indiranagar.
- No page combines 13th Main, HAL 2nd Stage, Domlur, Jeevan Bhima Nagar and Old Airport Road.
- No page uses a map embed plus a full address and phone together.
- No review data or medical-review dates. NMC rules keep us from using ratings anyway.

**Where MyStree outperforms (on the new build):** published, structured prices; 8 to 14 answer-first FAQs per page; a single clinic entity in the JSON-LD; and no superlatives, which suits NMC rules and trust.

**Local listing risk (observed):** directories disagree on our details.
- HexaHealth lists "Open 24 hours".
- Listings mix "Sai Darshan Road" and "13th Main Road".
- Practo uses "My Stree Clinic Indiranagar".

Inconsistent name, address and phone across listings is a known local-ranking drag. Fix this off-site (§4).

## 3. Changes made in this session (change log)

| # | Change | Why | Files |
|---|---|---|---|
| 1 | Home title: "MyStree \| Women's health, without judgment" → "Gynaecologist & Women's Health Clinic in Indiranagar, Bengaluru \| MyStree", plus a real description and Open Graph tags | The home page is the strongest page and carried no service or locality terms | `app/(marketing)/page.tsx` |
| 2 | Root `metadataBase`, `en_IN` locale, default title and description | Absolute OG and canonical URLs; no generic fallback | `app/layout.tsx` |
| 3 | Home hero, journey and accordion: "100 Feet Road" → "13th Main Road, Indiranagar" | The address must match the clinic's details everywhere (this was the earlier verify-seo failure) | `hero-experience.tsx`, `start-journey.tsx`, `services-accordion.tsx` |
| 4 | Contact title, description and hero now give the full address and phone | The contact page is the local-intent page; previous copy was generic ("triage lines") | `contact/page.tsx`, `contact-client.tsx` |
| 5 | Clinic JSON-LD: `alternateName`, `hasMap`, `areaServed` (9 localities), `knowsAbout`, `isAcceptingNewPatients` | Ties together directory names (Practo's "My Stree Clinic"), localities and topics for search and AI engines | `lib/service-schema.ts` |
| 6 | 46 images renamed to descriptive names; all references rewritten; 0 broken | Descriptive filenames are a small image-search signal (Manipal uses them). Locality appears only on each page's main image, so no stuffing | `public/images/services/pages`, `public/images/packages`, `rename-images` script |
| 7 | Image sitemap: 49 `<image:loc>` entries (home, 9 services, 5 packages), all verified to exist | Faster image discovery | `app/sitemap.ts` |
| 8 | Footer: the duplicate "About" column became "Packages" (5 links); a dead `/about#location` link now goes to `/contact`; "Our doctors" links the canonical `/team` | Site-wide internal links to the priced pages; fixes a dead anchor and avoids linking to a non-canonical URL | `site-footer.tsx` |
| 9 | `llms.txt`: clinic facts, neighbouring areas, an answer-engine summary, package inclusions | Helps AI assistants that read it. Google ignores it | `app/llms.txt/route.ts` |
| 10 | Superlatives removed: "Best Prenatal Clinic Indiranagar", "the best specialist", "The best care…" | NMC notice and trust; competitors over-use "best" | `lib/prenatal.ts`, `lib/faqs-data.ts`, `doctor-spotlight-quote.tsx` |
| 11 | Mirena title shortened to keep "₹7,500 All-Inclusive" visible | Price is the differentiator in the snippet | `lib/packages.ts` |

`scripts/verify-seo.mjs`: **39 of 40 pages pass, 0 broken internal links** (previously 32 of 34). The remaining failure is the second phone number (+91 99028 78279) on `/contact`, which is awaiting the owner's decision.

**Decisions not taken, and why**
- **No per-locality landing pages** (Motherhood-style "gynaecologist in Domlur"). Near-identical pages made to rank risk Google's scaled-content and doorway policies. Localities live in real content (FAQ answers, `areaServed`) instead.
- **No "best" in titles or headings,** even though competitors rank with it.
- **No review or rating markup,** under the NMC notice.
- **No `sameAs` social links:** the contact page's social URLs are unverified.

## 4. Off-site actions for the first 3 weeks (owner to do)

These matter more than any on-page change for the "gynaecologist near me" map pack.

1. **Ship the new site.** Keep every old URL working with 301 redirects (some are already in `next.config.ts`). After launch, check Search Console's "Pages" report for 404s.
2. **Google Search Console and Bing Webmaster Tools:** verify, submit `https://my-stree.com/sitemap.xml`, and use URL Inspection to request indexing for home, `/contact`, the 9 service pages and the 5 package pages.
3. **Google Business Profile**, the biggest local lever:
   - Primary category: Obstetrician-gynecologist. Secondary categories: women's health clinic and others that genuinely apply.
   - The exact address "No. 3366, 13th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru 560008" and the phone +91 63665 73772.
   - Real opening hours, confirmed by the clinic.
   - Website link with UTM tags.
   - Services and packages with prices; real photos of the clinic and staff.
   - Weekly posts linking to packages.
4. **Fix directory details:**
   - HexaHealth: the "Open 24 hours" listing.
   - Practo, Justdial, Lybrate and eka.care: one name ("MyStree Women's Health Clinic"), one address, one phone.
5. **Reviews:** ask patients to leave honest Google reviews after visits. Never incentivise, gate or script them. Check current NMC guidance before promoting reviews anywhere.
6. **Earn relevant local links:** Indiranagar resident-association newsletters, local health-talk listings, and doctor profiles on professional bodies (BSOG, ISUOG memberships are on the doctors' records). Quality over volume. No paid links.

## 5. Realistic expectations and measurement

- **Three weeks:** expect indexing, branded clicks ("MyStree", "My Stree clinic"), map-pack clicks if the Business Profile is complete, and early long-tail clicks on price questions (Mirena, follicular scans, packages). Competitive head terms ("gynaecologist Indiranagar") usually take months. This is not guaranteed and depends on Google's crawl.
- **Measure on clicks.** Search Console, page and query, 28-day windows, starting the day of launch. Impressions, CTR and position are supporting evidence only.
- Leave titles alone for 6 weeks after launch (T-CTR-WINDOW) before any CTR testing. Then pilot 5 pages against a control, per `ctr-snippet-optimization`.
