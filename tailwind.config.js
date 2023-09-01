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
          "base-200": "#D6D6D6",
          "base-300": "#AEB0B3",
          "base-content": "#5F6368",

          primary: "#8AB4F8",
          "primary-focus": "#1A73E8",
          "primary-content": "#4285F4",
          secondary: "#78D9EC",
          "secondary-focus": "#12B5CB",
          "secondary-content": "#24C1E0",
          accent: "#DDDDD",
          "accent-content": "#DDDDD",
          neutral: "#E8F0FE",
          info: "#E8F0FE",
          "info-content": "#1A73E8",
          success: "#E6F4EA",
          "success-content": "#1E8E3E",
          warning: "#FEF7E0",
          "warning-content": "#F9AB00",
          error: "#FCE8E6",
          "error-content": "#D93025",
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
