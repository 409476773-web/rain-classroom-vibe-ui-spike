import { defineConfig } from "@playwright/test";
export default defineConfig({ testDir: "../../../tests/e2e", testMatch: "learning-report-a.spec.ts", workers: 1, retries: 0, reporter: "list", use: { viewport: { width: 1369, height: 807 } } });
