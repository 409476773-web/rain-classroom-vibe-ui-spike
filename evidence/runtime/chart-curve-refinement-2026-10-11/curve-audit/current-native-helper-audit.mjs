import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import { runInNewContext } from "node:vm";
import { parseSync } from "vite";

const folder = resolve("evidence/runtime/chart-curve-refinement-2026-10-11/curve-audit");
const hash = value => createHash("sha256").update(value).digest("hex");
const sharedPath = "apps/playground/src/docs/components/chart-variants/shared.tsx";
const timelinePath = "apps/playground/src/docs/components/chart-data.ts";
const sharedSource = readFileSync(sharedPath, "utf8");
const timelineSource = readFileSync(timelinePath, "utf8");
const requireUi = createRequire(resolve("packages/ui/package.json"));
const curveEntry = requireUi.resolve("@visx/curve");
const curveRequire = createRequire(curveEntry);
const curves = requireUi("@visx/curve");
const vendorEntry = curveRequire.resolve("@visx/vendor/d3-shape");
const vendor = curveRequire("@visx/vendor/d3-shape");
const vendorRequire = createRequire(vendorEntry);
const nativeCurveSources = ["natural", "monotone"].map(name => vendorRequire.resolve(`../vendor-cjs/d3-shape/src/curve/${name}.js`));
assert.equal(curves.curveNatural, vendor.curveNatural);
assert.equal(curves.curveMonotoneX, vendor.curveMonotoneX);
const requireVite = createRequire(import.meta.resolve("vite"));
const { transformSync } = await import(requireVite.resolve("rolldown/utils"));

function declarations(source, names) {
  const parsed = parseSync("current-owner.tsx", source);
  assert.deepEqual(parsed.errors, []);
  return names.map(name => {
    const statement = parsed.program.body.find(node => node.type === "ExportNamedDeclaration" && node.declaration?.id?.name === name);
    assert(statement, `Missing actual source function ${name}`);
    return source.slice(statement.declaration.start, statement.declaration.end);
  }).join("\n");
}
function evaluate(source, names, globals = {}) {
  const selected = declarations(source, names);
  const transformed = transformSync("current-owner.tsx", selected);
  assert.deepEqual(transformed.errors, []);
  return { source:selected, functions:runInNewContext(`${transformed.code}\n({${names.join(",")}});`, globals) };
}
const helper = evaluate(sharedSource, ["trendCurve"], { curveNatural:curves.curveNatural, curveMonotoneX:curves.curveMonotoneX });
const { makeTimeline } = evaluate(timelineSource, ["makeTimeline", "assertValidDate", "assertNonNegativeCount"]).functions;
const { trendCurve } = helper.functions;
const EPS = 1e-8;
const sign = value => Math.abs(value) < EPS ? 0 : Math.sign(value);
const valueAt = (points, t) => (1-t)**3*points[0]+3*(1-t)**2*t*points[1]+3*(1-t)*t*t*points[2]+t**3*points[3];
const derivative = (points, t) => 3*((1-t)**2*(points[1]-points[0])+2*(1-t)*t*(points[2]-points[1])+t*t*(points[3]-points[2]));
function roots(points) {
  const a=-points[0]+3*points[1]-3*points[2]+points[3], b=3*points[0]-6*points[1]+3*points[2], c=-3*points[0]+3*points[1];
  if (Math.abs(3*a)<EPS) return Math.abs(2*b)<EPS ? [] : [-c/(2*b)];
  const discriminant=4*b*b-12*a*c;
  if (discriminant < -EPS) return [];
  const squareRoot=Math.sqrt(Math.max(0,discriminant));
  return [(-2*b+squareRoot)/(6*a),(-2*b-squareRoot)/(6*a)];
}
function build(values, factory) {
  const segments=[]; let point;
  const context={
    moveTo(x,y) { point=[x,y]; },
    lineTo(x,y) { segments.push({x:[point[0],point[0]+(x-point[0])/3,point[0]+2*(x-point[0])/3,x],y:[point[1],point[1]+(y-point[1])/3,point[1]+2*(y-point[1])/3,y]}); point=[x,y]; },
    bezierCurveTo(x1,y1,x2,y2,x,y) { segments.push({x:[point[0],x1,x2,x],y:[point[1],y1,y2,y]}); point=[x,y]; },
    closePath() {},
  };
  const curve=factory(context);
  curve.lineStart(); values.forEach((value,index)=>curve.point(index,value)); curve.lineEnd();
  return segments;
}
function observedTurns(values) {
  const directions=values.slice(1).map((value,index)=>sign(value-values[index])).filter(Boolean);
  return directions.slice(1).filter((direction,index)=>direction!==directions[index]).length;
}
function measure(values,factory) {
  let min=Math.min(...values),max=Math.max(...values),inputPointError=0,previous;
  const turns=[];
  for (const [index,segment] of build(values,factory).entries()) {
    const cuts=[0,...roots(segment.y).filter(t=>t>EPS && t<1-EPS).sort((a,b)=>a-b),1].filter((t,index,list)=>index===0 || Math.abs(t-list[index-1])>EPS);
    const readings=cuts.map(t=>valueAt(segment.y,t));
    min=Math.min(min,...readings); max=Math.max(max,...readings);
    inputPointError=Math.max(inputPointError,Math.abs(segment.y[0]-values[index]),Math.abs(segment.y[3]-values[index+1]));
    for (let part=1;part<cuts.length;part++) {
      const direction=sign(derivative(segment.y,(cuts[part-1]+cuts[part])/2));
      if (!direction) continue;
      if (previous && direction!==previous) turns.push({kind:previous>0?"peak":"trough",segment:index,t:cuts[part-1],x:valueAt(segment.x,cuts[part-1]),value:valueAt(segment.y,cuts[part-1])});
      previous=direction;
    }
  }
  const observed=observedTurns(values);
  return {observedTurns:observed,curveTurns:turns.length,addedTurns:Math.max(0,turns.length-observed),missingTurns:Math.max(0,observed-turns.length),min,max,inputPointError,turns};
}
const rows=[];
for (let revision=0;revision<3;revision++) for (const prefix of [false,true]) {
  const data=makeTimeline(revision).slice(0,prefix?7:undefined);
  assert(data.every((point,index)=>index===0 || point.date.getTime()-data[index-1].date.getTime()===86_400_000));
  for (const key of ["enrolled","completed","returned","answered","reviewed","rate"]) {
    const values=data.map(point=>point[key]),snapshot=JSON.stringify(data);
    const selected=trendCurve(data,key);
    assert(selected===curves.curveNatural || selected===curves.curveMonotoneX);
    assert.equal(JSON.stringify(data),snapshot);
    const result=measure(values,selected);
    assert.equal(result.addedTurns,0,`Additional turn: revision ${revision}, ${key}, prefix=${prefix}`);
    assert.equal(result.missingTurns,0,`Missing turn: revision ${revision}, ${key}, prefix=${prefix}`);
    assert(result.min>=-EPS && result.inputPointError<EPS);
    if (key==="rate") assert(result.min>=0 && result.max<=100);
    rows.push({revision,key,points:data.length,scope:prefix?"current-seven-point-prefix":"current-full-series",actualMarkerCaller:prefix && ["enrolled","returned"].includes(key),selected:selected===curves.curveNatural?"Natural":"MonotoneX",values,...result});
  }
}
function metadata(path) {
  for (let folder=dirname(path);;folder=dirname(folder)) {
    const manifest=join(folder,"package.json");
    if (existsSync(manifest)) { const data=JSON.parse(readFileSync(manifest,"utf8"));return {name:data.name,version:data.version,entry:path,entrySha256:hash(readFileSync(path))}; }
    assert.notEqual(folder,dirname(folder));
  }
}
const sourcePaths=[sharedPath,timelinePath,"apps/playground/src/docs/components/chart-examples.tsx","apps/playground/src/docs/components/chart-variants/trend.tsx","packages/ui/src/charts/index.ts"];
assert.equal(readFileSync(sharedPath,"utf8"),sharedSource);
assert.equal(readFileSync(timelinePath,"utf8"),timelineSource);
const sourceHashes=Object.fromEntries(sourcePaths.map(path=>[path,hash(readFileSync(path))]));
const indexSource=readFileSync(sourcePaths.at(-1),"utf8");
const nativeReexport=parseSync("public-index.ts",indexSource).program.body.find(node=>node.type==="ExportNamedDeclaration" && node.source?.value==="@visx/curve");
assert(nativeReexport.specifiers.some(node=>node.exported.name==="curveNatural"));
assert(nativeReexport.specifiers.some(node=>node.exported.name==="curveMonotoneX"));
const calls=[];
for (const path of sourcePaths.slice(2,4)) {
  const source=readFileSync(path,"utf8"),parsed=parseSync(path,source),nodes=[parsed.program];
  assert.deepEqual(parsed.errors,[]);
  for (const node of nodes) {
    if (!node || typeof node!=="object") continue;
    if (node.type==="CallExpression" && node.callee?.name==="trendCurve") calls.push({path,line:source.slice(0,node.start).split("\n").length,source:source.slice(node.start,node.end)});
    nodes.push(...(Array.isArray(node)?node:Object.values(node)).filter(value=>value && typeof value==="object"));
  }
}
const result={checkedAt:new Date().toISOString(),scope:"Current calibrated demo arrays only; 18 full series and 18 seven-observation prefixes, including six actual marker/dashed-tail caller sequences. No arbitrary input, transient animation, or visual acceptance guarantee.",definition:"Turns are sign changes of the complete cubic derivative over exact-root intervals and knots. Flat observed edges count once; moving an existing peak between observations is allowed.",sourceHashes,helperSource:helper.source,helperSourceSha256:hash(helper.source),scriptSha256:hash(readFileSync(new URL(import.meta.url))),nativeFactory:{curve:metadata(curveEntry),vendor:metadata(vendorEntry),naturalIdentityMatchesVendor:true,monotoneIdentityMatchesVendor:true,uiPublicIndexReexports:nativeReexport.source.value,actualCurveSources:nativeCurveSources.map(path=>({path,sha256:hash(readFileSync(path))}))},callers:calls,summary:{fullSeries:rows.filter(row=>row.points===24).length,sevenPointPrefixes:rows.filter(row=>row.points===7).length,actualMarkerSequences:rows.filter(row=>row.actualMarkerCaller).length,natural:rows.filter(row=>row.selected==="Natural").length,monotoneX:rows.filter(row=>row.selected==="MonotoneX").length,allSelectedPreserveTurns:true,allSelectedNonnegative:true,allOriginalPointsAccurate:true,rateWithinZeroAnd100:true},rows};
for (const [path,digest] of Object.entries(sourceHashes)) assert.equal(hash(readFileSync(path)),digest);
writeFileSync(join(folder,"current-native-helper-results.json"),JSON.stringify(result,null,2)+"\n");
writeFileSync(join(folder,"current-native-helper-source.sha256"),[...Object.entries(sourceHashes).map(([path,digest])=>`${digest}  ${path}`),`${result.scriptSha256}  evidence/runtime/chart-curve-refinement-2026-10-11/curve-audit/current-native-helper-audit.mjs`].join("\n")+"\n");
console.log(JSON.stringify({summary:result.summary,helperSourceSha256:result.helperSourceSha256,sharedSourceSha256:sourceHashes[sharedPath],nativeFactory:result.nativeFactory,callers:result.callers.length},null,2));
