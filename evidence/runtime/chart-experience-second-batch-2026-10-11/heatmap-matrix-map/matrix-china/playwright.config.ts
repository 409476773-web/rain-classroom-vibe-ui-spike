import { defineConfig, devices } from "@playwright/test";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const output = dirname(fileURLToPath(import.meta.url));
export default defineConfig({
  testDir: resolve(process.cwd(), "tests/e2e"), testMatch: "chart-second-batch-matrix-china.spec.ts",
  workers: 1, retries: 0, timeout: 60_000,
  outputDir: resolve(output, "results"),
  reporter: [["list"], ["json", { outputFile: resolve(output, "playwright-report.json") }]],
  use: { ...devices["Desktop Chrome"], baseURL: "http://127.0.0.1:5173", viewport: { width: 390, height: 844 }, hasTouch: true, timezoneId: "Asia/Shanghai", trace: "retain-on-failure", screenshot: "only-on-failure" },
});
