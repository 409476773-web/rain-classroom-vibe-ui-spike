import { defineConfig } from "@playwright/test";
import original from "./attachment-workflow.config";
import { fileURLToPath } from "node:url";
const evidence = fileURLToPath(new URL("../../evidence/runtime/attachment-visual-2026-10-16/browser/", import.meta.url));
export default defineConfig(original, {
  outputDir: evidence + "results",
  reporter: [["list"], ["json", { outputFile: evidence + "report.json" }]],
});
