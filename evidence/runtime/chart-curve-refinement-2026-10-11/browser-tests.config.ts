import { defineConfig, devices } from '@playwright/test';
import { fileURLToPath } from 'node:url';
export default defineConfig({
 testDir:fileURLToPath(new URL('../../../tests/e2e/',import.meta.url)),testMatch:'chart-curve-refinement.spec.ts',workers:1,retries:0,timeout:90000,
 outputDir:fileURLToPath(new URL(`browser-tests/${process.env.RAIN_CURVE_BROWSER_RUN??'after-tests'}/results/`,import.meta.url)),reporter:'list',
 use:{...devices['Desktop Chrome'],baseURL:'http://127.0.0.1:5173',viewport:{width:1440,height:1000},trace:'retain-on-failure'},
});
