import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,readFileSync,writeFileSync,readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {join,dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
const workspace=process.cwd(),evidence=dirname(fileURLToPath(import.meta.url)),host=mkdtempSync('/private/tmp/rain-chart-closeout-peer-preflight-');
const hash=value=>createHash('sha256').update(value).digest('hex');
const manifest={name:'rain-chart-current-brush-peer-preflight',private:true,type:'module',packageManager:'pnpm@10.28.1',dependencies:{react:'19.2.8','react-dom':'19.2.8','@visx/brush':'3.12.0'}};
mkdirSync(evidence,{recursive:true});
writeFileSync(join(host,'package.json'),JSON.stringify(manifest,null,2));
writeFileSync(join(host,'.npmrc'),'registry=https://registry.npmjs.org\n');
const sourceInputs=['packages/ui/package.json','packages/foundations/package.json','pnpm-lock.yaml'];
const facts={status:'running',startedAt:new Date().toISOString(),scope:'Minimal actual strict-peer installation of the current React/Brush combination; not the final full UI package install',host,manifest,sourceInputs:sourceInputs.map(path=>({path,sha256:hash(readFileSync(join(workspace,path)))})),scriptSha256:hash(readFileSync(fileURLToPath(import.meta.url))),commands:[]};
const save=()=>writeFileSync(join(evidence,'peer-preflight-facts.json'),JSON.stringify(facts,null,2));
const env={...process.env,NPM_CONFIG_USERCONFIG:join(host,'.npmrc'),npm_config_cache:join(host,'npm-cache'),NODE_PATH:''};
try{
 for(const [name,extra] of [['cold-store-offline',['--offline']],['cold-store-online-strict',[]]]){
  const args=['install','--ignore-scripts','--strict-peer-dependencies','--no-frozen-lockfile','--store-dir',join(host,'store'),'--config.cache-dir='+join(host,'metadata-cache'),'--registry','https://registry.npmjs.org',...extra],start=Date.now();save();
  const result=spawnSync('pnpm',args,{cwd:host,env,encoding:'utf8',maxBuffer:32*1024*1024,timeout:180000});
  const output=(result.stdout??'')+(result.stderr??'');writeFileSync(join(evidence,`${name}.log`),output);
  facts.commands.push({name,command:'pnpm',args,cwd:host,exitCode:result.status,signal:result.signal,error:result.error?.message,elapsedMs:Date.now()-start,coldStoreAtStart:name==='cold-store-offline',log:`${name}.log`});save();console.log(JSON.stringify({name,exitCode:result.status,elapsedMs:Date.now()-start,summary:output.split('\n').filter(line=>/ERR_PNPM|peer|✕|unmet/.test(line)).slice(0,12)}));
 }
 facts.currentSourceChanges=facts.sourceInputs.filter(row=>hash(readFileSync(join(workspace,row.path)))!==row.sha256).map(row=>row.path);assert.deepEqual(facts.currentSourceChanges,[]);facts.status='completed-preflight';facts.hostEntries=readdirSync(host);
}catch(error){facts.status='failed';facts.error=String(error);throw error;}finally{facts.finishedAt=new Date().toISOString();save();}
