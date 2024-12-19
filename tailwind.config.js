/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#0A0A0A",
        white: "#f3f5f7",
        gray: "#181818",
        textGray: "#595959",
        border: "#2D2D2D",
      },
    },
  },
  plugins: [],
};
