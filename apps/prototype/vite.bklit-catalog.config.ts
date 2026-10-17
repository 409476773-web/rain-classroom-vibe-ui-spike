import { defineConfig, mergeConfig } from "vite";
import base from "./vite.config.ts";
export default mergeConfig(base, defineConfig({ build: { outDir: "dist-bklit-catalog", rollupOptions: { input: "bklit-catalog.html" } } }));
