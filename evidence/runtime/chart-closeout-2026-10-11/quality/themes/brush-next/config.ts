import { defineConfig } from "@playwright/test";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
const output = process.env.RAIN_BRUSH_OUTPUT!;
export default defineConfig({
  testDir: fileURLToPath(new URL(".", import.meta.url)), testMatch: "brush.spec.ts",
  workers: 1, retries: 0, timeout: 60000, expect: { timeout: 10000 },
  outputDir: resolve(output, "test-results"),
  reporter: [["list"], ["json", { outputFile: resolve(output, "results.json") }]],
  use: { baseURL: "http://127.0.0.1:5173", headless: true, timezoneId: "Asia/Shanghai", contextOptions: { reducedMotion: "reduce", colorScheme: "light", forcedColors: "none" }, trace: "retain-on-failure", screenshot: "only-on-failure" },
  projects: (["chromium", "firefox", "webkit"] as const).flatMap(browserName => [1440, 390].map(width => ({ name: `${browserName}-${width}`, use: { browserName, viewport: { width, height: width === 390 ? 844 : 1000 } } }))),
});
