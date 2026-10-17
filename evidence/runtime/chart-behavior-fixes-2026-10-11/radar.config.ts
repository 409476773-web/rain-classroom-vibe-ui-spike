import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "../../../tests/e2e",
  testMatch: "chart-radar-motion.spec.ts",
  workers: 1,
  retries: 0,
  timeout: 90_000,
  outputDir: "./browser/radar/test-results",
  reporter: "list",
  use: { ...devices["Desktop Chrome"], baseURL: "http://127.0.0.1:5173", viewport: { width: 1440, height: 1000 }, trace: "retain-on-failure" },
});
