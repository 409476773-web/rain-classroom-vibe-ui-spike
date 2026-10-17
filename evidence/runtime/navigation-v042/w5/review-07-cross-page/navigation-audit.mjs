import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';

const phase=process.argv[2]??'before';
const out=path.resolve(`evidence/runtime/navigation-v042/w5/review-07-cross-page/navigation-${phase}`);
await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true});
const errors=[],facts=[];
for(const sample of ['R1','R2','R3','R4','R5','R6','S1','S2','S3','S4','S5','S6']) {
  const page=await browser.newPage({viewport:{width:1600,height:1100},locale:'zh-CN',reducedMotion:'reduce'});
  page.on('pageerror',e=>errors.push({sample,error:String(e)}));
  await page.goto(`http://127.0.0.1:5198/?sample=${sample}#navigation-v042`);
  await page.getByRole('combobox',{name:'画板宽度',exact:true}).selectOption('1600');
  const platform=page.locator('.nv43-platform,.nv5-platform,.nv44-global,.nv42-global-region');
  await platform.waitFor({state:'visible'});
  const nav=platform.locator('.rain-navigation-list,.nv42-rail-links');
  for(const mode of ['compact','expanded']) {
    if(sample.startsWith('S')) {
      await page.getByRole('button',{name:'布局设置',exact:true}).click();
      await page.getByRole('combobox',{name:'平台导航显示模式',exact:true}).selectOption(mode);
      await page.keyboard.press('Escape');
    } else {
      const current=await platform.getAttribute('data-mode');
      if(current!==mode) {
        const local=platform.getByRole('button',{name:mode==='expanded'?'展开平台导航':'收起平台导航',exact:true});
        if(await local.count()) await local.click();
        else await page.locator(`[aria-controls$="-workspace-global"]`).first().click();
      }
    }
    await page.waitForFunction(({mode,sample})=>{
      const platform=document.querySelector('.nv43-platform,.nv5-platform,.nv44-global,.nv42-global-region');
      return platform?.getAttribute('data-mode')===mode;
    },{mode,sample});
    await page.mouse.move(1550,1090);
    const state=await platform.evaluate(root=>{
      const nav=root.querySelector('.rain-navigation-list,.nv42-rail-links');
      const entries=Array.from(nav.querySelectorAll('a'));
      return {class:root.className,width:root.getBoundingClientRect().width,background:getComputedStyle(root).backgroundColor,
        entries:entries.map(e=>({name:e.getAttribute('aria-label'),current:e.getAttribute('aria-current'),href:e.getAttribute('href'),tabIndex:e.tabIndex,
          rowBackground:getComputedStyle(e.parentElement).backgroundColor,entryBackground:getComputedStyle(e).backgroundColor,
          icons:Array.from(e.querySelectorAll('[data-rain-id="icon"]')).map(i=>({width:i.getBoundingClientRect().width,height:i.getBoundingClientRect().height})),
          title:e.title,fontSize:getComputedStyle(e).fontSize}))};
    });
    const inactive=nav.locator('a:not([aria-current])').first();
    await inactive.hover();
    const hover=await inactive.evaluate(e=>({entry:getComputedStyle(e).backgroundColor,row:getComputedStyle(e.parentElement).backgroundColor}));
    if(['R1','R3','R4','S5'].includes(sample)) await platform.screenshot({path:path.join(out,`${sample}-${mode}-hover.png`)});
    await page.mouse.move(1550,1090);
    if(['R1','R3','R4','S5'].includes(sample)) await platform.screenshot({path:path.join(out,`${sample}-${mode}-current.png`)});
    facts.push({sample,mode,...state,hover});
    console.log(JSON.stringify({sample,mode,icons:state.entries.map(e=>e.icons)}));
  }
  await page.close();
}
await browser.close();
const consistency=facts.filter(f=>f.sample!=='R2'&&f.sample!=='S5').every(f=>f.entries.every(e=>e.icons.every(i=>i.width===18&&i.height===18)));
await fs.writeFile(path.join(out,'measurements.json'),JSON.stringify({phase,recordedAt:new Date().toISOString(),facts,errors,expected18pxEveryMode:consistency},null,2));
console.log(JSON.stringify({phase,caseCount:facts.length,pageErrors:errors.length,expected18pxEveryMode:consistency,dimensions:facts.map(f=>({sample:f.sample,mode:f.mode,icons:f.entries.map(e=>e.icons)}))}));
if(phase==='before'&&consistency) throw new Error('Expected the reported icon mismatch before the fix.');
if(phase!=='before'&&!consistency) throw new Error('Navigation icons must remain 18px in both modes.');
