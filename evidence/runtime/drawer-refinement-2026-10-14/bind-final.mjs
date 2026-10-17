import assert from 'node:assert/strict';
import {readFileSync,writeFileSync,existsSync} from 'node:fs';
import {join} from 'node:path';
import {drawerRefinementFiles,drawerRefinementRequiredFiles,drawerRefinementAuthorization,drawerRefinementBindingSeal,sha256} from '../../../scripts/drawer-refinement-governance.mjs';
const root=process.cwd(),dir='evidence/runtime/drawer-refinement-2026-10-14/',view=dir+'predecessor/';
const read=p=>readFileSync(join(root,p));
const old=JSON.parse(read('evidence/runtime/g6-components-2026-10-14/source-bindings.json'));
const base=JSON.parse(read('evidence/runtime/g6-components-2026-10-14/baseline.json'));
const carousel=JSON.parse(read(view+'evidence/runtime/carousel-upgrade-2026-10-14/source-bindings.json'));
const expected={...base.protectedSources,...Object.fromEntries(Object.entries(old.sourceFiles).map(([p,b])=>[p,b.after])),...Object.fromEntries(Object.entries(carousel.sourceFiles).map(([p,b])=>[p,b.after]))};
const sourceFiles={};
for(const path of drawerRefinementFiles) {
 if(!existsSync(path)){assert(!drawerRefinementRequiredFiles.includes(path),'Required Drawer source missing '+path);continue;}
 const before=expected[path]??null,after=sha256(read(path));
 if(!drawerRefinementRequiredFiles.includes(path)&&before===after)continue;
 if(before)assert.equal(sha256(read(view+path)),before,'Captured predecessor differs '+path);
 sourceFiles[path]={before,beforeSnapshot:before?view+path:null,after};
}
const record={kind:'DrawerRefinementSourceBindings',scope:drawerRefinementAuthorization.scope,authorization:drawerRefinementAuthorization,
 baseline:{path:dir+'baseline.json',sha256:sha256(read(dir+'baseline.json'))},
 predecessor:{kind:'carousel',root:view.slice(0,-1),sourceBindings:'evidence/runtime/carousel-upgrade-2026-10-14/source-bindings.json',sha256:sha256(read(view+'evidence/runtime/carousel-upgrade-2026-10-14/source-bindings.json'))},
 sourceFiles,evidenceFiles:Object.fromEntries(['authorization.json','color-consumers.json'].map(p=>[dir+p,sha256(read(dir+p))]))};
const path='scripts/drawer-refinement-governance.mjs';
let source=read(path).toString();
source=source.replace(/const baselineHash = "[^"]*";/,`const baselineHash = "${record.baseline.sha256}";`);
source=source.replace(/const sourceSeal = "[^"]*";/,`const sourceSeal = "${drawerRefinementBindingSeal(record)}";`);
source=source.replace(/const moduleHash = "[^"]*";/,`const moduleHash = "${'0'.repeat(64)}";`);
source=source.replace(`const moduleHash = "${'0'.repeat(64)}";`,`const moduleHash = "${sha256(source)}";`);
writeFileSync(path,source);record.sourceFiles[path].after=sha256(source);
writeFileSync(dir+'source-bindings.json',JSON.stringify(record,null,2)+'\n');
console.log(JSON.stringify({sourceFiles:Object.keys(sourceFiles).length,predecessor:'verified-carousel-canonical-view',seal:drawerRefinementBindingSeal(record)}));
