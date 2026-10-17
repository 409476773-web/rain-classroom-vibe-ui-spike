import { expect } from '@playwright/test';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

export const run='evidence/runtime/chart-curve-refinement-2026-10-11';
export const sourcePaths=[
 'apps/playground/src/docs/components/chart-data.ts','apps/playground/src/docs/components/chart-examples.tsx',
 'apps/playground/src/docs/components/chart-variants/trend.tsx','apps/playground/src/docs/components/chart-business/mini-data.ts',
 'apps/playground/src/docs/components/chart-variants/shared.tsx',
 'apps/playground/src/docs/components/chart-business/category-examples.tsx','apps/playground/src/docs/components/chart-business/category-page.tsx',
 'apps/playground/src/docs/components/chart-business/comparison-data.ts',
 'apps/playground/src/docs/components/chart-business/mini-examples.tsx','apps/playground/src/docs/components/chart-business/mini-layout.ts',
 'packages/ui/src/charts/vendor/charts/line.tsx','packages/ui/src/charts/vendor/charts/area.tsx',
 'packages/ui/src/charts/vendor/charts/series-path-utils.ts','packages/ui/src/charts/vendor/charts/time-series-chart-shell.tsx',
 'apps/playground/src/docs/components/chart-examples.css','apps/playground/src/docs/components/chart-business/chart-business.css',
 'packages/ui/src/charts/recipes.css','packages/ui/src/charts/styles.css',
];
export async function hashSources(){const all=await Promise.all(sourcePaths.map(async path=>{try{return{path,sha256:createHash('sha256').update(await readFile(path)).digest('hex')}}catch(error){if(error.code==='ENOENT')return{path,missing:true};throw error}}));return all;}
export async function observed(host){return host.evaluate(node=>{
 const rect=el=>{const b=el.getBoundingClientRect();return{x:b.x,y:b.y,width:b.width,height:b.height}};
 const matrix=m=>m?{a:m.a,b:m.b,c:m.c,d:m.d,e:m.e,f:m.f}:null;
 const paths=[...node.querySelectorAll('svg path[d]')].filter(p=>{const s=getComputedStyle(p),d=p.getAttribute('d')??'';return d&&s.stroke!=='none'&&s.stroke!=='rgba(0, 0, 0, 0)'&&s.stroke!=='transparent'&&parseFloat(s.strokeWidth)>0&&parseFloat(s.opacity)>0&&p.getBBox().width>0}).map(p=>{
  const s=getComputedStyle(p),d=p.getAttribute('d'),length=p.getTotalLength(),points=Array.from({length:513},(_,i)=>{const q=p.getPointAtLength(length*i/512);return{x:q.x,y:q.y}});
  const subpaths=(d.match(/M/gi)??[]).length;
  let previous=0,extrema=0;for(let i=1;i<points.length;i++){const dy=points[i].y-points[i-1].y;const direction=Math.abs(dy)<0.0001?0:Math.sign(dy);if(direction&&previous&&direction!==previous)extrema++;if(direction)previous=direction;}
  return{d,length,subpaths,extrema,xMonotone:points.every((q,i)=>!i||q.x>=points[i-1].x-0.001),stroke:s.stroke,strokeWidth:s.strokeWidth,strokeOpacity:s.strokeOpacity,fill:s.fill,fillOpacity:s.fillOpacity,opacity:s.opacity,filter:s.filter,dasharray:s.strokeDasharray,box:rect(p),ctm:matrix(p.getScreenCTM()),points};
 });
 const fills=[...node.querySelectorAll('svg path[d]')].filter(p=>getComputedStyle(p).fill!=='none'&&p.getBBox().width>0).map(p=>{const s=getComputedStyle(p);return{fill:s.fill,fillOpacity:s.fillOpacity,opacity:s.opacity,d:p.getAttribute('d'),box:rect(p)}});
 const textStyle=[...node.querySelectorAll('text,.rain-chart-legend-button,span.text-chart-label')].map(n=>{const s=getComputedStyle(n);return{text:n.textContent,fontFamily:s.fontFamily,fontSize:s.fontSize,fontWeight:s.fontWeight,color:s.color,fill:s.fill}});
 const legends=[...node.querySelectorAll('.rain-chart-legend-button,.rain-chart-variant-legend-item')].map(n=>n.textContent);
 const dateLabels=[...node.querySelectorAll('span.text-chart-label')].filter(n=>n.parentElement.style.bottom==='12px').map(n=>n.textContent);
 const table=[...node.querySelectorAll('tbody tr')].map(n=>n.textContent);
 const svgs=[...node.querySelectorAll('svg')].map(n=>({width:n.getAttribute('width'),height:n.getAttribute('height'),box:rect(n)}));
 return{box:rect(node),paths,fills,textStyle,legends,dateLabels,table,svgs,documentWidth:document.documentElement.scrollWidth,viewportWidth:innerWidth,finite:paths.every(p=>!p.d.includes('NaN')&&!p.d.includes('Infinity')&&p.points.every(q=>Number.isFinite(q.x)&&Number.isFinite(q.y)))};
})}
export async function settled(host,{minimumMs=1800}={}){
 await host.scrollIntoViewIfNeeded();await expect(host.locator('svg').first()).toBeVisible();
 let previous=null,stable=0,latest=null;const started=Date.now();
 await expect(async()=>{latest=await observed(host);const signature=JSON.stringify({d:latest.paths.map(p=>p.d),fills:latest.fills.map(p=>p.d),boxes:latest.svgs,colors:latest.paths.map(p=>[p.stroke,p.strokeWidth,p.opacity])});stable=signature===previous?stable+1:0;previous=signature;expect(stable).toBeGreaterThanOrEqual(3);expect(Date.now()-started).toBeGreaterThanOrEqual(minimumMs);}).toPass({timeout:10000,intervals:[100]});
 if(!latest)throw new Error('No chart geometry snapshot');return latest;
}
export async function capture(page,host,id,folder,{wholePage=false}={}){
 await page.mouse.move(0,0);await page.evaluate(()=>document.fonts.ready);const facts=await settled(host);
 await mkdir(folder,{recursive:true});await host.screenshot({path:`${folder}/${id}-host.png`,animations:'disabled'});
 const plot=host.locator('.rain-chart-plot, .rain-chart-mini-plot, .rain-business-mini-gallery').first();if(await plot.count())await plot.screenshot({path:`${folder}/${id}-plot.png`,animations:'disabled'});
 if(wholePage){await page.screenshot({path:`${folder}/${id}-viewport.png`,animations:'disabled'});await page.screenshot({path:`${folder}/${id}-page.png`,fullPage:true,animations:'disabled'});}
 await writeFile(`${folder}/${id}.json`,JSON.stringify(facts,null,2));return facts;
}
