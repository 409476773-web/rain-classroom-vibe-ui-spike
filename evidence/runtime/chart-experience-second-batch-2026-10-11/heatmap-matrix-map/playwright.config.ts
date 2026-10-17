import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "../../../../tests/e2e",
  testMatch: "chart-second-batch-heatmap-map.spec.ts",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  timeout: 45000,
  reporter: "list",
  outputDir: `./heatmap-browser/${process.env.RAIN_HEATMAP_BROWSER_RUN ?? "after-01"}/test-results`,
  use: { baseURL: "http://127.0.0.1:5173", timezoneId: "Asia/Shanghai", screenshot: "only-on-failure", trace: "retain-on-failure" },
});
