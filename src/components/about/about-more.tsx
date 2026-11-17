import Link from "next/link";

import styles from "./about-more.module.css";

/*
 * AboutMore — the "Learn more" band on /about, after the supplied reference:
 * a warm grey strip a little wider than the page column, "Learn more about
 * MyStree" on the left and a link to how MyStree works on the right.
 */
export function AboutMore() {
  return (
    <section className={styles.section} aria-label="Learn more about MyStree">
      <div className={styles.band}>
        <p className={styles.label}>Learn more about MyStree</p>
        <Link href="/#how-it-works" className={styles.link}>
          How MyStree works <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </section>
  );
}
