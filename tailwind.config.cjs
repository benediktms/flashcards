/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        body: ['var(--font-inter)'],
      },
    },
  },
  darkMode: ['class'],
  plugins: [],
};
