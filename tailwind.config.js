/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.ejs", // Include all EJS files in the views folder
    "./public/**/*.html" // Optional: Include any static HTML files in the public folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

