import { defineConfig } from '@playwright/test';
export default defineConfig({testDir:'.',testMatch:'navigation-v042-w5.spec.ts',workers:1,reporter:'list',use:{baseURL:'http://127.0.0.1:5198',viewport:{width:1800,height:1100},locale:'zh-CN',deviceScaleFactor:1,contextOptions:{reducedMotion:'reduce'}},outputDir:'../../evidence/runtime/navigation-v042/w5/test-artifacts'});
