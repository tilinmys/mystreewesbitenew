import type { NextConfig } from "next";

/**
 * Image delivery.
 *
 * The editorial photography is the page, so it is served at a higher quality
 * than Next's default 75 — visible softness on skin texture and fabric was the
 * reason to add this file. Next 16 requires every non-default quality used by a
 * component to be declared here, so `quality={88}` elsewhere resolves against
 * this list. Doctor portraits use 90 and the prenatal hero's close crop uses
 * 95, so both values are explicitly allowlisted instead of being silently
 * coerced during development.
 *
 * AVIF is listed first: it is materially smaller than WebP at the same visual
 * quality, so raising quality costs little bandwidth. Browsers that do not
 * accept AVIF fall back to WebP automatically via content negotiation.
 */
const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/team-2",
        destination: "/team",
        permanent: false,
      },
      // Replaced by the full service page; a permanent redirect passes the
      // old URL's links and ranking to the new one.
      {
        source: "/clinics/pelvic-health",
        destination: "/services/pelvic-floor-physiotherapy",
        permanent: true,
      },

      // Booking lives in the booking app under /booking on the same domain
      // (it fires the Google Ads conversion). /book was a placeholder.
      { source: "/book", destination: "https://my-stree.com/booking", permanent: false },

      // URLs of the previous my-stree.com site (its sitemap, Oct 2026), so
      // indexed pages, ads and shared links land on their new equivalents.
      { source: "/services/obgyn", destination: "/services/obgyn-consults", permanent: true },
      { source: "/services/fertility", destination: "/services/fertility-clinic", permanent: true },
      { source: "/services/nutrition", destination: "/services/nutrition-counselling", permanent: true },
      { source: "/services/physiotherapy", destination: "/services/pelvic-floor-physiotherapy", permanent: true },
      { source: "/terms-of-service", destination: "/terms-and-conditions", permanent: true },

      // Old pages with no equivalent on this site (website review, 23 Nov 2026).
      // Temporary, so they can point back if gallery, events or MyStree Soul
      // pages are rebuilt here. The egg-freezing article was retired on purpose
      // and its nearest page is the fertility consultation page.
      { source: "/showcase/:path*", destination: "/about", permanent: false },
      { source: "/events/:path*", destination: "/about", permanent: false },
      { source: "/mystree-soul", destination: "/about", permanent: false },
      { source: "/blog/egg-freezing-india-guide", destination: "/services/fertility-clinic", permanent: true },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 88, 90, 92, 95],
    // Portrait crops are served into narrow columns; the extra small widths
    // stop a 440px-wide frame from being handed a 640px file on a 1x screen.
    // 2560 and 3840 serve full-bleed photos sharp on 125–200% scaled screens.
    deviceSizes: [360, 420, 640, 750, 828, 1080, 1200, 1440, 1920, 2048, 2560, 3840],
    imageSizes: [160, 256, 320, 384, 512],
    // Clinician photos served by the live booking system (lib/booking.ts).
    remotePatterns: [{ protocol: "https", hostname: "my-stree.com", pathname: "/uploads/doctors/**" }],
  },
};

export default nextConfig;
