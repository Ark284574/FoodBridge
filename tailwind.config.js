/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#EEF4F1',
          100: '#D5E4DD',
          200: '#A9C9BB',
          300: '#77A794',
          400: '#4D8570',
          500: '#2F6252',
          600: '#24503F',
          700: '#183D32',
          800: '#112D25',
          900: '#0A1D18',
        },
        terracotta: {
          50: '#FBF0EB',
          100: '#F6DDD1',
          200: '#EDB9A1',
          300: '#E39371',
          400: '#DE7B54',
          500: '#D96D43',
          600: '#B9552F',
          700: '#974326',
          800: '#76341D',
          900: '#55250F',
        },
        harvest: {
          50: '#FBF6EA',
          100: '#F5EACB',
          200: '#EDD9A4',
          300: '#E3C87F',
          400: '#D9B86C',
          500: '#C9A455',
          600: '#A98440',
          700: '#846531',
          800: '#5F4823',
          900: '#3D2F16',
        },
        ivory: {
          50: '#FCFAF6',
          100: '#F5F0E6',
          200: '#EBE3D2',
          300: '#DCD0B5',
        },
        ink: {
          50: '#F2F2EF',
          100: '#E0E0DA',
          300: '#A9AAA0',
          500: '#6B6D63',
          700: '#3E4038',
          800: '#33352D',
          900: '#282A24',
        },
        success: {
          100: '#E0EEE3',
          500: '#4E8A5E',
          700: '#2F5C3B',
        },
        warning: {
          100: '#FBEFD6',
          500: '#C98A1B',
          700: '#8A5E0E',
        },
        error: {
          100: '#F7E0DD',
          500: '#B3352B',
          700: '#812419',
        },
      },
      fontFamily: {
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
      transitionTimingFunction: {
        settle: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
