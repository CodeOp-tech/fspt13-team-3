/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'apps/site/pages/**/*.{js,ts,jsx,tsx}',
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coBlue: '#3d4beb', 
        coGreen: '#4fbf90',
        coGrey: '#f4f2f0', 
        coYellow: '#ffe5a4',
        coLightPurple: '#ccc0ff', 
        coPurple: '#998bfc',
      },
    },
  },
  plugins: [],
}

