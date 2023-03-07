/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'apps/site/pages/**/*.{js,ts,jsx,tsx}',
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
    },
    extend: {
      colors: {
        coBlue: '#3d4beb', 
        coGreen: '#4fbf90',
        coGrey: '#f4f2f0', 
        coYellow: '#ffe5a4',
        coPurple: '#ccc0ff', 
      },
    },
  },
  plugins: [],
}

