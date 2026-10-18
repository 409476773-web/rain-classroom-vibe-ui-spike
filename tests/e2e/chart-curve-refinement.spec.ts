import { evidenceOutputPath } from "../../scripts/evidence-output.mjs";
import { expect, test, type Locator, type Page } from '@playwright/test';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { observed, settled, hashSources, run, capture } from '../../evidence/runtime/chart-curve-refinement-2026-10-11/browser-observer.mjs';

const runName=process.env.RAIN_CURVE_BROWSER_RUN ?? 'after-tests';
const folder=evidenceOutputPath(`${run}/browser-tests/${runName}`);
const beforeFolder=`${run}/browser-before`;
const shapes=['line','area','composed'] as const;
const official=[
 {family:'area',id:'area-default',keys:['enrolled']},
 {family:'line',id:'line-dual-y-axis',keys:['enrolled','rate']},
 {family:'composed',id:'composed-markers-dashed-tail',keys:['returned'],markers:true},
] as const;

function turns(values:(number|null)[]){let previous=0,count=0;for(let i=1;i<values.length;i++){if(values[i]===null||values[i-1]===null){previous=0;continue;}const change=Math.sign(values[i]!-values[i-1]!);if(change&&previous&&change!==previous)count++;if(change)previous=change;}return count;}
const paint=(value:string)=>value.replace(/url\([^)]+\)/g,'url(<instance-paint>)');
function presentation(facts:any){return{
 paths:facts.paths.map((p:any)=>[paint(p.stroke),p.strokeWidth,p.strokeOpacity,p.opacity,p.dasharray]).sort(),
 fills:facts.fills.filter((p:any)=>!['none','transparent','rgba(0, 0, 0, 0)'].includes(p.fill)).map((p:any)=>[paint(p.fill),p.fillOpacity,p.opacity]).sort(),
 legends:facts.legends,dateLabels:facts.dateLabels,
 // Tick count follows the data domain; typography is a set of actual painted styles.
 text:[...new Set(facts.textStyle.map((p:any)=>JSON.stringify([p.fontFamily,p.fontSize,p.fontWeight,p.color,p.fill])))].sort(),
 svgSizes:facts.svgs.map((p:any)=>[p.width,p.height,p.box.width,p.box.height]),
};}
async function timeline(page:Page,revision:number,state='normal'){
 return page.evaluate(async({revision,state})=>{
  const modulePath='/src/docs/components/chart-data.ts';const module=await import(/* @vite-ignore */ modulePath);
  const rows=state==='missing'?module.makeMissingTimeline(revision):module.makeTimeline(revision,state);
  return rows.map((p:any)=>({date:p.date.getDate(),enrolled:p.enrolled,completed:p.completed,returned:p.returned,rate:p.rate}));
 },{revision,state});
}
async function miniValues(page:Page,revision:number,state='normal'){
 return page.evaluate(async({revision,state})=>{
  const modulePath='/src/docs/components/chart-business/mini-data.ts';const module=await import(/* @vite-ignore */ modulePath);
  return module.makeMiniRows(revision,state)[0]?.trend ?? [];
 },{revision,state});
}
function geometry(facts:any,allowedTurns:number|number[],label:string){
 expect(facts.finite,label).toBe(true);expect(facts.documentWidth).toBeLessThanOrEqual(facts.viewportWidth+1);
 for(const [index,path] of facts.paths.entries()){expect(path.xMonotone,`${label}: actual rendered path runs backwards in x`).toBe(true);
  // Across missing-data M breaks getPointAtLength jumps; that jump is not a peak.
  const limit=Array.isArray(allowedTurns)?allowedTurns[index]:allowedTurns;
  expect(limit,`${label}: a visible native path has an explicit series limit`).toBeDefined();
  if(limit===undefined)throw new Error(`${label}: no series turn limit for native path ${index}`);
  if(path.subpaths===1)expect(path.extrema,`${label}: rendered extrema exceed source-data turns; ${path.d}`).toBeLessThanOrEqual(limit);
 }
}
async function idle(host:Locator,reduced:boolean):Promise<any>{return settled(host,{minimumMs:reduced?0:1500});}
async function realTooltip(page:Page,host:Locator,rows:any[],label:string,keys:string[],official=false){
 const plot=host.locator('.rain-chart-plot,.rain-chart-mini-plot').first();await plot.scrollIntoViewIfNeeded();const box=(await plot.boundingBox())!;
 const tooltip=host.locator('.rain-chart-tooltip');
 await expect(async()=>{await page.mouse.move(0,0);await page.mouse.move(box.x+Math.min(80,box.width/3),box.y+box.height/2);await expect(tooltip).toBeVisible({timeout:100});}).toPass({timeout:5000,intervals:[50]});
 const text=(await tooltip.textContent())??'';const date=text.match(/9月(\d+)日/);expect(date,`${label}: actual tooltip date`).toBeTruthy();
 const source=rows.find(row=>row.date===Number(date![1]));expect(source,`${label}: tooltip date belongs to actual data`).toBeDefined();
 const valueTexts=await tooltip.locator('span.tabular-nums').allTextContents();
 const expected=keys.map(key=>key==='rate'?`${Number(source[key]).toFixed(1)}${official?' ':''}%`:`${source[key]} 人`);
 expect(valueTexts,`${label}: each tooltip series matches the original count or displayed full-precision rate`).toEqual(expected);
 await page.mouse.move(0,0);return{text,date:Number(date![1]),valueTexts};
}
async function compareBaseline(id:string,facts:any){const before=JSON.parse(await readFile(`${beforeFolder}/${id}.json`,'utf8'));expect(presentation(facts),`${id}: colors, widths, fill, typography, legends, dates and viewport`).toEqual(presentation(before));}
async function save(name:string,value:any){await mkdir(folder,{recursive:true});await writeFile(`${folder}/${name}.json`,JSON.stringify(value,null,2));}
async function markersAndTail(host:Locator){
 const facts=await host.evaluate(node=>{
  const circles=[...node.querySelectorAll('svg circle')];const reference=node.querySelector('svg path[stroke-dasharray="6,4"]') as SVGGraphicsElement|null;const origin=reference?.getCTM()?.e??0;
  const xs=[...new Set(circles.map(circle=>Number(((circle as SVGGraphicsElement).getCTM()?.e??0)-origin)))].sort((a,b)=>a-b);
  const tails=[...node.querySelectorAll('svg path[stroke-dasharray]')].filter(path=>path.getAttribute('stroke-dasharray')==='6,4').map(path=>{const id=(path.getAttribute('clip-path')??'').match(/#([^)]*)/)?.[1];const clip=id?document.getElementById(id)?.querySelector('rect'):null;return{strokeWidth:Number(path.getAttribute('stroke-width')),clipStart:Number(clip?.getAttribute('x'))};});return{circles:circles.length,xs,tails};
 });
 expect(facts.circles).toBe(28);expect(facts.xs).toHaveLength(7);expect(facts.tails).toHaveLength(2);for(const tail of facts.tails)expect(tail.clipStart).toBeCloseTo(facts.xs[4]!-tail.strokeWidth,4);return facts;
}

for(const width of[1440,390])for(const mode of['no-preference','reduce'] as const){
 const reduced=mode==='reduce';
 test.describe(`${width}px ${mode}`,()=>{
  test.beforeEach(async({page})=>{await page.setViewportSize({width,height:1000});await page.emulateMedia({reducedMotion:mode});await page.clock.setFixedTime(new Date('2026-10-11T00:00:00+08:00'));});
  test('default line, area and composed retain reads, geometry and state behavior',async({page})=>{
   test.setTimeout(90000);const facts:any[]=[];const errors:string[]=[];page.on('pageerror',e=>errors.push(String(e)));const sourcesBefore=await hashSources();
   try{for(const family of shapes){
    await page.goto(`/?curve-refinement=${runName}#chart-${family}`);await page.getByRole('combobox',{name:'视觉配方',exact:true}).selectOption('category-near');
    const host=page.locator(`[data-rain-id="chart-${family}"]`),controls=page.locator('[data-chart-default-controls]');
    const keys=family==='composed'?['enrolled','rate']:['enrolled','completed','returned'];
    let rows=await timeline(page,0);const normal=await idle(host,reduced);geometry(normal,keys.map(key=>turns(rows.map((row:any)=>row[key]))),`${family}-normal`);await compareBaseline(`default-${family}-${width}-reduce-category-near`,normal);
    const tooltipKeys=family==='composed'?['enrolled','completed','rate']:keys;
    const initialTooltip=await realTooltip(page,host,rows,`${family}-normal`,tooltipKeys);facts.push({family,state:'normal',revision:0,observed:normal,tooltip:initialTooltip});
    await controls.getByRole('button',{name:'更新数据',exact:true}).click();rows=await timeline(page,1);const updated=await idle(host,reduced);geometry(updated,keys.map(key=>turns(rows.map((row:any)=>row[key]))),`${family}-updated`);expect(presentation(updated)).toEqual(presentation(normal));expect(updated.table).not.toEqual(normal.table);
    expect(updated.paths.map((p:any)=>p.d)).not.toEqual(normal.paths.map((p:any)=>p.d));
    facts.push({family,state:'normal',revision:1,observed:updated,tooltip:await realTooltip(page,host,rows,`${family}-updated`,tooltipKeys)});
    await controls.getByRole('button',{name:'重播动效',exact:true}).click();const replay=await idle(host,reduced);expect(replay.paths.map((p:any)=>p.d)).toEqual(updated.paths.map((p:any)=>p.d));expect(presentation(replay)).toEqual(presentation(updated));facts.push({family,state:'replay',revision:1,observed:replay});
    for(const state of['missing','zero','single']){
     await controls.getByRole('combobox',{name:'示例状态',exact:true}).selectOption(state);const current=await idle(host,reduced);expect(current.finite).toBe(true);expect(current.documentWidth).toBeLessThanOrEqual(width+1);
     const stateRows=await timeline(page,1,state);expect(current.table).toHaveLength(stateRows.length);
     if(state==='missing')expect((await host.textContent())??'').toMatch(/缺测|不适用/);
     if(state==='zero'){geometry(current,0,`${family}-zero`);if(family==='composed')await expect(host).toContainText('完成率不适用');}
     if(state==='single')expect(current.table).toHaveLength(1);
     facts.push({family,state,revision:1,observed:current});
    }
   }}finally{const sourcesAfter=await hashSources();await save(`default-${width}-${mode}`,{sourcesBefore,sourcesAfter,errors,facts});expect(sourcesAfter).toEqual(sourcesBefore);}
   expect(errors).toEqual([]);
  });

  test('representative official area, dual-axis line and markers keep their actual native path and interactions',async({page})=>{
   test.setTimeout(90000);const facts:any[]=[];const errors:string[]=[];page.on('pageerror',e=>errors.push(String(e)));const sourcesBefore=await hashSources();
   try{for(const item of official){
    await page.goto(`/?curve-refinement=${runName}#chart-${item.family}`);await page.getByRole('combobox',{name:'视觉配方',exact:true}).selectOption('monochrome-blue');
    const host=page.locator(`[data-chart-variant="${item.id}"]`);await host.scrollIntoViewIfNeeded();await expect(host.locator('[data-ready="true"]')).toBeVisible();
    let rows=await timeline(page,0);if('markers'in item&&item.markers)rows=rows.slice(0,7);const normal=await idle(host,reduced);geometry(normal,'markers'in item&&item.markers?turns(rows.map((row:any)=>row.returned)):item.keys.map(key=>turns(rows.map((row:any)=>row[key]))),`${item.id}-normal`);await compareBaseline(`official-${item.id}-${width}-reduce-monochrome-blue`,normal);
    if('markers'in item&&item.markers)await markersAndTail(host);
    if(item.id.includes('dual'))await expect(host).toContainText('%');
    const tooltipKeys='markers'in item&&item.markers?['enrolled','returned']:item.keys;
    facts.push({id:item.id,revision:0,observed:normal,tooltip:await realTooltip(page,host,rows,item.id,[...tooltipKeys],true)});
    await host.getByRole('button',{name:'更新数据',exact:true}).click();rows=await timeline(page,1);if('markers'in item&&item.markers)rows=rows.slice(0,7);const updated=await idle(host,reduced);geometry(updated,'markers'in item&&item.markers?turns(rows.map((row:any)=>row.returned)):item.keys.map(key=>turns(rows.map((row:any)=>row[key]))),`${item.id}-updated`);expect(presentation(updated)).toEqual(presentation(normal));expect(updated.paths.map((p:any)=>p.d)).not.toEqual(normal.paths.map((p:any)=>p.d));facts.push({id:item.id,revision:1,observed:updated,tooltip:await realTooltip(page,host,rows,`${item.id}-updated`,[...tooltipKeys],true)});
    await host.getByRole('button',{name:'重播动效',exact:true}).click();const replay=await idle(host,reduced);expect(replay.paths.map((p:any)=>p.d)).toEqual(updated.paths.map((p:any)=>p.d));expect(presentation(replay)).toEqual(presentation(updated));if('markers'in item&&item.markers)await markersAndTail(host);facts.push({id:item.id,state:'replay',observed:replay});
   }}finally{const sourcesAfter=await hashSources();await save(`official-${width}-${mode}`,{sourcesBefore,sourcesAfter,errors,facts});expect(sourcesAfter).toEqual(sourcesBefore);}
   expect(errors).toEqual([]);
  });

  test('mini line and area retain both native sizes, shared readings, states and replay',async({page})=>{
   test.setTimeout(90000);const facts:any[]=[];const errors:string[]=[];page.on('pageerror',e=>errors.push(String(e)));const sourcesBefore=await hashSources();
   try{
    await page.goto(`/?curve-refinement=${runName}#chart-business`);const gallery=page.locator('.rain-business-mini-gallery'),controls=page.locator('.rain-business-controls');
    const take=async(state:string,revision:number)=>{const samples:any[]=[];const values=await miniValues(page,revision,state);for(const kind of['line','area'])for(const size of['compact','comfortable']){
     const slot=gallery.locator(`[data-mini-kind="${kind}"][data-size="${size}"]`),figure=slot.locator('xpath=ancestor::figure');await slot.scrollIntoViewIfNeeded();await expect(slot).toBeVisible();
     let current:any;if(state==='missing'){await expect(slot).toHaveAttribute('data-mini-state','missing');current=await observed(figure);expect(current.paths).toHaveLength(0);}else{current=await idle(figure,reduced);geometry(current,turns(values),`mini-${kind}-${size}-${state}`);}
     const box=await slot.locator('.rain-business-mini-slot').boundingBox();expect(box!.width).toBe(size==='compact'?96:128);expect(box!.height).toBe(size==='compact'?32:48);
     const caption=await figure.evaluate(node=>document.getElementById(node.getAttribute('aria-describedby')!)?.textContent??'');expect(caption).toBeTruthy();
     // MiniTrend is deliberately decorative and has no tooltip part in its contract.
     expect(await slot.locator('.rain-chart-tooltip').count()).toBe(0);if(state==='normal'&&revision===0)await compareBaseline(`mini-${kind}-${size}-${width}-reduce-monochrome-blue`,current);
     samples.push({kind,size,caption,observed:current});
    }expect(samples[0].caption).toBe(samples[1].caption);expect(samples[2].caption).toBe(samples[3].caption);facts.push({state,revision,samples});return samples;};
    const normal=await take('normal',0);await controls.getByRole('button',{name:'更新数据',exact:true}).click();const updated=await take('normal',1);
    updated.forEach((sample,index)=>{expect(presentation(sample.observed)).toEqual(presentation(normal[index].observed));expect(sample.observed.paths.map((p:any)=>p.d)).not.toEqual(normal[index].observed.paths.map((p:any)=>p.d));});
    await controls.getByRole('button',{name:'重播动效',exact:true}).click();const replay=await take('normal',1);replay.forEach((sample,index)=>expect(sample.observed.paths.map((p:any)=>p.d)).toEqual(updated[index].observed.paths.map((p:any)=>p.d)));
    for(const state of['zero','missing','single']){await controls.getByRole('combobox',{name:'业务数据状态',exact:true}).selectOption(state);await take(state,1);}
   }finally{const sourcesAfter=await hashSources();await save(`mini-${width}-${mode}`,{sourcesBefore,sourcesAfter,errors,facts});expect(sourcesAfter).toEqual(sourcesBefore);}
   expect(errors).toEqual([]);
  });
 });
}

for(const width of[1440,390])test(`${width}px reduce: category area curves retain all original points, exact tables and missing boundaries`,async({page})=>{
 test.setTimeout(90000);const facts:any[]=[];const errors:string[]=[];page.on('pageerror',e=>errors.push(String(e)));const sourcesBefore=await hashSources();
 await page.setViewportSize({width,height:1000});await page.emulateMedia({reducedMotion:'reduce'});await page.clock.setFixedTime(new Date('2026-10-11T00:00:00+08:00'));
 const raw=async(id:string,revision:number,state:string)=>page.evaluate(async({id,revision,state})=>{const modulePath='/src/docs/components/chart-business/comparison-data.ts';const module=await import(/* @vite-ignore */modulePath);return module.makeCategoryFixtures(revision,state).find((fixture:any)=>fixture.id===id);},{id,revision,state});
 try{for(const id of['semester','period','version']){
  await page.goto(`/?curve-refinement=${runName}-${id}#chart-category`);const controls=page.locator('.rain-category-controls');await controls.getByRole('combobox',{name:'分类业务场景',exact:true}).selectOption(id);
  const host=page.locator(`[data-category-example="${id}"]`);await host.locator('summary').click();
  const take=async(revision:number,state:string)=>{
   const fixture=await raw(id,revision,state),current=await idle(host,true);expect(current.finite).toBe(true);expect(current.documentWidth).toBeLessThanOrEqual(width+1);expect(current.paths).toHaveLength(fixture.series.length);
   const expectedRows=fixture.rows.map((row:any)=>[row.label,...(id==='period'?[row.currentDate??'无观测日期',row.previousDate??'无观测日期']:[]),...fixture.series.map((series:any)=>row[series.key]===null?'缺测':String(row[series.key]))]);
   expect(await host.locator('tbody tr').evaluateAll(rows=>rows.map(row=>[...row.querySelectorAll('th,td')].map(cell=>cell.textContent?.trim())))).toEqual(expectedRows);
   for(const [index,path]of current.paths.entries()){
    const sourceCount=fixture.rows.filter((row:any)=>row[fixture.series[index].key]!==null).length;expect((path.d.match(/[MCL]/gi)??[]).length,`${id} ${state}: actual native stroke retains every non-null original point`).toBe(sourceCount);expect(path.xMonotone).toBe(true);
    if(state==='zero')expect(path.extrema).toBe(0);if(state==='missing'&&id!=='period')expect(path.subpaths).toBe(2);
   }
   facts.push({id,revision,state,sourceRows:fixture.rows,sourceSeries:fixture.series,observed:current});return{fixture,current};
  };
  const normal=await take(0,'normal');await capture(page,host,`category-${id}-${width}-reduce-normal`,`${folder}/category`);
  const viewport=host.locator('.rain-category-scroll');await viewport.scrollIntoViewIfNeeded();const box=(await viewport.boundingBox())!;const tooltip=host.locator('.rain-category-tooltip');
  await expect(async()=>{await page.mouse.move(0,0);await page.mouse.move(box.x+Math.min(150,box.width/2),box.y+100);await expect(tooltip).toBeVisible({timeout:100});}).toPass({timeout:5000,intervals:[50]});
  const tooltipText=(await tooltip.textContent())??'',point=normal.fixture.rows.find((row:any)=>tooltipText.includes(row.label));expect(point).toBeTruthy();expect(await tooltip.locator('span.tabular-nums').allTextContents()).toEqual(normal.fixture.series.map((series:any)=>point[series.key]===null?'缺测':`${point[series.key]}${series.unit}`));
  if(id==='period'){expect(tooltipText).toContain(point.currentDate??'无观测日期');expect(tooltipText).toContain(point.previousDate??'无观测日期');}
  await host.screenshot({path:`${folder}/category/category-${id}-${width}-tooltip.png`,animations:'disabled'});facts.push({id,state:'tooltip',tooltipText});await page.mouse.move(0,0);
  await controls.getByRole('button',{name:'更新数据',exact:true}).click();const updated=await take(1,'normal');expect(updated.current.paths.map((p:any)=>p.d)).not.toEqual(normal.current.paths.map((p:any)=>p.d));expect(presentation(updated.current)).toEqual(presentation(normal.current));
  await controls.getByRole('button',{name:'重播动效',exact:true}).click();const replay=await take(1,'normal');expect(replay.current.paths.map((p:any)=>p.d)).toEqual(updated.current.paths.map((p:any)=>p.d));
  for(const state of['zero','missing']){await controls.getByRole('combobox',{name:'分类数据状态',exact:true}).selectOption(state);await take(1,state);}
  if(width===390){const scroll=await viewport.evaluate(node=>({width:node.clientWidth,total:node.scrollWidth,overflow:getComputedStyle(node).overflowX}));expect(scroll.total).toBeGreaterThan(scroll.width);expect(scroll.overflow).toBe('auto');}
 }}finally{const sourcesAfter=await hashSources();await save(`category-${width}-reduce`,{sourcesBefore,sourcesAfter,errors,facts});expect(sourcesAfter).toEqual(sourcesBefore);}
 expect(errors).toEqual([]);
});
