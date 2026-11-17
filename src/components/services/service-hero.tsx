import Image from "next/image";
import Link from "next/link";

import styles from "./service-hero.module.css";

/*
 * ServiceHero — LOCKED. Section 01 of every /services/* page.
 *
 * Render it inside <ServiceBand>, which paints the wine gradient that the
 * hero and the quote beneath it share. The hero itself has no background.
 *
 * Deliberately sparse: a heading, one or two lines of lead, two actions and
 * a photograph. No breadcrumb, no eyebrow label, no badges. Everything added
 * above the heading competes with it; the page's BreadcrumbList structured
 * data still carries the trail for search engines.
 *
 * Server component, zero client JavaScript, and no entrance animation — on a
 * phone the H1 is usually the Largest Contentful Paint element, and fading
 * it in would delay LCP by the length of the fade.
 */

export type ServiceHeroProps = {
  title: string;
  /** One or two sentences. Lead with the direct answer to "what is this". */
  lead: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string; external?: boolean };
  /** Omit to render the reserved image frame. */
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
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h1 id={headingId} className={styles.title}>
            {title}
          </h1>

          <p className={styles.lead}>{lead}</p>

          <div className={styles.actions}>
            <Link href={primaryCta.href} className="cta-book">
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

        <div className={styles.media}>
          {image ? (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes="(min-width: 1024px) 28rem, (min-width: 640px) 40rem, 100vw"
              quality={90}
              className={styles.image}
            />
          ) : (
            /*
              Reserved image frame. Pass `image={{ src, alt }}` to fill it.
              The frame holds its ratio at every breakpoint, so the real
              photograph lands with zero layout shift.
            */
            <div className={styles.placeholder} aria-hidden="true" />
          )}
        </div>
      </div>
    </section>
  );
}
