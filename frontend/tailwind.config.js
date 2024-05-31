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
        'blue-strong-bs': '#10243c',
      },
      keyframes: {
        'beat-fade': {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.5, transform: 'scale(1.2)' },
        },
      },
      animation: {
        'beat-fade': 'beat-fade 1s infinite',
      },
    },
  },
  plugins: [],
}
