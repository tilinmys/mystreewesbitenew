import { CountUp } from "./count-up";
import styles from "./service-facts.module.css";

/*
 * ServiceFacts — LOCKED. Section 12 of every /services/* page.
 *
 * A statement beside three facts about the clinic, each a figure and one
 * line. The reference fills this slot with outcome percentages ("89%
 * improved"); MyStree must not. The NMC Ethics Board notice of 06.10.2026
 * prohibits success and outcome claims, so every figure here is a verifiable
 * fact about how the clinic works — time, scope, accreditation — never what
 * happened to patients.
 *
 * Figures count up from zero as they scroll into view (CountUp); the real
 * value is what the server renders, so crawlers always read the true number.
 *
 * Differences from the reference: a short flame rule under the eyebrow
 * instead of a hand-drawn underline, hairlines between the facts, and the
 * figures set left so they read as a list rather than a scoreboard.
 */

export type ServiceFact = { figure: string; label: string };

export type ServiceFactsProps = {
  eyebrow: string;
  heading: string;
  facts: readonly ServiceFact[];
  headingId?: string;
};

export function ServiceFacts({ eyebrow, heading, facts, headingId = "service-facts-heading" }: ServiceFactsProps) {
  return (
    <section className={styles.section} aria-labelledby={headingId}>
      <div className={styles.inner}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2 id={headingId} className={styles.heading}>
            {heading}
          </h2>
        </div>
        <dl className={styles.facts}>
          {facts.map((fact) => (
            <div className={styles.fact} key={fact.label}>
              <dt className={styles.figure}>
                <CountUp value={fact.figure} />
              </dt>
              <dd className={styles.label}>{fact.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
