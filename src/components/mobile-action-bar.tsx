import { Phone } from "lucide-react";

import { clinic } from "@/lib/clinic";
import styles from "./mobile-action-bar.module.css";

const WHATSAPP_URL = `https://wa.me/${clinic.telephone.replace("+", "")}?text=${encodeURIComponent(
  "Hi MyStree, I would like to ask about an appointment.",
)}`;

function WhatsAppLogo() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
      className={styles.waIcon}
    >
      <path d="M16.01 3.2c-7.07 0-12.8 5.73-12.8 12.8 0 2.26.59 4.46 1.71 6.4L3.1 28.9l6.68-1.75a12.75 12.75 0 0 0 6.23 1.62h.01c7.06 0 12.8-5.73 12.8-12.8 0-3.42-1.33-6.64-3.75-9.05a12.71 12.71 0 0 0-9.06-3.72Zm0 23.4h-.01a10.6 10.6 0 0 1-5.41-1.48l-.39-.23-3.96 1.04 1.06-3.86-.25-.4a10.57 10.57 0 0 1-1.62-5.67c0-5.85 4.76-10.61 10.62-10.61 2.83 0 5.5 1.1 7.5 3.11a10.55 10.55 0 0 1 3.11 7.5c0 5.85-4.76 10.6-10.65 10.6Zm5.82-7.95c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.72.16-.21.32-.82 1.04-1.01 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66 0 1.57 1.14 3.09 1.3 3.3.16.21 2.25 3.44 5.45 4.82.76.33 1.36.53 1.82.67.76.24 1.46.21 2.01.13.61-.09 1.89-.77 2.15-1.52.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.37Z" />
    </svg>
  );
}

export function MobileActionBar() {
  return (
    <nav className={styles.bar} aria-label="Quick clinic contact">
      <a href={`tel:${clinic.telephone}`} className={styles.call}>
        <Phone size={16} strokeWidth={2} aria-hidden="true" />
        <span>Call</span>
      </a>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.whatsapp}
      >
        <WhatsAppLogo />
        <span>WhatsApp</span>
      </a>
    </nav>
  );
}
