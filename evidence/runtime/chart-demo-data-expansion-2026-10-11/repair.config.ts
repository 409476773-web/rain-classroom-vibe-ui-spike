import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./browser-specs", testMatch: ["chart-business-map.spec.ts", "chart-business-category.spec.ts", "post-review.spec.ts", "chart-business-matrix-refinement.spec.ts", "chart-variants.spec.ts"], workers: 1, retries: 0, timeout: 45_000,
  outputDir: "./repair-test-results", reporter: [["list"], ["json", { outputFile: "repair-results.json" }]],
  use: { ...devices["Desktop Chrome"], baseURL: "http://127.0.0.1:5173", viewport: { width: 1440, height: 1000 }, trace: "retain-on-failure" },
});
