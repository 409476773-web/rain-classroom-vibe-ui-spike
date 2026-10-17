import { defineConfig } from "@playwright/test";
import { resolve } from "node:path";
const output = process.env.RAIN_LIVE_EVIDENCE_DIR!;
export default defineConfig({
  testDir: resolve(import.meta.dirname, "../../../../../tests/e2e"), testMatch: "chart-third-batch-live.spec.ts", workers: 1, retries: 0,
  timeout: 240_000, expect: { timeout: 10_000 }, outputDir: resolve(output, "test-results"),
  reporter: [["list"], ["json", { outputFile: resolve(output, "results.json") }]],
  use: { baseURL: "http://127.0.0.1:5173", browserName: "chromium", headless: true, timezoneId: "Asia/Shanghai", trace: "retain-on-failure", screenshot: "only-on-failure" },
  projects: [1440, 390].flatMap(width => (["no-preference", "reduce"] as const).map(reducedMotion => ({ name: `${width}-${reducedMotion}`, use: { viewport: { width, height: width === 390 ? 844 : 1000 }, reducedMotion } }))),
});
