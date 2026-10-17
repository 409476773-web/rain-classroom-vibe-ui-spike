import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import { parseYamlSubset } from '../../../../../scripts/verification-helpers.mjs';

const base='evidence/runtime/navigation-v042/w5/review-07-cross-page';
const platform='apps/playground/src/recipes/navigation-v042/platform-navigation.css';
const revision='G2-composition-candidate-07';
const stamp=new Date().toISOString();
const registries=['registry/navigation-v042-w3.json','registry/navigation-v042-workspaces.json','registry/navigation-v042-recipes.json','registry/navigation-v042.json'];
const manifests=['manifests/ui/navigation-list.yaml','manifests/ui/object-navigator.yaml','manifests/ui/segmented-control.yaml','manifests/layouts/workspace.yaml','manifests/layouts/workspace-state.yaml','manifests/recipes/navigation-r1.yaml','manifests/recipes/navigation-r3.yaml','manifests/recipes/navigation-r4.yaml','manifests/recipes/navigation-r5.yaml','manifests/recipes/navigation-r6.yaml','manifests/recipes/navigation-states.yaml','manifests/recipes/navigation-r2.yaml'];
const galleryFiles=['apps/playground/src/recipes/navigation-v042/w3-samples.tsx','apps/playground/src/recipes/navigation-v042/w3-samples.css','apps/playground/src/recipes/navigation-v042/w3-samples.css.d.ts',platform];
const galleryIconSlugs=[...new Set([...(await fs.readFile(galleryFiles[0],'utf8')).matchAll(/@rain-next\/ui\/icons\/([\w-]+)/g)].map(match=>match[1]))];
const galleryDependencies=['registry/avatar.json#avatar','registry/navigation-v042.json#navigation-tabs','registry/navigation-v042.json#connected-surface','registry/navigation-v042-w3.json#navigation-list','registry/navigation-v042-w3.json#object-navigator','registry/navigation-v042-w3.json#segmented-control','registry/tag.json#tag',...galleryIconSlugs.map(slug=>`registry/icons.json#${slug}`)];
const sha=async file=>crypto.createHash('sha256').update(await fs.readFile(file)).digest('hex');
const before={recordedAt:stamp,registries:{},manifests:{}};
for(const file of registries) before.registries[file]=JSON.parse(await fs.readFile(file,'utf8'));
for(const file of manifests) before.manifests[file]={sha256:await sha(file),parsed:parseYamlSubset(await fs.readFile(file,'utf8'))};
await fs.writeFile(`${base}/metadata-before.json`,JSON.stringify(before,null,2)+'\n',{flag:'wx'});

const updated={};
for(const file of registries) {
  const d=structuredClone(before.registries[file]);
  const g1=file==='registry/navigation-v042.json';
  const old=g1?d.currentSourceSnapshot:d.sourceSnapshot;
  const snapshot=structuredClone(old);
  snapshot.recordedAt=stamp;
  snapshot.scope=g1?'Current review07 R2 and shared source hashes; accepted G1 sourceSnapshot, reviews and Gate remain historical.':'Current review07 W3-W5 candidate source hashes; no accepted G1 snapshot is rewritten.';
  snapshot.reviewRevision=revision;
  if(g1||d.consumerClosure) snapshot.filesSha256[platform]=await sha(platform);
  for(const path of Object.keys(snapshot.filesSha256)) snapshot.filesSha256[path]=await sha(path);
  if(g1) {
    d.priorReview06CurrentSourceSnapshot=structuredClone(old);
    d.currentSourceSnapshot=snapshot;
    const item=d.items.find(x=>x.name==='navigation-r2');
    item.files=[...new Set([...item.files,platform])];
    d.currentSourceSnapshot.consumptionSourceClosure={entry:'apps/playground/src/recipes/navigation-v042/consumer.tsx',files:item.files,scope:'R2 local relative copy payload; package dependencies remain declared Registry dependencies.'};
  } else {
    d.priorReview06={reviewRevision:d.reviewRevision??'prior-current-candidate',sourceSnapshot:structuredClone(old),consumerClosure:d.consumerClosure??null,currentFeedbackVerification:d.currentFeedbackVerification??null,reviewRevisionEvidence:d.reviewRevisionEvidence??null,reviewRevisionScope:d.reviewRevisionScope??null};
    d.sourceSnapshot=snapshot;
    d.reviewRevision=revision;
    d.reviewRevisionEvidence=`${base}/metadata-validation.json`;
    d.reviewRevisionScope='User platform-state/icon invariance, R3 file hierarchy, cross-page scoped visual/interaction repairs; pending-G2; no public Token or Gate promotion.';
    if(d.consumerClosure) {
      d.consumerClosure.files=[...new Set([...d.consumerClosure.files,platform])].sort();
      d.consumerClosure.scope='Complete 14-file standalone fixture including platform-navigation.css; public package assets remain explicit Registry dependencies.';
      d.sourceSnapshot.consumptionSourceClosure=structuredClone(d.consumerClosure);
      for(const item of d.items.filter(x=>x.name.startsWith('navigation-r')||x.name==='navigation-states')) item.files=[...d.consumerClosure.files];
    }
    if(file==='registry/navigation-v042-w3.json') {
      d.galleryFixtureSourceClosure={entry:galleryFiles[0],files:galleryFiles,scope:'Optional local gallery example fixture; shared family item.files remain their pure library source closure. Existing Avatar, NavigationTabs, ConnectedSurface, Tag and Rain icon dependencies are reused.',registryDependencies:galleryDependencies};
      for(const path of galleryFiles) d.sourceSnapshot.filesSha256[path]=await sha(path);
    }
    d.currentFeedbackVerification={recordedAt:stamp,scope:'Review07 current source hashes, local relative closure and candidate/reused asset metadata checked; final runtime/build verification is recorded separately by the parent task.',sourceHashEvidence:`${base}/metadata-validation.json`,humanGate:'pending-G2'};
  }
  updated[file]=d;
  await fs.writeFile(file,JSON.stringify(d,null,2)+'\n');
}

const scalar=v=>JSON.stringify(v);
const block=(name,lines)=>`${name}:\n${lines.map(x=>`  ${x}`).join('\n')}\n`;
const closureLines=files=>['scope: "Local relative source/style copy payload; public package dependencies remain declared in Registry."','files:',...files.map(file=>`  - ${scalar(file)}`)];
const platformLines=['sourcePath: '+scalar(platform),'sourceSha256: '+scalar(await sha(platform)),'scope: "Only the existing outermost platform rail and A2 icon-navigation demo; context navigation/object states keep their independent mappings."','publicTokens:',...['--rain-category-text-neutral-2','--rain-category-text-neutral-1','--rain-category-text-brand-1','--rain-category-fill-neutral-alpha-2','--rain-category-fill-brand-solid-3'].map(token=>'  - '+scalar(token)),'newPublicTokens: false','rawColors: []','globalReset: false'];
for(const file of manifests) {
  let text=await fs.readFile(file,'utf8');
  const d=before.manifests[file].parsed;
  const g1=file==='manifests/recipes/navigation-r2.yaml';
  const recipe=file.startsWith('manifests/recipes/');
  const unchangedLayout=file.startsWith('manifests/layouts/');
  const scope=g1?'User review07 platform rail states only; accepted G1 source/Gate and historical W4 controller fields are retained.':unchangedLayout?'Metadata-only current source check; Workspace controller source and behavior are unchanged.':recipe?'User review07 scoped page visual/interaction repairs and platform Token mapping; no business services or public Token reset.':'Shared source current metadata; NavigationList official-icon geometry and disabled-hover repair only; ObjectNavigator/SegmentedControl behavior unchanged.';
  if(!g1) {
    text=text.replace(/^sourceSha256:.*$/m,'sourceSha256: '+scalar(await sha(d.sourcePath)));
    if(d.styleSourcePath) text=text.replace(/^styleSourceSha256:.*$/m,'styleSourceSha256: '+scalar(await sha(d.styleSourcePath)));
    text=text.replace(/^sourceSnapshotRecordedAt:.*$/m,'sourceSnapshotRecordedAt: '+scalar(stamp));
    text+='\n'+block('priorReview06CurrentSourceSnapshot',['sourcePath: '+scalar(d.sourcePath),'sourceSha256: '+scalar(d.sourceSha256),'recordedAt: '+scalar(d.sourceSnapshotRecordedAt),...(d.styleSourcePath?['styleSourcePath: '+scalar(d.styleSourcePath),'styleSourceSha256: '+scalar(d.styleSourceSha256)]:[])]);
    if(d.currentFeedbackRevision) text=text.replace(/^currentFeedbackRevision:/m,'priorReview06FeedbackRevision:');
    text+='\n'+block('currentFeedbackRevision',['id: '+scalar(revision),'recordedAt: '+scalar(stamp),'scope: '+scalar(scope),'humanGate: "pending-G2"','evidence: '+scalar(`${base}/metadata-validation.json`),'runtimeVerification: "See final parent-task evidence; metadata checks do not substitute for runtime, contrast or Human Gate."']);
  } else {
    const files=updated['registry/navigation-v042.json'].items.find(i=>i.name==='navigation-r2').files;
    text+='\n'+block('currentFeedbackRevision07',['id: '+scalar(revision),'recordedAt: '+scalar(stamp),'scope: '+scalar(scope),'humanGate: "pending-G2"','evidence: '+scalar(`${base}/metadata-validation.json`)]);
    text+='\n'+block('currentFeedbackSourceSnapshot',['sourcePath: '+scalar(d.sourcePath),'sourceSha256: '+scalar(await sha(d.sourcePath)),'styleSourcePath: '+scalar(d.styleSourcePath),'styleSourceSha256: '+scalar(await sha(d.styleSourcePath)),'recordedAt: '+scalar(stamp),'sourceFiles:',...(await Promise.all(files.map(async file=>['  - path: '+scalar(file),'    sha256: '+scalar(await sha(file))]))).flat()]);
  }
  if(recipe) {
    const item=Object.values(updated).flatMap(reg=>reg.items).find(item=>item.manifest===file);
    text+='\n'+block('consumptionSourceClosure',closureLines(item.files));
    text+='\n'+block('platformNavigationFeedbackTokens',platformLines);
  } else if(file.startsWith('manifests/ui/')) {
    text+='\n'+block('consumptionSourceClosure',['scope: "Pure shared library source; no import or dependency on Gallery host styles."','files:','  - '+scalar(d.sourcePath),'  - '+scalar(d.styleSourcePath)]);
    text+='\n'+block('optionalGalleryFixtureSourceClosure',['registry: "registry/navigation-v042-w3.json"','scope: "Optional local gallery fixture; this is not a shared-library dependency."','files:',...galleryFiles.map(file=>'  - '+scalar(file))]);
  }
  if(!g1&&d.nativeCssExceptions?.sourcePath) {
    const css=(await fs.readFile(d.nativeCssExceptions.sourcePath,'utf8')).replace(/\/\*[\s\S]*?\*\//g,'');
    const actual={registeredLocalVariables:[...css.matchAll(/(--rain-local-[\w-]+)\s*:/g)].map(x=>x[1]),registeredRawColors:[...css.matchAll(/#[0-9a-fA-F]{3,8}\b/g)].map(x=>x[0].toLowerCase()),registeredLiteralPixels:[...css.matchAll(/(?:\d*\.)?\d+px\b/g)].map(x=>x[0])};
    for(const [key,values] of Object.entries(actual)) {
      const original=d.nativeCssExceptions[key];
      if(!original) continue;
      const union=[...new Set([...original,...values])].sort();
      text=text.replace(new RegExp(`(^  ${key}:)(?: \\[\\]|\\n(?:    -.*\\n)*)`,'m'),`  ${key}:`+(union.length?'\n'+union.map(v=>'    - '+scalar(v)+'\n').join(''):' []\n'));
    }
    if(file==='manifests/recipes/navigation-r5.yaml') {
      const selector='.nv5-r5 .nv5-player-controls>input[type="range"]';
      const registration=['  review07RangeBrowserAdaptation:','    scope: "R5 native range only; browser pseudo parts; input value/onChange/keyboard and outer16px geometry are retained."','    selectors:',...['::-webkit-slider-runnable-track','::-webkit-slider-thumb','::-moz-range-track','::-moz-range-thumb'].map(part=>'      - '+scalar(selector+part)),'    publicTokens:','      - "--rain-line-thickness-4"','      - "--rain-radius-full"','      - "--rain-category-fill-neutral-solid-3"','      - "--rain-category-fill-brand-solid-2"','    retainedThumbGeometry: "14px from the pre-existing native thumb; local browser adaptation, not a new Foundation default."','    evidence: "evidence/runtime/navigation-v042/w5/review-07-cross-page/r4-r6-owner/range-browser-results.json"'].join('\n')+'\n';
      text=text.replace(/^sourceSha256:/m,registration+'sourceSha256:');
    }
  }
  await fs.writeFile(file,text);
}
console.log(JSON.stringify({updatedRegistries:registries.length,updatedCandidateManifests:manifests.length,reviewRevision:revision,stamp,closureFiles:updated['registry/navigation-v042-w3.json'].consumerClosure.files.length,currentRegistryHashEntries:Object.values(updated).reduce((n,d)=>n+Object.keys(d.currentSourceSnapshot?.filesSha256??d.sourceSnapshot?.filesSha256??{}).length,0)}));
