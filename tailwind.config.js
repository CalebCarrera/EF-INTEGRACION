/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: [
    './public/**/*.html', // Ajusta el patrón para que cubra los archivos HTML/JS de tu proyecto
    './src/**/*.{js,jsx,ts,tsx}', // Ajusta según tus fuentes de contenido
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
