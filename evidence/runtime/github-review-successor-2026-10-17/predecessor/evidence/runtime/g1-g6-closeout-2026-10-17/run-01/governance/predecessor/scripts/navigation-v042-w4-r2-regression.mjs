import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

// Read-only developer capture of the accepted R2 composition after controller integration.
const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pack = resolve(repo, '../../rain-classroom-vibe-ui-spike/docs/rain-navigation-codex-workpack');
const source = resolve(pack, 'reference/approved-v0.4.2.html');
const hash = b => createHash('sha256').update(b).digest('hex');
const sourceHash = hash(await readFile(source));
assert.equal(sourceHash, JSON.parse(await readFile(resolve(pack, 'contracts/baseline-decision.json'), 'utf8')).sha256);
const out = resolve(repo, 'evidence/runtime/navigation-v042/w4/r2-regression', new Date().toISOString().replace(/[:.]/g, '-'));
await mkdir(out, { recursive: true });
const write = (name, value) => writeFile(resolve(out, name), typeof value === 'string' ? value : JSON.stringify(value, null, 2), { flag: 'wx' });
const files = ['apps/playground/src/recipes/navigation-v042/r2.tsx', 'apps/playground/src/recipes/navigation-v042/r2.css', 'packages/layouts/src/workspace.tsx', 'packages/layouts/src/workspace.css'];
const hashes = async () => Object.fromEntries(await Promise.all(files.map(async f => [f, hash(await readFile(resolve(repo, f)))])));
const report = { kind: 'R2-controller-visual-regression-only', approved: false, sourceHash, sourceBefore: await hashes(), errors: [], consoleErrors: [], cases: [], oldEvidence: resolve(repo, 'evidence/runtime/navigation-v042/review-08/after') };
const browser = await chromium.launch(); report.browser = browser.version();
const page = await browser.newPage({ viewport: { width: 1600, height: 1100 }, deviceScaleFactor: 1, locale: 'zh-CN', reducedMotion: 'reduce' });
page.on('pageerror', e => report.errors.push(String(e))); page.on('console', e => { if (e.type() === 'error') report.consoleErrors.push(e.text()); });
const sourceSelectors = ['.prototype','.vr-bar','.rail','.contextnav','.vr-splitter','.cs-host','.cs-row','.cs-panel','.page-top','.sheet-content','.rail-logo','.rail-bottom'];
const candidateSelectors = ['.nv42-r2','.nv42-workspace-bar','.nv42-rail','.nv42-context','.rain-workspace__splitter','.rain-connected-surface','.rain-connected-surface__row','.rain-connected-surface__panel','.nv42-page-top','.nv42-sheet-content','.nv42-brand','.nv42-rail-footer','.nv42-main'];
const properties = ['fontFamily','fontSize','fontWeight','lineHeight','color','backgroundColor','padding','gap','borderRadius','borderLeft','transform','transitionDuration','transitionProperty','transitionTimingFunction','width','height','display','opacity'];
const settle = async p => { await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(350); await p.mouse.move(0,0); await p.evaluate(() => new Promise(done => requestAnimationFrame(() => requestAnimationFrame(done)))); };
async function capture(p, target, name, selectors) {
 await settle(p); await target.scrollIntoViewIfNeeded();
 const data = await target.evaluate((root, { selectors, properties }) => {
  const rect = e => { const r=e.getBoundingClientRect(); return {x:r.x,y:r.y,width:r.width,height:r.height}; };
  return { rect:rect(root), measurements:selectors.flatMap(selector => [...(root.matches(selector)?[root]:[]),...root.querySelectorAll(selector)].slice(0,12).map((e,index)=>({selector,index,text:e.textContent.trim().slice(0,100),rect:rect(e),styles:Object.fromEntries(properties.map(k=>[k,getComputedStyle(e)[k]])),before:Object.fromEntries(properties.map(k=>[k,getComputedStyle(e,'::before')[k]])),attributes:Object.fromEntries([...e.attributes].map(a=>[a.name,a.value]))}))) };
 }, { selectors, properties });
 const clip = {x:Math.round(data.rect.x),y:Math.floor(data.rect.y),width:Math.round(data.rect.width),height:Math.round(data.rect.height)};
 const png=resolve(out,`${name}.png`);data.screenshotHash=hash(await p.screenshot({path:png,clip,animations:'disabled'}));
 await settle(p);data.repeatedScreenshotHash=hash(await p.screenshot({path:resolve(out,`${name}-pass2.png`),clip,animations:'disabled'}));data.stable=data.screenshotHash===data.repeatedScreenshotHash;
 assert(data.stable,`unstable ${name}`);await write(`${name}.json`,data);await write(`${name}.fragment.html`,await target.evaluate(e=>e.outerHTML));return {data,png};
}
function compare(a,b,name) {
 const result=spawnSync('python3',[resolve(pack,'tools/compare_renders.py'),a,b,'--out',resolve(out,`${name}-comparison`)],{encoding:'utf8'});
 assert.equal(result.status,0,result.stderr);return { exitCode: result.status, output: result.stdout.trim() };
}
function oldNativeCrop(name,width,height) {
 const input=resolve(report.oldEvidence,`${name}.png`),output=resolve(out,`review08-${name}-native-crop.png`);
 const result=spawnSync('python3',['-c','from PIL import Image; import sys; im=Image.open(sys.argv[1]); w,h=map(int,sys.argv[3:]); assert im.width>=w and im.height>=h; im.crop((0,0,w,h)).save(sys.argv[2])',input,output,String(width),String(height)],{encoding:'utf8'});
 assert.equal(result.status,0,result.stderr);return output;
}
async function frozenReference(width,expanded) {
 const p=await browser.newPage({viewport:{width:1600,height:1100},deviceScaleFactor:1,locale:'zh-CN',reducedMotion:'reduce'});p.on('pageerror',e=>report.errors.push(String(e)));
 try {
  await p.goto('http://127.0.0.1:5199/reference/approved-v0.4.2.html',{waitUntil:'load'});await p.waitForFunction(()=>window.YKT_DEBUG);
  await p.evaluate(width=>{YKT_DEBUG.navigate('R2');if(typeof vClearTransientSession==='function')vClearTransientSession();if(typeof visibilityStore!=='undefined')delete visibilityStore[vKey()];configs[current]={...defaults,...cfg(),preset:'brand',density:'regular',contour:'rounded',polish:'refined',connectionRevision:'current',inspect:'native',viewport:width,frameHeight:800};render();document.body.classList.add('standalone');resizeScene();},width);
  if(expanded)await p.locator('.rail').getByRole('button',{name:'展开平台导航',exact:true}).click();
  return await capture(p,p.locator('.prototype'),`R2-${expanded?'expanded':'default'}-${width}-reference`,sourceSelectors);
 } finally {await p.close();}
}
async function recordMotion(p, label, firstClick, secondClick) {
 await p.evaluate(()=>{window.__brandNode=document.querySelector('.nv42-brand');window.__brandText=document.querySelector('.nv42-brand strong');});
 const framesPromise=p.evaluate(()=>new Promise(resolve=>{const frames=[],start=performance.now();function step(){const rail=document.querySelector('.nv42-rail'),logo=document.querySelector('.nv42-brand .rain-icon'),text=document.querySelector('.nv42-brand strong'),slot=document.querySelector('[data-region-slot="global"]');const r=rail.getBoundingClientRect(),l=logo.getBoundingClientRect();frames.push({time:performance.now()-start,width:r.width,slotWidth:slot.getBoundingClientRect().width,logoX:l.x,logoY:l.y,opacity:+getComputedStyle(text).opacity});if(performance.now()-start<900)requestAnimationFrame(step);else resolve(frames);}requestAnimationFrame(step);}));
 await firstClick();if(secondClick){await p.waitForTimeout(80);await secondClick();}
 const frames=await framesPromise;const sameNodes=await p.evaluate(()=>window.__brandNode===document.querySelector('.nv42-brand')&&window.__brandText===document.querySelector('.nv42-brand strong'));
 assert(sameNodes,`${label} replaced brand nodes`);const intermediate=frames.filter(f=>f.width>64.25&&f.width<207.75);assert(intermediate.length>1,`${label} no measured intermediate motion`);
 return {frames,sameNodes,intermediateFrames:intermediate.length,maxAdjacentLogoDelta:Math.max(...frames.slice(1).map((f,i)=>Math.abs(f.logoY-frames[i].logoY))),first:frames[0],last:frames.at(-1)};
}
try {
 await page.goto('http://127.0.0.1:5198/#navigation-v042',{waitUntil:'networkidle'});
 await page.getByRole('navigation',{name:'导航候选样本'}).getByRole('button',{name:'R2',exact:true}).click();
 const root=page.locator('[data-rain-id="recipe-navigation-r2"]'),rail=root.getByRole('navigation',{name:'平台导航',exact:true});
 for(const [width,expanded] of [[1200,false],[1440,false],[1440,true]]){
  await page.getByLabel('画板宽度').selectOption(String(width));if(expanded)await rail.getByRole('button',{name:'展开平台导航',exact:true}).click();
  const name=`R2-${expanded?'expanded':'default'}-${width}`;const candidate=await capture(page,root,`${name}-candidate`,candidateSelectors);const reference=await frozenReference(width,expanded);
  const geometry=sourceSelectors.slice(0,10).map((selector,i)=>{const from=reference.data.measurements.find(m=>m.selector===selector),to=candidate.data.measurements.find(m=>m.selector===candidateSelectors[i]);if(!from||!to)return {selector,missing:true};const local=(r,origin)=>({...r,x:r.x-origin.x,y:r.y-origin.y});const a=local(from.rect,reference.data.rect),b=local(to.rect,candidate.data.rect);return{source:selector,candidate:candidateSelectors[i],reference:a,current:b,delta:Object.fromEntries(Object.keys(a).map(k=>[k,+(b[k]-a[k]).toFixed(4)]))};});
  await write(`${name}-geometry.json`,geometry);const pair={name,stable:true,reference:reference.png,candidate:candidate.png,metrics:compare(reference.png,candidate.png,name)};
  const boundary=candidate.data.measurements.find(m=>m.selector==='.rain-workspace__splitter');assert.equal(boundary.rect.width,5);pair.splitterWidth=boundary.rect.width;
  if(width===1440){const railCapture=await capture(page,root.locator('.nv42-rail'),`${name}-rail`,candidateSelectors);const oldRail=oldNativeCrop(expanded?'expanded-rail':'compact-rail',Math.round(railCapture.data.rect.width),Math.round(railCapture.data.rect.height));pair.review08Rail=compare(oldRail,railCapture.png,`${name}-review08-rail`);if(expanded){const oldFrame=oldNativeCrop('R2-expanded',1440,800);pair.review08Frame=compare(oldFrame,candidate.png,`${name}-review08-frame`);}}
  report.cases.push(pair);console.log(JSON.stringify({name,splitterWidth:pair.splitterWidth,stable:true}));
 }
 await page.emulateMedia({reducedMotion:'no-preference'});await rail.getByRole('button',{name:'收起平台导航',exact:true}).click();await settle(page);
 report.motion={opening:await recordMotion(page,'opening',()=>rail.getByRole('button',{name:'展开平台导航',exact:true}).click())};assert(Math.abs(report.motion.opening.last.width-208)<.01);
 report.motion.closing=await recordMotion(page,'closing',()=>rail.getByRole('button',{name:'收起平台导航',exact:true}).click());assert(Math.abs(report.motion.closing.last.width-64)<.01);
 report.motion.rapidReverse=await recordMotion(page,'rapid-reverse',()=>rail.getByRole('button',{name:'展开平台导航',exact:true}).click(),()=>rail.getByRole('button',{name:'收起平台导航',exact:true}).click({force:true}));assert(Math.abs(report.motion.rapidReverse.last.width-64)<.01);
 await page.emulateMedia({reducedMotion:'reduce'});await rail.getByRole('button',{name:'展开平台导航',exact:true}).click();await settle(page);
 report.motion.reducedMotion=await root.locator('.nv42-brand').evaluate(e=>({brandDuration:getComputedStyle(e).transitionDuration,railDuration:getComputedStyle(document.querySelector('.nv42-rail')).transitionDuration,slotDuration:getComputedStyle(document.querySelector('[data-region-slot="global"]')).transitionDuration}));assert(Object.values(report.motion.reducedMotion).every(v=>v.split(',').every(d=>parseFloat(d)===0)));
} catch(error){report.failure=String(error);console.error(error);process.exitCode=1;}
finally{report.sourceAfter=await hashes();report.sourceUnchangedDuringCapture=JSON.stringify(report.sourceBefore)===JSON.stringify(report.sourceAfter);report.frozenReferenceUnchanged=hash(await readFile(source))===sourceHash;await write('regression-report.json',report);await browser.close();console.log(`EVIDENCE ${out}`);}
if(report.errors.length||report.consoleErrors.length||!report.frozenReferenceUnchanged)process.exitCode=1;
