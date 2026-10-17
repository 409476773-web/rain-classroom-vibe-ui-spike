import { defineConfig } from "@playwright/test";
import { resolve } from "node:path";

export default defineConfig({
  testDir: resolve("tests/e2e"),
  testMatch: ["chart-visual-rebalance.spec.ts", "charts-playground.spec.ts", "chart-variants.spec.ts"],
  outputDir: resolve(process.env.RAIN_CHART_VISUAL_REBALANCE_OUTPUT_DIR ?? "evidence/runtime/chart-visual-rebalance-2026-10-10/test-results"),
  timeout: 90_000,
  workers: 1,
  reporter: "list",
  use: { baseURL: "http://127.0.0.1:5173", reducedMotion: "reduce", viewport: { width: 1440, height: 1000 }, screenshot: "only-on-failure", trace: "retain-on-failure" },
});
