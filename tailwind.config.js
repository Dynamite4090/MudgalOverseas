/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'slate-950': '#0a0a0f',
        'slate-900': '#0f0f17',
        'slate-800': '#1a1a2e',
        'slate-700': '#252542',
        'accent-blue': '#7aa2f7',
        'accent-purple': '#bb9af7',
        'accent-cyan': '#7dcfff',
        'accent-green': '#9ece6a',
        'accent-red': '#f7768e',
        'accent-orange': '#ff9e64',
        'accent-yellow': '#e0af68',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'monospace'],
        'sans': ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        'flicker': 'flicker 0.15s infinite',
        'pulse-slow': 'pulse 2s ease-in-out infinite',
        'blink': 'blink 1s step-end infinite',
        'rec-blink': 'recBlink 1.5s ease-in-out infinite',
      },
      keyframes: {
        flicker: {
          '0%': { opacity: '0.97' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0.98' },
        },
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        recBlink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
      },
    },
  },
  plugins: [],
}
