/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class'],
  theme: {
    extend: {
      animation: {
        kick: 'kick .5s linear',
        'scale-down': 'scale-down .5s linear',
        'scale-up': 'scale-up .5s linear',
        'scan-text': 'scan-text .5s linear',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'var(--background)',
        muted: 'var(--muted)',
        'muted-light': 'var(--muted-light)',
        'muted-light-2': 'var(--muted-light-2)',
        border: 'var(--border)',
      },
      boxShadow: {
        'insert-bottom': 'inset 0px -200px 181px -100px rgba(255,255,255,1)',
        'insert-bottom-small':
          'inset 0px 10px 181px -100px rgba(255,255,255,1)',
      },
      backgroundImage: {
        paper:
          'repeating-linear-gradient(transparent,transparent calc(1lh - var(--line-thickness)),var(--main-line-color) calc(1lh - var(--line-thickness)),var(--main-line-color) 1lh,transparent 1lh);',
      },
    },
  },
  plugins: [],
}
