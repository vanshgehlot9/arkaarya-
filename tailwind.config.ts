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
        brand: {
          blue: "#00264A",
          "blue-dark": "#001A33",
          "blue-light": "#053766",
          "blue-subtle": "#E6ECF2",
          green: "#629A13",
          "green-hover": "#528210",
          "green-light": "#EBF5DC",
          "green-subtle": "#F3F9EA",
        },
        neutral: {
          bg: "#F8FAF7",
          alt: "#F2F5F3",
          card: "#FFFFFF",
          primary: "#121212",
          secondary: "#5E6672",
          border: "#E3E8E4",
        },
      },
      fontFamily: {
        serif: ["var(--font-lora)", "Playfair Display", "Georgia", "serif"],
        display: ["var(--font-outfit)", "var(--font-dm-sans)", "sans-serif"],
        sans: ["var(--font-dm-sans)", "var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px -10px rgba(0, 38, 74, 0.06)",
        "soft-lg": "0 20px 40px -15px rgba(0, 38, 74, 0.10)",
        "glow-green": "0 0 20px rgba(98, 154, 19, 0.25)",
        "glow-green-lg": "0 0 35px rgba(98, 154, 19, 0.35)",
        "glow-blue": "0 0 25px rgba(0, 38, 74, 0.20)",
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
