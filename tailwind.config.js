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
          "base-200": "#f1f5f9",
          "base-300": "#e2e8f0",

          primary: "#4285F4",
          "primary-content": "#E8F0FE",
          "primary-light": "#8AB4F8",
          "primary-focus": "#1A73E8",
          secondary: "#24C1E0",
          "secondary-light": "#78D9EC",
          "secondary-focus": "#12B5CB",
          accent: "#D93025",
          "accent-light": "#FCE8E6",
          neutral: "#E8F0FE",
          "neutral-content": "#AEB0B3",

          info: "#1A73E8",
          "info-light": "#E8F0FE",
          success: "#1E8E3E",
          "success-light": "#E6F4EA",
          warning: "#F9Ab00",
          "warning-light": "#FEF7E0",
          error: "#D93025",
          "error-light": "#FCE8E6",
        },
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["[data-theme=dark]"],
          primary: "#a78bfa",
          "base-content": "#f5f3ff",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
