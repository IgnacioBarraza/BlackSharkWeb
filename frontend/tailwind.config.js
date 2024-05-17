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
        'blue-ligth-bs': '#0186ff',
        'blue-strong-bs': '10243c',
      },
    },
  },
  plugins: [],
}
