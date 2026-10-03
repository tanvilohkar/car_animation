/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        lime: {
          neon: "#def54f",
          glow: "#c7e834"
        },
        cyan: {
          neon: "#6ac9ff",
          glow: "#38bdf8"
        },
        orange: {
          neon: "#fa7328",
          glow: "#ea580c"
        },
        emerald: {
          neon: "#45db7d"
        }
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
        display: ['var(--font-cabinet)', 'sans-serif'],
      },
      boxShadow: {
        'glow-lime': '0 0 25px rgba(222, 245, 79, 0.45)',
        'glow-cyan': '0 0 25px rgba(106, 201, 255, 0.45)',
        'glow-orange': '0 0 25px rgba(250, 115, 40, 0.45)',
        'glow-emerald': '0 0 35px rgba(69, 219, 125, 0.55)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
};
