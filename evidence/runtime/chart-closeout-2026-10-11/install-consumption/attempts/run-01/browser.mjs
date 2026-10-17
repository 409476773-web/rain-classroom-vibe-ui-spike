import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFileSync,writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';
import {chromium,expect} from '@playwright/test';
const hash=value=>createHash('sha256').update(value).digest('hex');
export async function verifyBrowser({host,evidence,facts,samples,port}){
 const {preview}=await import(pathToFileURL(join(host,'node_modules/vite/dist/node/index.js')).href);
 const server=await preview({root:host,configFile:false,build:{outDir:'dist'},preview:{host:'127.0.0.1',port,strictPort:true}}),browser=await chromium.launch({headless:true});
 facts.browserChecks=[];
 try{
  for(const width of [1440,390]){
   const context=await browser.newContext({viewport:{width,height:900},deviceScaleFactor:1,reducedMotion:'reduce',timezoneId:'Asia/Shanghai'}),page=await context.newPage();
   page.on('pageerror',error=>facts.pageErrors.push(String(error)));page.on('requestfailed',request=>facts.failedRequests.push({url:request.url(),failure:request.failure()}));page.on('response',response=>{if(response.status()>=400)facts.badResponses.push({url:response.url(),status:response.status()});});page.on('request',request=>{const url=new URL(request.url());if(!['data:','blob:'].includes(url.protocol)&&url.origin!==`http://127.0.0.1:${port}`)facts.externalBrowserOrigins.push(url.origin);});
   for(const sample of samples){
    const path=`${sample.name}.html`,url=`http://127.0.0.1:${port}/${path}`,response=await page.goto(url);assert.equal(response.status(),200);assert.equal(hash(await response.body()),hash(readFileSync(join(host,'dist',path))));
    await expect(page.locator('main')).toBeVisible();if(sample.id==='matrix')await expect(page.locator('[data-rain-id=ui-chart-matrix]').first()).toBeVisible();else await expect(page.locator('main svg').first()).toBeVisible();
    const geometry=await page.locator('main').evaluate(main=>({svgCount:main.querySelectorAll('svg').length,paths:main.querySelectorAll('path').length,text:main.textContent,invalidNumericAttributes:[...main.querySelectorAll('svg *')].flatMap(element=>[...element.attributes].filter(attribute=>/NaN|Infinity/.test(attribute.value)).map(attribute=>({tag:element.tagName,name:attribute.name,value:attribute.value}))),pageWidth:document.documentElement.scrollWidth,viewport:innerWidth}));
    assert.equal(geometry.invalidNumericAttributes.length,0,`${sample.name}: invalid geometry`);assert(geometry.pageWidth<=geometry.viewport+1,`${sample.name}: page escaped narrow viewport`);
    const check={name:sample.name,width,motion:'reduce',htmlSha256:hash(readFileSync(join(host,'dist',path))),geometry,status:'passed'};
    if(sample.kind==='variant'){
     const main=page.locator('main'),start=main.getByRole('slider',{name:'范围开始日期'}),end=main.getByRole('slider',{name:'范围结束日期'}),left=main.locator('.visx-brush-handle-left'),right=main.locator('.visx-brush-handle-right');
     await expect(start).toHaveValue('0');await expect(end).toHaveValue('29');await expect(left).toBeVisible();await expect(right).toBeVisible();
     await main.getByText('查看精确数据',{exact:true}).click();await expect(main.locator('tbody tr')).toHaveCount(30);
     const leftOriginal=(await left.boundingBox()).x,fullRows=await main.locator('tbody').innerText();await start.focus();await page.keyboard.press('ArrowRight');await expect(start).toHaveValue('1');await expect(main.locator('tbody tr')).toHaveCount(29);await expect.poll(async()=>(await left.boundingBox()).x).toBeGreaterThan(leftOriginal+2);
     check.keyboard={start:Number(await start.inputValue()),rows:await main.locator('tbody tr').count(),visibleHandleX:(await left.boundingBox()).x};
     await main.getByRole('button',{name:'重置范围',exact:true}).click();await expect(start).toHaveValue('0');await expect(main.locator('tbody tr')).toHaveCount(30);await expect.poll(async()=>(await left.boundingBox()).x).toBeCloseTo(leftOriginal,0);
     const plot=main.locator('path.visx-linepath').first(),fullPath=await plot.getAttribute('d');await right.scrollIntoViewIfNeeded();const rightBox=await right.boundingBox(),distance=Math.max(36,Math.min(140,(await main.locator('.rain-chart-plot').first().boundingBox()).width*.26));
     await page.mouse.move(rightBox.x+rightBox.width/2,rightBox.y+rightBox.height/2);await page.mouse.down();await page.mouse.move(rightBox.x-distance,rightBox.y+rightBox.height/2,{steps:12});await page.mouse.up();await expect.poll(()=>end.inputValue()).not.toBe('29');await expect.poll(()=>plot.getAttribute('d')).not.toBe(fullPath);
     const rightEnd=Number(await end.inputValue());await expect(main.locator('tbody tr')).toHaveCount(rightEnd+1);check.rightDrag={distance,end:rightEnd,rows:await main.locator('tbody tr').count(),pathChanged:(await plot.getAttribute('d'))!==fullPath};
     await main.getByRole('button',{name:'重置范围',exact:true}).click();await expect(start).toHaveValue('0');await expect(end).toHaveValue('29');await expect.poll(()=>main.locator('tbody').innerText()).toBe(fullRows);
     await left.scrollIntoViewIfNeeded();const leftBox=await left.boundingBox();await page.mouse.move(leftBox.x+leftBox.width/2,leftBox.y+leftBox.height/2);await page.mouse.down();await page.mouse.move(leftBox.x+distance,leftBox.y+leftBox.height/2,{steps:12});await page.mouse.up();await expect.poll(()=>start.inputValue()).not.toBe('0');
     const leftStart=Number(await start.inputValue());await expect(main.locator('tbody tr')).toHaveCount(30-leftStart);check.leftDrag={distance,start:leftStart,rows:await main.locator('tbody tr').count()};
     await main.getByRole('button',{name:'重置范围',exact:true}).click();await expect(start).toHaveValue('0');await expect(end).toHaveValue('29');await expect.poll(()=>main.locator('tbody').innerText()).toBe(fullRows);await expect.poll(()=>plot.getAttribute('d')).toBe(fullPath);check.reset={rows:30,exactRowsRestored:true,geometryRestored:true};
     await page.screenshot({path:join(evidence,`brush-${width}-reduce.png`),fullPage:true});
    }
    facts.browserChecks.push(check);
   }
   await context.close();
  }
  assert.equal(facts.browserChecks.length,40);
 }finally{await browser.close();await new Promise(resolve=>server.httpServer.close(resolve));}
}
