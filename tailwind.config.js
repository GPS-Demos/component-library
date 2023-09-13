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
          // "base-content": "#5F6368",

          primary: "#4285F4",
          // "primary-focus": "#1A73E8",
          // "primary-content": "#4285F4",
          secondary: "#24c1e0",
          // "secondary-focus": "#12B5CB",
          // "secondary-content": "#24C1E0",
          accent: "#2D405E",
          // "accent-focus": "#BCBCBC",
          // "accent-content": "#DDDDD",
          neutral: "#1E2D43",
          // "neutral-focus": "#C7D4EB",
          // "neutral-content": "#DCE5F5",
          info: "#bfdbfe",
          // "info-focus": "#3F69CD",
          // "info-content": "#1A73E8",
          success: "#1E8E3E",
          // "success-focus": "#1A7D36",
          // "success-content": "#1E8E3E",
          warning: "#F9AB00",
          // "warning-focus": "#E59D00",
          // "warning-content": "#F9AB00",
          error: "#D93025",
          // "error-focus": "#B9281E",
          // "error-content": "#D93025",
        },
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["[data-theme=dark]"],
          "base-100": "#1E2D43",
          // "base-200": "#8D9DB6",
          // "base-300": "#2B5F82", // TODO:confirm in code
          // "base-content": "#f5f3ff", // TODO:confirm in code

          primary: "#4285F4",
          // "primary-focus": "#1A73E8",
          // "primary-content": "#4285F4",
          secondary: "#2D405E",
          // "secondary-focus": "#12B5CB",
          // "secondary-content": "#24C1E0",
          accent: "#344256",
          // "accent-focus": "#BCBCBC",
          // "accent-content": "#DDDDD",
          neutral: "#1E2D43",
          // "neutral-focus": "#2E3C4F",
          // "neutral-content": "#2B5F82",
          info: "#bfdefe",
          // "info-focus": "#5069C7",
          // "info-content": "#1A73E8",
          success: "#1E8E3E",
          // "success-focus": "#407A3E",
          // "success-content": "#1E8E3E",
          warning: "#F9AB00",
          // "warning-focus": "#FD6A133",
          // "warning-content": "#F9AB00",
          error: "#D93025",
          // "error-focus": "#A63A26",
          // "error-content": "#D93025",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
