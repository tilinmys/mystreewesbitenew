/*
 * Line drawings for ServiceFit — v2, the "fine line" set.
 *
 * Style (after the user's reference): abstract and geometric rather than
 * literal; one hairline stroke, round ends, no fills, no badge behind them;
 * small accents — tiny crosses, satellite circles, a ground line — carry the
 * meaning. Drawn on a 64-unit grid, centred, using roughly the middle 44
 * units so every drawing has the same optical weight.
 *
 * Every element carries pathLength={1} for the LINE DRAW animation.
 * Colour comes from `currentColor`.
 */

import type { ReactNode } from "react";

export type ServiceFitIconName =
  | "cycle"
  | "uterus"
  | "seedling"
  | "branch"
  | "calendar"
  | "embryo-lens"
  | "ovary"
  | "frozen-egg"
  | "conversation"
  | "mind"
  | "monitor"
  | "pregnancy";

const STROKE = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.1,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  pathLength: 1,
} as const;

/** A small x, as in the reference's diamond. */
const cross = (x: number, y: number, r = 1.6) =>
  `M${x - r} ${y - r} L${x + r} ${y + r} M${x + r} ${y - r} L${x - r} ${y + r}`;

/* ------------------------------------------------------- women's health */

/* The monthly cycle: an orbit with three phases travelling round it. */
function Cycle() {
  return (
    <>
      <circle cx="32" cy="32" r="15" {...STROKE} />
      <circle cx="32" cy="17" r="3.6" {...STROKE} />
      <circle cx="45" cy="39.5" r="3" {...STROKE} />
      <circle cx="21.4" cy="42.6" r="2.3" {...STROKE} />
      <circle cx="32" cy="32" r="1.1" {...STROKE} />
    </>
  );
}

/* The uterus, reduced to a soft vessel with its two ovaries. */
function Uterus() {
  return (
    <>
      <path d="M22.5 23 Q32 18.5 41.5 23 Q42 33.5 36 39.5 L35 46 H29 L28 39.5 Q22 33.5 22.5 23 Z" {...STROKE} />
      <path d="M22.5 24 C18 21.5 14.5 23 13.8 27.2 M41.5 24 C46 21.5 49.5 23 50.2 27.2" {...STROKE} />
      <circle cx="13.6" cy="30.3" r="2.8" {...STROKE} />
      <circle cx="50.4" cy="30.3" r="2.8" {...STROKE} />
      <circle cx="32" cy="30" r="1.1" {...STROKE} />
    </>
  );
}

/* A sprout on a ground line: growth, a plan for later. */
function Seedling() {
  return (
    <>
      <path d="M16 49 Q32 46 48 49" {...STROKE} />
      <path d="M32 47.5 V22.5" {...STROKE} />
      <path d="M32 39 C27.5 39 25 36.5 24.5 32.5 C28.5 32.5 31.5 35 32 39 Z" {...STROKE} />
      <path d="M32 32.5 C32.5 28.5 35 26 39 25.5 C39 29.5 36.5 32 32 32.5 Z" {...STROKE} />
      <path d="M32 24.5 C30 22.5 29.5 20 30.5 17.5 C32.5 19 33.2 21.5 32 24.5 Z" {...STROKE} />
    </>
  );
}

/* A branch letting one leaf go: change, met calmly. */
function Branch() {
  return (
    <>
      <path d="M17 46 C25 40 33 31.5 42.5 20" {...STROKE} />
      <path d="M24.5 41 C21 38.5 20.5 34.5 22 31.5 C25 34 26 37.5 24.5 41 Z" {...STROKE} />
      <path d="M30.5 34.8 C34 36.3 37.5 35.8 40 33.3 C37 30.8 33 31.3 30.5 34.8 Z" {...STROKE} />
      <path d="M36 28 C33 25 32.5 21.5 34 18.5 C37 21 38 24.5 36 28 Z" {...STROKE} />
      <path d="M42.5 49 C44 45.8 47 44.4 50 44.8 C49 48 46 49.4 42.5 49 Z" {...STROKE} />
      <circle cx="45.4" cy="31" r="0.5" {...STROKE} />
      <circle cx="46.6" cy="35.6" r="0.5" {...STROKE} />
      <circle cx="47.1" cy="40" r="0.5" {...STROKE} />
    </>
  );
}

/* --------------------------------------------------------------- fertility */

/* A month of trying: the reference's diamond, days crossed off, one ringed. */
function Calendar() {
  return (
    <>
      <path d="M32 12.5 L51.5 32 L32 51.5 L12.5 32 Z" {...STROKE} />
      <path d={[cross(32, 23.5), cross(23.5, 32), cross(40.5, 32), cross(32, 40.5)].join(" ")} {...STROKE} />
      <circle cx="32" cy="32" r="2.6" {...STROKE} />
    </>
  );
}

/* A closer look: a lens over an early four-cell embryo. */
function EmbryoLens() {
  return (
    <>
      <circle cx="28.5" cy="28.5" r="12.5" {...STROKE} />
      <path d="M37.4 37.4 L48 48" {...STROKE} />
      <circle cx="28.5" cy="28.5" r="7.6" {...STROKE} />
      <circle cx="26.2" cy="26.2" r="2.3" {...STROKE} />
      <circle cx="30.8" cy="26.2" r="2.3" {...STROKE} />
      <circle cx="26.2" cy="30.8" r="2.3" {...STROKE} />
      <circle cx="30.8" cy="30.8" r="2.3" {...STROKE} />
    </>
  );
}

/* Ovarian reserve: follicles as a cluster of circles, one maturing. */
function Ovary() {
  return (
    <>
      <circle cx="26" cy="37" r="9" {...STROKE} />
      <circle cx="39" cy="25" r="6.5" {...STROKE} />
      <circle cx="39" cy="25" r="2.8" {...STROKE} />
      <circle cx="42" cy="40.5" r="2.6" {...STROKE} />
      <circle cx="21.5" cy="22.5" r="1.6" {...STROKE} />
    </>
  );
}

/* Egg freezing: an egg cell held still, a small frost star beside it. */
function FrozenEgg() {
  return (
    <>
      <circle cx="29" cy="35" r="13" {...STROKE} />
      <circle cx="29" cy="35" r="8.6" {...STROKE} />
      <circle cx="26.5" cy="32.5" r="2" {...STROKE} />
      <path d="M48 11 V21 M43.7 13.5 L52.3 18.5 M43.7 18.5 L52.3 13.5" {...STROKE} />
    </>
  );
}

/* ------------------------------------------------------------ adolescent */

/* Questions asked out loud: two speech shapes, one answering the other. */
function Conversation() {
  return (
    <>
      <path d="M14 18 H36 A3 3 0 0 1 39 21 V32 A3 3 0 0 1 36 35 H23 L17 40 V35 H14 A3 3 0 0 1 11 32 V21 A3 3 0 0 1 14 18 Z" {...STROKE} />
      <path d="M43 26 H50 A3 3 0 0 1 53 29 V40 A3 3 0 0 1 50 43 H48 V48 L42 43 H31 A3 3 0 0 1 28 40 V38.5" {...STROKE} />
      <circle cx="19" cy="26.5" r="0.7" {...STROKE} />
      <circle cx="25" cy="26.5" r="0.7" {...STROKE} />
      <circle cx="31" cy="26.5" r="0.7" {...STROKE} />
    </>
  );
}

/* Wellbeing: a head in profile, a sprout growing where thoughts sit. */
function Mind() {
  return (
    <>
      <path d="M24 52 V44 C17 41 13.5 34.5 14.5 27 C16 17 24 11 33 11.5 C42 12 49 19 49 28 C49 31 50.5 33 52 35.5 C52.6 36.5 52 37.5 51 37.7 L48.5 38.2 V43 C48.5 45.5 46.5 47 44 47 H39.5 V52" {...STROKE} />
      <path d="M32 35 C32 31 32 27.5 33 24" {...STROKE} />
      <path d="M33 26.5 C29 26.5 26 24 25.5 20 C29.5 19.8 32.5 22.5 33 26.5 Z" {...STROKE} />
      <path d="M33.5 24 C34.5 20.5 37.5 18.5 41 18.5 C40.5 22 37.5 24.2 33.5 24 Z" {...STROKE} />
    </>
  );
}

/* ------------------------------------------------------------ prenatal */

/* Closer monitoring: a soft screen with a steady trace across it. */
function Monitor() {
  return (
    <>
      <path d="M14 16 H50 A3 3 0 0 1 53 19 V41 A3 3 0 0 1 50 44 H14 A3 3 0 0 1 11 41 V19 A3 3 0 0 1 14 16 Z" {...STROKE} />
      <path d="M16 31 H24 L27.5 23.5 L32 38 L35.5 28 L38 31 H48" {...STROKE} />
      <path d="M26 50 H38 M32 44 V50" {...STROKE} />
    </>
  );
}

/* Pregnancy: a profile curving round the bump, a small circle within. */
function Pregnancy() {
  return (
    <>
      <circle cx="29" cy="13.5" r="4.5" {...STROKE} />
      <path d="M27 20 C24 25 24 31 26.5 35.5 L25.5 52" {...STROKE} />
      <path d="M28.5 23.5 C38 25 43.5 31.5 42 39 C40.8 45 35 47.5 29.5 45.5" {...STROKE} />
      <circle cx="34" cy="36" r="3" {...STROKE} />
    </>
  );
}

const ICONS: Record<ServiceFitIconName, () => ReactNode> = {
  cycle: Cycle,
  uterus: Uterus,
  seedling: Seedling,
  branch: Branch,
  calendar: Calendar,
  "embryo-lens": EmbryoLens,
  ovary: Ovary,
  "frozen-egg": FrozenEgg,
  conversation: Conversation,
  mind: Mind,
  monitor: Monitor,
  pregnancy: Pregnancy,
};

export function ServiceFitIcon({ name, className }: { name: ServiceFitIconName; className?: string }) {
  const Drawing = ICONS[name];
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <Drawing />
    </svg>
  );
}
