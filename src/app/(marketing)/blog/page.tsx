import type { Metadata } from "next";
import { BlogHero } from "@/components/blog/blog-hero";
import { FeaturedBlogSlider } from "@/components/blog/featured-blog-slider";
import { BlogLatest } from "@/components/blog/blog-latest";
import { SITE_URL } from "@/lib/clinic";
import { assetUrl, authorName, formatDate, getPosts, plainText, toArticle, topicOf, type CmsPost } from "@/lib/cms";
import { getDoctors } from "@/lib/doctors-repository";

export const metadata: Metadata = {
  title: "The MyStree Take | Clinical Journal & Women's Health Science",
  description:
    "Diving deep into female biology, hormonal science, and clinical truths. Evidence-based perspectives from the clinicians at MyStree Clinic Indiranagar, Bangalore.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: "The MyStree Take | Clinical Journal & Women's Health Science",
    description:
      "Diving deep into female biology, hormonal science, and clinical truths. Evidence-based perspectives from MyStree Clinic.",
    url: `${SITE_URL}/blog`,
    type: "website",
  },
};

/*
 * Posts come from the admin dashboard (lib/cms.ts) and refresh every five
 * minutes, so a post published there appears here without a redeploy.
 */
export const revalidate = 300;

const blogSchema = (posts: readonly CmsPost[]) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Blog",
      "@id": `${SITE_URL}/blog#blog`,
      name: "The MyStree Take",
      description:
        "Diving deep into female biology, hormonal science, and clinical truths.",
      url: `${SITE_URL}/blog`,
      publisher: { "@id": `${SITE_URL}/#clinic` },
      blogPost: posts.map((post) => ({
        "@type": "BlogPosting",
        "@id": `${SITE_URL}/blog/${post.slug}#article`,
        url: `${SITE_URL}/blog/${post.slug}`,
        headline: plainText(post.title).slice(0, 110),
        datePublished: post.published_at ?? undefined,
        author: { "@type": "Person", name: authorName(post) },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "The MyStree Take",
          item: `${SITE_URL}/blog`,
        },
      ],
    },
  ],
});

export default async function BlogPage() {
  const [posts, doctors] = await Promise.all([getPosts(), getDoctors()]);
  const roleOf = (name: string) =>
    doctors.find((doctor) => doctor.name.toLowerCase().replace(/[^a-z]/g, "") === name.toLowerCase().replace(/[^a-z]/g, ""))
      ?.title ?? "MyStree clinician";
  const featured = posts.slice(0, 4).map((post) => {
    const label = plainText(post.hero_label);
    return {
      id: String(post.id),
      slug: post.slug,
      eyebrow: "MYSTREE TACKLES",
      title: plainText(post.title),
      author: authorName(post),
      authorRole: roleOf(authorName(post)),
      date: formatDate(post.published_at),
      readTime: post.reading_time_minutes ? `${post.reading_time_minutes} min read` : "",
      image: assetUrl(post.cover_image_medium_url || post.cover_image_url),
      topicTag: (label.split(/[·•|-]/).pop() ?? label).trim().toUpperCase(),
      category: topicOf(post),
    };
  });

  return (
    <main className="min-h-screen bg-[#FFFFFF]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema(posts)) }}
      />
      <BlogHero />
      <FeaturedBlogSlider posts={featured} />
      <BlogLatest articles={posts.map(toArticle)} />
    </main>
  );
}
