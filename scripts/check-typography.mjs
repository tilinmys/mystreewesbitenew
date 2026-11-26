import { createRequire } from "node:module";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

const require = createRequire(
  "C:/Users/Tilin Bijoy/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json",
);
const { chromium } = require("playwright");

const baseUrl = process.env.BASE_URL ?? "http://127.0.0.1:3000";
const routes = [
  "/",
  "/about",
  "/team",
  "/doctors",
  "/clinics/pcos",
  "/services/obgyn-consults",
  "/services/prenatal",
  "/services/womens-health-check",
  "/packages/hormonal-iud-care",
  "/blog",
  "/faqs",
  "/contact",
  "/privacy-policy",
  "/terms-and-conditions",
];
const widths = [390, 1440];
const browser = await chromium.launch({ headless: true, channel: "chrome" });
const failures = [];
const previewDirectory = join(process.cwd(), "docs", "typography-preview");
await mkdir(previewDirectory, { recursive: true });

for (const width of widths) {
  for (const route of routes) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      reducedMotion: "reduce",
      isMobile: width < 500,
      hasTouch: width < 500,
    });
    const page = await context.newPage();
    await page.goto(`${baseUrl}${route}`, { waitUntil: "load", timeout: 30000 });
    await page.evaluate(() => document.fonts.ready);

    const result = await page.evaluate(() => {
      const body = getComputedStyle(document.body);
      const headingIssues = [...document.querySelectorAll("main h1, main h2")]
        .filter((element) => {
          if (element.getClientRects().length === 0) return false;
          if ([...element.classList].some((c) => /eyebrow/i.test(c))) return false;
          const rect = element.getBoundingClientRect();
          const style = getComputedStyle(element);
          return rect.width > 2 && rect.height > 2 && style.clip === "auto";
        })
        .flatMap((element) => {
          const style = getComputedStyle(element);
          const rect = element.getBoundingClientRect();
          const expectedWeight = "400";
          const issues = [];
          if (!style.fontFamily.toLowerCase().includes("fraunces")) issues.push(`family:${style.fontFamily}`);
          if (style.fontWeight !== expectedWeight) issues.push(`weight:${style.fontWeight}`);
          if (rect.left < -1 || rect.right > innerWidth + 1 || element.scrollWidth > element.clientWidth + 2) {
            issues.push("horizontal-clipping");
          }
          return issues.length
            ? [{ tag: element.tagName, text: element.textContent?.trim().slice(0, 80), issues }]
            : [];
        });

      const subheadingIssues = [...document.querySelectorAll("main h3")]
        .filter((element) => {
          if (element.getClientRects().length === 0) return false;
          if (
            window.location.pathname.startsWith("/faq") &&
            [...element.classList].some((c) => /groupTitle/i.test(c))
          ) {
            return false;
          }
          const rect = element.getBoundingClientRect();
          const style = getComputedStyle(element);
          return rect.width > 2 && rect.height > 2 && style.clip === "auto";
        })
        .flatMap((element) => {
          const style = getComputedStyle(element);
          const issues = [];
          if (!style.fontFamily.toLowerCase().includes("plus jakarta sans")) issues.push(`family:${style.fontFamily}`);
          if (style.fontWeight !== "600") issues.push(`weight:${style.fontWeight}`);
          return issues.length
            ? [{ tag: element.tagName, text: element.textContent?.trim().slice(0, 80), issues }]
            : [];
        });

      const metadataSelector = [
        '[class*="eyebrow" i]',
        '[class*="sectionLabel"]',
        '[class*="cardSpecialty"]',
        '[class*="dossierSpecialty"]',
        '[class*="categoryEyebrow"]',
        '[class*="appointmentBadge"]',
        '[class*="markerBadge"]',
        '[class*="photoVerifiedBadge"]',
        ...(window.location.pathname.startsWith("/faq") ? ['[class*="groupTitle"]'] : []),
      ].join(",");
      const metadataIssues = [...document.querySelectorAll(metadataSelector)]
        .filter((element) => element.getClientRects().length > 0 && element.tagName !== "DIV")
        .flatMap((element) => {
          const style = getComputedStyle(element);
          const issues = [];
          if (!style.fontFamily.toLowerCase().includes("jetbrains mono")) issues.push(`family:${style.fontFamily}`);
          if (style.fontWeight !== "500") issues.push(`weight:${style.fontWeight}`);
          if (element.scrollWidth > element.clientWidth + 2) issues.push("horizontal-clipping");
          return issues.length
            ? [{ text: element.textContent?.trim().slice(0, 80), issues }]
            : [];
        });

      return {
        bodyFamily: body.fontFamily,
        bodyColor: body.color,
        bodyBackground: body.backgroundColor,
        documentOverflow: document.documentElement.scrollWidth > innerWidth,
        headingIssues,
        subheadingIssues,
        metadataIssues,
        loadedFonts: [...document.fonts]
          .filter((font) => font.status === "loaded")
          .map((font) => font.family),
      };
    });

    if (!result.bodyFamily.toLowerCase().includes("plus jakarta sans")) {
      failures.push(`${route} @ ${width}: body is not Plus Jakarta Sans`);
    }
    if (result.bodyColor !== "rgb(62, 30, 38)") {
      failures.push(`${route} @ ${width}: body text is ${result.bodyColor}`);
    }
    if (result.bodyBackground !== "rgb(255, 255, 255)") {
      failures.push(`${route} @ ${width}: body background is ${result.bodyBackground}`);
    }
    if (result.documentOverflow) failures.push(`${route} @ ${width}: document overflow`);
    if (result.headingIssues.length) {
      failures.push(`${route} @ ${width}: heading issues ${JSON.stringify(result.headingIssues)}`);
    }
    if (result.subheadingIssues.length) {
      failures.push(`${route} @ ${width}: subheading issues ${JSON.stringify(result.subheadingIssues)}`);
    }
    if (result.metadataIssues.length) {
      failures.push(`${route} @ ${width}: metadata issues ${JSON.stringify(result.metadataIssues)}`);
    }

    if (route === "/services/prenatal" && (width === 390 || width === 1440)) {
      await page.screenshot({
        path: join(previewDirectory, `prenatal-${width}.png`),
        fullPage: true,
      });
    }

    console.log(JSON.stringify({ route, width, ...result }));
    await context.close();
  }
}

await browser.close();
if (failures.length) throw new Error(failures.join("\n"));
console.log("Typography responsive audit passed.");
