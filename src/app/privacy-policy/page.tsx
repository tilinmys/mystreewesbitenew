import type { Metadata } from "next";
import Link from "next/link";

import { SITE_URL } from "@/lib/clinic";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: `${SITE_URL}/privacy-policy` },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="booking-placeholder">
      <p className="eyebrow">MyStree legal</p>
      <h1>Privacy Policy</h1>
      <p>We are preparing the full MyStree privacy policy. If you have a question about how we handle your information, please contact <a href="mailto:info@mystree.org">info@mystree.org</a>.</p>
      <Link className="primary-action" href="/">Back to MyStree</Link>
    </main>
  );
}
