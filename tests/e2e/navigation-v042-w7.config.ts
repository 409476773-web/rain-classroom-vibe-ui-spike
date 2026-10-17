import { defineConfig, devices } from '@playwright/test';

const evidence = process.env.RAIN_NAVIGATION_EVIDENCE_DIR ? `${process.env.RAIN_NAVIGATION_EVIDENCE_DIR}/w7` : undefined;

const historicalContracts = [
  'navigation-v042.spec.ts',
  'navigation-v042-w3.spec.ts',
  'navigation-v042-w4.spec.ts',
  'navigation-v042-w5.spec.ts',
  'navigation-v042-review09.spec.ts',
  'navigation-v042-review09-r1-r3.spec.ts',
  'navigation-v042-review11-r4-r6-platform-reopen.spec.ts',
  'navigation-v042-review11-r4-r6-platform-footer.spec.ts',
];
const extendedBrowsers = process.env.RAIN_W7_BROWSER_MATRIX === 'all';

export default defineConfig({
  testDir: '.',
  testMatch: [...historicalContracts, 'navigation-v042-w7.spec.ts'],
  fullyParallel: false,
  workers: 1,
  forbidOnly: true,
  retries: 0,
  // Retained historical tests with fixed review-07/09 paths must not replace accepted evidence.
  grepInvert: /G1 review|compact navigation uses existing Rain tooltip|accepted R2 brand remains mounted through full, compact and reverse motion/,
  timeout: 30_000,
  reporter: [
    ['list'],
    ['json', { outputFile: evidence ? `${evidence}/report.json` : '../../evidence/runtime/navigation-v042/w7/browser-results.json' }],
  ],
  outputDir: evidence ? `${evidence}/results` : '../../evidence/runtime/navigation-v042/w7/test-artifacts',
  use: {
    baseURL: process.env.RAIN_W7_BASE_URL ?? 'http://127.0.0.1:5198',
    viewport: { width: 1800, height: 1100 },
    locale: 'zh-CN',
    contextOptions: { reducedMotion: 'reduce' },
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium-dpr1', use: { ...devices['Desktop Chrome'], viewport: { width: 1800, height: 1100 }, deviceScaleFactor: 1 } },
    { name: 'chromium-dpr2', testMatch: 'navigation-v042-w7.spec.ts', grep: /W7 matrix/, use: { ...devices['Desktop Chrome'], viewport: { width: 1800, height: 1100 }, deviceScaleFactor: 2 } },
    ...(extendedBrowsers ? [
      { name: 'firefox', testMatch: 'navigation-v042-w7.spec.ts', use: { ...devices['Desktop Firefox'], viewport: { width: 1800, height: 1100 } } },
      { name: 'webkit', testMatch: 'navigation-v042-w7.spec.ts', use: { ...devices['Desktop Safari'], viewport: { width: 1800, height: 1100 } } },
    ] : []),
  ],
});
