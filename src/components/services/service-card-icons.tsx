/*
 * Small UI icons for the specialist booking card (user's card mockup,
 * 9 Oct 2026). 24-unit grid, 1.6 stroke, round ends, colour from
 * currentColor; decorative, so always aria-hidden.
 *
 * No heart motif (user instruction, 8 Oct 2026): where the mockup used a
 * heart for pregnancy loss, "care" (hands holding a circle) is used.
 */

import type { ReactNode } from "react";

export type CardIconName =
  | "pregnancy"
  | "care"
  | "cycle"
  | "seedling"
  | "uterus"
  | "leaf"
  | "mind"
  | "experience"
  | "specialist"
  | "calendar"
  | "receipt"
  | "chevron"
  | "arrow"
  | "dot";

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const PATHS: Record<CardIconName, ReactNode> = {
  pregnancy: (
    <>
      <circle cx="11" cy="4.6" r="2.2" {...S} />
      <path d="M10 8.2 C8.6 10.2 8.8 12.7 10 14.3 L9.6 21" {...S} />
      <path d="M10.6 9.7 C14.5 10.6 16.6 13.6 15.7 16.6 C15 18.7 12.7 19.4 10.8 18.5" {...S} />
    </>
  ),
  care: (
    <>
      <circle cx="12" cy="8" r="3" {...S} />
      <path d="M4 13.2 C6 13.2 8 14.6 9.6 16 H14.4 M20 13.2 C18 13.2 16 14.6 14.4 16" {...S} />
      <path d="M4 17.6 C7 17.6 9 19.6 12 19.6 C15 19.6 17 17.6 20 17.6" {...S} />
    </>
  ),
  cycle: <path d="M12 3.5 C9 7.5 6.5 10.5 6.5 14 A5.5 5.5 0 0 0 17.5 14 C17.5 10.5 15 7.5 12 3.5 Z" {...S} />,
  seedling: (
    <>
      <path d="M5 20 H19 M12 20 V10" {...S} />
      <path d="M12 13.5 C8.5 13.5 6.5 11.5 6.5 8.5 C9.5 8.5 11.5 10.5 12 13.5 Z" {...S} />
      <path d="M12 10.8 C12.5 7.8 14.5 5.8 17.5 5.8 C17.5 8.8 15.5 10.8 12 10.8 Z" {...S} />
    </>
  ),
  uterus: (
    <>
      <path d="M8 7 Q12 5 16 7 Q16.3 12.5 13.5 15 L13 19 H11 L10.5 15 Q7.7 12.5 8 7 Z" {...S} />
      <path d="M8 7.6 C6 6.6 4.6 7.2 4.3 8.9 M16 7.6 C18 6.6 19.4 7.2 19.7 8.9" {...S} />
      <circle cx="4.3" cy="10.4" r="1.2" {...S} />
      <circle cx="19.7" cy="10.4" r="1.2" {...S} />
    </>
  ),
  leaf: <path d="M5 19 C5 11 10 5 19 5 C19 14 13 19 5 19 Z M5 19 L13 11" {...S} />,
  mind: (
    <>
      <path d="M9 21 V17.5 C6.5 16.3 5 13.8 5.3 11 C5.8 7 9 4.5 12.8 4.6 C16.5 4.8 19 7.6 19 11 L20.5 13.8 L19 14.3 V16.5 C19 17.6 18.1 18.3 17 18.3 H15 V21" {...S} />
      <path d="M12.5 14 V10.4 M12.5 11.2 C10.8 11.2 9.8 10.1 9.6 8.5 C11.2 8.5 12.3 9.6 12.5 11.2 Z" {...S} />
    </>
  ),
  experience: (
    <>
      <path d="M4.5 8 H19.5 A1.5 1.5 0 0 1 21 9.5 V18.5 A1.5 1.5 0 0 1 19.5 20 H4.5 A1.5 1.5 0 0 1 3 18.5 V9.5 A1.5 1.5 0 0 1 4.5 8 Z" {...S} />
      <path d="M9 8 V6 A1 1 0 0 1 10 5 H14 A1 1 0 0 1 15 6 V8 M12 11.5 V16.5 M9.5 14 H14.5" {...S} />
    </>
  ),
  // A ribbon award rather than a star: a star reads as a rating, which the
  // NMC notice of 06.10.2026 does not allow.
  specialist: (
    <>
      <circle cx="12" cy="9" r="5" {...S} />
      <path d="M9.2 13.4 L7.6 20.5 L12 18.6 L16.4 20.5 L14.8 13.4" {...S} />
    </>
  ),
  calendar: (
    <>
      <path d="M5 6 H19 A1.5 1.5 0 0 1 20.5 7.5 V19 A1.5 1.5 0 0 1 19 20.5 H5 A1.5 1.5 0 0 1 3.5 19 V7.5 A1.5 1.5 0 0 1 5 6 Z" {...S} />
      <path d="M3.5 10.5 H20.5 M8 3.5 V8 M16 3.5 V8" {...S} />
      <path d="M8 14 h.01 M12 14 h.01 M16 14 h.01 M8 17.4 h.01 M12 17.4 h.01" {...S} strokeWidth={2.2} />
    </>
  ),
  receipt: (
    <path
      d="M6 3.5 H18 V20.5 L15.5 19 L13 20.5 L10.5 19 L8 20.5 L6 19.3 Z M9 8 H15 M9 11.5 H15 M9 15 H12.5"
      {...S}
    />
  ),
  chevron: <path d="M9 6 L15 12 L9 18" {...S} />,
  arrow: <path d="M5 12 H19 M13 6 L19 12 L13 18" {...S} />,
  dot: <circle cx="12" cy="12" r="3" {...S} />,
};

export function CardIcon({ name, className }: { name: CardIconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      {PATHS[name]}
    </svg>
  );
}

/** Picks an icon for a focus area or specialty from its words. */
export function iconFor(label: string): CardIconName {
  const text = label.toLowerCase();
  if (/loss|miscarriage/.test(text)) return "care";
  if (/pregnan|antenatal|obstetric/.test(text)) return "pregnancy";
  if (/fertil|ivf|infertil|reproduct|conceiv/.test(text)) return "seedling";
  if (/pcos|period|menstru|hormon|cycle|endocrin/.test(text)) return "cycle";
  if (/surgery|endometrio|gynae|gyne|uter/.test(text)) return "uterus";
  if (/nutri|diet/.test(text)) return "leaf";
  if (/anxi|mood|mental|psych/.test(text)) return "mind";
  return "dot";
}

/** The mockup's shield-and-cross mark on the portrait. */
export function MedicalMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path d="M12 3 L19 5.8 V11 C19 15.6 16.1 19.4 12 21 C7.9 19.4 5 15.6 5 11 V5.8 Z" fill="currentColor" />
      <path d="M12 8.6 V15.4 M8.6 12 H15.4" stroke="#fff" strokeWidth={2.2} strokeLinecap="round" />
    </svg>
  );
}
