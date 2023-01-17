/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#e6e5d5',
        lightGreen: '#bbcabb',
        darkGreen: '#014421',
        black: '#1a1b1f'
      }
    }
  },
  plugins: [],
}
