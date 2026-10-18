import { evidenceOutputPath } from "../../scripts/evidence-output.mjs";
import { test, expect, type Page, type Locator } from '@playwright/test';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const root = 'evidence/runtime/chart-experience-second-batch-2026-10-11/radial-flow';
const run = process.env.RAIN_SECOND_BATCH_RADIAL_BROWSER_RUN ?? 'browser-after-01';
const folder = evidenceOutputPath(`${root}/${run}`);
const owned = ['chart-data.ts','chart-examples.tsx','chart-variants/radial.tsx','chart-variants/comparison.tsx'];
async function hashes(){return Object.fromEntries(await Promise.all(owned.map(async file=>[file,createHash('sha256').update(await readFile(`apps/playground/src/docs/components/${file}`,'utf8')).digest('hex')])));}
async function exact(host:Locator){const details=host.locator('details.rain-chart-data').first();if(await details.getAttribute('open')===null)await details.locator('summary').click();await expect(details.locator('table')).toBeVisible();await details.locator('summary').focus();await details.locator('summary').press('Tab');await expect(details.getByLabel('精确数据表，可横向滚动')).toBeFocused();}
async function facts(host:Locator){return host.evaluate(node=>({
 table:[...node.querySelectorAll('tbody tr')].map(row=>[...row.querySelectorAll('th,td')].map(cell=>cell.textContent)),
 paths:[...node.querySelectorAll('svg path[d]')].map(path=>({d:path.getAttribute('d'),strokeWidth:path.getAttribute('stroke-width'),opacity:getComputedStyle(path).opacity,dashoffset:getComputedStyle(path).strokeDashoffset})),
 statuses:[...node.querySelectorAll('[role="status"]')].map(node=>node.textContent),
 documentWidth:document.documentElement.scrollWidth, viewportWidth:innerWidth,
 minis:[...node.querySelectorAll('[data-mini-kind]')].map(node=>({kind:node.getAttribute('data-mini-kind'),size:node.getAttribute('data-size'),width:node.getBoundingClientRect().width,height:node.getBoundingClientRect().height})),
}));}
async function settled(page:Page,host:Locator,reduced:boolean){await host.scrollIntoViewIfNeeded();if(!reduced)await page.waitForTimeout(1600);const value=await facts(host);expect(value.paths.every(path=>!path.d?.match(/NaN|Infinity/))).toBe(true);expect(value.documentWidth).toBeLessThanOrEqual(value.viewportWidth+1);return value;}
async function capture(page:Page,host:Locator,name:string,reduced:boolean){await exact(host);const value=await settled(page,host,reduced);await host.screenshot({path:`${folder}/${name}.png`});return{name,...value};}
async function go(page:Page,family:string){await page.goto(`/?chart-second-batch=${run}#chart-${family}`);const host=page.locator(`[data-rain-id="chart-${family}"]`);await expect(host).toBeVisible();return host;}
async function variant(page:Page,id:string){const host=page.locator(`[data-chart-variant="${id}"]`);await host.scrollIntoViewIfNeeded();await expect(host.locator('[data-ready="true"]')).toBeVisible();return host;}

for(const width of [1440,390])for(const mode of ['reduce','no-preference'] as const){
 const reduced=mode==='reduce';
 test.describe(`${width}px ${mode}`,()=>{
  test.beforeEach(async({page})=>{await mkdir(folder,{recursive:true});await page.setViewportSize({width,height:1000});await page.emulateMedia({reducedMotion:mode});});
  test('default Pie Ring Funnel Sankey and mini boundaries preserve exact readings',async({page})=>{
   test.setTimeout(150000);const before=await hashes(),records:any[]=[],errors:string[]=[];page.on('pageerror',error=>errors.push(String(error)));
   try{
    let host=await go(page,'pie');await exact(host);const normal=await facts(host);records.push(await capture(page,host,`pie-normal-${width}-${mode}`,reduced));
    await host.getByRole('combobox',{name:'饼图边界样本'}).selectOption('pie-small');await expect(host.locator('table')).toContainText('0.1%');await expect(host.locator('table')).toContainText('跨学科课程教学与实践研究小组');
    const small=host.locator('.rain-chart-legend-button').last();await small.focus();await expect(host.getByRole('status')).toContainText('0.1%');expect(await small.getAttribute('aria-pressed')).toBeNull();
    await page.locator('[data-chart-default-controls]').getByRole('button',{name:'更新数据',exact:true}).dispatchEvent('click');await expect(small).toBeFocused();await expect(host.getByRole('status')).toContainText('0.1%');
    await small.press('Escape');await expect(host.getByRole('status')).toContainText('合计 1000');await small.press('Enter');await expect(host.getByRole('status')).toContainText('0.1%');
    await page.locator('h1').click();await expect(host.getByRole('status')).toContainText('合计');records.push(await capture(page,host,`pie-small-${width}-${mode}`,reduced));
    await host.getByRole('combobox',{name:'饼图边界样本'}).selectOption('normal');const removed=host.locator('.rain-chart-legend-button').nth(1);const removedLabel=await removed.textContent();await removed.focus();
    await host.getByRole('combobox',{name:'饼图边界样本'}).selectOption('pie-remove');await expect(host.getByRole('status')).toContainText('合计');await expect(host.locator('tbody tr')).toHaveCount(normal.table.length-1);expect(await host.locator('table').textContent()).not.toContain(removedLabel?.trim());records.push(await capture(page,host,`pie-removed-${width}-${mode}`,reduced));
    await host.getByRole('combobox',{name:'饼图边界样本'}).selectOption('pie-small');await page.getByRole('combobox',{name:'尺寸配方',exact:true}).selectOption('mini');
    for(const size of ['compact','comfortable']){await page.getByRole('combobox',{name:'迷你型号',exact:true}).selectOption(size);await expect(host.locator('table')).toContainText('0.1%');await expect(host.locator('[data-mini-kind="pie"], [data-mini-kind="donut"]')).toHaveCount(2);records.push(await capture(page,host,`pie-mini-${size}-${width}-${mode}`,reduced));}

    host=await go(page,'ring');await exact(host);records.push(await capture(page,host,`ring-normal-${width}-${mode}`,reduced));
    for(const [scenario,text,drawn] of [['ring-zero','0%',true],['ring-full','100%',true],['ring-zero-goal','不适用',false],['ring-over','120%',false]] as const){await host.getByRole('combobox',{name:'进度环边界样本'}).selectOption(scenario);await expect(host.locator('table')).toContainText(text);await expect(host.locator('[data-rain-id="ui-chart-ring"]')).toHaveCount(drawn?1:0);records.push(await capture(page,host,`${scenario}-${width}-${mode}`,reduced));}
    await page.getByRole('combobox',{name:'尺寸配方',exact:true}).selectOption('mini');
    for(const size of ['compact','comfortable']){await page.getByRole('combobox',{name:'迷你型号',exact:true}).selectOption(size);for(const [scenario,text] of [['ring-zero','0%'],['ring-full','100%'],['ring-zero-goal','不适用'],['ring-over','120%']] as const){await host.getByRole('combobox',{name:'进度环边界样本'}).selectOption(scenario);await expect(host.locator('table')).toContainText(text);records.push(await capture(page,host,`${scenario}-mini-${size}-${width}-${mode}`,reduced));}}

    host=await go(page,'funnel');await exact(host);records.push(await capture(page,host,`funnel-normal-${width}-${mode}`,reduced));
    for(const [scenario,text,drawn] of [['funnel-missing','缺测',false],['funnel-growth','增长',true],['funnel-zero-entry','不适用',false],['funnel-above-entry','110.0%',false]] as const){await host.getByRole('combobox',{name:'漏斗边界样本'}).selectOption(scenario);await expect(host).toContainText(text);await expect(host.locator('tbody tr')).toHaveCount(4);await expect(host.locator('[data-rain-id="ui-chart-funnel"]')).toHaveCount(drawn?1:0);records.push(await capture(page,host,`${scenario}-${width}-${mode}`,reduced));}
    await host.getByRole('combobox',{name:'漏斗边界样本'}).selectOption('normal');await page.getByRole('combobox',{name:'示例状态',exact:true}).selectOption('long');await expect(host.locator('table')).toContainText('综合课程学习情况');records.push(await capture(page,host,`funnel-long-${width}-${mode}`,reduced));

    host=await go(page,'sankey');await exact(host);records.push(await capture(page,host,`sankey-normal-${width}-${mode}`,reduced));
    for(const [scenario,edgeValue,drawn] of [['sankey-thin','1',8],['sankey-zero-link','0',7]] as const){await host.getByRole('combobox',{name:'桑基边界样本'}).selectOption(scenario);await expect(host.locator('tbody tr')).toHaveCount(8);await expect(host.locator('tbody tr').nth(5).locator('td').last()).toHaveText(edgeValue);await expect(host.locator('.sankey-links > path')).toHaveCount(drawn);records.push(await capture(page,host,`${scenario}-${width}-${mode}`,reduced));
      if(scenario==='sankey-zero-link'){const link=host.locator('.sankey-links > path').nth(5);await link.scrollIntoViewIfNeeded();const point=await link.evaluate(node=>{const p=(node as SVGPathElement).getPointAtLength((node as SVGPathElement).getTotalLength()/2);const m=(node as SVGPathElement).getScreenCTM()!;return{x:p.x*m.a+p.y*m.c+m.e,y:p.x*m.b+p.y*m.d+m.f};});await page.mouse.move(0,0);await page.mouse.move(point.x,point.y);await expect(host.locator('.rain-chart-tooltip')).toBeVisible();await expect(host.locator('.rain-chart-tooltip')).toContainText('阅读资料 → 完成学习');await expect(host.locator('.rain-chart-tooltip')).toContainText('人次');records.push({name:'zero-filtered-link-tooltip',text:await host.locator('.rain-chart-tooltip').textContent()});await page.mouse.move(0,0);}}
    await host.getByRole('combobox',{name:'桑基边界样本'}).selectOption('normal');await page.getByRole('combobox',{name:'示例状态',exact:true}).selectOption('long');await expect(host.locator('table')).toContainText('综合课程学习情况');records.push(await capture(page,host,`sankey-long-${width}-${mode}`,reduced));
   }finally{const after=await hashes();await writeFile(`${folder}/default-${width}-${mode}.json`,JSON.stringify({before,after,errors,records},null,2));expect(after).toEqual(before);}
   expect(errors).toEqual([]);
  });
  test('owned legends Gauge and existing dense Radar keep native reads and instance isolation',async({page})=>{
   test.setTimeout(120000);const before=await hashes(),records:any[]=[],errors:string[]=[];page.on('pageerror',error=>errors.push(String(error)));
   try{
    await go(page,'pie');let host=await variant(page,'pie-legend');await host.getByRole('combobox',{name:'饼图边界样本'}).selectOption('pie-small');const key=host.getByRole('button',{name:/跨学科课程教学与实践研究小组.*1 人/});await key.focus();await expect(host.locator('.rain-chart-variant__plot').getByRole('status')).toContainText('0.1%');expect(await key.getAttribute('aria-pressed')).toBeNull();await key.press('Space');await expect(host.locator('.rain-chart-variant__plot').getByRole('status')).toContainText('0.1%');await key.press('Escape');await expect(host.locator('.rain-chart-variant__plot').getByRole('status')).toContainText('分母');records.push(await capture(page,host,`variant-pie-small-${width}-${mode}`,reduced));
    await go(page,'ring');host=await variant(page,'ring-legend');const second=host.getByRole('button',{name:/^练习进度/});await second.focus();await expect(host.locator('.rain-chart-center-reading')).toHaveText('33.3%练习进度');await second.press('Escape');await expect(host.locator('.rain-chart-center-reading')).toHaveText('90.0%阅读进度');
    for(const scenario of ['ring-zero-goal','ring-over']){await host.getByRole('combobox',{name:'进度环边界样本'}).selectOption(scenario);await expect(host.getByRole('progressbar',{name:'阅读进度进度'})).toHaveCount(0);await expect(host.locator('[data-rain-id="ui-chart-ring"]')).toHaveCount(0);records.push(await capture(page,host,`variant-${scenario}-${width}-${mode}`,reduced));}
    await go(page,'funnel');host=await variant(page,'funnel-default');const funnelKey=host.getByRole('button',{name:'观看视频',exact:true});await funnelKey.click();await funnelKey.press('Enter');expect(await funnelKey.getAttribute('aria-pressed')).toBeNull();for(const scenario of ['funnel-missing','funnel-growth']){await host.getByRole('combobox',{name:'漏斗边界样本'}).selectOption(scenario);records.push(await capture(page,host,`variant-${scenario}-${width}-${mode}`,reduced));}
    await go(page,'gauge');for(const id of ['gauge-default','gauge-linear-label-below']){host=await variant(page,id);const counts:number[]=[];for(const value of [0,50,100]){await host.getByRole('button',{name:`${value}%`,exact:true}).click();await expect(host.getByRole('status',{name:'当前进度'})).toHaveText(`${value}%`);await settled(page,host,reduced);counts.push(await host.locator('svg path[fill-opacity="1"]').count());records.push(await capture(page,host,`${id}-${value}-${width}-${mode}`,reduced));}expect(counts[0]).toBe(0);expect(counts[2]).toBe(counts[1]!*2);expect(counts[1]).toBeGreaterThan(0);records.push({id,counts});}
    host=await go(page,'radar');await page.getByRole('combobox',{name:'示例状态',exact:true}).selectOption('long');await page.getByRole('combobox',{name:'系列数',exact:true}).selectOption('5');await exact(host);await expect(host.locator('tbody tr')).toHaveCount(5);await expect(host.locator('table')).toContainText('综合课程学习情况');records.push(await capture(page,host,`radar-long-dense-${width}-${mode}`,reduced));host=await variant(page,'radar-hexagon');await exact(host);await expect(host.locator('thead th')).toHaveCount(7);await expect(host.locator('tbody tr')).toHaveCount(2);records.push(await capture(page,host,`radar-hexagon-${width}-${mode}`,reduced));
   }finally{const after=await hashes();await writeFile(`${folder}/variants-${width}-${mode}.json`,JSON.stringify({before,after,errors,records},null,2));expect(after).toEqual(before);}
   expect(errors).toEqual([]);
  });
 });
}
