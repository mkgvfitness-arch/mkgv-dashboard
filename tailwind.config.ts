import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f4f4f5",
          100: "#e4e4e7",
          200: "#d4d4d8",
          500: "#52525b",
          600: "#3f3f46",
          700: "#27272a",
          900: "#18181b",
        },
      },
    },
  },
  plugins: [],
};

export default config;