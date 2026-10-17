import fs from 'node:fs';
import crypto from 'node:crypto';
import path from 'node:path';
const run='evidence/runtime/g1-g6-closeout-2026-10-17/run-01/';
const gov=run+'governance/';
const sha=data=>crypto.createHash('sha256').update(data).digest('hex');
const json=file=>JSON.parse(fs.readFileSync(file));
const hash=file=>fs.existsSync(file)?sha(fs.readFileSync(file)):null;
const raw=fs.readFileSync(gov+'source-bindings.json'),binding=JSON.parse(raw);
const expected=json(run+'unit/final-summary.json').sourceBindingSha256;
const differences=[];let comparisons=0;
const compare=(file,want)=>{comparisons++;const actual=hash(file);if(actual!==want)differences.push({file,expected:want,actual});};
for(const [file,want] of Object.entries(binding.retainedFiles))compare(file,want);
for(const [file,item] of Object.entries(binding.sourceFiles)){compare(file,item.after);if(item.before!==null)compare(item.beforeSnapshot,item.before);}
for(const [file,want] of Object.entries(binding.projectedFiles))compare(gov+'predecessor/'+file,want);
for(const [file,want] of Object.entries(binding.questionnaireFiles))compare(gov+'questionnaire-predecessor/'+file,want);
const coverage=json(run+'coverage.json'),seen=new Set(),coverageDifferences=[];
for(const entry of coverage.entries)for(const item of entry.assets)for(const [kind,file] of [['manifest',item.manifestPath],['source',item.sourcePath],['registry',item.registryReference?.split('#')[0]]]){
 if(!file||seen.has(file))continue;seen.add(file);const actual=hash(file),want=item.snapshotSha256?.[kind];
 if(want&&actual!==want)coverageDifferences.push({key:entry.catalogKey,file,expected:want,actual});
}
const p5=path.resolve('../../outputs/p5-resource-update-2026-10-17');
const p5Hashes=json(path.join(p5,'evidence/user-feedback-2026-10-17/source-sha256.json'));
const p5Differences=Object.entries(p5Hashes).filter(([file,want])=>hash(path.join(p5,'prototype',file))!==want).map(([file])=>file);
const acceptance=json(path.join(p5,'evidence/user-feedback-2026-10-17/manual-acceptance.json'));
const report={kind:'P6CurrentSourceBindingAndCoverageCheck',checkedAt:new Date().toISOString(),binding:{expectedSha256:expected,actualSha256:sha(raw),sourceCount:Object.keys(binding.sourceFiles).length,retainedCount:Object.keys(binding.retainedFiles).length,comparisons,differences},coverage:{catalogEntries:coverage.entries.length,uniquePathsCompared:seen.size,differences:coverageDifferences,compositionContracts:'separate existing contract validation; excluded from path count'},p5:{boundPageFiles:Object.keys(p5Hashes).length,differences:p5Differences,humanGate:acceptance.humanGate,humanGateScope:acceptance.humanGateScope}};
console.log(JSON.stringify(report,null,2));
if(sha(raw)!==expected||differences.length||coverageDifferences.length||p5Differences.length)process.exitCode=1;
