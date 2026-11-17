/**
 * Women's health FAQ for the /doctors route.
 *
 * Written to be medically responsible: no diagnosis, no guarantees, no claimed
 * outcomes. Each answer describes when evaluation is reasonable and what a
 * consultation covers — it never tells a reader what they have. MyStree and
 * Indiranagar are named only where the answer is genuinely about the clinic.
 *
 * These are mirrored into FAQPage JSON-LD, so every answer here must stay
 * visible on the page — schema must not carry content the reader cannot see.
 */

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqs: readonly FaqItem[] = [
  {
    question: "When should I see a gynaecologist about irregular periods?",
    answer:
      "It is reasonable to get checked when cycles become consistently shorter than 21 days or longer than 35, when periods stop for three months or more without pregnancy, or when bleeding is unusually heavy or prolonged. Irregular cycles have many possible causes — hormonal, thyroid, metabolic and stress-related among them — so the first appointment is usually about history and, where indicated, basic investigations rather than immediate treatment.",
  },
  {
    question: "Can PCOS affect periods, skin and weight at the same time?",
    answer:
      "PCOS is a diagnosis that can involve irregular ovulation, signs of higher androgen levels such as acne or hair changes, and metabolic effects. Not everyone has all of these, and having one of them does not by itself mean PCOS. Assessment normally combines menstrual history, examination and selected blood tests or a scan, so that management is matched to what is actually found.",
  },
  {
    question: "When should a couple consider seeing a fertility specialist?",
    answer:
      "A common threshold is twelve months of trying without conception, or six months if the woman is over 35. Earlier review is sensible where there are known factors — irregular or absent periods, previous pelvic surgery or infection, endometriosis, or a history of recurrent pregnancy loss. Evaluation usually looks at both partners, since roughly a third of cases involve a male factor.",
  },
  {
    question: "What should I bring to a first gynaecology appointment?",
    answer:
      "Bring any previous scans, blood reports or discharge summaries you already have, a list of current medicines and supplements, and rough dates for your last few periods. It helps to note what you have already tried and what specifically prompted the visit. There is no need to prepare anything formal — the history matters more than the paperwork.",
  },
  {
    question: "When should pelvic pain or painful periods be looked at?",
    answer:
      "Period pain that stops you doing ordinary things, pain that is getting worse over time, pain during or after intercourse, or pelvic pain that persists between cycles all justify evaluation. Severe period pain is common but it is not something you simply have to accept, and several treatable conditions can cause it.",
  },
  {
    question:
      "Can I consult about menopause or perimenopause symptoms?",
    answer:
      "Yes. Changes in cycle length, sleep, mood, temperature regulation, and vaginal or urinary symptoms can all begin years before periods stop. A consultation covers what is happening, what is worth investigating, and what the options are — including choosing not to treat, which is a legitimate decision when symptoms are manageable.",
  },
  {
    question: "How do I choose the right clinician for my concern?",
    answer:
      "Start with what is bringing you in rather than with a specialty. Cycle and pregnancy concerns usually begin with obstetrics and gynaecology; difficulty conceiving with fertility; pain, prolapse or postpartum recovery with pelvic health; and weight, nutrition or PCOS-related metabolic concerns with nutrition. If the first clinician is not the right fit, the referral is made within the team.",
  },
  {
    question: "Does MyStree see patients in Indiranagar, Bengaluru?",
    answer:
      "Yes — MyStree is a women's health clinic in Indiranagar, Bengaluru, with consultations available in clinic and online. You can reach the team by phone or email to arrange a visit, and the clinician profiles on this page show who covers which area of care.",
  },
];
