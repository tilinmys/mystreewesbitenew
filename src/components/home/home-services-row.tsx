"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import styles from "./home-services-row.module.css";

/*
 * HomeServicesRow — High-Visibility Services Grid + Specialty Navigation Bar.
 *
 * Uses the cohesive bespoke Burgundy ink-and-watercolor editorial artworks
 * (16:9 for primary cards, 1:1 for supporting specialty thumbnails) so every
 * clinical service is immediately recognizable at a glance.
 */
type Service = {
  title: string;
  text: string;
  href: string;
  badge?: string;
  imageSrc: string;
  imageAlt: string;
  objectPosition?: string;
};

const PRIMARY_SERVICES: readonly Service[] = [
  {
    title: "Gynaecology consultation",
    text: "Periods, pain, discharge & screening with an OBGYN.",
    href: "/services/obgyn-consults",
    badge: "In clinic or video",
    imageSrc: "/images/home/services/art-gynaecology-consultation.webp",
    imageAlt:
      "Editorial burgundy ink illustration of a female gynaecologist consulting warmly with a woman patient across a clinic desk",
  },
  {
    title: "Pregnancy care",
    text: "Antenatal visits, scans & high-risk obstetric care.",
    href: "/services/prenatal",
    imageSrc: "/images/home/services/art-pregnancy-care.webp",
    imageAlt:
      "Editorial burgundy ink illustration of an expectant mother cradling her baby bump while a female obstetrician reviews an ultrasound scan",
  },
  {
    title: "PCOS & metabolic care",
    text: "Cycle, hormone & nutrition plans in one clinic.",
    href: "/clinics/pcos",
    imageSrc: "/images/home/services/art-pcos-care.webp",
    imageAlt:
      "Editorial burgundy ink illustration of a woman and doctor reviewing a menstrual cycle chart and hormone reports beside a balanced meal bowl",
  },
  {
    title: "Menopause support",
    text: "Hot flushes, sleep, mood & bone-health guidance.",
    href: "/services/menopause",
    imageSrc: "/images/home/services/art-menopause-care.webp",
    imageAlt:
      "Editorial burgundy ink illustration of a dignified woman in midlife speaking comfortably with a gynaecologist over a health plan",
  },
  {
    title: "Women's health check",
    text: "Annual gynaecology review, Pap smear & breast exam.",
    href: "/services/womens-health-check",
    imageSrc: "/images/home/services/art-womens-health-check.webp",
    imageAlt:
      "Editorial burgundy ink illustration of a stethoscope, blood-pressure cuff, and preventive screening checklist for an annual women's health check",
  },
  {
    title: "Pelvic floor physiotherapy",
    text: "Bladder control, pelvic pain & postpartum recovery.",
    href: "/services/pelvic-floor-physiotherapy",
    imageSrc: "/images/home/services/art-pelvic-floor-physiotherapy.webp",
    imageAlt:
      "Editorial burgundy ink illustration of a female physiotherapist guiding a woman in a restorative pelvic-bridge rehabilitation exercise on a mat",
  },
];

const SPECIALTY_SERVICES: readonly Service[] = [
  {
    title: "Nutrition counselling",
    text: "PCOS, pregnancy & thyroid",
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
    title: "Adolescent & teen health",
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
  return (
    <section className={styles.section} id="services" aria-labelledby="services-row-heading">
      <div className={styles.inner}>
        <div className={styles.head}>
          <div className={styles.headCopy}>
            <p className={styles.eyebrow}>All Women&rsquo;s Health Services</p>
            <h2 id="services-row-heading" className={styles.heading}>
              Comprehensive care, <em className={styles.accent}>under one roof.</em>
            </h2>
            <p className={styles.lead}>
              Select the service or concern you are looking for to see specialist doctors,
              consultation fees and next available slots.
            </p>
          </div>
          <Link href="/doctors" className={styles.findDoctorCta}>
            <span>Find the right doctor</span>
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>

        <ul className={styles.grid} aria-label="Core women's health services">
          {PRIMARY_SERVICES.map((service) => (
            <li key={service.href} className={styles.gridItem}>
              <Link href={service.href} className={styles.card}>
                <span className={styles.media}>
                  <Image
                    src={service.imageSrc}
                    alt={service.imageAlt}
                    fill
                    sizes="(max-width: 639px) 128px, (max-width: 1099px) 48vw, 31vw"
                    quality={90}
                    className={styles.photo}
                  />
                  {service.badge ? <span className={styles.badge}>{service.badge}</span> : null}
                </span>
                <span className={styles.cardBody}>
                  <h3 className={styles.title}>{service.title}</h3>
                  <span className={styles.text}>{service.text}</span>
                </span>
                <span className={styles.more}>
                  <span>View doctors &amp; slots</span>
                  <span className={styles.moreIcon} aria-hidden="true">
                    <ArrowUpRight size={13} strokeWidth={2} />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.specialtyBand}>
          <p className={styles.specialtyHeading}>Supporting specialists at Indiranagar clinic</p>
          <ul className={styles.specialtyGrid} aria-label="Additional specialist clinics">
            {SPECIALTY_SERVICES.map((service) => (
              <li key={service.href} className={styles.specialtyItem}>
                <Link href={service.href} className={styles.specialtyCard}>
                  <span className={styles.specialtyThumb}>
                    <Image
                      src={service.imageSrc}
                      alt={service.imageAlt}
                      fill
                      sizes="64px"
                      quality={90}
                      className={styles.photo}
                    />
                  </span>
                  <span className={styles.specialtyCopy}>
                    <span className={styles.specialtyTitle}>{service.title}</span>
                    <span className={styles.specialtyText}>{service.text}</span>
                  </span>
                  <ArrowUpRight size={15} strokeWidth={2} className={styles.specialtyArrow} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
