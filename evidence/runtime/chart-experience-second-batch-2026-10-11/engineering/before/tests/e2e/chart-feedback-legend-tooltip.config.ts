import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: ".", testMatch: "chart-feedback-legend-tooltip.spec.ts", workers: 1, retries: 0,
  timeout: 30_000,
  outputDir: "../../evidence/runtime/chart-variants/feedback-2026-10-08/legend-tooltip/test-results",
  reporter: "list",
  use: { ...devices["Desktop Chrome"], baseURL: "http://127.0.0.1:5173", reducedMotion: "reduce", trace: "retain-on-failure" },
});
