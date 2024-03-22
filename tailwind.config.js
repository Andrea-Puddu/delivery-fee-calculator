/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--color-background) / <alpha-value>)',
        'background-gray': 'rgb(var(--color-background-gray) / <alpha-value>)',
        'background-black': 'rgb(var(--color-background-black) / <alpha-value>)',

        content: 'rgb(var(--color-content) / <alpha-value>)',
        'content-black': 'rgb(var(--color-content-black) / <alpha-value>)',
        'content-gray': 'rgb(var(--color-content-gray) / <alpha-value>)',
        'content-white': 'rgb(var(--color-content-white) / <alpha-value>)',

        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        'primary-light': 'rgb(var(--color-primary-light) / <alpha-value>)',
        'primary-dark': 'rgb(var(--color-primary-dark) / <alpha-value>)',
        'primary-tint': 'rgb(var(--color-primary-tint) / <alpha-value>)',
        'primary-shade': 'rgb(var(--color-primary-shade) / <alpha-value>)',
      },
      fontFamily: {
        font1: ['var(--font-family-font1)', 'sans'],
      },
    },
  },
  plugins: [],
};
