import {defineConfig} from '@playwright/test';
import {fileURLToPath} from 'node:url';
const repo=fileURLToPath(new URL('../../../../../../',import.meta.url));
export default defineConfig({timeout:45000,expect:{timeout:6000},workers:1,reporter:[['list']],outputDir:fileURLToPath(new URL('./test-artifacts-contract-final',import.meta.url)),use:{baseURL:'http://127.0.0.1:5198',browserName:'chromium',headless:true,viewport:{width:1760,height:1100},locale:'zh-CN',reducedMotion:'reduce',trace:'retain-on-failure',screenshot:'only-on-failure'},projects:[{name:'existing-R2',testDir:`${repo}/tests/e2e`,testMatch:'navigation-v042-review09-r1-r3.spec.ts'},{name:'hierarchy',testDir:fileURLToPath(new URL('./',import.meta.url)),testMatch:'r2-hierarchy.spec.ts'}]});
