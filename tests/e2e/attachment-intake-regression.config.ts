import { defineConfig } from "@playwright/test";
import original from "./attachment-intake.config";
import { fileURLToPath } from "node:url";
const evidence = fileURLToPath(new URL("../../evidence/runtime/attachment-intake-2026-10-16/regression/", import.meta.url));
export default defineConfig(original, {
  testMatch: /attachment-(scenarios|intake-regression)\.spec\.ts/,
  outputDir: evidence + "results",
  reporter: [["list"], ["json", { outputFile: evidence + "report.json" }]],
});
