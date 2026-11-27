import Image from "next/image";
import Link from "next/link";

import styles from "./service-hero.module.css";

/*
 * ServiceHero — Section 01 of every /services/* and /clinics/* page.
 *
 * Full-bleed gently faded editorial background artwork behind dead-centered
 * Fraunces 400 display typography, readable lead copy, and balanced primary +
 * secondary actions. Calibrated radial alabaster veil maintains > 11:1 AAA
 * contrast over both flat vector illustrations and clinical photography.
 *
 * Server component, zero client JavaScript, zero opacity-0 entrance delay so
 * LCP fires immediately on both desktop and mobile.
 */

export type ServiceHeroProps = {
  title: string;
  /** One or two sentences. Lead with the direct answer to "what is this". */
  lead: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string; external?: boolean };
  /** Background editorial illustration or photograph. */
  image?: { src: string; alt: string };
  headingId?: string;
};

export function ServiceHero({
  title,
  lead,
  primaryCta,
  secondaryCta,
  image,
  headingId = "service-hero-heading",
}: ServiceHeroProps) {
  return (
    <section className={styles.hero} aria-labelledby={headingId}>
      <div className={styles.bgMedia} aria-hidden="true">
        {image ? (
          <Image
            src={image.src}
            alt=""
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            quality={88}
            className={styles.bgImage}
          />
        ) : (
          <div className={styles.placeholder} />
        )}
      </div>

      <div className={styles.bgVeil} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.copy}>
          <h1 id={headingId} className={styles.title}>
            {title}
          </h1>

          <p className={styles.lead}>{lead}</p>

          <div className={styles.actions}>
            <Link href={primaryCta.href} className={`cta-book ${styles.primaryBtn}`}>
              {primaryCta.label}
            </Link>
            {secondaryCta ? (
              <a
                className={styles.secondary}
                href={secondaryCta.href}
                {...(secondaryCta.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {secondaryCta.label}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
