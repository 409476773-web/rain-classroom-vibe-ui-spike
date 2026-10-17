import { readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
const folder='evidence/runtime/chart-curve-refinement-2026-10-11/curve-audit';
const source=JSON.parse(await readFile(`${folder}/results.json`,'utf8'));
const requireUi=createRequire(resolve('packages/ui/package.json'));
const {line,curveNatural,curveMonotoneX}=await import(requireUi.resolve('d3-shape'));
const EPS=1e-8;
const sign=value=>Math.abs(value)<EPS?0:Math.sign(value);
const value=(p,t)=>(1-t)**3*p[0]+3*(1-t)**2*t*p[1]+3*(1-t)*t*t*p[2]+t**3*p[3];
const derivative=(p,t)=>3*((1-t)**2*(p[1]-p[0])+2*(1-t)*t*(p[2]-p[1])+t*t*(p[3]-p[2]));
function roots(p){
 const a=-p[0]+3*p[1]-3*p[2]+p[3],b=3*p[0]-6*p[1]+3*p[2],c=-3*p[0]+3*p[1];
 if(Math.abs(3*a)<EPS)return Math.abs(2*b)<EPS?[]:[-c/(2*b)];
 const d=4*b*b-12*a*c;if(d<-EPS)return[];
 const q=Math.sqrt(Math.max(0,d));return[(-2*b+q)/(6*a),(-2*b-q)/(6*a)];
}
function build(values,curve){
 const segments=[];let point=null;
 const context={moveTo(x,y){point=[x,y]},lineTo(x,y){segments.push({x:[point[0],point[0]+(x-point[0])/3,point[0]+2*(x-point[0])/3,x],y:[point[1],point[1]+(y-point[1])/3,point[1]+2*(y-point[1])/3,y]});point=[x,y]},bezierCurveTo(x1,y1,x2,y2,x,y){segments.push({x:[point[0],x1,x2,x],y:[point[1],y1,y2,y]});point=[x,y]},closePath(){}};
 line().x((_,index)=>index).y(v=>v).curve(curve).context(context)(values);return segments;
}
function dataTurns(values){
 const turns=[];let previous=null;
 for(let edge=0;edge<values.length-1;edge++){
  const current=sign(values[edge+1]-values[edge]);if(!current)continue;
  if(previous&&current!==previous.sign)turns.push({kind:previous.sign>0?'peak':'trough',fromObservation:previous.edge+1,toObservation:edge,value:values[edge]});
  previous={sign:current,edge};
 }return turns;
}
function curveTurns(values,curve){
 const turns=[],pieces=[];let previous=null;
 build(values,curve).forEach((segment,index)=>{
  const cuts=[0,...roots(segment.y).filter(t=>t>EPS&&t<1-EPS).sort((a,b)=>a-b),1].filter((t,index,list)=>index===0||Math.abs(t-list[index-1])>EPS);
  for(let i=1;i<cuts.length;i++){
   const start=cuts[i-1],end=cuts[i],current=sign(derivative(segment.y,(start+end)/2));
   if(!current)continue;
   pieces.push({segment:index,start,end,sign:current});
   if(previous&&current!==previous.sign)turns.push({kind:previous.sign>0?'peak':'trough',segment:index,t:start,x:value(segment.x,start),value:value(segment.y,start)});
   previous={sign:current};
  }
 });return{turns,pieces};
}
const rows=source.results.map(row=>{
 const observed=dataTurns(row.values);
 const curves=Object.fromEntries([['natural',curveNatural],['monotoneX',curveMonotoneX]].map(([name,curve])=>{
  const result=curveTurns(row.values,curve);
  return[name,{turnCount:result.turns.length,addedTurns:Math.max(0,result.turns.length-observed.length),missingTurns:Math.max(0,observed.length-result.turns.length),turns:result.turns,signPieces:result.pieces}];
 }));return{family:row.family,id:row.id,revision:row.revision,key:row.key,values:row.values,dataTurnCount:observed.length,dataTurns:observed,curves};
});
const summary=[];
for(const family of [...new Set(rows.map(row=>row.family))])for(const curve of['natural','monotoneX']){
 const familyRows=rows.filter(row=>row.family===family);
 summary.push({family,curve,series:familyRows.length,sameTurnCount:familyRows.filter(row=>row.dataTurnCount===row.curves[curve].turnCount).length,addedTurnSeries:familyRows.filter(row=>row.curves[curve].addedTurns).map(row=>({id:row.id,dataTurns:row.dataTurnCount,curveTurns:row.curves[curve].turnCount})),missingTurnSeries:familyRows.filter(row=>row.curves[curve].missingTurns).map(row=>row.id)});
}
await writeFile(`${folder}/turn-results.json`,JSON.stringify({definition:'Observed turns = sign changes of nonzero adjacent differences, ignoring flat platform edges so each platform counts once. Curve turns = sign changes of the full cubic derivative across exact-root intervals and knots, ignoring zero derivative intervals; interior-root count is not new-turn count.',sourceHashes:source.sourceHashes,summary,rows},null,2)+'\n');
process.stdout.write(JSON.stringify(summary,null,2)+'\n');
