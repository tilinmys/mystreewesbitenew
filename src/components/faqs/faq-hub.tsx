"use client";

import { useState, useRef, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Minus, ArrowUpRight, AlertCircle, X, ChevronRight, ChevronLeft, ChevronDown } from "lucide-react";
import { FAQ_CATEGORIES, type FAQCategory, type FAQItem } from "@/lib/faqs-data";
import styles from "./faq-hub.module.css";

export function FAQHub() {
  const [activeCategoryId, setActiveCategoryId] = useState<string>(FAQ_CATEGORIES[0].id);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(["g-1"]));
  const [searchQuery, setSearchQuery] = useState("");
  const contentTopRef = useRef<HTMLDivElement>(null);

  const activeCategoryIndex = useMemo(() => {
    return FAQ_CATEGORIES.findIndex((c) => c.id === activeCategoryId);
  }, [activeCategoryId]);

  const activeCategory = useMemo(() => {
    return FAQ_CATEGORIES[activeCategoryIndex] || FAQ_CATEGORIES[0];
  }, [activeCategoryIndex]);

  const prevCategory = activeCategoryIndex > 0 ? FAQ_CATEGORIES[activeCategoryIndex - 1] : null;
  const nextCategory = activeCategoryIndex < FAQ_CATEGORIES.length - 1 ? FAQ_CATEGORIES[activeCategoryIndex + 1] : null;

  // Search filtering
  const matchingFaqs = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    const results: { faq: FAQItem; categoryTitle: string; categoryId: string }[] = [];

    FAQ_CATEGORIES.forEach((cat) => {
      cat.faqs.forEach((faq) => {
        if (faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q)) {
          results.push({ faq, categoryTitle: cat.shortTitle, categoryId: cat.id });
        }
      });
    });

    return results;
  }, [searchQuery]);

  // Toggle accordion item
  const toggleFAQ = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleCategorySelect = (id: string) => {
    setActiveCategoryId(id);
    setSearchQuery("");
    // If mobile, smooth scroll to questions top
    if (typeof window !== "undefined" && window.innerWidth < 960 && contentTopRef.current) {
      const offset = 90;
      const pos = contentTopRef.current.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: pos, behavior: "smooth" });
    }
  };

  return (
    <section className={styles.faqSection} aria-labelledby="faq-main-heading">
      <div className={styles.container}>
        {/* Left Column: Fixed / Pinned Category Index (No internal scrollbar) */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarInner}>
            <h1 id="faq-main-heading" className={styles.mainTitle}>
              Frequently Asked Questions
            </h1>

            {/* Compact Search Bar */}
            <div className={styles.searchBox}>
              <Search className={styles.searchIcon} size={15} aria-hidden="true" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search symptoms, treatments..."
                aria-label="Search FAQs"
                className={styles.searchInput}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className={styles.clearSearchBtn}
                  aria-label="Clear search"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            {/* Category Navigation List */}
            <nav className={styles.categoryNav} aria-label="FAQ Topics">
              {/* Mobile Topic Dropdown for instant jumping */}
              <div className={styles.mobileCategorySelector}>
                <label htmlFor="faq-mobile-topic-select" className={styles.mobileCategoryLabel}>
                  Jump to topic:
                </label>
                <div className={styles.mobileSelectWrapper}>
                  <select
                    id="faq-mobile-topic-select"
                    value={activeCategoryId}
                    onChange={(e) => handleCategorySelect(e.target.value)}
                    className={styles.mobileSelect}
                    aria-label="Jump to FAQ Topic"
                  >
                    {FAQ_CATEGORIES.map((cat, idx) => (
                      <option key={cat.id} value={cat.id}>
                        {idx + 1}. {cat.shortTitle} ({cat.faqs.length} FAQs)
                      </option>
                    ))}
                  </select>
                  <ChevronDown className={styles.mobileSelectChevron} size={15} aria-hidden="true" />
                </div>
              </div>

              <ul className={styles.categoryList}>
                {FAQ_CATEGORIES.map((cat, idx) => {
                  const isActive = activeCategoryId === cat.id && !searchQuery.trim();
                  return (
                    <li key={cat.id}>
                      <button
                        type="button"
                        onClick={() => handleCategorySelect(cat.id)}
                        className={`${styles.categoryBtn} ${isActive ? styles.categoryBtnActive : ""}`}
                        aria-current={isActive ? "true" : undefined}
                      >
                        <span className={styles.catLabel}>{cat.shortTitle}</span>
                        <span className={styles.catCount}>({cat.faqs.length})</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Compact Help Card */}
            <div className={styles.helpCard}>
              <p className={styles.helpTitle}>Have a question?</p>
              <p className={styles.helpText}>
                Speak directly with our care coordinators on 13th Main Road, Indiranagar.
              </p>
              <a href="tel:+916366573772" className={styles.helpLink}>
                +91 63665 73772 <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </aside>

        {/* Right Column: Active Topic Questions & Smooth Transition */}
        <div className={styles.contentColumn} ref={contentTopRef}>
          {/* If Search is Active */}
          {searchQuery.trim() ? (
            <div className={styles.searchView}>
              <div className={styles.searchResultsHeader}>
                <p>
                  Found <strong>{matchingFaqs.length}</strong> matching {matchingFaqs.length === 1 ? "answer" : "answers"} for &ldquo;{searchQuery}&rdquo;
                </p>
                <button type="button" onClick={() => setSearchQuery("")} className={styles.clearSearchTextBtn}>
                  Clear search
                </button>
              </div>

              {matchingFaqs.length === 0 ? (
                <div className={styles.noResults}>
                  <AlertCircle size={28} className={styles.noResultsIcon} />
                  <h3>No matching questions found</h3>
                  <p>Try a different keyword or browse our 12 clinical topics on the left.</p>
                </div>
              ) : (
                <div className={styles.accordionGroup}>
                  {matchingFaqs.map(({ faq, categoryTitle }) => {
                    const isExpanded = expandedIds.has(faq.id);
                    return (
                      <div key={faq.id} className={`${styles.accordionItem} ${isExpanded ? styles.accordionItemExpanded : ""}`}>
                        <button
                          type="button"
                          onClick={() => toggleFAQ(faq.id)}
                          aria-expanded={isExpanded}
                          className={styles.accordionTrigger}
                        >
                          <div className={styles.questionMeta}>
                            <span className={styles.topicBadge}>{categoryTitle}</span>
                            <span className={styles.questionText}>{faq.question}</span>
                          </div>
                          <span className={styles.toggleIcon} aria-hidden="true">
                            {isExpanded ? <Minus size={19} strokeWidth={1.5} /> : <Plus size={19} strokeWidth={1.5} />}
                          </span>
                        </button>
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.22, ease: "easeOut" }}
                              className={styles.accordionContentWrapper}
                            >
                              <div className={styles.accordionContent}>
                                <p className={styles.answerParagraph}>{faq.answer}</p>
                                {faq.internalLink && (
                                  <Link href={faq.internalLink.href} className={styles.answerLink}>
                                    {faq.internalLink.label} <ArrowUpRight size={13} />
                                  </Link>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            /* Active Topic Questions */
            <div className={styles.activeTopicView}>
              <header className={styles.topicHeader}>
                <h2 className={styles.topicTitle}>{activeCategory.title}</h2>
                <p className={styles.topicDesc}>{activeCategory.description}</p>
              </header>

              <div className={styles.accordionGroup}>
                {activeCategory.faqs.map((faq) => {
                  const isExpanded = expandedIds.has(faq.id);
                  return (
                    <div
                      key={faq.id}
                      className={`${styles.accordionItem} ${isExpanded ? styles.accordionItemExpanded : ""}`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleFAQ(faq.id)}
                        aria-expanded={isExpanded}
                        className={styles.accordionTrigger}
                      >
                        <span className={styles.questionText}>{faq.question}</span>
                        <span className={styles.toggleIcon} aria-hidden="true">
                          {isExpanded ? <Minus size={19} strokeWidth={1.5} /> : <Plus size={19} strokeWidth={1.5} />}
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22, ease: "easeOut" }}
                            className={styles.accordionContentWrapper}
                          >
                            <div className={styles.accordionContent}>
                              <p className={styles.answerParagraph}>{faq.answer}</p>
                              {faq.internalLink && (
                                <Link href={faq.internalLink.href} className={styles.answerLink}>
                                  {faq.internalLink.label} <ArrowUpRight size={13} />
                                </Link>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Topic Pager Navigation */}
              <div className={styles.topicPager}>
                {prevCategory ? (
                  <button
                    type="button"
                    onClick={() => handleCategorySelect(prevCategory.id)}
                    className={styles.pagerBtnPrev}
                  >
                    <ChevronLeft size={16} />
                    <span>Previous: {prevCategory.shortTitle}</span>
                  </button>
                ) : <div />}

                {nextCategory ? (
                  <button
                    type="button"
                    onClick={() => handleCategorySelect(nextCategory.id)}
                    className={styles.pagerBtnNext}
                  >
                    <span>Next: {nextCategory.shortTitle}</span>
                    <ChevronRight size={16} />
                  </button>
                ) : (
                  <Link href="/book" className={styles.pagerBtnNext}>
                    <span>Ready to consult? Book appointment</span>
                    <ArrowUpRight size={16} />
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Crawlable structured text container for search engine bots (hidden visually, fully indexed for SEO / AEO / GEO) */}
      <div className={styles.seoIndexContainer} aria-hidden="true">
        <section>
          <h2>My Stree Patient Care Knowledge Base · Women&apos;s Health Clinic Bengaluru</h2>
          <p>
            Medically Reviewed &amp; Fact-Checked by Dr. Smitha A.P., Obstetrician &amp; Gynaecologist (MBBS, DNB) at MyStree Women&apos;s Health Clinic, No. 3366, 13th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560008.
          </p>
          <p>
            Specialized women&apos;s healthcare covering 12 core clinical domains: Adolescent Health &amp; First Gynae Consultations, PCOS / PCOD Diagnostic &amp; Lifestyle Management, Fertility Planning &amp; Pre-Conception Optimization, Pre-Natal Care &amp; Trimester Support, Menopause &amp; Midlife Transition, Preventive Health &amp; Well-Woman Screenings, Pelvic Floor Physiotherapy &amp; Core Rehabilitation, Clinical Nutrition &amp; Hormonal Balance, Mental Wellness &amp; Reproductive Counselling, Women&apos;s Dermatology &amp; Hormonal Skin Care, Integrated Care Model, and Clinic Appointments &amp; Billing in Indiranagar, Bengaluru.
          </p>
        </section>
        {FAQ_CATEGORIES.map((cat, idx) => (
          <article key={cat.id}>
            <h3>Topic {idx + 1} of {FAQ_CATEGORIES.length}: {cat.title}</h3>
            <p>{cat.description}</p>
            {cat.faqs.map((f) => (
              <div key={f.id}>
                <h4>{f.question}</h4>
                <p>{f.answer}</p>
              </div>
            ))}
          </article>
        ))}
      </div>
    </section>
  );
}
