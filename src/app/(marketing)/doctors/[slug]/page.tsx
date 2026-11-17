import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SITE_URL, clinic } from "@/lib/clinic";
import { doctorProfiles, type DoctorProfile } from "@/lib/doctor-profiles";
import type { Doctor } from "@/lib/doctors";
import { getDoctorBySlug, getDoctors } from "@/lib/doctors-repository";
import styles from "./doctor-profile.module.css";

/*
 * Clinician profile — /doctors/[slug].
 *
 * Layout follows the reference: portrait left, name with credentials, a
 * hairline, the role, then the full profile in plain paragraphs. Below the
 * narrative sit the facts a patient checks before booking (qualifications,
 * areas of care, languages, where they consult) and links to the services
 * this clinician's care belongs to.
 *
 * Search: ProfilePage structured data with a Person as mainEntity, per
 * Google's profile-page documentation, linked to the clinic entity; a
 * BreadcrumbList; descriptive internal links (Google's link guidance). Copy
 * comes from lib/doctor-profiles.ts, which only restates recorded facts.
 */

type Props = {
  params: Promise<{ slug: string }>;
};

/** When the profile copy was last reviewed. Update with each content edit. */
const PROFILE_REVIEWED = "2026-10-08";

const CLINIC_ADDRESS = "No. 3366, 13th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru 560008";

/** Credentials that are degrees or memberships, without the experience line. */
/** Seed photos are site paths; booking-system photos are already absolute. */
function absoluteImage(image: string) {
  return /^https?:\/\//.test(image) ? image : `${SITE_URL}${image}`;
}

function qualificationsOf(doctor: Doctor) {
  return doctor.credentials.filter((item) => !/years? experience/i.test(item));
}

function experienceOf(doctor: Doctor) {
  return doctor.credentials.find((item) => /years? experience/i.test(item));
}

/** Fallback for a backend clinician without long-form copy yet. */
function profileFor(doctor: Doctor): DoctorProfile {
  return (
    doctorProfiles[doctor.slug] ?? {
      role: doctor.title,
      paragraphs: [doctor.bio, doctor.background].filter((text): text is string => Boolean(text)),
      areasOfCare: [],
      relatedPages: [],
    }
  );
}

/** The first sentences of the profile, cut at a sentence boundary near 160 characters. */
function summaryOf(profile: DoctorProfile) {
  const sentences = profile.paragraphs[0].match(/[^.]+\.(\s|$)/g) ?? [profile.paragraphs[0]];
  let summary = "";
  for (const sentence of sentences) {
    if ((summary + sentence).trim().length > 160 && summary) break;
    summary += sentence;
  }
  return summary.trim();
}

export async function generateStaticParams() {
  const doctors = await getDoctors();
  return doctors.map((doctor) => ({ slug: doctor.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doctor = await getDoctorBySlug(slug);
  if (!doctor) return {};

  const profile = profileFor(doctor);
  const url = `${SITE_URL}/doctors/${doctor.slug}`;
  // The root layout appends "| MyStree".
  const title = `${doctor.name}, ${profile.role} in Indiranagar, Bengaluru`;
  const description = summaryOf(profile);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | MyStree`,
      description,
      url,
      images: [{ url: `${absoluteImage(doctor.image)}`, alt: `Portrait of ${doctor.name}` }],
      type: "profile",
    },
  };
}

export default async function DoctorProfilePage({ params }: Props) {
  const { slug } = await params;
  const doctor = await getDoctorBySlug(slug);
  if (!doctor) notFound();

  const profile = profileFor(doctor);
  const qualifications = qualificationsOf(doctor);
  const experience = experienceOf(doctor);
  const url = `${SITE_URL}/doctors/${doctor.slug}`;
  const bookingHref = doctor.bookingUrl ?? "/book";
  const firstName = doctor.name.replace(/^Dr\.\s*/, "").split(" ")[0];
  const headingSuffix = qualifications[0] ? `, ${qualifications[0]}` : "";

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${url}#page`,
        url,
        name: `${doctor.name}, ${profile.role}`,
        inLanguage: "en-IN",
        dateModified: PROFILE_REVIEWED,
        isPartOf: { "@type": "WebSite", url: SITE_URL, name: clinic.name },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        mainEntity: { "@id": `${url}#person` },
      },
      {
        "@type": "Person",
        "@id": `${url}#person`,
        identifier: doctor.slug,
        name: doctor.name,
        jobTitle: profile.role,
        description: summaryOf(profile),
        image: `${absoluteImage(doctor.image)}`,
        url,
        worksFor: {
          "@type": "MedicalClinic",
          "@id": `${SITE_URL}/#clinic`,
          name: clinic.name,
          url: SITE_URL,
          telephone: clinic.telephone,
          address: {
            "@type": "PostalAddress",
            streetAddress: "No. 3366, 13th Main Road, HAL 2nd Stage, Indiranagar",
            addressLocality: "Bengaluru",
            addressRegion: "Karnataka",
            postalCode: "560008",
            addressCountry: "IN",
          },
        },
        knowsAbout: profile.areasOfCare.length > 0 ? [...profile.areasOfCare] : undefined,
        knowsLanguage: doctor.languages ? [...doctor.languages] : undefined,
        hasCredential: qualifications.map((name) => ({
          "@type": "EducationalOccupationalCredential",
          name,
        })),
        alumniOf: profile.alumniOf?.map((name) => ({ "@type": "CollegeOrUniversity", name })),
        memberOf: profile.memberOf?.map((name) => ({ "@type": "Organization", name })),
        sameAs: profile.sameAs && profile.sameAs.length > 0 ? [...profile.sameAs] : undefined,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Our doctors", item: `${SITE_URL}/doctors` },
          { "@type": "ListItem", position: 3, name: doctor.name, item: url },
        ],
      },
    ],
  };

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <article className={styles.layout} aria-labelledby="doctor-name">
        <div className={styles.portraitColumn}>
          <div className={styles.portrait}>
            <Image
              src={doctor.image}
              alt={`Portrait of ${doctor.name}, ${profile.role} at MyStree`}
              fill
              priority
              sizes="(min-width: 1024px) 26rem, (min-width: 640px) 24rem, 100vw"
              className={styles.portraitImage}
            />
          </div>
        </div>

        <div className={styles.content}>
          <Link href="/doctors" className={styles.back}>
            Our doctors
          </Link>

          <h1 id="doctor-name" className={styles.name}>
            {doctor.name}
            {headingSuffix && <span className={styles.nameCredentials}>{headingSuffix}</span>}
          </h1>
          <p className={styles.role}>{profile.role}</p>

          <div className={styles.narrative}>
            {profile.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <dl className={styles.facts}>
            {qualifications.length > 0 && (
              <div className={styles.fact}>
                <dt>Qualifications</dt>
                <dd>
                  <ul className={styles.plainList}>
                    {qualifications.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}

            {experience && (
              <div className={styles.fact}>
                <dt>Experience</dt>
                <dd>{experience}</dd>
              </div>
            )}

            {profile.areasOfCare.length > 0 && (
              <div className={styles.fact}>
                <dt>Areas of care</dt>
                <dd>
                  <ul className={styles.plainList}>
                    {profile.areasOfCare.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}

            {doctor.languages && doctor.languages.length > 0 && (
              <div className={styles.fact}>
                <dt>Languages</dt>
                <dd>{doctor.languages.join(", ")}</dd>
              </div>
            )}

            <div className={styles.fact}>
              <dt>Consults at</dt>
              <dd>
                MyStree Women&apos;s Health Clinic
                <br />
                {CLINIC_ADDRESS}
              </dd>
            </div>
          </dl>

          {profile.relatedPages.length > 0 && (
            <nav className={styles.related} aria-label={`Care with ${doctor.name}`}>
              <p className={styles.relatedTitle}>Care with {doctor.name}</p>
              <ul className={styles.relatedList}>
                {profile.relatedPages.map((page) => (
                  <li key={page.href}>
                    <Link href={page.href} className={styles.relatedLink}>
                      {page.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <div className={styles.actions}>
            <a href={bookingHref} className="cta-book">
              Book with {doctor.name.startsWith("Dr.") ? `Dr. ${firstName}` : firstName}
            </a>
            <a href={`tel:${clinic.telephone}`} className={styles.call}>
              Call the clinic on {clinic.telephoneDisplay}
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}
