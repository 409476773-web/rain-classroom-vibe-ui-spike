import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import path from 'node:path';
import { parseYamlSubset } from '../../../../../scripts/verification-helpers.mjs';
import { validateAsset } from '../../../../../scripts/asset-index.mjs';

const root=process.cwd();
const base='evidence/runtime/navigation-v042/w5/review-08-r4-details';
const before=JSON.parse(await fs.readFile(`${base}/metadata-before.json`));
const sha=async file=>crypto.createHash('sha256').update(await fs.readFile(file)).digest('hex');
const equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const result={recordedAt:new Date().toISOString(),status:'passed',candidateAssets:[],reusedAssets:[],registryHashes:[],manifestHashes:[],sourceClosures:[],galleryFixture:{},g1HistoryProtection:{},review07HistoryProtection:{registries:{},manifests:{},unaffectedFiles:{}},nativeCssRegistration:[],independentSourceReview:{},limitations:['Metadata/source closure checks do not certify all runtime behavior, contrast, assistive technologies or Human G2.','R2 accepted historical nativeCssExceptions retain the previously recorded36px gap; Review08 does not modify R2 source or accepted metadata.']};
const registryPaths=Object.keys(before.registries);
const registries={};
for(const registryPath of registryPaths) {
  const registry=JSON.parse(await fs.readFile(registryPath));registries[registryPath]=registry;
  const snapshot=registryPath==='registry/navigation-v042.json'?registry.currentSourceSnapshot:registry.sourceSnapshot;
  for(const [file,expected] of Object.entries(snapshot.filesSha256)) result.registryHashes.push({registry:registryPath,file,matches:expected===await sha(file)});
  for(const item of registry.items??[]) {
    if(!Object.hasOwn(before.manifests,item.manifest))continue;
    const manifest=parseYamlSubset(await fs.readFile(item.manifest,'utf8'));
    validateAsset({manifest,item,registry},root);
    result.candidateAssets.push({id:manifest.id,manifest:item.manifest,registry:registryPath,status:'passed'});
    const current=item.name==='navigation-r2'?manifest.currentFeedbackSourceSnapshot:manifest;
    result.manifestHashes.push({manifest:item.manifest,sourcePath:current.sourcePath,sourceMatches:current.sourceSha256===await sha(current.sourcePath),...(current.styleSourcePath?{stylePath:current.styleSourcePath,styleMatches:current.styleSourceSha256===await sha(current.styleSourcePath)}:{})});
    const css=manifest.nativeCssExceptions;
    if(css&&item.name!=='navigation-r2') {
      const source=(await fs.readFile(css.sourcePath,'utf8')).replace(/\/\*[\s\S]*?\*\//g,'');
      const kinds={registeredLocalVariables:[...source.matchAll(/(--rain-local-[\w-]+)\s*:/g)].map(m=>m[1]),registeredRawColors:[...source.matchAll(/#[0-9a-fA-F]{3,8}\b/g)].map(m=>m[0].toLowerCase()),registeredLiteralPixels:[...source.matchAll(/(?:\d*\.)?\d+px\b/g)].map(m=>m[0])};
      const missing={};for(const [key,values] of Object.entries(kinds))if(css[key])missing[key]=[...new Set(values.filter(v=>!css[key].includes(v)))];
      result.nativeCssRegistration.push({manifest:item.manifest,sourcePath:css.sourcePath,missing,rangeBrowserRegistration:item.name==='navigation-r5'?css.review07RangeBrowserAdaptation:null});
    }
  }
}
for(const [registryPath,name] of [['registry/avatar.json','avatar'],['registry/avatar.json','avatar-group'],['registry/avatar.json','avatar-grid'],['registry/icon-button.json','icon-button']]) {
  const registry=JSON.parse(await fs.readFile(registryPath));
  const item=registry.items.find(item=>item.name===name);
  const manifest=parseYamlSubset(await fs.readFile(item.manifest,'utf8'));
  validateAsset({manifest,item,registry},root);
  result.reusedAssets.push({id:manifest.id,registry:registryPath,name,status:'passed'});
}
const resolveLocal=async (source,specifier)=>{
  const raw=path.posix.normalize(path.posix.join(path.posix.dirname(source),specifier));
  for(const file of [raw,raw+'.tsx',raw+'.ts',raw+'.css',raw+'/index.tsx',raw+'/index.ts'])try{await fs.access(file);return file;}catch{}
  throw new Error(`Unresolved relative import ${source}: ${specifier}`);
};
const inspectClosure=async (name,files,resolvedRegisteredDependencies=[])=>{
  const dependencyByFile=new Map(resolvedRegisteredDependencies.flatMap(dependency=>dependency.files.map(file=>[file,dependency.reference])));
  const inspected=[...new Set([...files,...dependencyByFile.keys()])];
  const set=new Set(inspected),links=[],missing=[];
  for(const source of inspected) {
    const text=await fs.readFile(source,'utf8');
    const references=source.endsWith('.css')?[...text.matchAll(/@import\s+['"](\.[^'"]+)['"]/g)].map(match=>match[1]):source.endsWith('.tsx')?[...text.matchAll(/(?:from\s+|import\s+)['"](\.[^'"]+)['"]/g)].map(match=>match[1]):source.endsWith('.html')?[...text.matchAll(/<script\b[^>]*src=['"]([^'"]+)['"]/g)].map(match=>match[1]):[];
    for(const specifier of references) {
      const resolved=specifier.startsWith('/')&&source.endsWith('.html')?path.posix.join(path.posix.dirname(source),specifier.slice(1)):await resolveLocal(source,specifier);
      links.push({source,specifier,resolved,...(dependencyByFile.has(resolved)?{providedByRegistryDependency:dependencyByFile.get(resolved)}:{})});
      if(!set.has(resolved))missing.push({source,specifier,resolved});
    }
  }
  result.sourceClosures.push({name,files:files.length,closureScope:'Local fixture payload plus explicitly declared Registry dependencies; dependencies retain their own Registry source boundary.',totalInspectedFiles:inspected.length,resolvedRegisteredDependencies,links,missing});
};
await inspectClosure('W3/W5 standalone14',registries['registry/navigation-v042-w3.json'].consumerClosure.files);
const r2Item=registries['registry/navigation-v042.json'].items.find(item=>item.name==='navigation-r2');
const manageTreeReference='registry/tree.json#manage-tree';
if(!r2Item.registryDependencies.includes(manageTreeReference))throw new Error('R2 no longer explicitly declares its ManageTree Registry dependency');
const treeRegistry=JSON.parse(await fs.readFile('registry/tree.json'));
const manageTreeItem=treeRegistry.items.find(item=>item.name==='manage-tree');
const manageTreeManifest=parseYamlSubset(await fs.readFile(manageTreeItem.manifest,'utf8'));
validateAsset({manifest:manageTreeManifest,item:manageTreeItem,registry:treeRegistry},root);
const manageTreeLock=registries['registry/navigation-v042.json'].currentSourceSnapshot.consumptionSourceClosure.resolvedRegisteredDependencies.find(dependency=>dependency.reference===manageTreeReference);
if(!equal(Object.keys(manageTreeLock.filesSha256),manageTreeItem.files))throw new Error('R2 ManageTree registered dependency source files differ from the live Registry item');
const manageTreeFiles=await Promise.all(manageTreeItem.files.map(async file=>({path:file,sha256:await sha(file),matches:manageTreeLock.filesSha256[file]===await sha(file)})));
if(manageTreeFiles.some(file=>!file.matches))throw new Error('R2 ManageTree registered dependency hash does not match');
const r2CurrentManifest=parseYamlSubset(await fs.readFile(r2Item.manifest,'utf8'));
const manageTreeManifestLock=r2CurrentManifest.consumptionSourceClosure.resolvedRegisteredDependencies.find(dependency=>dependency.reference===manageTreeReference);
if(!equal(manageTreeManifestLock.sourceFiles,manageTreeFiles.map(({path,sha256})=>({path,sha256}))))throw new Error('R2 manifest registered dependency source lock differs from Registry current closure');
await inspectClosure('R2 standalone9 + explicitly registered ManageTree4',r2Item.files,[{reference:manageTreeReference,manifest:manageTreeItem.manifest,assetValidation:'passed',files:manageTreeItem.files,sourceHashValidation:manageTreeFiles}]);
const gallery=registries['registry/navigation-v042-w3.json'].galleryFixtureSourceClosure;
await inspectClosure('Optional Gallery fixture4',gallery.files);
for(const dependency of gallery.registryDependencies) {
  const [registryPath,name]=dependency.split('#');
  const registry=JSON.parse(await fs.readFile(registryPath));
  if(!registry.items.some(item=>item.name===name))throw new Error(`Unresolved Gallery Registry dependency ${dependency}`);
}
result.galleryFixture={files:gallery.files,dependencies:gallery.registryDependencies,status:'passed',sharedFamilyFilesUnchanged:['navigation-list','object-navigator','segmented-control'].every(name=>equal(registries['registry/navigation-v042-w3.json'].items.find(i=>i.name===name).files,before.registries['registry/navigation-v042-w3.json'].items.find(i=>i.name===name).files))};
const oldG1=before.registries['registry/navigation-v042.json'],currentG1=registries['registry/navigation-v042.json'];
const protectedRegistryKeys=['sourceSnapshot','reviewRevision','reviewRevisions','humanGate','humanGateScope','humanGateDecision','controllerIntegration'];
result.g1HistoryProtection.registry=Object.fromEntries(protectedRegistryKeys.map(key=>[key,equal(currentG1[key],oldG1[key])]));
const r2=parseYamlSubset(await fs.readFile('manifests/recipes/navigation-r2.yaml','utf8'));
const priorR2=before.manifests['manifests/recipes/navigation-r2.yaml'].parsed;
const protectedManifestKeys=['sourceSha256','styleSourceSha256','sourceSnapshotRecordedAt','humanGate','humanGateScope','humanGateDecision','reviewRevision','latestReviewRevision','review02History','review05History','review07History','review07Composition','review08Motion','controllerIntegration','nativeCssExceptions'];
result.g1HistoryProtection.manifest=Object.fromEntries(protectedManifestKeys.map(key=>[key,equal(r2[key],priorR2[key])]));
result.g1HistoryProtection.prior06RegistrySnapshotRetained=equal(currentG1.priorReview06CurrentSourceSnapshot,oldG1.priorReview06CurrentSourceSnapshot);
result.g1HistoryProtection.r2CurrentRegistryUnchanged=equal(currentG1,oldG1);
result.g1HistoryProtection.r2CurrentManifestUnchanged=equal(r2,priorR2);
const affectedRegistries=['registry/navigation-v042-w3.json','registry/navigation-v042-recipes.json'];
for(const registryPath of affectedRegistries){
 const current=registries[registryPath],old=before.registries[registryPath];
 const expectedPrior={reviewRevision:old.reviewRevision,sourceSnapshot:old.sourceSnapshot,currentFeedbackVerification:old.currentFeedbackVerification,reviewRevisionEvidence:old.reviewRevisionEvidence,reviewRevisionScope:old.reviewRevisionScope};
 result.review07HistoryProtection.registries[registryPath]={prior07Retained:equal(current.priorReview07,expectedPrior),prior06Retained:equal(current.priorReview06,old.priorReview06),itemsUnchanged:equal(current.items,old.items),consumerClosureUnchanged:equal(current.consumerClosure,old.consumerClosure),galleryFixtureUnchanged:equal(current.galleryFixtureSourceClosure,old.galleryFixtureSourceClosure),gateUnchanged:equal(current.humanGate,old.humanGate)};
}
const affectedManifests=['manifests/recipes/navigation-r4.yaml','manifests/recipes/navigation-r5.yaml','manifests/recipes/navigation-r6.yaml'];
for(const file of affectedManifests){
 const current=parseYamlSubset(await fs.readFile(file,'utf8')),old=before.manifests[file].parsed;
 result.review07HistoryProtection.manifests[file]={prior07FeedbackRetained:equal(current.priorReview07FeedbackRevision,old.currentFeedbackRevision),prior07SourceLockRetained:equal(current.priorReview07CurrentSourceSnapshot,{sourcePath:old.sourcePath,sourceSha256:old.sourceSha256,styleSourcePath:old.styleSourcePath,styleSourceSha256:old.styleSourceSha256,recordedAt:old.sourceSnapshotRecordedAt}),prior06FeedbackRetained:equal(current.priorReview06FeedbackRevision,old.priorReview06FeedbackRevision),prior06SourceLockRetained:equal(current.priorReview06CurrentSourceSnapshot,old.priorReview06CurrentSourceSnapshot),localClosureUnchanged:equal(current.consumptionSourceClosure,old.consumptionSourceClosure),platformMappingUnchanged:equal(current.platformNavigationFeedbackTokens,old.platformNavigationFeedbackTokens),nativeCssRegistrationUnchanged:equal(current.nativeCssExceptions,old.nativeCssExceptions),gateUnchanged:equal(current.humanGate,old.humanGate)};
}
for(const file of registryPaths.filter(file=>!affectedRegistries.includes(file)))result.review07HistoryProtection.unaffectedFiles[file]=equal(registries[file],before.registries[file]);
for(const [file,old] of Object.entries(before.manifests).filter(([file])=>!affectedManifests.includes(file)))result.review07HistoryProtection.unaffectedFiles[file]=await sha(file)===old.sha256;
const reviewFiles=['apps/playground/src/recipes/navigation-v042/r4-r6.tsx','apps/playground/src/recipes/navigation-v042/r4-r6.css'];
result.independentSourceReview={filesSha256:Object.fromEntries(await Promise.all(reviewFiles.map(async file=>[file,await sha(file)]))),summary:'Metadata updates are limited to current shared-file hashes in two affected candidate Registries and three recipe manifests. Review08 feedback is local to R4/S4 interaction; existing fixtures, component/source boundaries, dependency closures, public defaults and Gates are preserved.',runtimeVerification:'Recorded by the parent task; this source metadata check does not substitute for runtime evidence.'};
const historyChecks=[...Object.values(result.review07HistoryProtection.registries).flatMap(check=>Object.values(check)),...Object.values(result.review07HistoryProtection.manifests).flatMap(check=>Object.values(check)),...Object.values(result.review07HistoryProtection.unaffectedFiles)];
if(result.registryHashes.some(check=>!check.matches)||result.manifestHashes.some(check=>!check.sourceMatches||check.styleMatches===false)||result.sourceClosures.some(check=>check.missing.length)||result.nativeCssRegistration.some(check=>Object.values(check.missing).some(list=>list.length))||Object.values(result.g1HistoryProtection.registry).some(ok=>!ok)||Object.values(result.g1HistoryProtection.manifest).some(ok=>!ok)||!result.g1HistoryProtection.prior06RegistrySnapshotRetained||!result.g1HistoryProtection.r2CurrentRegistryUnchanged||!result.g1HistoryProtection.r2CurrentManifestUnchanged||!result.galleryFixture.sharedFamilyFilesUnchanged||historyChecks.some(ok=>!ok))result.status='failed';
result.summary={reviewRevision:'G2-composition-candidate-08',updatedRegistries:affectedRegistries.length,updatedManifests:affectedManifests.length,candidateAssets:result.candidateAssets.length,reusedAssets:result.reusedAssets.length,resolvedRegisteredPatternAssets:1,currentRegistrySourceHashEntries:result.registryHashes.length,currentManifestSourceHashChecks:result.manifestHashes.length,registeredPatternSourceHashChecks:manageTreeFiles.length,closureFiles:{businessStandalone:14,r2Standalone:9,r2RegisteredPattern:4,optionalGallery:4},historicalG1:'preserved',historicalReview07:'preserved',humanG2:'pending'};
await fs.writeFile(`${base}/metadata-validation.json`,JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({status:result.status,...result.summary}));
if(result.status!=='passed')process.exitCode=1;
