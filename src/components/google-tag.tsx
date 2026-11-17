"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

/*
 * Google tag — the same setup as the previous my-stree.com site, so Google
 * Ads and Analytics see no change when this site takes over the domain
 * (Google Ads team brief, Aug–Oct 2026):
 *
 *   GT-NFR3JS3N    Google tag container (routes to Google Ads AW-18257797057)
 *   G-68RLGLNDY6   Google Analytics 4, configured with send_page_view: false
 *
 * Page views are sent by hand on every client-side navigation, with the
 * same fields the old site sent (page_title, page_location, page_path).
 *
 * Booking conversions are NOT fired here: the booking app under /booking
 * loads its own copy of this tag and fires generate_lead and the Ads
 * conversion (send_to AW-18257797057/KSJlCPuq0uMcEMG__4FE) on its
 * booking-success page. Firing them here too would double-count.
 *
 * Production only, so local development never sends test traffic.
 */

const GOOGLE_TAG_ID = "GT-NFR3JS3N";
const ANALYTICS_ID = "G-68RLGLNDY6";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function GoogleTag() {
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <>
      <Script id="google-tag-init" strategy="beforeInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GOOGLE_TAG_ID}');
gtag('config', '${ANALYTICS_ID}', { send_page_view: false });`}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`} strategy="afterInteractive" />
      <Suspense fallback={null}>
        <PageViews />
      </Suspense>
    </>
  );
}

function PageViews() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();

  useEffect(() => {
    if (typeof window.gtag !== "function") return;
    // After paint, so document.title is the new page's title.
    const frame = window.requestAnimationFrame(() => {
      window.gtag?.("event", "page_view", {
        page_title: document.title,
        page_location: window.location.href,
        page_path: `${pathname}${search ? `?${search}` : ""}${window.location.hash}`,
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pathname, search]);

  return null;
}
