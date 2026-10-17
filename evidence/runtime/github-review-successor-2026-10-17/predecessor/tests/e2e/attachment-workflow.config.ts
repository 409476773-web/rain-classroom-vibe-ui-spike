import { defineConfig, devices } from "@playwright/test";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../../", import.meta.url));
const evidence = root + "evidence/runtime/attachment-functions-2026-10-15/browser/";
export default defineConfig({
  testDir: ".", testMatch: "attachment-workflow.spec.ts", workers: 1, timeout: 45000, retries: 0,
  outputDir: evidence + "results", reporter: [["list"], ["json", { outputFile: evidence + "report.json" }]],
  webServer: [
    { cwd: root, command: "node tests/fixtures/attachment-server.mjs", url: "http://127.0.0.1:5472/health", reuseExistingServer: false },
    { cwd: root, command: "pnpm --filter @rain-next/playground exec vite --host 127.0.0.1 --port 5471 --strictPort", url: "http://127.0.0.1:5471", reuseExistingServer: false },
  ],
  use: { channel: "chromium", baseURL: "http://127.0.0.1:5471", locale: "zh-CN", trace: "retain-on-failure", screenshot: "only-on-failure" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 1000 } } },
    { name: "narrow", use: { ...devices["Desktop Chrome"], viewport: { width: 390, height: 844 } } },
  ],
});
