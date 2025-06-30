/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',  
  content: ["./App.js", "./Comps/**/*.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}", "./MainRouter.js", "./utils/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}