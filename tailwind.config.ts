import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        gold: '#CC9C53',
        black: '#191919',
      },
      borderColor: {
        primary: '#E7E7E7',
      },
    },
    fontFamily: {
      nohemi: ['Nohemi', 'sans-serif'],
      mermaid: ['Mermaid', 'sans-serif'],
    },
  },
  plugins: [],
};
export default config;

