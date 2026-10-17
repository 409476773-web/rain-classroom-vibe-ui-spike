import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFileSync,mkdirSync,writeFileSync,existsSync} from 'node:fs';
import {join,dirname} from 'node:path';
import {readCarouselUpgradeSourceBindings,carouselBindingBytes} from '../../../scripts/carousel-upgrade-governance.mjs';
import {parseYamlSubset} from '../../../scripts/verification-helpers.mjs';
import {drawerRefinementFiles} from '../../../scripts/drawer-refinement-governance.mjs';
const root=process.cwd(),dir='evidence/runtime/drawer-refinement-2026-10-14/',view=dir+'predecessor/';
const read=p=>readFileSync(join(root,p));
const sha=b=>createHash('sha256').update(b).digest('hex');
const phase=parseYamlSubset(read('status/current-phase.yaml').toString());
const carousel=readCarouselUpgradeSourceBindings(root,phase,parseYamlSubset);
assert(carousel,'A sealed Carousel predecessor is required');
const saved=new Map();
function put(path,bytes){ const key=view+path; if(existsSync(key))assert.equal(sha(readFileSync(key)),sha(bytes),'Captured predecessor is immutable: '+path);else{mkdirSync(dirname(key),{recursive:true});writeFileSync(key,bytes);} saved.set(path,sha(bytes)); }
for(const path of ['evidence/runtime/g6-components-2026-10-14/source-bindings.json','evidence/runtime/g6-components-2026-10-14/baseline.json','evidence/runtime/g6-components-2026-10-14/color-consumers.json']) put(path,read(path));
for(const [path,binding] of Object.entries(carousel.sourceFiles)) { put(path,carouselBindingBytes(root,path,binding.beforeSnapshot)); if(binding.beforeSnapshot)put(binding.beforeSnapshot,read(binding.beforeSnapshot)); }
for(const path of ['evidence/runtime/carousel-upgrade-2026-10-14/source-bindings.json',...Object.keys(carousel.evidenceFiles)])put(path,read(path));
const lineage=JSON.parse(read('evidence/runtime/carousel-upgrade-2026-10-14/design-lineage.json'));
for(const path of Object.keys(lineage.sourceFiles))put(path,read(path));
const old=JSON.parse(read('evidence/runtime/g6-components-2026-10-14/source-bindings.json'));
const originalBaseline=JSON.parse(read('evidence/runtime/g6-components-2026-10-14/baseline.json'));
const ownBaseline=JSON.parse(read(dir+'baseline.json'));
for(const path of drawerRefinementFiles) { if(saved.has(path))continue; const expected=old.sourceFiles[path]?.after??originalBaseline.protectedSources[path]??null;if(!expected)continue;const observed=ownBaseline.sourceFiles[path];const bytes=observed?read(observed.snapshot):read(path);assert.equal(sha(bytes),expected,'Drawer predecessor bytes unavailable: '+path);put(path,bytes); }
const verified=readCarouselUpgradeSourceBindings(join(root,view),parseYamlSubset(readFileSync(view+'status/current-phase.yaml','utf8')),parseYamlSubset);
assert(verified);
writeFileSync(dir+'predecessor-capture.json',JSON.stringify({kind:'VerifiedDrawerCarouselPredecessorCapture',predecessor:'carousel',sourceBindingsHash:sha(read('evidence/runtime/carousel-upgrade-2026-10-14/source-bindings.json')),sourceFiles:Object.fromEntries(saved),verification:'actual-carousel-reader-passed-on-canonical-view; original-G6-siblings-preserved'},null,2)+'\n');
console.log(JSON.stringify({captured:saved.size,verified:Boolean(verified)}));
