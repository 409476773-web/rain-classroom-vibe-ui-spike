import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "../../../tests/e2e", testMatch: "input-number.spec.ts", fullyParallel: false,
  use: { baseURL: "http://127.0.0.1:5196", viewport: { width: 1360, height: 1000 } },
  projects: [{ name: "chromium", use: { browserName: "chromium" } }, { name: "webkit", use: { browserName: "webkit" } }],
  outputDir: "/tmp/rain-input-number-playwright", reporter: "list",
});
