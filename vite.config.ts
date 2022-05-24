import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuePugPlugin from "vue-pug-plugin";

// https://vitejs.dev/config/
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
          plugins: [
            {
              preCodeGen: vuePugPlugin
            }
          ]
        }
      }
    })
  ]
});
