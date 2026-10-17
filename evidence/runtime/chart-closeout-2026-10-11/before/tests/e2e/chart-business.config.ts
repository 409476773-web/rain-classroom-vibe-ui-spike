import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: ".", testMatch: "chart-business-*.spec.ts", workers: 1, retries: 0, timeout: 45_000,
  outputDir: "../../evidence/runtime/chart-mini-refinement/browser/business-results", reporter: "list",
  use: { ...devices["Desktop Chrome"], baseURL: "http://127.0.0.1:5173", viewport: { width: 1440,height: 1000 }, trace: "retain-on-failure" },
});
