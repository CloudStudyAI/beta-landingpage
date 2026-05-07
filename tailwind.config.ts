import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: "var(--background)",
        panel: "var(--panel)",
        stroke: "var(--stroke)",
        accent: "var(--accent)",
        muted: "var(--text-muted)",
      },
      fontFamily: {
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        halo: "0 22px 90px rgba(86, 178, 255, 0.18)",
        panel: "0 24px 120px rgba(3, 9, 26, 0.55)",
      },
      backgroundImage: {
        "hero-grid":
          "linear-gradient(rgba(157, 205, 255, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(157, 205, 255, 0.08) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
