import { defineConfig, devices } from "@playwright/test";
import { fileURLToPath } from "node:url";

const evidence = process.env.RAIN_DATE_PICKER_REFINEMENT_EVIDENCE_DIR
  ?? fileURLToPath(new URL("../../evidence/runtime/date-picker-ux-refinement-2026-10-12/browser-refinement/", import.meta.url));

export default defineConfig({
  testDir: ".", testMatch: "date-picker-refinement.spec.ts", workers: 2, timeout: 60_000,
  forbidOnly: true, retries: 0, expect: { timeout: 5000 },
  outputDir: `${evidence}/results`,
  reporter: [["list"], ["json", { outputFile: `${evidence}/report.json` }]],
  // Use an already-running Playground, matching the other scoped G5 configurations.
  use: {
    baseURL: process.env.RAIN_DATE_PICKER_REFINEMENT_BASE_URL ?? "http://127.0.0.1:5395",
    locale: "zh-CN", timezoneId: "Asia/Shanghai", contextOptions: { reducedMotion: "reduce" },
    trace: "retain-on-failure", screenshot: "only-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 1000 } } },
    { name: "touch", use: { ...devices["Desktop Chrome"], viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true } },
  ],
});
