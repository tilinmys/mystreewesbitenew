"use client";

import { useState } from "react";
import type { FaqTopic, FaqTopicId } from "@/lib/faq-hub";
import styles from "./faq-topics.module.css";

/**
 * /faqs section 2 (after the Oula reference): a "Topics" index on the left,
 * a large serif accordion on the right.
 *
 * Every topic and every answer is rendered into the HTML; choosing a topic
 * only hides the other groups, so search and answer engines read the full
 * set whatever the visitor selects. Answers use native <details>, which
 * opens on find-in-page and needs no script.
 */
export function FaqTopics({ topics }: { topics: readonly FaqTopic[] }) {
  const [active, setActive] = useState<FaqTopicId | "all">("all");

  const options = [{ id: "all" as const, label: "All" }, ...topics.map(({ id, label }) => ({ id, label }))];

  return (
    <section className={styles.section} aria-label="Frequently asked questions">
      <div className={styles.inner}>
        <nav className={styles.index} aria-labelledby="faq-topics-title">
          <h2 id="faq-topics-title" className={styles.indexTitle}>
            Topics
          </h2>
          <ul className={styles.topicList}>
            {options.map((option) => (
              <li key={option.id}>
                <button
                  type="button"
                  className={styles.topic}
                  aria-pressed={active === option.id}
                  onClick={() => setActive(option.id)}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.groups}>
          {topics.map((topic) => (
            <section
              key={topic.id}
              id={topic.id}
              className={styles.group}
              aria-labelledby={`faq-${topic.id}`}
              hidden={active !== "all" && active !== topic.id}
            >
              <h3 id={`faq-${topic.id}`} className={styles.groupTitle}>
                {topic.label}
              </h3>
              {topic.entries.map((entry) => (
                <details key={entry.question} className={styles.item}>
                  <summary className={styles.question}>
                    <span>{entry.question}</span>
                    <span className={styles.toggle} aria-hidden="true" />
                  </summary>
                  <p className={styles.answer}>{entry.answer}</p>
                </details>
              ))}
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
