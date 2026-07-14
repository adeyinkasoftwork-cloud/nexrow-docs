import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Nexrow gradient stops, available as utilities where a solid is needed.
        brand: {
          violet: "#B76BFF",
          purple: "#9A6EFF",
          royal: "#764CFF",
          indigo: "#4E3BFF",
          blue: "#255CFF",
          electric: "#178CFF",
          azure: "#27B7FF",
          cyan: "#48D2FF",
          glowPurple: "#C487FF",
          glowBlue: "#4CC9FF",
          shadowBlue: "#1236A9",
          shadowPurple: "#4420A7",
        },
        // Semantic tokens driven by CSS variables so both themes share structure.
        surface: "rgb(var(--surface) / <alpha-value>)",
        "surface-raised": "rgb(var(--surface-raised) / <alpha-value>)",
        "surface-sunken": "rgb(var(--surface-sunken) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        "line-strong": "rgb(var(--line-strong) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        "ink-muted": "rgb(var(--ink-muted) / <alpha-value>)",
        "ink-subtle": "rgb(var(--ink-subtle) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-2": "rgb(var(--accent-2) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      maxWidth: {
        content: "760px",
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.125rem",
      },
      // Depth is themed, so the shadows resolve through CSS variables and change
      // character between light (ambient occlusion) and dark (lit top edge).
      boxShadow: {
        ambient: "var(--shadow-ambient)",
        lift: "var(--shadow-lift)",
        featured: "var(--shadow-featured)",
        "inset-well": "var(--shadow-inset)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.35s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
      transitionTimingFunction: {
        // The single easing curve used for every considered movement on the site.
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
