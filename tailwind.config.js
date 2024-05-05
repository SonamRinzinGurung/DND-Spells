/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ad383a",
        primaryDark: "#58180D",
      },
      fontFamily: {
        title: ["Changa", "sans-serif"],
        heading: ["Freeman", "sans-serif"],
        subheading: ["Teko", "sans-serif"],
        body: ["Lato", "sans-serif"],
      },
    },
  },
  plugins: [],
};
