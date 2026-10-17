import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync, rmSync, copyFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'../../../../../..');
const sha=v=>createHash('sha256').update(v).digest('hex');
const reviewedFiles=Object.fromEntries(['scripts/verification-helpers.mjs','scripts/verify-token-foundations.mjs','scripts/rn14-starter.mjs'].map(file=>[file,sha(readFileSync(join(root,file)))]));
const {parseYamlSubset,validateTokenFoundationsV1Phase}=await import(`${root}/scripts/verification-helpers.mjs`);
const {getNavigationColorConsumerRegistration,validateTabsPaintRouting,validateLayoutsRuntimeGeometry}=await import(`${root}/scripts/verify-token-foundations.mjs`);
const {exportStarter,verifyStarter}=await import(`${root}/scripts/rn14-starter.mjs`);
const phaseSource=readFileSync(join(root,'status/current-phase.yaml'),'utf8');
const phase=parseYamlSubset(phaseSource), results=[];
const pass=(label,fn)=>{fn();results.push({label,passed:true});};
pass('valid current phase',()=>validateTokenFoundationsV1Phase(phase));
for(const [label,mutate] of [
 ['frozen B2 history mutation',p=>p.phaseHistory.tailwindB2.blockedActions.push('unrecorded permission')],
 ['accepted navigation scope mutation',p=>p.navigationComponentsV042.scope='all-components'],
 ['accepted navigation permission mutation',p=>p.navigationComponentsV042W6W8.gitOperations='authorized'],
 ['accepted human review mutation',p=>p.navigationComponentsV042W6W8.currentReviewDecision.scope='all-components'],
 ['unknown navigation permission field',p=>p.navigationComponentsV042W6W8.publish='authorized'],
 ['unknown top-level permission',p=>p.unapprovedPermission={authorization:'authorized'}],
])pass(label,()=>{const changed=structuredClone(phase);mutate(changed);assert.throws(()=>validateTokenFoundationsV1Phase(changed));});
const temporary=mkdtempSync(join(tmpdir(),'rain-closeout-review-'));
try {
 const ledgerPath='evidence/runtime/navigation-v042/w7/engineering-closeout-2026-10-06/navigation-color-consumers.json';
 const inventoryPath='evidence/runtime/navigation-v042/w7/engineering-closeout-2026-10-06/navigation-color-consumers-source.json';
 const ledger=JSON.parse(readFileSync(join(root,ledgerPath),'utf8'));
 const entries=[ledgerPath,inventoryPath,'status/current-phase.yaml',ledger.humanReview.path,ledger.sourceFreezeMatch.path,...ledger.sourceFiles.map(x=>x.path)];
 for(const file of entries){mkdirSync(dirname(join(temporary,file)),{recursive:true});copyFileSync(join(root,file),join(temporary,file));}
 pass('exact Navigation consumer registration',()=>{const r=getNavigationColorConsumerRegistration(temporary);assert.equal(r.sourceFiles,18);assert.equal(r.cssPaintOccurrences,1295);assert.equal(r.bindingDeclarations,312);assert.equal(r.pendingPaints,810);assert.equal(r.automatedConformance,'unproved');});
 for(const [label,file,mutate] of [
  ['ledger changed threshold',ledgerPath,s=>s.replace('4.5:1','1.0:1')],
  ['inventory added occurrence',inventoryPath,s=>s+' '],
  ['source added raw paint',ledger.sourceFiles[0].path,s=>s+'\n.test {color: red;}\n'],
  ['CSS import changed',ledger.sourceFiles.find(x=>x.directives?.length).path,s=>s.replace('@import', '@source')],
  ['human review modified',ledger.humanReview.path,s=>s+' '],
  ['freeze modified',ledger.sourceFreezeMatch.path,s=>s+' '],
 ])pass(label,()=>{const path=join(temporary,file),before=readFileSync(path,'utf8'),after=mutate(before);assert.notEqual(after,before);writeFileSync(path,after);try{assert.throws(()=>getNavigationColorConsumerRegistration(temporary));}finally{writeFileSync(path,before);}});
 const tabs=readFileSync(join(root,'packages/ui/src/tabs/tabs.tsx'),'utf8');
 pass('Tabs valid requested root projection',()=>assert.deepEqual(validateTabsPaintRouting(tabs,temporary),[]));
 for(const [label,after] of [
  ['Tabs label paint change',tabs.replace('paints.label, part("label")','paints.count, part("label")')],
  ['Tabs false measurement',tabs.replace('<TabParts item={item} selected={selected} measure />','<TabParts item={item} selected={selected} measure={false} />')],
  ['Tabs duplicate projection fragment',tabs.replace('  const { appearance, part, iconColumn, props } = useTabs();','  const { appearance, part, iconColumn, props } = useTabs();\n  const { appearance, part, iconColumn, props } = useTabs();')],
  ['Tabs unaccepted navigation wrapper',tabs.replace('props.visualPreset === "navigation-browser" && item.description ?', 'props.visualPreset === "unknown" && item.description ?')],
 ])pass(label,()=>{assert.notEqual(after,tabs);assert.notDeepEqual(validateTabsPaintRouting(after,temporary),[]);});
 pass('Tabs root scope change',()=>{writeFileSync(join(temporary,'status/current-phase.yaml'),phaseSource+'\nunapprovedPermission:\n  authorization: "authorized"\n');try{assert.notDeepEqual(validateTabsPaintRouting(tabs,temporary),[]);}finally{writeFileSync(join(temporary,'status/current-phase.yaml'),phaseSource);}});
 const layoutFile='packages/layouts/src/layout.css',layout=readFileSync(join(root,layoutFile),'utf8');
 const guard=(source,status=phase)=>validateLayoutsRuntimeGeometry({filePath:layoutFile,source,status});
 pass('Layout existing workspace import allowed',()=>assert.deepEqual(guard(layout),[]));
 for(const [label,after] of [
  ['Layout duplicate workspace import',"@import './workspace.css';\n"+layout],
  ['Layout unknown import',layout.replace("@import './workspace.css';", "@import './unknown.css';")],
  ['Layout added paint',layout+'\n.rain-grid {color: red;}\n'],
 ])pass(label,()=>assert.notDeepEqual(guard(after),[]));
 pass('Layout scope mutation rejects import',()=>{const changed=structuredClone(phase);changed.navigationComponentsV042.scope='all-components';assert.notDeepEqual(guard(layout,changed),[]);});
 const missing=[],starterLinkChecks=[];
 for(const milestone of ['M1','M2']){
  const output=join(temporary,milestone),lock=exportStarter(output,{milestone});
  pass(`${milestone} source-lock integrity`,()=>assert.equal(verifyStarter(output),lock.snapshotId));
  const pending=['AGENTS.md'],visited=new Set();let referenceCount=0;
  while(pending.length){const file=pending.pop();if(visited.has(file))continue;visited.add(file);const source=readFileSync(join(output,file),'utf8');for(const match of source.matchAll(/\]\(([^)]+)\)/g)){const href=match[1];if(!href||/^(?:https?:|#)/.test(href))continue;referenceCount++;const target=resolve(output,dirname(file),href.split('#')[0]??'');if(!target.startsWith(output+'/')||!existsSync(target))missing.push({milestone,file,href});else if(target.endsWith('.md'))pending.push(target.slice(output.length+1));}}
  starterLinkChecks.push({milestone,snapshotId:lock.snapshotId,reachableMarkdownFiles:[...visited].sort(),localReferencesChecked:referenceCount,brokenReferences:missing.filter(x=>x.milestone===milestone).length});
 }
 console.log(JSON.stringify({recordedAt:new Date().toISOString(),reviewedFiles,probeCount:results.length,results,starterLinkChecks,missingStarterLinks:missing,tempRemoved:true},null,2));
}finally{rmSync(temporary,{recursive:true,force:true});}
