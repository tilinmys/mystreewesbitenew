/*
 * MyStree Assistant: the answer engine (24 Nov 2026).
 *
 * Rule-based on purpose: a health clinic's chat must never improvise medical
 * advice. Every answer comes from a verified source in this repository:
 *   - clinic facts (lib/clinic.ts)
 *   - the live booking roster (names, specialities, fees, visit lengths)
 *   - care packages (lib/packages.ts)
 *   - the curated FAQ hub (lib/faq-hub.ts, the /faqs page)
 *
 * Order of checks for every message:
 *   1. Emergency and crisis language (always first; false positives are
 *      acceptable, a missed emergency is not).
 *   2. Small talk (greeting, thanks).
 *   3. Clinic intents: booking, cancel, hours, location, fees, payment,
 *      insurance, video, packages, talk to a person.
 *   4. Areas of care ("PCOS", "pregnant", "acne"): the matching doctors with
 *      fees and booking links, plus the service page, plus a FAQ answer when
 *      the message is a question the FAQ answers.
 *   5. FAQ search.
 *   6. Honest fallback: hand over to the care team on WhatsApp.
 *
 * Nothing the visitor types leaves the browser.
 */
import { FAQ_TOPICS } from "@/lib/faq-hub";
import { clinic } from "@/lib/clinic";

/* ------------------------------------------------------------------ types */

export type ChatDoctor = {
  id: number;
  name: string;
  speciality: string;
  fee: number;
  durationMinutes: number;
  bookingUrl: string;
};

export type ChatPackage = { slug: string; name: string; priceDisplay: string; priceFor: string };

export type ChatContext = { doctors: ChatDoctor[]; packages: ChatPackage[] };

export type ActionIcon = "call" | "whatsapp" | "book" | "map" | "link" | "alert";

export type ChatAction = {
  label: string;
  href: string;
  icon: ActionIcon;
  tone?: "primary" | "danger" | "plain";
  external?: boolean;
};

export type ChatListItem = { title: string; meta: string; href: string; cta: string; external?: boolean };

export type BotReply = {
  intent: string;
  tone?: "emergency";
  text: string[];
  list?: ChatListItem[];
  actions?: ChatAction[];
  chips?: string[];
};

/* --------------------------------------------------------------- constants */

const TEL = `tel:${clinic.telephone}`;
const WHATSAPP = `https://wa.me/${clinic.telephone.replace("+", "")}`;
const BOOK = "/book";
const HOURS = "Monday to Saturday, 9 am to 8 pm. Usually closed on Sundays.";

export const whatsappWith = (text: string) => `${WHATSAPP}?text=${encodeURIComponent(text)}`;

const A = {
  book: { label: "Book online", href: BOOK, icon: "book", tone: "primary" } as ChatAction,
  whatsapp: { label: "WhatsApp us", href: whatsappWith("Hello MyStree, I have a question."), icon: "whatsapp", external: true } as ChatAction,
  call: { label: `Call ${clinic.telephoneDisplay}`, href: TEL, icon: "call" } as ChatAction,
  map: { label: "Get directions", href: clinic.mapsUrl, icon: "map", external: true } as ChatAction,
  call112: { label: "Call 112", href: "tel:112", icon: "alert", tone: "danger" } as ChatAction,
  hospital: {
    label: "Nearest hospital",
    href: "https://www.google.com/maps/search/hospital+emergency+near+me",
    icon: "map",
    external: true,
  } as ChatAction,
  teleManas: { label: "Call Tele-MANAS 14416", href: "tel:14416", icon: "call", tone: "danger" } as ChatAction,
};

export const START_CHIPS = [
  "Book an appointment",
  "Timings and address",
  "Consultation fees",
  "Which doctor should I see?",
  "Video consultation",
  "Care packages",
];

const AREA_CHIPS = [
  "Periods and gynaecology",
  "Pregnancy",
  "PCOS",
  "Fertility",
  "Menopause",
  "Skin and hair",
  "Nutrition",
  "Pelvic floor",
  "Mental health",
  "Teen health",
];

/* -------------------------------------------------------------- emergency */

const CRISIS =
  /\b(suicid\w*|kill (my ?self|myself)|end (my|this) life|want to die|don'?t want to live|self[- ]?harm|hurt(ing)? myself|cut(ting)? myself|overdose)\b/i;
const VIOLENCE = /\b(rape[d]?|sexual(ly)? assault\w*|abus(e|ed|ing) me|beat(s|ing)? me|domestic violence|being hit)\b/i;
const PREGNANCY_RED =
  /\b(baby (is )?(not|isn'?t|stopped|less) mov\w*|no (fetal |baby )?movement\w*|reduced (fetal |baby )?movement\w*|water (broke|has broken|leaking)|leaking (fluid|water)|bleeding (in|during) pregnan\w*|pregnan\w*.{0,40}bleed\w*|bleed\w*.{0,40}pregnan\w*|blurr?(ed|y) vision|swelling (of|in) (my )?(face|hands))\b/i;
const GENERAL_RED =
  /\b(emergency|heavy bleeding|bleeding (a lot|heavily|non ?stop|won'?t stop)|soak\w* (a |through )?(pad|pads)|severe (pain|bleeding|headache|abdominal|tummy|stomach)|unbearable pain|can'?t breathe|cannot breathe|difficulty breathing|short(ness)? of breath|chest pain|faint(ed|ing)?|passed out|unconscious|collaps\w*|having (a )?fits?|fits|seizure\w*|convulsion\w*|high fever|ectopic)\b/i;

function emergencyReply(text: string): BotReply | null {
  if (CRISIS.test(text)) {
    return {
      intent: "crisis",
      tone: "emergency",
      text: [
        "I'm really sorry you're feeling this way. You deserve support right now, from a person.",
        "Call Tele-MANAS, India's free 24-hour mental health helpline, on 14416 or 1800 891 4416. If you are in immediate danger, call 112 or go to the nearest hospital emergency department.",
        "MyStree is an outpatient clinic, not a crisis service. When you feel safe, our psychologist and psychiatrist are here for ongoing care.",
      ],
      actions: [A.teleManas, A.call112, A.hospital],
    };
  }
  if (VIOLENCE.test(text)) {
    return {
      intent: "violence",
      tone: "emergency",
      text: [
        "If you are in danger now, call 112. The national Women Helpline is 181, free and open 24 hours.",
        "For injuries or after a sexual assault, go to the nearest hospital emergency department; they can give urgent care and preserve evidence if you choose.",
      ],
      actions: [A.call112, { label: "Call 181", href: "tel:181", icon: "call", tone: "danger" }, A.hospital],
    };
  }
  if (PREGNANCY_RED.test(text)) {
    return {
      intent: "emergency_pregnancy",
      tone: "emergency",
      text: [
        "Please don't wait for a chat reply. Go to the nearest hospital emergency department now, or call 112.",
        "In pregnancy, get urgent care for bleeding, fluid leaking, a severe headache or blurred vision, sudden swelling of the face or hands, severe tummy pain, fits, or if your baby is moving less than usual.",
      ],
      actions: [A.call112, A.hospital],
    };
  }
  if (GENERAL_RED.test(text.replace(/emergency contracepti\w*/gi, ""))) {
    return {
      intent: "emergency",
      tone: "emergency",
      text: [
        "If this is happening now, please don't wait for a chat reply. Call 112 or go to the nearest hospital emergency department.",
        "MyStree is an outpatient clinic and can't manage emergencies. Once you are safe, we can help with follow-up care.",
      ],
      actions: [A.call112, A.hospital, A.call],
    };
  }
  return null;
}

/** The persistent "Emergency" button in the chat header. */
export function emergencyHelp(): BotReply {
  return {
    intent: "emergency_button",
    tone: "emergency",
    text: [
      "In a medical emergency, call 112 or go to the nearest hospital emergency department.",
      "Go now for heavy bleeding, severe pain, fainting, trouble breathing, chest pain, fits, or in pregnancy: fluid leaking, a severe headache or blurred vision, or your baby moving less.",
      "For thoughts of self-harm, call Tele-MANAS on 14416 (free, 24 hours).",
    ],
    actions: [A.call112, A.hospital, A.teleManas],
  };
}

/* ----------------------------------------------------------- areas of care */

type Area = {
  id: string;
  label: string;
  match: RegExp;
  doctors: RegExp;
  page?: { href: string; label: string };
  blurb: string;
};

const AREAS: Area[] = [
  {
    id: "pcos",
    label: "PCOS",
    match: /\b(pcos|pcod|polycystic)\b/i,
    doctors: /gyn|nutri|derma/i,
    page: { href: "/clinics/pcos", label: "PCOS care" },
    blurb: "PCOS care brings together a gynaecologist, a nutritionist and, for acne or hair changes, a dermatologist.",
  },
  {
    id: "fertility",
    label: "Fertility",
    match: /\b(fertil\w*|infertil\w*|conceiv\w*|trying (for|to get) (a baby|pregnant)|ttc|ivf|iui|ovulat\w*|amh|egg (count|reserve))\b/i,
    doctors: /fertil|reproduct/i,
    page: { href: "/services/fertility-clinic", label: "Fertility care" },
    blurb: "Fertility consultations look at both partners' health, earlier tests and the next steps.",
  },
  {
    id: "pregnancy",
    label: "Pregnancy",
    match: /\b(pregnan\w*|antenatal|prenatal|trimester|due date|expecting|baby bump|delivery|miscarriage|nt scan|anomaly scan)\b/i,
    doctors: /obstet|gyn/i,
    page: { href: "/services/prenatal", label: "Pregnancy care" },
    blurb: "Our obstetricians see you from the first positive test to delivery planning, with scans and nutrition support.",
  },
  {
    id: "menopause",
    label: "Menopause",
    match: /\b(menopaus\w*|perimenopaus\w*|hot (flush|flash)\w*|night sweats)\b/i,
    doctors: /gyn/i,
    page: { href: "/services/menopause", label: "Menopause care" },
    blurb: "Our gynaecologists help with perimenopause and menopause symptoms and explain your options.",
  },
  {
    id: "skin",
    label: "Skin and hair",
    match: /\b(skin|acne|pimples?|hair ?(fall|loss|thinning)|derma\w*|pigment\w*|melasma|facial hair|hirsutism)\b/i,
    doctors: /derma/i,
    page: { href: "/services/dermatology", label: "Skin and hair care" },
    blurb: "Our dermatologist treats acne, pigmentation and hair fall, including changes linked to hormones.",
  },
  {
    id: "nutrition",
    label: "Nutrition",
    match: /\b(diet\w*|nutrition\w*|weight|meal plan|food|obesity)\b/i,
    doctors: /nutri|diet/i,
    page: { href: "/services/nutrition-counselling", label: "Nutrition counselling" },
    blurb: "Our nutritionist builds meal plans around your food and routine, for PCOS, pregnancy, thyroid and recovery after birth.",
  },
  {
    id: "physio",
    label: "Pelvic floor",
    match: /\b(pelvic floor|physio\w*|leak\w*|incontinence|vaginismus|diastasis|painful sex|pain during sex|postpartum recovery)\b/i,
    doctors: /physio/i,
    page: { href: "/services/pelvic-floor-physiotherapy", label: "Pelvic floor physiotherapy" },
    blurb: "Our pelvic physiotherapist treats leaks, pelvic pain, vaginismus and recovery after birth.",
  },
  {
    id: "mental",
    label: "Mental health",
    match: /\b(anxi\w*|depress\w*|stress\w*|mood|low mood|therap(y|ist)|counsel\w*|psycholog\w*|psychiatr\w*|panic|postpartum blues|can'?t sleep|insomnia|mental health)\b/i,
    doctors: /psych/i,
    page: { href: "/services/psychology", label: "Mental health care" },
    blurb: "A psychologist and a psychiatrist support anxiety, low mood and stress, including in pregnancy and after birth.",
  },
  {
    id: "teen",
    label: "Teen health",
    match: /\b(teen\w*|adolescen\w*|daughter|first period|puberty|school girl)\b/i,
    doctors: /gyn/i,
    page: { href: "/services/adolescent-health", label: "Teen health" },
    blurb: "Private, gentle consultations for young women on periods, puberty, skin and hormones.",
  },
  {
    id: "male",
    label: "Men's health",
    match: /\b(husband|male partner|sperm|semen|urolog\w*|androlog\w*|erect\w*|male fertility)\b/i,
    doctors: /urolog|androl/i,
    blurb: "Male partners can see our urologist and andrologist for fertility and urological concerns.",
  },
  {
    id: "yoga",
    label: "Yoga therapy",
    match: /\b(yoga)\b/i,
    doctors: /yoga/i,
    blurb: "Our yoga therapist offers therapeutic yoga, including prenatal and postnatal sessions.",
  },
  {
    id: "health-check",
    label: "Women's health check & Pap smear",
    match: /\b(pap ?smear|cervical\s*(?:cancer|screen\w*)|hpv test|breast exam|health check|well[- ]?woman)\b/i,
    doctors: /gyn/i,
    page: { href: "/services/womens-health-check", label: "Women's health check & Pap smear" },
    blurb: "Preventive women's health checks, Pap smears and cervical screening are carried out in clinic by our gynaecologists.",
  },
  {
    id: "gynaecology",
    label: "Periods and gynaecology",
    match: /\b(gyn\w*|periods?|menstru\w*|irregular|discharge|fibroids?|endometriosis|adenomyosis|cramps|contracepti\w*|iud|cyst|uti|itching|infection|bleeding between|spotting|vaginal)\b/i,
    doctors: /gyn/i,
    page: { href: "/services/obgyn-consults", label: "Gynaecology" },
    blurb: "Our gynaecologists see periods, pain, discharge, contraception and any cycle concern you want to talk through.",
  },
];

function findArea(text: string) {
  return AREAS.find((area) => area.match.test(text)) ?? null;
}

function areaFromChip(text: string) {
  const t = text.trim().toLowerCase();
  return AREAS.find((area) => area.label.toLowerCase() === t) ?? null;
}

const rupees = (n: number) => `₹${n.toLocaleString("en-IN")}`;

function doctorsFor(area: Area, ctx: ChatContext, limit = 4): ChatListItem[] {
  return ctx.doctors
    // The pelvic physiotherapist's speciality reads "Obstetrics and
    // Gynaecology Physiotherapy": list her only under pelvic floor.
    .filter((d) => area.doctors.test(d.speciality) && (area.id === "physio" || !/physio/i.test(d.speciality)))
    .slice(0, limit)
    .map((d) => ({
      title: d.name,
      meta: `${d.speciality} · ${rupees(d.fee)} · ${d.durationMinutes} min`,
      href: d.bookingUrl,
      cta: "Book",
      external: true,
    }));
}

/* -------------------------------------------------------------- FAQ search */

const STOP = new Set(
  "a an and are am at be can could do does for from have how i if in is it its me my of on or our should so that the their there this to was we what when where which who why will with you your mystree get any about after before".split(
    " ",
  ),
);

const tokens = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9₹\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP.has(w))
    .map((w) => w.replace(/(ies|es|s|ing|ed)$/, ""));

const FAQ_INDEX = FAQ_TOPICS.flatMap((topic) =>
  topic.entries.map((entry) => ({ ...entry, topic: topic.label, q: new Set(tokens(entry.question)), a: new Set(tokens(entry.answer)) })),
);

function searchFaq(text: string) {
  const words = tokens(text);
  if (!words.length) return null;
  let best: (typeof FAQ_INDEX)[number] | null = null;
  let bestScore = 0;
  for (const item of FAQ_INDEX) {
    let score = 0;
    for (const w of words) {
      if (item.q.has(w)) score += 2;
      else if (item.a.has(w)) score += 0.5;
    }
    const normalised = score / Math.max(2, words.length);
    if (normalised > bestScore) {
      bestScore = normalised;
      best = item;
    }
  }
  return best && bestScore >= 0.9 ? best : null;
}

const isQuestion = (text: string) =>
  /\?|^(what|how|why|when|is|are|can|could|do|does|should|which|will|am)\b/i.test(text.trim());

/* ----------------------------------------------------------------- intents */

const has = (re: RegExp, text: string) => re.test(text);

function feeSummary(ctx: ChatContext): ChatListItem[] {
  const groups: { label: string; re: RegExp; href?: string }[] = [
    { label: "Gynaecology and pregnancy", re: /gyn|obstet/i, href: "/services/obgyn-consults" },
    { label: "Reproductive medicine", re: /fertil|reproduct/i, href: "/services/fertility-clinic" },
    { label: "Dermatology", re: /derma/i, href: "/services/dermatology" },
    { label: "Nutrition", re: /nutri|diet/i, href: "/services/nutrition-counselling" },
    { label: "Pelvic physiotherapy", re: /physio/i, href: "/services/pelvic-floor-physiotherapy" },
    { label: "Psychology", re: /psycholog/i, href: "/services/psychology" },
    { label: "Psychiatry", re: /psychiat/i, href: "/services/psychology" },
    { label: "Yoga therapy", re: /yoga/i },
    { label: "Urology and andrology", re: /urolog|androl/i },
  ];
  // Most specific first, so "Obstetrics and Gynaecology Physiotherapy" counts
  // as physiotherapy and "High Risk Obstetrician" counts as gynaecology.
  const evaluation = [4, 6, 5, 3, 2, 8, 7, 0, 1];
  const used = new Set<number>();
  const rows: (ChatListItem & { order: number })[] = [];
  for (const index of evaluation) {
    const g = groups[index];
    const ds = ctx.doctors.filter((d) => !used.has(d.id) && g.re.test(d.speciality));
    if (!ds.length) continue;
    ds.forEach((d) => used.add(d.id));
    const fees = ds.map((d) => d.fee);
    const mins = [...new Set(ds.map((d) => d.durationMinutes))].sort((a, b) => a - b);
    const lo = Math.min(...fees);
    const hi = Math.max(...fees);
    rows.push({
      title: g.label,
      meta: `${lo === hi ? rupees(lo) : `${rupees(lo)} to ${rupees(hi)}`} · ${mins.join(" or ")} min`,
      href: g.href ?? BOOK,
      cta: g.href ? "View" : "Book",
      order: index,
    });
  }
  return rows.sort((a, b) => a.order - b.order).map(({ order: _order, ...row }) => row);
}

function areaReply(area: Area, text: string, ctx: ChatContext): BotReply {
  // A FAQ answer is added only when it is about the same topic, and never for
  // "which doctor" questions (the doctor list is the answer there).
  const asksWho = /which doctor|who should i see|specialist|doctor for/i.test(text);
  const found = isQuestion(text) && !asksWho ? searchFaq(text) : null;
  const faq = found && area.match.test(found.question) ? found : null;
  const list = doctorsFor(area, ctx);
  const reply: BotReply = {
    intent: `area_${area.id}`,
    text: faq ? [faq.answer, area.blurb] : [area.blurb],
    list: list.length ? list : undefined,
    actions: [
      ...(area.page ? [{ label: area.page.label, href: area.page.href, icon: "link" } as ChatAction] : []),
      list.length ? A.whatsapp : A.book,
    ],
  };
  if (list.length) reply.text.push(`You can book ${list.length === 1 ? "directly" : "any of them"} below; fees and visit length are live from our booking system.`);
  return reply;
}

export function respond(raw: string, ctx: ChatContext): BotReply {
  const text = raw.trim();

  const emergency = emergencyReply(text);
  if (emergency) return emergency;

  const chipArea = areaFromChip(text);
  if (chipArea) return areaReply(chipArea, text, ctx);

  if (/^(hi+|hello|hey|hii+|namaste|good (morning|afternoon|evening))\b[\s!.]*$/i.test(text)) {
    return { intent: "greeting", text: ["Hello! I can help with booking, timings, fees, doctors and common questions. What would you like to know?"], chips: START_CHIPS };
  }
  if (/^(thanks?|thank you|thx|ok(ay)?|great|cool|done)\b/i.test(text)) {
    return { intent: "thanks", text: ["You're welcome. Is there anything else I can help with?"], chips: ["Book an appointment", "Talk to the care team"] };
  }

  if (has(/which doctor|who should i see|right doctor|find (a|the right) (doctor|specialist)|specialist for/i, text) && !findArea(text)) {
    return { intent: "which_doctor", text: ["Tell me what you'd like help with and I'll match you with the right doctor or clinician."], chips: AREA_CHIPS };
  }

  if (has(/\b(cancel\w*|reschedul\w*|postpone|change (my )?(appointment|booking|slot))\b/i, text)) {
    return {
      intent: "cancel",
      text: [
        "You can manage your booking in the booking system, or message the care team and they'll change it for you.",
        "Cancellation and refund terms are shown for each clinician when you book.",
      ],
      actions: [{ label: "My appointments", href: "https://my-stree.com/booking/my-appointments", icon: "book", external: true }, A.whatsapp],
    };
  }

  if (has(/\b(human|real person|someone|staff|receptionist|call me|call back|callback|talk to|speak to|contact|phone number|whatsapp|email)\b/i, text)) {
    return {
      intent: "human",
      text: [`Our care team replies on WhatsApp and phone, ${HOURS}`, `Phone and WhatsApp: ${clinic.telephoneDisplay}. Email: ${clinic.email}.`],
      actions: [A.whatsapp, A.call],
    };
  }

  const area = findArea(text);
  const wantsFees = has(/\b(fees?|cost\w*|price\w*|charges?|how much|rupees|rs\.?|₹)/i, text);

  if (wantsFees && !area) {
    const rows = feeSummary(ctx);
    return {
      intent: "fees",
      text: rows.length
        ? ["Consultation fees by specialty (live from our booking system). The exact fee is shown before you confirm a booking."]
        : ["Consultation fees depend on the doctor, from about ₹600 to ₹1,500; most gynaecology and pregnancy consultations are ₹700. The exact fee is shown before you confirm."],
      list: rows.length ? rows : undefined,
      actions: [A.book],
      chips: ["Care packages", "How do I pay?"],
    };
  }

  if (area) return areaReply(area, text, ctx);

  if (has(/\b(book\w*|appointment\w*|slot\w*|schedule|consult(ation)? (today|tomorrow)|available (today|tomorrow)|visit)\b/i, text)) {
    return {
      intent: "book",
      text: [
        "Book online and pick your doctor and a live time slot, or ask the care team to book for you on WhatsApp.",
        "Not sure who to see? Tell me what you need help with.",
      ],
      actions: [A.book, A.whatsapp],
      chips: ["Which doctor should I see?", "Consultation fees"],
    };
  }

  if (has(/\b(timings?|hours|open\w*|clos(e|ed|ing)|sunday|saturday|holiday|what time|working days)\b/i, text) || has(/timings and address/i, text)) {
    const withAddress = has(/address|where|location/i, text);
    return {
      intent: "hours",
      text: [`We're open ${HOURS}`, ...(withAddress ? [`MyStree, ${clinic.streetAddress}, ${clinic.city} ${clinic.postalCode}. A short distance from 100 Feet Road.`] : [])],
      actions: withAddress ? [A.map, A.call] : [A.book, A.call],
    };
  }

  if (has(/\b(where|address|location|located|direction\w*|map|reach|parking|landmark|metro|how to come)\b/i, text)) {
    return {
      intent: "location",
      text: [
        `MyStree, ${clinic.streetAddress}, ${clinic.city} ${clinic.postalCode}.`,
        "A short distance from 100 Feet Road, easy to reach from Domlur, Jeevan Bhima Nagar, HAL and Old Airport Road.",
      ],
      actions: [A.map, A.call],
    };
  }

  if (has(/\b(video|online consult\w*|tele\w*|virtual|remote|from home)\b/i, text)) {
    const faq = searchFaq("Can I see a doctor online?");
    return { intent: "video", text: [faq?.answer ?? "Video consultations are available for many concerns."], actions: [A.book] };
  }

  if (has(/\b(packages?|plans?|bundle|offers?|mirena|hormonal iud|care journey|bloom|mtp|abortion|terminat\w*)\b/i, text)) {
    const wantsMtp = has(/\b(mtp|abortion|terminat\w*)\b/i, text);
    const pkgs = ctx.packages.filter((p) => (wantsMtp ? p.slug === "mtp-care" : p.slug !== "mtp-care"));
    return {
      intent: wantsMtp ? "packages_mtp" : "packages",
      text: wantsMtp
        ? ["MyStree offers confidential MTP care under the MTP Act, with a gynaecologist consultation, scans and follow-up. Your doctor explains your options first."]
        : ["Our care packages bring planned care together at one clear price:"],
      list: pkgs.map((p) => ({ title: p.name, meta: `${p.priceDisplay} · ${p.priceFor}`, href: `/packages/${p.slug}`, cta: "View" })),
      actions: [A.whatsapp],
    };
  }

  if (has(/\b(pay\w*|upi|card|cash|gpay)\b/i, text)) {
    return { intent: "payment", text: [searchFaq("How do I pay?")?.answer ?? "You can pay online or at the clinic."] };
  }
  if (has(/\b(insurance|cashless|claim|mediclaim|tpa|reimburse\w*)\b/i, text)) {
    return { intent: "insurance", text: [searchFaq("Will my health insurance cover the visit?")?.answer ?? ""], actions: [A.whatsapp] };
  }
  if (has(/\b(services?|treat\w*|what do you (do|offer)|specialit\w*|departments?)\b/i, text)) {
    return {
      intent: "services",
      text: ["We care for women at every stage of life, in one clinic in Indiranagar. Choose an area to see the right doctor or clinician:"],
      chips: AREA_CHIPS,
    };
  }

  const faq = searchFaq(text);
  if (faq) {
    return {
      intent: "faq",
      text: [faq.answer],
      actions: [{ label: "More answers", href: "/faqs", icon: "link" }],
      chips: ["Book an appointment", "Talk to the care team"],
    };
  }

  return {
    intent: "fallback",
    text: [
      "I don't have a reliable answer to that here, and I can't give medical advice in this chat.",
      `Our care team can help on WhatsApp or by phone: ${HOURS}`,
    ],
    actions: [{ ...A.whatsapp, label: "Ask on WhatsApp", href: whatsappWith(`Hello MyStree, ${text}`) }, A.call],
    chips: ["Which doctor should I see?", "Book an appointment"],
  };
}

export const WELCOME: BotReply = {
  intent: "welcome",
  text: [
    "Hi, I'm the MyStree assistant. I can help you book, find the right doctor, and answer common questions.",
    "I can't give medical advice. In an emergency, call 112.",
  ],
  chips: START_CHIPS,
};
