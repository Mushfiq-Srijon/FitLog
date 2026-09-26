import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0c0d10",
        panel: "#15171d",
        line: "#222630",
        acid: "#c2f800",
        muted: "#8a92a0"
      },
      fontFamily: {
        display: ["Oswald", "Arial Narrow", "Impact", "sans-serif"],
        sans: ["Inter", "Arial", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
