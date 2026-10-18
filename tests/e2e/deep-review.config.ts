import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: ".",
  testMatch: ["deep-review-input-tree.spec.ts", "deep-review-focus.spec.ts", "css-variables-tabs.spec.ts", "composition-recipes.spec.ts", "playground-shell.spec.ts"],
  workers: 1,
  retries: 0,
  outputDir: "../../artifacts/deep-review-regression",
  reporter: "list",
  use: { ...devices["Desktop Chrome"], baseURL: "http://127.0.0.1:5380", trace: "retain-on-failure" },
  webServer: {
    command: "pnpm --filter @rain-next/playground dev --host 127.0.0.1 --port 5380 --strictPort",
    url: "http://127.0.0.1:5380", reuseExistingServer: false, timeout: 120_000,
  },
});
