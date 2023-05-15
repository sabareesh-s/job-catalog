/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1597E4',
        'primaryDarker': '#1179b8',
        'error': '#D86161',
        'placeholder': '#7a7a7a',
        'dark': '#212121',
        'textWhite': '#fafafa',
        'cardBorder': '#e6e6e6',
      },
    },
  },
  plugins: [],
}

