/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        eneba: {
          bg: '#372068',    // Deep purple background
          card: '#492f80',  // Card purple
          accent: '#c052d1', // Pinkish accent
          teal: '#32e088',  // Cashback/region green/teal
          text: '#ffffff',
          input: '#492f80', 
          inputBorder: '#5d3fa3',
          yellow: '#ffbd12', // Stars or highlights
        }
      }
    },
  },
  plugins: [],
}
