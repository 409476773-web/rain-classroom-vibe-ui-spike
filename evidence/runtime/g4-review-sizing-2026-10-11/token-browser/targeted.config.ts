import { defineConfig, devices } from '@playwright/test';
import { fileURLToPath } from 'node:url';
const evidence = fileURLToPath(new URL('./', import.meta.url));
export default defineConfig({
  testDir: '../../../../tests/e2e',
  testMatch: 'token-foundations.spec.ts',
  workers: 1,
  timeout: 60000,
  outputDir: `${evidence}/results`,
  reporter: [['list'], ['json', { outputFile: `${evidence}/report.json` }]],
  use: { baseURL: 'http://127.0.0.1:5391', screenshot: 'only-on-failure', trace: 'retain-on-failure' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 1000 } } },
    { name: 'narrow', use: { ...devices['Desktop Chrome'], viewport: { width: 390, height: 844 } } },
  ],
});
