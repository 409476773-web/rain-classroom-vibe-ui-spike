import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {dirname,join,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'../../../../../..');
const sha=v=>createHash('sha256').update(v).digest('hex');
const read=p=>readFileSync(join(root,p),'utf8');
const acceptancePath='evidence/runtime/navigation-v042/g3-acceptance-review02/acceptance.json';
const acceptance=JSON.parse(read(acceptancePath));
const archive=acceptance.archives.find(x=>x.path.endsWith('review-02.zip'));
assert.equal(sha(readFileSync(join(root,archive.path))),archive.sha256);
assert.equal(sha(readFileSync(join(root,acceptance.sourceSnapshot.path))),acceptance.sourceSnapshot.sha256);
const freeze=JSON.parse(read(acceptance.sourceSnapshot.path));
const extract=file=>execFileSync('unzip',['-p',join(root,archive.path),`navigation-v042-2026-10-05-review-02/${file}`]);
const lockExtract=file=>{const bytes=extract(file);assert.equal(sha(bytes),freeze.filesSha256[file]);return bytes.toString('utf8');};
const r1r3Path='apps/playground/src/recipes/navigation-v042/r1-r3.tsx';
const r4r6Path='apps/playground/src/recipes/navigation-v042/r4-r6.tsx';
const r2cssPath='apps/playground/src/recipes/navigation-v042/r2.css';
const r1r3=lockExtract(r1r3Path),r4r6=lockExtract(r4r6Path),r2css=lockExtract(r2cssPath);
assert(r4r6.includes('<RegionHead id="knowledge" iconButtonSize="32/14"/>'));
assert(r4r6.includes("function RegionHead({id,iconButtonSize='32/18'}"));
assert(r1r3.includes("<Button variant={errors?'primary':'tertiary'}"));
assert(r1r3.includes("{errors?'开始练习':'上传文件'}"));
assert(r2css.includes('transition:width var(--rain-motion-region-duration) var(--rain-motion-ease-out),flex-basis'));
const review11Readme='evidence/runtime/navigation-v042/w5/review-11-annotations-navigation/r4-r6/README-pre-post-review.md';
assert(read(review11Readme).includes('32/14 Knowledge header icons'));
const review12Scope='evidence/runtime/navigation-v042/w5/review-12-pale-splitters/scope.md';
assert(read(review12Scope).includes('opacity .4'));
assert(read(review12Scope).includes('20→18px'));
const review12Diff='evidence/runtime/navigation-v042/w5/review-12-pale-splitters/verify/source.diff';
assert(read(review12Diff).includes('width:18px;height:18px;'));
assert(read(review12Diff).includes('opacity:.4;background:var(--rain-category-border-neutral-4);'));
const review09Readme='evidence/runtime/navigation-v042/w5/review-09-all-scenes/README.md';
assert(read(review09Readme).includes('支持悬停、聚焦、Escape'));
const tooltipReadme='packages/ui/src/tooltip/README.md';
assert(read(tooltipReadme).includes('Escape/Tab/失焦关闭'));
const tooltipPath='packages/ui/src/tooltip/tooltip.tsx';
assert.equal(sha(extract(tooltipPath)),sha(readFileSync(join(root,tooltipPath))));
const recordPath='evidence/runtime/navigation-v042/w7/engineering-closeout-2026-10-06/browser-contract-successor-record.json';
const record=JSON.parse(read(recordPath));
const hashBindings=Object.entries(record.cases).map(([file,hashes])=>{const before='evidence/runtime/navigation-v042/w7/engineering-closeout-2026-10-06/browser-contract-before/'+file;assert.equal(sha(readFileSync(join(root,before))),hashes.beforeSha256);assert.equal(sha(readFileSync(join(root,file))),hashes.afterSha256);return {file,...hashes,passed:true};});
const platformPath='tests/e2e/navigation-v042-review11-platform.spec.ts';
const platform=read(platformPath);
const oldRoundedPoll=/expect\.poll\(async\(\)=>Math\.round\(\(await rail\.boundingBox\(\)\)!\.width\)\)/.test(platform);
const exactPoll=platform.includes("await expect.poll(async()=>(await rail.boundingBox())!.width).toBe(mode==='compact'?64:208);");
assert(oldRoundedPoll||exactPoll,'Endpoint poll must preserve raw64/208 endpoints; removing the poll is not a fix.');
const counterexamples=[{mode:'expanded',width:207.75,target:208},{mode:'compact',width:64.25,target:64}].map(row=>({...row,roundedPollAccepts:Math.round(row.width)===row.target,strictExistingWidthAssertionPasses:row.width===row.target}));
for(const row of counterexamples){assert(row.roundedPollAccepts);assert(!row.strictExistingWidthAssertionPasses);}
console.log(JSON.stringify({recordedAt:new Date().toISOString(),scope:'read-only provenance and deterministic synchronization probe; no browser/native OS execution',acceptance:{path:acceptancePath,snapshotId:acceptance.snapshotId,archiveSha256:archive.sha256,freezeSha256:acceptance.sourceSnapshot.sha256,passed:true},hashBindings,provenance:[
 {case:'review08',status:'passed',evidence:[review11Readme,archive.path,acceptance.sourceSnapshot.path],basis:'Historical Review11 records Knowledge header32/14; accepted archive independently contains explicit R5 knowledge32/14 and RegionHead shared default32/18.',acceptedArchiveSource:{file:r4r6Path,sha256:freeze.filesSha256[r4r6Path]}},
 {case:'review09',status:'passed',evidence:[review09Readme,tooltipReadme,archive.path],basis:'Recorded Tooltip focus opens and Escape/Tab/blur dismiss. Accepted archived Tooltip bytes equal the current shared implementation. Tab then Shift+Tab creates a real focus event after Escape; calling focus on an already focused trigger is a noop.'},
 {case:'review10',status:'passed',evidence:[archive.path,acceptance.sourceSnapshot.path],basis:'Accepted archive independently contains the errors primary practice action; radius6px assertion remains unchanged.',acceptedArchiveSource:{file:r1r3Path,sha256:freeze.filesSha256[r1r3Path]}},
 {case:'review11',status:'passed',evidence:[review12Scope,review12Diff],basis:'Explicit later Review12 instruction supersedes earlier glyph20px and hidden normal splitter: glyph18px and normal opacity.4; hover/drag/focus and existing dimensions remain.'}
],synchronization:{status:oldRoundedPoll?'finding-open':'finding-resolved',file:platformPath,line:platform.split('\n').findIndex(x=>x.includes('expect.poll(async()=>')&&x.includes('rail.boundingBox'))+1,sourceSha256:sha(readFileSync(join(root,platformPath))),counterexamples,basis:'Accepted R2 CSS has a native width/flex-basis transition. Rounded endpoint polling accepts an intermediate width while the unchanged exact width assertion rejects it.',minimalFix:'Poll raw boundingBox width against existing64/208 endpoints.'}},null,2));
