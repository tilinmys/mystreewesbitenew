import Image from "next/image";

import { ServiceAccordion, type AccordionItem } from "./service-accordion";
import styles from "./service-questions.module.css";

/*
 * ServiceQuestions — LOCKED. Section 08 of every /services/* page.
 *
 * The local questions women actually search before choosing a clinic,
 * answered in full in an accordion beside an image, on Uranian Mist.
 *
 * The list is the shared ServiceAccordion (native <details>, every answer
 * in the server HTML). The page's FAQPage schema mirrors these questions —
 * keep the two in step.
 *
 * Answers lead with the direct answer in the first sentence, then the
 * detail — the shape answer engines quote.
 *
 * Differences from the reference, deliberately: the heading sits left above
 * the accordion rather than centred over the page, the image is a 4:5
 * portrait held in view while the answers scroll, and the toggle is a drawn
 * plus that turns into a minus.
 */

export type ServiceQuestion = AccordionItem;

export type ServiceQuestionsProps = {
  heading: string;
  questions: readonly ServiceQuestion[];
  image?: { src: string; alt: string };
  headingId?: string;
};

export function ServiceQuestions({
  heading,
  questions,
  image,
  headingId = "service-questions-heading",
}: ServiceQuestionsProps) {
  return (
    <section className={styles.section} aria-labelledby={headingId}>
      <div className={styles.inner}>
        <div className={styles.media}>
          {image ? (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 26rem, (min-width: 640px) 40rem, 100vw"
              className={styles.image}
            />
          ) : (
            <div className={styles.placeholder} aria-hidden="true" />
          )}
        </div>

        <div className={styles.copy}>
          <h2 id={headingId} className={styles.heading}>
            {heading}
          </h2>
          <ServiceAccordion items={questions} className={styles.list} />
        </div>
      </div>
    </section>
  );
}
