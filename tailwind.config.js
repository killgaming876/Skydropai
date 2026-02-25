/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0A0F1F',
        'neon-primary': '#00E5FF',
        'neon-glow': '#00E5FF80',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #00E5FF, 0 0 10px #00E5FF, 0 0 15px #00E5FF' },
          '100%': { boxShadow: '0 0 10px #00E5FF, 0 0 20px #00E5FF, 0 0 30px #00E5FF' },
        }
      }
    },
  },
  plugins: [],
}
