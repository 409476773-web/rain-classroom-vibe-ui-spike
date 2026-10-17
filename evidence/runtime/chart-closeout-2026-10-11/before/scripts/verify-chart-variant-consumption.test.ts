import { expect, test } from "vitest";
import { dirname, resolve } from "node:path";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { assertDownloadClosure, exportedDownloads } from "./verify-chart-variant-consumption.mjs";
import { chartBusinessFiles, chartExampleFiles, chartVariantFiles } from "../apps/playground/src/docs/components/chart-example-source";
import { CHART_VARIANTS } from "../apps/playground/src/docs/components/chart-variants";

test("downloaded raw GeoJSON and relative helpers must stay in the same file set", () => {
  const complete = {
    "main.tsx": 'import { Example } from "./chart-variants/example";',
    "chart-variants/example.tsx": 'import geo from "./data/world.geojson?raw"; export const Example = () => geo;',
    "chart-variants/data/world.geojson": '{}',
  };
  expect(() => assertDownloadClosure(complete, "example")).not.toThrow();
  const missing = { ...complete };
  delete (missing as Partial<typeof missing>)["chart-variants/data/world.geojson"];
  expect(() => assertDownloadClosure(missing, "example")).toThrow("example: chart-variants/example.tsx requires ./data/world.geojson?raw");
  expect(() => assertDownloadClosure({ "main.tsx": 'import "../outside";' }, "example")).toThrow("leaves its downloaded file set");
});

test.each(["provinces.geojson","cities-hdx.geojson","counties-osm.geojson"])("URL-loaded geometry %s must be present in the actual downloaded closure", geometry => {
  const files:Record<string,string> = {
    "main.tsx": 'import "./chart-business/china-region-data";',
    "chart-business/china-region-data.ts": 'export const geometry = { provinces:new URL("./data/china/provinces.geojson",import.meta.url), cities:new URL("./data/china/cities-hdx.geojson",import.meta.url), counties:new URL("./data/china/counties-osm.geojson",import.meta.url) };',
    "chart-business/data/china/provinces.geojson":"{}", "chart-business/data/china/cities-hdx.geojson":"{}", "chart-business/data/china/counties-osm.geojson":"{}",
  };
  expect(()=>assertDownloadClosure(files,"china")).not.toThrow();
  delete files[`chart-business/data/china/${geometry}`];
  expect(()=>assertDownloadClosure(files,"china")).toThrow(`requires ./data/china/${geometry}`);
});

test("URL-loaded assets reject escaped and dynamic module-relative paths", () => {
  expect(()=>assertDownloadClosure({ "main.ts": 'new URL("../outside.geojson",import.meta.url);' },"china")).toThrow("leaves its downloaded file set");
  expect(()=>assertDownloadClosure({ "main.ts": 'const name="data.geojson"; new URL(name,import.meta.url);' },"china")).toThrow("literal");
  expect(()=>assertDownloadClosure({ "main.ts": 'new URL(`/data.geojson`,import.meta.url);' },"china")).toThrow("leaves its downloaded file set");
  expect(()=>assertDownloadClosure({ "main.ts": 'new URL(`./data.geojson`,import.meta.url);', "data.geojson":"{}" },"china")).not.toThrow();
});

test("China downloads are extracted from their independent source module with all raw geometry", async () => {
  const directory=mkdtempSync(resolve(tmpdir(),"rain-china-download-test-"));
  try {
    mkdirSync(resolve(directory,"chart-business/data/china"),{recursive:true});
    writeFileSync(resolve(directory,"chart-business/data/china/provinces.geojson"),"{}");
    writeFileSync(resolve(directory,"chart-china-source.tsx"),'const chinaDataFiles = import.meta.glob("./chart-business/data/china/*",{query:"?raw",import:"default",eager:true}) as Record<string,string>; export function chartChinaFiles(settings:{state:string}) { return {"main.tsx":`export const state=${JSON.stringify(settings.state)};`,...Object.fromEntries(Object.entries(chinaDataFiles).map(([path,source])=>[path.replace("./",""),source]))}; }');
    const exporter=await exportedDownloads(directory,"chartChinaFiles");
    expect(exporter.files({state:"missing"})).toEqual({"main.tsx":'export const state="missing";',"chart-business/data/china/provinces.geojson":"{}"});
  } finally { rmSync(directory,{recursive:true,force:true}); }
});

test("the real China exporter preserves current settings and includes all licensed local geometry", async () => {
  const directory=resolve(dirname(fileURLToPath(import.meta.url)),"../apps/playground/src/docs/components");
  const exporter=await exportedDownloads(directory,"chartChinaFiles");
  const files=exporter.files({provinceId:"440000",selectedId:"440100",state:"missing",revision:3,recipe:"intensity"}) as Record<string,string>;
  expect(()=>assertDownloadClosure(files,"china-real")).not.toThrow();
  expect(Object.keys(files)).toHaveLength(12);
  expect(files["chart-business/china-region-map.tsx"]).toContain("ChinaRegionMap");
  const missingMap = { ...files }; delete missingMap["chart-business/china-region-map.tsx"];
  expect(() => assertDownloadClosure(missingMap,"china-map-missing")).toThrow();
  expect(Object.keys(files).some(path=>path.includes("world.geojson"))).toBe(false);
  expect(files["main.tsx"]).toContain('"provinceId":"440000","selectedId":"440100","state":"missing","revision":3,"recipe":"intensity"');
  for (const [path,source] of Object.entries(files)) if (!["main.tsx","index.html"].includes(path)) expect(source).toBe(readFileSync(resolve(directory,path),"utf8"));
  for (const name of ["provinces.geojson","cities-hdx.geojson","counties-osm.geojson"]) {
    const incomplete={...files};delete incomplete[`chart-business/data/china/${name}`];
    expect(()=>assertDownloadClosure(incomplete,"china-real")).toThrow(`requires ./data/china/${name}`);
  }
});

test("the explicit single-example extractor loads chartExampleCode and preserves existing exporters",async()=>{
  const directory=resolve(dirname(fileURLToPath(import.meta.url)),"../apps/playground/src/docs/components");
  for (const [name,settings,owning] of [
    ["chartExampleFiles",{id:"ring",recipe:"monochrome-blue",state:"normal",size:"mini",miniSize:"comfortable",seriesCount:5,revision:4},chartExampleFiles],
    ["chartBusinessFiles",{recipe:"monochrome-blue",state:"normal",revision:3,descending:true,many:false,filter:false},chartBusinessFiles],
  ] as const) {
    const exporter=await exportedDownloads(directory,name);
    let actual:Record<string,string>={};
    expect(()=>{actual=exporter.files(settings);}).not.toThrow();
    const expected=owning(settings as never);
    expect(Object.keys(actual)).toEqual(Object.keys(expected));
    expect(actual["main.tsx"]).toBe(expected["main.tsx"]);
    for (const [name,source] of Object.entries(actual)) if (!["main.tsx","index.html"].includes(name)) expect(source).toBe(readFileSync(resolve(directory,name),"utf8"));
    expect(()=>assertDownloadClosure(actual,name)).not.toThrow();
  }
  const variant=CHART_VARIANTS.find(item=>item.id==="pie-default")!;
  const exporter=await exportedDownloads(directory);
  const actual=exporter.files(variant,"category-near",2),expected=chartVariantFiles(variant,"category-near",2);
  expect(Object.keys(actual)).toEqual(Object.keys(expected));
  expect(actual["main.tsx"]).toBe(expected["main.tsx"]);
});
