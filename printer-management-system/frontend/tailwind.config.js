/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: false,
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: "#660099",
        "primary-dark": "#380054",
        "primary-light": "#BD4AFF",
        secondary: "#EB3C7D",
        "secondary-light": "#FF96B2",
        accent: "#BD4AFF",
        "accent-alt": "#CC3D70",
        success: "#82D400",
        "success-muted": "#B2D682",
        warning: "#FFB84C",
        danger: "#FF9900",
      },
    },
  },
  plugins: [],
}
