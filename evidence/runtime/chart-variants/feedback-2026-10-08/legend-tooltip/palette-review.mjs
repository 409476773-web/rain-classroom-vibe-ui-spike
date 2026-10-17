import { chromium } from '@playwright/test';
import { writeFileSync } from 'node:fs';
const out='evidence/runtime/chart-variants/feedback-2026-10-08/legend-tooltip';
const browser=await chromium.launch();const page=await browser.newPage({viewport:{width:1280,height:796},reducedMotion:'reduce'});const facts=[];
for(const [entry,id] of [['bar','bar-gradient'],['bar','bar-shape-gradient'],['bar','bar-pattern'],['bar','bar-pattern-reference-band'],['pie','pie-patterns'],['pie','pie-gradients']]){
 await page.goto(`http://127.0.0.1:5173/#chart-${entry}`);const card=page.locator(`[data-chart-variant="${id}"]`);await card.scrollIntoViewIfNeeded();await card.locator('svg').first().waitFor();await page.waitForTimeout(350);await page.mouse.move(1,1);await page.waitForTimeout(250);
 facts.push({id,data:await card.evaluate(card=>({recipe:card.querySelector('[data-recipe]')?.getAttribute('data-recipe'),stops:[...card.querySelectorAll('stop')].map(n=>({color:getComputedStyle(n).stopColor,opacity:getComputedStyle(n).stopOpacity})),patterns:[...card.querySelectorAll('pattern path,pattern line')].map(n=>({stroke:getComputedStyle(n).stroke,opacity:getComputedStyle(n).strokeOpacity,reference:!!n.closest('.chart-reference-area,.chart-background')})),pieGlow:[...card.querySelectorAll('g')].filter(n=>(n.getAttribute('class')??'').includes('glow')).map(n=>n.getAttribute('class'))}))});
 await card.screenshot({path:`${out}/palette-${id}-1280.png`});
}
writeFileSync(`${out}/palette-facts.json`,JSON.stringify(facts,null,2));await browser.close();console.log('6 palette captures saved');
