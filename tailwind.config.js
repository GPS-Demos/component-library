/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // Omit Tailwind colors. Use DaisyUI colors instead
    colors: {},
    extend: {
      maxWidth: {
        "screen-3xl": "1800px",
        "screen-4xl": "2100px",
      },
      screens: {
        xs: "480px",
      },
    },
  },
  variants: {
    backgroundColor: ["active"],
  },
  daisyui: {
    logs: false,
    // https://daisyui.com/docs/themes/
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["[data-theme=light]"],
          "base-100": "#ffffff",
          "base-200": "#f2f3f5",
          "base-300": "#e9ebf0",
          primary: "#4285f4",
          "primary-content": "#edeff2",
          secondary: "#24c1e0",
          "secondary-content": "#e9f1f2",
          accent: "#1E2043",
          "accent-content": "#e4e4eb",
          neutral: "#1E2D43",
          "neutral-content": "#d5d7db",

          info: "#bfdbfe",
          "info-content": "#01152e",
          success: "#1E8E3E",
          "success-content": "#e9f0eb",
          warning: "#F9AB00",
          "warning-content": "#211700",
          error: "#D93025",
          "error-content": "#ede7e6",
        },
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["[data-theme=dark]"],
          "base-100": "#1E2D43",
          primary: "#4285f4",
          secondary: "#24c1e0",
          accent: "#2D405E",
          neutral: "#1E2D43",

          info: "#bfdbfe",
          success: "#1E8E3E",
          warning: "#F9AB00",
          error: "#D93025",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
