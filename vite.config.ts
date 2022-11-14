import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "stitches.config",
        replacement: path.resolve(__dirname, "stitches.config.ts"),
      },
      {
        find: "@utils",
        replacement: path.resolve(__dirname, "src/utils"),
      },
      {
        find: "@components",
        replacement: path.resolve(__dirname, "src/components"),
      },
    ],
  },
})
