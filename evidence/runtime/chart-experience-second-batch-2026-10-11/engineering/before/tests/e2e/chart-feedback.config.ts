import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: ".", testMatch: "chart-feedback-*.spec.ts", workers: 2, retries: 0,
  timeout: 45_000, reporter: "list",
  outputDir: "../../evidence/runtime/chart-variants/feedback-2026-10-08/final-browser-results",
  use: { ...devices["Desktop Chrome"], baseURL: "http://127.0.0.1:5173", reducedMotion: "reduce", trace: "retain-on-failure" },
});
