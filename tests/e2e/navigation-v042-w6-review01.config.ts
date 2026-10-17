import { defineConfig } from '@playwright/test';

// Dedicated source-consumer verification. Never drives the user's 5368 review tab.
export default defineConfig({
  testDir: '.',
  testMatch: 'navigation-v042-w6-review01.spec.ts',
  workers: 1,
  forbidOnly: true,
  retries: 0,
  timeout: 45_000,
  reporter: [
    ['list'],
    ['json', { outputFile: '../../evidence/runtime/navigation-v042/w6/review-01/independent/browser-results.json' }],
  ],
  use: {
    baseURL: process.env.RAIN_REVIEW01_BASE_URL ?? 'http://127.0.0.1:5204',
    viewport: { width: 1338, height: 796 },
    locale: 'zh-CN',
    contextOptions: { reducedMotion: 'reduce' },
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium', deviceScaleFactor: 1 } },
    { name: 'firefox', use: { browserName: 'firefox', deviceScaleFactor: 1 } },
    { name: 'webkit', use: { browserName: 'webkit', deviceScaleFactor: 1 } },
  ],
  outputDir: '../../evidence/runtime/navigation-v042/w6/review-01/independent/browser-artifacts',
});
