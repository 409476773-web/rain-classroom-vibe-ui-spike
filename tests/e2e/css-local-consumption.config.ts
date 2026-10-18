import { defineConfig, devices } from "@playwright/test";
import { evidenceOutputPath } from "../../scripts/evidence-output.mjs";
export default defineConfig({
  testDir: ".", testMatch: "css-local-consumption.spec.ts", workers: 1, retries: 0,
  outputDir: evidenceOutputPath("artifacts/css-local-consumption"), reporter: "list",
  use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 1000 }, trace: "retain-on-failure", contextOptions: { reducedMotion: "no-preference" } },
  webServer: [
    { command: "pnpm --filter @rain-next/playground dev --host 127.0.0.1 --port 5392 --strictPort", url: "http://127.0.0.1:5392", reuseExistingServer: false, timeout: 120_000 },
    { command: "pnpm --filter @rain-next/prototype dev --host 127.0.0.1 --port 5393 --strictPort", url: "http://127.0.0.1:5393", reuseExistingServer: false, timeout: 120_000 },
  ],
});
