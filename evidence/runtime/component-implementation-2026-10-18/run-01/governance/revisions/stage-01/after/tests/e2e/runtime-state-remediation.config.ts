import { defineConfig, devices } from "@playwright/test";
import { evidenceOutputPath } from "../../scripts/evidence-output.mjs";

export default defineConfig({
  testDir: ".", testMatch: ["runtime-state-remediation.spec.ts", "input.spec.ts", "tree.spec.ts", "navigation-v042-w6.spec.ts"], workers: 1, retries: 0,
  outputDir: evidenceOutputPath("artifacts/runtime-state-remediation"), reporter: "list",
  use: { ...devices["Desktop Chrome"], baseURL: "http://127.0.0.1:5391", trace: "retain-on-failure" },
  webServer: {
    command: "pnpm --filter @rain-next/playground dev --host 127.0.0.1 --port 5391 --strictPort",
    url: "http://127.0.0.1:5391", reuseExistingServer: false, timeout: 120_000,
  },
});
