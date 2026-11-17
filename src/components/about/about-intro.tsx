import styles from "./about-intro.module.css";

/*
 * AboutIntro — the opening of /about. A single centred statement on
 * white: a tightly set sans headline and one paragraph beneath it, in the
 * composition of the supplied reference, with MyStree's own words, fonts and
 * colours. The founder's note (AboutFounder) follows it.
 *
 * The headline names the service and the place ("women's clinic in
 * Indiranagar", what people search); the paragraph opens with a plain entity
 * sentence ("MyStree is a women's health clinic on 13th Main Road,
 * Indiranagar, Bengaluru") so search and AI answers can quote it whole, then
 * states who works here and how.
 */
export function AboutIntro() {
  return (
    <section className={styles.section} aria-labelledby="about-heading">
      <div className={styles.inner}>
        <h1 id="about-heading" className={styles.title}>
          A women&apos;s clinic in Indiranagar that listens
        </h1>
        <p className={styles.lead}>
          MyStree is a women&apos;s health clinic on 13th Main Road, Indiranagar, Bengaluru. We care for women from
          their first period to menopause, and we give every consultation the time it needs.
        </p>
      </div>
    </section>
  );
}
