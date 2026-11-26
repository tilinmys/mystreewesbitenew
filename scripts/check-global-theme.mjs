import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const require = createRequire('C:/Users/Tilin Bijoy/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = require('playwright');
const browser = await chromium.launch({ headless: true, channel: 'chrome' });
const output = new URL('../docs/theme-preview/', import.meta.url);
await mkdir(output, { recursive: true });

const expectedTokens = {
  '--bg-primary': '#fff',
  '--bg-secondary': '#faf1f3',
  '--bg-subtle-blue': '#faf1f3',
  '--surface-card': '#fff',
  '--text-primary': '#3e1e26',
  '--text-muted': '#6a424d',
  '--text-inverse': '#fff',
  '--border-subtle': '#e5ced3',
  '--border-blue': '#e5ced3',
  '--accent-flame': '#ad002b',
  '--accent-flame-hover': '#d60036',
  '--accent-pumpkin': '#9e6e7b',
  '--accent-cadet': '#9e6e7b',
};

const errors = [];
const routes = ['/', '/about', '/doctors', '/contact', '/services/prenatal', '/services/womens-health-check'];

for (const width of [390, 1440]) {
  const context = await browser.newContext({
    viewport: { width, height: 900 },
    reducedMotion: 'no-preference',
    isMobile: width < 500,
    hasTouch: width < 500,
  });
  for (const route of routes) {
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(`${route}: ${error.message}`));
    page.on('console', message => {
      if (message.type() === 'error') errors.push(`${route}: ${message.text()}`);
    });
    await page.goto(`http://127.0.0.1:3000${route}`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const result = await page.evaluate(expected => {
      const root = getComputedStyle(document.documentElement);
      const tokens = Object.fromEntries(Object.keys(expected).map(token => [token, root.getPropertyValue(token).trim().toLowerCase()]));
      const orangeSurfaces = [...document.querySelectorAll('body *')].flatMap(element => {
        const box = element.getBoundingClientRect();
        const background = getComputedStyle(element).backgroundColor;
        const isAction = element.matches('a, button, [role="button"]') || Boolean(element.closest('a, button, [role="button"]'));
        const isLarge = box.width > 180 && box.height > 96;
        const isOrange = ['rgb(232, 93, 48)', 'rgb(237, 91, 45)', 'rgb(255, 131, 60)'].includes(background);
        return isLarge && isOrange && !isAction ? [`${element.tagName.toLowerCase()}.${element.className}`] : [];
      });
      return {
        tokens,
        orangeSurfaces,
        bodyBackground: getComputedStyle(document.body).backgroundColor,
        bodyColor: getComputedStyle(document.body).color,
        scrollWidth: document.documentElement.scrollWidth,
        title: document.title,
      };
    }, expectedTokens);
    for (const [token, value] of Object.entries(expectedTokens)) {
      if (result.tokens[token] !== value) throw new Error(`${route}: ${token} resolved to ${result.tokens[token]}, expected ${value}`);
    }
    if (result.scrollWidth > width) throw new Error(`${route}: overflow ${result.scrollWidth}px at ${width}px`);
    if (result.orangeSurfaces.length) throw new Error(`${route}: large orange surfaces found: ${result.orangeSurfaces.join(', ')}`);
    if (!result.title) throw new Error(`${route}: missing page title`);
    if (route === '/' || route === '/services/prenatal') {
      const name = route === '/' ? 'home' : 'prenatal';
      await page.screenshot({ path: fileURLToPath(new URL(`${name}-${width}.png`, output)) });
    }
    if (route === '/') {
      const services = page.locator('#services');
      await services.scrollIntoViewIfNeeded();
      await services.screenshot({ path: fileURLToPath(new URL(`services-${width}.png`, output)) });
    }
    console.log(JSON.stringify({ route, width, bodyBackground: result.bodyBackground, bodyColor: result.bodyColor, overflow: false }));
    await page.close();
  }
  await context.close();
}

await browser.close();
if (errors.length) throw new Error(errors.join('\n'));
console.log('Global theme smoke check passed.');
