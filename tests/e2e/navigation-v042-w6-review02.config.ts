import { defineConfig } from '@playwright/test';

const evidence = process.env.RAIN_NAVIGATION_EVIDENCE_DIR ? `${process.env.RAIN_NAVIGATION_EVIDENCE_DIR}/w6` : undefined;

// Independent source verification, never the user's 5368 review tab.
export default defineConfig({
  testDir: '.', testMatch: 'navigation-v042-w6-review02.spec.ts',
  workers: 1, forbidOnly: true, retries: 0, timeout: 45_000,
  reporter: [['list'], ['json', { outputFile: evidence ? `${evidence}/report.json` : '../../evidence/runtime/navigation-v042/w6/review-02/independent/browser-results.json' }]],
  use: {
    baseURL: process.env.RAIN_REVIEW02_BASE_URL ?? 'http://127.0.0.1:5204',
    viewport: { width: 1343, height: 747 }, locale: 'zh-CN', contextOptions: { reducedMotion: 'reduce' },
    screenshot: 'only-on-failure', trace: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium', deviceScaleFactor: 1 } },
    // Native macOS keyboard traversal must include links and buttons.
    // This isolated browser preference never changes the user's OS/browser.
    { name: 'firefox', use: { browserName: 'firefox', deviceScaleFactor: 1, launchOptions: { firefoxUserPrefs: { 'accessibility.tabfocus': 7 } } } },
    { name: 'webkit', use: { browserName: 'webkit', deviceScaleFactor: 1 } },
  ],
  outputDir: evidence ? `${evidence}/results` : '../../evidence/runtime/navigation-v042/w6/review-02/independent/browser-artifacts',
});
