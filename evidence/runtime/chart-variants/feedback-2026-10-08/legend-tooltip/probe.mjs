import { chromium } from '@playwright/test';
import { writeFileSync } from 'node:fs';
const output = 'evidence/runtime/chart-variants/feedback-2026-10-08/legend-tooltip';
const browser = await chromium.launch();
const page = await browser.newPage({ reducedMotion:'reduce' });
const facts=[];
for (const width of [1280,1311,390]) {
 await page.setViewportSize({ width, height:796 });
 for (const [entry, variant, selector] of [['bar',null,'.rain-chart-legend-button'],['radar','radar-triangle','.rain-chart-variant-legend span'],['ring','ring-legend','.rain-chart-variant-legend-item']]) {
  await page.goto(`http://127.0.0.1:5173/#chart-${entry}`);
  const scope = variant ? page.locator(`[data-chart-variant="${variant}"]`) : page.locator('.component-doc__example').first();
  await scope.scrollIntoViewIfNeeded(); await scope.locator(selector).first().waitFor();
  await page.waitForTimeout(180);
  const data=await scope.locator(selector).evaluateAll(nodes=>nodes.map(n=>({ tag:n.tagName,text:n.textContent, width:n.getBoundingClientRect().width,height:n.getBoundingClientRect().height,font:getComputedStyle(n).fontSize,whiteSpace:getComputedStyle(n).whiteSpace,children:[...n.children].map(c=>({tag:c.tagName,text:c.textContent,width:c.getBoundingClientRect().width,height:c.getBoundingClientRect().height,display:getComputedStyle(c).display,whiteSpace:getComputedStyle(c).whiteSpace,font:getComputedStyle(c).fontSize,appearance:getComputedStyle(c).appearance,color:getComputedStyle(c).color,background:getComputedStyle(c).backgroundColor,accent:getComputedStyle(c).accentColor}))})));
  await scope.screenshot({path:`${output}/before-${entry}-${width}.png`});
  facts.push({width,entry,variant,data});
 }
 await page.goto('http://127.0.0.1:5173/#chart-choropleth');
 const map=page.locator('[data-chart-variant="choropleth-default"]');await map.scrollIntoViewIfNeeded(); await map.locator('path.cursor-pointer').first().waitFor();
 const path = map.locator('path.cursor-pointer').nth(3);
 await path.hover({force:true}); await page.waitForTimeout(400);
 const tooltip=map.locator('.rain-chart-tooltip');
 if(await tooltip.count()) {
  const data=await tooltip.evaluate(n=>({text:n.textContent,x:n.getBoundingClientRect().x,y:n.getBoundingClientRect().y,width:n.getBoundingClientRect().width,height:n.getBoundingClientRect().height,children:[...n.querySelectorAll('*')].map(c=>({tag:c.tagName,class:c.className,text:c.textContent,font:getComputedStyle(c).fontSize,padding:getComputedStyle(c).padding,margin:getComputedStyle(c).margin,borderRadius:getComputedStyle(c).borderRadius}))}));
  facts.push({width,entry:'choropleth',variant:'choropleth-default',data});await map.screenshot({path:`${output}/before-maptooltip-${width}.png`});
 }
}
writeFileSync(`${output}/before-facts.json`,JSON.stringify(facts,null,2));await browser.close();console.log(JSON.stringify(facts));
