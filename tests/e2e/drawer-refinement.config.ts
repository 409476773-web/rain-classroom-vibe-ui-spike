import { defineConfig, devices } from "@playwright/test";
import { fileURLToPath } from "node:url";
const workspaceRoot = fileURLToPath(new URL("../../", import.meta.url));
export default defineConfig({
  testDir: ".", testMatch: "drawer-refinement.spec.ts", workers: 1, timeout: 30000,
  outputDir: "../../evidence/runtime/drawer-refinement-2026-10-14/browser/results",
  reporter: [["list"], ["json", { outputFile: "evidence/runtime/drawer-refinement-2026-10-14/browser/report.json" }]],
  webServer: { cwd: workspaceRoot, command: "pnpm --filter @rain-next/playground dev --port 5397 --strictPort", url: "http://127.0.0.1:5397", reuseExistingServer: true },
  use: { baseURL: "http://127.0.0.1:5397", trace: "retain-on-failure", screenshot: "only-on-failure" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "narrow", use: { ...devices["Desktop Chrome"], viewport: { width: 390, height: 844 } } },
    { name: "short", use: { ...devices["Desktop Chrome"], viewport: { width: 390, height: 480 } } },
  ],
});
