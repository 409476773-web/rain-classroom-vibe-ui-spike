import { defineConfig, devices } from "@playwright/test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../../", import.meta.url));
const evidence = root + "evidence/runtime/attachment-intake-2026-10-16/browser/";

export default defineConfig({
  testDir: ".",
  testMatch: "attachment-intake.spec.ts",
  workers: 1,
  timeout: 45000,
  retries: 0,
  outputDir: evidence + "results",
  reporter: [["list"], ["json", { outputFile: evidence + "report.json" }]],
  webServer: {
    cwd: root,
    command: "pnpm --filter @rain-next/playground exec vite --host 127.0.0.1 --port 5473 --strictPort",
    url: "http://127.0.0.1:5473",
    reuseExistingServer: true,
  },
  use: {
    channel: "chromium",
    baseURL: "http://127.0.0.1:5473",
    locale: "zh-CN",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 1000 } } },
    { name: "narrow", use: { ...devices["Desktop Chrome"], viewport: { width: 360, height: 900 } } },
  ],
});
