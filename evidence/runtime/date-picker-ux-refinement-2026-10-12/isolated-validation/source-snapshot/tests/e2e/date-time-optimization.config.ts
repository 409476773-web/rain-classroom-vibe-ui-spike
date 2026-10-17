import { defineConfig, devices } from "@playwright/test";
import { fileURLToPath } from "node:url";

const stress = process.env.RAIN_DATE_TIME_CSS_ZOOM_STRESS === "1";
const evidenceRoot = fileURLToPath(new URL("../../evidence/runtime/date-picker-ux-refinement-2026-10-12/browser/", import.meta.url));
const evidence = stress ? `${evidenceRoot}/css-zoom-stress` : evidenceRoot;
export default defineConfig({
  testDir: ".", testMatch: "date-time-optimization.spec.ts", workers: 2, timeout: 45_000,
  grep: stress ? /additional CSS zoom stress/ : /^(?!.*additional CSS zoom stress).*$/,
  expect: { timeout: 5000 },
  outputDir: `${evidence}/results`,
  reporter: [["list"], ["json", { outputFile: `${evidence}/report.json` }]],
  use: {
    baseURL: "http://127.0.0.1:5395", locale: "zh-CN", timezoneId: "Asia/Shanghai",
    trace: "retain-on-failure", screenshot: "only-on-failure",
  },
  projects: stress ? [
    { name: "css-zoom-stress390", use: { ...devices["Desktop Chrome"], viewport: { width: 390, height: 844 } } },
  ] : [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 1000 } } },
    { name: "narrow390", grep: /all three task samples|responsive panels|dark compact/, use: { ...devices["Desktop Chrome"], viewport: { width: 390, height: 844 } } },
    { name: "touch390", grep: /all three task samples|responsive panels/, use: { ...devices["Desktop Chrome"], viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true } },
    { name: "touch600", grep: /all three task samples|responsive panels|dark compact/, use: { ...devices["Desktop Chrome"], viewport: { width: 600, height: 900 }, hasTouch: true, isMobile: true } },
    { name: "webkit", grepInvert: /pasted HH:mm|UTC labels|dark compact|additional CSS zoom stress/, use: { ...devices["Desktop Safari"], viewport: { width: 1440, height: 1000 } } },
  ],
});
