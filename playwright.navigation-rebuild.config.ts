import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.RAIN_NAVIGATION_REBUILD_URL ?? "http://127.0.0.1:4174";

export default defineConfig({
  testDir: "./tests/e2e",
  testMatch: "**/navigation-rebuild*.spec.ts",
  fullyParallel: false,
  workers: 1,
  forbidOnly: true,
  retries: 0,
  timeout: 30_000,
  expect: { timeout: 5_000 },
  outputDir: "./evidence/runtime/navigation-rebuild/playwright",
  reporter: [
    ["list"],
    ["json", { outputFile: "./evidence/runtime/navigation-rebuild/playwright-results.json" }],
  ],
  use: {
    ...devices["Desktop Chrome"],
    baseURL,
    viewport: { width: 1440, height: 900 },
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "pnpm --filter @rain-next/prototype exec vite --host 127.0.0.1 --port 4174 --strictPort",
    url: baseURL,
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
