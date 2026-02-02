/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Toggle dark mode via .dark on a parent (e.g. html)
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pinky: '#fbe3e8',
        blueGreeny: '#5cbdb9',
        teenyGreeny: '#ebf6f5',
      },
    },
  },
  plugins: [],
}
