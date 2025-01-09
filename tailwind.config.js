// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#FFA500', // Light orange
          DEFAULT: '#FF8C00', // Default orange
          dark: '#FF4500', // Dark orange
        },
      },
    },
  },
  plugins: [],
};