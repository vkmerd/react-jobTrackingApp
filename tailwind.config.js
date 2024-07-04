/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      colors: {
        'gradient-start': '#E9EFFA',
        'gradient-end': 'rgba(233, 239, 250, 0.5)',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(180deg, #E9EFFA 0%, rgba(233, 239, 250, 0.5) 100%)',
      }
    },
  },
  plugins: [],
}

