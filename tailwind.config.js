module.exports = {
  // Needs to be set manually on `html` element
  darkMode: 'class',
  content: ['./templates/**/*.{html,js}', './static/*.css'],
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],
  theme: {
    extend: {
      colors: {
        peach: '#fffffd',
        dark: '#101011',
      },
      // https://github.com/tailwindlabs/tailwindcss-typography/blob/master/src/styles.js
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "80ch"
          }
        }
      }
    }
  }
}
