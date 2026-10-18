// @vitest-environment node
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { beforeAll, expect, it } from "vitest";
import { readAssets, exportsOf, packageEntry } from "./asset-index.mjs";
import { buildAssetCatalog, queryAssetCatalog } from "./asset-catalog.mjs";

const root=resolve(dirname(fileURLToPath(import.meta.url)),"..");
let catalog:any;
beforeAll(()=>{ catalog=buildAssetCatalog(readAssets(root),{root,apiTools:{exportsOf,packageEntry}}); },30_000);
const get=(id:string)=>catalog.assets.find((asset:any)=>asset.id===id);

it("distinguishes link, panel, scope, object, field and pressed-state owners in the pilot",()=>{
  for(const id of ["ui-navigation-bar","ui-tabs","ui-scope-navigation","ui-object-navigator","ui-radio-group","ui-toggle-group"]) {
    expect(get(id).discoveryStatus,id).toBe("registered");
    expect(get(id).stateOwner,id).toBeTruthy(); expect(get(id).controlScope,id).toBeTruthy();
  }
  expect(new Set(["ui-navigation-bar","ui-tabs","ui-scope-navigation","ui-object-navigator","ui-radio-group","ui-toggle-group"].map(id=>get(id).controlScope)).size).toBe(6);
});

it("proves real Tabs/Radio wrapping while keeping shared presentation and internal behavior distinct",()=>{
  expect(get("ui-navigation-tabs").relationships).toEqual(expect.arrayContaining([expect.objectContaining({type:"wraps",targetId:"ui-tabs"})]));
  expect(get("ui-navigation-tabs").api.members).toEqual(expect.arrayContaining([expect.objectContaining({reference:"NavigationTabs.Nav",target:"Tabs.Nav"})]));
  expect(get("ui-navigation-bar").relationships.some((edge:any)=>edge.type==="wraps"&&edge.targetId==="ui-tabs")).toBe(false);
  expect(get("ui-navigation-bar").relationships).toEqual(expect.arrayContaining([expect.objectContaining({type:"sharesPresentation",targetId:"ui-tabs"})]));
  expect(get("ui-segmented-control").relationships).toEqual(expect.arrayContaining([expect.objectContaining({type:"wraps",targetId:"ui-radio-group"}),expect.objectContaining({type:"usesBehavior",targetId:"ui-radio",evidence:expect.objectContaining({targetSymbol:"RadioControl"})})]));
  expect(get("ui-segmented-control").entry.exportNames).not.toContain("RadioControl");
});

it("keeps Label/Field, text button and Input Group as existing usage views with no invented import",()=>{
  for(const href of ["#label","#field"]) expect(catalog.routes.find((route:any)=>route.href===href).assetIds).toEqual(["ui-form-item"]);
  for(const href of ["#text-button","#text-button-help"]) expect(catalog.routes.find((route:any)=>route.href===href).assetIds).toEqual(["ui-button"]);
  expect(get("recipe-input-group")).toMatchObject({implementationRole:"usage-reference",entry:{kind:"usage-reference",exportNames:[]}});
  expect(get("ui-native-select")).toMatchObject({implementationRole:"compatibility",entry:{exportNames:["NativeSelect","NativeSelectOption","NativeSelectOptGroup"]}});
});

it("removes A5 card geometry from other assets while retaining ObjectNavigator's real constraint",()=>{
  const assets=readAssets(root);
  for(const id of ["ui-navigation-list","ui-segmented-control"]) expect(assets.find((a:any)=>a.manifest.id===id)!.manifest.layoutConstraints.some((value:string)=>value.includes("A5 cards"))).toBe(false);
  expect(assets.find((a:any)=>a.manifest.id==="ui-object-navigator")!.manifest.layoutConstraints.some((value:string)=>value.includes("A5 cards"))).toBe(true);
});

it("finds current feedback and flat grouped navigation without promoting misleading aliases",()=>{
  expect(get("ui-alert").doNotUseWhen.some((value:string)=>value.includes("Message/Toast"))).toBe(false);
  expect(queryAssetCatalog(catalog,{query:"分组导航"}).map((asset:any)=>asset.id)).toContain("ui-navigation-list");
  expect(get("ui-navigation-list").relationships).toEqual(expect.arrayContaining([expect.objectContaining({type:"alternativeWhen",targetId:"ui-tree"})]));
  expect(get("ui-native-select").relationships.some((edge:any)=>["wraps","runtimeAliasOf"].includes(edge.type)&&edge.targetId==="ui-select")).toBe(false);
});

it("preserves the existing teacher-grading panel contract and keeps layout ownership external",()=>{
  const tabs=get("ui-tabs");
  expect(tabs.modification.compositionRules.some((rule:string)=>rule.includes("teacher-grading")&&rule.includes("Tabs"))).toBe(true);
  const source=readFileSync(resolve(root,"apps/prototype/src/scenarios/teacher-grading/page.tsx"),"utf8");
  expect(source).toContain('<Tabs.Root className="tg-order-tabs"'); expect(source).toContain('<Tabs.Root className="tg-paper-tabs"');
  expect(get("ui-scope-navigation").stateOwner).toContain("草稿");
  expect(get("ui-sidebar").stateOwner).toContain("单一");
  expect(get("ui-scope-navigation").relationships.some((edge:any)=>edge.type==="wraps"&&edge.targetId==="layout-connected-surface")).toBe(false);
});
