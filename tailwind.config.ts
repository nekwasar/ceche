import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Ubuntu", "sans-serif"],
    },
    extend: {
      colors: {
        canvas: "#FAF7F2",
        "canvas-dark": "#F0EDE8",
        brand: {
          DEFAULT: "#9E2A2B",
          light: "#B83A1B",
          dark: "#7A1F20",
        },
        accent: {
          DEFAULT: "#F4A261",
          light: "#E9C46A",
          dark: "#D4893A",
        },
        slate: {
          DEFAULT: "#1A1A1A",
          light: "#3D3D3D",
          muted: "#6B6B6B",
        },
      },
    },
  },
  plugins: [],
};
export default config;
