/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#EEEFF2",
        c_black:"#262626",
        c_white:"#262626",
        c_green:"#B1F040",
        c_voilet:"#B386FD",
        c_blue:"#0066CC",
      },
      scale: {
        '102':'1.02'
        // Add more custom scales as needed
      },
    },
  },
  plugins: [],
}