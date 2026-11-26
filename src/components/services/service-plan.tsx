import Link from "next/link";

import styles from "./service-plan.module.css";

/*
 * ServicePlan — LOCKED. Section 09 of every /services/* page.
 *
 * One published care plan at one price, in rupees: a wine card carrying the
 * name and price, the contents beside it as counted rows, and a single booking action
 * at the foot of the contents, level with the bottom of the card.
 *
 * Rules (see docs/care-plans-research.md):
 *   - only packages cleared for public pages; Hormonal IUD and MTP are held until
 *     counsel signs off (DMR Act 1954 s.3)
 *   - "what this covers", never "save", "offer" or "limited time" — the NMC
 *     notice of 06.10.2026 treats discounts and inducements as prohibited
 *   - list only what the clinic's own package text includes; no added
 *     terms or notices the package does not carry
 *
 * Differences from the reference: no network toggle, no monthly billing,
 * no photograph on the card (a tonal wine card instead), counted rows in
 * place of check marks.
 */

export type ServicePlanItem = { count: string; label: string };

export type ServicePlanProps = {
  heading: string;
  lead: string;
  plan: {
    name: string;
    audience: string;
    price: string;
    priceNote: string;
  };
  items: readonly ServicePlanItem[];
  /** Optional line under the contents, e.g. a link to plan terms. */
  terms?: { text: string; href: string; linkLabel: string };
  cta: { label: string; href: string };
  headingId?: string;
};

export function ServicePlan({
  heading,
  lead,
  plan,
  items,
  terms,
  cta,
  headingId = "service-plan-heading",
}: ServicePlanProps) {
  return (
    <section className={styles.section} aria-labelledby={headingId}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 id={headingId} className={styles.heading}>
            {heading}
          </h2>
          <p className={styles.lead}>{lead}</p>
        </header>

        <div className={styles.body}>
          <div className={styles.card}>
            <p className={styles.cardEyebrow}>Care plan</p>
            <p className={styles.cardName}>{plan.name}</p>
            <p className={styles.cardAudience}>{plan.audience}</p>
            <p className={styles.price}>
              <span className={styles.priceFigure}>{plan.price}</span>
              <span className={styles.priceNote}>{plan.priceNote}</span>
            </p>
          </div>

          <div className={styles.details}>
            <p className={styles.detailsTitle}>What the plan includes</p>
            <ul className={styles.items}>
              {items.map((item) => (
                <li className={styles.item} key={item.label}>
                  <span className={styles.count}>{item.count}</span>
                  <span className={styles.itemLabel}>{item.label}</span>
                </li>
              ))}
            </ul>

            {terms ? (
              <p className={styles.terms}>
                {terms.text}{" "}
                <Link href={terms.href} className={styles.termsLink}>
                  {terms.linkLabel}
                </Link>
              </p>
            ) : null}

            <div className={styles.action}>
              <Link href={cta.href} className="cta-book">
                {cta.label}
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
