/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        dark: '#313131',
        medium: '#313131',
        yellow: '#C69749',
      }
    },
  },
  plugins: [],
}