import { defineConfig, devices } from '@playwright/test';
import review02 from "/Users/wenchengkai/CodexFile/\u96e8\u8bfe\u5802-shadcn\u7ec4\u4ef6\u5e93\u67b6\u6784/.worktrees/card-v2/tests/e2e/navigation-v042-w6-review02.config.ts";
export default defineConfig({
 testDir: "/Users/wenchengkai/CodexFile/\u96e8\u8bfe\u5802-shadcn\u7ec4\u4ef6\u5e93\u67b6\u6784/.worktrees/card-v2/tests/e2e", workers:1, retries:0, forbidOnly:true,
 reporter:[['list'],['json',{outputFile:"/Users/wenchengkai/CodexFile/\u96e8\u8bfe\u5802-shadcn\u7ec4\u4ef6\u5e93\u67b6\u6784/.worktrees/card-v2/evidence/runtime/navigation-v042/w7/engineering-closeout-2026-10-05/agent/browser-results.json"}]],
 outputDir:"/Users/wenchengkai/CodexFile/\u96e8\u8bfe\u5802-shadcn\u7ec4\u4ef6\u5e93\u67b6\u6784/.worktrees/card-v2/evidence/runtime/navigation-v042/w7/engineering-closeout-2026-10-05/agent/browser-artifacts",
 use:{...devices['Desktop Chrome'],screenshot:'only-on-failure',trace:'retain-on-failure'},
 projects:[
  {name:'chromium-playground',testMatch:'core-ui.spec.ts',grep:/the Day 3 Core UI page/,use:{baseURL:'http://127.0.0.1:5212'}},
  {name:'chromium-prototype',testMatch:'learning-report-a.spec.ts',use:{baseURL:'http://127.0.0.1:5211'}},
  {name:'navigation-review02-context',testMatch:'navigation-v042-w6-review02.spec.ts',grep:/R02 E4 actual pointer pin/,use:{...review02.use,baseURL:'http://127.0.0.1:5212'}},
 ]
});
