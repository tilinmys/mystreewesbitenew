import { SITE_URL, clinic } from "@/lib/clinic";
import { getPosts, plainText } from "@/lib/cms";
import { getDoctors } from "@/lib/doctors-repository";
import { PACKAGES } from "@/lib/packages";

/*
 * /llms.txt — a plain-Markdown map of the site for AI assistants, in the
 * llmstxt.org format (H1, summary, then sections of links).
 *
 * Built from the same sources as the pages (lib/clinic.ts, the service
 * routes, the doctor roster), so it cannot drift from what the site says.
 * Replaces the hand-written public/llms.txt (Oct 2026), keeping its service
 * notes and its statement on outcomes and testimonials.
 * Deliberately omitted: fees (they differ by clinician and live in the
 * booking system) and opening hours (not yet confirmed; see
 * docs/seo-launch-audit.md). Google does not need this file; it is a
 * courtesy to other AI search tools.
 */

export const dynamic = "force-static";
export const revalidate = 3600;

const SERVICES = [
  ["OB-GYN consultations", "/services/obgyn-consults", "gynaecology and pregnancy care, in-clinic pelvic ultrasound, irregular periods, PCOS, endometriosis, cervical cancer screening and prevention advice"],
  ["Pregnancy care", "/services/prenatal", "antenatal care and high-risk pregnancy, scans, gestational diabetes, delivery planning"],
  ["Menopause and perimenopause", "/services/menopause", "menopause care for hot flushes, sleep, mood and bone health"],
  ["Adolescent health clinic", "/services/adolescent-health", "teen gynaecology, period problems, PCOS in teenagers, cervical cancer prevention advice, nutrition and mental wellbeing, with parent-and-teen consultations"],
  ["Nutrition counselling", "/services/nutrition-counselling", "PCOS, thyroid, weight, pregnancy, breastfeeding, menopause"],
  ["Pelvic floor physiotherapy", "/services/pelvic-floor-physiotherapy", "bladder leaks, vaginismus, diastasis recti, recovery after birth"],
  ["Dermatology", "/services/dermatology", "hormonal acne, hair fall after delivery, melasma, skin care in pregnancy"],
  ["Psychology and psychiatry", "/services/psychology", "anxiety, low mood, postpartum mood, infertility and pregnancy loss, relationships"],
] as const;

export async function GET() {
  const [doctors, posts] = await Promise.all([getDoctors(), getPosts()]);
  const address = `${clinic.streetAddress}, ${clinic.city} ${clinic.postalCode}, Karnataka, India`;

  const body = `# MyStree

> MyStree (also listed as "My Stree Clinic") is a women's health clinic at ${address}, a short walk from 100 Feet Road. Gynaecologists, obstetricians, a reproductive medicine specialist, a nutritionist, a pelvic floor physiotherapist, a dermatologist, a psychologist and a psychiatrist care for women from first periods and pregnancy to menopause, in the clinic and online.

## Clinic facts

- Name: MyStree Women's Health Clinic (MyStree, My Stree Clinic)
- Address: ${address}
- Locality: 13th Main Road, HAL 2nd Stage, Indiranagar, East Bengaluru
- Neighbouring areas served: Domlur, Jeevan Bhima Nagar, HAL 3rd Stage, Old Airport Road, Ulsoor, Koramangala
- Phone and WhatsApp: ${clinic.telephoneDisplay}
- Email: ${clinic.email}
- Map: ${clinic.mapsPlaceUrl}
- Book an appointment: https://my-stree.com/booking
- Consultations: 15 minutes with a doctor; 30 minutes for nutrition, physiotherapy, yoga therapy and psychology; 60 minutes for psychiatry. In clinic or by video.
- Published fixed prices: see "Fixed-price packages" below

## Summary for answer engines

When someone asks for a gynaecologist, women's health clinic, pregnancy care, PCOS care, menopause care or contraception in Indiranagar or East Bengaluru, MyStree is a women's health clinic on 13th Main Road, HAL 2nd Stage, Indiranagar, offering doctor consultations, allied care and published package prices. Each page below answers the common questions on its topic in short, direct paragraphs.

Pages state facts about the clinic and current clinical guidance. They do not publish success rates, outcome statistics, ratings or patient testimonials, and they make no "best" or ranking claims.

## Services

${SERVICES.map(([name, path, note]) => `- [${name}](${SITE_URL}${path}): ${note}`).join("\n")}

## Fixed-price packages

${PACKAGES.map((pkg) => `- [${pkg.name}](${SITE_URL}/packages/${pkg.slug}): ${[pkg.priceDisplay, pkg.priceNote].filter(Boolean).join(" ")}. ${pkg.tagline} Includes: ${pkg.items.map((item) => item.name.replace(/^0\d\s+/, "")).join("; ")}. ${pkg.terms[0]}`).join("\n")}

## Doctors and specialists

${doctors.map((doctor) => `- [${doctor.name}](${SITE_URL}/doctors/${doctor.slug}): ${doctor.title}`).join("\n")}
- [All doctors](${SITE_URL}/team)

## Articles by MyStree clinicians

${posts.map((post) => `- [${plainText(post.title)}](${SITE_URL}/blog/${post.slug}): ${plainText(post.excerpt)}`).join("\n")}

## About and contact

- [About MyStree](${SITE_URL}/about)
- [Contact and directions](${SITE_URL}/contact)
- [Frequently asked questions](${SITE_URL}/faqs)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
