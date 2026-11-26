"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

/*
 * Google tag — the same setup as the previous my-stree.com site, so Google
 * Ads and Analytics keep conversion continuity when this site is live:
 *
 *   GT-NFR3JS3N    Google tag container (routes to Google Ads AW-18257797057)
 *   G-68RLGLNDY6   Google Analytics 4, configured with send_page_view: false
 *
 * Compliance (website review 24 Nov 2026, item 7 & item 8):
 *   1. Never loads on staging, preview or local hostnames — strictly runs on
 *      my-stree.com / www.my-stree.com in production builds.
 *   2. Ad personalisation signals are permanently switched off across every
 *      page on the site (Google healthcare data policy + DPDP Act).
 *   3. Analytics storage follows the visitor's cookie/consent notice choice.
 */

const GOOGLE_TAG_ID = "GT-NFR3JS3N";
const ANALYTICS_ID = "G-68RLGLNDY6";
const CONSENT_KEY = "mystree_consent_v1";
const CONSENT_EVENT = "mystree-consent-change";
const PRODUCTION_HOSTS = new Set(["my-stree.com", "www.my-stree.com"]);

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function readConsentState(): "accepted" | "essential" | null {
  try {
    const val = window.localStorage.getItem(CONSENT_KEY);
    if (val === "accepted" || val === "essential") return val;
  } catch {
    // Ignore storage access errors in private browsing.
  }
  return null;
}

export function GoogleTag() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!PRODUCTION_HOSTS.has(window.location.hostname)) return;
    setEnabled(true);

    const applyConsent = () => {
      const choice = readConsentState();
      if (typeof window.gtag === "function") {
        window.gtag("consent", "update", {
          ad_storage: "denied",
          ad_user_data: "denied",
          ad_personalization: "denied",
          analytics_storage: choice === "accepted" ? "granted" : "denied",
        });
      }
    };

    window.addEventListener(CONSENT_EVENT, applyConsent);
    return () => window.removeEventListener(CONSENT_EVENT, applyConsent);
  }, []);

  if (!enabled) return null;

  return (
    <>
      <Script id="google-tag-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
var __mystreeConsent = null;
try { __mystreeConsent = window.localStorage.getItem('${CONSENT_KEY}'); } catch (e) {}
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: __mystreeConsent === 'accepted' ? 'granted' : 'denied'
});
gtag('set', 'allow_ad_personalization_signals', false);
gtag('set', 'allow_google_signals', false);
gtag('config', '${GOOGLE_TAG_ID}', { allow_ad_personalization_signals: false, allow_google_signals: false });
gtag('config', '${ANALYTICS_ID}', { send_page_view: false, allow_ad_personalization_signals: false, allow_google_signals: false });`}
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
    if (!PRODUCTION_HOSTS.has(window.location.hostname)) return;
    const frame = window.requestAnimationFrame(() => {
      window.gtag?.("set", "allow_ad_personalization_signals", false);
      window.gtag?.("set", "allow_google_signals", false);
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
