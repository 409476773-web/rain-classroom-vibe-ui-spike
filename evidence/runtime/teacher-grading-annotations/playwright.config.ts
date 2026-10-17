import { defineConfig } from "@playwright/test";
export default defineConfig({ testDir: "../../../tests/e2e", testMatch: "teacher-grading.spec.ts", workers: 1, retries: 0, reporter: "list", use: { viewport: { width: 1411, height: 807 } } });
