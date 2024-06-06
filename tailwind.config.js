/** @type {import('tailwindcss').Config} */
module.exports = {
  // content: ["./App.{js,jsx,ts,tsx}", "./src/screens/**/*.{js,jsx,ts,tsx}", "./src/components/**/*.{js,jsx,ts,tsx}"],
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/screens/**/*.{js,jsx,ts,tsx}",
    "./src/component/**/*.{js,jsx,ts,tsx}",
    "./src/dashbord/**/*.{js,jsx,ts,tsx}",
    "./src/constants/**/*.{js,jsx,ts,tsx}",
    "./src/Admin/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

