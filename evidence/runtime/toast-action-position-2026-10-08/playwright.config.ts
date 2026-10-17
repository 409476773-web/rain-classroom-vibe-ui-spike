import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "../../../tests/e2e",
  testMatch: "toast-action-position.spec.ts",
  retries: 0,
  reporter: "list",
  outputDir: "./test-results",
  use: { baseURL: "http://127.0.0.1:5173", viewport: { width: 1440, height: 1000 }, screenshot: "only-on-failure" },
});
