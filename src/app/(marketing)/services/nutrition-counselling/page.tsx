import type { Metadata } from "next";

import { ServiceAsk } from "@/components/services/service-ask";
import { ServiceBand } from "@/components/services/service-band";
import { ServiceClosing } from "@/components/services/service-closing";
import { ServiceConditions } from "@/components/services/service-conditions";
import { ServiceFacts } from "@/components/services/service-facts";
import { ServiceFaq } from "@/components/services/service-faq";
import { ServiceFit } from "@/components/services/service-fit";
import { ServiceHero } from "@/components/services/service-hero";
import { ServiceInsight } from "@/components/services/service-insight";
import { ServiceModel } from "@/components/services/service-model";
import { ServiceQuestions } from "@/components/services/service-questions";
import { ServiceQuote } from "@/components/services/service-quote";
import { ServiceReading } from "@/components/services/service-reading";
import { ServiceSpecialists } from "@/components/services/service-specialists";
import { ServiceStat } from "@/components/services/service-stat";
import { ServiceSteps } from "@/components/services/service-steps";
import styles from "@/components/services/service-page.module.css";
import { getArticles } from "@/lib/cms";
import { SITE_URL, clinic } from "@/lib/clinic";
import { getDoctors } from "@/lib/doctors-repository";
import { CLINIC_ID, breadcrumbNode, clinicNode, clinicianRef, faqNode } from "@/lib/service-schema";

/*
 * Nutrition Counselling â€” /services/nutrition-counselling.
 *
 * The locked service-page template (color.md) with nutrition content.
 *
 * SEO / AEO / GEO (review of 12 Oct 2026):
 *   - What ranks for "dietitian Indiranagar" / "nutritionist Bangalore" is
 *     mostly directories (DocGenie, Apollo 24|7, MediBuddy, Practo) and
 *     hospital doctor profiles (Manipal Clinic Indiranagar). They list
 *     generic conditions; none is written for women's life stages, none
 *     ties diet to a gynaecologist's care, and none answers food questions
 *     in Indian terms (rice, roti, millets, dal, curd).
 *   - Google Search Central: helpful, people-first content; visible
 *     credentials and a named author (Who / How / Why); a higher accuracy
 *     bar for health (YMYL); no preferred word count. AI Overviews and AI
 *     Mode need no special markup, only indexable text that structured
 *     data matches. FAQ rich results were retired on 7 May 2026, so the
 *     FAQPage node stays only as a faithful mirror of the visible answers.
 *   - So: short, answer-first paragraphs in plain words, real numbers with
 *     their source (ICMR-NIN 2020, the 2023 International PCOS Guideline),
 *     the nutritionist named with her credentials, and Indiranagar and its
 *     neighbouring localities stated once, naturally.
 *
 * Content rules applied to the supplied brief:
 *   - no patient testimonials, "+500 happy clients", "2000+ families" or
 *     client photos (NMC notice, 06.10.2026; the counts are not recorded)
 *   - the brief's â‚¹600 fee is not stated: fees come from the booking
 *     system via the specialist card (directory listings show other fees)
 *   - Priyanka Savina's credentials and quote come from lib/doctors.ts;
 *     "Dr." is not used for her, as she is not a medical doctor
 *   - "biological precision mapping" and "metabolic harmony" are replaced
 *     with plain descriptions of what happens in the room
 *   - body composition analysis is the brief's own method; confirm the
 *     clinic's analyser before launch
 */

const PAGE_PATH = "/services/nutrition-counselling";

export const revalidate = 300;

export const metadata: Metadata = {
  // The root layout appends "| MyStree".
  title: "Women's Nutritionist & Dietitian, Indiranagar",
  description:
    "Nutrition counselling for women in Indiranagar, Bengaluru: PCOS, thyroid, weight, pregnancy and menopause diet plans built around Indian home food.",
  alternates: { canonical: `${SITE_URL}${PAGE_PATH}` },
  openGraph: {
    title: "Women's Nutritionist & Dietitian in Indiranagar, Bengaluru | MyStree",
    description:
      "No crash diets, no starving. Nutrition plans for PCOS, pregnancy, thyroid, weight and menopause, built around the food you already cook.",
    url: `${SITE_URL}${PAGE_PATH}`,
    type: "website",
    siteName: "MyStree Women's Health Clinic",
  },
};

/*
 * Local questions: what women ask before booking a nutritionist in
 * Indiranagar. Repository facts only.
 */
const LOCAL_QUESTIONS = [
  {
    question: "What happens at my first nutrition consultation?",
    answer:
      "Priyanka asks about your health, your periods, your sleep, your work hours and what you actually eat on a normal day, including the snacks and the late dinners. She looks at your reports, checks your body composition, and talks through what you want to change. You leave with a first plan made from foods you already like, and a date to come back.",
  },
  {
    question: "What should I bring to my appointment?",
    answer:
      "Bring any recent blood reports, such as sugar, HbA1c, thyroid, haemoglobin, vitamin D, B12 and cholesterol, a list of your medicines and supplements, and if you can, a note of everything you ate for two or three days. Nothing needs to be perfect; an honest picture helps more.",
  },
  {
    question: "Do I need a doctor's referral to see the nutritionist?",
    answer:
      "No, you can book directly. If you are also seeing one of our gynaecologists, for example for PCOS, pregnancy or menopause, your nutrition plan is shared with them so the advice you get from both fits together.",
  },
  {
    question: "Where is MyStree in Indiranagar?",
    answer:
      "MyStree is at No. 3366, 13th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru 560008, a short distance from 100 Feet Road and easy to reach from Domlur, Jeevan Bhima Nagar, HAL, Koramangala and Old Airport Road. Book online or message the care team on WhatsApp at +91 63665 73772.",
  },
] as const;

/*
 * FAQ: nutrition questions women search, answered to current guidance
 * (ICMR-NIN Nutrient Requirements for Indians, 2020; International
 * Evidence-based Guideline for PCOS, 2023; thyroid medicine labelling).
 */
const NUTRITION_FAQS = [
  {
    question: "What is the best diet for PCOS?",
    answer:
      "There is no single best diet for PCOS. What helps most is steady blood sugar: whole grains and millets instead of refined flour, protein at every meal, plenty of vegetables and dal, and fewer sweet drinks and packaged snacks, along with regular movement. If you carry extra weight, losing even 5 to 10 percent of it often makes periods more regular and improves ovulation.",
  },
  {
    question: "Do I have to give up rice and roti to lose weight?",
    answer:
      "No. Most women lose weight well on their usual food once portions, timing and pairings change: a smaller mound of rice with more dal, sabzi and curd, or rotis made with mixed or millet flour. Plans that ban everyday foods rarely last, so we work with what is already on your plate.",
  },
  {
    question: "How much weight can I safely lose in a week?",
    answer:
      "About half a kilo to one kilo a week is a safe, realistic pace for most adults. Faster loss usually means losing water and muscle, which makes the weight easier to regain. Body composition analysis shows whether you are losing fat while keeping muscle.",
  },
  {
    question: "How much more should I eat during pregnancy?",
    answer:
      "Less than most people think. India's ICMR-NIN guidelines suggest about 350 extra calories a day in the second and third trimesters, roughly one extra small meal such as a bowl of dal and a roti, with more protein, iron, calcium and folate. While exclusively breastfeeding in the first six months, the extra need rises to about 600 calories a day.",
  },
  {
    question: "Can food help with hypothyroidism?",
    answer:
      "Food supports thyroid treatment but does not replace it. Take your thyroid tablet on an empty stomach, 30 to 60 minutes before breakfast or tea, and keep calcium and iron supplements at least four hours away from it. Use iodised salt, and cooked cabbage, cauliflower and broccoli are fine in normal amounts.",
  },
  {
    question: "What should I eat after menopause to protect my bones?",
    answer:
      "Aim for about 1,200 mg of calcium a day after menopause, from foods such as curd, milk, paneer, ragi, sesame seeds and green leafy vegetables, with enough protein and vitamin D. Weight-bearing exercise matters as much as food. Your doctor can tell you whether you also need a supplement.",
  },
  {
    question: "What is body composition analysis and why does it matter?",
    answer:
      "Body composition analysis estimates how much of your weight is fat, muscle and water. Two women with the same weight can have very different health, and the scale alone can hide muscle loss during dieting. Tracking composition shows whether your plan is building strength, not just lowering a number.",
  },
  {
    question: "Is a dietitian different from a nutritionist?",
    answer:
      "A clinical dietitian is trained to plan diets for medical conditions such as diabetes, PCOS, thyroid disease or pregnancy, while nutritionist is a broader term. Whatever the title, ask about qualifications: a postgraduate degree in nutrition and dietetics and clinical experience are good signs.",
  },
] as const;

const NUTRITION_READING_SLUGS = ["pregnancy-after-35-prepare-dont-panic", "perimenopause-symptoms-age-40"] as const;

function generateStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      clinicNode(),
      {
        "@type": "MedicalWebPage",
        "@id": `${SITE_URL}${PAGE_PATH}#page`,
        url: `${SITE_URL}${PAGE_PATH}`,
        name: "Women's Nutritionist & Dietitian in Indiranagar, Bengaluru | MyStree",
        description: metadata.description,
        inLanguage: "en-IN",
        isPartOf: { "@id": CLINIC_ID },
        about: { "@id": `${SITE_URL}${PAGE_PATH}#service` },
        reviewedBy: clinicianRef("priyanka-savina", "Priyanka Savina"),
        breadcrumb: { "@id": `${SITE_URL}${PAGE_PATH}#breadcrumb` },
      },
      {
        "@type": "MedicalService",
        "@id": `${SITE_URL}${PAGE_PATH}#service`,
        name: "Nutrition Counselling for Women",
        serviceType: [
          "Nutrition counselling",
          "PCOS diet and insulin resistance",
          "Weight management",
          "Pregnancy nutrition",
          "Gestational diabetes diet",
          "Breastfeeding and postpartum nutrition",
          "Thyroid nutrition",
          "Menopause nutrition and bone health",
          "Body composition analysis",
          "Emotional eating counselling",
        ],
        provider: { "@id": CLINIC_ID },
        employee: [
          clinicianRef("priyanka-savina", "Priyanka Savina"),
          clinicianRef("dr-surbhi-sinha", "Dr. Surbhi Sinha"),
          clinicianRef("dr-smitha-ap", "Dr. Smitha A.P"),
        ],
        areaServed: {
          "@type": "City",
          name: clinic.city,
          containsPlace: { "@type": "Place", name: clinic.locality },
        },
      },
      faqNode(PAGE_PATH, [...NUTRITION_FAQS, ...LOCAL_QUESTIONS]),
      breadcrumbNode(PAGE_PATH, "Nutrition Counselling"),
    ],
  };
}

export default async function NutritionCounsellingPage() {
  const reading = await getArticles(NUTRITION_READING_SLUGS);
  const jsonLd = generateStructuredData();
  // Bylines link to each author's profile.
  const authorProfiles = Object.fromEntries(
    (await getDoctors()).map((doctor) => [doctor.name, `/doctors/${doctor.slug}`]),
  );

  return (
    <main className={styles.pageRoot}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <ServiceBand>
        <ServiceHero
          image={{ src: "/images/services/pages/nutritionist-consultation-indiranagar-bengaluru.webp", alt: "A nutritionist and a client go over a handwritten meal plan and her lunch box" }}
          headingId="nutrition-hero-heading"
          title="Nutrition counselling for women in Indiranagar"
          lead="Food plans for PCOS, thyroid, weight, pregnancy, breastfeeding and menopause, built around the food you already cook. No crash diets and no starving, with a nutritionist who works alongside your gynaecologist."
          primaryCta={{ label: "Book a nutrition consultation", href: "/book" }}
          secondaryCta={{ label: "Call the clinic", href: "tel:+916366573772" }}
        />
      </ServiceBand>

      <ServiceSpecialists
        headingId="nutrition-specialists-heading"
        heading="Book with our nutritionist"
        lead="Times shown are live from the MyStree booking system. Choose the doctor and time that suit you."
        consultationLabel="Clinic consultation"
        specialists={[
          {
            bookingId: 3,
            tag: "Nutrition",
            focus: ["PCOS and weight", "Pregnancy and after birth"],
            profileHref: "/doctors/priyanka-savina",
          },
        ]}
      />

      <ServiceConditions
        headingId="nutrition-conditions-heading"
        heading="What our nutritionist helps with"
        conditions={[
          "Anaemia and low iron",
          "Bloating and acidity",
          "Breastfeeding and postpartum recovery",
          "Diabetes and prediabetes",
          "Emotional and stress eating",
          "Gestational diabetes",
          "High cholesterol",
          "Menopause and bone health",
          "PCOS and insulin resistance",
          "Pregnancy nutrition",
          "Thyroid conditions",
          "Weight loss and weight gain",
        ]}
        cta={{ label: "Book a nutrition consultation", href: "/book" }}
      />

      <ServiceSteps
        image={{ src: "/images/services/pages/office-lunch-from-steel-tiffin.webp", alt: "A woman eats lunch from a steel tiffin at her office desk" }}
        headingId="nutrition-steps-heading"
        heading="How nutrition counselling works"
        steps={[
          {
            title: "Understand",
            text: "Your health, reports, routine and a body composition check, not just your weight.",
          },
          {
            title: "Plan",
            text: "Meals made from the food you already cook, sized for your goals and your day.",
          },
          {
            title: "Unpack",
            text: "The why behind cravings and habits, so change doesn't rely on willpower.",
          },
          {
            title: "Review",
            text: "Regular check-ins to track progress, adjust the plan and keep it realistic.",
          },
        ]}
        cta={{ label: "Book a nutrition consultation", href: "/book" }}
      />

      <ServiceQuote
        quote="Whether a woman has gestational diabetes in pregnancy or is recovering after birth, the meal plan is built around her own foods and everyday life."
        name="Priyanka Savina"
      />

      <ServiceFit
        headingId="nutrition-fit-heading"
        heading="Nutrition counselling is right for you if you"
        items={[
          { icon: "ovary", label: "Have PCOS, a thyroid condition or rising blood sugar and want food to help" },
          { icon: "pregnancy", label: "Are planning a pregnancy, pregnant or breastfeeding" },
          { icon: "mind", label: "Struggle with cravings, stress eating or diets that never last" },
          { icon: "seedling", label: "Want steady, lasting change rather than a quick fix" },
        ]}
      />

      <ServiceInsight
        image={{ src: "/images/services/pages/home-cooking-dal-ragi-and-vegetables.webp", alt: "Hands chopping vegetables beside dal and ragi flour in a home kitchen" }}
        headingId="nutrition-insight-heading"
        heading="Why most diets don't last"
        body="A printed diet chart rarely survives a busy week, a family dinner or a bad night's sleep. Lasting change comes from a plan that fits the life you actually have."
        points={[
          "Generic plans ignore your home food, your culture, your working hours and your budget",
          "The scale can't tell fat from muscle or water, so progress is easy to miss or misread",
          "Cravings and stress eating have reasons, and willpower alone doesn't fix them",
        ]}
      />

      <ServiceModel
        headingId="nutrition-model-heading"
        heading="Nutrition that works with your medical care"
        body="Nutrition counselling at MyStree is led by Priyanka Savina, who holds a Diploma in Nutrition and Health Education and an M.Sc in Counselling Psychology. Because she works in the same clinic as our gynaecologists, your food plan, your medicines and your test results are looked at together, whether you are managing PCOS, pregnant, breastfeeding or going through menopause."
        link={{ label: "Meet our team", href: "/doctors" }}
      />

      <ServiceStat
        headingId="nutrition-stat-heading"
        heading="Eat better without giving up the food you love."
        figure="10 years"
        caption="of nutrition and counselling experience behind Priyanka Savina's care."
      />

      <ServiceFacts
        headingId="nutrition-facts-heading"
        eyebrow="At a glance"
        heading="What nutrition care at MyStree is built on"
        facts={[
          { figure: "10 years", label: "of nutrition and counselling experience" },
          { figure: "M.Sc", label: "in Counselling Psychology, with a Diploma in Nutrition and Health Education" },
          { figure: "Monâ€“Sat", label: "9 am to 8 pm at the Indiranagar clinic" },
        ]}
      />

      <ServiceQuestions
        image={{ src: "/images/services/pages/buying-fresh-greens-vegetable-cart-bengaluru.webp", alt: "A woman choosing fresh greens at a vegetable cart" }}
        headingId="nutrition-questions-heading"
        heading="Nutrition counselling in Indiranagar"
        questions={LOCAL_QUESTIONS}
      />

      <ServiceFaq
        headingId="nutrition-faq-heading"
        heading="Frequently asked questions"
        items={NUTRITION_FAQS}
        allLink={{ label: "See all FAQs", href: "/faqs" }}
      />

      <ServiceAsk
        headingId="nutrition-ask-heading"
        heading="Still have questions?"
        note="Message our care team on WhatsApp, or read answers to common questions."
        whatsapp={{
          label: "Chat on WhatsApp",
          href: "https://wa.me/916366573772?text=Hi%20MyStree%2C%20I%20have%20a%20question%20about%20nutrition%20counselling.",
        }}
        faqs={{ label: "Read the FAQs", href: "/faqs" }}
      />

      <ServiceReading
        headingId="nutrition-reading-heading"
        heading="Reading from our doctors"
        articles={reading}
        allLink={{ label: "All articles", href: "/blog" }}
        authorProfiles={authorProfiles}
      />

      <ServiceClosing
        headingId="nutrition-closing-heading"
        heading="Food that fits your life, and a plan that lasts."
        primary={{ label: "Book a nutrition consultation", href: "/book" }}
        secondary={{ label: "Meet our team", href: "/doctors" }}
      />
    </main>
  );
}
