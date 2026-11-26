import Image from "next/image";
import Link from "next/link";

import styles from "./about-team.module.css";

/*
 * AboutTeam — "Meet the MyStree team" on /about, after the supplied
 * reference: a left-aligned heading and line and three photo cards (group,
 * label, line, outline button). AboutFigures, the row of three figure
 * tiles, follows it as its own band.
 *
 * Photos: none of the three group shots exist yet, so each card shows a
 * labelled placeholder. Add `image` to a group below (a file under
 * public/images/about/, ideally square, at least 900px) and the photo
 * replaces the placeholder.
 *
 * Figures: the reference's patient counts and outcome percentages have no
 * MyStree equivalent on record, so the tiles carry facts the site already
 * states: Dr. Smitha A.P's 23+ years, the seven services with their own
 * pages, and NABH accreditation.
 */

type Group = {
  key: string;
  title: string;
  text: string;
  link: { label: string; href: string };
  placeholder: string;
  image?: { src: string; alt: string };
};

const GROUPS: readonly Group[] = [
  {
    key: "founders",
    title: "Founders",
    text: "Obstetrician Dr. Smitha A.P and obstetrician and gynaecologist Dr. Surbhi Sinha, who started MyStree to give women's care more time.",
    link: { label: "Our founders", href: "/doctors#meet-providers" },
    placeholder: "Founders photo",
  },
  {
    key: "doctors",
    title: "Doctors",
    text: "Gynaecologists, obstetricians and a reproductive endocrinologist who see you in Indiranagar and know your history.",
    link: { label: "Our doctors", href: "/doctors#meet-providers" },
    placeholder: "Doctors photo",
  },
  {
    key: "care-team",
    title: "Nutrition and physiotherapy",
    text: "A nutritionist and a pelvic floor physiotherapist, working alongside your doctor.",
    link: { label: "Our care team", href: "/doctors#care-team-roles" },
    placeholder: "Care team photo",
  },
];

const FIGURES = [
  { figure: "23 years", label: "of obstetric experience leading the clinic" },
  { figure: "7", label: "women's health services under one roof in Indiranagar" },
  { figure: "Mon–Sat", label: "9 am to 8 pm at the Indiranagar clinic" },
] as const;

export function AboutTeam() {
  return (
    <section className={styles.section} aria-labelledby="team-heading">
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 id="team-heading" className={styles.title}>
            Meet the MyStree team
          </h2>
          <p className={styles.lead}>The doctors, clinicians and founders behind every visit to MyStree.</p>
        </header>

        <ul className={styles.groups}>
          {GROUPS.map((group) => (
            <li key={group.key} className={styles.group}>
              <div className={styles.media}>
                {group.image ? (
                  <Image
                    src={group.image.src}
                    alt={group.image.alt}
                    fill
                    sizes="(max-width: 767px) 100vw, 32rem"
                    className={styles.photo}
                  />
                ) : (
                  <div className={styles.placeholder} role="img" aria-label={`${group.placeholder} to come`}>
                    <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
                      <path
                        d="M4 7.5A1.5 1.5 0 0 1 5.5 6h2.2l1.3-2h6l1.3 2h2.2A1.5 1.5 0 0 1 20 7.5v10a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinejoin="round"
                      />
                      <circle cx="12" cy="12.5" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                    <span>{group.placeholder}</span>
                  </div>
                )}
              </div>

              <h3 className={styles.groupTitle}>
                {group.title}
              </h3>
              <p className={styles.groupText}>{group.text}</p>
              <Link href={group.link.href} className={styles.button}>
                {group.link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* The figure tiles: their own band on the reference page, after the team. */
export function AboutFigures() {
  return (
    <section className={styles.figuresSection} aria-label="MyStree at a glance">
      <dl className={styles.figures}>
        {FIGURES.map((item) => (
          <div key={item.figure} className={styles.tile}>
            <dt className={styles.figure}>{item.figure}</dt>
            <dd className={styles.figureLabel}>{item.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
