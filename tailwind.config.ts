const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
            colors: {
        mystree: {
          // Deep Navy Foundations
          midnight: "#0C161D",        // Primary deep navy canvas & headers
          chamber: "#13222E",         // Elevated navy card surface
          
          // Light Foundations & Highlights
          canvas: "#F8FAFC",          // Clean porcelain light canvas
          card: "#FFFFFF",            // Pure crisp white card surface
          mist: "#E8F2FA",            // Calming uranian blue tint for sections
          
          // Borders & Dividers
          border: "#D3E2EE",          // Subtle border stroke
          "border-dark": "rgba(255, 255, 255, 0.12)",
          
          // Text Hierarchy
          text: {
            primary: "#0C161D",       // Deep navy for titles
            light: "#FFFFFF",         // Pure white for dark sections
            muted: "#4A6173",         // Readable slate body text
            cadet: "#8BA4BF",         // Brand Cadet Gray for metadata & tags
          },
          
          // Isolated Primary Button Accent ONLY
          flame: "#ED5B2D",           // Brand Flame for CTAs
          "flame-hover": "#D84A1E",

          // Flat compatibility tokens
          cadet: "#8BA4BF",
          slate: "#0C161D",
          muted: "#4A6173",
          uranian: "#E8F2FA",
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
