import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname,resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { test,expect } from "vitest";
import { parseSync } from "vite";
import { assertDownloadClosure, exportedDownloads } from "./verify-chart-variant-consumption.mjs";
import * as downloads from "../apps/playground/src/docs/components/chart-example-source";
const { chartBusinessFiles, chartExampleCode } = downloads;
const root=resolve(dirname(fileURLToPath(import.meta.url)),"..");
const reactRequire=createRequire(resolve(root,"apps/playground/package.json"));
const {pathToFileURL}=reactRequire("node:url");
const {runInNewContext}=reactRequire("node:vm");
const {createElement,Fragment,useState}=reactRequire("react");
const {renderToStaticMarkup}=reactRequire("react-dom/server");
test("business downloads contain their real helpers and preserve selected state and shared scale",()=>{
  const files=chartBusinessFiles({recipe:"monochrome-blue",state:"missing",revision:2,descending:true,many:false,filter:true});
  expect(()=>assertDownloadClosure(files,"business")).not.toThrow();
  expect(files["main.tsx"]).toContain('"missing"'); expect(files["main.tsx"]).toContain('getComparisonMax(original)');
  const missing={...files}; delete missing["chart-business/mini-data.ts"];
  expect(()=>assertDownloadClosure(missing,"business")).toThrow(/mini-data/);
  expect(chartExampleCode("bar","monochrome-blue","zero","mini")).toContain('state="zero" size="mini"');
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
