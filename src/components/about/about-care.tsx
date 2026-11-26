import Image from "next/image";
import Link from "next/link";

import styles from "./about-care.module.css";

/*
 * AboutCare — "Whatever brings you in" grid on /about, after the supplied
 * reference: a heavy left heading over a 4-column grid of square tiles that
 * alternate photo and colour, each labelled top-left.
 *
 * Hover / focus (the reference's logic): the whole tile is one link; it
 * floods to a single solid colour (Twilight Wine here, the reference's lime
 * having no place in our palette), any photo fades out, the label turns
 * white and "Learn more →" rises in at the foot. Keyboard focus gets the
 * same state. On touch screens, which have no hover, "Learn more →" is
 * always shown so the tiles still read as tappable. Reduced motion keeps
 * the colour change and drops the movement.
 *
 * Photos: editorial images generated in Canva for these tiles (no real
 * patients or staff; see color.md). A tile with `photo: true` and no
 * `image` shows a dark slate placeholder; with `image` the photo fills the
 * tile, with a top shade behind the label.
 *
 * Every tile links to the MyStree page that treats that concern.
 */

type Tile = {
  label: string;
  href: string;
  photo?: boolean;
  image?: { src: string; alt: string };
};

/** Decorative: the label is the link text, so the alt stays empty. */
const photo = (name: string) => ({ src: `/images/about/concern-${name}.webp`, alt: "" });

/*
 * Every concern MyStree treats (24 Oct 2026: added dermatology, psychology,
 * contraception, unplanned pregnancy, endometriosis, cervical screening,
 * pregnancy scans and diastasis recti). 24 tiles divide evenly
 * into the 2-, 3- and 4-column grids, and photo and colour tiles alternate so
 * no row clumps.
 */
const TILES: readonly Tile[] = [
  { label: "General gynaecology", href: "/services/obgyn-consults", image: photo("general-gynaecology") },
  { label: "Pregnancy care", href: "/services/prenatal" },
  { label: "Pre-pregnancy check-ups", href: "/services/obgyn-consults", image: photo("fertility") },
  { label: "Menopause", href: "/services/menopause" },

  { label: "PCOS & irregular periods", href: "/clinics/pcos" },
  { label: "Heavy or painful periods", href: "/services/obgyn-consults", image: photo("heavy-painful-periods") },
  { label: "High-risk pregnancy", href: "/services/prenatal" },
  { label: "First periods & teen health", href: "/services/adolescent-health", image: photo("teen-health") },

  { label: "Hot flushes & poor sleep", href: "/services/menopause", image: photo("hot-flushes-sleep") },
  { label: "Weight & nutrition", href: "/services/nutrition-counselling" },
  { label: "Pregnancy scans", href: "/services/prenatal", image: photo("pregnancy-scans") },
  { label: "Contraception & IUDs", href: "/packages/hormonal-iud-care" },

  { label: "Endometriosis & pelvic pain", href: "/services/obgyn-consults", image: photo("endometriosis-pelvic-pain") },
  { label: "Cervical cancer screening", href: "/services/womens-health-check" },
  { label: "Painful sex & vaginismus", href: "/services/pelvic-floor-physiotherapy", image: photo("painful-sex-vaginismus") },
  { label: "Bladder leaks", href: "/services/pelvic-floor-physiotherapy" },

  { label: "Skin & hair concerns", href: "/services/dermatology", image: photo("skin-hair") },
  { label: "Nutrition in pregnancy", href: "/services/nutrition-counselling" },
  { label: "Anxiety & low mood", href: "/services/psychology", image: photo("anxiety-low-mood") },
  { label: "Annual women's health check", href: "/services/womens-health-check" },

  { label: "Recovery after birth", href: "/services/pelvic-floor-physiotherapy", image: photo("recovery-after-birth") },
  { label: "Tummy gap after birth", href: "/services/pelvic-floor-physiotherapy" },
  { label: "Breastfeeding", href: "/services/nutrition-counselling", image: photo("breastfeeding") },
  { label: "Pregnancy after 35", href: "/services/prenatal", image: photo("pregnancy-after-35") },
];

export function AboutCare() {
  return (
    <section className={styles.section} aria-labelledby="care-heading">
      <div className={styles.inner}>
        <h2 id="care-heading" className={styles.title}>
          Whatever brings you in, someone here can help
        </h2>

        <ul className={styles.grid}>
          {TILES.map((tile) => {
            const tone = tile.photo || tile.image ? styles.photoTile : styles.colourTile;
            return (
              <li key={tile.label}>
                <Link href={tile.href} className={`${styles.tile} ${tone}`}>
                  {tile.image ? (
                    <Image
                      src={tile.image.src}
                      alt=""
                      aria-hidden="true"
                      fill
                      sizes="(max-width: 639px) 50vw, (max-width: 899px) 33vw, 24rem"
                      quality={90}
                      className={styles.media}
                    />
                  ) : tile.photo ? (
                    <span className={`${styles.media} ${styles.placeholder}`} aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="28" height="28">
                        <path
                          d="M4 7.5A1.5 1.5 0 0 1 5.5 6h2.2l1.3-2h6l1.3 2h2.2A1.5 1.5 0 0 1 20 7.5v10a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5z"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.3"
                          strokeLinejoin="round"
                        />
                        <circle cx="12" cy="12.5" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
                      </svg>
                      Photo
                    </span>
                  ) : null}
                  <span className={styles.label}>{tile.label}</span>
                  <span className={styles.more} aria-hidden="true">
                    Learn more <span className={styles.arrow}>&rarr;</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
