import styles from "./service-accordion.module.css";

/*
 * ServiceAccordion — the question-and-answer list shared by ServiceQuestions
 * (section 08) and ServiceFaq (section 13).
 *
 * Native <details>/<summary>, so every answer is in the server HTML whether
 * open or closed (search and answer engines read all of it), and keyboard,
 * screen reader and find-in-page support come from the browser. The toggle
 * is a drawn plus — two CSS hairlines — that turns into a minus.
 *
 * `cascade` turns on the CASCADE scroll animation (see the module CSS).
 */

export type AccordionItem = { question: string; answer: string };

export type ServiceAccordionProps = {
  items: readonly AccordionItem[];
  /** Index of the item open on load; -1 for none. */
  openIndex?: number;
  cascade?: boolean;
  className?: string;
};

export function ServiceAccordion({ items, openIndex = 0, cascade = false, className }: ServiceAccordionProps) {
  const listClass = [styles.list, cascade ? styles.cascade : "", className ?? ""].filter(Boolean).join(" ");
  return (
    <div className={listClass}>
      {items.map((item, index) => (
        <details className={styles.item} key={item.question} open={index === openIndex}>
          <summary className={styles.summary}>
            <h3 className={styles.question}>{item.question}</h3>
            <span className={styles.toggle} aria-hidden="true" />
          </summary>
          <p className={styles.answer}>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
