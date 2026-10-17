import { defineConfig } from "@playwright/test";
import { resolve } from "node:path";

const run = resolve("evidence/runtime/chart-closeout-2026-10-11/quality/core");
export default defineConfig({
  testDir: run,
  testMatch: "*.spec.ts",
  testIgnore: "**/check-source/**",
  workers: 1,
  retries: 0,
  timeout: 180_000,
  outputDir: resolve(run, process.env.RAIN_QUALITY_RUN ?? "run-01", "test-results"),
  reporter: [["list"], ["json", { outputFile: resolve(run, process.env.RAIN_QUALITY_RUN ?? "run-01", "report.json") }]],
  use: { baseURL: "http://127.0.0.1:5173", screenshot: "only-on-failure", trace: "retain-on-failure" },
  projects: ["chromium", "firefox", "webkit"].flatMap(browserName => [1440, 390].map(width => ({
    name: `${browserName}-${width}`,
    use: { browserName: browserName as "chromium" | "firefox" | "webkit", viewport: { width, height: 1000 } },
  }))),
});
