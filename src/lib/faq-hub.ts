/**
 * The /faqs page content (9 Oct 2026), rewritten from the audit of the
 * previous 134-question list (lib/faqs-data.ts).
 *
 * How it was written
 *   - Questions are phrased the way women actually ask them — in search, on
 *     Reddit and Quora, and in Indian reporting on first gynaecology visits
 *     (fear of judgement when unmarried, virginity and hymen worries,
 *     shaving, cost, "PCOD vs PCOS", late periods, white discharge).
 *   - Each answer gives the direct answer first, then the detail, in plain
 *     words: the shape search and answer engines quote.
 *   - Clinical lines follow current guidance (ACOG, RCOG, NICE, FSRH, WHO,
 *     the 2023 International PCOS Guideline, ISUOG/FMF, India's GDM and
 *     ART rules). Clinic lines use only facts in this repository and the
 *     live booking system: one address (No. 3366, 13th Main Road, 560008),
 *     Monday to Saturday hours, fees as listed at booking.
 *   - No superlatives, outcome claims, ratings or testimonials (NMC notice of
 *     06.10.2026), and no keyword-stuffed questions ("Is My Stree a women's
 *     health clinic in Indiranagar?"): one natural mention of the place is
 *     enough for local search.
 *
 * Every question here is also emitted as FAQPage structured data.
 */

export type FaqTopicId =
  | "about"
  | "booking"
  | "gynaecology"
  | "periods"
  | "pregnancy"
  | "fertility"
  | "menopause"
  | "teens"
  | "pelvic"
  | "mind";

export type FaqEntry = { question: string; answer: string };

export type FaqTopic = { id: FaqTopicId; label: string; entries: readonly FaqEntry[] };

export const FAQ_TOPICS: readonly FaqTopic[] = [
  {
    id: "about",
    label: "About MyStree",
    entries: [
      {
        question: "What is MyStree?",
        answer:
          "MyStree is a women's health clinic in Indiranagar, Bengaluru. In one place you can see gynaecologists and obstetricians, a reproductive endocrinologist, a nutritionist, a pelvic floor physiotherapist, a dermatologist, a yoga therapist, a psychologist and a psychiatrist.",
      },
      {
        question: "Will the doctor judge me if I'm not married?",
        answer:
          "No. Your doctor asks about your health, not your marital status, and you will not be lectured about your choices. If a question about sexual activity matters for your care, it is asked plainly and privately, and your answer is handled in confidence, within legal limits.",
      },
      {
        question: "How is what I share kept private?",
        answer:
          "Private and confidential, within legal limits. Your consultation, records and test results are shared only with the people involved in your care or with your consent, unless the law requires otherwise. For anyone under 18, your doctor will explain what stays confidential and what the law requires us to report.",
      },
      {
        question: "Can I see a woman doctor?",
        answer:
          "Yes. MyStree's founders, obstetrician Dr. Smitha A.P and obstetrician and gynaecologist Dr. Surbhi Sinha, and reproductive endocrinologist Dr. Chaitra Nayak are women, and you can choose your doctor when you book. Male partners can see urologist and andrologist Dr. Sitaram M.",
      },
      {
        question: "Where is MyStree?",
        answer:
          "MyStree is at No. 3366, 13th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru 560008, a short distance from 100 Feet Road. It is easy to reach from Domlur, Jeevan Bhima Nagar, HAL and Old Airport Road.",
      },
      {
        question: "What are your opening hours?",
        answer:
          "The clinic is open Monday to Saturday, 9 am to 8 pm, and usually closed on Sundays. Message us on WhatsApp at +91 63665 73772 if you need a time outside these hours.",
      },
    ],
  },
  {
    id: "booking",
    label: "Booking & fees",
    entries: [
      {
        question: "How do I book an appointment?",
        answer:
          "Book online on the MyStree booking page, where each doctor's free times are shown, or call or WhatsApp the clinic on +91 63665 73772. You can choose an in-clinic visit or, for many concerns, a video consultation.",
      },
      {
        question: "How much does a consultation cost?",
        answer:
          "Consultation fees depend on the doctor and range from about ₹600 to ₹1,500. Most gynaecology and pregnancy consultations are ₹700. The exact fee is always shown on the booking page before you confirm.",
      },
      {
        question: "Can I see a doctor online?",
        answer:
          "Yes. Video consultations are available for follow-ups, reviewing reports, nutrition and therapy, and for first conversations that do not need an examination. If an examination or scan is needed, your doctor arranges an in-clinic visit.",
      },
      {
        question: "How do I pay?",
        answer:
          "Video consultations are paid online when you book. For in-clinic visits you can pay online in advance or at the clinic by UPI, card or cash.",
      },
      {
        question: "Will my health insurance cover the visit?",
        answer:
          "Most outpatient consultations in India are paid by the patient, but some policies include outpatient cover. MyStree gives you an itemised bill, prescription and reports to submit to your insurer, so check your policy for outpatient benefits.",
      },
      {
        question: "Can I bring my partner, mother or a friend?",
        answer:
          "Yes, you are welcome to bring someone with you. You can also ask to speak to your doctor on your own for part of the visit.",
      },
      {
        question: "What should I bring to my first appointment?",
        answer:
          "Bring any recent blood tests, scan reports and prescriptions, a list of medicines and supplements you take, and the date your last period started. A few notes on your symptoms and questions help you make the most of the time.",
      },
    ],
  },
  {
    id: "gynaecology",
    label: "Gynaecology",
    entries: [
      {
        question: "When should I see a gynaecologist?",
        answer:
          "See a gynaecologist if your periods are irregular, very heavy, very painful or have stopped, if you bleed between periods or after sex, or if you have pelvic pain, unusual discharge or pain during sex. It is also worth a visit before trying for a pregnancy and for regular cervical screening.",
      },
      {
        question: "Do I need a pelvic exam at my first visit?",
        answer:
          "Not always. Many concerns can be assessed by talking and, if needed, an abdominal ultrasound. An internal examination is suggested only when it will change your care, it is explained first, and you can ask to pause or stop at any point.",
      },
      {
        question: "Can a pelvic exam affect my hymen or virginity?",
        answer:
          "A careful examination is unlikely to change the hymen, and the hymen's appearance is not a reliable sign of whether someone has had sex. If you have not had penetrative sex, tell your doctor: an internal examination is often not needed, a smaller speculum can be used if it is, and an abdominal ultrasound is usually possible instead.",
      },
      {
        question: "Do I need to shave before my appointment?",
        answer:
          "No. You do not need to shave or wax before seeing a gynaecologist. Come as you are, in comfortable clothes.",
      },
      {
        question: "Is white discharge normal?",
        answer:
          "Yes, clear or white discharge that changes through your cycle is normal. See a doctor if it changes colour to yellow, green or grey, smells strong, looks like cottage cheese, or comes with itching, burning or pain.",
      },
      {
        question: "Is bleeding between periods a concern?",
        answer:
          "Occasional light spotting can happen around ovulation or with hormonal contraception, but bleeding between periods or after sex should be checked by a gynaecologist, especially if it keeps happening.",
      },
      {
        question: "When should I start Pap smear tests?",
        answer:
          "Most guidance in India advises starting cervical screening between 25 and 30 and repeating it every three to five years, depending on the test. Your gynaecologist will advise whether you need a Pap smear, an HPV test or both.",
      },
      {
        question: "Do you offer cervical cancer prevention advice?",
        answer:
          "Yes. Your gynaecologist can explain cervical cancer screening and the ways to lower the risk of cervical cancer, and advise what suits your age and history.",
      },
    ],
  },
  {
    id: "periods",
    label: "Periods & PCOS",
    entries: [
      {
        question: "My period is late and I'm not pregnant. Why?",
        answer:
          "Stress, a big change in weight or exercise, illness, travel, thyroid problems and PCOS are common reasons for a late period. See a doctor if your period is more than three months late, or if late periods keep happening.",
      },
      {
        question: "Is it normal to get my period twice a month?",
        answer:
          "Occasionally it can happen, but cycles shorter than 21 days, or bleeding twice a month for more than a couple of cycles, should be checked. Thyroid problems, hormonal changes, polyps and fibroids are some of the causes.",
      },
      {
        question: "How much period pain is normal?",
        answer:
          "Cramping that eases with regular pain relief is common. Pain that makes you miss work, college or school, does not ease with medicine, or is getting worse is not normal and can be a sign of a condition such as endometriosis or adenomyosis.",
      },
      {
        question: "What is the difference between PCOD and PCOS?",
        answer:
          "In practice they describe the same condition. PCOS, polycystic ovary syndrome, is the medical name; PCOD is a term widely used in India for the same pattern of irregular ovulation, raised androgen hormones and ovaries that look polycystic on ultrasound.",
      },
      {
        question: "Can PCOS be cured?",
        answer:
          "PCOS cannot be cured, but it can be managed. Regular meals and activity, managing weight and insulin resistance where relevant, and care for cycles, acne, hair growth or fertility are planned with your doctor.",
      },
      {
        question: "Which tests are done for PCOS?",
        answer:
          "Your doctor usually checks hormone levels (including testosterone), thyroid, prolactin and blood sugar or insulin, and may arrange a pelvic ultrasound. In teenagers, an ultrasound is not used to diagnose PCOS in the first years after periods start.",
      },
      {
        question: "Can I get pregnant with PCOS?",
        answer:
          "Yes. PCOS is a common cause of irregular ovulation, and many women with PCOS conceive. Your doctor explains the options after looking at your cycles and test results.",
      },
    ],
  },
  {
    id: "pregnancy",
    label: "Pregnancy",
    entries: [
      {
        question: "When should I see a doctor after a positive pregnancy test?",
        answer:
          "Book a first visit at around 6 to 8 weeks from the first day of your last period. Come sooner if you have pain or bleeding, have had an ectopic pregnancy before, or have a condition such as diabetes, high blood pressure or a thyroid disorder.",
      },
      {
        question: "Which scans will I need in pregnancy?",
        answer:
          "Usually an early scan to confirm the pregnancy and due date, the NT scan between 11 and 14 weeks, the anomaly scan at about 18 to 20 weeks, and growth scans later on if needed. Sex determination of the baby is prohibited by law in India and is never done.",
      },
      {
        question: "How is gestational diabetes tested?",
        answer:
          "In India, a 75 g glucose test is recommended at the first antenatal visit and again at 24 to 28 weeks if the first is normal. A two-hour value of 140 mg/dL or more means gestational diabetes, which is managed with diet, activity and, if needed, medicine.",
      },
      {
        question: "Where will my baby be delivered?",
        answer:
          "MyStree is an outpatient clinic, so your antenatal visits are in Indiranagar and the birth takes place in hospital. Your obstetrician plans the delivery with you, well before your due date, at a hospital in Bengaluru suited to your pregnancy.",
      },
      {
        question: "Which pregnancy symptoms need urgent care?",
        answer:
          "Go to the nearest hospital emergency department straight away for bleeding, fluid leaking, a severe headache or blurred vision, sudden swelling of the face or hands, severe tummy pain, fits, or if your baby is moving less than usual.",
      },
      {
        question: "Is pregnancy after 35 risky?",
        answer:
          "Pregnancy after 35 has a higher chance of chromosomal conditions, gestational diabetes and high blood pressure, so it is monitored more closely. Most women over 35 have healthy pregnancies, and screening choices are discussed early.",
      },
    ],
  },
  {
    id: "fertility",
    label: "Fertility",
    entries: [
      {
        question: "How long should we try before seeing a doctor?",
        answer:
          "See a doctor after 12 months of trying if you are under 35, or after 6 months if you are 35 or older. Go sooner if your periods are irregular, or if you know of PCOS, endometriosis, previous pelvic surgery or a sperm problem.",
      },
      {
        question: "What does a low AMH mean?",
        answer:
          "A low AMH means fewer eggs remain than expected for your age. It does not measure egg quality or tell you whether you can conceive naturally, but it is a reason to plan sooner rather than later.",
      },
      {
        question: "Should my husband or partner be tested too?",
        answer:
          "Yes. Fertility depends on both partners, so a semen analysis is usually one of the first tests, and both partners are seen together.",
      },
      {
        question: "Can stress stop me from getting pregnant?",
        answer:
          "Everyday stress on its own rarely causes infertility, but long-term stress can affect sleep, cycles and libido. If you have been trying without success, a medical evaluation is the right next step rather than blaming yourself.",
      },
    ],
  },
  {
    id: "menopause",
    label: "Menopause",
    entries: [
      {
        question: "What are the first signs of perimenopause?",
        answer:
          "Changes in your cycle are usually the first sign, often in your forties: periods closer together, further apart, heavier or lighter. Hot flushes, night sweats, poor sleep, mood changes, brain fog and vaginal dryness are also common.",
      },
      {
        question: "At what age does menopause usually start in India?",
        answer:
          "Indian women reach menopause at around 46 to 47 on average, a little earlier than in many Western countries. Menopause is confirmed after 12 months in a row without a period.",
      },
      {
        question: "What treatment options are there for menopause symptoms?",
        answer:
          "Options range from lifestyle and nutrition changes to medical treatments, some with hormones and some without. Each has benefits and risks that depend on your health and history, so your gynaecologist explains them with you before you decide.",
      },
      {
        question: "Do I still need contraception during perimenopause?",
        answer:
          "Yes. Pregnancy is still possible, so use contraception until you have gone 12 months without a period if you are over 50, or 24 months if you are under 50.",
      },
      {
        question: "Can menopause affect my mood and sleep?",
        answer:
          "Yes. Falling hormone levels can bring anxiety, low mood, irritability and broken sleep, often alongside night sweats. These symptoms are treatable, so they are worth raising with your doctor.",
      },
    ],
  },
  {
    id: "teens",
    label: "Teen health",
    entries: [
      {
        question: "At what age should a girl first see a gynaecologist?",
        answer:
          "Between 13 and 15 is a good time, even without a problem. It is usually just a conversation about periods, growth, skin and mood. Come sooner for painful, heavy or irregular periods.",
      },
      {
        question: "Will my parents be told what I say?",
        answer:
          "Private consultations. Your doctor will explain what stays confidential and what the law requires us to report. Treatment for anyone under 18 usually needs a parent or guardian's consent.",
      },
      {
        question: "Are irregular periods normal in the first few years?",
        answer:
          "Yes, cycles are often irregular for the first two to three years. See a doctor if periods come more often than every 21 days, more than 90 days apart, last longer than seven days, or have not started by 15.",
      },
      {
        question: "Is teenage acne linked to hormones?",
        answer:
          "Yes. Rising androgen hormones at puberty increase oil in the skin, which leads to acne. Severe acne, or acne with irregular periods and extra hair growth, is worth checking for PCOS.",
      },
    ],
  },
  {
    id: "pelvic",
    label: "Pelvic health",
    entries: [
      {
        question: "Is it normal to leak urine when I cough or sneeze?",
        answer:
          "It is common, especially after childbirth, but it is not something you have to live with. Supervised pelvic floor physiotherapy is the recommended first treatment for this kind of leakage.",
      },
      {
        question: "Why does sex hurt?",
        answer:
          "Pain during sex can come from dryness, infection, tight pelvic floor muscles, vaginismus, endometriosis or scarring after childbirth. It is common and treatable, so see a gynaecologist rather than putting up with it.",
      },
      {
        question: "What is vaginismus and can it be treated?",
        answer:
          "Vaginismus is an involuntary tightening of the muscles around the vagina that makes penetration painful or impossible. It is treatable with pelvic floor physiotherapy, gentle graded exercises and support, at a pace that feels right for you.",
      },
      {
        question: "What is diastasis recti?",
        answer:
          "Diastasis recti is a widening of the gap between the tummy muscles after pregnancy, which can leave a bulge or doming. Targeted exercises with a women's health physiotherapist help it recover.",
      },
      {
        question: "When can I start exercising after delivery?",
        answer:
          "Gentle walking and pelvic floor exercises can usually start within days of a normal delivery. Most women are checked at about six weeks before returning to running or high-impact exercise, and recovery after a caesarean takes longer.",
      },
    ],
  },
  {
    id: "mind",
    label: "Mental health",
    entries: [
      {
        question: "Is it normal to feel low after having a baby?",
        answer:
          "Feeling tearful and overwhelmed in the first two weeks, the baby blues, is very common. If low mood, anxiety or numbness lasts longer than two weeks or is getting worse, it may be postnatal depression, which is treatable, so please ask for help.",
      },
      {
        question: "Can hormones affect my mood?",
        answer:
          "Yes. Mood can change across the menstrual cycle, in pregnancy, after birth and in perimenopause, and thyroid problems can affect it too. Severe mood changes before periods can be a condition called PMDD, which is treatable.",
      },
      {
        question: "Can I see a psychologist or psychiatrist at MyStree?",
        answer:
          "Yes. Consultant psychologist Jigyasa Thakur supports women with anxiety, low mood, pregnancy and postpartum adjustment, fertility stress, grief and relationship concerns, in person or by video. Psychiatrist Dr. Nivedita Sudheer sees women who may need medicine for anxiety, depression or sleep problems.",
      },
      {
        question: "What should I do in a mental health crisis?",
        answer:
          "MyStree is an outpatient clinic and not a crisis centre. If you or someone you know is thinking of self-harm or is in severe distress, call Tele-MANAS, India's free mental health helpline, on 14416 or 1800 891 4416, or go to the nearest hospital emergency department.",
      },
    ],
  },
];
