/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#8D6E63',
          DEFAULT: '#6F4E37',
          dark: '#3E2723',
        },
        accent: {
          DEFAULT: '#C87522',
          hover: '#b06218',
        },
        cream: '#F9F5F0',
        text: {
          dark: '#2C2C2C',
          light: '#F5F1E8',
          muted: '#8E8E93',
        }
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body: ['"Outfit"', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 10px 30px rgba(111, 78, 55, 0.05)',
        'drawer': '-10px 0 30px rgba(62, 39, 35, 0.1)',
        'modal': '0 20px 50px rgba(62, 39, 35, 0.15)',
      }
    },
  },
  plugins: [],
}
