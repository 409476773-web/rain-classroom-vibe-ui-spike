import { defineConfig, devices } from "@playwright/test";

// Exercise the running report preview; no unrelated playground servers needed.
export default defineConfig({
  testDir: ".", testMatch: "learning-report-a.spec.ts", workers: 1, retries: 0,
  outputDir: "../../evidence/runtime/learning-report-a/v2/test-results",
  reporter: "list",
  use: { ...devices["Desktop Chrome"], viewport: { width: 1115, height: 812 }, trace: "retain-on-failure" },
});
