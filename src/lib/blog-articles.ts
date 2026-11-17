/*
 * The card shape shared by the blog index (components/blog/blog-latest.tsx)
 * and the related-reading section on service pages. Articles themselves
 * come from the admin dashboard (lib/cms.ts, toArticle); the hard-coded
 * list that used to live here was retired on 16 Oct 2026.
 */

export interface ArticleItem {
  id: string;
  slug: string;
  category: string;
  title: string;
  author: string;
  publishedDate: string;
  updatedDate: string;
  image: string;
  timestamp: number;
  views: number;
}
