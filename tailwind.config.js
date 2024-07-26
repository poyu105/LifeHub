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
      borderWidth:{
        '1':'1px'
      }
    },
  },
  plugins: [],
}