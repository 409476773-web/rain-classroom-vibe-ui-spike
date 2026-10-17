import {chromium} from '@playwright/test';
import {createHash} from 'node:crypto';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

// Read-only raster stability diagnosis. No masks, CSS injection or style changes.
const repo=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const out=resolve(repo,'evidence/runtime/navigation-v042/w5/stability',new Date().toISOString().replace(/[:.]/g,'-'));await mkdir(out,{recursive:true});
const hash=x=>createHash('sha256').update(x).digest('hex');
const files=['apps/playground/src/recipes/navigation-v042/r4-r6.tsx','apps/playground/src/recipes/navigation-v042/r4-r6.css','apps/playground/src/recipes/navigation-v042/workspace-states.tsx','apps/playground/src/recipes/navigation-v042/workspace-states.css','packages/layouts/src/workspace.tsx','packages/layouts/src/workspace.css'];
files.push('packages/layouts/src/workspace-state.ts');
const hashes=async()=>Object.fromEntries(await Promise.all(files.map(async f=>[f,hash(await readFile(resolve(repo,f)))])));
const write=(n,d)=>writeFile(resolve(out,n),typeof d==='string'?d:JSON.stringify(d,null,2),{flag:'wx'});
const report={kind:'unmasked-natural-consecutive-frame-diagnostic',sourceBefore:await hashes(),approved:false,cases:[],errors:[],consoleErrors:[]};
const b=await chromium.launch();report.browser=b.version();
for(const c of [{id:'S4-grading',sample:'S4',width:1440},...[1200,1440,1600].map(width=>({id:'R4-grading',sample:'R4',width})),{id:'R6-board',sample:'R6',width:1440}].filter(c=>!process.env.RAIN_STABILITY_CASES||process.env.RAIN_STABILITY_CASES.split(',').includes(c.id))){
 const p=await b.newPage({viewport:{width:c.width===1600?1800:1600,height:1100},deviceScaleFactor:1,reducedMotion:'reduce',locale:'zh-CN'});p.on('pageerror',e=>report.errors.push(String(e)));p.on('console',e=>{if(e.type()==='error')report.consoleErrors.push(e.text());});
 await p.goto(`http://127.0.0.1:5198/?sample=${c.sample}#navigation-v042`,{waitUntil:'networkidle'});await p.getByLabel('画板宽度').selectOption(String(c.width));if(c.sample==='R6')await p.getByRole('tab',{name:'状态分组',exact:true}).click();else await p.getByLabel('业务子场景').selectOption('grading');
 const root=p.locator(c.sample==='S4'?'.nv42-review-canvas > .nv44-shared > .rain-workspace':'.nv42-review-canvas > .nv5-workspace').first();await root.waitFor({state:'visible'});await p.evaluate(()=>document.fonts.ready);await root.scrollIntoViewIfNeeded();await p.mouse.move(0,0);await p.waitForTimeout(900);
 const snapshots=[],tag=c.id+'-'+c.width;
 for(let frame=1;frame<=5;frame++){
  const state=await root.evaluate(root=>{const rect=e=>{const r=e.getBoundingClientRect();return{x:r.x,y:r.y,width:r.width,height:r.height};};const props=['display','width','height','padding','border','borderRadius','background','backgroundColor','color','boxShadow','outline','opacity','transform','filter','backdropFilter','animationName','animationDuration','animationDelay','animationPlayState','transitionProperty','transitionDuration','transitionDelay'];const cs=(e,pseudo=null)=>Object.fromEntries(props.map(k=>[k,getComputedStyle(e,pseudo)[k]]));return{rect:rect(root),activeElement:document.activeElement?.outerHTML.slice(0,500),elements:[...root.querySelectorAll('.nv5-grade-comment,.nv5-grade-comment textarea,.nv5-grade-form,.nv5-review,.nv5-kanban,.nv5-kanban>section,.nv5-kanban article,.nv5-kanban [data-slot="label"]')].map(e=>({tag:e.tagName,class:e.className,rect:rect(e),focused:e.matches(':focus'),focusWithin:e.matches(':focus-within'),hovered:e.matches(':hover'),styles:cs(e),before:cs(e,'::before'),after:cs(e,'::after')}))};});
  const clip={x:Math.round(state.rect.x),y:Math.floor(state.rect.y),width:Math.round(state.rect.width),height:Math.round(state.rect.height)};const png=tag+'-frame'+frame+'.png';state.png=png;state.hash=hash(await p.screenshot({path:resolve(out,png),clip,animations:'disabled'}));await write(tag+'-frame'+frame+'.json',state);snapshots.push(state);await p.waitForTimeout(250);
 }
 const stablePairs=snapshots.slice(1).flatMap((s,i)=>s.hash===snapshots[i].hash?[{frames:[i+1,i+2],hash:s.hash,pngs:[snapshots[i].png,s.png]}]:[]);
 const fingerprints=snapshots.map(s=>hash(JSON.stringify({rect:s.rect,activeElement:s.activeElement,elements:s.elements})));
 const result={...c,hashes:snapshots.map(s=>s.hash),stablePairs,finalStablePair:stablePairs.at(-1)||null,computedAndGeometryStable:fingerprints.every(x=>x===fingerprints[0]),diagnosticFingerprints:fingerprints};report.cases.push(result);console.log(JSON.stringify(result));await p.close();
}
await b.close();report.sourceAfter=await hashes();report.codeUnchanged=JSON.stringify(report.sourceBefore)===JSON.stringify(report.sourceAfter);await write('stability-report.json',report);console.log(`EVIDENCE ${out}`);if(!report.codeUnchanged||report.errors.length||report.consoleErrors.length)process.exitCode=1;
