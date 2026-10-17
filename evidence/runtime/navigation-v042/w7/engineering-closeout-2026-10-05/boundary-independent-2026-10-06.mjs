import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, realpathSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, join, relative, resolve } from "node:path";
import { tmpdir } from "node:os";
import { createHash } from "node:crypto";
import assert from "node:assert/strict";
const sourceRoot=process.cwd(), out=resolve(process.argv[2] ?? "evidence/runtime/navigation-v042/w7/engineering-closeout-2026-10-05/boundary-independent-2026-10-06");
const keep=["evidence/runtime/navigation-v042/w7/final-source.json","evidence/runtime/navigation-v042/w7/regression-map.json","evidence/runtime/navigation-v042/w6/review-02/final-source.json","evidence/runtime/navigation-v042/w6/review-02/README.md","evidence/runtime/navigation-v042/w6/review-02/review-summary.json","evidence/runtime/navigation-rebuild-v03/final-source-lock.json"];
const fixture=realpathSync(mkdtempSync(join(tmpdir(),"rain-boundary-independent-")));
mkdirSync(out,{recursive:true});
const results=[];
function run(label, script="verify-boundaries.mjs") {
 const r=spawnSync(process.execPath,[join(fixture,"scripts",script)],{cwd:fixture,encoding:"utf8",timeout:15000,maxBuffer:8*1024*1024,env:{...process.env,GIT_WORK_TREE:fixture}});
 const output=String(r.stdout||"")+String(r.stderr||"");writeFileSync(join(out,label+".log"),output);
 const row={label,script,exitCode:r.status,error:r.error?.message,passed:output.includes(script==="verify-boundaries.mjs"?"Boundary verification passed":"Tailwind B2 verification passed"),outputTail:output.slice(-2000)};results.push(row);return row;
}
function mutation(changes,label,{checkB2=false}={}){
 const before=changes.map(([file])=>[file,existsSync(join(fixture,file))?readFileSync(join(fixture,file)):undefined]);
 try{for(const [file,text]of changes){mkdirSync(dirname(join(fixture,file)),{recursive:true});writeFileSync(join(fixture,file),text)}const result=run(label);if(checkB2)run(label+"-b2","verify-tailwind-b2.mjs");return result}
 finally{for(const [file,text]of before.reverse())if(text===undefined)rmSync(join(fixture,file),{force:true});else writeFileSync(join(fixture,file),text)}
}
try {
 cpSync(sourceRoot,fixture,{recursive:true,filter:(source)=>{const p=relative(sourceRoot,source).replaceAll("\\","/");if(p.split("/").some(x=>[".vite","coverage","dist","node_modules","playwright-report","test-results"].includes(x)))return false;if(p==="artifacts")return false;if(/^evidence\/runtime\/(?:navigation-v042|navigation-rebuild-v03)(?:\/|$)/.test(p))return keep.some(file=>file===p||file.startsWith(p+"/"));return true}});
 symlinkSync(join(sourceRoot,"node_modules"),join(fixture,"node_modules"),"dir");
 const b2Baseline=run("baseline-b2","verify-tailwind-b2.mjs");
 assert.equal(b2Baseline.exitCode,0,"Existing B2 must pass before assessing combined rejection");
 assert.equal(b2Baseline.passed,true,"The B2 CLI must actually print its result, not return from a path-alias no-op");
 assert.equal(run("baseline").exitCode,0,"Baseline must pass before measuring an escape");
 assert.equal(mutation([["packages/ui/src/navigation/unauthorized-boundary.ts","export const unauthorizedBoundary = true;\n"]],"unknown-ui-control").exitCode,1);
 const file="packages/ui/src/navigation/unauthorized-boundary.ts", registry="registry/navigation-v042.json";
 const reg=JSON.parse(readFileSync(join(fixture,registry),"utf8"));reg.shared.files.push(file);
 mutation([[file,"export const unauthorizedBoundary = true;\n"],[registry,JSON.stringify(reg,null,2)+"\n"]],"registry-self-registration",{checkB2:true});
 const rootFile="unauthorized-boundary.ts", freeze="evidence/runtime/navigation-v042/w6/review-02/final-source.json";
 const lock=JSON.parse(readFileSync(join(fixture,freeze),"utf8"));lock.filesSha256[rootFile]="0".repeat(64);
 mutation([[rootFile,"export const unauthorizedBoundary = true;\n"],[freeze,JSON.stringify(lock,null,2)+"\n"]],"freeze-self-registration",{checkB2:true});
 const test="tests/e2e/unauthorized-boundary.spec.ts", mapPath="evidence/runtime/navigation-v042/w7/regression-map.json";
 const map=JSON.parse(readFileSync(join(fixture,mapPath),"utf8"));map.cases[0].testFiles.push(test);
 mutation([[test,"export const unauthorizedBoundary = true;\n"],[mapPath,JSON.stringify(map,null,2)+"\n"]],"regression-map-self-registration",{checkB2:true});
 const doc="docs/ai/unauthorized-boundary.ts", ui="packages/ui/src/navigation/navigation-families.tsx";
 mutation([[doc,"export const unauthorizedBoundary = true;\n"],[ui,readFileSync(join(fixture,ui),"utf8")+"\nimport '../../../../docs/ai/unauthorized-boundary';\n"]],"runtime-imports-data-domain",{checkB2:true});
} finally {
 rmSync(fixture,{recursive:true,force:true});
 const report={recordedAt:new Date().toISOString(),fixtureCleaned:true,sourceRootUnmodified:true,verifierSha256:createHash("sha256").update(readFileSync(join(sourceRoot,"scripts/verify-boundaries.mjs"))).digest("hex"),results};
 writeFileSync(join(out,"results.json"),JSON.stringify(report,null,2)+"\n");
 console.log(JSON.stringify(results.map(({label,exitCode,error})=>({label,exitCode,error})),null,2));
}
