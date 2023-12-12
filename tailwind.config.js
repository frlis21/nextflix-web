/** @type {import('tailwindcss').Config} */
import feelsgood from "./src/assets/feelsgood.png";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        feelsgood: "url('assets/feelsgood.png')",
      },
      colors: {
        turquoise: "#09E5DA",
        "turquoise-dark": "#08d8ce",
        "turquoise-light": "#09eee3",
      },
    },
  },
  plugins: [],
};
