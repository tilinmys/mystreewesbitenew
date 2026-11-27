"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { clinic } from "@/lib/clinic";
import { useStillAfterMount } from "@/lib/use-lite-motion";
import styles from "./home-packages.module.css";

const CARD_EASE = [0.22, 1, 0.36, 1] as const;

export type PackageCard = {
  href: string;
  title: string;
  summary: string;
  price: string;
  interval: string;
  image: "pkgCareJourney" | "pkgBloom" | "pkgNutrition" | "pkgIud";
};

const PACKAGE_ART: Record<PackageCard["image"], { src: string; alt: string }> = {
  pkgCareJourney: {
    src: "/images/home/packages/art-care-journey-basic.webp",
    alt: "Editorial burgundy ink illustration of a stethoscope, ultrasound monitor, cycle planner notebook, and balanced meal bowl for Care Journey Basic",
  },
  pkgBloom: {
    src: "/images/home/packages/art-care-journey-bloom.webp",
    alt: "Editorial burgundy ink illustration of a woman framed by five clinical disciplines: gynaecology, ultrasound, nutrition, physiotherapy, and dermatology",
  },
  pkgNutrition: {
    src: "/images/home/packages/art-nutrition-plan.webp",
    alt: "Editorial burgundy ink illustration of a clinical nutritionist reviewing a structured three-month meal planner chart with a patient",
  },
  pkgIud: {
    src: "/images/home/packages/art-hormonal-iud-care.webp",
    alt: "Editorial burgundy ink illustration of a female gynaecologist discussing a hormonal IUD model calmly with a patient",
  },
};

const WHATSAPP_URL = `https://wa.me/${clinic.telephone.replace("+", "")}?text=${encodeURIComponent(
  "Hello MyStree, could you help me choose a care package?",
)}`;

export function HomePackagesView({ cards }: { cards: PackageCard[] }) {
  const still = useStillAfterMount();

  return (
    <section className={styles.section} id="packages" aria-labelledby="packages-heading">
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.intro}>
            <p className={styles.eyebrow}>Care Packages &amp; Programmes</p>
            <h2 id="packages-heading" className={styles.heading}>
              Planned care, at one <em className={styles.accent}>clear price.</em>
            </h2>
            <p className={styles.lead}>
              All-inclusive care packages and structured programmes with transparent pricing. Select
              any package below to view full clinical inclusions and book your visit.
            </p>
          </div>

          <div className={styles.art}>
            <Image
              src="/images/home/packages/reproductive-anatomy-engraving.webp"
              alt="Botanical engraving illustration representing women's reproductive health"
              fill
              loading="eager"
              decoding="async"
              sizes="(max-width: 767px) 100vw, 40vw"
              quality={88}
              className={styles.artImage}
            />
          </div>
        </div>

        <div className={styles.rowHead}>
          <p className={styles.kicker}>All 4 fixed-price care programmes</p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={styles.speak}>
            <span>Need help choosing? Ask our care team</span>
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>

        <ul className={styles.grid} aria-label="Care packages">
          {cards.map((card, index) => {
            const art = PACKAGE_ART[card.image];
            return (
              <motion.li
                key={card.href}
                className={styles.item}
                initial={still ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.14 }}
                transition={
                  still
                    ? { duration: 0 }
                    : { duration: 0.55, delay: index * 0.085, ease: CARD_EASE }
                }
              >
                <article className={styles.card}>
                  <Link href={card.href} className={styles.mediaWrap} aria-label={card.title}>
                    <Image
                      src={art.src}
                      alt={art.alt}
                      fill
                      loading="eager"
                      decoding="async"
                      sizes="(max-width: 639px) 100vw, (max-width: 1099px) 50vw, 25vw"
                      quality={88}
                      className={styles.photo}
                    />
                  </Link>

                  <div className={styles.cardBody}>
                    <div className={styles.titleBlock}>
                      <h3 className={styles.cardTitle}>
                        <Link href={card.href} className={styles.cardTitleLink}>
                          {card.title}
                        </Link>
                      </h3>
                      <p className={styles.cardSummary}>{card.summary}</p>
                    </div>

                    <div className={styles.pricingRow}>
                      <span className={styles.price}>{card.price}</span>
                      <span className={styles.interval}>{card.interval}</span>
                    </div>

                    <Link
                      href={card.href}
                      className={`cta-book is-small ${styles.cta}`}
                      aria-label={`Select ${card.title}, ${card.price} ${card.interval}`}
                    >
                      <span>Select Package</span>
                      <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
