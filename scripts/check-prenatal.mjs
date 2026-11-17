import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const require = createRequire('C:/Users/Tilin Bijoy/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = require('playwright');
const browser = await chromium.launch({ headless: true, channel: 'chrome' });
const output = new URL('../docs/prenatal-preview/', import.meta.url);
await mkdir(output, { recursive: true });
const errors = [];
for (const width of [320, 390, 768, 1440]) {
  const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce', isMobile: width < 500, hasTouch: width < 500 });
  const page = await context.newPage();
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', message => {
    if (message.type() === 'error') errors.push(`Console: ${message.text()}`);
  });
  await page.goto('http://127.0.0.1:3000/services/prenatal', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const geometry = await page.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, headings: document.querySelectorAll('h1').length, fonts: [...document.fonts].filter(f => f.status === 'loaded').map(f => f.family) }));
  if (geometry.scrollWidth > width) throw new Error(`Overflow at ${width}: ${geometry.scrollWidth}`);
  if (geometry.headings !== 1) throw new Error('Expected one H1');
  const journeyButtons = page.locator('[aria-label="Interactive pregnancy journey chart"] [role="button"]');
  if (await journeyButtons.first().isVisible()) {
    await journeyButtons.nth(1).press('Enter');
    await page.waitForFunction(el => el.getAttribute('aria-pressed') === 'true', await journeyButtons.nth(1).elementHandle());
    await journeyButtons.nth(0).click();
    await page.waitForFunction(el => el.getAttribute('aria-pressed') === 'true', await journeyButtons.nth(0).elementHandle());
  }
  const secondAnswer = page.locator('details[name="prenatal-offerings"]').nth(1);
  await secondAnswer.locator('summary').click();
  if (!(await secondAnswer.evaluate(el => el.open))) throw new Error('Accordion did not open');
  if (await page.locator('details[name="prenatal-offerings"]').nth(0).evaluate(el => el.open)) throw new Error('Accordion group did not close previous item');
  await page.locator('details[name="prenatal-offerings"]').nth(0).locator('summary').click();
  if (width <= 1000) {
    await page.getByRole('button', { name: 'Next review', exact: true }).click();
    await page.waitForFunction(() => document.querySelector('[aria-labelledby="prenatal-reviews"] [aria-live="polite"]')?.textContent?.trim().startsWith('02'));
    await page.getByRole('button', { name: 'Next review', exact: true }).click();
    await page.waitForFunction(() => document.querySelector('[aria-labelledby="prenatal-reviews"] [aria-live="polite"]')?.textContent?.trim().startsWith('03'));
    if (!(await page.getByRole('button', { name: 'Next review', exact: true }).isDisabled())) throw new Error('End review not disabled');
    await page.getByRole('button', { name: 'Previous review', exact: true }).click();
    await page.getByRole('button', { name: 'Previous review', exact: true }).click();
  }
  await page.locator('[aria-labelledby="prenatal-faq"]').scrollIntoViewIfNeeded();
  await page.locator('[aria-labelledby="prenatal-close"]').scrollIntoViewIfNeeded();
  for (const img of await page.locator('main img').all()) {
    await img.scrollIntoViewIfNeeded();
    await img.evaluate(el => el.decode());
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.screenshot({ path: fileURLToPath(new URL(`prenatal-${width}.png`, output)), fullPage: true });
  if (width === 390 || width === 1440) {
    for (const [label, selector] of [['hero', '[aria-labelledby="prenatal-heading"]'], ['team', '[aria-labelledby="prenatal-team-heading"]'], ['journey', '[aria-labelledby="journey-heading"]'], ['reviews', '[aria-labelledby="prenatal-reviews"]']]) {
      await page.locator(selector).screenshot({ path: fileURLToPath(new URL(`${label}-${width}.png`, output)) });
    }
  }
  const brokenImages = await page.locator('main img').evaluateAll(imgs => imgs.filter(img => img.complete && img.naturalWidth === 0).map(img => img.src));
  if (brokenImages.length) throw new Error(`Broken images: ${brokenImages}`);
  console.log(JSON.stringify({ width, ...geometry, interactions: 'passed', brokenImages }));
  await context.close();
}

for (const width of [390, 1440]) {
  const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'no-preference', isMobile: width < 500, hasTouch: width < 500 });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000/services/prenatal', { waitUntil: 'networkidle' });
  const atmosphere = page.locator('[data-scroll-atmosphere]').first();
  const media = page.locator('[data-parallax-media]').first();
  const before = await Promise.all([atmosphere.locator('span').first().evaluate(el => getComputedStyle(el).transform), media.evaluate(el => getComputedStyle(el).transform)]);
  await page.evaluate(() => window.scrollTo({ top: Math.min(700, document.documentElement.scrollHeight / 5), behavior: 'instant' }));
  await page.waitForTimeout(150);
  const after = await Promise.all([atmosphere.locator('span').first().evaluate(el => getComputedStyle(el).transform), media.evaluate(el => getComputedStyle(el).transform)]);
  if (before[0] === after[0]) throw new Error(`Background scroll motion did not change at ${width}px`);
  if (before[1] === after[1]) throw new Error(`Image parallax did not change at ${width}px`);
  console.log(JSON.stringify({ width, scrollMotion: 'passed', atmosphereChanged: true, parallaxChanged: true }));
  await context.close();
}
await browser.close();
if (errors.length) throw new Error(errors.join('\n'));
console.log('No browser runtime errors.');
