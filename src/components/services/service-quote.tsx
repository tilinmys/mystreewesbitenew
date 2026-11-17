import styles from "./service-quote.module.css";

/*
 * ServiceQuote — LOCKED. Section 02 of every /services/* page, rendered
 * inside <ServiceBand> beneath the hero.
 *
 * Quotes must be supplied verbatim from a verified source. Never paraphrase,
 * tidy or shorten a patient's words.
 *
 * Deliberately not a copy of the reference:
 *   - no star rating, no quotation-mark glyphs, no decorative symbols — the
 *     blockquote and the attribution are what mark it as a quote
 *   - set in the display serif rather than the body sans, so it continues
 *     the heading's voice instead of reading as a review widget
 *   - a single hairline above it in place of the stars
 *   - left-aligned on phones: a centred multi-line paragraph has a ragged
 *     edge on both sides and is measurably slower to read on a narrow
 *     screen; it centres from 640px up, where lines are short and even
 */

export type ServiceQuoteProps = {
  quote: string;
  name: string;
};

export function ServiceQuote({ quote, name }: ServiceQuoteProps) {
  return (
    <section className={styles.section} aria-label="A patient's experience">
      <figure className={styles.figure}>
        <span className={styles.rule} aria-hidden="true" />
        <blockquote className={styles.quote}>
          <p>{quote}</p>
        </blockquote>
        <figcaption className={styles.name}>{name}</figcaption>
      </figure>
    </section>
  );
}
