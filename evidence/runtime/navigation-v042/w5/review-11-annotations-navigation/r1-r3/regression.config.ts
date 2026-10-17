import {defineConfig} from '@playwright/test';
import {fileURLToPath} from 'node:url';
const repo=fileURLToPath(new URL('../../../../../../',import.meta.url));
export default defineConfig({timeout:45000,expect:{timeout:6000},workers:1,reporter:[['list']],testDir:`${repo}/tests/e2e`,testMatch:'navigation-v042-review11-r1-r3.spec.ts',outputDir:fileURLToPath(new URL('./test-artifacts-forced-restore',import.meta.url)),use:{baseURL:'http://127.0.0.1:5198',browserName:'chromium',headless:true,viewport:{width:1760,height:1150},locale:'zh-CN',reducedMotion:'reduce',trace:'retain-on-failure',screenshot:'only-on-failure'}});
