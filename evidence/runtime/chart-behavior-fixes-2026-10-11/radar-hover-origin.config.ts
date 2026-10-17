import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "../../../tests/e2e",
  testMatch: "chart-radar-hover-origin.spec.ts",
  workers: 1, retries: 0, timeout: 90000,
  reporter: "list",
  outputDir: `./browser/radar-hover-origin/results/${process.env.RAIN_RADAR_ORIGIN_PHASE ?? "green"}`,
  use: { baseURL: "http://127.0.0.1:5173", browserName: "chromium", trace: "retain-on-failure" },
});
