import {chromium} from '@playwright/test';
import {mkdirSync,writeFileSync} from 'node:fs';
const output='evidence/runtime/bklit-rain-catalog/feedback-2026-10-08/visual';mkdirSync(output,{recursive:true});
const browser=await chromium.launch();const page=await browser.newPage({viewport:{width:880,height:764}});const facts=[];
async function snapshot(name){
 const viewport=page.viewportSize();const height=await page.evaluate(()=>document.documentElement.scrollHeight);
 await page.setViewportSize({width:viewport.width,height:Math.max(viewport.height,height)});await page.waitForTimeout(350);
 const capturing=page.viewportSize();await page.screenshot({path:`${output}/${name}.png`});
 facts.push({name,interactionViewport:viewport,captureViewport:capturing,method:'expand actual viewport and wait for native responsive SVG before viewport screenshot; no fullPage temporary resize'});
 await page.setViewportSize(viewport);await page.waitForTimeout(60);
}
for(const width of [880,390]){
 await page.setViewportSize({width,height:764});
 for(const id of ['line','bar','gauge','sunburst','funnel']){
  await page.goto(`http://127.0.0.1:5387/bklit-catalog.html?visual-width=${width}#chart-${id}`);await page.waitForTimeout(2400);
  if(id==='bar'){await page.getByRole('combobox',{name:'系列数',exact:true}).selectOption('5');await page.getByRole('combobox',{name:'柱形配方',exact:true}).selectOption('stacked');await page.waitForTimeout(1800);}
  await snapshot(`${id}-${width}${id==='gauge'?'-arc':''}`);
  if(id==='gauge'){await page.getByRole('combobox',{name:'仪表形态',exact:true}).selectOption('linear');await page.waitForTimeout(1800);await snapshot(`gauge-${width}-linear`);}
 }
}
writeFileSync(`${output}/snapshot-facts.json`,JSON.stringify(facts,null,2));await browser.close();console.log(`Captured ${facts.length} settled visual snapshots.`);
