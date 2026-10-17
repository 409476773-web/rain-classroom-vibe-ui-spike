import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
 testDir: "/Users/wenchengkai/CodexFile/\u96e8\u8bfe\u5802-shadcn\u7ec4\u4ef6\u5e93\u67b6\u6784/.worktrees/card-v2/evidence/runtime/navigation-v042/w7/closeout-2026-10-05/legacy-consumer-diagnostic/runner",
 testMatch: "navigation-rebuild-closure.spec.ts",
 fullyParallel: false, forbidOnly: true, retries: 0, workers: 1,
 reporter: [["list"],["json", { outputFile: "/Users/wenchengkai/CodexFile/\u96e8\u8bfe\u5802-shadcn\u7ec4\u4ef6\u5e93\u67b6\u6784/.worktrees/card-v2/evidence/runtime/navigation-v042/w7/closeout-2026-10-05/legacy-consumer-diagnostic/results.json" }]],
 outputDir: "/Users/wenchengkai/CodexFile/\u96e8\u8bfe\u5802-shadcn\u7ec4\u4ef6\u5e93\u67b6\u6784/.worktrees/card-v2/evidence/runtime/navigation-v042/w7/closeout-2026-10-05/legacy-consumer-diagnostic/artifacts",
 use: { ...devices["Desktop Chrome"], baseURL: "http://127.0.0.1:5205", screenshot: "only-on-failure", trace: "retain-on-failure" },
 projects: [{name:"chromium-prototype"}],
});
