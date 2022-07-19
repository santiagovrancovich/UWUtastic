import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import { VitePWA } from "vite-plugin-pwa"
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: "./",
  publicDir: "./public",
  build: {
    outDir: "./dist",
  },
  server: {
    port: 8080,
  },
  plugins: [
    createHtmlPlugin(),
    react({ include: "**/*.{jsx,tsx}" }),
    VitePWA({ 
      registerType: "autoUpdate",
      devOptions: {
        enabled: true
      }})
  ],
});