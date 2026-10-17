import { defineConfig, mergeConfig } from "vite";
import base from "./vite.config.ts";

export default mergeConfig(base, defineConfig({
  build: { outDir: "dist-bklit-validation", rollupOptions: { input: "bklit-validation.html" } },
}));
