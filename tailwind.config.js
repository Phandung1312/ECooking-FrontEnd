// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
  safelist: [
    {
      pattern: /(from|via|to|border|bg|text)-(.*)-(\d{1}0{1,2})/,
    },
  ],
};
