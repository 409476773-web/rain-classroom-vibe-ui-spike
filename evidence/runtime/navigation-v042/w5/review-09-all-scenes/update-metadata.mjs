import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import { parseYamlSubset } from '../../../../../scripts/verification-helpers.mjs';
const base='evidence/runtime/navigation-v042/w5/review-09-all-scenes', revision='G2-composition-candidate-09';
if(process.argv[2]!=='--source-freeze-confirmed')throw new Error('Wait for the parent source-freeze confirmation before writing shared metadata');
const registries=['registry/navigation-v042-w3.json','registry/navigation-v042-workspaces.json','registry/navigation-v042-recipes.json','registry/navigation-v042.json'];
const manifests=['manifests/ui/navigation-list.yaml','manifests/ui/object-navigator.yaml','manifests/ui/segmented-control.yaml','manifests/layouts/workspace.yaml','manifests/layouts/workspace-state.yaml','manifests/recipes/navigation-r1.yaml','manifests/recipes/navigation-r3.yaml','manifests/recipes/navigation-r4.yaml','manifests/recipes/navigation-r5.yaml','manifests/recipes/navigation-r6.yaml','manifests/recipes/navigation-states.yaml','manifests/recipes/navigation-r2.yaml'];
const tooltip='registry/tooltip.json#tooltip', segmented='registry/navigation-v042-w3.json#segmented-control', empty='registry/table.json#empty';
const scenes=['R1','R2','R3','R4','R5','R6','S1','S2','S3','S4','S5','S6'];
const platform='apps/playground/src/recipes/navigation-v042/platform-navigation.css';
const sha=async file=>crypto.createHash('sha256').update(await fs.readFile(file)).digest('hex');
const unique=values=>[...new Set(values)];
const recordedAt=new Date().toISOString();
const before={recordedAt,registries:{},manifests:{}};
for(const file of registries)before.registries[file]=JSON.parse(await fs.readFile(file,'utf8'));
for(const file of manifests)before.manifests[file]={sha256:await sha(file),parsed:parseYamlSubset(await fs.readFile(file,'utf8'))};
await fs.writeFile(`${base}/metadata-before.json`,JSON.stringify(before,null,2)+'\n',{flag:'wx'});
const frozenFiles=unique(Object.values(before.registries).flatMap(d=>Object.keys((d.currentSourceSnapshot??d.sourceSnapshot).filesSha256)));
const frozenSourceLock=Object.fromEntries(await Promise.all(frozenFiles.map(async file=>[file,await sha(file)])));
await fs.writeFile(`${base}/metadata-source-freeze.json`,JSON.stringify({recordedAt,authority:'Parent source-freeze confirmation; no production source is written by this metadata owner.',filesSha256:frozenSourceLock},null,2)+'\n',{flag:'wx'});
const updated={};
for(const file of registries){
 const d=structuredClone(before.registries[file]),g1=file==='registry/navigation-v042.json',old=g1?d.currentSourceSnapshot:d.sourceSnapshot;
 if(g1){
  if(d.priorReview08CurrentSourceSnapshot)throw new Error('Review08 current source preservation key already exists');
  d.priorReview08CurrentSourceSnapshot=structuredClone(old);
  d.priorReview08DependencyState={sharedComponentDependencies:structuredClone(d.shared.componentDependencies),sharedRegistryDependencies:structuredClone(d.shared.registryDependencies),r2RegistryDependencies:structuredClone(d.items.find(i=>i.name==='navigation-r2').registryDependencies)};
  d.currentFeedbackRevision09={id:revision,recordedAt,scope:'All12 R/S pages audit; R2 existing Tooltip and SegmentedControl reuse/current source hashes; accepted G1 review and Gate remain historical.',scenes,evidence:`${base}/metadata-validation.json`,humanGate:'pending-G2'};
 }else{
  if(d.priorReview08)throw new Error(`${file} Review08 preservation key already exists`);
  d.priorReview08={reviewRevision:d.reviewRevision,sourceSnapshot:structuredClone(old),currentFeedbackVerification:structuredClone(d.currentFeedbackVerification),reviewRevisionEvidence:d.reviewRevisionEvidence,reviewRevisionScope:d.reviewRevisionScope};
  d.reviewRevision=revision;d.reviewRevisionEvidence=`${base}/metadata-validation.json`;
  d.reviewRevisionScope='All R1-R6/S1-S6 scoped local visual/interaction audit and current source/copy closure metadata. Shared Workspace core unchanged; public defaults, historical G1 and Human Gates preserved.';
  d.currentFeedbackVerification={recordedAt,scope:'Current Review09 source hashes, existing14/9/4/4 local/registered source closures and declared reused components; parent records final runtime/build separately.',scenes,sourceHashEvidence:`${base}/metadata-validation.json`,humanGate:'pending-G2'};
 }
 const snapshot=structuredClone(old);snapshot.recordedAt=recordedAt;snapshot.reviewRevision=revision;snapshot.scope='Review09 current source hashes for all12 R/S pages; exact pre-Review09 source snapshots and earlier G1/review histories remain preserved.';
 for(const path of Object.keys(snapshot.filesSha256))snapshot.filesSha256[path]=frozenSourceLock[path];
 snapshot.review09Scenes=scenes;
 if(g1)d.currentSourceSnapshot=snapshot;else d.sourceSnapshot=snapshot;
 if(file==='registry/navigation-v042-w3.json'){
  d.shared.registryDependencies=unique([...d.shared.registryDependencies,tooltip,empty]);
  d.shared.componentDependencies=unique([...d.shared.componentDependencies,'manifests/ui/tooltip.yaml','manifests/ui/empty.yaml']);
  for(const item of d.items.filter(i=>['navigation-list','object-navigator','segmented-control'].includes(i.name))){item.registryDependencies=unique([...(item.registryDependencies??[]),tooltip]);item.componentDependencies=unique([...(item.componentDependencies??[]),'manifests/ui/tooltip.yaml']);item.dependencyNotes='The physical navigation-families.tsx copy payload imports existing Tooltip for NavigationList compact presentation; this source dependency also applies when copying ObjectNavigator/SegmentedControl from the same file. Accepted Tooltip source/defaults are unchanged.';}
  for(const item of d.items.filter(i=>i.name.startsWith('navigation-r')))item.registryDependencies=unique([...(item.registryDependencies??[]),tooltip,empty]);
  d.galleryFixtureSourceClosure.registryDependencies=unique([...d.galleryFixtureSourceClosure.registryDependencies,tooltip]);
 }
 if(file==='registry/navigation-v042-recipes.json'){
  d.shared.registryDependencies=unique([...d.shared.registryDependencies,tooltip,empty]);
  d.shared.componentDependencies=unique([...d.shared.componentDependencies,'manifests/ui/tooltip.yaml','manifests/ui/empty.yaml']);
  for(const item of d.items)item.registryDependencies=unique([...(item.registryDependencies??[]),tooltip,empty]);
 }
 if(g1){
  d.shared.componentDependencies=unique([...d.shared.componentDependencies,'manifests/ui/segmented-control.yaml']);
  const r2=d.items.find(i=>i.name==='navigation-r2');r2.registryDependencies=unique([...r2.registryDependencies,tooltip,segmented]);
  d.currentSourceSnapshot.consumptionSourceClosure.registryDependencies=unique([...(d.currentSourceSnapshot.consumptionSourceClosure.registryDependencies??[]),tooltip,segmented,'registry/tree.json#manage-tree']);
 }
 updated[file]=d;await fs.writeFile(file,JSON.stringify(d,null,2)+'\n');
}
const scalar=v=>JSON.stringify(v);
const mapping=(obj,indent=0)=>Object.entries(obj).flatMap(([key,value])=>{
 const space=' '.repeat(indent);
 if(Array.isArray(value))return value.length?[space+key+':',...value.flatMap(item=>{if(item&&typeof item==='object'){const lines=mapping(item,indent+4);return[space+'  - '+lines[0].trimStart(),...lines.slice(1)];}return[space+'  - '+scalar(item)];})]:[space+key+': []'];
 if(value&&typeof value==='object')return[space+key+':',...mapping(value,indent+2)];
 return[space+key+': '+scalar(value)];
});
const block=(name,value)=>mapping({[name]:value}).join('\n')+'\n';
const replaceTop=(text,name,value)=>{
 const re=new RegExp(`^${name}:.*$`,'m'),match=re.exec(text);if(!match)return text+'\n'+block(name,value);
 const after=text.indexOf('\n',match.index)+1,next=text.slice(after).search(/^[A-Za-z_][\w-]*:/m),end=next<0?text.length:after+next;
 return text.slice(0,match.index)+block(name,value)+'\n'+text.slice(end);
};
const nativeRegistration=async (previous,sourcePath)=>{
 const css=(await fs.readFile(sourcePath,'utf8')).replace(/\/\*[\s\S]*?\*\//g,'');
 const kinds={registeredLocalVariables:[...css.matchAll(/(--(?:rain-local|nv44)-[\w-]+)\s*:/g)].map(m=>m[1]),registeredRawColors:[...css.matchAll(/#[0-9a-fA-F]{3,8}\b/g)].map(m=>m[0].toLowerCase()),registeredLiteralPixels:[...css.matchAll(/(?:\d*\.)?\d+px\b/g)].map(m=>m[0])};
 const next=structuredClone(previous);for(const [key,values]of Object.entries(kinds))next[key]=unique([...(next[key]??[]),...values]).sort();
 next.review09CurrentSource={sourceSha256:await sha(sourcePath),scope:'Current source evidence; new feature-local aliases reuse existing Foundation Token values. Prior registered literals remain historical, not new public Tokens.',evidence:`${base}/metadata-validation.json`,newPublicTokens:false};
 return next;
};
let updatedManifests=0;
for(const file of manifests){
 if(file.startsWith('manifests/layouts/'))continue;
 let text=await fs.readFile(file,'utf8');const old=before.manifests[file].parsed,g1=file==='manifests/recipes/navigation-r2.yaml',family=file.startsWith('manifests/ui/');
 const currentOld=g1?old.currentFeedbackSourceSnapshot:old;
 if(old.priorReview08CurrentSourceSnapshot||old.priorReview08CurrentFeedbackSourceSnapshot)throw new Error(`${file} already preserves pre09 current source`);
 const priorSource={sourcePath:currentOld.sourcePath,sourceSha256:currentOld.sourceSha256,styleSourcePath:currentOld.styleSourcePath,styleSourceSha256:currentOld.styleSourceSha256,recordedAt:currentOld.recordedAt??currentOld.sourceSnapshotRecordedAt};
 if(g1){
  text+='\n'+block('priorReview08CurrentFeedbackSourceSnapshot',old.currentFeedbackSourceSnapshot);
  const item=updated['registry/navigation-v042.json'].items.find(i=>i.name==='navigation-r2');
  text=replaceTop(text,'currentFeedbackSourceSnapshot',{sourcePath:old.sourcePath,sourceSha256:await sha(old.sourcePath),styleSourcePath:old.styleSourcePath,styleSourceSha256:await sha(old.styleSourcePath),recordedAt,reviewRevision:revision,sourceFiles:await Promise.all(item.files.map(async path=>({path,sha256:await sha(path)})))});
 }else{
  text=text.replace(/^sourceSha256:.*$/m,'sourceSha256: '+scalar(await sha(old.sourcePath)));
  if(old.styleSourcePath)text=text.replace(/^styleSourceSha256:.*$/m,'styleSourceSha256: '+scalar(await sha(old.styleSourcePath)));
  text=text.replace(/^sourceSnapshotRecordedAt:.*$/m,'sourceSnapshotRecordedAt: '+scalar(recordedAt));
  text+='\n'+block('priorReview08CurrentSourceSnapshot',priorSource);
  if(old.currentFeedbackRevision)text=text.replace(/^currentFeedbackRevision:/m,'priorReview08FeedbackRevision:');
 }
 const feedback={id:revision,recordedAt,scope:family?'All12 R/S pages consume the physical shared family source; NavigationList compact existing Tooltip behavior and declared copy dependencies. ObjectNavigator/SegmentedControl behavior and shared visual defaults retained.':g1?'All12 R/S audit includes R2 local Tooltip/SegmentedControl reuse and mock interaction repairs; accepted G1 source/Gate history remains unchanged.':'All R1-R6/S1-S6 local Recipe audit; existing Token palette aliases, confirmed empty/narrow/scroll and interaction repairs. Public defaults, Review08 choices and Gates retained.',scenes,humanGate:'pending-G2',evidence:`${base}/metadata-validation.json`,runtimeVerification:'See parent Review09 final runtime/build evidence; metadata does not grant Human Gate, contrast or production readiness.'};
 text+='\n'+block(g1?'currentFeedbackRevision09':'currentFeedbackRevision',feedback);
 const deps=family?[tooltip]:g1?[tooltip,segmented]:[tooltip,empty];
 const depManifests=family?['manifests/ui/tooltip.yaml']:g1?['manifests/ui/tooltip.yaml','manifests/ui/segmented-control.yaml']:['manifests/ui/tooltip.yaml','manifests/ui/empty.yaml'];
 text=replaceTop(text,'dependencies',unique([...old.dependencies,...(family?['Existing Tooltip from registry/tooltip.json#tooltip; physical shared source dependency for all three family copy payloads.']:g1?['Existing SegmentedControl from registry/navigation-v042-w3.json#segmented-control; source imports existing Tooltip directly.']:['Existing Empty/EmptyTitle from registry/table.json#empty and shared family existing Tooltip; physical14-file standalone source closure dependency.'])]));
 text=replaceTop(text,'relatedComponents',unique([...(old.relatedComponents??[]),...(family?['ui-tooltip']:g1?['ui-tooltip','ui-segmented-control']:['ui-tooltip','ui-empty'])]));
 const closure=structuredClone(old.consumptionSourceClosure);closure.registryDependencies=unique([...(closure.registryDependencies??[]),...deps]);closure.componentDependencies=unique([...(closure.componentDependencies??[]),...depManifests]);
 text=replaceTop(text,'consumptionSourceClosure',closure);
 text+='\n'+block('review09PhysicalSourceDependencies',{scope:'Existing registered source dependencies; no new npm install, public Token or accepted component rewrite.',registryDependencies:deps,componentDependencies:depManifests});
 if(old.platformNavigationFeedbackTokens){text+='\n'+block('priorReview08PlatformNavigationFeedbackTokens',old.platformNavigationFeedbackTokens);const live=structuredClone(old.platformNavigationFeedbackTokens);live.sourceSha256=await sha(platform);text=replaceTop(text,'platformNavigationFeedbackTokens',live);}
 if(old.nativeCssExceptions?.sourcePath){
  if(g1){text+='\n'+block('currentFeedbackNativeCssExceptions09',await nativeRegistration(old.nativeCssExceptions,old.nativeCssExceptions.sourcePath));}
  else{text+='\n'+block('priorReview08NativeCssRegistration',{evidence:`${base}/metadata-before.json`,manifest:file,manifestSha256:before.manifests[file].sha256,scope:'Exact prior parsed registration preserved in immutable metadata-before.json; earlier named subrecords remain intact.'});text=replaceTop(text,'nativeCssExceptions',await nativeRegistration(old.nativeCssExceptions,old.nativeCssExceptions.sourcePath));}
 }
 parseYamlSubset(text);await fs.writeFile(file,text);updatedManifests++;
}
for(const [file,hash]of Object.entries(frozenSourceLock))if(await sha(file)!==hash)throw new Error(`Source changed while metadata was being locked: ${file}`);
console.log(JSON.stringify({revision,recordedAt,updatedRegistries:registries.length,updatedManifests,checkedCandidateManifests:manifests.length,sourceHashEntries:Object.values(updated).reduce((n,d)=>n+Object.keys((d.currentSourceSnapshot??d.sourceSnapshot).filesSha256).length,0),scenes,addedSourceDependencies:{tooltip,segmented,empty},closureFiles:{businessStandalone:14,r2Local:9,registeredPattern:4,optionalGallery:4}}));
