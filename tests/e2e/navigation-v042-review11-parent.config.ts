import {defineConfig} from '@playwright/test';
export default defineConfig({
 testDir:'.',testMatch:['navigation-v042-review11-root.spec.ts','navigation-v042-review11-platform.spec.ts','navigation-v042-review11-r1-r3.spec.ts','navigation-v042-review11-r4-r6.spec.ts','navigation-v042-review11-r4-r6-platform-reopen.spec.ts','navigation-v042-review10.spec.ts','navigation-v042-review07.spec.ts','navigation-v042-w3.spec.ts','navigation-v042-w5.spec.ts','navigation-v042-r4-feedback.spec.ts','navigation-v042-review08.spec.ts','navigation-v042-review09.spec.ts','navigation-v042-review09-r1-r3.spec.ts'],
 // Prior paint contracts explicitly superseded by the2026-10-04 user instruction.
 // Review11 tests assert the new palette/geometry; old test files and reports remain unchanged.
 grepInvert:new RegExp('C1-C5 and W1/W2/W3 preserve semantic content ownership|platform states consume category Tokens|shared RegionHead defaults stay at 32/18|context boundary moves closer|platform brand and footer keep sensible alignment|S4 inverse platform and recovery use their scoped Token palette'),
 workers:1,reporter:[['list'],['json',{outputFile:'../../evidence/runtime/navigation-v042/w5/review-11-annotations-navigation/browser-parent-final.json'}]],outputDir:'../../evidence/runtime/navigation-v042/w5/review-11-annotations-navigation/parent-test-artifacts',
 use:{baseURL:'http://127.0.0.1:5198',viewport:{width:1800,height:1100},locale:'zh-CN',deviceScaleFactor:1,contextOptions:{reducedMotion:'reduce'}}
});
