import {chromium} from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const out=path.dirname(fileURLToPath(import.meta.url)),stage=process.argv[2]??'before';
const browser=await chromium.launch({headless:true}),results=[],errors=[];
const selectors={R5:['.nv5-player','.nv5-slide','.nv5-slide h2','.nv5-slide p','.nv5-slide-footer','.nv5-player-controls','.nv5-knowledge','.nv5-knowledge-content h4','.nv5-mindmap','.nv5-mindmap>div','.nv5-timeline>button[aria-pressed="true"]>div','.nv5-timeline-description','.nv5-player-controls>input[type="range"]','.nv5-event-objects .rain-navigation-family__label'],R6:['.nv5-document-context','.nv5-document-header','.nv5-document-header strong','.nv5-document-header small','.nv5-formcanvas','.nv5-formpaper','.nv5-formbody h2','.nv5-formbody>p','.nv5-formfield>label','.nv5-form-input','.nv5-form-input input','.nv5-form-feedback','.nv5-form-feedback textarea','.nv5-view-tools','.nv5-table-view','.nv5-table th','.nv5-table td strong','.nv5-table td','.nv5-kanban','.nv5-kanban>section','.nv5-kanban article','.nv5-album','.nv5-album>article','.nv5-album>article>strong']};
for(const [sample,view,inverse] of [['R5',null,false],['S6',null,true],['R6','form',false],['R6','table',false],['R6','board',false],['R6','album',false]]){
 const page=await browser.newPage({viewport:{width:1800,height:1100},locale:'zh-CN',reducedMotion:'reduce'});page.on('pageerror',e=>errors.push(e.message));
 await page.goto(`http://127.0.0.1:5198/?sample=${sample}&paletteAudit=review09#navigation-v042`);await page.getByRole('combobox',{name:'画板宽度'}).selectOption('1440');
 if(inverse)await page.getByRole('checkbox',{name:'深色外框'}).check();
 const canvas=page.getByTestId('candidate-canvas'),owner=canvas.locator(sample==='R6'?'.nv5-r6':'.nv5-r5');
 if(view&&view!=='form')await owner.getByRole('tab',{name:{table:'表格',board:'状态分组',album:'画册'}[view],exact:true}).click();
 const facts=await owner.evaluate((root,selectors)=>{
  const colors=['--rain-category-background-neutral-1','--rain-category-background-neutral-3','--rain-category-background-neutral-4','--rain-category-text-neutral-1','--rain-category-text-neutral-2','--rain-category-text-neutral-3','--rain-category-text-neutral-5','--rain-category-border-neutral-3','--rain-category-fill-brand-alpha-4'];
  const css=getComputedStyle(root),tokens=Object.fromEntries(colors.map(t=>[t,css.getPropertyValue(t).trim()]));
  const nodes=selectors.flatMap(sel=>[...root.querySelectorAll(sel)].filter(e=>e.getClientRects().length).slice(0,1).map(e=>{const s=getComputedStyle(e),r=e.getBoundingClientRect();return {sel,bg:s.backgroundColor,color:s.color,border:s.borderColor,geometry:{w:r.width,h:r.height,padding:s.padding,font:s.fontSize,line:s.lineHeight}}}));
  return {tokens,nodes,bodyTheme:root.closest('[data-rain-theme]')?.getAttribute('data-rain-theme')};
 },selectors[sample==='R6'?'R6':'R5']);
 const platform=canvas.locator('.rain-workspace__region[data-region-id="global"]');
 facts.platform=await platform.evaluate(e=>({theme:e.getAttribute('data-rain-theme')??e.querySelector('[data-rain-theme]')?.getAttribute('data-rain-theme'),color:getComputedStyle(e).color,bg:getComputedStyle(e).backgroundColor}));
 await canvas.screenshot({path:`${out}/${stage}/${sample}-${view??'replay'}-${inverse?'inverse':'light'}-palette-1440.png`});
 results.push({sample,view,inverse,...facts});await page.close();
}
await browser.close();await fs.writeFile(`${out}/palette-${stage}.json`,JSON.stringify({at:new Date().toISOString(),results,errors},null,2));console.log(JSON.stringify({stage,scenarios:results.length,errors}));
