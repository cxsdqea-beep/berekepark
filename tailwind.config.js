/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#F8FAFC',
          light: '#FFFFFF',
          skyBg: '#F0F7FF',
          skySoft: '#E6F2FE',
          navy: '#0C2340',
          navyLight: '#183B63',
          slate: '#475569',
          slateLight: '#64748B',
          sky: {
            50: '#F0F9FF',
            100: '#E0F2FE',
            200: '#BAE6FD',
            300: '#7DD3FC',
            400: '#38BDF8',
            500: '#0EA5E9',
            600: '#0284C7',
            700: '#0369A1',
            800: '#075985',
            900: '#0C4A6E',
            glow: 'rgba(14, 165, 233, 0.25)',
          },
          gold: {
            DEFAULT: '#C5A880',
            light: '#E2CAAA',
            dark: '#A3855E',
            glow: 'rgba(197, 168, 128, 0.35)',
          },
          emerald: {
            DEFAULT: '#059669',
            light: '#10B981',
            glow: 'rgba(16, 185, 129, 0.25)',
          },
          water: {
            DEFAULT: '#0284C7',
            light: '#38BDF8',
            glow: 'rgba(2, 132, 199, 0.25)',
          },
          borderSky: 'rgba(2, 132, 199, 0.15)',
          borderSubtle: 'rgba(148, 163, 184, 0.2)',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Montserrat', 'Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out forwards',
        'shimmer': 'shimmer 2.5s infinite linear',
        'float': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s infinite ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.98)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(197, 168, 128, 0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(197, 168, 128, 0.5)' },
        }
      },
      screens: {
        'xs': '375px',
      }
    },
  },
  plugins: [],
}
