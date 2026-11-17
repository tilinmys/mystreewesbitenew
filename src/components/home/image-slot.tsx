import Image from "next/image";

import type { ImageSlotData } from "./home-images";
import styles from "./image-slot.module.css";

type Props = {
  slot: ImageSlotData;
  sizes: string;
  className?: string;
  priority?: boolean;
  /** Decorative use (e.g. a hero background): empty alt on the real image. */
  decorative?: boolean;
  /** Small slots: the placeholder shows only its label and file name. */
  compact?: boolean;
};

/**
 * An image that may not exist yet. Ready: the photograph. Not ready: the
 * fallback photograph if there is one, otherwise a quiet placeholder that
 * names the expected file and shows the brief (the slot's alt).
 */
export function ImageSlot({ slot, sizes, className, priority, decorative, compact }: Props) {
  const src = slot.ready ? slot.src : slot.fallback;
  if (src) {
    return (
      <Image
        src={src}
        alt={decorative || !slot.ready ? "" : slot.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={className}
      />
    );
  }
  return (
    <div
      className={`${styles.placeholder} ${compact ? styles.compact : ""}`}
      role="img"
      aria-label={slot.alt}
      data-image-slot={slot.src}
      title={compact ? slot.alt : undefined}
    >
      <span className={styles.label}>{compact ? "Image" : "Image placeholder"}</span>
      <span className={styles.file}>{slot.src.split("/").pop()}</span>
      {compact ? null : <span className={styles.brief}>{slot.alt}</span>}
    </div>
  );
}
