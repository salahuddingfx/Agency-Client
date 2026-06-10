/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#18B7F5', // Sky Blue
          secondary: '#1F8EF1', // Royal Blue
          accent: '#2563EB', // Cobalt Blue
          dark: 'rgb(var(--brand-dark) / <alpha-value>)',
          darker: 'rgb(var(--brand-darker) / <alpha-value>)',
          light: '#F8FAFC', // Slate Light
          slateAccent: 'rgb(var(--brand-slate-accent) / <alpha-value>)',
        }
      },
      textColor: {
        'slate-50': 'rgb(var(--text-slate-50) / <alpha-value>)',
        'slate-100': 'rgb(var(--text-slate-100) / <alpha-value>)',
        'slate-200': 'rgb(var(--text-slate-200) / <alpha-value>)',
        'slate-300': 'rgb(var(--text-slate-300) / <alpha-value>)',
        'slate-400': 'rgb(var(--text-slate-400) / <alpha-value>)',
        'slate-500': 'rgb(var(--text-slate-500) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(15, 23, 42, 0.05)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
        'premium': '0 12px 40px -10px rgba(37, 99, 235, 0.12)',
        'glow': '0 0 20px 0 rgba(24, 183, 245, 0.15)',
      },
      backgroundImage: {
        'mesh-pattern': "radial-gradient(at 0% 0%, rgba(24, 183, 245, 0.1) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(37, 99, 235, 0.1) 0px, transparent 50%), radial-gradient(at 50% 100%, rgba(31, 142, 241, 0.05) 0px, transparent 50%)",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
