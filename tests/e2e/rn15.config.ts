import { defineConfig, devices } from "@playwright/test";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const evidence = process.env.RAIN_RN15_EVIDENCE ?? mkdtempSync(join(tmpdir(), "rain-rn15-browser-"));
process.env.RAIN_RN15_EVIDENCE = evidence;
process.env.RAIN_BMA_EVIDENCE_DIR = join(evidence, "bm-a");
process.env.RAIN_BM_B_EVIDENCE = join(evidence, "bm-b");
const prototype = "http://127.0.0.1:5334", playground = "http://127.0.0.1:5333";
process.env.RAIN_DIALOG_PROTOTYPE_URL = prototype;
process.env.RAIN_CARD_PROTOTYPE_URL = prototype;
process.env.RAIN_LAYOUTS_PROTOTYPE_URL = prototype;

export default defineConfig({
  testDir: ".", workers: 1, retries: 0,
  outputDir: join(evidence, "results"),
  reporter: [["list"], ["json", { outputFile: join(evidence, "report.json") }]],
  use: { trace: "retain-on-failure" },
  webServer: [
    { name: "playground", command: "pnpm --filter @rain-next/playground exec vite preview --host 127.0.0.1 --port 5333 --strictPort", url: playground },
    { name: "prototype", command: "pnpm --filter @rain-next/prototype exec vite preview --host 127.0.0.1 --port 5334 --strictPort", url: prototype },
  ].map(server => ({ ...server, cwd: fileURLToPath(new URL("../..", import.meta.url)), reuseExistingServer: false })),
  projects: [
    { name: "chromium-dependencies", testMatch: ["card.spec.ts", "dialog.spec.ts", "layouts.spec.ts"], use: { ...devices["Desktop Chrome"], baseURL: playground } },
    ...([ ["chromium", "Desktop Chrome"], ["firefox", "Desktop Firefox"], ["webkit", "Desktop Safari"] ] as const).map(([name, device]) => ({
      name, testMatch: ["bm-a.spec.ts", "bm-b.spec.ts"], use: { ...devices[device], baseURL: prototype },
    })),
  ],
});
