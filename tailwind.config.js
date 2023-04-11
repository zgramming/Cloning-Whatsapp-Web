module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#25D366',
        'primary-tealdark': '#075E54',
        'primary-teal': '#128C7E',
      },
      fontFamily: {
        'noto-sans': ['Noto Sans', 'sans-serif'],
      },
    },
  },
  // eslint-disable-next-line global-require
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
