/*
 * Home page image slots (14 Nov 2026).
 *
 * Each slot names the file the page expects and an `alt` that doubles as the
 * brief for whoever makes the picture. Until the file is added, `ready` is
 * false and the page shows a labelled placeholder (or `fallback`, where one
 * exists). Drop the file at `src`, set `ready: true`, and it appears.
 *
 * Clinic photographs (exterior, rooms) must be real photographs of the
 * MyStree clinic, not generated images: a generated picture shown as the
 * clinic would misrepresent it (CCPA misleading-advertisement guidelines).
 * Lifestyle images (people, hands) may be generated or stock, with consent
 * and licences on file.
 */
export type ImageSlotData = {
  src: string;
  alt: string;
  width: number;
  height: number;
  ready: boolean;
  /** Shown while the slot is not ready. */
  fallback?: string;
};

export const HOME_IMAGES = {
  hero: {
    src: "/images/home/mystree-hero-hands-care.webp",
    alt: "Close-up of two women's hands, an older woman's hand resting gently in a younger woman's open palm, warm natural window light from the right, soft cotton sleeves in muted ivory and dusty rose, shallow depth of field, calm and intimate, no faces, documentary style",
    width: 2880,
    height: 1620,
    ready: false,
    fallback: "/images/hero/mystree-hero-everyday-desktop.webp",
  },
  heroMobile: {
    src: "/images/home/mystree-hero-hands-care-mobile.webp",
    alt: "Portrait crop of the same close-up of two women's hands resting together in warm window light, hands in the lower half of the frame, soft out-of-focus ivory background above",
    width: 1440,
    height: 2560,
    ready: false,
    fallback: "/images/hero/mystree-hero-everyday-mobile.webp",
  },
  clinic: {
    src: "/images/home/mystree-reception-indiranagar.webp",
    alt: "The reception at MyStree, 13th Main Road, Indiranagar, Bengaluru: a curved front desk before a mint-blue arched wall with the MyStree logo, a cushioned bench under a softly lit panel, a shelf of certificates and wooden chairs along the wall",
    width: 2458,
    height: 1536,
    ready: true,
  },
  generations: {
    src: "/images/home/mystree-women-every-stage-of-life.webp",
    alt: "A quiet sunlit corner in a home: a beige armchair with a dusty-blue linen shawl, a pair of hand-knitted baby booties and a steel cup on a small wooden side table, a potted plant beside it",
    width: 1228,
    height: 1536,
    ready: true,
    fallback: "/images/pregnancy-care-indiranagar-bengaluru.webp",
  },
  pkgCareJourney: {
    src: "/images/home/packages/package-care-journey-basic.webp",
    alt: "Product-style cutout on a transparent background: a woman's hand holding a cycle-tracking calendar card and a small MyStree appointment card, tilted slightly, soft studio light, no face",
    width: 800,
    height: 1000,
    ready: true,
  },
  pkgBloom: {
    src: "/images/home/packages/package-care-journey-bloom.webp",
    alt: "Product-style cutout on a transparent background: a neat stack of a care-plan booklet, an ultrasound appointment card and a small dried flower sprig, soft studio light",
    width: 800,
    height: 1000,
    ready: true,
  },
  pkgNutrition: {
    src: "/images/home/packages/package-nutrition-care.webp",
    alt: "Product-style cutout on a transparent background: a ceramic bowl of millet, dal and vegetables with a printed meal-plan card leaning against it, top-down soft studio light",
    width: 800,
    height: 1000,
    ready: true,
  },
  pkgIud: {
    src: "/images/home/packages/package-hormonal-iud-care.webp",
    alt: "Product-style cutout on a transparent background: a woman's hand holding a small white MyStree care card next to a folded information leaflet, soft studio light, no medical device shown",
    width: 800,
    height: 1000,
    ready: true,
  },
  careTeam: {
    src: "/images/home/packages/mystree-care-team-desk.webp",
    alt: "A MyStree care coordinator at the front desk smiling while speaking on the phone, a laptop and plants beside her, bright and welcoming reception, Indiranagar clinic",
    width: 900,
    height: 700,
    ready: true,
  },
  journeyBook: {
    src: "/images/home/journey/journey-book-a-visit.webp",
    alt: "Artisanal still life of a teak desk with appointment confirmation on smartphone, brass paperweight, MyStree linen card, brass pen and fresh white mogra blossoms in warm morning window light",
    width: 600,
    height: 450,
    ready: true,
  },
  journeyConsult: {
    src: "/images/home/journey/journey-consultation.webp",
    alt: "Calm consultation setting with two handcrafted ceramic teacups with rising steam, an open linen notebook, brass pen, mint water carafe, and pink lotus flower on teakwood table draped in dusty-rose khadi",
    width: 600,
    height: 450,
    ready: true,
  },
  journeyTests: {
    src: "/images/home/journey/journey-tests-and-scans.webp",
    alt: "Dignified clinical diagnostics still life with deep sanctuary burgundy linen portfolio, printed ultrasound scan in handmade envelope, golden sand hourglass, brass loupe, and fresh eucalyptus sprigs",
    width: 600,
    height: 450,
    ready: true,
  },
  journeyPlan: {
    src: "/images/home/journey/journey-care-plan.webp",
    alt: "Holistic care plan flat-lay with open linen wellness booklet on handmade paper, brass katori holding restorative Ayurvedic herbs, ceramic teacup with golden herbal infusion, and terracotta khadi textile",
    width: 600,
    height: 450,
    ready: true,
  },
  journeySupport: {
    src: "/images/home/journey/journey-ongoing-support.webp",
    alt: "Tranquil ongoing care still life with smartphone displaying a caring WhatsApp check-in on a blush waffle throw, brass saucer with fresh marigold blossom, terracotta desk clock, and ceramic mug in warm light",
    width: 600,
    height: 450,
    ready: true,
  },
  tourConsultation: {
    src: "/images/home/mystree-consultation-room-indiranagar.webp",
    alt: "A consultation room at MyStree, Indiranagar: a desk with two chairs facing each other, an examination couch behind a curtain, daylight from a window",
    width: 1600,
    height: 1000,
    ready: false,
  },
  tourScan: {
    src: "/images/home/mystree-ultrasound-room-indiranagar.webp",
    alt: "The ultrasound room at MyStree, Indiranagar: an examination couch, an ultrasound machine and a screen the patient can see, soft lighting",
    width: 1600,
    height: 1000,
    ready: false,
  },
  tourReception: {
    src: "/images/home/mystree-reception-indiranagar.webp",
    alt: "The reception at MyStree, 13th Main Road, Indiranagar, Bengaluru: a curved front desk before a mint-blue arched wall with the MyStree logo, a cushioned bench under a softly lit panel, a shelf of certificates and wooden chairs along the wall",
    width: 2458,
    height: 1536,
    ready: true,
  },
} satisfies Record<string, ImageSlotData>;
