import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { runInNewContext } from 'node:vm';
import { parseSync } from 'vite';
const root=process.cwd(), run=join(root,'evidence/runtime/chart-demo-data-expansion-2026-10-11'), before=join(run,'before');
const dir='apps/playground/src/docs/components';
const read=path=>readFileSync(path,'utf8');
const hash=value=>createHash('sha256').update(value).digest('hex');
const plain=value=>JSON.parse(JSON.stringify(value));
const same=(a,b,message)=>assert.deepEqual(plain(a),plain(b),message);
const list=node=>{ const out=[]; const walk=v=>{ if(!v||typeof v!=='object')return; if(v.type)out.push(v); Object.entries(v).forEach(([k,c])=>{if(!['start','end','loc'].includes(k))Array.isArray(c)?c.forEach(walk):walk(c)});};walk(node);return out;};
const sourceFiles=['chart-data.ts','chart-examples.tsx','chart-variants/trend.tsx','chart-variants/bar.tsx','chart-variants/radial.tsx','chart-variants/comparison.tsx','chart-variants/structure.tsx','chart-variants/special.tsx','chart-business/mini-data.ts','chart-business/comparison-data.ts','chart-business/matrix-data.ts','chart-business/china-region-data.ts'];
const sourceHashes=sourceFiles.map(file=>({path:`${dir}/${file}`,beforeSha256:hash(read(join(before,dir,file))),sha256:hash(read(join(root,dir,file)))}));
let jsxCount=0;
const jsxFiles=['chart-examples.tsx','chart-variants/trend.tsx','chart-variants/bar.tsx','chart-variants/radial.tsx','chart-variants/comparison.tsx','chart-variants/structure.tsx','chart-variants/special.tsx'];
for(const file of jsxFiles) {
 const texts=[before,root].map(base=>read(join(base,dir,file)));
 const jsx=text=>list(parseSync(file,text).program).filter(n=>n.type==='JSXElement'||n.type==='JSXFragment').map(n=>text.slice(n.start,n.end));
 assert.deepEqual(jsx(texts[1]),jsx(texts[0]),`${file} JSX changed`);jsxCount+=jsx(texts[0]).length;
}
for(const declaration of ['trioSamples','TrioBrushVariant']) {
 const extract=base=>{const source=read(join(base,dir,'chart-variants/trend.tsx'));const node=parseSync('trend.tsx',source).program.body.map(n=>n.declaration??n).find(n=>(n.id?.name??n.declarations?.[0]?.id.name)===declaration);assert(node);return source.slice(node.start,node.end);};
 assert.equal(extract(root),extract(before),`${declaration} changed`);
}
const require=createRequire(import.meta.resolve('vite'));
const {transformSync}=await import(require.resolve('rolldown/utils'));
function load(base,file,exports,globals={},only) {
 const source=read(join(base,dir,file)), ast=parseSync(file,source);assert.deepEqual(ast.errors,[]);
 const statements=ast.program.body.filter(n=>n.type!=='ImportDeclaration').map(n=>n.declaration??n).filter(n=>!only||only.includes(n.id?.name??n.declarations?.[0]?.id.name)).map(n=>source.slice(n.start,n.end));
 const result=transformSync(file,statements.join('\n'));assert.deepEqual(result.errors,[]);
 return runInNewContext(`${result.code}\n;({${exports.join(',')}})`,{Date,...globals});
}
const coreNames=['makeGroupedBars','makeMissingTimeline','makeTimeline','makeCategories','makeRings','makeRadar','makeFunnel','makeFlow','makeHierarchy','makeHeatmap','makeRegions','makeCandles','makeProfitLoss','makeLivePoints'];
const globals={worldJson:read(join(root,dir,'chart-variants/data/world.geojson'))};
const cores=[before,root].map(base=>load(base,'chart-data.ts',coreNames,globals));
const minis=[before,root].map(base=>load(base,'chart-business/mini-data.ts',['makeMiniRows']));
const categories=[before,root].map(base=>load(base,'chart-business/comparison-data.ts',['makeCategoryFixtures']));
const matrices=[before,root].map(base=>load(base,'chart-business/matrix-data.ts',['makeMatrixFixtures']));
const rawRegions=JSON.parse(read(join(root,dir,'chart-business/data/china/regions.json')));
const chinaNames=['chinaRegions','getChinaRegion','getChinaLayerRegions','makeChinaStatistics'];
const china=[before,root].map(base=>load(base,'chart-business/china-region-data.ts',chinaNames,{rawRegions},chinaNames));
const stripMini=rows=>rows.map(({trend,...rest})=>rest);
const identities=fixture=>({ ...fixture, rows:fixture.rows.map(row=>({id:row.id,label:row.label,...Object.fromEntries(Object.entries(row).filter(([key])=>['slotId','slotLabel','currentDate','previousDate','date','campus','planned'].includes(key)))})), cells:fixture.cells?.map(({value,...cell})=>cell) });
let protectedChecks=0, semanticChecks=0;
for(const revision of [0,1,2,3,4,1002]) for(const state of ['normal','empty','zero','single','long','missing','invalid']) {
 same(cores[1].makeGroupedBars(revision,state),cores[0].makeGroupedBars(revision,state),'approved grouped helper output');protectedChecks++;
 const oldMini=minis[0].makeMiniRows(revision,state),newMini=minis[1].makeMiniRows(revision,state);
 same(stripMini(newMini),stripMini(oldMini),'approved mini composition/progress/reading fields');protectedChecks++;
 if(['empty','zero','missing','invalid'].includes(state)){same(newMini,oldMini,'mini abnormal full output');semanticChecks++;}
 const oldCategories=categories[0].makeCategoryFixtures(revision,state),newCategories=categories[1].makeCategoryFixtures(revision,state);
 same(newCategories.map(identities),oldCategories.map(identities),'category ID/label/date/unit/denominator metadata');semanticChecks++;
 for(const size of [4,6,12]) {
  const oldMatrix=matrices[0].makeMatrixFixtures(revision,state,size),newMatrix=matrices[1].makeMatrixFixtures(revision,state,size);
  same(newMatrix.map(identities),oldMatrix.map(identities),'matrix axes/kinds/missing/NA metadata');semanticChecks++;
  if(state!=='invalid') for(const fixture of newMatrix) for(const cell of fixture.cells) if(cell.kind==='value') {
   assert(Number.isFinite(cell.value)&&cell.value>=0,`${fixture.id} finite nonnegative`);
   const max=fixture.encoding.kind==='bubble'?fixture.encoding.domainMax:fixture.encoding.kind==='heat'?fixture.encoding.domain[1]:2;
   assert(cell.value<=max,`${fixture.id} within encoding`);
  }
 }
}
for(const revision of [0,1,2,3,1002]) {
 const timeline=cores[1].makeTimeline(revision);for(const point of timeline) {
  assert(point.completed<=point.enrolled&&point.completed>=0);
  assert(point.rate===Math.round(point.completed/point.enrolled*100));
  for(const key of ['enrolled','completed','returned','answered','reviewed'])assert(Number.isInteger(point[key])&&point[key]>=0&&point[key]<=point.enrolled);
 }
 const mask=rows=>rows.map(row=>Object.fromEntries(Object.entries(row).map(([key,value])=>[key,key==='date'?value.toISOString():value===null])));
 same(mask(cores[1].makeMissingTimeline(revision)),mask(cores[0].makeMissingTimeline(revision)),'missing timeline date/mask');
 const flow=cores[1].makeFlow(revision);same(flow.nodes,cores[0].makeFlow(revision).nodes,'flow identity');same(flow.links.map(({value,...link})=>link),cores[0].makeFlow(revision).links.map(({value,...link})=>link),'flow topology');
 for(const node of [2,3])assert.equal(flow.links.filter(link=>link.target===node).reduce((s,l)=>s+l.value,0),flow.links.filter(link=>link.source===node).reduce((s,l)=>s+l.value,0));
 const candles=cores[1].makeCandles(revision);candles.forEach((c,i)=>{assert(c.low<=Math.min(c.open,c.close)&&c.high>=Math.max(c.open,c.close));if(i)assert.equal(c.open,candles[i-1].close)});
 const maps=cores[1].makeRegions(revision);same(maps.features.map(({properties,...rest})=>({...rest,properties:{id:properties.id,name:properties.name,region:properties.region}})),cores[0].makeRegions(revision).features.map(({properties,...rest})=>({...rest,properties:{id:properties.id,name:properties.name,region:properties.region}})),'geography identity');
 assert(maps.features.every(feature=>feature.properties.value===null||feature.properties.value>=0&&feature.properties.value<=100));
 const funnels=cores[1].makeFunnel(revision);assert(funnels.every((v,i)=>v.value>=0&&(i===0||v.value<=funnels[i-1].value)));
 const live=cores[1].makeLivePoints(1800000000,revision);assert(live.every((v,i)=>Number.isInteger(v.value)&&v.value>=0&&(i===0||v.time>live[i-1].time)));
 const profit=cores[1].makeProfitLoss(revision);assert(profit.some(point=>point.value>0)&&profit.some(point=>point.value<0)&&profit.every(point=>point.value!==0));
 const zeroProfit=cores[1].makeProfitLoss(revision,'zero');assert.equal(zeroProfit.length,24);assert(zeroProfit.every(point=>point.value===0));
 semanticChecks+=9;
 for(const parentId of [null,'130000','440000','350000'])for(const state of ['normal','zero','missing','invalid','unmatched']) {
  const previous=china[0].makeChinaStatistics(parentId,state,revision), current=china[1].makeChinaStatistics(parentId,state,revision);
  same(current.map(row=>({id:row.id,missing:row.value===null,zero:row.value===0,invalid:Number.isNaN(row.value)})),previous.map(row=>({id:row.id,missing:row.value===null,zero:row.value===0,invalid:Number.isNaN(row.value)})),'China ID/zero/missing/invalid/unmatched masks');
  assert(current.every(row=>row.value===null||Number.isNaN(row.value)||Number.isFinite(row.value)&&row.value>=0));semanticChecks++;
 }
}
const unchangedCss=[];
const walk=path=>{for(const filename of readdirSync(path)){const full=join(path,filename);if(statSync(full).isDirectory())walk(full);else if(filename.endsWith('.css')){const rel=full.slice(before.length+1);assert.equal(hash(read(full)),hash(read(join(root,rel))),`${rel} CSS changed`);unchangedCss.push(rel)}}};walk(before);
const captureFacts=JSON.parse(read(join(run,'after-browser/facts.json')));
for(const entry of captureFacts.sources)assert.equal(hash(read(join(root,entry.path))),entry.sha256,`${entry.path} differs from after capture source`);
for(const entry of sourceHashes)assert.equal(hash(read(join(root,entry.path))),entry.sha256,`${entry.path} changed during review`);
const fixedImages=['pie-default-1440.png','gauge-default-1440.png'].map(image=>{assert.equal(hash(readFileSync(join(run,'before-browser',image))),hash(readFileSync(join(run,'after-browser',image))));return image});
const visuallyReviewedFinalImages=['bar-default-1440.png','pie-default-1440.png','ring-default-1440.png','gauge-default-1440.png','heatmap-default-1440.png','default-candlestick-1440.png','candlestick-tooltip-line-default-1440.png','business-china-390.png','business-china-1440.png','default-matrix-1440.png','default-matrix-390.png'].map(image=>{const sha256=hash(readFileSync(join(run,'after-browser',image)));assert.equal(sha256,hash(readFileSync(join(run,'after-browser-initial',image))));return {image,sha256,bytesIdenticalToViewedInitialCapture:true};});
const result={timestamp:new Date().toISOString(),status:'passed',blockingFindings:[],reviewMode:'Read-only runtime-source and saved-browser-image review; evidence writes only.',sourceHashes,jsxFiles:jsxFiles.length,jsxNodesByteIdentical:jsxCount,previousFourDataChecks:protectedChecks,semanticChecks,unchangedCss,afterCaptureSourcesMatchingCurrent: captureFacts.sources.length,identicalBeforeAfterImages:fixedImages,
knownNativeBoundary:{scope:'ProfitLoss native exact-zero sign segmentation',finding:'The parent visual review and real splitter contract found that crossing the sign through an exact zero can merge a positive run into a negative segment.',authorizedLocalResponse:'Only three normal mock data literals were changed from 0 to 2/1/1, with one shortcut comment. The shared native splitter and all JSX/graph parameters were preserved.',zeroState:'Explicit zero state still supplies 24 actual zeros; no external value clamp or falsification was added.',limit:'This is a local normal demo workaround; the native exact-zero boundary remains unresolved for arbitrary future consumer data.'},
captureGuardHistory:[{status:'detected-source-drift',exitCode:1,source:'chart-data.ts',capturedSha256:'50f4cdd93e7434bbb7326e3c0c10e79ea61463bfc0f1067b5a968683efe9feb6',currentSha256:'7c34e857fc75bec3df3e9357d854c5111d6f1e05f52334b99396b677014f1aeb',reason:'Root-authorized final ProfitLoss mock literals changed after the initial after capture; initial review was not marked passed.'},{status:'final-capture-matches-current-source',exitCode:0,sources:captureFacts.sources.length,coreSha256:hash(read(join(root,dir,'chart-data.ts')))}],
visuallyReviewedFinalImages,
visualReview:{condition:{state:'normal',revision:0,motion:'reduce',recipe:'monochrome-blue'},viewedImages:['after/bar-default-1440.png','after/pie-default-1440.png','after/ring-default-1440.png','after/gauge-default-1440.png','after/heatmap-default-1440.png','before/bar-default-1440.png','before/ring-default-1440.png','before/heatmap-default-1440.png','after/default-candlestick-1440.png','after/candlestick-tooltip-line-default-1440.png','after/business-china-390.png','after/business-china-1440.png','after/default-matrix-1440.png','after/default-matrix-390.png','before/default-candlestick-1440.png','before/business-china-390.png','before/default-matrix-390.png'],observations:['No newly introduced plot or label clipping in the viewed samples; fixed geometry and typography are preserved.','Ordinary bars now alternate peaks/dips; Ring has visibly different independent targets; Heatmap has weekday activity clusters; OHLC rises/falls/flat states remain visible and truthful.','China map boundaries and zero/missing legend remain distinct at desktop/mobile; axis upper bound naturally follows the new data.','Matrix keeps an existing horizontal viewport. At width 390 its initial first plot shows only 00:00–03:00, whose new readings are all valid zero; daytime activity differences require horizontal scrolling. Static captures do not verify that scroll interaction.']},limits:['No product/source edits, suite run, browser operation, Git operation, or dependency changes were performed for this independent review.','Screenshots verify the recorded normal/reduced/revision-zero state only; interaction, full visual Human Gate, contrast, publication and migration remain separate.']};
writeFileSync(join(run,'independent-data-scope-review.json'),JSON.stringify(result,null,2));
console.log(JSON.stringify({status:result.status,sourceFiles:sourceHashes.length,jsxNodesByteIdentical:jsxCount,previousFourDataChecks:protectedChecks,semanticChecks,afterCaptureSourcesMatchingCurrent:captureFacts.sources.length,cssFiles:unchangedCss.length,blockingFindings:result.blockingFindings}));
