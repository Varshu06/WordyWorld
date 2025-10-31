/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'playful': ['Nunito', 'Poppins', 'Baloo 2', 'system-ui', 'sans-serif'],
      },
      colors: {
        'jungle-green': '#4CAF50',
        'sky-blue': '#87CEEB',
        'warm-yellow': '#FFD700',
        'peach': '#FFB347',
        'grass-green': '#7CB342',
        'brown': '#8B4513',
      },
      animation: {
        'bounce-gentle': 'bounce-gentle 0.6s ease-in-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-10px) scale(1.05)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}

