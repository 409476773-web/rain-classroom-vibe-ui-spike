// @vitest-environment node
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";
import { afterEach, expect, it } from "vitest";
import { buildAssetCatalog, queryAssetCatalog, renderCatalogOutputs } from "./asset-catalog.mjs";
import { validateDiscovery, validateVocabulary } from "./asset-discovery-contract.mjs";
import { parseYamlSubset } from "./verification-helpers.mjs";

const roots: string[] = [];
afterEach(() => roots.splice(0).forEach(root => rmSync(root, { recursive: true, force: true })));
const vocabulary = { version: 1, tasks: [{ id: "navigate", label: "浏览和切换" }], families: [{ id: "content-tabs", label: "内容页签" }] };
function fixture() {
  const root = mkdtempSync(resolve(tmpdir(), "rain-discovery-")); roots.push(root);
  const put = (path: string, body: string) => { mkdirSync(dirname(resolve(root,path)),{recursive:true}); writeFileSync(resolve(root,path),body); };
  put("src/tabs.tsx", 'const Root = () => null; const Nav = () => null; export const Tabs = Object.assign(Root, { Root, Nav });');
  put("src/navigation.tsx", 'import { Tabs } from "./tabs"; function NavigationRoot() { return <Tabs.Root />; } export const NavigationTabs = Object.assign(NavigationRoot, { Root: NavigationRoot, Nav: Tabs.Nav });');
  put("src/style.css", '.tabs__track { color: inherit; }');
  put("src/local.tsx", 'export function LocalExample() { return null; }');
  put("src/usage.tsx", 'export function Example() { return null; }');
  const asset = (id: string, sourcePath: string, exportName?: string) => ({manifestPath:`manifests/${id}.yaml`, manifest:{schemaVersion:"1.0",id,name:id,sourcePath,category:"ui",assetIdentity:"registry-candidate",maturity:"prototype-ready",publication:"unpublished",description:"内容分区",useWhen:["同级内容"],doNotUseWhen:["页面地址"],parts:["track"],verification:{automated:"passed",humanGate:"awaiting_human"}}, ...(exportName ? {registryPath:`registry/${id}.json`,registry:{},item:{exportName,importPath:"@rain-next/ui",files:[sourcePath]}} : {})});
  const tabs:any = asset("ui-tabs","src/tabs.tsx","Tabs");
  const navigation:any = asset("ui-navigation-tabs","src/navigation.tsx","NavigationTabs");
  navigation.manifest.discovery={version:1,familyId:"content-tabs",taskIds:["navigate"],searchAliases:["页签"],implementationRole:"specialization",controlScope:"同级面板",stateOwner:"宿主 value",relationships:[{type:"wraps",targetId:"ui-tabs",evidence:{path:"src/navigation.tsx",symbol:"NavigationRoot",kind:"render"}}]};
  const local:any = asset("recipe-local","src/local.tsx","LocalExample"); delete local.item.importPath; local.manifest.assetIdentity="local-experiment";
  const usage:any = asset("recipe-usage","src/usage.tsx"); usage.manifest.assetIdentity="local-experiment";
  const assets=[tabs,navigation,local,usage];
  const routes={version:1,routes:[{href:"#tabs",assetIds:["ui-tabs"],viewKind:"component",pageKey:"tabs",focusTargetId:"tabs-title"},{href:"#label",assetIds:["ui-tabs"],viewKind:"usage",pageKey:"component-asset",componentId:"label",focusTargetId:"label-title"}]};
  return {root,put,assets,tabs,navigation,local,usage,options:{root,vocabulary,routes}};
}

it("validates the optional extension through the existing YAML subset without upgrading old manifests", () => {
  const parsed:any=parseYamlSubset('discovery:\n  version: 1\n  familyId: "content-tabs"\n  taskIds:\n    - "navigate"\n  implementationRole: "specialization"\n  controlScope: "面板"\n  stateOwner: "宿主"\n');
  expect(validateVocabulary(vocabulary)).toEqual(vocabulary);
  expect(validateDiscovery(undefined,vocabulary,"manifests/old.yaml")).toBeNull();
  expect(validateDiscovery(parsed.discovery,vocabulary,"manifests/new.yaml")).toEqual(parsed.discovery);
});

it("reports bad fields, vocabulary and missing relation conditions with the manifest path", () => {
  const {navigation}=fixture(); const d=navigation.manifest.discovery;
  for(const change of [{version:2},{familyId:"unknown"},{taskIds:["unknown"]},{implementationRole:"public-root"},{unexpected:true},{relationships:[{type:"alternativeWhen",targetId:"ui-tabs",evidence:{path:"src/tabs.tsx",symbol:"Tabs",kind:"contract"}}]}]) {
    expect(()=>validateDiscovery({...d,...change},vocabulary,"manifests/navigation.yaml")).toThrow(/manifests\/navigation.yaml/);
  }
});

it("keeps all identities and real entry kinds separate from the unchanged candidate qualification", () => {
  const {assets,options}=fixture(); const before=JSON.stringify(assets); const catalog=buildAssetCatalog(assets,options);
  expect(catalog.assets).toHaveLength(4); expect(JSON.stringify(assets)).toBe(before);
  expect(catalog.assets.find((a:any)=>a.id==="ui-tabs")).toMatchObject({discoveryStatus:"pending-discovery",implementationRole:null,candidateEligible:true});
  expect(catalog.assets.find((a:any)=>a.id==="recipe-local")).toMatchObject({assetIdentity:"local-experiment",candidateEligible:false,entry:{kind:"source-copy",exportNames:["LocalExample"]}});
  expect(catalog.assets.find((a:any)=>a.id==="recipe-usage")).toMatchObject({entry:{kind:"usage-reference",exportNames:[]}});
});

it("normalizes actual Object.assign members but never turns style parts into public members", () => {
  const {assets,options}=fixture(); const catalog=buildAssetCatalog(assets,options);
  const tabs=catalog.assets.find((a:any)=>a.id==="ui-tabs");
  expect(tabs.api.members.map((x:any)=>x.reference)).toEqual(["Tabs.Root","Tabs.Nav"]);
  expect(tabs.api.styleParts).toEqual(["track"]);
  expect(tabs.api.members.some((x:any)=>x.reference==="Tabs.track")).toBe(false);
});

it("rejects missing relationship targets, stale evidence symbols, path escape and imports without rendering", () => {
  for(const mutate of [
    (x:any)=>x.navigation.manifest.discovery.relationships[0].targetId="missing",
    (x:any)=>x.navigation.manifest.discovery.relationships[0].evidence.symbol="MissingRoot",
    (x:any)=>x.navigation.manifest.discovery.relationships[0].evidence.path="../outside.tsx",
    (x:any)=>x.put("src/navigation.tsx",'import { Tabs } from "./tabs"; function NavigationRoot() { return null; } export const NavigationTabs = NavigationRoot;'),
  ]) { const x=fixture(); mutate(x); expect(()=>buildAssetCatalog(x.assets,x.options)).toThrow(/ui-navigation-tabs/); }
});

it("does not equate being in the same source file with wrapping a target", () => {
  const x=fixture(); x.navigation.manifest.sourcePath="src/tabs.tsx";
  x.navigation.manifest.discovery.relationships[0].evidence={path:"src/tabs.tsx",symbol:"Tabs",kind:"render"};
  expect(()=>buildAssetCatalog(x.assets,x.options)).toThrow(/render|call/);
});

it("keeps presentation and conditional relations legal in both directions", () => {
  const x=fixture(); const d={version:1,familyId:"content-tabs",taskIds:["navigate"],implementationRole:"root",controlScope:"面板",stateOwner:"宿主"};
  x.tabs.manifest.discovery={...d,relationships:[{type:"alternativeWhen",targetId:"ui-navigation-tabs",condition:"需要导航外观时比较",evidence:{path:"src/tabs.tsx",symbol:"Tabs",kind:"contract"}}]};
  x.navigation.manifest.discovery.relationships=[{type:"alternativeWhen",targetId:"ui-tabs",condition:"完整内容面板",evidence:{path:"src/navigation.tsx",symbol:"NavigationTabs",kind:"contract"}}];
  expect(buildAssetCatalog(x.assets,x.options).assets).toHaveLength(4);
});

it("rejects invalid doc binding IDs and duplicate route ownership while preserving usage mappings", () => {
  const x=fixture();
  expect(buildAssetCatalog(x.assets,x.options).assets.find((a:any)=>a.id==="ui-tabs").documentation.map((r:any)=>r.href)).toEqual(["#tabs","#label"]);
  expect(()=>buildAssetCatalog(x.assets,{...x.options,routes:{version:1,routes:[{...x.options.routes.routes[0],assetIds:["missing"]}]}})).toThrow(/missing/);
  expect(()=>buildAssetCatalog(x.assets,{...x.options,routes:{version:1,routes:[...x.options.routes.routes,x.options.routes.routes[0]]}})).toThrow(/Duplicate.*route/);
});

it("queries exact names, aliases, tasks and families without promoting local entries", () => {
  const x=fixture(); const catalog=buildAssetCatalog(x.assets,x.options);
  expect(queryAssetCatalog(catalog,{query:"页签"}).map((x:any)=>x.id)).toEqual(["ui-navigation-tabs"]);
  expect(queryAssetCatalog(catalog,{task:"navigate"}).map((x:any)=>x.id)).toEqual(["ui-navigation-tabs"]);
  expect(queryAssetCatalog(catalog,{query:"LocalExample"})).toEqual([]);
  expect(queryAssetCatalog(catalog,{query:"LocalExample",includeLocal:true}).map((x:any)=>x.id)).toEqual(["recipe-local"]);
});

it("produces deterministic projections and source hashes without time, HEAD or an input/output cycle", () => {
  const x=fixture(); const catalog=buildAssetCatalog(x.assets,x.options); const outputs=renderCatalogOutputs(catalog);
  expect(outputs).toEqual(renderCatalogOutputs(buildAssetCatalog(x.assets,x.options)));
  expect(Object.keys(outputs)).toEqual(["docs/ai/asset-catalog.generated.json","apps/playground/src/docs/components/asset-catalog.generated.ts"]);
  expect(catalog.assets[1].relationships[0].evidence.sha256).toMatch(/^[a-f0-9]{64}$/);
  x.put("src/navigation.tsx",readFileSync(resolve(x.root,"src/navigation.tsx"),"utf8")+"\n// revised source\n");
  expect(buildAssetCatalog(x.assets,x.options).sourceDigest).not.toBe(catalog.sourceDigest);
});

it("requires actual public context exports and members, excluding internal names and style parts", () => {
  for (const reference of ["RadioControl", "TabsProps", "Tabs.track"]) {
    const x=fixture(); x.navigation.manifest.discovery.relationships=[{type:"requiresContext",targetId:"ui-tabs",condition:"同一上下文",requiredExports:[reference],evidence:{path:"src/navigation.tsx",symbol:"NavigationRoot",kind:"contract"}}];
    expect(()=>buildAssetCatalog(x.assets,x.options)).toThrow(/unverified required public/);
  }
  const x=fixture(); x.navigation.manifest.discovery.relationships=[{type:"requiresContext",targetId:"ui-tabs",condition:"同一上下文",requiredExports:["Tabs.Root"],evidence:{path:"src/navigation.tsx",symbol:"NavigationRoot",kind:"contract"}}];
  expect(buildAssetCatalog(x.assets,x.options).assets).toHaveLength(4);
});

it("does not accept another implementation's rendering as proof of the current asset wrapping", () => {
  const x=fixture(); x.put("src/other.tsx",'import { Tabs } from "./tabs"; function Other() { return <Tabs.Root />; }');
  x.navigation.manifest.discovery.relationships[0].evidence={path:"src/other.tsx",symbol:"Other",kind:"render"};
  expect(()=>buildAssetCatalog(x.assets,x.options)).toThrow(/ownership/);
});

it("rejects structural wrapping cycles while allowing nonstructural bidirectional alternatives", () => {
  const x=fixture(); x.put("src/tabs.tsx",'import { NavigationTabs } from "./navigation"; export function Tabs() { return <NavigationTabs />; }');
  x.tabs.manifest.discovery={...x.navigation.manifest.discovery,relationships:[{type:"wraps",targetId:"ui-navigation-tabs",evidence:{path:"src/tabs.tsx",symbol:"Tabs",kind:"render"}}]};
  expect(()=>buildAssetCatalog(x.assets,x.options)).toThrow(/Structural relationship cycle/);
});

it("keeps the Playground projection small and links to the full contract instead of duplicating it", () => {
  const x=fixture(); x.tabs.manifest.compositionRules=Array.from({length:100},()=>"Long contract preservation detail");
  const catalog=buildAssetCatalog(x.assets,x.options), outputs=renderCatalogOutputs(catalog);
  expect(outputs["docs/ai/asset-catalog.generated.json"]).toContain("Long contract preservation detail");
  expect(outputs["apps/playground/src/docs/components/asset-catalog.generated.ts"]).not.toContain("Long contract preservation detail");
});

it("records a proven public alias separately from search aliases and compound members", () => {
  const x=fixture(); x.put("src/tabs.tsx",'const Input = () => null; export const CommandInput = Input; export const Command = Object.assign(() => null, { Input });');
  x.tabs.item.exportNames=["CommandInput","Command"]; delete x.tabs.item.exportName;
  x.navigation.manifest.discovery.relationships=[];
  const api=buildAssetCatalog(x.assets,x.options).assets.find((asset:any)=>asset.id==="ui-tabs").api;
  expect(api.aliases).toEqual([{type:"runtimeAliasOf",reference:"CommandInput",target:"Command.Input"}]);
});

it("expands same-file object spreads with explicit overrides without equating whole objects", () => {
  const x=fixture(); x.navigation.manifest.discovery.relationships=[];
  x.put("src/tabs.tsx",'const Root=()=>null; const ConfirmRoot=()=>null; const Body=()=>null; export const Dialog={Root,Body}; export const AlertDialog={...Dialog,Root:ConfirmRoot};');
  x.tabs.item.exportNames=["Dialog","AlertDialog"]; delete x.tabs.item.exportName;
  const api=buildAssetCatalog(x.assets,x.options).assets.find((a:any)=>a.id==="ui-tabs").api;
  expect(api.members).toEqual(expect.arrayContaining([expect.objectContaining({reference:"AlertDialog.Body",target:"Body"}),expect.objectContaining({reference:"AlertDialog.Root",target:"ConfirmRoot"})]));
  expect(api.members.filter((m:any)=>m.reference==="AlertDialog.Root")).toHaveLength(1);
  expect(api.aliases).toEqual([]);
});

it("accepts public symbols in a target's registered implementation file but rejects other colocated symbols", () => {
  const x=fixture(); x.put("src/tabs.tsx",'export { Tabs } from "./parts";');
  x.put("src/parts.tsx",'export const Tabs=()=>null; export const Other=()=>null;'); x.tabs.item.files.push("src/parts.tsx");
  x.put("src/navigation.tsx",'import { Tabs } from "./parts"; function NavigationRoot(){return <Tabs />;} export const NavigationTabs=NavigationRoot;');
  expect(buildAssetCatalog(x.assets,x.options).assets).toHaveLength(4);
  x.put("src/navigation.tsx",'import { Other } from "./parts"; function NavigationRoot(){return <Other />;} export const NavigationTabs=NavigationRoot;');
  expect(()=>buildAssetCatalog(x.assets,x.options)).toThrow(/no target render/);
});

it("preserves scoped legacy acceptance without promoting it to the entire asset",()=>{
  const x=fixture(); delete x.tabs.manifest.verification;
  x.tabs.manifest.lifecycle={automatedVerification:"task-7-passed",ordinaryHumanGate:"accepted",textHumanGate:"accepted"};
  x.tabs.manifest.tokenMigration={humanGate:"accepted",reviewRoute:"#button-tokens"};
  const verification=buildAssetCatalog(x.assets,x.options).assets[0].verification;
  expect(verification.humanGate).toBe("not-recorded");
  expect(verification.scoped).toEqual(expect.arrayContaining([expect.objectContaining({sourceField:"lifecycle.ordinaryHumanGate",dimension:"humanGate",value:"accepted"}),expect.objectContaining({sourceField:"tokenMigration.humanGate",dimension:"humanGate",value:"accepted",evidence:"#button-tokens"})]));
});

it("binds the model digest to the actual package entry and export traversal inputs",()=>{
 const x=fixture();x.put("packages/ui/package.json",'{"name":"@rain-next/ui"}');x.put("src/public.ts",'export { Tabs } from "./tabs";');
 const apiTools={packageEntry:()=>"src/public.ts",exportsOf:(_root:string,_path:string,visited?:Set<string>)=>{visited?.add("src/public.ts");return new Set(["Tabs","NavigationTabs"]);}};
 const before=buildAssetCatalog(x.assets,{...x.options,apiTools}).sourceDigest;
 x.put("src/public.ts",'export { Tabs } from "./tabs";\n// explicit package entry changed');
 expect(buildAssetCatalog(x.assets,{...x.options,apiTools}).sourceDigest).not.toBe(before);
});
