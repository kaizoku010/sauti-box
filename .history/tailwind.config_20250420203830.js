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
        primary: "#FF5722", // Deep Orange
        secondary: "#FF8A65", // Lighter Orange
        accent: "#FF3D00", // Bright Orange
        background: "#121212", // Dark Black
        foreground: "#F8FAFC", // Light gray
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.backdrop-blur-xl': {
          'backdrop-filter': 'blur(12px)',
        },
        '.backdrop-filter': {
          'backdrop-filter': 'var(--tw-backdrop-filter)',
        },
      })
    },
  ],
};
