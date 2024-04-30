/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",

    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        custom: {
          'green2': '#00a987',
          'green4': '#024744',
          'green3': '#1b6941',
          'green5': '#40aba4',
          'green1': '#338269',
          'yellow1': '#fde6c4',
          'yellow2': '#c4c108',
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
