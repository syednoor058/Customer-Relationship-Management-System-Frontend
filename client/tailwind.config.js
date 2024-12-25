/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-back': "url('./src/assets/images/background.png')",
      },
      fontFamily: {
        bodyFont: ["Poppins", "sans-serif"],
      },
      colors: {
        accentColor: "#2746fa",
        primaryColor: "#FFFFFF",
        secondaryColor: "#0054a5",

      }
    },
  },
  plugins: [],
};
