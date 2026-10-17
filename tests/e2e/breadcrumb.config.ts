import { defineConfig, devices } from "@playwright/test";
export default defineConfig({ testDir: ".", testMatch: "breadcrumb.spec.ts", workers: 1, retries: 0,
  outputDir: "../../evidence/runtime/breadcrumb/test-results", reporter: "list",
  use: { ...devices["Desktop Chrome"], baseURL: "http://127.0.0.1:5194", viewport: { width: 1280, height: 960 }, trace: "retain-on-failure" } });
