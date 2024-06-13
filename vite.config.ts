import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://medieinstitutet.github.io/vue-tictactoe-LilithSWE/", // Replace with your repository name
  plugins: [vue()],
});
