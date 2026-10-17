import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: ".", testMatch: "chart-variants.spec.ts", workers: 1, retries: 0,
  outputDir: "../../evidence/runtime/chart-variants/results", reporter: "list",
  use: { ...devices["Desktop Chrome"], baseURL: process.env.RAIN_CHART_VARIANTS_URL ?? "http://127.0.0.1:5173", viewport: { width: 1440, height: 1000 }, trace: "retain-on-failure" },
});
