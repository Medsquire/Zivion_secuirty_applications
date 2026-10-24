/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0B1220',
        electric: '#3B82F6',
        cyan: '#22D3EE',
        page: '#F8FAFC',
        darkBg: '#060B14',
        card: '#FFFFFF',
        text: '#111827',
        secondary: '#64748B',
        border: '#E2E8F0',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #3B82F6, #22D3EE)',
        'gradient-secondary': 'linear-gradient(135deg, #6366F1, #22D3EE)',
      },
      boxShadow: {
        'soft': '0 4px 12px rgba(0, 0, 0, 0.05)',
      },
      keyframes: {
        scan: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(200px)' },
        }
      },
      animation: {
        scan: 'scan 2.5s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
