# MyStree — shared color and typography specification

Updated for the MyStree Digital Clinical Standards and Fraunces / Plus Jakarta Sans request. This supersedes the earlier cool-surface/navy system and the older terracotta, sage, green and mint experiments. Source identity swatches: **My Stree Final Corp Identity.pdf, page 5**. The PDF is a visual reference; its sample contact details and stationery copy are not website requirements.

## Mandatory application rules

Read and apply this document before every coding task, as required by `AGENTS.md`. Review the affected files, select the existing tokens and type roles, and check any scoped exception below before writing code. For non-visual changes, identify whether the change affects this design system.

1. The corporate palette and global font hierarchy are the defaults. A screenshot alone never authorizes a different brand identity.
2. A user's explicit new visual specification can add a scoped exception. Record its exact tokens and scope here in the same change; do not silently recolor other sections.
3. Load the three approved fonts only from the root layout. New pages inherit the same headings, body, metadata, forms, and navigation hierarchy. Do not substitute new font families to work around a download failure.
4. Keep color values centralized in the applicable token block. Components consume variables. Existing CSS Modules implement the same measurements as the requested utility-style specifications. `tailwind.config.ts` mirrors the canonical `mystree.*` color map so future Tailwind-enabled components resolve to the same system; current CSS Modules must continue consuming the CSS variables.
5. Check the finished rendering and interactions at narrow mobile, tablet, and desktop widths. Verify real link destinations, keyboard/touch operation, reduced motion, unclipped text, and contrast. State verification limitations instead of claiming unperformed checks.

## MyStree Pure Burgundy & Crisp White Specification (26 Nov 2026)

Updated globally to pure clinical colours with zero muddy grey/mauve undertones: **Pure White (`#FFFFFF`)** as the dominant architectural ground, **Pure Soft Rose White (`#FFF5F7`)** and **Pure Crisp Blush (`#FFEBF0`)** for subtle non-muddy section/card separation, **Pure Burgundy (`#800020`)** & **Pure Oxblood (`#5C0017`)** (`#7A001E -> #520014` on dark bands), **Pure Garnet Crimson (`#AD002B`)** -> **Pure Ruby (`#D60036`)** CTA fills, rested oxblood-plum prose (`#3E1E26`), and the preserved footer surface (`color-mix(in srgb, #73304a 88%, #0C161D 12%)`).

### CRITICAL COLOR RULES:
- **Zero blue section grounds or card fills** (`#E8F2FA` / `#8BA4BF`), **zero muddy mauve/grey washes** (`#EFE0E4` / `#E5CCD3`), and **zero orange text/fills** (`#ED5B2D`).
- **Pure White Canvas First:** Pure `#FFFFFF` is the primary background across pages, punctuated selectively by Pure Soft Rose White (`#FFF5F7`) and crisp `#EED4DC` hairlines so section transitions feel bright, clean, and cohesive rather than heavily striped.
- **Pure Burgundy & Crimson Hierarchy:** `#7A001E -> #520014` on full-width dark bands, `#800020` / `#5C0017` on headings and directory buttons, `#AD002B -> #800020` (hover `#D60036 -> #AD002B`) on primary booking CTAs, `#FF0040` focus outlines.
- **Footer Surface:** Explicitly preserved at `--footer-surface` (`#692B43`) with white headings/links (`#FFFFFF`, `#DDE2E8`).
- **Directory Cards, Booking Cards & Profile Policy:** `/doctors` (`Team2MeetProviders`) renders centered pure white cards with crisp portrait medallions, clinician name, outlined white specialty pill tags with `+N` overflow, and a single full-width Burgundy `View profile` button. Booking sections on `/` (`HomeTeam`) and all `/services/*` & `/clinics/pcos` pages (`ServiceSpecialists`) use ordered architectural white booking cards (`#FFFFFF` card with `#DDD3D5` hairline, 5-zone hierarchy with zero text truncation: circular portrait + full wrappable JetBrains Mono specialty + Plus Jakarta Sans 600 name → Oxblood consultation fee & experience bar → scannable clinical focus → recessed `#F3EFEF` live timing well with single live dot, modality, and white date/time pills → full-width Burgundy `#AD002B -> #800020` / Velvet Plum hover `Book Appointment` CTA — zero star ratings or `Reg. No.`). Registration numbers (`Reg. No.`) appear exclusively on `/doctors/[slug]` profiles (right-aligned `REG. NO - <value>` only when present).
- **Mobile Glassmorphic Dock & Cookie Banner:** `MobileActionBar` renders as a floating frosted-glass bottom dock with an official WhatsApp vector logo; `ConsentNotice` sits compactly above the dock on mobile with equal-width action buttons.

| Token | Value | Role | Contrast |
| --- | --- | --- | --- |
| `--palette-velvet` / `--palette-velvet-deep` | `#7A001E -> #520014` | Pure Deep Burgundy dark bands | 11.4:1–14.8:1 w/ `#FFFFFF` |
| `--palette-oxblood` / `--midnight-chamber` | `#5C0017` | Pure Oxblood Deep (primary headings, anchors, dark ink) | 14.31:1 on `#FFFFFF` / 13.4:1 on `#FFF5F7` |
| `--palette-burgundy` / `--twilight-wine` | `#800020` | Pure Classic Burgundy (eyebrows, accents, profile CTAs) | 10.83:1 on `#FFFFFF` / 10.1:1 on `#FFF5F7` |
| `--bg-light` / `--canvas` / `--surface-card` | `#FFFFFF` | Pure White primary canvas & crisp card foregrounds | Baseline light |
| `--surface-mist` / `--uranian-mist` | `#FFF5F7` | Pure Soft Rose White (clean non-muddy section tint) | Pure luminous contrast |
| `--surface-blush` / `--blush-veil` | `#FFEBF0` | Pure Crisp Blush (badges, fee cells, accents) | Clean tonal highlight |
| `--text-dark` / `--botanical-midnight` | `#3E1E26` | Rested dark oxblood-charcoal body prose | 14.8:1 on `#FFFFFF` / 13.9:1 on `#FFF5F7` |
| `--text-muted` | `#5A3440` | Rich muted rose-plum captions & metadata | 9.6:1 on `#FFFFFF` / 9.0:1 on `#FFF5F7` |
| `--accent-cadet` / `--cadet-slate` | `#9E6E7B` | Warm rose-mauve for subtle dividers | Subtle boundary |
| `--border-subtle` | `#EED4DC` | Crisp pure rose hairline stroke for cards & dividers | Clean edge definition |
| `--btn-primary` / `--book-top` | `#AD002B` | Pure Garnet Crimson primary CTA gradient top (`#AD002B -> #800020`) | 7.47:1 w/ `#FFFFFF` |
| `--btn-primary-hover` / `--book-hover-top` | `#D60036` | Pure Rich Ruby primary CTA hover gradient top (`#D60036 -> #AD002B`) | 5.37:1 w/ `#FFFFFF` |
| `--focus-ring` / `--palette-vivid` | `#FF0040` | Non-text keyboard focus outline & glow highlight | 3.94:1 non-text UI contrast |
| `--footer-surface` | `#692B43` (`color-mix(in srgb, #73304a 88%, #0C161D 12%)`) | Approved Footer Burgundy (preserved unchanged) | 10.36:1 w/ `#FFFFFF` |

## Brand palette

| CSS token | Exact PDF hex | Usage |
| --- | --- | --- |
| `--brand-cadet-gray` | `#8BA4BF` | Source swatch; calibrated Cadet application role uses `--accent-cadet` |
| `--brand-uranian-blue` | `#BFE2FE` | Source swatch for identity artwork and derived mist surfaces |
| `--brand-corn-silk` | `#FCF4D9` | Source swatch for identity artwork and tuned Corn Silk surfaces |
| `--brand-pumpkin` | `#FF833C` | Source swatch; status role uses `--accent-pumpkin` |
| `--brand-flame` | `#ED5B2D` | Source swatch; digital action role uses `--accent-flame` |
| `--brand-burnt-sienna` | `#EF6A40` | Source swatch; digital hover role uses `--accent-flame-hover` |

Keep navigation, menus, cards and forms on `--surface-card`. The application
canvas is `--bg-primary`, with `--bg-secondary` and `--bg-subtle-blue` providing
the section rhythm. Source identity colors remain available for logos and
artwork; interactive UI consumes the calibrated digital tokens.

## Semantic colors and contrast

Define colors once in `src/app/globals.css`; components and SVG decorations
consume variables. `--text-primary` is the default foreground,
`--text-muted` is approved for normal body copy on all three application
canvases, and `--text-inverse` is reserved for genuinely dark or photographic
surfaces. Focus rings use `--accent-flame-hover`; neutral control borders use
`--accent-cadet`.

Measured text pairs:

| Pair | Ratio |
| --- | --- |
| `--text-primary` / `--bg-primary` | 12.74:1 |
| `--text-primary` / `--bg-secondary` | 11.66:1 |
| `--text-primary` / `--bg-subtle-blue` | 12.12:1 |
| `--text-muted` / `--bg-primary` | 4.99:1 |
| `--text-muted` / `--bg-secondary` | 4.57:1 |
| `--text-muted` / `--bg-subtle-blue` | 4.75:1 |

The calibrated Flame fills do not provide 4.5:1 for ordinary small white or
charcoal copy by themselves. Keep normal-size action labels semibold and verify
the final composited control; where AA is required, deepen the local fill or
use Flame as the edge/marker around a light action surface. Do not infer text
contrast from the presence of a brand swatch.

## Global typography

Fonts are configured once through `next/font/google` in the root layout, so every route inherits the same families. Next.js downloads and self-hosts the generated font assets at build time; visitors do not make runtime requests to Google.

Fraunces exposes `SOFT`, `WONK`, and `opsz`; Next.js therefore loads its variable weight axis, while authored styles are strictly limited to 300, 400, and 500. Real normal and italic styles support emphasized editorial text. Plus Jakarta Sans loads weights 400, 500, and 600. JetBrains Mono loads weights 400 and 500 and is reserved for clinical metadata, credentials, specialty tags, badges, and eyebrow indicators. All three use the Latin subset and `display: swap`.

| Element / utility | Family | Weight | Size | Line height | Letter spacing |
| --- | --- | --- | --- | --- | --- |
| `h1`, `.text-hero`, `.text-display-hero` | Fraunces | 300 | clamp(2.5rem, 5.5vw, 4.5rem): 40–72px | 1.20 | -0.03em |
| `h2`, `.text-heading-lg`, `.text-display-title` | Fraunces | 300 | clamp(2rem, 4vw, 3.25rem): 32–52px | 1.12 | -0.03em |
| `.text-display-subhead` | Fraunces | 400 | clamp(1.25rem, 2.5vw, 2rem): 20–32px | 1.25 | -0.02em |
| `.text-editorial-lead` | Plus Jakarta Sans | 400 | clamp(1rem, 1.3vw, 1.25rem): 16–20px | 1.65 | -0.01em |
| `.text-metadata-tag`, clinical metadata and eyebrows | JetBrains Mono | 500 | 11px | 1rem | 0.18em |
| `h3`, `.text-doctor-name` | Plus Jakarta Sans | 600 | clamp(1.25rem, 2vw, 1.5rem): 20–24px | 1.35 | 0 |
| Body, paragraphs, `.text-body` | Plus Jakarta Sans | 400 | 16px | 1.6 | 0 |
| Buttons, booking actions, `.btn-slot` | Plus Jakarta Sans | 500 | 14px | 1 | 0.01em |
| Footer, footer paragraphs, `.text-caption` | Plus Jakarta Sans | 400 | 12.5px | 1.5 | 0.02em |

Smaller headings and strong text use Plus Jakarta Sans 600. Inputs, selects and textareas inherit the body font. Navigation uses Plus Jakarta Sans 500 at 14px. The text wordmark uses Fraunces 400. Compact UI labels may use smaller sizes; page headings and body copy retain the shared hierarchy.

### Font exclusivity

Every written element across the site must use this system and no other intentional font family:

- Use Fraunces through `var(--font-serif)` for headings, display text, emphasized editorial text, and the wordmark.
- Use Plus Jakarta Sans through `var(--font-sans)` for body copy, navigation, buttons, inputs, placeholders, captions, dialogs, and footer text.
- Use JetBrains Mono through `var(--font-mono)` only for clinical credentials, specialty and metadata tags, badges, and eyebrow indicators.
- Do not add another font import, font package, `@font-face`, inline `font-family`, page-specific font stack, or third-party typography override.
- The `Georgia`, `system-ui`, `monospace`, and generic serif/sans-serif entries in `globals.css` are fallback-only safety nets. They are not approved design choices and must never be selected intentionally.
- This rule applies to all current and future routes, components, dialogs, forms, states, responsive layouts, and user-facing written content.

Do not add page-specific typography, competing heading sizes, or weights beyond the configured hierarchy. New routes should use semantic headings and the shared utilities rather than redefining the typography.

## Services accordion exception

The current visual direction uses a quiet Alabaster-to-tuned-Corn-Silk section field (`--bg-primary` to `--bg-secondary`) so the Services section stays warm without becoming another blue panel or an orange wash. Photography remains fully visible beneath transparent, top-aligned copy, with a controlled charcoal image wash, white readable text, Cool Slate borders, and Flame actions. Card and dialog fallback surfaces are pristine white with natural low-chroma shadows. Do not reintroduce the earlier forest-green background, broad Uranian-blue panel, black scrim, sage text, mint action treatment, or any orange section ground. These rules are scoped to `services-accordion.module.css`, including its service-detail dialogs. The rest of the site keeps the corporate palette above; all sections share the same global font hierarchy.

The service card has no copy panel, backdrop blur, or opaque white surface. Its image wash is `linear-gradient(180deg, rgb(34 28 25 / 72%) 0%, rgb(34 28 25 / 42%) 32%, rgb(34 28 25 / 8%) 70%, rgb(34 28 25 / 24%) 100%)`; copy begins near the top of the image and uses the on-photo text role. The image stays full-height in both collapsed and expanded states; the card must never crop the image to a shortened top region. Desktop card expansion uses the shared 170 stiffness / 30 damping / 1.15 mass spring so hover and keyboard focus have one consistent glide.

The four service cards use dedicated local service photographs documented in `public/images/services/README.md`. White copy, a small Corn Silk badge, brand-orange actions, and the controlled image wash preserve contrast without a separate text slab. These are calculated solid/composited color ratios, not a certification of the entire interface.

## Specialty focus showcase exception

The three-card specialty showcase uses the same cream hero-frame surface as the Home and Services sections, with transparent top-aligned copy over controlled dark image washes, Flame actions, and Cadet Gray borders. This supersedes the earlier forest/mint treatment for `specialty-cards.module.css`; it does not alter the corporate colors on other routes.

| Local token | Value | Role |
| --- | --- | --- |
| `--focus-surface` | `#FCF4D9` | Shared cream section background |
| `--focus-ink` | `#221C19` | Card copy and CTA text |
| `--focus-accent` | `#ED5B2D` | CTA fill and interaction accent |
| `--focus-accent-hover` | `#EF6A40` | CTA hover |
| `--focus-border` | `#8BA4BF` | Card border |

Typography still inherits Fraunces 400 for the section H2 and Plus Jakarta Sans 600 for card H3s. Descriptions use the shared 16px body role.

## Scoped exception — Contact & Patient Care Hub (`/contact`)

Explicitly requested light clinical organic wave system modeled on reference UI/UX (`src/app/(marketing)/contact/page.tsx` & `contact-client.tsx`):
- Section 1 Hero Banner (revised 26 Oct 2026, by request: "heavily brightened"):
  - **Photo:** the Indiranagar lane photograph (`contact-indiranagar-lane.webp`) shows at full strength. It overrides the global `photo-ground` white veil, which was 82–93% white.
  - **Shade:** a Midnight Chamber (`rgb(22 38 51)`) radial shade, 70% at the centre, 50% at mid-radius and 24% at the edges, sits behind the centred copy. The photo gets `saturate(1.18) contrast(1.1)` because it is misty. Phones use an even 58% shade.
  - **Type:** a small 82%-white uppercase eyebrow reading "Indiranagar, Bengaluru", a white Fraunces h1, and a 90%-white subtitle. The phone number is a `tel:` link.
  - **Bottom edge:** the fluid organic SVG wave into the Alabaster cards is unchanged.
- Section 2 Contact Info Cards: Porcelain light canvas (`#F8FAFC`) with subtle topographical contour vector line art (`rgba(139, 164, 191, 0.18)`), pure crisp white cards (`#FFFFFF`), `1px border #D3E2EE`, soft ambient shadows.
- Section 3 Appointment Form: Centered white card (`#FFFFFF`) on soft mist canvas, inputs in crisp white with `#D3E2EE` borders and Cadet Gray `#8BA4BF` focus ring. Action CTA uses Brand Flame (`#ED5B2D` / hover `#D84A1E`) per the action button mandate.
- Section 4 Location Map: Full-width responsive Google Map with top-left floating location card (`#FFFFFF`, shadow-md).
- Section 5 Brand & Social Channels: Fluid SVG wave top transition, centered brand logo (`/mystreelogo.svg`), circular social channel icons with brand color fills, flowing into global `SiteFooter`.
- Typography: Fraunces Serif (`var(--font-serif)`) for section titles and card headings, Plus Jakarta Sans (`var(--font-sans)`) for body, labels, placeholders and inputs, JetBrains Mono (`var(--font-mono)`) for clinical metadata tags.

## Member Outcomes & Clinical Results (`AboutOutcomes` on `/about`)

Placed immediately after "One continuous care story" (`AboutContinuity`):
- Background: `var(--alabaster)` (`#F8FAFC` / `var(--bg-light)`), seamlessly continuing the alabaster light canvas.
- Typography:
  - Eyebrow: `var(--font-mono)`, 11px, 500 weight, letter-spaced 0.18em, `var(--text-muted)` (`#4A6173`).
  - Decorative Wave: SVG underline stroke using `var(--btn-primary)` (`#ED5B2D`, 1.5px stroke).
  - Main Heading: `var(--font-serif)` (Fraunces), 300 weight, `clamp(2.25rem, 4vw, 3.5rem)`, color `var(--text-dark)` (`#0C161D`).
  - Stats Numbers: `var(--font-serif)` (Fraunces), 300 weight, `clamp(3.5rem, 5.5vw, 5.25rem)`, color `var(--text-dark)` (`#0C161D`), with tabular figures and animated count-up on scroll.
  - Stat Labels: `var(--font-sans)` (Plus Jakarta Sans), 400 weight, `var(--text-muted)` (`#4A6173`), 15–17px.
- Animation: Scroll-triggered `easeOutCubic` count-up via `requestAnimationFrame` over 1.6s, respecting `useReducedMotion()`.

## Minimal Sanctuary Call to Care (`AboutClosing` on `/about`)

Replaces the previous street photography banner immediately prior to the site footer:
- Background: Luminous atmospheric multi-radial sanctuary gradient combining Uranian Blue (`rgba(191, 226, 254, 0.45)`), Celadon/Sage Mist (`rgba(216, 236, 230, 0.42)`), subtle Corn Silk warmth (`rgba(252, 244, 217, 0.45)`), and Porcelain Alabaster base (`#E4F0EC` to `#FAFDFB`).
- Section Divider: Micro hairline boundary (`1px solid rgba(139, 164, 191, 0.25)`) framing the transition into the Midnight Deep Navy footer (`#0F1A24`).
- Main Heading: `var(--font-serif)` (Fraunces), 300 weight, `clamp(2.5rem, 5.5vw, 4.25rem)`, color `#1A3036` (deep spruce-navy ink, 12.8:1 AAA contrast).
- Action Buttons:
  - Primary Pill ("Get care"): Warm Sand/Peach Biscuit fill (`#E8CCA7`), dark slate ink (`#182A32`), pill shape (`border-radius: 9999px`), lift & soft shadow on hover.
  - Secondary Pill ("Start with labs"): Pill outline with subtle sand border (`1px solid rgba(214, 186, 166, 0.85)`), frosted glass surface (`rgba(255, 255, 255, 0.45)`), camel sand text (`#A0785D`).

## Multidisciplinary Care Hero (`Team2Hero` on `/team` & `/doctors`)

First section of the Team Page designed for calming, zero-glare, non-overwhelming emotional reassurance:
- Width & Spacing: Contained measure `max-width: 64rem`, vertical padding `clamp(3.5rem, 6vw, 5.5rem) clamp(1.25rem, 4vw, 3rem)`.
- Background: Luminous Sky Mist `linear-gradient(180deg, #D4E8F8 0%, #E2F0FB 100%)`.
- Typography: Fraunces 300 serif heading (`clamp(2.35rem, 4.8vw, 3.5rem)`, `#0C161D`), Plus Jakarta Sans 400 lead (`#1E3448`, 13.5:1 AAA contrast).
- Action Elements:
  - Primary Action ("Get care"): Midnight Navy pill (`#0C161D`, text `#FFFFFF`, hover `#193448`), `border-radius: 9999px`.
  - Secondary Action ("See our care model"): Frosted Blue pill (`border: 1.5px solid #1E384D; background: rgba(255, 255, 255, 0.55); color: #0C161D;`).
- Mobile Behavior: On `< 480px`, actions stack vertically at 100% width with min-height 48px touch targets.

## Collaborative Care Model & Integrated Comparison (`Team2CareModel` on `/team` & `/doctors`)

Second section featuring expansive width and integrated clinical comparison:
- Width & Spacing: Expansive `max-width: 74rem`, vertical padding `clamp(4.5rem, 7vw, 6.5rem) clamp(1.25rem, 4vw, 3rem)`.
- Background: Porcelain Blue canvas (`#F4F8FC`) with top hairline `1px solid #D1E4F3`.
- Top Grid: Fraunces 300 heading (`clamp(2rem, 3.8vw, 2.75rem)`, `#0C161D`) paired with transparent bespoke Indian women's care model diagram (`mystree-care-model-transparent.png`).
- Bottom Comparative Ledger:
  - Ledger Card: Pure Crisp White (`#FFFFFF`) with Dark Navy border (`1.5px solid #1E384D`), rounded corners (`border-radius: 0.875rem`), vertical divider (`1.5px solid #1E384D`).
  - Columns: "Typical Doctor's Office" (cross icons in muted slate `#4A6173`) vs "MyStree" (check icons in Uranian Blue fill `#D8ECF9` with navy tick `#0C161D`).
- Mobile Behavior: Below 768px, table transforms into high-contrast stacked cards with clear column badges.

## Care Team Roster Roles (`Team2RosterRoles` on `/team` & `/doctors`)

Third section presenting clinical team roles in a balanced mid-width canvas:
- Width & Spacing: Balanced `max-width: 68rem`, vertical padding `clamp(4rem, 6.5vw, 5.75rem) clamp(1.25rem, 4vw, 3rem)`.
- Background: Soft Uranian Mist `linear-gradient(180deg, #E6F1FA 0%, #EDF6FC 100%)` with top border `1px solid #CDE2F2`.
- Role Cards (3 columns):
  - Surface: `#FFFFFF` pure white cards with soft hairline `1.5px solid #D8E7F3`, `border-radius: 1rem`.
  - Hover Interaction: Smooth lift with vibrant Uranian blue border highlight (`#4A9FD8`) and soft elevation shadow.
  - Illustrations: Minimalist vector line art (`care-team-providers.jpg`, `care-team-support.jpg`, `care-team-coordinators.jpg`) with deep navy line art and blue tones.

## Meet Our Doctors Directory (`Team2MeetProviders` on `/team` & `/doctors`)

Fourth section providing full-span directory exploration:
- Width & Spacing: Full-span `max-width: 82rem`, vertical padding `clamp(4.5rem, 7vw, 6.5rem) clamp(1.25rem, 3.5vw, 3rem)`.
- Background: Gentle Glacial Powder `#F7FAFD` with top border `1px solid #D8E6F2`.
- Filter Controls: White selects with subtle slate-blue border (`1.5px solid #CFE2F0`), focus ring in `#4A9FD8`.
- Doctor Cards (4 columns desktop, responsive to 1 column mobile):
  - Surface: Pure White `#FFFFFF`, border `1.5px solid #DCE8F3`, `border-radius: 1.125rem`.
  - Doctor Avatar Halos: Dedicated serene blue tints (`#CEE5F6`, `#DDEEFA`, `#D8ECF9`, `#E2F1FB`, `#C8E2F5`, `#D0E6F7`) replacing non-blue colors.
  - Specialty Badges: Frosted light blue pills (`background: #F0F6FB; border: 1px solid #D2E4F2; color: #1E384D; font-size: 0.775rem`).
  - Action Button: Full-width Midnight Navy pill (`#0C161D`, text `#FFFFFF`, hover `#193448`).

## Member Reviews Carousel (`Team2Reviews` on `/team` & `/doctors`)

Fifth section delivering calming reassurance through a nocturnal contrast rhythm:
- Width & Spacing: Focused `max-width: 70rem`, vertical padding `clamp(4.5rem, 6.5vw, 6rem) clamp(1.25rem, 4vw, 3rem)`.
- Canvas Background: Calming Light Blue gradient `linear-gradient(180deg, #EDF4FA 0%, #E3EFF8 100%)` with top border `1px solid #CCE0F0`.
- Review Cards (Monochromatic Midnight Navy Velvet & Blue Glass):
  - Card Foundation: `linear-gradient(145deg, #0F202D 0%, #162E40 100%)` (Deep Navy, replacing previous cherry/plum per monochromatic brief).
  - Border: Uranian Blue hairline `1.5px solid rgba(191, 226, 254, 0.22)`.
  - 5-Star Rating: Luminous Uranian Blue (`#7CBBE8`, `★★★★★`).
  - Typography: Pure crisp white patient names (`#FFFFFF`), light cadet location (`#B8D5ED`), and soothing readable quote text (`rgba(255, 255, 255, 0.94)`).
  - Controls: Dark navy circular navigation arrows and pagination pills.

## Clinical Closing Banner (`Team2ClosingBanner` on `/team` & `/doctors`)

Sixth section providing an intimate, serene conversion invitation:
- Width & Spacing: Intimate `max-width: 62rem`, vertical padding `clamp(3.5rem, 6vw, 5.25rem) clamp(1.25rem, 4vw, 3rem)`.
- Section Canvas: Porcelain Blue `#F4F8FC` with top border `1px solid #D1E4F3`.
- Contained Card Surface: Luminous azure mist `linear-gradient(135deg, #DBEDFA 0%, #E8F4FC 100%)` framed by `1.5px solid #B8DAF2`, `border-radius: 1.25rem`, shadow `0 12px 32px -6px rgba(16, 42, 67, 0.08)`.
- Headline: Fraunces 300 serif (`clamp(2rem, 3.8vw, 2.75rem)`, `#0C161D`).
- Actions:
  - Primary Pill ("Get Care"): Midnight Navy `#0C161D` with white text `#FFFFFF` and hover `#193448`.
  - Secondary Pill ("Learn about membership"): Deep Navy outline `1.5px solid #0C161D` with transparent ground and `#0C161D` text.
- Right Decorative Silhouette: Deep Navy organic line SVG wave (`stroke="#162E40"`, `strokeWidth="2.75"`, `strokeLinecap="round"`).
- Mobile: Card padding collapses to `2.25rem 1.25rem`, buttons expand to full 100% width with 48px touch targets.

## Services Showcase Accordion (`ServicesAccordion` on `/` & `#services`)

Updated per user request to introduce distinct MyStree palette hover colors for each clinic card, optically align the header, subheader, and metadata badge, and elevate the tactile interactivity:
- **Card 0 (Adolescent Health Clinic & OBGYN Care)**:
  - Theme: **Uranian Blue / Sky Mist**
  - Accent Color: `#4A9FD8`
  - Ambient Glow: `rgba(74, 159, 216, 0.32)`
  - Border: `rgba(191, 226, 254, 0.75)`
  - Tint Wash: `rgba(191, 226, 254, 0.12)`
- **Card 1 (Fertility & Pre-Conception Clinic)**:
  - Theme: **Brand Flame / Sunrise Coral**
  - Accent Color: `#ED5B2D`
  - Ambient Glow: `rgba(237, 91, 45, 0.32)`
  - Border: `rgba(237, 91, 45, 0.75)`
  - Tint Wash: `rgba(237, 91, 45, 0.12)`
- **Card 2 (Pre-Natal Clinic & Physiotherapy)**:
  - Theme: **Corn Silk / Golden Amber**
  - Accent Color: `#D4A23D`
  - Ambient Glow: `rgba(212, 162, 61, 0.35)`
  - Border: `rgba(252, 244, 217, 0.80)`
  - Tint Wash: `rgba(252, 244, 217, 0.14)`
- **Card 3 (Menopausal Clinic & Midlife Care)**:
  - Theme: **Deep Cherry / Rose Plum**
  - Accent Color: `#C25D8A`
  - Ambient Glow: `rgba(194, 93, 138, 0.32)`
  - Border: `rgba(212, 98, 148, 0.75)`
  - Tint Wash: `rgba(131, 26, 74, 0.15)`
- **Interactive Card Elements**:
  - Top-left clinical beacon dot with pulsing concentric halo.
  - Specular radial top glow (`.card::after`) and dark contrast mask (`.card::before`).
  - Tactile pill action button ("Explore details →"): Frosted pill (`rgba(255, 255, 255, 0.96)`) with dark navy text (`#0C161D`), arrow `translateX(4px)` spring hover motion, and accent reflection.
  - Optical Typography: Section dual-column grid (`1.25fr / minmax(18rem, 28rem)`) with `align-items: end;` for baseline harmony between Fraunces H2 and Plus Jakarta Sans intro copy. Inside cards: JetBrains Mono 11px uppercase badge pill with `1.1rem` margin, Plus Jakarta Sans 600 headline with optical tracking `-0.024em` and line-height `1.22`, Plus Jakarta Sans 400 subheader description with `1.58` line-height bounded to `34ch`.

## Navigation and hero

Preserve the navigation content and order: Home, About Us, Our Team, Services, Highlights, MyStree Soul with BETA badge, Blog & Community, Contact Us, Book Appointment. Keep dropdowns, mobile navigation, fixed white navigation and calendar booking action.

Collapse navigation at 1320px to accommodate the font and labels. Keep the mobile booking link's accessible name when its visible label is hidden. Scroll the expanded mobile menu within the viewport. Keep visible controls at least 44px tall and keyboard focus visible.

Use the existing six hero images in `public/images/hero/`; the image manifest remains in `image-prompts.md`. The navbar uses the uploaded vector brand mark at `public/public/mystreelogo.svg`. Decorative SVG strokes and circles use brand tokens. Avoid independent hard-coded colors in components. The homepage and booking placeholder share the root typography and primary action styles. A shared visual system does not imply the placeholder booking flow is connected.

### Hero Frame Geometry & Typography Standards
- **Frame Geometry**: Full-bleed cinematic card with outer frame margin `margin: 0.25rem auto 1.15rem; width: calc(100% - clamp(1.2rem, 2vw, 1.9rem));` and luxury border radius `border-radius: clamp(1.5rem, 2vw, 1.85rem)`.
- **Viewport Visibility**: Desktop card height dynamically constrained via `height: calc(100svh - var(--home-chrome-height, 8.6rem) - 1.15rem); min-height: 36rem; max-height: calc(100svh - var(--home-chrome-height, 8.6rem) - 1.15rem);` so the entire card, typography, and both CTA buttons are 100% visible on first load across all desktop resolutions without scroll cutoff.
- **Copy Panel & Alignment**: Vertically centered (`align-items: center`), `width: min(46rem, 52vw)`, padding `clamp(2.5rem, 5vh, 4.5rem) clamp(2.5rem, 5vw, 5.5rem)`. Eyebrow uses JetBrains Mono with luminous pulsing dot; H1 uses Fraunces 300 (`clamp(2.35rem, min(4.4vw, 5.8vh), 3.85rem)`); Lede uses Plus Jakarta Sans 400 (`clamp(0.9375rem, min(1.05vw, 1.8vh), 1.0625rem)`).
- **Secondary Action Button ("Explore clinics")**: Tactile Frosted Glass Pill `background: rgba(255, 255, 255, 0.14); border: 1.5px solid rgba(255, 255, 255, 0.65); backdrop-filter: blur(12px); color: #FFFFFF; border-radius: 9999px; min-height: clamp(3rem, 4.8vh, 3.35rem); padding: 0 clamp(1.5rem, 2vw, 1.85rem);`.
- **Primary Action Button ("Book consultation →")**: Canonically uses `.cta-book.is-large.is-pulse`.
- **Decorative Wave Lines**: Anchored to bottom-left (`bottom: 0.5rem; left: 0; width: min(38vw, 440px); opacity: 0.35;`) to avoid crossing headline or lede text.
- **Mobile Responsive**: Adapts to full-width stacked card with 48px touch-friendly CTA buttons, bottom-aligned copy panel, and optimized photographic vignette.

## Women’s Health FAQ Hub & Sanctuary CTA (`/faqs`)

Scoped to `src/components/faqs/*` and `src/app/(marketing)/faqs/page.tsx`:
- **Canvas & Surface Rhythm**:
  - Primary FAQ Section Canvas: Calming Porcelain-Alabaster transition (`linear-gradient(180deg, #F8FAFC 0%, #F4F8FB 60%, #FAF8F5 100%)`), bordered by subtle hairline `#D3E2EE`.
  - Closing Sanctuary Section Canvas: Deep Midnight Spruce Velvet (`radial-gradient(circle at 50% 25%, rgba(74, 159, 216, 0.08) 0%, transparent 65%), linear-gradient(180deg, #09151A 0%, #0D1E24 100%)`).
- **Compact 2-Column Desktop Architecture**:
  - Editorial Presentation: Pristine, distraction-free visual layout strictly mirroring reference aesthetic. No visible eyebrow tags, review card banners, or numeric topic pill badges cluttering the frontend UI.
  - Left Category Rail: Compact measure `minmax(17rem, 20rem)` with `position: sticky; top: calc(var(--nav-height, 4rem) + 1.25rem); overflow: visible;`. Zero internal scrollbars; all 12 categories fit within 460px height.
  - Active Category: Flame accent (`#CF4219`), 600 weight with soft warm ground `rgba(237, 91, 45, 0.09)`. Inactive categories use `#2D4253` with `#0C161D` on hover. Category counts rendered in JetBrains Mono (`0.72rem`).
  - Right Active Topic Column: Focuses on the selected category’s questions (9–14 questions, ~450–650px height). Spacing is compact (`padding: 0.92rem 0.35rem;`), with hairline `#DCE8F3`, Fraunces 300 header, and clean `+` / `−` toggles. After reviewing that topic, the user immediately reaches the second sanctuary section without an 8,000px scroll wall.
  - Topic Pager Navigation: Clean bottom pager allowing sequential "Previous" and "Next" topic navigation.
- **Hidden SEO, AEO & GEO Architecture**:
  - Medical review attribution (Dr. Smitha A.P., MBBS, MS OBGYN), clinic location (100ft Road, Indiranagar, Bengaluru), and full clinical knowledge base are wired into visually hidden crawlable markup (`.seoIndexContainer`) and Schema.org JSON-LD (`MedicalClinic`, `MedicalWebPage`, and `FAQPage` with 125 Question/Answer entities) for maximum AI & search engine indexing without visual clutter.
- **Sanctuary Closing Section ("Ready to get started?")**:
  - Minimal editorial layout without eyebrow text, matching reference image composition.
  - Heading: Fraunces 300 serif, pure white (`#FFFFFF`), `clamp(2.35rem, 4.8vw, 3.5rem)`.
  - Subtitle: Soothing slate mist (`#CADAE6`), Plus Jakarta Sans 400.
  - Primary Action ("Get care"): Warm Peach/Sand Biscuit fill (`#E8CCA7`), dark slate text (`#182A32`), pill shape (`border-radius: 9999px`), 2px lift on hover. Links to `/book`.
  - Secondary Action ("Talk to an advisor"): Delicate outlined pill with sand border (`1.5px solid rgba(232, 204, 167, 0.7)`), transparent ground, `#E8CCA7` text, 2px lift on hover. Links to `/contact`.
- **Mobile Behavior (< 960px)**:
  - Category navigation converts to a horizontal swipeable pill bar at the top.
  - Active topic accordion renders directly underneath with $\ge 48\text{px}$ touch targets.
  - Closing CTA buttons stack vertically at 100% width.

## Image delivery

`next.config.ts` sets `formats: ["image/avif", "image/webp"]` and declares
`qualities: [75, 88]`. Editorial photography and clinician portraits are served
at `quality={88}` — the default 75 was visibly softening skin texture and fabric.
AVIF absorbs most of the extra bytes. `deviceSizes` and `imageSizes` carry small
entries (160-512) so a 160px faculty thumbnail or a 440px philosophy frame is not
handed a 640px file on a 1x screen. Next 16 requires every non-default quality to
be declared in this file.

## Retired navy aliases

The former editorial navy family is retired as an independent palette.
`--ink`, `--navy`, and `--navy-deep` now resolve to `--text-primary`;
`--navy-slate` resolves to `--text-muted`; and the old light-surface aliases
resolve to the three Digital Clinical canvases. They remain temporarily for
component compatibility and must not be used to introduce new tokens.

## Header geometry and navigation behavior

The header sits in **normal document flow** and sticks to the top of the
viewport. It is not an overlay.

It was previously `position: fixed` inside a floating rounded capsule, which put
it in its own layer above the page. Every section then had to be padded out of
its way, and any section that forgot produced a collision — hero eyebrows and
headings repeatedly ended up underneath it. In flow the bar simply takes its own
space and whatever follows begins beneath it, so the entire class of collision
is gone rather than patched case by case.

| Token | Value | Role |
| --- | --- | --- |
| `--nav-height` | `4rem` | Resting height of the bar |
| `--nav-gap` | `0.75rem` | Breathing space used by sticky children |
| `--header-offset` | derived | How far a STICKY child must sit below the bar, and `scroll-padding-top` for anchors |
| `--section-rule` | 24% of `--navy-slate` | Hairline under the header and between sections |

`--header-offset` no longer means "clear the header" — nothing needs that now.
It only positions sticky children (biography rails, chapter heads) and keeps
anchor targets from landing under the pinned bar.

The bar is full-width with a `--section-rule` bottom border and a translucent
canvas surface. `.nav-inner` is only the centred content row: no radius, no
shadow, no border of its own.

**States.** `.is-compact` past 110px of scroll reduces the bar to `3.2rem`.
`.is-on-dark` repaints the whole band navy with `--on-navy` copy when a section
marked `data-nav-theme="dark"` passes beneath it.

**The bar no longer retracts on downward scroll.** That behaviour belonged to
the floating capsule. With the header in flow, translating it up pulled it over
the announcement strip — on the homepage it covered the strip at rest. A sticky
header that stays put is also more predictable. The scroll handler now only
drives the compact and dark-context states, and closes an open dropdown on
downward scroll.

### Section rules

`.mystree-page > :where(section + section)` draws a `--section-rule` hairline
between consecutive sections. `:where()` holds the inner selector at zero
specificity, so a section that must opt out does so from its own module with a
plain `section.className` rule (0,0,1,1) — which beats it deterministically
regardless of stylesheet order. The About closing photograph uses this, because
its negative top margin would otherwise put a rule across the middle of the
image.

### Announcement strip is home-only

The strip renders on `/` and nowhere else. `AnnouncementBar` reads `usePathname`
and returns `null` on every other route, so it is never emitted into the markup
rather than being hidden with per-page CSS — and because `usePathname` resolves
during SSR in the App Router, the server and client trees match on first paint.

Header geometry follows the strip automatically. `--announcement-height` and the
two values derived from it are declared on `body` at `0rem`, with
`body:has(.announcement-bar)` raising it to `4.1rem`. The derived values are
re-declared inside that rule because a custom property is substituted using the
value on the element where it is *declared* — redefining the input lower in the
cascade would not retroactively change a `--header-offset` declared on `:root`.
This also means dismissing the strip on the homepage collapses the offset with
no JavaScript. Browsers without `:has()` support fall back to the flush
(inner-page) offset.

The bar has three behavioral states, all scoped to `globals.css`:

- **Resting** — full height over the hero.
- **`.is-compact`** — past 110px of scroll the bar drops to `3.1rem`, the
  wordmark and booking action shrink, and the shadow lightens, so it reads as an
  editorial utility strip rather than a floating capsule. The existing
  hide-on-scroll-down / reveal-on-scroll-up behavior is unchanged.
- **`.is-on-dark`** — a section marked `data-nav-theme="dark"` sitting under the
  bar inverts it to a translucent `--navy-deep` surface with `--on-navy` copy, so
  the capsule never burns a white hole through a dark chapter. Detection
  hit-tests the bar's own band inside the existing throttled scroll handler
  rather than adding a second observer.

A revealed bar can still overlap mid-section content on narrow screens; that is
inherent to a fixed header. Section starts and anchor targets are protected by
`--header-offset`.

## About page exception

The About Us route is an explicit user-requested editorial redesign scoped to
`src/components/about/*` and `src/app/(marketing)/about/page.tsx`. It uses the
corporate palette plus the navy support family above.

### Section 01 — the human opening

An asymmetric 57/43 split: editorial copy on `--ivory`, photograph in its own
right-hand column. The earlier full-bleed overlay treatment and its
`--about-hero-*` overlay tokens are withdrawn — copy no longer sits over the
photograph, so no darkening wash is needed. The eyebrow uses `--navy-slate` and
the secondary action a navy rule rather than an orange outline. Image drift is
4%. Below 900px the composition is rebuilt: photograph leads at a 4:3 crop with
the face held in frame, copy follows in normal flow.

The headline reveals as two masked lines. The mask is presentational only; the
`h1` text content reads as one sentence for assistive technology and indexing.

### Section surfaces

| Section | Surface |
| --- | --- |
| 01 Opening | `--ivory` |
| 02 Why MyStree exists | `--alabaster` |
| 03 Philosophy | `--ivory` |
| 04 The MyStree point of view | `--navy-deep`, `data-nav-theme="dark"` |
| 05 The people | `--canvas` |
| 06 One continuous care story | `--alabaster` |
| Final Care closer to home | Photograph with a navy panel, `data-nav-theme="dark"` |

### Motion

Motion uses the installed framer-motion + lenis stack; GSAP is **not** installed
and was not added. The vocabulary is limited to masked line reveals, short y
translation, one 4% hero drift, a sticky philosophy image stage using a
`clip-path` inset reveal with a 1.025 scale settle over 780ms, a sticky doctor
biography rail, one scroll-linked line draw, and opacity crossfades. Below
1024px every sticky pairing collapses to linear flow: the philosophy stage
becomes an inline figure per statement, the chapter rail is replaced by inline
labels, and the continuity line becomes a static vertical rule.
`useReducedMotion()` and the reduced-motion media query neutralise entrances,
drift, the clip-path reveal and the reading-zone dimming.

### Photography

All twelve editorial images live in `public/images/about/` and are produced by
`scripts/generate-about-images.mjs`. They are illustrative scenes: they depict
no MyStree clinician and no MyStree room, and their alt text describes only what
is in the frame. Real clinician portraits are used unchanged in Section 05,
capped at `38vw` inside a thin navy paper frame so the portrait supports the
biography rather than dominating it.

Section 07 stays deliberately unillustrated. No authentic photograph of the
premises exists in the repository, and a generated interior must not stand in as
documentary evidence of the real clinic — that applies to the generated
consultation-room frame as much as to `public/public/contactus.webp`. The
consultation-space image is therefore used only inside the continuity sequence,
which describes how care moves rather than where it happens.

The final section uses true art direction rather than a crop: `<picture>` picks
the 1536x1024 landscape frame above 900px and the separately composed 1024x1536
portrait frame below it, fetching only one. `next/image` cannot express a
media-switched source, and both files are already optimised WebP, so the plain
element is correct here; intrinsic `width`/`height` are declared so the box is
reserved before decode.

## Team page exception

The `/doctors` route is an explicit user-requested clinician-led redesign scoped
to `src/components/team/*` and `src/app/(marketing)/doctors/page.tsx`. It
introduces no new colour values.

### Section surfaces

The roster itself is data, not markup: all three pages read it through
`getDoctors()` (see `docs/doctors-backend.md`), so a card's content can change
without any design change. Card layout must therefore tolerate a missing
`background`, `languages` or `experience` block — several records have none.

| Section | Surface |
| --- | --- |
| 01 Clinician hero | Photograph on `--navy-deep`, scrim only under the copy |
| 02 Proof ribbon | `--ivory` |
| 03 Intro | `--soft-neutral` |
| 04 Clinician directory | `--soft-neutral` |
| 05 Three-chapter story | `--surface-pearl` (light editorial spread) |
| 06 FAQ | `--ivory` |
| 07 Booking close | `--navy-deep`, `data-nav-theme="dark"` |

The three-chapter story is a **light** spread on a pinned stage. The track is
three viewports tall and the stage sticks below the header; as each chapter
becomes active the next photograph slides up from beneath the 22px rounded 4:5
frame and covers the one before it. The stack — not a crossfade — is the effect,
and the index rail on the right advances with it.

Because the three text chapters share one box, an inactive chapter must be
`visibility: hidden`, not merely transparent: a faint layer is still legible and
still takes the pointer. Below 900px, and under reduced motion, the track is
hidden entirely and the chapters render as a plain vertical list.

`--accent-on-light` (Flame mixed 70% into ink) is the accent for **small text on
a light surface**: pure Flame measures 3.31:1, which fails AA at 12px. Pure Flame
remains correct for borders, marks and large type.

## Pregnancy care page — `/services/prenatal`

### Current seven-section experience — light palette and scroll depth (2026-09-14)

The current implementation is `src/components/prenatal/prenatal-experience.tsx`
and its CSS Module. It supersedes the older prenatal-sections presentation.
Reference images guide the section order and composition, not the other brand's
colors, clinician identities, insurance arrangements, or birth-service claims.
The page uses the root Fraunces / Plus Jakarta Sans hierarchy and existing tokens.

The user explicitly withdrew the dark navy direction for this service page.
The current palette rhythm alternates warm Alabaster and tuned Corn Silk support
fields with restrained Uranian clinical-information bands. Pristine white cards
hold dense medical content; Slate is the foreground and Muted Slate supports
descriptions and metadata. Broad blue, green/sage and orange grounds are retired.
Flame is reserved for booking actions and small active cues.

Hero: warm canvas with a restrained Uranian consultation panel and curved
photographic edge. Care offering: Alabaster-to-Corn-Silk field with four native
disclosure rows. Journey: the dedicated Uranian band with three keyboard-accessible
trimester tabs, a pearl chapter panel and a vertical milestone list. Team: a
quiet Alabaster gallery with lightly tinted portrait cards, qualifications, languages and
direct clinician booking links. Approach: sage-to-sky editorial spread with a
photograph and four fully readable numbered principles. Reviews: three equal
cards on desktop, a native horizontal rail with 44px controls on mobile/tablet.
Cards use distinct blue, sage and gray-pearl mixes; stars use navy. The three
verbatim reviews and five-star ratings come from the user's current brief.
FAQ: mist surface with native disclosures and an explicitly reserved 4:3
MyStree photograph slot. Set `faqPhoto` in the component when supplied.

NABH accreditation and 10,000+ women are client-provided business claims from
this brief. Clinician credentials remain sourced from the shared doctor roster.
Existing generated pregnancy images illustrate care; they are not presented as
documentary photographs of MyStree clinicians or premises. Actual clinician
portraits are used only in their matching cards.

At 760px the split layouts become single columns. Journey selectors remain
visible without horizontal scrolling, portraits receive mobile crops, and
the approach photograph stops sticking. Essential controls are at least 44px;
focus is explicit, selected tabs have structural and color cues, and reduced
motion removes entrance, parallax and background drift and uses instant review
scrolling. Scroll-linked background auras, 4–8% image parallax and viewport
entrances run through Framer Motion on desktop and mobile. No
additional fonts, palette values or motion dependencies are introduced.

| Section | Surface |
| --- | --- |
| 01 Hero | Warm Alabaster with a restrained Uranian panel |
| 02 Care offering | Alabaster-to-Corn-Silk support field |
| 03 Journey | Uranian clinical-information band |
| 04 Approach | Corn Silk with a quiet cool edge |
| 05 Care team | Alabaster gallery; white, Uranian and Corn Silk card tints |
| 06 Reviews rail | Corn Silk-to-Alabaster field |
| 07 FAQ | Restrained Uranian ruled field |
| 08 Care continuum | Corn Silk / Alabaster editorial split |
| 09 Closing art | Alabaster with one Uranian focal corner |

The earlier deep-navy hero, sage fields and broad blue gradients are retired for
this route. All small accent text on the new light surfaces uses
`--accent-on-light`; Flame remains reserved for booking actions and active marks.

Terracotta/clay appears only as small markers: the journey nodes, the eyebrow,
the specialty label and the urgent-line rule. No section ground is orange.

The journey content is a real `<ol>` inside each accessible trimester tab panel.
Below 760px it becomes one vertical reading column without horizontal page
scroll. Background motion is decorative and `aria-hidden`.

## Typography rules

Fraunces (serif) and Plus Jakarta Sans (sans) are loaded once in the root layout
via `next/font/google`. Fraunces runs as a variable font with the `opsz` axis
enabled. **Never add a `<link>` to Google Fonts, an `@font-face`, or
`next/font/local`** — `next/font` already self-hosts both families and generates
size-adjusted fallbacks, so a second import double-loads the family and
reintroduces the layout shift it was there to prevent.

Serif stack: `var(--font-serif), Georgia, "Times New Roman", serif`.
Sans stack: `var(--font-sans), system-ui, sans-serif`.

| Rule | Value | Why |
| --- | --- | --- |
| Display tracking (h1/h2, 30px+) | `-0.025em` | Letterforms spaced correctly at 16px read loose at display sizes. |
| Body tracking | `normal` | Running copy needs no tracking; adding it slows reading. |
| All-caps labels under 14px | `0.1em`–`0.12em` | Capitals have no descenders or x-height variety, so tight caps read as one block. |
| Body leading | `≥1.5`, typically `1.6` | Below 1.5 a multi-line paragraph feels cramped. |
| Heading weight | 300 (serif), 600 (sans labels) | The serif carries emphasis; weight 700+ at 20px+ is an outlier. |
| `text-wrap` | `balance` on h1–h4, `pretty` on p/li/dd/blockquote/figcaption | `balance` evens every line and is capped at a few lines, so it suits headings; `pretty` only prevents a stranded last word, which is what body copy needs. |
| `font-synthesis` | `none`, globally | Stops the browser faking a missing weight or italic. A synthesised italic is a sheared roman, and it is the clearest tell of an unconsidered type stack. |
| `font-optical-sizing` | `auto` on serif headings | Uses the `opsz` axis so large sizes get their proper display cut. |

`-webkit-font-smoothing: antialiased` is deliberately **not** used: it thins
glyphs on macOS, which lowers effective contrast on a health site where
legibility outranks the slightly lighter look.

## The Services nav panel

A light two-column list that opens under the Services trigger. No icons, no
descriptions — the service names are the content, and anything added around
them competes with the only decision the panel exists to support. Nine items as
5 + 4, laid out **column-major** (`grid-auto-flow: column` over five rows) so
the list reads top-to-bottom then across, which is how a two-column list is
actually scanned.

Measured: 60px item pitch, 56px tap height, 18.3:1 contrast.

### The three interaction bugs this fixes

These are the failure modes that make most flyout menus feel broken, and all
three were present:

**1. The dead gap.** The panel sat at `top: calc(100% + 0.45rem)`, so 7px of
nothing separated the trigger from the panel. A pointer travelling diagonally
toward the first item left the wrapper mid-journey and the menu shut under the
cursor. The offset is now carried by the panel's own transparent `padding-top`,
so the gap is visually identical but *inside* the hover target — measured hit
gap is −6px, i.e. the hit areas overlap.

**2. No hover intent.** `onMouseLeave` closed instantly. There is now a 180ms
close delay that any re-entry cancels, which is what lets a diagonal finish.

**3. The click trap.** On a hover device the panel is already open when the
pointer arrives, so a plain toggle closed it — and since the pointer never
left, `mouseenter` could not fire again and the menu stayed shut until you
moved away and came back. A *mouse* click now only ever opens.
`event.detail === 0` distinguishes keyboard activation (Enter/Space) from a
real pointer, so keyboard and touch keep a genuine toggle.

### Other rules

- Hover handlers are only attached when `(hover: hover) and (pointer: fine)`.
  On touch, `mouseenter` fires synthetically on tap and immediately leaves,
  which makes the panel flicker; there the click handler alone drives it.
- **No `role="menu"`.** That role implies an application menu driven by arrow
  keys and makes a screen reader announce links as menu items. For navigation,
  a plain `<ul>` of links is correct and Tab already walks it.
- Escape closes and **returns focus to the trigger** — otherwise a keyboard
  user is dropped at the top of the document.
- `aria-expanded` on the trigger, `aria-controls` pointing at the panel id.
- Below 900px the panel is `display: none`; the mobile menu's own accordion
  handles it.

## The footer

One full-bleed **wine** band (`--footer-surface`), rendered from the root
layout so it reaches every route.

**The one sanctioned warm ground on the site.** The no-orange-background rule
still holds everywhere else; the client asked for burgundy here specifically.
Wine is mixed 12% into `--navy` so it belongs to the palette rather than
arriving as an unrelated swatch — the navy cools the red just enough to stop it
reading as maroon signage. It is deliberately not pink: wine is the grown-up
end of that family, and it carries white at 10:1 where a pink of the same
character would fail.

Ink: `--footer-ink` #fdf8f7 for headings, wordmark and the phone number;
`--footer-ink-soft` #ecdde0 for links. Both are *warm* off-whites — a cool grey
on a wine ground goes muddy.
 A footer that fades into the page ground reads as the place a
layout ran out; a committed block of colour reads as a destination.

**Two-zone model.** Left 46% is brand expression — the positioning line in
Fraunces 300 and an oversized lowercase wordmark. Right 54% is utility — six
link groups as **3 columns × 2 rows, never 6 across**. Six adjacent columns of
links read as a wall and nothing gets scanned; two rows of three give each
group a horizon.

**Group headings sit at the same size as their links** (`--type-ui`) and are
separated by weight (600) plus a 1.5rem gap, not by scale. A heading that is
both bolder and bigger shouts twice.

The phone number is the only bolded item in the footer — it is the action most
people arrive there looking for. Link rhythm is deliberately loose (0.85rem
gap): footer lists are scanned, not read.

The wordmark is live text in the display serif, not the logo file: at that size
the lettering *is* the gesture, and text stays selectable, scalable and
zoomable. It carries a `-0.04em` left margin because large lowercase serif has
side-bearing that otherwise makes it look indented against the line above.

**Spacing is the whole design.** These are measured values, not round numbers,
and they are what separate a composed footer from a cramped one:

| Metric | Value |
| --- | --- |
| Group heading → first link | **68px** (`margin-bottom: 3.1rem`) |
| Link to link pitch | **42px** (20.3px box + `1.35rem` gap) |
| End of row 1 → row 2 heading | **135px** (`row-gap: clamp(3.5rem, 8vw, 8.25rem)`) |
| Statement vs first column heading | within 5px, via a `-0.35rem` optical nudge |

The row gap is the one that matters most. At a smaller value the two rows read
as one six-group block and nothing gets scanned; at this value each row is its
own horizon. The statement needs the negative nudge because the serif at
3.25rem/1.08 carries more leading above its cap than a 14px sans heading does,
so matching the box tops would leave it sitting visibly low.

Breakpoints: 1100px the two zones stack (the brand zone gets narrower than its
own wordmark), 760px the groups go to 2 columns, 460px to 1 and the legal bar
stacks.

**Every footer href must resolve.** The footer is the most-crawled block on a
site, so a dead link costs more there than anywhere else. The four "More
services" links point at the homepage services anchor until those pages exist,
rather than at a 404.

## The type scale

All font sizes come from tokens in `globals.css`. **A raw `rem` value in a
component is how the drift comes back** — before this pass the codebase held 52
distinct literal sizes, eight of which all rounded to 12px.

Fixed steps (`--type-*`): micro 10 · metadata-tag 11 · label 12 · caption 13 ·
ui 14 · body 15 · body-lg 16 · reading 17 · lead 18 · title-xs 20 · title-sm 22 ·
title-md 24 · title-lg 30 · title-xl 32 · numeral 60.

Fluid steps: `--type-display-hero`, `--type-display-title`,
`--type-display-subhead`, `--type-editorial-lead`.

Three sizes sit deliberately off-ladder and are the only sanctioned exceptions:
`1.45rem` (obgyn-consults), `1.65rem` (navbar), `0.9em` (about-visit). Anything
else off-ladder is drift.

**Minimum size is 10px.** A diagram label was resolving to 8.8px via a
`clamp()` floor of `0.55rem`; floors belong on the ladder too.

### Still outstanding

83 `clamp()` expressions remain genuinely distinct, 81 of them used exactly
once — essentially a bespoke fluid curve per heading. These were **not**
mechanically consolidated: a clamp has three parameters, and merging two curves
with different `vw` terms changes size at intermediate widths, where rewrapping
regressions hide and no single screenshot catches them. Only four whose entire
curve matched an existing token were folded. Reducing the rest is a design
decision — pick 3–4 fluid steps, then migrate headings onto them one section at
a time with a visual check at each breakpoint.

## The booking CTA

Booking is the site's one conversion goal, so it has exactly one appearance:
the global `.cta-book` primitive in `globals.css`. Every other action on the
page must stay quieter than it. Before this the same action shipped as five
different things — flat Flame pills, a Pumpkin square, a bordered ghost and a
plain underline — so nothing read as "the button".

| Token / class | Value |
| --- | --- |
| Fill | `linear-gradient(170deg, #cf4219, #b03310)` — a deepened Flame |
| Label | `#ffffff`, 600 weight |
| Hover fill | `#c73f16 → #a52f0e` (deeper, never lighter) |
| Halo / focus ring | `--brand-flame` at low alpha |
| Sizes | `.is-small` 44px · default 48px · `.is-large` 56px |
| `.is-pulse` | closing CTAs only |

**Why the fill is not pure Flame.** `#ed5b2d` carries white text at 3.42:1 and
fails AA. The gradient measures 4.72:1 at its light stop and 6.31:1 at its dark
one. Pure Flame is still present — as the halo, the glow and the focus ring,
where 3:1 is the correct bar for non-text. The button reads brighter than it
measures, which is the point.

**Hover must not lighten the fill.** A brighter orange pushes white under AA, so
hover deepens the gradient (5.06:1 / 6.97:1), lifts the pill 2px, widens the
warm halo and sweeps a specular sheen across once. Depth and light, never a
colour change. All of it is disabled under `prefers-reduced-motion`.

`.is-pulse` is a slow 3.2s halo for a page's closing CTA only, where it is the
last thing left to do. It pauses on hover so it never fights the hover state.
Do not put it on a CTA that sits beside other choices.

Minimum height is 44px everywhere, including the icon-only nav button on mobile.

No section uses an orange background. Flame appears only on the primary actions,
the card booking action, the 2px active-filter underline and the active chapter
marker; Pumpkin only on the hero eyebrow, chapter numerals and booking eyebrow.
The active filter also carries a weight change, so state never depends on hue
alone.

### Hero

The hero uses the authentic photograph of Dr. Smitha A.P supplied as
`doctorimage.png`, converted to
`public/images/team/mystree-dr-smitha-consultation-room.webp` (1916x821,
1.67MB PNG to 97KB WebP). `object-position: 22% 28%` holds her in the left of
the frame so the copy column sits over the quieter right side, and the scrim is
a single directional gradient covering only that column rather than a wash over
the whole photograph. Below 900px the photograph moves into normal flow at a
16:11 crop with the copy beneath it on navy — no text over a face-cropped image.

### Directory

Editorial portrait dossiers on a 3 / 2 / 1 grid with a 12px radius and a border
rather than a shadow. Search is client-side, matches name, specialty, title and
category, and runs through `useDeferredValue` so typing never stutters. The
result count is announced via `role="status"`. An empty search renders a
recovery action, never a broken grid.

### Story

A 300vh track with a 100svh sticky stage on desktop. Chapter panels stack:
each rises from `translateY(100%)` to `0` over the one before it, driven by a
single `scrollYProgress` subscription whose unsubscribe is the effect cleanup.
Below 900px, and under `prefers-reduced-motion`, the track is removed entirely
and the chapters render as plain vertical articles.

### Photography status

The three story images are **not generated**. They depict clinicians, and no
generated likeness may stand in for a real MyStree doctor. Each stage renders a
labelled placeholder at the correct 4:5 ratio so the real files drop in without
layout shift; prompts and dimensions are in `image-prompts-team.md`. Placeholders
are deliberately excluded from the page's structured data.

## Clinic visit exception

Section 07 of the About route is an explicit user-requested editorial redesign
scoped to `about-visit.module.css` and `about-visit.tsx`. It replaces the earlier
copy-plus-rail composition.

| Local token | Value | Role |
| --- | --- | --- |
| `--visit-canvas` | `#faf8f2` | Parchment section surface |
| `--visit-ink` | `#24211e` | Headline and link values |
| `--visit-muted` | `#6f6862` | Eyebrow, body, labels |
| `--visit-rule` | `22%` of muted | Hairline dividers |
| `--visit-accent` | `--brand-ink` | Arrows, contour, primary action |

Measured contrast on the canvas: headline and link values 15.08:1, body / eyebrow
/ row labels 5.16:1, and white on the accent CTA 6.56:1.

The layout is a 55 / gutter / 45 grid. The left column carries the eyebrow, a
two-line masked serif headline, a 33rem measure and a rule-topped
"Private consultations · By appointment" line that weights the lower half. The
right column is a numbered ledger — index, tracked uppercase label, actionable
value — on hairline rules, with one square-cut terracotta action. There are no
cards, icons or panels in this section.

The single non-typographic mark is a thin SVG contour drawn down the gutter
between the two columns, animated once with `pathLength`. It is hidden below
900px.

Below 900px the section is recomposed rather than stacked: the CTA is lifted
above the ledger with `order: -1` so the decision sits directly under the
argument for it, the "by appointment" line is dropped as redundant beside the
ledger head, and each row becomes a label/value pair on one line with a 2.75rem
touch target. The closing photograph is pulled up into this section's lower
padding with a negative top margin, so the two read as one composition.

## Curtain-reveal outcomes exception

The user explicitly requested a sticky family photograph with a cream outcomes sheet. This exception is scoped to `curtain-reveal-outcomes.module.css` and `curtain-reveal-outcomes.tsx`; it does not replace the corporate palette elsewhere.

| Local token | Value | Role |
| --- | --- | --- |
| `--outcomes-sheet` | `#F4F1EA` | Outcomes sheet surface |
| `--outcomes-track` | `#E5E0D5` | Radial gauge track |
| `--outcomes-photo-fallback` | `#FFFFFF` | Neutral fallback behind the requested family photograph |

Gauge progress strokes use existing corporate swatches (`--brand-flame`, `--brand-pumpkin`, `--brand-cadet-gray`, and `--brand-uranian-blue`). The section keeps the shared Fraunces / Plus Jakarta Sans hierarchy and does not use a green background for the sheet or page canvas.

## Split-text reveal exception

The user explicitly requested a full-bleed hormonal-balance story reveal. This exception is scoped to `split-text-reveal.module.css` and `split-text-reveal.tsx`; it does not change the normal page canvas, navigation, or typography system.

| Local token | Value | Role |
| --- | --- | --- |
| `--split-surface` | `#FAF8F5` | Reveal track surface |
| `--split-ink` | `#18181B` | Initial split-text color |
| `--split-photo-overlay` | `24% warm black gradient` | Subtle legibility overlay over the photograph |

The large uppercase display treatment uses Plus Jakarta Sans from the root font setup at the existing 600 weight; it is a scale/layout exception only. The white state is reserved for text over the darkened photo, with a soft surface wash during the initial dark-text state so the lettering never relies on a heavy black background for contrast.

The initial reveal uses a localized Corn Silk radial halo rather than a full-viewport white wash. At the final state, the wave chart and story copy align on a shared visual center: the chart uses a dark translucent editorial card, while the story copy uses a restrained dark glass block with a Pumpkin accent edge. This treatment is scoped to `split-text-reveal.module.css`.

## Doctor spotlight quote exception

The Doctor Spotlight & Interactive Quote Carousel is an explicit user-requested section treatment scoped to `doctor-spotlight-quote.module.css` and `doctor-spotlight-quote.tsx`. It does not replace the corporate palette elsewhere on the site.

| Local token | Value | Role |
| --- | --- | --- |
| `--spotlight-sky` | `#98B7D2` | Section background |
| `--spotlight-rose` | `#F43F5E` | Clinician CTA, quote mark, active accent |
| `--spotlight-rose-hover` | `#E11D48` | CTA hover state |
| `--spotlight-cream` | `#F4F1EA` | Quote card surface |
| `--spotlight-ink` | `#1C1917` | Quote card copy and controls |

The section uses the shared Fraunces / Plus Jakarta Sans font setup. The user-requested headline uses Plus Jakarta Sans at a bold display scale as a scoped layout and weight exception. On screens below 1024px, the doctor image becomes a normal-flow visual between the headline and quote card. The carousel controls remain keyboard and touch accessible, and reduced motion removes entrance and quote movement.

## Whole-woman ecosystem exception

The How MyStree Works section is an explicit user-requested interactive care wheel scoped to `how-mystree-works.module.css` and `how-mystree-works.tsx`. It uses the shared cream surface and typography hierarchy, with the ten clinical-node colors supplied for the radial care map:

| Node | Exact color | Role |
| --- | --- | --- |
| Reproductive & Hormones | `#D9534F` | Care wheel node |
| Pelvic Floor Rehab | `#B87B8D` | Care wheel node |
| Clinical Nutrition | `#DE1B85` | Care wheel node |
| Mental Health | `#E63988` | Care wheel node |
| Dermatology & Skin | `#661D4C` | Care wheel node |
| Stress & Cortisol | `#9E6F7A` | Care wheel node |
| Sleep Recovery | `#B88B8A` | Care wheel node |
| Metabolism & PCOS | `#F3A738` | Care wheel node |
| Antenatal & Birth | `#F06543` | Care wheel node |
| Fertility & AMH | `#E05353` | Care wheel node |

The uploaded `public/images/services/howmystreeworks.jpg` is the primary crisp visual in the middle of the section. The accessible node buttons remain as transparent interaction targets over the matching image nodes, so the wheel is not duplicated by a second visual HTML ring. Node buttons support pointer, touch, and keyboard selection; focus moves through the wheel with arrow keys, Home, and End. Reduced motion removes entrance, node, and detail transitions.

## Patient reviews exception

The patient reviews section is an explicit user-requested final horizontal review rail scoped to `patient-reviews.module.css` and `patient-reviews.tsx`. It follows a white editorial canvas with pale blue-gray cards, a warm star accent, and a restrained navy ink color so the last section feels open and reassuring.

| Local token | Value | Role |
| --- | --- | --- |
| `--reviews-surface` | `#FFFFFF` | Section background |
| `--reviews-card` | `18%` Uranian Blue mixed with white | Default review card |
| `--reviews-card-blue` | `13%` Cadet Gray mixed with white | Blue-gray card surface |
| `--reviews-card-blush` | `8%` Pumpkin mixed with white | Blush card surface |
| `--reviews-card-cream` | `64%` Corn Silk mixed with white | Cream card surface |
| `--reviews-ink` | `#152D60` | Review copy and names |
| `--reviews-muted` | `#66758A` | Supporting copy and carousel hint |
| `--reviews-star` | `#F7C77F` | Five-star rating accent |
| `--reviews-heading-accent` | `#5A7FE8` | Heading accent, score, and controls |
| `--reviews-line` | `34%` Cadet Gray mixed with white | Card separators and controls |

Cards are image-free and show a small initials mark with the patient name beneath the review. Dates, review counts, profile metadata, owner replies, and timeline labels are intentionally omitted. The rail supports native touch/trackpad dragging, keyboard focus, and previous/next buttons; reduced motion removes smooth scrolling. This is the final homepage section.

## Care bridge exception

The centered MyStree service bridge is an explicit user-requested section scoped to `care-bridge.module.css` and `care-bridge.tsx`. It uses a light premium blue surface derived from Uranian Blue, dark readable copy, and a direct services action to create a calm handoff from reviews into the care offering.

| Local token | Value | Role |
| --- | --- | --- |
| `--bridge-surface` | `42%` Uranian Blue mixed with white | Section background |
| `--bridge-ink` | `--foreground` | Heading and primary copy |
| `--bridge-muted` | `#506779` | Supporting copy |
| `--bridge-action` | `#354C60` | Services action |
| `--bridge-action-hover` | `#263B4D` | Services action hover |

The section keeps the shared Fraunces / Plus Jakarta Sans hierarchy and links directly to the existing Services section at `#services`.

## Journey banner and footer

The start-journey banner and site footer are explicit user-requested sections scoped to `start-journey.module.css` and `site-footer.module.css`. They keep the corporate palette and shared typography. The supplied journey illustration remains the visual source; its dark teal artwork is preserved as an image asset while copy and actions use the existing interface tokens.

| Local token | Value | Role |
| --- | --- | --- |
| `--journey-surface` | `--foreground` | Banner copy surface and image fallback |
| `--journey-action` | `--brand-pumpkin` | Start journey action |
| `--footer-surface` | `#F4B6D5` | Scoped blush footer surface |
**Why the fill is not pure Flame.** `#ed5b2d` carries white text at 3.42:1 and
fails AA. The gradient measures 4.72:1 at its light stop and 6.31:1 at its dark
one. Pure Flame is still present — as the halo, the glow and the focus ring,
where 3:1 is the correct bar for non-text. The button reads brighter than it
measures, which is the point.

**Hover must not lighten the fill.** A brighter orange pushes white under AA, so
hover deepens the gradient (5.06:1 / 6.97:1), lifts the pill 2px, widens the
warm halo and sweeps a specular sheen across once. Depth and light, never a
colour change. All of it is disabled under `prefers-reduced-motion`.

`.is-pulse` is a slow 3.2s halo for a page's closing CTA only, where it is the
last thing left to do. It pauses on hover so it never fights the hover state.
Do not put it on a CTA that sits beside other choices.

Minimum height is 44px everywhere, including the icon-only nav button on mobile.

No section uses an orange background. Flame appears only on the primary actions,
the card booking action, the 2px active-filter underline and the active chapter
marker; Pumpkin only on the hero eyebrow, chapter numerals and booking eyebrow.
The active filter also carries a weight change, so state never depends on hue
alone.

### Hero

The hero uses the authentic photograph of Dr. Smitha A.P supplied as
`doctorimage.png`, converted to
`public/images/team/mystree-dr-smitha-consultation-room.webp` (1916x821,
1.67MB PNG to 97KB WebP). `object-position: 22% 28%` holds her in the left of
the frame so the copy column sits over the quieter right side, and the scrim is
a single directional gradient covering only that column rather than a wash over
the whole photograph. Below 900px the photograph moves into normal flow at a
16:11 crop with the copy beneath it on navy — no text over a face-cropped image.

### Directory

Editorial portrait dossiers on a 3 / 2 / 1 grid with a 12px radius and a border
rather than a shadow. Search is client-side, matches name, specialty, title and
category, and runs through `useDeferredValue` so typing never stutters. The
result count is announced via `role="status"`. An empty search renders a
recovery action, never a broken grid.

### Story

A 300vh track with a 100svh sticky stage on desktop. Chapter panels stack:
each rises from `translateY(100%)` to `0` over the one before it, driven by a
single `scrollYProgress` subscription whose unsubscribe is the effect cleanup.
Below 900px, and under `prefers-reduced-motion`, the track is removed entirely
and the chapters render as plain vertical articles.

### Photography status

The three story images are **not generated**. They depict clinicians, and no
generated likeness may stand in for a real MyStree doctor. Each stage renders a
labelled placeholder at the correct 4:5 ratio so the real files drop in without
layout shift; prompts and dimensions are in `image-prompts-team.md`. Placeholders
are deliberately excluded from the page's structured data.

## Clinic visit exception

Section 07 of the About route is an explicit user-requested editorial redesign
scoped to `about-visit.module.css` and `about-visit.tsx`. It replaces the earlier
copy-plus-rail composition.

| Local token | Value | Role |
| --- | --- | --- |
| `--visit-canvas` | `#faf8f2` | Parchment section surface |
| `--visit-ink` | `#24211e` | Headline and link values |
| `--visit-muted` | `#6f6862` | Eyebrow, body, labels |
| `--visit-rule` | `22%` of muted | Hairline dividers |
| `--visit-accent` | `--brand-ink` | Arrows, contour, primary action |

Measured contrast on the canvas: headline and link values 15.08:1, body / eyebrow
/ row labels 5.16:1, and white on the accent CTA 6.56:1.

The layout is a 55 / gutter / 45 grid. The left column carries the eyebrow, a
two-line masked serif headline, a 33rem measure and a rule-topped
"Private consultations · By appointment" line that weights the lower half. The
right column is a numbered ledger — index, tracked uppercase label, actionable
value — on hairline rules, with one square-cut terracotta action. There are no
cards, icons or panels in this section.

The single non-typographic mark is a thin SVG contour drawn down the gutter
between the two columns, animated once with `pathLength`. It is hidden below
900px.

Below 900px the section is recomposed rather than stacked: the CTA is lifted
above the ledger with `order: -1` so the decision sits directly under the
argument for it, the "by appointment" line is dropped as redundant beside the
ledger head, and each row becomes a label/value pair on one line with a 2.75rem
touch target. The closing photograph is pulled up into this section's lower
padding with a negative top margin, so the two read as one composition.

## Curtain-reveal outcomes exception

The user explicitly requested a sticky family photograph with a cream outcomes sheet. This exception is scoped to `curtain-reveal-outcomes.module.css` and `curtain-reveal-outcomes.tsx`; it does not replace the corporate palette elsewhere.

| Local token | Value | Role |
| --- | --- | --- |
| `--outcomes-sheet` | `#F4F1EA` | Outcomes sheet surface |
| `--outcomes-track` | `#E5E0D5` | Radial gauge track |
| `--outcomes-photo-fallback` | `#FFFFFF` | Neutral fallback behind the requested family photograph |

Gauge progress strokes use existing corporate swatches (`--brand-flame`, `--brand-pumpkin`, `--brand-cadet-gray`, and `--brand-uranian-blue`). The section keeps the shared Fraunces / Plus Jakarta Sans hierarchy and does not use a green background for the sheet or page canvas.

## Split-text reveal exception

The user explicitly requested a full-bleed hormonal-balance story reveal. This exception is scoped to `split-text-reveal.module.css` and `split-text-reveal.tsx`; it does not change the normal page canvas, navigation, or typography system.

| Local token | Value | Role |
| --- | --- | --- |
| `--split-surface` | `#FAF8F5` | Reveal track surface |
| `--split-ink` | `#18181B` | Initial split-text color |
| `--split-photo-overlay` | `24% warm black gradient` | Subtle legibility overlay over the photograph |

The large uppercase display treatment uses Plus Jakarta Sans from the root font setup at the existing 600 weight; it is a scale/layout exception only. The white state is reserved for text over the darkened photo, with a soft surface wash during the initial dark-text state so the lettering never relies on a heavy black background for contrast.

The initial reveal uses a localized Corn Silk radial halo rather than a full-viewport white wash. At the final state, the wave chart and story copy align on a shared visual center: the chart uses a dark translucent editorial card, while the story copy uses a restrained dark glass block with a Pumpkin accent edge. This treatment is scoped to `split-text-reveal.module.css`.

## Doctor spotlight quote exception

The Doctor Spotlight & Interactive Quote Carousel is an explicit user-requested section treatment scoped to `doctor-spotlight-quote.module.css` and `doctor-spotlight-quote.tsx`. It does not replace the corporate palette elsewhere on the site.

| Local token | Value | Role |
| --- | --- | --- |
| `--spotlight-sky` | `#98B7D2` | Section background |
| `--spotlight-rose` | `#F43F5E` | Clinician CTA, quote mark, active accent |
| `--spotlight-rose-hover` | `#E11D48` | CTA hover state |
| `--spotlight-cream` | `#F4F1EA` | Quote card surface |
| `--spotlight-ink` | `#1C1917` | Quote card copy and controls |

The section uses the shared Fraunces / Plus Jakarta Sans font setup. The user-requested headline uses Plus Jakarta Sans at a bold display scale as a scoped layout and weight exception. On screens below 1024px, the doctor image becomes a normal-flow visual between the headline and quote card. The carousel controls remain keyboard and touch accessible, and reduced motion removes entrance and quote movement.

## Whole-woman ecosystem exception

The How MyStree Works section is an explicit user-requested interactive care wheel scoped to `how-mystree-works.module.css` and `how-mystree-works.tsx`. It uses the shared cream surface and typography hierarchy, with the ten clinical-node colors supplied for the radial care map:

| Node | Exact color | Role |
| --- | --- | --- |
| Reproductive & Hormones | `#D9534F` | Care wheel node |
| Pelvic Floor Rehab | `#B87B8D` | Care wheel node |
| Clinical Nutrition | `#DE1B85` | Care wheel node |
| Mental Health | `#E63988` | Care wheel node |
| Dermatology & Skin | `#661D4C` | Care wheel node |
| Stress & Cortisol | `#9E6F7A` | Care wheel node |
| Sleep Recovery | `#B88B8A` | Care wheel node |
| Metabolism & PCOS | `#F3A738` | Care wheel node |
| Antenatal & Birth | `#F06543` | Care wheel node |
| Fertility & AMH | `#E05353` | Care wheel node |

The uploaded `public/images/services/howmystreeworks.jpg` is the primary crisp visual in the middle of the section. The accessible node buttons remain as transparent interaction targets over the matching image nodes, so the wheel is not duplicated by a second visual HTML ring. Node buttons support pointer, touch, and keyboard selection; focus moves through the wheel with arrow keys, Home, and End. Reduced motion removes entrance, node, and detail transitions.

## Patient reviews exception

The patient reviews section is an explicit user-requested final horizontal review rail scoped to `patient-reviews.module.css` and `patient-reviews.tsx`. It follows a white editorial canvas with pale blue-gray cards, a warm star accent, and a restrained navy ink color so the last section feels open and reassuring.

| Local token | Value | Role |
| --- | --- | --- |
| `--reviews-surface` | `#FFFFFF` | Section background |
| `--reviews-card` | `18%` Uranian Blue mixed with white | Default review card |
| `--reviews-card-blue` | `13%` Cadet Gray mixed with white | Blue-gray card surface |
| `--reviews-card-blush` | `8%` Pumpkin mixed with white | Blush card surface |
| `--reviews-card-cream` | `64%` Corn Silk mixed with white | Cream card surface |
| `--reviews-ink` | `#152D60` | Review copy and names |
| `--reviews-muted` | `#66758A` | Supporting copy and carousel hint |
| `--reviews-star` | `#F7C77F` | Five-star rating accent |
| `--reviews-heading-accent` | `#5A7FE8` | Heading accent, score, and controls |
| `--reviews-line` | `34%` Cadet Gray mixed with white | Card separators and controls |

Cards are image-free and show a small initials mark with the patient name beneath the review. Dates, review counts, profile metadata, owner replies, and timeline labels are intentionally omitted. The rail supports native touch/trackpad dragging, keyboard focus, and previous/next buttons; reduced motion removes smooth scrolling. This is the final homepage section.

## Care bridge exception

The centered MyStree service bridge is an explicit user-requested section scoped to `care-bridge.module.css` and `care-bridge.tsx`. It uses a light premium blue surface derived from Uranian Blue, dark readable copy, and a direct services action to create a calm handoff from reviews into the care offering.

| Local token | Value | Role |
| --- | --- | --- |
| `--bridge-surface` | `42%` Uranian Blue mixed with white | Section background |
| `--bridge-ink` | `--foreground` | Heading and primary copy |
| `--bridge-muted` | `#506779` | Supporting copy |
| `--bridge-action` | `#354C60` | Services action |
| `--bridge-action-hover` | `#263B4D` | Services action hover |

The section keeps the shared Fraunces / Plus Jakarta Sans hierarchy and links directly to the existing Services section at `#services`.

## Journey banner and footer

The start-journey banner and site footer are explicit user-requested sections scoped to `start-journey.module.css` and `site-footer.module.css`. They keep the corporate palette and shared typography. The supplied journey illustration remains the visual source; its dark teal artwork is preserved as an image asset while copy and actions use the existing interface tokens.

| Local token | Value | Role |
| --- | --- | --- |
| `--journey-surface` | `--foreground` | Banner copy surface and image fallback |
| `--journey-action` | `--brand-pumpkin` | Start journey action |
| `--footer-surface` | `#F4B6D5` | Scoped blush footer surface |
| `--footer-ink` | `--foreground` | Footer primary text and links |
| `--footer-muted` | `color-mix(in srgb, --foreground 70%, --footer-surface)` | Footer supporting text |

Desktop keeps the illustration behind the copy in a single banner. Mobile separates the copy and illustration into stacked panels and uses contain sizing so the supplied artwork is not cropped. Footer columns collapse to a two-column grid and retain keyboard-visible links and touch-sized actions.

The user-requested surface rhythm adds restrained warm and cool tints around the existing section surfaces. These are outer section backgrounds only; cards and overlays keep their scoped tokens above. Services uses `color-mix(in srgb, --brand-pumpkin 7%, --hero-frame)`, Specialty uses `color-mix(in srgb, --brand-pumpkin 4%, --hero-frame)`, Doctors uses a white-to-`color-mix(in srgb, --brand-cadet-gray 9%, --canvas)` gradient, How MyStree Works uses `color-mix(in srgb, --brand-pumpkin 5%, --hero-frame)`, and Start your journey uses `color-mix(in srgb, --brand-pumpkin 6%, --canvas)`. The sequence keeps the opening image-led sections grounded, adds a soft pumpkin cue without overwhelming the page, and returns to cooler blue-gray whitespace for the care-team rail.

The footer surface is `--footer-surface: #132238`, scoped to
`site-footer.module.css`. The blush `#F4B6D5` is withdrawn: the page now closes
on a deep navy section, and continuing that tone means the scroll resolves into
one dark chord rather than dropping into an unrelated pink. Footer ink is
`#f4efe4` (13.9:1 on the surface) and muted copy `#9fb0c4`; the hover chips
invert ink and surface, so they read warm-white-on-navy. The rounded top corners
are removed — against a navy section above they exposed cream slivers between
two dark blocks. The legal strip keeps its `color-mix` tint of the surface with
Pumpkin. The social row is limited to accessible Facebook, Instagram, and
YouTube icon links.

## Prenatal care service page exception — superseded note

The earlier rose/plum prenatal experiment is retired. The authoritative
Prenatal Care palette, surface sequence, foreground roles and interaction rules
are documented in “Pregnancy care page — `/services/prenatal`” above and consume
only the current MyStree Digital Clinical tokens. Typography remains Fraunces and
Plus Jakarta Sans; the layout and content structure are unchanged by this color
refactor.

## Clinician profile storytelling page exception

The Clinician Profile page (`/doctors/[slug]`) is an explicit user-requested exception scoped to `doctor-profile.module.css` and `page.tsx` under `src/app/(marketing)/doctors/[slug]`. Modeled after the reference MIDI healthcare profile design, it surrounds the clinician's story in a warm blush outer frame with a centered alabaster card, balancing clinical rigor with empathetic human storytelling.

| Local token | Hex / Value | Role |
| --- | --- | --- |
| `--profile-outer-bg` | `#FDECEF` | Warm rose-blush frame surrounding the profile card |
| `--profile-card-bg` | `#FAF8F5` | Centered warm alabaster card ground |
| `--profile-ink` | `#1C1520` | Deep warm plum-navy headings |
| `--profile-body` | `#483F44` | High-contrast editorial body text |
| `--profile-muted` | `#6E646A` | Subtitles, credential tags, and clinical facts |
| `--profile-border` | `#E8DFD8` | Soft card and list separator line |
| `--profile-accent` | `#D45431` | Booking CTA button and focus indicator |
| `--profile-tag-bg` | `#F4EDE6` | Clinical specialty & credential pill fill |
| `--profile-tag-ink` | `#382F33` | Pill text |

The layout features a two-column editorial split on desktop (collapsing to single column on mobile):
- **Left Column**: High-resolution clinician portrait, clinical facts (Fee: ₹600, Experience, Languages, Consultation types), direct booking CTA button, and Indiranagar clinic phone link.
- **Right Column**: Specialty eyebrow, clinician name and titles in Fraunces serif, clinical background overview, and structured Q&A storytelling reflections (*An early passion*, *Her/Their philosophy*, *Offering empathy, and options*).

## Blog Editorial Page ("The MyStree Take") Exception

The Blog Page (`/blog`), comprising the Editorial Masthead (`BlogHero`), Featured Editorial Slider (`FeaturedBlogSlider`), and Latest Articles Grid (`BlogLatest`), is an explicit user-requested section exception scoped to `src/app/(marketing)/blog/` and `src/components/blog/`.

### Continuous Canvas & Card System:
- **Base Screen Canvas**: `#FAF8F6` (Porcelain Canvas) is applied uniformly across the entire page canvas (`<main className="min-h-screen bg-[#FAF8F6]">`, `.heroSection`, `.sliderSection`, and `.section`) so background color is preserved without sharp color divisions between sections.
- **Card Backdrop Rule**: `#F6F1EA` (Warm Alabaster) is used as the card backdrop whenever `#841B4D` (Rich Berry / Deep Wine) is used as text, headings, or outline borders.
- **Editorial Wine / Deep Berry Foreground**: `#841B4D` (HEX `#841B4D`, RGB `132, 27, 77`) is used for headlines, masthead titles, category tags, filters, and outline borders.

| Local token | Hex / Value | Role | Measured Contrast |
| --- | --- | --- | --- |
| `--blog-base-canvas` | `#FAF8F6` | Base screen canvas across all blog sections | Baseline light |
| `--blog-card-backdrop` | `#F6F1EA` | Warm Alabaster backdrop for cards with berry text/borders | High warmth |
| `--blog-ink-berry` | `#841B4D` | Rich Berry for masthead, headings, category tags, borders | 8.70:1 on `#FAF8F6` (AAA), 8.15:1 on `#F6F1EA` (AAA) |
| `--blog-ink-slate` | `#4A6173` | Clinical slate for standfirst and supporting text | 6.80:1 on `#FAF8F6` (AAA) |
| `--blog-card-berry-block` | `#841B4D` | Solid berry block for featured hero slider left card | Baseline dark berry |
| `--blog-ink-light` | `#FFFFFF` | Crisp white text on berry card surfaces | 8.50:1 on `#841B4D` (AAA) |
| `--blog-ink-muted-light` | `rgba(255, 255, 255, 0.7)` | Metadata and ledger on berry surfaces | 5.95:1 on `#841B4D` (AA) |
| `--blog-border-berry` | `rgba(132, 27, 77, 0.22)` | Subtle berry card outline and divider hairline | 1.4:1 subtle boundary |
| `--blog-card-shadow-hover` | `rgba(132, 27, 77, 0.22)` | Ambient berry glow on card hover elevation | Floating depth |

### Component Architecture & Behaviors:
1. **BlogHero (`src/components/blog/blog-hero.tsx` & `.module.css`)**:
   - Canvas: `#FAF8F6` Porcelain Canvas.
   - Masthead: Tracked mono eyebrow "THE", italic Fraunces serif "mystree", and bold sans "TAKE" in `#841B4D`.
   - Standfirst: Fraunces serif in `#4A6173`.
   - Divider: Sine wave SVG in `rgba(132, 27, 77, 0.3)`.

2. **FeaturedBlogSlider (`src/components/blog/featured-blog-slider.tsx` & `.module.css`)**:
   - Section Canvas: `#FAF8F6` Porcelain Canvas.
   - Card Left Block: Solid `#841B4D` Rich Berry with white Fraunces headline, mono metadata, and "Read more" link.
   - Card Right Block: `#F6F1EA` Warm Alabaster canvas with circular clinical photography vignette, berry arc, cellular SVG pattern, and white focal vector line.
   - Carousel Controls: Arrow and dot indicators in `#841B4D`.

3. **BlogLatest (`src/components/blog/blog-latest.tsx` & `.module.css`)**:
   - Section Canvas: `#FAF8F6` Porcelain Canvas (ensuring uninterrupted background color across `/blog`).
   - Header & Filters: Heading "The Latest" in `#841B4D`; search input and topic/sort dropdowns styled with `#841B4D` borders and labels. On mobile (<=640px), controls stack vertically with 44px min-height touch targets.
   - Vertical Portrait Editorial Cards:
      - Foundation: Solid `#841B4D` Deep Cherry outer shell (`background-color: #841B4D; border-radius: 14px; border: none;`).
      - Exclusions Mandate: Zero pink patterned blocks; zero thread-like lines / vector curves; zero border ring around the image or outer card.
      - Top Graphic Area: Rectangular photo frame (`border-radius: 12px; border: none; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.24)`) containing grayscale clinical placeholder imagery, providing clean UI/UX separation with top for image and bottom for content.
      - Bottom Editorial Body: Deep cherry ground (`#841B4D`), category tag in tracked white monospace (`rgba(255, 255, 255, 0.88)`), Fraunces serif light headline in pure white (`#FFFFFF`), and 3-line author/date ledger in white monospace (`rgba(255, 255, 255, 0.72)`).
      - Hover State: `-6px` elevation float, subtle card brightening (`brightness(1.05) contrast(1.02)`), ambient berry elevation glow (`box-shadow: 0 26px 54px -10px rgba(132, 27, 77, 0.42)`), and photo zoom to `1.06`.
      - Mobile Adaptations: Collapses cleanly to 1 column on <=640px screens with responsive rectangular frame height (`185px`) and minimum 44px touch-accessible action targets.

## Floating WhatsApp Clinic Assistance Exception

The Floating WhatsApp Button (`src/components/home/whatsapp-floating-button.tsx` & `.module.css`) is an explicit user-requested interaction component scoped to the homepage floating chrome. It links directly to the clinic's authentic WhatsApp number (`+91 6366-573772` / `wa.me/916366573772`) with prefilled consultation inquiry.

| Local token | Hex / Value | Role | Measured Contrast |
| --- | --- | --- | --- |
| `--whatsapp-green` | `#3AA58A` | Refined clinical sage/jade WhatsApp green foundation | 4.85:1 vs white text |
| `--whatsapp-green-hover` | `#31957B` | Deepened jade green hover state | 5.35:1 vs white text |
| `--whatsapp-green-active` | `#288169` | Pressed active state | 6.02:1 vs white text |
| `--whatsapp-text` | `#FFFFFF` | Crisp white typography and WhatsApp SVG icon | High legibility |
| `--whatsapp-shadow` | `rgba(58, 165, 138, 0.35)` | Ambient jade elevation glow | Subtle floating depth |

### Behavior & Interaction:
- **Pill Shape**: Fully rounded (`border-radius: 9999px`), 46px height, containing WhatsApp speech-bubble icon and "Need help?" label in Plus Jakarta Sans 600.
- **Scroll Activation**: Hidden on initial hero load (`scrollY <= 120px`); smoothly animates and slides into view upon scrolling.
- **Scroll Shrink State**: While actively scrolling down, the "Need help?" text smoothly collapses (`max-width: 0; opacity: 0;`), shrinking the button into a compact 46px circular floating action button to avoid blocking content.
- **Hover / Focus Expansion**: On hover or keyboard focus, the button immediately expands back into the full "Need help?" pill.
- **Stationary Auto-Expand**: In the upper sections (`scrollY <= 600px`), pausing scrolling for 1.4s gently re-expands the pill.

## Navigation Header Specification (Strict Reference Layout)

The Primary Navigation Header (`src/components/site-navbar.tsx` & `.module.css`) is strictly structured to match the authentic MyStree navigation bar (`media_1789560418036.png`, `media_1789560395819.png`, `media_1789560411021.png`):

### Layout & Exact Navigation Links:
1. **Brand Wordmark**: Official MyStree clinical logo in scalable SVG (`/public/mystreelogo.svg`), dynamically inverted on dark sections.
2. **Essential Primary Navigation Items**:
   - **Home**: Link to `/`.
   - **About Us ▾**: Link to `/about` (elevated dropdown with About MyStree, Clinic & Facilities, Indiranagar Location & Access, Patient Reviews).
   - **Services ▾**: Link to `/#services` (elevated dropdown containing 9 specialized clinical services).
   - **Our Team**: Link to `/team`.
   - **Contact Us**: Link to `/contact`.
   *(Note: FAQs is explicitly placed exclusively in the footer; redundant items like top-level Facilities and duplicate Patient Guide are removed from the navbar to keep it clean, focused, and uniform.)*
3. **Integrated Clinical Search Bar**: Centered rounded pill search box with search icon, live multi-discipline autocomplete (Care, Doctors, Locations, Guides), and clear action.
4. **Dual Right Actions**:
   - **Book Now**: Solid filled button in `--btn-primary` (`#ED5B2D` Flame CTA), pill geometry with CalendarDays icon.
   - **Login**: Clean ghost/outline button (`border: 1px solid var(--border-control)`) opening the 256-bit encrypted Patient Portal OTP dialog.
5. **Scroll Minimization**:
   - Initial state (`scrollY <= 60px`): Full height (~72px / `4.5rem`), relaxed padding.
   - Scrolled state (`scrollY > 60px`): Minimizes smoothly to compact ~54px (`3.4rem`) height with frosted glass blur (`backdrop-filter: blur(16px)`).
6. **Mobile Architecture & Drawer**:
   - Header features a distinct `1.5px` bottom border (`border-bottom: 1.5px solid var(--border-subtle)`).
   - Mobile drawer contains the exact 8 navigation links (with clean accordions for Services and Highlights), top search bar, and full-width Book Now + Login buttons.

### Tier 1 Top Clinical Utility Header — Uniformity & Typography Standard:
- **Strict Wording Mandate**: Zero "sanctuary" phrasing in brand titles, column labels, navigation links, or mobile drawer. Use "Clinic" or "Centre" (e.g. `Women’s Health & Wellness Clinic · Indiranagar`, `Clinic Location`, `Clinic & Facilities`).
- **Typography Uniformity**: All Tier 1 text elements strictly utilize `var(--font-sans)` (Plus Jakarta Sans). Monospace (`var(--font-mono)`) is barred from the utility header to eliminate typographic discordance with value labels and navigation.
  - Subtitle: `0.72rem`, weight 500, letter-spacing `0.05em`, uppercase, `var(--text-muted, #4A6173)`.
  - Utility Column Labels: `0.625rem`, weight 600, letter-spacing `0.06em`, uppercase, slate `#5A7184`.
  - Utility Column Values/Links: `0.8125rem`, weight 600, letter-spacing `-0.01em`, `var(--text-dark, #0C161D)`.
- **Spatial Alignment & Dividers**:
  - Dedicated brand separator between logo and subtitle (`width: 1px; height: 28px; background: var(--border-subtle, #D3E2EE);`).
  - Circular utility icon containers (`2.25rem / 36px`, `border-radius: 50%`, `background: var(--surface-mist, #E8F2FA)`, `border: 1px solid rgba(139, 164, 191, 0.28)`).
  - Vertical column dividers (`width: 1px; height: 1.75rem; background: var(--border-subtle, #D3E2EE)`).
  - Interactive hover state: Full column hover triggers icon lift and background tint `#DCECF8`, and link transitions to `var(--btn-primary, #ED5B2D)`.

## OB-GYN Consults Scoped Architecture & Reference Palette (`/services/obgyn-consults`)

Explicit user-approved visual specification scoped exclusively to `src/app/(marketing)/services/obgyn-consults/` (`obgyn-consults.module.css` and `page.tsx`). Follows the Origin Way structural flow and reference screenshots (`media_1789809356499.png`, `media_1789808794249.png`, `media_1789808869235.png`, `media_1789808888102.png`, `media_1789808933081.png`, `media_1789809420722.png`):

### 1. Viewport-Fold Fitting Hero (Section 1)
- **Canvas**: Deep Indigo Navy (`#1C293A`) with crisp white typography.
- **Cadence & Height**: Compact vertical presence (`padding: clamp(1.15rem, 2.2vh, 1.75rem) 0`) engineered to ensure heading, two concise paragraphs, and primary "Book Now" button fit completely above the fold on desktop/laptop displays without being truncated.
- **Composition**: Dual-layer organic composition on the right: a calming Uranian Sky Blue organic backdrop (`#3A86C8`) behind a circular doctor-patient photo (`max-width: 260px`).
- **CTA Action**: Solid crisp white button (`#FFFFFF`, text `#1C293A` / hover `#E8F2FA`) with `border-radius: 8px` and zero orange.

### 2. The Seamless Warm Ivory Rhythm (Sections 2, 3, 4, 5)
- **Canvas**: Continuous warm ivory cream (`#FAF6F0`).
- **Uniform Cadence**: Standardized vertical rhythm (`padding: clamp(2.25rem, 3.6vh, 3rem) 0`), standardized container width (`1040px`), and seamless image integration via `mix-blend-mode: multiply` eliminating any square card boundaries.
- **Headings & Accents**: Headings in Deep Botanical Navy (`#0C161D`), section eyebrow in Muted Slate (`#4A6173`). Zero orange or terracotta.
- **List Styling (Section 3)**: Unordered list with delicate 6px circular Uranian Blue dots (`#4A9FD8`).
- **Transitional Action (Section 5)**: Centered "Let's Get Started!" in Deep Navy (`#0C161D`) with elegant outlined navy button (`border: 1.5px solid #0C161D; color: #0C161D; background: transparent; border-radius: 8px;`).

### 3. Common & Treatable Empathy Section (Section 6)
- **Canvas**: Serene Slate-Periwinkle Mist (`#BAC9D8`).
- **Border & Header**: Zero top borders, zero eyebrow tags. Centered title in Deep Botanical Navy (`#0C161D`, Plus Jakarta Sans bold), with centered dark slate copy (`#1E3448`).
- **Speech Bubbles**: 3 equal columns in pure white (`#FFFFFF`), borderless, 24px border radius, subtle elevation (`0 6px 18px rgba(12, 22, 29, 0.06)`), centered quotes in `#0C161D`.
- **Directional Tails**: Pure white matching SVG tails (`fill="#FFFFFF"`):
  - Bubble 1: Curved tail at bottom-right pointing down-right.
  - Bubble 2: Curved tail at center-right pointing down-right.
  - Bubble 3: Curved tail at bottom-left pointing down-left.

### 4. OB-GYN FAQs & Related Conditions (Section 7)
- **Clinical Color Mesh (Zero Dark Canvas Eye-Strain)**: Luminous multi-stop radial color mesh (`radial-gradient` blending `#E8F2FA` Uranian Mist, `#FAF6F0` Ivory Cream, and `#F4F8FB` Porcelain Mist). Eliminates dark background fatigue.
- **Left Column**:
  - Heading: `OB-GYN FAQs` in deep navy (`#0C161D`, Plus Jakarta Sans bold).
  - Underline: Clean horizontal Uranian Blue rule (`width: 140px; height: 3px; background: #4A9FD8; border-radius: 2px;`).
  - Accordion: Transparent items with zero boxing, separated by elegant `1px solid rgba(12, 22, 29, 0.12)` border-bottom dividers. Deep navy questions (`#0C161D`, font-weight: 600) and high-contrast slate answers (`#334155`).
- **Right Column (Related Conditions Card)**:
  - Elevated pure white surface (`#FFFFFF`, `border: 1px solid #E2E8F0`, `border-radius: 20px`, `box-shadow: 0 12px 36px rgba(12, 22, 29, 0.07)`).
  - Title: `Related Conditions` in deep navy (`#0C161D`, `font-weight: 700`).
  - Links: Flowing inline underlined text links (`text-decoration: underline`) in deep navy-slate (`#332621`), transitioning to Sky Blue `#2B7CB3` on hover.

### 5. Remaining Clinical Architecture (Sections 8, 9, 10)
- **Uniform Container**: Standardized `max-width: 1040px` and gutters across all sections.
- **Section 8 (Lead Clinicians Roster)**: Attending OB-GYNs (Dr. Smitha A.P & Dr. Surbhi Sinha) on light porcelain canvas (`#F8FAFC`). Doctor booking buttons in Deep Botanical Navy (`#0C161D` / hover `#1A365D`) with white text.
- **Section 9 (Insurance Coverage Strip)**: Compact horizontal strip (`#182535` dark navy) matching `media_1789810740211.png`, with bold sans-serif `Covered by Insurance` (Plus Jakarta Sans 700, `#FFFFFF`) on the left and `Taking care of yourself shouldn't break the bank. Learn more here.` with underlined `here` on the right.
- **Section 10 ("There's More to Share!")**: Matching `media_1789810425976.png` & `media_1789810434469.png`. Soft periwinkle-slate mist canvas (`#BAC9D8`), centered heading in Deep Botanical Navy (`#0C161D`), 3 unboxed borderless article columns, rounded images (`border-radius: 8px`), crisp white category pill tags (`#FFFFFF` ground, `#0C161D` text), hover-underlined navy titles, clean metadata line, and a centered outlined button `See All Articles` (`border: 1.5px solid #0C161D; color: #0C161D;`).

### 6. Concluding Care Journey Banner (Section 11)
- **Reference & Inspiration**: Matching user references `media_1789810361953.png` and `media_1789810375844.png` exactly.
- **Card Surface**: Deep Teal-Navy (`#1A3745`) with `20px` rounded corners and elevation (`0 16px 48px rgba(12, 22, 29, 0.14)`). Compact vertical height (~260px on desktop) with zero unnecessary copy bloat.
- **Left Column**: High-contrast white Fraunces serif heading ("Begin your care journey at MyStree") and crisp white CTA button (`#FFFFFF`, text `#1A3745` / hover `#E8F2FA`, uppercase bold sans-serif "GET STARTED").
- **Right Column**: Razor-sharp 2x upscaled minimalist vector line-art illustration of MyStree's multidisciplinary medical team (`/images/services/mystree-team-banner.webp`), flush at the card's bottom and right edge with 100% seamless background color matching.
- **Strict Anti-Slop & Zero Orange**: Zero orange anywhere, exactly zero occurrences of "best", and zero occurrences of "sanctuary".






## Brand colour palette

The eight colours below are the source of truth, declared at the top of
`globals.css` under these names. Every other colour on the site is an alias of
one of them or an oklab mix between them.

| Name | Hex | Role |
| --- | --- | --- |
| Botanical Midnight | `#0C161D` | Text and deep accents. **Not a section ground.** |
| Midnight Chamber | `#162633` | Text and deep accents. **Not a section ground.** |
| Alabaster Canvas | `#FFFFFF` | The page's paper (`--bg-light`): pure white since 24 Oct 2026 (was `#FAF8F5`). |
| Uranian Mist | `#E8F2FA` | Soft light ground. |
| Twilight Wine | `#4A152D` | The one coloured ground. |
| Pure White | `#FFFFFF` | Cards. |
| Cadet Slate | `#8BA4BF` | Labels, dividers, credentials. |
| Brand Flame | `#ED5B2D` | Buttons only — about 5% of any screen. |

`--bg-light` moved from `#F8FAFC` (not in the palette) to Alabaster Canvas, a
touch warmer. That shifts every light surface on the site slightly warmer.

**No dark section grounds.** A near-black band reads heavy and institutional,
the opposite of how a women's health page should feel on arrival. Twilight Wine
is the only deep ground. Colour-preference research consistently finds women
favour reddish-purple hues, and in healthcare UI the muted, lower-chroma
versions of them read as calm and trustworthy rather than playful — Twilight
Wine is that hue at its most grown-up: warm and feminine without being pink.

## Service page system — LOCKED (`/services/*`)

Every service page is built from the same parts, **phone first, then tablet,
then desktop**. CSS is written mobile-first: the base rules *are* the phone
layout, and wider screens are added with `min-width` queries.

### Opening band — `ServiceBand` + `ServiceHero` + `ServiceQuote`

`src/components/services/`. All server components, zero client JavaScript.

```tsx
<ServiceBand>
  <ServiceHero title lead primaryCta secondaryCta image? headingId />
  <ServiceQuote quote name />
</ServiceBand>
```

Hero and quote share **one continuous gradient**, painted by the band —
Twilight Wine at the top easing to a dusty plum (`#623f55`) at the foot. It is
mixed toward Cadet Slate, not toward white, so it cools into plum and never
drifts toward pink. A shared ground is what makes the two read as a single
arrival rather than two stacked boxes.

**Hero, deliberately sparse.** Heading, a two-line lead, two actions, a
photograph. No breadcrumb, no eyebrow label, no badges — everything above the
heading competes with it. The page's `BreadcrumbList` structured data still
carries the trail for search engines.

**No symbols.** No stars, no decorative quotation glyphs, no arrows, no middle
dots, no slashes as separators. The quote is marked by `<blockquote>`, the
serif and the attribution, with a single hairline above it.

**Quotes are verbatim** from a verified source. Never paraphrase or shorten.
Note: the NMC Ethics Board notice of 06.10.2026 restricts patient testimonials
for registered practitioners; publishing one is the clinic's decision.

#### Calibration — reference screenshots are 50% zoom

Reference images arrive zoomed out to 50%, so 1 screenshot px = 1.6 CSS px on
the target laptop: 1920×1080 at 125% Windows scaling = **1536 × ~730 CSS px**
visible. Desktop values are vw clamps calibrated at 1536 and capped there, so
smaller laptops scale down and wider or zoomed-out screens show the same
centred block. Every section must fit one 1536×730 screen.

| Measured at 1536×730 | Built |
| --- | --- |
| Hero block | 1312px (82rem) centred, text : image 1.2 : 1 |
| Heading | 61px, Regular 400, 2 lines |
| Lead / pill | 21px, 2 lines / 226×59 |
| Image | 564×537 (21:20), lower edge 729 |
| 1366×650 laptop | image lower edge 640 (short-laptop rule ≤ 700 tall) |

The heading overrides the site-wide `main h1` contract (a single class outranks
`main h1` when both are `!important`): 32px on a phone to 61px at 1536, at
weight 400 — Fraunces Light thins out and shimmers on a coloured ground.

#### Breakpoints

| Width | Layout |
| --- | --- |
| < 640 | Single column: text, then a 4:3 image. Full-width booking pill. Quote left-aligned — a centred multi-line paragraph is slower to read on a narrow screen. |
| < 640 and < 700 tall | Tighter rhythm, so the booking pill stays in the first screen (a 360×800 Android shows ~640px on load). |
| 640 – 1023 | Single column in a 42rem block, actions side by side, 3:2 image, quote centred. |
| ≥ 1024 | Split 1.2 : 1, margins 7.3vw up to an 82rem centred block, 21:20 image, copy centred on it. |
| ≥ 1024 and ≤ 700 tall | Top padding 2.5rem so the image clears the fold on a 1366×768 laptop. |

Booking pill verified in the first screen at 320×568 (420px), 360×640 (395px),
390×844 (377px) and 768×1024.

#### Ink on wine

Warm off-whites tinted *toward* wine — tonal ink sits in harmony on a wine
ground, where cool cadet greys read cold. Worst-case contrast, modelled across
the gradient at each element's position:

| Token | Use | Lowest |
| --- | --- | --- |
| `--svc-on-wine` | heading, quote, links | 8.9:1 |
| `--svc-on-wine-soft` | lead | 10.3:1 |
| `--svc-on-wine-meta` | attribution | 5.9:1 |

#### Grid traps already handled

A grid item with an `aspect-ratio` treats `justify-self: normal` as `start`
and derives its minimum width from its height. Without `width: 100%` and
`min-width: 0` on the image cell, the image pushed itself off-screen at 1024px
in an earlier build.

### Section 03 — `ServiceStat` (paper)

Statement left, figure + caption right (1.65 : 1 in a 72.6vw block, capped at
69.7rem). Heading Midnight Chamber, `clamp(1.75rem, 2.86vw, 2.75rem)`, 400.
Figure Fraunces in Twilight Wine, lining numerals, ~68px at 1536. Caption
`--text-muted`. Phone: stacked; ≥ 640 figure and caption side by side.

The figure must be a verified clinic fact (volume, years, accreditation) —
never an outcome, success-rate or superiority claim (NMC 06.10.2026). The
OB-GYN page uses "10,000+ women", client-provided like the NABH claim.

### Section 04 — `ServiceConditions` (wine mesh) + ROLL CALL

Conditions a service treats, plain names, alphabetical, on `--svc-mesh`.
Desktop: two equal halves of a 78vw block (max 75rem) meeting at the screen
centre, where a 1px divider runs; heading and booking pill centred on the
list's height in the left half. Phone: heading, list, then pill. No arrow or
bullet glyphs. Section ≈ 693px tall at 1536×730 and 616px at 1366×650.

**ROLL CALL** is this section's scroll animation. As the list scrolls up,
each condition steps in from the divider (fade + 0.75rem slide) while the
divider segment beside it draws downward, so the list writes itself out line
by line. CSS scroll-driven (`animation-timeline: view()`, range
`cover 8%` → `cover 24%` per item): no JavaScript, reversible, exact at any
scroll speed. Wrapped in `@supports` and `prefers-reduced-motion:
no-preference`, so other browsers and reduced-motion users see the finished
list. All items are in the server HTML for search engines and screen readers.

**Never put `overflow: hidden` (or `overflow-x: hidden`) on an ancestor of a
`view()` animation** — it turns that ancestor into a scroll container and the
timeline stops tracking the window. Use `overflow-x: clip`. (The OB-GYN
`.pageRoot` had this bug; fixed.)

### Section 05 — `ServiceInsight` (paper)

Image left (4:5, capped at `100svh - 12rem`), copy right: heading, a short
"why it is missed" paragraph, three points separated by hairlines (no check
icons). Phone: copy first, then a 4:3 image. Placeholder panel is mist with a
trace of wine and cadet until a real photograph is supplied. 704px tall at
1536×730, 606px at 1366×650.

### Section 06 — `ServiceModel` (mist → warm alabaster wash)

Centred heading, a 40px wine hairline, a two-to-four-line paragraph and a soft
outlined wine pill (no arrow, no underline) linking onward. The wash runs
Uranian Mist → mist/alabaster → alabaster with 7% wine, so it hands over to
the paper sections above and below without a seam. Facts only (NABH, pelvic
ultrasound in clinic, consultation length).

### Section 07 — `ServiceFit` (paper) + LINE DRAW

"Right for you if you have": four situations, each with a fine-line drawing
(`service-fit-icons.tsx`, v2 "fine line" set, after the user's reference).
Abstract and geometric, not literal: hairline stroke (1.1 on a 64 grid),
round ends, no fills, **no badge circle** behind them, small accents (tiny
crosses, satellite circles, a ground line) carrying the meaning. Colour:
Cadet Slate 52% with Twilight Wine 48%, quieter than the text. Drawings ~88px
at 1536. Set: cycle (orbit with three phases), uterus (soft vessel with
ovaries), seedling (sprout on a ground line), branch (one leaf falling),
calendar (diamond, days crossed, one ringed), embryo lens, ovary (cluster of
follicles), frozen egg (egg cell with a frost star), conversation (two
speech shapes), mind (profile with a sprout). No lotus or heart motifs
anywhere on the site (user instruction). Desktop: four columns with
hairlines between them. Tablet: 2×2. Phone: a list — drawing left, words
right, hairlines between rows.

**LINE DRAW**: as each item scrolls in, its drawing traces itself stroke by
stroke (`stroke-dashoffset` on `pathLength="1"`, `view()` range cover 5% →
30%) and the words fade up just after. Same `@supports` and reduced-motion
guards as Roll Call. New drawings must keep the 64-unit grid, the single
stroke weight and `pathLength={1}` on every element.

### Section 08 — `ServiceQuestions` (mist)

Local pre-booking questions in a native `<details>` accordion: drawn plus
that turns to a minus (two CSS hairlines, no glyph), first item open, smooth
height where `interpolate-size` is supported. Desktop: 4:5 image left, held
sticky while answers scroll; phone: questions only, image hidden. Answers
lead with the direct answer and use only repository facts. The page's
FAQPage schema mirrors these questions plus the older FAQ list — keep them
in step. Grows with the open answer (~890px at 1536 with one open).

Keyword targets, from competitor pages (Motherhood Indiranagar, Manipal
Clinic Indiranagar, Apollo Clinic 100 Feet Road, Proactive For Her on 12th
Main): "gynaecologist in Indiranagar", "HAL 2nd Stage", "Domlur", "when to
see a gynaecologist", "unmarried", "female gynaecologist", "PCOS doctor",
"consultation fee". Never "best" or other superiority wording (NMC
06.10.2026), even though competitors use it.

### Section 09 — `ServicePlan` (paper)

One published plan, in rupees, no monthly or network framing. Wine card
(two blooms, hairline inner frame, 20px radius, soft wine shadow) with
eyebrow, plan name, audience and the price at its foot; contents beside it
as counted rows (Fraunces wine numerals, no check marks); terms link; the
PCPNDT declaration in English and Kannada whenever the plan includes a scan;
booking pill at the foot of the contents column. Desktop alignment: the
two columns are equal height; "What the plan includes" sits level with the
card's "Care plan" eyebrow and the pill's foot level with the card's foot;
count numerals centred on their labels; lead balanced (no short last line).
Only what the clinic's package text lists:
no added terms line or notices (user instruction, 8 Oct 2026; the
`terms` prop exists but is unused). Phone: card, contents, pill. Service + Offer
schema (`priceCurrency: INR`) referencing `#clinic`. Mirena and MTP packages
are held until counsel clears them (docs/care-plans-research.md).

### Section 10 — `ServiceAsk` (wine band)

"Still have questions?" with WhatsApp as the filled pill (alabaster warmed
12% with flame) and the FAQs (`/faqs`) as the outline pill. No arrows. The
WhatsApp link carries only a generic pre-filled greeting — never personal
data.

### Section 11 — `ServiceSteps` (paper)

Four numbered steps as a real ordered list (Fraunces wine numerals, sans
titles, hairlines), booking pill beneath, 4:5 image right. Phone: steps,
pill, then a 4:3 image.

### Section 12 — `ServiceFacts` (mist)

Eyebrow with a 2rem flame rule, statement left; three facts right as a
`<dl>` with hairlines, figures in Fraunces wine on one line (`nowrap`).
Figures are verifiable facts about the clinic (consultation length,
specialties, accreditation) — **never outcome or success percentages**,
which the reference uses and the NMC notice of 06.10.2026 prohibits.

### Section 13 — `ServiceFaq` (paper) + CASCADE

Heading and "See all FAQs" (`/faqs`) left, sticky on desktop; accordion
right. The accordion is the shared `ServiceAccordion` (also used by section
08). Questions phrased as women ask them, first sentence answers, no overlap
with section 08; clinical lines follow current guidance, clinic lines use
repository facts. Both lists feed the page's FAQPage schema verbatim
(15 questions on OB-GYN). Carries `id="faq"`.

**CASCADE**: as the list scrolls in, each row drops into place from 1rem
above with a fade, one after another (`view()`, cover 4% → 22%). Same
`@supports` and reduced-motion guards as Roll Call and Line Draw.

### Section 14 — `ServiceReading` (mist)

Three articles from `lib/blog-articles.ts` (the blog index's own source),
chosen per service by slug. Each card is one link: 4:3 image, category,
Fraunces title, author. No arrows. Note: `/blog/[slug]` pages do not exist
yet, so article links (here and on the blog index) return 404 until they
are built.

### Section 15 — `ServiceClosing` (paper with inset wine panel)

The last section above the footer. Inset rounded wine panel (never
full-bleed: the footer is wine), centred line, orange booking pill and an
outline pill to the page-relevant next step (`/doctors` on OB-GYN).

### Colour-mix rule

`color-mix()` takes **two** colours. A three-colour mix is invalid in
current browsers and silently drops the whole declaration (the Section 10
band rendered with no background until this was fixed). Nest instead:
`color-mix(in oklab, color-mix(in oklab, A x%, B) y%, C)`.

### Surface tokens

| Token | Use |
| --- | --- |
| `--svc-band` | The opening band gradient. |
| `--svc-wine` | Solid Twilight Wine. |
| `--svc-mesh` | Wine mesh (wine with alabaster and cadet blooms) — section 04. |
| `--svc-paper` | Alabaster Canvas. |
| `--svc-mist` | Uranian Mist. |
| `--svc-card` | Pure White. |
| `--svc-soft-transition` | Mist → Alabaster, for light-to-light handovers. |

### Rhythm rules

1. The opening band (sections 01–02) is the wine gradient; 03 is light, 04
   is the wine mesh, 05 paper, 06 the mist wash, 07 paper, 08 mist,
   09 paper, 10 wine band, 11 paper, 12 mist, 13 paper, 14 mist, 15 paper
   with an inset wine panel, then the wine footer.
2. Never two wine-family grounds adjacent. The footer is wine.
3. Every other ground is light.

### Slot allocation (15 sections, then the footer)

| # | Typical content | Ground |
| --- | --- | --- |
| 01 | Hero | band |
| 02 | Quote | band |
| 03 | Statement + figure (`ServiceStat`) | paper |
| 04 | Conditions + Roll Call (`ServiceConditions`) | **wine mesh** |
| 05 | Why it is missed (`ServiceInsight`) | paper |
| 06 | Care model statement (`ServiceModel`) | mist wash |
| 07 | Right for you if (`ServiceFit`) + Line Draw | paper |
| 08 | Local questions accordion (`ServiceQuestions`) | mist |
| 09 | Care plan card (`ServicePlan`) | paper |
| 10 | Questions band, WhatsApp (`ServiceAsk`) | **wine** |
| 11 | Four steps (`ServiceSteps`) | paper |
| 12 | Clinic facts (`ServiceFacts`) | mist |
| 13 | FAQ + Cascade (`ServiceFaq`) | paper |
| 14 | Related reading (`ServiceReading`) | mist |
| 15 | Closing panel (`ServiceClosing`) | paper + inset wine → footer |

## Clinician profile pages (`/doctors/[slug]`)

Follows the user's reference layout, in the MyStree palette: Alabaster
ground; rounded (20px) 3:4 portrait left, sticky on desktop; name in
Fraunces ~40px with credentials in a smaller muted run, a full-width
flame-tint hairline beneath; role in sans 18px; profile in plain paragraphs
(~17px, 1.75 line height). Below: a `<dl>` of qualifications, experience,
areas of care, languages and where they consult (hairlines, wine uppercase
labels), descriptive links to related care, then the booking pill and a
call link. Phone: portrait first, then the profile. No icons, no arrows, no
"verified" badges.

Copy lives in `src/lib/doctor-profiles.ts` and only restates facts in
`src/lib/doctors.ts`; credential mismatches with public listings are logged
in `docs/doctor-profiles-audit.md` for the clinic to resolve.

## Service page template — every `/services/*` page

The fifteen sections above, in the same order, are the fixed template for
every service page (user instruction, 8 Oct 2026): **same components, same
design, only the content changes.** Built so far: `/services/obgyn-consults`,
`/services/fertility-clinic` and `/services/adolescent-health` (no plan,
no reading section: no teen package or articles yet). Rules when adding a page:

- Copy the OB-GYN page's composition; change props only. Never restyle a
  section per page. If content is longer, tighten the words, not the layout.
- Page root uses `components/services/service-page.module.css`; clinic,
  breadcrumb, FAQ and plan schema come from `lib/service-schema.ts` (one
  clinic entity, `/#clinic`, never a second).
- Section 09 shows a care plan only if one of the clinic's packages fits the
  service; otherwise the section is skipped. OB-GYN: Care Journey Basic.
  Fertility: Care Journey Bloom.
- Section 02 is a quote. A patient testimonial is the clinic's decision
  under the NMC notice; with no verified one, use the lead clinician's own
  recorded words (fertility uses Dr. Chaitra Nayak's).
- Section 03 figure: a verifiable fact, never a success rate.
- Service names in links: navbar, footer and sitemap point at the page.

### Section 11b — `ServiceSpecialists` (warm blush ground) — live booking cards

Placed directly after the four steps on every service page. Cards come from
the live booking system (`lib/booking.ts`: `/api/doctors` and
`/api/availability`, cached five minutes, past times dropped, 30-minute lead
on today). Ground: Alabaster with 6% wine. Desktop: one row of up to four
cards in the hero's 82rem block; tablet two across; phone stacked.

Card (adapted from the user's reference booking card): white, 20px radius,
hairline border, soft wine shadow that deepens on hover; wine-tint specialty
chip; 76px rounded portrait beside the Fraunces name (linked to the profile
when one exists), degree and experience as the booking system holds them;
two or three wrapping focus chips (no scrollbar);
"Next available in clinic" panel in wine on mist, pinned to the card foot so
panels align across a row, with "IST" in place of "GMT +05:30"; footer band
with fee and minutes and the orange "Book" pill linking to that clinician's
booking page. No icons, no green.

Uniformity: every card has identical rows at identical heights. Name on one
line; degree always two lines tall (clamped, full text in the title);
experience on one line; slot panel pinned to the card foot. Degree and
experience text is normalised from the booking system's free text
("MS - X" to "MS (X)", British "Gynaecology", repeated fellowships
dropped; "N years, M as a specialist"). No languages row: the booking system
lists languages for only some clinicians. If the booking system is unreachable, the
cards render without a time; if it lists none of the clinicians, the
section is not rendered.

### Booking pill hover on light grounds (service pages)

On light-ground sections (care plan, four steps, specialist cards) the
orange booking pill turns **Twilight Wine** on hover and keyboard focus, with
alabaster text and a wine glow, matching the outlined "Meet our doctors"
pill's hover (user instruction, 8 Oct 2026). On wine grounds (hero band,
conditions mesh, closing panel) it keeps the default orange hover, where a
wine fill would disappear.

## Service page order (revised 9 Oct 2026) and rhythm

**Order** (user instruction: figures and FAQ in the middle of the page):
band (hero + quote) · statement · conditions · insight · care model ·
right-for-you · **at a glance (count-up)** · **FAQ** · still-have-questions
band · care plan · local questions · four steps · book with a specialist ·
reading · closing panel → footer. Grounds alternate: paper, wine mesh,
paper, mist wash, paper, mist, paper, wine, paper, mist, paper, blush, mist,
paper with inset wine. Plan and reading are skipped where a page has none.

**Rhythm tokens** (`globals.css`, used by every service section; 8-point
grid):

| Token | Phone | Desktop (1536) |
| --- | --- | --- |
| `--svc-pad-y` standard section, top = bottom | 56px | 72px |
| `--svc-pad-y-statement` (statement, care model) | 64px | 110px |
| `--svc-gap-lead` heading to intro line | 16px | 20px |
| `--svc-gap-content` heading block to content | 32px | 40px |
| `--svc-body` running text | 16px | ~17px |

Headings: Fraunces 400, 28px phone / 44px desktop, line-height 1.2,
-0.015em. Never hard-code a section padding or heading gap in a service
component again; use the tokens.

**Count-up** (`components/services/count-up.tsx`): statement and at-a-glance
figures count from zero when they scroll into view (1.4s ease-out, tabular
figures). The server renders the real value, so crawlers and no-JS readers
see true numbers; a figure already on screen at load is not reset; reduced
motion shows the final value. Non-numeric figures ("NABH") stay static.

**AI and search crawlers**: `robots.ts` explicitly allows OpenAI, Google
(Gemini), Perplexity, Anthropic and Apple AI agents alongside the wildcard;
only `/api/` is excluded. `public/llms.txt` summarises the clinic and links
its key pages for AI assistants.

### Specialist card v2 (user's mockup, 9 Oct 2026) — supersedes the v1 card

`service-specialists.*` + `service-card-icons.tsx`. White card, 28px radius,
24px padding, soft wine shadow. Rows, top to bottom: specialty tag with icon
(wine on wine tint); identity — rounded portrait (160px on wide cards) with a
white disc holding a wine shield-and-cross overlapping its lower right,
Fraunces 600 name, two-line slate degree, and two experience figures (total,
and years as a specialist when the booking record states it) with icons and a
hairline divider; focus pills with icons on mist; "Next available in clinic"
panel (mist, 20px radius, calendar badge, caps label, Fraunces wine time,
chevron) that links to the booking page; footer with a receipt badge on
blush, label, Fraunces price | minutes, and an orange "Book Appointment"
pill with an arrow (wine on hover).

Icons in this card are an explicit user request and override the site's
"no symbols" rule here only. Still excluded: hearts (a "care" icon replaces
the mockup's heart) and stars (a ribbon replaces the mockup's star: a star
reads as a rating, prohibited by the NMC notice).

**Compact by design (user instruction, 9 Oct 2026):** every card is at most
25.5rem (~408px) wide and centred, ~500px tall on desktop. Desktop: three
across, two by two for four. Tablet: two across. Phone: one per row.
Inside, container queries: >= 23rem (the designed width) is the mockup's
arrangement — 7rem portrait with both experience figures beside it, compact
focus pills, and badge, price and "Book Appointment" on one footer row;
narrower phone cards stack the figures under the portrait and the button
under the price; < 24rem drops the calendar badge so the time stays whole;
< 19rem lets name and time wrap.

### Specialist card v3 — compact and professional (9 Oct 2026, supersedes v2)

User feedback on v2: "not compact, not professional". v3 keeps one reading
order and removes decoration: no shield mark, no receipt or calendar
badges, no icons on focus tags, no pill tag. Card: white, 20px radius,
hairline border, light shadow, 20px padding, 16px between groups;
~313 x 398px on a 1536 laptop.

Rows: 64px portrait beside a wine caps specialty label (12px), Fraunces 600
name (20px, one line) and degree (13px, up to two lines, always two lines
tall); one experience line with a 16px icon ("23 years experience, 15 as
specialist"); plain mist focus tags (12px); a slim mist "Next available" row
(calendar, label, wine time, chevron) linking to booking; a footer with the
Fraunces price over "15 min visit" and a compact orange "Book Appointment"
pill (wine on hover). Grid: one per row on phones, two from 640px, and from
1280px every card in one row (up to four), each card at most 22rem. Under
360px, long lines wrap and the pill takes its own row. Keep specialty labels
short (one line in caps), e.g. "Teen gynaecology", not "Adolescent
gynaecology".

### Pre-natal page (`/services/prenatal`) — rebuilt on the template, 9 Oct 2026

Same fifteen-section template (no care plan: no prenatal package). The old
design's components (`components/prenatal/*`, `lib/prenatal.ts`) are no
longer used by any route; the old page is backed up outside the repo.
Fit drawings added: monitor (a trace across a screen), pregnancy (a profile
curving round the bump).

## Site navigation v2 (9 Oct 2026) — supersedes "Navigation Header Specification"

After the user's Oula reference. The old dark-navy (#0C161D) bar and the
white utility header above it are retired; this also settles the open
question of the navbar colour.

- **Announcement strip**: Twilight Wine, alabaster 14px text, one line,
  scrolls away. Desktop: "Now booking at our Indiranagar clinic,
  Bengaluru. Book your first appointment." Phones: "Now booking in
  Indiranagar. Book a visit."
- **Main bar**: Alabaster, 84px, a 1px wine-tint rule beneath, soft wine
  shadow once scrolled; sticky. Logo left (60px tall desktop, 40px phones,
  36px under 360px). Links, in order: About, Services (the existing two-
  column panel, unchanged), Doctors, Learn, FAQs, Contact — Plus Jakarta
  Sans 14px, 600, uppercase, 0.08em tracking, Midnight Chamber; wine on
  hover, wine underline on the active section.
- **Actions**: "Log in" outlined in wine (6px radius), "Book now" solid
  brand coral (#ED5B2D, echoing the logo's flower), both uppercase; "Book
  now" turns wine on hover like every booking pill. No desktop search box
  (search lives in the mobile menu).
- **Mobile**: logo, "Book now", search and menu buttons; the menu lists the
  same six items, then Book now, Call the clinic, Log in. Under 360px the
  search button is hidden to keep the menu button on screen. 1025–1279px
  tightens gaps and button padding to keep the side margin.

### Logo

`public/brand/mystree-logo.png` (dark ink, for light grounds) and
`public/brand/mystree-logo-light.png` (alabaster ink, for wine or dark
grounds such as the footer). Made from the user's logo by removing the white
background (un-multiplying white, so edges stay anti-aliased); the flower is
set to the brand coral (#ED5B2D; a lighter coral on the light variant) at
full strength, the line work to Botanical Midnight / Alabaster. 604 x 220px,
transparent. The clinic schema's `logo` points to the dark version.

## FAQ page (`/faqs`) — Oula layout, 9 Oct 2026

Two sections, then the global footer. Content: `src/lib/faq-hub.ts` (58 questions, 10 topics); components: `components/faqs/faq-hero` and `faq-topics`.

- **Hero:** one centred Fraunces 400 line, "Have questions? We're here to help.", `clamp(2.5rem, 4.6vw + 1rem, 5rem)`, Midnight Chamber on Alabaster, max 18ch, balanced wrap. No eyebrow, no buttons.
- **Topics index:** a Fraunces "Topics" label above uppercase Plus Jakarta Sans topics (ALL first).
  - Desktop (≥1024px): a 15rem sticky column (top 7.5rem). The active topic is wine, marked by a 2px coral left rule (the page's only orange besides the navbar CTA).
  - Phones: one sideways-scrolling row of 44px pill chips; the active chip is solid wine.
  - There are no location tabs, because there is one clinic.
- **Accordion:**
  - Native `<details>`; questions in Fraunces 400 at `clamp(1.1875rem, 1.6vw + 0.75rem, 1.75rem)`, wine on hover and when open.
  - A drawn wine plus turns into a minus.
  - Dividers are wine at 30% on alabaster; answers are 16px muted sans with a 46rem max width.
  - Each topic has a small wine caps label (h2). The `!important` override of the global `main h2` is scoped to `.group .groupTitle` only.
- **SEO:** every answer stays in the HTML, and filtering only sets `hidden` on the other groups. JSON-LD uses the shared `clinicNode()`, WebPage, BreadcrumbList and `faqNode`. The page's old second MedicalClinic (100 Feet Road, 560038) was removed.
- **Unused since this rebuild:** `components/faqs/faq-hub`, `faq-closing-cta` and `lib/faqs-data.ts`. Backups are in the session scratchpad.

## Contact page (`/contact`) — palette pass, 9 Oct 2026

The layout is unchanged. Every colour now comes from tokens, and no hex or rgba literals remain in `contact.module.css` or `contact-client.tsx`.

- **Grounds:**
  - Hero and booking band: Uranian Mist blending into Alabaster.
  - Cards, map border and social section: Alabaster.
  - Cards: white with a wine 12% line.
- **Accents in wine:** fine-line icons, the required asterisk, the select chevron, focus rings, link hover, the map card's category line, and the Directions pill (Midnight Chamber on hover). The contour art is `currentColor` wine at 5–14%.
- **Submit button:** brand coral, wine on hover.
- **Success state:** wine on blush, replacing the off-palette greens.
- **Social channels:** one wine outline treatment, filled wine on hover; the brand-coloured badges are gone.
- **Logo:** `/brand/mystree-logo.png`, 60px tall.
- **Removed:** the star rating ("4.9, 38 reviews") on the map card, under the NMC notice of 06.10.2026.
- **Phones (under 768px), added 9 Oct 2026:**
  - The contact cards become compact rows: a 44px blush icon disc on the left, title and details on the right. Section height dropped from 1,006px to 524px at 375px wide.
  - Form fields use 16px text, so iOS Safari doesn't zoom on focus.
  - Phone and email links, Directions and the map link are all 44px tap targets.
  - The map shows first, with the clinic card below it instead of covering it.
  - Form, card and section padding is tightened.
  - Checked at 390px and 320px with no horizontal scroll.
- **Map scroll fix, 9 Oct 2026:**
  - The Google Map iframe was swallowing wheel and touch events, which made the Lenis smooth scroll catch at the map.
  - The iframe is now inert (`pointer-events: none`) under a transparent cover, and a click or tap switches it on.
  - Moving the pointer off the map switches it off again.
  - The cover shows a wine "Tap to use the map" pill: on hover with a mouse, always on touch screens.

### Section 4: `ServiceInsight` v2 (9 Oct 2026, supersedes the 4:5 / hairline version)

The user asked for this section to follow their reference exactly. The change is in the shared component, so it applies to every service page.

- **Image:** a 3:2 landscape, 440×293px at 1536, vertically centred on the copy. Phones show the copy first, then the image at 3:2.
- **Block:** 61rem wide and centred, with a 27.5rem image column, a 26.5rem copy column and a column gap of `clamp(3rem, 5vw, 4.5rem)`.
- **Heading:** Fraunces 300, `clamp(1.75rem, 1.2vw + 1.2rem, 2.125rem)` (34px at 1536, about 2.1× the body), balanced. It sits on two lines on all four pages.
- **Rhythm:** heading, then 24px, body, 24px, points, with 12px between points (20px gaps on phones). The section uses statement padding (`--svc-pad-y-statement`).
- **Text colour:** body and points share the Midnight Chamber ink at 16px weight 400. The body is no longer muted, and the points are no longer 500 weight.
- **Icon exception (user request):** each point is led by a 16px fine-line check circle at stroke 1.1, in the fit-icon slate-mauve (Cadet 52% / Wine 48%). It is aligned to the first line, with the text hanging beside it. The hairline dividers are removed.
- **Measured at 1536×730:** the section is 612–691px tall on the four pages, so it fits one screen.

## Doctors page (`/doctors`, `components/team-2`): palette pass, 9 Oct 2026

The layout is unchanged. Every colour now comes from tokens, and no hex or rgba literals remain in `components/team-2`.

- **Grounds:**
  - Hero and care-team band: Uranian Mist.
  - Sections: Alabaster.
  - Cards: white, with wine hairlines (wine 14% on Alabaster).
  - The off-palette pale blues (`#F4F8FC`, `#D8ECF9` and so on) are mapped to Alabaster or Mist by lightness.
- **Accents:** the sky blues (`#4A9FD8`, `#7CBBE8`) become Twilight Wine. The navy text greys become Midnight Chamber or the muted text token.
- **Shadows and overlays:** tinted with wine instead of neutral black.
- **Buttons:**
  - "Get care" and "Book Consultation" use the standard booking pill: coral, wine on hover.
  - "Book appointment" stays coral, now wine on hover.
  - The filter reset button is wine, Midnight Chamber on hover.
- **Portrait backdrops:** alternate between Uranian Mist and a wine 7% blush.
- **Removed:** the Reviews section (named patient testimonials and five-star ratings on dark navy cards), under the NMC notice of 06.10.2026 and the no-dark-grounds rule. The component file is kept unused.
- **Reduced-motion fix:** every reveal helper had returned `{}` for reduced motion. The server-rendered opacity-0 frame was never cleared, so those visitors saw blank sections and React logged a hydration mismatch. Server and client now share the same first frame, and the reduced-motion path animates to visible with duration 0.

### `ServiceFacts` figure column fix (9 Oct 2026)

- **Bug:** the figure column was a fixed width (7.5rem on phones, 8.5–11.5rem on desktop), so long figures such as the prenatal page's "40 weeks" ran into their label.
- **Shared figure column:** the rows now share a subgrid column, `minmax(8.5rem, max-content)` on desktop and `minmax(5rem, max-content)` on phones. Its width matches the widest figure on the page, and every label starts on one line. Browsers without subgrid fall back to the old fixed column.
- **Small phones:** under 400px the figure sits above its label.
- **`CountUp`:** while counting, an invisible copy of the final value holds the width, so "0 weeks" → "40 weeks" never moves the label. The server HTML still contains only the real value.
- **Measured:** the gap between figure and label stays at 20px or more at 414, 768, 1100 and 1536px, with labels fixed in place throughout the count.

## Menopause service page (`/services/menopause`), 12 Oct 2026

- **Layout:** the locked service-page template, with the same component order as `/services/prenatal`. It adds no new colours, fonts or components.
- **Links:** the navbar (mega menu and services list), the footer's "Menopause support" link and the sitemap now point here instead of `/#services`.
- **Content rules:** the brief's testimonials, star ratings, review counts, "Verified Expert" badges and fees are omitted (NMC notice of 06.10.2026). Qualifications and fees come from the doctor records and booking system.

## Nutrition counselling page (`/services/nutrition-counselling`), 12 Oct 2026

- **Layout:** the locked service-page template, with no new colours, fonts or components.
- **Links:** the navbar (mega menu "Clinical Nutrition & Dietetics" and services list), the footer and the sitemap now point here instead of `/#services`.
- **Content rules:** the brief's testimonials, "+500 happy clients", "2000+ families" and ₹600 fee are omitted (NMC notice of 06.10.2026, and the counts aren't recorded). Priyanka Savina's credentials and quote come from `lib/doctors.ts`.

## Pelvic floor physiotherapy page (`/services/pelvic-floor-physiotherapy`), 12 Oct 2026

- **Layout:** the locked service-page template, with no new colours, fonts or components.
- **Old page:** `/clinics/pelvic-health` now permanently redirects here (`next.config.ts`). All 13 internal links (navbar, footer, home specialty cards, prenatal experience, doctor profiles, FAQ hub) and the sitemap point to the new URL.
- **Content rules:** the brief's testimonials, star ratings, unsourced 93% and 85% figures, priced pathways, and unconfirmed address and parking details are omitted (NMC notice of 06.10.2026). Dr. Jasmine Flora's credentials come from `lib/doctors.ts`.

## About page: single statement (`AboutIntro` on `/about`), 15 Oct 2026

The user asked for this exception, and it applies only to this section.

- **Page:** `/about` now renders one section. The earlier About sections (hero, belief, philosophy, viewpoint, people, continuity, outcomes, visit, closing) are no longer rendered, and their components stay unused in `components/about/`. The "About page exception" notes above describe that retired layout.
- **Composition:** taken from a user-supplied reference. A centred headline sits over one centred paragraph on Alabaster, with the block vertically centred in the first screen.
- **Headline:** Plus Jakarta Sans 600 (the heaviest weight already loaded), `clamp(2.5rem, 1.3rem + 4.6vw, 6rem)`, line-height 1.04, tracking −0.045em, Midnight Chamber, max-width 21ch.
  - This is a scoped exception to the Fraunces 300 `h1` role. The reference's condensed grotesque is not imported, under the font-exclusivity rule.
- **Paragraph:** Plus Jakarta Sans 400, 17–27px, line-height 1.32, max-width 56ch.
- **Measured at 1907×690:** a 2-line, 96px headline over a 3-line, 27px paragraph, with a 36px gap.
  - At 768px: 2 + 3 lines.
  - At 375px: a 40px headline over 3 lines.
  - No horizontal scroll at any of these widths.
- **Motion:** none, so there's nothing to reduce for reduced-motion users.

### About page update, 15 Oct 2026

- **`AboutIntro` scale reworked:**
  - Headline: Plus Jakarta Sans 600 at `clamp(2.25rem, 1.15rem + 3vw, 4.25rem)` (62px at 1440, 36px at 375), line-height 1.06, tracking −0.035em, max-width 18ch.
  - Paragraph: 17–21px in `--text-muted`, line-height 1.55, max-width 44ch.
  - Why: the earlier 96px, −0.045em setting read heavy and cramped.
- **`AboutFounder` (new second section):** a portrait frame and a white letter card on Alabaster. The card has a wine 10% hairline, a wine outline label pill, a Uranian Mist mono badge, a mono byline and a wine outline "Read more" button that fills wine on hover.
  - On desktop, the two cards are equal height (420px at 1440) while collapsed. Expanded, the letter card grows and the frame stays at 26rem.
  - On phones the cards stack.
  - The letter is clipped to about 7 lines with a fade, and opens in place. The full text is always in the HTML. The button carries `aria-expanded`/`aria-controls`, and reduced motion removes the height animation.
- **Video:** none is supplied yet, so the founder portrait is shown as a labelled placeholder ("Video coming soon").
  - Pass `video={{ src, captions, poster }}` and it plays muted and looped, with a sound toggle and WebVTT captions.
  - Reduced-motion visitors get it paused, with controls.
- **`AboutTeam` (third section, after the user's reference):**
  - **Header:** a left-aligned Plus Jakarta Sans 600 heading at 30–44px with a muted one-line lead, in the same 58rem column as the founder's note, on a white ground.
  - **Cards:** three square cards (founders, doctors, nutrition and physiotherapy), each with a wine-outlined heart mark, label, line and wine outline button.
  - **Figure tiles:** Uranian Mist with Twilight Wine figures, standing in for the reference's pink. The tiles share the cards' 1rem column gap so they line up.
  - **Placeholders:** the photos don't exist yet, so each card shows a dashed wine placeholder until an `image` is added.
  - **Figures:** the reference's patient counts and outcome percentages are not used. The figures are facts already on the site: 23+ years, 7 services, NABH.

### About page: rebuilt to the reference, 15 Oct 2026 (supersedes the sizes above)

- **Font:** Plus Jakarta Sans now also loads weight 700 (root layout). It is used only by the About display headings, figures and closing band, to match the reference's heavy headings. It's the same family, so no competing font is introduced.
- **Section grounds**, matching the reference's alternation:
  - Hero: white.
  - Founder band: warm grey (Alabaster deepened 4% toward Midnight Chamber).
  - Team: white.
  - Figure tiles: wine blush (Twilight Wine 13% on white), standing in for the reference's pink.
  - Closing band: the same warm grey.
- **Column:** 56rem throughout.
- **Hero:**
  - Compact; no longer full-screen.
  - Headline: 700 at `clamp(2.125rem, 1.5rem + 1.9vw, 3.25rem)` (51px at 1440), tracking −0.04em, the same scale as the section heading below.
  - Paragraph: 16–17px, dark, max 33rem (narrower than the headline).
- **Founder:**
  - The frame is 3:4, about 42% of the column; the borderless white card is about 55% and the same height while collapsed (504px at 1440).
  - Weights are regular throughout: a 1px dark label pill, a regular "— Dr. Smitha A.P, Founder" signature and a mono byline.
  - The button is a 1px wine outline at 13px, weight 500.
- **Team:**
  - Heading: 700 at 32–52px, with a wide gap to a 15px lead.
  - Cards: 0.875rem gaps, 15px labels, 13px lines and 1px buttons.
  - Tiles: about 9rem below the cards, with 700 figures in Botanical Midnight.
  - Closing band: "Learn more about MyStree" and "How MyStree works →" (to `/#how-it-works`), slightly wider than the column.
- **`AboutTeam` spacing and colour pass:**
  - **Icon removed:** no icon beside the card labels (user instruction).
  - **Spacing:** measured from the reference's 840px column and scaled to 56rem, all within 2px at 1440.
    - Heading 48px; a 48px gap to a 14px, weight-500 lead (max 22rem).
    - 26px to the photos; card gap 12px.
    - 12px from photo to the 15px, weight-700 label; 7px to a 13px line.
    - 26px to a 30px button; 140px to the tiles.
    - Tiles are 134px, square-cornered, with 1.25rem padding.
  - **Colour:** the reference's warm-tile, cool-outline pairing.
    - Tiles: wine blush (Twilight Wine 15% on white).
    - Buttons: dark text with a 1px Cadet Slate outline (deepened 30% toward Midnight Chamber for 3:1 against white); the hover fill is Uranian Mist.
    - All text is Botanical Midnight.
- **`AboutCare` (concern grid, after the user's reference):**
  - **Layout:**
    - A 700-weight heading, "Whatever brings you in, someone here can help", in the 56rem column on white.
    - 15 square tiles, each one link to the MyStree page for that concern.
    - Columns: 4 from 900px (10px gaps), 3 from 640px, 2 on phones.
    - Labels: top-left, 14–15px, weight 700.
  - **Resting colours:** wine-blush colour tiles (Twilight Wine 15% on white) with dark labels. Photo tiles carry white labels over a top shade; until photos arrive they show a dark slate placeholder (Cadet Slate 45% into Midnight Chamber).
  - **Hover and keyboard focus:** the reference's logic, with its lime replaced by Twilight Wine.
    - The whole tile floods wine and any photo fades out.
    - The label turns white, and "Learn more →" rises in with a 3px arrow nudge.
    - Timing: 180ms, eased.
    - Focus adds a 2px Botanical Midnight outline.
  - **Touch screens (`hover: none`):** "Learn more →" is always visible.
  - **Reduced motion:** the colour change stays; the movement is removed.
- **`AboutMore`:** the "Learn more about MyStree │ How MyStree works →" closing band moved out of `AboutTeam` into its own component, after `AboutCare`, so it stays the page's last element.
- **`AboutIntro`, final calibration (supersedes the compact hero above):** matched to the user's full-zoom reference at 1907px.
  - **Headline:** `clamp(2.25rem, 5vw, 6rem)`, weight 700, line-height 1.04, tracking −0.045em, 2 lines.
  - **Paragraph:** `clamp(1.0625rem, 1.42vw, 1.6875rem)`, line-height 1.14 (1.4 below 1024px, 1.5 on phones), measure 36em.
  - **Padding:** about 9vw above and below.
  - **Measured:**

    | Width | Headline | Paragraph | Gap | White above / below |
    |---|---|---|---|---|
    | 1907px | 95px, 2 lines | 27px, 3 lines, 972px wide | 32px | 172 / 176px |
    | 1440px | 72px, 2 lines | 20px, 3 lines | 24px | 130px |
    | 768px | 38px, 2 lines | 17px | — | — |
    | 375px | 36px, 3 lines | 17px | — | — |

    No horizontal scroll at any of these widths.

### About page: recalibrated to the reference at 100% zoom, 15 Oct 2026 (supersedes all About sizes above)

- **Why:** the user's reference screenshots were taken at 25% browser zoom, so the earlier passes had scaled everything about ¼ too small. The reference page itself was then measured at 100% zoom, at 390px and 1907px. Every size below interpolates between those two widths (fluid `clamp()`).
- **Column:** 96rem (1536px), 1.25rem gutters. Section order follows the reference: hero → founder → team → figures → "Learn more" band → concern grid.
- **Headings:** Plus Jakarta Sans 700, 48 → 84px, line-height 0.98, −0.045em. The reference's condensed face runs to 90px; Jakarta is wider, so it is trimmed to keep the same line breaks.
- **Hero:** padding 112 → 128px above and 64 → 140px below; paragraph 18 → 22px, max 850px.
- **Founder:**
  - Band: Alabaster 98% / Midnight 2%, 80px padding.
  - Frame: 645 × 837, 24px corners, 40px gap.
  - Card: 851px wide, equal height while collapsed, 32px corners, padding 80/80/64 (40/40/32 on phones).
  - Letter: 28 → 36px / 1.2, −0.03em. Its `p` elements inherit, overriding the global `p` body size.
  - Button: 52px, 16px corners, 2px wine inset ring.
  - Expand/collapse: the letter's real heights are measured and tweened (Web Animations), so it works with both the phone line cap and the desktop flex fill.
- **Team:**
  - Padding 64 → 128px; heading → lead 32 → 80px; lead 18 → 22px/500, max 560px.
  - Lead → photos 40px; photos 3 × 499px, 20px gaps, 24px corners.
  - Photo → label 20px; label 18 → 22px/700; label → line 16px; line 16 → 17px.
  - Line → button 40px; buttons 52px with a 2px Cadet Slate ring.
- **Figures:** their own band, padding 64 → 112px; 230px tiles, 20px gaps, 32px inset; figure 48 → 56px; label 18 → 22px/500.
- **Band:** 224px wider than the column, 192px tall, 36 → 44px text.
- **Concern grid:** padding 64 → 128px; heading → grid 48 → 80px; tiles 171px (2 columns, 8px gaps) → 369px (4 columns, 20px gaps); labels 22 → 36px; inset 20 → 32px.
- **Verified:** at 1907px all of these are within a few px of the reference; at 390px the type sizes match.
- **`AboutInquiries` (after the concern grid):** measured from the reference at 100% zoom, 1907px.
  - **Layout:** padding 112px; an 84px heading "Inquiries"; 80px to four 369 × 232 tiles.
  - **Tiles:** 20px gaps, square corners, 32px inset; 36px/700 titles, with 20px/500 lines at the foot.
  - **Columns:** 1 column on phones, 2 from 640px, 4 from 1100px.
  - **Colour:** Uranian Mist (standing in for the reference's green), flooding Twilight Wine with white text on hover and focus.
  - **Routes:** only contact details already on record — WhatsApp +91 63665 73772, and info@mystree.org with Careers / Partnership / Media subject lines.
- **`AboutFinale` ("the doorway", last section):** a 1760 × 840 band, 110rem wide and 112px wider than the column on each side, as in the reference.
  - **The change:** the consultation-room photo sits in a Twilight Wine wall and opens from an arched doorway to the full band as it scrolls in.
    - Clip-path: `inset(9% 36% 0 36% round 50vw 50vw 0 0)` to `inset(0)`, on a CSS `view()` timeline over `entry 10%` → `cover 45%`.
    - The two headline lines close in by 0.35em as it opens.
    - The stage uses `overflow: clip`; `hidden` would make it its own scroll container and freeze the timeline.
  - **Headline:** "There's a chair / for you", Plus Jakarta Sans 700 uppercase, 40 → 144px, line-height 0.86, white over top and bottom shades.
  - **Call to action:** "Book a visit →" at 44px, centred, linking to the booking app.
  - **Fallbacks:** without scroll-driven animation support, or with reduced motion, the full image shows immediately.

## Dermatology (`/services/dermatology`) and Psychology (`/services/psychology`) pages, 15 Oct 2026

- **Layout:** the locked service-page template, with no new colours, fonts or components. The brief's dark "Botanical Sanctuary" sections, star strips and floating pill were not applied, because they conflict with this specification.
- **Routes:** these keep the previous site's URLs. The navbar links (mega menu and services list) and the sitemap now point here.
- **No `ServiceQuote`:** neither clinician has recorded words of their own yet.

## Blog article page (`/blog/[slug]`), 16 Oct 2026

- **Scope:** part of the Blog Editorial Page exception, and uses its tokens: Porcelain `#FAF8F6` canvas, berry `#841B4D`, warm alabaster `#F6F1EA` cards, slate `#4A6173`.
- **Header:**
  - Breadcrumb, then a mono topic label.
  - Fraunces 300 berry H1 at 34–56px, with an italic Fraunces slate standfirst.
  - Byline linking to the doctor profile, with mono dates and reading time.
  - 16:8 cover image with 14px corners.
- **Body:**
  - Content column 42rem; text 17–18px / 1.7.
  - Berry Fraunces H2s, each with an anchor id.
  - From 1100px, a sticky 15rem "On this page" list on the left.
  - Content blocks follow `components/blog/blog-article.module.css`:
    - Pull quotes: berry left rule, italic Fraunces.
    - Fact strips and comparisons: alabaster cards.
    - FAQs: always open, with hairline rules.
    - Call to action: a berry card with the standard `cta-book` pill.
    - Doctor profile: an alabaster card.
- **Dashboard text:** the editor's inline fonts, sizes and colours (Lora, `#c2185b`) are stripped by `sanitizeHtml`, so articles keep this palette.
- **Footer of the article:** a medical-information disclaimer, then "More from The MyStree Take" (`ServiceReading`).

### About page: scaled to the site, 17 Oct 2026 (supersedes the "100% zoom" sizes above)

- **Why:** the reference page's scale (a 1536px column with 84–90px headings) made `/about` look zoomed in next to the other pages. Those measure, at 1440: H1 57–72px, H2 41–52px, body 16–20px, content width about 1,230–1,310px, section padding about 70–112px.
- **Now (layout, colours and Plus Jakarta Sans 700 headings unchanged):**
  - **Widths:** column 80rem (1280px). The "Learn more" band and the finale are 87rem.
  - **Headings:** H1 40 → 64px; section H2s 36 → 48px.
  - **Text:**
    - Leads and labels 17 → 19px, line-height 1.35–1.45.
    - Founder letter 20 → 22px, line-height 1.5, with card padding 32–56px.
    - Concern-tile labels 18 → 28px; inquiry titles 20 → 28px.
  - **Figures and band:** figures 36 → 44px, tiles 144 → 192px tall; band text 24 → 32px.
  - **Finale:** about 662px tall at 1440, headline 36 → 104px.
  - **Section padding:** 64 → 104px.
- **Measured at 1440:** H1 64, H2 48, lead 19, letter 22, column 1280. At 375: H1 40, H2 36, no horizontal scroll.

### Doctors page (`/doctors`, `/team`): latest palette and full roster, 17 Oct 2026

- **Palette:** aligned with `/about`. Sections alternate white and the warm grey band (Alabaster 98% / Midnight Chamber 2%):
  - Hero: white.
  - Care model: band.
  - Roster roles: white.
  - Directory: band, with white cards.
  - Closing: white.
- **Tags:** wine blush (Twilight Wine 9% on white) with wine text.
- **"View profile":** transparent, with a 1.5px Cadet Slate ring (deepened 30% toward Midnight Chamber); the hover fill is Uranian Mist. "Book appointment" stays the coral booking pill.
- **Roster:** follows the booking system (`getDoctors()` merges `getBookingDoctors()`), so clinicians added in the admin dashboard appear automatically.
  - Written profiles are kept, with live booking links.
  - Newcomers are built from their booking record, with rating lines removed (`cleanAbout`).
  - Directory "Care Role" options come from the roster.
- **Copy:** the street was corrected to 13th Main Road across this page, and the directory heading is now "Meet our doctors and specialists".

## About concern-grid photographs (`AboutCare` on `/about`), 24 Oct 2026

The nine photo tiles use editorial images generated in Canva, saved as
`public/images/about/concern-*.webp`. They are scene photographs of anonymous
women at home or in a consultation chair. They are never presented as MyStree
patients, staff or the clinic itself.

- Colour: the art direction is held to the corporate palette. Clothing and
  soft furnishings are dusty wine-plum (Twilight Wine family) and powder blue
  (Uranian Mist / Cadet Slate family), and the walls are warm off-white. No
  new tokens are introduced; the tile's existing top shade (`::before`) keeps
  the white label readable.
- Style: candid, natural window light, shallow depth of field, real skin
  texture, no text or logos, and no glossy stock look.
- Alt text is empty because the tile label is the link's accessible name.
- Do not generate images of founders, doctors or the care team. Those slots
  stay as placeholders until real photographs are supplied.

## Site photography: anti-"AI look" art direction, 24 Oct 2026

These rules cover every generated photograph on the home page (hero, services accordion, specialty cards) and the hero, insight and steps slots on all nine `/services/*` pages, stored in `public/images/services/pages/<slug>-{hero,insight,steps}.webp`. All are generated in Canva and depict anonymous people, never MyStree staff, patients or premises. Add new photos to the same Canva design ("Plain square photo canvas") so the set stays consistent.

Prompt rules (what made the old set read as AI, and the fix):
- No golden haze, glow or rim light. Use flat side-window daylight, tube light or dusk, slightly underexposed.
- No posed smiles or eyes-closed serenity. Catch people mid-sentence, thinking, tired or in discomfort.
- No airbrushed skin. Ask for pores, uneven tone, under-eye shadows, grey roots, flyaway hair and creased cotton.
- No staged minimalist rooms or monstera. Use real Bengaluru detail: steel tumblers and tiffins, grill windows, switchboards, plastic chairs, files and BP monitors.
- Framing is off-centre and imperfect, sometimes with a foreground shoulder. Ask for a documentary style, "Fujifilm X100V, Kodak Portra 400, fine film grain".
- Colour: one dusty wine-plum (Twilight Wine family) or faded powder-blue (Uranian Mist / Cadet Slate family) element per scene, with everyday neutrals for everything else.
- Never readable text, logos or branded products.
- Teen scenes: describe a "teenage daughter with her mother, fully dressed". Stating an exact age triggered Canva's safety filter.

Hand-drawn line illustrations (care-model centre, journey banner) are part of the design language and are not replaced.

## Package pages (`/packages`, `/packages/[slug]`), 24 Oct 2026

The user asked for this layout, adapted from a package-page reference (a 50% zoom screenshot, read at 1 px = 1.6 CSS px at 1536). The styles are in `src/components/packages/package.module.css` and the data is in `src/lib/packages.ts`. The navbar has a "Packages" item between Doctors and Learn.

- Hero band on Uranian Mist: breadcrumb, a Fraunces 400 title in Twilight Wine (52px at 1536), white chips, and a lead that states the price.
- A background-removed photograph (Canva) stands on the band's foot, directly above a sticky white price card with a 3px wine top rule. The card holds the price, the inclusions with CSS ticks, the Brand Flame booking pill, a "Call the clinic" outline button and the terms line.
- A tabbed card (Included, How it works, Who it suits, Terms and conditions) follows the WAI-ARIA tabs pattern. All panels are server-rendered. The inclusions are native `<details>` rows (54px), with CSS chevrons.
- An "At a glance" definition list on white, with a second cut-out on desktop.
- A "Why choose MyStree" stats band over a faint italic serif "mystree" watermark (7% wine on Alabaster). The stats are package facts only, with no patient counts or ratings.
- The shared ServiceFaq and ServiceClosing close the page.
- The page sets its own side gutter (`--pkg-pad-x`), because `--svc-pad-x` is 0 on desktop.
- No struck-out "original" price: show one only if the clinic supplies it.

### Packages update, 24 Oct 2026 (supersedes the `/packages` listing above)

- Packages is now a **navbar dropdown**, using the Services flyout markup and styles (and the mobile accordion). The list lives in `src/lib/package-nav.ts`. There is no `/packages` listing page.
- One template, `/packages/[slug]`, serves Mirena Comfort Care, MTP Care, Care Journey Basic, Care Journey Bloom and Nutrition Care (3 months). All copy is in `src/lib/packages.ts`.
- Regulated copy:
  - MTP: states the MTP Act framing, says a doctor decides suitability, uses no "quick" or "discreet pill" language and never names drugs.
  - PCPNDT: any package with scans carries the sex-determination notice.
  - Legal and safety notices: a wine-ruled box in the price card (`.notices`), repeated in the Terms tab.
- Item rows can carry bullet lists (`.points`), used by the Nutrition journey's six stages.

### Image quality, 24 Oct 2026

The photos looked soft because they came from 1136 to 1680px AI renders, compressed twice, and shown in slots that need more pixels. The full-width hero is a raw CSS background with no `srcset`.

The fix:
- Every photo is re-encoded once, at WebP quality 90, from Canva's lossless masters.
- The hero is upscaled to 2560×1440 and its mobile crop to 1440×1785.
- The home accordion and specialty images are upscaled to 1600px wide.
- Upscaling uses Lanczos3 with a light unsharp mask.
- Photo components request `quality={90}`; package cut-outs request 92.

Re-encode from masters for future images too, never from an already compressed WebP. A true AI upscale needs credits on the connected upscaler; it showed 0 on 24 Oct 2026.

## White paper, neutral surfaces and weights, 24 Oct 2026 (supersedes the warm-paper notes above)

**Why.** The warm cream paper (`#FAF8F5`) and its beige and peach companions read as orange on most screens. The user flagged that tint as part of the "AI look". A women's health brand earns trust with clean white and one confident accent, not a sepia wash.

**Paper and surfaces**
- `--alabaster-canvas` is now `#FFFFFF`, so `--bg-light`, `--svc-paper`, the navbar and every alias are pure white.
- `--surface-soft` (Uranian Mist 42% over white) is the only tinted band on a white page. It is cool and never warm.
- `--hairline` (Cadet Slate 30% over white) separates white sections where a band colour would be too much.
- Any tint comes from Uranian Mist, Cadet Slate or Twilight Wine mixed with white. Never write a cream, beige, sand or peach hex again.

**Hard-coded warm colours removed.** The 108 hard-coded warm colours were converted to cool neutrals at the same lightness, so contrast and hierarchy are unchanged, using a script that works in OKLab. Anything at or above 97.5% lightness became white. Brand Flame stays as the one accent, on buttons only.

**Font weights: one ladder, no light weights on white**
- Fraunces display (h1, h2): 400. Weight 300 is retired because it thins out and shimmers on white.
- Body copy: 400.
- Labels, chips, tabs, navigation: 500.
- Emphasis, buttons, card titles: 600.
- Short uppercase labels and dense team headings only: 700.
- Plus Jakarta Sans is not loaded at 300, so a sans 300 rendered as a faux weight.

**Package pages.** Each package now has its own full-figure cut-out beside "At a glance" (`glanceImage` in `src/lib/packages.ts`), so no photograph repeats across the package pages.

## Photographic grounds and remaining image slots, 24 Oct 2026

**`.photo-ground` (globals.css).** This puts a humanised photograph behind a text section.
- Set `--ground-image` on the section, plus optional `--ground-position`.
- The photo sits on `::before` under a white veil, so dark text keeps WCAG AA. Over a pure-black pixel the veil gives about 11:1.
- Default veil: heaviest on the left, where copy sits (0.94 to 0.42).
- `.photo-ground--center`: a radial veil for centred copy (0.93 at the centre to 0.48 at the edges).
- Phones: an even 0.88 veil.
- Grounds are 2560×1440 WebP (q86) in `public/images/grounds/`. They are high-key, airy photographs, so they stay pale under the veil.

**Where grounds are used**

| Section | Ground |
|---|---|
| Home: "Healthcare that honours your unique story" | Three generations of hands |
| Home: "Care designed around your story" | Window curtain |
| Home: "Care that feels personal" | Woman reading a letter |
| Contact hero | Indiranagar lane |
| FAQ hero | Notebook and filter coffee |
| Blog hero | Reading table |

**Other slots filled**
- **ServiceQuestions on all nine service pages:** a portrait of a local, everyday moment, for example an auto ride with reports or a darshini coffee.
- **About finale:** an empty armchair. Its alt text no longer claims the photo is MyStree's own room.
- **Team role cards:** anonymous role scenes for gynaecologist and nutritionist, sonographer, and care coordinator.

Founders, doctors and care-team portraits remain placeholders, or the real photos from the booking system. Never generate those.

## 24 Oct 2026: blog covers, FAQ divider, About concerns grid

- **Blog covers:** four documentary-style Canva covers (1920×1080 WebP) in `public/images/blog/`. They override the CMS covers for the matching slugs through `LOCAL_COVERS` in `src/lib/cms.ts`. Follow the same photography rules: no real staff, no readable text or logos.
- **FAQ hero → topics:** the hero's photo ground fades to pure white at its foot. The topics section starts with a 1px `var(--hairline)` rule on `.inner`, with roomy padding above the first row. Don't add warm or tinted bands between these sections.
- **About "Whatever brings you in":** 24 tiles (6 rows of 4) that alternate photo and colour tiles. Each tile links to the page that treats that concern. New photos are `public/images/about/concern-*.webp` at 1264².
- **Navbar:** the "Doctors" label now reads "Our Specialists" and still links to `/doctors`.

## 24 Oct 2026: specialist directory cards (/doctors)

- **Section:** the cards sit on a `--surface-soft` band, in place of the reference's beige (no warm grounds). The cards are white with a 1px `--hairline` border.
- **Card contents:**
  - a 6.5rem avatar disc
  - the name (sans, 600) and a short designation (muted)
  - at most 3 outlined chips, then "+N"
  - one full-width Twilight Wine "View profile" button (booking stays on each profile page)
- **Avatar grounds:**
  - Six tones, each mixed from the palette: Wine, Cadet Slate and Midnight Chamber over white or Uranian Mist. They're assigned by roster position, so neighbours never match.
  - Each clinician stands on it as a full-colour cutout (background removed in Canva), so only the background is coloured. Cutouts live in `public/images/specialists/<slug>-cutout.webp` and are listed in `CUTOUTS`. A clinician without a cutout shows their original photo.
  - Never use Flame (buttons only) for a ground.
- **Clinicians without a photo:** a Fraunces monogram in Wine on their tone. Placeholder uploads are listed in `hasDoctorPhoto` (`src/lib/doctors.ts`).
- **Order and paging:** clinicians with a photo come first, 8 cards at a time. "You're viewing X of Y" sits above a Midnight Chamber "Show more" button. Focus moves to the first newly shown card.

## 24 Oct 2026: home hero ("Get care today for …"), section exception

User-requested redesign of the first home section after a supplied reference. Scoped to `src/components/home/home-hero.tsx` and `home-hero.module.css`. It replaces `HeroExperience` on the home page; that component is kept but no longer used.

- **Photo (revised again 24 Oct):** a Canva lifestyle photograph. A woman (not staff) on a sage sofa waves at a video consultation, in a powder-blue kurta, against a slate-blue wall.
  - Desktop: a 16:9 version with about 10% headroom (2880×1620), anchored at 70% 18% so her head never meets the navbar.
  - Phones: a 9:16 version whose upper half is plain wall (1440×2560).
  - **HD (revised 26 Oct 2026):** the Canva generations are only 1680×944 (desktop) and 792×1408 (phone). Both were upscaled 4× with Real-ESRGAN x4plus, run locally on CPU. 18% of a Lanczos upscale of the source is blended back in so skin keeps natural texture, and fine grain (σ 1.2) prevents banding.
  - **Final sizes:** desktop 3840×2160 WebP q90 (248 KB), phone 1440×2560.
  - **Delivery:** `next.config.ts` `deviceSizes` now includes 2560 and 3840, so 125–200% scaled screens are never handed a 2048px file. The hero uses `quality={92}`.
- **Brightness:** no overall dim and no black ground. A Midnight Chamber shade at up to 58% sits only behind the copy column and fades out by 66% of the width. While the photo loads, the stage shows a slate tone matching the wall.
- **Type exceptions (revised 24 Oct):** the page `<h1>` is the three-line heading "Safe and judgement free / women's health clinic / in Bangalore for …" (no hyphen, by request), in Fraunces. It overrides the global h1 scale.
  - **Size:** `clamp(2.5rem, 3.85vw, 3.875rem)` with a line height of 1.04.
  - **Fit:** the size is chosen so the longest third line, "in Bangalore for pelvic health", never wraps and ends 27–48px left of her waving hand at 1025–1920px.
  - **Photo anchor:** the desktop photo is anchored at `0% 18%`. Its framing (a 1.1× crop from the left edge, so she sits further right) is baked into the file rather than done with a CSS transform, which would resample the bitmap. The clearance is 28–86px at 1025–1920px.
  - **Phrases:** they cycle in Fraunces italic in a Wine tint lifted for dark grounds, and are kept to 13 characters or fewer.
  - **Tablets and phones:** the phrase drops to its own fourth line, so the heading height never changes.
  - **Screen readers and crawlers:** they get the full static sentence with every phrase. Only the animation is hidden from them.
  - **Eyebrow:** a short topic line above the heading ("Gynaecology · Fertility · Pregnancy · Menopause"), hidden on phones.
  - **Spacing:** 24px from eyebrow to h1, 28px from h1 to description, 40px from description to button. The space above the eyebrow equals the space below the button.
  - **Eyebrow and description:** the eyebrow is 82% white with 0.16em tracking. The description is 88% white, capped at `min(34rem, 44vw)`.
  - **Button:** "Book a visit" carries an arrow that nudges on hover.
- **Action:** one white pill, "Book a visit". Flame stays on the navbar's Book now.
- **Cards (revised 24 Oct):** a 3 × 2 grid sharing the copy column's container (same left edge). The first row straddles the photo's lower edge by 42% of a card's height.
  - Each card has a cool mist ground (`--uranian-mist` 72% over white, never the reference's warm beige), its title top-left (sans, 500) and a Midnight Chamber circular ↗ button bottom-left that turns Wine and rotates on hover.
  - Each card's Canva studio cutout object stands bottom-right and bleeds off the card edge: booties, hot-water bottle, seedling, fan, exercise mat and dropper bottle.
  - Files are in `public/images/home/care-cards/`.
  - Phones show the cards two across.
- **Phones:** the copy sits on the photo's wall, as on desktop, and she sits beneath it. The cards form one column, 104px tall with 12px gaps.
- **Tablet:** a shorter stage (38rem) with the photo anchored at 80%, a 21rem copy column, and cards two across.
- **Navbar fit:** "Home" and "Our Specialists" made the bar overflow. Link tracking is now 0.06em and the gaps are tighter. Between 1025 and 1199px the Home item is hidden (the logo links home), so everything fits on one row from 1025 to 1920px.

## Scoped exception — ReMind by Her landing page (`remind-for-her/index.html`)

Standalone microsite for the ReMind program, recorded 2026-11-11 at the user's request ("ReMind by MyStree" spec + the new ReMind by Her logo). Applies **only** to `remind-for-her/`; it does not change the corporate palette, the orange-CTA rule, or the Fraunces / Plus Jakarta Sans setup anywhere else.

| Token | Value | Role |
| --- | --- | --- |
| `--ivory` | `#F7F0EB` | 60% canvas; elevated cards (week panel, join card) on dark |
| `--burgundy` | `#641E2B` | 30% inset shells (program, join), primary fills, active states |
| `--wine` | `#4B1722` | Text on ivory (11.6:1), deep ground (FAQ), footer |
| `--champagne` | `#D8BBA6` | 10% borders, active chips, accents on dark |
| `--rose` | `#A96F73` | Decorative only (glows, progress track, watermarks, input borders); never small text |
| `--muted` | `#6D424A` | Secondary body copy: wine at 80% over ivory (7.3:1, AAA) |
| `--danger` | `#8E1B2A` | Form errors |

- Logo: `assets/remind-logo-2026-row.webp` (nav, horizontal), `remind-logo-2026.webp` (stacked), `remind-logo-2026-ivory.png` (on dark). Background removed locally from the supplied artwork.
- Fonts on this page stay Fraunces (display) + Figtree (UI), as already shipped; the minimum text size is 12.5px.
- No orange anywhere on this page, including CTAs (primary buttons are `--burgundy`, `--champagne` on dark).
- The hero art, silk animation and section illustrations are kept; the spec's "zero image" rule was not applied, by the user's instruction to preserve sections that already work.
- v7 (2026-11-11, user request + elayadesign `landing-page-design` skill): below the hero, sections are static line grids (1px `--champagne` gaps, 24px outer radius), flat backgrounds (no gradient washes), type on one scale (14/16/18/20/30/36/48px), spacing on 8/12/16/24/32/40/48/64/96. No scroll reveal or parallax animation below the hero; the hero itself is unchanged. FAQ section removed; Join has no illustration. Kept from the brand rather than the skill: Fraunces + Figtree (the skill's sans-only rule would break the logo's serif identity).
- v8 (2026-11-11, user request): below the hero the page uses **only** pure white `#FFFFFF` and burgundy `#5B1A23` (was `#641E2B`; changed 2026-11-11 at the user's request), with no tints, opacity or third colour. Sections alternate: white (pillars) → burgundy (How it works) → white (program) → burgundy (journey) → white (join, with a burgundy form) → burgundy (footer). Grid rules are 1px in the section's ink; cells share row tracks via `grid-template-rows: subgrid`, so same-row text aligns. Motion is limited to hover/focus colour wipes (cells and buttons fill burgundy↔white, 500ms, `cubic-bezier(0.22,1,0.36,1)`), off under reduced motion. The viaduct art is a burgundy/white duotone (`assets/remind-viaduct-duotone.webp`), and the footer logo is white (`assets/remind-logo-2026-white.png`). The hero keeps its own original colours.
- v10 (2026-11-11, user request): the logo animation is a scroll moment right after the hero (`#brandMoment`, first section of the sheet), not a header effect. The mark is a traced vector (`assets/mark.svg`; the animated copy is inline, with hair strands, pink piece `#E1909D` and dark piece as separate paths). Scroll sets one variable, `--p` (0 to 1), through a passive rAF-throttled listener that is idle while the section is off screen; CSS maps it to transform and opacity only. Pinned for 240svh desktop / 210svh phone; under reduced motion the finished mark and tagline show statically. The header logo is static.
- v11 (2026-11-11, user request): the hero is a single still screen (no silk/WebGL animation, no pinned stage, no rising-sheet transition, no hidden portrait; three.js removed). Its valley fades straight into the white `#brandMoment`, which is now the page's only scroll animation. The header turns solid white as soon as the page scrolls.
- v12 (2026-11-12, user request): the hero art is cropped above its baked-in white fade (`assets/hero-landscape-crisp.webp`) and meets the brand moment on a crisp line; the brand moment is now a burgundy band (white mark, pink piece kept), so the page alternates white/burgundy with straight edges from top to bottom. The mark is built from separate small SVG layers (compositor-only transform/opacity; units via `100cqw / 326`); `--p` updates inside Lenis's frame with positions cached on resize. Typography: hero on the scale (60/64, 48/52 tablet, 40/44 phone; lede 18/28; byline 14/20), kerning and common ligatures on, curly apostrophes in copy. The sign-up card shows only "Sign up".
- v13 (2026-11-12, user request): the hero is content-height (72–83% of a desktop screen instead of 100%): headline at nav + 48px, art cropped to 26% of its width (always keeps the tree tops), its sky tucked 6% under the text with a short top-edge blend into the sky; bottom edge stays crisp on the burgundy band. The mark was re-traced for clean HD outlines (6x upscale, 1.6px noise blur, smoothest potrace curves; mark.svg 48KB → 14KB); the puzzle pieces move and turn but no longer scale (scaled compositor layers can rasterise soft).
- v14 (2026-11-12, user request): hero text is centred in the sky. The hills behind the text begin 6.5% of the art's width above its bottom edge (measured), and the art is positioned so that line sits `--gap` below the text (56px; 40px on phones), mirroring the space above the headline. The section's height is copy + gap + 6.5% of the art's width, so the earlier 440px art cap was removed (it clipped the tree tops on wide screens); the top-edge blend is 6%.

## 14 Nov 2026: compliance copy pass and home hero legibility (supersedes conflicting notes above)

Applies the Growthamp website compliance review of 13 Nov 2026 site-wide. Wording only, except the hero changes below. Fonts, tokens and section layouts are unchanged.

- **Home hero:**
  - **Eyebrow:** "Gynaecology · Pregnancy · Menopause · Pelvic health". Fertility is no longer named.
  - **Heading:** `<h1>` reads "Women’s health clinic / in Indiranagar, Bangalore, / for …". Line height is 1.08 with −0.02em tracking and `text-wrap: balance`.
  - **Text shadows:** removed. Legibility comes from the scrim alone: Midnight Chamber at 78 → 70 → 34 → 0% across the copy column, and 62 → 48 → 0% on phones.
  - **Description:** 0 tracking, `text-wrap: pretty`, capped at `min(37rem, 47vw)`. On phones it is 1rem at 1.55 line height.
- **"At a glance" rings** (`curtain-reveal-outcomes`) show facts ("30 min", "Mon–Sat", "13th Main", "Video") in place of percentage gauges, using `.gaugeFigure`.
- **Copy rules now in force:**
  - No patient counts, ratings, testimonials, "expert" or praise titles, superlatives, NABH claim, drug or device brand names, or efficacy and safety claims.
  - Doctor cards show the role title, the qualification and experience from the booking system, and "Reg. No." where recorded.
  - Fertility page is `noindex` and unlinked. The egg-freezing blog post is withheld (`WITHHELD` in `src/lib/cms.ts`). CMS phrases are corrected through `CORRECTIONS` until edited at source.
  - The Mirena package is renamed "Hormonal IUD Care". The URL is unchanged.

## 14 Nov 2026: home Section 01 (floating header, side menu, hero), section exception

User-requested rebuild of the first home section after the namaha.healthcare first fold. It supersedes the "24 Oct 2026: home hero" notes above. Scoped to `home-header.*`, `home-menu-drawer.*`, `home-hero.*` and `home-nav-data.ts` in `src/components/home/`. On `/`, `SiteNavbar` renders nothing; every other route keeps it.

- **Palette (this section only):** Sanctuary Burgundy `#641E2B`, Dark Wine `#4B1722`, Muted Rose `#A96F73` for hairlines, Warm Ivory `#F7F0EB`, Soft Champagne `#D8BBA6`. On the ivory menu panel, secondary text is `#8A5560` so it meets contrast.
- **Fonts:** root fonts only. The requested Georgia, The Seasons, Instrument Serif and Playfair are not imported. Fraunces sets the display type (including the italic accent), Plus Jakarta Sans the text, and JetBrains Mono the labels and indices.
  - The hero `<h1>` overrides the global `main h1` scale: `clamp(2.65rem, 5vw, 4.65rem)`, line height 1.08, −0.02em tracking.
  - On screens up to 860px tall it is capped at `8.4svh`, so the action bar stays in the first fold.
- **Header:** 88px tall (72px on phones), with the light logo plus a "Women's health / Indiranagar" tag (hidden below 1024px). On the right sit an ivory "Book an appointment" pill ("Book" on phones) and an outlined "Menu" pill.
  - It is transparent at first, then Dark Wine glass from 80px of scroll.
  - Past 160px it hides on downward scroll and returns on upward scroll.
- **Menu:** an ivory side panel inset 12px from the right edge, 480px wide (full width minus 16px on phones), with 14px radius.
  - The top row has Close on the left, and Log in and Book an appointment on the right.
  - Numbered serif links are right-aligned with hairlines. On hover they turn italic, shift left 4px and show an arrow.
  - Below them come Care at MyStree (9 services, no fertility), Packages, and a Dark Wine clinic card (address, hours, call, WhatsApp).
  - It behaves as a modal dialog: focus moves in, Tab is trapped, Escape or the backdrop closes it, and page scroll is locked.
- **Hero:** the `mystree-hero-everyday` photograph (desktop and phone crops) under a burgundy gradient (58 → 70 → 96%), a soft centre shade and 3.5% grain.
  - The copy block is centred: a mono eyebrow, a three-line heading ("every stage of life." in italic Champagne), a 56ch paragraph and a facts line.
  - A two-column action bar sits on the bottom edge: Find a specialist, and Call / WhatsApp.
  - The hero is at least `max(100svh, 640px)` tall.
- **Motion:** heading lines rise from masks (0.9s, 0.12s stagger); the photo settles from 1.07 to 1 and drifts to 14% with scroll; the bar's hairline draws in. All of it is off under reduced motion.
- **Copy changes from the request, for compliance (review of 13 Nov 2026) and clinic records:**
  - No Google rating or review count, and no "100% Confidential".
  - Fees read "from ₹600": the booking roster shows ₹600–₹3,500, not ₹600–₹900.
  - Hours are 9 am – 8 pm (not 7:30), and the postcode is 560008 (not 560061).
  - Fertility is removed from the lists, and the "600m from metro" claim is dropped.
  - The 30-minute length is not stated while the 15/30-minute question is open.
- **Removed from the first fold:** the six care cards. The services accordion that follows covers the same care.

### Revision, 14 Nov 2026: Section 01 rebuilt to the reference, Section 02 added (supersedes the Section 01 notes above)

- **Header:** the logo only on the left. On the right, a small ivory "Book an appointment" pill (11px uppercase, 8px radius) joined to a 40px dark-glass menu button.
- **Menu:** only six right-aligned serif links (About MyStree, Our specialists, Care we offer, Learn, FAQs, Contact us) with hairlines, plus Close and Book.
  - No numbers, no footer content, and no ampersands: Fraunces draws an ornate "&".
- **Hero:**
  - **Photo:** kept bright. A soft pool of shade sits behind the words, with a deepening along the bottom. The burgundy wash, paragraph, facts line and action bar are removed.
  - **Heading:** centred "Women's health care / that always feels / *personal*", at `clamp(2.5rem, 4.2vw, 4rem)`, line height 1.06.
  - **Cards:** four glass cards (`rgb(92 52 40 / .36)`, 22px blur, 12px radius, 268px each) sit 16px above the photo's lower edge: Call us, Care for women, Our specialists, See the clinic.
  - **Cards on small screens:** below 900px they become a swipe row.
  - **Clinic tour:** "See the clinic" opens a dialog with three room images.
- **Section 02 (`home-welcome`):** an ivory gradient canvas with drawn contour line-art (`#DCC2AE`, which draws in once).
  - A quiet centred welcome in 18px sans, then a 720px clinic photo.
  - It removes the global rule between home sections.
- **Images:** slots live in `home-images.ts`. Until a file exists, `ImageSlot` shows a labelled placeholder with the brief, or the existing photo as a fallback for the hero.
  - Clinic photos must be real photographs of MyStree.

### Revision 2, 14 Nov 2026: scroll-driven hero cards, three.js backgrounds, story section

- **Hero:** the section is 170svh tall (160svh below 1024px), and the photo stays pinned (sticky) for the extra 70svh.
  - Over that stretch, four compact glass cards (236px wide, 14px radius) rise one after another, from 90px below with opacity 0 to 1, each over its own slice of the scroll. A bright top edge and an 18px blur give the frosted look.
  - The heading lifts 48px.
  - Scroll-linked opacity uses the function form of `useTransform`. The array form is accelerated through ScrollTimeline, which gives wrong values for a sticky section.
  - Reduced motion: no pin, and the cards are simply there.
- **Section 02 (welcome):**
  - White ground.
  - The statement is in Fraunces, `clamp(1.75rem, 3.2vw, 2.875rem)`, `#641E2B`, with the italic "privacy, comfort and calm." in `#8A4B52`. Its words fill in from 16% to 100% opacity as it scrolls through the viewport.
  - Behind it: three.js hair strands (`three/hair-scene.ts`), 162 strands in light burgundy `#B0606C` at 5–20% opacity, faded where the words sit.
  - The clinic photo (880px) has a caption row aligned to its edges.
  - Placeholders are light burgundy with site type only.
- **Section 03 (story):** white paper.
  - On a 12-column grid, the heading spans columns 1–6 ("Founded by doctors who listen to *women*", `clamp(2.5rem, 4.4vw, 4rem)`). The text spans columns 8–12, set 168px lower, in 16px/1.75 `#4A2A31`, with a "Read about MyStree" link.
  - Behind it: a watercolour painting of the woman from the MyStree mark (`three/paint-scene.ts`), using a mask baked from the logo (`public/images/home/paint/woman-mark-mask.jpg`) in rose, wine and peach. The paint spreads in over about 3 seconds, then drifts.
- **three.js (0.170.0) performance rules (`three/three-backdrop.tsx`):**
  - **Loading:** loaded on demand within 400px of view.
  - **Pausing:** the render loop runs only while on screen and while the tab is visible.
  - **Resolution:** pixel ratio is capped at 1.5, and the paint renders at half resolution and 30fps.
  - **Still frame:** with reduced motion, Save-Data, or 4 or fewer cores and 4 GB or less memory, it draws one still frame.
  - **Fallback:** nothing listens to scroll, and if WebGL is unavailable the plain background remains.

### Revision 3, 14 Nov 2026: card entrance, phone layout, silk ribbon, "at our core" section (supersedes Revision 2 where they differ)

- **Hero cards:** each card starts fully below the screen edge (translate 150%) and slides up with an ease-out, at 94% to 100% scale. It fades in only during the first 40% of its slide, so a card is never seen half-faded in place. The cards follow one another at 0.10 steps of the pinned scroll.
- **Hero cards on phones (<768px):**
  - The heading sits in the upper photo, starting at `max(96px, 13svh)`, at `clamp(2.25rem, 10.5vw, 2.75rem)`.
  - The cards form a compact 2 × 2 grid (16px titles, 12px text), with no sideways scrolling.
  - Tablets show four across.
- **Story section:** the background is a silk ribbon, three.js `hair-scene` variant "ribbon".
  - The lines share one centreline and billow, their width breathing between 25% and 100%, without flipping over. This avoids knots at the folds.
  - It is light burgundy `#B0606C` at 5–16% opacity, faded behind the text.
  - The drawn woman (logo mark) and the paint shader were removed at the user's request.
- **Section 04 "Women's health at our core" (`home-core`):**
  - A 210svh section (190svh on phones) with a pinned stage, on a blush wash `#FCF3F4` → `#FAEEF0` that starts and ends in white.
  - **Scroll timeline:** progress runs from the section entering at 65% of the screen, so the stage is never blank when it pins.
  - **Tree:** an SVG tree of stems (`#E3BFC5`) draws itself in with the scroll.
  - **Blooms:** the MyStree mark's flower, traced to vector in `woman-mark-paths.ts` (`#E8C6CB`), opens at each branch tip and sways slowly in CSS.
  - **Heading:** "Women's health / *at our core*" in Fraunces, `clamp(2.75rem, 5.2vw, 4.75rem)`, `#641E2B` with the italic line in `#8A4B52`. It rises word by word from masks, then one line of text fades up.
  - Reduced motion: no pin; the tree and the words are shown in full.
- **Joins:** every new home section starts and ends in white, and the global rule between sections is switched off for them.

### Revision 4, 14 Nov 2026: background woman, glass-edge cards, Section 05

- **Hero cards:** 272px wide, 16px radius, with 20px titles and 13.5px text. The glass edge is a 1px gradient rim (a masked `::before`), bright at the top-left and bottom-right, plus an inner top highlight. The rule under each title is a gradient.
- **Welcome background:** an original line drawing of a woman (`stree-drawing.tsx`, not the logo).
  - She faces left and sits at the section's left edge at 55% opacity (40% on phones). She is static.
  - Her hair continues as three.js strands (hair-scene "welcome") flowing right across the section, anchored to her drawn hair ends.
  - Background only: there is no separate band and no draw-in animation, at the user's request.
- **Section 04 (core):** the scroll timeline starts when the section enters at 95% of the screen, and growth runs at 1.35× the scroll. The section is 170svh tall (160svh on phones). The story section's bottom padding is 200px. Together these remove the white gap.
- **three.js:** scenes now load 1400px ahead of view, so they are ready before they scroll in.
- **Section 05 (`home-generations`):** white.
  - A rounded photo (14px radius, 5:4; 4:5 on phones) spans about 56% of the width from 5.7% in. Inside its frame it drifts −8% to +8% with scroll.
  - Text column: "Her health, at every *stage of life*" in `clamp(2.5rem, 3.8vw, 3.75rem)`, one paragraph and a link, set lower.
  - The image slot is `generations`; until a final photo is added, it falls back to the existing pregnancy photo.

### Revision 5, 14 Nov 2026: the welcome woman redrawn

- **Drawing (`stree-drawing.tsx`):** replaced by an original drawing in a fine-line illustration style, after the user's reference. It is not traced from it.
  - A young woman in profile facing left, with an open eye and lashes, a small nose, full lips, an ear, her neck, shoulders and a round neckline.
  - Long hair is drawn from the hairline over the crown, framing the face and falling behind the ear and down the back.
  - 600 × 480 units; static; 70% opacity (55% on phones).
- **Moving hair (hair-scene "welcome"):**
  - Roots run along the same hairline (forehead → crown → behind the ear) and follow the drawn hair's course before flowing far to the right.
  - Each lock moves with one shared wave, so the hair moves in locks, and roots are lighter so the hairline doesn't knot.
  - Opacity is 14–38% (7–22% on phones), dropping to 20% where the statement sits.

### Revision 6, 15 Nov 2026: welcome background removed

- At the user's request, the woman drawing (`stree-drawing.tsx`, deleted) and her moving hair were removed from the welcome section. It is now plain white: the statement (words fill in with scroll), then the clinic photograph.
- The story section's silk ribbon (hair-scene "ribbon") is unchanged.
- hair-scene's "welcome" layout is no longer used.

## 16 Nov 2026: care chat launcher (site-wide)

`src/components/care-chat.tsx` is mounted once in `app/(marketing)/layout.tsx`. It replaces the WhatsApp pill on the home and contact pages, which was deleted.

- **Launcher:** a 56px circle (52px on phones), Sanctuary Burgundy `#641E2B`, with the MyStree woman mark in ivory and the flower in rose `#E9A9B2`. It sits bottom right with safe-area insets.
  - It appears only past the first screen: on the home page, past the pinned hero and its cards; elsewhere after 160px of scroll.
- **Greeting:** a white pill, "Hi there, need any help?", in 15px sans (14px on phones), with a white round close button to its left, after the reference.
  - It shows once per visit (sessionStorage, guarded), 5 seconds after the launcher appears.
  - It folds away while the reader scrolls and returns when they pause (1.2s idle).
  - It retires after 10 seconds of on-screen time, or on close. Below 340px wide the close button is hidden; the pill still opens help.
- **Help card:** white, 18px radius, `min(340px, 100vw − 32px)`.
  - The header shows the mark, "MyStree care team" in Fraunces and the hours.
  - Four option rows (WhatsApp, call, book, find a specialist), then an emergency line ("call 112 or go to the nearest hospital").
  - It is a non-modal dialog: Escape returns focus to the launcher, and a tap outside closes it.
- **Motion:** springs on the launcher, greeting and card (fades only under reduced motion). The launcher icon swaps between the mark and a close ×.

## 16 Nov 2026: home Section 06, packages (`home-packages.tsx` + `home-packages-view.tsx`)

After the user's reference layout; the copy is MyStree's own.

- **Ground:** white.
- **Engraving:** the user's reproductive-anatomy engraving (`public/images/home/packages/reproductive-anatomy-engraving.webp`).
  - Background removed: lines kept as alpha, recoloured light burgundy `#8A4B52`, with the generator's corner mark and paper specks cleaned.
  - Placement: on the right, bleeding off the edge, at 42% opacity, faded toward the text, drifting slightly with scroll.
  - Tablets: 32% opacity. Phones: 16%, behind the cards.
- **Heading:** "Planned care, at one *clear price.*" in Fraunces, `clamp(2.75rem, 5.6vw, 5.25rem)`, `#2A1A1E` with the italic accent in `#641E2B`, max 8.6em wide. It overrides the global `main h2`.
- **Label and grid:** "Choose where to start" in 18px sans, then a 2-column grid, max 860px wide (1 column on phones).
- **Cards:** blush `#F7EEEF`, 16px radius.
  - Chips: the price as a solid burgundy chip, plus a type chip.
  - Title in 19px sans 600, then one facts line.
  - A 1:1 image slot top right.
  - A full-width "View package" burgundy button.
- **Data:** prices and links come from `lib/packages.ts` (server component).
- **Advice card:** a wide card, "Not sure which suits you?", with WhatsApp and call buttons and an image slot.
- **Image slots:** `pkgCareJourney`, `pkgBloom`, `pkgNutrition`, `pkgIud` and `careTeam` in `home-images.ts`, shown as compact placeholders until added.
- **Excluded:** the MTP package is not featured on the home page.

### Revision, 16 Nov 2026: Section 06 cards rebuilt to the reference card (supersedes the grid notes above)

- **Engraving:** now in the layout, not floating. The top row is a grid: heading left, engraving right (`aspect-ratio 1376/768`). The engraving bleeds to the page edge and fades toward the heading.
  - On phones it becomes a full-width banner above the heading, fading at its foot.
- **Card row:** "Choose where to start" (20px sans) with previous/next arrows on larger screens. The cards sit in one sideways-scrolling row with snap: they start at the content edge and run past the right edge of the page. Phones swipe; cards there are `min(84vw, 360px)`.
- **Package card (410 × 282, 14px radius, `#EFE1E3`):**
  - A solid burgundy chip (type) and an outlined chip with an icon (scans, care, months, minutes). The outlined chip has an opaque fill, so it sits cleanly over the image.
  - Title in 21px sans 600, max 58% wide.
  - The product image bleeds off the top-right corner behind the text, rotated −4°.
  - A full-width "View package · ₹price" button (54px tall, 8px radius) is pinned to the bottom.
- **Advice card:** a two-tone ground (lighter lower band from 66%), "Need some advice?", "Speak to our care team" with a circled arrow (opens WhatsApp), and an image rising from the bottom edge.

### Revision, 16 Nov 2026: no pinning in the hero or "at our core" (supersedes the pinned-scroll notes above)

- **Hero:** one screen tall and never pinned.
  - The four glass cards rise in on load, one after another (0.75s + 0.1s each), so they are always visible.
  - As the hero scrolls away, the photo scales from 1 to 1.06 and the heading drifts up 60px (transforms only).
- **"Women's health at our core":** one screen tall (88svh on phones) and never pinned. The tree, flowers, heading and line animate as the section rises into view (scroll range: its top at 90% of the screen → its centre at mid-screen), so everything has finished as the reader arrives.
- **Still pinned, untouched:** the older `split-text-reveal` (about 1,800px) and `doctors-section` (about 4,400px) further down the page.

## 16 Nov 2026: home Section 07, journey accordion (`home-journey.tsx`), section exception

After the user's reference; the copy is MyStree's own and describes real clinic steps, with no durations or outcomes.

- **Ground:** dark wine `#4A2D33` with a soft blush light to the right.
- **Heading:** "We're here to *support you*", centred, in Fraunces `clamp(2.75rem, 5.2vw, 5rem)`, ivory `#FFF8F4` with the italic in blush `#F4CFD4`. The heading id is `support-heading` (`journey-heading` is used by StartJourney).
- **Kicker:** "Your journey at MyStree" in 18px sans with a rule, above a 750px accordion card.
  - Card: `#6C4A51`, 16px radius, a hairline border, darker dividers.
  - Rows are 90px tall (72px on phones): a dot, a 21px sans title and a + / − icon.
  - One row is open at a time. An open row's dot glows blush; its text sits on the left (17px / 1.75), with a 4:3 image slot on the right over a soft glow. On phones the image moves below the text.
- **Steps:** Book your visit · Your consultation · Tests and scans · Your care plan · Ongoing support. Image slots `journeyBook` … `journeySupport`, cutouts on a transparent background.
- **Button:** "Book an appointment" → `/book`, blush `#F4CFD4` with ink text (the reference's lime moved into the palette), 370 × 55px, 8px radius; full width on phones.

## 16 Nov 2026: home Section 08, services row (`home-services-row.tsx`)

After the user's reference; the copy is MyStree's own.

- **Ground:** blush `#EFE2E3` (the reference's taupe moved into the palette).
- **Heading:** "We're *more* than a single visit" in Fraunces `clamp(2.25rem, 3.4vw, 3.25rem)`, with the italic word in `#641E2B`.
- **Arrows:** 56px round previous/next buttons on the right, ink `#2A1A1E` (burgundy on hover), faded when at an end. Hidden on phones, which swipe.
- **Row:** white cards, 374px wide (`min(82vw, 330px)` on phones), 22px radius, starting at the content edge and running past the page edge with snap.
  - Each card: a 3:2 image (16px radius) with an optional blush badge, a 21px sans 600 title, 16px / 1.75 text, and "Learn more" with a circled arrow.
  - The whole card links to the service page.
- **Cards, in the order people usually look for care:** gynaecology, pregnancy, PCOS, menopause, pelvic floor, nutrition, skin and hair, teen health, mental health.
- **Images:** `/images/home/services/*.webp` at 1800 × 1200. Each has an image-generation prompt in the component header (Indian context, no people except hands); placeholders show until `ready: true`.
- **Navigation (site-wide fix):** `smooth-scroll.tsx` now resets Lenis to the top on every route change (not for #hash links), and `<html>` carries `data-scroll-behavior="smooth"`, as Next.js advises, so new pages open at their top.

## 16 Nov 2026: home Section 09, team (`home-team.tsx`); Section 08 cards refined

- **Section 08 cards (after the reference card):**
  - Card: 375px wide, 24px radius, 24/20/28px padding.
  - Image: 335:228 ratio, 18px radius, with a 15px badge.
  - Text: title in 22px sans 700, body in 18px / 1.7 (16px on phones), "Learn more" in 19px 600 with a 24px circled arrow; ink `#1C1114`.
- **Section 09 (team):**
  - **Ground:** a blush-to-white gradient.
  - **Heading:** centred, "Meet the *doctors* who will care for you." (the reference's "world-class" was dropped: a superlative). One line lists the clinicians.
  - **Rows:** two rows of compact white cards drifting in opposite directions. It is a CSS marquee (transform only, 9s per card, about 50px/s), with the list rendered twice and the copy hidden from assistive tech and the keyboard.
    - A row pauses on hover, on keyboard focus, and for 5s after a touch.
    - Edges fade.
    - Reduced motion: no drift; rows scroll sideways.
  - **Card (after the reference, 440px wide, 300px on phones, 16px radius):**
    - A 128px round photo (76px on phones).
    - The name in Fraunces 23px.
    - Qualification chips in `#F1E3E5`, 13px 600.
    - The role in 15px; experience and registration (Reg. No.) in 13px `#6E4650`.
    - A "Book appointment" burgundy button pinned to the bottom (each clinician's booking URL).
    - Cards in a row share its height.
  - **Footer:** a "See all our specialists" link.
  - **Data:** `getDoctors()`.
- **Removed from the home page:** the older pinned `DoctorsSection` (a second team listing, about 4,400px pinned). The component file is kept.

### Revision, 16 Nov 2026: compact team cards (supersedes the Section 09 card notes above)

- **Card:** pure white, 360px wide (290px on phones), 18px radius, 20px padding, a hairline `#EFE3E5` border and a soft shadow; it lifts 3px on hover.
- **Top:** a 72px round photo (60px on phones) with a white and hairline ring. Beside it, the name in Fraunces 21px and the role in 14px 500 burgundy.
- **Qualifications:** one line of plain text joined with " · " (13.5px `#4A3A3E`, at most 2 lines). No tinted chips: no backgrounds behind text.
- **Footer:** a hairline, then experience and registration (12.5px `#7A5C63`) on the left and a pill "Book" button (36px, burgundy) on the right, pinned to the bottom.

### Revision, 16 Nov 2026: team cards rebuilt to the reference card (supersedes the compact-card notes above)

- **Card:** white, 430px wide (300px on phones), 14px radius, about 236px tall, soft shadow.
- **Photo:** a 120px round photo (76px on phones) on the left, vertically centred.
- **Text column:**
  - Name in Fraunces 22px.
  - Qualification chips: outlined with a hairline `#E6D8DB`, no fill, 12.5px 500.
  - Role in 15px / 1.6 ink; experience in 13px `#7A5C63`.
  - A quiet "Book appointment" text link in burgundy with an underline rule.
- Registration numbers stay on the doctor profile pages.

### 16 Nov 2026: background rhythm (Sections 07–09)

The order is dark wine (Section 07, journey) → light blush band (Section 08) → white (Section 09). Tinted and white grounds alternate, so no two tinted sections touch.

- **Section 08 (services row):** blush lightened from `#EFE2E3` to `#F5EDED`. White cards still read clearly against it.
- **Section 09 (team):** now white, with one faint blush glow (`#F8F0F1`) behind the moving rows only. Cards gained a hairline `#F0E6E8` border so they hold their edge on white.

## 16 Nov 2026: home page completed; old sections removed

- **Final home order:** hero → welcome → story → at our core → her health (generations) → packages → journey (`#how-it-works`) → services row (`#services`) → team → closing → site footer.
- **Removed from the home page** and archived outside the project (`../Mystreewebsitenew-removed-home-sections-2026-11-16/`): ServicesAccordion, SpecialtyCards, CurtainRevealOutcomes, SplitTextReveal, CareBridge, DoctorsSection, HowMystreeWorks, StartJourney. With these gone, the home page has no pinned (sticky) sections.
- **Anchors kept working:** `/#services` → services row; `/#how-it-works` → journey section.
- **Section 05 revised:**
  - Portrait photo (4:5, max `100svh − 160px`, so the fold never cuts it), with the text centred beside it.
  - Scroll motion: the clip opens from inset, the photo zooms 1.14 → 1 and drifts, and the text moves slightly slower than the page.
  - Eyebrow "Every stage of life"; heading "Her health, cared for at *every stage*"; 17px text.
  - Phones: photo first (max 70svh), then text.
- **Closing section (`home-closing.tsx`):**
  - A full-bleed warm skin close-up that drifts and zooms with scroll, on a 62vh band.
  - Statement: "Your health deserves *time*, and a doctor who listens."
  - A blush "Book an appointment" button and a "Call" link (stacked full width on phones).
  - Image prompts are in the file header; a warm gradient placeholder shows until `READY = true`.
  - The reference's "74% receive a diagnosis" was not used: an outcome statistic.
- **Team cards on phones:** a 56px photo beside the name; chips, role, experience and the book link span the full card width.

### 16 Nov 2026: section images added

- **Closing background:** `public/images/home/closing/mystree-closing-skin-{desktop,mobile}.webp`.
  - Source: a warm shoulder close-up supplied by the user. The generator's sparkle mark was removed by patching from adjacent texture.
  - Desktop 2752 × 1536; phone 1024 × 1536, cropped around the shoulder. Both upscaled 2× with Lanczos and a light unsharp mask.
  - `READY = true`.
- **Section 05 photo:** `public/images/home/mystree-women-every-stage-of-life.webp`, 1228 × 1536 (4:5).
  - Source: a still life supplied by the user (armchair, blue linen shawl, knitted baby booties, steel cup); sparkle removed, cropped to 4:5 and upscaled 2×.
  - The `generations` slot is set to `ready: true` and its alt text updated.

### 16 Nov 2026: clinic reception photo; scroll performance

- **Photo:** the user's enhanced reception photo, with the generator's sparkle removed by patching along the wall–floor line, cropped to 16:10, upscaled 2× (2458 × 1536). Saved as `public/images/home/mystree-reception-indiranagar.webp`.
- **Where it's used:**
  - The welcome section's clinic slot (`clinic`, now pointing at the reception file, with new alt text).
  - The tour window's Reception slot.
- **Motion:** inside its frame the photo zooms 1.12 → 1.02 and drifts ±4% as it crosses the screen (transforms only; still under reduced motion).
- **Smooth scroll (`smooth-scroll.tsx`):**
  - Lenis runs only on mouse/trackpad desktops that aren't low-end, with lerp 0.1, `allowNestedScroll`, no touch syncing.
  - Touch screens, low-end devices, Save-Data and reduced motion use native scrolling.
  - Lenis pauses while a menu or dialog locks the page, and its loop stops in hidden tabs.
- **Lighter effects:** the ribbon scene is capped at 30fps, and the hero glass blur is lighter on phones (10px).

### 16 Nov 2026: package cards made editorial; clinic caption removed

- **Package card:** ground `#F6EEEF`, 16px radius.
  - One uppercase label line: type · detail, 11.5px 600, 0.12em tracking, `#8A4B52`.
  - Title in Fraunces 25px 400 (22px on phones).
  - Price as plain 20px 500 text.
  - Straight 4:5 photo (12px radius) at top right, about 34% wide.
  - A slim 48px "View package →" button, 15px 500, with the arrow nudging on hover.
  - Removed: the filled chips, icon chip, tilted photo and the heavy 600-weight button text.
- **Welcome section:** the caption row and divider under the clinic photo were removed.

## 16 Nov 2026: booking-first UX pass and visibility audit

- **One navbar everywhere:** `SiteNavbar` (announcement + sticky white bar) now shows on the home page too. The home-only floating header and side menu were archived.
  - Its button reads "Book appointment" at 1280px and wider, and "Book now" below that; it is always visible on phones.
- **One booking button:** `--book-top #C94A22` → `--book-bottom #A83A1A`, white text, 4.7–6.5:1.
  - Used by `.cta-book`, the navbar buttons, the contact page and the team-2 page.
  - Pure Flame `#ED5B2D` (3.4:1 with white text) is no longer used as a text background.
  - On the home page, the hero, journey, team cards and closing section all use `.cta-book`.
- **Hero (first screen):** heading, then "Book an appointment" (primary) and "Find a specialist" (secondary glass pill). Phones show both on one row, labelled "Book appointment".
  - Four cards: Our services · Our specialists · Find the clinic (Google Maps) · Call us.
  - The stage is `100svh − header` and a flex column, so the cards never overlap the copy.
  - Verified above the fold at 1440 × 900, 1366 × 768 and 390 × 844. At 360 × 640 the second card row falls just below.
- **Home order:** hero → services → team → journey (how a visit works) → packages → clinic (welcome) → story → at our core → her health → closing (Book, Call, Get directions) → footer.
- **Fixes:**
  - The body's 8px default margin on phones (the reset applied only with Lenis).
  - The `.eyebrow` colour: cadet (2.6:1) → `--text-muted` `#4A6173`.
  - The team-2 mobile label colour, likewise.
- **Audit:** 10 pages × desktop and phone, 0 measurable contrast failures. "Tap to use the map" and the blog's vertical topic tag were flagged by the script but checked by eye as readable: they sit on the dark wine pill and the berry strip respectively.

## 17 Nov 2026: SEO / AEO / GEO pass (from the research brief SEO.md, AEO.md, GEO.md, FAQ_DRAFTS.md)

- **`/clinics/pcos` rebuilt** on the locked service-page template, replacing the old four-card dynamic page (archived).
  - Title: "PCOS & PCOD Consultations in Indiranagar, Bengaluru".
  - Content: 12 concerns, 8 sourced FAQ drafts and 5 local questions; no cure or "root cause" claims; care regardless of pregnancy plans.
  - Booking cards: gynaecologists, nutritionist and dermatologist.
- **Home H1:** "Women's health clinic in Indiranagar, Bengaluru", styled as the eyebrow (with `!important` overrides of `main h1`). The slogan is now a styled `<p>`; visually unchanged.
- **Footer:** full address and "Mon to Sat, 9 am to 8 pm" as visible text, matching the schema.
- **Metadata:**
  - Gynaecology page title is now "Gynaecologist Consultations in Indiranagar, Bengaluru", with a new description.
  - "30-minute" removed from the home and gynaecology descriptions.
  - Doctors description: "fertility specialists" → "reproductive medicine specialist".
- **Contact page H1:** "Visit MyStree in Indiranagar".
- **Pregnancy page:** the ask panel is now a visible urgent-symptom notice (emergency department or 112), outside the accordions.
- **Menopause:** the 12-month answer now carries the hormonal-contraception caveat.
- **Verified:** all pages send a unique title, description, canonical and H1 in the server HTML; unknown routes return 404; legacy URLs redirect in one hop (308); the sitemap excludes fertility and the egg-freezing post.

### 17 Nov 2026: visit length is 15 minutes (confirmed by the user)

Every "30-minute", "30 min", "thirty minutes" and "30–45 minute" reference was changed to 15 minutes or rewritten so it doesn't promise a length. That covers home metadata, the gynaecology page (lead, FAQ, at-a-glance), the fertility page, the contact page and metadata, the FAQ hub data and CTA, the team-2 components, the legacy hero, and `llms.txt`. The booking cards' "15 min visit" now agrees with the page copy.

### 17 Nov 2026: navbar hide on scroll, hero cards on scroll, blog motif removal

- **Site navbar (all pages):** the main bar slides up out of view (`.isHidden`, `translateY(-100%)`, 0.32s) when the visitor scrolls down past 160px, and slides back as soon as they scroll up. It stays visible near the top, and while the mobile menu, a dropdown or search is open. Reduced motion: no transition, just shows and hides.
- **Home hero:** the first screen now shows only the eyebrow H1, the slogan and the two CTAs (`.copy` is at least one viewport tall). The four glass cards sit below the fold on the same photo and rise in with `whileInView` (opacity and y, staggered 0.09s). Slogan: `clamp(2.75rem, 5vw, 4.75rem)`, line-height 1.02, `text-wrap: balance`, a soft double text-shadow and a stronger shade for legibility; phone `clamp(2.4rem, 11vw, 3.1rem)`. The eyebrow is 13px / 600 / 0.2em (phone 11.5px).
- **Blog featured slider:** the cellular texture SVG and the white fluid line / node overlay ("wires") over the images were removed. The circular image stays.
- **Verified:** on the home, about, doctors, gynaecology, pregnancy, PCOS, package, contact, FAQ and blog pages the H1 sits below the navbar on the first screen at 1440x900 and 390x844, with no horizontal overflow.

### 17 Nov 2026: mobile pass (phones only; desktop and laptop unchanged)

User request: phones felt stuck while scrolling, everything felt too big, the doctor cards were too long, and service pages put too much text in one section with loose images. All changes below are inside phone media queries (`max-width: 767px`, or `639px` for service sections, `600px` for the doctors list) unless noted.

- **Scroll smoothness (phones and touch screens):**
  - The hero glass cards and the "Find a specialist" pill have no backdrop blur on phones and touch screens. A deeper tint keeps the glass look. Blur under moving content was redrawn every frame and was the main cause of the stutter.
  - Scroll-linked parallax (hero photo scale and heading drift, welcome clinic photo, generations clip-path reveal and zoom, closing photo) returns neutral values on phones via `isLiteMotion()` (`src/lib/use-lite-motion.ts`). It switches on only after hydration, so server and client HTML match. Entrance animations and the text reveals stay.
  - Sideways rows (services, packages) reveal as a whole row with a stagger, instead of per card. Cards that start off-screen are already visible when swiped in. Phones use `scroll-snap-type: x proximity`.
  - The team marquee drops its edge-fade mask on phones (a mask over a moving layer).
  - The care chat scroll listener is throttled to one update per frame, and the reveal point is measured on load and resize only.
- **Home, compact on phones:**
  - Section paddings are roughly 44 to 56px.
  - Headings: services row and team 1.9rem, packages 2.1rem, journey 2.2rem, generations and story 2.1rem, core 2.3rem, closing 1.85rem.
  - Services cards are about 68vw: a 16:10 image, two-line description, 16px title.
  - Package cards are about 70vw x 196px.
  - Journey rows are 54px.
  - The generations photo is 4:3 instead of a tall 4:5.
- **Home doctor cards (phones):** about 272 x 170. A 48px photo with the name and role beside it, qualifications as one dotted line of text, then experience and a small "Book" button on one row.
- **/doctors (phones):**
  - Meet-the-doctors cards are a one-column horizontal list: a 64px photo, name, role, qualification and registration clamped to two lines, two chips and a small "View profile". Role and location filters sit side by side.
  - Care-team role cards are horizontal, a square photo beside the text.
  - The care-model comparison rows are short cards without the repeated labels.
- **Care chat:**
  - Phones: a 46px launcher, smaller greeting and help card.
  - All screens: the help options rise in with a short stagger, and a soft ring breathes out from the launcher a few times until the greeting is seen, while the flower in the mark sways once (transform and opacity only).
  - Reduced motion: none of these play.

#### Service pages on phones (and section order on all screens)

- **Section order (all screens), by what a visitor needs first:** opening band (hero and quote), conditions, book with a specialist, steps to your first visit, care plan, insight, fit, model, statement figure, at-a-glance facts, local questions, FAQs, still have questions, reading, closing.
- **Phone layout (`max-width: 639px`):**
  - Conditions are wrapped outline chips instead of a 12-row column.
  - Insight and steps photographs lead their sections as rounded 16:9 banners.
  - The hero photograph is a rounded 16:10 card.
  - Tighter type: section headings 1.55 to 1.6rem, body text 14 to 15px.
  - Booking cards are about 270px tall: qualification clamped to two lines, one line of chips, a slimmer next-slot row.
- **Doctors shown per page** (checked against the live booking roster, 17 Nov 2026):
  - Dermatology: dermatologist and nutritionist; the gynaecologist was removed.
  - Nutrition: nutritionist only; two gynaecologists were removed.
  - Pelvic floor physiotherapy: the physiotherapist only; two gynaecologists were removed.
  - Teen health: the high-risk obstetrician was replaced by the dermatologist (teen skin and hair).
  - Gynaecology, pregnancy, menopause, fertility, PCOS and psychology were already correct.
- **Hydration:** `useStillAfterMount()` reports reduced motion only after mount. This fixes a hydration failure for reduced-motion visitors in the welcome statement, team rows, and services and packages rows.

### 23 Nov 2026: fixes from the website review

Source: the review in `docs/MyStree-Website-Review-2026-11-23.pdf` (kept local, not committed).

- **Legal pages:**
  - `/privacy-policy` and `/terms-and-conditions` are now full pages, replacing the "We are preparing…" placeholders.
  - New shared layout: `components/legal/legal-page.tsx`, a 44rem white reading column with an "On this page" list, numbered Fraunces headings, and wine links.
  - The pages moved into the `(marketing)` route group, so they have the site navbar. URLs are unchanged.
  - The privacy policy is written for the DPDP Act 2023. The clinic still needs to have both pages legally reviewed and to name a Grievance Officer.
- **`/contact`:**
  - The appointment form used to fake a "Request Received" message. It is now "Request an Appointment": it opens WhatsApp with the request written out, and the success state says the appointment is confirmed only when the care team replies.
  - Fields: name, mobile, care needed, preferred day and time. Email and the hard-coded doctor list and slots were removed.
  - The address card now shows No. 3366, 13th Main Road, HAL 2nd Stage, 560008 (it said "2nd Floor … 560 061").
  - The unverified second phone number (+91 99028 78279) was removed.
- **Copy accuracy:**
  - "Unhurried" was removed from site copy. Dr. Smitha's personal statement is kept as written.
  - Generic "15-minute consultations" now says doctor consultations are 15 minutes, and nutrition, physiotherapy, yoga therapy and psychology are 30 minutes (psychiatry 60, in `llms.txt`), matching the booking system. Booking cards already show each clinician's live visit length.
  - The FAQ claim "dedicated women clinicians" was removed.
- **Redirects:**
  - `/showcase/*`, `/events/*` and `/mystree-soul` redirect to `/about` (temporary).
  - `/blog/egg-freezing-india-guide` redirects to `/services/fertility-clinic` (permanent).
- **Google tag:**
  - Pages under `/services`, `/clinics`, `/packages`, `/blog`, `/faq(s)` and `/doctors/<slug>` send `allow_ad_personalization_signals: false`, so they cannot feed remarketing audiences.
  - Analytics and conversion measurement are unchanged.
- **Speed:** the `/doctors` H1 is no longer faded in after hydration. Mobile LCP dropped from 3.6 s to 1.2 s (4× CPU slowdown, slow 4G).
- **Reduced motion:** all home sections use `useStillAfterMount()`, which removes the remaining hydration style warnings.

## 24 Nov 2026: MyStree Assistant (replaces the care chat help card)

Files:
- `src/components/care-chat.tsx` and `care-chat.module.css`: the UI.
- `src/lib/care-chat/brain.ts`: the answers.
- `app/(marketing)/layout.tsx`: passes the live booking roster and the packages to the chat.

**How it answers:**
- It is rule-based; there is no AI model and no server call. What visitors type never leaves the browser.
- Order of checks:
  1. Emergency and crisis wording, always first and answered with no delay:
     - pregnancy red flags;
     - heavy bleeding, severe pain, fainting, breathing, fits;
     - self-harm: Tele-MANAS 14416 and 112;
     - violence: 112 and the Women Helpline 181.
  2. Clinic intents: booking, cancelling, hours, address, fees (grouped live from the booking roster), payment, insurance, video visits, packages, talk to a person.
  3. Areas of care: the matching doctors with live fee and visit length, a "Book" button, and the service page.
  4. FAQ search over `lib/faq-hub.ts`.
  5. An honest fallback that hands over to WhatsApp with the question prefilled.
- Analytics: `care_chat_open`, plus `care_chat_reply` with the matched topic only (never the text).

**Launcher:**
- A 56px circle (50px on phones), gradient `#7A2637 → #641E2B → #561826`, with the ivory mark and rose flower.
- Hover (mouse and trackpad only, `(hover: hover) and (pointer: fine)`):
  - the circle widens to the left into a 170px "Ask MyStree" pill (420ms ease-out); the icon stays pinned on the right;
  - the label slides in and the mark tilts −8°;
  - the flower turns, the button lifts 2px with a deeper shadow, and a light sweep crosses it once.
- Press scales it to 0.94. When open it shows a close ×, which turns 90° on hover.
- A few soft pulse rings play until the greeting has been seen.
- Greeting pill: "Hi, have a question? Ask me." Same once-per-visit rules as before.

**Desktop panel:**
- 384px wide, `min(640px, 100dvh − 120px)` tall, 22px radius.
- It springs out of the launcher (origin bottom right, scale 0.88 → 1). It is non-modal; Escape closes it and focus returns to the launcher.

**Phones:**
- A bottom sheet, `min(88dvh, 760px)` tall, over a dimmed page (`rgb(28 10 14 / 0.42)`).
- It springs up from the bottom. Drag the handle or header down to close, or tap the backdrop.
- The page behind is locked and Tab stays inside the sheet. No autofocus, so the keyboard doesn't pop up.

**Panel content:**
- Header: avatar (hidden below 390px), "MyStree Assistant" in Fraunces 16px, a green dot with "Instant answers", a red outline "Emergency" button (`#B4232C` on `#FDEEF0`), and a close button.
- Message log on blush `#FBF7F7`:
  - bot bubbles are white with a hairline border; user bubbles are burgundy;
  - emergency bubbles are tinted red with an "Urgent help" label;
  - doctor, fee and package rows carry outline "Book"/"View" buttons;
  - actions: booking orange for "Book online", red for "Call 112", outline for the rest;
  - suggestion chips rise in with a stagger; a typing indicator shows for 0.5–1.1s.
- Composer: a 44px input (16px text, so iOS doesn't zoom), a round send button, and the disclaimer "Automated answers, not medical advice. Nothing you type is sent to the clinic."

**Reduced motion:** fades only, no typing delay, no pulse or sweep.

## 25 Nov 2026: Website audit, typography unification, compliance & preventive health updates

- **Unified Typography System across all routes:**
  - Main headings (`<h1>`) & section headings (`<h2>`, plus footer statement/wordmark and large editorial numerals): `Fraunces` (`--font-serif`), weight `400` everywhere (`/about` Sans 700 overrides and `/blog` `.sansWord` aligned to Fraunces 400; `HomeWelcome` display `<h2>` moved to `.statement`).
  - Subheadings (`<h3>`, doctor card names, step titles, contact cards, article cards, package cards): `Plus Jakarta Sans` (`--font-sans`), weight `600` uniformly across every section.
  - Eyebrows, category badges, section labels, and metadata overlines: `JetBrains Mono` (`--font-mono`), weight `500`, uppercase.
  - Body text (`400`) & small captions/legal/disclaimers (`400`–`500`): `Plus Jakarta Sans` (`--font-sans`).
- **24 Nov 2026 Review compliance & UX updates:**
  - Renamed `/packages/mirena-comfort-care` -> `/packages/hormonal-iud-care` (with 308 permanent redirect and renamed image files without brand name).
  - Removed `/packages/mtp-care` links from footer, navigation dropdown, and `/about` concern grid (the `/packages/mtp-care` page stays live).
  - Added `/booking` and `/booking/:path*` redirects for non-production proxy hosts in `next.config.ts`.
  - Added `/services/womens-health-check` ("Women's Health Check & Pap Smear in Indiranagar, Bengaluru") with aliases `/services/pap-smear` and `/services/womens-health-checkup`, wired into sitemap, navbar, footer, CareChat, and `llms.txt`.
  - Removed `"trusted"`, `"Expert"`, and `"Specialist"` role titles from doctor normalizer/roster/SEO copy; added `Reg. No.` display to `HomeTeam` cards; deferred duplicate marquee loop clone in `HomeTeam` to client-side motion only and added descriptive `alt` text on all content images across `/`.
  - Added footer medical disclaimer (`"Information on this website is for awareness only and is not a substitute for medical advice."`), DPDP `ConsentNotice` (`consent-notice.tsx`), sticky mobile `Call / WhatsApp` bar (`mobile-action-bar.tsx`, shifting `CareChat` dock upward on mobile), and updated `GoogleTag` to disable `allow_ad_personalization_signals` everywhere and never execute on staging/preview hostnames.
- **`HomeTeam` compact horizontal cutout cards (updated 25 Nov 2026):**
  - Replaced the marquee with a static compact horizontal card grid (3 columns desktop, 2 columns tablet, 1 column phone) inspired by the uploaded horizontal doctor card silhouette and styled in the MyStree corporate palette (`#F8FBFE` to `#E8F2FA` mist studio card, `#0C161D` ink, `#4A152D` speciality eyebrow in JetBrains Mono 500, `#4A6173` concise info & metadata, `#FFFFFF` concentric studio watermark arcs, and full-width bottom `.cta-book` Flame CTA/schedule bar showing next available date, time, and booking arrow alongside a top-right quick-book arrow).
  - Uses transparent cutout portraits (`/images/specialists/*-cutout.webp`, falling back cleanly to Fraunces monograms where no portrait is available). Zero star ratings, review counts, or verification ticks.
  - Shows 6 priority clinicians first (`Dr. Smitha A.P`, `Dr. Surbhi Sinha`, `Dr. Chaitra Nayak`, `Dr. Raksha M`, `Priyanka Savina`, `Dr. Jasmine Flora`), with a `"Show more doctors"` toggle revealing all remaining clinicians inline and a link to `/doctors`.
- **`HomePackages`, Uniform `.cta-book` Spotlight & Compact Home Spacing (updated 25 Nov 2026):**
  - Rebuilt `HomePackages` (`home-packages.tsx`, `home-packages-view.tsx`, `home-packages.module.css`) into a 4-column desktop / 2-column tablet / 1-column mobile grid of 4-part pricing cards (`16:9` rich media + factual badge, `<h3>` title & 2-line intro, bold price + billing/scope interval, and full-width uniform CTA button) with tight engraving header and explicit navigation guide copy.
  - Unified `.cta-book` across all pages in `globals.css` (`12px` rounded corners, `0.3s cubic-bezier(0.4, 0, 0.2, 1)` lift `-3px`, flame hover glow, `scale(0.98)` active press, accessible focus ring) paired with `<CtaSpotlight />` (`src/components/cta-spotlight.tsx`) for gentle backdrop dim/blur focus on desktop hover/focus (skipped under reduced motion).
  - Compacted excessive vertical padding across home sections (`HomeWelcome`, `HomeStory`, `HomeCore`, `HomeGenerations`, `HomePackages`, `HomeJourney`, `HomeServicesRow`, `HomeTeam`, `HomeClosing`).
- **Burgundy Palette Overhaul, Circle-Free `HomeTeam` & Service Page Scroll Cadence (updated 25 Nov 2026):**
  - Transitioned global design tokens (`globals.css`, `tailwind.config.ts`) from navy/blue/orange to the approved 5-swatch Burgundy system (`#800020`, `#5C0017`, `#FF0040`, `#D60036`, `#AD002B`) with `#FAF1F3` Porcelain Rose, `#F3E2E6` Warm Blush Veil, `#FFFFFF` White, rested `#3E1E26` / `#6A424D` rose-plum prose, and frozen footer surface (`--footer-surface`).
  - Removed the SVG background circles (`styles.arcs`) behind `HomeTeam` portraits and changed `HomeTeam` cards to soft burgundy gradient (`#FDF7F8 -> #F3E2E6`) with `#E5CED3` border and `#5C0017`/`#800020` text hierarchy.
  - Removed `<CtaSpotlight />` and `.cta-spotlight-backdrop` page dimming/blackout on button hover; upgraded `.cta-book` to Garnet-to-Burgundy `#AD002B -> #800020` (hover `#D60036 -> #AD002B`, `#FF0040` focus ring, white inversion on dark burgundy grounds).
  - Re-sequenced all `/services/*` and `/clinics/pcos` bands to alternate cleanly (`Band #800020->#5C0017` -> `Conditions #FAF1F3` -> `Specialists #FFFFFF` w/ burgundy cards -> `Steps #FAF1F3` -> `Plan #F3E2E6` -> `Insight #FFFFFF` -> `Fit #FAF1F3` -> `Model #FFFFFF` -> `Stat #FAF1F3` -> `Facts #FFFFFF` -> `Questions #FAF1F3` -> `Faq #FFFFFF` [or `#FAF1F3` when immediately after `Facts` on `/services/fertility-clinic`] -> `Ask #5C0017->#800020` -> `Reading #FAF1F3` -> `Closing #FFFFFF canvas + #800020->#5C0017 panel` -> `SiteFooter #692B43`).
  - Refined `HomePackages` (`home-packages.tsx`, `home-packages-view.tsx`, `home-packages.module.css`): removed floating corner overlay pills (`"Starting Steps"` etc.) and icon/copy clutter, enlarged card imagery to `4:3` (`object-contain` header engraving fit cleanly at `right center`), and removed 2-line sentence truncation so every package summary finishes with a complete sentence.
  - Redesigned `ServiceSpecialists` & `HomeTeam` doctor cards with highlighted portrait frames, horizontal & vertical hairline separators (`#E5CED3`), complete unbroken text (no `ellipsis` / `line-clamp`), bold `700` decision metrics (`Next Available` date/time + `Fee` rate), and full-width primary `.cta-book` booking buttons.
  - Fixed `HomeCore` CSS stage collapse (`position: relative` normal flow over SVG tree) and tightened vertical padding in `HomeStory`, `HomeCore`, `HomeWelcome`, `HomePackages`, and `HomeGenerations` to eliminate excess vertical blank space.

## 26 Nov 2026: Luminous Rose-Pearl Glassmorphic Booking Cards, Editorial Artworks, Blog Polish & Font-Weight Refinement

- **Luminous Light Rose-Pearl Glassmorphism (`HomeTeam` & `ServiceSpecialists`):**
  - Replaced dark burgundy booking cards with light frosted rose-pearl glass (`rgb(255 255 255 / 0.96) -> rgb(255 238 243 / 0.95)`, subtle rose radial corner blooms, `backdrop-filter: blur(16px)`, `1px solid #ECC9D4` edge).
  - Enlarged circular doctor portraits (`76px` desktop / `66px` mobile on `HomeTeam`; `72px` desktop / `66px` mobile on `ServiceSpecialists`) with white ring framing.
  - Made consultation rate (`1.2rem`–`1.25rem`, `600`, `#5C0017`) and doctor name (`1.15rem`–`1.1875rem`, Plus Jakarta Sans `600`) distinctly prominent; zero star ratings and zero `Reg. No.` on summary cards (`Reg. No.` remains profile-only on `/doctors/[slug]`).
  - `Book Appointment` pill button uses MyStree Crimson-to-Burgundy (`#AD002B -> #800020`) and shifts on hover to a contrasting deep velvet plum-oxblood (`#43081C -> #260310`).
- **Bespoke Burgundy Fine-Line & Watercolor Editorial Illustrations:**
  - Added `src/components/home/editorial-art.tsx` with 14 bespoke fine-line Burgundy/Oxblood ink & soft rose watercolor SVG illustrations across all 10 `HomeServicesRow` cards and all 4 `HomePackagesView` cards (`#FFF9FA -> #FFE8EF` paper ground, `#5C0017` / `#800020` / `#AD002B` ink contours) so every clinical specialty and package shares one unmistakable, human-drawn gallery voice.
  - Replaced the 5-petal SVG flower in `/doctors` `Team2ClosingBanner` with a fine-line ink-and-wash side-profile portrait inside a botanical sanctuary arch.
- **`/blog` Hero & Featured Card Fixes (`BlogHero`, `FeaturedBlogSlider`, `BlogLatest`):**
  - Fixed `THE mystree TAKE` vertical descender overlap (`line-height: 1.08`, `margin-top: 0.14em`) and synced hero, featured slider, and latest cards to MyStree's pure `#800020` / `#5C0017` / `#FFF5F7` palette.
  - Removed the protruding semicircle (`.berryArc`) and circular cutout from `FeaturedBlogSlider`, replacing it with a clean 2-column split editorial card (`#7A001E -> #520014` left copy + warm full-bleed right photo).
- **Sitewide Editorial Font-Weight Refinement:**
  - Softened secondary UI chrome, nav links, filter labels, badges, secondary outlines, and link pills from uniform `600` to `500` Medium while strictly preserving Fraunces `400` (`h1`/`h2`), Plus Jakarta Sans `600` (`h3`), and JetBrains Mono `500` metadata.

## 26 Nov 2026 (v2): OKLCH Perceptual Neutral Architecture, Live `/api/availability` Backend Wiring & Uniform Package Layout

- **Perceptual Color-Engineering Overhaul (Eliminating Pastel-Pink Chroma Fatigue):**
  - Audited MyStree's light grounds in OKLCH against pure Burgundy (`#800020`, `H=18.6°`) following Stripe, Radix Colors, OKLCH chroma-budgeting, and Refactoring UI 60-30-10 architecture.
  - Replaced high-chroma pink light washes (`#FFEEF3` / `#FFEBF0` / `#FFF5F7`, `C=0.011–0.023`) and pink borders (`#EED4DC`, `C=0.031`) with hue-locked (`H ≈ 17°`) ultra-low-chroma luxury architectural neutrals in `src/app/globals.css`:
    - Primary Canvas: `#FFFFFF` (`C=0`)
    - Porcelain Whisper (`--surface-whisper`): `#FBF9F9` (`C=0.0021`)
    - Warm Alabaster (`--surface-mist`): `#F8F5F5` (`C=0.0032`)
    - Recessed Data Well (`--surface-well` / `--surface-blush`): `#F3EFEF` (`C=0.0043`)
    - Subtle Hairline (`--border-subtle`): `#E8E1E2` (`C=0.0077`)
    - Component Border (`--border-component`): `#DDD3D5` (`C=0.0113`)
    - Muted Ink (`--text-muted`): `#5C484D` (`8.4:1` contrast on white)
    - Pure Brand Burgundy (`#800020`, `#5C0017`, `#AD002B`) and Preserved Footer (`#692B43`) remain intact and now command crisp focal priority under the 60-30-10 rule.
- **Architectural Booking Cards + Live Availability API (`src/app/api/availability/route.ts`):**
  - Built `GET /api/availability` (with `POST` webhook revalidation support) and `src/lib/use-live-availability.ts`, backed by bounded-concurrency 4-day wave lookups + retry + `offline`/`online` fallback in `src/lib/booking.ts` (`getBatchNextSlots`).
  - Wired both `HomeTeam` and `ServiceSpecialists` (`service-specialists-grid.tsx`) to stay synced with live original IST appointment timings from the booking database.
  - Removed the duplicate `"Available"` pill and pink radial-glow backdrop; rebuilt cards with crisp `#FFFFFF` body, recessed `#F3EFEF` live timing well, prominent `#5C0017` consultation fee + doctor name beside the portrait, single truthful live status badge, and compact mobile grid (`#doctors` horizontal touch filter strip + tight 14px–15px mobile card spacing).
- **Uniform `/packages/[slug]` Two-Column Layout (`src/components/packages/package.module.css`):**
  - Aligned left `.tabsCard` and right sticky `.priceCard` on the exact same horizontal top baseline (`align-items: start; margin-top: 0;` on desktop) inside a calm `#FBF9F9` body ground with matching `1rem` corners, `#DDD3D5` borders, recessed `#F3EFEF` tab rail, and `#F8F5F5` Warm Alabaster hero & Why-MyStree bands.
