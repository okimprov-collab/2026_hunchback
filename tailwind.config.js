/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#07080d',
          900: '#0a0c13',
          800: '#111420',
          700: '#191e30',
        },
        midnight: {
          950: '#0b0f19',
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
        },
        amber: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        gothic: {
          gold: '#e6a122',
          ember: '#ff8426',
          rose: '#a855f7',
          violet: '#7c3aed',
          wine: '#4c1d95',
        },
      },
      fontFamily: {
        cinzel: ['"Cinzel"', '"Microsoft JhengHei"', '"微軟正黑體"', 'sans-serif'],
        serif: ['"Microsoft JhengHei"', '"微軟正黑體"', 'sans-serif'],
        sans: ['"Inter"', '"Microsoft JhengHei"', '"微軟正黑體"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glow-gold': '0 0 25px -5px rgba(245, 158, 11, 0.35)',
        'glow-rose': '0 0 25px -5px rgba(168, 85, 247, 0.35)',
        'glow-lg': '0 0 50px -10px rgba(245, 158, 11, 0.25)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { opacity: '0.4', filter: 'brightness(1)' },
          '100%': { opacity: '0.9', filter: 'brightness(1.3)' },
        },
      },
    },
  },
  plugins: [],
}
