import { defineConfig } from "@playwright/test";

const evidence = "../../evidence/runtime/select-unification-2026-10-13/browser";
export default defineConfig({
  testDir: ".", testMatch: "select-unification.spec.ts", workers: 1, timeout: 45000,
  outputDir: `${evidence}/results`,
  reporter: [["list"], ["json", { outputFile: `${evidence}/report.json` }]],
  use: { baseURL: "http://127.0.0.1:5395", viewport: { width: 1440, height: 1000 }, trace: "retain-on-failure" },
  projects: [
    { name: "chromium", use: { browserName: "chromium" } },
    { name: "firefox", use: { browserName: "firefox" } },
    { name: "webkit", use: { browserName: "webkit" } },
  ],
});
