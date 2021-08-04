// tailwind.config.js
const colors = require('tailwindcss/colors')

module.exports = {
    purge: [
        './components/**/*.{vue,js}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './nuxt.config.{js,ts}'
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        padding: '1rem'
    },
    variants: {
        extend: {}
    },
    plugins: []
}
