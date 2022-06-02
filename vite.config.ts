import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuePugPlugin from "vue-pug-plugin";

export default defineConfig({
  root: "./src",
  build: {
    outDir: "../dist",
    emptyOutDir: true
  },
  plugins: [
    vue({
      template: {
        preprocessOptions: {
          plugins: [vuePugPlugin]
        }
      }
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/assets/sass/style.scss";
        `
      }
    }
  }
});
