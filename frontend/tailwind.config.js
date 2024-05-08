/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'myriad-pro': ['Myriad Pro', 'sans-serif'],
      },
      colors:{
        'blue-bs': '#0186ff',
        'blue-bs-black': '#10244c',
        'bground-input': '#606060'
      },
    },
  },
  plugins: [],
}
