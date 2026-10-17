import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname,resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { test,expect } from "vitest";
import { parseSync } from "vite";
import { assertDownloadClosure, exportedDownloads } from "./verify-chart-variant-consumption.mjs";
import * as downloads from "../apps/playground/src/docs/components/chart-example-source";
import { makeMissingTimeline } from "../apps/playground/src/docs/components/chart-data";
const { chartBusinessFiles, chartExampleCode } = downloads;
const root=resolve(dirname(fileURLToPath(import.meta.url)),"..");
const reactRequire=createRequire(resolve(root,"apps/playground/package.json"));
const {pathToFileURL}=reactRequire("node:url");
const {runInNewContext}=reactRequire("node:vm");
const {createElement,Fragment,useState}=reactRequire("react");
const {renderToStaticMarkup}=reactRequire("react-dom/server");
test("first-batch default and matrix downloads enter the fresh consumer and its typecheck",()=>{
  const source=readFileSync(resolve(root,"scripts/verify-chart-business-consumption.mjs"),"utf8");
  const parsed=parseSync("verify-chart-business-consumption.mjs",source);
  expect(parsed.errors).toEqual([]);
  const block=parsed.program.body.find(node=>node.type==="TryStatement")!;
  if(block.type!=="TryStatement") throw new Error("Missing consumption setup");
  const declarations=block.block.body.filter(node=>node.type==="VariableDeclaration" && /^const (states|minis|defaultExamples|samples)=/.test(source.slice(node.start,node.end)));
  const samples=runInNewContext(`${declarations.map(node=>source.slice(node.start,node.end)).join("\n")}\nsamples;`,{chinaConsumptionCases:[]}) as {name:string;settings:downloads.ChartExampleDownloadProps}[];
  const targeted=samples.filter(sample=>sample.name.startsWith("default-") || sample.name==="matrix-single-page");
  expect(targeted.map(sample=>sample.name)).toEqual([
    "default-line-missing","default-area-missing","default-composed-missing",
    "default-mini-line-compact-missing","default-mini-line-comfortable-missing",
    "default-mini-area-compact-missing","default-mini-area-comfortable-missing",
    "default-composed-all-missing","default-mini-area-comfortable-all-missing",
    "default-sunburst-keyboard","default-sunburst-long-keyboard","matrix-single-page",
  ]);
  expect(targeted.filter(sample=>sample.name.endsWith("missing")).every(sample=>sample.settings.state==="missing")).toBe(true);
  expect(targeted.filter(sample=>sample.name.includes("all-missing")).every(sample=>sample.settings.revision===2)).toBe(true);
  expect(targeted.at(-1)?.settings).toMatchObject({id:"matrix",state:"normal",matrixSize:12,descending:true});
  for(const sample of targeted) {
    const files=downloads.chartExampleFiles(sample.settings);
    expect(()=>assertDownloadClosure(files,sample.name)).not.toThrow();
    expect(files[sample.settings.id==="matrix"?"chart-business/matrix-examples.tsx":"chart-examples.tsx"]).toBe(readFileSync(resolve(root,"apps/playground/src/docs/components",sample.settings.id==="matrix"?"chart-business/matrix-examples.tsx":"chart-examples.tsx"),"utf8"));
    expect(files["main.tsx"]).toContain(`state="${sample.settings.state}"`);
  }
  const statement=block.block.body.find(node=>node.type==="ExpressionStatement" && source.slice(node.start,node.end).includes('"business-tsconfig.json"'))!;
  let include:string[]=[];
  runInNewContext(source.slice(statement.start,statement.end),{host:"host",samples,join:(...paths:string[])=>paths.join("/"),put:(_path:string,value:string)=>{include=JSON.parse(value).include;}});
  for(const sample of targeted) {
    expect(include).toContain(`${sample.name}/**/*.tsx`);
    expect(include).toContain(`${sample.name}/**/*.ts`);
  }
});
test("missing consumer assertions accept the actual remaining readings and valid zero",()=>{
  const source=readFileSync(resolve(root,"scripts/verify-chart-business-consumption.mjs"),"utf8");
  const start=source.indexOf('if(sample.settings.id==="composed") expect(zero[2])');
  const end=source.indexOf("const chart=page.locator",start);
  expect(start).toBeGreaterThanOrEqual(0);expect(end).toBeGreaterThan(start);
  for(const revision of [0,1]) {
    const values=makeMissingTimeline(revision).flatMap(point=>[point.enrolled,point.completed,point.returned].map(value=>value==null?"缺测":String(value)));
    for(const id of ["line","area"]) runInNewContext(source.slice(start,end),{expect,values,zero:values.slice(6,9),sample:{settings:{id,size:"standard"}}});
  }
});
test("default consumer plot visibility permits the existing tooltip overlay SVG",async()=>{
  const source=readFileSync(resolve(root,"scripts/verify-chart-business-consumption.mjs"),"utf8");
  const start=source.indexOf('await expect(chart.locator("svg")');
  const end=source.indexOf("const paths=",start);
  const fixture=document.createElement("div");fixture.innerHTML='<svg></svg><svg aria-hidden="true"></svg>';
  const nodes=[...fixture.querySelectorAll("svg")];
  const all={first:()=>nodes[0]};
  const assertion=runInNewContext(`(async()=>{${source.slice(start,end)}})()`,{chart:{locator:()=>all},expect:(target:unknown)=>({toHaveCount:(count:number)=>expect(nodes).toHaveLength(count),toBeVisible:()=>expect(target).toBe(nodes[0])})});
  await assertion;
});
test("business downloads contain their real helpers and preserve selected state and shared scale",()=>{
  const files=chartBusinessFiles({recipe:"monochrome-blue",state:"missing",revision:2,descending:true,many:false,filter:true});
  expect(()=>assertDownloadClosure(files,"business")).not.toThrow();
  expect(files["main.tsx"]).toContain('"missing"'); expect(files["main.tsx"]).toContain('getComparisonMax(original)');
  const missing={...files}; delete missing["chart-business/mini-data.ts"];
  expect(()=>assertDownloadClosure(missing,"business")).toThrow(/mini-data/);
  const mini=chartExampleCode("bar","monochrome-blue","zero","mini");
  expect(mini).toContain('state="zero"'); expect(mini).toContain('size="mini"');
  expect(chartExampleCode("matrix","monochrome-blue","normal","standard",12)).toContain('initialSize={12}');
});
test("business and matrix downloads keep their page contents separate",()=>{
  const business=chartBusinessFiles({recipe:"monochrome-blue",state:"normal",revision:0,descending:false,many:false,filter:false});
  expect(business["main.tsx"]).not.toContain("MatrixExamples");
  expect(Object.keys(business).some(path=>path.includes("matrix"))).toBe(false);
  const matrix=downloads.chartExampleFiles({id:"matrix",recipe:"monochrome-blue",state:"long",revision:3,matrixSize:12,descending:true});
  expect(()=>assertDownloadClosure(matrix,"matrix")).not.toThrow();
  expect(matrix["main.tsx"]).toContain("MatrixExamples");
  expect(matrix["main.tsx"]).not.toContain("fixtureId=");
  expect(matrix["main.tsx"]).toContain('state="long"');
  expect(matrix["main.tsx"]).toContain('initialSize={12}');
  expect(matrix["main.tsx"]).toContain('descending={true}');
  expect(Object.keys(matrix).some(path=>path.includes("mini-"))).toBe(false);
});
test("both download sets include the real mini layout and fail closure when it is removed",()=>{
  expect(typeof downloads.chartExampleFiles).toBe("function");
  for (const files of [
    chartBusinessFiles({recipe:"monochrome-blue",state:"normal",revision:2,descending:true,many:false,filter:true}),
    downloads.chartExampleFiles({id:"pie",recipe:"monochrome-blue",size:"mini",miniSize:"comfortable",seriesCount:5,revision:2}),
  ]) {
    expect(files).toHaveProperty("chart-business/mini-layout.ts");
    expect(files["chart-business/mini-layout.ts"]).toBe(readFileSync(resolve(root,"apps/playground/src/docs/components/chart-business/mini-layout.ts"),"utf8"));
    expect(()=>assertDownloadClosure(files,"mini")).not.toThrow();
    const missing={...files}; delete missing["chart-business/mini-layout.ts"];
    expect(()=>assertDownloadClosure(missing,"mini")).toThrow(/mini-layout/);
  }
});

test("business download computes the original people and trend domains after invalid bypass",()=>{
  const files=chartBusinessFiles({recipe:"monochrome-blue",state:"invalid",revision:3,descending:true,many:true,filter:true});
  expect(files["main.tsx"]).toContain('settings.state === "invalid" ? 0 : getTrendComparisonMax(original)');
  expect(files["main.tsx"]).toContain('settings.state === "invalid" ? 0 : getComparisonMax(original)');
  expect(files["main.tsx"]).toContain('trendMaxValue={trendMaxValue}');
  expect(files["main.tsx"]).toContain('"revision":3');
  expect(files["main.tsx"]).not.toContain('miniSize=');
});

test("business download retains the table and typography host scope",()=>{
  const files=chartBusinessFiles({recipe:"monochrome-blue",state:"normal",revision:0,descending:false,many:false,filter:false});
  expect(files["main.tsx"]).toContain('className="rain-chart rain-chart-business"');
});

test.each(["compact","comfortable"] as const)("generated %s App executes with captured series and nonzero revision",async miniSize=>{
  const require=createRequire(import.meta.resolve("vite"));
  const {transformSync}=await import(pathToFileURL(require.resolve("rolldown/utils")).href);
  for (const seriesCount of [3,5] as const) {
    const source=downloads.chartExampleFiles({id:"pie",recipe:"monochrome-blue",state:"normal",size:"mini",matrixSize:6,miniSize,seriesCount,revision:7})["main.tsx"]!;
    const parsed=parseSync("main.tsx",source);
    expect(parsed.errors).toEqual([]);
    const executable=parsed.program.body.filter(node=>node.type!=="ImportDeclaration").map(node=>source.slice(node.start,node.end)).join("\n");
    const transformed=transformSync("main.tsx",executable,{jsx:{runtime:"classic"}});
    expect(transformed.errors).toEqual([]);
    let captured:Record<string,unknown>|undefined;
    const App=runInNewContext(`${transformed.code}\nApp;`,{
      React:{createElement},useState,MotionConfig:Fragment,useChartReducedMotion:()=>true,
      ChartExample:(props:Record<string,unknown>)=>{captured=props;return null;},
      createRoot:()=>({render:()=>{}}),document:{getElementById:()=>({})},
    });
    expect(()=>renderToStaticMarkup(createElement(App))).not.toThrow();
    expect(captured).toMatchObject({id:"pie",size:"mini",miniSize,seriesCount,revision:7});
  }
});
test("a non-bar single-item Registry install contains the unified entry's DataBar export",()=>{
  const registry=JSON.parse(readFileSync(resolve(root,"registry/charts.json"),"utf8"));
  const item=registry.items.find((item:{name:string})=>item.name==="chart-pie");
  const paths=[...new Set<string>([...registry.shared.files,...item.files])];
  const files=Object.fromEntries(paths.map(path=>[path,readFileSync(resolve(root,path),"utf8")]));
  expect(()=>assertDownloadClosure(files,"single-pie")).not.toThrow();
  delete files["packages/ui/src/charts/data-bar.tsx"];
  expect(()=>assertDownloadClosure(files,"single-pie")).toThrow(/data-bar/);
});

test("category downloads preserve their current configuration and contain their actual lightweight data closure", () => {
  const files = downloads.chartCategoryFiles({ fixtureId:"period", recipe:"monochrome-blue", state:"missing", revision:7, replay:2, descending:true });
  expect(() => assertDownloadClosure(files,"category-period")).not.toThrow();
  expect(files["chart-business/category-examples.tsx"]).toBe(readFileSync(resolve(root,"apps/playground/src/docs/components/chart-business/category-examples.tsx"),"utf8"));
  expect(files["chart-business/comparison-data.ts"]).toBe(readFileSync(resolve(root,"apps/playground/src/docs/components/chart-business/comparison-data.ts"),"utf8"));
  expect(files["main.tsx"]).toContain('fixtureId={"period"}');
  expect(files["main.tsx"]).toContain('"revision":7');
  expect(files["main.tsx"]).toContain('"descending":true');
  expect(Object.keys(files).some(path => /mini-|matrix|world/.test(path))).toBe(false);
  const missing = {...files}; delete missing["chart-business/comparison-data.ts"];
  expect(() => assertDownloadClosure(missing,"category-period")).toThrow(/comparison-data/);
});

test("network downloads capture their real fixture and current relation without unrelated geometry", async () => {
  const settings = { fixtureId:"courses", state:"normal", relation:"prerequisite", revision:5, recipe:"monochrome-blue", variant:"structured" } as const;
  const files = downloads.chartNetworkFiles(settings);
  expect(() => assertDownloadClosure(files,"network-courses")).not.toThrow();
  expect(files["chart-business/network-data.ts"]).toBe(readFileSync(resolve(root,"apps/playground/src/docs/components/chart-business/network-data.ts"),"utf8"));
  expect(files["main.tsx"]).toContain('"relation":"prerequisite"');
  expect(files["main.tsx"]).toContain('"revision":5');
  expect(files["main.tsx"]).toContain('variant={settings.variant}');
  expect(files["main.tsx"]).toContain('"variant":"structured"');
  expect(Object.keys(files).some(path => /matrix|mini-|world/.test(path))).toBe(false);
  const missing = {...files}; delete missing["chart-business/network-data.ts"];
  expect(() => assertDownloadClosure(missing,"network-courses")).toThrow(/network-data/);
  const captured = await exportedDownloads(resolve(root,"apps/playground/src/docs/components"),"chartExampleFiles");
  expect(() => assertDownloadClosure(captured.files({ id:"network", recipe:"monochrome-blue", state:"normal", size:"standard", revision:2 }),"network-default")).not.toThrow();
});
