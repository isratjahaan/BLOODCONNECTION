/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        crimson: {
          DEFAULT: '#8B1028',
          light: '#A81935',
          dark: '#6E0A1E',
          50: '#FDF2F4',
          100: '#FBE4E7',
          200: '#F7CBD1',
          300: '#F0A3AE',
          400: '#E47183',
          500: '#8B1028',
          600: '#7E0F24',
          700: '#6A0C1E',
          800: '#580A19',
          900: '#4A0D1C',
        },
        burgundy: {
          DEFAULT: '#4A0D1C',
          light: '#631327',
          dark: '#2E0610',
          deep: '#1F040B',
        },
        gold: {
          DEFAULT: '#D4AF37',
          metallic: '#D4AF37',
          champagne: '#C6A15B',
          light: '#F5E7BE',
          lighter: '#FBF5E2',
          muted: '#E5D3A1',
          dark: '#A6841E',
        },
        ivory: {
          DEFAULT: '#F8F1E5',
          warm: '#F8F1E5',
          light: '#FAF6EE',
          dark: '#ECE3D2',
          border: '#E2D4BE',
        },
        charcoal: {
          DEFAULT: '#242126',
          light: '#3C383F',
          dark: '#161418',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        bangla: ['"Hind Siliguri"', '"Noto Sans Bengali"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.35)',
        'crimson-glow': '0 0 25px rgba(139, 16, 40, 0.35)',
        'royal': '0 10px 30px -5px rgba(74, 13, 28, 0.25)',
        'royal-lg': '0 20px 40px -10px rgba(74, 13, 28, 0.35)',
        'card-gold': '0 4px 20px -2px rgba(198, 161, 91, 0.15)',
      },
      backgroundImage: {
        'royal-gradient': 'linear-gradient(135deg, #4A0D1C 0%, #8B1028 60%, #4A0D1C 100%)',
        'burgundy-gradient': 'linear-gradient(180deg, #4A0D1C 0%, #2E0610 100%)',
        'gold-gradient': 'linear-gradient(135deg, #F5E7BE 0%, #D4AF37 50%, #C6A15B 100%)',
        'gold-metallic-gradient': 'linear-gradient(135deg, #D4AF37 0%, #FFE685 50%, #C6A15B 100%)',
        'hero-overlay': 'radial-gradient(circle at 75% 30%, rgba(212, 175, 55, 0.15) 0%, transparent 60%)',
      }
    },
  },
  plugins: [],
}
