/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#6C63FF",
        secondary: "#FF6584",
        accent: "#43C6AC",
        dark: "#2D2D2D",
        background: "#F8F7FF",
      },
    },
  },
  plugins: [],
};
