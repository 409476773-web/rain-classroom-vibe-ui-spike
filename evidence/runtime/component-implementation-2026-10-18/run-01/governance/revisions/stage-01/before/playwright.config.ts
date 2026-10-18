import { defineConfig, devices } from "@playwright/test";

// These scenarios belong to the prototype server started by this configuration.
for (const name of ["RAIN_TABLE_PROTOTYPE_URL", "RAIN_V12_URL", "RAIN_V12_NEXT_URL", "RAIN_V12_G2_URL", "RAIN_V12_G3_URL", "RAIN_TEACHER_URL"]) {
  process.env[name] ??= "http://127.0.0.1:4174";
}
const prototypeSpecs = ["**/bm-a.spec.ts", "**/m2.spec.ts", "**/navigation-rebuild*.spec.ts", "**/learning-report-a.spec.ts", "**/token-first-g*.spec.ts", "**/teacher-grading.spec.ts"];

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
      testIgnore: prototypeSpecs,
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "chromium-prototype",
      testMatch: prototypeSpecs,
      use: { ...devices["Desktop Chrome"], baseURL: "http://127.0.0.1:4174" },
    },
  ],
});
