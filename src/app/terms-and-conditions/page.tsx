import type { Metadata } from "next";
import Link from "next/link";

import { SITE_URL } from "@/lib/clinic";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  alternates: { canonical: `${SITE_URL}/terms-and-conditions` },
};

export default function TermsAndConditionsPage() {
  return (
    <main className="booking-placeholder">
      <p className="eyebrow">MyStree legal</p>
      <h1>Terms &amp; Conditions</h1>
      <p>We are preparing the full MyStree terms and conditions. For questions about appointments or using this site, please contact <a href="mailto:info@mystree.org">info@mystree.org</a>.</p>
      <Link className="primary-action" href="/">Back to MyStree</Link>
    </main>
  );
}
