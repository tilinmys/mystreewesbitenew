import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogArticle, articleHeadings } from "@/components/blog/blog-article";
import { ServiceReading } from "@/components/services/service-reading";
import { SITE_URL } from "@/lib/clinic";
import {
  assetAbsoluteUrl,
  assetUrl,
  authorName,
  formatDate,
  getPost,
  getPosts,
  plainText,
  toArticle,
  topicOf,
  type CmsBlock,
  type CmsPost,
} from "@/lib/cms";
import type { Doctor } from "@/lib/doctors";
import { getDoctors } from "@/lib/doctors-repository";
import { CLINIC_ID, clinicianRef } from "@/lib/service-schema";
import styles from "./post.module.css";

/*
 * /blog/[slug] — a post from the admin dashboard (lib/cms.ts).
 *
 * Slugs are the dashboard's, which are also the previous my-stree.com
 * article URLs, so existing links and rankings carry over. Posts are built
 * at deploy, refreshed every five minutes, and new slugs published in the
 * dashboard render on first visit (dynamicParams).
 *
 * Search / AEO / GEO: the dashboard's SEO title and description; a
 * canonical URL; Open Graph article data; a visible byline linking to the
 * author's doctor profile with published and updated dates; "On this page"
 * jump links built from the headings; FAQ answers always in the HTML; and
 * JSON-LD for BlogPosting (author as the same Person @id the service pages
 * use, publisher as the clinic), FAQPage (only the FAQs shown) and
 * BreadcrumbList.
 */

export const revalidate = 300;
export const dynamicParams = true;

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getPosts()).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return {};
  const url = `${SITE_URL}/blog/${post.slug}`;
  const title = plainText(post.seo?.metaTitle) || plainText(post.title);
  const description = plainText(post.seo?.metaDescription) || plainText(post.excerpt);
  const image = assetAbsoluteUrl(post.cover_image_url, SITE_URL);
  return {
    // The root layout appends "| MyStree".
    title,
    description,
    alternates: { canonical: url },
    authors: [{ name: authorName(post) }],
    openGraph: {
      type: "article",
      url,
      title,
      description,
      siteName: "MyStree Women's Health Clinic",
      publishedTime: post.published_at ?? undefined,
      modifiedTime: post.updated_at ?? undefined,
      authors: [authorName(post)],
      images: image ? [{ url: image }] : undefined,
    },
  };
}

/* Booking-system ids whose site record carries an older booking link. */
const BOOKING_ID_OVERRIDES: Record<string, string> = { "7": "dr-jasmine-flora" };

function doctorResolver(doctors: readonly Doctor[]) {
  const byBookingId = new Map<string, Doctor>();
  for (const doctor of doctors) {
    const id = doctor.bookingUrl?.match(/appointment\/(\d+)/)?.[1];
    if (id) byBookingId.set(id, doctor);
  }
  for (const [id, slug] of Object.entries(BOOKING_ID_OVERRIDES)) {
    const doctor = doctors.find((item) => item.slug === slug);
    if (doctor) byBookingId.set(id, doctor);
  }
  return (doctorId: number | string | undefined) => (doctorId == null ? undefined : byBookingId.get(String(doctorId)));
}

/** "Dr. Smitha A.P" on the post to her record, ignoring dots and spacing. */
function doctorByName(doctors: readonly Doctor[], name: string) {
  const key = (value: string) => value.toLowerCase().replace(/[^a-z]/g, "");
  return doctors.find((doctor) => key(doctor.name) === key(name));
}

function structuredData(post: CmsPost, author: Doctor | undefined, blocks: readonly CmsBlock[]) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const faqs = blocks.flatMap((block) =>
    block.type === "faq" ? (block.items ?? []).filter((item) => item.question && item.answer) : [],
  );
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        mainEntityOfPage: url,
        url,
        headline: plainText(post.title).slice(0, 110),
        description: plainText(post.seo?.metaDescription) || plainText(post.excerpt),
        image: assetAbsoluteUrl(post.cover_image_url, SITE_URL) || undefined,
        datePublished: post.published_at ?? undefined,
        dateModified: post.updated_at ?? post.published_at ?? undefined,
        inLanguage: "en-IN",
        articleSection: plainText(post.hero_label) || undefined,
        keywords: plainText(post.seo?.keywords) || undefined,
        author: author
          ? { ...clinicianRef(author.slug, author.name), jobTitle: author.title }
          : { "@type": "Person", name: authorName(post) },
        publisher: { "@id": CLINIC_ID },
        isPartOf: { "@type": "Blog", "@id": `${SITE_URL}/blog#blog`, name: "The MyStree Take" },
      },
      ...(faqs.length
        ? [
            {
              "@type": "FAQPage",
              "@id": `${url}#faq`,
              mainEntity: faqs.map((item) => ({
                "@type": "Question",
                name: plainText(item.question),
                acceptedAnswer: { "@type": "Answer", text: plainText(item.answer) },
              })),
            },
          ]
        : []),
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "The MyStree Take", item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: plainText(post.title), item: url },
        ],
      },
    ],
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const [post, posts, doctors] = await Promise.all([getPost(slug), getPosts(), getDoctors()]);
  if (!post) notFound();

  const blocks = post.blocks ?? [];
  const headings = articleHeadings([...blocks].sort((a, b) => a.order - b.order));
  const author = doctorByName(doctors, authorName(post));
  const cover = assetUrl(post.cover_image_url);
  const published = formatDate(post.published_at);
  const updated = formatDate(post.updated_at);
  const related = posts.filter((item) => item.slug !== post.slug).slice(0, 3).map(toArticle);
  const authorProfiles = Object.fromEntries(doctors.map((doctor) => [doctor.name, `/doctors/${doctor.slug}`]));

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(post, author, blocks)) }}
      />

      <article className={styles.article}>
        <header className={styles.header}>
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/blog">The MyStree Take</Link>
          </nav>

          <p className={styles.topic}>{plainText(post.hero_label) || topicOf(post)}</p>
          <h1 className={styles.title}>{plainText(post.title)}</h1>
          {post.hero_subtitle ? <p className={styles.standfirst}>{plainText(post.hero_subtitle)}</p> : null}

          <p className={styles.byline}>
            By{" "}
            {author ? (
              <Link href={`/doctors/${author.slug}`} className={styles.author}>
                {author.name}
              </Link>
            ) : (
              <span className={styles.author}>{authorName(post)}</span>
            )}
            {author ? <span className={styles.role}>, {author.title}</span> : null}
          </p>
          <p className={styles.meta}>
            {published ? <time dateTime={post.published_at ?? undefined}>Published {published}</time> : null}
            {updated && updated !== published ? (
              <time dateTime={post.updated_at ?? undefined}>Updated {updated}</time>
            ) : null}
            {post.reading_time_minutes ? <span>{post.reading_time_minutes} min read</span> : null}
          </p>
        </header>

        {cover ? (
          <div className={styles.cover}>
            <Image src={cover} alt="" fill priority sizes="(min-width: 1100px) 64rem, 100vw" className={styles.coverImage} />
          </div>
        ) : null}

        <div className={styles.layout}>
          {headings.length > 2 ? (
            <nav aria-labelledby="toc-heading" className={styles.toc}>
              <p id="toc-heading" className={styles.tocTitle}>
                On this page
              </p>
              <ol>
                {headings.map((heading) => (
                  <li key={heading.id}>
                    <a href={`#${heading.id}`}>{heading.text}</a>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}

          <div className={styles.content}>
            <BlogArticle blocks={blocks} doctorFor={doctorResolver(doctors)} />

            <p className={styles.disclaimer}>
              This article is general information written by a MyStree clinician. It is not a substitute for a
              consultation about your own health. If you have urgent symptoms, go to the nearest hospital emergency
              department.
            </p>
          </div>
        </div>
      </article>

      {related.length ? (
        <ServiceReading
          headingId="post-related-heading"
          heading="More from The MyStree Take"
          articles={related}
          allLink={{ label: "All articles", href: "/blog" }}
          authorProfiles={authorProfiles}
        />
      ) : null}
    </main>
  );
}
