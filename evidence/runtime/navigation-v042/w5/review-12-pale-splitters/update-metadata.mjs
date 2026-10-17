import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import {parseYamlSubset} from '../../../../../scripts/verification-helpers.mjs';

const base='evidence/runtime/navigation-v042/w5/review-12-pale-splitters';
const revision='G2-composition-candidate-12',recordedAt=new Date().toISOString();
const sha=async p=>crypto.createHash('sha256').update(await fs.readFile(p)).digest('hex');
const before=JSON.parse(await fs.readFile(`${base}/metadata-before.json`));
const sourceBefore=JSON.parse(await fs.readFile(`${base}/production-source-before.json`));
const filesSha256=Object.fromEntries(await Promise.all(Object.keys(sourceBefore.filesSha256).map(async p=>[p,await sha(p)])));
const changed=Object.keys(filesSha256).filter(p=>filesSha256[p]!==sourceBefore.filesSha256[p]);
const expected=['apps/playground/src/recipes/navigation-v042/platform-navigation.css','apps/playground/src/recipes/navigation-v042/r4-r6.css'];
if(changed.length!==2||changed.some(p=>!expected.includes(p)))throw Error('Unexpected source change: '+JSON.stringify(changed));
for(const [p,d] of Object.entries(before))if(await sha(p)!==d.sha256)throw Error('Metadata drift before mutation: '+p);
const scope='Explicit user Review12: Normal draggable splitters retain a very pale 1px BorderNeutral4 line at opacity .4; handle hidden. Hover/drag/focus, hit area and keyboard behavior unchanged. R4/S4 discussion heading Semibold600, count Regular400, sizes unchanged. Local Recipe paint only; prior Review11 and accepted G1 preserved.';
const feedback={id:revision,recordedAt,scope,evidence:`${base}/review-evidence-index.json`,humanGate:'pending-G2'};
await fs.writeFile(`${base}/production-source-freeze-final.json`,JSON.stringify({recordedAt,authority:scope,filesSha256,changed},null,2)+'\n',{flag:'wx'});

for(const [p,raw] of Object.entries(before).filter(([p])=>p.startsWith('registry/'))){
 const d=JSON.parse(raw.text),g1=p==='registry/navigation-v042.json',snapshot=d.currentSourceSnapshot??d.sourceSnapshot;
 if(d.priorReview11||d.priorReview11CurrentSourceSnapshot)throw Error('Review12 mutation already present: '+p);
 if(g1){d.priorReview11CurrentSourceSnapshot=structuredClone(snapshot);d.currentFeedbackRevision12=feedback;}
 else{d.priorReview11={reviewRevision:d.reviewRevision,sourceSnapshot:structuredClone(snapshot),currentFeedbackVerification:structuredClone(d.currentFeedbackVerification),reviewRevisionEvidence:d.reviewRevisionEvidence,reviewRevisionScope:d.reviewRevisionScope};d.reviewRevision=revision;d.reviewRevisionEvidence=feedback.evidence;d.reviewRevisionScope=scope;d.currentFeedbackVerification={...feedback,sourceHashEvidence:`${base}/metadata-validation.json`};}
 snapshot.recordedAt=recordedAt;snapshot.reviewRevision=revision;snapshot.scope=scope;
 for(const path of Object.keys(snapshot.filesSha256))snapshot.filesSha256[path]=filesSha256[path];
 await fs.writeFile(p,JSON.stringify(d,null,2)+'\n');
}

const mapping=(obj,indent=0)=>Object.entries(obj).flatMap(([key,v])=>{const sp=' '.repeat(indent);if(Array.isArray(v))return v.length?[sp+key+':',...v.flatMap(x=>{if(x&&typeof x==='object'){const lines=mapping(x,indent+4);return[sp+'  - '+lines[0].trimStart(),...lines.slice(1)];}return[sp+'  - '+JSON.stringify(x)];})]:[sp+key+': []'];if(v&&typeof v==='object')return[sp+key+':',...mapping(v,indent+2)];return[sp+key+': '+JSON.stringify(v)];});
const block=(key,v)=>mapping({[key]:v}).join('\n')+'\n';
const replaceTop=(text,key,v)=>{const match=new RegExp(`^${key}:.*$`,'m').exec(text);if(!match)return text+'\n'+block(key,v);const after=text.indexOf('\n',match.index)+1,next=text.slice(after).search(/^[A-Za-z_][\w-]*:/m),end=next<0?text.length:after+next;return text.slice(0,match.index)+block(key,v)+'\n'+text.slice(end);};
for(const [p,raw] of Object.entries(before).filter(([p])=>p.startsWith('manifests/'))){
 const old=parseYamlSubset(raw.text),g1=p.endsWith('navigation-r2.yaml');let text=raw.text;
 if(g1){text+='\n'+block('priorReview11CurrentFeedbackSourceSnapshot',old.currentFeedbackSourceSnapshot);const s=structuredClone(old.currentFeedbackSourceSnapshot);s.recordedAt=recordedAt;s.reviewRevision=revision;for(const f of s.sourceFiles)f.sha256=filesSha256[f.path];text=replaceTop(text,'currentFeedbackSourceSnapshot',s);text=replaceTop(text,'currentFeedbackRevision12',feedback);}
 else{text+='\n'+block('priorReview11CurrentSourceSnapshot',{sourcePath:old.sourcePath,sourceSha256:old.sourceSha256,styleSourcePath:old.styleSourcePath,styleSourceSha256:old.styleSourceSha256,recordedAt:old.sourceSnapshotRecordedAt});text+='\n'+block('priorReview11FeedbackRevision',old.currentFeedbackRevision);text=text.replace(/^sourceSha256:.*$/m,'sourceSha256: '+JSON.stringify(filesSha256[old.sourcePath])).replace(/^styleSourceSha256:.*$/m,'styleSourceSha256: '+JSON.stringify(filesSha256[old.styleSourcePath])).replace(/^sourceSnapshotRecordedAt:.*$/m,'sourceSnapshotRecordedAt: '+JSON.stringify(recordedAt));text=replaceTop(text,'currentFeedbackRevision',feedback);}
 if(old.platformNavigationFeedbackTokens){text+='\n'+block('priorReview11PlatformNavigationFeedbackTokens',old.platformNavigationFeedbackTokens);const tokens=structuredClone(old.platformNavigationFeedbackTokens);tokens.sourceSha256=filesSha256[tokens.sourcePath];tokens.scope=scope;tokens.normalSplitter={lineWidth:'1px',lineOpacity:.4,lineToken:'--rain-category-border-neutral-4',effectiveAlphaInLightContent:.04,handleOpacity:0};text=replaceTop(text,'platformNavigationFeedbackTokens',tokens);}
 if(!g1&&old.nativeCssExceptions){const native=structuredClone(old.nativeCssExceptions);native.review12CurrentSource={sourceSha256:filesSha256[native.sourcePath],scope,evidence:feedback.evidence,newPublicTokens:false};text=replaceTop(text,'nativeCssExceptions',native);}
 parseYamlSubset(text);await fs.writeFile(p,text);
}

let hashEntries=0;const errors=[];
for(const p of Object.keys(before).filter(p=>p.startsWith('registry/'))){const d=JSON.parse(await fs.readFile(p));const s=d.currentSourceSnapshot??d.sourceSnapshot;for(const [f,h] of Object.entries(s.filesSha256)){hashEntries++;if(await sha(f)!==h)errors.push(`${p}:${f}`);}}
for(const p of Object.keys(before).filter(p=>p.startsWith('manifests/'))){const d=parseYamlSubset(await fs.readFile(p,'utf8'));const s=p.endsWith('navigation-r2.yaml')?d.currentFeedbackSourceSnapshot:d;if(s.sourceSha256!==await sha(s.sourcePath)||s.styleSourceSha256!==await sha(s.styleSourcePath))errors.push(p);if(d.platformNavigationFeedbackTokens.sourceSha256!==await sha(d.platformNavigationFeedbackTokens.sourcePath))errors.push(p+':platform');}
for(const [p,h] of Object.entries(filesSha256))if(await sha(p)!==h)errors.push(p+':source drift');
const validation={recordedAt,status:errors.length?'failed':'passed',revision,changedProductionSources:changed,updatedRegistries:4,updatedRecipeManifests:7,currentRegistryHashEntries:hashEntries,uniqueCurrentSourceFiles:43,closureFiles:{businessLocal:14,r2Local:9,r2Pattern:4,galleryLocal:4},errors,history:'Exact previous metadata retained in metadata-before.json and named priorReview11 fields; G1 snapshot untouched.'};
await fs.writeFile(`${base}/metadata-validation.json`,JSON.stringify(validation,null,2)+'\n',{flag:'wx'});
await fs.writeFile(`${base}/metadata-final-locks.json`,JSON.stringify({recordedAt,filesSha256:Object.fromEntries(await Promise.all(Object.keys(before).map(async p=>[p,await sha(p)])))},null,2)+'\n',{flag:'wx'});
console.log(JSON.stringify(validation));if(errors.length)process.exitCode=1;
