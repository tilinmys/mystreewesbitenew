"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

/**
 * Home-only announcement strip.
 *
 * Route-aware rather than hidden with per-page CSS: on any route other than
 * "/" the element is never rendered, so it occupies no document space and no
 * inner page inherits a gap where it used to sit. `usePathname` resolves during
 * SSR in the App Router, so the server and client trees match on first paint.
 *
 * The header geometry in globals.css keys off the presence of `.announcement-bar`
 * (see `body:has(...)`), so removing it here collapses the header offset
 * automatically — including when a visitor dismisses it on the homepage.
 */
export function AnnouncementBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);

  if (pathname !== "/") return null;
  if (!visible) return null;

  return (
    <div className="announcement-bar">
      <p>
        MyStree care, made personal · Support for every life stage{" "}
        <a className="cta-book is-small" href="/book">
          Book an appointment <span data-cta-arrow aria-hidden="true">→</span>
        </a>
      </p>
      <button type="button" aria-label="Dismiss announcement" onClick={() => setVisible(false)}>
        ×
      </button>
    </div>
  );
}
