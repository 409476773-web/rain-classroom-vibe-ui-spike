import assert from 'node:assert/strict';
import {chromium, firefox, webkit} from '@playwright/test';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const out=resolve(root,'evidence/runtime/navigation-v042/w7/matrix',new Date().toISOString().replace(/[:.]/g,'-'));await mkdir(out,{recursive:true});
const accepted=JSON.parse(await readFile(resolve(root,'evidence/runtime/navigation-v042/g2-acceptance-13/current-source-final.json'),'utf8'));
const lineage=JSON.parse(await readFile(resolve(root,'evidence/runtime/navigation-v042/w7/repair-source-lineage.json'),'utf8'));
const expectedFiles={...accepted.filesSha256,...lineage.filesSha256};
const hash=b=>createHash('sha256').update(b).digest('hex');
const unchanged=async()=>{const changes=[];for(const [file,value] of Object.entries(expectedFiles))if(hash(await readFile(resolve(root,file)))!==value)changes.push(file);return changes;};
const report={kind:'fresh-render-geometry-browser-matrix-and-contrast-audit',startedAt:new Date().toISOString(),humanApproved:false,contrastOnly:process.env.RAIN_W7_CONTRAST_ONLY==='1',currentSourceBefore:await unchanged(),historicalG2Differences:Object.keys(lineage.filesSha256),behaviorRepairLineage:'evidence/runtime/navigation-v042/w7/repair-source-lineage.json',cases:[],errors:[],contrastStatus:'measured-separately-no-acceptance',limits:['Headless WebKit is not actual Safari','VoiceOver and Windows font rendering not run','Rendered matrix is not a Human Gate or pixel-parity approval']};
assert.deepEqual(report.currentSourceBefore,[],'Current sources must match the historical G2 baseline plus documented W7 repair');
const scenes=[['R1','plan'],['R1','industry'],['R2'],['R3','files'],['R3','errors'],['R4','interaction'],['R4','grading'],['R5'],['R6'],...['S1','S2','S3','S4','S5','S6'].map(id=>[id]),['S4','grading']];
for(const [engine,launcher] of Object.entries({chromium,firefox,webkit})){
 if(process.env.RAIN_W7_ENGINES&&!process.env.RAIN_W7_ENGINES.split(',').includes(engine))continue;
 let browser;try{browser=await launcher.launch();}catch(error){report.errors.push({engine,launch:String(error)});continue;}
 for(const dpr of [1,2]){
  if(process.env.RAIN_W7_CONTRAST_ONLY==='1'&&dpr===2)continue;
  const page=await browser.newPage({viewport:{width:1840,height:1160},deviceScaleFactor:dpr,locale:'zh-CN',reducedMotion:'reduce'});page.on('pageerror',error=>report.errors.push({engine,error:String(error)}));
  for(const [sample,subscene] of scenes){
   if(sample.startsWith('S')&&dpr===2)continue;
   try{
    await page.goto(`http://127.0.0.1:5198/?sample=${sample}#navigation-v042`);if(subscene)await page.getByLabel('业务子场景').selectOption(subscene);await page.evaluate(()=>document.fonts.ready);
    const canvas=page.getByTestId('candidate-canvas');
    for(const width of [1200,1440,1600])for(const inverse of [false,true]){
     if(sample.startsWith('S')&&inverse)continue;
     const id=[engine,'dpr'+dpr,sample,subscene??'default',width,inverse?'inverse':'light'].join('-');
     try{
      await page.getByLabel('画板宽度').selectOption(String(width));await page.getByRole('checkbox',{name:'深色外框',exact:true}).setChecked(inverse);await canvas.scrollIntoViewIfNeeded();await page.mouse.move(0,0);
      const facts=await canvas.evaluate(element=>{
       const rect=e=>{const r=e.getBoundingClientRect();return{x:r.x,y:r.y,width:r.width,height:r.height};};
       const work=element.querySelector('.rain-workspace');if(!work)throw Error('No real Workspace consumer');
       const visible=e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return r.width>0&&r.height>0&&s.visibility!=='hidden'&&!e.closest('[hidden]')&&(()=>{for(let p=e;p;p=p.parentElement)if(getComputedStyle(p).opacity==='0')return false;return true;})();};
       const parse=v=>{const n=v.match(/[\d.]+/g)?.map(Number)??[];const k=v.startsWith('color(srgb ')?255:1;return[(n[0]??0)*k,(n[1]??0)*k,(n[2]??0)*k,n[3]??1];};
       const blend=(a,b)=>[0,1,2].map(i=>a[i]*a[3]+b[i]*(1-a[3])).concat(1);
       const lum=a=>{const c=a.slice(0,3).map(x=>{const v=x/255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4;});return c[0]*.2126+c[1]*.7152+c[2]*.0722;};
       const texts=[...work.querySelectorAll('*')].filter(e=>visible(e)&&[...e.childNodes].some(n=>n.nodeType===Node.TEXT_NODE&&n.textContent.trim())).map(e=>{
        let bg=[255,255,255,1],contributingImage=false;const ancestors=[];for(let p=e;p;p=p.parentElement)ancestors.unshift(p);for(const p of ancestors){const s=getComputedStyle(p),color=parse(s.backgroundColor);if(color[3]===1)contributingImage=false;if(s.backgroundImage!=='none')contributingImage=true;bg=blend(color,bg);}
        const unsupportedPaint=contributingImage||ancestors.some(p=>getComputedStyle(p).opacity!=='1');const s=getComputedStyle(e),fg=blend(parse(s.color),bg),l=[lum(fg),lum(bg)].sort((a,b)=>b-a),ratio=(l[0]+.05)/(l[1]+.05);const large=parseFloat(s.fontSize)>=24||(parseFloat(s.fontSize)>=18.66&&parseInt(s.fontWeight)>=700);
        return{measurement:unsupportedPaint?'unmeasured-background-image-or-opacity':'solid-css-color-estimate',text:e.textContent.trim().slice(0,70),tag:e.tagName,class:e.className,ratio:+ratio.toFixed(3),required:large?3:4.5,color:s.color,background:bg,fontSize:s.fontSize,fontWeight:s.fontWeight};
       });
       return{rect:rect(element),workspaceRect:rect(work),fonts:document.fonts.status,restoreCount:work.querySelectorAll('.rain-workspace__restore').length,regions:[...work.querySelectorAll('[data-region-id]')].filter(e=>e.classList.contains('rain-workspace__region')).map(e=>({id:e.getAttribute('data-region-id'),mode:e.getAttribute('data-mode'),temporary:e.getAttribute('data-temporary'),rect:rect(e)})),svgInvalid:[...work.querySelectorAll('svg path')].some(e=>/NaN|Infinity|undefined/.test(e.getAttribute('d')??'')),contrast:{method:'CSS foreground/background composition; gradient/image/opacity text excluded and reported separately',measured:texts.filter(t=>t.measurement==='solid-css-color-estimate').length,unmeasured:texts.filter(t=>t.measurement!=='solid-css-color-estimate'),belowThreshold:texts.filter(t=>t.measurement==='solid-css-color-estimate'&&t.ratio<t.required),minimum:Math.min(...texts.filter(t=>t.measurement==='solid-css-color-estimate').map(t=>t.ratio))}};
      });
      assert.equal(Math.round(facts.rect.width),width);assert.equal(Math.round(facts.workspaceRect.width),width);assert.equal(facts.svgInvalid,false);assert(facts.restoreCount>0);assert(facts.workspaceRect.height>300);
      if(process.env.RAIN_W7_CONTRAST_ONLY!=='1')await canvas.screenshot({path:resolve(out,id+'.png'),animations:'disabled'});await writeFile(resolve(out,id+'.json'),JSON.stringify(facts,null,2));report.cases.push({id,engine,browserVersion:browser.version(),sample,subscene,width,inverse,dpr,passed:true,screenshot:id+'.png',facts:id+'.json',contrastBelowThreshold:facts.contrast.belowThreshold.length});
     }catch(error){report.cases.push({id,passed:false,error:String(error)});}
    }
   }catch(error){report.errors.push({engine,sample,subscene,dpr,error:String(error)});}
  }
  await page.close();
 }
 await browser.close();console.log(engine+' matrix captured');
}
report.currentSourceAfter=await unchanged();report.finishedAt=new Date().toISOString();report.passed=report.cases.filter(c=>c.passed).length;report.failed=report.cases.filter(c=>!c.passed).length;await writeFile(resolve(out,'report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({out,passed:report.passed,failed:report.failed,errors:report.errors.length,currentSourceChanges:report.currentSourceAfter}));if(report.failed||report.errors.length||report.currentSourceAfter.length)process.exitCode=1;
