import Image from "next/image";
import Link from "next/link";

import styles from "./service-steps.module.css";

/*
 * ServiceSteps — LOCKED. Section 11 of every /services/* page.
 *
 * "Four steps to your first visit": a numbered ordered list beside an image,
 * on Alabaster paper, ending in the booking pill. Written as a real ordered
 * list with a direct sentence per step, so answer engines can lift it whole
 * for "how do I book a gynaecologist in Indiranagar".
 *
 * Differences from the reference: numerals in Fraunces wine rather than tiny
 * grey labels, the step title and its sentence set as one clear unit, and
 * the image as a 4:5 portrait aligned to the list rather than a small
 * landscape floating beside it.
 */

export type ServiceStep = { title: string; text: string };

export type ServiceStepsProps = {
  heading: string;
  steps: readonly ServiceStep[];
  cta: { label: string; href: string };
  image?: { src: string; alt: string };
  headingId?: string;
};

export function ServiceSteps({ heading, steps, cta, image, headingId = "service-steps-heading" }: ServiceStepsProps) {
  return (
    <section className={styles.section} data-svc-band="steps" aria-labelledby={headingId}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h2 id={headingId} className={styles.heading}>
            {heading}
          </h2>
          <ol className={styles.steps}>
            {steps.map((step, index) => (
              <li className={styles.step} key={step.title}>
                <span className={styles.number} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className={styles.title}>{step.title}</h3>
                  <p className={styles.text}>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className={styles.action}>
            <Link href={cta.href} className="cta-book">
              {cta.label}
            </Link>
          </div>
        </div>

        <div className={styles.media}>
          {image ? (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 28rem, (min-width: 640px) 40rem, 100vw"
              quality={90}
              className={styles.image}
            />
          ) : (
            <div className={styles.placeholder} aria-hidden="true" />
          )}
        </div>
      </div>
    </section>
  );
}
