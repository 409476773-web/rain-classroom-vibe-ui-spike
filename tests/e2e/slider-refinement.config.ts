import { defineConfig, devices } from "@playwright/test";
import { fileURLToPath } from "node:url";

const evidence = fileURLToPath(new URL("../../evidence/runtime/slider-experience-2026-10-13/browser/", import.meta.url));
export default defineConfig({
  testDir: ".", testMatch: "slider-refinement.spec.ts", workers: 2, timeout: 45_000,
  forbidOnly: true, retries: 0, expect: { timeout: 5000 },
  outputDir: evidence + "/results",
  reporter: [["list"], ["json", { outputFile: evidence + "/report.json" }]],
  use: { baseURL: "http://127.0.0.1:5397", locale: "zh-CN", trace: "retain-on-failure", screenshot: "only-on-failure" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 1000 } } },
    { name: "touch", use: { ...devices["Desktop Chrome"], viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true } },
  ],
});
