/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'custom-navbar':'#F7E7CE'
      },
      screens:{
        'customer-ssm':'300px'
      },
      fontSize:{
        'xxs':'0.5rem'
      },
      borderWidth:{
        '3':'3px'
      }
    },
  },
  plugins: [],
}