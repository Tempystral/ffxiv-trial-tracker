import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuePugPlugin from "vue-pug-plugin";
import * as path from "path";

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
  resolve: {
    alias: {
      "@": path.resolve(path.dirname("./"), "src")
    }
  }
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `
  //         @import "./src/assets/sass/style.scss";
  //       `
  //     }
  //   }
  // }
});
