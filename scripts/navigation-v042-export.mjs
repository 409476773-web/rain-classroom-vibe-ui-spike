/**
 * W8 local editable handoff. --plan is read-only; --export requires root's W7 freeze.
 * Copy real Registry payloads and complete existing library sources, derive only
 * the narrow host/config/scripts, verify hashes, then validate in the new output.
 * No installation, source mutation, archive, Git or Figma operation is performed.
 */
import { createHash } from 'node:crypto';
import { existsSync, lstatSync, mkdirSync, readFileSync, readdirSync, realpathSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { basename, dirname, extname, isAbsolute, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const sourceRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const destinationFlag = process.argv.indexOf('--destination');
const destinationName = destinationFlag < 0 ? 'artifacts/navigation-v042-2026-10-04' : process.argv[destinationFlag + 1];
if (!/^artifacts\/navigation-v042-[a-z0-9-]+$/.test(destinationName ?? '')) throw new Error('Destination must be a named navigation-v042 folder directly inside artifacts');
const artifactBaseName = basename(destinationName);
const libraries = ['foundations', 'ui', 'layouts'];
const packageDirectories = ['.', 'apps/playground', ...libraries.map(name => `packages/${name}`)];
const navigationRegistries = ['registry/navigation-v042.json', 'registry/navigation-v042-w3.json', 'registry/navigation-v042-workspaces.json', 'registry/navigation-v042-recipes.json'];
const ignoredOutput = ['node_modules', 'apps/playground/node_modules', 'apps/playground/dist', ...libraries.map(name => `packages/${name}/node_modules`), 'verification', '.navigation-cache-links.json'];
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const json = value => JSON.stringify(value, null, 2) + '\n';
const inside = (parent, path) => { const part = relative(parent, path); return !part || (!part.startsWith('..') && !isAbsolute(part)); };

function safeFile(root, file) {
  const path = resolve(root, file);
  if (!inside(root, path) || !existsSync(path) || !inside(root, realpathSync(path)) || !lstatSync(path).isFile() || lstatSync(path).isSymbolicLink()) throw new Error(`Invalid regular source file: ${file}`);
  return path;
}
function filesIn(directory, ignored = new Set()) {
  return readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name)).flatMap(entry => {
    const path = join(directory, entry.name);
    if (ignored.has(path)) return [];
    if (entry.isSymbolicLink()) throw new Error(`Symbolic link is not allowed: ${path}`);
    if (entry.isDirectory()) return filesIn(path, ignored);
    if (!entry.isFile()) throw new Error(`Not a regular file: ${path}`);
    return [path];
  });
}

const html = `<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><title>Rain · 导航本地可编辑包</title></head><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>\n`;
const main = `import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { DensityProvider } from '@rain-next/foundations';
import { Button, NavigationBar } from '@rain-next/ui';
import { R1Recipe, R3Recipe } from './recipes/navigation-v042/r1-r3';
import { R2Recipe } from './recipes/navigation-v042/r2';
import { R4Recipe, R5Recipe, R6Recipe } from './recipes/navigation-v042/r4-r6';
import { WorkspaceStateSample, type WorkspaceStateScene } from './recipes/navigation-v042/workspace-states';
import { W6Consumer } from './recipes/navigation-w6/consumer-app';
import '@rain-next/foundations/tokens.css';
import '@rain-next/foundations/typography.css';
import '@rain-next/foundations/motion.css';
import '@rain-next/foundations/focus.css';
import '@rain-next/ui/styles.css';
import '@rain-next/layouts/styles.css';
import './recipes/navigation-v042/consumer.css';
import './recipes/navigation-w6/consumer.css';
import './handoff.css';
const recipes = [{id:'R1',label:'课程体系'}, {id:'R2',label:'课程资源'}, {id:'R3',label:'云盘'}, {id:'R4',label:'课堂互动'}, {id:'R5',label:'课堂回放'}, {id:'R6',label:'协作空间'}];
const states = Array.from({length:6}, (_,i) => ({id:'S'+(i+1),label:'S'+(i+1)}));
const tasks = [{id:'E1',label:'W6 消费工作区'}, {id:'E6',label:'学术资源审阅'}];
const routes = [...recipes,...states,...Array.from({length:6},(_,i)=>({id:'E'+(i+1)}))];
function route() { const value=location.hash.slice(1); return routes.some(item=>item.id===value)?value:'R1'; }
function App() {
  const [active,setActive]=useState(route),[revision,setRevision]=useState(0);
  useEffect(()=>{const update=()=>setActive(route());addEventListener('hashchange',update);return()=>removeEventListener('hashchange',update);},[]);
  // Recipes use their original memory/undefined storage; remount resets only this package's state.
  const reset=()=>setRevision(value=>value+1);
  let content = active.startsWith('E')?<W6Consumer/>:active.startsWith('S')?<WorkspaceStateSample scene={active as WorkspaceStateScene} instanceId={'handoff-'+active}/>:active==='R1'?<R1Recipe/>:active==='R2'?<R2Recipe instanceId="handoff-R2"/>:active==='R3'?<R3Recipe/>:active==='R4'?<R4Recipe/>:active==='R5'?<R5Recipe/>:<R6Recipe/>;
  return <DensityProvider density="default"><main className="navigation-handoff" data-rain-id="local-navigation-v042-handoff" data-asset-identity="local-experiment">
    <header className="navigation-handoff-heading"><div><strong>Rain · 导航可编辑包</strong><p>本地试验 · 模拟数据与本地草稿 · 共享资产仍为候选</p></div><Button variant="secondary" onClick={reset}>恢复包内默认</Button></header>
    <NavigationBar aria-label="可编辑包场景" activeId={active.startsWith('E')?(active==='E6'?'E6':'E1'):active} items={[...recipes,...states,...tasks].map(item=>({...item,href:'#'+item.id}))}/>
    <section className="navigation-handoff-content" key={revision} aria-label={'当前场景 '+active}>{content}</section>
  </main></DensityProvider>;
}
const root=document.getElementById('root');if(!root)throw new Error('Handoff root missing');createRoot(root).render(<StrictMode><App/></StrictMode>);
`;
const hostCss = `.navigation-handoff { padding:var(--rain-space-16); color:var(--rain-category-text-neutral-1); background:var(--rain-category-background-neutral-3); font-family:var(--rain-font-ui); min-height:100vh; box-sizing:border-box; }
.navigation-handoff-heading { display:flex; align-items:center; justify-content:space-between; gap:var(--rain-space-16); margin-bottom:var(--rain-space-12); }
.navigation-handoff-heading p { margin:var(--rain-space-4) 0 0; color:var(--rain-category-text-neutral-4); font-size:var(--rain-font-size-12); }
.navigation-handoff-content { margin-top:var(--rain-space-16); min-width:0; }
`;
const vite = `import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
export default defineConfig({base:'./',plugins:[react(),tailwindcss()],build:{rolldownOptions:{input:['index.html','navigation-v042-consumer.html','navigation-v042-w3-consumer.html','navigation-v042-w6-consumer.html']}}});
`;
const vitest = `import { defineConfig } from 'vitest/config';
export default defineConfig({test:{environment:'jsdom',include:['packages/ui/src/navigation/**/*.test.{ts,tsx}','packages/layouts/src/{workspace,workspace-state,connected-surface,connected-surface-geometry}.test.{ts,tsx}','apps/playground/src/recipes/navigation-v042/*.test.{ts,tsx}','apps/playground/src/recipes/navigation-w6/*.test.{ts,tsx}'],exclude:['**/node_modules/**','**/dist/**'],setupFiles:['./tests/setup.ts']}});
`;

function resolveImport(files, origin, specifier) {
  const clean = specifier.split('?')[0].split('#')[0];
  let base;
  if (clean.startsWith('.')) base = resolve(sourceRoot, dirname(origin), clean);
  else if (clean.startsWith('@rain-next/')) {
    const match = /^(@rain-next\/[^/]+)(.*)$/.exec(clean);
    const name = match[1].split('/')[1];
    if (!libraries.includes(name)) throw new Error(`Unknown Rain package import: ${origin} -> ${specifier}`);
    const manifest = JSON.parse(files.get(`packages/${name}/package.json`).toString());
    const target = manifest.exports[match[2] ? '.' + match[2] : '.'];
    if (typeof target !== 'string') throw new Error(`Missing public package export: ${specifier}`);
    base = resolve(sourceRoot, `packages/${name}`, target);
  } else return null;
  const options = [base, ...['.ts','.tsx','.js','.mjs','.json','.css'].map(extension=>base+extension), ...['index.ts','index.tsx','index.js'].map(file=>join(base,file))];
  const target = options.map(path=>relative(sourceRoot,path)).find(file=>files.has(file));
  if (!target) throw new Error(`Missing runtime import/asset: ${origin} -> ${specifier}`);
  return target;
}
function runtimeClosure(files) {
  const queue = ['apps/playground/src/main.tsx','apps/playground/src/recipes/navigation-v042/consumer.tsx','apps/playground/src/recipes/navigation-v042/w3-consumer.tsx','apps/playground/src/recipes/navigation-w6/consumer.tsx'];
  const visited = new Set(), edges = [];
  while (queue.length) {
    const file = queue.shift();
    if (visited.has(file)) continue;
    visited.add(file);
    if (!['.tsx','.ts','.js','.mjs','.css'].includes(extname(file))) continue;
    const text = files.get(file).toString();
    const specs = [...text.matchAll(/(?:\bfrom\s*|\bimport\s*\(\s*|\bimport\s*)['"]([^'"\n]+)['"]/g)].map(match=>match[1]);
    if (file.endsWith('.css')) specs.push(...[...text.matchAll(/@import\s+['"]([^'"]+)['"]|url\(\s*['"]?([^'"\s)]+)['"]?\s*\)/g)].map(match=>match[1]||match[2]));
    specs.push(...[...text.matchAll(/new URL\(\s*['"]([^'"]+)['"]\s*,\s*import\.meta\.url/g)].map(match=>match[1]));
    for (const spec of new Set(specs.filter(spec=>!spec.startsWith('data:')&&!spec.startsWith('http')&&!spec.startsWith('#')))) {
      const target=resolveImport(files,file,spec);
      if (target) {edges.push({from:file,to:target});queue.push(target);}
    }
  }
  return {sourceFiles:visited.size,resolvedLocalEdges:edges.length,edges};
}

export function buildPlan({freezePath} = {}) {
  const originals = new Map(), files = new Map(), registryItems = [], historicalReferences = [];
  const copy = file => {if (!files.has(file)) {const bytes=readFileSync(safeFile(sourceRoot,file));originals.set(file,bytes);files.set(file,bytes);}};
  const tree = directory => {for (const path of filesIn(join(sourceRoot,directory))) copy(relative(sourceRoot,path));};
  for (const file of ['package.json','pnpm-lock.yaml','pnpm-workspace.yaml','tsconfig.base.json','apps/playground/package.json','apps/playground/tsconfig.json','apps/playground/vite.config.ts','tests/setup.ts','vitest.config.ts']) copy(file);
  for (const name of libraries) {copy(`packages/${name}/package.json`);copy(`packages/${name}/tsconfig.json`);tree(`packages/${name}/src`);}
  const seenItems=new Set(),seenShared=new Set();
  const visit = (file,name) => {
    const identity=file+'#'+name;if(seenItems.has(identity))return;seenItems.add(identity);copy(file);
    const registry=JSON.parse(files.get(file).toString());
    if(!seenShared.has(file)){seenShared.add(file);const shared=registry.shared||{};for(const entry of shared.files||[])copy(typeof entry==='string'?entry:entry.path);for(const manifest of shared.componentDependencies||[])copy(manifest);for(const dependency of shared.registryDependencies||[])if(dependency.includes('#')){const [path,anchor]=dependency.split('#');visit(path,anchor);}}
    const item=registry.items.find(item=>item.name===name);if(!item)throw new Error(`Registry dependency not found: ${identity}`);
    registryItems.push(identity);if(item.manifest)copy(item.manifest);
    for(const manifest of item.componentDependencies||[])copy(manifest);
    for(const entry of item.files||[])copy(typeof entry==='string'?entry:entry.path);
    for(const dependency of item.registryDependencies||[])if(dependency.includes('#')){const [path,anchor]=dependency.split('#');visit(path,anchor);}
  };
  for(const file of navigationRegistries)for(const item of JSON.parse(readFileSync(safeFile(sourceRoot,file),'utf8')).items)visit(file,item.name);
  tree('apps/playground/src/recipes/navigation-w6');
  copy('apps/playground/navigation-v042-w6-consumer.html');
  // Recommended scene tests depend on Gallery fixtures outside this R/S/W6 package.
  for(const path of filesIn(join(sourceRoot,'apps/playground/src/recipes/navigation-v042')))if(/\.test\.(ts|tsx)$/.test(path)&&!/(?:object-navigator|navigation-switching)-recipes\.test\./.test(path))copy(relative(sourceRoot,path));
  // Runtime files are closed by the copied source trees; metadata history is preserved as history.
  for(const name of ['sidebar','tabs','radio-group','textarea','input','form-item','button','avatar','tree','popover','dropdown-menu','tooltip','icon-button','empty','checkbox']) {
    const file=`manifests/ui/${name}.yaml`;if(existsSync(join(sourceRoot,file)))copy(file);
  }
  tree('docs/ai');
  const evidenceFiles=['evidence/runtime/navigation-v042/g2-acceptance-13/current-source-final.json','evidence/runtime/navigation-v042/g2-acceptance-13/acceptance.json','evidence/runtime/navigation-v042/w6/README.md','evidence/runtime/navigation-v042/w6/consumption-e6.md','evidence/runtime/navigation-v042/w6/consumption-e6.json','evidence/runtime/navigation-v042/w7/README.md','evidence/runtime/navigation-v042/w7/api-compatibility.md','evidence/runtime/navigation-v042/w7/api-compatibility.json','evidence/runtime/navigation-v042/w7/n06-behavior-repair.json','evidence/runtime/navigation-v042/w7/business-callback.md','evidence/runtime/navigation-v042/w7/business-callback.json','evidence/runtime/navigation-v042/w7/regression-map.json','evidence/runtime/navigation-v042/w7/browser-results.json','evidence/runtime/navigation-v042/w7/baseline-quality.json'];
  for(const name of ['consumption-e1-e5.md','consumption-e1-e5.json','independent-review.md','independent-review.json'])evidenceFiles.push(`evidence/runtime/navigation-v042/w6/${name}`);
  for(const name of ['verification-summary.json','contrast-audit.json','repair-source-lineage.json','final-source.json','browser-final-summary.json','n06-independent-review.md','n06-independent-review.json','full-quality/results.json','full-quality/remaining-governance.json','full-quality/governance-prebatch-baseline.json','full-quality/full-e2e-isolation.json'])evidenceFiles.push(`evidence/runtime/navigation-v042/w7/${name}`);
  evidenceFiles.push('evidence/runtime/navigation-v042/w8/browser/results.json');
  for(const file of evidenceFiles)if(existsSync(join(sourceRoot,file)))copy(file);
  for (const file of ['docs/plans/2026-10-04-navigation-w6-review01-design.md','evidence/runtime/navigation-v042/w6/review-01/review-summary.json','evidence/runtime/navigation-v042/w6/review-01/README.md','evidence/runtime/navigation-v042/w6/review-01/independent/summary.json']) if(existsSync(join(sourceRoot,file))) copy(file);
  for (const file of ['docs/plans/2026-10-05-navigation-w6-review02-design.md','evidence/runtime/navigation-v042/w6/review-02/review-summary.json','evidence/runtime/navigation-v042/w6/review-02/README.md','evidence/runtime/navigation-v042/w6/review-02/independent/summary.json']) if(existsSync(join(sourceRoot,file))) copy(file);
  originals.set('scripts/navigation-v042-export.mjs',readFileSync(safeFile(sourceRoot,'scripts/navigation-v042-export.mjs')));
  let freeze=null;
  if(freezePath){const file=relative(sourceRoot,safeFile(sourceRoot,freezePath));copy(file);freeze=JSON.parse(files.get(file).toString());if(!freeze.filesSha256||!Object.keys(freeze.filesSha256).length)throw new Error('Freeze must contain a non-empty filesSha256 map');for(const [path,expected]of Object.entries(freeze.filesSha256))if(sha(readFileSync(safeFile(sourceRoot,path)))!==expected)throw new Error(`W7 freeze mismatch: ${path}`);}
  const generated = new Map();
  const derive=(file,content)=>{if(existsSync(join(sourceRoot,file))&&!originals.has(file))originals.set(file,readFileSync(safeFile(sourceRoot,file)));const bytes=Buffer.from(content);files.set(file,bytes);generated.set(file,bytes);};
  const rootPackage=JSON.parse(files.get('package.json').toString());
  rootPackage.scripts={dev:'pnpm --filter @rain-next/playground dev',preview:'pnpm --filter @rain-next/playground exec vite preview --host 127.0.0.1',build:'pnpm -r build',typecheck:'pnpm -r typecheck',test:'vitest run --config vitest.config.ts','verify:source':'node scripts/check-source.mjs'};
  derive('package.json',json(rootPackage));derive('apps/playground/index.html',html);derive('apps/playground/src/main.tsx',main);derive('apps/playground/src/handoff.css',hostCss);derive('apps/playground/vite.config.ts',vite);derive('vitest.config.ts',vitest);
  const appTsconfig=JSON.parse(files.get('apps/playground/tsconfig.json').toString());appTsconfig.include=['src','vite.config.ts'];appTsconfig.exclude=['src/**/*.test.ts','src/**/*.test.tsx'];derive('apps/playground/tsconfig.json',json(appTsconfig));
  const closure=runtimeClosure(files),currentRegistryEntries=[];
  for(const file of navigationRegistries){const registry=JSON.parse(files.get(file).toString());const container=registry.currentSourceSnapshot?'currentSourceSnapshot':'sourceSnapshot';for(const [path,expected]of Object.entries(registry[container].filesSha256)){const actual=sha(readFileSync(safeFile(sourceRoot,path)));if(actual!==expected)throw new Error(`Current Registry hash mismatch: ${file} -> ${path}`);currentRegistryEntries.push({registry:file,container,path,sha256:actual});}}
  const workspaceManifest=files.get('manifests/layouts/workspace.yaml').toString();
  const workspaceSourceSha256=sha(files.get('packages/layouts/src/workspace.tsx'));
  const workspaceCurrentSnapshot=/\nw7BehaviorRepair:\n(?:  [^\n]*\n)*?  sourceSha256: "([a-f0-9]{64})"/m.exec(workspaceManifest)?.[1]??/^sourceSha256: "([a-f0-9]{64})"/m.exec(workspaceManifest)?.[1];
  if(workspaceCurrentSnapshot!==workspaceSourceSha256)throw new Error('Workspace current Manifest snapshot does not match copied implementation');
  const currentMetadataValidation={currentRegistryEntries:currentRegistryEntries.length,workspaceSourceSha256,workspaceManifestHashPointer:workspaceManifest.includes('\nw7BehaviorRepair:')?'w7BehaviorRepair.sourceSha256':'sourceSha256',workspaceSourceVersion:/^sourceVersion: "([^"]+)"/m.exec(workspaceManifest)?.[1],manifestFiles:[...files.keys()].filter(file=>file.startsWith('manifests/')).sort()};
  for(const [file,bytes]of files)if(file.startsWith('registry/')||file.startsWith('manifests/')||file.startsWith('docs/ai/'))for(const match of bytes.toString().matchAll(/(?:evidence|reports)\/[A-Za-z0-9_./-]+/g))if(!files.has(match[0]))historicalReferences.push({from:file,path:match[0],packaged:false});
  return {files,originals,generated,registryItems,closure,historicalReferences,currentMetadataValidation,freezePath:freezePath?relative(sourceRoot,resolve(sourceRoot,freezePath)):null,freeze};
}

function readmeSource(plan) {
  return `# Rain 导航本地可编辑包

这是本地试验源码快照。共享 UI/Layout 保持 Registry Candidate、未发布；R/S/E 业务页面仍为 Local Experiment，数据与服务均为 Mock。历史 G2 视觉验收与 W7 行为修复独立记录，不授予生产迁移、Figma 组件绑定或新的 Human Gate。

## 免依赖预览

解压相邻的 \`${artifactBaseName}-built-preview.zip\`，在其父目录运行：

\`\`\`sh
python3 -m http.server 5357 --bind 127.0.0.1 --directory ${artifactBaseName}-built-preview
\`\`\`

浏览器打开 \`http://127.0.0.1:5357/\`。预览根目录含 \`index.html\` 和本地 assets；无需原仓库、Vite 或开发依赖，静态资源 base 为 \`./\`。源码 ZIP 不含 dist；若从源码已完成构建，可在源码包根目录运行：

\`\`\`sh
python3 -m http.server 5357 --bind 127.0.0.1 --directory apps/playground/dist
\`\`\`

## 安装、运行和编辑

在源码包根目录使用冻结锁文件安装相同版本，再运行本包工具链：

\`\`\`sh
pnpm install --frozen-lockfile
pnpm verify:source
pnpm typecheck
pnpm test
pnpm build
pnpm dev --port 5357 --strictPort
\`\`\`

离线安装是已有完整 pnpm 缓存时的可选方式，例如：

\`\`\`sh
pnpm install --frozen-lockfile --offline --ignore-scripts --package-import-method=copy --store-dir /path/to/existing-pnpm-store
\`\`\`

原始 W8 批次的离线安装真实失败：现有缓存缺少 \`playwright@1.62.1\` 压缩包，下载数为 0，未改依赖或转联网安装。原始 W8 的四个 workspace 类型检查、119 个导航测试和构建使用逐依赖的既有缓存链接验证；本包最新修订的检查另见 \`verification/summary.json\`，不会由原始批次结果自动授予通过。所有 Rain 链接指向包内副本，临时链接已移除。包不附 \`node_modules\` 或缓存；正常安装使用用户自己的环境与冻结版本。

根依赖与 app 依赖声明保持原样，运行脚本只覆盖本包的四个 workspace。默认入口 \`index.html\`；\`#R1\`–\`#R6\`、\`#S1\`–\`#S6\`、\`#E1\`–\`#E6\` 可定位场景。原 R2、W3、W6 独立 HTML 入口也保留。修改 \`apps/playground/src/recipes\` 内的副本；包内修改不会同步原仓库。恢复包内默认会重建当前页面的包内实例，使内存布局偏好和业务草稿恢复 Mock 默认；浏览器本地记录保持原样。

## 验证与来源

\`source-lock.json\` 锁定复制文件、派生宿主和生成脚本。\`pnpm verify:source\` 校验交付快照；有意编辑后会报告变化，恢复文件后再次校验。实际检查记录见 \`verification/summary.json\`。最新 HTTP 路由、交互与独立 ZIP 解压检查分别记录在该修订的 verification 文件夹；原始 W8 的 18 路由结果保留在历史证据中，不自动代表本修订通过。自动检查不替代 Human Gate、AT 或对比度确认。

原仓库：${sourceRoot}
冻结记录：${plan.freezePath}
详细来源：\`provenance.json\`。Manifest/Registry 的历史元信息逐字保留；其报告、截图、Figma、参考 HTML 等引用并未全部打包。\`provenance.json\` 明列未附历史引用及原路径，不能把这些元信息链接解释为包内文件。独立消费所需源、样式和 runtime 资产已闭合，历史 evidence 约 1.9GB 未复制。

本包未增依赖，没有发布、迁移、Figma 或 Git 操作。
`;
}

function checkerSource() {
  return `import {createHash} from 'node:crypto';\nimport {existsSync,lstatSync,readFileSync,readdirSync,realpathSync} from 'node:fs';\nimport {dirname,isAbsolute,join,relative,resolve} from 'node:path';\nimport {fileURLToPath} from 'node:url';\nconst sha=${sha.toString()};\nconst json=${json.toString()};\nconst inside=${inside.toString()};\nconst ignoredOutput=${JSON.stringify(ignoredOutput)};\n${filesIn.toString()}\n${verifyExport.toString()}\nconsole.log(verifyExport(resolve(dirname(fileURLToPath(import.meta.url)),'..'),{archiveReady:process.argv.includes('--archive-ready')}));\n`;
}
export function verifyExport(directory,{archiveReady=false}={}) {
  const output=realpathSync(directory),lock=JSON.parse(readFileSync(join(output,'source-lock.json'),'utf8'));
  const ignored=new Set(ignoredOutput.map(file=>join(output,file)));
  const actual=filesIn(output,ignored).map(path=>relative(output,path)).filter(file=>file!=='source-lock.json').sort();
  if(json(actual)!==json(Object.keys(lock.files).sort()))throw new Error('Editable package inventory changed');
  for(const [file,expected]of Object.entries(lock.files)){const path=resolve(output,file);if(!inside(output,path)||!inside(output,realpathSync(path))||lstatSync(path).isSymbolicLink()||sha(readFileSync(path))!==expected)throw new Error(`Editable package source changed: ${file}`);}
  if(lock.snapshotId!==`navigation-v042-${sha(json(lock.files)).slice(0,16)}`)throw new Error('Snapshot identity changed');
  if(archiveReady){for(const directory of ignoredOutput.filter(file=>file.endsWith('node_modules')))if(existsSync(join(output,directory)))throw new Error(`Remove dependency links before archive: ${directory}`);if(existsSync(join(output,'.navigation-cache-links.json')))throw new Error('Remove temporary cache link record before archive');filesIn(output);}
  return lock.snapshotId;
}
export function exportNavigation({freezePath}={}) {
  if(!freezePath)throw new Error('--export requires --freeze <root W7 final JSON>; no final export during preparation');
  const output=resolve(sourceRoot,destinationName);
  if(existsSync(output))throw new Error('Output already exists; refusing to overwrite');
  const plan=buildPlan({freezePath});
  const required=['packages/layouts/src/workspace.tsx',...navigationRegistries,...[...plan.originals.keys()].filter(file=>file.startsWith('apps/playground/src/recipes/navigation-w6/')&&!file.includes('.test.'))];
  for(const file of required)if(!plan.freeze.filesSha256[file])throw new Error(`W7 freeze lacks current critical source: ${file}`);
  const sourceFiles=Object.fromEntries([...plan.originals].sort(([a],[b])=>a.localeCompare(b)).map(([file,bytes])=>[file,sha(bytes)]));
  const add=(file,content)=>plan.files.set(file,Buffer.from(content));
  add('scripts/check-source.mjs',checkerSource());
  add('AGENTS.md','# Rain navigation local editable handoff\n\nRead docs/ai/prototype-design.md, information-design.md and the navigation composition Skill before page changes. Prototype Mode: prefer public APIs and page-local Recipes. Shared packages, Tokens, identities and historical Gates retain their recorded boundaries. All business data is Mock. This local snapshot does not authorize publishing, production migration, Figma write or Git operations. User instructions take precedence.\n');
  add('README.md',readmeSource(plan));
  add('provenance.json',json({schemaVersion:'1.0',assetIdentity:'local-experiment',publication:'unpublished',sourceRoot,freezePath:plan.freezePath,freezeSha256:sourceFiles[plan.freezePath],sourceFiles,derivedFiles:[...plan.generated.keys()].sort(),registryItems:plan.registryItems.sort(),currentMetadataValidation:plan.currentMetadataValidation,runtimeClosure:{sourceFiles:plan.closure.sourceFiles,resolvedLocalEdges:plan.closure.resolvedLocalEdges},historyPolicy:'Current Manifest/Registry bytes retained; historical reports/images/reference URLs not automatically packaged.',notPackagedHistoricalReferences:plan.historicalReferences,excluded:['source node_modules/cache','unrelated Gallery and prototypes','bulk historical evidence','Git/Figma/publication/migration'],verification:'Pending independent output build/browser/archive checks; record under verification/ without changing the locked initial source.'}));
  mkdirSync(output,{recursive:true});
  const files={};for(const [file,bytes]of [...plan.files].sort(([a],[b])=>a.localeCompare(b))){mkdirSync(dirname(join(output,file)),{recursive:true});writeFileSync(join(output,file),bytes);files[file]=sha(bytes);}
  const lock={schemaVersion:'1.0',snapshotId:`navigation-v042-${sha(json(files)).slice(0,16)}`,recordedAt:new Date().toISOString(),assetIdentity:'local-experiment',sourceRoot,freezePath:plan.freezePath,sourceFiles,files,generatedExcluded:ignoredOutput};
  writeFileSync(join(output,'source-lock.json'),json(lock));verifyExport(output);return {output,snapshotId:lock.snapshotId,files:Object.keys(files).length};
}

// Finalize only small evidence records after root closes W7 documentation.
// Any source, style, dependency or derived-host change requires a new export.
export function refreshMetadata({freezePath}={}) {
  if(!freezePath)throw new Error('--refresh-metadata requires the same root W7 freeze');
  const output=resolve(sourceRoot,destinationName);verifyExport(output);
  const lock=JSON.parse(readFileSync(join(output,'source-lock.json'),'utf8'));
  if(lock.freezePath!==relative(sourceRoot,resolve(sourceRoot,freezePath)))throw new Error('Metadata refresh cannot replace the frozen runtime lineage');
  const plan=buildPlan({freezePath}),changes=[];plan.files.set('README.md',Buffer.from(readmeSource(plan)));
  for(const [file,bytes]of plan.files){const current=lock.files[file],next=sha(bytes);if(current===next)continue;if(file!=='README.md'&&!file.startsWith('evidence/runtime/navigation-v042/'))throw new Error(`Metadata refresh would change runtime/host/contract: ${file}`);changes.push({path:file,before:current??null,after:next});}
  const sourceFiles=Object.fromEntries([...plan.originals].sort(([a],[b])=>a.localeCompare(b)).map(([file,bytes])=>[file,sha(bytes)]));
  if(!changes.length&&json(sourceFiles)===json(lock.sourceFiles))return {output,snapshotId:lock.snapshotId,changedMetadataFiles:0};
  mkdirSync(join(output,'verification'),{recursive:true});
  const previousSnapshot=lock.snapshotId;writeFileSync(join(output,'verification',`source-lock-before-metadata-${previousSnapshot}.json`),json(lock));
  for(const change of changes){const bytes=plan.files.get(change.path);mkdirSync(dirname(join(output,change.path)),{recursive:true});writeFileSync(join(output,change.path),bytes);lock.files[change.path]=change.after;}
  const provenance=JSON.parse(readFileSync(join(output,'provenance.json'),'utf8'));
  provenance.sourceFiles=sourceFiles;provenance.currentMetadataValidation=plan.currentMetadataValidation;provenance.notPackagedHistoricalReferences=plan.historicalReferences;
  provenance.metadataFinalization={recordedAt:new Date().toISOString(),previousSnapshot,changes,runtimeChanges:0,meaning:'Final handoff README and small navigation evidence refreshed; all copied runtime, styles, host and dependency manifests retain the already-verified bytes.'};
  if(plan.files.has('evidence/runtime/navigation-v042/w8/browser/results.json'))provenance.verification={typecheck:'passed-four-copied-workspaces',tests:119,build:'passed',offlineInstall:'failed-existing-cache-incomplete; downloaded0',temporaryCacheLinks:'used-for-validation-and-removed',browserInteraction:JSON.parse(plan.files.get('evidence/runtime/navigation-v042/w8/browser/results.json').toString()),independentArchiveExtraction:'pending-root',record:'verification/summary.json'};
  writeFileSync(join(output,'provenance.json'),json(provenance));lock.files['provenance.json']=sha(json(provenance));
  lock.files=Object.fromEntries(Object.entries(lock.files).sort(([a],[b])=>a.localeCompare(b)));lock.sourceFiles=sourceFiles;lock.supersedesSnapshotId=previousSnapshot;lock.recordedAt=new Date().toISOString();lock.snapshotId=`navigation-v042-${sha(json(lock.files)).slice(0,16)}`;
  writeFileSync(join(output,'source-lock.json'),json(lock));verifyExport(output,{archiveReady:true});return {output,snapshotId:lock.snapshotId,previousSnapshot,changedMetadataFiles:changes.length,runtimeChanges:0};
}

export function linkCache() {
  const output=resolve(sourceRoot,destinationName);verifyExport(output);
  const recordPath=join(output,'.navigation-cache-links.json');if(existsSync(recordPath))throw new Error('Temporary links already recorded');
  for(const directory of packageDirectories)if(existsSync(join(output,directory,'node_modules')))throw new Error(`Refusing existing output dependencies: ${directory}`);
  const packages=new Map(libraries.map(name=>[JSON.parse(readFileSync(join(output,`packages/${name}/package.json`),'utf8')).name,join(output,`packages/${name}`)]));
  const targets=[];
  for(const directory of packageDirectories){const manifest=JSON.parse(readFileSync(join(output,directory,'package.json'),'utf8'));for(const name of Object.keys({...manifest.dependencies,...manifest.devDependencies})){let target=packages.get(name);if(!target){const candidates=[join(sourceRoot,directory,'node_modules',name),join(sourceRoot,'node_modules',name)];const path=candidates.find(existsSync);if(!path)throw new Error(`Cached dependency unavailable: ${directory} -> ${name}`);target=realpathSync(path);}targets.push({path:join(output,directory,'node_modules',name),target});}}
  const links=[],seenLinks=new Set();
  const add=(path,target)=>{if(seenLinks.has(path))return;seenLinks.add(path);if(!existsSync(target))throw new Error(`Cached binary target missing: ${target}`);links.push({path:relative(output,path),target});};
  for(const {path,target}of targets){add(path,target);const manifest=JSON.parse(readFileSync(join(target,'package.json'),'utf8'));const bins=typeof manifest.bin==='string'?{[manifest.name.split('/').pop()]:manifest.bin}:manifest.bin||{};for(const [name,file]of Object.entries(bins)){const bin=join(dirname(path.includes('/@')?dirname(path):path),'.bin',name);add(bin,resolve(target,file));}}
  writeFileSync(recordPath,json({output,createdDirectories:packageDirectories.map(directory=>relative(output,join(output,directory,'node_modules'))),links,policy:'Per dependency only; all @rain-next targets point to copied packages. Source dependency tree is never modified.'}));
  for(const link of links){const path=join(output,link.path);mkdirSync(dirname(path),{recursive:true});symlinkSync(link.target,path,lstatSync(link.target).isDirectory()?'dir':'file');}
  return {output,links:links.length};
}
export function unlinkCache() {
  const output=resolve(sourceRoot,destinationName),recordPath=join(output,'.navigation-cache-links.json');
  const record=JSON.parse(readFileSync(recordPath,'utf8'));if(record.output!==output)throw new Error('Cache record output changed');
  for(const link of record.links){const path=resolve(output,link.path);if(!existsSync(path))continue;if(!inside(output,path)||!lstatSync(path).isSymbolicLink()||realpathSync(path)!==realpathSync(link.target))throw new Error(`Temporary link was replaced: ${link.path}`);}
  for(const directory of record.createdDirectories){const path=resolve(output,directory);if(!inside(output,path)||!directory.endsWith('node_modules')||(existsSync(path)&&lstatSync(path).isSymbolicLink()))throw new Error('Invalid dependency cleanup path');rmSync(path,{recursive:true,force:true});}
  rmSync(recordPath);return verifyExport(output,{archiveReady:true});
}

if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const [command,...args]=process.argv.slice(2);const index=args.indexOf('--freeze');const freezePath=index<0?undefined:args[index+1];
  if(command==='--plan'){const plan=buildPlan({freezePath});console.log(json({mode:'read-only-plan',output:resolve(sourceRoot,destinationName),copiedAndDerivedFiles:plan.files.size,bytes:[...plan.files.values()].reduce((sum,bytes)=>sum+bytes.length,0),registryItems:plan.registryItems.length,runtimeSourceFiles:plan.closure.sourceFiles,resolvedLocalEdges:plan.closure.resolvedLocalEdges,freeze:freezePath||'pending-root-W7-final-freeze',writes:0}));}
  else if(command==='--export')console.log(json(exportNavigation({freezePath})));
  else if(command==='--refresh-metadata')console.log(json(refreshMetadata({freezePath})));
  else if(command==='--check')console.log(verifyExport(resolve(sourceRoot,destinationName),{archiveReady:args.includes('--archive-ready')}));
  else if(command==='--link-cache')console.log(json(linkCache()));
  else if(command==='--unlink-cache')console.log(unlinkCache());
  else throw new Error('Usage: node scripts/navigation-v042-export.mjs --plan | --export --freeze <W7-final.json> | --refresh-metadata --freeze <same-W7-final.json> | --check [--archive-ready] | --link-cache | --unlink-cache');
}
