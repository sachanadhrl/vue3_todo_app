/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue,css}",
  ],
  theme: {
    extend: {
      colors: {
        'default': {
          50: '#F4F4F4',
          100: '#E5E5E5',
          200: '#C7C7C7',
          300: '#C4C4C4',
          400: '#A4A4A4',
          500: '#888888',
          600: '#4A4A4A',
          700: '#111111',
        },
        'primary': {
          light: '#44bbf9',
          DEFAULT: '#16ABF8',
          dark: '#1399df',
        },
        'info': {
          light: '#4cc1b1',
          DEFAULT: '#00A790',
          dark: '#007464',
        },
        'danger': {
          light: '#f06f7c',
          DEFAULT: '#ED4C5C',
          dark: '#d54452',
        },
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif']
      },
      fontSize: {
        'xxs': '0.625rem'
      },
      spacing: {
        '4.5': '1.125rem',
        '5.5': '1.375rem',
      },
      keyframes: {
        'slide-up': {
          'from': {
            transform: 'translateY(2rem)',
          },
          'to': {
            transform: 'translateY(0)',
          },
        }
      },
      animation: {
        'slide-up': 'slide-up 300ms ease-in-out both'
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/forms'),
  ],
}
