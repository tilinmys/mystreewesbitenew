import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Phone } from "lucide-react";

import { getBookingDoctors, type BookingDoctor } from "@/lib/booking";
import { SITE_URL, clinic } from "@/lib/clinic";
import { doctorProfiles, type DoctorProfile } from "@/lib/doctor-profiles";
import { hasDoctorPhoto, type Doctor } from "@/lib/doctors";
import { getDoctorBySlug, getDoctors } from "@/lib/doctors-repository";
import styles from "./doctor-profile.module.css";

/*
 * Clinician profile — /doctors/[slug].
 *
 * Band 1 (Velvet Rose Mist #EFE0E4): slim breadcrumb rail, 3-column desktop
 * profile summary (framed portrait, Fraunces doctor name + designation +
 * burgundy speciality accent + credentials, and right-aligned conditional
 * REG. NO stacked above primary Appointment & secondary Telemedicine CTAs).
 *
 * Band 2 (Pure White #FFFFFF): full clinical Description / Overview followed by
 * structured Areas of Care, related clinic service links, and consultation card.
 */

type Props = {
  params: Promise<{ slug: string }>;
};

/** When the profile copy was last reviewed. Update with each content edit. */
const PROFILE_REVIEWED = "2026-11-25";

const CLINIC_ADDRESS = "No. 3366, 13th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru 560008";

/** Seed photos are site paths; booking-system photos are already absolute. */
function absoluteImage(image: string) {
  return /^https?:\/\//.test(image) ? image : `${SITE_URL}${image}`;
}

function normalizeNameKey(name: string) {
  return name.replace(/^(dr|ms|mrs|mr|miss)\.?\s+/i, "").toLowerCase().replace(/[^a-z]/g, "");
}

function initialsOf(name: string) {
  const words = name
    .replace(/^(dr|ms|mrs|mr|miss)\.?\s+/i, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (!words.length) return "MS";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
}

function qualificationsOf(doctor: Doctor) {
  return doctor.credentials.filter((item) => !/years? experience|^Reg\. No\./i.test(item));
}

function registrationOf(doctor: Doctor, bookingDoc?: BookingDoctor) {
  const fromCreds = doctor.credentials.find((item) => /^Reg\.\s*No\./i.test(item));
  const cleaned = (fromCreds ?? bookingDoc?.registrationNumber ?? "")
    .replace(/^Reg\.\s*No\.?\s*[:\-–—]?\s*/i, "")
    .trim();
  return cleaned || null;
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

/** SEO title capped at 54 chars so the root layout's " | MyStree" stays <= 64 chars. */
function seoTitle(doctor: Doctor, profile: DoctorProfile) {
  const shortRole = profile.role.split(/\s*(?:,|&|\band\b)\s*/i)[0]?.trim();
  const candidates = [
    `${doctor.name}, ${profile.role}, Indiranagar`,
    `${doctor.name}, ${profile.role}`,
    shortRole ? `${doctor.name}, ${shortRole}, Indiranagar` : "",
    shortRole ? `${doctor.name}, ${shortRole}` : "",
    `${doctor.name}, Indiranagar, Bengaluru`,
    doctor.name,
  ].filter(Boolean);
  return candidates.find((candidate) => candidate.length <= 54) ?? doctor.name.slice(0, 54);
}

/** First sentence(s) ignoring Dr./Ms. dots, kept under 158 chars with a clean fallback. */
function summaryOf(doctor: Doctor, profile: DoctorProfile) {
  const firstPara = (profile.paragraphs[0] ?? "").trim();
  const safePara = firstPara.replace(/\b(Dr|Ms|Mrs|Mr|Prof|St)\./g, "$1\u0000");
  const rawSentences = safePara.match(/[^.]+\.(\s|$)/g) ?? (safePara ? [safePara] : []);
  let summary = "";
  for (const part of rawSentences) {
    const clean = part.replace(/\u0000/g, ".");
    if ((summary + clean).trim().length > 155 && summary.trim().length >= 50) break;
    summary += clean;
  }
  const normalized = summary.replace(/\u0000/g, ".").replace(/\s+/g, " ").trim();
  if (normalized.length >= 45 && normalized.length <= 158) return normalized;
  if (normalized.length > 158) {
    return `${normalized.slice(0, 155).replace(/\s+\S*$/, "")}.`;
  }
  return `${doctor.name}, ${profile.role} at MyStree clinic in Indiranagar, Bengaluru.`.slice(0, 158);
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
  const title = seoTitle(doctor, profile);
  const description = summaryOf(doctor, profile);

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
  const [doctor, bookingRoster] = await Promise.all([getDoctorBySlug(slug), getBookingDoctors()]);
  if (!doctor) notFound();

  const doctorKey = normalizeNameKey(doctor.name);
  const bookingDoc = bookingRoster.find((item) => normalizeNameKey(item.name) === doctorKey);

  const profile = profileFor(doctor);
  const qualifications = qualificationsOf(doctor);
  const experience = experienceOf(doctor);
  const registration = registrationOf(doctor, bookingDoc);
  const url = `${SITE_URL}/doctors/${doctor.slug}`;
  const bookingHref = bookingDoc?.bookingUrl ?? doctor.bookingUrl ?? "/book";
  const telemedicineHref = `https://wa.me/${clinic.telephone.replace("+", "")}?text=${encodeURIComponent(
    `Hello MyStree, I would like to book a telemedicine consultation with ${doctor.name}.`,
  )}`;
  const credSummary = [qualifications.join(", "), experience].filter(Boolean).join(" · ");
  const photoAvailable = hasDoctorPhoto(doctor);
  // Keep Overview crisp: avoid repeating a standalone languages sentence when Languages is in the facts card.
  const overviewParagraphs =
    doctor.languages && doctor.languages.length > 0 && profile.paragraphs.length > 1
      ? profile.paragraphs.filter((p) => !/consults in [A-Za-z,\s]+\.?$/i.test(p.trim()))
      : profile.paragraphs;

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
        description: summaryOf(doctor, profile),
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

      {/* Band 1: Clean, compact clinical profile header */}
      <section className={styles.heroBand} aria-labelledby="doctor-name">
        <div className={styles.heroInner}>
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <Link href="/" className={styles.crumbLink}>
              Home
            </Link>
            <ChevronRight size={14} className={styles.crumbSep} aria-hidden="true" />
            <Link href="/doctors" className={styles.crumbLink}>
              Our Doctors
            </Link>
            <ChevronRight size={14} className={styles.crumbSep} aria-hidden="true" />
            <span className={styles.crumbCurrent} aria-current="page">
              {doctor.name}
            </span>
          </nav>

          <div className={styles.heroGrid}>
            <div className={styles.portraitWrap}>
              <div className={styles.portrait}>
                {photoAvailable ? (
                  <Image
                    src={doctor.image}
                    alt={`Portrait of ${doctor.name}, ${profile.role} at MyStree`}
                    fill
                    priority
                    sizes="(min-width: 1024px) 216px, (min-width: 640px) 184px, 156px"
                    className={styles.portraitImage}
                  />
                ) : (
                  <span className={styles.monogram} aria-hidden="true">
                    {initialsOf(doctor.name)}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.identity}>
              <h1 id="doctor-name" className={styles.name}>
                {doctor.name}
              </h1>
              <p className={styles.role}>{profile.role}</p>
              <p className={styles.specialtyLine}>{doctor.specialty}</p>
              {credSummary ? <p className={styles.credentialsSummary}>{credSummary}</p> : null}
            </div>

            <div className={styles.actionRail}>
              {registration ? (
                <p className={styles.regBadge}>REG. NO - {registration}</p>
              ) : null}

              <div className={styles.ctaStack}>
                <a href={bookingHref} className={`cta-book ${styles.primaryCta}`}>
                  {doctor.actionLabel ?? "Book an Appointment"}
                </a>
                <a
                  href={telemedicineHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.secondaryCta}
                >
                  Book a Telemedicine
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Band 2: Clinician description overview + structured details below */}
      <section className={styles.bodySection} aria-labelledby="overview-heading">
        <div className={styles.bodyGrid}>
          <div className={styles.overviewCol}>
            <h2 id="overview-heading" className={styles.overviewHeading}>
              Overview
            </h2>

            <div className={styles.narrative}>
              {overviewParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {profile.areasOfCare.length > 0 ? (
              <div className={styles.areasBlock}>
                <h3 className={styles.subHeading}>Areas of clinical care</h3>
                <ul className={styles.areasList}>
                  {profile.areasOfCare.map((item) => (
                    <li key={item} className={styles.areaItem}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {profile.relatedPages.length > 0 ? (
              <nav className={styles.related} aria-label={`Care with ${doctor.name}`}>
                <h3 className={styles.subHeading}>Related services with {doctor.name}</h3>
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
            ) : null}
          </div>

          <aside className={styles.sideCol} aria-label="Credentials and clinic details">
            <div className={styles.sideCard}>
              <h3 className={styles.sideHeading}>Credentials &amp; Clinic Info</h3>

              <dl className={styles.facts}>
                {qualifications.length > 0 ? (
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
                ) : null}

                {experience ? (
                  <div className={styles.fact}>
                    <dt>Experience</dt>
                    <dd>{experience}</dd>
                  </div>
                ) : null}

                {registration ? (
                  <div className={styles.fact}>
                    <dt>Registration</dt>
                    <dd>{registration}</dd>
                  </div>
                ) : null}

                {doctor.languages && doctor.languages.length > 0 ? (
                  <div className={styles.fact}>
                    <dt>Languages</dt>
                    <dd>{doctor.languages.join(", ")}</dd>
                  </div>
                ) : null}

                <div className={styles.fact}>
                  <dt>Consults at</dt>
                  <dd>
                    MyStree Women&apos;s Health Clinic
                    <br />
                    {CLINIC_ADDRESS}
                  </dd>
                </div>
              </dl>

              <a href={`tel:${clinic.telephone}`} className={styles.sideCallLink}>
                <Phone size={15} aria-hidden="true" />
                <span>Call {clinic.telephoneDisplay}</span>
              </a>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
