import { chromium, expect } from '@playwright/test';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
const run='evidence/runtime/chart-behavior-fixes-2026-10-11', folder=`${run}/${process.env.RAIN_RADAR_AB_RUN ?? 'radar-stable-ab'}`;
const sourcePath=resolve('packages/ui/src/charts/vendor/charts/radar-area.tsx');
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
const frozen='61769a70e807d06cc88abdf1f88bcabdb39ed6fc599868cd3b4edd8a14822740';
const before=await readFile(`${run}/before/packages/ui/src/charts/vendor/charts/radar-area.tsx`,'utf8');
const current=await readFile(sourcePath,'utf8');
if(hash(current)!==frozen)throw Error('Radar source freeze mismatch');
const requireFromVite=createRequire(import.meta.resolve('vite'));
const {transformSync}=await import(requireFromVite.resolve('rolldown/utils'));
const compiled=transformSync(sourcePath,before,{jsx:{runtime:'automatic',development:true}}).code;
const marker='function getStrokeWidth';
const body=compiled.slice(compiled.indexOf(marker));
await mkdir(folder,{recursive:true});
const report={fixedTime:'2026-10-11T00:00:00+08:00',recipe:'monochrome-blue',motion:'reduce',state:'normal',revision:0,beforeSourceSha256:hash(before),afterSourceSha256:hash(current),injection:'Exact preserved baseline function/JSX/export body transformed by local Vite rolldown and fulfilled only in the browser response; no runtime source writes.',results:[],errors:[]};
const browser=await chromium.launch();
async function snapshot(host){return host.evaluate(node=>{
 const svg=node.querySelector('[data-rain-id="ui-chart-radar"] svg');
 const matrix=m=>m?{a:m.a,b:m.b,c:m.c,d:m.d,e:m.e,f:m.f}:null;
 const box=n=>{const r=n.getBoundingClientRect();return{x:r.x,y:r.y,width:r.width,height:r.height}};
 const props=n=>{const s=getComputedStyle(n);return{opacity:s.opacity,transform:s.transform,transformOrigin:s.transformOrigin,fill:s.fill,fillOpacity:s.fillOpacity,stroke:s.stroke,strokeWidth:s.strokeWidth,strokeLinejoin:s.strokeLinejoin,filter:s.filter,willChange:s.willChange,mixBlendMode:s.mixBlendMode,isolation:s.isolation,shapeRendering:s.shapeRendering,vectorEffect:s.vectorEffect,ctm:matrix(n.getCTM()),screenCTM:matrix(n.getScreenCTM()),box:box(n)}};
 const size=Math.min(Number(svg.getAttribute('width')),Number(svg.getAttribute('height'))),radius=(size-100)/2;
 const table=[...node.querySelectorAll('tbody tr')].map(row=>({label:row.querySelector('th')?.textContent,values:[...row.querySelectorAll('td')].map(cell=>Number(cell.textContent))}));
 const groups=[...svg.querySelectorAll('g[style*="cursor"]')].map((g,index)=>{
  const p=g.querySelector('path'), d=p.getAttribute('d'), coordinates=(d.match(/-?(?:\d*\.)?\d+(?:e[-+]?\d+)?/gi)??[]).map(Number);
  const expected=table[index].values.flatMap((v,i)=>{const a=i*Math.PI*2/table[index].values.length-Math.PI/2;return[radius*v/100*Math.cos(a),radius*v/100*Math.sin(a)]});
  return{group:props(g),inlineGroupStyle:g.getAttribute('style'),path:{d,...props(p)},circles:[...g.querySelectorAll('circle')].map(c=>({cx:c.getAttribute('cx'),cy:c.getAttribute('cy'),r:c.getAttribute('r'),...props(c)})),coordinateError:Math.max(...coordinates.map((v,i)=>Math.abs(v-expected[i])))};
 });
 return{size,radius,table,hostBox:box(node),svgBox:box(svg),groups,allAtTarget:groups.length===3&&groups.every(g=>g.coordinateError<0.0001&&Number(g.group.opacity)===1)};
})}
try{
 for(const width of[1440,390])for(const baseline of[true,false]){
  const mode=baseline?'before':'after',intercepts=[];
  const context=await browser.newContext({viewport:{width,height:1000},reducedMotion:'reduce',timezoneId:'Asia/Shanghai'});
  const page=await context.newPage();page.on('pageerror',e=>report.errors.push({width,mode,error:String(e)}));
  if(baseline)await page.route(url=>decodeURIComponent(url.pathname)===`/@fs${sourcePath}`&&!url.searchParams.has('raw'),async route=>{const response=await route.fetch();const live=await response.text(),index=live.indexOf(marker);if(index<0)throw Error('Vite body marker missing');intercepts.push(route.request().url());await route.fulfill({response,body:live.slice(0,index)+body,headers:{...response.headers(),'content-type':'application/javascript'}})});
  await page.clock.setFixedTime(new Date(report.fixedTime));
  await page.goto(`http://127.0.0.1:5173/?radar-stable-ab=${mode}-${width}#chart-radar`);
  const host=page.locator('[data-rain-id="chart-radar"]');await expect(host).toBeVisible();
  await page.getByRole('combobox',{name:'视觉配方',exact:true}).selectOption(report.recipe);
  await host.scrollIntoViewIfNeeded();await page.mouse.move(0,0);await page.evaluate(()=>document.fonts.ready);
  let previous=null,stable=0,last=null;const start=Date.now();
  while(Date.now()-start<8000){last=await snapshot(host);const signature=JSON.stringify(last.groups);stable=last.allAtTarget&&signature===previous?stable+1:0;previous=signature;if(stable>=3&&Date.now()-start>=2200)break;await page.waitForTimeout(100)}
  if(stable<3||!last.allAtTarget)throw Error(`${mode}-${width} unstable`);
  if(baseline&&intercepts.length===0)throw Error('No baseline interception');
  await host.screenshot({path:`${folder}/${mode}-${width}.png`,animations:'disabled'});
  const record={width,mode,intercepts,elapsedMs:Date.now()-start,geometry:last,mediaReduce:await page.evaluate(()=>matchMedia('(prefers-reduced-motion: reduce)').matches)};
  if(process.env.RAIN_RADAR_AB_HOVER==='1'){
   await host.locator('.rain-chart-legend-button').first().focus();
   await expect(host.locator('svg g[style*="cursor"]').first().locator('path')).toHaveAttribute('stroke-width','3');
   await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
   record.focusedGeometry=await snapshot(host);
   await host.screenshot({path:`${folder}/${mode}-${width}-focused.png`,animations:'disabled'});
  }
  report.results.push(record);console.log(`${mode}-${width} stable; max geometry error ${Math.max(...last.groups.map(g=>g.coordinateError))}`);
  await context.close();
 }
 report.runtimeAfterSha256=hash(await readFile(sourcePath));report.runtimeFrozen=report.runtimeAfterSha256===frozen;
 if(!report.runtimeFrozen||report.errors.length)throw Error('Runtime changed or browser error');report.status='passed';
}finally{await writeFile(`${folder}/facts.json`,JSON.stringify(report,null,2));await browser.close()}
