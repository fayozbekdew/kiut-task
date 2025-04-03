import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const manifest = {
  theme_color: "#8936FF",
  background_color: "#2EC6FE",
  icons: [
    {
      purpose: "maskable",
      sizes: "512x512",
      src: "icon512_maskable.png",
      type: "image/png",
    },
    {
      purpose: "any",
      sizes: "512x512",
      src: "icon512_rounded.png",
      type: "image/png",
    },
  ],
  orientation: "portrait",
  display: "standalone",
  lang: "ru-RU",
  name: "KEIT",
  short_name: "KEIT",
  start_url: "/",
};
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{html,css,js.ico,png,svg}*"],
      },
      manifest: manifest,
    }),
  ],
});
