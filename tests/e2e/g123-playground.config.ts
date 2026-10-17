import { defineConfig, devices } from "@playwright/test";
import { fileURLToPath } from "node:url";

const evidence = process.env.RAIN_NAVIGATION_EVIDENCE_DIR ? `${process.env.RAIN_NAVIGATION_EVIDENCE_DIR}/g123` : fileURLToPath(new URL("../../evidence/runtime/g123-playground-2026-10-07/browser/", import.meta.url));

export default defineConfig({
  testDir: ".",
  testMatch: "g123-playground.spec.ts",
  workers: 1,
  timeout: 60000,
  outputDir: `${evidence}/results`,
  reporter: [["list"], ["json", { outputFile: `${evidence}/report.json` }]],
  use: { baseURL: "http://127.0.0.1:5376", trace: "retain-on-failure", screenshot: "only-on-failure" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"], viewport: { width: 1390, height: 900 } } }],
});
