import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./browser-specs", testMatch: "*.spec.ts", workers: 1, retries: 0, timeout: 45_000,
  outputDir: "./test-results", reporter: [["list"], ["json", { outputFile: "evidence/runtime/chart-demo-data-expansion-2026-10-11/browser-results.json" }]],
  use: { ...devices["Desktop Chrome"], baseURL: "http://127.0.0.1:5173", viewport: { width: 1440, height: 1000 }, trace: "retain-on-failure" },
});
