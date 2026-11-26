"use client";

import { usePathname, useRouter } from "next/navigation";
import { PACKAGE_NAV } from "@/lib/package-nav";
import { useCallback, useEffect, useRef, useState, useMemo, type MouseEvent as ReactMouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CalendarDays,
  ChevronDown,
  Menu,
  Search,
  X,
  ArrowUpRight,
  PhoneCall,
} from "lucide-react";

import styles from "./site-navbar.module.css";

/* ====================================================================
   Clinical Search Index
   Instant autocomplete for care, conditions, clinicians & clinics
   ==================================================================== */
interface SearchItem {
  id: string;
  title: string;
  category: "Care" | "Doctor" | "Location" | "Guide";
  subtitle: string;
  href: string;
}

const SEARCH_ITEMS: SearchItem[] = [
  {
    id: "s-1",
    title: "OBGYN & Gynaecological Care",
    category: "Care",
    subtitle: "Gynaecology consultations, Pap smear, cervical health & pelvic exams",
    href: "/services/obgyn-consults",
  },
  {
    id: "s-2",
    title: "PCOS & Metabolic Hormonal Care",
    category: "Care",
    subtitle: "Insulin resistance, irregular cycles & metabolic health",
    href: "/clinics/pcos",
  },
  {
    id: "s-3",
    title: "Pre-Natal & Pregnancy Birthing Care",
    category: "Care",
    subtitle: "Trimester fetal growth scans, high-risk obstetrics & birthing readiness",
    href: "/services/prenatal",
  },
  {
    id: "s-5",
    title: "Menopausal Clinic & Midlife Care",
    category: "Care",
    subtitle: "Menopause care: perimenopause, hot flushes, sleep & bone health",
    href: "/services/menopause",
  },
  {
    id: "s-6",
    title: "Adolescent Health Clinic",
    category: "Care",
    subtitle: "Puberty, periods, cervical cancer prevention advice & first gynaecology visits",
    href: "/services/adolescent-health",
  },
  {
    id: "s-7",
    title: "Pelvic Health & Physiotherapy",
    category: "Care",
    subtitle: "Pelvic floor rehabilitation, core stability & postpartum recovery",
    href: "/services/pelvic-floor-physiotherapy",
  },
  {
    id: "s-8",
    title: "Clinical Dermatology & Skin Care",
    category: "Care",
    subtitle: "Hormonal acne, pigmentation, hair fall & skin conditions",
    href: "/services/dermatology",
  },
  {
    id: "s-9",
    title: "Clinical Nutrition & Dietetics",
    category: "Care",
    subtitle: "Meal plans for PCOS, pre-pregnancy nutrition guidance & pregnancy",
    href: "/services/nutrition-counselling",
  },
  {
    id: "s-10",
    title: "Psychology & Mental Health",
    category: "Care",
    subtitle: "Counselling and psychiatry for mood, postpartum concerns & stress",
    href: "/services/psychology",
  },
  {
    id: "s-10b",
    title: "Women's Health Check & Pap Smear",
    category: "Care",
    subtitle: "Annual check-ups, cervical cancer screening & clinical breast exams",
    href: "/services/womens-health-check",
  },
  {
    id: "s-11",
    title: "Dr. Smitha A.P",
    category: "Doctor",
    subtitle: "Founder and High-Risk Obstetrician (MBBS, DNB)",
    href: "/doctors/dr-smitha-ap",
  },
  {
    id: "s-12",
    title: "Dr. Surbhi Sinha",
    category: "Doctor",
    subtitle: "Co-Founder, Obstetrician and Gynaecologist (MBBS, MS, DNB)",
    href: "/doctors/dr-surbhi-sinha",
  },
  {
    id: "s-13",
    title: "Priyanka Savina",
    category: "Doctor",
    subtitle: "Nutritionist and Counsellor",
    href: "/doctors/priyanka-savina",
  },
  {
    id: "s-14",
    title: "MyStree clinic, Indiranagar",
    category: "Location",
    subtitle: "13th Main Road, HAL 2nd Stage, Indiranagar · Mon–Sat 9 am–8 pm",
    href: "/about#location",
  },
  {
    id: "s-15",
    title: "The MyStree Take (Blog)",
    category: "Guide",
    subtitle: "Articles on women's health written by our clinicians",
    href: "/blog",
  },
  {
    id: "s-16",
    title: "Women's Health FAQs",
    category: "Guide",
    subtitle: "125 clinical questions answered on PCOS, OBGYN, fertility & appointments",
    href: "/faqs",
  },
  {
    id: "s-17",
    title: "Multidisciplinary Care Team & Doctors",
    category: "Care",
    subtitle: "Meet our gynaecologists, obstetricians, physiotherapist, nutritionist and counsellors",
    href: "/team",
  },
];

/* ====================================================================
   Approved Clinical Navigation Data Structures
   ==================================================================== */

const SERVICES_ITEMS = [
  { title: "OBGYN Consults", href: "/services/obgyn-consults" },
  { title: "Women's Health Check & Pap Smear", href: "/services/womens-health-check" },
  { title: "PCOS & Metabolic Care", href: "/clinics/pcos" },
  { title: "Adolescent Health Clinic", href: "/services/adolescent-health" },
  { title: "Pre-Natal Clinic", href: "/services/prenatal" },
  { title: "Menopausal Clinic", href: "/services/menopause" },
  { title: "Nutrition Counselling", href: "/services/nutrition-counselling" },
  { title: "Physiotherapy & Recovery", href: "/services/pelvic-floor-physiotherapy" },
  { title: "Dermatology & Skin Care", href: "/services/dermatology" },
  { title: "Psychology & Psychiatry", href: "/services/psychology" },
];

/*
 * The patient portal (sign-up, log-in, appointments, prescriptions) is the
 * booking app under /booking, which stays on my-stree.com alongside this
 * site. Absolute, so it also works from local development.
 */
const PORTAL_LOGIN_URL = "https://my-stree.com/booking/login";

export function SiteNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const appointmentHref = pathname === "/services/prenatal" ? "https://my-stree.com/booking" : "/book";

  // Navigation states
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  /*
   * Hover intent.
   *
   * Opening on mouseenter and closing on mouseleave with no delay is the
   * classic flyout bug: the pointer travels diagonally from the trigger
   * toward the panel, clips the edge of the wrapper on the way, and the menu
   * shuts under the cursor. A short close delay lets that diagonal finish,
   * and any re-entry cancels it.
   *
   * Hover is also only wired up for a fine pointer. On touch, mouseenter
   * fires synthetically on tap and then immediately leaves, which makes the
   * panel flicker; there, the click handler alone drives it.
   */
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [hoverCapable, setHoverCapable] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setHoverCapable(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const openNow = useCallback((key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(key);
  }, []);

  const closeSoon = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 180);
  }, []);

  /** Props applied to a dropdown wrapper; empty on touch. */
  const hoverProps = (key: string) =>
    hoverCapable
      ? { onMouseEnter: () => openNow(key), onMouseLeave: closeSoon }
      : {};

  /*
   * Trigger activation.
   *
   * On a hover device the panel is already open by the time the pointer
   * reaches the trigger, so a plain toggle closes it — and because the
   * pointer never left, mouseenter will not fire again. The menu is then
   * stuck shut until you move away and come back. A mouse click therefore
   * only ever opens.
   *
   * `event.detail` is 0 for keyboard activation (Enter/Space synthesise a
   * click with no click count) and >= 1 for a real pointer, which is what
   * lets keyboard and touch users keep a genuine toggle.
   */
  const handleTriggerClick = (key: string) => (event: ReactMouseEvent) => {
    const fromPointer = event.detail > 0;
    if (hoverCapable && fromPointer) {
      openNow(key);
      return;
    }
    setOpenDropdown((current) => (current === key ? null : key));
  };
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  // Hides while scrolling down so the bar never covers what you are reading,
  // and returns on any upward scroll (16 Nov 2026).
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  // Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const desktopNavRef = useRef<HTMLElement>(null);


  // Scroll listener: detects when top header moves out of view
  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY;
      // When user scrolls down past Tier 1 (approx 50px)
      setIsSticky(currentScrollY > 48);
      const delta = currentScrollY - lastScrollY.current;
      if (currentScrollY < 160) setIsHidden(false);
      else if (delta > 6) setIsHidden(true);
      else if (delta < -6) setIsHidden(false);
      if (Math.abs(delta) > 6 || currentScrollY < 160) lastScrollY.current = currentScrollY;
      if (!mobileOpen) {
        setOpenDropdown(null);
      }
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [mobileOpen]);

  // Click outside to close search and dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
      if (
        desktopNavRef.current &&
        !desktopNavRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        // Escape must hand focus back to the control that opened the panel,
        // otherwise keyboard users are dropped at the top of the document.
        setOpenDropdown((current) => {
          if (current) {
            document
              .querySelector<HTMLButtonElement>(`[data-dropdown-trigger="${current}"]`)
              ?.focus();
          }
          return null;
        });
        setIsSearchOpen(false);
        setMobileOpen(false);
        setMobileSearchOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Filter search results
  const filteredSearchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase().trim();
    return SEARCH_ITEMS.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.subtitle.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
    ).slice(0, 6);
  }, [searchQuery]);

  function closeAllMenus() {
    setOpenDropdown(null);
    setMobileOpen(false);
    setIsSearchOpen(false);
    setMobileSearchOpen(false);
    setSearchQuery("");
  }

  function handleSearchResultClick(href: string) {
    closeAllMenus();
    router.push(href);
  }

  // Active check helper
  const isHomeActive = pathname === "/";
  const isAboutActive = pathname === "/about" || pathname?.startsWith("/about/");
  const isPackagesActive = pathname?.startsWith("/packages/");
  const isServicesActive = pathname === "/services" || pathname?.startsWith("/services/") || pathname?.startsWith("/clinics/");
  const isTeamActive = pathname === "/team" || pathname === "/team-2" || pathname === "/doctors" || pathname?.startsWith("/doctors/");


  return (
    <>
      {/* ====================================================================
         Announcement strip (after the Oula reference): one quiet line in
         Twilight Wine, scrolling away with the page.
         ==================================================================== */}
      <div className={styles.announcement}>
        <p className={styles.announcementText}>
          <span className={styles.announcementLong}>Now booking at our Indiranagar clinic, Bengaluru.</span>
          <span className={styles.announcementShort}>Now booking in Indiranagar.</span>{" "}
          <Link href={appointmentHref} className={styles.announcementLink} onClick={closeAllMenus}>
            <span className={styles.announcementLong}>Book your first appointment</span>
            <span className={styles.announcementShort}>Book a visit</span>
          </Link>
          .
        </p>
      </div>

      {/* ====================================================================
         Main bar: logo left, uppercase links, outlined "Log in" and solid
         "Book now" right. Alabaster ground; sticks to the top on scroll.
         ==================================================================== */}
      <header
        className={`site-nav ${styles.mainNavBar} ${isSticky ? styles.isSticky : ""} ${
          isHidden && !mobileOpen && !openDropdown && !isSearchOpen ? styles.isHidden : ""
        }`}
      >
        <div className={`nav-inner ${styles.navInner}`}>
          <Link href="/" className={styles.brand} onClick={closeAllMenus} aria-label="MyStree home">
            <Image
              src="/brand/mystree-navbar-logo.png"
              alt="MyStree — unravel the mystery"
              width={800}
              height={235}
              priority
              className={styles.brandLogo}
            />
          </Link>

            {/* Middle: Desktop Navigation Links (White text on Deep Navy) */}
            <nav className={styles.desktopNav} ref={desktopNavRef} aria-label="Main Navigation">
              <div className={`${styles.navItem} ${styles.navItemHome}`}>
                <Link
                  href="/"
                  className={`${styles.navLink} ${isHomeActive ? styles.navLinkActive : ""}`}
                  aria-current={isHomeActive ? "page" : undefined}
                  onClick={closeAllMenus}
                >
                  Home
                </Link>
              </div>

              <div className={styles.navItem}>
                <Link
                  href="/about"
                  className={`${styles.navLink} ${isAboutActive ? styles.navLinkActive : ""}`}
                  onClick={closeAllMenus}
                >
                  About
                </Link>
              </div>

              <div className={styles.navItem} {...hoverProps("services")}>
                <button
                  type="button"
                  data-dropdown-trigger="services"
                  className={`${styles.navLink} ${
                    isServicesActive ? styles.navLinkActive : ""
                  } ${openDropdown === "services" ? styles.navLinkOpen : ""}`}
                  aria-expanded={openDropdown === "services"}
                  aria-controls="nav-services-panel"
                  onClick={handleTriggerClick("services")}
                >
                  <span>Services</span>
                  <ChevronDown
                    size={14}
                    className={`${styles.chevronIcon} ${
                      openDropdown === "services" ? styles.chevronOpen : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {openDropdown === "services" && (
                  /*
                    A list of links, not role="menu". The menu role implies an
                    application menu driven by arrow keys and makes a screen
                    reader announce these as menu items rather than links;
                    for navigation, a plain list is both correct and more
                    usable. Tab already walks it.
                  */
                  <div
                    className={styles.servicesPanel}
                    id="nav-services-panel"
                    aria-label="Services"
                  >
                    <ul className={styles.servicesGrid}>
                      {SERVICES_ITEMS.map((item) => (
                        <li key={item.title}>
                          <Link
                            href={item.href}
                            className={styles.servicesItem}
                            onClick={closeAllMenus}
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className={styles.navItem}>
                <Link
                  href="/doctors"
                  className={`${styles.navLink} ${isTeamActive ? styles.navLinkActive : ""}`}
                  onClick={closeAllMenus}
                >
                  Our Care Team
                </Link>
              </div>

              <div className={styles.navItem} {...hoverProps("packages")}>
                <button
                  type="button"
                  data-dropdown-trigger="packages"
                  className={`${styles.navLink} ${
                    isPackagesActive ? styles.navLinkActive : ""
                  } ${openDropdown === "packages" ? styles.navLinkOpen : ""}`}
                  aria-expanded={openDropdown === "packages"}
                  aria-controls="nav-packages-panel"
                  onClick={handleTriggerClick("packages")}
                >
                  <span>Packages</span>
                  <ChevronDown
                    size={14}
                    className={`${styles.chevronIcon} ${
                      openDropdown === "packages" ? styles.chevronOpen : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {openDropdown === "packages" && (
                  <div className={styles.servicesPanel} id="nav-packages-panel" aria-label="Packages">
                    <ul className={styles.servicesGrid}>
                      {PACKAGE_NAV.map((item) => (
                        <li key={item.href}>
                          <Link href={item.href} className={styles.servicesItem} onClick={closeAllMenus}>
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {[
                { label: "Learn", href: "/blog", active: pathname?.startsWith("/blog") },
                { label: "FAQs", href: "/faqs", active: pathname === "/faqs" || pathname === "/faq" },
                { label: "Contact", href: "/contact", active: pathname === "/contact" },
              ].map((item) => (
                <div className={styles.navItem} key={item.href}>
                  <Link
                    href={item.href}
                    className={`${styles.navLink} ${item.active ? styles.navLinkActive : ""}`}
                    onClick={closeAllMenus}
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </nav>

            {/* Right: Search & Action Buttons */}
            <div className={styles.actionsGroup}>
              <a href={PORTAL_LOGIN_URL} className={styles.loginButton} aria-label="Log in to the patient portal">
                Log in
              </a>

              <Link href={appointmentHref} className={styles.bookButton} onClick={closeAllMenus}>
                <span className={styles.bookLong}>Book appointment</span>
                <span className={styles.bookShort}>Book now</span>
              </Link>

              {/* Mobile Search Trigger */}
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(true);
                  setMobileSearchOpen(true);
                }}
                className={styles.mobileSearchTrigger}
                aria-label="Open search"
              >
                <Search size={17} aria-hidden="true" />
              </button>

              {/* Mobile Menu Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className={styles.mobileMenuButton}
                aria-expanded={mobileOpen}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                {mobileOpen ? <X size={19} /> : <Menu size={19} />}
              </button>
            </div>
          </div>

          {/* ====================================================================
             Mobile Drawer with Search, Accordions & Action Buttons
             ==================================================================== */}
          {mobileOpen && (
            <div className={styles.mobileDrawer}>
              {/* Mobile Search Input */}
              <div className={styles.mobileSearchBox}>
                <Search size={16} className={styles.searchIcon} aria-hidden="true" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search care, doctors, symptoms..."
                  className={styles.searchInput}
                  autoFocus={mobileSearchOpen}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className={styles.clearButton}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Mobile Search Results */}
              {searchQuery.trim().length > 0 && (
                <div className={styles.searchResultsDropdown} style={{ position: "static", width: "100%" }}>
                  {filteredSearchResults.length > 0 ? (
                    filteredSearchResults.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSearchResultClick(item.href)}
                        className={styles.searchResultItem}
                      >
                        <span className={styles.searchResultCategory}>{item.category}</span>
                        <span className={styles.searchResultTitle}>{item.title}</span>
                        <span className={styles.searchResultSubtitle}>{item.subtitle}</span>
                      </button>
                    ))
                  ) : (
                    <div className={styles.noResultsText}>No results for &ldquo;{searchQuery}&rdquo;</div>
                  )}
                </div>
              )}

              {/* Mobile Navigation List */}
              <div className={styles.mobileNavList}>
                <Link
                  href="/"
                  className={`${styles.mobileNavLink} ${isHomeActive ? styles.navLinkActive : ""}`}
                  aria-current={isHomeActive ? "page" : undefined}
                  onClick={closeAllMenus}
                >
                  <span>Home</span>
                  <ArrowUpRight size={16} opacity={0.6} />
                </Link>

                <Link
                  href="/about"
                  className={`${styles.mobileNavLink} ${isAboutActive ? styles.navLinkActive : ""}`}
                  onClick={closeAllMenus}
                >
                  <span>About</span>
                  <ArrowUpRight size={16} opacity={0.6} />
                </Link>

                <div className={styles.mobileAccordionGroup}>
                  <button
                    type="button"
                    onClick={() =>
                      setMobileAccordion(mobileAccordion === "services" ? null : "services")
                    }
                    className={styles.mobileNavAccordionBtn}
                  >
                    <span>Services</span>
                    <ChevronDown
                      size={16}
                      className={mobileAccordion === "services" ? styles.chevronOpen : ""}
                    />
                  </button>
                  {mobileAccordion === "services" && (
                    <div className={styles.mobileAccordionContent}>
                      {SERVICES_ITEMS.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          className={styles.mobileAccordionLink}
                          onClick={closeAllMenus}
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  href="/doctors"
                  className={`${styles.mobileNavLink} ${isTeamActive ? styles.navLinkActive : ""}`}
                  onClick={closeAllMenus}
                >
                  <span>Our Care Team</span>
                  <ArrowUpRight size={16} opacity={0.6} />
                </Link>

                <div className={styles.mobileAccordionGroup}>
                  <button
                    type="button"
                    onClick={() =>
                      setMobileAccordion(mobileAccordion === "packages" ? null : "packages")
                    }
                    className={styles.mobileNavAccordionBtn}
                    aria-expanded={mobileAccordion === "packages"}
                  >
                    <span>Packages</span>
                    <ChevronDown
                      size={16}
                      className={mobileAccordion === "packages" ? styles.chevronOpen : ""}
                    />
                  </button>
                  {mobileAccordion === "packages" && (
                    <div className={styles.mobileAccordionContent}>
                      {PACKAGE_NAV.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={styles.mobileAccordionLink}
                          onClick={closeAllMenus}
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {[
                  { label: "Learn", href: "/blog", active: pathname?.startsWith("/blog") },
                  { label: "FAQs", href: "/faqs", active: pathname === "/faqs" },
                  { label: "Contact", href: "/contact", active: pathname === "/contact" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`${styles.mobileNavLink} ${item.active ? styles.navLinkActive : ""}`}
                    onClick={closeAllMenus}
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight size={16} opacity={0.6} />
                  </Link>
                ))}
              </div>

              {/* Mobile actions: book, call, log in */}
              <div className={styles.mobileActions}>
                <Link
                  href={appointmentHref}
                  className={styles.mobileBookBtn}
                  onClick={closeAllMenus}
                >
                  <CalendarDays size={18} style={{ marginRight: 8 }} />
                  Book now
                </Link>

                <a
                  href="tel:+916366573772"
                  className={styles.mobileEmergencyBtn}
                  onClick={closeAllMenus}
                >
                  <PhoneCall size={17} style={{ marginRight: 8 }} />
                  Call the clinic (+91 63665 73772)
                </a>

                <a href={PORTAL_LOGIN_URL} className={styles.mobileLoginBtn} onClick={() => setMobileOpen(false)}>
                  Log in
                </a>
              </div>
            </div>
          )}
        </header>

    </>
  );
}
