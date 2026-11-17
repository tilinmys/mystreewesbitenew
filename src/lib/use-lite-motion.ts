"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/*
 * Lite motion (17 Nov 2026): true on phones and other touch-first or narrow
 * screens. Sections call isLiteMotion() inside their scroll-linked
 * useTransform callbacks and return neutral values (no image scale or drift,
 * no clip-path reveal). On a phone those ran on every scroll frame and,
 * together with backdrop blur, made touch scrolling stutter. One-off
 * entrance animations and the text reveals stay.
 *
 * It reports false until the page has hydrated (enableLiteMotion() is
 * called from SmoothScroll's mount effect), so the first client render
 * matches the server HTML; after that the transform callbacks, which run on
 * scroll, read the screen type directly.
 */
const QUERY = "(max-width: 767px), (hover: none) and (pointer: coarse)";

let mql: MediaQueryList | null = null;
let hydrated = false;

export function enableLiteMotion() {
  hydrated = true;
}

export function isLiteMotion(): boolean {
  if (!hydrated || typeof window === "undefined") return false;
  mql ??= window.matchMedia(QUERY);
  return mql.matches;
}

/*
 * useStillAfterMount (17 Nov 2026): the visitor's reduced-motion preference,
 * reported only after mount. framer-motion's useReducedMotion() is null on
 * the server but true on the client's first render for those visitors, so
 * sections that render different markup for them failed to hydrate. This
 * keeps the first client render identical to the server HTML, then switches.
 */
export function useStillAfterMount(): boolean {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted && Boolean(reduced);
}
