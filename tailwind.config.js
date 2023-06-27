/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'primaria': '#EE7624',
        'secundaria': { '100': '#2563EB', '200': '#1654DB' },
        'dark': {'100': '#2A3A49', '200': '#1A2939', '300': '#111827'},
        'amarela': '#F9BF3A',
        'branco': '#E4E4E4'
      },
      borderRadius: {
        'giga': '70px'
      },
      spacing: {
        '0,5': '1px',
      }
    },
  },
  plugins: [

  ],
}