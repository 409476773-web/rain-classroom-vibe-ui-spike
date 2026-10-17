import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';import {createHash} from 'node:crypto';
import {parseYamlSubset} from '../../../../../scripts/verification-helpers.mjs';
import {collectRecordedJsxPaints,recordedPaintProperty} from '../../../../../scripts/verify-token-foundations.mjs';
import {parseTopLevelCssBlocks} from '../../../../../scripts/verify-tailwind-b2.mjs';
const root=process.cwd(),base='evidence/runtime/g1-g6-closeout-2026-10-17/run-01/governance/',view=base+'predecessor/';
const read=p=>fs.readFileSync(path.join(root,p));const json=p=>JSON.parse(read(p));const sha=b=>createHash('sha256').update(b).digest('hex');
const inventory=json(base+'predecessor-inventory.json');const projectedFiles=Object.fromEntries(inventory.map(p=>[p,sha(read(view+p))]));
const phase=parseYamlSubset(read('status/current-phase.yaml').toString()),before=parseYamlSubset(read(view+'status/current-phase.yaml').toString());
const additions=['componentRefinements.attachmentPreviewVisualAcceptance','componentRefinements.attachmentFunctions','componentRefinements.carouselVisualFeedback','componentRefinements.carouselCloseout','componentRefinements.questionnaireControlReuse','conversationComposer20261015','g1G6CloseoutAndTransfer20261017'];
const phaseAdditions={};const restored=structuredClone(phase);
for(const p of additions){const parts=p.split('.'),name=parts.pop();const currentParent=parts.reduce((o,k)=>o[k],restored);const oldParent=parts.reduce((o,k)=>o[k],before);assert(!Object.hasOwn(oldParent,name));assert(currentParent[name]);phaseAdditions[p]=currentParent[name];delete currentParent[name];}
assert.deepEqual(restored,before,'Only the seven named authorized phase additions may differ from the sealed Drawer predecessor');
const sourceFiles={},retainedFiles={};
for(const [p,h] of Object.entries(projectedFiles)){
 assert(fs.existsSync(p),'Projected original path absent from actual workspace: '+p);
 const current=sha(read(p));if(current===h)retainedFiles[p]=h;
 else {assert(!p.startsWith('evidence/'),'Do not reinterpret original evidence: '+p);sourceFiles[p]={before:h,after:current,beforeSnapshot:view+p};}
}
const extra=['registry/attachment-workflow.json','registry/conversation-composer.json','manifests/recipes/attachment-workflow.yaml','manifests/recipes/conversation-composer.yaml','tests/e2e/g6-components.config.ts','tests/e2e/conversation-composer.spec.ts','scripts/g1-g6-closeout-governance.test.ts'];
for(const entry of fs.readdirSync('apps/playground/src/docs/components'))if(/^(?:attachment-|conversation-composer-page|g6-)/.test(entry)&&/\.(?:tsx?|css)$/.test(entry))extra.push('apps/playground/src/docs/components/'+entry);
extra.push('apps/playground/src/attachment-workflow-consumer.tsx','apps/prototype/src/carousel-study/Artwork.tsx','apps/prototype/src/carousel-study/study.css','apps/prototype/src/carousel-study/main.tsx');
extra.push(...json(base+'authorized-additional-files.json'),...Object.keys(json('evidence/runtime/questionnaire-reuse-2026-10-16/source-bindings.json').sourceFiles));
for(const reg of extra.slice(0,2)){const r=json(reg);extra.push(r.sourceBindings,r.humanGateEvidence,...r.items.flatMap(i=>i.files??[]));}
for(const dir of ['packages/ui/src/selection-control','packages/ui/src/conversation-composer','packages/ui/src/attachment-workflow'])for(const entry of fs.readdirSync(dir))if(/\.(?:tsx?|css|md)$/.test(entry))extra.push(dir+'/'+entry);
for(const p of [...new Set(extra.filter(Boolean))]){if(sourceFiles[p])continue;if(retainedFiles[p]){sourceFiles[p]={before:retainedFiles[p],after:sha(read(p)),beforeSnapshot:view+p};delete retainedFiles[p];}else sourceFiles[p]={before:null,after:sha(read(p)),beforeSnapshot:null};}
const paintObservations={localSources:[],inlineSources:[]};
for(const file of Object.keys(sourceFiles).filter(p=>/\.(?:css|tsx)$/.test(p)&&!p.endsWith('.test.tsx')&&( /^packages\/ui\/src\/(?:attachment-workflow|conversation-composer|carousel|questionnaire)\//.test(p)||/^apps\/playground\/src\/docs\/components\/(?:attachment-|conversation-composer-page|g6-|carousel-examples)/.test(p)||/^apps\/(?:playground\/src\/attachment-workflow-consumer|prototype\/src\/carousel-study\/)/.test(p)))){
 const source=read(file).toString(),entry={filePath:file,sha256:sha(read(file)),kind:file.endsWith('.css')?'finite-css-paints':'finite-jsx-paints',inventory:[],status:'runtime-unproved',acceptedException:false,measurementScope:'exact authored declarations only; no current DOM, content role, parent, state, contrast or eligibility acceptance'};
 if(file.endsWith('.css')){
  const counts=new Map(),failures=[];const walk=(css,frames=[])=>{for(const {header,body} of parseTopLevelCssBlocks(css,'Current exact paint observations',failures)){
   if(header.startsWith('@')&&body.includes('{')){walk(body,[...frames,header]);continue;}
   for(const line of body.split(';')){const colon=line.indexOf(':'),property=line.slice(0,colon).trim(),value=line.slice(colon+1).trim();if(colon<0||!property.startsWith('--')&&!recordedPaintProperty.test(property))continue;if(property.startsWith('--')&&!/(?:--rain-category-|--rain-local-|--report-class-|#|rgb|hsl|oklch|color\()/i.test(value))continue;const key=JSON.stringify([frames,header,property]),occurrence=(counts.get(key)??0)+1;counts.set(key,occurrence);entry.inventory.push({frames,selector:header,property,value,occurrence});}
  }};walk(source.replace(/^\s*@(import|source)\b[^;]*;\s*$/gm,''));assert.deepEqual(failures,[]);paintObservations.localSources.push(entry);
 }else {entry.inventory=collectRecordedJsxPaints(file,source);paintObservations.inlineSources.push(entry);}
}
const questionnaireFiles=json(base+'questionnaire-view-inventory.json');
for(const [file,expected] of Object.entries(questionnaireFiles))if(file.startsWith('evidence/')){assert.equal(sha(read(file)),expected,'Do not rewrite original Questionnaire proofs: '+file);retainedFiles[file]=expected;}
const record={kind:'G1G6FiniteCloseoutSuccessor',authorizedAt:'2026-10-17',scope:'g1-g6-existing-assets-closeout-and-v12-p5-p6-local-transfer',authorization:phase.g1G6CloseoutAndTransfer20261017,phaseAdditions,sourceFiles,retainedFiles,projectedFiles,questionnaireFiles,paintObservations};
const encoded=JSON.stringify(record,null,2)+'\n';fs.writeFileSync(base+'source-bindings.json',encoded);
const module='scripts/g1-g6-closeout-governance.mjs',source=read(module).toString(),normal=source.replace(/const (bindingSeal|moduleSeal) = "[^"]*";/g,'const $1 = "PENDING";');
fs.writeFileSync(module,normal.replace('const bindingSeal = "PENDING";',`const bindingSeal = "${sha(encoded)}";`).replace('const moduleSeal = "PENDING";',`const moduleSeal = "${sha(normal)}";`));
console.log(JSON.stringify({transitionFiles:Object.keys(sourceFiles).length,retainedFiles:Object.keys(retainedFiles).length,projectedFiles:Object.keys(projectedFiles).length,phaseAdditions:Object.keys(phaseAdditions),bindingsSHA256:sha(encoded)}));
