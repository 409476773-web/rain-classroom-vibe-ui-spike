import { readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
const folder='evidence/runtime/chart-curve-refinement-2026-10-11/curve-audit';
const requireUi=createRequire(resolve('packages/ui/package.json'));
const {line,curveNatural,curveMonotoneX}=await import(requireUi.resolve('d3-shape'));
const requireVite=createRequire(import.meta.resolve('vite'));
const {transformSync}=await import(requireVite.resolve('rolldown/utils'));
const timelinePath='apps/playground/src/docs/components/chart-data.ts';
const miniPath='apps/playground/src/docs/components/chart-business/mini-data.ts';
const timelineSource=await readFile(timelinePath,'utf8');
const miniSource=await readFile(miniPath,'utf8');
const slice=(source,start,end)=>source.slice(source.indexOf(start),source.indexOf(end,source.indexOf(start)));
const timelineModule=slice(timelineSource,'export function makeTimeline(','export function makeMissingTimeline(')+slice(timelineSource,'export function assertValidDate(','export function assertRingData(');
const importSource=async(source,name)=>(await import('data:text/javascript;base64,'+Buffer.from(transformSync(name,source).code).toString('base64')));
const {makeTimeline}=await importSource(timelineModule,'timeline.ts');
const {makeMiniRows}=await importSource(miniSource,'mini.ts');
const EPS=1e-8;
const evaluate=(p,t)=>(1-t)**3*p[0]+3*(1-t)**2*t*p[1]+3*(1-t)*t*t*p[2]+t**3*p[3];
function derivativeRoots(p){
 const a=-p[0]+3*p[1]-3*p[2]+p[3],b=3*p[0]-6*p[1]+3*p[2],c=-3*p[0]+3*p[1];
 if(Math.abs(3*a)<EPS)return Math.abs(2*b)<EPS?[]:[-c/(2*b)];
 const d=4*b*b-12*a*c;
 if(d<-EPS)return[];
 const root=Math.sqrt(Math.max(0,d));return[(-2*b+root)/(6*a),(-2*b-root)/(6*a)];
}
function build(values,curve){
 const segments=[];let point=null;
 const context={moveTo(x,y){point=[x,y]},lineTo(x,y){segments.push({x:[point[0],point[0]+(x-point[0])/3,point[0]+2*(x-point[0])/3,x],y:[point[1],point[1]+(y-point[1])/3,point[1]+2*(y-point[1])/3,y]});point=[x,y]},bezierCurveTo(x1,y1,x2,y2,x,y){segments.push({x:[point[0],x1,x2,x],y:[point[1],y1,y2,y]});point=[x,y]},closePath(){}};
 line().x((v,index)=>index).y(v=>v).curve(curve).context(context)(values);
 return segments;
}
function analyze(values,curve,bounds){
 const segments=build(values,curve),warnings=[];let minimum=Math.min(...values),maximum=Math.max(...values),sampledMinimum=minimum,sampledMaximum=maximum,maxEndpointOvershoot=0,xBacktracks=0,atInputPointError=0;
 segments.forEach((segment,index)=>{
  const lower=Math.min(values[index],values[index+1]),upper=Math.max(values[index],values[index+1]);
  const roots=derivativeRoots(segment.y).filter(t=>t>EPS&&t<1-EPS).filter((t,index,array)=>!array.slice(0,index).some(other=>Math.abs(t-other)<EPS));
  const extremes=roots.map(t=>({t,x:evaluate(segment.x,t),value:evaluate(segment.y,t)}));
  const candidates=[{t:0,value:segment.y[0]},{t:1,value:segment.y[3]},...extremes];
  const segmentMin=Math.min(...candidates.map(point=>point.value)),segmentMax=Math.max(...candidates.map(point=>point.value));
  const overshoot=Math.max(0,lower-segmentMin,segmentMax-upper);maxEndpointOvershoot=Math.max(maxEndpointOvershoot,overshoot);
  minimum=Math.min(minimum,segmentMin);maximum=Math.max(maximum,segmentMax);
  // Dense sampling is supplementary; exact derivative roots certify the bounds.
  for(let n=0;n<=1000;n++){const value=evaluate(segment.y,n/1000);sampledMinimum=Math.min(sampledMinimum,value);sampledMaximum=Math.max(sampledMaximum,value);if(n>0&&evaluate(segment.x,n/1000)<evaluate(segment.x,(n-1)/1000)-EPS)xBacktracks++;}
  atInputPointError=Math.max(atInputPointError,Math.abs(segment.y[0]-values[index]),Math.abs(segment.y[3]-values[index+1]));
  if(overshoot>EPS)warnings.push({segment:index,from:values[index],to:values[index+1],segmentMinimum:segmentMin,segmentMaximum:segmentMax,endpointOvershoot:overshoot,interiorExtrema:extremes});
 });
 return{segmentCount:segments.length,warningSegments:warnings.length,maxEndpointOvershoot,minimum,maximum,sampledMinimum,sampledMaximum,negative:minimum<-EPS,over100:bounds?.[1]===100&&maximum>100+EPS,outsideBounds:!!bounds&&(minimum<bounds[0]-EPS||maximum>bounds[1]+EPS),atInputPointError,xBacktracks,warnings};
}
const families=[];
for(let revision=0;revision<3;revision++){
 const rows=makeTimeline(revision);
 for(const key of['enrolled','completed','returned','answered','reviewed'])families.push({family:'timeline-count',id:`timeline-${key}-revision-${revision}`,revision,key,values:rows.map(row=>row[key]),bounds:[0,Infinity]});
 families.push({family:'timeline-rate-rounded',id:`timeline-rate-rounded-revision-${revision}`,revision,key:'rate',values:rows.map(row=>row.rate),bounds:[0,100]});
 families.push({family:'timeline-rate-unrounded',id:`timeline-rate-unrounded-revision-${revision}`,revision,key:'rate',values:rows.map(row=>row.completed/row.enrolled*100),bounds:[0,100]});
}
for(let revision=0;revision<12;revision++)for(const row of makeMiniRows(revision))families.push({family:'mini-trend',id:`${row.id}-revision-${revision}`,revision,key:'trend',values:row.trend,bounds:[0,Infinity]});
for(const values of [[0,0,100,100],[100,100,0,0],[0,10,0],[100,90,100],[0,0,0]])families.push({family:'bound-contract-control',id:'bound-'+values.join('-'),values,bounds:[0,100]});
const results=families.map(item=>({...item,bounds:item.bounds.map(value=>Number.isFinite(value)?value:null),curves:{natural:analyze(item.values,curveNatural,item.bounds),monotoneX:analyze(item.values,curveMonotoneX,item.bounds)}}));
const summary=[];
for(const family of [...new Set(results.map(row=>row.family))])for(const curve of['natural','monotoneX']){
 const rows=results.filter(row=>row.family===family);
 summary.push({family,curve,seriesCount:rows.length,seriesWithInteriorOvershoot:rows.filter(row=>row.curves[curve].warningSegments>0).length,overshootSegmentCount:rows.reduce((sum,row)=>sum+row.curves[curve].warningSegments,0),maxEndpointOvershoot:Math.max(...rows.map(row=>row.curves[curve].maxEndpointOvershoot)),negativeSeries:rows.filter(row=>row.curves[curve].negative).length,outsideBoundsSeries:rows.filter(row=>row.curves[curve].outsideBounds).length,inputPointError:Math.max(...rows.map(row=>row.curves[curve].atInputPointError)),safeSeriesIds:rows.filter(row=>row.curves[curve].warningSegments===0&&!row.curves[curve].outsideBounds).map(row=>row.id)});
}
const hash=source=>createHash('sha256').update(source).digest('hex');
const report={precision:'Draw geometry in source value units; 1001 samples per adjacent interval plus exact cubic derivative roots, epsilon1e-8. Affine SVG y scaling does not change which values overshoot.',installedD3Shape:requireUi.resolve('d3-shape'),sourceHashes:{[timelinePath]:hash(timelineSource),[miniPath]:hash(miniSource)},snapshotCopies:['timeline-source.txt','mini-source.txt'],summary,results};
await writeFile(`${folder}/timeline-source.txt`,timelineSource);await writeFile(`${folder}/mini-source.txt`,miniSource);await writeFile(`${folder}/results.json`,JSON.stringify(report,null,2)+'\n');
process.stdout.write(JSON.stringify(summary.map(({safeSeriesIds,...row})=>row),null,2)+'\n');
