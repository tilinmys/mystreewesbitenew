const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        mystree: {
          // Pure Deep Burgundy Foundations
          midnight: "#5C0017",        // Pure Oxblood Deep headers & deep accents
          chamber: "#800020",         // Pure Classic Burgundy surfaces & accents
          velvet: "#7A001E",          // Pure Deep Burgundy dark ground top
          "velvet-deep": "#520014",   // Pure Deep Oxblood dark ground base

          // Pure Light Foundations & Highlights
          canvas: "#FFFFFF",          // Pure white crisp canvas
          card: "#FFFFFF",            // Pure white card surface
          mist: "#FFF5F7",            // Pure Soft Rose White tint (zero muddy grey)
          blush: "#FFEBF0",           // Pure Crisp Blush for secondary highlights

          // Borders & Dividers
          border: "#EED4DC",          // Crisp pure rose hairline stroke
          "border-dark": "rgba(255, 255, 255, 0.18)",

          // Text Hierarchy
          text: {
            primary: "#5C0017",       // Pure Oxblood Deep titles
            body: "#3E1E26",          // Rested dark plum-charcoal body prose
            light: "#FFFFFF",         // Pure white on burgundy grounds
            muted: "#5A3440",         // Rich muted plum body metadata
            cadet: "#9E6E7B",         // Warm rose-mauve for muted labels
          },

          // Primary Button & Crimson Accents
          flame: "#AD002B",           // Pure Garnet Crimson CTA base
          "flame-hover": "#D60036",   // Pure Rich Ruby CTA hover
          vivid: "#FF0040",           // Pure Vivid Crimson focus/hairline highlight

          // Flat compatibility tokens
          cadet: "#9E6E7B",
          slate: "#3E1E26",
          muted: "#5A3440",
          uranian: "#FFF5F7",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "display-hero": [
          "clamp(2.5rem, 5.5vw, 4.5rem)",
          { lineHeight: "1.08", letterSpacing: "-0.035em" },
        ],
        "display-title": [
          "clamp(2rem, 4vw, 3.25rem)",
          { lineHeight: "1.12", letterSpacing: "-0.03em" },
        ],
        "display-subhead": [
          "clamp(1.25rem, 2.5vw, 2rem)",
          { lineHeight: "1.25", letterSpacing: "-0.02em" },
        ],
        "editorial-lead": [
          "clamp(1rem, 1.3vw, 1.25rem)",
          { lineHeight: "1.65", letterSpacing: "-0.01em" },
        ],
        "metadata-tag": [
          "0.6875rem",
          { lineHeight: "1rem", letterSpacing: "0.18em" },
        ],
      },
    },
  },
};

export default config;
