import { defineConfig } from "@playwright/test";
export default defineConfig({ testDir: "../../../tests/e2e", testMatch: "token-first-g1-next.spec.ts", workers: 1, retries: 0, reporter: "list", outputDir: "./test-results", use: { viewport: { width: 1440, height: 1000 }, trace: "retain-on-failure" } });
