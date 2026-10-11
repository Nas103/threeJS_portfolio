/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#05060f",
        secondary: "#9ca3c0",
        tertiary: "#0d0f22",
        "black-100": "#0a0c1d",
        "black-200": "#07081a",
        "white-100": "#f3f3f3",
        violet: { 400: "#a78bfa", 500: "#8b5cf6", 600: "#7c3aed" },
        fuchsia: { 400: "#e879f9", 500: "#d946ef", 600: "#c026d3" },
        cyan: { 400: "#22d3ee", 500: "#06b6d4" },
        amber: { 400: "#fbbf24", 500: "#f59e0b" },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0px 35px 120px -15px rgba(21,16,48,0.8)",
        glow: "0 0 40px -8px rgba(139,92,246,0.55)",
        "glow-lg": "0 0 80px -12px rgba(217,70,239,0.45)",
      },
      screens: {
        xs: "450px",
      },
      animation: {
        "blob": "blob 14s ease-in-out infinite",
        "float-slow": "floatSlow 8s ease-in-out infinite",
        "spin-slow": "spin 18s linear infinite",
        "marquee": "marquee 40s linear infinite",
        "shimmer": "shimmer 2.4s linear infinite",
      },
      keyframes: {
        blob: {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(40px,-50px) scale(1.15)" },
          "66%": { transform: "translate(-30px,30px) scale(0.9)" },
        },
        floatSlow: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-16px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
    },
  },
  plugins: [],
};