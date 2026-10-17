import {chromium,expect} from '@playwright/test';
import fs from 'node:fs/promises';import crypto from 'node:crypto';
const base='evidence/runtime/navigation-v042/w5/review-13-r3-actions',run=`${base}/run-${new Date().toISOString().replace(/[:.]/g,'-')}`;
await fs.mkdir(run,{recursive:true});const result={recordedAt:new Date().toISOString(),run,cases:[],errors:[],assertions:0};
const lock=JSON.parse(await fs.readFile(`${base}/accepted-review12-source.json`)),sha=async p=>crypto.createHash('sha256').update(await fs.readFile(p)).digest('hex'),sourceBefore={};for(const p of Object.keys(lock.filesSha256))sourceBefore[p]=await sha(p);result.sourceBefore=sourceBefore;
const browser=await chromium.launch({headless:true});let checks=0;
const eq=(a,b)=>{checks++;expect(a).toEqual(b);};
try{
 for(const sample of ['R3','S2'])for(const width of [1200,1440])for(const dark of [false,true]){
  const id=`${sample}-${width}-${dark?'dark':'light'}`,page=await browser.newPage({viewport:{width:1800,height:1100},locale:'zh-CN',deviceScaleFactor:1,reducedMotion:'reduce'});
  page.on('pageerror',e=>result.errors.push({id,message:e.message}));page.on('console',e=>{if(e.type()==='error')result.errors.push({id,message:e.text()});});
  await page.goto(`http://127.0.0.1:5198/?sample=${sample}#navigation-v042`,{waitUntil:'networkidle'});await page.getByRole('combobox',{name:'画板宽度'}).selectOption(String(width));if(sample==='R3')await page.getByRole('combobox',{name:'业务子场景'}).selectOption('errors');await page.getByLabel('深色外框').setChecked(dark);
  const root=page.getByTestId('candidate-canvas').locator('.rain-workspace'),button=root.getByRole('button',{name:'开始练习',exact:true}),stars=root.locator('.nv43-star');await expect(button).toBeVisible();checks++;
  const style=await button.evaluate(e=>{const s=getComputedStyle(e);return{variant:e.dataset.variant,icons:e.querySelectorAll('[data-rain-id="icon"]').length,localRecipe:e.dataset.localRecipe??null,background:s.backgroundColor,color:s.color,fontWeight:s.fontWeight,height:e.getBoundingClientRect().height};});
  eq(style,{variant:'primary',icons:0,localRecipe:null,background:'rgb(21, 97, 248)',color:'rgb(255, 255, 255)',fontWeight:'600',height:32});
  const initial=await stars.evaluateAll(es=>es.map(e=>({label:e.getAttribute('aria-label'),pressed:e.getAttribute('aria-pressed'),asset:e.querySelector('[data-rain-id="icon"]')?.getAttribute('data-icon')})));
  eq(initial.length,6);for(const s of initial)eq(s.asset,s.pressed==='true'?'icon/rating-star-100':'icon/rating-star');
  await page.mouse.move(1790,1090);await root.screenshot({path:`${run}/${id}-normal-full.png`});await root.locator('.nv43-sheet').screenshot({path:`${run}/${id}-sheet.png`});
  await button.click();await expect(root.getByText('已进入练习示例，原始成绩未改变。',{exact:true})).toBeVisible();checks++;eq(await stars.count(),6);
  let first=root.getByRole('button',{name:'取消加星 · 第 1 题',exact:true});await first.click();eq(await root.getByRole('button',{name:'添加加星 · 第 1 题',exact:true}).locator('[data-rain-id="icon"]').getAttribute('data-icon'),'icon/rating-star');
  await root.getByRole('radio',{name:/^加星/}).locator('..').click();eq(await root.locator('tbody tr').count(),2);eq(await root.locator('.nv43-star[aria-pressed="false"]').count(),0);
  await root.getByRole('radio',{name:/^全部/}).locator('..').click();let second=root.getByRole('button',{name:'添加加星 · 第 2 题',exact:true});await second.press('Space');eq(await root.getByRole('button',{name:'取消加星 · 第 2 题',exact:true}).locator('[data-rain-id="icon"]').getAttribute('data-icon'),'icon/rating-star-100');
  first=root.getByRole('button',{name:'添加加星 · 第 1 题',exact:true});await first.press('Enter');eq(await root.getByRole('button',{name:'取消加星 · 第 1 题',exact:true}).getAttribute('aria-pressed'),'true');
  await root.getByRole('radio',{name:/^加星/}).locator('..').click();eq(await root.locator('tbody tr').count(),4);eq(await root.locator('.nv43-star[aria-pressed="false"]').count(),0);
  await root.getByRole('radio',{name:/^全部/}).locator('..').click();eq(await root.locator('tbody tr').count(),6);
  result.cases.push({id,button:style,initialStars:initial,status:'passed',checks});await page.close();
 }
 const page=await browser.newPage({viewport:{width:1800,height:1100},locale:'zh-CN'});page.on('pageerror',e=>result.errors.push({id:'R3-cloud',message:e.message}));await page.goto('http://127.0.0.1:5198/?sample=R3#navigation-v042',{waitUntil:'networkidle'});await page.getByRole('combobox',{name:'业务子场景'}).selectOption('files');const root=page.getByTestId('candidate-canvas').locator('.rain-workspace'),upload=root.getByRole('button',{name:'上传文件',exact:true});eq(await upload.getAttribute('data-variant'),'tertiary');eq(await upload.locator('[data-rain-id="icon"]').getAttribute('data-icon'),'icon/upload');await upload.click();await expect(root.getByText('上传为演示操作，未写入文件服务。',{exact:true})).toBeVisible();checks++;result.cases.push({id:'R3-cloud',status:'passed'});await page.close();
 result.status='passed';
}catch(error){result.status='failed';result.failure={message:error.message,stack:error.stack};process.exitCode=1;}
finally{await browser.close();result.assertions=checks;result.sourceAfter={};for(const p of Object.keys(sourceBefore))result.sourceAfter[p]=await sha(p);result.sourceStable=JSON.stringify(sourceBefore)===JSON.stringify(result.sourceAfter);if(!result.sourceStable||result.errors.length){result.status='failed';process.exitCode=1;}await fs.writeFile(`${run}/measurements.json`,JSON.stringify(result,null,2)+'\n');await fs.writeFile(`${base}/latest-runtime.json`,JSON.stringify({path:`${run}/measurements.json`,status:result.status},null,2)+'\n');console.log(JSON.stringify({run,status:result.status,cases:result.cases.length,assertions:checks,errors:result.errors.length,sourceStable:result.sourceStable,failure:result.failure?.message}));}
