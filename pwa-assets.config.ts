import { defineConfig, Preset } from "@vite-pwa/assets-generator/config";

export const minimalPreset: Preset = {
  transparent: {
    sizes: [64, 192, 512],
    favicons: [[64, "favicon.ico"]],
  },
  maskable: {
    sizes: [512],
    resizeOptions: {
      background: "#ffffff",
    },
  },
  apple: {
    sizes: [180],
  },
};

export default defineConfig({
  preset: minimalPreset,

  images: ["public/logo.svg"],
});
