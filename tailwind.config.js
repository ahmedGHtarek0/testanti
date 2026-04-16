export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gym: {
          neon: '#ccff00',      // futuristic neon green
          dark: '#0a0a0a',     // deep black
          gray: '#1a1a1a',     // secondary dark
          light: '#f4f4f5'     // off-white
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        neon: '0 0 15px rgba(204, 255, 0, 0.4)',
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      }
    },
  },
  plugins: [],
}
