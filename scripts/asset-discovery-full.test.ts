// @vitest-environment node
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { beforeAll, expect, it } from "vitest";
import { readAssets, exportsOf, packageEntry } from "./asset-index.mjs";
import { buildAssetCatalog, queryAssetCatalog, renderCatalogOutputs } from "./asset-catalog.mjs";
const root=resolve(dirname(fileURLToPath(import.meta.url)),"..");
let catalog:any;
beforeAll(()=>{catalog=buildAssetCatalog(readAssets(root),{root,apiTools:{exportsOf,packageEntry}});},30_000);
const get=(id:string)=>catalog.assets.find((a:any)=>a.id===id);
const edge=(id:string,type:string,targetId:string)=>get(id).relationships.find((r:any)=>r.type===type&&r.targetId===targetId);

it("covers every live Manifest once with actual task/family and owner without changing candidate eligibility",()=>{
 expect(catalog.coverage).toEqual({total:140,registered:140,pending:[]});
 expect(new Set(catalog.assets.map((a:any)=>a.familyId)).size).toBe(26);
 expect(new Set(catalog.assets.flatMap((a:any)=>a.taskIds)).size).toBe(9);
 expect(catalog.assets.filter((a:any)=>a.candidateEligible)).toHaveLength(119);
 expect(catalog.assets.filter((a:any)=>a.assetIdentity==="local-experiment")).toHaveLength(12);
 for(const a of catalog.assets){expect(a.controlScope,a.id).toBeTruthy();expect(a.stateOwner,a.id).toBeTruthy();}
});
it("keeps usage and local-copy entries distinct from public exports",()=>{
 expect(get("recipe-input-group").entry).toMatchObject({kind:"usage-reference",exportNames:[]});
 expect(get("recipe-data-table").entry).toMatchObject({kind:"source-copy",importPath:null,exportNames:["DataTableRecipe"]});
 expect(get("pattern-manage-tree").entry).toMatchObject({kind:"source-copy",importPath:null});
 expect(get("recipe-radio-card-with-preview").entry).toMatchObject({kind:"public-import",importPath:"@rain-next/ui",exportNames:["RadioCardWithPreview"]});
});
it("records actual compound members and named parts without inventing FormItem or TextButton components",()=>{
 expect(queryAssetCatalog(catalog,{query:"TextButton",includeLocal:true}).map((a:any)=>a.id)).toContain("ui-button");
 expect(get("ui-button").entry.exportNames).toEqual(["Button"]);
 expect(get("ui-form-item").api.members).toEqual([]);
 expect(get("ui-form-item").entry.exportNames).toEqual(["FormItem"]);
 const alert=get("ui-alert-dialog").api.members;
 expect(alert).toEqual(expect.arrayContaining([expect.objectContaining({reference:"AlertDialog.Body",target:"Body"}),expect.objectContaining({reference:"AlertDialog.Root",target:"AlertRoot"})]));
 expect(get("ui-alert-dialog").api.aliases).toEqual([]);
 for(const id of ["ui-context-menu","ui-hover-card"]){expect(get(id).api.members.some((m:any)=>m.member==="Popup")).toBe(true);expect(get(id).api.members.some((m:any)=>m.member==="Content")).toBe(false);}
 expect(get("ui-command").api.aliases).toContainEqual({type:"runtimeAliasOf",reference:"CommandInput",target:"Command.Input"});
});
it("keeps the three review-addendum relations precise",()=>{
 expect(edge("ui-navigation-bar","sharesPresentation","ui-tabs")).toBeTruthy();
 expect(edge("ui-navigation-bar","wraps","ui-tabs")).toBeUndefined();
 expect(edge("ui-drawer","alternativeWhen","ui-sheet").condition).toContain("自动组装");
 expect(edge("ui-chart-profit-loss","requiresContext","ui-chart-line").requiredExports).toEqual(["LineChart","Line"]);
 expect(get("ui-chart-profit-loss").implementationRole).toBe("specialization");
 expect(get("ui-chart-profit-loss").stateOwner).toContain("同 dataKey");
});
it("keeps selection, preview and classifier cardinality explicit",()=>{
 expect(get("recipe-radio-preview-card").stateOwner).toContain("无独立 onPreview");
 expect(get("recipe-radio-card-with-preview").stateOwner).toContain("预览不改变选择");
 expect(get("ui-checkable-tag").stateOwner).toContain("不支持 defaultChecked");
 expect(get("ui-checkable-tag-group").stateOwner).toContain("single 为 string|null、multiple 为数组");
 expect(edge("ui-tag-select","alternativeWhen","ui-select")).toBeTruthy();
 expect(edge("ui-tag-select","wraps","ui-select")).toBeUndefined();
 expect(get("ui-status-tag").controlScope).toContain("进行中、未提交、已结束");
});
it("describes conversation composition and questionnaire adapters without creating duplicate state owners",()=>{
 expect(edge("recipe-conversation-composer","composes","recipe-attachment-workflow").condition).toContain("上传队列由宿主");
 expect(edge("ui-message","exampleUses","ui-bubble")).toBeTruthy();
 expect(edge("ui-message","wraps","ui-bubble")).toBeUndefined();
 expect(edge("ui-questionnaire","sharesPresentation","ui-input")).toBeTruthy();
 expect(edge("ui-questionnaire","wraps","ui-input")).toBeUndefined();
 expect(get("layout-workspace").stateOwner).toContain("一个控制器");
});
it("keeps chart data contracts and part contexts distinct",()=>{
 expect(get("ui-chart-heatmap").controlScope).toContain("日期");
 expect(get("ui-chart-matrix").controlScope).toContain("任意分类");
 expect(get("ui-chart-pie").controlScope).toContain("同一总量");
 expect(get("ui-chart-ring").controlScope).toContain("各自拥有 maxValue");
 expect(get("ui-chart-scatter").controlScope).toContain("Date 时间 X");
 expect(get("ui-chart-live-line").stateOwner).toContain("有界");
});
it("preserves historical scoped acceptance and exposes modification/Parts in the same generated UI model",()=>{
 const button=get("ui-button");expect(button.assetIdentity).toBe("local-experiment");
 expect(button.verification.scoped).toEqual(expect.arrayContaining([expect.objectContaining({sourceField:"lifecycle.ordinaryHumanGate",value:"accepted"}),expect.objectContaining({sourceField:"lifecycle.textHumanGate",value:"accepted"})]));
 expect(get("ui-tabs").verification).toMatchObject({humanGate:"accepted",scope:"tabs-runtime-visual-only",contrastAcceptance:"not-granted"});
 const output=renderCatalogOutputs(catalog)["apps/playground/src/docs/components/asset-catalog.generated.ts"];
 expect(output).toContain('"styleParts"');expect(output).toContain('"allowed"');expect(output).toContain('"restricted"');
 expect(readFileSync(resolve(root,"packages/ui/src/input/form-item.tsx"),"utf8")).toContain("export function FormItem(");
});
