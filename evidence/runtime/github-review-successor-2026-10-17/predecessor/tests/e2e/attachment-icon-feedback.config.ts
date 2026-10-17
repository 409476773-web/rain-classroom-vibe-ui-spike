import { defineConfig } from "@playwright/test";
import original from "./attachment-workflow.config";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../../", import.meta.url));
const evidence = root + "evidence/runtime/attachment-visual-2026-10-16/feedback-01/browser/";
export default defineConfig(original, {
  testMatch: "attachment-icon-feedback.spec.ts",
  outputDir: evidence + "results",
  reporter: [["list"], ["json", { outputFile: evidence + "report.json" }]],
  webServer: { cwd: root, command: "pnpm --filter @rain-next/playground exec vite --host 127.0.0.1 --port 5487 --strictPort", url: "http://127.0.0.1:5487", reuseExistingServer: false },
  use: { ...original.use, baseURL: "http://127.0.0.1:5487" },
  projects: [
    { name: "desktop", use: { viewport: { width: 1440, height: 1200 } } },
    { name: "narrow", use: { viewport: { width: 360, height: 900 } } },
  ],
});
