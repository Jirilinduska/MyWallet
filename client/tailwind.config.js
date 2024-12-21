module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {

    extend: {

      colors: {
        colorGray: "#e5e7eb",
        colorGrayHover: "#d1d5db",
        colorBlue: "#1d4ed8",
        colorBlueHover: "#1e40af",
        colorGreen: "#10b981",
        colorGreenHover: "#0ea573"
      },

      fontFamily: {
        righteous: ['Righteous', 'sans-serif'],
      },

      screens: {
        xs: '400px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },

    },
  },
  plugins: [],
}
