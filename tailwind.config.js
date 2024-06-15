/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          level1: "#F6F6F6",
          level2: "#EAEAEA",
          level3: "#D1D1D1",
          level4: "#2e2e2e",
          level5: "#1B1B1B",
          white: "#FFFFFF",
          text1: "#A2A2A2",
          text2: "#333333",
          black: "#000000",
          light: "#202023",
          medium: "#2B2B2B",
        },
        red: {
          level1: "#a93c3c",
          level2: "#dd4141",
        },
        green: {
          accent: "#03a05e",
          darker: "#02734A",
        },
      },
      spacing: {},
      fontFamily: {
        inter: "Inter",
      },
    },
  },
  plugins: [],
};
