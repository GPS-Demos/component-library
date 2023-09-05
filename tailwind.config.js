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
          "accent-focus": "#BCBCBC",
          "accent-content": "#DDDDD",
          neutral: "#E8F0FE",
          "neutral-focus": "#C7D4EB",
          "neutral-content": "#DCE5F5",
          info: "#E8F0FE",
          "info-focus": "#3F69CD",
          "info-content": "#1A73E8",
          success: "#E6F4EA",
          "success-focus": "#1A7D36",
          "success-content": "#1E8E3E",
          warning: "#FEF7E0",
          "warning-focus": "#E59D00",
          "warning-content": "#F9AB00",
          error: "#FCE8E6",
          "error-focus": "#B9281E",
          "error-content": "#D93025",
        },
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["[data-theme=dark]"],
          "base-100": "#ffffff",
          "base-200": "#8D9DB6",
          "base-300": "#2B5F82", // TODO:confirm in code
          "base-content": "#f5f3ff", // TODO:confirm in code

          primary: "#8AB4F8",
          "primary-focus": "#1A73E8",
          "primary-content": "#4285F4",
          secondary: "#78D9EC",
          "secondary-focus": "#12B5CB",
          "secondary-content": "#24C1E0",
          accent: "#344256",
          "accent-focus": "#BCBCBC",
          "accent-content": "#DDDDD",
          neutral: "#324155",
          "neutral-focus": "#2E3C4F",
          "neutral-content": "#2B5F82",
          info: "#203E6D",
          "info-focus": "#5069C7",
          "info-content": "#1A73E8",
          success: "#1E3742",
          "success-focus": "#407A3E",
          "success-content": "#1E8E3E",
          warning: "#343A3C",
          "warning-focus": "#FD6A133",
          "warning-content": "#F9AB00",
          error: "#312E40",
          "error-focus": "#A63A26",
          "error-content": "#D93025",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
