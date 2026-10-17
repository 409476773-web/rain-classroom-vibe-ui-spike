import { defineConfig, devices } from "@playwright/test";
import { fileURLToPath } from "node:url";
const workspaceRoot=fileURLToPath(new URL("../../",import.meta.url));
const consumerRoot=fileURLToPath(new URL("../../evidence/runtime/g6-components-2026-10-14/consumer/",import.meta.url));
const reportPath=fileURLToPath(new URL("../../evidence/runtime/g6-components-2026-10-14/browser/report.json",import.meta.url));
export default defineConfig({
 testDir:".",testMatch:"g6-components.spec.ts",workers:1,timeout:60000,
 outputDir:"../../evidence/runtime/g6-components-2026-10-14/browser/results",
 reporter:[["list"],["json",{outputFile:reportPath}]],
 webServer:[{cwd:workspaceRoot,command:"pnpm --filter @rain-next/playground exec vite preview --host 127.0.0.1 --port 5396 --strictPort",url:"http://127.0.0.1:5396",reuseExistingServer:false},{cwd:consumerRoot,command:"pnpm exec vite preview --host 127.0.0.1 --port 5398 --strictPort",url:"http://127.0.0.1:5398",reuseExistingServer:false}],
 use:{baseURL:"http://127.0.0.1:5396",trace:"retain-on-failure",screenshot:"only-on-failure"},
 projects:[{name:"desktop",use:{...devices["Desktop Chrome"],viewport:{width:1440,height:1000}}},{name:"narrow",use:{...devices["Desktop Chrome"],viewport:{width:390,height:844}}}],
});
