import { defineConfig } from "vite";

export default defineConfig({
  root: "./src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
  server: {
    port: 4002,
    open: true,
  },
  publicDir: "../public",
});
