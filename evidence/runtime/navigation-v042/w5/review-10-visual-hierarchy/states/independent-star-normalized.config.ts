import {defineConfig} from '@playwright/test';
export default defineConfig({
 testDir: '/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/tests/e2e',
 testMatch: 'navigation-v042-review10.spec.ts',fullyParallel:false,workers:1,retries:0,
 reporter:[['list'],['json',{outputFile:'/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/evidence/runtime/navigation-v042/w5/review-10-visual-hierarchy/states/independent-star-normalized-results.json'}]],
 outputDir:'/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/evidence/runtime/navigation-v042/w5/review-10-visual-hierarchy/states/independent-star-normalized-artifacts',
 use:{browserName:'chromium',baseURL:'http://127.0.0.1:5198',viewport:{width:1800,height:1100},locale:'zh-CN',reducedMotion:'reduce',screenshot:'only-on-failure',trace:'retain-on-failure'},
});
