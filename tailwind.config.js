/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'special': ['"Special Elite"', 'monospace'],
        'mono': ['"Share Tech Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
