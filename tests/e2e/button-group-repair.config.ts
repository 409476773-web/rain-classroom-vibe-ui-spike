import { defineConfig } from "@playwright/test";
import { fileURLToPath } from "node:url";
import base from "./g123-playground.config";

const evidence = process.env.BUTTON_GROUP_EVIDENCE ?? fileURLToPath(new URL("../../evidence/runtime/button-group-repair-2026-10-07/browser/", import.meta.url));

export default defineConfig({
  ...base,
  testMatch: "button-group-repair.spec.ts",
  outputDir: `${evidence}/results`,
  reporter: [["list"], ["json", { outputFile: `${evidence}/report.json` }]],
});
