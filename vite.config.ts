import react from "@vitejs/plugin-react"
import { resolve } from "path"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"
import tsConfigPaths from "vite-tsconfig-paths"
import * as packageJson from "./package.json"

export default defineConfig(() => ({
  plugins: [
    react(),
    tsConfigPaths(),
    dts({
      include: ["src"],
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve("src", "index.ts"),
      name: "component-library",
      formats: ["es", "cjs", "umd"],
    },
    optimizeDeps: {
      exclude: Object.keys(packageJson.peerDependencies),
      //include: ["@heroicons/react", "react-datepicker"],
    },
    esbuild: {
      minify: true,
    },
    rollupOptions: {
      external: ["react", "react-dom", "formik"],
    },
  },
}))
