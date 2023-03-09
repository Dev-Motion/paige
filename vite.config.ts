import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// split the code into multiple files based on REact.lazy components
// https://vitejs.dev/guide/features.html#glob-import

function pathResolve(dir: string) {
  return path.join(__dirname, ".", dir);
}

// https://vitejs.  /config/
export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin()],
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
      },
    },
  },
});
