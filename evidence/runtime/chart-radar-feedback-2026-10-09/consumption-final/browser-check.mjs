import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { spawn } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { chromium, expect } from '@playwright/test';
import { exportedDownloads, assertDownloadClosure } from '../../../../scripts/verify-chart-variant-consumption.mjs';

const workspace=process.cwd(), evidence=resolve('evidence/runtime/chart-radar-feedback-2026-10-09/consumption-final');
const official=JSON.parse(readFileSync(join(evidence,'facts.json'))), host=official.host, port=5187;
const hash=path=>createHash('sha256').update(readFileSync(path)).digest('hex');
const variants=['radar-default','radar-triangle','radar-hexagon','radar-single-series','radar-minimal','radar-grid-only'];
const facts={status:'running',host,sourceMode:official.mode,officialStatus:official.status,checks:[],errors:[],limits:['Copied dependency cache and complete current UI/Foundation source; not a clean or minimum Registry installation.','Six actual radar downloads checked in Chromium; normal animation and 390px additionally checked for radar-default.','No Safari, VoiceOver, font loading, contrast acceptance, visual Human Gate or publication claim.']};
let server,browser,serverLog='';
const save=()=>writeFileSync(join(evidence,'browser-facts.json'),JSON.stringify(facts,null,2)+'\n');
const sourceChanges=()=>official.sourceFiles.filter(file=>hash(join(workspace,file.path))!==file.sha256).map(file=>file.path);
try {
  assert.equal(official.status,'passed');assert.deepEqual(sourceChanges(),[]);
  const downloads=await exportedDownloads(join(workspace,'apps/playground/src/docs/components'));
  assert.equal(downloads.exporterSha256,official.exporterSha256);
  const reference=JSON.parse(readFileSync(join(workspace,'apps/playground/src/docs/components/chart-variants/reference.json')));
  const normalFiles=downloads.files(reference.find(row=>row.id==='radar-default'),'category-near',0,0,false);
  assertDownloadClosure(normalFiles,'radar-default-normal');
  for(const [path,source] of Object.entries(normalFiles)){const target=join(host,'normal-radar-default',path);mkdirSync(resolve(target,'..'),{recursive:true});writeFileSync(target,source);}
  writeFileSync(join(host,'radar-default-normal.html'),normalFiles['index.html'].replace('src="/main.tsx"','src="/normal-radar-default/main.tsx"'));
  facts.normalSourceFiles=Object.entries(normalFiles).map(([path,source])=>({path,sha256:createHash('sha256').update(source).digest('hex')}));
  const {build}=await import(pathToFileURL(join(host,'node_modules/vite/dist/node/index.js')));
  await build({root:host,configFile:false,base:'./',oxc:{jsx:{runtime:'automatic'}},build:{outDir:'dist',emptyOutDir:false,rolldownOptions:{input:join(host,'radar-default-normal.html')}}});
  facts.normalBuild='passed';
  server=spawn(process.execPath,[join(host,'node_modules/vite/bin/vite.js'),'preview','--outDir','dist','--host','127.0.0.1','--port',String(port),'--strictPort'],{cwd:host,stdio:'pipe'});
  server.stdout.on('data',chunk=>serverLog+=chunk);server.stderr.on('data',chunk=>serverLog+=chunk);
  await expect.poll(async()=>{try{return (await fetch(`http://127.0.0.1:${port}/radar-default.html`)).status;}catch{return 0;}},{timeout:15000}).toBe(200);
  browser=await chromium.launch();const page=await browser.newPage({viewport:{width:1280,height:796},reducedMotion:'reduce'});page.on('pageerror',error=>facts.errors.push(error.message));
  const groups=()=>page.locator('[data-rain-id="ui-chart-radar"] svg g[style*="cursor"]');
  const readings=()=>groups().evaluateAll(nodes=>nodes.map(node=>({opacity:Number(getComputedStyle(node).opacity),fill:Number(getComputedStyle(node.querySelector('path')).fillOpacity),filter:getComputedStyle(node.querySelector('path')).filter})));
  const grid=async(dimensions,levels)=>page.locator('[data-rain-id="ui-chart-radar"] svg').evaluate((svg,{dimensions,levels})=>{
    const point=(node,x,y)=>new DOMPoint(x,y).matrixTransform(node.getScreenCTM());
    const center=point(svg,Number(svg.getAttribute('width'))/2,Number(svg.getAttribute('height'))/2);
    const polygons=[...svg.querySelectorAll('path[fill="none"]')].map(path=>{const numbers=(path.getAttribute('d')??'').match(/-?(?:\d*\.)?\d+(?:e[-+]?\d+)?/gi)?.map(Number)??[];const vertices=Array.from({length:numbers.length/2},(_,i)=>point(path,numbers[i*2],numbers[i*2+1]));return {vertices,radius:Math.max(...vertices.map(p=>Math.hypot(p.x-center.x,p.y-center.y)))};});
    const outer=polygons.sort((a,b)=>b.radius-a.radius)[0];
    const axes=[...svg.querySelectorAll('line')].map(line=>point(line,Number(line.getAttribute('x2')),Number(line.getAttribute('y2'))));
    const metrics=[...svg.querySelectorAll('text')].filter(text=>/^(理解|分析|应用|表达|协作|创造)$/.test(text.textContent));
    const endpoints=axes.length===dimensions?axes:metrics.map(text=>{const p=point(text,Number(text.getAttribute('x')),Number(text.getAttribute('y'))),r=Math.hypot(p.x-center.x,p.y-center.y);return {x:center.x+(p.x-center.x)*outer.radius/r,y:center.y+(p.y-center.y)*outer.radius/r};});
    return {dimensions,levels,gridCount:polygons.length,axisCount:axes.length,endpointCount:endpoints.length,radius:outer.radius,distances:endpoints.map(p=>Math.min(...outer.vertices.map(v=>Math.hypot(v.x-p.x,v.y-p.y))))};
  },{dimensions,levels});
  for(const id of variants){
    await page.goto(`http://127.0.0.1:${port}/${id}.html`);const count=id==='radar-single-series'?1:2;
    await expect(groups()).toHaveCount(count);await expect(groups().first().locator('path')).toHaveAttribute('d',/M.+Z/);
    await expect.poll(async()=>(await readings()).every(row=>row.opacity===1&&row.fill===.15)).toBe(true);
    const buttons=page.locator('.legend-container button');await expect(buttons).toHaveCount(count);
    const typography=await buttons.evaluateAll(nodes=>nodes.map(node=>({label:node.textContent.trim(),fontSize:getComputedStyle(node).fontSize,fontWeight:getComputedStyle(node).fontWeight})));
    for(const row of typography){expect(row.fontSize).toBe('13px');expect(row.fontWeight).toBe('400');}
    const dimensions=['radar-triangle','radar-grid-only'].includes(id)?3:id==='radar-hexagon'?6:5,levels=id==='radar-minimal'?3:5;
    const gridFacts=await grid(dimensions,levels);expect(gridFacts.gridCount).toBe(levels);expect(gridFacts.endpointCount).toBe(dimensions);for(const distance of gridFacts.distances)expect(distance).toBeLessThan(1);
    await page.keyboard.press('Tab');await expect(buttons.first()).toBeFocused();
    await expect.poll(async()=>(await readings())[0].fill).toBeCloseTo(.35,2);
    if(count===2)await expect.poll(async()=>(await readings())[1].opacity).toBeCloseTo(.3,2);
    const focused=await buttons.first().evaluate(node=>({outline:getComputedStyle(node).outlineStyle,width:getComputedStyle(node).outlineWidth}));expect(focused.outline).not.toBe('none');expect(parseFloat(focused.width)).toBeGreaterThan(0);
    await buttons.first().blur();await expect.poll(async()=>(await readings()).every(row=>row.opacity===1&&row.fill===.15)).toBe(true);
    await buttons.last().hover();await expect.poll(async()=>(await readings()).at(-1).fill).toBeCloseTo(.35,2);
    if(count===2)await expect.poll(async()=>(await readings())[0].opacity).toBeCloseTo(.3,2);
    const pointer=await readings(),filter=pointer.at(-1).filter;
    if(['radar-hexagon','radar-grid-only'].includes(id))expect(filter).toBe('none');else{expect(filter).toContain('drop-shadow(');const slash=filter.match(/\/\s*([\d.]+)(%)?\s*\)/),rgba=filter.match(/rgba\([^)]*,\s*([\d.]+)\)/),alpha=slash?Number(slash[1])/(slash[2]?100:1):rgba?Number(rgba[1]):1;const blur=[...filter.matchAll(/(-?\d+(?:\.\d+)?)px/g)].map(match=>Number(match[1])).at(-1);expect(alpha).toBeLessThanOrEqual(.3);expect(blur).toBeLessThanOrEqual(6);}
    await page.screenshot({path:join(evidence,`${id}-legend-hover.png`),fullPage:true});await page.mouse.move(1,1);await expect.poll(async()=>(await readings()).every(row=>row.opacity===1&&row.fill===.15)).toBe(true);
    await groups().last().hover({force:true});await expect.poll(async()=>(await readings()).at(-1).fill).toBeCloseTo(.35,2);await page.mouse.move(1,1);
    facts.checks.push({id,typography,grid:gridFacts,keyboardFocus:focused,keyboardSeriesLinked:true,pointerLegendLinked:true,pointerAreaLinked:true,pointer});save();
  }
  await page.setViewportSize({width:390,height:796});await page.goto(`http://127.0.0.1:${port}/radar-default.html`);await expect(groups().first().locator('path')).toHaveAttribute('d',/M.+Z/);
  facts.narrowReduced=await page.evaluate(()=>({width:innerWidth,pageWidth:document.documentElement.scrollWidth,buttons:[...document.querySelectorAll('.legend-container button')].map(node=>node.getBoundingClientRect().toJSON())}));expect(facts.narrowReduced.pageWidth).toBeLessThanOrEqual(391);await page.screenshot({path:join(evidence,'radar-default-390-reduced.png'),fullPage:true});
  await page.emulateMedia({reducedMotion:'no-preference'});await page.goto(`http://127.0.0.1:${port}/radar-default-normal.html`);await expect(groups()).toHaveCount(2);const paths=groups().locator('path');
  const before=await paths.evaluateAll(nodes=>nodes.map(node=>node.getAttribute('d')));await page.waitForTimeout(120);const middle=await paths.evaluateAll(nodes=>nodes.map(node=>node.getAttribute('d')));await page.waitForTimeout(1800);const after=await paths.evaluateAll(nodes=>nodes.map(node=>node.getAttribute('d')));
  expect(after).not.toEqual(before);expect(middle).not.toEqual(after);for(const path of after)expect(path).not.toMatch(/NaN|Infinity/);
  await page.locator('.legend-container button').first().hover();await expect.poll(async()=>(await readings())[0].fill).toBeCloseTo(.35,2);await expect.poll(async()=>(await readings())[1].opacity).toBeCloseTo(.3,2);const normalHover=await readings();expect(normalHover[0].filter).toContain('6px');
  facts.narrowNormal={width:390,intermediateGeometry:true,before,middle,after,normalHover,pageWidth:await page.evaluate(()=>document.documentElement.scrollWidth)};expect(facts.narrowNormal.pageWidth).toBeLessThanOrEqual(391);await page.screenshot({path:join(evidence,'radar-default-390-normal.png'),fullPage:true});
  facts.sourceChanges=sourceChanges();assert.deepEqual(facts.sourceChanges,[]);const downloaded=new Map(official.variants.flatMap(row=>row.files.filter(file=>!['main.tsx','index.html'].includes(file.path)).map(file=>[file.path,file.sha256])));facts.downloadChanges=[...downloaded].filter(([path,sha256])=>hash(join(workspace,'apps/playground/src/docs/components',path))!==sha256).map(([path])=>path);assert.deepEqual(facts.downloadChanges,[]);assert.deepEqual(facts.errors,[]);facts.status='passed';
  console.log(JSON.stringify({status:facts.status,checks:facts.checks.length,narrowReduced:true,narrowNormal:true,sourceChanges:facts.sourceChanges,downloadChanges:facts.downloadChanges,errors:facts.errors},null,2));
}catch(error){facts.status='failed';facts.error=String(error);throw error;}finally{if(browser)await browser.close();if(server)server.kill();facts.finishedAt=new Date().toISOString();writeFileSync(join(evidence,'browser-server.log'),serverLog);save();}
