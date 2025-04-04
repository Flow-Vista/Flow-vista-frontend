/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx,css}"    // ✅ Ensure all relevant file types are included
  ],
  theme: {
    extend: {}
  },
  plugins: []
};
