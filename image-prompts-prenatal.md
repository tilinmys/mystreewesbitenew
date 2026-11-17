# MyStree — Pregnancy care page image manifest

Five assets are required for `/services/prenatal`. **None is generated.** Each
slot currently renders a labelled placeholder at the correct ratio, so dropping
the real files in causes no layout shift.

## Constraints for every image

Cool, restrained colour grade — the site forbids warm cream or orange-family
grounds. Real skin texture with visible pores and fine lines. Documentary
framing, not advertising. No readable text on any paper or screen in frame.

**Reject and regenerate on:** plastic or poreless skin, malformed hands, warm
cream or orange-tinted interiors, camera-facing stock smiles, fake readable text
on reports, pink "maternity" styling, cradled-bump silhouettes, soft-focus
backlit belly shots, white-coat-and-clipboard poses, or anything that reads as
CGI rather than photography.

**These images are illustrative.** They depict no identified MyStree clinician
and no MyStree room. Alt text must describe only what is in the frame, they must
never be captioned as named staff, and they are excluded from structured data.

## Manifest

| Slot | File | Ratio / size | Notes |
| --- | --- | --- | --- |
| 01 Hero | `prenatal-care-indiranagar-hero.webp` | 16:10, 1920×1200 | Desktop. **Do not lazy-load — this is the LCP element.** |
| 01 Hero mobile | `prenatal-care-indiranagar-hero-portrait.webp` | 4:5, 1024×1280 | Art-directed via `<picture media>`; the desktop crop loses its subject on a phone. |
| 02 First visit | `pregnancy-first-visit-consultation.webp` | 4:5, 1024×1280 | Lazy. |
| 03 Approach | `pregnancy-care-approach.webp` | 4:5, 1200×1500 | Lazy. The page scales the crop as the reading zone moves, so leave headroom around the subject. |
| 04 FAQ | `prenatal-faq-clinic.webp` | 4:3, 1400×1050 | Lazy. |
| 05 Closing art | — | — | **Already built** as inline SVG in `PrenatalClose` ("the pregnancy care circle"). No raster asset needed. |

Save to `public/images/prenatal/`.

## Alt text drafts

Use these verbatim. They describe the frame and claim nothing about identity.

01. `A pregnant woman and a clinician talking across a consultation table in a bright clinic room`
02. `A clinician taking notes while a woman describes her symptoms at a first pregnancy consultation`
03. `A clinician and a pregnant patient reviewing information together at a consultation desk`
04. `A quiet, uncluttered women's health clinic waiting area with natural daylight`

---

### 01 — `prenatal-care-indiranagar-hero`

```text
Authentic editorial healthcare photograph inside a boutique women's health clinic in Bengaluru, India. An Indian woman in mid-pregnancy sits across a pale wooden consultation table from a female Indian doctor in her 40s, mid-conversation. Both women are at equal eye level, the doctor listening rather than typing, natural hand gestures, genuine unposed expressions. Neither looks at the camera. Cool off-white and pale grey-blue walls, one muted powder-blue painted surface, pale natural wood furniture, a single restrained sage-green plant, soft Bengaluru morning daylight through a side window. Realistic brown skin texture with visible natural pores and fine lines, documentary photography, candid rather than staged, 35mm perspective, subtle film grain, editorial magazine realism. Cool restrained colour grade. No warm cream or beige walls, no orange or terracotta tones anywhere, no pink maternity styling, no cradled-belly pose, no stethoscope cliché, no text, no logo, no watermark, no glowing technology, no exaggerated smiles. Landscape 16:10.
```

### 01b — mobile crop

Same scene and grade, recomposed vertically so both faces sit in the upper two
thirds. Portrait 4:5.

### 02 — `pregnancy-first-visit-consultation`

```text
Documentary editorial photograph of a first antenatal consultation in a contemporary women's health clinic in Bengaluru. An Indian female clinician writes on a paper notes page while an Indian woman patient speaks, mid-sentence, hands resting on the table. No readable writing anywhere in frame and no patient-identifying information. Cool off-white interior with muted powder-blue and dusty slate accents, pale natural wood, soft window daylight, realistic Indian skin tones and natural imperfections, quiet attentive atmosphere, subtle grain. Cool restrained colour grade. No warm cream or beige interior, no orange or terracotta tones, no examination couch, no medical equipment in focus, no posed corporate expressions, no text, no logos, no plastic skin. Portrait 4:5.
```

### 03 — `pregnancy-care-approach`

```text
Authentic Indian women's healthcare editorial photograph in a private Bengaluru consultation room. An Indian female doctor and a pregnant Indian woman sit side by side at an angle, calmly reviewing a simple printed summary together. The doctor is explaining something; the patient is participating actively rather than passively receiving information. Generous space around both figures so the crop can be adjusted. Cool pale grey-white walls with one muted powder-blue surface, pale natural wood table, soft daylight, understated contemporary clinic design, realistic skin and hair texture, sophisticated but not luxurious. Cool restrained colour grade. No warm cream or beige walls, no orange or terracotta tones, no dramatic posing, no floating charts, no neon, no pink feminine clichés, no text, no watermark. Portrait 4:5.
```

### 04 — `prenatal-faq-clinic`

```text
Architectural interior photograph of a small contemporary women's health clinic waiting area in Bengaluru, unoccupied. Pale grey-white walls with one muted powder-blue surface, pale natural wood seating with simple upholstery, one sage-green plant, soft indirect daylight from a side window, a quiet uncluttered composition. Editorial interiors photography, believable rather than luxurious, subtle film grain. Cool restrained colour grade. No warm cream or beige walls, no orange or terracotta tones, no people, no signage, no readable text, no logos, no hospital corridor, no clinical equipment, no stock-photo gloss. Landscape 4:3.
```

## After saving: compress

```bash
node -e "const sharp=require('sharp'),fs=require('fs'),p='public/images/prenatal';(async()=>{for(const f of fs.readdirSync(p).filter(f=>f.endsWith('.webp'))){const s=fs.readFileSync(p+'/'+f);if(s.length<250000)continue;const o=await sharp(s).webp({quality:86,effort:6}).toBuffer();fs.writeFileSync(p+'/'+f,o);console.log(f,(s.length/1024|0)+'KB ->',(o.length/1024|0)+'KB');}})()"
```

Read each file into a buffer before writing: on Windows sharp keeps a handle on
a path it opened, and overwriting it in place fails with `UNKNOWN: open`.

## After saving: wire them

In `prenatal-sections.tsx` each placeholder is a `<div>` carrying a comment that
names its slot. Replace the div with `next/image` (`fill`, `sizes`, explicit
`quality`), keeping the surrounding frame — the frame is what reserves the
ratio. The hero takes `priority` and must **not** be lazy-loaded; every other
image takes `loading="lazy"`. Use `<picture>` for the hero's mobile crop, since
`next/image` cannot express a media-switched art-directed source.
