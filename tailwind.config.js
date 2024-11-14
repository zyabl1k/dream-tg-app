/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class'],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'var(--background)',
        muted: 'var(--muted)',
        border: 'var(--border)',
      },
      boxShadow: {
        insertBottom: 'inset 0px -200px 181px -100px rgba(255,255,255,1)',
      },
    },
  },
  plugins: [],
}
