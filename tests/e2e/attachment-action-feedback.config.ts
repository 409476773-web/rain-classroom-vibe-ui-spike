import { defineConfig } from "@playwright/test";
import original from "./attachment-scenarios.config";
import { fileURLToPath } from "node:url";
const root=fileURLToPath(new URL("../../",import.meta.url));
const evidence=root+"evidence/runtime/attachment-scenarios-2026-10-16/feedback-01/browser/";
export default defineConfig(original, {
  testMatch:"attachment-action-feedback.spec.ts", outputDir:evidence+"results",
  reporter:[["list"],["json",{outputFile:evidence+"report.json"}]],
  webServer:{cwd:root,command:"pnpm --filter @rain-next/playground exec vite --host 127.0.0.1 --port 5488 --strictPort",url:"http://127.0.0.1:5488",reuseExistingServer:false},
  use:{...original.use,baseURL:"http://127.0.0.1:5488"},
});
