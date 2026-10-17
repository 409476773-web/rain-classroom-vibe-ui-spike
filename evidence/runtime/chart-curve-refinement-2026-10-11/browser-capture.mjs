import { chromium, expect } from '@playwright/test';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { run, hashSources, capture } from './browser-observer.mjs';
const phase=process.argv[2];if(!['before','after'].includes(phase))throw Error('Choose before or after');
const folder=`${run}/browser-${phase}`,baseline=JSON.parse(await readFile(`${run}/baseline-files.json`));
await mkdir(folder,{recursive:true});
const sourcesBefore=await hashSources();if(phase==='before'){for(const row of sourcesBefore.filter(row=>!row.missing)){const base=baseline.find(b=>b.path===row.path);if(!base||base.sha256!==row.sha256)throw Error(`Before source changed ${row.path}`)}}
const report={phase,fixedTime:'2026-10-11T00:00:00+08:00',normalState:true,revision:0,sourcesBefore,captures:[],errors:[]};
const browser=await chromium.launch();
try{
 for(const width of[1440,390]){
  const context=await browser.newContext({viewport:{width,height:1000},reducedMotion:'reduce',timezoneId:'Asia/Shanghai'}),page=await context.newPage();page.on('pageerror',e=>report.errors.push(String(e)));await page.clock.setFixedTime(new Date(report.fixedTime));
  for(const family of['line','area','composed']){
   await page.goto(`http://127.0.0.1:5173/?curve-capture=${phase}-${width}#chart-${family}`);
   await page.getByRole('combobox',{name:'视觉配方',exact:true}).selectOption('category-near');
   const host=page.locator(`[data-rain-id="chart-${family}"]`),id=`default-${family}-${width}-reduce-category-near`;
   const fact=await capture(page,host,id,folder,{wholePage:family==='composed'});report.captures.push({id,width,family,kind:'default',mode:'reduce',recipe:'category-near',paths:fact.paths.length});console.log(`Captured ${id}`);
  }
  for(const [family,variant]of[['area','area-default'],['line','line-dual-y-axis'],['composed','composed-markers-dashed-tail']]){
   await page.goto(`http://127.0.0.1:5173/?curve-capture=${phase}-${width}#chart-${family}`);
   await page.getByRole('combobox',{name:'视觉配方',exact:true}).selectOption('monochrome-blue');
   const host=page.locator(`[data-chart-variant="${variant}"]`);await host.scrollIntoViewIfNeeded();await expect(host.locator('[data-ready="true"]')).toBeVisible();
   const id=`official-${variant}-${width}-reduce-monochrome-blue`,fact=await capture(page,host,id,folder);report.captures.push({id,width,family,kind:'official',mode:'reduce',recipe:'monochrome-blue',paths:fact.paths.length});console.log(`Captured ${id}`);
  }
  await page.goto(`http://127.0.0.1:5173/?curve-capture=${phase}-${width}#chart-business`);
  const gallery=page.locator('.rain-business-mini-gallery');await expect(gallery.locator('figure')).toHaveCount(18);
  const id=`mini-gallery-${width}-reduce-monochrome-blue`,fact=await capture(page,gallery,id,folder,{wholePage:true});report.captures.push({id,width,kind:'mini-gallery',mode:'reduce',recipe:'monochrome-blue',paths:fact.paths.length});console.log(`Captured ${id}`);
  for(const kind of['line','area'])for(const size of['compact','comfortable']){
   const host=gallery.locator(`[data-mini-kind="${kind}"][data-size="${size}"]`).locator('xpath=ancestor::figure');const miniId=`mini-${kind}-${size}-${width}-reduce-monochrome-blue`;await capture(page,host,miniId,folder);report.captures.push({id:miniId,width,kind,size,mode:'reduce',recipe:'monochrome-blue'});
  }
  await context.close();
  const normal=await browser.newContext({viewport:{width,height:1000},reducedMotion:'no-preference',timezoneId:'Asia/Shanghai'}),normalPage=await normal.newPage();normalPage.on('pageerror',e=>report.errors.push(String(e)));await normalPage.clock.setFixedTime(new Date(report.fixedTime));
  await normalPage.goto(`http://127.0.0.1:5173/?curve-capture=${phase}-${width}-normal#chart-composed`);await normalPage.getByRole('combobox',{name:'视觉配方',exact:true}).selectOption('category-near');
  const normalId=`default-composed-${width}-normal-category-near`,normalFact=await capture(normalPage,normalPage.locator('[data-rain-id="chart-composed"]'),normalId,folder);report.captures.push({id:normalId,width,family:'composed',kind:'default',mode:'normal',recipe:'category-near',paths:normalFact.paths.length});console.log(`Captured ${normalId}`);await normal.close();
 }
 report.sourcesAfter=await hashSources();report.sourceFrozen=JSON.stringify(report.sourcesBefore)===JSON.stringify(report.sourcesAfter);if(!report.sourceFrozen||report.errors.length)throw Error('Source changed or page error');report.status='captured-source-frozen';
}finally{await writeFile(`${folder}/facts.json`,JSON.stringify(report,null,2));await browser.close()}
