import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const phase=process.argv[2]??'before';
const dest=new URL(`./${phase}/`,import.meta.url);await mkdir(dest,{recursive:true});
const browser=await chromium.launch({headless:true});
const records=[];
for(const width of [1200,1440,1600])for(const [sample,scene] of [['R1','plan'],['R1','industry'],['R3','files'],['R3','errors']]){
 const page=await browser.newPage({viewport:{width:width+64,height:1080},locale:'zh-CN',reducedMotion:'reduce'});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(`http://127.0.0.1:5198/?sample=${sample}#navigation-v042`);
 await page.getByRole('navigation',{name:'导航候选样本'}).getByRole('button',{name:sample,exact:true}).click();
 await page.getByRole('combobox',{name:'画板宽度'}).selectOption(String(width));
 await page.getByRole('combobox',{name:'业务子场景'}).selectOption(scene);
 const root=page.locator('.nv43-workspace').first();await root.waitFor({state:'visible'});
 const facts=await root.evaluate(el=>{
  const selectors=['.nv43-primary-action','.nv43-context>h3 button','.nv43-workspace-name>button','.nv43-table th','.nv43-table tbody td','.nv43-page-top p','.nv43-context h5','.nv43-table-footer','.nv43-context>small:last-child','.nv43-statistics small','.nv43-feedback','.nv43-file-name'];
  return Object.fromEntries(selectors.map(selector=>[selector,[...el.querySelectorAll(selector)].slice(0,7).map(e=>{const s=getComputedStyle(e),r=e.getBoundingClientRect(),icon=e.querySelector('[data-rain-id="icon"]');return {text:e.textContent?.trim(),aria:e.getAttribute('aria-label'),color:s.color,weight:s.fontWeight,radius:s.borderRadius,border:s.borderBottomColor,font:s.fontSize,line:s.lineHeight,w:r.width,h:r.height,icon:icon&&{color:getComputedStyle(icon).color,w:icon.getBoundingClientRect().width,h:icon.getBoundingClientRect().height},parts:[...e.children].map(c=>({color:getComputedStyle(c).color,part:c.getAttribute('data-slot')}))};})]));
 });
 await root.screenshot({path:fileURLToPath(new URL(`${sample}-${scene}-${width}.png`,dest))});
 records.push({sample,scene,width,facts,errors});await page.close();console.log(`${phase}: ${sample}/${scene}/${width}`);
}
await writeFile(new URL('facts.json',dest),JSON.stringify(records,null,2)+'\n');await browser.close();
