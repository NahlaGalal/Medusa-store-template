/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.js", "./src/components/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        Roboto: ["Roboto", "sans-serif"],
        Literata: ["Literata", "sans-serif"],
      },
      colors: {
        brand: "#468d93",
        secondary: "#a73822",
        darkBlack: "#000000",
        darkGrey: "#757575",
        lightGrey: "#eef2f3",
        white: "#FFFFFF",
      },
      backgroundImage: {
        home_section: "url('/home_section.jpg')",
      },
    },
  },
  plugins: [],
}
