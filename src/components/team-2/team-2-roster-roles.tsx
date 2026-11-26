import Image from "next/image";

import styles from "./team-2-roster-roles.module.css";

interface RoleCard {
  title: string;
  image: string;
  alt: string;
  body: string;
}

const ROLES: readonly RoleCard[] = [
  {
    title: "Doctors and a Nutritionist",
    image: "/images/team/care-team-providers.webp",
    alt: "A gynaecologist and a nutritionist going over a patient's case file together",
    body: "Gynaecologists, obstetricians, a nutritionist and a pelvic physiotherapist in one clinic. With your consent, your doctor and nutritionist plan your care together.",
  },
  {
    title: "In-Clinic Diagnostic Scans",
    image: "/images/team/care-team-scans.webp",
    alt: "A sonographer preparing the ultrasound machine in a clinic scan room",
    body: "Pelvic and pregnancy ultrasound scans at the clinic, with blood tests arranged as your doctor advises.",
  },
  {
    title: "Dedicated Care Coordinators",
    image: "/images/team/care-team-coordinators.webp",
    alt: "A care coordinator noting an appointment at the clinic reception desk",
    body: "Help with booking appointments, follow-up visits and questions about your care, in person, by phone or on WhatsApp.",
  },
];

export function Team2RosterRoles() {
  return (
    <section
      id="care-team-roles"
      className={styles.section}
      aria-labelledby="care-team-roles-heading"
    >
      <div className={styles.inner}>
        {/* Section Header */}
        <div className={styles.header}>
          <span className={styles.eyebrow}>Collaborative Care Roles</span>
          <h2 id="care-team-roles-heading" className={styles.heading}>
            Who is on your care team?
          </h2>
          <p className={styles.subtitle}>
            Your care is supported by doctors, a nutritionist and care coordinators
            working together on 13th Main Road, Indiranagar.
          </p>
        </div>

        {/* 3-Card Grid */}
        <div className={styles.grid}>
          {ROLES.map((role) => (
            <div
              key={role.title}
              className={styles.card}
            >
              <div className={styles.artFrame}>
                <Image
                  src={role.image}
                  alt={role.alt}
                  fill
                  loading="eager"
                  sizes="(max-width: 960px) 100vw, 33vw"
                  quality={92}
                  className={styles.artImage}
                />
              </div>

              <h3 className={styles.cardTitle}>{role.title}</h3>
              <p className={styles.cardBody}>{role.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Team2RosterRoles;
