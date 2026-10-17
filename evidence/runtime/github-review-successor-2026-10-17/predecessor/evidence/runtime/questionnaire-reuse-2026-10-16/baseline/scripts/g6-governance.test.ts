import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { expect, it } from "vitest";
import * as helpers from "./verification-helpers.mjs";
import { copyDatePickerCloseoutFixture } from "./select-unification-test-fixture";

const directory = "evidence/runtime/g6-components-2026-10-14/";
const read = (file: string) => readFileSync(file, "utf8");
const sha = (bytes: string | Buffer) => createHash("sha256").update(bytes).digest("hex");
const phase = (root = process.cwd()) => helpers.parseYamlSubset(read(join(root, "status/current-phase.yaml"))) as any;

function yaml(value: any, depth = 0): string {
  const pad = " ".repeat(depth);
  if (Array.isArray(value)) return value.map(item => pad + "- " + JSON.stringify(item) + "\n").join("");
  return Object.entries(value).map(([key, item]) => item && typeof item === "object" && Object.keys(item).length
    ? pad + key + ":\n" + yaml(item, depth + 2)
    : pad + key + ": " + JSON.stringify(item) + "\n").join("");
}

function registeredEntry() {
  const { phaseRegistration, phaseRegistrationReason, ...authorization } = JSON.parse(read("evidence/runtime/g6-research-2026-10-14/authorization.json"));
  return { ...authorization, evidence: directory + "verification.md", sourceLock: directory + "source-lock.json",
    sourceBindings: directory + "source-bindings.json", dependencyInstallation: "not-started",
    implementation: "in-progress", automatedVerification: "not-run", independentReview: "not-run" };
}

function fixture() {
  const root = mkdtempSync(join(tmpdir(), "rain-g6-governance-"));
  const put = (file: string, bytes: string | Buffer) => {
    mkdirSync(dirname(join(root, file)), { recursive: true }); writeFileSync(join(root, file), bytes);
  };
  // Original G6 mutation fixtures keep their original sealed bytes; the Carousel successor has its own tests.
  const copy = (file: string) => {
    const predecessor = "evidence/runtime/carousel-upgrade-2026-10-14/before/" + file;
    put(file, readFileSync(existsSync(predecessor) ? predecessor : file));
  };
  copyDatePickerCloseoutFixture(copy);
  const baseline = JSON.parse(read(directory + "baseline.json"));
  for (const file of [directory + "baseline.json", ...Object.keys(baseline.protectedSources),
    ...Object.keys(baseline.retainedEvidence), ...Object.keys(baseline.files).filter(file => existsSync(file)),
    ...Object.entries(baseline.files).filter(([, hash]) => hash !== null).map(([file]) => directory + "before/" + file)]) copy(file);
  for (const file of [directory + "source-bindings.json", directory + "source-lock.json"]) if (existsSync(file)) copy(file);
  const current = phase(root);
  if (!current.componentRefinements.g6Components) {
    current.componentRefinements.g6Components = registeredEntry();
    put("status/current-phase.yaml", yaml(current));
  }
  return { root, put, copy, baseline };
}

 // A separately sealed fixture tests the finite observation rules beyond its byte seal.
function resealedObservation(f:ReturnType<typeof fixture>, observationPath:string, constantName:string, changed:any) {
  f.put(observationPath,JSON.stringify(changed));
  const modulePath="scripts/g6-governance.mjs";
  let module=read(join(f.root,modulePath)).replace(new RegExp('const '+constantName+' = "[a-f0-9]{64}";'),
   'const '+constantName+' = "'+sha(read(join(f.root,observationPath)))+'";');
  module=module.replace(/const g6ModuleHash = "[a-f0-9]{64}";/,'const g6ModuleHash = "'+"0".repeat(64)+'";');
  module=module.replace('const g6ModuleHash = "'+"0".repeat(64)+'";','const g6ModuleHash = "'+sha(module)+'";');
  f.put(modulePath,module);
  const bindingPath=directory+"source-bindings.json",bindings=JSON.parse(read(join(f.root,bindingPath)));
  bindings.sourceFiles[modulePath].after=sha(module);f.put(bindingPath,JSON.stringify(bindings));
  const result=spawnSync(process.execPath,["--input-type=module","-e",
   'const m=await import(process.argv[1]);const h=await import(process.argv[3]);try {m.readG6SourceBindings(process.argv[2],undefined,h.parseYamlSubset);console.log(JSON.stringify({error:null}));}catch(error){console.log(JSON.stringify({error:error.message}));}',
   new URL("file://"+join(f.root,modulePath)).href,f.root,new URL("file://"+join(process.cwd(),"scripts/verification-helpers.mjs")).href],{encoding:"utf8"});
  expect(result.error).toBeUndefined();expect(result.status).toBe(0);
  return JSON.parse(result.stdout).error as string|null;
 }


it("admits only the authorized G6 successor while keeping old G5 proof readers usable", () => {
  const f = fixture();
  try {
    expect(() => helpers.getLibraryGovernanceCloseoutSourceBindings(f.root)).not.toThrow();
    expect(() => helpers.getG5SourceBindings(process.cwd(), phase())).not.toThrow();
  } finally { rmSync(f.root, { recursive: true }); }
}, 30_000);

it("rejects old Gate changes, unrelated stages, source drift and widened G6 bindings", () => {
  const f = fixture();
  try {
    const verify = (helpers as any).getG6SourceBindings;
    expect(verify).toBeTypeOf("function");
    const original = read(join(f.root, "status/current-phase.yaml"));
    for (const mutate of [
      (status: any) => { status.componentRefinements.g5Components.humanGate = "accepted"; },
      (status: any) => { status.componentRefinements.unapproved = { authorization: "authorized" }; },
      (status: any) => { status.componentRefinements.g6Components.authorizedNewDependencies.push("vaul@1.0.0"); },
    ]) {
      const current = phase(f.root); mutate(current); f.put("status/current-phase.yaml", yaml(current));
      expect(() => verify(f.root, phase(f.root))).toThrow();
      f.put("status/current-phase.yaml", original);
    }
    const source = "packages/ui/src/select/select.styles.ts";
    f.put(source, read(source) + "\n/* unrelated G6 change */\n");
    expect(() => verify(f.root, phase(f.root))).toThrow(/protected|unrelated|source/i);
    f.copy(source);
    const bindingPath = directory + "source-bindings.json";
    const bindings = JSON.parse(read(join(f.root, bindingPath)));
    const changed = structuredClone(bindings);
    changed.sourceFiles["packages/ui/src/unrelated/unrelated.tsx"] = { before: null, after: sha("unrelated") };
    f.put(bindingPath, JSON.stringify(changed));
    expect(() => verify(f.root, phase(f.root))).toThrow(/finite|seal|paths/i);
  } finally { rmSync(f.root, { recursive: true }); }
}, 30_000);

it("rejects extra dependencies, forged before snapshots and re-signed helper mutations", () => {
  const f = fixture();
  try {
    const verify = (helpers as any).getG6SourceBindings;
    expect(verify).toBeTypeOf("function");
    const pkgPath = "packages/ui/package.json", originalPackage = read(join(f.root, pkgPath));
    const pkg = JSON.parse(originalPackage); pkg.dependencies["vaul"] = "1.0.0";
    f.put(pkgPath, JSON.stringify(pkg));
    expect(() => verify(f.root, phase(f.root))).toThrow(/dependenc|source|seal/i);
    f.put(pkgPath, originalPackage);
    const before = directory + "before/scripts/verification-helpers.mjs";
    f.put(before, "forged before\n");
    expect(() => verify(f.root, phase(f.root))).toThrow(/before|snapshot/i);
    f.copy(before);
    const helper = "scripts/verification-helpers.mjs", mutated = read(helper) + "\n/* unreviewed helper successor */\n";
    f.put(helper, mutated);
    const bindingPath = directory + "source-bindings.json", binding = JSON.parse(read(join(f.root, bindingPath)));
    binding.sourceFiles[helper].after = sha(mutated);
    f.put(bindingPath, JSON.stringify(binding));
    expect(() => verify(f.root, phase(f.root))).toThrow(/source|seal|helper/i);
  } finally { rmSync(f.root, { recursive: true }); }
}, 30_000);

it("rejects explicit G6 CSS owner normalization for deleted imports or mutated passed source", async () => {
  const { parseTopLevelCssBlocks } = await import("./verify-tailwind-b2.mjs");
  const source = read("packages/ui/src/styles.css"), root = process.cwd();
  for (const altered of [source.replace('@import "./carousel/carousel.css";\n',""), source.replace(/^@import "\.\/(?:attachment|drawer|input-otp|carousel|bubble|marker|message|message-scroller|questionnaire)\/[^\n]+\n/gm,""), source+"\n.rain-forged { color:red; }\n"]) {
    const failures:string[]=[];
    parseTopLevelCssBlocks(altered,"G6 explicit owner negative",failures,{root,owner:"packages/ui/src/styles.css"});
    expect(failures.some(failure=>failure.includes("exact bound owner bytes"))).toBe(true);
  }
});

it("rejects a forged completed lifecycle supplied only in memory", () => {
  const status=phase();if(status.componentRefinements.g6Components.implementation==="completed") status.componentRefinements.g6Components.automatedVerification="failed";
  else { status.componentRefinements.g6Components.implementation="completed";status.componentRefinements.g6Components.automatedVerification="passed-scoped";status.componentRefinements.g6Components.independentReview="passed-scoped"; }
  expect(()=>helpers.getG6SourceBindings(process.cwd(),status)).toThrow("must match the bound disk record");
});

it("normalizes only three recorded scan directives while preserving old comment and scan checks", () => {
 const source=read("apps/playground/src/styles.css"),status=phase();
 expect(helpers.validateG4SourceDirectives(source+'\n/* @source "./unapproved"; */',status)).toEqual([]);
 expect(helpers.validateG4SourceDirectives('/* @source "./docs/components/g6-media-pages.tsx";\n */\n'+source,status)).toEqual([]);
 for(const changed of [source.replace('@source "./docs/components/g6-media-pages.tsx";\n',''),
  source+'\n@source "./docs/components/g6-media-pages.tsx";',source+'\n@source "./docs/components/unapproved.tsx";',
  source.replace('@source "./docs/components/g6-media-pages.tsx";','@source "./docs/components";')])
  expect(helpers.validateG4SourceDirectives(changed,status)).not.toEqual([]);
 const forged=structuredClone(status);forged.componentRefinements.g6Components.humanGate="accepted";
 expect(helpers.validateG4SourceDirectives(source,forged)).not.toEqual([]);
});

it("checks fixed TSX, Nova, shared CSS and engine bytes without rewriting historical sources", async () => {
 const { verifyG6FixedSources } = await import("./verify-g6-components.mjs");
 const root=mkdtempSync(join(tmpdir(),"rain-g6-fixed-negative-"));
 try {
  const paths=[directory+"source-lock.json","evidence/runtime/g6-research-2026-10-14/source-supplement.json"];
  const lock=JSON.parse(read(paths[0]!)), supplement=JSON.parse(read(paths[1]!));
  for(const file of [...paths,...lock.fixedFiles.map((row:any)=>row.stored),...supplement.files.map((row:any)=>row.stored),lock.enginePackage.stored]){mkdirSync(dirname(join(root,file)),{recursive:true});writeFileSync(join(root,file),readFileSync(file));}
  expect(verifyG6FixedSources(root).fixedSources).toBe(30);
  for(const target of [lock.fixedFiles[0].stored,lock.fixedFiles.find((row:any)=>row.sourcePath.endsWith("/aspect-ratio.tsx")).stored,lock.enginePackage.stored]) {
    const original=readFileSync(join(root,target));const changed=Buffer.from(original);changed[0]=(changed[0]??0)^1;writeFileSync(join(root,target),changed);
    expect(()=>verifyG6FixedSources(root)).toThrow();writeFileSync(join(root,target),original);
  }
 } finally { rmSync(root,{recursive:true,force:true}); }
});

it("keeps parallel observations read-only and rejects changed current, forged before and a third protected path", async () => {
 const f=fixture(), verify=helpers.getG6SourceBindings;
 const observationPath=directory+"concurrent-source-observation.json";
 const observation=JSON.parse(read(join(f.root,observationPath)));
 const current="scripts/rn14-starter.mjs", snapshot=observation.sourceFiles[current].beforeSnapshot;
 try {
  expect(()=>verify(f.root,phase(f.root))).not.toThrow();
  f.put(current,read(current)+"\n/* later parallel drift */\n");
  expect(()=>verify(f.root,phase(f.root))).toThrow("parallel observed source changed");f.copy(current);
  f.put(snapshot,"forged original\n");
  expect(()=>verify(f.root,phase(f.root))).toThrow("parallel original snapshot changed");f.copy(snapshot);
  const unrelated="packages/ui/src/select/select.styles.ts";
  f.put(unrelated,read(unrelated)+"\n/* third protected drift */\n");
  expect(()=>verify(f.root,phase(f.root))).toThrow("protected current source changed");
  const widened=structuredClone(observation);
  widened.sourceFiles[unrelated]={before:f.baseline.protectedSources[unrelated],after:sha(read(join(f.root,unrelated))),beforeSnapshot:directory+"concurrent/before/"+unrelated};
  f.put(widened.sourceFiles[unrelated].beforeSnapshot,read(unrelated));
  expect(resealedObservation(f,observationPath,"g6ConcurrentObservationHash",widened)).toContain("deep-equal");
  f.copy(unrelated);
  const forged=structuredClone(observation);forged.sourceFiles[current].before=sha("forged original");
  expect(resealedObservation(f,observationPath,"g6ConcurrentObservationHash",forged)).toContain("must retain its baseline hash");
 } finally {rmSync(f.root,{recursive:true,force:true});}
},30_000);

it("rejects parallel document drift, forged previous observations and a second document", () => {
 const f=fixture(),verify=helpers.getG6SourceBindings;
 const observationPath=directory+"concurrent-document-observation.json",observation=JSON.parse(read(observationPath));
 const document="docs/ai/rain-designer-integration.md",snapshot=observation.sourceFiles[document].beforeSnapshot;
 try {
  expect(()=>verify(f.root,phase(f.root))).not.toThrow();
  f.put(document,read(document)+"\nParallel document drift\n");
  expect(()=>verify(f.root,phase(f.root))).toThrow("parallel observed documentation source changed");f.copy(document);
  f.put(snapshot,"forged original document");
  expect(()=>verify(f.root,phase(f.root))).toThrow("parallel observed documentation original snapshot changed");f.copy(snapshot);
  const oldObservation=observation.previousObservation.path;
  f.put(oldObservation,read(oldObservation)+"\n");expect(()=>verify(f.root,phase(f.root))).toThrow();f.copy(oldObservation);
  const widened=structuredClone(observation);widened.sourceFiles["docs/ai/unapproved.md"]={before:sha("old"),after:sha("new"),beforeSnapshot:directory+"concurrent-document/before/docs/ai/unapproved.md"};
  expect(resealedObservation(f,observationPath,"g6ConcurrentDocumentObservationHash",widened)).toContain("deep-equal");
  const forged=structuredClone(observation);forged.sourceFiles[document].before=sha("forged original document");
  expect(resealedObservation(f,observationPath,"g6ConcurrentDocumentObservationHash",forged)).toContain("must match the previous observation");
  const wrongPredecessor=structuredClone(observation);wrongPredecessor.previousObservation.sha256=sha("wrong observation");
  expect(resealedObservation(f,observationPath,"g6ConcurrentDocumentObservationHash",wrongPredecessor)).toContain("deep-equal");
 } finally {rmSync(f.root,{recursive:true,force:true});}
},30_000);

it("limits the existing-test successor to one original protected file and rejects forged original bytes", () => {
 const f=fixture(),verify=helpers.getG6SourceBindings,path=directory+"test-fixture-supplement.json";
 const supplement=JSON.parse(read(path)),snapshot=supplement.sourceFiles["scripts/verify-tailwind-b2.test.ts"].beforeSnapshot;
 try {
  expect(()=>verify(f.root,phase(f.root))).not.toThrow();
  f.put(snapshot,"forged original test");expect(()=>verify(f.root,phase(f.root))).toThrow("supplementary test before snapshot changed");f.copy(snapshot);
  rmSync(join(f.root,snapshot));expect(()=>verify(f.root,phase(f.root))).toThrow();f.copy(snapshot);
  rmSync(join(f.root,snapshot));
  const linked=spawnSync(process.execPath,["--input-type=module","-e",'import {symlinkSync} from "node:fs";symlinkSync(process.argv[1],process.argv[2]);',join(process.cwd(),snapshot),join(f.root,snapshot)],{encoding:"utf8"});
  expect(linked.status).toBe(0);expect(()=>verify(f.root,phase(f.root))).toThrow("regular file");rmSync(join(f.root,snapshot));f.copy(snapshot);
  const testPath="scripts/verify-tailwind-b2.test.ts";
  f.put(testPath,read(testPath)+"\n/* unbound later test drift */\n");expect(()=>verify(f.root,phase(f.root))).toThrow("current source changed");
  const bindingPath=directory+"source-bindings.json",resigned=JSON.parse(read(join(f.root,bindingPath)));
  resigned.sourceFiles[testPath].after=sha(read(join(f.root,testPath)));f.put(bindingPath,JSON.stringify(resigned));expect(()=>verify(f.root,phase(f.root))).toThrow("binding seal changed");f.copy(testPath);f.copy(bindingPath);
  const widened=structuredClone(supplement);widened.sourceFiles["scripts/g5-components-governance.test.ts"]={before:f.baseline.protectedSources["scripts/g5-components-governance.test.ts"],beforeSnapshot:directory+"before/scripts/g5-components-governance.test.ts"};
  expect(resealedObservation(f,path,"g6TestFixtureSupplementHash",widened)).toContain("deep-equal");
  const forged=structuredClone(supplement);forged.sourceFiles["scripts/verify-tailwind-b2.test.ts"].before=sha("forged original test");
  expect(resealedObservation(f,path,"g6TestFixtureSupplementHash",forged)).toContain("must retain the original protected bytes");
 } finally {rmSync(f.root,{recursive:true,force:true});}
},30_000);
