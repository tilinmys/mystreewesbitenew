"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";

import { useStillAfterMount } from "@/lib/use-lite-motion";
import styles from "./home-services-row.module.css";

/*
 * HomeServicesRow — Editorial Two-Band Framed Services Showcase on Pure White.
 *
 * Band 1 (Core 6 Services): Luminous MyStree Rose-Burgundy panel (#8E1B3A ->
 *   #6E0D28) inside a Pure White outer frame, holding 6 white-mat framed photo
 *   cards (3x2 desktop, 2x3 tablet & mobile) with concise titles, to-the-point
 *   subtitles, and circular Burgundy guide arrows.
 * Band 2 (Supporting 4 Specialties): Harmonized Warm Blush-Alabaster panel
 *   (#F4ECEE) directly underneath, holding 4 compact white cards (4 cols
 *   desktop, 2x2 tablet & mobile) with clear guide arrows.
 */

const CARD_EASE = [0.22, 1, 0.36, 1] as const;

type Service = {
  title: string;
  text: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
};

const PRIMARY_SERVICES: readonly Service[] = [
  {
    title: "Gynaecology",
    text: "Periods, pelvic scans & OBGYN",
    href: "/services/obgyn-consults",
    imageSrc: "/images/home/services/art-gynaecology-consultation.webp",
    imageAlt:
      "A smiling woman consulting face-to-face with a female gynaecologist in a warm sunlit room at MyStree clinic in Indiranagar",
  },
  {
    title: "Pregnancy care",
    text: "Antenatal & high-risk obstetrics",
    href: "/services/prenatal",
    imageSrc: "/images/home/services/art-pregnancy-care.webp",
    imageAlt:
      "A smiling expectant mother resting her hand on her baby bump beside a sunlit morning window",
  },
  {
    title: "PCOS & hormones",
    text: "Cycles, hormones & nutrition",
    href: "/clinics/pcos",
    imageSrc: "/images/home/services/art-pcos-care.webp",
    imageAlt:
      "A relaxed young woman smiling with a warm mug of herbal tea beside a wellness journal in soft daylight",
  },
  {
    title: "Menopause care",
    text: "Hot flushes, sleep & bone health",
    href: "/services/menopause",
    imageSrc: "/images/home/services/art-menopause-care.webp",
    imageAlt:
      "A serene woman in her fifties wearing a handloom cotton saree smiling warmly in gentle morning light",
  },
  {
    title: "Women's health check",
    text: "Annual review & Pap smear",
    href: "/services/womens-health-check",
    imageSrc: "/images/home/services/art-womens-health-check.webp",
    imageAlt:
      "A female doctor listening attentively to a smiling patient during an annual preventive women's health review",
  },
  {
    title: "Pelvic physiotherapy",
    text: "Bladder & postpartum recovery",
    href: "/services/pelvic-floor-physiotherapy",
    imageSrc: "/images/home/services/art-pelvic-floor-physiotherapy.webp",
    imageAlt:
      "A woman breathing calmly with a relaxed smile during a guided pelvic floor physiotherapy session",
  },
];

const SPECIALTY_SERVICES: readonly Service[] = [
  {
    title: "Nutrition counselling",
    text: "PCOS & pregnancy diet",
    href: "/services/nutrition-counselling",
    imageSrc: "/images/home/services/art-nutrition-counselling.webp",
    imageAlt:
      "Editorial burgundy ink illustration of a balanced Indian thali meal plate beside a clinical nutrition planner chart",
  },
  {
    title: "Skin & hair dermatology",
    text: "Acne, pigmentation & hair",
    href: "/services/dermatology",
    imageSrc: "/images/home/services/art-dermatology.webp",
    imageAlt:
      "Editorial burgundy ink illustration of a female dermatologist examining a woman's skin and hairline with a dermatoscope",
  },
  {
    title: "Adolescent & teen care",
    text: "Teens, puberty & cycles",
    href: "/services/adolescent-health",
    imageSrc: "/images/home/services/art-adolescent-health.webp",
    imageAlt:
      "Editorial burgundy ink illustration of a teenage girl and her mother consulting warmly with a female doctor",
  },
  {
    title: "Psychology & mental health",
    text: "Therapy & psychiatry",
    href: "/services/psychology",
    imageSrc: "/images/home/services/art-psychology.webp",
    imageAlt:
      "Editorial burgundy ink illustration of a calm therapist listening empathetically to a woman in a private counselling room",
  },
];

export function HomeServicesRow() {
  const still = useStillAfterMount();

  return (
    <section className={styles.section} id="services" aria-labelledby="services-row-heading">
      {/* Band 1: Core 6 Services on Luminous MyStree Rose-Burgundy inside Pure White */}
      <div className={styles.coreFrame}>
        <header className={styles.coreHead}>
          <p className={styles.coreEyebrow}>Core Clinical Care · Indiranagar</p>
          <h2 id="services-row-heading" className={styles.coreHeading}>
            From routine check-ups to pregnancy, bring your whole self to MyStree.
          </h2>
        </header>

        <ul className={styles.coreGrid} aria-label="Core women's health services">
          {PRIMARY_SERVICES.map((service, index) => (
            <motion.li
              key={service.href}
              className={styles.coreItem}
              initial={still ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={
                still
                  ? { duration: 0 }
                  : { duration: 0.52, delay: (index % 3) * 0.085, ease: CARD_EASE }
              }
            >
              <Link href={service.href} className={styles.polaroidCard}>
                <span className={styles.photoFrame}>
                  <Image
                    src={service.imageSrc}
                    alt={service.imageAlt}
                    fill
                    loading="eager"
                    decoding="async"
                    sizes="(max-width: 639px) 46vw, (max-width: 1023px) 46vw, 30vw"
                    quality={88}
                    className={styles.photo}
                  />
                </span>
                <span className={styles.polaroidFoot}>
                  <span className={styles.polaroidCopy}>
                    <h3 className={styles.polaroidTitle}>{service.title}</h3>
                    <span className={styles.polaroidSub}>{service.text}</span>
                  </span>
                  <span className={styles.guideCircle} aria-hidden="true">
                    <ChevronRight size={15} strokeWidth={2.3} />
                  </span>
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Band 2: Supporting 4 Specialties in a distinct harmonized Alabaster-Blush band */}
      <div className={styles.supportFrame}>
        <div className={styles.supportHead}>
          <div>
            <p className={styles.supportEyebrow}>Supporting Specialties</p>
            <p className={styles.supportLead}>
              Coordinated nutrition, skin, teen, and mental health care in the same clinic.
            </p>
          </div>
          <Link href="/doctors" className={styles.allDoctorsLink}>
            <span>Find the right doctor</span>
            <ArrowRight size={15} strokeWidth={1.9} aria-hidden="true" />
          </Link>
        </div>

        <ul className={styles.supportGrid} aria-label="Supporting specialist clinics">
          {SPECIALTY_SERVICES.map((service, index) => (
            <motion.li
              key={service.href}
              className={styles.supportItem}
              initial={still ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={
                still
                  ? { duration: 0 }
                  : { duration: 0.46, delay: index * 0.075, ease: CARD_EASE }
              }
            >
              <Link href={service.href} className={styles.supportCard}>
                <span className={styles.supportThumb}>
                  <Image
                    src={service.imageSrc}
                    alt={service.imageAlt}
                    fill
                    loading="eager"
                    decoding="async"
                    sizes="56px"
                    quality={88}
                    className={styles.supportPhoto}
                  />
                </span>
                <span className={styles.supportCopy}>
                  <h3 className={styles.supportTitle}>{service.title}</h3>
                  <span className={styles.supportText}>{service.text}</span>
                </span>
                <span className={styles.supportArrow} aria-hidden="true">
                  <ChevronRight size={15} strokeWidth={2.2} />
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
