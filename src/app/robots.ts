import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/clinic";

/**
 * Crawl rules.
 *
 * Search engines and AI answer engines are welcome: a woman asking ChatGPT,
 * Gemini, Perplexity, Claude or Copilot about her health should be able to
 * find MyStree's pages. The named agents below are already covered by the
 * wildcard; they are listed so the intent is explicit and survives edits.
 * Only internal API routes and the booking app's redirect route are kept
 * out of crawling (the previous site's robots.txt also disallowed
 * /booking-gateway).
 */
const AI_AGENTS = [
  "OAI-SearchBot", // ChatGPT search
  "ChatGPT-User", // ChatGPT browsing on a user's request
  "GPTBot", // OpenAI
  "Google-Extended", // Gemini
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/booking-gateway"] },
      { userAgent: AI_AGENTS, allow: "/", disallow: ["/api/", "/booking-gateway"] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
