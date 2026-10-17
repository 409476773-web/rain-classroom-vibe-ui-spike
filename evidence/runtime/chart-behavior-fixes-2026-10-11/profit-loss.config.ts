import { defineConfig, devices } from "@playwright/test";
import { resolve } from "node:path";

export default defineConfig({
  testDir: resolve(process.cwd(), "tests/e2e"),
  testMatch: "chart-profit-loss-zero.spec.ts",
  timeout: 60_000,
  workers: 1,
  retries: 0,
  reporter: "list",
  outputDir: resolve(process.cwd(), process.env.RAIN_CHART_PROFIT_LOSS_RESULT_DIR ?? "evidence/runtime/chart-behavior-fixes-2026-10-11/browser/profit-loss-results"),
  use: {
    ...devices["Desktop Chrome"],
    baseURL: process.env.RAIN_CHART_PROFIT_LOSS_URL ?? "http://127.0.0.1:5173",
    viewport: { width: 1440, height: 1000 },
    trace: "retain-on-failure",
  },
});
