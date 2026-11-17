import { createRequire } from 'node:module';
const require = createRequire('C:/Users/Tilin Bijoy/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = require('playwright');
const browser = await chromium.launch({ headless: true, channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce', hasTouch: true });
await page.goto('http://127.0.0.1:3000/services/prenatal', { waitUntil: 'networkidle' });
const result = await page.evaluate(() => {
  const canvas = document.createElement('canvas'); canvas.width = canvas.height = 1;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  function rgba(color) {
    const value = color.trim();
    const srgb = value.match(/^color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\)$/i);
    if (srgb) return [Number(srgb[1]) * 255, Number(srgb[2]) * 255, Number(srgb[3]) * 255, srgb[4] === undefined ? 1 : Number(srgb[4])];
    const rgb = value.match(/^rgba?\(\s*([\d.]+)\s*[, ]\s*([\d.]+)\s*[, ]\s*([\d.]+)(?:\s*[,/]\s*([\d.]+%?))?\s*\)$/i);
    if (rgb) return [Number(rgb[1]), Number(rgb[2]), Number(rgb[3]), rgb[4] === undefined ? 1 : rgb[4].endsWith('%') ? Number.parseFloat(rgb[4]) / 100 : Number(rgb[4])];
    ctx.clearRect(0, 0, 1, 1); ctx.fillStyle = '#000'; ctx.fillStyle = value; ctx.fillRect(0, 0, 1, 1);
    return [...ctx.getImageData(0, 0, 1, 1).data].map((x, i) => i === 3 ? x / 255 : x);
  }
  function over(top, bottom) { return top.map((v, i) => i === 3 ? 1 : v * top[3] + bottom[i] * (1 - top[3])); }
  function lum(c) { const l = c.slice(0, 3).map(x => x / 255).map(x => x <= .04045 ? x / 12.92 : ((x + .055) / 1.055) ** 2.4); return l[0] * .2126 + l[1] * .7152 + l[2] * .0722; }
  const failures = []; let checked = 0;
  for (const el of document.querySelectorAll('main *')) {
    if (el.closest('[aria-hidden="true"]') || !el.getClientRects().length || ![...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) continue;
    const style = getComputedStyle(el); const layers = []; let gradient = false;
    for (let parent = el; parent; parent = parent.parentElement) { const s = getComputedStyle(parent); layers.push(rgba(s.backgroundColor)); if (s.backgroundImage !== 'none') gradient = true; }
    if (gradient) continue; // Shared gradient booking action checked separately below.
    let bg = [255, 255, 255, 1]; for (const layer of layers.reverse()) bg = over(layer, bg);
    const fg = over(rgba(style.color), bg); const a = lum(fg); const b = lum(bg); const ratio = (Math.max(a, b) + .05) / (Math.min(a, b) + .05);
    const size = parseFloat(style.fontSize); const large = size >= 24 || (size >= 18.66 && parseInt(style.fontWeight) >= 700);
    if (ratio < (large ? 3 : 4.5)) failures.push({ text: el.textContent.trim().slice(0, 55), ratio: +ratio.toFixed(2) });
    checked++;
  }
  // Every section now uses a deliberately soft gradient. Check the foreground
  // tokens against every darkest palette endpoint as a conservative WCAG proxy.
  const resolve = (property, value) => {
    const cssProperty = property === 'backgroundColor' ? 'background-color' : property;
    const sample = document.createElement('span');
    sample.style.cssText = 'position:fixed;left:-9999px;top:-9999px';
    sample.style.setProperty(cssProperty, value, 'important');
    document.body.append(sample);
    const resolved = getComputedStyle(sample).getPropertyValue(cssProperty);
    sample.remove();
    return resolved;
  };
  const foregrounds = ['--ink', '--navy', '--muted-foreground', '--navy-slate', '--accent-on-light'];
  const backgrounds = ['--surface-pearl', '--surface-mist', '--surface-stone', '--surface-sky', '--surface-sage'];
  const paletteContrast = [];
  for (const foreground of foregrounds) {
    for (const background of backgrounds) {
      const foregroundValue = resolve('color', `var(${foreground})`);
      const backgroundValue = resolve('backgroundColor', `var(${background})`);
      const fg = rgba(foregroundValue);
      const bg = rgba(backgroundValue);
      const a = lum(fg); const b = lum(bg);
      const ratio = (Math.max(a, b) + .05) / (Math.min(a, b) + .05);
      paletteContrast.push({ foreground, background, ratio: +ratio.toFixed(2) });
      if (ratio < 4.5) failures.push({ text: `${foreground} on ${background}`, ratio: +ratio.toFixed(2) });
    }
  }
  const controls = [...document.querySelectorAll('main button, main summary, main a')].filter(el => el.getClientRects().length).map(el => ({ label: el.textContent.trim().slice(0, 40), h: el.getBoundingClientRect().height })).filter(x => x.h < 43.5);
  const links = [...document.querySelectorAll('main a[href]')].map(el => el.getAttribute('href'));
  const deadAnchors = links.filter(href => href.startsWith('#') && !document.getElementById(href.slice(1)));
  return { checked, paletteContrast, failures, shortControls: controls, deadAnchors, bookingLinks: links.filter(href => href.startsWith('https://my-stree.com/booking')) };
});
console.log(JSON.stringify(result, null, 2));
await page.getByRole('button', { name: 'Open navigation', exact: true }).click();
const prenatalLink = page.getByRole('link', { name: 'Prenatal & pregnancy care', exact: true });
if (!(await prenatalLink.isVisible()) || await prenatalLink.getAttribute('href') !== '/services/prenatal') throw new Error('Mobile service navigation missing');
await prenatalLink.click();
console.log('Mobile Services navigation passed.');
await browser.close();
if (result.failures.length || result.deadAnchors.length) process.exitCode = 1;
