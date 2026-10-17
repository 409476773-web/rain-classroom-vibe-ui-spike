import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, existsSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { resolve, dirname, relative } from "node:path";
import { isDeepStrictEqual } from "node:util";
import { parseYamlSubset } from "../../../scripts/verification-helpers.mjs";
import { verifyAssetIndex } from "../../../scripts/asset-index.mjs";
const root = process.cwd(), base = "evidence/runtime/attachment-scenarios-2026-10-16";
const read = path => readFileSync(resolve(root,path),"utf8");
const json = path => JSON.parse(read(path));
const sha = path => createHash("sha256").update(readFileSync(resolve(root,path))).digest("hex");
const walk = path => readdirSync(resolve(root,path),{withFileTypes:true}).flatMap(entry => entry.isDirectory()?walk(`${path}/${entry.name}`):[`${path}/${entry.name}`]);
const baseline = json(`${base}/baseline-hashes.json`), bindings = json(`${base}/source-bindings.json`), checks=[];
function check(name, run) { try { checks.push({name,status:"passed",details:run()}); } catch(error) { checks.push({name,status:"failed",error:error.message}); } }
check("preserved-baseline-and-original-engines",()=>{
  for(const [path,hash] of Object.entries(baseline)) assert.equal(sha(`${base}/baseline/${path}`),hash,`Baseline copy changed: ${path}`);
  const protectedPaths=Object.keys(baseline).filter(path=>path.startsWith("packages/ui/src/attachment/") || path.startsWith("packages/ui/src/attachment-workflow/") && !/attachment-(?:list|preview|picker)\.|README/.test(path));
  for(const path of protectedPaths) assert.equal(sha(path),baseline[path],`Protected source changed: ${path}`);
  for(const path of ["design-notes.md","design-qa.md"]) assert(read(path).startsWith(read(`${base}/baseline/${path}`)),`Prior record overwritten: ${path}`);
  assert.equal(sha(bindings.predecessor.path),bindings.predecessor.sha256);
  return {baselineCopies:Object.keys(baseline).length,protectedSources:protectedPaths.length,priorRecordsPreserved:true};
});
check("runtime-source-dependency-closure",()=>{
  const registry=json("registry/attachment-workflow.json"),item=registry.items[0],manifest=parseYamlSubset(read("manifests/recipes/attachment-workflow.yaml"));
  assert.equal(registry.sourceBindings,`${base}/source-bindings.json`);assert.equal(item.sourceBindings,registry.sourceBindings);assert.equal(registry.verificationEvidence,`${base}/verification.md`);assert.equal(manifest.verification.evidence,registry.verificationEvidence);
  const declared=new Set([...registry.shared.files,...item.files]);
  for(const ref of item.registryDependencies) { const [path,name]=ref.split("#"),dependency=json(path),entry=dependency.items.find(value=>value.name===name);assert(entry,`Missing dependency ${ref}`);for(const path of [...dependency.shared?.files??[],...entry.files]) declared.add(path); }
  let imports=0;
  for(const path of walk("packages/ui/src/attachment-workflow").filter(path=>/\.(?:ts|tsx|css)$/.test(path)&& !/\.test\.tsx?$/.test(path))) {
    assert(item.files.includes(path),`Unregistered runtime file: ${path}`);
    for(const match of read(path).matchAll(/(?:\bfrom\s*|\bimport\s*|@import\s*)["'](\.{1,2}\/[^"']+)["']/g)) {const target=resolve(root,dirname(path),match[1]);const found=[target,`${target}.ts`,`${target}.tsx`,`${target}/index.ts`].find(path=>existsSync(path)&&statSync(path).isFile());assert(found&&declared.has(relative(root,found)),`Undeclared import: ${path} -> ${match[1]}`);imports++;}
  }
  for(const entry of [registry,manifest]) {assert.equal(entry.humanGate,"awaiting_human");assert.equal(entry.contrastAcceptance,"not-granted");}
  return {localImports:imports,runtimeFiles:item.files.length};
});
check("scoped-lifecycle-only",()=>{
  const before=parseYamlSubset(read(`${base}/baseline/status/current-phase.yaml`)),current=parseYamlSubset(read("status/current-phase.yaml"));
  const node=current.componentRefinements.attachmentFunctions.visualRefinement.scenarioImplementation;
  assert.equal(node.sourceBindings,`${base}/source-bindings.json`);assert.equal(node.automatedVerification,"scoped-passed");assert.equal(node.humanGate,"awaiting_human");assert.equal(node.contrastAcceptance,"not-granted");assert.equal(node.publication,"unpublished");
  delete current.componentRefinements.attachmentFunctions.visualRefinement.scenarioImplementation;assert(isDeepStrictEqual(current,before),"Unrelated status changed");
  assert.equal(current.componentRefinements.attachmentFunctions.originalG6Denominator,12);return {appendedOnly:"visualRefinement.scenarioImplementation",originalG6:12};
});
check("current-source-and-evidence-bindings",()=>{
  for(const [path,value] of Object.entries(bindings.sourceFiles)) assert.equal(sha(path),value.after,`Current source changed: ${path}`);
  for(const [path,hash] of Object.entries(bindings.screenshots)) assert.equal(sha(path),hash,`Screenshot changed: ${path}`);
  for(const [path,hash] of Object.entries(bindings.references)) assert.equal(sha(path),hash,`Selected reference changed: ${path}`);
  assert(read("design-qa.md").trim().endsWith("final result: passed"));
  return {currentSources:Object.keys(bindings.sourceFiles).length,screenshots:Object.keys(bindings.screenshots).length,references:Object.keys(bindings.references).length};
});
check("real-assets-and-media-provenance",()=>{
  const assets=json(`${base}/assets.json`);assert.equal(assets.assets.length,8);
  for(const asset of assets.assets) {assert.equal(sha(asset.path),asset.sha256);assert.equal(statSync(asset.path).size,asset.bytes);assert(readFileSync(asset.path).subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])));}
  const video=readFileSync(assets.video.path);assert.equal(video.subarray(4,8).toString(),"ftyp");assert.equal(video.length,assets.video.bytes);assert.equal(sha(assets.video.path),assets.video.sha256);assert.equal(assets.video.fullDecode,"passed");
  return {generatedPhotographs:8,realH264Bytes:video.length};
});
check("targeted-tests-build-and-browser-evidence",()=>{
  assert(/Tests\s+263 passed \(263\)/.test(read(`${base}/tests/final-unit.log`)));
  const expected={"browser/report.json":24,"browser-fold/report.json":2,"browser-final-visual/report.json":8};
  for(const [path,count] of Object.entries(expected)) {const stats=json(`${base}/${path}`).stats;assert.equal(stats.expected,count);assert.equal(stats.unexpected,0);assert.equal(stats.flaky,0);assert.equal(stats.skipped,0);}
  const compile=json(`${base}/tests/compile-results.json`);assert.equal(compile.length,4);compile.forEach(result=>assert.equal(result.exitCode,0));assert.deepEqual(json(`${base}/screenshots/console-final.json`).entries,[]);
  return {unit:263,distinctBrowserCases:26,latestAffectedCases:8,compileChecks:4};
});
check("generated-asset-index-current",()=>{verifyAssetIndex(root);return {generatedIndexCurrent:true};});
const failed=checks.filter(check=>check.status!=="passed");writeFileSync(resolve(root,`${base}/verification.json`),JSON.stringify({scope:"attachment-confirmed-scenes",checks,result:failed.length?"failed":"passed-scoped"},null,2)+"\n");
checks.forEach(check=>console.log(`${check.status.toUpperCase()} ${check.name}${check.error?`: ${check.error}`:""}`));if(failed.length)process.exitCode=1;
