/*
 * Homepage SEO / AEO / GEO FAQ dataset.
 *
 * Authored using direct-answer-first structure (concise factual answer in
 * sentence 1, clinical/local Indiranagar Bengaluru detail in sentence 2) so
 * Google Featured Snippets, Google AI Overviews, ChatGPT, and Perplexity can
 * quote MyStree accurately. Kept in strict sync with the FAQPage JSON-LD node
 * emitted in src/app/(marketing)/page.tsx.
 */

export type HomeFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const HOME_FAQ_ITEMS: readonly HomeFaqItem[] = [
  {
    id: "difference",
    question: "What makes MyStree different from a regular gynaecology clinic in Bengaluru?",
    answer:
      "MyStree brings women's health specialists together under one roof in Indiranagar so your care is coordinated rather than fragmented across separate clinics. Our gynaecologists, high-risk obstetricians, clinical nutritionist, pelvic floor physiotherapist, dermatologist, psychologist, and psychiatrist share one clinical plan with unhurried consultations and in-clinic ultrasound scans.",
  },
  {
    id: "location-hours",
    question: "Where is MyStree located in Indiranagar and what are the clinic timings?",
    answer:
      "MyStree is located at No. 3366, 13th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru 560008, just off 100 Feet Road and easily accessible from Domlur, Jeevan Bhima Nagar, HAL, and Old Airport Road. The clinic is open Monday to Saturday from 9:00 am to 8:00 pm, and our care team can be reached by call or WhatsApp on +91 63665 73772.",
  },
  {
    id: "who-is-it-for",
    question: "Who is MyStree for, and can unmarried women visit confidentially?",
    answer:
      "MyStree cares for women across every life stage — adolescents, young adults, women planning pregnancy, expectant and new mothers, and women navigating perimenopause or menopause — regardless of marital status. Every consultation is strictly private, confidential, and judgement-free, and any physical examination or ultrasound is performed only after explaining why and obtaining your consent.",
  },
  {
    id: "pricing-packages",
    question: "How much does a consultation or care package cost at MyStree?",
    answer:
      "Individual clinician consultation fees are shown transparently before you confirm a slot, starting from ₹600 for clinical nutrition, ₹700 for gynaecology and obstetrics, and ₹900 for dermatology. For ongoing needs, MyStree also offers fixed-price care programmes such as MyStree Care Journey Basic at ₹2,999 covering gynaecologist visits, follicular scans, and nutrition guidance.",
  },
  {
    id: "ultrasound-same-visit",
    question: "Can I get a pelvic or pregnancy ultrasound scan during the same visit?",
    answer:
      "Yes. Pelvic, follicular, and pregnancy ultrasound scans are performed inside our Indiranagar clinic so most patients do not need to travel to a separate diagnostic centre. In compliance with the PCPNDT Act in India, foetal sex determination is strictly prohibited and is never performed at MyStree.",
  },
  {
    id: "pcos-hormones",
    question: "How does MyStree evaluate and manage PCOS, irregular periods, and fertility?",
    answer:
      "PCOS and cycle irregularities are evaluated using clinical Rotterdam criteria alongside thyroid, metabolic, and hormone assessments rather than prescribing a one-size-fits-all pill. Depending on your goals, your gynaecologist coordinates directly with our clinical nutritionist for realistic Indian meal plans and our dermatologist for hormonal acne or hair fall.",
  },
  {
    id: "booking-video",
    question: "Can I book an online video consultation or choose my doctor directly?",
    answer:
      "Yes. You can view live appointment timings for every clinician and book either an in-clinic visit in Indiranagar or a private video consultation online at any time, or message our care desk on WhatsApp at +91 63665 73772 for help choosing the right doctor for your symptoms.",
  },
] as const;
