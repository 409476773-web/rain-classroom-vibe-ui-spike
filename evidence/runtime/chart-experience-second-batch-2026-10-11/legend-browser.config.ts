import { defineConfig, devices } from "@playwright/test";
import { fileURLToPath } from "node:url";
export default defineConfig({
  testDir: fileURLToPath(new URL("../../../tests/e2e/", import.meta.url)),
  testMatch: "chart-legend-second-batch.spec.ts", workers: 1, retries: 0, timeout: 120000,
  outputDir: fileURLToPath(new URL("legend-browser/results/", import.meta.url)), reporter: "list",
  use: { ...devices["Desktop Chrome"], trace: "retain-on-failure" },
});
