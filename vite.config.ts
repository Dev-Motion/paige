import { defineConfig } from "vite";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";
import path from "path";
import { dependencies } from "./package.json";
function renderChunks(deps: Record<string, string>) {
  // eslint-disable-next-line prefer-const
  let chunks = {};
  Object.keys(deps).forEach((key) => {
    if (["react", "react-dom"].includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
}

function pathResolve(dir: string) {
  return path.join(__dirname, ".", dir);
}

const buildTarget = process.env.BUILD_TARGET || "web";
const isProduction = process.env.NODE_ENV === "production";
const isWeb = buildTarget === "web";
const isChrome = buildTarget === "chrome";
const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType: "prompt",
  includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
  manifest: {
    name: "Paige: your pesonal space",
    short_name: "Paige",
    description:
      "a space where you can customize your focus, immerse yourself in calm scenes, and find inspiration whenever you open a new tab in your browser",
    icons: [
      {
        src: "/logo/128x128.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo/128x128.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/logo/128x128.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "apple touch icon",
      },
      {
        src: "/logo/128x128.png",
        sizes: "225x225",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
    theme_color: "#171717",
    background_color: "#e8ebf2",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "landscape",
  },
  devOptions: {
    enabled: true,
  },
  workbox: {
    globPatterns: ["**/*.{js,css,html,ico,png,svg,tff}"],
  },
};

const plugins = isWeb ? [react(), VitePWA(manifestForPlugin)] : [react()];
const manualChunks =
  isChrome && !isProduction
    ? null
    : {
      vendor: ["react", "react-dom"],
      ...renderChunks(dependencies),
    };
export default defineConfig({
  plugins,
  resolve: {
    alias: [
      {
        find: "stitches.config",
        replacement: pathResolve("stitches.config.ts"),
      },
      {
        find: "@utils",
        replacement: pathResolve("src/utils"),
      },
      {
        find: "@context",
        replacement: pathResolve("src/context"),
      },
      {
        find: "@components",
        replacement: pathResolve("src/components"),
      },
      {
        find: "@store",
        replacement: pathResolve("src/store"),
      },
      {
        find: "@constants",
        replacement: pathResolve("src/constants"),
      },
      {
        find: "@types",
        replacement: pathResolve("src/types"),
      },
      {
        find: "@hooks",
        replacement: pathResolve("src/hooks"),
      },
    ],
  },
  build: {
    rollupOptions: {
      input: {
        // the default entry point
        index: "./index.html",

        // 1️⃣
        "service-worker": "./src/service-worker.ts",
      },

      output: {
        chunkFileNames: "assets/[name].min.js",
        entryFileNames: (assetInfo) => {
          return assetInfo.name === "service-worker"
            ? "service-worker.js"
            : "assets/[name].min.js";
        },
        manualChunks,
      },
    },
  },
});
