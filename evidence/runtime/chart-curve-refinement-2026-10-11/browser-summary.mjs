import { readFile, readdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const run='evidence/runtime/chart-curve-refinement-2026-10-11';
const scopes=[
 {name:'core',folder:`${run}/browser-tests/after-tests-02`,log:`${run}/browser-tests-02.log`,pattern:/^(default|official|mini)-/,passed:12},
 {name:'category',folder:`${run}/browser-tests/after-tests-03`,log:`${run}/browser-tests-03.log`,pattern:/^category-/,passed:2},
];
let snapshots=0,errors=0,referenceSources=null;const cases=[];
for(const scope of scopes){
const folder=scope.folder,log=await readFile(scope.log,'utf8');assert.match(log,new RegExp(`${scope.passed} passed`),`${scope.name}: completed passing cases required`);
const files=(await readdir(folder)).filter(name=>name.endsWith('.json')&&scope.pattern.test(name)).sort();
assert.equal(files.length,scope.passed);
for(const file of files){
 const data=JSON.parse(await readFile(`${folder}/${file}`,'utf8'));
 referenceSources??=data.sourcesBefore;assert.deepEqual(data.sourcesBefore,referenceSources,`${file}: all passing cases use the same frozen runtime`);
 assert.deepEqual(data.sourcesBefore,data.sourcesAfter,`${file}: source is frozen throughout the browser case`);
 assert.deepEqual(data.errors,[],`${file}: no actual browser page error`);
 const observed=data.facts.flatMap(fact=>fact.observed?[fact.observed]:fact.samples?.map(sample=>sample.observed)??[]);
 assert.ok(observed.every(fact=>fact.finite&&fact.documentWidth<=fact.viewportWidth+1),`${file}: finite geometry and no document overflow`);
 snapshots+=observed.length;errors+=data.errors.length;
 cases.push({scope:scope.name,folder,file,facts:data.facts.length,nativeGeometrySnapshots:observed.length,sourceFilesMonitored:data.sourcesBefore.length,sourceFrozen:true,pageErrors:data.errors.length});
}
}
assert.equal(cases.length,14);
const comparison=JSON.parse(await readFile(`${run}/browser-comparison.json`,'utf8'));
assert.equal(comparison.status,'passed');
const afterCapture=JSON.parse(await readFile(`${run}/browser-after/facts.json`,'utf8'));for(const source of afterCapture.sourcesBefore)assert.deepEqual(source,referenceSources.find(candidate=>candidate.path===source.path),`${source.path}: after picture and passing cases share the same source`);
const report={status:'passed',browser:'Chromium',tests:14,passingScopes:scopes.map(scope=>({name:scope.name,tests:scope.passed,log:scope.log})),nativeGeometrySnapshots:snapshots,pageErrors:errors,widths:[1440,390],motionModes:['no-preference','reduce'],
 captureRegionsBefore:comparison.captures,captureRegionsAfter:comparison.captures,protectedPresentationComparisons:comparison.captures,
 changedNativePaths:comparison.comparisons.reduce((sum,row)=>sum+row.paths.filter(path=>path.changed).length,0),
 sourceFrozenAcrossPassingCases:true,sourceFrozenAcrossAfterPicturesAndPassingCases:true,cases,limits:'Browser checks cover the chosen native SVG representatives and original reads. Source-data derivative audit and user visual acceptance are separate evidence.'};
await writeFile(`${run}/browser-summary.json`,JSON.stringify(report,null,2));
console.log(JSON.stringify({status:report.status,tests:report.tests,nativeGeometrySnapshots:report.nativeGeometrySnapshots,pageErrors:report.pageErrors,protectedPresentationComparisons:report.protectedPresentationComparisons}));
