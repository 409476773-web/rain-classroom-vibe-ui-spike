import { chromium, expect } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
const out=path.dirname(fileURLToPath(import.meta.url)),stage=process.argv[2]??'before';
const browser=await chromium.launch({headless:true}),results=[],errors=[];
const variants=[['R4','interaction'],['R4','grading'],['R5'],['R6','table'],['R6','form'],['R6','board'],['R6','album'],['S4','interaction',true],['S3','table',true]];
const selectors=['.nv5-region-head [data-rain-id="ui-icon-button"]','.nv5-platform-tool','.nv5-icon-button[data-workspace-action="focus"]','.nv5-module-header .nv5-icon-button','.nv5-view-tools>button','.nv5-recovery>.nv5-small','.nv5-source-button:not([data-variant="primary"])','.nv5-source-button:not([data-variant="primary"]) [data-slot="leading-icon"]','.nv5-source-button:not([data-variant="primary"]) [data-slot="trailing-icon"]','.nv5-context-footer','.nv5-queue-footer','.nv5-module-header>small','.nv5-answer-title p','.nv5-pdf-toolbar','.nv5-adaptation','.nv5-table th','.nv5-table td','.nv5-table td strong','.nv5-table td .nv5-document-tag','.nv5-grade-method','.nv5-group-title h3','.nv5-group-article p','.nv5-slide h2','.nv5-slide p','.nv5-formbody h2','.nv5-formfield>label','.nv5-source-button[data-variant="primary"]','.nv5-large-score','.nv5-score','.nv5-group-objects .rain-navigation-family__item[data-active="true"] .rain-navigation-family__row'];
const tokenNames=['--rain-category-icon-neutral-2','--rain-category-icon-neutral-3','--rain-category-icon-neutral-4','--rain-category-text-neutral-2','--rain-category-text-neutral-3','--rain-category-text-neutral-4','--rain-category-text-neutral-5','--rain-category-border-neutral-3','--rain-category-border-neutral-4','--rain-button-tertiary-border','--rain-button-tertiary-text','--rain-radius-6'];
for(const [sample,scene,inverse] of variants){
 const page=await browser.newPage({viewport:{width:1800,height:1100},locale:'zh-CN',reducedMotion:'reduce'});page.setDefaultTimeout(8000);page.on('pageerror',e=>errors.push(e.message));
 await page.goto(`http://127.0.0.1:5198/?sample=${sample}&hierarchy=review10-${stage}#navigation-v042`);await page.getByRole('combobox',{name:'画板宽度'}).selectOption('1440');
 if(sample==='R4'||sample==='S4')await page.getByRole('combobox',{name:'业务子场景'}).selectOption(scene);
 const root=page.getByTestId('candidate-canvas').locator('.rain-workspace');
 if((sample==='R6'||sample==='S3')&&scene!=='form')await root.getByRole('tab',{name:{table:'表格',board:'状态分组',album:'画册'}[scene],exact:true}).click();
 if(inverse)await page.getByRole('checkbox',{name:'深色外框'}).check();
 const facts=await root.evaluate((root,{selectors,tokenNames})=>{
  const css=getComputedStyle(root),tokens=Object.fromEntries(tokenNames.map(t=>[t,css.getPropertyValue(t).trim()]));
  const resolve=(name)=>{const e=document.createElement('span');e.style.color=`var(${name})`;root.append(e);const color=getComputedStyle(e).color;e.remove();return color;};
  const resolvedColors=Object.fromEntries(tokenNames.filter(t=>!t.includes('radius')).map(t=>[t,resolve(t)]));
  const nodes=selectors.flatMap(sel=>[...root.querySelectorAll(sel)].filter(e=>e.getClientRects().length).slice(0,1).map(e=>{const s=getComputedStyle(e),r=e.getBoundingClientRect();return {sel,label:e.getAttribute('aria-label')||e.textContent.trim(),color:s.color,bg:s.backgroundColor,border:s.borderColor,borderBottom:s.borderBottomColor,fontSize:s.fontSize,fontWeight:s.fontWeight,outline:s.outline,radius:s.borderRadius,variant:e.dataset.variant,rect:{x:r.x,y:r.y,w:r.width,h:r.height},overflow:s.overflow};}));
  return {tokens,resolvedColors,nodes};
 },{selectors,tokenNames});
 const name=`${sample}-${scene??'replay'}-${inverse?'inverse':'light'}`;
 await root.screenshot({path:`${out}/${stage}/${name}-hierarchy.png`});
 const aux=root.locator('.nv5-region-head [data-rain-id="ui-icon-button"]:visible').first();
 if(await aux.count()){
  await page.keyboard.press('Tab');await aux.focus();facts.focus=await aux.evaluate(e=>({visible:e.matches(':focus-visible'),outline:getComputedStyle(e).outline,w:e.getBoundingClientRect().width,h:e.getBoundingClientRect().height}));
  await aux.hover();facts.hover=await aux.evaluate(e=>({color:getComputedStyle(e).color,bg:getComputedStyle(e).backgroundColor}));
  if(stage.startsWith('after')){expect(facts.focus.visible).toBe(true);expect(facts.focus.outline).not.toContain('none');expect(facts.focus.w).toBe(32);expect(facts.focus.h).toBe(32);}
 }
 if(stage.startsWith('after')){
  const auxNode=facts.nodes.find(n=>n.sel===selectors[0]);if(auxNode)expect(auxNode.color).toBe(facts.resolvedColors['--rain-category-icon-neutral-4']);
  const neutral=facts.nodes.find(n=>n.sel==='.nv5-source-button:not([data-variant="primary"])');if(neutral){expect(neutral.variant).toBe('tertiary');expect(neutral.radius).toBe('6px');}
  const th=facts.nodes.find(n=>n.sel==='.nv5-table th');if(th){expect(th.fontWeight).toBe('400');expect(th.color).toBe(facts.resolvedColors['--rain-category-text-neutral-5']);}
 }
 results.push({sample,scene,inverse:!!inverse,name,...facts});await page.close();
}
await browser.close();
const hashes=Object.fromEntries(await Promise.all(['r4-r6.tsx','r4-r6.css'].map(async f=>[f,crypto.createHash('sha256').update(await fs.readFile(`apps/playground/src/recipes/navigation-v042/${f}`)).digest('hex')])));
await fs.writeFile(`${out}/hierarchy-${stage}.json`,JSON.stringify({at:new Date().toISOString(),stage,hashes,results,errors},null,2));
console.log(JSON.stringify({stage,cases:results.length,pageErrors:errors.length,hashes}));if(errors.length)process.exitCode=1;
