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
          'green4': '#0e424c',
          'green3': '#1b6941',
          'green5': '#03395f',
          'green1': '#338269',
          'yellow1': '#fbff08',
          'yellow2': '#c4c108',
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
