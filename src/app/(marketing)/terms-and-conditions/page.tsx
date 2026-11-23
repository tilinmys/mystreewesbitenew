import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage, type LegalSection } from "@/components/legal/legal-page";
import { SITE_URL, clinic } from "@/lib/clinic";

/*
 * Terms and conditions (23 Nov 2026). Replaces the "We are preparing…"
 * placeholder. Fees, cancellation and refund rules are not restated here:
 * they are shown in the booking system at the time of booking, so this page
 * cannot contradict them. Clinic to have it reviewed by its legal adviser.
 */
const UPDATED = "23 November 2026";
const EMAIL = clinic.email;

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Terms for using the MyStree website, booking appointments and video consultations, and buying care packages at MyStree, Indiranagar, Bengaluru.",
  alternates: { canonical: `${SITE_URL}/terms-and-conditions` },
};

const SECTIONS: LegalSection[] = [
  {
    id: "about",
    title: "About these terms",
    body: (
      <p>
        These terms apply when you use this website, book an appointment, have a video consultation or buy a care
        package from MyStree, {clinic.streetAddress}, {clinic.city} {clinic.postalCode}. By using the website or our
        services you agree to them. Our <Link href="/privacy-policy">privacy policy</Link> explains how we handle your
        information.
      </p>
    ),
  },
  {
    id: "information",
    title: "Health information on this website",
    body: (
      <>
        <p>
          The articles, FAQs and service pages are general information written to help you understand your options.
          They are not a diagnosis or a substitute for a consultation with a qualified clinician who knows your
          history.
        </p>
        <p>
          Do not start, stop or change any treatment based on this website alone. If you are worried about a symptom,
          book a consultation or speak to a doctor.
        </p>
      </>
    ),
  },
  {
    id: "emergencies",
    title: "Emergencies",
    body: (
      <p>
        MyStree is an outpatient clinic. Our website, forms, phone line and WhatsApp are not emergency services. In a
        medical emergency, including heavy bleeding, severe pain, or reduced baby movements in pregnancy, call 112 or go
        to the nearest hospital emergency department.
      </p>
    ),
  },
  {
    id: "booking",
    title: "Appointments",
    body: (
      <ul>
        <li>
          Appointments are booked through our online booking system, by phone or on WhatsApp. An appointment is
          confirmed only when you receive a confirmation from the booking system or the care team. A request sent from
          our website form is not yet a confirmed appointment.
        </li>
        <li>Please give accurate contact and health details, and arrive on time with your previous reports.</li>
        <li>
          The fee, visit length, and the cancellation, rescheduling and refund terms for each clinician are shown in the
          booking system when you book. Those terms apply to your booking.
        </li>
      </ul>
    ),
  },
  {
    id: "video",
    title: "Video consultations",
    body: (
      <ul>
        <li>
          Video consultations follow the Telemedicine Practice Guidelines issued under Indian law. Your clinician will
          decide whether your concern can be handled by video, and may ask you to visit the clinic for an examination,
          scan or test.
        </li>
        <li>Join from a private place with a stable connection. Do not record the consultation without consent.</li>
        <li>Prescriptions are issued only where the guidelines allow them after a video consultation.</li>
      </ul>
    ),
  },
  {
    id: "packages",
    title: "Care packages",
    body: (
      <ul>
        <li>
          Each package page lists what is included and the price. Anything not listed, such as extra tests, scans,
          medicines or procedures your doctor advises, is charged separately and explained to you first.
        </li>
        <li>
          Package prices can change; the price that applies is the one shown when you buy. Package validity and refund
          terms are given when you buy the package.
        </li>
        <li>
          Your clinician decides what care is medically suitable for you. A package does not guarantee any treatment,
          procedure or result.
        </li>
        <li>
          MyStree does not determine or disclose the sex of a fetus. This is prohibited under the PCPNDT Act, 1994.
        </li>
      </ul>
    ),
  },
  {
    id: "payments",
    title: "Payments",
    body: (
      <p>
        Fees are in Indian rupees. Video consultations are paid online when you book. For clinic visits you can pay
        online in advance or at the clinic. Online payments are processed by our payment provider under its own terms.
      </p>
    ),
  },
  {
    id: "conduct",
    title: "Respectful conduct",
    body: (
      <p>
        We treat every patient with respect and expect the same towards our clinicians and staff. We may decline or
        end an appointment in cases of abusive or unsafe behaviour.
      </p>
    ),
  },
  {
    id: "content",
    title: "Website content",
    body: (
      <>
        <p>
          The text, photographs, illustrations and design of this website belong to MyStree or are used with
          permission. You may share links to our pages and print pages for personal use. Please do not copy or
          republish our content without written permission.
        </p>
        <p>
          Links to other websites are provided for convenience. We are not responsible for their content or privacy
          practices.
        </p>
      </>
    ),
  },
  {
    id: "liability",
    title: "Liability",
    body: (
      <p>
        We work to keep this website accurate and available, but we cannot promise it will always be error-free or
        uninterrupted. To the extent the law allows, MyStree is not liable for loss caused by relying on general
        website information instead of seeking medical advice. Nothing in these terms limits any liability that cannot
        be limited by law.
      </p>
    ),
  },
  {
    id: "law",
    title: "Governing law",
    body: (
      <p>These terms are governed by the laws of India. Courts in Bengaluru, Karnataka have jurisdiction.</p>
    ),
  },
  {
    id: "contact",
    title: "Changes and contact",
    body: (
      <p>
        We may update these terms and will show the new date at the top of this page. Questions:{" "}
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a> or {clinic.telephoneDisplay}, Monday to Saturday, 9 am to 8 pm.
      </p>
    ),
  },
];

export default function TermsAndConditionsPage() {
  return (
    <LegalPage
      title="Terms and Conditions"
      updated={UPDATED}
      intro={<p>The terms for using our website and our services. Please read them before you book.</p>}
      sections={SECTIONS}
    />
  );
}
