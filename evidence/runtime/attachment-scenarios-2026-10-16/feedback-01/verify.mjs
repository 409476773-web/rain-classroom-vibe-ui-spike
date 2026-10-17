import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, existsSync, statSync, readdirSync } from "node:fs";
import { resolve, dirname, relative } from "node:path";
import { isDeepStrictEqual } from "node:util";
import { parseYamlSubset } from "../../../../scripts/verification-helpers.mjs";
import { verifyAssetIndex } from "../../../../scripts/asset-index.mjs";

const root=process.cwd(),base="evidence/runtime/attachment-scenarios-2026-10-16/feedback-01";
const read=path=>readFileSync(resolve(root,path),"utf8"),json=path=>JSON.parse(read(path));
const sha=path=>createHash("sha256").update(readFileSync(resolve(root,path))).digest("hex");
const walk=path=>readdirSync(resolve(root,path),{withFileTypes:true}).flatMap(entry=>entry.isDirectory()?walk(`${path}/${entry.name}`):[`${path}/${entry.name}`]);
const baseline=json(`${base}/baseline.json`),bindings=json(`${base}/source-bindings.json`),predecessor=json(baseline.predecessor.path),checks=[];
function check(name,run){try{checks.push({name,status:"passed",details:run()});}catch(error){checks.push({name,status:"failed",error:error.message});}}

check("preserved-predecessor-and-unaffected-sources",()=>{
  assert.equal(sha(baseline.predecessor.path),baseline.predecessor.sha256);
  assert.deepEqual(bindings.predecessor,baseline.predecessor);
  for(const [path,hash] of Object.entries(baseline.sourceFiles))assert.equal(sha(`${base}/before/${path}`),hash,`Baseline changed: ${path}`);
  const allowed=new Set(Object.keys(baseline.sourceFiles));let protectedSources=0;
  for(const [path,value] of Object.entries(predecessor.sourceFiles))if(!allowed.has(path)){assert.equal(sha(path),value.after,`Unrelated source changed: ${path}`);protectedSources++;}
  for(const path of ["design-notes.md","design-qa.md"])assert(read(path).startsWith(read(`${base}/before/${path}`)),`Prior record overwritten: ${path}`);
  return {predecessorSealPreserved:true,baselineCopies:allowed.size,unaffectedSources:protectedSources};
});

check("registered-dependencies-and-scoped-lifecycle",()=>{
  const registry=json("registry/attachment-workflow.json"),item=registry.items[0],manifest=parseYamlSubset(read("manifests/recipes/attachment-workflow.yaml"));
  assert.equal(registry.sourceBindings,`${base}/source-bindings.json`);assert.equal(item.sourceBindings,registry.sourceBindings);
  assert.equal(registry.verificationEvidence,`${base}/verification.md`);assert.equal(manifest.verification.evidence,registry.verificationEvidence);
  const declared=new Set([...registry.shared.files,...item.files]);
  for(const ref of item.registryDependencies){const [path,name]=ref.split("#"),dependency=json(path),entry=dependency.items.find(value=>value.name===name);assert(entry,`Missing dependency ${ref}`);for(const path of [...dependency.shared?.files??[],...entry.files])declared.add(path);}
  let imports=0;
  for(const path of walk("packages/ui/src/attachment-workflow").filter(path=>/\.(?:ts|tsx|css)$/.test(path)&&!/\.test\.tsx?$/.test(path))){
    assert(item.files.includes(path),`Unregistered runtime file: ${path}`);
    for(const match of read(path).matchAll(/(?:\bfrom\s*|\bimport\s*|@import\s*)["'](\.{1,2}\/[^"']+)["']/g)){
      const target=resolve(root,dirname(path),match[1]),found=[target,`${target}.ts`,`${target}.tsx`,`${target}/index.ts`].find(path=>existsSync(path)&&statSync(path).isFile());
      assert(found&&declared.has(relative(root,found)),`Undeclared import: ${path} -> ${match[1]}`);imports++;
    }
  }
  for(const entry of [registry,manifest]){assert.equal(entry.humanGate,"awaiting_human");assert.equal(entry.contrastAcceptance,"not-granted");}
  const before=parseYamlSubset(read(`${base}/before/status/current-phase.yaml`)),current=parseYamlSubset(read("status/current-phase.yaml"));
  const node=current.componentRefinements.attachmentFunctions.visualRefinement.scenarioImplementation.actionFeedback;
  assert.equal(node.sourceBindings,`${base}/source-bindings.json`);assert.equal(node.automatedVerification,"scoped-passed");assert.equal(node.humanGate,"awaiting_human");assert.equal(node.contrastAcceptance,"not-granted");assert.equal(node.publication,"unpublished");
  delete current.componentRefinements.attachmentFunctions.visualRefinement.scenarioImplementation.actionFeedback;
  assert(isDeepStrictEqual(current,before),"Unrelated lifecycle state changed");
  return {localImports:imports,appendedOnly:"scenarioImplementation.actionFeedback",humanGate:"awaiting_human",publication:"unpublished"};
});

check("current-source-and-evidence-bindings",()=>{
  for(const [path,value] of Object.entries(bindings.sourceFiles))assert.equal(sha(path),value.after,`Current source changed: ${path}`);
  for(const section of ["screenshots","references","evidenceFiles"])for(const [path,hash] of Object.entries(bindings[section]))assert.equal(sha(path),hash,`Evidence changed: ${path}`);
  assert(read("design-qa.md").trim().endsWith("final result: passed"));
  return {currentSources:Object.keys(bindings.sourceFiles).length,screenshots:Object.keys(bindings.screenshots).length,references:Object.keys(bindings.references).length,evidenceFiles:Object.keys(bindings.evidenceFiles).length};
});

check("targeted-tests-build-and-native-dimensions",()=>{
  assert(/Tests\s+266 passed \(266\)/.test(read(`${base}/tests/unit.log`)));
  const stats=json(`${base}/browser/report.json`).stats;
  assert.equal(stats.expected,6);assert.equal(stats.unexpected,0);assert.equal(stats.flaky,0);assert.equal(stats.skipped,0);
  const compile=json(`${base}/tests/compile.json`);assert.equal(compile.length,4);compile.forEach(result=>assert.equal(result.exitCode,0));
  const metrics=json(`${base}/screenshots/native-metrics.json`);assert.equal(metrics.before,56);assert.equal(metrics.after.height,metrics.before);assert.equal(metrics.after.metadataHeight,20);metrics.after.icons.forEach(icon=>assert.equal(icon.highlight,"none"));
  return {unit:266,browser:6,compileChecks:4,nativeRowBefore:56,nativeRowAfter:56};
});

check("generated-asset-index-current",()=>{verifyAssetIndex(root);return {generatedIndexCurrent:true};});
const failed=checks.filter(check=>check.status!=="passed");
writeFileSync(resolve(root,`${base}/verification.json`),JSON.stringify({scope:"attachment-neutral-actions-two-line-feedback",checks,result:failed.length?"failed":"passed-scoped"},null,2)+"\n");
checks.forEach(check=>console.log(`${check.status.toUpperCase()} ${check.name}${check.error?`: ${check.error}`:""}`));if(failed.length)process.exitCode=1;
