import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: ".", testMatch: "chart-library-validation.spec.ts", workers: 1, retries: 0,
  outputDir: "../../evidence/runtime/chart-library-validation/test-results",
  reporter: "list",
  use: { ...devices["Desktop Chrome"], baseURL: "http://127.0.0.1:5387", viewport: { width: 1440, height: 1000 }, trace: "retain-on-failure" },
});
