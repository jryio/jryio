module.exports = {
  content: ['./templates/**/*.{html,js}', './static/*.css'],
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],
  theme: {
    extend: {
      colors: {
        peach: '#fffffd',
      }
    }
  }
}
