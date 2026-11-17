"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/*
 * ThreeBackdrop: hosts one decorative three.js scene behind a section, built
 * so it can never get in the way of scrolling:
 *
 * - three.js and the scene load only when the section comes within 400px of
 *   the viewport (dynamic import), so they are not in the page's first load.
 * - The render loop runs only while the section is on screen and the tab is
 *   visible, at the scene's own frame cap (30fps for the paint shader).
 * - Pixel ratio is capped (1.5) and heavy scenes render at a reduced scale.
 * - Reduced motion, Save-Data, or a low-end device (≤4 cores and ≤4 GB):
 *   one still frame, no loop.
 * - Nothing listens to scroll. If WebGL fails, the canvas is removed and the
 *   section's CSS background stays.
 */
/** An element's box inside the backdrop, in UV units (0–1) measured from the top left. */
export type Anchor = { x: number; y: number; w: number; h: number };

export type SceneHandle = {
  /** Draw one frame. `time` is seconds of on-screen time; `dt` since last frame. */
  render(time: number, dt: number): void;
  resize(width: number, height: number, pixelRatio: number, anchor?: Anchor | null): void;
  dispose(): void;
  /** Frame cap. Defaults to 60. */
  fps?: number;
};

export type SceneOptions = { still: boolean; variant?: string };

export type SceneModule = {
  createScene(canvas: HTMLCanvasElement, options: SceneOptions): Promise<SceneHandle> | SceneHandle;
};

type Props = {
  load: () => Promise<SceneModule>;
  className?: string;
  /** Render-buffer scale relative to CSS size (e.g. 0.5 for soft shaders). */
  renderScale?: number;
  maxPixelRatio?: number;
  /** Passed to the scene (e.g. which layout to use). */
  variant?: string;
  /** An element the scene lays itself out around (measured on every resize). */
  anchorRef?: RefObject<HTMLElement | null>;
};

function prefersStill() {
  if (typeof window === "undefined") return true;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  if (nav.connection?.saveData) return true;
  const cores = nav.hardwareConcurrency ?? 8;
  const memory = nav.deviceMemory ?? 8;
  return cores <= 4 && memory <= 4;
}

export function ThreeBackdrop({ load, className, renderScale = 1, maxPixelRatio = 1.5, variant, anchorRef }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const hostEl = host.current;
    const canvasEl = canvas.current;
    if (!hostEl || !canvasEl) return;

    let handle: SceneHandle | null = null;
    let disposed = false;
    let visible = false;
    let frame = 0;
    let last = 0;
    let elapsed = 0;
    let lastDraw = 0;
    const still = prefersStill();

    const size = () => {
      if (!handle) return;
      const rect = hostEl.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, maxPixelRatio) * renderScale;
      let anchor: Anchor | null = null;
      const target = anchorRef?.current;
      if (target && rect.width > 0 && rect.height > 0) {
        const box = target.getBoundingClientRect();
        anchor = {
          x: (box.left - rect.left) / rect.width,
          y: (box.top - rect.top) / rect.height,
          w: box.width / rect.width,
          h: box.height / rect.height,
        };
      }
      handle.resize(Math.max(1, rect.width), Math.max(1, rect.height), ratio, anchor);
      if (still) handle.render(8, 0);
    };

    const loop = (now: number) => {
      frame = 0;
      if (!handle || disposed || !visible || document.hidden) return;
      const dt = last ? Math.min((now - last) / 1000, 0.1) : 0;
      last = now;
      elapsed += dt;
      const minGap = 1000 / (handle.fps ?? 60) - 2;
      if (now - lastDraw >= minGap) {
        lastDraw = now;
        handle.render(elapsed, dt);
      }
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (still || frame || !handle || !visible || document.hidden) return;
      last = 0;
      frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    const visibility = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      },
      { threshold: 0 },
    );

    const resize = new ResizeObserver(() => size());

    const near = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting || handle || disposed) return;
        near.disconnect();
        try {
          const module = await load();
          if (disposed) return;
          handle = await module.createScene(canvasEl, { still, variant });
          if (disposed) {
            handle.dispose();
            return;
          }
          size();
          resize.observe(hostEl);
          visibility.observe(hostEl);
        } catch (error) {
          console.warn("[ThreeBackdrop] scene unavailable", error);
          setFailed(true);
        }
      },
      { rootMargin: "1400px 0px" },
    );
    near.observe(hostEl);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      disposed = true;
      stop();
      near.disconnect();
      visibility.disconnect();
      resize.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      handle?.dispose();
      handle = null;
    };
  }, [load, renderScale, maxPixelRatio, variant, anchorRef]);

  return (
    <div ref={host} className={className} aria-hidden="true">
      {failed ? null : <canvas ref={canvas} style={{ display: "block", width: "100%", height: "100%" }} />}
    </div>
  );
}
