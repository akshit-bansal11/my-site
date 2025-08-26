// /** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern: /text-(blue|yellow|green|purple|orange|gray|cyan|amber|indigo|sky|red|black)-(100|200|300|400|500|600|700|800)/,
    },
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        chillax: ['Chillax', 'sans-serif']
      },
      animation: {
        border: 'border 4s linear infinite'
      }
    },
  },
  plugins: [],
}
