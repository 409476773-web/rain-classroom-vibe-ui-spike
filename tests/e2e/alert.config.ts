import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: ".", testMatch: "alert.spec.ts", workers: 1, retries: 0,
  outputDir: "../../evidence/runtime/alert/test-results", reporter: "list",
  use: { ...devices["Desktop Chrome"], baseURL: "http://127.0.0.1:5186", viewport: { width: 1440, height: 1000 }, trace: "retain-on-failure" },
});
