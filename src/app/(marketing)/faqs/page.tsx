import type { Metadata } from "next";
import { FaqHero } from "@/components/faqs/faq-hero";
import { FaqTopics } from "@/components/faqs/faq-topics";
import { FAQ_TOPICS } from "@/lib/faq-hub";
import { SITE_URL } from "@/lib/clinic";
import { CLINIC_ID, clinicNode, faqNode } from "@/lib/service-schema";

const PATH = "/faqs";
const TITLE = "Women's Health Questions, Answered";
const DESCRIPTION =
  "Straight answers to the questions women ask before a gynaecology visit: first visits, cost, PCOS, periods, pregnancy, fertility, menopause and more, from MyStree in Indiranagar, Bengaluru.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}${PATH}` },
  openGraph: {
    title: `${TITLE} | MyStree`,
    description: DESCRIPTION,
    url: `${SITE_URL}${PATH}`,
    siteName: "MyStree",
    locale: "en_IN",
    type: "website",
  },
};

const ALL_ENTRIES = FAQ_TOPICS.flatMap((topic) => topic.entries);

/**
 * One graph: the shared clinic entity (lib/service-schema.ts), the page, its
 * breadcrumb and the FAQ. The previous page declared a second clinic with a
 * different address and postcode; that node is gone.
 */
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    clinicNode(),
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}${PATH}#webpage`,
      url: `${SITE_URL}${PATH}`,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: "en-IN",
      isPartOf: { "@type": "WebSite", url: SITE_URL, name: "MyStree" },
      about: { "@id": CLINIC_ID },
      breadcrumb: { "@id": `${SITE_URL}${PATH}#breadcrumb` },
      mainEntity: { "@id": `${SITE_URL}${PATH}#faq` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}${PATH}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "FAQs", item: `${SITE_URL}${PATH}` },
      ],
    },
    faqNode(PATH, ALL_ENTRIES),
  ],
};

export default function FAQsPage() {
  return (
    <main className="mystree-page" id="main-content" style={{ overflowX: "clip" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <FaqHero />
      <FaqTopics topics={FAQ_TOPICS} />
    </main>
  );
}
