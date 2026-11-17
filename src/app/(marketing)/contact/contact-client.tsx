"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  Navigation,
  Phone,
  Share2,
} from "lucide-react";
import { seedDoctors } from "@/lib/doctors";
import styles from "./contact.module.css";

const TIME_SLOTS = [
  "09:30 AM – 10:00 AM",
  "10:30 AM – 11:00 AM",
  "11:30 AM – 12:00 PM",
  "02:00 PM – 02:30 PM",
  "03:30 PM – 04:00 PM",
  "05:00 PM – 05:30 PM",
  "06:30 PM – 07:00 PM",
];

function MapFoldPinIcon() {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.45"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21 3 6" />
      <line x1="9" y1="3" x2="9" y2="18" />
      <line x1="15" y1="6" x2="15" y2="21" />
      <circle cx="12" cy="10" r="1.75" />
      <path d="M12 8.25c-1 0-1.75.75-1.75 1.75 0 1.25 1.75 3.25 1.75 3.25s1.75-2 1.75-3.25c0-1-.75-1.75-1.75-1.75z" />
    </svg>
  );
}

function PhoneHandsetIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.45"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailEnvelopeIcon() {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.45"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="16" x="2" y="4" rx="2.5" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export function ContactHubClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialtyOrDoctor: "",
    appointmentDate: "",
    appointmentTime: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  // The map stays inert while the page scrolls past it, so the iframe never
  // swallows wheel or touch events from the smooth scroller (Lenis). A click
  // or tap switches it on; leaving the map switches it off again.
  const [mapActive, setMapActive] = useState(false);

  // Find currently selected doctor if matched
  const selectedDoctor = seedDoctors.find(
    (doc) => doc.slug === formData.specialtyOrDoctor
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate booking confirmation
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      specialtyOrDoctor: "",
      appointmentDate: "",
      appointmentTime: "",
    });
    setIsSubmitted(false);
  };

  return (
    <main className={styles.contactPage}>
      {/* ====================================================================
          SECTION 1: Wave Header Banner (Reference Image 1)
          ==================================================================== */}
      <section
        className={`${styles.heroBanner} photo-ground photo-ground--center`}
        style={{ "--ground-image": "url(/images/grounds/contact-indiranagar-lane.webp)", "--ground-position": "center 60%" } as React.CSSProperties}
        aria-label="Contact Us Header"
      >
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>Indiranagar, Bengaluru</p>
          <h1 className={styles.heroTitle}>Visit MyStree in Indiranagar</h1>
          <p className={styles.heroSubtitle}>
            Visit us at No. 3366, 13th Main Road, HAL 2nd Stage, Indiranagar, or call{" "}
            <a className={styles.heroPhone} href="tel:+916366573772">+91 63665 73772</a>. Our team is here to
            guide your care with unhurried listening and dignity.
          </p>
        </div>

        {/* Fluid Organic Wave Lower Transition */}
        <div className={styles.waveDividerWrapper} aria-hidden="true">
          <svg
            className={styles.waveSvg}
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,35 C220,85 440,15 720,60 C1000,105 1220,25 1440,65 L1440,120 L0,120 Z"
              fill="var(--alabaster-canvas)"
            />
          </svg>
        </div>
      </section>

      {/* ====================================================================
          SECTION 2: Contact Info Cards (Reference Image 2)
          ==================================================================== */}
      <section className={styles.cardsSection} aria-label="Clinic Contact Details">
        {/* Subtle Decorative Topographical Contours */}
        <svg
          className={styles.contourVectorBg}
          viewBox="0 0 800 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M-40,360 C80,290 200,340 260,420 C320,500 290,610 170,680 C50,750 -40,710 -70,590 Z"
            stroke="currentColor" strokeOpacity="0.14"
            strokeWidth="1.5"
          />
          <path
            d="M-70,330 C70,250 220,310 290,400 C360,490 330,620 190,710 C50,800 -70,750 -100,620 Z"
            stroke="currentColor" strokeOpacity="0.10"
            strokeWidth="1.5"
          />
          <path
            d="M-100,300 C60,210 240,280 320,380 C400,480 370,630 210,740 C50,850 -100,790 -130,650 Z"
            stroke="currentColor" strokeOpacity="0.07"
            strokeWidth="1.5"
          />
          <path
            d="M-130,270 C50,170 260,250 350,360 C440,470 410,640 230,770 C50,900 -130,830 -160,680 Z"
            stroke="currentColor" strokeOpacity="0.05"
            strokeWidth="1.5"
          />
        </svg>

        <div className={styles.cardsContainer}>
          <div className={styles.cardsGrid}>
            {/* Card 1: Address */}
            <article className={styles.infoCard}>
              <div className={styles.cardIconWrapper} aria-hidden="true">
                <MapFoldPinIcon />
              </div>
              <h3 className={styles.cardTitle}>Address</h3>
              <div className={styles.cardContentBox}>
                <address className={styles.cardDescription}>
                  2nd Floor, 13th Main Road,
                  <br />
                  Indiranagar, Bengaluru,
                  <br />
                  <span className={styles.cardHighlight}>Karnataka - 560 061</span>
                </address>
              </div>
            </article>

            {/* Card 2: Phone Number */}
            <article className={styles.infoCard}>
              <div className={styles.cardIconWrapper} aria-hidden="true">
                <PhoneHandsetIcon />
              </div>
              <h3 className={styles.cardTitle}>Phone Number</h3>
              <div className={styles.cardContentBox}>
                <div className={styles.cardLinkGroup}>
                  <a href="tel:+916366573772" className={styles.cardLink}>
                    +91 63665 73772
                  </a>
                  <a href="tel:+919902878279" className={styles.cardLink}>
                    +91 99028 78279
                  </a>
                </div>
              </div>
            </article>

            {/* Card 3: Email Address */}
            <article className={styles.infoCard}>
              <div className={styles.cardIconWrapper} aria-hidden="true">
                <MailEnvelopeIcon />
              </div>
              <h3 className={styles.cardTitle}>Email Address</h3>
              <div className={styles.cardContentBox}>
                <div className={styles.cardLinkGroup}>
                  <a href="mailto:info@mystree.org" className={styles.cardLink}>
                    info@mystree.org
                  </a>
                  <a href="mailto:care@mystree.org" className={styles.cardLink}>
                    care@mystree.org
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 3: Book an Appointment (Reference Image 3)
          ==================================================================== */}
      <section className={styles.bookingSection} id="book" aria-label="Book an Appointment">
        <div className={styles.bookingContainer}>
          <div className={styles.formCard}>
            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>Book an Appointment</h2>
              <p className={styles.formSubtitle}>
                Schedule a 15-minute consultation with one of our specialists.
              </p>
            </div>

            {isSubmitted ? (
              <div className={styles.successFeedback}>
                <CheckCircle2 size={48} className={styles.successIcon} aria-hidden="true" />
                <h3 className={styles.successTitle}>Appointment Request Received</h3>
                <p className={styles.successMessage}>
                  Thank you, <strong>{formData.name}</strong>. Our care coordinator will contact you at <strong>{formData.phone}</strong> or <strong>{formData.email}</strong> to confirm your slot for {formData.appointmentDate} at {formData.appointmentTime}.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className={styles.submitBtn}
                  style={{ maxWidth: "260px", marginTop: "1rem" }}
                >
                  Book Another Visit
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.appointmentForm}>
                {/* Name */}
                <div className={styles.inputGroup}>
                  <label htmlFor="patient-name" className={styles.label}>
                    Name <span className={styles.requiredAsterisk}>*</span>
                  </label>
                  <input
                    id="patient-name"
                    type="text"
                    required
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className={styles.inputField}
                  />
                </div>

                {/* Email */}
                <div className={styles.inputGroup}>
                  <label htmlFor="patient-email" className={styles.label}>
                    Email <span className={styles.requiredAsterisk}>*</span>
                  </label>
                  <input
                    id="patient-email"
                    type="email"
                    required
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={styles.inputField}
                  />
                </div>

                {/* Phone */}
                <div className={styles.inputGroup}>
                  <label htmlFor="patient-phone" className={styles.label}>
                    Phone <span className={styles.requiredAsterisk}>*</span>
                  </label>
                  <input
                    id="patient-phone"
                    type="tel"
                    required
                    placeholder="Mobile"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className={styles.inputField}
                  />
                </div>

                {/* Specialty / Doctor with Placeholders */}
                <div className={styles.inputGroup}>
                  <label htmlFor="patient-specialty" className={styles.label}>
                    Specialty <span className={styles.requiredAsterisk}>*</span>
                  </label>
                  <div className={styles.selectWrapper}>
                    <select
                      id="patient-specialty"
                      required
                      value={formData.specialtyOrDoctor}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          specialtyOrDoctor: e.target.value,
                        })
                      }
                      className={styles.selectField}
                    >
                      <option value="" disabled>
                        Select Speciality
                      </option>
                      {seedDoctors.map((doc) => (
                        <option key={doc.slug} value={doc.slug}>
                          {doc.specialty} · {doc.name} ({doc.title})
                        </option>
                      ))}
                      <option value="general-obgyn">
                        General Women’s Health &amp; Diagnostic Triage
                      </option>
                    </select>
                    <ChevronDown size={18} className={styles.selectChevron} />
                  </div>

                  {/* Doctor preview card when selected */}
                  {selectedDoctor && (
                    <div className={styles.selectedDoctorPreview}>
                      <Image
                        src={selectedDoctor.image}
                        alt={selectedDoctor.name}
                        width={44}
                        height={44}
                        className={styles.doctorPreviewAvatar}
                      />
                      <div className={styles.doctorPreviewMeta}>
                        <span className={styles.doctorPreviewName}>
                          {selectedDoctor.name}
                        </span>
                        <span className={styles.doctorPreviewTitle}>
                          {selectedDoctor.title} · {selectedDoctor.specialty}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Date & Time Row */}
                <div className={styles.formRowDual}>
                  {/* Appointment Date */}
                  <div className={styles.inputGroup}>
                    <label htmlFor="appointment-date" className={styles.label}>
                      Appointment Date <span className={styles.requiredAsterisk}>*</span>
                    </label>
                    <input
                      id="appointment-date"
                      type="date"
                      required
                      min={new Date().toISOString().split("T")[0]}
                      value={formData.appointmentDate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          appointmentDate: e.target.value,
                        })
                      }
                      className={styles.inputField}
                    />
                  </div>

                  {/* Appointment Time */}
                  <div className={styles.inputGroup}>
                    <label htmlFor="appointment-time" className={styles.label}>
                      Appointment Time <span className={styles.requiredAsterisk}>*</span>
                    </label>
                    <div className={styles.selectWrapper}>
                      <select
                        id="appointment-time"
                        required
                        value={formData.appointmentTime}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            appointmentTime: e.target.value,
                          })
                        }
                        className={styles.selectField}
                      >
                        <option value="" disabled>
                          Select Time Slot
                        </option>
                        {TIME_SLOTS.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                      <Clock size={16} className={styles.selectChevron} />
                    </div>
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={styles.submitBtn}
                >
                  {isSubmitting ? "Submitting..." : "Book Appointment"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 4: Clinic Location Map
          ==================================================================== */}
      <section id="map" className={styles.mapSection} aria-label="Clinic Location Map">
        <div
          className={`${styles.mapFrame} ${mapActive ? styles.mapFrameActive : ""}`}
          onMouseLeave={() => setMapActive(false)}
        >
          <iframe
            title="My Stree Clinic Indiranagar Location"
            src="https://maps.google.com/maps?q=12.9685868,77.6453771+(My+Stree+Clinic)&t=&z=16&ie=UTF8&iwloc=B&output=embed"
            className={styles.mapIframe}
            loading="lazy"
            allowFullScreen
            tabIndex={mapActive ? 0 : -1}
          />
          {!mapActive && (
            <button
              type="button"
              className={styles.mapShield}
              onClick={() => setMapActive(true)}
              aria-label="Use the interactive map"
            >
              <span className={styles.mapHint}>Tap to use the map</span>
            </button>
          )}
        </div>

        {/* Floating Location Overlay Card */}
        <div className={styles.floatingMapCard}>
          <div className={styles.floatingCardHeader}>
            <div>
              <h3 className={styles.floatingCardTitle}>
                My Stree Clinic
              </h3>
              <p className={styles.floatingCardCategory}>
                Women&apos;s health clinic
              </p>
            </div>
            <a
              href="https://maps.app.goo.gl/JthHC6HbbAVegwxB9"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open My Stree Clinic in Google Maps"
              className={styles.shareBtn}
            >
              <ExternalLink size={15} />
            </a>
          </div>

          <p className={styles.floatingCardAddress}>
            No. 3366, 13th Main Road, HAL 2nd Stage,
            <br />
            Indiranagar, Bengaluru, Karnataka 560008
          </p>

          <div className={styles.floatingCardActions}>
            <a
              href="https://maps.app.goo.gl/JthHC6HbbAVegwxB9"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.directionsBtn}
            >
              <Navigation size={13} />
              Directions
            </a>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 5: Brand Signature & Social Channels (Reference Image 5)
          ==================================================================== */}
      <section className={styles.socialSection} aria-label="Follow MyStree">
        {/* Fluid Organic Wave Top Transition */}
        <div className={styles.socialWaveDivider} aria-hidden="true">
          <svg
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "100%", height: "45px", display: "block" }}
          >
            <path
              d="M0,40 C320,80 640,10 960,50 C1200,80 1360,20 1440,40 L1440,80 L0,80 Z"
              fill="var(--alabaster-canvas)"
            />
          </svg>
        </div>

        {/* Centered Brand Logo */}
        <div className={styles.socialLogoWrapper}>
          <Image
            src="/brand/mystree-logo.png"
            alt="MyStree Women's Health Clinic"
            width={604}
            height={220}
            className={styles.brandLogo}
          />
          <p className={styles.brandSubtext}>
            Women’s Health &amp; Wellness Clinic · Indiranagar
          </p>
        </div>

        {/* 5 Social Media Channels (Facebook, Twitter/X, YouTube, LinkedIn, Instagram) */}
        <div className={styles.socialIconsRow} role="list" aria-label="Social media channels">
          {/* Facebook */}
          <a
            href="https://facebook.com/mystreeclinic"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit MyStree on Facebook"
            className={`${styles.socialBadge}`}
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
            </svg>
          </a>

          {/* Twitter / X */}
          <a
            href="https://twitter.com/mystreeclinic"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit MyStree on X (formerly Twitter)"
            className={`${styles.socialBadge}`}
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          {/* YouTube */}
          <a
            href="https://youtube.com/@mystreeclinic"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit MyStree on YouTube"
            className={`${styles.socialBadge}`}
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/company/mystreeclinic"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit MyStree on LinkedIn"
            className={`${styles.socialBadge}`}
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.45 1.45 0 1 0 0-2.9 1.45 1.45 0 0 0 0 2.9m1.4 9.74v-8.37H5.06v8.37h2.8z" />
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/mystreeclinic"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit MyStree on Instagram"
            className={`${styles.socialBadge}`}
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
        </div>
      </section>

    </main>
  );
}
