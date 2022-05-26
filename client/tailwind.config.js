module.exports = {
  purge: {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    safelist: [
      'bg-blue-100',
      'bg-green-100',
      'w-10',
      'h-10',
      'w-14',
      'h-14',
      'w-20',
      'h-20',
      'w-24',
      'h-24',
    ],
  },
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
