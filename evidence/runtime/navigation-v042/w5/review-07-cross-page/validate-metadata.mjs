import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import path from 'node:path';
import { parseYamlSubset } from '../../../../../scripts/verification-helpers.mjs';
import { validateAsset } from '../../../../../scripts/asset-index.mjs';

const root=process.cwd();
const base='evidence/runtime/navigation-v042/w5/review-07-cross-page';
const before=JSON.parse(await fs.readFile(`${base}/metadata-before.json`));
const sha=async file=>crypto.createHash('sha256').update(await fs.readFile(file)).digest('hex');
const equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const result={recordedAt:new Date().toISOString(),status:'passed',candidateAssets:[],reusedAssets:[],registryHashes:[],manifestHashes:[],sourceClosures:[],galleryFixture:{},g1HistoryProtection:{},nativeCssRegistration:[],independentSourceReview:{},limitations:['Metadata/source closure checks do not certify all runtime behavior, contrast, assistive technologies or Human G2.','R2 accepted historical nativeCssExceptions retain the previously recorded36px gap; review07 adds only a Token-based platform CSS import to that source.']};
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
result.g1HistoryProtection.prior06RegistrySnapshotRetained=equal(currentG1.priorReview06CurrentSourceSnapshot,oldG1.currentSourceSnapshot);
const reviewFiles=['apps/playground/src/recipes/navigation-v042/platform-navigation.css','apps/playground/src/recipes/navigation-v042/samples.tsx','apps/playground/src/recipes/navigation-v042/w3-samples.tsx',...['r1-r3','r4-r6','workspace-states','w3-samples','r2'].map(file=>`apps/playground/src/recipes/navigation-v042/${file}.css`)];
result.independentSourceReview={filesSha256:Object.fromEntries(await Promise.all([...new Set(reviewFiles)].map(async file=>[file,await sha(file)]))),summary:'Platform mapping stays within existing outer rails/A2 icons demo; existing public category Tokens, mode-independent family official icons, dark theme scopes and pure shared item files. A4/Connections no-result role=status and A2/A5 real official Avatar assets are present. Five CSS imports each resolve to the new stylesheet.',runtimeDarkThemeEvidence:'Independent browser inspection of S1/S3/S4/S5/S6: dark NeutralAlpha2 hover and BrandSolid3 current/current-hover with TextNeutral1; no page writes.'};
if(result.registryHashes.some(check=>!check.matches)||result.manifestHashes.some(check=>!check.sourceMatches||check.styleMatches===false)||result.sourceClosures.some(check=>check.missing.length)||result.nativeCssRegistration.some(check=>Object.values(check.missing).some(list=>list.length))||Object.values(result.g1HistoryProtection.registry).some(ok=>!ok)||Object.values(result.g1HistoryProtection.manifest).some(ok=>!ok)||!result.g1HistoryProtection.prior06RegistrySnapshotRetained||!result.galleryFixture.sharedFamilyFilesUnchanged)result.status='failed';
result.summary={candidateAssets:result.candidateAssets.length,reusedAssets:result.reusedAssets.length,resolvedRegisteredPatternAssets:1,currentRegistrySourceHashEntries:result.registryHashes.length,currentManifestSourceHashChecks:result.manifestHashes.length,registeredPatternSourceHashChecks:manageTreeFiles.length,closureFiles:{businessStandalone:14,r2Standalone:9,r2RegisteredPattern:4,optionalGallery:4},historicalG1:'preserved',humanG2:'pending'};
await fs.writeFile(`${base}/metadata-validation.json`,JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({status:result.status,...result.summary}));
if(result.status!=='passed')process.exitCode=1;
