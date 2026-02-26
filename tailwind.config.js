import eslint from 'vite-plugin-eslint';
export default {
  plugins: [eslint()],
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#25D366",
        dark: "#0B141A",
        light: "#F0F2F5",
      },
    },
  },
};
