import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "../../../../../tests/e2e", testMatch: "chart-third-batch-candle.spec.ts",
  fullyParallel: false, workers: 1, retries: 0, timeout: 240000, reporter: "list",
  outputDir: `./${process.env.RAIN_CANDLE_BROWSER_RUN ?? "after-01"}/test-results`,
  use: {baseURL: "http://127.0.0.1:5173", timezoneId: "Asia/Shanghai", screenshot: "only-on-failure", trace: "retain-on-failure"},
});
