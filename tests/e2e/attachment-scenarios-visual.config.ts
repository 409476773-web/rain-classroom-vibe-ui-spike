import { defineConfig } from "@playwright/test";
import original from "./attachment-scenarios.config";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../../", import.meta.url));
const evidence = root + "evidence/runtime/attachment-scenarios-2026-10-16/browser-final-visual/";
export default defineConfig(original, {
  testMatch: "attachment-scenarios.spec.ts",
  grep: /media fills|both themes|three and four draft|compact draft/,
  outputDir: evidence + "results",
  reporter: [["list"], ["json", { outputFile: evidence + "report.json" }]],
});
