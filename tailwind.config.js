/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        FGulay: "#16A34A",
      },
      fontFamily: {
        cabin: ['"Cabin"', 'sans-serif'],
        quicksand: ['"Quicksand"', 'sans-serif'],
        figtree: ['"Figtree"', 'sans-serif']
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('hoverable', '@media (hover: hover) and (pointer: fine)');
    },
  ],
}

