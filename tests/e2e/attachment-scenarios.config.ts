import { defineConfig } from "@playwright/test";
import original from "./attachment-workflow.config";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../../", import.meta.url));
const evidence = root + "evidence/runtime/attachment-scenarios-2026-10-16/browser/";
export default defineConfig(original, {
  testMatch: /attachment-(scenarios|workflow)\.spec\.ts/,
  outputDir: evidence + "results",
  reporter: [["list"], ["json", { outputFile: evidence + "report.json" }]],
  projects: [
    { name: "desktop", use: { viewport: { width: 1440, height: 1000 } } },
    { name: "narrow", use: { viewport: { width: 360, height: 900 } } },
  ],
});
