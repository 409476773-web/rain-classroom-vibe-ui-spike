import { defineConfig } from "@playwright/test";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
const output = process.env.RAIN_THEME_OUTPUT!;
export default defineConfig({
  testDir: fileURLToPath(new URL(".", import.meta.url)), testMatch: "themes.spec.ts", workers: 1, retries: 0,
  timeout: 60000, expect: { timeout: 10000 }, outputDir: resolve(output, "test-results"),
  reporter: [["list"], ["json", { outputFile: resolve(output, "results.json") }]],
  use: { baseURL: "http://127.0.0.1:5173", browserName: "chromium", headless: true, contextOptions: { reducedMotion: "reduce" }, timezoneId: "Asia/Shanghai", trace: "retain-on-failure", screenshot: "only-on-failure" },
  projects: [1440,390].flatMap(width => (["dark","forced"] as const).map(mode => ({ name: `${width}-${mode}`, use: { viewport: { width, height: width === 390 ? 844 : 1000 }, contextOptions: {reducedMotion:"reduce" as const,colorScheme: mode === "dark" ? "dark" as const : "light" as const, forcedColors: mode === "forced" ? "active" as const : "none" as const} } }))),
});
