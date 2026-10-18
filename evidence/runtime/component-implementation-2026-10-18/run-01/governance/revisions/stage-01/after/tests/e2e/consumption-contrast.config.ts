import { defineConfig, devices } from "@playwright/test";
import { evidenceOutputPath } from "../../scripts/evidence-output.mjs";
export default defineConfig({
  testDir: ".", testMatch: "consumption-contrast.spec.ts", workers: 1, retries: 0, timeout: 90_000,
  outputDir: evidenceOutputPath("artifacts/consumption-contrast"), reporter: "list",
  use: { ...devices["Desktop Chrome"], baseURL: "http://127.0.0.1:5394", viewport: { width: 1440, height: 1100 }, contextOptions: { reducedMotion: "reduce" }, trace: "retain-on-failure" },
  webServer: { command: "pnpm --filter @rain-next/playground dev --host 127.0.0.1 --port 5394 --strictPort", url: "http://127.0.0.1:5394", reuseExistingServer: false, timeout: 120_000 },
});
