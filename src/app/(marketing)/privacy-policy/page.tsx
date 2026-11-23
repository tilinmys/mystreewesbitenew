import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage, type LegalSection } from "@/components/legal/legal-page";
import { SITE_URL, clinic } from "@/lib/clinic";

/*
 * Privacy policy (23 Nov 2026). Replaces the "We are preparing…" placeholder,
 * which blocked Google Ads (health advertisers need a real policy) and fell
 * short of the Digital Personal Data Protection Act, 2023.
 *
 * Written from what the site and booking system actually do: the WhatsApp
 * request form, the booking app at /booking, video consultations, Google
 * Analytics and the Google Ads tag (components/google-tag.tsx). Clinic to
 * have it reviewed by its legal adviser and to name a Grievance Officer.
 */
const UPDATED = "23 November 2026";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How MyStree, a women's health clinic in Indiranagar, Bengaluru, collects, uses, protects and shares your personal and health information, and how to exercise your rights.",
  alternates: { canonical: `${SITE_URL}/privacy-policy` },
};

const EMAIL = clinic.email;

const SECTIONS: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <>
        <p>
          MyStree (&ldquo;MyStree&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is a women&rsquo;s health clinic at{" "}
          {clinic.streetAddress}, {clinic.city} {clinic.postalCode}. We are the data
          fiduciary for the personal data described here.
        </p>
        <p>
          This policy covers this website, our online booking system, video consultations, and messages you send us
          by phone, WhatsApp or email. Contact: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>, {clinic.telephoneDisplay}.
        </p>
      </>
    ),
  },
  {
    id: "what-we-collect",
    title: "What we collect",
    body: (
      <ul>
        <li>
          <strong>Contact details:</strong> your name, mobile number and email address when you book, request an
          appointment or message us.
        </li>
        <li>
          <strong>Appointment details:</strong> the clinician, service, date and time you choose, and the area of care
          you select in our request form.
        </li>
        <li>
          <strong>Health information:</strong> what you tell your clinician, your medical history, examination and
          scan findings, test reports, prescriptions and care plans. This is collected during your care, not through
          the website forms. Please do not send medical details through the website.
        </li>
        <li>
          <strong>Payment records:</strong> the amount, date and status of payments. Online payments are completed
          with our payment provider; we do not ask you to type card details on this website.
        </li>
        <li>
          <strong>Website usage:</strong> pages visited, device and browser type, approximate location (city level)
          and how you arrived, collected by Google Analytics and the Google Ads tag through cookies. See section 6.
        </li>
      </ul>
    ),
  },
  {
    id: "how-we-use",
    title: "How we use it",
    body: (
      <>
        <ul>
          <li>To book, confirm, remind you of and change your appointments.</li>
          <li>To provide your care, keep your medical record and coordinate between your clinicians.</li>
          <li>To reply to your questions and requests.</li>
          <li>To collect payment and keep accounts.</li>
          <li>To meet legal and medical record-keeping duties.</li>
          <li>To understand how the website is used, improve it, and measure whether our advertising leads to bookings.</li>
        </ul>
        <p>
          We use your health information only for your care. We do not use it for advertising, and we do not sell
          personal data.
        </p>
      </>
    ),
  },
  {
    id: "consent",
    title: "Consent and legal basis",
    body: (
      <>
        <p>
          We process personal data with your consent, which you give when you book, send a request or start a
          consultation, and for legitimate uses allowed under the Digital Personal Data Protection Act, 2023, such as
          medical treatment, emergencies and legal obligations.
        </p>
        <p>
          You may withdraw consent at any time by writing to <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. Withdrawing
          does not affect care already given or records we must keep by law.
        </p>
        <p>
          <strong>Under 18:</strong> for patients under 18, we ask for the consent of a parent or legal guardian, as the
          law requires.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    title: "Who we share it with",
    body: (
      <>
        <ul>
          <li>MyStree clinicians and staff involved in your care or your booking.</li>
          <li>
            Laboratories, imaging centres and specialists you are referred to, with the information they need for that
            referral.
          </li>
          <li>
            Service providers who run systems for us under contract: website and booking hosting, payment processing,
            WhatsApp (Meta) when you message us there, video consultation software, and Google (Analytics and Ads).
          </li>
          <li>Government authorities, courts or regulators where the law requires it.</li>
        </ul>
        <p>
          Messages you send on WhatsApp are also handled under WhatsApp&rsquo;s own privacy policy. Some providers may
          store data outside India; where they do, we use providers bound by contract to protect it.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies, analytics and advertising",
    body: (
      <>
        <p>
          This website uses Google Analytics and the Google Ads tag. They set cookies to count visits, show which pages
          are used and tell us when a visit leads to a booking. They do not receive your medical records or anything
          you type into our forms.
        </p>
        <p>
          We do not build advertising audiences from visits to pages about health conditions. You can block or delete
          cookies in your browser settings, and manage Google advertising at{" "}
          <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
            adssettings.google.com
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "How long we keep it",
    body: (
      <ul>
        <li>Medical records: for as long as medical record-keeping rules require, and longer where needed for your ongoing care.</li>
        <li>Appointment, billing and tax records: for the periods required by law.</li>
        <li>Requests and messages that did not lead to an appointment: deleted when no longer needed to answer them.</li>
        <li>Website analytics: kept in Google Analytics for the retention period set there, at most 14 months.</li>
      </ul>
    ),
  },
  {
    id: "security",
    title: "How we protect it",
    body: (
      <p>
        Access to medical records is limited to the people who need it for your care or for clinic operations. Our
        systems use encrypted connections (HTTPS), password-protected accounts and access controls. No system is
        completely secure; if a breach affects your data, we will inform you and the Data Protection Board of India as
        the law requires.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: (
      <>
        <p>Under the Digital Personal Data Protection Act, 2023, you can:</p>
        <ul>
          <li>ask what personal data we hold about you and how we use it;</li>
          <li>ask us to correct, complete or update it;</li>
          <li>ask us to erase it, except what we must keep by law;</li>
          <li>withdraw consent;</li>
          <li>nominate someone to exercise these rights if you are unable to;</li>
          <li>raise a grievance with us, and then with the Data Protection Board of India.</li>
        </ul>
        <p>
          Write to <a href={`mailto:${EMAIL}`}>{EMAIL}</a> with the subject &ldquo;Privacy request&rdquo;. We may ask you
          to confirm your identity before acting on a request.
        </p>
      </>
    ),
  },
  {
    id: "grievances",
    title: "Grievances",
    body: (
      <p>
        Send any privacy complaint to our Grievance Officer at <a href={`mailto:${EMAIL}`}>{EMAIL}</a> or by post to
        MyStree, {clinic.streetAddress}, {clinic.city} {clinic.postalCode}. We will
        respond within the time the law requires.
      </p>
    ),
  },
  {
    id: "emergencies",
    title: "Not for emergencies",
    body: (
      <p>
        This website, our forms and WhatsApp are not monitored around the clock. In a medical emergency, call 112 or
        go to the nearest hospital.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        We will update this page when our practices change and show the new date at the top. See also our{" "}
        <Link href="/terms-and-conditions">terms and conditions</Link>.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated={UPDATED}
      intro={
        <p>
          Your health information is sensitive. This policy explains what we collect, why, who sees it, how long we
          keep it and how to use your rights.
        </p>
      }
      sections={SECTIONS}
    />
  );
}
