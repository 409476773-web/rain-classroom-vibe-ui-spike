import { chromium } from '@playwright/test';
import { writeFileSync } from 'node:fs';
const root='evidence/runtime/chart-variants/feedback-2026-10-08/legend-tooltip';
const browser=await chromium.launch();const page=await browser.newPage({viewport:{width:1280,height:796},reducedMotion:'reduce'});const facts=[];
for(const [entry,variant] of [['bar',null],['ring','ring-legend'],['area','area-pattern-reference-band'],['funnel','funnel-pattern-fill'],['candlestick','candlestick-pattern']]){
 await page.goto(`http://127.0.0.1:5173/#chart-${entry}`);const card=variant?page.locator(`[data-chart-variant="${variant}"]`):page.locator('.component-doc__example').first();await card.scrollIntoViewIfNeeded();await card.locator('svg').first().waitFor();
 for(const milliseconds of [200,1300,2500]){
  await page.waitForTimeout(milliseconds);
  facts.push({entry,variant,wait:milliseconds,data:await card.locator('svg').first().evaluate(svg=>[...svg.querySelectorAll('path,rect,line')].slice(-35).map(n=>({tag:n.tagName,cls:n.getAttribute('class'),d:n.getAttribute('d')?.slice(0,160),height:n.getAttribute('height'),dash:n.getAttribute('stroke-dasharray'),opacity:getComputedStyle(n).opacity,strokeOpacity:getComputedStyle(n).strokeOpacity,stroke:getComputedStyle(n).stroke,style:n.getAttribute('style')})))});
 }
 await card.screenshot({path:`${root}/settled-${entry}-${variant??'default'}-1280.png`});
}
writeFileSync(`${root}/settled-facts.json`,JSON.stringify(facts,null,2));await browser.close();console.log('5 settled native captures saved');
