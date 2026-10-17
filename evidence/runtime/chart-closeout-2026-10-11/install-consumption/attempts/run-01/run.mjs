import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {cpSync,existsSync,lstatSync,mkdirSync,mkdtempSync,readFileSync,readdirSync,realpathSync,writeFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {dirname,isAbsolute,join,relative,resolve} from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {assertDownloadClosure,exportedDownloads} from '../../../../scripts/verify-chart-variant-consumption.mjs';
import {verifyBrowser} from './browser.mjs';

const workspace=realpathSync(process.cwd()),evidence=resolve(process.argv[2]??join(dirname(fileURLToPath(import.meta.url)),'run-01'));
const host=realpathSync(mkdtempSync('/private/tmp/rain-chart-strict-tarball-consumer-'));
const hash=value=>createHash('sha256').update(value).digest('hex');
const read=path=>readFileSync(path,'utf8'),json=path=>JSON.parse(read(path));
const put=(path,contents)=>{mkdirSync(dirname(path),{recursive:true});writeFileSync(path,contents);};
const sourceMap=new Map(),mark=path=>sourceMap.set(path,hash(readFileSync(path)));
function filesIn(directory){return readdirSync(directory,{recursive:true}).map(path=>join(directory,path)).filter(path=>lstatSync(path).isFile());}
for(const name of ['ui','foundations'])for(const path of filesIn(join(workspace,'packages',name,'src')))mark(path);
for(const path of ['packages/ui/package.json','packages/foundations/package.json','pnpm-lock.yaml','registry/charts.json','apps/playground/src/docs/components/chart-example-source.tsx','apps/playground/src/docs/components/chart-catalog.ts','apps/playground/src/docs/components/chart-variants/reference.json'])mark(join(workspace,path));
const changes=()=>[...sourceMap].filter(([path,digest])=>!existsSync(path)||hash(readFileSync(path))!==digest).map(([path])=>relative(workspace,path));
const scriptSources=['run.mjs','browser.mjs','ssr-preflight.mjs'].map(path=>({path,sha256:hash(readFileSync(join(dirname(fileURLToPath(import.meta.url)),path)))}));
const facts={scriptSources,status:'running',startedAt:new Date().toISOString(),workspace,host,evidence,scope:'Actual complete UI/Foundations pnpm tarballs installed in a fresh isolated pnpm store with strict peers, 19 public default downloads and a real Brush download; not publication or minimum per-item Registry installation',runtime:{nodeVersion:process.version,platform:process.platform,architecture:process.arch},commands:[],packages:[],downloads:[],registryClosures:[],aliases:[],pageErrors:[],failedRequests:[],badResponses:[],externalBrowserOrigins:[]};
const save=()=>put(join(evidence,'facts.json'),JSON.stringify(facts,null,2));
const environment={...process.env,NODE_PATH:'',NPM_CONFIG_USERCONFIG:join(host,'.npmrc'),npm_config_cache:join(host,'npm-cache')};
function run(label,command,args,cwd=host,timeout=180000){
 const start=Date.now();save();const result=spawnSync(command,args,{cwd,env:environment,encoding:'utf8',maxBuffer:64*1024*1024,timeout});
 const output=(result.stdout??'')+(result.stderr??'');put(join(evidence,`${label}.log`),output);
 facts.commands.push({label,command,args,cwd,exitCode:result.status,signal:result.signal,error:result.error?.message,elapsedMs:Date.now()-start});save();
 assert.equal(result.status,0,`${label} failed; see ${join(evidence,`${label}.log`)}`);return output;
}
try{
 assert.equal(json(join(workspace,'packages/ui/package.json')).dependencies['@visx/brush'],'4.0.1-alpha.0','Run only after the approved shared dependency freeze');
 assert.equal(json(join(workspace,'registry/charts.json')).dependencies['@visx/brush'],'4.0.1-alpha.0');
 put(join(host,'.npmrc'),'registry=https://registry.npmjs.org\n');facts.runtime.pnpmVersion=run('pnpm-version','pnpm',['--version']).trim();mkdirSync(join(host,'tarballs'),{recursive:true});
 for(const name of ['foundations','ui']){
  run(`pack-${name}`,'pnpm',['pack','--pack-destination',join(host,'tarballs'),'--json'],join(workspace,'packages',name));
  const manifest=json(join(workspace,'packages',name,'package.json')),tarball=join(host,'tarballs',`rain-next-${name}-${manifest.version}.tgz`);
  assert(existsSync(tarball));const listed=run(`tar-list-${name}`,'tar',['-tzf',tarball]).trim().split('\n');
  assert(listed.every(path=>path.startsWith('package/')&&!path.split('/').includes('..')));
  const extracted=join(host,'unpacked',name);mkdirSync(extracted,{recursive:true});run(`tar-extract-${name}`,'tar',['-xzf',tarball,'-C',extracted]);
  const packedManifest=json(join(extracted,'package/package.json'));assert.equal(packedManifest.name,manifest.name);assert.equal(packedManifest.private,true);
  if(name==='ui'){assert.equal(packedManifest.dependencies['@rain-next/foundations'],'0.0.0');assert.equal(packedManifest.dependencies['@visx/brush'],'4.0.1-alpha.0');assert(listed.includes('package/src/charts/vendor/LICENSE'));}
  const packed=filesIn(join(extracted,'package/src'));for(const path of filesIn(join(workspace,'packages',name,'src'))){const suffix=relative(join(workspace,'packages',name),path),target=join(extracted,'package',suffix);assert.equal(hash(readFileSync(target)),hash(readFileSync(path)),`Packed source changed: ${suffix}`);}
  const exported=Object.entries(manifest.exports).map(([entry,path])=>{assert.equal(hash(readFileSync(join(extracted,'package',path))),hash(readFileSync(join(workspace,'packages',name,path))));return{entry,path};});
  facts.packages.push({name:manifest.name,version:manifest.version,tarball,tarballSha256:hash(readFileSync(tarball)),tarballFileCount:listed.length,sourceFiles:packed.length,exportedEntries:exported,canonicalManifestSha256:hash(readFileSync(join(workspace,'packages',name,'package.json'))),packedManifestSha256:hash(readFileSync(join(extracted,'package/package.json'))),adaptation:name==='ui'?'pnpm pack officially replaces workspace:* Foundations with 0.0.0; only the consumer override binds that version to its actual local tarball':'none'});
 }
 const registry=json(join(workspace,'registry/charts.json')),ui=json(join(workspace,'packages/ui/package.json')),rootManifest=json(join(workspace,'package.json'));
 const tools=Object.fromEntries(['vite','typescript','tailwindcss','@tailwindcss/vite'].map(name=>[name,json(join(workspace,'node_modules',name,'package.json')).version]));
 const dependencies={'@rain-next/ui':'file:./tarballs/rain-next-ui-0.0.0.tgz','@rain-next/foundations':'file:./tarballs/rain-next-foundations-0.0.0.tgz',react:'19.2.8','react-dom':'19.2.8',...registry.devDependencies,...tools};
 const manifest={name:'rain-chart-strict-unpublished-tarball-consumer',version:'0.0.0',private:true,type:'module',packageManager:rootManifest.packageManager,dependencies,pnpm:{overrides:{'@rain-next/foundations':'file:./tarballs/rain-next-foundations-0.0.0.tgz'}}};
 put(join(host,'package.json'),JSON.stringify(manifest,null,2));facts.hostManifest=manifest;facts.coldStoreAtStart=!existsSync(join(host,'store'));assert(facts.coldStoreAtStart);
 const install=run('cold-store-strict-install','pnpm',['install','--ignore-scripts','--strict-peer-dependencies','--no-frozen-lockfile','--store-dir',join(host,'store'),'--config.cache-dir='+join(host,'metadata-cache'),'--registry','https://registry.npmjs.org']);
 facts.peerWarnings=install.split('\n').filter(line=>/unmet peer|issues with peer|ERR_PNPM_PEER_DEP/i.test(line));assert.deepEqual(facts.peerWarnings,[]);
 facts.installPolicy='New store and metadata cache; official registry downloads plus two unpublished local tarballs; package scripts disabled; strict required peer dependencies; no shared workspace node_modules copied.';
 const list=run('dependency-tree','pnpm',['list','--depth','Infinity','--json']);facts.dependencyTreeSha256=hash(list);facts.dependencyTree=json(join(evidence,'dependency-tree.log'));
 const installedUi=realpathSync(join(host,'node_modules/@rain-next/ui')),installedFoundations=realpathSync(join(host,'node_modules/@rain-next/foundations'));
 for(const [name,target] of [['ui',installedUi],['foundations',installedFoundations]])for(const source of filesIn(join(workspace,'packages',name,'src'))){const suffix=relative(join(workspace,'packages',name),source);assert.equal(hash(readFileSync(join(target,suffix))),hash(readFileSync(source)),`Installed package source differs: ${name}/${suffix}`);}
 facts.installedPackages=[{name:'@rain-next/ui',realPath:installedUi},{name:'@rain-next/foundations',realPath:installedFoundations}];
 let linkCount=0;function checkLinks(dir){for(const entry of readdirSync(dir)){const path=join(dir,entry),stat=lstatSync(path);if(stat.isSymbolicLink()){assert(realpathSync(path).startsWith(host+'/'),`Symlink escaped host: ${path}`);linkCount++;}else if(stat.isDirectory())checkLinks(path);}}checkLinks(join(host,'node_modules'));facts.internalDependencyLinks=linkCount;facts.externalDependencyLinks=0;
 for(const item of registry.items){const paths=[...new Set([...registry.shared.files,...item.files])],files=Object.fromEntries(paths.map(path=>[path,read(join(workspace,path))]));assertDownloadClosure(files,item.name);facts.registryClosures.push({name:item.name,files:paths.length,status:'passed'});for(const path of paths)mark(join(workspace,path));}
 assert.equal(facts.registryClosures.length,19);facts.registrySha256=hash(readFileSync(join(workspace,'registry/charts.json')));
 const components=join(workspace,'apps/playground/src/docs/components'),ordinary=await exportedDownloads(components,'chartExampleFiles'),variants=await exportedDownloads(components);
 facts.exporterSha256=ordinary.exporterSha256;assert.equal(ordinary.exporterSha256,variants.exporterSha256);
 const ids=registry.items.map(item=>item.name.replace(/^chart-/,''));assert.equal(new Set(ids).size,19);
 const reference=json(join(components,'chart-variants/reference.json')),brush=reference.find(row=>row.id==='line-trio-brush');assert(brush);
 const samples=[...ids.map(id=>({name:`default-${id}`,id,kind:'default',settings:{id,recipe:id==='candlestick'||id==='profit-loss'?'sign':'monochrome-blue',state:'normal',revision:0}})),{name:'variant-line-trio-brush',id:'line-trio-brush',kind:'variant',settings:{}}];
 for(const sample of samples){const files=sample.kind==='default'?ordinary.files(sample.settings):variants.files(brush,'category-near',0,0,false,undefined,sample.settings);assertDownloadClosure(files,sample.name);
  for(const [name,source]of Object.entries(files)){put(join(host,'samples',sample.name,name),source);if(!['main.tsx','index.html'].includes(name)){const actual=join(components,name);assert.equal(hash(readFileSync(actual)),hash(source));mark(actual);}}
  put(join(host,`${sample.name}.html`),files['index.html'].replace('src="/main.tsx"',`src="/samples/${sample.name}/main.tsx"`).replace('</head>','<link rel="stylesheet" href="./consumer.css"></head>'));
  facts.downloads.push({...sample,files:Object.entries(files).map(([path,source])=>({path,sha256:hash(source)}))});
 }
 facts.htmlAdaptation='Actual raw downloaded main.tsx/index.html retained byte for byte; independent batch HTML only prefixes the main URL and loads host Tailwind integration.';
 put(join(host,'consumer.css'),'@import "tailwindcss" source(none);\n@import "@rain-next/foundations/tailwind-theme.css";\n@source "./node_modules/@rain-next/ui/src";\n@source "./samples";\n:root {font-family:var(--rain-font-ui);}\n');
 put(join(host,'env.d.ts'),'/// <reference types="vite/client" />\n');
 put(join(host,'tsconfig.json'),JSON.stringify({compilerOptions:{target:'ES2022',lib:['ES2022','DOM','DOM.Iterable'],module:'ESNext',moduleResolution:'Bundler',jsx:'react-jsx',strict:true,skipLibCheck:true,noEmit:true,allowImportingTsExtensions:true},include:['samples/**/*.ts','samples/**/*.tsx','env.d.ts']},null,2));
 const compiler=json(join(host,'node_modules/typescript/package.json'));run('typecheck',process.execPath,[join(host,'node_modules/typescript',compiler.bin.tsc),'--project','tsconfig.json']);
 const {build}=await import(pathToFileURL(join(host,'node_modules/vite/dist/node/index.js')).href),{default:tailwind}=await import(pathToFileURL(join(host,'node_modules/@tailwindcss/vite/dist/index.mjs')).href);
 function audit(name){return{name,generateBundle(){const modules=[...this.getModuleIds()].filter(id=>isAbsolute(id.split('?')[0]));for(const id of modules)assert(realpathSync(id.split('?')[0]).startsWith(host+'/'),`Module escaped host: ${id}`);facts[name]={moduleCount:modules.length,externalModulePaths:0,aliases:[],modules};}};}
 const buildStart=Date.now();await build({root:host,configFile:false,base:'./',oxc:{jsx:{runtime:'automatic'}},resolve:{alias:[]},plugins:[tailwind(),audit('clientModuleAudit')],build:{outDir:'dist',minify:false,rolldownOptions:{input:samples.map(sample=>join(host,`${sample.name}.html`))}}});facts.commands.push({label:'client-build',status:'passed',elapsedMs:Date.now()-buildStart});assert.equal(readdirSync(join(host,'dist')).filter(path=>path.endsWith('.html')).length,20);facts.builtEntries=20;
 const preflight=read(join(dirname(fileURLToPath(import.meta.url)),'ssr-preflight.mjs')),entry=preflight.match(/const source=`([\s\S]*?)`;\nwriteFileSync/)[1].replace('${JSON.stringify(join(workspace,\'apps/playground/src/docs/components/chart-examples.tsx\'))}',JSON.stringify('./samples/default-line/chart-examples.tsx'));
 put(join(host,'ssr-entry.ts'),entry);const ssrStart=Date.now();await build({root:host,configFile:false,oxc:{jsx:{runtime:'automatic'}},resolve:{alias:[]},ssr:{noExternal:true},plugins:[audit('ssrModuleAudit')],build:{ssr:join(host,'ssr-entry.ts'),outDir:'dist-ssr',minify:false,rolldownOptions:{output:{entryFileNames:'probe.mjs'}}}});facts.commands.push({label:'ssr-build',status:'passed',elapsedMs:Date.now()-ssrStart});
 facts.ssrObservations=(await import(pathToFileURL(join(host,'dist-ssr/probe.mjs')).href)).observations;const observation=name=>facts.ssrObservations.find(row=>row.name===name);
 assert.equal(observation('public-data-bar').status,'rendered');assert(observation('public-data-bar').html.includes('aria-label="人数，25人"'));for(const name of ['public-line','public-live']){assert.equal(observation(name).status,'rendered');assert.equal(observation(name).svgCount,0);}assert.equal(observation('default-example-line').rawTable,true);assert.equal(observation('default-example-live').status,'rejected');assert(observation('default-example-live').error.includes('document is not defined'));facts.ssrBoundary='No DOM shim; public measured Line/Live only render an unmeasured shell; public DataBar exact semantic reading and default Line raw table render; default Live example requires browser document. This is not general SSR, hydration or framework support.';
 await verifyBrowser({host,evidence,facts,samples,port:Number(process.env.RAIN_STRICT_CONSUMER_PORT??5197)});
 facts.canonicalChanges=changes();assert.deepEqual(facts.canonicalChanges,[]);for(const key of ['pageErrors','failedRequests','badResponses','externalBrowserOrigins'])assert.deepEqual(facts[key],[]);
 facts.status='passed';facts.limits=['Unpublished private 0.0.0 local tarballs, not npm publication.','Complete source packages; Registry import closures verified but no minimum-per-item package installation claim.','Strict install with package scripts disabled in an empty store; platform is macOS arm64 / current Node/pnpm.','20 current source-download entries type/build; representative real Brush interactions and 19 browser mounting checks.','Partial measured component server shells and expected browser-only default Live failure; no hydration or additional framework guarantee.'];
 console.log(JSON.stringify({status:facts.status,host,packages:facts.packages.map(({exportedEntries,...row})=>({...row,exportedEntries:exportedEntries.length})),builtEntries:facts.builtEntries,registryClosures:facts.registryClosures.length,peerWarnings:facts.peerWarnings,clientModules:facts.clientModuleAudit.moduleCount,ssrModules:facts.ssrModuleAudit.moduleCount,browserChecks:facts.browserChecks.length,canonicalChanges:facts.canonicalChanges},null,2));
}catch(error){facts.status='failed';facts.error=String(error);throw error;}finally{facts.sourceFiles=[...sourceMap].map(([path,sha256])=>({path:relative(workspace,path),sha256}));facts.canonicalChanges=changes();facts.finishedAt=new Date().toISOString();save();}
