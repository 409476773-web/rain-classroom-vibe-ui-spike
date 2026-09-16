import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "../../../tests/e2e", fullyParallel: false, workers: 2, retries: 0,
  outputDir: "./cross-browser-results", reporter: "list",
  use: { baseURL: "http://127.0.0.1:5215", screenshot: "only-on-failure", trace: "retain-on-failure" },
  projects: [
    { name: "chromium", use: devices["Desktop Chrome"] },
    { name: "firefox", testIgnore: "**/dialog.spec.ts", use: devices["Desktop Firefox"] },
    { name: "webkit", testIgnore: "**/dialog.spec.ts", use: devices["Desktop Safari"] },
  ],
});
