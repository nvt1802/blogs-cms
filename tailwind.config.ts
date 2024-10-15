import type { Config } from "tailwindcss";
import flowbite from "flowbite-react/tailwind";
// import flowbite = require("flowbite-react/tailwind");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    screens: {
      xxs: "320px",
      xsm: "360px",
      xs: "480px",
      sm: "640px",
      md: "768px",
      xmd: "880px",
      lg: "1024px",
      xlg: "1151px",
      main: "1170px", // 1170px is area main size
      sxl: "1200px",
      xl: "1280px",
      mxl: "1400px",
      "2xl": "1536px", // can i change to 1440px follow design system?
      "3xl": "1600px",
      "hover-hover": { raw: "(hover: hover)" },
    },
    extend: {
      colors: {
        primary: {
          "50": "#eff6ff",
          "100": "#dbeafe",
          "200": "#bfdbfe",
          "300": "#93c5fd",
          "400": "#60a5fa",
          "500": "#3b82f6",
          "600": "#2563eb",
          "700": "#1d4ed8",
          "800": "#1e40af",
          "900": "#1e3a8a",
          "950": "#172554",
        },
      },
    },
  },
  plugins: [flowbite.plugin()],
};
export default config;
