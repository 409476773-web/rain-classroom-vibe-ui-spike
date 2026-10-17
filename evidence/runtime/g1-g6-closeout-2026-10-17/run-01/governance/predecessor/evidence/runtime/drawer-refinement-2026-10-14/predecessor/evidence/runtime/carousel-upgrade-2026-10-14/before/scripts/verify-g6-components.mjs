import { createHash } from "node:crypto";
import assert from "node:assert/strict";
import { readFileSync, lstatSync, writeFileSync } from "node:fs";
import { join, resolve, relative, isAbsolute } from "node:path";
import { fileURLToPath } from "node:url";
import { getG6SourceBindings, parseYamlSubset } from "./verification-helpers.mjs";
import { readAssets, verifyAssetIndex } from "./asset-index.mjs";
import { verifyG6ColorConsumers } from "./g6-color-consumers.mjs";
const ids=["data-table","aspect-ratio","attachment","drawer","input-otp","carousel","direction","bubble","marker","message","message-scroller","questionnaire"];
export function verifyG6FixedSources(root=process.cwd()) {
 const lock=JSON.parse(readFileSync(join(root,"evidence/runtime/g6-components-2026-10-14/source-lock.json"),"utf8"));
 const supplement=JSON.parse(readFileSync(join(root,"evidence/runtime/g6-research-2026-10-14/source-supplement.json"),"utf8"));
 assert.equal(lock.fixedCommit,"3ba91b1cc83e1bbe4ab35a422ff2a694849c5048");assert.equal(supplement.fixedCommit,lock.fixedCommit);
 const rows=[...lock.fixedFiles,...supplement.files];
 function bytesFor(row){const path=resolve(root,row.stored),local=relative(root,path);assert(!isAbsolute(local)&&!local.startsWith(".."));const stat=lstatSync(path);assert(stat.isFile()&&!stat.isSymbolicLink());return readFileSync(path);}
 for(const row of rows){const bytes=bytesFor(row);assert.equal(createHash("sha256").update(bytes).digest("hex"),row.sha256,"G6 fixed source changed: "+row.stored);assert.equal(bytes.length,row.bytes,"G6 fixed source length changed: "+row.stored);}
 const engine=lock.enginePackage,bytes=bytesFor(engine);assert.equal(engine.name,"@shadcn/react");assert.equal(engine.version,"0.3.1");assert.equal(bytes.length,engine.tarballBytes);assert.equal(createHash("sha256").update(bytes).digest("hex"),engine.sha256);assert.equal("sha512-"+createHash("sha512").update(bytes).digest("base64"),engine.integrity);
 return {fixedSources:rows.length,engineTarball:"sha256-and-sha512-verified"};
}
export function verifyG6Components(root=process.cwd()) {
 const bindings=getG6SourceBindings(root);assert(bindings,"G6 requires exact source authorization");const fixed=verifyG6FixedSources(root);
 const assets=readAssets(root).filter(asset=>asset.registryPath==="registry/g6-assets.json" || asset.item&&ids.includes(asset.item.name)&&asset.manifest.sourceEvidence?.includes("evidence/runtime/g6-components-2026-10-14/source-lock.json"));
 const registry=JSON.parse(readFileSync(join(root,"registry/g6-assets.json"),"utf8"));
 assert.deepEqual(registry.items.map(item=>item.name).sort(),[...ids].sort());
 assert.equal(assets.length,12,"G6 must resolve twelve real assets");
 for(const asset of assets){assert.equal(asset.manifest.humanGate,"awaiting_human");assert.equal(asset.manifest.contrastAcceptance,"not-granted");assert.equal(asset.manifest.publication,"unpublished");assert(asset.manifest.parts.length>0);}
 const installed=JSON.parse(readFileSync(join(root,"packages/ui/package.json"),"utf8")).dependencies;
 for(const [name,version] of Object.entries({"input-otp":"1.4.2","embla-carousel-react":"8.5.2","@shadcn/react":"0.3.1"}))assert.equal(installed[name],version);
 assert(!Object.hasOwn(installed,"@tanstack/react-table"),"Data Table engine stays at application layer");
 const docSource=readFileSync(join(root,"apps/playground/src/docs/components/component-catalog.tsx"),"utf8");
 for(const id of ids)assert(docSource.includes(`id: "${id}"`),`Missing real route ${id}`);
 verifyAssetIndex(root);const colors=verifyG6ColorConsumers(root);
 const foundations=readFileSync(join(root,"packages/foundations/src/tokens.css"),"utf8")+readFileSync(join(root,"packages/foundations/src/typography.css"),"utf8")+readFileSync(join(root,"packages/foundations/src/focus.css"),"utf8")+readFileSync(join(root,"packages/foundations/src/motion.css"),"utf8");
 for(const [path,binding] of Object.entries(bindings.sourceFiles)){
  if(!binding.after||!path.endsWith(".css")||!path.includes("g6")&&!/packages\/ui\/src\/(?:attachment|drawer|input-otp|carousel|bubble|marker|message|message-scroller|questionnaire)\//.test(path))continue;
  const source=readFileSync(join(root,path),"utf8");
  for(const match of source.matchAll(/var\((--rain-[a-z0-9-]+)/g))assert((foundations+source).includes(match[1]+":"),`Unregistered variable ${path}: ${match[1]}`);
 }
 return {scope:"12-local-G6-source-assets-and-finite-token-consumers",...fixed,assets:12,sourcePaths:Object.values(bindings.sourceFiles).filter(binding=>binding.after!==null).length,dependencies:"three-exact-installed",colorMeasurements:colors.measurements.length,pendingContrast:colors.pendingContrastFindings.length,pendingEligibility:colors.pendingEligibilityFindings.length,nativePaints:colors.pendingPaintObservations.length,humanGate:"awaiting_human",contrastAcceptance:"not-granted",publication:"unpublished"};
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const result=verifyG6Components();if(process.argv.includes("--write"))writeFileSync("evidence/runtime/g6-components-2026-10-14/scoped-governance.json",JSON.stringify(result,null,2)+"\n");console.log(JSON.stringify(result,null,2));
}
