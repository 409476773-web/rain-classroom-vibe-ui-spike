import { defineConfig, devices } from "@playwright/test";
import { fileURLToPath } from "node:url";
const root=fileURLToPath(new URL('../../',import.meta.url));
const evidence=root+(process.env.COMPOSER_EVIDENCE_DIR??'evidence/runtime/conversation-composer-2026-10-15/run-01/browser/'+(process.env.COMPOSER_BROWSER_RUN??'final'))+'/';
const port=process.env.COMPOSER_BROWSER_PORT??'5481';
export default defineConfig({
  testDir:'.',testMatch:'conversation-composer.spec.ts',workers:1,timeout:45000,retries:0,
  outputDir:evidence+'results',reporter:[['list'],['json',{outputFile:evidence+'report.json'}]],
  webServer:{cwd:root,command:`pnpm --filter @rain-next/playground exec vite --host 127.0.0.1 --port ${port} --strictPort`,url:`http://127.0.0.1:${port}`,reuseExistingServer:false},
  use:{channel:'chromium',baseURL:`http://127.0.0.1:${port}`,locale:'zh-CN',permissions:['microphone'],launchOptions:{args:['--use-fake-ui-for-media-stream','--use-fake-device-for-media-stream']},trace:'retain-on-failure',screenshot:'only-on-failure'},
  projects:[{name:'desktop',use:{...devices['Desktop Chrome'],viewport:{width:1440,height:1000}}},{name:'narrow',use:{...devices['Desktop Chrome'],viewport:{width:390,height:844}}}],
});
