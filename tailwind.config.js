/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#0f172a',
          2: '#1e293b',
          3: '#334155',
          4: '#475569',
        },
        accent: {
          DEFAULT: '#06b6d4',
          dim: 'rgba(6, 182, 212, 0.15)',
          glow: 'rgba(6, 182, 212, 0.4)',
          muted: '#0891b2',
        },
        text: {
          primary: '#f1f5f9',
          secondary: '#94a3b8',
          muted: '#64748b',
        },
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['Figtree', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(1.8rem, 4vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.3rem, 2.5vw, 2rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(6, 182, 212, 0.2)',
        'glow-md': '0 0 30px rgba(6, 182, 212, 0.3)',
        'glow-lg': '0 0 60px rgba(6, 182, 212, 0.25)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 8px 40px rgba(0, 0, 0, 0.6)',
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(rgba(6, 182, 212, 0.04) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(6, 182, 212, 0.04) 1px, transparent 1px)`,
        'hero-glow': 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(6, 182, 212, 0.15), transparent)',
        'card-glow': 'radial-gradient(ellipse at top left, rgba(6, 182, 212, 0.08), transparent 60%)',
      },
      backgroundSize: {
        'grid': '60px 60px',
      },
      keyframes: {
        'cursor-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(6, 182, 212, 0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(6, 182, 212, 0.5)' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'cursor-blink': 'cursor-blink 1s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delay': 'float 6s ease-in-out 2s infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'scan-line': 'scan-line 8s linear infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
    },
  },
  plugins: [],
}
