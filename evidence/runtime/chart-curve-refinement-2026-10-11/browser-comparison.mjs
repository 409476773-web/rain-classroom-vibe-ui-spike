import { readFile, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const run='evidence/runtime/chart-curve-refinement-2026-10-11';
const before=JSON.parse(await readFile(`${run}/browser-before/facts.json`,'utf8'));
const after=JSON.parse(await readFile(`${run}/browser-after/facts.json`,'utf8'));
const paint=value=>value.replace(/url\([^)]+\)/g,'url(<instance-paint>)');
const styles=facts=>({
 strokes:facts.paths.map(p=>[paint(p.stroke),p.strokeWidth,p.strokeOpacity,p.opacity,p.dasharray]).sort(),
 visibleFills:facts.fills.filter(p=>!['none','transparent','rgba(0, 0, 0, 0)'].includes(p.fill)).map(p=>[paint(p.fill),p.fillOpacity,p.opacity]).sort(),
 typography:[...new Set(facts.textStyle.map(p=>JSON.stringify([p.fontFamily,p.fontSize,p.fontWeight,p.color,p.fill])))].sort(),
 legends:facts.legends,dateLabels:facts.dateLabels,
 svgSizes:facts.svgs.map(p=>[p.width,p.height,p.box.width,p.box.height]),
});
assert.equal(before.status,'captured-source-frozen');assert.equal(after.status,'captured-source-frozen');
assert.deepEqual(before.captures.map(p=>p.id),after.captures.map(p=>p.id));
const comparisons=[];
for(const item of before.captures){
 const a=JSON.parse(await readFile(`${run}/browser-before/${item.id}.json`,'utf8'));
 const b=JSON.parse(await readFile(`${run}/browser-after/${item.id}.json`,'utf8'));
 assert.deepEqual(styles(b),styles(a),`${item.id}: protected presentation`);
 assert.equal(a.paths.length,b.paths.length,`${item.id}: visible native path count`);
 assert.equal(a.table.length,b.table.length,`${item.id}: original row count`);
 if(item.id.startsWith('default-line-')||item.id.startsWith('default-area-')||item.id.includes('official-area-default')||item.id.includes('markers-dashed-tail'))assert.deepEqual(b.table,a.table,`${item.id}: exact date/count rows`);
 assert.ok(b.finite&&b.documentWidth<=b.viewportWidth+1,`${item.id}: finite geometry and document width`);
 comparisons.push({id:item.id,protectedPresentation:true,rowCount:b.table.length,pathCount:b.paths.length,
  paths:b.paths.map((path,index)=>({index,changed:path.d!==a.paths[index].d,beforeExtrema:a.paths[index].extrema,afterExtrema:path.extrema,subpaths:path.subpaths,stroke:path.stroke,strokeWidth:path.strokeWidth,xMonotone:path.xMonotone})),
 });
}
const output={status:'passed',captures:comparisons.length,beforePageErrors:before.errors,afterPageErrors:after.errors,
 sourceFrozenBefore:before.sourceFrozen,sourceFrozenAfter:after.sourceFrozen,
 method:'Comparison of actual browser-rendered SVG and computed paint; no synthetic path generation. Invisible fill:none and fully transparent fills are equivalent. Rate text precision is an authorized change; date/count row checks remain exact for the other representatives.',comparisons};
await writeFile(`${run}/browser-comparison.json`,JSON.stringify(output,null,2));
console.log(JSON.stringify({status:output.status,captures:output.captures,changedNativePaths:comparisons.reduce((sum,c)=>sum+c.paths.filter(p=>p.changed).length,0),errors:before.errors.length+after.errors.length}));
