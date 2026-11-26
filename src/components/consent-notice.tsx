"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import styles from "./consent-notice.module.css";

const CONSENT_KEY = "mystree_consent_v1";
const CONSENT_EVENT = "mystree-consent-change";

export function ConsentNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(CONSENT_KEY);
      if (saved !== "accepted" && saved !== "essential") {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const choose = (choice: "accepted" | "essential") => {
    try {
      window.localStorage.setItem(CONSENT_KEY, choice);
      window.dispatchEvent(new Event(CONSENT_EVENT));
    } catch {
      // Dismiss cleanly even if browser storage is restricted.
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside
      className={styles.banner}
      role="region"
      aria-label="Privacy and cookie notice"
    >
      <p className={styles.heading}>Privacy &amp; cookie notice</p>
      <p className={styles.text}>
        We use essential cookies to keep the site working and optional analytics to improve
        information. Ad personalisation is switched off. Read our{" "}
        <Link href="/privacy-policy" className={styles.link}>
          privacy policy
        </Link>
        .
      </p>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.accept}
          onClick={() => choose("accepted")}
        >
          Accept all
        </button>
        <button
          type="button"
          className={styles.essential}
          onClick={() => choose("essential")}
        >
          Essential only
        </button>
      </div>
    </aside>
  );
}
