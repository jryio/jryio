module.exports = {
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
