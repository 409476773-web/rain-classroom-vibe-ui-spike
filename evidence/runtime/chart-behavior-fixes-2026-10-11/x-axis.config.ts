import { defineConfig, devices } from "@playwright/test";
import { fileURLToPath } from "node:url";
export default defineConfig({
  testDir: fileURLToPath(new URL("../../../tests/e2e/", import.meta.url)),
  testMatch: "chart-x-axis-resize.spec.ts", workers: 1, retries: 0,
  outputDir: fileURLToPath(new URL(`browser/x-axis/${process.env.RAIN_CHART_AXIS_RUN ?? "after-01"}/results/`, import.meta.url)),
  reporter: "list",
  use: { ...devices["Desktop Chrome"], baseURL: "http://127.0.0.1:5173", viewport: { width: 1440, height: 1000 }, trace: "retain-on-failure" },
});
