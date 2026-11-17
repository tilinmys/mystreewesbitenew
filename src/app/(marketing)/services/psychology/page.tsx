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
 * Psychology & Counselling — /services/psychology.
 *
 * The locked service-page template (color.md) with women's mental health
 * content. The route is the previous my-stree.com URL, so the page keeps
 * any ranking and links that address already has.
 *
 * Clinicians (live booking system, in clinic and online):
 *   - Ms. Jigyasa Thakur, RCI-licensed Consultant Psychologist, M.A.
 *     Clinical Psychology, PG Diploma in Rehabilitation Psychology, 5+
 *     years; scope as recorded: women's mental health, fertility
 *     counselling, pregnancy and postpartum wellbeing, relationships,
 *     child development, infertility, miscarriage, anxiety, depression,
 *     grief and life transitions (booking ID 12)
 *   - Ms. Priyanka Savina, M.Sc Counselling Psychology (booking ID 3)
 *
 * Content rules applied to the supplied brief:
 *   - there is no psychiatrist in the booking system, so no psychiatry,
 *     medication management or "reproductive psychiatry" is claimed; the
 *     page explains the difference and when to see a psychiatrist (the
 *     navigation label "Psychology & Psychiatry" should be reviewed)
 *   - no testimonials ("Meera V."), no "94%" figure, no ratings (NMC
 *     notice, 06.10.2026; the figure has no source), and no claims against
 *     other providers (Amaha, Heart It Out, Mindful TMS, Manipal)
 *   - psychosexual therapy and somatic or desensitisation methods are not
 *     in either clinician's recorded scope, so they are not offered
 *   - safety first: crisis help (Tele-MANAS 14416, 112, nearest emergency
 *     department) is on the page, not only in the FAQ
 *   - the brief's address (2nd floor, 560061), second phone number and
 *     mystree.org domain are not used; the repository's are
 */

const PAGE_PATH = "/services/psychology";

export const metadata: Metadata = {
  // The root layout appends "| MyStree".
  title: "Psychology, Counselling & Psychiatry for Women in Indiranagar, Bengaluru",
  description:
    "Counselling for women in Indiranagar, Bengaluru: anxiety, low mood, pregnancy and postpartum emotional health, infertility and miscarriage grief, and relationships. In clinic or online.",
  alternates: { canonical: `${SITE_URL}${PAGE_PATH}` },
  openGraph: {
    title: "Psychology, Counselling & Psychiatry for Women in Indiranagar, Bengaluru | MyStree",
    description:
      "Counselling with an RCI-licensed psychologist and care from a consultant psychiatrist, alongside our gynaecologists, for every stage of a woman's life.",
    url: `${SITE_URL}${PAGE_PATH}`,
    type: "website",
    siteName: "MyStree Women's Health Clinic",
  },
};

/*
 * Local questions: what women ask before booking a psychologist in
 * Indiranagar. Repository and booking-system facts only; crisis help first.
 */
const LOCAL_QUESTIONS = [
  {
    question: "Where can I get help right now if I am in crisis?",
    answer:
      "If you are thinking of harming yourself or feel unsafe, call Tele-MANAS on 14416, the Government of India's free mental health helpline, open 24 hours a day, or call 112, or go to the nearest hospital emergency department. Please do not wait for an appointment.",
  },
  {
    question: "What happens at my first session?",
    answer:
      "Your first session is a private conversation at your pace. Your psychologist asks what has brought you in, how you are sleeping and coping, and what support you have, and you agree together on what you would like to work on and how often to meet.",
  },
  {
    question: "Can I have sessions online?",
    answer:
      "Yes. Sessions with Ms. Jigyasa Thakur and Ms. Priyanka Savina are offered in the clinic in Indiranagar and online by video, so you can choose what feels easier, including in late pregnancy or the early weeks with a new baby.",
  },
  {
    question: "Where is MyStree in Indiranagar?",
    answer:
      "MyStree is at No. 3366, 13th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru 560008, a short distance from 100 Feet Road and easy to reach from Domlur, Jeevan Bhima Nagar, HAL, Ulsoor and Old Airport Road. Book online or message the care team on WhatsApp at +91 63665 73772.",
  },
] as const;

/*
 * FAQ: mental health questions women search, answered to current guidance
 * (WHO and NICE CG192 on perinatal mental health; DSM-5-TR on PMDD;
 * Upadhyay et al., WHO Bulletin 2017, on postpartum depression in India;
 * Rehabilitation Council of India on clinical psychologist licensing).
 */
const PSYCHOLOGY_FAQS = [
  {
    question: "Is it the baby blues or postpartum depression?",
    answer:
      "The baby blues, tearfulness and mood swings in the first days after birth, usually settle within two weeks. Postpartum depression lasts longer, can begin any time in the first year, and brings persistent low mood, anxiety, poor sleep even when the baby sleeps, or trouble feeling close to your baby. It affects about one in five new mothers in India and responds well to treatment.",
  },
  {
    question: "What is PMDD?",
    answer:
      "Premenstrual dysphoric disorder is a severe form of premenstrual syndrome. Intense irritability, low mood, anxiety or feeling out of control appear in the week or two before a period and ease within a few days of bleeding starting. Tracking symptoms daily for two cycles helps confirm it, and care combines counselling with treatment from a gynaecologist.",
  },
  {
    question: "Is it normal to grieve after a miscarriage?",
    answer:
      "Yes. Miscarriage is a real loss, and grief, guilt, anger, anxiety in a later pregnancy and strain between partners are all common, however early the loss. Counselling gives you space to grieve, and support for partners and for the next pregnancy is part of it.",
  },
  {
    question: "Can counselling help during fertility treatment?",
    answer:
      "Yes. Fertility treatment brings repeated waiting, hope and disappointment, along with pressure on relationships and work. Counselling helps you cope with uncertainty, make decisions as a couple, and manage stress and low mood through each cycle.",
  },
  {
    question: "What is the difference between a psychologist and a psychiatrist?",
    answer:
      "A clinical psychologist assesses and treats emotional difficulties through talking therapies and does not prescribe medicines; in India, clinical psychologists are licensed by the Rehabilitation Council of India. A psychiatrist is a medical doctor who can prescribe. If medicine may help, your psychologist will suggest seeing our psychiatrist, Dr. Nivedita Sudheer.",
  },
  {
    question: "Is counselling confidential?",
    answer:
      "Private and confidential, within legal limits. At the first session your psychologist explains what stays confidential and when others may need to be involved, such as a serious risk to your safety or someone else's, and will talk to you about it first wherever possible.",
  },
  {
    question: "How many sessions will I need?",
    answer:
      "It depends on what you are dealing with. Some people come for a few sessions to work through one problem, others for longer. You and your psychologist review together how things are going and decide when to space sessions out or stop.",
  },
  {
    question: "Can hormones affect my mood?",
    answer:
      "They can. Mood changes are common around periods, in pregnancy, after birth and in perimenopause, and thyroid problems, low iron and poor sleep can look like anxiety or depression. Because your psychologist works in the same clinic as our gynaecologists, physical causes can be checked alongside counselling.",
  },
] as const;

const PSYCHOLOGY_READING_SLUGS = ["birth-doula-guide-bangalore", "perimenopause-symptoms-age-40"] as const;

function generateStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      clinicNode(),
      {
        "@type": "MedicalWebPage",
        "@id": `${SITE_URL}${PAGE_PATH}#page`,
        url: `${SITE_URL}${PAGE_PATH}`,
        name: "Women's Psychologist & Counselling in Indiranagar, Bengaluru | MyStree",
        description: metadata.description,
        inLanguage: "en-IN",
        isPartOf: { "@id": CLINIC_ID },
        about: [
          { "@id": `${SITE_URL}${PAGE_PATH}#service` },
          { "@type": "MedicalCondition", name: "Postpartum depression" },
          { "@type": "MedicalCondition", name: "Premenstrual dysphoric disorder" },
          { "@type": "MedicalCondition", name: "Anxiety" },
        ],
        breadcrumb: { "@id": `${SITE_URL}${PAGE_PATH}#breadcrumb` },
      },
      {
        "@type": "MedicalService",
        "@id": `${SITE_URL}${PAGE_PATH}#service`,
        name: "Psychology and Counselling for Women",
        serviceType: [
          "Psychological counselling",
          "Pregnancy and postpartum emotional health",
          "Counselling during infertility and fertility treatment",
          "Miscarriage and pregnancy loss counselling",
          "Anxiety and depression counselling",
          "Relationship and couples counselling",
          "Online counselling",
        ],
        provider: { "@id": CLINIC_ID },
        employee: [
          {
            "@type": "Person",
            name: "Ms. Jigyasa Thakur",
            jobTitle: "Consultant Psychologist",
            hasCredential: "M.A. Clinical Psychology; PG Diploma in Rehabilitation Psychology (RCI licensed)",
          },
          clinicianRef("priyanka-savina", "Priyanka Savina"),
        ],
        areaServed: {
          "@type": "City",
          name: clinic.city,
          containsPlace: { "@type": "Place", name: clinic.locality },
        },
      },
      faqNode(PAGE_PATH, [...PSYCHOLOGY_FAQS, ...LOCAL_QUESTIONS]),
      breadcrumbNode(PAGE_PATH, "Psychology"),
    ],
  };
}

export default async function PsychologyPage() {
  const reading = await getArticles(PSYCHOLOGY_READING_SLUGS);
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
          image={{ src: "/images/services/pages/counselling-session-indiranagar-bengaluru.webp", alt: "A young woman talks with a therapist in a counselling room" }}
          headingId="psychology-hero-heading"
          title="Psychology and counselling for women in Indiranagar"
          lead="Support for anxiety, low mood, pregnancy and the months after birth, infertility and loss, and relationships, with a licensed psychologist and a psychiatrist who work alongside our gynaecologists. In the clinic on 13th Main Road or online."
          primaryCta={{ label: "Book a counselling session", href: "/book" }}
          secondaryCta={{ label: "Call the clinic", href: "tel:+916366573772" }}
        />
      </ServiceBand>

      <ServiceConditions
        headingId="psychology-conditions-heading"
        heading="What our psychologist and psychiatrist help with"
        conditions={[
          "Anxiety and panic",
          "Body image and eating worries",
          "Feeling low or depressed",
          "Grief and loss",
          "Stress during infertility and fertility treatment",
          "Life changes and transitions",
          "Miscarriage and pregnancy loss",
          "Mood changes before periods (PMDD)",
          "Postpartum depression and anxiety",
          "Pregnancy worries and fear of birth",
          "Relationship and couple difficulties",
          "Stress and burnout",
        ]}
        cta={{ label: "Book a counselling session", href: "/book" }}
      />

      <ServiceSpecialists
        headingId="psychology-specialists-heading"
        heading="Book with our psychology and psychiatry team"
        lead="Times shown are live from the MyStree booking system. Choose the doctor and time that suit you."
        consultationLabel="Clinic or online session"
        specialists={[
          {
            bookingId: 12,
            tag: "Clinical psychology",
            focus: ["Pregnancy and postpartum", "Infertility and loss"],
          },
          {
            bookingId: 16,
            tag: "Psychiatry",
            focus: ["Anxiety and depression", "Sleep problems"],
            profileHref: "/doctors/dr-nivedita-sudheer",
          },
          {
            bookingId: 3,
            tag: "Counselling",
            focus: ["Stress and lifestyle", "Emotional eating"],
            profileHref: "/doctors/priyanka-savina",
          },
        ]}
      />

      <ServiceSteps
        image={{ src: "/images/services/pages/journaling-for-emotional-wellbeing.webp", alt: "A woman writing in a notebook at her desk in the evening" }}
        headingId="psychology-steps-heading"
        heading="How counselling works"
        steps={[
          {
            title: "Talk",
            text: "A private first session about what has brought you in, at your pace.",
          },
          {
            title: "Understand",
            text: "How your sleep, health, cycle, pregnancy or fertility may be playing a part.",
          },
          {
            title: "Work",
            text: "Evidence-based therapy towards goals you choose together.",
          },
          {
            title: "Connect",
            text: "With your consent, with your gynaecologist or our psychiatrist if needed.",
          },
        ]}
        cta={{ label: "Book a counselling session", href: "/book" }}
      />

      <ServiceInsight
        image={{ src: "/images/services/pages/woman-feeling-stressed-and-exhausted.webp", alt: "A tired woman sitting alone on an apartment stairwell" }}
        headingId="psychology-insight-heading"
        heading="Why women's emotional health is often overlooked"
        body="Many women carry low mood, anxiety or grief for months because it is put down to hormones, tiredness or just being a mother."
        points={[
          "Low mood in pregnancy or after birth is often brushed off as normal tiredness or the baby blues",
          "Grief after a miscarriage or unsuccessful fertility treatment is a real loss, yet women are often expected to move on quickly",
          "Mood changes linked to periods, fertility treatment or menopause need care that understands both body and mind",
        ]}
      />

      <ServiceFit
        headingId="psychology-fit-heading"
        heading="Counselling is right for you if you"
        items={[
          { icon: "pregnancy", label: "Feel anxious or low in pregnancy or since having your baby" },
          { icon: "branch", label: "Are grieving a miscarriage or finding fertility treatment hard" },
          { icon: "mind", label: "Have anxiety, low mood or stress that is affecting daily life" },
          { icon: "conversation", label: "Want a private space to talk, on your own or as a couple" },
        ]}
      />

      <ServiceModel
        headingId="psychology-model-heading"
        heading="Counselling that works with your medical care"
        body="Psychology at MyStree is led by Ms. Jigyasa Thakur, an RCI-licensed consultant psychologist with an M.A. in clinical psychology, who supports women and couples through infertility, miscarriage, pregnancy, the months after birth, anxiety, depression, grief and life changes. Psychiatrist Dr. Nivedita Sudheer (MBBS, MD Psychiatry, DPM) sees women who may need medicine for anxiety, depression or sleep problems. Ms. Priyanka Savina, who holds an M.Sc in counselling psychology, also offers counselling. With your permission, your psychologist can work with your gynaecologist, so physical and emotional care fit together."
        link={{ label: "Meet our team", href: "/doctors" }}
      />

      <ServiceStat
        headingId="psychology-stat-heading"
        heading="Your emotional health deserves the same care as your physical health."
        figure="RCI"
        caption="licensed: Ms. Jigyasa Thakur is a clinical psychologist registered with the Rehabilitation Council of India."
      />

      <ServiceFacts
        headingId="psychology-facts-heading"
        eyebrow="At a glance"
        heading="What counselling at MyStree is built on"
        facts={[
          { figure: "RCI", label: "licensed clinical psychologist" },
          { figure: "5+ years", label: "of clinical psychology practice behind Ms. Jigyasa Thakur's care" },
          { figure: "2", label: "ways to meet: in the clinic in Indiranagar or online" },
        ]}
      />

      <ServiceQuestions
        image={{ src: "/images/services/pages/mindful-breathing-on-park-bench-bengaluru.webp", alt: "A woman sitting on a park bench under a rain tree, taking a slow breath" }}
        headingId="psychology-questions-heading"
        heading="Counselling in Indiranagar"
        questions={LOCAL_QUESTIONS}
      />

      <ServiceFaq
        headingId="psychology-faq-heading"
        heading="Frequently asked questions"
        items={PSYCHOLOGY_FAQS}
        allLink={{ label: "See all FAQs", href: "/faqs" }}
      />

      <ServiceAsk
        headingId="psychology-ask-heading"
        heading="Need to talk to someone today?"
        note="If you are in crisis, call Tele-MANAS on 14416 (free, 24 hours) or 112. For anything else, message our care team on WhatsApp."
        whatsapp={{
          label: "Chat on WhatsApp",
          href: "https://wa.me/916366573772?text=Hi%20MyStree%2C%20I%20would%20like%20to%20ask%20about%20counselling.",
        }}
        faqs={{ label: "Read the FAQs", href: "/faqs" }}
      />

      <ServiceReading
        headingId="psychology-reading-heading"
        heading="Reading from our doctors"
        articles={reading}
        allLink={{ label: "All articles", href: "/blog" }}
        authorProfiles={authorProfiles}
      />

      <ServiceClosing
        headingId="psychology-closing-heading"
        heading="A private space to talk, when you are ready."
        primary={{ label: "Book a counselling session", href: "/book" }}
        secondary={{ label: "Meet our team", href: "/doctors" }}
      />
    </main>
  );
}
