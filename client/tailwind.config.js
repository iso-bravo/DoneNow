/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'custom': '#292D32',
      },
      fontFamily: {
        Lexend: ['Lexend', "sans-serif"],
      },
    },
  },
  plugins: [],
}

