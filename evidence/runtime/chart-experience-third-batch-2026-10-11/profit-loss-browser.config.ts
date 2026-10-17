import { defineConfig, devices } from "@playwright/test";
import { fileURLToPath } from "node:url";
export default defineConfig({
 testDir:fileURLToPath(new URL("../../../tests/e2e/",import.meta.url)),testMatch:["chart-third-batch-profit-loss.spec.ts","chart-profit-loss-zero.spec.ts"],workers:1,retries:0,timeout:120000,
 outputDir:fileURLToPath(new URL("profit-loss-browser/results/",import.meta.url)), reporter:"list",
 use:{...devices["Desktop Chrome"],baseURL:"http://127.0.0.1:5173",trace:"retain-on-failure"},
});
