import Image from "next/image";
import Link from "next/link";

import type { ArticleItem } from "@/lib/blog-articles";
import styles from "./service-reading.module.css";

/*
 * ServiceReading — LOCKED. Section 14 of every /services/* page.
 *
 * Up to three related articles from The MyStree Take, chosen per service, with
 * the author named on each card — the clinicians writing in their own field
 * is the expertise signal search and answer engines weigh. Articles come
 * from the admin dashboard (lib/cms.ts), the same source as the blog index.
 *
 * The image and title link to the article; the author's name links to their
 * profile, as Google's guidance asks of bylines on health content. Authors
 * without a profile (`authorProfiles`) are shown as plain text.
 *
 * Differences from the reference: author and category on every card, a
 * warmer 4:3 image crop, and no "Read more" arrow: the title is the link.
 */

export type ServiceReadingProps = {
  heading: string;
  articles: readonly ArticleItem[];
  allLink: { label: string; href: string };
  /** Author name to profile path, e.g. "Dr. Smitha A.P" to "/doctors/dr-smitha-ap". */
  authorProfiles?: Readonly<Record<string, string>>;
  headingId?: string;
};

/** "Dr. A & Dr. B" to ["Dr. A", "Dr. B"]. */
function authorsOf(author: string) {
  return author.split("&").map((name) => name.trim()).filter(Boolean);
}

export function ServiceReading({
  heading,
  articles,
  allLink,
  authorProfiles = {},
  headingId = "service-reading-heading",
}: ServiceReadingProps) {
  // No matching posts in the dashboard: leave the section out.
  if (articles.length === 0) return null;

  return (
    <section className={styles.section} aria-labelledby={headingId}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 id={headingId} className={styles.heading}>
            {heading}
          </h2>
          <Link href={allLink.href} className={styles.all}>
            {allLink.label}
          </Link>
        </div>

        <ul className={styles.cards}>
          {articles.map((article) => (
            <li key={article.slug} className={styles.card}>
              <Link href={`/blog/${article.slug}`} className={styles.media} tabIndex={-1} aria-hidden="true">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 100vw"
                  className={styles.image}
                />
              </Link>
              <span className={styles.category}>{article.category.toLowerCase()}</span>
              <Link href={`/blog/${article.slug}`} className={styles.title}>
                {article.title}
              </Link>
              <span className={styles.author}>
                {authorsOf(article.author).map((name, index) => (
                  <span key={name}>
                    {index > 0 && " and "}
                    {authorProfiles[name] ? (
                      <Link href={authorProfiles[name]} className={styles.authorLink}>
                        {name}
                      </Link>
                    ) : (
                      name
                    )}
                  </span>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
