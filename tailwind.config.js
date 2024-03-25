/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-gray': '#f0f2f5',
        'primary-blue': '#0866ff',

        'secondary-gray': '#606770',
      },
    },
  },
  plugins: [],
};
