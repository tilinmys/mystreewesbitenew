"use client";

import { useEffect, useRef, type PropsWithChildren } from "react";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import Lenis from "lenis";

import { enableLiteMotion } from "@/lib/use-lite-motion";

/*
 * SmoothScroll (revised 16 Nov 2026).
 *
 * Lenis smooths mouse-wheel scrolling on capable desktops only. Everything
 * else uses the browser's own scrolling, which is always the smoothest
 * option there:
 * - touch screens (native momentum scrolling; emulating it can stutter on
 *   slower phones),
 * - low-end devices (4 or fewer cores with 4 GB or less memory) and
 *   Save-Data,
 * - reduced motion.
 *
 * While enabled: nested scrollers (the card rows, menus and dialogs) scroll
 * on their own; Lenis pauses whenever a menu or dialog locks the page
 * (html overflow: hidden) and resumes after, so the page is never left
 * stuck; the frame loop stops while the tab is hidden; and every new page
 * opens at its top.
 */
function wantsSmoothWheel() {
  if (typeof window === "undefined") return false;
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!fine) return false;
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  if (nav.connection?.saveData) return false;
  const cores = nav.hardwareConcurrency ?? 8;
  const memory = nav.deviceMemory ?? 8;
  return !(cores <= 4 && memory <= 4);
}

export function SmoothScroll({ children }: PropsWithChildren) {
  const reducedMotion = useReducedMotion();
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const firstPath = useRef(true);

  // Phone motion switch: on only after hydration (see use-lite-motion.ts).
  useEffect(() => {
    enableLiteMotion();
  }, []);

  useEffect(() => {
    if (reducedMotion || !wantsSmoothWheel()) return;

    const lenis = new Lenis({
      autoRaf: false,
      anchors: true,
      smoothWheel: true,
      syncTouch: false,
      lerp: 0.14,
      wheelMultiplier: 1,
      allowNestedScroll: true,
      autoResize: true,
    });
    lenisRef.current = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = window.requestAnimationFrame(raf);
    };
    const start = () => {
      if (!frame) frame = window.requestAnimationFrame(raf);
    };
    const stopLoop = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
    };
    start();

    const onVisibility = () => (document.hidden ? stopLoop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    // Follow page locks set by menus and dialogs.
    const root = document.documentElement;
    const syncLock = () => {
      if (root.style.overflow === "hidden" || document.body.style.overflow === "hidden") lenis.stop();
      else lenis.start();
    };
    const lockObserver = new MutationObserver(syncLock);
    lockObserver.observe(root, { attributes: true, attributeFilter: ["style"] });
    lockObserver.observe(document.body, { attributes: true, attributeFilter: ["style"] });

    return () => {
      stopLoop();
      lockObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  /* A new page opens at its top. Links to a #section are left to the browser. */
  useEffect(() => {
    if (firstPath.current) {
      firstPath.current = false;
      return;
    }
    if (window.location.hash) return;
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return children;
}

export default SmoothScroll;
