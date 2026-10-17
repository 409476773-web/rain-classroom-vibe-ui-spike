import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: ".", testMatch: "chart-feedback-structure.spec.ts", workers: 1, retries: 0, timeout: 45_000,
  outputDir: "../../evidence/runtime/chart-variants/feedback-2026-10-08/structure-results", reporter: "list",
  use: { ...devices["Desktop Chrome"], baseURL: "http://127.0.0.1:5173", viewport: { width: 1280, height: 796 }, trace: "retain-on-failure" },
});
