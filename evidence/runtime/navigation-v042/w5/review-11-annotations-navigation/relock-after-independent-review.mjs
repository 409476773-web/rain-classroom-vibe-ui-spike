import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import {parseYamlSubset} from '../../../../../scripts/verification-helpers.mjs';
const base='evidence/runtime/navigation-v042/w5/review-11-annotations-navigation';
const stage=process.argv[2]??'';if(stage&&stage!=='sizing-final')throw new Error('Unrecognized correction stage');
const suffix=stage?`-${stage}`:'';
const sha=async p=>crypto.createHash('sha256').update(await fs.readFile(p)).digest('hex');
const regs=['registry/navigation-v042.json','registry/navigation-v042-w3.json','registry/navigation-v042-workspaces.json','registry/navigation-v042-recipes.json'];
const recipes=['r1','r2','r3','r4','r5','r6','states'].map(n=>`manifests/recipes/navigation-${n}.yaml`);
const oldLock=JSON.parse(await fs.readFile(`${base}/production-source-freeze-final.json`));
const filesSha256=Object.fromEntries(await Promise.all(Object.keys(oldLock.filesSha256).map(async p=>[p,await sha(p)])));
const changed=Object.keys(filesSha256).filter(p=>filesSha256[p]!==oldLock.filesSha256[p]);
const allowed=['apps/playground/src/recipes/navigation-v042/r1-r3.tsx','apps/playground/src/recipes/navigation-v042/r4-r6.tsx','apps/playground/src/recipes/navigation-v042/platform-navigation.css'];
if((stage?changed.length!==1||changed[0]!==allowed[2]:changed.length!==3)||changed.some(p=>!allowed.includes(p)))throw new Error('Unexpected correction source set '+JSON.stringify(changed));
const recordedAt=new Date().toISOString(),correction={recordedAt,scope:'Independent review P2 closure: expanded footer account first and tools right; whole-account native button and keyboard entry across all R/S, retaining compact tools-before-account order. Whole account consumes natural Avatar/copy size with width/height auto, avoiding legacy helper28px constraints. Existing handlers/Popover, no shared API or Token change.',issues:[1,2],evidence:`${base}/independent-review.md`};
const priorMetadata={recordedAt,registries:{},manifests:{}};
for(const p of regs)priorMetadata.registries[p]=JSON.parse(await fs.readFile(p));
for(const p of recipes)priorMetadata.manifests[p]={sha256:await sha(p),parsed:parseYamlSubset(await fs.readFile(p,'utf8'))};
await fs.writeFile(`${base}/metadata-pre-independent-review${suffix}.json`,JSON.stringify(priorMetadata,null,2)+'\n',{flag:'wx'});
for(const name of ['production-source-freeze-final','metadata-source-freeze','metadata-final-locks','metadata-validation','root-truth-invariants'])await fs.copyFile(`${base}/${name}.json`,`${base}/${name}-pre-independent-review${suffix}.json`,fs.constants.COPYFILE_EXCL);
await fs.writeFile(`${base}/production-source-freeze-final.json`,JSON.stringify({...oldLock,recordedAt,postIndependentReviewCorrection:correction,filesSha256},null,2)+'\n');
for(const p of regs){
 const d=priorMetadata.registries[p],snapshot=d.currentSourceSnapshot??d.sourceSnapshot;
 d[stage?'priorReview11PreIndependentReviewSizingSourceSnapshot':'priorReview11PreIndependentReviewSourceSnapshot']=structuredClone(snapshot);d.postIndependentReviewCorrection=correction;
 snapshot.recordedAt=recordedAt;for(const file of Object.keys(snapshot.filesSha256))snapshot.filesSha256[file]=filesSha256[file];
 await fs.writeFile(p,JSON.stringify(d,null,2)+'\n');
}
const scalar=v=>JSON.stringify(v),mapping=(obj,indent=0)=>Object.entries(obj).flatMap(([key,value])=>{const space=' '.repeat(indent);if(Array.isArray(value))return value.length?[space+key+':',...value.flatMap(item=>{if(item&&typeof item==='object'){const lines=mapping(item,indent+4);return[space+'  - '+lines[0].trimStart(),...lines.slice(1)];}return[space+'  - '+scalar(item)];})]:[space+key+': []'];if(value&&typeof value==='object')return[space+key+':',...mapping(value,indent+2)];return[space+key+': '+scalar(value)];});
const block=(name,value)=>mapping({[name]:value}).join('\n')+'\n',replaceTop=(text,name,value)=>{const match=new RegExp(`^${name}:.*$`,'m').exec(text);if(!match)return text+'\n'+block(name,value);const after=text.indexOf('\n',match.index)+1,next=text.slice(after).search(/^[A-Za-z_][\w-]*:/m),end=next<0?text.length:after+next;return text.slice(0,match.index)+block(name,value)+'\n'+text.slice(end);};
for(const p of recipes){
 const old=priorMetadata.manifests[p].parsed;let text=await fs.readFile(p,'utf8');
 if(p.endsWith('navigation-r2.yaml')){const snapshot=structuredClone(old.currentFeedbackSourceSnapshot);snapshot.recordedAt=recordedAt;snapshot.sourceSha256=filesSha256[snapshot.sourcePath];snapshot.styleSourceSha256=filesSha256[snapshot.styleSourcePath];for(const f of snapshot.sourceFiles)f.sha256=filesSha256[f.path];text=replaceTop(text,'currentFeedbackSourceSnapshot',snapshot);}
 else text=text.replace(/^sourceSha256:.*$/m,'sourceSha256: '+scalar(filesSha256[old.sourcePath])).replace(/^styleSourceSha256:.*$/m,'styleSourceSha256: '+scalar(filesSha256[old.styleSourcePath])).replace(/^sourceSnapshotRecordedAt:.*$/m,'sourceSnapshotRecordedAt: '+scalar(recordedAt));
 if(old.platformNavigationFeedbackTokens){const tokens=structuredClone(old.platformNavigationFeedbackTokens);tokens.sourceSha256=filesSha256[tokens.sourcePath];text=replaceTop(text,'platformNavigationFeedbackTokens',tokens);}
 text=replaceTop(text,stage?'postIndependentReviewCorrection11Sizing':'postIndependentReviewCorrection11',correction);parseYamlSubset(text);await fs.writeFile(p,text);
}
const freeze=JSON.parse(await fs.readFile(`${base}/metadata-source-freeze.json`));
freeze.recordedAt=recordedAt;freeze.postIndependentReviewCorrection=correction;freeze.parentSourceLock.sha256=await sha(`${base}/production-source-freeze-final.json`);
for(const file of Object.keys(freeze.filesSha256))freeze.filesSha256[file]=filesSha256[file];
await fs.writeFile(`${base}/metadata-source-freeze.json`,JSON.stringify(freeze,null,2)+'\n');
const locks=JSON.parse(await fs.readFile(`${base}/metadata-final-locks.json`));locks.recordedAt=recordedAt;locks.postIndependentReviewCorrection=correction;
for(const file of Object.keys(locks.filesSha256))locks.filesSha256[file]=await sha(file);
await fs.writeFile(`${base}/metadata-final-locks.json`,JSON.stringify(locks,null,2)+'\n');
for(const [file,hash] of Object.entries(filesSha256))if(await sha(file)!==hash)throw new Error('Source drift during correction lock '+file);
console.log(JSON.stringify({status:'post-independent-review-relocked',stage,changed,uniqueSourceFiles:43,recordedAt,originalReview11MetadataPreserved:`${base}/metadata-pre-independent-review${suffix}.json`}));
