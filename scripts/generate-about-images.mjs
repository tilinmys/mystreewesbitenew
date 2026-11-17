/**
 * Generates the About page's editorial photography.
 *
 * Run locally only:
 *   node scripts/generate-about-images.mjs            # all images
 *   node scripts/generate-about-images.mjs opening    # one by id
 *
 * The API key is read from `.env.txt` / `.env` (or an existing OPENAI_API_KEY in
 * the environment) and is never logged, written into output, or embedded in any
 * client bundle. Those files are gitignored; keep it that way.
 *
 * Scope rule: this script generates illustrative editorial scenes only. It must
 * never be pointed at a real MyStree clinician or used to depict the actual
 * premises — see the image manifest in image-prompts.md for why.
 */

import { writeFile, mkdir } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "public", "images", "about");
const ENDPOINT = "https://api.openai.com/v1/images/generations";
const MODEL = "gpt-image-1";

/** Photographic direction applied to every prompt in this manifest. */
const SHARED_DIRECTION = [
  "Documentary lifestyle photograph, editorial healthcare photography.",
  "Shot on a 35mm lens at a natural working distance, Kodak Portra 400 characteristics,",
  "fine natural film grain, gentle highlight rolloff, realistic dynamic range,",
  "shallow but believable depth of field.",
  "Contemporary Bengaluru setting. Visible natural skin texture, subtle pores,",
  "natural facial micro-creases, realistic under-eye texture, minor natural facial asymmetry,",
  "natural warm Indian skin undertones, unretouched editorial appearance.",
  "Modern ordinary clothing with real fabric behaviour and imperfect folds. Normal, correctly formed hands.",
].join(" ");

const NEGATIVE = [
  "No text, captions, typography, logos, watermarks, signage, readable screens, UI or buttons.",
  "No stock-photo smiles, no subject staring into the camera, no staged handshakes, no clipboards.",
  "No plastic or poreless skin, no glamour retouching, no beauty-advertising poses.",
  "No purple or neon gradients, no glowing blobs, no glass spheres, no 3D render look, no CGI.",
  "No bridal styling, no bindis or jewellery used as cultural shorthand, no palace interiors.",
  "No medical diagrams, no floating anatomy graphics, no pink-everything styling.",
  "No unexplained rim light, no volumetric beams, no multi-coloured studio lighting, no heavy bloom.",
].join(" ");

const MANIFEST = [
  {
    id: "p1-listen",
    file: "mystree-listen-deeply-womens-health-consultation.webp",
    size: "1024x1536",
    section: "03 - philosophy / listen deeply",
    alt: "Clinician listening to a patient during a women's health consultation",
    prompt: `Documentary healthcare photograph inside a contemporary women's health consultation room in Bengaluru. A South Indian female clinician in her late 30s or early 40s sits slightly angled toward an adult South Indian woman patient, genuinely listening while the patient speaks, neither person looking at the camera. A quiet observational moment rather than staged medical advertising. The clinician's hands are relaxed, with no performative clipboard pose. The patient wears ordinary contemporary Bengaluru clothing. Diffused daylight enters from a real side window, gentle natural shadows, warm neutral clinic materials, restrained navy and cream details in the environment. Subjects biased slightly right with quiet negative space. ${SHARED_DIRECTION} ${NEGATIVE} No orange-dominated scene.`,
  },
  {
    id: "p2-explain",
    file: "mystree-explain-clearly-clinical-consultation.webp",
    size: "1024x1536",
    section: "03 - philosophy / explain clearly",
    alt: "Doctor explaining care options during a consultation at a women's health clinic",
    prompt: `Observational editorial photograph of a South Indian female doctor explaining something carefully to an adult woman during a private consultation in a modern Bengaluru clinic. The doctor gestures naturally toward a simple paper diagram lying on the desk while the patient looks toward the explanation, both photographed from an unobtrusive three-quarter angle, neither looking at camera. The moment communicates understanding rather than illness. Soft side-window daylight, cream walls, small restrained navy details, real wood and fabric textures. ${SHARED_DIRECTION} ${NEGATIVE} No glossy hospital advertising, no orange-dominated scene.`,
  },
  {
    id: "p3-treat",
    file: "mystree-thoughtful-womens-health-care.webp",
    size: "1024x1536",
    section: "03 - philosophy / treat thoughtfully",
    alt: "Clinician reviewing health information during a women's care consultation",
    prompt: `Quiet documentary photograph of a female clinician reviewing a woman's health notes beside natural window light in a contemporary Bengaluru consultation room, caught between conversation and decision-making rather than posing. A patient is present softly on the opposite side of the frame but is not used as a prop. The scene communicates careful clinical consideration. A realistic desk, notebook and ordinary clinical environment with no fake medical screens. Deep navy notebook detail, warm ivory walls, natural daylight. ${SHARED_DIRECTION} ${NEGATIVE} No orange-dominated scene.`,
  },
  {
    id: "p4-follow",
    file: "mystree-continuity-of-care-bengaluru.webp",
    size: "1024x1536",
    section: "03 - philosophy / follow through",
    alt: "Patient and clinician speaking after a women's health consultation",
    prompt: `Candid documentary lifestyle photograph of an adult South Indian woman concluding a calm healthcare consultation in Bengaluru, speaking naturally with a female clinician near a softly lit doorway or corridor. Their interaction suggests continuity and reassurance without staged handshakes, hugs or camera-facing smiles. Contemporary ordinary clothing, natural body language, warm daylight, a restrained navy architectural accent, cream and natural wood environment. ${SHARED_DIRECTION} ${NEGATIVE} No orange-dominated scene.`,
  },
  {
    id: "c1-notebook",
    file: "mystree-patient-notebook-consultation.webp",
    size: "1536x1024",
    section: "06 - continuity / you arrive with a question",
    alt: "Patient's notebook before a women's health consultation",
    prompt: `Close observational photograph of a woman's hand placing a small notebook and phone beside a chair before a medical consultation in a contemporary Bengaluru clinic. Realistic hand anatomy, natural window daylight, navy fabric detail, warm wood and cream interior. ${SHARED_DIRECTION} ${NEGATIVE} No staged advertising composition, no orange-dominated scene.`,
  },
  {
    id: "c2-notes",
    file: "mystree-clinician-reviewing-notes.webp",
    size: "1536x1024",
    section: "06 - continuity / the right context is built",
    alt: "Clinician reviewing consultation notes",
    prompt: `Documentary close-up of a clinician's hands reviewing handwritten health notes beside a tablet on a simple consultation desk. No identifiable patient data and no readable writing anywhere in frame. Natural daylight, realistic hands, cream paper, restrained navy details. ${SHARED_DIRECTION} ${NEGATIVE} No fake interface, no orange-dominated scene.`,
  },
  {
    id: "c3-chairs",
    file: "mystree-consultation-space-indiranagar.webp",
    size: "1536x1024",
    section: "06 - continuity / the next step is clear",
    alt: "Private consultation space for women's healthcare",
    prompt: `Quiet environmental photograph of two empty consultation chairs positioned naturally toward one another beside soft window daylight in a contemporary women's clinic. Restrained navy upholstery, warm ivory walls, real material texture, a lived-in but clean environment. Editorial architecture photography, no people in frame. ${SHARED_DIRECTION} ${NEGATIVE} No fake hospital equipment, no orange-dominated scene.`,
  },
  {
    id: "final-desktop",
    file: "mystree-womens-health-indiranagar-bengaluru.webp",
    size: "1536x1024",
    section: "final - care, closer to home (desktop)",
    alt: "Woman walking through a leafy street in Indiranagar, Bengaluru",
    prompt: `Observational documentary lifestyle photograph on a quiet leafy residential street in Indiranagar, Bengaluru during soft late-morning daylight. An adult South Indian woman in contemporary everyday clothing walks naturally along the pavement, photographed from a loose side and three-quarter REAR angle rather than facing the camera. She is simply moving through her neighbourhood, not posing. Mature rain trees and ordinary Bengaluru architecture give local character without recognisable private property or any signage. Restrained colours with a subtle navy clothing detail. Significant clean negative space on the LEFT of the frame for website typography. ${SHARED_DIRECTION} ${NEGATIVE} No luxury-fashion aesthetic, no orange-dominated palette.`,
  },
  {
    id: "final-mobile",
    file: "mystree-womens-health-indiranagar-bengaluru-portrait.webp",
    size: "1024x1536",
    section: "final - care, closer to home (mobile)",
    alt: "Woman walking through a leafy street in Indiranagar, Bengaluru",
    prompt: `A vertical observational documentary photograph on a quiet leafy street in Indiranagar, Bengaluru in soft late-morning daylight. An adult South Indian woman in contemporary everyday clothing walks away along the pavement, seen from a three-quarter rear angle, framed full-length within a tall portrait composition with the canopy of rain trees filling the upper third. Ordinary Bengaluru architecture, no signage, no recognisable property. Clean quiet space in the LOWER third of the frame for website typography. Restrained colours with a subtle navy clothing detail. ${SHARED_DIRECTION} ${NEGATIVE} No luxury-fashion aesthetic, no orange-dominated palette.`,
  },
  {
    id: "opening",
    file: "mystree-woman-balcony-indiranagar.webp",
    size: "1024x1536",
    section: "01 — the human opening",
    alt: "A woman in her thirties mid-conversation beside a sunlit balcony door in Bengaluru",
    prompt: `A candid environmental portrait of a South Indian woman in her early thirties standing beside an open balcony door in a contemporary Bengaluru apartment. She is mid-conversation with someone just outside the frame, looking slightly away from the camera, one hand relaxed at her side. Natural Bengaluru morning daylight is the only light source, entering from the balcony at her side. She wears a plain everyday cotton kurta in a muted neutral tone; a few strands of hair have come loose. Quiet domestic background with soft focus: a plant, a plain wall, a glimpse of the street below. Vertical composition with the subject in the lower two thirds and quiet space above. ${SHARED_DIRECTION} ${NEGATIVE}`,
  },
  {
    id: "listening",
    file: "mystree-clinical-consultation-bengaluru.webp",
    size: "1536x1024",
    section: "02 — why MyStree exists",
    alt: "A clinician listening as a patient describes her symptoms during a consultation",
    prompt: `An observational documentary photograph inside a calm, plainly furnished consultation room. A female clinician in her forties, wearing a simple white coat with no badges, is listening — genuinely listening, leaning slightly in, not speaking — to a woman in her thirties who is mid-sentence and gesturing slightly as she describes something. Both are seated at the same eye level, angled towards each other, neither looking at the camera. Diffused daylight from a window out of frame on the left. Plain walls, a small wooden table, one ordinary chair. The moment is unremarkable and real, caught between beats of a conversation. Wide horizontal composition with quiet negative space on the right. ${SHARED_DIRECTION} ${NEGATIVE}`,
  },
  {
    id: "closing",
    file: "mystree-woman-morning-bengaluru.webp",
    size: "1536x1024",
    section: "08 — closing human moment",
    alt: "A woman walking through warm morning light on a tree-lined Bengaluru street",
    prompt: `A candid documentary photograph of a woman in her thirties walking along a tree-lined residential street in Bengaluru in warm late-morning light, dappled shade falling across her. She is looking ahead and slightly away, mid-stride, carrying a cloth bag, apparently thinking about something. Ordinary contemporary clothing. Behind her the street is softly out of focus: compound walls, a parked scooter, a gulmohar tree. The frame is composed with the subject on the right third and generous quiet space on the left for typography. Unposed, observed rather than directed. ${SHARED_DIRECTION} ${NEGATIVE}`,
  },
];

function loadApiKey() {
  if (process.env.OPENAI_API_KEY) return process.env.OPENAI_API_KEY.trim();

  for (const name of [".env.txt", ".env", ".env.local"]) {
    const file = path.join(ROOT, name);
    if (!existsSync(file)) continue;
    const text = readFileSync(file, "utf8");
    for (const line of text.split(/\r?\n/)) {
      const match = line.match(/^\s*(?:open_?ai_?api_?key|OPENAI_API_KEY)\s*=\s*(.+?)\s*$/i);
      if (match) return match[1].replace(/^["']|["']$/g, "");
    }
  }
  throw new Error(
    "No OpenAI key found. Set OPENAI_API_KEY, or put open_ai_api_key=... in .env.txt (gitignored).",
  );
}

async function generate(entry, apiKey) {
  process.stdout.write(`  ${entry.id} (${entry.size}) … `);

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      prompt: entry.prompt,
      size: entry.size,
      quality: "high",
      output_format: "webp",
      n: 1,
    }),
  });

  if (!response.ok) {
    // Surface status and message only — never echo the request headers.
    const detail = await response.text();
    throw new Error(`${response.status} ${response.statusText} — ${detail.slice(0, 400)}`);
  }

  const payload = await response.json();
  const b64 = payload?.data?.[0]?.b64_json;
  if (!b64) throw new Error("Response contained no image data.");

  const target = path.join(OUT_DIR, entry.file);
  await writeFile(target, Buffer.from(b64, "base64"));
  const kb = Math.round(Buffer.from(b64, "base64").length / 1024);
  console.log(`saved public/images/about/${entry.file} (${kb} KB)`);
}

async function main() {
  const apiKey = loadApiKey();
  const only = process.argv.slice(2);
  const queue = only.length
    ? MANIFEST.filter((entry) => only.includes(entry.id))
    : MANIFEST;

  if (!queue.length) {
    console.error(`No manifest entries matched: ${only.join(", ")}`);
    process.exitCode = 1;
    return;
  }

  await mkdir(OUT_DIR, { recursive: true });
  console.log(`Generating ${queue.length} image(s) with ${MODEL}:`);

  let failed = 0;
  for (const entry of queue) {
    try {
      await generate(entry, apiKey);
    } catch (error) {
      failed += 1;
      console.error(`\n  ! ${entry.id} failed: ${error.message}`);
    }
  }

  if (failed) process.exitCode = 1;
}

await main();

export { MANIFEST };
