/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#e87605',
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#e87605',
          600: '#d56a04',
          700: '#b45a03',
          800: '#933d02',
          900: '#7c2d00',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          secondary: '#F5F5F5',
          tertiary: '#E0E0E0',
        },
        text: {
          primary: '#212121',
          secondary: '#757575',
          disabled: '#9E9E9E',
        },
        dark: {
          surface: '#121212',
          'surface-secondary': '#1E1E1E',
          'surface-tertiary': '#2C2C2C',
          text: '#E0E0E0',
          'text-secondary': '#A0A0A0',
        }
      },
      fontFamily: {
        // Font Sans Jakarta CDN
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'elevation-1': '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        'elevation-2': '0 3px 6px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.12)',
        'elevation-3': '0 10px 20px rgba(0,0,0,0.15), 0 3px 6px rgba(0,0,0,0.10)',
        'elevation-4': '0 15px 25px rgba(0,0,0,0.15), 0 5px 10px rgba(0,0,0,0.05)',
        'fab': '0 6px 10px rgba(0,0,0,0.14), 0 1px 18px rgba(0,0,0,0.12), 0 3px 5px rgba(0,0,0,0.20)',
      },
      borderRadius: {
        'android': '12px',
        'android-lg': '16px',
        'android-xl': '20px',
      },
      transitionTimingFunction: {
        'android': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
      animation: {
        'ripple': 'ripple 0.6s linear',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '0.5' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
