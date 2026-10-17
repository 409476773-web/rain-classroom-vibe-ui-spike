import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
const dest=new URL('./before/',import.meta.url);await mkdir(dest,{recursive:true});
const browser=await chromium.launch({headless:true});
const results=[];
for(const width of [1200,1440,1600])for(const [sample,scene] of [['R1','plan'],['R1','industry'],['R2','resources'],['R3','files'],['R3','errors']]){
 const page=await browser.newPage({viewport:{width:width+64,height:1080},locale:'zh-CN',reducedMotion:'reduce'});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:5198/#navigation-v042');
 await page.getByRole('navigation',{name:'导航候选样本'}).getByRole('button',{name:sample,exact:true}).click();
 await page.getByRole('combobox',{name:'画板宽度'}).selectOption(String(width));
 const scenes=page.getByRole('combobox',{name:'业务子场景'});if(sample!=='R2')await scenes.selectOption(scene);
 const root=page.locator('.rain-workspace').first();await root.waitFor({state:'visible'});
 await root.screenshot({path:new URL(`${sample}-${scene}-${width}.png`,dest).pathname});
 const facts=await root.evaluate(el=>{
 const r=el.getBoundingClientRect();
 const clip=[];for(const e of el.querySelectorAll('button,a,input,th,td')){
 const s=getComputedStyle(e),b=e.getBoundingClientRect();if(!b.width||!b.height)continue;
 const text=e.innerText?.trim()||e.getAttribute('aria-label')||'';
 if((e.scrollWidth>e.clientWidth+1||e.scrollHeight>e.clientHeight+1)&&s.overflowX==='visible'&&s.overflowY==='visible')clip.push({tag:e.tagName,text,rect:{w:b.width,h:b.height},scroll:{w:e.scrollWidth,h:e.scrollHeight},style:{font:s.fontSize,line:s.lineHeight,whiteSpace:s.whiteSpace}});
 }
 return {rect:{x:r.x,y:r.y,w:r.width,h:r.height},buttons:[...el.querySelectorAll('button')].map(e=>({text:e.textContent?.trim(),aria:e.getAttribute('aria-label'),title:e.getAttribute('title')})),overflow:clip,scrollers:[...el.querySelectorAll('*')].filter(e=>e.scrollWidth>e.clientWidth+3||e.scrollHeight>e.clientHeight+3).map(e=>({class:e.className,sw:e.scrollWidth,cw:e.clientWidth,sh:e.scrollHeight,ch:e.clientHeight,overflow:getComputedStyle(e).overflow}))};});
 results.push({sample,scene,width,facts,errors});await page.close();console.log(`${sample}/${scene}/${width}: ${facts.overflow.length} possible visible overflows`);
}
await writeFile(new URL('facts.json',dest),JSON.stringify(results,null,2));await browser.close();
