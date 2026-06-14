import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#06070a",
          800: "#0a0b0f",
          700: "#101218",
          600: "#161922",
        },
        cyber: {
          cyan: "#22d3ee",
          teal: "#5eead4",
          violet: "#a78bfa",
          ember: "#fb923c",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      boxShadow: {
        glass:
          "0 8px 40px -12px rgba(0,0,0,0.6), inset 0 1px 0 0 rgba(255,255,255,0.06)",
        glow: "0 0 32px -6px rgba(34,211,238,0.45)",
      },
      keyframes: {
        "aurora-1": {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(8%,-6%) scale(1.15)" },
        },
        "aurora-2": {
          "0%, 100%": { transform: "translate(0,0) scale(1.1)" },
          "50%": { transform: "translate(-10%,8%) scale(1)" },
        },
        "aurora-3": {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(6%,10%) scale(1.2)" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "grid-pan": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "60px 60px" },
        },
      },
      animation: {
        "aurora-1": "aurora-1 18s ease-in-out infinite",
        "aurora-2": "aurora-2 22s ease-in-out infinite",
        "aurora-3": "aurora-3 26s ease-in-out infinite",
        blink: "blink 1.1s step-end infinite",
        "fade-up": "fade-up 0.6s ease both",
        "grid-pan": "grid-pan 6s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
