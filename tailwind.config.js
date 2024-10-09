/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend:{
      backgroundImage:{
        "home":"url('../imagens/background-escuro.png')"
      }
    },
  },
  plugins: [],
}

