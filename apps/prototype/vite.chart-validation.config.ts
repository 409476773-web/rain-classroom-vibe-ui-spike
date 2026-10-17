import { defineConfig, mergeConfig } from "vite";
import base from "./vite.config.ts";

export default mergeConfig(base, defineConfig({
  build: { outDir: "dist-chart-validation", rollupOptions: { input: "chart-validation.html" } },
}));
