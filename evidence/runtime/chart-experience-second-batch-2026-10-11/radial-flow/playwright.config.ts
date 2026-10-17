import { defineConfig, devices } from '@playwright/test';
export default defineConfig({testDir:'../../../../tests/e2e',testMatch:'chart-experience-radial-flow.spec.ts',workers:1,retries:0,outputDir:`${process.env.RAIN_SECOND_BATCH_RADIAL_BROWSER_RUN ?? 'browser-after-01'}/test-results`,reporter:'list',use:{...devices['Desktop Chrome'],baseURL:'http://127.0.0.1:5173',trace:'retain-on-failure'}});
