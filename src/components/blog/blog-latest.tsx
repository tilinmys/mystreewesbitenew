"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { ArticleItem } from "@/lib/blog-articles";
import styles from "./blog-latest.module.css";

/* Articles come from the admin dashboard (lib/cms.ts) via the /blog page. */
export function BlogLatest({ articles }: { articles: readonly ArticleItem[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("ALL TOPICS");
  const [sortBy, setSortBy] = useState("LATEST");

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesSearch =
        !searchQuery.trim() ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTopic =
        selectedTopic === "ALL TOPICS" ||
        article.category === selectedTopic ||
        (selectedTopic === "CLINICAL CARE" && article.category === "MYSTREE CARE");

      return matchesSearch && matchesTopic;
    }).sort((a, b) => {
      if (sortBy === "POPULAR") {
        return b.views - a.views;
      }
      if (sortBy === "OLDEST") {
        return a.timestamp - b.timestamp;
      }
      return b.timestamp - a.timestamp;
    });
  }, [articles, searchQuery, selectedTopic, sortBy]);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Title: The Latest */}
        <h2 className={styles.title}>The Latest</h2>

        {/* Filter & Search Bar */}
        <div className={styles.filterBar}>
          {/* Search Input */}
          <div className={styles.controlGroup}>
            <label htmlFor="blog-search-input" className={styles.controlLabel}>
              Search:
            </label>
            <input
              id="blog-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH ARTICLES"
              className={styles.searchInput}
            />
          </div>

          {/* Filter by Topic */}
          <div className={styles.controlGroup}>
            <label htmlFor="blog-filter-topic" className={styles.controlLabel}>
              Filter by:
            </label>
            <div className={styles.selectWrapper}>
              <select
                id="blog-filter-topic"
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className={styles.selectBox}
              >
                <option value="ALL TOPICS">ALL TOPICS</option>
                <option value="MYSTREE CARE">CLINICAL CARE</option>
                <option value="HORMONAL SCIENCE">HORMONAL SCIENCE</option>
                <option value="FERTILITY & CONCEPTION">FERTILITY &amp; CONCEPTION</option>
                <option value="MATERNITY & BIRTHING">MATERNITY &amp; BIRTHING</option>
              </select>
              <span className={styles.selectChevron} aria-hidden="true">
                <ChevronDown size={14} />
              </span>
            </div>
          </div>

          {/* Sort by */}
          <div className={styles.controlGroup}>
            <label htmlFor="blog-sort-by" className={styles.controlLabel}>
              Sort by:
            </label>
            <div className={styles.selectWrapper}>
              <select
                id="blog-sort-by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={styles.selectBox}
              >
                <option value="LATEST">LATEST ARTICLES</option>
                <option value="POPULAR">MOST POPULAR</option>
                <option value="OLDEST">OLDEST FIRST</option>
              </select>
              <span className={styles.selectChevron} aria-hidden="true">
                <ChevronDown size={14} />
              </span>
            </div>
          </div>
        </div>

        {/* Articles Grid — Exact Editorial Card Reproduction */}
        {filteredArticles.length > 0 ? (
          <div className={styles.articlesGrid}>
            {filteredArticles.map((article) => (
              <Link
                key={article.id}
                href={`/blog/${article.slug}`}
                className={styles.card}
              >
                {/* Top Graphic Visual Area */}
                <div className={styles.cardVisualArea}>
                  {/* Right Organic Petal Contour */}
                  <div className={styles.rightPetalShape} aria-hidden="true" />

                  {/* Center Rectangular Frame with Grayscale Clinical Photo — No Border */}
                  <div className={styles.rectFrame}>
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                      className={styles.rectImage}
                    />
                  </div>
                </div>

                {/* Bottom Editorial Content Area */}
                <div className={styles.cardBody}>
                  <div>
                    <p className={styles.categoryTag}>{article.category}</p>
                    <h3 className={styles.cardTitle}>{article.title}</h3>
                  </div>

                  {/* Three-Line Author & Date Ledger */}
                  <div className={styles.cardLedger}>
                    <span>{`BY ${article.author.toUpperCase()}`}</span>
                    <span>{`PUBLISHED ${article.publishedDate.toUpperCase()}`}</span>
                    <span>{`UPDATED ${article.updatedDate.toUpperCase()}`}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p>No articles found matching your criteria.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedTopic("ALL TOPICS");
                setSortBy("LATEST");
              }}
              className={styles.resetButton}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
