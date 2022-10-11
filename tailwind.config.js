/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],

  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    boxShadow: {
      'btn-3d': '0 0.6em #012c7a, 0 0.9em rgba(0, 0, 0, 0.1)',
      'btn-3d-hover': '0 0.6em #012c7a, 0 0.9em rgba(0, 0, 0, 0.4)',
      'btn-3d-active': '0 0.2em #012c7a, 0 0.5em rgba(0, 0, 0, 0.4)'
    }
  },
  plugins: []
}
