import Image from "next/image";
import Link from "next/link";

import { plainText, sanitizeHtml, type CmsBlock } from "@/lib/cms";
import type { Doctor } from "@/lib/doctors";
import styles from "./blog-article.module.css";

/*
 * BlogArticle — renders a dashboard post's content blocks (/blog/[slug]).
 *
 * Every block type the admin dashboard can produce has a renderer:
 * heading, paragraph, pullquote, factstrip, comparisonboxes, faq, cta and
 * doctorprofile. Unknown types are skipped, so a new dashboard block never
 * breaks a page. Text passes through sanitizeHtml() (lib/cms.ts): the
 * editor's inline fonts, sizes and colours are dropped in favour of the blog
 * palette (color.md, "Blog Editorial Page").
 *
 * Search and answer engines: headings are real <h2>s with ids (and feed the
 * "On this page" list), FAQ answers are always in the HTML rather than
 * hidden behind a toggle, and fact strips and comparisons are lists.
 *
 * Doctor profiles use the site's own doctor records, not the booking
 * system's bio, which carries patient ratings (NMC notice, 06.10.2026).
 */

export type ArticleHeading = { id: string; text: string };

export function headingId(text: string) {
  return (
    plainText(text)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 80) || "section"
  );
}

/** The post's section headings, in order, with unique ids. */
export function articleHeadings(blocks: readonly CmsBlock[]): ArticleHeading[] {
  const used = new Map<string, number>();
  return blocks.flatMap((block) => {
    const raw = block.type === "heading" ? block.text : block.type === "faq" ? block.sectionTitle : undefined;
    if (!raw) return [];
    const text = plainText(raw);
    const base = headingId(text);
    const count = used.get(base) ?? 0;
    used.set(base, count + 1);
    return [{ id: count ? `${base}-${count + 1}` : base, text }];
  });
}

type Props = {
  blocks: readonly CmsBlock[];
  /** Resolves a dashboard doctorId (booking-system id) to a site doctor. */
  doctorFor: (doctorId: number | string | undefined) => Doctor | undefined;
};

export function BlogArticle({ blocks, doctorFor }: Props) {
  const ordered = [...blocks].sort((a, b) => a.order - b.order);
  const headings = articleHeadings(ordered);
  let headingIndex = 0;

  return (
    <div className={styles.body}>
      {ordered.map((block) => {
        switch (block.type) {
          case "heading": {
            const heading = headings[headingIndex++];
            return (
              <h2 key={block.id} id={heading.id} className={styles.heading}>
                {heading.text}
              </h2>
            );
          }

          case "paragraph": {
            const html = sanitizeHtml(block.text);
            // A <div>: dashboard text can carry its own <p> and list tags,
            // which may not sit inside a <p>.
            return html ? <div key={block.id} className={styles.paragraph} dangerouslySetInnerHTML={{ __html: html }} /> : null;
          }

          case "pullquote":
            return (
              <blockquote key={block.id} className={styles.pullquote}>
                <div className={styles.pullquoteText} dangerouslySetInnerHTML={{ __html: sanitizeHtml(block.text) }} />
              </blockquote>
            );

          case "factstrip": {
            const facts = (block.facts ?? []).filter((fact) => fact.value || fact.description);
            if (!facts.length) return null;
            return (
              <section key={block.id} className={styles.facts} aria-label={plainText(block.label) || "Quick facts"}>
                {block.label ? <p className={styles.factsLabel}>{plainText(block.label)}</p> : null}
                <dl className={styles.factsGrid}>
                  {facts.map((fact, index) => (
                    <div key={`${block.id}-${index}`} className={styles.fact}>
                      <dt className={styles.factValue}>{plainText(fact.value)}</dt>
                      <dd className={styles.factText}>{plainText(fact.description)}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            );
          }

          case "comparisonboxes": {
            const sides = [block.left, block.right].filter(Boolean);
            return (
              <div key={block.id} className={styles.compare}>
                {sides.map((side, index) => (
                  <section key={index} className={index === 0 ? styles.compareBefore : styles.compareAfter}>
                    <h3 className={styles.compareLabel}>{plainText(side?.label)}</h3>
                    <ul className={styles.compareList}>
                      {(side?.text ?? "")
                        .split(/\n+/)
                        .map((line) => plainText(line))
                        .filter(Boolean)
                        .map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                    </ul>
                  </section>
                ))}
              </div>
            );
          }

          case "faq": {
            const items = (block.items ?? []).filter((item) => item.question && item.answer);
            if (!items.length) return null;
            const heading = block.sectionTitle ? headings[headingIndex++] : null;
            return (
              <section key={block.id} className={styles.faq} aria-labelledby={heading?.id}>
                {heading ? (
                  <h2 id={heading.id} className={styles.heading}>
                    {heading.text}
                  </h2>
                ) : null}
                {items.map((item, index) => (
                  <div key={`${block.id}-${index}`} className={styles.faqItem}>
                    <h3 className={styles.faqQuestion}>{plainText(item.question)}</h3>
                    <div className={styles.faqAnswer} dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.answer) }} />
                  </div>
                ))}
              </section>
            );
          }

          case "cta": {
            const href = block.buttonUrl && /^(https?:\/\/|\/)/.test(block.buttonUrl) ? block.buttonUrl : "/book";
            return (
              <aside key={block.id} className={styles.cta}>
                {block.heading ? <p className={styles.ctaHeading}>{plainText(block.heading)}</p> : null}
                {block.body ? <p className={styles.ctaBody}>{plainText(block.body)}</p> : null}
                <a href={href} className={`cta-book ${styles.ctaButton}`}>
                  {plainText(block.buttonText) || "Book a consultation"}
                </a>
              </aside>
            );
          }

          case "doctorprofile": {
            const doctor = doctorFor(block.doctorId);
            if (!doctor) return null;
            const bio = plainText(block.customBio) || doctor.bio;
            return (
              <aside key={block.id} className={styles.doctor} aria-label={`About ${doctor.name}`}>
                <div className={styles.doctorPhoto}>
                  <Image src={doctor.image} alt={doctor.name} fill sizes="6rem" className={styles.doctorImage} />
                </div>
                <div>
                  <p className={styles.doctorEyebrow}>About the author</p>
                  <p className={styles.doctorName}>
                    <Link href={`/doctors/${doctor.slug}`}>{doctor.name}</Link>
                  </p>
                  <p className={styles.doctorTitle}>{doctor.title}</p>
                  <p className={styles.doctorBio}>{bio}</p>
                </div>
              </aside>
            );
          }

          default:
            return null;
        }
      })}
    </div>
  );
}
