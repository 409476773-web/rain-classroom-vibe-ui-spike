import { defineConfig, devices } from "@playwright/test";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const evidence = resolve(process.env.RAIN_M2_EVIDENCE ?? mkdtempSync(join(tmpdir(), "rain-m2-browser-")));
process.env.RAIN_M2_EVIDENCE = evidence;
const baseURL = process.env.RAIN_M2_URL ?? "http://127.0.0.1:5340";
export default defineConfig({
  testDir: ".", testMatch: "m2.spec.ts", workers: 1, retries: 0,
  outputDir: join(evidence, "results"), reporter: [["list"], ["json", { outputFile: join(evidence, "report.json") }]],
  use: { baseURL, trace: "retain-on-failure", viewport: { width: 1440, height: 900 } },
  ...(process.env.RAIN_M2_URL ? {} : { webServer: { command: "pnpm --filter @rain-next/prototype exec vite preview --host 127.0.0.1 --port 5340 --strictPort", url: baseURL, cwd: fileURLToPath(new URL("../..", import.meta.url)), reuseExistingServer: false } }),
  projects: ([ ["chromium", "Desktop Chrome"], ["firefox", "Desktop Firefox"], ["webkit", "Desktop Safari"] ] as const).map(([name, device]) => ({ name, use: { ...devices[device], viewport: { width: 1440, height: 900 } } })),
});
