import type { ReactNode } from "react";

import styles from "./legal-page.module.css";

/*
 * LegalPage (23 Nov 2026): the shared layout for /privacy-policy and
 * /terms-and-conditions. A plain reading column with an "on this page" list,
 * numbered sections and the effective date. Root fonts and tokens only.
 */
export type LegalSection = { id: string; title: string; body: ReactNode };

export function LegalPage({
  title,
  intro,
  updated,
  sections,
}: {
  title: string;
  intro: ReactNode;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>MyStree legal</p>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.updated}>Last updated: {updated}</p>
          <div className={styles.intro}>{intro}</div>
        </header>

        <nav className={styles.toc} aria-label="On this page">
          <p className={styles.tocTitle}>On this page</p>
          <ol>
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.title}</a>
              </li>
            ))}
          </ol>
        </nav>

        <div className={styles.body}>
          {sections.map((section, i) => (
            <section key={section.id} id={section.id} className={styles.section} aria-labelledby={`${section.id}-h`}>
              <h2 id={`${section.id}-h`} className={styles.heading}>
                <span className={styles.number}>{i + 1}.</span> {section.title}
              </h2>
              {section.body}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
