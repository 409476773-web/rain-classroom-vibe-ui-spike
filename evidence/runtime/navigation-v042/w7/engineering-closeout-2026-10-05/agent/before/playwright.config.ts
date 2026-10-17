import { defineConfig, devices } from "@playwright/test";

process.env.RAIN_TABLE_PROTOTYPE_URL ??= "http://127.0.0.1:4174";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  forbidOnly: true,
  retries: 0,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:4173",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  webServer: [{
    command:
      "pnpm --filter @rain-next/playground exec vite --host 127.0.0.1 --port 4173",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: false,
    timeout: 120_000,
  }, {
    command: "pnpm --filter @rain-next/prototype exec vite --host 127.0.0.1 --port 4174 --strictPort",
    url: "http://127.0.0.1:4174",
    reuseExistingServer: false,
    timeout: 120_000,
  }],
  projects: [
    {
      name: "chromium",
      testIgnore: ["**/bm-a.spec.ts", "**/m2.spec.ts", "**/navigation-rebuild-closure.spec.ts"],
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "chromium-prototype",
      testMatch: ["**/bm-a.spec.ts", "**/m2.spec.ts", "**/navigation-rebuild-closure.spec.ts"],
      use: { ...devices["Desktop Chrome"], baseURL: "http://127.0.0.1:4174" },
    },
  ],
});
