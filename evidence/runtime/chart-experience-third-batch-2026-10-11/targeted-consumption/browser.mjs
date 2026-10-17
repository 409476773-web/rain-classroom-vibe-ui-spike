import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {join} from 'node:path';
import {chromium,expect} from '@playwright/test';
const hash=value=>createHash('sha256').update(value).digest('hex');
const plain=value=>JSON.parse(JSON.stringify(value));
const table=host=>host.locator('tbody tr').evaluateAll(rows=>rows.map(row=>[...row.querySelectorAll('th,td')].map(cell=>cell.textContent?.trim())));
const direction=point=>point.close>point.open?'上涨':point.close<point.open?'下跌':'平盘';
const series=['enrolled','completed','returned','answered','reviewed'];
const exact=async host=>{const details=host.locator('details.rain-chart-data').first();if(await details.getAttribute('open')===null)await details.locator('summary').click();return details;};
function rawData(sample,data,scenario=sample.settings.boundaryScenario??'normal',revision=0){
 if(sample.family==='scatter')return data.applyScatterBoundary(data.makeTimeline(revision),scenario);
 if(sample.family==='candlestick')return data.applyCandleBoundary(data.makeCandles(revision),scenario);
 if(sample.family==='profit-loss')return data.applyProfitLossBoundary(data.makeProfitLoss(revision),scenario);
 return sample.kind==='default'?sample.settings.liveSettings.points:sample.settings.points;
}
function expectedRows(sample,rows,data){
 if(sample.family==='scatter')return rows.map(point=>[data.dateLabel(point.date),...(sample.kind==='default'?series:sample.variantId==='scatter-dual-y-axis'?['enrolled','rate']:series.slice(0,2)).map(key=>key==='rate'?Number(point[key]).toFixed(1):String(point[key]))]);
 if(sample.family==='candlestick')return rows.map(point=>[data.dateLabel(point.date),String(point.open),String(point.high),String(point.low),String(point.close),direction(point)]);
 if(sample.family==='profit-loss')return rows.map(point=>[data.dateLabel(point.date),String(point.value)]);
 return rows.map(point=>[String(point.time),new Date(point.time*1000).toLocaleTimeString('zh-CN',{hour12:false,minute:'2-digit',second:'2-digit'}),String(point.value)]);
}
async function geometry(plot){return plot.evaluate(node=>({paths:[...node.querySelectorAll('path[d]')].map(path=>path.getAttribute('d')),axes:[...node.querySelectorAll('.text-chart-label')].map(label=>label.textContent),width:node.getBoundingClientRect().width,height:node.getBoundingClientRect().height}));}
function finite(value){assert(value.paths.some(path=>path?.length));assert(value.paths.every(path=>!/NaN|Infinity|undefined/.test(path??'')));assert(value.width>100&&value.height>100);}
async function resources(page){return page.evaluate(()=>window.__downloadLiveResources());}
async function stopped(page){await expect.poll(async()=>{const value=await resources(page);return[value.producers,value.nativeFrames];}).toEqual([0,0]);return resources(page);}
async function oneRunning(page){await expect.poll(async()=>{const value=await resources(page);return[value.producers,value.nativeFrames];}).toEqual([1,1]);return resources(page);}
async function installLiveProbe(page){
 await page.addInitScript(()=>{
  const producers=new Set(),frames=new Set(),observers=new Set(),listeners=new Set();let creates=0,cancels=0;const samples=[];
  const set=window.setInterval,clear=window.clearInterval;
  window.setInterval=function(callback,delay,...args){const id=set.call(this,callback,delay,...args);if(delay===600||delay===1000){producers.add(id);creates++;samples.push(`producer ${delay} ${callback.name}`);}return id;};
  window.clearInterval=function(id){if(producers.delete(id))cancels++;clear.call(this,id);};
  const raf=window.requestAnimationFrame,cancel=window.cancelAnimationFrame;
  window.requestAnimationFrame=function(callback){const own=/^tick\d*$/.test(callback.name);let id=0;id=raf.call(this,time=>{if(own)frames.delete(id);callback(time);});if(own)frames.add(id);return id;};
  window.cancelAnimationFrame=function(id){frames.delete(id);cancel.call(this,id);};
  const Observer=window.IntersectionObserver;
  window.IntersectionObserver=class extends Observer{constructor(callback,options){super(callback,options);if(callback.toString().includes('isIntersecting'))observers.add(this);}disconnect(){observers.delete(this);super.disconnect();}};
  const add=document.addEventListener,remove=document.removeEventListener;
  document.addEventListener=function(type,callback,options){if(type==='visibilitychange')listeners.add(callback);add.call(this,type,callback,options);};
  document.removeEventListener=function(type,callback,options){if(type==='visibilitychange')listeners.delete(callback);remove.call(this,type,callback,options);};
  window.__downloadLiveResources=()=>({producers:producers.size,nativeFrames:frames.size,observers:observers.size,visibilityListeners:listeners.size,creates,cancels,samples});
 });
}
async function verifyLive(page,main,chart,sample,mode,data,record,evidence){
 const plot=chart.locator('[data-rain-id="ui-chart-live-line"]'),meta=chart.locator('[data-live-paused]'),details=await exact(chart);
 await plot.scrollIntoViewIfNeeded();await page.clock.runFor(100);await expect(meta).toHaveAttribute('data-live-paused','true');
 record.initialTable=await table(chart);assert.deepEqual(record.initialTable,plain(expectedRows(sample,rawData(sample,data),data)),'Actual paused download points and units');
 const frozen=await geometry(plot);finite(frozen);record.initialResources=await stopped(page);assert.equal(record.initialResources.observers,1);assert.equal(record.initialResources.visibilityListeners,sample.kind==='default'?1:2);
 await page.clock.fastForward(65000);assert.deepEqual(await table(chart),record.initialTable);assert.deepEqual(await geometry(plot),frozen);record.longFreeze={durationMs:65000,rawPointsUnchanged:true,pathsAndAxesUnchanged:true,frozenNow:sample.kind==='default'?sample.settings.liveSettings.frozenNow:sample.settings.frozenNow};
 const manual=chart.getByRole('button',{name:'追加一次',exact:true});await manual.focus();await manual.press('Enter');await expect(manual).toBeFocused();await page.clock.runFor(100);
 const appended=await table(chart);assert.equal(appended.length,record.initialTable.length+1);assert.deepEqual(appended.slice(0,-1),record.initialTable);assert(Number(appended.at(-1)[0])>Number(record.initialTable.at(-1)[0]));assert.notDeepEqual((await geometry(plot)).paths,frozen.paths);record.keyboardManual={added:appended.at(-1),preservesPriorRawPoints:true};
 if(mode.motion==='reduce'){
  await expect(chart.getByRole('button',{name:'恢复实时',exact:true})).toBeDisabled();await page.clock.runFor(2200);assert.deepEqual(await table(chart),appended);record.reducedResources=await stopped(page);
  await page.emulateMedia({reducedMotion:'no-preference'});await expect(chart.getByRole('button',{name:'恢复实时',exact:true})).toBeEnabled();await page.clock.runFor(1200);assert.deepEqual(await table(chart),appended);record.explicitUserPauseSurvivesMotionRestore=true;
 }
 if(await details.getAttribute('open')!==null)await details.locator('summary').click();
 await chart.getByRole('button',{name:'恢复实时',exact:true}).click();await plot.scrollIntoViewIfNeeded();await expect(meta).toHaveAttribute('data-live-paused','false');await page.clock.runFor(100);record.runningResources=await oneRunning(page);await page.clock.runFor(1200);assert((await table(chart)).length>appended.length);
 await details.locator('summary').click();await chart.locator('tbody tr').nth(25).scrollIntoViewIfNeeded();await expect.poll(()=>plot.evaluate(node=>node.getBoundingClientRect().bottom<0)).toBe(true);await expect(chart.locator('tbody tr').nth(25)).toBeVisible();await expect(meta).toHaveAttribute('data-live-paused','true');await page.clock.runFor(100);
 const offRows=await table(chart),offPlot=await geometry(plot);record.plotOnlyOffscreenResources=await stopped(page);await page.clock.runFor(2200);assert.deepEqual(await table(chart),offRows);assert.deepEqual(await geometry(plot),offPlot);record.plotOffscreenWhileTableVisible=true;
 await plot.scrollIntoViewIfNeeded();await expect(meta).toHaveAttribute('data-live-paused','false');await page.clock.runFor(1200);await oneRunning(page);
 await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,get:()=>true});document.dispatchEvent(new Event('visibilitychange'));});await expect(meta).toHaveAttribute('data-live-paused','true');await page.clock.runFor(100);const backRows=await table(chart);record.simulatedBackgroundResources=await stopped(page);await page.clock.runFor(2200);assert.deepEqual(await table(chart),backRows);
 await page.evaluate(()=>{delete document.hidden;document.dispatchEvent(new Event('visibilitychange'));});await expect(meta).toHaveAttribute('data-live-paused','false');await page.clock.runFor(1200);await oneRunning(page);record.backgroundMethod='document.hidden + visibilitychange simulation; not OS background';
 await page.emulateMedia({reducedMotion:'reduce'});await expect(meta).toHaveAttribute('data-live-paused','true');await page.clock.runFor(100);const reducedRows=await table(chart);record.runningToReducedResources=await stopped(page);await page.clock.runFor(1200);assert.deepEqual(await table(chart),reducedRows);await page.emulateMedia({reducedMotion:'no-preference'});await expect(meta).toHaveAttribute('data-live-paused','false');await page.clock.runFor(100);record.motionRestoredResources=await oneRunning(page);
 finite(await geometry(plot));await plot.screenshot({path:join(evidence,`${sample.name}-${mode.width}-${mode.motion}-running.png`)});
 await page.evaluate(()=>window.__rainDownloadedRoot.unmount());await expect(main).toHaveCount(0);await page.clock.runFor(100);record.unmountResources=await stopped(page);assert.equal(record.unmountResources.observers,0);assert.equal(record.unmountResources.visibilityListeners,0);record.unmountMethod='Actual createRoot().unmount() after transparent test-only return capture';
}
export async function verifyBrowser({host,evidence,cases,facts,data,port}){
 const base=`http://127.0.0.1:${port}`;facts.base=base;let browser,server,page,serverLog='';const save=()=>writeFileSync(join(evidence,'browser-facts.json'),JSON.stringify(facts,null,2));
 try{
  server=spawn(process.execPath,[join(host,'node_modules/vite/bin/vite.js'),'preview','--outDir','dist-third-batch','--host','127.0.0.1','--port',String(port),'--strictPort'],{cwd:host,stdio:'pipe'});server.stdout.on('data',chunk=>serverLog+=chunk);server.stderr.on('data',chunk=>serverLog+=chunk);
  await expect.poll(async()=>{try{return(await fetch(`${base}/third-batch-${cases[0].name}.html`)).status;}catch{return 0;}},{timeout:15000}).toBe(200);browser=await chromium.launch();
  for(const mode of [{width:1440,motion:'reduce'},{width:390,motion:'no-preference'},{width:1440,motion:'no-preference',liveOnly:true},{width:390,motion:'reduce',liveOnly:true}])for(const sample of cases){
   if(mode.liveOnly&&sample.family!=='live-line')continue;if(facts.checks.some(check=>check.name===sample.name&&check.width===mode.width&&check.motion===mode.motion))continue;
   facts.currentCase={name:sample.name,...mode};save();page=await browser.newPage({viewport:{width:mode.width,height:1000},timezoneId:'Asia/Shanghai',reducedMotion:mode.motion});await page.clock.install({time:new Date('2026-10-11T00:02:00Z')});if(sample.family==='live-line')await installLiveProbe(page);
   page.on('pageerror',error=>facts.pageErrors.push(error.message));page.on('requestfailed',request=>facts.failedRequests.push({url:request.url(),error:request.failure()?.errorText}));page.on('response',response=>{if(response.status()>=400)facts.badResponses.push({url:response.url(),status:response.status()});});page.on('request',request=>{const url=new URL(request.url());if(/^https?:$/.test(url.protocol)&&url.origin!==base&&!facts.externalBrowserOrigins.includes(url.origin))facts.externalBrowserOrigins.push(url.origin);});
   const entry=`third-batch-${sample.name}.html`,url=`${base}/${entry}`,html=await(await fetch(url)).text();assert.equal(hash(html),hash(readFileSync(join(host,'dist-third-batch',entry))),`Served built HTML identity: ${entry}`);await page.goto(url);const main=page.locator('main').first();await expect(main).toBeVisible();const chart=sample.kind==='default'?main.locator(`[data-rain-id="chart-${sample.family}"]`):main;const record={name:sample.name,width:mode.width,motion:mode.motion,url,initialSettings:sample.settings,realDownload:true,servedBuiltHtmlVerified:true};
   if(sample.family==='live-line')await verifyLive(page,main,chart,sample,mode,data,record,evidence);
   else if(sample.settings.state==='invalid'){await expect(chart).toContainText('已拒绝无效数据');await expect(chart.locator('[data-rain-id="ui-chart-candlestick"]')).toHaveCount(0);await expect(chart.getByRole('combobox',{name:'K线示例状态'})).toHaveValue('invalid');record.invalidOHLCRejected=true;await chart.getByRole('combobox',{name:'K线示例状态'}).selectOption('normal');await expect(chart.locator('[data-rain-id="ui-chart-candlestick"]')).toHaveCount(1);await exact(chart);record.restoredTable=await table(chart);assert.deepEqual(record.restoredTable,plain(expectedRows(sample,rawData(sample,data),data)));}
   else{
    const labels={scatter:'散点边界样本','profit-loss':'盈亏线边界样本',candlestick:'K线边界样本'},selector=chart.getByRole('combobox',{name:labels[sample.family]});await expect(selector).toHaveValue(sample.settings.boundaryScenario);await exact(chart);record.initialTable=await table(chart);const raw=rawData(sample,data);assert.deepEqual(record.initialTable,plain(expectedRows(sample,raw,data)),`${sample.name}: precise rows, signs and units`);
    const reader=chart.locator('[data-point-reading]'),reading=reader.getByRole('status'),date=reader.getByRole('combobox',{name:'读取日期'});await expect(date).toHaveCount(1);await expect(date.locator('option')).toHaveCount(raw.length+1);await date.focus();await expect(date).toBeFocused();await date.selectOption(String(raw.at(-1).date.getTime()));await expect(reading).toHaveAttribute('data-point-reading-date',raw.at(-1).date.toISOString());record.lastDateReading=await reading.textContent();
    if(sample.family==='scatter'){const keys=sample.kind==='default'?series:sample.variantId==='scatter-dual-y-axis'?['enrolled','rate']:series.slice(0,2);for(const key of keys)assert(record.lastDateReading.includes(`${raw.at(-1)[key]} ${key==='rate'?'%':'人'}`));record.distinctSelectableDates=new Set(raw.map(row=>row.date.getTime())).size;assert.equal(record.distinctSelectableDates,raw.length);if(sample.variantId==='scatter-small-dots'){record.markerRadii=await chart.locator('svg circle:not(.visx-pattern-circle)').evaluateAll(nodes=>[...new Set(nodes.map(node=>node.getAttribute('r')))]);assert(record.markerRadii.includes('2'));}}
    if(sample.family==='profit-loss'){await date.selectOption(String(raw[0].date.getTime()));record.firstDateReading=await reading.textContent();assert(record.firstDateReading.includes(String(raw[0].value)));assert(!/相对基准变化 -0\.00(?: ·|$)/.test(record.firstDateReading));record.rawSigns=raw.map(row=>row.value);}
    if(sample.family==='candlestick'){record.ohlcValid=raw.every(row=>row.high>=Math.max(row.open,row.close)&&row.low<=Math.min(row.open,row.close));assert(record.ohlcValid);if(sample.settings.boundaryScenario==='candlestick-flat')assert(record.initialTable.every(row=>row[1]===row[4]&&row[5]==='平盘'));}
    await page.clock.runFor(1500);record.geometry=await chart.locator('svg path[d]').evaluateAll(nodes=>nodes.map(node=>({d:node.getAttribute('d'),stroke:node.getAttribute('stroke')})));assert(record.geometry.every(path=>!/NaN|Infinity|undefined/.test(path.d??'')));await chart.screenshot({path:join(evidence,`${sample.name}-${mode.width}-${mode.motion}-initial.png`)});
    await selector.selectOption('normal');record.normalTable=await table(chart);assert.deepEqual(record.normalTable,plain(expectedRows(sample,rawData(sample,data,'normal'),data)));record.normalRestored=true;
    if(sample.kind==='default'){await main.getByRole('button',{name:'更新数据',exact:true}).click();record.updatedNormalTable=await table(chart);assert.deepEqual(record.updatedNormalTable,plain(expectedRows(sample,rawData(sample,data,'normal',1),data)));record.currentRevisionVerified=true;}
   }
   if(sample.family!=='live-line'){record.bounds=await page.evaluate(()=>({pageWidth:document.documentElement.scrollWidth,viewport:innerWidth}));assert(record.bounds.pageWidth<=record.bounds.viewport+1,`${sample.name}: page overflow`);await page.screenshot({path:join(evidence,`${sample.name}-${mode.width}-${mode.motion}-final.png`),fullPage:true});}
   facts.checks.push(record);save();console.log(JSON.stringify({name:sample.name,width:mode.width,motion:mode.motion,status:'passed'}));await page.close();page=null;
  }
 }catch(error){if(page){await page.screenshot({path:join(evidence,'browser-failed.png'),fullPage:true});facts.failureDiagnostics=await page.evaluate(()=>({text:document.body.innerText,resources:window.__downloadLiveResources?.()}));}throw error;}finally{await browser?.close();server?.kill();writeFileSync(join(evidence,'preview.log'),serverLog);save();}
}
