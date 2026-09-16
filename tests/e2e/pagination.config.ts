import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: ".", testMatch: "pagination.spec.ts", outputDir: "../../test-results/pagination",
  fullyParallel: false, forbidOnly: true, retries: 0, reporter: "list",
  use: { baseURL: "http://127.0.0.1:5188", screenshot: "only-on-failure", trace: "retain-on-failure" },
  webServer: {
    command: "pnpm --filter @rain-next/playground exec vite preview --host 127.0.0.1 --port 5188 --strictPort",
    url: "http://127.0.0.1:5188", reuseExistingServer: false, timeout: 120_000,
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
});
