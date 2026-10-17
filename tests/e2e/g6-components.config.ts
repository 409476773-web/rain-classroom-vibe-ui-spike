import { defineConfig, devices } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
const workspaceRoot=fileURLToPath(new URL("../../",import.meta.url));
const consumerRoot=fileURLToPath(new URL("../../evidence/runtime/g6-components-2026-10-14/consumer/",import.meta.url));
const evidence=resolve(workspaceRoot,process.env.G6_EVIDENCE_DIR??`evidence/runtime/g6-components-current/${new Date().toISOString().replace(/[:.]/g,"-")}`);
process.env.G6_EVIDENCE_DIR=evidence;
// The 10/14 installed consumer is a frozen source snapshot, run separately from the current Playground.
const scope=process.env.G6_TEST_SCOPE??"current";
if(scope!=="current"&&scope!=="frozen-consumer")throw new Error("G6_TEST_SCOPE must be current or frozen-consumer");
const frozenConsumer=scope==="frozen-consumer";
const baseURL=process.env.G6_BASE_URL??"http://127.0.0.1:5396";
const consumerURL=process.env.G6_CONSUMER_URL??"http://127.0.0.1:5398";
const consumerTest=/isolated installed packages:/;
export default defineConfig({
 testDir:".",testMatch:"g6-components.spec.ts",workers:1,timeout:60000,
 ...(frozenConsumer?{grep:consumerTest}:{grepInvert:consumerTest}),
 metadata:{sourceScope:frozenConsumer?"frozen-2026-10-14-installed-consumer":"current-built-playground",consumerIsCurrentP5:false},
 outputDir:resolve(evidence,"results"),
 reporter:[["list"],["json",{outputFile:resolve(evidence,"report.json")}]],
 webServer:frozenConsumer
  ?process.env.G6_CONSUMER_URL?undefined:{cwd:consumerRoot,command:"pnpm exec vite preview --host 127.0.0.1 --port 5398 --strictPort",url:consumerURL,reuseExistingServer:false}
  :process.env.G6_BASE_URL?undefined:{cwd:workspaceRoot,command:"pnpm --filter @rain-next/playground exec vite preview --host 127.0.0.1 --port 5396 --strictPort",url:baseURL,reuseExistingServer:false},
 use:{baseURL:frozenConsumer?consumerURL:baseURL,trace:"retain-on-failure",screenshot:"only-on-failure"},
 projects:[{name:"desktop",use:{...devices["Desktop Chrome"],viewport:{width:1440,height:1000}}},{name:"narrow",use:{...devices["Desktop Chrome"],viewport:{width:390,height:844}}}],
});
