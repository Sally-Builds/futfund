/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        brightRed: "hsl(12, 88%, 59%)",
        primary: "#FF6363",
        secondary: {
          100: "#E2E2D5",
          200: "#888883",
        },
        info: "#8FBFBC",
        warning: "#e8c8e8",
        pri: "#7674a6",
      },
      fontFamily: {
        body: ["Libre Bodoni"],
      },
    },
  },
  plugins: [],
};
