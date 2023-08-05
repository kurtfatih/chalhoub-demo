module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "brand-red": "rgba(216, 1, 0, 1)",
        "brand-red-100": "rgba(216, 1, 0, 0.1)",
        "brand-red-200": "rgba(216, 1, 0, 0.2)",
        "brand-purple": "#5B6182"
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require("@tailwindcss/forms")]
}
