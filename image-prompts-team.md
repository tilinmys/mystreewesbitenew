# MyStree — Our Team page image manifest

Three photographs are still required for the three-chapter scroll story on
`/doctors`. They are **not generated**: each depicts clinicians, and the project
rule is that no generated likeness may stand in for a real MyStree doctor. Until
they exist the page renders labelled placeholders at the correct ratio, so
dropping the files in causes no layout shift.

> **Environment updated for the cool palette.** These prompts previously
> specified "warm ivory plaster walls". The site now forbids orange-family
> colour as a background, and every surface is mixed from the cool corporate
> swatches (Cadet Gray, Uranian Blue). The prompts below describe a **cool**
> interior instead — which also matches the powder-blue wall already visible in
> the supplied Dr. Smitha hero photograph, so the whole set reads as one clinic.

## Already supplied

| Slot | File | Notes |
| --- | --- | --- |
| Hero | `public/images/team/mystree-dr-smitha-consultation-room.webp` | Authentic photograph of Dr. Smitha A.P, converted from your `doctorimage.png` (1916×821, 1.67MB PNG → 97KB WebP). Real portrait — never replace with a generated one. |
| Story 01 | `public/images/team/mystree-consultation-time.webp` | Generated, cropped 4:5 (1024×1280), WebP sRGB (~108KB), wired into `TeamStory`. |
| Story 02 | `public/images/team/mystree-clinical-collaboration.webp` | Generated, cropped 4:5 (1024×1280), WebP sRGB (~107KB), wired into `TeamStory`. |
| Story 03 | `public/images/team/mystree-shared-decision.webp` | Generated, cropped 4:5 (1024×1280), WebP sRGB (~111KB), wired into `TeamStory`. |

Clinician portraits in the directory are the existing real photographs in
`public/public/`. Nothing there needs generating.

## Status: All assets generated & wired

---

### 01 — `mystree-consultation-time.webp`

Chapter: *"Time changes the conversation."*

**Alt draft:** "A MyStree clinician speaking with a patient during a women's health consultation in Bengaluru"

```text
Authentic editorial healthcare photograph inside a boutique women's health clinic in Bengaluru, India. A female Indian doctor in her late 30s to early 50s sits across from an Indian woman patient during an unhurried consultation. Both women are seated at equal eye level, the doctor listening rather than typing, natural hand gestures, genuine attentive expressions. A quiet observational moment rather than staged medical advertising. Cool off-white and pale grey-blue walls, one muted powder-blue painted surface, pale natural wood furniture, a single restrained sage-green plant, soft Bengaluru morning daylight through a side window. Realistic brown skin texture, visible natural pores and fine lines, documentary photography, candid rather than posed, sophisticated Indian clinical environment, quiet human intimacy, 50mm photographic perspective, subtle film grain, editorial magazine realism. Cool restrained colour grade. No warm cream or beige walls, no orange or terracotta tones anywhere in the scene, no text, no logo, no watermark, no stethoscope cliché, no crossed arms, no hospital corridor, no glowing technology, no fake medical graphics, no pink healthcare aesthetic, no plastic AI skin, no exaggerated smiles, no American hospital appearance. Portrait 4:5.
```

---

### 02 — `mystree-clinical-collaboration.webp`

Chapter: *"One concern rarely exists in isolation."*

**Alt draft:** "Two MyStree clinicians reviewing care information together at the Indiranagar clinic"

```text
Documentary editorial photograph of two experienced Indian women clinicians collaborating inside a contemporary women's health clinic in Bengaluru, reviewing a patient's clinical notes together at a simple pale wooden consultation desk. Natural serious-but-warm expressions, one clinician pointing to information on a paper report while the other listens. No patient-identifying information visible and no readable writing anywhere in frame. Cool off-white clinic interior with muted powder-blue and dusty slate-blue accents and pale natural wood, soft window daylight, realistic Indian skin tones and natural imperfections, modern but believable clinic, quiet multidisciplinary teamwork, photographed like an independent healthcare editorial feature, subtle grain. Cool restrained colour grade. No warm cream or beige interior, no orange or terracotta tones anywhere in the scene, no posed corporate handshake, no fake holograms, no glowing screens, no medical stock-photo clichés, no text, no logos, no plastic skin. Portrait 4:5.
```

---

### 03 — `mystree-shared-decision.webp`

Chapter: *"Clarity before complexity."*

**Alt draft:** "A MyStree doctor explaining care options with a patient in Bengaluru"

```text
Authentic Indian women's healthcare editorial photograph in a private Bengaluru consultation room. An Indian female doctor and an adult Indian woman patient sit side by side at an angle, calmly reviewing a simple medical report or tablet together. The doctor is explaining something while the patient participates actively rather than passively receiving information. Cool pale grey-white walls with one muted powder-blue surface, pale natural wood table, soft daylight, understated contemporary clinic design, realistic skin and hair texture, human documentary photography, sophisticated but not luxurious, genuine clinical conversation, natural expressions. Cool restrained colour grade. No warm cream or beige walls, no orange or terracotta tones anywhere in the scene, no dramatic posing, no fake charts floating in air, no neon, no stock-photo stethoscope, no pink feminine clichés, no text, no watermark. Portrait 4:5.
```

---

## Constraints that apply to all three

These images show clinicians in a MyStree-like room. They are **illustrative** —
they depict no identified MyStree clinician and no MyStree room, their alt text
must describe only what is in the frame, they must never be captioned as named
staff, and they are deliberately excluded from the page's structured data.

Reject and regenerate on: plastic or poreless skin, malformed hands, warm cream
or orange-tinted interiors, camera-facing stock smiles, fake readable text on
reports or screens, or anything that reads as CGI rather than photography.

## After saving: wire them in

In `src/components/team/team-sections.tsx` the `chapters` array carries a
`placeholder` string per chapter. Replace each with an `image` + `alt` pair and
render it in the `storyStage` panel in place of `storyPlaceholder`. The frame
already reserves its 4:5 box, so there is no layout shift.

## After saving: compress

```bash
node -e "const sharp=require('sharp'),fs=require('fs'),p='public/images/team';(async()=>{for(const f of fs.readdirSync(p).filter(f=>f.endsWith('.webp'))){const s=fs.readFileSync(p+'/'+f);if(s.length<250000)continue;const o=await sharp(s).webp({quality:86,effort:6}).toBuffer();fs.writeFileSync(p+'/'+f,o);console.log(f,(s.length/1024|0)+'KB ->',(o.length/1024|0)+'KB');}})()"
```

Read each file into a buffer before writing: on Windows sharp keeps a handle on
a path it opened, and overwriting it in place fails with `UNKNOWN: open`.
