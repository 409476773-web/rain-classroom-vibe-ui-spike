import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import { parseYamlSubset } from '../../../../../scripts/verification-helpers.mjs';
const base='evidence/runtime/navigation-v042/w5/review-08-r4-details';
const revision='G2-composition-candidate-08';
const source='apps/playground/src/recipes/navigation-v042/r4-r6.tsx';
const style='apps/playground/src/recipes/navigation-v042/r4-r6.css';
const registries=['registry/navigation-v042-w3.json','registry/navigation-v042-workspaces.json','registry/navigation-v042-recipes.json','registry/navigation-v042.json'];
const affectedRegistries=['registry/navigation-v042-w3.json','registry/navigation-v042-recipes.json'];
const manifests=['manifests/ui/navigation-list.yaml','manifests/ui/object-navigator.yaml','manifests/ui/segmented-control.yaml','manifests/layouts/workspace.yaml','manifests/layouts/workspace-state.yaml','manifests/recipes/navigation-r1.yaml','manifests/recipes/navigation-r3.yaml','manifests/recipes/navigation-r4.yaml','manifests/recipes/navigation-r5.yaml','manifests/recipes/navigation-r6.yaml','manifests/recipes/navigation-states.yaml','manifests/recipes/navigation-r2.yaml'];
const affectedManifests=['manifests/recipes/navigation-r4.yaml','manifests/recipes/navigation-r5.yaml','manifests/recipes/navigation-r6.yaml'];
const sha=async file=>crypto.createHash('sha256').update(await fs.readFile(file)).digest('hex');
const sourceSha256=await sha(source),styleSourceSha256=await sha(style);
if(process.argv[2]!==sourceSha256||process.argv[3]!==styleSourceSha256)throw new Error('Explicit final source-freeze hashes must match before metadata can be updated');
const recordedAt=new Date().toISOString();
const before={recordedAt,registries:{},manifests:{}};
for(const file of registries)before.registries[file]=JSON.parse(await fs.readFile(file,'utf8'));
for(const file of manifests)before.manifests[file]={sha256:await sha(file),parsed:parseYamlSubset(await fs.readFile(file,'utf8'))};
for(const [file,registry] of Object.entries(before.registries)){
 const snapshot=file==='registry/navigation-v042.json'?registry.currentSourceSnapshot:registry.sourceSnapshot;
 for(const [file,expected] of Object.entries(snapshot.filesSha256))if(file!==source&&file!==style&&expected!==await sha(file))throw new Error(`Unexpected source changed outside frozen Review08 scope: ${file}`);
}
await fs.writeFile(`${base}/metadata-before.json`,JSON.stringify(before,null,2)+'\n',{flag:'wx'});
for(const file of affectedRegistries){
 const d=structuredClone(before.registries[file]);
 if(d.priorReview07)throw new Error(`${file} already has a priorReview07 record; do not overwrite history`);
 d.priorReview07={reviewRevision:d.reviewRevision,sourceSnapshot:structuredClone(d.sourceSnapshot),currentFeedbackVerification:structuredClone(d.currentFeedbackVerification),reviewRevisionEvidence:d.reviewRevisionEvidence,reviewRevisionScope:d.reviewRevisionScope};
 d.reviewRevision=revision;
 d.reviewRevisionEvidence=`${base}/metadata-validation.json`;
 d.reviewRevisionScope='Four localized R4/S4 interaction visual annotations; other recipes retain existing defaults. Current source metadata only; pending human G2.';
 d.sourceSnapshot.recordedAt=recordedAt;
 d.sourceSnapshot.reviewRevision=revision;
 d.sourceSnapshot.scope='Current Review08 source hashes; priorReview07 preserves its exact snapshot and all earlier/G1 history remains unchanged.';
 d.sourceSnapshot.filesSha256[source]=sourceSha256;
 d.sourceSnapshot.filesSha256[style]=styleSourceSha256;
 d.currentFeedbackVerification={recordedAt,scope:'Review08 current source hashes, existing14/9/4/4 local/declared dependency closures and candidate/reused metadata checked; parent records runtime verification separately.',sourceHashEvidence:`${base}/metadata-validation.json`,humanGate:'pending-G2'};
 await fs.writeFile(file,JSON.stringify(d,null,2)+'\n');
}
for(const file of affectedManifests){
 let text=await fs.readFile(file,'utf8');
 const old=before.manifests[file].parsed;
 if(old.priorReview07CurrentSourceSnapshot||old.priorReview07FeedbackRevision)throw new Error(`${file} already contains Review07 preservation fields`);
 text=text.replace(/^sourceSha256:.*$/m,'sourceSha256: '+JSON.stringify(sourceSha256));
 text=text.replace(/^styleSourceSha256:.*$/m,'styleSourceSha256: '+JSON.stringify(styleSourceSha256));
 text=text.replace(/^sourceSnapshotRecordedAt:.*$/m,'sourceSnapshotRecordedAt: '+JSON.stringify(recordedAt));
 text=text.replace(/^currentFeedbackRevision:/m,'priorReview07FeedbackRevision:');
 text+='\npriorReview07CurrentSourceSnapshot:\n  sourcePath: '+JSON.stringify(old.sourcePath)+'\n  sourceSha256: '+JSON.stringify(old.sourceSha256)+'\n  styleSourcePath: '+JSON.stringify(old.styleSourcePath)+'\n  styleSourceSha256: '+JSON.stringify(old.styleSourceSha256)+'\n  recordedAt: '+JSON.stringify(old.sourceSnapshotRecordedAt)+'\n';
 const isR4=file.endsWith('navigation-r4.yaml');
 text+='\ncurrentFeedbackRevision:\n  id: '+JSON.stringify(revision)+'\n  recordedAt: '+JSON.stringify(recordedAt)+'\n  scope: '+JSON.stringify(isR4?'Four localized R4/S4 interaction annotations: existing32/14 header controls, regular TextNeutral6 classroom caption, group selected/current-hover FillBrandAlpha3. Other shared RegionHead defaults remain32/18.':'Shared r4-r6 source-file hash refreshed for localized R4/S4 annotations; this recipe retains its existing behavior and32/18 RegionHead default.')+'\n  humanGate: "pending-G2"\n  evidence: '+JSON.stringify(`${base}/metadata-validation.json`)+'\n  runtimeVerification: "See parent Review08 final runtime evidence; metadata checks do not grant Human Gate, contrast or production readiness."\n';
 if(isR4)text+='\nreview08LocalVisualFeedback:\n  scope: "Only R4/S4 interaction context and queue headers, classroom caption and selected group row; no breakpoint or shared-default change."\n  existingIconButtonSize: "32/14"\n  retainedRegionHeadDefault: "32/18"\n  publicTokens:\n    - "--rain-font-weight-regular"\n    - "--rain-category-text-neutral-6"\n    - "--rain-category-fill-brand-alpha-3"\n  newPublicTokens: false\n  wholeRowOpacity: false\n  evidence: '+JSON.stringify(`${base}/metadata-validation.json`)+'\n';
 parseYamlSubset(text);
 await fs.writeFile(file,text);
}
console.log(JSON.stringify({revision,recordedAt,updatedRegistries:affectedRegistries,updatedManifests:affectedManifests,sourceSha256,styleSourceSha256,closureFilesUnchanged:{businessStandalone:14,r2Local:9,registeredPattern:4,optionalGallery:4}}));
