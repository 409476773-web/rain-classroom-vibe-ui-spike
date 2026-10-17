import {chromium,expect} from '@playwright/test';
import {mkdirSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
const evidence=dirname(fileURLToPath(import.meta.url));
mkdirSync(evidence,{recursive:true});
const browser=await chromium.launch(),page=await browser.newPage({viewport:{width:1440,height:1000},timezoneId:'Asia/Shanghai',reducedMotion:'no-preference'});
await page.clock.install({time:new Date('2026-10-11T00:00:00Z')});
const output={source:'Actual playground data URI download anchors after pause and keyboard manual append',base:'http://127.0.0.1:5173',captured:[]};
try{
 for(const id of ['default','live-line-default']){
  await page.goto(`${output.base}/#chart-live-line`);
  const host=page.locator(id==='default'?'[data-rain-id="chart-live-line"]':`[data-chart-variant="${id}"]`),plot=host.locator('[data-rain-id="ui-chart-live-line"]');
  await plot.scrollIntoViewIfNeeded();await page.clock.runFor(1200);
  await expect(host.locator('[data-live-paused]')).toHaveAttribute('data-live-paused','false');
  await host.getByRole('button',{name:'暂停实时',exact:true}).click();await page.clock.runFor(1000);
  const append=host.getByRole('button',{name:'追加一次',exact:true});await append.focus();await append.press('Enter');await page.clock.runFor(100);
  await expect(host.locator('[data-live-paused]')).toHaveAttribute('data-live-paused','true');
  const source=id==='default'?page.locator('details.rain-chart-source[data-source="default"]'):host.locator('details.rain-chart-source');
  const files=await source.locator('a[download]').evaluateAll(nodes=>Object.fromEntries(nodes.map(node=>[node.getAttribute('download'),decodeURIComponent(node.getAttribute('href').split(',').slice(1).join(','))])));
  const match=files['main.tsx'].match(/useState<(?:LiveExampleSettings|VariantSettings)>\((\{.*\})\);/);if(!match)throw Error(`No captured settings ${id}`);
  const settings=JSON.parse(match[1]);if(!settings.paused||!settings.points?.length||!settings.frozenNow)throw Error(`Invalid paused snapshot ${id}`);
  const table=await host.locator('tbody tr').evaluateAll(rows=>rows.map(row=>[...row.querySelectorAll('th,td')].map(cell=>cell.textContent.trim())));
  const recipe=files['main.tsx'].match(/data-recipe="([^"]+)"/)[1];
  const record={id,recipe,settings,table,files:Object.entries(files).map(([path,value])=>({path,sha256:createHash('sha256').update(value).digest('hex')}))};
  writeFileSync(join(evidence,`${id}-actual-main.tsx`),files['main.tsx']);output.captured.push(record);
  console.log(JSON.stringify({id,recipe,points:settings.points.length,frozenNow:settings.frozenNow,files:record.files.length,tableRows:table.length}));
 }
}finally{await browser.close();writeFileSync(join(evidence,'live-captured.json'),JSON.stringify(output,null,2));}
