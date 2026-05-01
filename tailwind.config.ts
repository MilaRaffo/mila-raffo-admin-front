import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './index.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['var(--font-body)', ...defaultTheme.fontFamily.sans],
        accent: ['var(--font-accent)', ...defaultTheme.fontFamily.sans],
        bitter: ['var(--font-bitter)', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
