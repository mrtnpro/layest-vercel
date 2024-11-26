import type { Config } from "tailwindcss";
import tailwindCssAnimate from "tailwindcss-animate";

import colors from "./tailwind.colors";
import palette from "./tailwind.palette";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./i18n/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      palette,
      ...colors,
    },
    borderRadius: {
      xl: "calc(var(--radius) + 4px)",
      lg: "var(--radius)",
      DEFAULT: "0.25rem",
      md: "calc(var(--radius) - 2px)",
      sm: "calc(var(--radius) - 4px)",
    },
    extend: {
      fontFamily: {
        sans: 'var(--font-sans), ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      },
      spacing: {
        container: "var(--spacing-container)",
      },
    },
  },
  plugins: [tailwindCssAnimate],
};
export default config;
