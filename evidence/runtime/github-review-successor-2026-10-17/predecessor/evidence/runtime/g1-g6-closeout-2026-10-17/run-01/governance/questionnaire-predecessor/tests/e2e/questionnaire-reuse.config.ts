import { defineConfig, devices } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const root = fileURLToPath(new URL("../../", import.meta.url));
const evidence = fileURLToPath(new URL("../../evidence/runtime/questionnaire-reuse-2026-10-16/browser/", import.meta.url));
mkdirSync(evidence, { recursive: true });
process.env.RAIN_RADIO_EVIDENCE_DIR = `${evidence}/radio`;
process.env.RAIN_CHECKBOX_EVIDENCE_DIR = `${evidence}/checkbox`;
process.env.RAIN_SELECTION_CARDS_EVIDENCE_DIR = `${evidence}/selection-cards`;
process.env.RAIN_CLOSURE_EVIDENCE_DIR = `${evidence}/input`;

export default defineConfig({
  testDir: ".", workers: 1, timeout: 60_000,
  outputDir: `${evidence}/results`,
  reporter: [["list"], ["json", { outputFile: resolve(root, process.env.RAIN_QUESTIONNAIRE_REUSE_REPORT_FILE ?? `${evidence}/report.json`) }]],
  webServer: {
    cwd: root,
    command: "pnpm --filter @rain-next/playground exec vite --host 127.0.0.1 --port 5477 --strictPort",
    url: "http://127.0.0.1:5477", reuseExistingServer: false, timeout: 60_000,
  },
  use: { baseURL: "http://127.0.0.1:5477", trace: "retain-on-failure", screenshot: "only-on-failure" },
  projects: [
    { name: "desktop", testMatch: ["questionnaire-reuse.spec.ts", "radio.spec.ts", "checkbox.spec.ts", "selection-cards.spec.ts", "input.spec.ts"], use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 1000 } } },
    { name: "narrow", testMatch: "questionnaire-reuse.spec.ts", use: { ...devices["Desktop Chrome"], viewport: { width: 390, height: 844 } } },
  ],
});
