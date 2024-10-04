/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage:{
        "home":"url('../imagens/background-escuro.png')"
      },
      backgroundImage:{
       "capa-over":"url('../imagens/modelo3.jpg')" 
      }
    },
  },
  plugins: [],
}

