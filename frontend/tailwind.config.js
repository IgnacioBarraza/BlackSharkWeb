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
        'light-blue-50': '#f0f9ff',
        'blue-strong': '10243c',
      },
    },
  },
  plugins: [],
}
