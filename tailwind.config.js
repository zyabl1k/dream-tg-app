/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class'],
  theme: {
    extend: {
      fontFamily: {
        roslindale: ['Roslindale', 'sans-serif'],
        'roslindale-medium': ['Roslindale-medium', 'sans-serif'],
      },
      animation: {
        kick: 'kick .5s linear',
        'transform-card': 'transform-card .5s linear',

        'scale-down': 'scale-down .5s linear',
        'scale-up': 'scale-up .5s linear',
        'scan-text': 'scan-text .5s linear',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        '4xl': '28px',
      },
      colors: {
        background: 'var(--background)',
        muted: 'var(--muted)',
        'muted-light': 'var(--muted-light)',
        'muted-light-2': 'var(--muted-light-2)',
        border: 'var(--border)',
      },
      boxShadow: {
        card: '0px -4px 36px 0px #07070712',
        'send-dream-btn': `
          0px 4px 10px 0px #23150126,
          0px 18px 18px 0px #2315011C,
          0px 40px 24px 0px #23150112,
          0px 71px 29px 0px #23150108
        `,

        'card-back': '0px 4px 36px 0px #2F536012',
        'card-box': '0px 4px 36px 0px #00000012',
      },
      backgroundImage: {
        paper:
          'repeating-linear-gradient(transparent,transparent calc(1lh - var(--line-thickness)),var(--main-line-color) calc(1lh - var(--line-thickness)),var(--main-line-color) 1lh,transparent 1lh);',
      },
    },
  },
  plugins: [],
}
