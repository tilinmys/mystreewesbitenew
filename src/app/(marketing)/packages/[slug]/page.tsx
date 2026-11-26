import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PackageTabs } from "@/components/packages/package-tabs";
import pkgStyles from "@/components/packages/package.module.css";
import { ServiceClosing } from "@/components/services/service-closing";
import { ServiceFaq } from "@/components/services/service-faq";
import styles from "@/components/services/service-page.module.css";
import { SITE_URL, clinic } from "@/lib/clinic";
import { PACKAGES, getPackage, type CarePackage } from "@/lib/packages";
import { CLINIC_ID, clinicNode, faqNode } from "@/lib/service-schema";

/*
 * Package pages — /packages/[slug], one template for every package in
 * lib/packages.ts (layout: package.module.css; writing rules: packages.ts).
 *
 * SEO / AEO / GEO, following Google Search Central:
 *   - a descriptive title and meta description per package, naming the
 *     service, the locality and the price
 *   - the answer first: the price and what it covers are in the opening
 *     paragraph, the price card, an "at a glance" definition list and the
 *     first FAQ, so a snippet or an AI answer can quote any of them
 *   - every tab panel is server-rendered and only `hidden`, so all of it is
 *     in the HTML Google indexes
 *   - structured data that matches the visible page: MedicalWebPage, a
 *     Service with an INR Offer and an OfferCatalog of the inclusions, the
 *     procedure it concerns, FAQPage and BreadcrumbList, all tied to the
 *     single clinic entity (/#clinic)
 *   - a visible "updated" date mirrored in dateModified
 */

const BOOK_HREF = "/book";

export const dynamicParams = false;

export function generateStaticParams() {
  return PACKAGES.map((pkg) => ({ slug: pkg.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pkg = getPackage((await params).slug);
  if (!pkg) return {};
  const url = `${SITE_URL}/packages/${pkg.slug}`;
  return {
    // The root layout appends "| MyStree".
    title: pkg.metaTitle,
    description: pkg.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: `${pkg.name}: ${pkg.priceDisplay}${pkg.priceNote ? ` ${pkg.priceNote}` : ""} | MyStree, Indiranagar`,
      description: pkg.metaDescription,
      url,
      type: "website",
      siteName: "MyStree Women's Health Clinic",
      images: [{ url: `${SITE_URL}${pkg.image.src}`, alt: pkg.imageAlt }],
    },
  };
}

function itemText(item: CarePackage["items"][number]) {
  return [item.detail, ...(item.points ?? [])].filter(Boolean).join(" ");
}

function structuredData(pkg: CarePackage) {
  const url = `${SITE_URL}/packages/${pkg.slug}`;
  const about: object[] = [];
  if (pkg.schema.procedure) about.push({ "@id": `${url}#procedure` });
  for (const node of pkg.schema.about ?? []) about.push({ "@type": node.type, name: node.name });

  return {
    "@context": "https://schema.org",
    "@graph": [
      clinicNode(),
      {
        "@type": "MedicalWebPage",
        "@id": `${url}#page`,
        url,
        name: `${pkg.metaTitle} | MyStree`,
        description: pkg.metaDescription,
        inLanguage: "en-IN",
        dateModified: pkg.updated,
        isPartOf: { "@id": CLINIC_ID },
        ...(about.length ? { about } : {}),
        mainEntity: { "@id": `${url}#package` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        primaryImageOfPage: `${SITE_URL}${pkg.image.src}`,
      },
      {
        "@type": "Service",
        "@id": `${url}#package`,
        name: pkg.name,
        description: `${pkg.tagline} ${pkg.leadStrong}${pkg.lead}`,
        serviceType: pkg.schema.serviceType,
        provider: { "@id": CLINIC_ID },
        areaServed: { "@type": "City", name: clinic.city, containsPlace: { "@type": "Place", name: clinic.locality } },
        offers: {
          "@type": "Offer",
          price: String(pkg.price),
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          url,
          seller: { "@id": CLINIC_ID },
          description: [pkg.priceNote, ...pkg.terms].filter(Boolean).join(". "),
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `What ${pkg.name} includes`,
          itemListElement: pkg.items.map((item) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: item.name, description: itemText(item) },
          })),
        },
      },
      ...(pkg.schema.procedure
        ? [
            {
              "@type": "MedicalProcedure",
              "@id": `${url}#procedure`,
              name: pkg.schema.procedure.name,
              ...(pkg.schema.procedure.alternateName ? { alternateName: pkg.schema.procedure.alternateName } : {}),
              ...(pkg.schema.procedure.howPerformed ? { howPerformed: pkg.schema.procedure.howPerformed } : {}),
            },
          ]
        : []),
      faqNode(`/packages/${pkg.slug}`, pkg.faqs),
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: pkg.name, item: url },
        ],
      },
    ],
  };
}

export default async function PackagePage({ params }: Props) {
  const pkg = getPackage((await params).slug);
  if (!pkg) notFound();
  const s = pkgStyles;

  const tabs = [
    {
      id: "included",
      label: pkg.itemsLabel,
      content: (
        <ul className={s.rows}>
          {pkg.items.map((item, index) => (
            <li key={item.name}>
              <details className={s.row} open={index === 0}>
                <summary>{item.name}</summary>
                {item.detail ? <p>{item.detail}</p> : null}
                {item.points ? (
                  <ul className={s.points}>
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                ) : null}
              </details>
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "how",
      label: "How it works",
      content: (
        <ol className={s.steps}>
          {pkg.steps.map((step) => (
            <li key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      ),
    },
    {
      id: "suits",
      label: pkg.suitsLabel,
      content: (
        <ul className={s.suits}>
          {pkg.suits.map((item) => (
            <li key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "terms",
      label: "Terms and conditions",
      content: (
        <div className={s.termsPanel}>
          {pkg.terms.map((term) => (
            <p key={term}>{term}</p>
          ))}
          {pkg.notices?.map((notice) => (
            <p key={notice}>{notice}</p>
          ))}
          <p>
            For the full terms, call or WhatsApp <a href={`tel:${clinic.telephone}`}>{clinic.telephoneDisplay}</a> or
            email <a href={`mailto:${clinic.email}`}>{clinic.email}</a> before you book.
          </p>
        </div>
      ),
    },
  ];

  return (
    <main className={`${styles.pageRoot} ${s.page}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(pkg)) }} />

      <section className={s.band} aria-labelledby="pkg-title">
        <div className={s.bandInner}>
          <div className={s.intro}>
            <nav aria-label="Breadcrumb">
              <ol className={s.crumbs}>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>Packages</li>
                <li aria-current="page">{pkg.name}</li>
              </ol>
            </nav>

            <h1 id="pkg-title" className={s.title}>
              {pkg.name}
            </h1>

            <ul className={s.chips} aria-label="Package details">
              {pkg.chips.map((chip) => (
                <li key={chip} className={s.chip}>
                  {chip}
                </li>
              ))}
              <li className={s.chip}>Updated {pkg.updatedDisplay}</li>
            </ul>

            <p className={s.lead}>
              {pkg.tagline} <strong>{pkg.leadStrong}</strong>
              {pkg.lead}
            </p>
          </div>

          <div className={s.figure}>
            <Image
              src={pkg.image.src}
              alt={pkg.imageAlt}
              width={pkg.image.width}
              height={pkg.image.height}
              priority
              quality={92}
              sizes="(max-width: 639px) 11rem, (max-width: 1023px) 13rem, 17rem"
            />
          </div>
        </div>
      </section>

      <div className={s.body}>
        <div className={s.bodyInner}>
          <aside className={s.side} aria-label="Price and booking">
            <div className={s.priceCard}>
              <p className={s.priceRow}>
                <span className={s.price}>{pkg.priceDisplay}</span>
                {pkg.priceNote ? <span className={s.priceNote}>{pkg.priceNote}</span> : null}
              </p>
              <p className={s.priceFor}>{pkg.priceFor}</p>
              <ul className={s.covers}>
                {pkg.items.map((item) => (
                  <li key={item.name}>{item.name.replace(/^0\d\s+/, "")}</li>
                ))}
              </ul>
              <div className={s.actions}>
                <Link href={BOOK_HREF} className="cta-book">
                  Book this package
                </Link>
                <a href={`tel:${clinic.telephone}`} className={s.call} aria-label={`Call the clinic on ${clinic.telephoneDisplay}`}>
                  Call the clinic
                </a>
              </div>
              <p className={s.terms}>{pkg.terms[0]}</p>
              {pkg.notices ? (
                <ul className={s.notices} aria-label="Important information">
                  {pkg.notices.map((notice) => (
                    <li key={notice}>{notice}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </aside>

          <div className={s.main}>
            <PackageTabs tabs={tabs} label={`${pkg.name} details`} />
          </div>
        </div>
      </div>

      <section className={s.glance} aria-labelledby="pkg-glance">
        <div className={s.glanceInner}>
          <div>
            <h2 id="pkg-glance" className={s.h2}>
              {pkg.glanceHeading}
            </h2>
            <p className={s.glanceLead}>{pkg.glanceLead}</p>
            <dl className={s.facts}>
              {pkg.facts.map((fact) => (
                <div key={fact.term}>
                  <dt>{fact.term}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className={s.glanceFigure} aria-hidden="true">
            <Image
              src={pkg.glanceImage.src}
              alt=""
              aria-hidden="true"
              width={pkg.glanceImage.width}
              height={pkg.glanceImage.height}
              quality={92}
              sizes="13rem"
            />
          </div>
        </div>
      </section>

      <section className={s.why} aria-labelledby="pkg-why">
        <span className={s.watermark} aria-hidden="true">
          mystree
        </span>
        <div className={s.whyInner}>
          <h2 id="pkg-why" className={s.h2}>
            {pkg.whyHeading}
          </h2>
          <ul className={s.stats}>
            {pkg.stats.map((stat) => (
              <li key={stat.label} className={s.stat}>
                <span className={s.statFigure}>{stat.figure}</span>
                <p className={s.statLabel}>{stat.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ServiceFaq
        headingId="pkg-faq-heading"
        heading={pkg.faqHeading}
        items={pkg.faqs}
        allLink={{ label: "All FAQs", href: "/faqs" }}
      />

      <ServiceClosing
        headingId="pkg-closing-heading"
        heading={pkg.closing}
        primary={{ label: "Book this package", href: BOOK_HREF }}
        secondary={{ label: "Meet our doctors", href: "/doctors" }}
      />
    </main>
  );
}
