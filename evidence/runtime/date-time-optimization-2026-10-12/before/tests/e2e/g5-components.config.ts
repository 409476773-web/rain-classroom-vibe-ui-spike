import { defineConfig, devices } from "@playwright/test";
import { fileURLToPath } from "node:url";
export default defineConfig({
  testDir: ".", testMatch: "g5-components.spec.ts", workers: 1, timeout: 90000,
  outputDir: "../../evidence/runtime/g5-components-2026-10-12/browser/results",
  reporter: [["list"], ["json", { outputFile: fileURLToPath(new URL("../../evidence/runtime/g5-components-2026-10-12/browser/report.json", import.meta.url)) }]],
  use: { baseURL: "http://127.0.0.1:5395", trace: "retain-on-failure", screenshot: "only-on-failure" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 1000 } } },
    { name: "narrow", use: { ...devices["Desktop Chrome"], viewport: { width: 390, height: 844 } } },
  ],
});
