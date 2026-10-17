import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {mkdirSync,readFileSync,readdirSync,realpathSync,writeFileSync} from 'node:fs';
import {dirname,join,resolve} from 'node:path';
import {verifyBrowser} from './browser.mjs';

// This only resumes a harness failure after actual strict installation and build.
// It never adapts a stale package or skips the full current-source hash check.
const priorPath=resolve(process.argv[2]),evidence=resolve(process.argv[3]);
const hash=value=>createHash('sha256').update(value).digest('hex');
const prior=JSON.parse(readFileSync(priorPath,'utf8'));
const facts={...prior,status:'resuming-browser',evidence,resumedFrom:{path:priorPath,sha256:hash(readFileSync(priorPath)),priorStatus:prior.status,priorError:prior.error},browserChecks:[],pageErrors:[],failedRequests:[],badResponses:[],externalBrowserOrigins:[]};
delete facts.error;
mkdirSync(evidence,{recursive:true});
const save=()=>writeFileSync(join(evidence,'facts.json'),JSON.stringify(facts,null,2));
function frozen(){
 const changes=prior.sourceFiles.filter(row=>hash(readFileSync(join(prior.workspace,row.path)))!==row.sha256).map(row=>row.path);
 assert.deepEqual(changes,[],'A package, exporter or Registry source changed; a fresh actual tarball installation is required');
 for(const row of prior.downloads)for(const file of row.files)assert.equal(hash(readFileSync(join(prior.host,'samples',row.name,file.path))),file.sha256,`Downloaded host source changed: ${row.name}/${file.path}`);
 for(const row of prior.sourceFiles.filter(row=>row.path.startsWith('packages/')&&row.path.includes('/src/'))){const parts=row.path.split('/');assert.equal(hash(readFileSync(join(prior.host,'node_modules/@rain-next',parts[1],...parts.slice(2)))),row.sha256,`Installed full package changed: ${row.path}`);}
 return changes;
}
try{
 assert.equal(prior.commands.find(row=>row.label==='cold-store-strict-install').exitCode,0);assert.deepEqual(prior.peerWarnings,[]);assert.equal(prior.coldStoreAtStart,true);assert.equal(prior.commands.find(row=>row.label==='typecheck').exitCode,0);assert(prior.commands.some(row=>row.label==='client-build'&&row.status==='passed'));assert.equal(prior.builtEntries,20);assert.equal(prior.registryClosures.length,19);assert.equal(prior.externalDependencyLinks,0);assert.equal(prior.clientModuleAudit.externalModulePaths,0);assert.equal(prior.ssrModuleAudit.externalModulePaths,0);assert.deepEqual(prior.aliases,[]);
 assert.equal(realpathSync(prior.host),prior.host);assert.equal(readdirSync(join(prior.host,'dist')).filter(path=>path.endsWith('.html')).length,20);frozen();
 const samples=prior.downloads.map(({files,...sample})=>sample);await verifyBrowser({host:prior.host,evidence,facts,samples,port:Number(process.env.RAIN_STRICT_CONSUMER_PORT??5197)});
 facts.canonicalChanges=frozen();for(const key of ['pageErrors','failedRequests','badResponses','externalBrowserOrigins'])assert.deepEqual(facts[key],[]);facts.status='passed';facts.finishedAt=new Date().toISOString();console.log(JSON.stringify({status:facts.status,host:prior.host,builtEntries:facts.builtEntries,registryClosures:facts.registryClosures.length,browserChecks:facts.browserChecks.length,canonicalChanges:facts.canonicalChanges},null,2));
}catch(error){facts.status='failed';facts.error=String(error);throw error;}finally{save();}
