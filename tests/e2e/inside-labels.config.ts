import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: ".", testMatch: "inside-labels.spec.ts", fullyParallel: false, workers: 1, retries: 0, reporter: "list",
  outputDir: "../../test-results/inside-labels", use: { baseURL: "http://127.0.0.1:5198", trace: "retain-on-failure" },
  webServer: { command: "pnpm --filter @rain-next/playground exec vite --host 127.0.0.1 --port 5198 --strictPort", url: "http://127.0.0.1:5198", reuseExistingServer: true },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
});
